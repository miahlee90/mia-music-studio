/* Music Fundamentals — interactive on-screen piano (AGP keyboard applications) */
const Keyboard=(()=>{
  const WHITE_SEMIS=[0,2,4,5,7,9,11];
  const NAMES={0:"C",2:"D",4:"E",5:"F",7:"G",9:"A",11:"B"};
  /* create(el,{start:60, octaves:2, labels:false, marks:[midi], onKey(midi)}) */
  function create(el,opts={}){
    const start=opts.start??60, octaves=opts.octaves??2;
    const whites=[],blacks=[];
    for(let m=start;m<start+octaves*12+1;m++){
      const s=m%12;
      if(WHITE_SEMIS.includes(s)) whites.push(m); else blacks.push(m);
    }
    el.classList.add("mf-kb");
    el.innerHTML="";
    const wW=100/whites.length;
    const keyEls={};
    whites.forEach((m,i)=>{
      const k=document.createElement("div");
      k.className="w"; k.style.left=(i*wW)+"%"; k.style.width=wW+"%"; k.style.height="100%";
      if(opts.labels){ const l=document.createElement("div"); l.className="klabel"; l.textContent=NAMES[m%12]+(Math.floor(m/12)-1); k.appendChild(l); }
      k.onclick=()=>press(m);
      el.appendChild(k); keyEls[m]=k;
    });
    blacks.forEach(m=>{
      const wIdx=whites.filter(w=>w<m).length;
      const k=document.createElement("div");
      k.className="b"; k.style.left=(wIdx*wW-wW*0.3)+"%"; k.style.width=(wW*0.62)+"%"; k.style.height="60%";
      k.onclick=e=>{e.stopPropagation();press(m);};
      el.appendChild(k); keyEls[m]=k;
    });
    (opts.marks||[]).forEach(m=>{ if(keyEls[m]) keyEls[m].classList.add("mark"); });
    function press(m,silent){
      if(!silent) MFAudio.tone(m);
      const k=keyEls[m]; if(k){ k.classList.add("on"); setTimeout(()=>k.classList.remove("on"),260); }
      if(opts.onKey && !silent) opts.onKey(m);
    }
    /* demo([{m,t}...]) or demo([midis], gapMs) */
    function demo(seq,gap=380){
      if(typeof seq[0]==="number") seq=seq.map((m,i)=>({m,t:i*gap}));
      seq.forEach(({m,t})=>setTimeout(()=>press(m),t));
      return seq.length? seq[seq.length-1].t+gap : 0;
    }
    function mark(midis){ Object.values(keyEls).forEach(k=>k.classList.remove("mark")); (midis||[]).forEach(m=>{ if(keyEls[m]) keyEls[m].classList.add("mark"); }); }
    return {press,demo,mark,el};
  }
  return {create};
})();
