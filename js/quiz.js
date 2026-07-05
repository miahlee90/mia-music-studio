/* Music Fundamentals — quiz engine (DD-07, DD-19 hybrid generators, DD-20 completion codes) v4
   v2: wrong-answer review list, explicit percentage, drill supports fixed questions.
   v3 (Milestone 2): "line-space" generator supports params:{clef:"bass"}.
   v4 (Milestone 3): adds "note-value" (identify whole/half/quarter or its beats)
   and "rhythm-count" (count the total beats of a short rhythm) generators.
   NOTE (maintenance): edit by FULL-FILE REWRITE only. */
const Quiz=(()=>{
  const SALT="MF-MIA-2026";
  const LETTERS=["C","D","E","F","G","A","B"];
  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
  function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
  const RANGES={ treble:["E4","F4","G4","A4","B4","C5","D5","E5","F5"],
                 bass:["G2","A2","B2","C3","D3","E3","F3","G3","A3"] };
  const LS_POS={ treble:{lines:["E4","G4","B4","D5","F5"], spaces:["F4","A4","C5","E5"]},
                 bass:  {lines:["G2","B2","D3","F3","A3"], spaces:["A2","C3","E3","G3"]} };
  const VAL_NAME={w:"Whole Note",h:"Half Note",q:"Quarter Note"};
  const VAL_BEATS={w:4,h:2,q:1};
  const generators={
    "note-name": p=>{
      const pool=p.pool||RANGES[p.clef||"treble"];
      const note=pick(pool), letter=note[0];
      const wrong=shuffle(LETTERS.filter(l=>l!==letter)).slice(0,3);
      const choices=shuffle([letter,...wrong]);
      return { type:"mc", q:"What is the name of this note?",
        staff:{clef:p.clef==="grand"?"grand":(p.clef||"treble"),notes:[{p:note,d:"q",clef:p.noteClef||(p.clef==="bass"?"bass":"treble")}],width:260},
        choices, answer:choices.indexOf(letter),
        explain:`This note is ${letter} — count lines and spaces from the bottom to check.`,
        hint:"Count up from the bottom line, alternating line-space-line-space." };
    },
    "line-space": p=>{
      const clef=(p&&p.clef)==="bass"?"bass":"treble";
      const POS=LS_POS[clef];
      const isLine=Math.random()<.5, n=isLine?1+Math.floor(Math.random()*5):1+Math.floor(Math.random()*4);
      const correct=(isLine?"Line ":"Space ")+n;
      const others=[]; for(let i=1;i<=5;i++){ if(!(isLine&&i===n)) others.push("Line "+i); if(i<=4&&!(!isLine&&i===n)) others.push("Space "+i); }
      const choices=shuffle([correct,...shuffle(others).slice(0,3)]);
      const y=isLine? {p:POS.lines[n-1],d:"q"} : {p:POS.spaces[n-1],d:"q"};
      return { type:"mc", q:"This note sits on which line or space? (count from the bottom)",
        staff:{clef,notes:[y],width:260},
        choices, answer:choices.indexOf(correct),
        explain:`It's ${correct}. Lines and spaces are always counted from the bottom up.`,
        hint:"Bottom line is line 1; the space just above it is space 1." };
    },
    "click-key": p=>{
      const letter=pick(p.letters||["C","D","E","F","G","A","B"]);
      const oct=pick(p.octaves||[4]);
      return { type:"click-key", q:`Click the key ${letter}${oct} on the piano.`,
        kb:{start:60,octaves:2,labels:false}, target:MFAudio.midi(letter+oct),
        explain:`${letter} is found by its position in the black-key groups — C sits left of the 2-black-key group.`,
        hint:"Find the group of TWO black keys: the white key on its left is C. Count letters from there." };
    },
    "higher-lower": ()=>{ const a=57+Math.floor(Math.random()*12); const b=a+(Math.random()<.5?-1:1)*(2+Math.floor(Math.random()*10));
      return { type:"listen", q:"Listen: was the SECOND sound higher or lower?",
        play:()=>{MFAudio.tone(a,.5,0);MFAudio.tone(b,.5,.65);},
        choices:["Higher","Lower"], answer:b>a?0:1,
        explain:"Higher pitches sound brighter and thinner; lower ones deeper and warmer.",
        hint:"Hum both sounds — your voice moves the same direction as the pitch." };
    },
    /* v4 — identify a note value by sight (params:{values:["w","h","q"], ask:"name"|"beats"}) */
    "note-value": p=>{
      const values=(p&&p.values)||["w","h","q"];
      const v=pick(values), askBeats=(p&&p.ask)==="beats"||((!p||!p.ask)&&Math.random()<.5);
      const pitch=pick(["G4","B4","D5","F4","A4","E4","C5"]);
      let choices,correct,q;
      if(askBeats){
        q="How many beats does this note receive?";
        choices=shuffle(["1 beat","2 beats","4 beats"]);
        correct=VAL_BEATS[v]+" beat"+(VAL_BEATS[v]>1?"s":"");
      } else {
        q="What kind of note is this?";
        choices=shuffle(["Whole Note","Half Note","Quarter Note"]);
        correct=VAL_NAME[v];
      }
      return { type:"mc", q,
        staff:{clef:"treble",notes:[{p:pitch,d:v}],width:240},
        choices, answer:choices.indexOf(correct),
        explain:`It's a ${VAL_NAME[v]} — ${v==="w"?"hollow head with NO stem":v==="h"?"hollow head WITH a stem":"filled head with a stem"} — worth ${VAL_BEATS[v]} beat${VAL_BEATS[v]>1?"s":""}.`,
        hint:"Check two things: is the head hollow or filled? Does it have a stem?" };
    },
    /* v4 — count the total beats of a short rhythm (params:{maxNotes:3, values:["w","h","q"]}) */
    "rhythm-count": p=>{
      const values=(p&&p.values)||["h","q"];
      const maxNotes=(p&&p.maxNotes)||3;
      const n=1+Math.floor(Math.random()*maxNotes);
      const pat=[]; for(let i=0;i<n;i++) pat.push(pick(values));
      const total=pat.reduce((s,d)=>s+VAL_BEATS[d],0);
      const wrongs=new Set();
      [total-2,total-1,total+1,total+2].forEach(x=>{ if(x>=1&&x!==total) wrongs.add(x); });
      const choices=shuffle([String(total),...shuffle([...wrongs]).slice(0,3).map(String)]);
      return { type:"mc", q:"Count the beats: how many beats do these notes add up to?",
        staff:{clef:"treble",notes:pat.map(d=>({p:"B4",d})),width:260},
        choices, answer:choices.indexOf(String(total)),
        explain:`${pat.map(d=>VAL_NAME[d]+" ("+VAL_BEATS[d]+")").join(" + ")} = ${total} beat${total>1?"s":""}.`,
        hint:"Whole = 4, Half = 2, Quarter = 1 — add them one note at a time." };
    }
  };
  function expand(quizArr){
    const out=[];
    quizArr.forEach(q=>{
      if(q.gen){ const n=q.count||1; for(let i=0;i<n;i++) out.push(generators[q.gen](q.params||{})); }
      else out.push(q);
    });
    return out;
  }
  function hash(s){ let h=5381; for(let i=0;i<s.length;i++) h=((h<<5)+h+s.charCodeAt(i))>>>0; return h; }
  function makeCode(lesson,score,total){
    const d=new Date(); const mmdd=(d.getMonth()+1)*100+d.getDate();
    const pct10=Math.round(10*score/total); /* store score out of 10 regardless of quiz size */
    const payload=(lesson*100000)+(pct10*1000)+mmdd;
    const p36=payload.toString(36).toUpperCase().padStart(4,"0");
    const c36=(hash(SALT+payload).toString(36).toUpperCase()+"0000").slice(0,4);
    return "MF"+String(lesson).padStart(2,"0")+"-"+p36+"-"+c36;
  }
  function verifyCode(code){
    const m=String(code).trim().toUpperCase().match(/^MF(\d{2})-([0-9A-Z]+)-([0-9A-Z]{4})$/);
    if(!m) return {valid:false};
    const payload=parseInt(m[2],36);
    const c36=(hash(SALT+payload).toString(36).toUpperCase()+"0000").slice(0,4);
    if(c36!==m[3]) return {valid:false};
    const lesson=Math.floor(payload/100000), score=Math.floor(payload/1000)%100, mmdd=payload%1000;
    if(lesson!==+m[1]) return {valid:false};
    return {valid:true,lesson,score,date:Math.floor(mmdd/100)+"/"+(mmdd%100)};
  }
  function progress(){ try{return JSON.parse(localStorage.getItem("mf-progress")||"{}");}catch(e){return{};} }
  function saveProgress(lesson,score,total){
    try{ const p=progress(); const pct=Math.round(100*score/total);
      if(!p[lesson]||p[lesson].best<pct) p[lesson]={best:pct,done:pct>=70};
      localStorage.setItem("mf-progress",JSON.stringify(p)); }catch(e){}
  }
  /* ---------- quiz UI ---------- */
  function mount(el, quizArr, opts){
    opts=opts||{};
    const lesson=opts.lesson, onHint=opts.onHint, onDone=opts.onDone;
    let qs=expand(quizArr), qi=0, score=0, wrongs=[];
    el.innerHTML=`<div class="qnum"></div><div class="big-q" style="text-align:left"></div>
      <div class="q-media"></div><div class="choices"></div>
      <div class="explain" style="display:none"></div>
      <div class="continue-row"><button class="qnext" style="display:none">Next question →</button></div>
      <div class="score-box" style="display:none"></div>`;
    const $=s=>el.querySelector(s);
    function rightIdxOf(q){ return q.type==="truefalse" ? (typeof q.answer==="boolean" ? (q.answer?0:1) : q.answer) : q.answer; }
    function choicesOf(q){ return q.choices||(q.type==="truefalse"?["True","False"]:[]); }
    function show(){
      const q=qs[qi];
      $(".qnum").textContent=`Question ${qi+1} of ${qs.length}`;
      $(".big-q").textContent=q.q;
      const media=$(".q-media"); media.innerHTML="";
      $(".explain").style.display="none"; $(".qnext").style.display="none";
      const ch=$(".choices"); ch.innerHTML="";
      const cs=choicesOf(q); ch.classList.toggle("chips", cs.length>0 && cs.every(c=>String(c).length<=3));
      if(q.staff){ const d=document.createElement("div"); media.appendChild(d); Staff.render(d,q.staff); }
      if(q.type==="listen"){
        const b=document.createElement("button"); b.className="play"; b.textContent="▶ Play"; b.onclick=q.play; media.appendChild(b);
      }
      if(q.type==="click-key"){
        const d=document.createElement("div"); media.appendChild(d);
        let answered=false;
        Keyboard.create(d,Object.assign({},q.kb,{onKey:m=>{ if(answered)return; answered=true; answerClickKey(q,m); }}));
        return;
      }
      choicesOf(q).forEach((c,i)=>{
        const b=document.createElement("button"); b.textContent=c; b.onclick=()=>answer(q,i,b); ch.appendChild(b);
      });
    }
    function feedback(q,ok,rightText){
      const ex=$(".explain");
      ex.innerHTML=(ok?"✓ <b>Correct!</b> ":"✗ <b>Not quite.</b> ")+q.explain;
      ex.style.display="block";
      if(ok){ score++; setTimeout(()=>advance(),1100); }
      else { wrongs.push({q:q.q,right:rightText,explain:q.explain});
        $(".qnext").style.display="inline-block"; if(q.hint && onHint) onHint(q.hint); }
    }
    function answer(q,i,btn){
      const rightIdx=rightIdxOf(q);
      const correct=i===rightIdx;
      [...$(".choices").children].forEach((b,j)=>{ b.disabled=true; if(j===rightIdx) b.classList.add("right"); });
      if(!correct) btn.classList.add("wrongpick");
      feedback(q,correct,choicesOf(q)[rightIdx]);
    }
    function answerClickKey(q,m){
      const ok=m===q.target;
      if(!ok) MFAudio.tone(q.target,0.6,0.4);
      feedback(q,ok,"(the highlighted key)");
    }
    function advance(){ qi++; if(qi<qs.length) show(); else finish(); }
    $(".qnext").onclick=()=>advance();
    function finish(){
      $(".qnum").textContent=""; $(".big-q").textContent=""; $(".q-media").innerHTML=""; $(".choices").innerHTML="";
      $(".explain").style.display="none"; $(".qnext").style.display="none";
      const pct=Math.round(100*score/qs.length), pass=pct>=70;
      saveProgress(lesson,score,qs.length);
      const sb=$(".score-box"); sb.style.display="block";
      sb.innerHTML=`<div class="score-big">${score} / ${qs.length}</div>
        <p style="font-size:1.2rem;font-weight:700;color:var(--primary)">${pct}%</p>
        <p>${pct>=90?"Outstanding!":pct>=70?"Nice work — you passed!":"Good try — review and go again. New questions every time!"}</p>
        ${pass?`<p style="margin-top:10px;font-size:14px;color:var(--muted)">Your completion code (submit in the LMS):</p>
        <span class="code-chip">${makeCode(lesson,score,qs.length)}</span>`:""}
        <div class="continue-row">
          ${wrongs.length?`<button class="ghost qreview">\u{1F4DD} Review incorrect answers (${wrongs.length})</button>`:""}
          <button class="ghost qretry">↻ Retry quiz</button>
        </div>
        <div class="qwrongs" style="display:none;text-align:left"></div>`;
      if(wrongs.length){
        const wl=sb.querySelector(".qwrongs");
        wl.innerHTML=wrongs.map(w=>`<div class="explain" style="display:block;margin-top:10px"><b>${w.q}</b><br>Correct answer: <b>${w.right}</b><br>${w.explain}</div>`).join("");
        sb.querySelector(".qreview").onclick=()=>{ wl.style.display=wl.style.display==="none"?"block":"none"; };
      }
      sb.querySelector(".qretry").onclick=()=>{ qs=expand(quizArr); qi=0; score=0; wrongs=[]; sb.style.display="none"; show(); };
      if(onDone) onDone(score,qs.length,pass);
    }
    show();
  }
  /* ---------- practice drill: one at a time, auto-advance; supports fixed items ---------- */
  function drill(el, itemList){
    const queue=[];
    itemList.forEach(g=>{
      if(g.gen){ for(let i=0;i<(g.count||10);i++) queue.push(g); }
      else queue.push({fixedQ:g});
    });
    queue.sort(()=>Math.random()-.5);
    let done=0, right=0;
    el.innerHTML=`<div class="qnum p-prog"></div><div class="p-body"></div>`;
    const prog=el.querySelector(".p-prog"), body=el.querySelector(".p-body");
    function next(){
      if(done>=queue.length){
        body.innerHTML=`<div class="score-box" style="display:block">
          <div class="score-big">${right} / ${queue.length}</div>
          <p>Practice complete! ${right>=queue.length*0.8?"You're ready for the quiz. \u{1F31F}":"One more round builds confidence — or jump into the quiz."}</p>
          <div class="continue-row"><button class="ghost p-again">↻ Practice again (new questions)</button></div></div>`;
        prog.textContent="";
        body.querySelector(".p-again").onclick=()=>{ done=0; right=0; queue.sort(()=>Math.random()-.5); next(); };
        return;
      }
      prog.textContent=`Practice ${done+1} of ${queue.length}`;
      const g=queue[done];
      const q=g.gen? generators[g.gen](g.params||{}) : g.fixedQ;
      const choices=q.choices||(q.type==="truefalse"?["True","False"]:[]);
      const rightIdx=q.type==="truefalse"?(typeof q.answer==="boolean"?(q.answer?0:1):q.answer):q.answer;
      const chips=choices.length>0 && choices.every(c=>String(c).length<=3);
      body.innerHTML=`<div class="big-q" style="text-align:left">${q.q}</div><div class="p-media"></div><div class="choices${chips?" chips":""}"></div><div class="explain" style="display:none"></div>`;
      const media=body.querySelector(".p-media");
      if(q.staff){ const d=document.createElement("div"); media.appendChild(d); Staff.render(d,q.staff); }
      if(q.type==="listen"){ const b=document.createElement("button"); b.className="play"; b.textContent="▶ Play"; b.onclick=q.play; media.appendChild(b); }
      function after(ok){ done++; if(ok)right++; setTimeout(next, ok?900:2000); }
      if(q.type==="click-key"){
        const d=document.createElement("div"); media.appendChild(d);
        let answered=false;
        Keyboard.create(d,Object.assign({},q.kb,{onKey:m=>{ if(answered)return; answered=true;
          const ok=m===q.target; if(!ok) MFAudio.tone(q.target,.6,.4);
          const ex=body.querySelector(".explain"); ex.innerHTML=(ok?"✓ <b>Correct!</b> ":"✗ <b>Not quite.</b> ")+q.explain; ex.style.display="block";
          after(ok); }}));
        return;
      }
      choices.forEach((c,i)=>{
        const b=document.createElement("button"); b.textContent=c;
        b.onclick=()=>{ [...body.querySelector(".choices").children].forEach((x,j)=>{x.disabled=true;if(j===rightIdx)x.classList.add("right");});
          const ok=i===rightIdx; if(!ok)b.classList.add("wrongpick");
          const ex=body.querySelector(".explain"); ex.innerHTML=(ok?"✓ <b>Correct!</b> ":"✗ <b>Not quite.</b> ")+q.explain; ex.style.display="block";
          after(ok); };
        body.querySelector(".choices").appendChild(b);
      });
    }
    next();
  }
  return {mount,expand,generators,makeCode,verifyCode,progress,drill};
})();
