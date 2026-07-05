/* Lesson 10 — 2/4 Time Signature (AEMT Book 1, Unit 3)
   Built from drafts/UNIT 3 – Lessons 10 & 11.md (combined draft — pages stay separate, DD-12).
   QA note honored: 2/4 = MARCH ("Left–Right") repeated across steps, games, quiz.
   NOTE: edit by FULL-FILE REWRITE only. */

/* march-or-waltz listening drill (unique L10 prefix) */
function MF_L10_marchWaltz(container,fb,rounds){
  const seq=[]; for(let i=0;i<rounds;i++) seq.push(i%2===0?2:3);
  seq.sort(()=>Math.random()-.5);
  let i=0,played=false;
  container.innerHTML=`<div class="big-q mw-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play mw-play">▶ Listen</button></div>
    <div class="choices mw-ch" style="display:none"><button>\u{1F941} March (2/4)</button><button>\u{1F483} Waltz (3/4)</button></div>`;
  const q=container.querySelector(".mw-q"), ch=container.querySelector(".mw-ch"), btn=container.querySelector(".mw-play");
  function ask(){ q.textContent=`Round ${i+1} of ${seq.length}: march or waltz?`; played=false; ch.style.display="none"; }
  btn.onclick=()=>{
    const n=seq[i], spb=60/96;
    for(let k=0;k<n*3;k++) MFAudio.click(k*spb, k%n===0?.6:.3, k%n===0);
    played=true;
    setTimeout(()=>{ ch.style.display=""; }, n*3*spb*1000+250);
  };
  [...ch.children].forEach((b,bi)=>b.onclick=()=>{
    if(!played){ fb(false,"Listen first!"); return; }
    const said=bi===0?2:3, ok=said===seq[i];
    if(ok){ i++;
      if(i>=seq.length){ ch.style.display="none"; btn.style.display="none"; q.textContent="Perfect ears!";
        fb(true,"✓ You told every march from every waltz — STRONG-weak is 2/4, STRONG-weak-weak is 3/4!"); }
      else { fb(true,`✓ Yes — ${seq[i-1]===2?"STRONG-weak, Left-Right — a march in 2/4!":"ONE-two-three — a waltz in 3/4!"} Next…`); ask(); } }
    else fb(false,"Count the strong beats: STRONG-weak = 2, STRONG-weak-weak = 3. Play it again!");
  });
  ask();
}

LESSON_CONTENT[10]={
  welcome:"Unit 3 begins — left, right, left, right! \u{1F941}",
  hook:{
    say:"Have you ever noticed that some songs make you want to <b>march</b>, and others make you want to <b>dance</b>? Different time signatures create different rhythmic feelings. Press play and feel this one — <b>march or dance?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center"><button class="play hk-play">▶ Feel it</button></div>
          <div class="choices hk-ch" style="display:none"><button>\u{1F941} March — STRONG-weak</button><button>\u{1F483} Dance — STRONG-weak-weak</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-play").onclick=()=>{
          const spb=60/96; for(let k=0;k<8;k++) MFAudio.click(k*spb,k%2===0?.6:.3,k%2===0);
          setTimeout(()=>{ ch.style.display=""; },8*spb*1000+250);
        };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Left-Right, Left-Right — a MARCH! That steady STRONG-weak pulse is today's time signature: 2/4.");
          else fb(false,"Listen again — the strong beat comes every TWO beats: STRONG-weak, like marching feet.");
        });
      } }
  },
  objectives:[
    "Identify the 2/4 time signature",
    "Count two beats in each measure",
    "Recognize the marching feel of 2/4 time",
    "Count rhythms using quarter notes",
    "Complete measures correctly in 2/4 time",
    "Tell 2/4 apart from other time signatures"
  ],
  steps:[
    { say:"Meet <b>2/4 time</b>. The top number says <b>2 beats in every measure</b>; the bottom 4 says the <b>quarter note gets one beat</b> — the same beat note you already know. \u{1F447}",
      show:{ type:"staff", spec:{clef:"treble",time:"2/4",notes:[{p:"C4",d:"q",label:"1"},{p:"G4",d:"q",label:"2"},{bar:"single"},{p:"E4",d:"q",label:"1"},{p:"C4",d:"q",label:"2"},{bar:"final"}],width:400} },
      try:{ type:"mc",
        choices:["2 beats per measure","4 beats per measure","2 measures per beat"], answer:0,
        success:"✓ Top number 2 = two beats in every container. Small measures, quick turnaround!",
        fail:"Read the TOP number — how many beats fit in each measure?",
        hint:"Top = how many. Bottom = which note." } },
    { say:"2/4 is <b>marching time</b>: <b>STRONG – weak</b>, Left – Right, ONE-two. \u{1F447} <b>March along — tap on every beat, and stomp beat 1 in your mind:</b>",
      try:{ type:"custom",
        hint:"The accented click is always beat ONE — your left foot.",
        mount:(container,fb)=>{
          const tempo=96, spb=60/tempo, total=8;
          let t0=0,taps=[],on=false,timers=[];
          container.innerHTML=`<div class="big-q mt-q" style="text-align:center">Count-in, then TAP every beat: ONE-two, ONE-two!</div>
            <div style="text-align:center"><button class="play mt-start">▶ Start marching</button>
            <button class="play mt-tap" style="display:none;min-width:200px;padding:20px 28px;font-size:1.25rem">\u{1F462} TAP</button></div>
            <div class="mt-count" style="text-align:center;font-size:2rem;font-weight:800;color:var(--primary);min-height:44px"></div>`;
          const q=container.querySelector(".mt-q"), cnt=container.querySelector(".mt-count"),
                sB=container.querySelector(".mt-start"), tB=container.querySelector(".mt-tap");
          tB.onclick=()=>{ if(!on)return; taps.push(performance.now()-t0); MFAudio.click(0,.35); };
          sB.onclick=()=>{
            sB.style.display="none"; taps=[]; timers.forEach(clearTimeout); timers=[];
            MFAudio.ac();
            for(let i=0;i<2;i++) MFAudio.click(i*spb,.5,i===0);
            for(let i=0;i<total;i++) MFAudio.click((2+i)*spb,.5,i%2===0);
            t0=performance.now();
            for(let i=0;i<total;i++) timers.push(setTimeout(()=>{cnt.textContent=i%2===0?"ONE":"two";},(2+i)*spb*1000));
            timers.push(setTimeout(()=>{ tB.style.display="inline-block"; on=true; },Math.max(0,2*spb*1000-400)));
            timers.push(setTimeout(()=>{
              on=false; tB.style.display="none"; cnt.textContent="";
              const tol=spb*0.45*1000, expected=[]; for(let i=0;i<total;i++) expected.push((2+i)*spb*1000);
              const used=new Set(); let hits=0;
              expected.forEach(t=>{ let best=-1,bd=1e9;
                taps.forEach((tp,j)=>{ if(used.has(j))return; const d=Math.abs(tp-t); if(d<bd){bd=d;best=j;} });
                if(best>=0&&bd<=tol){ used.add(best); hits++; } });
              sB.style.display="inline-block"; sB.textContent="▶ March again";
              if(hits>=6) fb(true,`✓ ${hits} of ${total} right on the beat — ONE-two, ONE-two, a perfect march!`);
              else fb(false,`${hits} of ${total}. Say “ONE-two” OUT LOUD with the clicks and march again!`);
            },(2+total)*spb*1000+600));
          };
        } } },
    { say:"Each 2/4 measure holds exactly <b>2 beats</b> — a small container that fills up fast. \u{1F447} <b>Build TWO different 2-beat measures:</b>",
      try:{ type:"custom",
        hint:"Half = 2, Quarter = 1. Only 2 beats fit — the whole note is too big!",
        mount:(container,fb)=>{
          const B={h:2,q:1};
          let cur=[],sum=0,found=[];
          container.innerHTML=`<div class="b2-staff"></div><div class="big-q b2-q" style="text-align:center"></div>
            <div class="choices b2-ch"><button data-v="h">Half (2)</button><button data-v="q">Quarter (1)</button><button class="ghost" data-v="x">↺ Clear</button></div>`;
          const st=container.querySelector(".b2-staff"), q=container.querySelector(".b2-q");
          function draw(){
            Staff.render(st,{clef:"treble",time:"2/4",notes:[...cur.map(d=>({p:"B4",d})),{bar:"final"}],width:300});
            q.textContent=`Beats: ${sum} of 2 · Measures built: ${found.length} of 2`;
          }
          [...container.querySelectorAll(".b2-ch button")].forEach(b=>b.onclick=()=>{
            const v=b.dataset.v;
            if(v==="x"){ cur=[];sum=0;draw(); return; }
            if(sum+B[v]>2){ fb(false,`Too many — a 2/4 measure holds exactly 2 beats!`); return; }
            cur.push(v); sum+=B[v]; MFAudio.tone(71,B[v]*.4); draw();
            if(sum===2){
              const key=cur.slice().sort().join("");
              if(found.includes(key)){ fb(false,"Same combination — clear and find the OTHER way!"); cur=[];sum=0; setTimeout(draw,900); return; }
              found.push(key);
              let t=0; cur.forEach(d=>{ MFAudio.tone(71,B[d]*.45,t); t+=B[d]*.5; });
              if(found.length>=2){ container.querySelector(".b2-ch").style.display="none"; q.textContent="Both ways found!";
                fb(true,"✓ Two quarters OR one half — those are the only two ways to fill a 2/4 measure with today's notes!"); }
              else { fb(true,"✓ Exactly 2 beats! Now the OTHER combination…"); cur=[];sum=0; setTimeout(draw,1100); }
            }
          });
          draw();
        } } },
    { say:"Your ears can tell time signatures apart! A march pulses <b>STRONG-weak</b>; a waltz pulses <b>STRONG-weak-weak</b> (that's 3/4 — next lesson!). \u{1F447} <b>March or waltz?</b>",
      try:{ type:"custom",
        hint:"Count how many beats pass between the STRONG clicks: 2 = march, 3 = waltz.",
        mount:(container,fb)=>MF_L10_marchWaltz(container,fb,4) } },
    { say:"Let's READ a march. Count out loud — <b>ONE-two | ONE-two</b> — and notice the count restarting at every bar line. \u{1F447}",
      try:{ type:"custom",
        hint:"Two beats per measure — the half note fills a whole measure by itself.",
        mount:(container,fb)=>{
          const spec={clef:"treble",time:"2/4",tempo:96,
            notes:[{p:"C4",d:"q",label:"1"},{p:"E4",d:"q",label:"2"},{bar:"single"},{p:"G4",d:"q",label:"1"},{p:"E4",d:"q",label:"2"},{bar:"single"},{p:"C4",d:"h",label:"1-2"},{bar:"final"}],width:440};
          container.innerHTML=`<div class="rm-staff"></div><div style="text-align:center"><button class="play rm-play">▶ Play & march along</button></div>`;
          const api=Staff.render(container.querySelector(".rm-staff"),spec);
          container.querySelector(".rm-play").onclick=()=>{
            const total=Staff.play(spec,api);
            setTimeout(()=>fb(true,"✓ ONE-two, ONE-two, ONE-(two) — you just read music in 2/4 time!"),total*1000+300);
          };
        } } }
  ],
  examples:[
    { caption:"A 2/4 march — count ONE-two in every measure, and feel the LEFT-right of marching feet.",
      staff:{clef:"treble",tempo:96,time:"2/4",notes:[{p:"C4",d:"q",label:"1"},{p:"C4",d:"q",label:"2"},{bar:"single"},{p:"G4",d:"q",label:"1"},{p:"G4",d:"q",label:"2"},{bar:"single"},{p:"E4",d:"h",label:"1-2"},{bar:"final"}],width:440} },
    { caption:"The half note fills an entire 2/4 measure — one sound, two beats: ONE-two.",
      staff:{clef:"treble",tempo:96,time:"2/4",notes:[{p:"D4",d:"h",label:"1-2"},{bar:"single"},{p:"E4",d:"q",label:"1"},{p:"D4",d:"q",label:"2"},{bar:"single"},{p:"C4",d:"h",label:"1-2"},{bar:"final"}],width:440} }
  ],
  games:[
    { type:"rhythm-tap", title:"Game 1 · March Tap",
      intro:"Tap 2/4 rhythms back — feel the STRONG-weak, Left-Right pulse in every measure!",
      miaIntro:"Game time — your hands become marching feet! \u{1F941}",
      spec:{tempo:96, rounds:3, beatsPerBar:2, patterns:[["q","q"],["h"],["q","rq"],["rq","q"]]},
      result:(score)=>score>=4?"Right on the march — 2/4 lives in your hands now!":null },
    { type:"measure-judge", title:"Game 2 · 2/4 Inspector",
      intro:"Does each measure hold exactly <b>2 beats</b>? Small containers, quick math — judge fast!",
      miaIntro:"Inspector duty again — but the containers just got smaller! \u{1F50D}",
      spec:{rounds:8, beats:2},
      result:(score)=>score>=7?"No incomplete 2/4 measure gets past you!":null },
    { type:"measure-build", title:"Game 3 · Two-Beat Builder",
      intro:"Fill 2/4 measures with exactly <b>2 beats</b> — find BOTH combinations!",
      miaIntro:"Builder time — small measures, exact math! \u{1F3D7}\u{FE0F}",
      spec:{beats:2, unique:true, rounds:2},
      result:(stars)=>stars>=3?"Both combinations, zero overflow — 2/4 mastered!":null },
    { type:"symbol-hunt", title:"Game 4 · Time Signature Hunt",
      intro:"2/4, 3/4, 4/4, C — they all look similar. Click the one Mia names!",
      miaIntro:"Last game — can you spot 2/4 in a crowd of time signatures? \u{1F3AF}",
      spec:{rounds:6, pool:[
        {label:"2/4 Time Signature", spec:{clef:"treble",time:"2/4",notes:[]}},
        {label:"3/4 Time Signature", spec:{clef:"treble",time:"3/4",notes:[]}},
        {label:"4/4 Time Signature", spec:{clef:"treble",time:"4/4",notes:[]}},
        {label:"Common Time (C)", spec:{clef:"treble",time:"C",notes:[]}}]},
      result:(score)=>score>=5?"Sharp eyes — every top number spotted!":null }
  ],
  practiceIntro:"20 practice questions — 2/4 counting, complete measures, and beat math. Answer right and the next appears automatically!",
  practice:[
    { gen:"measure-complete", params:{beats:2}, count:4 },
    { gen:"rhythm-count", params:{values:["h","q"],maxNotes:2}, count:3 },
    { gen:"note-value", params:{ask:"beats"}, count:2 },
    { gen:"measure-count", params:{min:2,max:4}, count:2 },
    { type:"mc", q:"In 2/4 time, the TOP number tells you…", choices:["2 beats in every measure","the quarter note gets the beat","play twice as fast"], answer:0,
      explain:"Top number = beats per measure. In 2/4, that's two." },
    { type:"mc", q:"In 2/4 time, which note receives one beat?", choices:["Quarter Note","Half Note","Whole Note"], answer:0,
      explain:"The bottom 4 = quarter note gets the beat — same as in 4/4." },
    { type:"truefalse", q:"2/4 time has a marching feel: STRONG-weak.", answer:true,
      explain:"Left-Right, ONE-two — that's the 2/4 march." },
    { type:"truefalse", q:"A whole note fits in one 2/4 measure.", answer:false,
      explain:"A whole note needs 4 beats — a 2/4 measure only holds 2." },
    { type:"mc", q:"Which fills one complete 2/4 measure?", choices:["Half Note","Whole Note","Half + Quarter"], answer:0,
      explain:"2 beats exactly. (Whole = 4 too many; half+quarter = 3.)" },
    { type:"truefalse", q:"Counting in 2/4 goes “ONE-two, ONE-two.”", answer:true,
      explain:"Strong beat 1, lighter beat 2 — every measure." },
    { type:"mc", q:"The quarter note gets one beat in BOTH 2/4 and 4/4 because…", choices:["the bottom number is 4 in both","the top number is the same","quarter notes always get one beat in every time signature"], answer:0,
      explain:"Bottom 4 = quarter note is the beat. (Other bottom numbers exist — later lessons!)" },
    { type:"truefalse", q:"2/4 has fewer beats per measure than 4/4.", answer:true,
      explain:"2 versus 4 — half the container size." },
    { type:"mc", q:"Which piece would most likely be in 2/4?", choices:["A soldiers' march","A dreamy lullaby in 3","a piece with 4 strong beats"], answer:0,
      explain:"STRONG-weak = perfect for marching feet." }
  ],
  miaQuizIntro:"Quiz time! ONE-two, ONE-two — march through these questions!",
  quiz:[
    { type:"mc", q:"How many beats are in one measure of 2/4 time?", choices:["1","2","3","4"], answer:1,
      explain:"The top number says 2.", hint:"Look at the top number." },
    { type:"mc", q:"Which note receives one beat in 2/4 time?", choices:["Whole Note","Half Note","Quarter Note","Eighth Note"], answer:2,
      explain:"Bottom number 4 = quarter note gets the beat.", hint:"Look at the bottom number." },
    { type:"truefalse", q:"The top number tells you how many beats are in each measure.", answer:true,
      explain:"Top = how many; bottom = which note.", hint:"Same rule as 4/4." },
    { type:"truefalse", q:"A measure of 2/4 time contains three beats.", answer:false,
      explain:"Two beats — that's what the top 2 promises.", hint:"Read the top number again." },
    { type:"mc", q:"Which time signature has a MARCHING feel?", choices:["2/4","3/4","Neither"], answer:0,
      explain:"STRONG-weak, Left-Right = 2/4 march.", hint:"Left-Right!" },
    { type:"mc", q:"2/4 time is counted…", choices:["ONE-two, ONE-two","ONE-two-three","ONE-two-three-four"], answer:0,
      explain:"Two beats per measure, strong beat first.", hint:"How many beats per container?" },
    { type:"mc", q:"How many measures are shown?",
      staff:{clef:"treble",time:"2/4",notes:[{p:"B4",d:"q"},{p:"B4",d:"q"},{bar:"single"},{p:"B4",d:"h"},{bar:"single"},{p:"B4",d:"q"},{p:"B4",d:"q"},{bar:"final"}],width:400},
      choices:["2","3","4"], answer:1,
      explain:"Three containers of 2 beats each.", hint:"Count the spaces between bar lines." },
    { type:"mc", q:"A measure of 2/4 time contains ____ beats.", choices:["1","2","3","4"], answer:1,
      explain:"Two — top number 2.", hint:"2/4: the first number." },
    { type:"truefalse", q:"This measure is complete.",
      staff:{clef:"treble",time:"2/4",notes:[{p:"B4",d:"q"},{bar:"final"}],width:260},
      answer:false,
      explain:"Only 1 beat — a 2/4 measure needs exactly 2.", hint:"Add the beats, compare to the top number." },
    { type:"mc", q:"Which fills one complete measure of 2/4?", choices:["Quarter + Quarter","Quarter + Half","Whole Note"], answer:0,
      explain:"1+1 = 2 ✓. Quarter+half = 3; whole = 4 — both overflow.", hint:"Total must be exactly 2." },
    { type:"mc", q:"Which is the 2/4 time signature?",
      choices:["Top 2, bottom 4","Top 4, bottom 2","A large letter C"], answer:0,
      explain:"2 beats per measure, quarter note gets the beat.", hint:"Top = beats." },
    { type:"mc", q:"Which statement is correct?",
      choices:["A quarter note has a different value in 2/4 than in 4/4","The quarter note equals one beat in both 2/4 and 4/4","2/4 and 4/4 have the same number of beats per measure","A measure of 2/4 contains four beats"], answer:1,
      explain:"The bottom 4 keeps the quarter note as the beat — only the measure SIZE changes.",
      hint:"What does the bottom number do?" },
    /* generated */
    { gen:"measure-complete", params:{beats:2}, count:3 },
    { gen:"rhythm-count", params:{values:["h","q"],maxNotes:2}, count:2 },
    { gen:"note-value", params:{ask:"beats"}, count:2 },
    { gen:"note-name", params:{clef:"treble"}, count:1 }
  ],
  vocabulary:[
    {def:"Two beats per measure — the quarter note gets one beat", term:"2/4 Time", staff:{clef:"none",time:"2/4",notes:[],width:140}},
    {def:"The STRONG-weak marching pulse: Left–Right, ONE-two", term:"March Feel"},
    {def:"A symbol telling how many beats per measure and which note gets one beat", term:"Time Signature", staff:{clef:"none",time:"2/4",notes:[],width:140}},
    {def:"A group of beats separated by bar lines", term:"Measure (Bar)"}
  ],
  mistakes:[],
  summary:[
    "✔ <b>2/4</b> = <b>2 beats</b> per measure; the quarter note gets the beat.",
    "✔ Count <b>ONE-two | ONE-two</b> — strong beat first.",
    "✔ 2/4 feels like a <b>march</b>: Left–Right. \u{1F941}",
    "✔ Only two ways to fill it with basic notes: <b>♩ ♩</b> or one <b>half note</b>.",
    "✔ Different top numbers = different feels — the quarter note stays the beat."
  ],
  tips:[
    "March around the room counting “ONE-two” — your feet learn 2/4 faster than your eyes.",
    "The strong click is always beat ONE. Lost? Wait for the accent and jump back in.",
    "Small measures fill up fast — always check the top number before you count.",
    "\u{1F483} Next lesson: add one more beat and the march becomes a WALTZ — 3/4 time!"
  ],
  rewards:{ badge:"March Time Keeper", icon:"\u{1F941}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"A PERFECT march — ONE-two straight to the top! The waltz is waiting for you next. \u{1F941}\u{1F389}",
  miaPass:"You passed! 2/4 is officially in your bones. Review below or march for the perfect run.",
  mia:{
    hook:{ label:"the welcome",
      explain:"Time signatures shape how music FEELS. Two beats per measure = a march; you'll feel it before you can name it.",
      play:()=>{const s=.62;for(let k=0;k<6;k++) MFAudio.click(k*s,k%2===0?.6:.3,k%2===0);} },
    learn:{ label:"2/4 time",
      explain:"Top 2 = two beats per measure. Bottom 4 = quarter note gets the beat. Count ONE-two with a strong ONE, and remember only 2 beats fit per container.",
      hint:"STRONG-weak, Left-Right — the march never lies.",
      play:()=>{const s=.6;[60,64].forEach((m,i)=>MFAudio.tone(m,s*.9,i*s));[67,64].forEach((m,i)=>MFAudio.tone(m,s*.9,(2+i)*s));} },
    example:{ label:"the examples",
      explain:"Both examples are pure 2/4 — count ONE-two in every measure and hear the half note fill a whole container." },
    game:{ label:"the games",
      explain:"Tap marches, inspect 2-beat containers, build both combinations, and hunt the 2/4 sign.",
      hint:"Everything is the same as 4/4 — just a smaller container." },
    quiz:{ label:"this question",
      explain:"Two facts solve nearly everything: top 2 = two beats per measure; bottom 4 = quarter note gets the beat.",
      play:()=>{MFAudio.click(0,.6,true);MFAudio.click(.6,.3);MFAudio.click(1.2,.6,true);MFAudio.click(1.8,.3);} }
  }
};
