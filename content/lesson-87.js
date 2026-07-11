/* Lesson 87 — Cadences (Book 4, Unit 21 — SELF-AUTHORED)
   Core: CADENCE = the harmonic resting point ending a phrase.
   AUTHENTIC V(7)→I — PERFECT (PAC: both root position, tonic on top) vs
   IMPERFECT (IAC). HALF: ends ON V. PLAGAL: IV→I. DECEPTIVE: V→vi.
   NOTE: chord demos play immediately (no chime before demos).
   NOTE: edit by FULL-FILE REWRITE only. */

/* cadence ear lab */
function MF_L87_ear(container,fb){
  const CAD={
    auth:{rows:[[67,71,74,77],[60,64,67,72]], name:"Authentic (V7 \u{2192} I)"},
    half:{rows:[[62,65,69],[67,71,74]], name:"Half (ends ON V)"},
    plag:{rows:[[65,69,72],[60,64,67,72]], name:"Plagal (IV \u{2192} I)"},
    dec:{rows:[[67,71,74,77],[69,72,76]], name:"Deceptive (V7 \u{2192} vi)"}};
  const ROUNDS=["auth","half","dec","plag"];
  let r=0, played=false;
  container.innerHTML=`<div class="big-q l87e-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l87e-play">▶ Hear the phrase ending</button></div>
    <div class="choices l87e-ch" style="display:none"><button>Authentic — V to I, finished</button><button>Half — stops on V, unfinished</button><button>Plagal — IV to I, gentle</button><button>Deceptive — V to vi, surprise</button></div>`;
  const q=container.querySelector(".l87e-q"), pl=container.querySelector(".l87e-play"), ch=container.querySelector(".l87e-ch");
  const KEY=["auth","half","plag","dec"];
  pl.onclick=()=>{
    const C=CAD[ROUNDS[r]]; if(!C) return;
    MFAudio.tone(60,.5,.05,.3); MFAudio.tone(64,.5,.05,.2); MFAudio.tone(67,.5,.05,.2); /* set tonic context: I */
    C.rows.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.85,.8+i*.9,.28)));
    played=true; setTimeout(()=>ch.style.display="",2900);
  };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(!played) return;
    const want=ROUNDS[r];
    if(KEY[i]===want){ fb(true,"✓ "+CAD[want].name+" — correct."); r++; played=false; ch.style.display="none";
      if(r>=ROUNDS.length){ q.textContent="Excellent! All four cadences identified by ear."; pl.style.display="none"; } else q.innerHTML=`Round ${r+1} of ${ROUNDS.length}: listen, then name the cadence.`;
    } else { MFAudio.tone(40,.2); fb(false,"Ask two questions: did it land on I (finished) — and if so, from V (authentic) or IV (plagal)? If not: stopped on V (half) or slipped to vi (deceptive)?"); }
  });
  q.innerHTML="Round 1 of 4: listen, then name the cadence.";
}

LESSON_CONTENT[87]={
  welcome:"Cadences: how phrases end. \u{1F6A6}",
  hook:{
    say:"<b>Two phrase endings.</b> One closes the door completely; the other stops mid-air, asking for more. \u{1F447} <b>Which ending sounds FINISHED?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Ending A</button>
          <button class="play hk-b">▶ Ending B</button></div>
          <div class="choices hk-ch" style="display:none"><button>Ending A — it lands on the tonic (V \u{2192} I)</button><button>Ending B — stopping on V sounds final</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ [[60,64,67],[65,69,72],[67,71,74,77],[60,64,67,72]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.75,i*.8,.28))); hA=true; if(hB) setTimeout(()=>ch.style.display="",3700); };
        container.querySelector(".hk-b").onclick=()=>{ [[60,64,67],[62,65,69],[67,71,74]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.75,i*.8,.28))); hB=true; if(hA) setTimeout(()=>ch.style.display="",3000); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Ending A closed V \u{2192} I — an AUTHENTIC cadence, music's period. Ending B stopped ON V — a HALF cadence, music's open door. The four cadences: today's lesson!");
          else fb(false,"Ending B never came home — it hung on the dominant. Listen again for which one RESTS…");
        });
      } }
  },
  objectives:[
    "Define cadence: the harmonic resting point that ends a phrase",
    "Authentic cadence: V(7) → I — and PAC vs IAC",
    "Half cadence: the phrase stops ON V",
    "Plagal cadence: IV → I",
    "Deceptive cadence: V → vi",
    "Identify all four by ear and by eye"
  ],
  steps:[
    { say:"<b>Cadence:</b> the two-chord <b>resting point that ends a phrase</b> — harmony's punctuation. Some cadences close firmly, some pause, one surprises. \u{1F447} <b>A cadence appears at…</b>",
      try:{ type:"mc", choices:["The end of a phrase","Every single beat","Only a piece's final measure"], answer:0,
        success:"✓ Every phrase ends with one — pieces contain many cadences.",
        fail:"Where do phrases breathe?",
        hint:"Lesson 72's phrase endings." } },
    { say:"<b>Authentic Cadence — V(7) → I:</b> dominant resolving to tonic: the strongest close, music's <b>period</b>. \u{1F447} <b>An authentic cadence moves…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:80,notes:[
        {p:"G4",d:"h",label:"V7"},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},{p:"F5",d:"h",chord:true},
        {p:"C4",d:"w",label:"I"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"C5",d:"w",chord:true},{bar:"final"}],width:440} },
      try:{ type:"mc", choices:["From V (or V7) to I","From IV to I","From I to V"], answer:0,
        success:"✓ Dominant home to tonic — the definitive ending.",
        fail:"The strongest pull in harmony…",
        hint:"Leading tone rises to tonic." } },
    { say:"<b>Perfect vs Imperfect Authentic:</b> a <b>PAC</b> (perfect authentic cadence) needs BOTH chords in <b>root position</b> AND the <b>tonic in the soprano</b> — total closure. Anything less (inversion, or 3rd/5th on top) is an <b>IAC</b> (imperfect). \u{1F447} <b>V → I with the melody ending on E (the 3rd) is a…</b>",
      try:{ type:"mc", choices:["IAC — the soprano missed the tonic","PAC — good enough","Half cadence"], answer:0,
        success:"✓ Still authentic, but imperfect: full closure demands the tonic on top.",
        fail:"Check BOTH conditions…",
        hint:"Root positions + tonic soprano = PAC." } },
    { say:"<b>Half Cadence — ends ON V:</b> the phrase stops at the dominant and <b>waits</b> — music's <b>comma</b>. Any chord may precede the V. \u{1F447} <b>A half cadence ends on…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:80,notes:[
        {p:"C4",d:"h",label:"I"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"D4",d:"h",label:"ii"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"G4",d:"w",label:"V — wait…"},{p:"B4",d:"w",chord:true},{p:"D5",d:"w",chord:true},{bar:"final"}],width:480} },
      try:{ type:"mc", choices:["The V chord — unresolved","The I chord","The vi chord"], answer:0,
        success:"✓ Stopping ON the dominant leaves the phrase open — the next phrase must answer.",
        fail:"HALF-way home…",
        hint:"The comma chord." } },
    { say:"<b>Plagal Cadence — IV → I:</b> subdominant to tonic — a <b>gentle</b> close without a leading tone, familiar from the sung \u{201C}A-men\u{201D} at hymn endings. \u{1F447} <b>The plagal cadence moves…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:80,notes:[
        {p:"F4",d:"h",label:"IV"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"C4",d:"w",label:"I"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"C5",d:"w",chord:true},{bar:"final"}],width:400} },
      try:{ type:"mc", choices:["From IV to I","From V to I","From V to vi"], answer:0,
        success:"✓ IV → I — soft closure, no leading-tone push.",
        fail:"The subdominant leads this one…",
        hint:"The 'A-men' motion." } },
    { say:"<b>Deceptive Cadence — V → vi:</b> the ear expects V → I… and gets <b>vi</b> instead — a surprise that keeps the music going. <b>Remember: Authentic V→I · Half ends on V · Plagal IV→I · Deceptive V→vi.</b> \u{1F447} <b>Why is V → vi called deceptive?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:80,notes:[
        {p:"G4",d:"h",label:"V7"},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},{p:"F5",d:"h",chord:true},
        {p:"A4",d:"w",label:"vi — surprise!"},{p:"C5",d:"w",chord:true},{p:"E5",d:"w",chord:true},{bar:"final"}],width:440} },
      try:{ type:"mc", choices:["It promises I but resolves to vi","It has no dominant","It is always loud"], answer:0,
        success:"✓ The setup says home; the landing says vi — deception by expectation.",
        fail:"What did the ear expect after V?",
        hint:"The promised chord never comes." } },
    { say:"Name each cadence by ear. \u{1F447}",
      try:{ type:"custom",
        hint:"Finished on I? From V = authentic, from IV = plagal. Not on I? On V = half; on vi = deceptive.",
        mount:(container,fb)=>MF_L87_ear(container,fb) } },
    { say:"<b>Review:</b> \u{1F447} <b>Which cadence leaves the phrase UNFINISHED?</b>",
      try:{ type:"mc", choices:["The half cadence — it stops on V","The perfect authentic","The plagal"], answer:0,
        success:"✓ Ending on the dominant = an open door. (L73's section A ended exactly this way.)",
        fail:"Which one never reaches I?",
        hint:"The comma." } }
  ],
  examples:[
    { caption:"Four endings from one phrase: authentic (V7-I), half (…V), plagal (IV-I), deceptive (V7-vi). Same music, four punctuation marks.",
      staff:{clef:"treble",tempo:84,notes:[
        {p:"G4",d:"q",label:"V7"},{p:"B4",d:"q",chord:true},{p:"F5",d:"q",chord:true},
        {p:"C5",d:"q",label:"I"},{p:"E5",d:"q",chord:true},{p:"G5",d:"q",chord:true},{bar:"single"},
        {p:"D4",d:"q",label:"ii"},{p:"F4",d:"q",chord:true},{p:"A4",d:"q",chord:true},
        {p:"G4",d:"q",label:"V"},{p:"B4",d:"q",chord:true},{p:"D5",d:"q",chord:true},{bar:"single"},
        {p:"F4",d:"q",label:"IV"},{p:"A4",d:"q",chord:true},{p:"C5",d:"q",chord:true},
        {p:"C4",d:"q",label:"I"},{p:"E4",d:"q",chord:true},{p:"G4",d:"q",chord:true},{bar:"single"},
        {p:"G4",d:"q",label:"V7"},{p:"B4",d:"q",chord:true},{p:"F5",d:"q",chord:true},
        {p:"A4",d:"q",label:"vi!"},{p:"C5",d:"q",chord:true},{p:"E5",d:"q",chord:true},{bar:"final"}],width:680},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"PAC vs IAC: the same V7-I twice — first with the tonic proudly on top (perfect), then with the 3rd on top (imperfect). Hear the difference in finality.",
      staff:{clef:"treble",tempo:80,notes:[
        {p:"G4",d:"h",label:"V7"},{p:"B4",d:"h",chord:true},{p:"F5",d:"h",chord:true},
        {p:"C4",d:"h",label:"I (C on top)"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{p:"C5",d:"h",chord:true},{bar:"single"},
        {p:"G4",d:"h",label:"V7"},{p:"B4",d:"h",chord:true},{p:"F5",d:"h",chord:true},
        {p:"C4",d:"h",label:"I (E on top)"},{p:"G4",d:"h",chord:true},{p:"C5",d:"h",chord:true},{p:"E5",d:"h",chord:true},{bar:"final"}],width:640},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Cadence Sprint (45s)",
      intro:"Four cadences, their formulas and jobs — race them!",
      miaIntro:"Period, comma, amen, surprise! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Authentic cadence","V(7) \u{2192} I"],
        ["Half cadence","ends ON V"],
        ["Plagal cadence","IV \u{2192} I"],
        ["Deceptive cadence","V \u{2192} vi"],
        ["PAC requires","root positions + tonic on top"],
        ["IAC","authentic, but not perfect"],
        ["The unfinished cadence","half"],
        ["The gentle close","plagal"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — cadence fluent!":null },
    { type:"key-climb", title:"Game 2 · Play the Authentic Close",
      intro:"Play V7 \u{2192} I from the bottom up — the strongest ending in music!",
      miaIntro:"Dominant home! \u{1FA9C}",
      spec:{seq:[55,59,62,65, 48,52,55,60],
        names:["G (V7 root)","B (leading tone!)","D","F (the 7th)","C (I root)","E","G","C (tonic on top — PAC!)"],
        start:48, octaves:2, title:"V7 \u{2192} I, note by note"},
      result:(score)=>score!==null?"The period, performed!":null },
    { type:"symbol-hunt", title:"Game 3 · Name That Cadence",
      intro:"Cadence pairs on cards — click the one each round names!",
      miaIntro:"Read the last two chords! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Authentic (V \u{2192} I)", spec:{clef:"treble",notes:[{p:"G4",d:"h"},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},{p:"C4",d:"h"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true}],width:210}},
        {label:"Plagal (IV \u{2192} I)", spec:{clef:"treble",notes:[{p:"F4",d:"h"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},{p:"C4",d:"h"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true}],width:210}},
        {label:"Deceptive (V \u{2192} vi)", spec:{clef:"treble",notes:[{p:"G4",d:"h"},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},{p:"A4",d:"h"},{p:"C5",d:"h",chord:true},{p:"E5",d:"h",chord:true}],width:210}},
        {label:"Half (ends on V)", spec:{clef:"treble",notes:[{p:"C4",d:"h"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{p:"G4",d:"h"},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true}],width:210}}]},
      result:(score)=>score>=5?"Cadences read on sight!":null },
    { type:"term-race", title:"Game 4 · Punctuation Race",
      intro:"Match each cadence to its punctuation and feel — at speed!",
      miaIntro:"How does the sentence end? \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["The period","authentic (V\u{2192}I)"],
        ["The comma","half (ends on V)"],
        ["The gentle amen","plagal (IV\u{2192}I)"],
        ["The plot twist","deceptive (V\u{2192}vi)"],
        ["Full closure","PAC"],
        ["Closure with reservations","IAC"],
        ["Keeps the music going","deceptive"],
        ["Waits for an answer","half"]]},
      result:(score)=>score>=6?"Every ending punctuated!":null }
  ],
  practiceIntro:"20 practice questions — formulas, punctuation and PAC/IAC. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Authentic","V \u{2192} I"],["Half","ends on V"],["Plagal","IV \u{2192} I"],["Deceptive","V \u{2192} vi"],["PAC","perfect authentic"],["Cadence","phrase's resting point"]], reverse:true}, count:6 },
    { gen:"triad-id", params:{ask:"numeral"}, count:2 },
    { type:"mc", q:"A cadence is…", choices:["the harmonic resting point ending a phrase","a fast scale","a type of clef"], answer:0,
      explain:"Harmony's punctuation." },
    { type:"mc", q:"The authentic cadence is…", choices:["V(7) → I","IV → I","V → vi"], answer:0,
      explain:"Dominant to tonic — the period." },
    { type:"mc", q:"A PAC requires…", choices:["root positions and the tonic in the soprano","any V and any I","a IV chord"], answer:0,
      explain:"Both conditions for full closure." },
    { type:"mc", q:"The half cadence ends on…", choices:["V","I","vi"], answer:0,
      explain:"The open door." },
    { type:"mc", q:"IV → I is the…", choices:["plagal cadence","authentic cadence","deceptive cadence"], answer:0,
      explain:"The gentle 'A-men' close." },
    { type:"mc", q:"V → vi is the…", choices:["deceptive cadence","plagal cadence","half cadence"], answer:0,
      explain:"The promised I never arrives." },
    { type:"truefalse", q:"A half cadence sounds finished.", answer:false,
      explain:"It waits on the dominant." },
    { type:"truefalse", q:"An IAC is still an authentic cadence.", answer:true,
      explain:"V → I, just not perfect." },
    { gen:"term-match", params:{subject:"term", pool:[["Finished, strongest","PAC"],["Finished, gentle","plagal"],["Unfinished, waiting","half"],["Surprised","deceptive"]], reverse:true}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:1 }
  ],
  vocabulary:[
    {term:"Cadence", def:"The two-chord resting point that ends a phrase — harmony's punctuation."},
    {term:"Authentic Cadence (PAC / IAC)", def:"V(7) → I. Perfect = root positions + tonic soprano; otherwise imperfect."},
    {term:"Half Cadence", def:"The phrase stops ON V — open, waiting for an answer."},
    {term:"Plagal & Deceptive", def:"Plagal: IV → I, the gentle close. Deceptive: V → vi, the surprise that keeps music moving."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Cadence</b> = the resting point ending every phrase.",
    "✔ <b>Authentic V(7)→I</b>: the period — <b>PAC</b> (roots + tonic on top) vs <b>IAC</b>.",
    "✔ <b>Half</b>: ends ON V — the comma.",
    "✔ <b>Plagal IV→I</b>: the gentle close · <b>Deceptive V→vi</b>: the surprise.",
    "✔ Ear test: finished or not? From V or IV? On V or vi?"
  ],
  tips:[
    "Question-answer pairs: phrase 1 half cadence, phrase 2 PAC — the design of countless melodies (and next lesson's periods).",
    "Deceptive cadences extend pieces: composers 'miss' the ending on purpose, then land it for real.",
    "Sing the soprano at each cadence — ending on 1 (PAC) feels different from ending on 3 (IAC).",
    "Unit 21 complete! Next unit: phrases pair into PERIODS — cadences make it possible."
  ],
  rewards:{ badge:"Cadence Keeper", icon:"\u{1F6A6}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Period, comma, amen, surprise.",
  quiz:[
    { type:"mc", q:"A cadence is best described as…", choices:["the harmonic resting point at a phrase's end","the fastest part of a piece","a repeated motive"], answer:0,
      explain:"Punctuation in harmony.", hint:"Where phrases rest." },
    { type:"mc", q:"Which formula is the authentic cadence?", choices:["V(7) → I","IV → I","V → vi"], answer:0,
      explain:"Dominant resolves to tonic.", hint:"The strongest close." },
    { type:"mc", q:"A perfect authentic cadence (PAC) requires…", choices:["both chords in root position and the tonic in the soprano","any V-I motion","the IV chord"], answer:0,
      explain:"Two strict conditions.", hint:"Perfection has rules." },
    { type:"mc", q:"V → I where the soprano ends on the 3rd is…", choices:["an IAC","a PAC","a plagal cadence"], answer:0,
      explain:"Authentic but imperfect.", hint:"Check the top note." },
    { type:"mc", q:"The half cadence…", choices:["ends on V, unresolved","ends on I","moves IV to I"], answer:0,
      explain:"Open — the comma.", hint:"Half-way home." },
    { type:"mc", q:"The plagal cadence is…", choices:["IV → I","V → I","ii → V"], answer:0,
      explain:"The gentle close.", hint:"'A-men.'" },
    { type:"mc", q:"The deceptive cadence resolves V to…", choices:["vi","I","IV"], answer:0,
      explain:"The tonic substitute takes I's place.", hint:"The surprise chord." },
    { type:"mc", q:"Name the cadence.",
      staff:{clef:"treble",notes:[{p:"G4",d:"h"},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},{p:"A4",d:"h"},{p:"C5",d:"h",chord:true},{p:"E5",d:"h",chord:true}],width:240},
      choices:["Deceptive — V moved to vi","Authentic","Plagal"], answer:0,
      explain:"G-B-D to A-C-E: V → vi.", hint:"Where did V land?" },
    { type:"truefalse", q:"A phrase ending on V has reached a half cadence.", answer:true,
      explain:"Stopping on the dominant defines it.", hint:"The open door." },
    { type:"truefalse", q:"The deceptive cadence sounds exactly as expected.", answer:false,
      explain:"Its whole point is the surprise.", hint:"De-CEP-tive." },
    { type:"mc", q:"Which cadence pair matches 'question, then answer'?", choices:["Half cadence, then PAC","PAC, then half","Two deceptive cadences"], answer:0,
      explain:"Open comma, closing period — next lesson's period structure.", hint:"Unfinished first." },
    { type:"mc", q:"You hear a phrase land gently on I with no leading-tone pull. The cadence is…", choices:["plagal (IV → I)","authentic","half"], answer:0,
      explain:"IV has no leading tone — the soft landing.", hint:"The amen." }
  ],
  miaPerfect:"PERFECT! Period, comma, amen and surprise — every ending under control. \u{1F6A6}\u{1F389}",
  miaPass:"Passed — and UNIT 21 is COMPLETE! Keys, chords, functions, cadences: the harmony toolkit stands. \u{1F389}",
  mia:{
    hook:{ label:"the welcome",
      explain:"Ending A closed V\u{2192}I (authentic — finished); ending B stopped ON V (half — waiting). Cadences are harmony's punctuation.",
      play:()=>{[[60,64,67],[65,69,72],[67,71,74,77],[60,64,67,72]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.7,i*.75,.28)));} },
    learn:{ label:"cadences",
      explain:"Authentic V(7)→I (PAC: roots + tonic on top; else IAC) · half ends ON V · plagal IV→I · deceptive V→vi.",
      hint:"Finished? From where?",
      play:()=>{[[67,71,74,77],[69,72,76]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.85,.28)));} },
    example:{ label:"the examples",
      explain:"Example 1 plays all four endings in a row; example 2 contrasts PAC and IAC — listen to the soprano's landing note." },
    game:{ label:"the games",
      explain:"Sprint the formulas, perform V7→I, name cadences on cards, then match punctuation at speed.",
      hint:"Last two chords tell all." },
    quiz:{ label:"this question",
      explain:"Two questions crack every cadence: did it finish on I (authentic/plagal — check the approach chord)? If not, is it waiting on V (half) or surprised on vi (deceptive)?",
      play:()=>{[[65,69,72],[60,64,67,72]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.85,.28)));} }
  }
};
