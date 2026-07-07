/* Music Fundamentals — THE lesson template (DD-02/DD-03). v2
   Renders every lesson identically from LESSON_CONTENT[n]; validates content;
   wires Mia (restrained, SPEC §6.4) and the Ask-Mia menu.
   v2 adds: multiple games (C.games), Mia's Tips card (C.tips), rewards/badge
   (C.rewards), lesson progress bar, custom interactions (type:"custom"),
   optional section order (C.sectionOrder).
   NOTE (maintenance): edit this file by FULL-FILE REWRITE only. */
(function(){
  const n=+document.body.dataset.lesson;
  const C=LESSON_CONTENT[n];
  const app=document.getElementById("app");
  if(!C){ app.innerHTML="<main><div class='mf-warn'>Content file missing for lesson "+n+".</div></main>"; return; }
  const GAMES=C.games||(C.game?[C.game]:[]);

  /* ---------- validation (anti-textbook contract) ---------- */
  const warns=[];
  ["objectives","steps","examples","quiz","vocabulary","mistakes","summary"].forEach(k=>{ if(!C[k]) warns.push("missing section: "+k); });
  if(C.quiz){ const len=Quiz.expand(C.quiz).length; if(len<8||len>25) warns.push("quiz has "+len+" questions (need 8-25)"); }
  let interactions=(C.hook&&C.hook.interact?1:0)+(C.steps||[]).filter(s=>s.try).length+(C.keyboard?1:0)+GAMES.length+(C.practice?1:0);
  if(interactions<2) warns.push("fewer than 2 hands-on interactions before the quiz");

  /* ---------- build sections ---------- */
  document.title=`Lesson ${n} · Music Fundamentals`;
  const S={};

  if(C.hook) S.secHook=`<section class="card" id="secHook"><span class="tag">Welcome</span>
    ${Teacher.bubbleHTML(C.hook.say)}<div id="hookBody"></div><p class="feedback" id="hookFb"></p></section>`;

  S.secObjectives=`<section class="card" id="secObjectives"><h2>Today's mission</h2><ul class="objectives">${C.objectives.map(o=>`<li>${o}</li>`).join("")}</ul></section>`;

  let learn=`<section class="card" id="secLearn"><h2>Learn by doing</h2>`;
  C.steps.forEach((s,i)=>{
    learn+=`<div class="step${i===0?" open":""}" id="step${i}">
      ${i>0?'<hr class="sep">':""}${Teacher.bubbleHTML(s.say)}
      <div class="show" id="show${i}"></div><div class="try" id="try${i}"></div>
      <p class="feedback" id="fb${i}"></p></div>`;
  });
  learn+=`<div class="continue-row"><button id="contBtn">Continue ↓</button></div></section>`;
  S.secLearn=learn;

  let ex=`<section class="card step" id="secExample"><h2>Hear it in real music</h2>`;
  C.examples.forEach((e,i)=>{
    ex+=`${e.caption?Teacher.bubbleHTML(e.caption):""}<div id="ex${i}"></div>
      ${e.playable!==false?`<div style="text-align:center"><button class="play" id="exBtn${i}">▶ Play the example</button></div>`:""}`;
  });
  S.secExample=ex+`</section>`;

  if(C.keyboard) S.secKb=`<section class="card step" id="secKb"><h2>\u{1F3B9} At the keyboard</h2>
    ${Teacher.bubbleHTML(C.keyboard.intro)}<div id="kbBody"></div><div class="kb-note" id="kbNote"></div>
    ${C.keyboard.demo?`<div style="text-align:center"><button class="play" id="kbDemoBtn">▶ Watch Mia play it</button></div>`:""}</section>`;

  if(C.practice) S.secPractice=`<section class="card step" id="secPractice"><h2>\u{270F}\u{FE0F} Practice</h2>
    ${Teacher.bubbleHTML(C.practiceIntro||"Let's drill it in — one question at a time. Answer right and the next appears automatically!")}
    <div id="practiceBody"></div></section>`;

  GAMES.forEach((g,gi)=>{
    S["secGame"+gi]=`<section class="card step" id="secGame${gi}"><h2>\u{1F3AE} ${g.title||"Mini-game"}</h2>
      ${Teacher.bubbleHTML(g.intro)}<div id="gameBody${gi}"></div></section>`;
  });

  S.secQuiz=`<section class="card step" id="secQuiz"><h2>✅ Final Quiz</h2>
    <p style="font-size:14px;color:var(--muted)">${Quiz.expand(C.quiz).length} questions — several are freshly generated each attempt. Difficulty builds as you go.</p>
    <div id="quizBody"></div>
    ${C.rewards?`<div id="rewardBox" class="score-box" style="display:none"></div>`:""}</section>`;

  S.secVocab=`<section class="card" id="secVocab"><h2>Vocabulary <span style="font-weight:400;font-size:13px;color:var(--muted)">(tap a card to flip it)</span></h2>
    <div class="vox">${C.vocabulary.map((v,vi)=>`<div class="vox-card" role="button" tabindex="0"><div class="vox-front"><b>${v.term}</b>${v.staff?`<div class="vox-sym" data-vi="${vi}"></div>`:""}</div><div class="vox-back">${v.def}</div></div>`).join("")}</div></section>`;

  S.secReview=`<section class="card step" id="secReview"><h2>Remember!</h2>
    <ul class="summary">${C.summary.map(s=>`<li>${s}</li>`).join("")}</ul>
    ${(C.mistakes&&C.mistakes.length)?`<h2 style="margin-top:18px">Oops! Watch out for…</h2>
    <ul class="mistakes">${C.mistakes.map(m=>`<li class="oops">${m}</li>`).join("")}</ul>`:""}</section>`;

  if(C.tips) S.secTips=`<section class="card step" id="secTips"><h2>\u{1F4A1} Mia's Tips</h2>
    ${C.tips.map(t=>Teacher.bubbleHTML(t)).join("")}</section>`;

  S.secNext=`<div class="step" id="secNext">${Nav.nextInvite(n)}</div>`;

  const defaultOrder=[...(C.hook?["secHook"]:[]),"secObjectives","secVocab","secLearn","secExample",
    ...(C.keyboard?["secKb"]:[]),...(C.practice?["secPractice"]:[]),
    ...GAMES.map((_,i)=>"secGame"+i),"secQuiz","secReview",...(C.tips?["secTips"]:[]),"secNext"];
  let baseOrder=C.sectionOrder?[...C.sectionOrder]:defaultOrder;
  if(C.sectionOrder&&!baseOrder.includes("secVocab")){ const vi2=baseOrder.indexOf("secObjectives"); baseOrder.splice(vi2>=0?vi2+1:1,0,"secVocab"); }
  const ORDER=baseOrder.filter(id=>S[id]);

  let html=Nav.header(n)+`<div class="lesson-progress"><div class="lesson-progress-fill" id="lpFill"></div></div><main>`;
  if(warns.length) html+=`<div class="mf-warn"><b>Content check:</b> ${warns.join(" · ")}</div>`;
  html+=ORDER.map(id=>S[id]).join("")+`<div class="always-nav">${Nav.footer(n)}</div></main>`;
  app.innerHTML=html;

  /* ---------- progress bar ---------- */
  const revealable=ORDER.filter(id=>id!=="secHook"&&id!=="secObjectives"&&id!=="secVocab");
  let revealed=1;
  function updateProgress(extra){
    const total=revealable.length+1;
    const pct=Math.min(100,Math.round(100*(revealed+(extra||0))/total));
    const f=document.getElementById("lpFill"); if(f) f.style.width=pct+"%";
  }
  updateProgress();

  /* ---------- interactions ---------- */
  function fb(id,ok,msg){ const e=document.getElementById(id); e.textContent=msg; e.className="feedback "+(ok?"ok":"no"); }

  function mountInteract(container,cfg,fbId){
    const wrongs={count:0};
    const say=(m,o)=>Teacher.say(m,o);
    const onWrong=()=>{ wrongs.count++; if(wrongs.count===2 && cfg.hint) say(cfg.hint,{pose:"think",sticky:true,proactive:true}); };
    switch(cfg.type){
      case "custom":{ cfg.mount(container,(ok,msg)=>{ fb(fbId,ok,msg); if(!ok)onWrong(); }); break; }
      case "keyboard":{
        let low=false,high=false,done=false;
        Keyboard.create(container,{start:cfg.start??60,octaves:cfg.octaves??2,labels:cfg.labels,marks:cfg.marks,
          onKey:m=>{ const mid=(cfg.start??60)+((cfg.octaves??2)*12)/2;
            if(m<mid)low=true; else high=true;
            if(cfg.goal==="low-high"&&low&&high&&!done){ done=true; fb(fbId,true,cfg.success||"✓ You found it!");
              say(cfg.celebrate||"You discovered it yourself!",{pose:"celebrate",proactive:true}); Teacher.celebrate(); }
          }});
        break; }
      case "click-line":{
        Staff.render(container,{clef:cfg.clef||"treble",clickLines:true,width:cfg.width||400,
          onLine:(ln)=>{ if(ln===cfg.line){ fb(fbId,true,cfg.success||`✓ Exactly! Line ${cfg.line} — counted from the bottom.`); }
            else { fb(fbId,false,`Not quite — that's line ${ln}. Count from the bottom.`); onWrong(); } }});
        break; }
      case "click-space":{
        Staff.render(container,{clef:cfg.clef||"treble",clickSpaces:true,width:cfg.width||400,
          onSpace:(sp)=>{ if(sp===cfg.space){ fb(fbId,true,cfg.success||`✓ Space ${cfg.space} it is!`); }
            else { fb(fbId,false,`That's space ${sp} — count spaces from the bottom too.`); onWrong(); } }});
        break; }
      case "click-higher":{
        let heard=new Set();
        Staff.render(container,{clef:cfg.clef||"treble",notes:cfg.notes.map(p=>({p,d:"q"})),clickNotes:true,width:cfg.width||400,
          onNote:(i,p)=>{ MFAudio.tone(MFAudio.midi(p)); heard.add(i);
            if(heard.size<2){ const e=document.getElementById(fbId); e.textContent="…now the other one!"; e.className="feedback"; return; }
            const idxs=cfg.notes.map(x=>Staff.dia(x));
            const hi=idxs.indexOf(Math.max(...idxs));
            if(i===hi){ fb(fbId,true,"✓ The note sitting higher IS the higher pitch!"); }
            else { fb(fbId,false,"Listen again — which one sits higher on the staff?"); onWrong(); } }});
        break; }
      case "press-play":{
        const api=Staff.render(container,{...cfg.staff});
        const b=document.createElement("button"); b.className="play"; b.textContent=cfg.button||"▶ Watch & listen";
        const row=document.createElement("div"); row.style.textAlign="center"; row.appendChild(b); container.appendChild(row);
        b.onclick=()=>{ Staff.play(cfg.staff,api);
          setTimeout(()=>fb(fbId,true,cfg.after||"✓ Hear how the sound follows the notation?"), (cfg.staff.notes.length*0.65+0.5)*1000); };
        break; }
      case "click-key":{
        Keyboard.create(container,{start:cfg.start??60,octaves:cfg.octaves??2,labels:cfg.labels,
          onKey:m=>{ if(m===cfg.target){ fb(fbId,true,cfg.success||"✓ That's the one!"); }
            else { fb(fbId,false,"Not that key — listen and look at the black-key groups."); onWrong(); } }});
        break; }
      case "mc":{
        const ch=document.createElement("div"); ch.className="choices"; container.appendChild(ch);
        if(cfg.choices.every(c=>String(c).length<=14)) ch.classList.add("chips");
        cfg.choices.forEach((c,i)=>{ const b=document.createElement("button"); b.textContent=c;
          b.onclick=()=>{ if(i===cfg.answer){ [...ch.children].forEach(x=>x.disabled=true); b.classList.add("right"); fb(fbId,true,cfg.success||"✓ Correct!"); }
            else { b.classList.add("wrongpick"); b.disabled=true; fb(fbId,false,cfg.fail||"Not quite — try another."); onWrong(); } };
          ch.appendChild(b); });
        break; }
    }
  }

  if(C.hook&&C.hook.interact) mountInteract(document.getElementById("hookBody"),C.hook.interact,"hookFb");
  C.steps.forEach((s,i)=>{
    if(s.show){ const el=document.getElementById("show"+i);
      if(s.show.type==="staff") Staff.render(el,s.show.spec);
      else if(s.show.type==="keyboard") Keyboard.create(el,s.show.spec);
      else if(s.show.type==="html") el.innerHTML=s.show.html;
      else if(s.show.type==="custom") s.show.mount(el);
    }
    if(s.try) mountInteract(document.getElementById("try"+i),s.try,"fb"+i);
  });

  /* progressive reveal */
  const reveal=[...C.steps.map((_,i)=>"step"+i).slice(1),...ORDER.filter(id=>!["secHook","secObjectives","secVocab","secLearn"].includes(id))];
  let oi=0;
  const INTROS={};
  GAMES.forEach((g,gi)=>{ if(g.miaIntro) INTROS["secGame"+gi]=g.miaIntro; });
  if(C.miaQuizIntro) INTROS.secQuiz=C.miaQuizIntro;
  document.getElementById("contBtn").onclick=function(){
    if(oi<reveal.length){ const id=reveal[oi++]; const el=document.getElementById(id);
      el.classList.add("open"); el.scrollIntoView({behavior:"smooth",block:"start"});
      if(!id.startsWith("step")){ revealed++; updateProgress(); }
      if(INTROS[id]) setTimeout(()=>Teacher.say(INTROS[id],{pose:"point",proactive:true}),500); }
    if(oi>=reveal.length) this.parentElement.style.display="none";
  };

  /* examples (v3.2: optional e.kb = Keyboard.create opts — marked keyboard under the staff,
     so scale examples show their half steps and black keys on the piano too) */
  C.examples.forEach((e,i)=>{
    const host=document.getElementById("ex"+i);
    const api=Staff.render(host,e.staff);
    if(e.kb){ const k=document.createElement("div"); k.style.marginTop="10px"; host.appendChild(k); Keyboard.create(k,e.kb); }
    const b=document.getElementById("exBtn"+i); if(b) b.onclick=()=>Staff.play(e.staff,api);
  });
  /* keyboard */
  if(C.keyboard){
    const kbApi=Keyboard.create(document.getElementById("kbBody"),{start:C.keyboard.start??60,octaves:C.keyboard.octaves??2,labels:C.keyboard.labels,marks:C.keyboard.marks});
    const db=document.getElementById("kbDemoBtn");
    if(db) db.onclick=()=>{ kbApi.demo(C.keyboard.demo.map(p=>MFAudio.midi(p)),C.keyboard.demoGap||420); };
  }
  /* practice */
  if(C.practice) Quiz.drill(document.getElementById("practiceBody"),C.practice);
  /* games */
  GAMES.forEach((g,gi)=>{
    Games.mount(document.getElementById("gameBody"+gi),{type:g.type,spec:g.spec,
      onFinish:(sc)=>{ const line=g.result?g.result(sc):null;
        if(line) Teacher.say(line,{pose:"celebrate",proactive:true}); }});
  });
  /* quiz + rewards */
  Quiz.mount(document.getElementById("quizBody"),C.quiz,{lesson:n,
    onHint:h=>Teacher.say(h,{pose:"think"}),
    onDone:(score,total,pass)=>{
      revealed=revealable.length+1; updateProgress();
      if(pass&&C.rewards){
        const stars=score===total?3:(score/total>=0.85?3:score/total>=0.7?2:1);
        const rb=document.getElementById("rewardBox");
        rb.style.display="block";
        rb.innerHTML=`<hr class="sep"><div class="stars">${"⭐".repeat(stars)}</div>
          <div class="badge-card"><span class="badge-icon">${C.rewards.icon||"\u{1F3C5}"}</span>
          <b>${C.rewards.badge}</b> badge earned!</div>`;
        Teacher.celebrate();
      }
      if(score===total){ Teacher.say(C.miaPerfect||"Perfect score! See you in the next lesson — I'll be waiting! \u{1F3B5}",{pose:"celebrate",sticky:true,proactive:true}); Teacher.celebrate(); }
      else if(pass) Teacher.say(C.miaPass||"You passed! Review below, or try again for a perfect run.",{pose:"wave",proactive:true});
      else Teacher.say(C.miaRetry||"Good effort! Peek at the review below, then try again — fresh questions every time.",{pose:"wave",proactive:true});
    }});
  /* vocabulary cards v4 (rebuilt): front = term + symbol, tap swaps to definition */
  document.querySelectorAll(".vox-card").forEach(v=>{
    const go=()=>v.classList.toggle("back");
    v.onclick=go;
    v.onkeydown=e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); go(); } };
  });
  document.querySelectorAll(".vox-sym").forEach(el=>{ const v=C.vocabulary[+el.dataset.vi]; if(v&&v.staff) Staff.render(el,v.staff); });

  /* ---------- Ask-Mia contexts ---------- */
  Teacher.init();
  const mia=C.mia||{};
  function reg(id,label,cfg){ const el=document.getElementById(id); if(el&&cfg) Teacher.registerContext(el,{label,...cfg}); }
  if(C.hook) reg("secHook", (mia.hook&&mia.hook.label)||"this welcome", mia.hook);
  reg("secLearn", (mia.learn&&mia.learn.label)||"this concept", mia.learn);
  reg("secExample", (mia.example&&mia.example.label)||"the example", Object.assign({play:()=>{const b=document.getElementById("exBtn0"); if(b)b.click();}}, mia.example||{}));
  if(C.keyboard) reg("secKb", "the keyboard", Object.assign({piano:()=>{const b=document.getElementById("kbDemoBtn"); if(b)b.click();}}, mia.kb||{}));
  if(C.practice) reg("secPractice", "the practice", mia.practice||mia.learn);
  GAMES.forEach((g,gi)=>reg("secGame"+gi, g.title||"the game", g.mia||mia.game));
  reg("secQuiz", "this question", mia.quiz);

  /* ---------- welcome (proactive #1) ---------- */
  window.addEventListener("load",()=>setTimeout(()=>{
    Teacher.say(C.welcome||`Welcome to Lesson ${n}! Let's go!`,{pose:"wave",chime:false,proactive:true});
  },600));
})();
