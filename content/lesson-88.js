/* Lesson 88 — Phrases & Periods (Book 4, Unit 22 — SELF-AUTHORED)
   Core: ANTECEDENT phrase (question, ends half cadence) + CONSEQUENT phrase
   (answer, ends authentic) = a PERIOD. Parallel period: both phrases begin
   alike. Contrasting period: they begin differently.
   NOTE: edit by FULL-FILE REWRITE only. */

/* period ear lab: which phrase is the question? */
function MF_L88_ear(container,fb){
  const ANT=[[60,.4],[64,.4],[67,.4],[74,.4],[71,.8]], CON=[[60,.4],[64,.4],[67,.4],[65,.4],[60,.8]];
  let heardA=false,heardB=false;
  container.innerHTML=`<div class="big-q l88e-q" style="text-align:center">Hear both phrases, then decide which is the QUESTION (antecedent).</div>
    <div style="text-align:center">
      <button class="play l88e-a">▶ Phrase 1</button>
      <button class="play l88e-b">▶ Phrase 2</button></div>
    <div class="choices l88e-ch" style="display:none"><button>Phrase 1 — it stops away from the tonic (half cadence)</button><button>Phrase 2 — it lands on the tonic</button></div>`;
  const ch=container.querySelector(".l88e-ch"), q=container.querySelector(".l88e-q");
  const play=(P)=>{ let t=0; P.forEach(([m,d])=>{ MFAudio.tone(m,d*.95,t,.42); t+=d; }); return t; };
  container.querySelector(".l88e-a").onclick=()=>{ play(ANT); heardA=true; if(heardB) setTimeout(()=>ch.style.display="",2600); };
  container.querySelector(".l88e-b").onclick=()=>{ play(CON); heardB=true; if(heardA) setTimeout(()=>ch.style.display="",2600); };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(i===0){ fb(true,"✓ Phrase 1 paused on the dominant — the QUESTION (antecedent). Phrase 2 answered with the tonic — the CONSEQUENT. Together: a PERIOD."); q.textContent="Question found — the period is complete."; ch.style.display="none"; }
    else { MFAudio.tone(40,.2); fb(false,"Which phrase feels UNFINISHED? That one asks the question."); }
  });
}

LESSON_CONTENT[88]={
  welcome:"Phrases pair into periods: question and answer. \u{1F4AC}",
  hook:{
    say:"<b>Two phrases, one thought.</b> The first stops mid-air; the second finishes the sentence. \u{1F447} <b>Listen to the pair. What is their relationship?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play both phrases</button></div>
          <div class="choices hk-ch" style="display:none"><button>Question, then answer — the second completes the first</button><button>Two unrelated melodies</button><button>The same phrase twice</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{
          const A=[[60,.4],[64,.4],[67,.4],[74,.4],[71,.9]], B=[[60,.4],[64,.4],[67,.4],[65,.4],[60,.9]];
          let t=0; A.forEach(([m,d])=>{ MFAudio.tone(m,d*.95,t,.42); t+=d; }); t+=.35;
          B.forEach(([m,d])=>{ MFAudio.tone(m,d*.95,t,.42); t+=d; });
          setTimeout(()=>ch.style.display="",t*1000+400);
        };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Phrase 1 asked (it stopped on the dominant); phrase 2 answered (it closed on the tonic). A paired question and answer is a PERIOD — today's lesson!");
          else fb(false,"They began identically and the second one FINISHED what the first left open. Listen again…");
        });
      } }
  },
  objectives:[
    "Review the phrase: a complete or incomplete musical thought",
    "Define ANTECEDENT: the question phrase, ending with a half cadence",
    "Define CONSEQUENT: the answer phrase, ending with an authentic cadence",
    "Define PERIOD: antecedent + consequent as one unit",
    "Tell PARALLEL periods (same opening) from CONTRASTING (different)",
    "Hear question vs answer by cadence"
  ],
  steps:[
    { say:"<b>Phrase — Review:</b> a phrase is a short musical thought ending at a cadence (Lesson 72). Cadences (Lesson 87) come in open and closed kinds — which lets phrases <b>pair up</b>. \u{1F447} <b>What marks the end of a phrase?</b>",
      try:{ type:"mc", choices:["A cadence","A key signature","A double bar only"], answer:0,
        success:"✓ Every phrase ends at a cadence — open or closed.",
        fail:"Lesson 87's subject…",
        hint:"The resting point." } },
    { say:"<b>The Antecedent:</b> the <b>question phrase</b> — it usually ends with a <b>half cadence</b> (on V), leaving the thought open. \u{1F447} <b>An antecedent typically ends with…</b>",
      try:{ type:"mc", choices:["A half cadence — open","A perfect authentic cadence","No cadence at all"], answer:0,
        success:"✓ Stopping on V keeps the question hanging.",
        fail:"Questions stay open…",
        hint:"The comma cadence." } },
    { say:"<b>The Consequent:</b> the <b>answer phrase</b> — it usually ends with an <b>authentic cadence</b> (V→I), closing the thought. \u{1F447} <b>A consequent typically ends with…</b>",
      try:{ type:"mc", choices:["An authentic cadence — closed","A half cadence","A deceptive cadence always"], answer:0,
        success:"✓ V→I answers the question and closes the period.",
        fail:"Answers close the door…",
        hint:"The period cadence." } },
    { say:"<b>The Period:</b> antecedent + consequent = a <b>period</b> — two phrases forming one complete musical sentence. <b>Remember: antecedent asks (half cadence) · consequent answers (authentic cadence).</b> \u{1F447} <b>A period contains…</b>",
      show:{ type:"html", html:`<div style="display:flex;gap:12px;justify-content:center;align-items:center;font-weight:800;font-size:15px;flex-wrap:wrap">
        <div style="border:2px solid #C05A21;border-radius:10px;padding:10px 16px;background:#fff;color:#C05A21">Antecedent<br><span style="font-weight:400;font-size:12.5px;color:#555">question · half cadence</span></div>
        <div style="font-size:20px">+</div>
        <div style="border:2px solid #2F6DA8;border-radius:10px;padding:10px 16px;background:#fff;color:#2F6DA8">Consequent<br><span style="font-weight:400;font-size:12.5px;color:#555">answer · authentic cadence</span></div>
        <div style="font-size:20px">=</div>
        <div style="border:2px solid #A9821F;border-radius:10px;padding:10px 16px;background:#fff;color:#A9821F">PERIOD</div></div>` },
      try:{ type:"mc", choices:["Two phrases: a question and its answer","One phrase repeated","Four unrelated motives"], answer:0,
        success:"✓ Two phrases, one complete sentence.",
        fail:"Count the phrases in the diagram…",
        hint:"Q + A." } },
    { say:"<b>Parallel vs Contrasting:</b> if both phrases <b>begin with the same material</b>, the period is <b>PARALLEL</b>; if the consequent begins differently, it is <b>CONTRASTING</b>. \u{1F447} <b>Both phrases of a period start with the same four notes. The period is…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:100,notes:[
        {p:"C4",d:"q",label:"a…"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"B4",d:"h",label:"HC"},{bar:"single"},
        {p:"C4",d:"q",label:"a again…"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"C4",d:"h",label:"PAC"},{bar:"final"}],width:620} },
      try:{ type:"mc", choices:["Parallel — same opening, different endings","Contrasting","Not a period"], answer:0,
        success:"✓ Same start, different cadences — the classic parallel period.",
        fail:"Compare the two openings…",
        hint:"Parallel = same start." } },
    { say:"Find the question by ear. \u{1F447}",
      try:{ type:"custom",
        hint:"The phrase that stops AWAY from the tonic is asking.",
        mount:(container,fb)=>MF_L88_ear(container,fb) } },
    { say:"<b>Review:</b> \u{1F447} <b>A period's two cadences are usually…</b>",
      try:{ type:"mc", choices:["Half cadence, then authentic cadence","Two half cadences","Authentic, then half"], answer:0,
        success:"✓ Open question, closed answer — the period's engine.",
        fail:"Question first…",
        hint:"Open → closed." } }
  ],
  examples:[
    { caption:"A parallel period: both phrases open identically; phrase 1 pauses on the dominant (half cadence), phrase 2 closes on the tonic (PAC).",
      staff:{clef:"treble",tempo:96,notes:[
        {p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},
        {p:"A4",d:"q"},{p:"F4",d:"q"},{p:"D4",d:"h",label:"half cadence"},{bar:"single"},
        {p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},
        {p:"F4",d:"q"},{p:"D4",d:"q"},{p:"C4",d:"h",label:"PAC — closed"},{bar:"final"}],width:680},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"A contrasting period: the consequent begins with NEW material but still delivers the closing cadence — contrast in the opening, agreement at the end.",
      staff:{clef:"treble",tempo:96,notes:[
        {p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"B4",d:"h",label:"half cadence"},{bar:"single"},
        {p:"A4",d:"q"},{p:"G4",d:"q"},{p:"F4",d:"q"},{p:"D4",d:"q"},{p:"C4",d:"h",label:"PAC"},{bar:"final"}],width:620},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Period Sprint (45s)",
      intro:"Questions, answers and their cadences — race the pairs!",
      miaIntro:"Ask, then answer! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Antecedent","the question phrase"],
        ["Consequent","the answer phrase"],
        ["Period","antecedent + consequent"],
        ["Antecedent's cadence","half (open)"],
        ["Consequent's cadence","authentic (closed)"],
        ["Parallel period","both phrases begin alike"],
        ["Contrasting period","the phrases begin differently"],
        ["A phrase ends at","a cadence"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — periods mastered!":null },
    { type:"order-tap", title:"Game 2 · Assemble the Period",
      intro:"Tap the parts of a period in order!",
      miaIntro:"Question before answer! \u{1F3C1}",
      spec:{sequence:["Antecedent begins","Half cadence — open","Consequent begins","Authentic cadence — closed"],
        title:"One period, start to finish"},
      result:(stars)=>stars>=2?"The sentence builds itself now!":null },
    { type:"symbol-hunt", title:"Game 3 · Which Cadence Ends It?",
      intro:"Phrase endings on cards — click what each round names!",
      miaIntro:"Open or closed? \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Half cadence (antecedent's end)", spec:{clef:"treble",notes:[{p:"D4",d:"h"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},{p:"G4",d:"h"},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true}],width:210}},
        {label:"Authentic cadence (consequent's end)", spec:{clef:"treble",notes:[{p:"G4",d:"h"},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},{p:"C4",d:"h"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true}],width:210}},
        {label:"Plagal cadence", spec:{clef:"treble",notes:[{p:"F4",d:"h"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},{p:"C4",d:"h"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true}],width:210}},
        {label:"Deceptive cadence", spec:{clef:"treble",notes:[{p:"G4",d:"h"},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},{p:"A4",d:"h"},{p:"C5",d:"h",chord:true},{p:"E5",d:"h",chord:true}],width:210}}]},
      result:(score)=>score>=5?"Endings sorted instantly!":null },
    { type:"term-race", title:"Game 4 · Parallel or Contrasting?",
      intro:"Decide each period's type from its description — at speed!",
      miaIntro:"Compare the openings! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Both phrases open with motive a","parallel period"],
        ["Phrase 2 opens with new material","contrasting period"],
        ["a + a\u{2032} phrases","parallel"],
        ["a + b phrases","contrasting"],
        ["Same start, HC then PAC","parallel period"],
        ["New start, HC then PAC","contrasting period"],
        ["The question phrase","antecedent"],
        ["The answer phrase","consequent"]]},
      result:(score)=>score>=6?"Period types at a glance!":null }
  ],
  practiceIntro:"20 practice questions — questions, answers, parallels and contrasts. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Antecedent","question"],["Consequent","answer"],["Period","Q + A"],["Half cadence","open end"],["Authentic cadence","closed end"],["Parallel","same openings"]], reverse:true}, count:6 },
    { gen:"triad-id", params:{ask:"numeral"}, count:2 },
    { type:"mc", q:"A period consists of…", choices:["an antecedent and a consequent","two motives","one long phrase"], answer:0,
      explain:"Question phrase + answer phrase." },
    { type:"mc", q:"The antecedent usually ends with…", choices:["a half cadence","a PAC","a plagal cadence"], answer:0,
      explain:"Open — waiting for the answer." },
    { type:"mc", q:"The consequent usually ends with…", choices:["an authentic cadence","a half cadence","no cadence"], answer:0,
      explain:"Closed — the sentence is complete." },
    { type:"mc", q:"A period whose phrases begin identically is…", choices:["parallel","contrasting","deceptive"], answer:0,
      explain:"Same opening = parallel." },
    { type:"truefalse", q:"A period is two phrases forming one complete thought.", answer:true,
      explain:"Question + answer." },
    { type:"truefalse", q:"In a contrasting period, both phrases begin the same way.", answer:false,
      explain:"Contrasting = different openings." },
    { type:"truefalse", q:"The consequent asks the question.", answer:false,
      explain:"The ANTECEDENT asks; the consequent answers." },
    { gen:"term-match", params:{subject:"term", pool:[["Open cadence","half"],["Closed cadence","authentic"],["a + a\u{2032}","parallel"],["a + b","contrasting"]], reverse:true}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 }
  ],
  vocabulary:[
    {term:"Antecedent", def:"The question phrase — usually ending with a half cadence."},
    {term:"Consequent", def:"The answer phrase — usually ending with an authentic cadence."},
    {term:"Period", def:"Antecedent + consequent: two phrases forming one complete musical sentence."},
    {term:"Parallel / Contrasting Period", def:"Parallel: both phrases begin alike (a + a\u{2032}). Contrasting: they begin differently (a + b)."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Antecedent</b> asks — ends with a <b>half cadence</b>.",
    "✔ <b>Consequent</b> answers — ends with an <b>authentic cadence</b>.",
    "✔ Together they form a <b>PERIOD</b>: one complete musical sentence.",
    "✔ <b>Parallel</b> = same openings (a + a\u{2032}) · <b>contrasting</b> = different (a + b).",
    "✔ The cadence pair (open → closed) is what makes the pairing work."
  ],
  tips:[
    "Hum a familiar tune phrase by phrase — most begin with a classic parallel period.",
    "Writing your own: copy the antecedent, change only its last measure to reach I — instant parallel period.",
    "The half cadence leaves the antecedent open; the PAC closes the consequent.",
    "Next lesson: repeating an idea at NEW pitch levels — the melodic sequence."
  ],
  rewards:{ badge:"Sentence Builder", icon:"\u{1F4AC}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Question (HC) + answer (PAC) = period.",
  quiz:[
    { type:"mc", q:"A period is…", choices:["two phrases: question + answer","one motive","a type of cadence"], answer:0,
      explain:"Antecedent + consequent.", hint:"A musical sentence." },
    { type:"mc", q:"The antecedent phrase…", choices:["asks — ends on a half cadence","answers — ends on I","never ends"], answer:0,
      explain:"Open-ended question.", hint:"Ante = before." },
    { type:"mc", q:"The consequent phrase…", choices:["answers — ends with an authentic cadence","asks the question","avoids cadences"], answer:0,
      explain:"It closes the sentence.", hint:"The full stop." },
    { type:"mc", q:"The typical cadence pair in a period is…", choices:["half, then authentic","authentic, then half","two deceptive"], answer:0,
      explain:"Open then closed.", hint:"Question first." },
    { type:"mc", q:"A parallel period's phrases…", choices:["begin with the same material","never share material","are in different keys"], answer:0,
      explain:"a + a\u{2032}.", hint:"Same start." },
    { type:"mc", q:"A contrasting period's phrases…", choices:["begin differently","begin identically","have no cadences"], answer:0,
      explain:"a + b.", hint:"New opening." },
    { type:"mc", q:"Phrase 1 ends on V; phrase 2 begins like phrase 1 and ends on I. This is…", choices:["a parallel period","a contrasting period","a rondo"], answer:0,
      explain:"Same openings + HC/PAC pair.", hint:"Compare the starts." },
    { type:"truefalse", q:"A period contains two cadences.", answer:true,
      explain:"One per phrase.", hint:"Count the endings." },
    { type:"truefalse", q:"The antecedent usually ends with a PAC.", answer:false,
      explain:"It ends OPEN — half cadence.", hint:"Questions don't close." },
    { type:"mc", q:"Which cadence lets the antecedent sound like a question?", choices:["The half cadence","The PAC","The plagal"], answer:0,
      explain:"Stopping on V = open.", hint:"Lesson 87's comma." },
    { type:"mc", q:"In 'a + b' period labeling, the letters describe…", choices:["how the phrases BEGIN","the cadences","the meter"], answer:0,
      explain:"Same letter = same opening material.", hint:"Openings, not endings." },
    { type:"mc", q:"Why do periods satisfy listeners?", choices:["The open question receives a closed answer","They are always loud","They avoid cadences"], answer:0,
      explain:"Tension posed, tension resolved.", hint:"Q then A." }
  ],
  miaPerfect:"PERFECT! Questions asked, answers delivered — the period is yours. \u{1F4AC}\u{1F389}",
  miaPass:"Passed! Two phrases, one sentence. Next: the melodic sequence…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Phrase 1 stopped on the dominant (question); phrase 2 began the same way and closed on the tonic (answer) — a parallel period.",
      play:()=>{const A=[[60,.4],[64,.4],[67,.4],[74,.4],[71,.9]],B=[[60,.4],[64,.4],[67,.4],[65,.4],[60,.9]];let t=0;A.forEach(([m,d])=>{MFAudio.tone(m,d*.95,t,.42);t+=d;});t+=.35;B.forEach(([m,d])=>{MFAudio.tone(m,d*.95,t,.42);t+=d;});} },
    learn:{ label:"phrases & periods",
      explain:"Antecedent (question, half cadence) + consequent (answer, authentic cadence) = period. Parallel: same openings; contrasting: different.",
      hint:"HC then PAC.",
      play:()=>{[[62,65,69],[67,71,74]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.7,i*.8,.28)));} },
    example:{ label:"the examples",
      explain:"Example 1 is a parallel period (same openings); example 2 a contrasting one — both close with the answering PAC." },
    game:{ label:"the games",
      explain:"Sprint the pairs, assemble a period in order, sort cadences on cards, then judge parallel vs contrasting.",
      hint:"Openings name the type; cadences do the work." },
    quiz:{ label:"this question",
      explain:"Two checks: which phrase ends open (that's the antecedent)? Do the openings match (parallel) or differ (contrasting)?",
      play:()=>{[[67,71,74],[60,64,67,72]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.85,.28)));} }
  }
};
