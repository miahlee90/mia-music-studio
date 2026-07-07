/* Music Fundamentals — quiz engine (DD-07, DD-19 hybrid generators, DD-20 completion codes) v4
   v2: wrong-answer review list, explicit percentage, drill supports fixed questions.
   v3 (Milestone 2): "line-space" generator supports params:{clef:"bass"}.
   v4 (Milestone 3): adds "note-value" (identify whole/half/quarter or its beats)
   and "rhythm-count" (count the total beats of a short rhythm) generators.
   v4.1 (Milestone 3b): note-value supports params.kind:"rest"; adds
   "measure-complete" (is this measure full?) and "measure-count" (count measures).
   v4.2 (instructor fix): compact chip layout for ALL short answers (<=14 chars,
   was <=3) so answer choices stay scannable; beat-count questions say "in 4/4 time".
   v5 (Units 3-6): note-value supports eighths ("8") and dotted tokens ("h.","q.");
   NEW generators: term-match (Italian terms / symbols ↔ meanings),
   step-type (half vs whole step), enharmonic (same key, two names).
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
  const VAL_NAME={w:"Whole Note",h:"Half Note",q:"Quarter Note","8":"Eighth Note","h.":"Dotted Half Note","q.":"Dotted Quarter Note"};
  const VAL_BEATS={w:4,h:2,q:1,"8":0.5,"h.":3,"q.":1.5};
  const BEATLBL={0.5:"\u00bd beat",1:"1 beat",1.5:"1\u00bd beats",2:"2 beats",3:"3 beats",4:"4 beats"};
  const tokDot=t=>String(t).endsWith("."), tokBase=t=>String(t).replace(".","");
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
    /* v4/v5 — identify a note value (or rest) by sight
       (params:{values:["w","h","q","8","h.","q."], ask:"name"|"beats", kind:"note"|"rest"}) */
    "note-value": p=>{
      const values=(p&&p.values)||["w","h","q"];
      const isRest=(p&&p.kind)==="rest";
      const v=pick(values), askBeats=(p&&p.ask)==="beats"||((!p||!p.ask)&&Math.random()<.5);
      const pitch=pick(["G4","B4","D5","F4","A4","E4","C5"]);
      const NAMES=isRest?{w:"Whole Rest",h:"Half Rest",q:"Quarter Rest","8":"Eighth Rest"}:VAL_NAME;
      const SHAPE=isRest
        ?{w:"it hangs BELOW the 4th line (the hole)",h:"it sits ON the 3rd line (the hat)",q:"the squiggly symbol","8":"the little seven with a dot"}
        :{w:"hollow head with NO stem",h:"hollow head WITH a stem",q:"filled head with a stem","8":"filled head with a stem and a flag","h.":"a half note PLUS a dot (2 + 1)","q.":"a quarter note PLUS a dot (1 + \u00bd)"};
      let choices,correct,q;
      function build(correctVal,all){
        const others=shuffle(all.filter(x=>x!==correctVal));
        return shuffle([correctVal,...others.slice(0,3)]);
      }
      if(askBeats){
        q=isRest?"In 4/4 time, how many beats of SILENCE does this rest receive?":"In 4/4 time, how many beats does this note receive?";
        correct=BEATLBL[VAL_BEATS[v]];
        let all=[...new Set(values.map(x=>BEATLBL[VAL_BEATS[x]]))];
        if(all.length<3) all=[...new Set([...all,...Object.values(BEATLBL)])];
        choices=build(correct,all);
      } else {
        q=isRest?"What kind of rest is this?":"What kind of note is this?";
        correct=NAMES[v];
        let all=[...new Set(values.map(x=>NAMES[x]))];
        if(all.length<3) all=[...new Set([...all,...Object.values(NAMES)])];
        choices=build(correct,all);
      }
      return { type:"mc", q,
        staff:{clef:"treble",notes:[isRest?{rest:tokBase(v)}:{p:pitch,d:tokBase(v),dot:tokDot(v)}],width:240},
        choices, answer:choices.indexOf(correct),
        explain:`It's a ${NAMES[v]} — ${SHAPE[v]||""} — worth ${BEATLBL[VAL_BEATS[v]]}${isRest?" of silence":""}.`,
        hint:isRest?"Hole hangs down (whole), hat sits on top (half), squiggle = quarter, little seven = eighth."
                   :"Check the head, the stem, any flag — and don\u2019t miss a DOT (dot = +half the value)." };
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
    },
    /* v4.1 — is this measure complete? (params:{beats:4, rests:false}) */
    "measure-complete": p=>{
      const target=(p&&p.beats)||4, useRests=!!(p&&p.rests);
      const complete=Math.random()<.5;
      const sum=complete?target:1+Math.floor(Math.random()*(target-1));
      const toks=[]; let r=sum;
      while(r>0){ const opts=["q"]; if(r>=2)opts.push("h"); if(r>=4&&sum===4)opts.push("w");
        const v=pick(opts); toks.push(v); r-=VAL_BEATS[v]; }
      const items=toks.map(v=>(useRests&&Math.random()<.35)?{rest:v}:{p:"B4",d:v});
      const mathTxt=toks.map(v=>VAL_BEATS[v]).join(" + ")+" = "+sum;
      return { type:"truefalse",
        q:`True or false: this measure is COMPLETE (exactly ${target} beats).`,
        staff:{clef:"treble",time:target+"/4",notes:[...items,{bar:"final"}],width:300},
        answer:complete,
        explain:`Add the values: ${mathTxt} beat${sum>1?"s":""} — ${complete?"exactly "+target+", complete.":"it still needs "+(target-sum)+" more."}`,
        hint:"Add every note (and rest) — the total must match the top number." };
    },
    /* v4.1 — how many measures? (params:{min:2,max:4}) */
    "measure-count": p=>{
      const min=(p&&p.min)||2, max=(p&&p.max)||4;
      const n=min+Math.floor(Math.random()*(max-min+1));
      const FILL=[["w"],["h","h"]];
      const items=[];
      for(let m=1;m<=n;m++){ pick(FILL).forEach(d=>items.push({p:"B4",d})); items.push({bar:m<n?"single":"final"}); }
      const wrongs=[]; for(let x=min;x<=max+1;x++) if(x!==n) wrongs.push(String(x));
      const choices=shuffle([String(n),...shuffle(wrongs).slice(0,3)]);
      return { type:"mc", q:"How many measures does this staff contain?",
        staff:{clef:"treble",notes:items,width:340},
        choices, answer:choices.indexOf(String(n)),
        explain:`${n} measures — count the spaces BETWEEN the bar lines; the double bar closes the last one.`,
        hint:"Count the containers, not the lines." };
    }

    ,
    /* v5 — term/symbol ↔ meaning (params:{pool:[[term,meaning],…], subject:"dynamic marking"}) */
    "term-match": p=>{
      const pool=(p&&p.pool)||[];
      const [term,meaning]=pick(pool);
      const rev=(p&&p.reverse)? Math.random()<.5 : false;
      const correct=rev? term : meaning;
      const wrongs=shuffle(pool.filter(x=>x[0]!==term)).slice(0,3).map(x=>rev?x[0]:x[1]);
      const choices=shuffle([correct,...wrongs]);
      return { type:"mc",
        q:rev? `Which ${(p&&p.subject)||"term"} means \u201c${meaning}\u201d?` : `What does ${term} mean?`,
        choices, answer:choices.indexOf(correct),
        explain:`${term} = ${meaning}.`,
        hint:(p&&p.hint)||"Think back to the matching cards." };
    },
    /* v5 — half step or whole step (params:{show:"staff"|"none"}) */
    "step-type": p=>{
      const HALF=[["E4","F4"],["B4","C5"],["C4","C#4"],["F4","F#4"],["A4","Bb4"],["D4","Eb4"]];
      const WHOLE=[["C4","D4"],["F4","G4"],["A4","B4"],["D4","E4"],["G4","A4"]];
      const isHalf=Math.random()<.5;
      const [a,b]=pick(isHalf?HALF:WHOLE);
      const name=x=>x.replace(/(\d)/,"").replace("#","\u266f").replace("b","\u266d");
      const correct=isHalf?"Half step":"Whole step";
      const choices=shuffle(["Half step","Whole step"]);
      return { type:"mc", q:`From ${name(a)} to ${name(b)} is a \u2026`,
        staff:(p&&p.show)==="none"?undefined:{clef:"treble",notes:[{p:a,d:"q"},{p:b,d:"q"}],width:240},
        choices, answer:choices.indexOf(correct),
        explain:`${name(a)} \u2192 ${name(b)} = ${correct.toLowerCase()} — ${isHalf?"the very next key, nothing in between":"two half steps, one key is skipped"}.`,
        hint:"Picture the keyboard: is there a key BETWEEN them?" };
    },
    /* v5.2 — name the major key from a key signature
       (params:{kind:"sharp"|"flat"|"both", max:1..4, clef:"treble"|"bass"|"both"}) */
    "keysig-id": p=>{
      const SH=[["G",1],["D",2],["A",3],["E",4]], FL=[["F",1],["Bb",2],["Eb",3],["Ab",4]];
      const kind=(p&&p.kind)||"both", max=(p&&p.max)||4;
      const pool=(kind==="sharp"?SH:kind==="flat"?FL:[...SH,...FL]).filter(k=>k[1]<=max);
      const [key,n]=pick(pool);
      const isFlat=FL.some(k=>k[0]===key);
      const disp=k=>k.replace("b","\u266d")+" Major";
      const clef=(p&&p.clef&&p.clef!=="both")? p.clef : pick(["treble","bass"]);
      const all=[...new Set((kind==="sharp"?SH:kind==="flat"?FL:[...SH,...FL]).map(k=>disp(k[0])))];
      const correct=disp(key);
      const choices=shuffle([correct,...shuffle(all.filter(c=>c!==correct)).slice(0,3)]);
      const ORDS=["F\u266f","C\u266f","G\u266f","D\u266f"], ORDF=["B\u266d","E\u266d","A\u266d","D\u266d"];
      const expl=isFlat
        ? (n===1? "One flat (B\u266d) alone is the exception — it is always F Major."
                : `The flats are ${ORDF.slice(0,n).join(", ")} — the NEXT-TO-LAST flat (${ORDF[n-2]}) names the key: ${correct}.`)
        : `The sharps are ${ORDS.slice(0,n).join(", ")} — one half step UP from the last sharp (${ORDS[n-1]}) gives ${correct}.`;
      return { type:"mc", q:"Name this major key signature.",
        staff:{clef, keysig:key, notes:[], width:220},
        choices, answer:choices.indexOf(correct),
        explain:expl,
        hint:isFlat? "Next-to-last flat = the key name (one flat alone = F Major)."
                   : "Find the last sharp, then go up one half step." };
    },
    /* v5 — enharmonic pairs */
    "enharmonic": ()=>{
      const PAIRS=[["C\u266f","D\u266d"],["D\u266f","E\u266d"],["F\u266f","G\u266d"],["G\u266f","A\u266d"],["A\u266f","B\u266d"]];
      const [a,b]=pick(PAIRS);
      const askA=Math.random()<.5;
      const target=askA?a:b, correct=askA?b:a;
      const wrongs=shuffle(PAIRS.filter(x=>x[0]!==a).map(x=>pick(x))).slice(0,3);
      const choices=shuffle([correct,...wrongs]);
      return { type:"mc", q:`Which note sounds exactly the same as ${target}?`,
        choices, answer:choices.indexOf(correct),
        explain:`${a} and ${b} are ENHARMONIC — two names for the same piano key.`,
        hint:"Same black key — approached from the left or from the right." };
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
      const cs=choicesOf(q); ch.classList.toggle("chips", cs.length>0 && cs.every(c=>String(c).length<=14));
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
      const chips=choices.length>0 && choices.every(c=>String(c).length<=14);
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
