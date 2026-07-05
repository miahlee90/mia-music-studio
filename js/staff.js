/* Music Fundamentals — SVG staff renderer + shared Web Audio (original notation, DD-05) v5
   v3: natural size, viewBox auto-expand, labels below, SVG bass clef, curly brace
   v4.x: rests, bar lines, time signatures (incl. C), tempo playback, clicks,
   clickBars, final bar at right edge (DD-23), SVG treble clef (DD-24),
   tsig digits clear of the middle line, single item centered, whole rest centered
   v5 (Milestone 4/5, Units 3-6): dotted notes ({dot:true}, +50% duration),
   eighth rest ({rest:"8"}), beams (spec.beams:[[i,j]] — flags suppressed),
   ties/slurs (spec.arcs:[{from,to,type:"tie"|"slur"}]; tied notes not re-struck),
   repeat bar lines ({bar:"repeat-start"|"repeat-end"}), 1st/2nd endings
   (spec.endings:[{from,to,n}]), accidentals (pitch "F#4"/"Bb4" or {acc:"n"}),
   articulation ({artic:"staccato"|"accent"|"tenuto"|"fermata"|"sfz"}),
   dynamics ({dyn:"pp".."ff"} — playback volume follows), hairpins
   (spec.hairpins:[{from,to,type:"cresc"|"decresc"}]), roadmap marks
   ({mark:"segno"|"coda"|"tocoda"|"fine"|"dc-fine"|"ds-fine"|"dc-coda"|"ds-coda"}).
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
  function click(when=0,vol=0.5,hi=false){ /* metronome tick (for rhythm games) */
    const c=ac(),t=c.currentTime+when;
    const o=c.createOscillator(),g=c.createGain();
    o.type="square";o.frequency.value=hi?1568:1047;
    o.connect(g);g.connect(c.destination);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol*.6,t+.005);
    g.gain.exponentialRampToValueAtTime(.001,t+.07);
    o.start(t);o.stop(t+.1);
  }
  function chord(midis,dur=1,when=0){ midis.forEach(m=>tone(m,dur,when,.35)); }
  const P2M={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
  function midi(p){ /* "C4", "F#3", "Bb4" */
    const m=p.match(/^([A-G])([#b]?)(\d)$/); if(!m) return 60;
    return 12*(+m[3]+1)+P2M[m[1]]+(m[2]==="#"?1:m[2]==="b"?-1:0);
  }
  return {tone,click,chord,midi,ac};
})();

const Staff=(()=>{
  const GAP=15, TOP=20, LEFT=10;
  const LETTERS=["C","D","E","F","G","A","B"];
  const BEATS={w:4,h:2,q:1,"8":0.5};
  const VOLS={pp:.14,p:.24,mp:.36,mf:.5,f:.66,ff:.85};
  function dia(p){ const m=p.match(/^([A-G])[#b]?(\d)$/); return (+m[2])*7+LETTERS.indexOf(m[1]); }
  /* diatonic index of bottom line: treble E4=30, bass G2=18 */
  function baseIdx(clef){ return clef==="bass"?18:30; }
  function yFor(p,clef,y0){ return (y0+4*GAP)-(dia(p)-baseIdx(clef))*(GAP/2); }
  function normD(d){ d=String(d||"q"); return d.endsWith(".")? d.slice(0,-1) : d; }
  function isDotted(n){ return !!n.dot || String(n.d||n.rest||"").endsWith("."); }
  function durShape(d){ return {w:{hollow:true,stem:false},h:{hollow:true,stem:true},q:{hollow:false,stem:true},"8":{hollow:false,stem:true,flag:true}}[normD(d)]||{hollow:false,stem:true}; }
  function beatsOf(n){ return BEATS[normD(n.d||n.rest)]*(isDotted(n)?1.5:1); }

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
    if(clef==="treble"){
      /* DD-24: stroke-drawn G clef — stem crosses the hook at the D line, loop wraps G */
      const g=y0;
      [`M 34 ${g-22} L 34 ${g+70}`,
       `M 34 ${g-22} C 44 ${g-17} 45 ${g} 38 ${g+10} C 36 ${g+13} 35 ${g+14} 34 ${g+15}`,
       `M 34 ${g+15} C 22.4 ${g+15} 13 ${g+25} 13 ${g+37.5} C 13 ${g+50} 22.4 ${g+60} 34 ${g+60}`,
       `M 34 ${g+60} C 44 ${g+60} 47 ${g+48} 41 ${g+38} C 37 ${g+31} 29 ${g+29} 25 ${g+36} C 22 ${g+41} 25 ${g+47} 30 ${g+48}`,
       `M 34 ${g+70} C 35 ${g+77} 25 ${g+80} 21 ${g+74} C 18 ${g+69} 24 ${g+66} 27 ${g+69}`
      ].forEach(d=>parts.push(`<path class="clef-stroke" d="${d}"/>`));
    }
    if(clef==="bass"){
      parts.push(`<circle class="clefdot" cx="${LEFT+7.5}" cy="${y0+GAP}" r="5.4"/>`);
      parts.push(`<path class="clef-path" d="M ${LEFT+5} ${y0+9} C ${LEFT+10} ${y0-2}, ${LEFT+22} ${y0-3}, ${LEFT+26} ${y0+6} C ${LEFT+30} ${y0+15}, ${LEFT+26} ${y0+32}, ${LEFT+8} ${y0+50} C ${LEFT+6} ${y0+52}, ${LEFT+5} ${y0+50}, ${LEFT+7} ${y0+48} C ${LEFT+20} ${y0+34}, ${LEFT+24} ${y0+18}, ${LEFT+21} ${y0+8} C ${LEFT+18} ${y0+1}, ${LEFT+10} ${y0+2}, ${LEFT+5} ${y0+9} Z"/>`);
      parts.push(`<circle class="clefdot" cx="${LEFT+31}" cy="${y0+GAP*0.5}" r="3.1"/>`);
      parts.push(`<circle class="clefdot" cx="${LEFT+31}" cy="${y0+GAP*1.5}" r="3.1"/>`);
    }
    if(opts._time) drawTime(parts,y0,opts._time);
  }
  function parseTime(t){
    if(!t) return null;
    if(typeof t==="object") return t;
    if(String(t).trim().toUpperCase()==="C") return {common:true};
    const m=String(t).match(/^(\d+)\s*\/\s*(\d+)$/); return m?{top:+m[1],bottom:+m[2]}:null;
  }
  function drawTime(parts,y0,ts){
    const x=LEFT+52;
    if(ts.common){
      parts.push(`<text class="tsig" x="${x}" y="${y0+2*GAP+GAP*0.95}" font-size="${GAP*2.9}" text-anchor="middle">C</text>`);
      return;
    }
    const fs=GAP*1.9; /* digits clear the middle line */
    parts.push(`<text class="tsig" x="${x}" y="${y0+2*GAP-3}" font-size="${fs}" text-anchor="middle">${ts.top}</text>`);
    parts.push(`<text class="tsig" x="${x}" y="${y0+4*GAP-3}" font-size="${fs}" text-anchor="middle">${ts.bottom}</text>`);
  }

  function noteSVG(x,y,d,extra,y0,noFlag,dot,onLine){
    const s=durShape(d), cls="note"+(s.hollow?" hollow":"")+(extra||"");
    const rx=(d==="w")?10.5:9;
    let out=`<ellipse class="${cls}" cx="${x}" cy="${y}" rx="${rx}" ry="6.5"/>`;
    if(s.stem){
      const up = y > y0+2*GAP;
      out+= up? `<line class="stem" x1="${x+8.4}" y1="${y-2}" x2="${x+8.4}" y2="${y-38}"/>`
              : `<line class="stem" x1="${x-8.4}" y1="${y+2}" x2="${x-8.4}" y2="${y+38}"/>`;
      if(s.flag&&!noFlag) out+= up? `<path class="stem" d="M${x+8.4} ${y-38} q12 6 8 20" fill="none"/>`
                                  : `<path class="stem" d="M${x-8.4} ${y+38} q-12 -6 -8 -20" fill="none"/>`;
    }
    if(dot) out+=`<circle class="artic" cx="${x+rx+6}" cy="${onLine? y-6 : y}" r="2.7"/>`;
    return out;
  }
  function restSVG(x,y0,type,extra){
    const cls="rest"+(extra||"");
    if(type==="w")
      return `<rect class="${cls}" x="${x-9}" y="${y0+GAP}" width="18" height="7"/>`;
    if(type==="h")
      return `<rect class="${cls}" x="${x-9}" y="${y0+2*GAP-7}" width="18" height="7"/>`;
    if(type==="8") /* eighth rest: dot head + seven-stroke */
      return `<circle class="${cls}" cx="${x-4}" cy="${y0+26}" r="3.4"/>
        <path class="rest-line" d="M ${x-4} ${y0+26} C ${x-1} ${y0+30}, ${x+3} ${y0+29}, ${x+6} ${y0+23} L ${x-1} ${y0+44}"/>`;
    /* quarter rest: filled zigzag with bottom hook */
    return `<path class="${cls}" d="M ${x-4} ${y0+10}
      C ${x+3} ${y0+16}, ${x+4} ${y0+19}, ${x-1} ${y0+25}
      C ${x+5} ${y0+31}, ${x+6} ${y0+34}, ${x+3} ${y0+38}
      C ${x-3} ${y0+36}, ${x-5} ${y0+40}, ${x+1} ${y0+47}
      C ${x-7} ${y0+45}, ${x-8} ${y0+37}, ${x-1} ${y0+34}
      L ${x-4} ${y0+30}
      C ${x+1} ${y0+25}, ${x} ${y0+22}, ${x-6} ${y0+15} Z"/>`;
  }
  function barSVG(x,yTop,yBot,kind){
    const dots=(dx)=>`<circle class="clefdot" cx="${x+dx}" cy="${(yTop+yBot)/2-GAP/2}" r="2.6"/><circle class="clefdot" cx="${x+dx}" cy="${(yTop+yBot)/2+GAP/2}" r="2.6"/>`;
    if(kind==="double")
      return `<line class="barline" x1="${x-3}" y1="${yTop}" x2="${x-3}" y2="${yBot}"/><line class="barline" x1="${x+3}" y1="${yTop}" x2="${x+3}" y2="${yBot}"/>`;
    if(kind==="final")
      return `<line class="barline" x1="${x-5}" y1="${yTop}" x2="${x-5}" y2="${yBot}"/><line class="barline thick" x1="${x+2}" y1="${yTop}" x2="${x+2}" y2="${yBot}"/>`;
    if(kind==="repeat-end")
      return dots(-11)+`<line class="barline" x1="${x-5}" y1="${yTop}" x2="${x-5}" y2="${yBot}"/><line class="barline thick" x1="${x+2}" y1="${yTop}" x2="${x+2}" y2="${yBot}"/>`;
    if(kind==="repeat-start")
      return `<line class="barline thick" x1="${x-2}" y1="${yTop}" x2="${x-2}" y2="${yBot}"/><line class="barline" x1="${x+5}" y1="${yTop}" x2="${x+5}" y2="${yBot}"/>`+dots(11);
    return `<line class="barline" x1="${x}" y1="${yTop}" x2="${x}" y2="${yBot}"/>`;
  }
  function accSVG(x,y,a){
    const L=(x1,y1,x2,y2)=>`<line class="acc" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    if(a==="#") return L(x-2,y-9,x-2,y+10)+L(x+2,y-10,x+2,y+9)
      +L(x-6,y-3,x+6,y-5.5)+L(x-6,y+5.5,x+6,y+3);
    if(a==="b") return L(x-2,y-12,x-2,y+5)
      +`<path class="acc" fill="none" d="M ${x-2} ${y+5} C ${x+7} ${y}, ${x+6} ${y-6}, ${x-2} ${y-2}"/>`;
    /* natural */
    return L(x-2.5,y-10,x-2.5,y+5)+L(x+2.5,y-5,x+2.5,y+10)
      +L(x-2.5,y-3.5,x+2.5,y-5.5)+L(x-2.5,y+5.5,x+2.5,y+3.5);
  }
  function articSVG(x,y,y0,artic,W){
    const up = y > y0+2*GAP; /* stem up → mark below the notehead */
    const yy = up? y+14 : y-14;
    if(artic==="staccato") return `<circle class="artic" cx="${x}" cy="${yy}" r="2.6"/>`;
    if(artic==="tenuto") return `<line class="acc" x1="${x-7}" y1="${yy}" x2="${x+7}" y2="${yy}"/>`;
    if(artic==="accent") return `<path class="acc" fill="none" d="M ${x-8} ${yy-4} L ${x+8} ${yy} L ${x-8} ${yy+4}"/>`;
    if(artic==="fermata"){ const fy=y0-8;
      return `<path class="acc" fill="none" d="M ${x-11} ${fy} C ${x-7} ${fy-11}, ${x+7} ${fy-11}, ${x+11} ${fy}"/><circle class="artic" cx="${x}" cy="${fy-3.5}" r="2.4"/>`; }
    if(artic==="sfz") return `<text class="dyn" x="${x}" y="${y0+4*GAP+18}" text-anchor="middle">sfz</text>`;
    return "";
  }
  function markSVG(x,y0,kind){
    const y=y0-12;
    if(kind==="coda"||kind==="tocoda"){
      const lbl=kind==="tocoda"? `<text class="mark-txt" x="${x}" y="${y-16}" text-anchor="middle">To</text>`:"";
      return lbl+`<circle class="acc" fill="none" cx="${x}" cy="${y-4}" r="6"/><line class="acc" x1="${x}" y1="${y-14}" x2="${x}" y2="${y+6}"/><line class="acc" x1="${x-9}" y1="${y-4}" x2="${x+9}" y2="${y-4}"/>`;
    }
    if(kind==="segno")
      return `<text class="mark-txt seg" x="${x}" y="${y+2}" text-anchor="middle" font-size="21">S</text><line class="acc" x1="${x-6}" y1="${y+5}" x2="${x+6}" y2="${y-17}"/><circle class="artic" cx="${x-9}" cy="${y-10}" r="1.8"/><circle class="artic" cx="${x+9}" cy="${y-2}" r="1.8"/>`;
    const TXT={fine:"Fine","dc":"D.C.","ds":"D.S.","dc-fine":"D.C. al Fine","ds-fine":"D.S. al Fine","dc-coda":"D.C. al Coda","ds-coda":"D.S. al Coda"};
    return `<text class="mark-txt" x="${x}" y="${y}" text-anchor="middle">${TXT[kind]||kind}</text>`;
  }
  function ledgersFor(p,clef,x,y0){
    const idx=dia(p)-baseIdx(clef); let out="";
    for(let i=-2;i>=idx;i-=2){ const y=y0+4*GAP-(i/2)*GAP; out+=`<line class="ledger" x1="${x-14}" y1="${y}" x2="${x+14}" y2="${y}"/>`; }
    for(let i=10;i<=idx;i+=2){ const y=y0+4*GAP-(i/2)*GAP; out+=`<line class="ledger" x1="${x-14}" y1="${y}" x2="${x+14}" y2="${y}"/>`; }
    return out;
  }

  function render(el, spec){
    const W=spec.width||420;
    const grand=spec.clef==="grand";
    const ts=parseTime(spec.time);
    const H0 = grand? 2*TOP+9*GAP+50 : 2*TOP+4*GAP+30;
    const y0t=TOP+10, y0b=grand? y0t+4*GAP+40 : y0t;
    const staffBottom=(grand? y0b:y0t)+4*GAP;
    const opts=Object.assign({},spec,{_time:ts});
    const parts=[];
    if(grand){
      drawOneStaff(parts,y0t,W,"treble",opts);
      drawOneStaff(parts,y0b,W,"bass",opts);
      parts.push(`<line class="staffline" x1="${LEFT}" y1="${y0t}" x2="${LEFT}" y2="${y0b+4*GAP}"/>`);
      const yT=y0t, yB=y0b+4*GAP, h=yB-yT, yM=(yT+yB)/2;
      parts.push(`<path class="brace" d="M 10 ${yT} C 2 ${yT+h*.18}, 7.5 ${yM-h*.20}, 1 ${yM} C 7.5 ${yM+h*.20}, 2 ${yB-h*.18}, 10 ${yB} C 5 ${yB-h*.16}, 9.8 ${yM+h*.22}, 4 ${yM} C 9.8 ${yM-h*.22}, 5 ${yT+h*.16}, 10 ${yT} Z"/>`);
    } else drawOneStaff(parts,y0t,W,spec.clef||"treble",opts);

    const items=spec.notes||[];
    /* clef:"none" (symbol cards) has no clef taking space — start items further left
       so a single symbol sits visually centered in the card */
    const startX=(grand?70:(spec.clef==="none"?30:80))+(ts?30:0);
    const beamSet=new Set();
    (spec.beams||[]).forEach(([a,b])=>{ for(let i=a;i<=b;i++) beamSet.add(i); });
    const placed=[];
    let minEl=0, maxEl=H0, maxNoteBottom=-Infinity, hasLabel=false, hasDyn=false;
    items.forEach((n,i)=>{
      const clef = n.clef || (grand? "treble" : (spec.clef||"treble"));
      const y0 = clef==="bass"? y0b : y0t;
      const spreadX = items.length===1? (startX+W-40)/2
        : startX+i*((W-40-startX)/Math.max(1,(items.length-1)||1));
      const x = n.x || ((n.bar!==undefined && i===items.length-1)? W-16 : spreadX);
      if(n.label) hasLabel=true;
      if(n.dyn) hasDyn=true;
      if(n.bar!==undefined){ placed.push({n,i,clef,y0,x,kind:"bar"}); return; }
      if(n.mark!==undefined){ minEl=Math.min(minEl,y0-38); placed.push({n,i,clef,y0,x,kind:"mark"}); return; }
      if(n.rest){
        minEl=Math.min(minEl,y0+4); maxEl=Math.max(maxEl,y0+54);
        maxNoteBottom=Math.max(maxNoteBottom,y0+50);
        placed.push({n,i,clef,y0,x,kind:"rest"}); return;
      }
      const y = yFor(n.p,clef,y0);
      const s = durShape(n.d);
      let top=y-8, bottom=y+8;
      if(s.stem){ if(y > y0+2*GAP) top=Math.min(top,y-40); else bottom=Math.max(bottom,y+40); }
      if(n.artic==="fermata") top=Math.min(top,y0-24);
      if(n.artic) { top=Math.min(top,y-18); bottom=Math.max(bottom,y+18); }
      minEl=Math.min(minEl,top-6); maxEl=Math.max(maxEl,bottom+6);
      maxNoteBottom=Math.max(maxNoteBottom,bottom);
      placed.push({n,i,clef,y0,x,y,kind:"note"});
    });
    /* whole rest alone in its measure sits centered in it */
    placed.forEach((pl,pi)=>{
      if(pl.kind!=="rest"||pl.n.rest!=="w"||pl.n.x) return;
      let alone=true, segStart=startX-24, segEnd=W-40;
      let j=pi-1; while(j>=0&&placed[j].kind!=="bar"){ alone=false; j--; }
      if(j>=0) segStart=placed[j].x;
      let k=pi+1; while(k<placed.length&&placed[k].kind!=="bar"){ alone=false; k++; }
      if(k<placed.length) segEnd=placed[k].x;
      if(alone) pl.x=(segStart+segEnd)/2;
    });
    if(hasDyn) maxEl=Math.max(maxEl,staffBottom+26);
    if(hasLabel&&maxNoteBottom===-Infinity) maxNoteBottom=staffBottom;
    const labelY = hasLabel? Math.max(staffBottom+22, maxNoteBottom+18, hasDyn?staffBottom+38:0) : 0;
    if(hasLabel) maxEl=Math.max(maxEl,labelY+6);
    placed.forEach(({n,i,clef,y0,x,y,kind})=>{
      if(kind==="bar"){
        const yTop=grand? y0t : y0, yBot=grand? y0b+4*GAP : y0+4*GAP;
        const bk=n.bar===true?"single":n.bar;
        parts.push(barSVG(x,yTop,yBot,bk));
        if(spec.clickBars) parts.push(`<rect class="clickbar" data-bar="${i}" data-kind="${bk}" x="${x-11}" y="${yTop-6}" width="22" height="${yBot-yTop+12}"/>`);
      } else if(kind==="mark"){
        parts.push(`<g class="notegroup" data-i="${i}" data-mark="${n.mark}">${markSVG(x,y0,n.mark)}</g>`);
      } else if(kind==="rest"){
        parts.push(`<g class="notegroup" data-i="${i}" data-rest="${n.rest}">${restSVG(x,y0,normD(n.rest),(spec.clickNotes?" clickable":""))}${n.dot?`<circle class="artic" cx="${x+13}" cy="${y0+2*GAP-7}" r="2.7"/>`:""}</g>`);
      } else {
        parts.push(ledgersFor(n.p,clef,x,y0));
        const accCh = n.acc==="n"?"n" : (n.p.match(/^[A-G]([#b])\d$/)||[])[1];
        const idx=dia(n.p)-baseIdx(clef);
        const onLine=idx%2===0;
        let inner=noteSVG(x,y,normD(n.d),(spec.clickNotes?" clickable":""),y0,beamSet.has(i),isDotted(n),onLine);
        if(accCh) inner=accSVG(x-18,y,accCh==="n"?"nat":accCh)+inner;
        if(n.artic) inner+=articSVG(x,y,y0,n.artic,W);
        parts.push(`<g class="notegroup" data-i="${i}" data-p="${n.p}">${inner}</g>`);
        if(n.dyn) parts.push(`<text class="dyn" x="${x}" y="${y0+4*GAP+20}" text-anchor="middle">${n.dyn}</text>`);
      }
      if(n.label){ const hw=Math.min(W/2-4, 4+String(n.label).length*3.4);
        const lx=Math.max(hw+4, Math.min(W-hw-4, x));
        parts.push(`<text class="lbl" x="${lx}" y="${labelY}" text-anchor="middle">${n.label}</text>`); }
    });
    /* beams: connect stem tips of first/last beamed note in each group */
    (spec.beams||[]).forEach(([a,b])=>{
      const A=placed[a], B=placed[b];
      if(!A||!B||A.y===undefined||B.y===undefined) return;
      const up=A.y > A.y0+2*GAP;
      const xa=up? A.x+8.4 : A.x-8.4, xb=up? B.x+8.4 : B.x-8.4;
      const ya=up? A.y-38 : A.y+38, yb=up? B.y-38 : B.y+38;
      parts.push(`<line class="beam" x1="${xa}" y1="${ya}" x2="${xb}" y2="${yb}"/>`);
    });
    /* ties & slurs */
    (spec.arcs||[]).forEach(a=>{
      const A=placed[a.from], B=placed[a.to];
      if(!A||!B||A.y===undefined||B.y===undefined) return;
      const up=((A.y+B.y)/2) > (A.y0+2*GAP); /* stems up → curve above the noteheads */
      const s=up? -1 : 1;
      const y1=A.y+s*11, y2=B.y+s*11, cy=(up? Math.min(y1,y2) : Math.max(y1,y2))+s*15;
      minEl=Math.min(minEl,cy-4); maxEl=Math.max(maxEl,cy+4);
      parts.push(`<path class="arc" d="M ${A.x+3} ${y1} C ${(A.x+B.x)/2} ${cy}, ${(A.x+B.x)/2} ${cy}, ${B.x-3} ${y2}"/>`);
    });
    /* hairpins (crescendo / decrescendo wedges below the staff) */
    (spec.hairpins||[]).forEach(hp=>{
      const A=placed[hp.from], B=placed[hp.to]; if(!A||!B) return;
      const y=staffBottom+22; maxEl=Math.max(maxEl,y+10);
      if(hp.type==="decresc")
        parts.push(`<line class="acc" x1="${A.x}" y1="${y-5}" x2="${B.x}" y2="${y}"/><line class="acc" x1="${A.x}" y1="${y+5}" x2="${B.x}" y2="${y}"/>`);
      else
        parts.push(`<line class="acc" x1="${A.x}" y1="${y}" x2="${B.x}" y2="${y-5}"/><line class="acc" x1="${A.x}" y1="${y}" x2="${B.x}" y2="${y+5}"/>`);
    });
    /* 1st / 2nd ending brackets */
    (spec.endings||[]).forEach(e=>{
      const A=placed[e.from], B=placed[e.to]; if(!A||!B) return;
      const y=y0t-18, x1=A.x-12, x2=B.x+12;
      minEl=Math.min(minEl,y-14);
      parts.push(`<line class="acc" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"/><line class="acc" x1="${x1}" y1="${y}" x2="${x1}" y2="${y+12}"/>${e.n<2?`<line class="acc" x1="${x2}" y1="${y}" x2="${x2}" y2="${y+12}"/>`:""}<text class="lbl" x="${x1+8}" y="${y+12}" text-anchor="middle">${e.n}.</text>`);
    });

    const yTop=Math.floor(minEl), vH=Math.ceil(maxEl)-yTop;
    el.classList.add("staffwrap");
    el.innerHTML=`<svg class="mf-staff" viewBox="0 ${yTop} ${W} ${vH}" width="100%" style="max-width:${W}px;display:block;margin:0 auto" xmlns="http://www.w3.org/2000/svg">${parts.join("")}</svg>`;
    const svg=el.querySelector("svg");
    if(spec.onLine) svg.querySelectorAll(".clickline").forEach(l=>l.addEventListener("click",()=>spec.onLine(+l.dataset.line,l.dataset.staff)));
    if(spec.onSpace) svg.querySelectorAll(".clickspace").forEach(s=>s.addEventListener("click",()=>spec.onSpace(+s.dataset.space,s.dataset.staff)));
    if(spec.onNote) svg.querySelectorAll(".notegroup").forEach(g=>g.addEventListener("click",()=>spec.onNote(+g.dataset.i,g.dataset.p||null)));
    if(spec.onBar) svg.querySelectorAll(".clickbar").forEach(b=>b.addEventListener("click",()=>spec.onBar(+b.dataset.bar,b.dataset.kind)));
    return {
      svg,
      highlight(i){ svg.querySelectorAll(".notegroup .note, .notegroup .rest").forEach(n=>n.classList.remove("hl"));
        if(i!=null){ const g=svg.querySelector(`.notegroup[data-i="${i}"] .note, .notegroup[data-i="${i}"] .rest`); if(g)g.classList.add("hl"); } }
    };
  }
  const DURSEC={w:1.6,h:1.0,q:0.55,"8":0.3};
  function play(spec, api){
    let t=0;
    const tempo=spec.tempo||0, spb=tempo?60/tempo:0;
    const arcs=(spec.arcs||[]).filter(a=>(a.type||"tie")==="tie");
    const tiedTo=new Set(arcs.map(a=>a.to));
    let vol=.5;
    (spec.notes||[]).forEach((n,i)=>{
      if(n.bar!==undefined||n.mark!==undefined) return;
      if(n.dyn&&VOLS[n.dyn]!==undefined) vol=VOLS[n.dyn];
      const base=tempo? beatsOf(n)*spb : DURSEC[normD(n.d||n.rest)]*(isDotted(n)?1.5:1);
      const dur=n.artic==="fermata"? base*1.8 : base;
      if(!n.rest&&!tiedTo.has(i)){
        /* extend through tied notes */
        let full=dur, j=i, guard=0;
        while(guard++<8){ const a=arcs.find(x=>x.from===j); if(!a) break;
          const nn=spec.notes[a.to]; if(!nn||nn.rest) break;
          full+= tempo? beatsOf(nn)*spb : DURSEC[normD(nn.d)]*(isDotted(nn)?1.5:1); j=a.to; }
        let v=vol, dd=full;
        if(n.artic==="staccato") dd=Math.max(.12,full*0.4);
        if(n.artic==="accent"||n.artic==="sfz") v=Math.min(.95,vol*1.7);
        MFAudio.tone(MFAudio.midi(n.p), tempo? Math.max(0.18,dd*0.92):Math.min(dd,1.8), t, v);
      }
      if(api) setTimeout(()=>api.highlight(i), t*1000);
      t+= tempo? dur : dur+0.08;
    });
    if(api) setTimeout(()=>api.highlight(null), t*1000+200);
    return t;
  }
  return {render,play,dia,yFor,BEATS};
})();
