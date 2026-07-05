/* Lesson 11 — 3/4 Time Signature (AEMT Book 1, Unit 3)
   Built from drafts/UNIT 3 – Lessons 10 & 11.md (combined draft — pages stay separate, DD-12).
   QA note honored: 3/4 = WALTZ ("ONE-two-three") vs 2/4 = MARCH, contrasted throughout.
   NOTE: edit by FULL-FILE REWRITE only. */

/* march-or-waltz listening drill (own copy — lesson pages load only their own content file) */
function MF_L11_marchWaltz(container,fb,rounds){
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

/* conduct-the-pattern activity (unique L11 prefix) */
function MF_L11_conduct(container,fb){
  const rounds=[{n:2,pat:["⬇️","➡️"],name:"2/4"},{n:3,pat:["⬇️","➡️","⬆️"],name:"3/4"}];
  let r=0;
  container.innerHTML=`<div class="big-q cd-q" style="text-align:center"></div>
    <div class="cd-pat" style="text-align:center;font-size:2.2rem;min-height:52px;letter-spacing:12px"></div>
    <div class="choices chips cd-ch"></div>`;
  const q=container.querySelector(".cd-q"), pat=container.querySelector(".cd-pat"), ch=container.querySelector(".cd-ch");
  let next=0;
  function ask(){
    const cur=rounds[r]; next=0;
    pat.textContent="";
    q.textContent=`Conduct ${cur.name}: tap the arrows IN ORDER — beat 1 goes DOWN!`;
    ch.innerHTML="";
    [...cur.pat].sort(()=>Math.random()-.5).forEach(a=>{
      const b=document.createElement("button"); b.textContent=a; b.style.fontSize="1.5rem";
      b.onclick=()=>{
        const cur2=rounds[r];
        if(a===cur2.pat[next]){
          next++; b.disabled=true; MFAudio.click(0,next===1?.6:.35,next===1);
          pat.textContent=cur2.pat.slice(0,next).join(" ");
          if(next===cur2.pat.length){
            r++;
            if(r>=rounds.length){ ch.style.display="none"; q.textContent="You conducted both!";
              fb(true,"✓ Down-right for 2/4, down-right-UP for 3/4 — beat 1 always goes DOWN. You're conducting like Mia!"); }
            else { fb(true,"✓ That's the 2/4 pattern — down, right! Now the waltz…"); setTimeout(ask,900); }
          }
        } else { MFAudio.tone(40,.25); fb(false,"Beat 1 always goes DOWN (⬇️) — then follow the pattern around."); }
      };
      ch.appendChild(b);
    });
  }
  ask();
}

LESSON_CONTENT[11]={
  welcome:"ONE-two-three, ONE-two-three — shall we dance? \u{1F483}",
  hook:{
    say:"Last lesson you marched. Today you <b>waltz</b>! Press play — can you feel how this pulse <b>spins</b> instead of marching?",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center"><button class="play hk-play">▶ Feel it</button></div>
          <div class="choices hk-ch" style="display:none"><button>STRONG-weak — a march</button><button>STRONG-weak-weak — a waltz!</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-play").onclick=()=>{
          const spb=60/108; for(let k=0;k<9;k++) MFAudio.click(k*spb,k%3===0?.6:.3,k%3===0);
          setTimeout(()=>{ ch.style.display=""; },9*spb*1000+250);
        };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===1) fb(true,"✓ ONE-two-three, ONE-two-three — the spinning pulse of the WALTZ. That's 3/4 time!");
          else fb(false,"Count between the strong clicks — THREE beats pass, not two. Listen again!");
        });
      } }
  },
  objectives:[
    "Identify the 3/4 time signature",
    "Count three beats in each measure",
    "Recognize the waltz feel of 3/4 time",
    "Count rhythms using quarter notes",
    "Complete measures correctly in 3/4 time",
    "Tell 2/4 and 3/4 apart by ear and by eye"
  ],
  steps:[
    { say:"Meet <b>3/4 time</b>: the top 3 says <b>three beats per measure</b>; the bottom 4 keeps the <b>quarter note as one beat</b> — exactly like 2/4 and 4/4. Only the container size changed! \u{1F447}",
      show:{ type:"staff", spec:{clef:"treble",time:"3/4",notes:[{p:"C4",d:"q",label:"1"},{p:"E4",d:"q",label:"2"},{p:"G4",d:"q",label:"3"},{bar:"single"},{p:"E4",d:"q",label:"1"},{p:"C4",d:"h",label:"2-3"},{bar:"final"}],width:440} },
      try:{ type:"mc",
        choices:["3 beats per measure","4 beats per measure","3 measures per line"], answer:0,
        success:"✓ Top 3 = three beats in every container: ONE-two-three.",
        fail:"Read the TOP number.",
        hint:"Top = how many beats fit." } },
    { say:"3/4 is <b>waltz time</b>: <b>STRONG – weak – weak</b>, ONE-two-three. Dancers spin on that pattern! \u{1F447} <b>Tap along — accent beat ONE:</b>",
      try:{ type:"custom",
        hint:"The accented click starts every group of three.",
        mount:(container,fb)=>{
          const tempo=108, spb=60/tempo, total=9;
          let t0=0,taps=[],on=false,timers=[];
          container.innerHTML=`<div class="big-q wt-q" style="text-align:center">Count-in, then TAP every beat: ONE-two-three!</div>
            <div style="text-align:center"><button class="play wt-start">▶ Start the waltz</button>
            <button class="play wt-tap" style="display:none;min-width:200px;padding:20px 28px;font-size:1.25rem">\u{1F483} TAP</button></div>
            <div class="wt-count" style="text-align:center;font-size:2rem;font-weight:800;color:var(--primary);min-height:44px"></div>`;
          const cnt=container.querySelector(".wt-count"), sB=container.querySelector(".wt-start"), tB=container.querySelector(".wt-tap");
          tB.onclick=()=>{ if(!on)return; taps.push(performance.now()-t0); MFAudio.click(0,.35); };
          sB.onclick=()=>{
            sB.style.display="none"; taps=[]; timers.forEach(clearTimeout); timers=[];
            MFAudio.ac();
            for(let i=0;i<3;i++) MFAudio.click(i*spb,.5,i===0);
            for(let i=0;i<total;i++) MFAudio.click((3+i)*spb,.5,i%3===0);
            t0=performance.now();
            const W=["ONE","two","three"];
            for(let i=0;i<total;i++) timers.push(setTimeout(()=>{cnt.textContent=W[i%3];},(3+i)*spb*1000));
            timers.push(setTimeout(()=>{ tB.style.display="inline-block"; on=true; },Math.max(0,3*spb*1000-400)));
            timers.push(setTimeout(()=>{
              on=false; tB.style.display="none"; cnt.textContent="";
              const tol=spb*0.45*1000, expected=[]; for(let i=0;i<total;i++) expected.push((3+i)*spb*1000);
              const used=new Set(); let hits=0;
              expected.forEach(t=>{ let best=-1,bd=1e9;
                taps.forEach((tp,j)=>{ if(used.has(j))return; const d=Math.abs(tp-t); if(d<bd){bd=d;best=j;} });
                if(best>=0&&bd<=tol){ used.add(best); hits++; } });
              sB.style.display="inline-block"; sB.textContent="▶ Waltz again";
              if(hits>=7) fb(true,`✓ ${hits} of ${total} on the beat — ONE-two-three, a real waltz!`);
              else fb(false,`${hits} of ${total}. Say “ONE-two-three” out loud and let beat ONE lead you.`);
            },(3+total)*spb*1000+600));
          };
        } } },
    { say:"A 3/4 measure holds exactly <b>3 beats</b>. \u{1F447} <b>Build TWO different 3-beat measures:</b>",
      try:{ type:"custom",
        hint:"Half (2) + Quarter (1) = 3, or three Quarters. (The dotted half arrives NEXT lesson!)",
        mount:(container,fb)=>{
          const B={h:2,q:1};
          let cur=[],sum=0,found=[];
          container.innerHTML=`<div class="b3-staff"></div><div class="big-q b3-q" style="text-align:center"></div>
            <div class="choices b3-ch"><button data-v="h">Half (2)</button><button data-v="q">Quarter (1)</button><button class="ghost" data-v="x">↺ Clear</button></div>`;
          const st=container.querySelector(".b3-staff"), q=container.querySelector(".b3-q");
          function draw(){
            Staff.render(st,{clef:"treble",time:"3/4",notes:[...cur.map(d=>({p:"B4",d})),{bar:"final"}],width:320});
            q.textContent=`Beats: ${sum} of 3 · Measures built: ${found.length} of 2`;
          }
          [...container.querySelectorAll(".b3-ch button")].forEach(b=>b.onclick=()=>{
            const v=b.dataset.v;
            if(v==="x"){ cur=[];sum=0;draw(); return; }
            if(sum+B[v]>3){ fb(false,"Too many — a 3/4 measure holds exactly 3 beats!"); return; }
            cur.push(v); sum+=B[v]; MFAudio.tone(71,B[v]*.4); draw();
            if(sum===3){
              const key=cur.slice().sort().join("");
              if(found.includes(key)){ fb(false,"Same mix — find a DIFFERENT combination!"); cur=[];sum=0; setTimeout(draw,900); return; }
              found.push(key);
              let t=0; cur.forEach(d=>{ MFAudio.tone(71,B[d]*.45,t); t+=B[d]*.5; });
              if(found.length>=2){ container.querySelector(".b3-ch").style.display="none"; q.textContent="Both ways found!";
                fb(true,"✓ Half+quarter or three quarters — 3 beats either way. Next lesson adds a THIRD way: the dotted half note!"); }
              else { fb(true,"✓ Exactly 3! Now a different combination…"); cur=[];sum=0; setTimeout(draw,1100); }
            }
          });
          draw();
        } } },
    { say:"March or waltz — the ultimate ear test! <b>2/4 = STRONG-weak</b>, <b>3/4 = STRONG-weak-weak</b>. \u{1F447}",
      try:{ type:"custom",
        hint:"Count the beats between STRONG clicks: 2 or 3?",
        mount:(container,fb)=>MF_L11_marchWaltz(container,fb,5) } },
    { say:"Conductors SHOW the time signature with their hands: in 2/4 the hand goes <b>down-right</b>; in 3/4 it draws a triangle — <b>down-right-up</b>. \u{1F447} <b>Conduct both patterns:</b>",
      try:{ type:"custom",
        hint:"Beat 1 is ALWAYS the downbeat — the hand drops first.",
        mount:(container,fb)=>MF_L11_conduct(container,fb) } },
    { say:"Let's READ a waltz. Count out loud — <b>ONE-two-three | ONE-two-three</b>. \u{1F447}",
      try:{ type:"custom",
        hint:"Three beats per container; the half note takes two of them.",
        mount:(container,fb)=>{
          const spec={clef:"treble",time:"3/4",tempo:108,
            notes:[{p:"C4",d:"q",label:"1"},{p:"E4",d:"q",label:"2"},{p:"G4",d:"q",label:"3"},{bar:"single"},{p:"E4",d:"h",label:"1-2"},{p:"C4",d:"q",label:"3"},{bar:"final"}],width:440};
          container.innerHTML=`<div class="rw-staff"></div><div style="text-align:center"><button class="play rw-play">▶ Play & sway along</button></div>`;
          const api=Staff.render(container.querySelector(".rw-staff"),spec);
          container.querySelector(".rw-play").onclick=()=>{
            const total=Staff.play(spec,api);
            setTimeout(()=>fb(true,"✓ ONE-two-three — you just read a waltz in 3/4 time!"),total*1000+300);
          };
        } } }
  ],
  examples:[
    { caption:"A 3/4 waltz — ONE-two-three in every measure. Sway along and feel the spin.",
      staff:{clef:"treble",tempo:108,time:"3/4",notes:[{p:"C4",d:"q",label:"1"},{p:"E4",d:"q",label:"2"},{p:"E4",d:"q",label:"3"},{bar:"single"},{p:"D4",d:"q",label:"1"},{p:"F4",d:"q",label:"2"},{p:"F4",d:"q",label:"3"},{bar:"single"},{p:"E4",d:"h",label:"1-2"},{p:"C4",d:"q",label:"3"},{bar:"final"}],width:460} },
    { caption:"Compare: the SAME melody feels square in 2/4 and spinning in 3/4 — the top number changes everything.",
      staff:{clef:"treble",tempo:108,time:"3/4",notes:[{p:"G4",d:"h",label:"1-2"},{p:"E4",d:"q",label:"3"},{bar:"single"},{p:"F4",d:"h",label:"1-2"},{p:"D4",d:"q",label:"3"},{bar:"final"}],width:420} }
  ],
  games:[
    { type:"rhythm-tap", title:"Game 1 · Waltz Tap",
      intro:"Tap 3/4 rhythms back — ONE-two-three, with a gentle lean on ONE!",
      miaIntro:"Dancing hands time — tap the waltz! \u{1F483}",
      spec:{tempo:104, rounds:3, beatsPerBar:3, patterns:[["q","q","q"],["h","q"],["q","h"],["q","rq","q"]]},
      result:(score)=>score>=6?"Your taps waltzed right on the beat!":null },
    { type:"measure-judge", title:"Game 2 · 3/4 Inspector",
      intro:"Does each measure hold exactly <b>3 beats</b>? Inspect fast — 8 rounds.",
      miaIntro:"New container size — same sharp inspector eyes! \u{1F50D}",
      spec:{rounds:8, beats:3},
      result:(score)=>score>=7?"Not a single lopsided waltz measure escaped you!":null },
    { type:"measure-build", title:"Game 3 · Three-Beat Builder",
      intro:"Fill 3/4 measures with exactly <b>3 beats</b> — find BOTH combinations of halves and quarters!",
      miaIntro:"Build the waltz — exactly three beats each time! \u{1F3D7}\u{FE0F}",
      spec:{beats:3, unique:true, rounds:2},
      result:(stars)=>stars>=3?"Both combinations found — and next lesson brings a third!":null },
    { type:"symbol-hunt", title:"Game 4 · 2/4 vs 3/4 Showdown",
      intro:"The QA classic: 2/4 and 3/4 look like twins. Click the one Mia names — every time!",
      miaIntro:"Final test — twins to tell apart! \u{1F3AF}",
      spec:{rounds:6, pool:[
        {label:"2/4 Time Signature", spec:{clef:"treble",time:"2/4",notes:[]}},
        {label:"3/4 Time Signature", spec:{clef:"treble",time:"3/4",notes:[]}},
        {label:"4/4 Time Signature", spec:{clef:"treble",time:"4/4",notes:[]}},
        {label:"Common Time (C)", spec:{clef:"treble",time:"C",notes:[]}}]},
      result:(score)=>score>=5?"March, waltz, common — you can spot them all!":null }
  ],
  practiceIntro:"20 practice questions — 3/4 counting, waltz vs march, and complete measures. Answer right and the next appears automatically!",
  practice:[
    { gen:"measure-complete", params:{beats:3}, count:4 },
    { gen:"rhythm-count", params:{values:["h","q"],maxNotes:3}, count:3 },
    { gen:"note-value", params:{ask:"beats"}, count:2 },
    { gen:"measure-count", params:{min:2,max:4}, count:2 },
    { type:"mc", q:"In 3/4 time, how many beats per measure?", choices:["2","3","4"], answer:1,
      explain:"Top number 3 = three beats." },
    { type:"mc", q:"Which note receives one beat in 3/4?", choices:["Quarter Note","Half Note","Eighth Note"], answer:0,
      explain:"Bottom 4 = quarter note, just like 2/4 and 4/4." },
    { type:"truefalse", q:"3/4 time feels like a waltz: STRONG-weak-weak.", answer:true,
      explain:"ONE-two-three — the spinning dance pulse." },
    { type:"truefalse", q:"2/4 and 3/4 have the same number of beats per measure.", answer:false,
      explain:"2 versus 3 — different container sizes." },
    { type:"mc", q:"Which fills one complete 3/4 measure?", choices:["Half + Quarter","Half + Half","Whole Note"], answer:0,
      explain:"2+1 = 3 ✓. The others total 4 — overflow!" },
    { type:"truefalse", q:"Counting in 3/4 goes “ONE-two-three.”", answer:true,
      explain:"Strong ONE, lighter two and three." },
    { type:"mc", q:"A waltz is danced to which time signature?", choices:["3/4","2/4","4/4"], answer:0,
      explain:"The waltz spins on ONE-two-three." },
    { type:"truefalse", q:"The quarter note changes value when the top number changes.", answer:false,
      explain:"Bottom 4 = quarter gets one beat in 2/4, 3/4, AND 4/4." },
    { type:"mc", q:"In a conducting pattern, beat 1 always goes…", choices:["DOWN","up","sideways"], answer:0,
      explain:"The downbeat! Every pattern starts with the hand dropping." }
  ],
  miaQuizIntro:"Quiz time! ONE-two-three — waltz through it!",
  quiz:[
    { type:"mc", q:"How many beats are in one measure of 3/4 time?", choices:["2","3","4","6"], answer:1,
      explain:"Top 3 = three beats.", hint:"Top number." },
    { type:"mc", q:"Which note receives one beat in both 2/4 and 3/4 time?", choices:["Whole Note","Half Note","Quarter Note","Eighth Note"], answer:2,
      explain:"Bottom 4 = quarter note gets the beat in both.", hint:"Bottom number is 4 in both." },
    { type:"truefalse", q:"A measure of 3/4 time contains three quarter-note beats.", answer:true,
      explain:"Three beats, quarter note = one beat.", hint:"3 on top, 4 on the bottom." },
    { type:"mc", q:"Which time signature is commonly used for a WALTZ?", choices:["2/4","3/4","4/4"], answer:1,
      explain:"ONE-two-three = waltz = 3/4.", hint:"The spinning dance." },
    { type:"mc", q:"Which time signature has a MARCHING feel?", choices:["2/4","3/4","Neither"], answer:0,
      explain:"STRONG-weak = march = 2/4 (last lesson!).", hint:"Left-Right." },
    { type:"mc", q:"3/4 time is counted…", choices:["ONE-two","ONE-two-three","ONE-two-three-four"], answer:1,
      explain:"Three beats per measure.", hint:"Top number = 3." },
    { type:"mc", q:"A measure of 3/4 time contains ____ beats.", choices:["2","3","4"], answer:1,
      explain:"Three.", hint:"3/4: the first number." },
    { type:"truefalse", q:"This measure is complete.",
      staff:{clef:"treble",time:"3/4",notes:[{p:"B4",d:"h"},{p:"B4",d:"q"},{bar:"final"}],width:280},
      answer:true,
      explain:"2 + 1 = 3 beats — exactly full.", hint:"Add and compare to the top number." },
    { type:"truefalse", q:"This measure is complete.",
      staff:{clef:"treble",time:"3/4",notes:[{p:"B4",d:"h"},{bar:"final"}],width:260},
      answer:false,
      explain:"Only 2 beats — one short of 3.", hint:"Count carefully!" },
    { type:"mc", q:"Which fills one complete measure of 3/4?", choices:["Quarter + Quarter + Quarter","Half + Half","Quarter + Quarter"], answer:0,
      explain:"1+1+1 = 3 ✓. The others make 4 and 2.", hint:"Total must be exactly 3." },
    { type:"mc", q:"In the 3/4 conducting pattern, the hand moves…", choices:["down – right – up","down – up","right – left – right"], answer:0,
      explain:"A triangle: down (1), right (2), up (3).", hint:"You conducted it in the activity!" },
    { type:"mc", q:"Which statement is correct?",
      choices:["A quarter note has a different value in 3/4 time","A quarter note always equals one beat in both 2/4 and 3/4 time","2/4 and 3/4 have the same number of beats","A measure of 3/4 contains two beats"], answer:1,
      explain:"The bottom 4 keeps the quarter note as the beat — only the measure size differs.",
      hint:"What does the bottom number control?" },
    /* generated */
    { gen:"measure-complete", params:{beats:3}, count:3 },
    { gen:"rhythm-count", params:{values:["h","q"],maxNotes:3}, count:2 },
    { gen:"note-value", params:{ask:"beats"}, count:2 },
    { gen:"note-name", params:{clef:"treble"}, count:1 }
  ],
  vocabulary:[
    {def:"Three beats per measure — the quarter note gets one beat", term:"3/4 Time", staff:{clef:"none",time:"3/4",notes:[],width:140}},
    {def:"The STRONG-weak-weak spinning pulse: ONE-two-three", term:"Waltz Feel"},
    {def:"Two beats per measure — the marching cousin", term:"2/4 Time", staff:{clef:"none",time:"2/4",notes:[],width:140}},
    {def:"Beat 1 of every measure — the conductor's hand drops on it", term:"Downbeat"}
  ],
  mistakes:[],
  summary:[
    "✔ <b>3/4</b> = <b>3 beats</b> per measure; the quarter note still gets the beat.",
    "✔ Count <b>ONE-two-three | ONE-two-three</b>.",
    "✔ 3/4 feels like a <b>waltz</b>: STRONG-weak-weak. \u{1F483}",
    "✔ 2/4 = march (Left-Right) · 3/4 = waltz (ONE-two-three).",
    "✔ Conduct it: <b>down – right – up</b> — the downbeat always drops."
  ],
  tips:[
    "Sway side to side counting ONE-two-three — your body learns the waltz before your brain.",
    "Confusing 2/4 and 3/4? Wait for two STRONG beats and count the space between them.",
    "The top number changes the FEEL; the bottom 4 keeps your beat note steady.",
    "\u{1F51C} Next lesson: one little dot makes a note last THREE beats — perfect for 3/4!"
  ],
  rewards:{ badge:"Waltz Time Keeper", icon:"\u{1F483}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"A PERFECT waltz — ONE-two-three all the way to 100%! The dotted half note is waiting to fill your measures. \u{1F483}\u{1F389}",
  miaPass:"You passed! March AND waltz — two feels mastered. Review below or spin for the perfect run.",
  mia:{
    hook:{ label:"the welcome",
      explain:"3/4 groups beats in threes: STRONG-weak-weak. Your body hears it as a spin instead of a march.",
      play:()=>{const s=.55;for(let k=0;k<9;k++) MFAudio.click(k*s,k%3===0?.6:.3,k%3===0);} },
    learn:{ label:"3/4 time",
      explain:"Top 3 = three beats per measure; bottom 4 = quarter note gets the beat. Count ONE-two-three, conduct down-right-up.",
      hint:"STRONG-weak-weak — let beat ONE lead.",
      play:()=>{const s=.55;[60,64,67].forEach((m,i)=>MFAudio.tone(m,s*.9,i*s));[64,60,64].forEach((m,i)=>MFAudio.tone(m,s*.9,(3+i)*s));} },
    example:{ label:"the examples",
      explain:"Count ONE-two-three through both examples — hear how the half note leans across beats 1-2, leaving beat 3 to finish the spin." },
    game:{ label:"the games",
      explain:"Tap waltzes, inspect 3-beat containers, build both fillings, and win the 2/4-vs-3/4 showdown.",
      hint:"Everything hangs on the top number — count to it, fill to it, listen for it." },
    quiz:{ label:"this question",
      explain:"Top 3 = three beats; bottom 4 = quarter note beat; STRONG-weak-weak = waltz. Those three facts answer almost everything.",
      play:()=>{MFAudio.click(0,.6,true);MFAudio.click(.55,.3);MFAudio.click(1.1,.3);} }
  }
};
