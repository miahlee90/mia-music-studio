/* Lesson 74 — ABA (Ternary) Form (AEMT Book 3, Unit 18)
   Built from drafts/UNIT 18 – Lesson 74.md; AEMT3 p.116 verified by render.
   Core: THREE-PART FORMS = ABA (TERNARY): A = statement, B = contrasting
   statement of new material, A = RESTATEMENT of the A section. One of the
   most common forms in all types of music, from folk songs to symphonies.
   NOTE: edit by FULL-FILE REWRITE only. */

/* section sequencer: hear three sections, label each A or B */
function MF_L74_seq(container,fb){
  const SEC_A={notes:[67,64,60,64,67,67], durs:[.45,.45,.45,.45,.45,.9]};
  const SEC_B={notes:[69,70,69,65,62,65], durs:[.45,.45,.45,.45,.45,.9]};
  const ORDER=[SEC_A,SEC_B,SEC_A];
  let k=0; const picked=[];
  container.innerHTML=`<div class="big-q l74s-q" style="text-align:center">A three-section piece plays one section at a time. Label each one: A or B?</div>
    <div class="l74s-map" style="text-align:center;font-weight:800;font-size:18px;letter-spacing:6px;margin:6px 0">· · ·</div>
    <div style="text-align:center"><button class="play l74s-play">▶ Play section 1</button></div>
    <div class="choices chips l74s-ch" style="display:none"><button>A</button><button>B</button></div>`;
  const q=container.querySelector(".l74s-q"), map=container.querySelector(".l74s-map"), pl=container.querySelector(".l74s-play"), ch=container.querySelector(".l74s-ch");
  let played=false;
  function drawMap(){ map.textContent=[0,1,2].map(i=>i<picked.length?picked[i]:"·").join(" "); }
  function play(S){ let t=0; S.notes.forEach((m,i)=>{ MFAudio.tone(m,S.durs[i]*.95,t,.42); t+=S.durs[i]; }); return t; }
  pl.onclick=()=>{ if(k>=3) return; play(ORDER[k]); played=true; setTimeout(()=>ch.style.display="",3300); };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(!played||k>=3) return;
    const want=(k===1)?1:0;
    if(i===want){ MFAudio.yay();
      picked.push(b.textContent); drawMap(); k++; played=false; ch.style.display="none";
      if(k<3){ fb(true, k===1? "✓ Section 1 = A, the STATEMENT. Now section 2…" : "✓ Section 2 = B — NEW material, the contrast. One more…");
        pl.textContent=`▶ Play section ${k+1}`; }
      else { pl.style.display="none";
        fb(true,"✓ Section 3 = A again — the RESTATEMENT! You just heard A-B-A: statement, contrast, return. TERNARY form, mapped by ear.");
        q.textContent="A · B · A — the round trip complete."; }
    } else { MFAudio.tone(40,.2); fb(false, k===2? "Listen — is this NEW material, or the very first section coming home?" : "Compare with what you've heard so far: same material or new?"); }
  });
  drawMap();
}

LESSON_CONTENT[74]={
  welcome:"AB was a one-way trip. Today the music buys a RETURN ticket. \u{1F3AB}",
  hook:{
    say:"Three sections. Listen to the whole journey — <b>what happens at the end that never happened in AB form?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play all three sections</button></div>
          <div class="choices hk-ch" style="display:none"><button>The FIRST section came back — the music returned home</button><button>The piece just stopped mid-idea</button><button>A brand-new fourth idea appeared</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{
          const A=[67,64,60,64,67,67], B=[69,70,69,65,62,65];
          let t=0;
          A.forEach(m=>{ MFAudio.tone(m,.42,t,.42); t+=.45; }); t+=.3;
          B.forEach(m=>{ MFAudio.tone(m,.42,t,.4); t+=.45; }); t+=.3;
          A.forEach(m=>{ MFAudio.tone(m,.42,t,.42); t+=.45; });
          setTimeout(()=>ch.style.display="",t*1000+400);
        };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Statement… contrast… RETURN. That A-B-A shape is TERNARY form — one of the most common designs in all of music, from folk songs to symphonies. Today's lesson!");
          else fb(false,"Focus on the LAST section — where have you heard that material before?");
        });
      } }
  },
  objectives:[
    "Define ABA (ternary) form: three parts from two sections",
    "Name the jobs: A = statement, B = contrast (new material), A = restatement",
    "Contrast ternary (returns home) with binary (doesn't)",
    "Know ABA's range: folk songs to symphonies",
    "Map verse/refrain onto a real ABA song",
    "Identify ABA by ear and by eye"
  ],
  steps:[
    { say:"The definition: <b>THREE-PART FORMS, called ABA (or TERNARY FORM), consist of two musically distinct sections, as does AB form</b> — but here there's <b>A (a statement), B (a contrasting statement of new material), and A (a RESTATEMENT of the A section)</b>. \u{1F447} <b>How many DIFFERENT sections does ABA contain?</b>",
      try:{ type:"mc", choices:["Two — the A simply returns","Three completely different ones","One"], answer:0,
        success:"✓ Only A and B exist; the third part is A coming home. Three-part form, two-part material!",
        fail:"Count the LETTERS, then count the DIFFERENT letters…",
        hint:"A, B and… A again." } },
    { say:"The three jobs, in the book's own words: <b>A = statement · B = contrasting statement of new material · A = restatement</b>. \u{1F447} <b>The B section's job is to…</b>",
      try:{ type:"mc", choices:["Bring NEW, contrasting material","Repeat A quietly","End the piece"], answer:0,
        success:"✓ B is the adventure between two homecomings — new melody, new color, new territory.",
        fail:"What word does the book attach to B?",
        hint:"'Contrasting… NEW material.'" } },
    { say:"Why it matters: ABA is <b>one of the most common forms found in ALL types of music, from folk songs to symphonies</b>. The return of A satisfies like nothing else — you leave home, you come back changed. \u{1F447} <b>Where can ABA form be found?</b>",
      try:{ type:"mc", choices:["Everywhere — folk songs to symphonies","Only in piano music","Only in the Baroque era"], answer:0,
        success:"✓ Lullabies, spirituals, minuets, symphony movements — the round trip is universal.",
        fail:"The book names the range explicitly…",
        hint:"From ____ songs to ____." } },
    { say:"Now map it by EAR — three sections, three labels. \u{1F447}",
      try:{ type:"custom",
        hint:"Section 3 should sound like an old friend.",
        mount:(container,fb)=>MF_L74_seq(container,fb) } },
    { say:"The book's example is \u{201C}Swing Low, Sweet Chariot\u{201D}: the <b>refrain (\u{201C}Swing low…\u{201D}) opens as A</b>, the <b>verse (\u{201C}I looked over Jordan…\u{201D}) contrasts as B</b>, then <b>the refrain RETURNS as A</b>. \u{1F447} <b>In this song, the VERSE is which section?</b>",
      try:{ type:"mc", choices:["B — the contrasting middle","A — it opens the song","Neither"], answer:0,
        success:"✓ Refrain-verse-refrain = A-B-A. (Compare Lesson 73's song, where verse-refrain made AB — the same ingredients can build different forms!)",
        fail:"Which text does the song START and END with?",
        hint:"The famous title line frames the journey." } },
    { say:"Binary vs ternary, face to face: <b>AB ends in new territory; ABA ends back home</b>. \u{1F447} <b>A piece ends with the exact music it began with. Its form is most likely…</b>",
      try:{ type:"mc", choices:["ABA — the restatement closed the loop","AB — endings are always new","Impossible to say"], answer:0,
        success:"✓ The homecoming ending is ternary's signature. AB waves goodbye from afar; ABA walks you back to your door.",
        fail:"Which form RESTATES its opening?",
        hint:"The return ticket." } },
    { say:"Analyst's detail: the returning A may be <b>written out again or marked with repeat signs/D.C. al Fine</b> — and performers often vary it slightly. Its material, though, is <b>the A section's</b>. \u{1F447} <b>A 'restatement' means the final section uses…</b>",
      try:{ type:"mc", choices:["The A section's material again","Brand-new material","Only the B motive"], answer:0,
        success:"✓ Same material, possibly refreshed — the listener must RECOGNIZE home for ternary to work. Next lesson, A comes back even more often…",
        fail:"Re-STATE = state again…",
        hint:"The prefix does the work." } }
  ],
  examples:[
    { caption:"A miniature ternary piece: A states (built on the tonic), B contrasts with new rising material (leaning on the dominant), and A returns home word for word.",
      staff:{clef:"treble",tempo:100,notes:[
        {p:"G4",d:"q",label:"A: statement"},{p:"E4",d:"q"},{p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"h"},{bar:"double"},
        {p:"A4",d:"q",label:"B: NEW material"},{p:"Bb4",d:"q"},{p:"A4",d:"q"},{p:"F4",d:"q"},{p:"D4",d:"h"},{bar:"double"},
        {p:"G4",d:"q",label:"A: restatement!"},{p:"E4",d:"q"},{p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"h"},{bar:"final"}],width:680},
      kb:{start:57,octaves:2,labels:true} },
    { caption:"The same shape drawn with chords: home (I), away (IV and V7 territory), home again (I) — harmony making the same round trip as the melody.",
      staff:{clef:"treble",tempo:90,notes:[
        {p:"C4",d:"h",label:"A: home"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"F4",d:"h",label:"B: away…"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"G4",d:"h",label:"…farther…"},{p:"B4",d:"h",chord:true},{p:"F5",d:"h",chord:true},
        {p:"C4",d:"w",label:"A: home again"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:560},
      kb:{start:57,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Ternary Sprint (45s)",
      intro:"Statements, contrasts, restatements — race the three-part facts!",
      miaIntro:"Home, away, home! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["ABA form","ternary — three-part form"],
        ["The first A","the statement"],
        ["The B section","a contrasting statement of new material"],
        ["The final A","the restatement"],
        ["Number of DISTINCT sections in ABA","two"],
        ["ABA's popularity","folk songs to symphonies"],
        ["AB vs ABA","one ends away; the other returns home"],
        ["'Swing Low' opening section","the refrain, as A"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — ternary in the blood!":null },
    { type:"key-climb", title:"Game 2 · Play the Round Trip",
      intro:"Perform a whole ABA in miniature: A down-up, B's new idea, A again!",
      miaIntro:"Buy the return ticket! \u{1FA9C}",
      spec:{seq:[67,64,60,64,67, 69,70,65,62, 67,64,60,64,67],
        names:["G (A begins)","E","C","E","G (A ends)","A (B: new!)","B♭","F","D (B ends)","G (A RETURNS)","E","C","E","G — home!"],
        start:57, octaves:2, title:"A · B · A under your fingers"},
      result:(score)=>score!==null?"Round trip performed — welcome home!":null },
    { type:"symbol-hunt", title:"Game 3 · Statement or Contrast?",
      intro:"A-material, B-material, and the two endings — click what's called!",
      miaIntro:"Recognize home when you see it! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"A material (the statement)", spec:{clef:"treble",notes:[{p:"G4",d:"q"},{p:"E4",d:"q"},{p:"C4",d:"q"},{p:"E4",d:"q"}],width:170}},
        {label:"B material (new, contrasting)", spec:{clef:"treble",notes:[{p:"A4",d:"q"},{p:"Bb4",d:"q"},{p:"A4",d:"q"},{p:"F4",d:"q"}],width:170}},
        {label:"The restatement (A again!)", spec:{clef:"treble",notes:[{p:"G4",d:"q"},{p:"E4",d:"q"},{p:"C4",d:"q"},{p:"G4",d:"h"}],width:170}},
        {label:"AB ending (no return)", spec:{clef:"treble",notes:[{p:"A4",d:"q"},{p:"F4",d:"q"},{p:"D4",d:"h"}],width:170}}]},
      result:(score)=>score>=5?"Home spotted from any distance!":null },
    { type:"order-tap", title:"Game 4 · Assemble the Ternary Journey",
      intro:"Tap the sections of an ABA piece in order — with their JOB names!",
      miaIntro:"Statement, contrast, restatement! \u{1F3C1}",
      spec:{sequence:["A — the statement","B — new contrasting material","A — the restatement"],
        title:"One ternary piece, start to finish"},
      result:(stars)=>stars>=2?"The round trip runs itself now!":null }
  ],
  practiceIntro:"20 practice questions — jobs, journeys and the AB/ABA difference. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Ternary","three-part (ABA)"],["Statement","the first A"],["Contrast","the B section"],["Restatement","the final A"],["Binary","two-part (AB)"]], reverse:true}, count:6 },
    { gen:"triad-id", params:{ask:"numeral"}, count:2 },
    { type:"mc", q:"Three-part forms are called…", choices:["ABA or ternary form","AB or binary form","rondo form"], answer:0,
      explain:"Ter = three (AEMT3 p.116)." },
    { type:"mc", q:"ABA form consists of how many musically DISTINCT sections?", choices:["two — like AB form","three","one"], answer:0,
      explain:"A and B; the third part restates A." },
    { type:"mc", q:"In ABA, the B section is…", choices:["a contrasting statement of new material","a repeat of A","always silent"], answer:0,
      explain:"The adventure in the middle." },
    { type:"mc", q:"The final A of ABA is called the…", choices:["restatement","introduction","coda"], answer:0,
      explain:"A stated again — home." },
    { type:"mc", q:"ABA form appears in…", choices:["all types of music, folk songs to symphonies","only children's songs","only opera"], answer:0,
      explain:"One of music's most common shapes." },
    { type:"mc", q:"In the book's 'Swing Low, Sweet Chariot,' the A sections carry…", choices:["the refrain","the verse","an instrumental solo"], answer:0,
      explain:"Refrain-verse-refrain = A-B-A there." },
    { type:"truefalse", q:"ABA ends with the same material it began with.", answer:true,
      explain:"The homecoming defines it." },
    { type:"truefalse", q:"AB form also returns to its opening material at the end.", answer:false,
      explain:"AB ends in B territory — no return." },
    { type:"truefalse", q:"The B section of ABA uses the same material as A.", answer:false,
      explain:"NEW material — that's its whole job." },
    { type:"truefalse", q:"A piece can be ternary even if the returning A is varied slightly.", answer:true,
      explain:"Recognizable A material = restatement." }
  ],
  miaQuizIntro:"Quiz! Three letters, two ideas, one satisfying return.",
  quiz:[
    { type:"mc", q:"Three-part forms are called…", choices:["ABA or ternary form","binary form","dual form"], answer:0,
      explain:"The book's twin names.", hint:"Ter- = 3." },
    { type:"mc", q:"In ABA form, the first A is…", choices:["a statement","a restatement","a contrast"], answer:0,
      explain:"The opening idea, stated.", hint:"It speaks first." },
    { type:"mc", q:"The B section is…", choices:["a contrasting statement of NEW material","the same as A","a drum break"], answer:0,
      explain:"Fresh territory in the middle.", hint:"The book's exact phrase." },
    { type:"mc", q:"The final A is…", choices:["a restatement of the A section","new material","optional decoration"], answer:0,
      explain:"Home again.", hint:"Re-state." },
    { type:"truefalse", q:"ABA form consists of two musically distinct sections, like AB form.", answer:true,
      explain:"Two ideas; three appearances.", hint:"Count distinct letters." },
    { type:"truefalse", q:"ABA is one of the most common forms in all types of music.", answer:true,
      explain:"Folk songs to symphonies.", hint:"The book's claim." },
    { type:"mc", q:"You hear: opening tune → totally new middle → opening tune again. The form is…", choices:["ABA (ternary)","AB (binary)","a 12-bar blues"], answer:0,
      explain:"Statement-contrast-restatement.", hint:"The return seals it." },
    { type:"mc", q:"You hear: opening tune → new material → END (no return). The form is…", choices:["AB (binary)","ABA (ternary)","rondo"], answer:0,
      explain:"No homecoming = two-part.", hint:"Lesson 73's shape." },
    { type:"mc", q:"In 'Swing Low, Sweet Chariot' (the book's ABA example), the VERSE is…", choices:["the B section","the first A","the final A"], answer:0,
      explain:"Refrain frames it; the verse contrasts in the middle.", hint:"'I looked over Jordan…' sits where?" },
    { type:"mc", q:"Compared with Lesson 73's song (verse=A, refrain=B), 'Swing Low' shows that…", choices:["the same verse/refrain ingredients can build DIFFERENT forms","refrains are always A","verses are always A"], answer:0,
      explain:"Form depends on the ORDER of appearances, not the labels.", hint:"Who opens the song?" },
    { type:"mc", q:"Why does the ABA return satisfy listeners?", choices:["Recognizing the opening material feels like coming home","It's always louder","It changes the key"], answer:0,
      explain:"Departure and return — the oldest story there is.", hint:"The journey metaphor." },
    { type:"mc", q:"An ABA piece's middle section would most likely feature…", choices:["a new melody, possibly new harmony territory","an exact copy of the opening","silence"], answer:0,
      explain:"Contrast through the elements — like B's dominant-leaning music in the example.", hint:"B's job description." },
    /* generated */
    { gen:"term-match", params:{subject:"term", pool:[["Statement","the first A"],["New material","the B"],["Restatement","the last A"],["Ternary","the three-part name"]], reverse:true}, count:3 },
    { gen:"triad-id", params:{ask:"numeral"}, count:2 },
    { gen:"note-value", params:{}, count:1 }
  ],
  vocabulary:[
    {term:"ABA (Ternary) Form", def:"A three-part form: A (statement), B (contrasting new material), A (restatement). Two distinct sections, three appearances."},
    {term:"Statement", def:"The first A — the piece's main idea, presented."},
    {term:"Contrasting Statement", def:"The B section — genuinely NEW material between the two A's."},
    {term:"Restatement", def:"The returning A — home again, sometimes lightly varied but always recognizable."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>ABA = TERNARY form</b>: three parts built from <b>two distinct sections</b>.",
    "✔ The jobs: <b>A statement · B contrasting NEW material · A restatement</b>.",
    "✔ Found <b>everywhere</b> — folk songs to symphonies.",
    "✔ The difference from AB: ternary <b>returns home</b>; binary ends away.",
    "✔ In 'Swing Low': <b>refrain = A, verse = B</b> — same ingredients, different architecture than Lesson 73's song."
  ],
  tips:[
    "Ternary radar: if you can hum the ENDING before the piece gets there (because it's the beginning again), you're in ABA.",
    "Composers often mark the return with 'D.C. al Fine' instead of rewriting A — your Lesson 21 roadmap skills predicted this!",
    "When B borrows a rhythm from A but changes the melody, the form still counts as ternary — contrast lives in the overall material.",
    "Final lesson next: what if A returns not once, but again and AGAIN? The rondo awaits — and with it, the finish line!"
  ],
  rewards:{ badge:"Round-Trip Captain", icon:"\u{1F3AB}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"PERFECT! Statement, contrast, restatement — the round trip is flawless. \u{1F3AB}\u{1F389}",
  miaPass:"Passed! You always find your way home now. ONE lesson remains…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Three sections played: the first idea, a contrasting middle, then the FIRST idea again — statement, contrast, restatement: ABA.",
      play:()=>{const A=[67,64,60,64,67],B=[69,70,65,62];let t=0;A.forEach(m=>{MFAudio.tone(m,.4,t,.42);t+=.42;});t+=.25;B.forEach(m=>{MFAudio.tone(m,.4,t,.4);t+=.42;});t+=.25;A.forEach(m=>{MFAudio.tone(m,.4,t,.42);t+=.42;});} },
    learn:{ label:"ternary form",
      explain:"ABA: two distinct sections, three parts. A states, B contrasts with new material, A restates. Ubiquitous, folk to symphony. Unlike AB, it ends at home.",
      hint:"Home, away, home.",
      play:()=>{[67,64,60,64,67].forEach((m,i)=>MFAudio.tone(m,.4,i*.42,.42));} },
    example:{ label:"the examples",
      explain:"Example 1 is a written-out miniature ABA; example 2 makes the harmony take the same round trip (I → IV/V7 → I)." },
    game:{ label:"the games",
      explain:"Sprint the jobs, perform a full round trip, spot statements vs contrasts, then assemble the journey in order.",
      hint:"The last section should feel familiar." },
    quiz:{ label:"this question",
      explain:"Ask one thing: does the opening material RETURN at the end? Yes = ternary. No = binary. Then name the three jobs.",
      play:()=>{[67,64,60,64,67].forEach((m,i)=>MFAudio.tone(m,.4,i*.4,.42));} }
  }
};
