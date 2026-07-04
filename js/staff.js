/* Music Fundamentals — SVG staff renderer + shared Web Audio (original notation, DD-05) v3
   v3 (Session 14, instructor review fixes):
   - svg renders at natural size, centered (no full-width stretching)
   - viewBox auto-expands so high/low ledger notes are never clipped
   - note labels always placed BELOW the lowest drawn element (no overlap)
   - bass clef drawn as inline SVG path (correct size; dots straddle line 4)
   - grand staff brace drawn as a proper filled curly brace
   NOTE (maintenance): edit by FULL-FILE REWRITE only. */
const MFAudio=(()=>{
  let ctx=null;
  function ac(){ if(!ctx) ctx=new (window.AudioContext||window.webkitAudioContext)(); return ctx; }
  function tone(midi,dur=0.7,when=0,vol=0.5){
    const c=ac(),t=c.currentTime+when,f=440*Math.pow(2,(midi-69)/12);
    const o=c.createOscillator(),o2=c.createOscillator(),g=c.createGain(),g2=c.createGain();
    o.type="triangle";o.frequency.value=f;o2.type="sine";o2.frequency.value=f*2;g2.gain.value=.15;
    o.connect(g);o2.connect(g2);g2.connect(g);g.connect(c.destination);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.02);
    g.gain.exponentialRampToValueAtTime(.001,t+dur);
    o.start(t);o2.start(t);o.stop(t+dur+.05);o2.stop(t+dur+.05);
  }
  function chord(midis,dur=1,when=0){ midis.forEach(m=>tone(m,dur,when,.35)); }
  const P2M={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
  function midi(p){ /* "C4", "F#3", "Bb4" */
    const m=p.match(/^([A-G])([#b]?)(\d)$/); if(!m) return 60;
    return 12*(+m[3]+1)+P2M[m[1]]+(m[2]==="#"?1:m[2]==="b"?-1:0);
  }
  return {tone,chord,midi,ac};
})();

const Staff=(()=>{
  const GAP=15, TOP=20, LEFT=10;
  const LETTERS=["C","D","E","F","G","A","B"];
  function dia(p){ const m=p.match(/^([A-G])[#b]?(\d)$/); return (+m[2])*7+LETTERS.indexOf(m[1]); }
  /* diatonic index of bottom line: treble E4=30, bass G2=18 */
  function baseIdx(clef){ return clef==="bass"?18:30; }
  function yFor(p,clef,y0){ return (y0+4*GAP)-(dia(p)-baseIdx(clef))*(GAP/2); }
  function durShape(d){ return {w:{hollow:true,stem:false},h:{hollow:true,stem:true},q:{hollow:false,stem:true},"8":{hollow:false,stem:true,flag:true}}[d||"q"]; }

  function drawOneStaff(parts,y0,W,clef,opts){
    for(let i=0;i<5;i++){
      const y=y0+i*GAP;
      parts.push(`<line class="staffline" x1="${LEFT}" y1="${y}" x2="${W-10}" y2="${y}"/>`);
      if(opts.clickLines) parts.push(`<line class="clickline" data-line="${5-i}" data-staff="${clef}" x1="${LEFT}" y1="${y}" x2="${W-10}" y2="${y}"/>`);
    }
    if(opts.clickSpaces) for(let s=1;s<=4;s++){
      const y=y0+(4-s)*GAP+GAP/2;
      parts.push(`<rect class="clickspace" data-space="${s}" data-staff="${clef}" x="${LEFT}" y="${y-6}" width="${W-20}" height="12"/>`);
    }
    if(clef==="treble") parts.push(`<text class="clef" x="${LEFT+4}" y="${y0+3.6*GAP}" font-size="${GAP*4.4}">\u{1D11E}</text>`);
    if(clef==="bass"){
      /* engraved-style bass clef: filled swelling curve + head blob on line 4 (F),
         two dots in the top two spaces (straddling the F line), like printed music */
      parts.push(`<circle class="clefdot" cx="${LEFT+7.5}" cy="${y0+GAP}" r="5.4"/>`);
      parts.push(`<path class="clef-path" d="M ${LEFT+5} ${y0+9} C ${LEFT+10} ${y0-2}, ${LEFT+22} ${y0-3}, ${LEFT+26} ${y0+6} C ${LEFT+30} ${y0+15}, ${LEFT+26} ${y0+32}, ${LEFT+8} ${y0+50} C ${LEFT+6} ${y0+52}, ${LEFT+5} ${y0+50}, ${LEFT+7} ${y0+48} C ${LEFT+20} ${y0+34}, ${LEFT+24} ${y0+18}, ${LEFT+21} ${y0+8} C ${LEFT+18} ${y0+1}, ${LEFT+10} ${y0+2}, ${LEFT+5} ${y0+9} Z"/>`);
      parts.push(`<circle class="clefdot" cx="${LEFT+31}" cy="${y0+GAP*0.5}" r="3.1"/>`);
      parts.push(`<circle class="clefdot" cx="${LEFT+31}" cy="${y0+GAP*1.5}" r="3.1"/>`);
    }
  }

  function noteSVG(x,y,d,extra,y0){
    const s=durShape(d), cls="note"+(s.hollow?" hollow":"")+(extra||"");
    let out=`<ellipse class="${cls}" cx="${x}" cy="${y}" rx="9" ry="6.5"/>`;
    if(s.stem){
      const up = y > y0+2*GAP;
      out+= up? `<line class="stem" x1="${x+8.4}" y1="${y-2}" x2="${x+8.4}" y2="${y-38}"/>`
              : `<line class="stem" x1="${x-8.4}" y1="${y+2}" x2="${x-8.4}" y2="${y+38}"/>`;
      if(s.flag) out+= up? `<path class="stem" d="M${x+8.4} ${y-38} q12 6 8 20" fill="none"/>`
                         : `<path class="stem" d="M${x-8.4} ${y+38} q-12 -6 -8 -20" fill="none"/>`;
    }
    return out;
  }
  function ledgersFor(p,clef,x,y0){
    const idx=dia(p)-baseIdx(clef); let out="";
    for(let i=-2;i>=idx;i-=2){ const y=y0+4*GAP-(i/2)*GAP; out+=`<line class="ledger" x1="${x-14}" y1="${y}" x2="${x+14}" y2="${y}"/>`; }
    for(let i=10;i<=idx;i+=2){ const y=y0+4*GAP-(i/2)*GAP; out+=`<line class="ledger" x1="${x-14}" y1="${y}" x2="${x+14}" y2="${y}"/>`; }
    return out;
  }

  /* spec: {clef:"treble"|"bass"|"grand", notes:[{p,d,clef?,label?}], width?, clickLines?, clickSpaces?, clickNotes?} */
  function render(el, spec){
    const W=spec.width||420;
    const grand=spec.clef==="grand";
    const H0 = grand? 2*TOP+9*GAP+50 : 2*TOP+4*GAP+30;
    const y0t=TOP+10, y0b=grand? y0t+4*GAP+40 : y0t;
    const staffBottom=(grand? y0b:y0t)+4*GAP;
    const parts=[];
    if(grand){
      drawOneStaff(parts,y0t,W,"treble",spec);
      drawOneStaff(parts,y0b,W,"bass",spec);
      parts.push(`<line class="staffline" x1="${LEFT}" y1="${y0t}" x2="${LEFT}" y2="${y0b+4*GAP}"/>`);
      /* proper filled curly brace */
      const yT=y0t, yB=y0b+4*GAP, h=yB-yT, yM=(yT+yB)/2;
      parts.push(`<path class="brace" d="M 10 ${yT} C 2 ${yT+h*.18}, 7.5 ${yM-h*.20}, 1 ${yM} C 7.5 ${yM+h*.20}, 2 ${yB-h*.18}, 10 ${yB} C 5 ${yB-h*.16}, 9.8 ${yM+h*.22}, 4 ${yM} C 9.8 ${yM-h*.22}, 5 ${yT+h*.16}, 10 ${yT} Z"/>`);
    } else drawOneStaff(parts,y0t,W,spec.clef||"treble",spec);

    /* compute note positions first so the viewBox can grow to fit them */
    const placed=[];
    let minEl=0, maxEl=H0, maxNoteBottom=-Infinity, hasLabel=false;
    (spec.notes||[]).forEach((n,i)=>{
      const clef = n.clef || (grand? "treble" : (spec.clef||"treble"));
      const y0 = clef==="bass"? y0b : y0t;
      const x = n.x || (grand?70:80)+i*((W-120)/Math.max(1,(spec.notes.length-1)||1));
      const y = yFor(n.p,clef,y0);
      const s = durShape(n.d);
      let top=y-8, bottom=y+8;
      if(s.stem){ if(y > y0+2*GAP) top=Math.min(top,y-40); else bottom=Math.max(bottom,y+40); }
      minEl=Math.min(minEl,top-6); maxEl=Math.max(maxEl,bottom+6);
      maxNoteBottom=Math.max(maxNoteBottom,bottom);
      if(n.label) hasLabel=true;
      placed.push({n,i,clef,y0,x,y});
    });
    const labelY = hasLabel? Math.max(staffBottom+22, maxNoteBottom+18) : 0;
    if(hasLabel) maxEl=Math.max(maxEl,labelY+6);
    placed.forEach(({n,i,clef,y0,x,y})=>{
      parts.push(ledgersFor(n.p,clef,x,y0));
      parts.push(`<g class="notegroup" data-i="${i}" data-p="${n.p}">${noteSVG(x,y,n.d,(spec.clickNotes?" clickable":""),y0)}</g>`);
      if(n.label){ const hw=Math.min(W/2-4, 4+String(n.label).length*3.4);
        const lx=Math.max(hw+4, Math.min(W-hw-4, x));
        parts.push(`<text class="lbl" x="${lx}" y="${labelY}" text-anchor="middle">${n.label}</text>`); }
    });

    const yTop=Math.floor(minEl), vH=Math.ceil(maxEl)-yTop;
    el.classList.add("staffwrap");
    el.innerHTML=`<svg class="mf-staff" viewBox="0 ${yTop} ${W} ${vH}" width="100%" style="max-width:${W}px;display:block;margin:0 auto" xmlns="http://www.w3.org/2000/svg">${parts.join("")}</svg>`;
    const svg=el.querySelector("svg");
    if(spec.onLine) svg.querySelectorAll(".clickline").forEach(l=>l.addEventListener("click",()=>spec.onLine(+l.dataset.line,l.dataset.staff)));
    if(spec.onSpace) svg.querySelectorAll(".clickspace").forEach(s=>s.addEventListener("click",()=>spec.onSpace(+s.dataset.space,s.dataset.staff)));
    if(spec.onNote) svg.querySelectorAll(".notegroup").forEach(g=>g.addEventListener("click",()=>spec.onNote(+g.dataset.i,g.dataset.p)));
    return {
      svg,
      highlight(i){ svg.querySelectorAll(".notegroup .note").forEach(n=>n.classList.remove("hl"));
        if(i!=null){ const g=svg.querySelector(`.notegroup[data-i="${i}"] .note`); if(g)g.classList.add("hl"); } }
    };
  }
  const DURSEC={w:1.6,h:1.0,q:0.55,"8":0.3};
  function play(spec, api){
    let t=0;
    (spec.notes||[]).forEach((n,i)=>{
      const dur=DURSEC[n.d||"q"];
      MFAudio.tone(MFAudio.midi(n.p),Math.min(dur,1.2),t);
      if(api) setTimeout(()=>api.highlight(i), t*1000);
      t+=dur+0.08;
    });
    if(api) setTimeout(()=>api.highlight(null), t*1000+200);
    return t;
  }
  return {render,play,dia,yFor};
})();
