/* Lesson 89 — Melodic Sequence (Book 4, Unit 22 — SELF-AUTHORED)
   Core: SEQUENCE = a motive immediately repeated at a NEW pitch level,
   usually 2-3 times, stepwise. TONAL sequence stays in the key (intervals
   adjust); EXACT (real) sequence keeps intervals exact (needs accidentals).
   NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[89]={
  welcome:"The melodic sequence: one idea, climbing or falling. \u{1FA9C}",
  hook:{
    say:"<b>One short idea, stated three times</b> — each time one step lower. \u{1F447} <b>Listen: what happens to the idea?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the passage</button></div>
          <div class="choices hk-ch" style="display:none"><button>It repeats at lower and lower pitch levels</button><button>It repeats at the same pitch</button><button>It never repeats</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{
          const M=[[72,71,72,67],[71,69,71,65],[69,67,69,64]];
          let t=0; M.forEach(seg=>{ seg.forEach(m=>{ MFAudio.tone(m,.28,t,.42); t+=.3; }); t+=.15; });
          setTimeout(()=>ch.style.display="",t*1000+400);
        };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ The same shape moved down a step with each repetition — a MELODIC SEQUENCE, one of music's oldest development tools. Today's lesson!");
          else fb(false,"The SHAPE stayed identical — follow its starting note: C… B… A…");
        });
      } }
  },
  objectives:[
    "Define sequence: a motive immediately repeated at a new pitch level",
    "Know the norms: stepwise moves, two or three repetitions",
    "Tell TONAL sequences (stay in key) from EXACT/real (intervals preserved)",
    "Spot sequences on the staff by their repeating shape",
    "Connect sequence to motive development (Lesson 72)",
    "Use sequence as a composing tool"
  ],
  steps:[
    { say:"<b>Melodic Sequence:</b> a motive <b>immediately repeated at a different pitch level</b> — usually moving by step, usually two or three times. Repetition at the SAME pitch is just repetition; sequence must MOVE. \u{1F447} <b>What makes a repetition a sequence?</b>",
      try:{ type:"mc", choices:["The repeat happens at a new pitch level","It gets louder","It changes rhythm completely"], answer:0,
        success:"✓ Same shape, new level — that motion is the sequence.",
        fail:"Compare simple repetition with the hook's passage…",
        hint:"The level moves." } },
    { say:"<b>The Norms:</b> sequences usually move <b>by step</b> (up or down a 2nd each time) and repeat the pattern <b>two or three times</b> — more grows tiresome, composers stop at three. \u{1F447} <b>A typical sequence repeats its pattern…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:104,notes:[
        {p:"C5",d:"8",label:"1st"},{p:"B4",d:"8"},{p:"C5",d:"8"},{p:"G4",d:"8"},
        {p:"B4",d:"8",label:"2nd (down a step)"},{p:"A4",d:"8"},{p:"B4",d:"8"},{p:"F4",d:"8"},
        {p:"A4",d:"8",label:"3rd"},{p:"G4",d:"8"},{p:"A4",d:"8"},{p:"E4",d:"8"},{bar:"final"}],
        beams:[[0,3],[4,7],[8,11]],width:640} },
      try:{ type:"mc", choices:["Two or three times, stepwise","At least ten times","Only once, exactly"], answer:0,
        success:"✓ Two or three statements, each a step away — the classic shape.",
        fail:"How many statements did the example show?",
        hint:"Three and stop." } },
    { say:"<b>Tonal Sequence:</b> stays <b>inside the key</b> — the shape repeats on the scale's own notes, so some intervals shrink or grow (a M2 may become a m2). Most sequences are tonal. \u{1F447} <b>In a tonal sequence, the intervals…</b>",
      try:{ type:"mc", choices:["Adjust to fit the key's notes","Stay mathematically exact","Disappear"], answer:0,
        success:"✓ The key's own notes bend the intervals slightly — same shape, diatonic spelling.",
        fail:"No accidentals appear…",
        hint:"The key rules." } },
    { say:"<b>Exact (Real) Sequence:</b> keeps <b>every interval exact</b>, which forces <b>accidentals</b> as the pattern moves. Rare and striking — the shape feels 'copied and pasted' precisely. <b>Remember: tonal = in the key · exact = intervals preserved (accidentals appear).</b> \u{1F447} <b>An exact sequence usually needs…</b>",
      try:{ type:"mc", choices:["Accidentals to keep intervals identical","A new time signature","A key change every note"], answer:0,
        success:"✓ Exactness costs accidentals — the fingerprint of a real sequence.",
        fail:"What preserves a M3 on every level?",
        hint:"Outside-the-key notes." } },
    { say:"<b>Spotting Sequences:</b> look for the <b>same melodic shape</b> starting on different notes, back to back. The rhythm repeats exactly; the pitch level walks. \u{1F447} <b>Which passage is a sequence?</b>",
      try:{ type:"mc", choices:["C-D-E, then D-E-F, then E-F-G","C-D-E three times unchanged","Three unrelated measures"], answer:0,
        success:"✓ The same 3-note shape climbing by step — a rising sequence.",
        fail:"Sequence = same shape, MOVING level…",
        hint:"Watch the starting notes." } },
    { say:"<b>Sequence as a Composer's Tool:</b> Lesson 72 said most music develops motives; sequence is development's workhorse — it <b>extends a phrase</b> without new material and <b>builds direction</b> (rising = intensity, falling = relaxation). \u{1F447} <b>A composer wants to stretch a 1-measure motive into 3 measures of rising intensity. Best tool?</b>",
      try:{ type:"mc", choices:["A rising sequence","Silence","A key signature change"], answer:0,
        success:"✓ Three statements, each a step higher — instant growth from one idea.",
        fail:"One idea, three levels…",
        hint:"This lesson's subject." } },
    { say:"<b>Review:</b> \u{1F447} <b>A motive repeats immediately, one step lower, staying in the key. This is…</b>",
      try:{ type:"mc", choices:["A descending tonal sequence","An exact sequence","Simple repetition"], answer:0,
        success:"✓ Moving level = sequence; in the key = tonal; downward = descending.",
        fail:"Three descriptors: moving? in key? direction?",
        hint:"All three clues." } }
  ],
  examples:[
    { caption:"A descending tonal sequence: one four-note shape stated three times, each a step lower, all inside C major.",
      staff:{clef:"treble",tempo:100,notes:[
        {p:"E5",d:"8"},{p:"D5",d:"8"},{p:"E5",d:"8"},{p:"C5",d:"8"},
        {p:"D5",d:"8"},{p:"C5",d:"8"},{p:"D5",d:"8"},{p:"B4",d:"8"},
        {p:"C5",d:"8"},{p:"B4",d:"8"},{p:"C5",d:"8"},{p:"A4",d:"8"},
        {p:"G4",d:"h",label:"arrival"},{bar:"final"}],
        beams:[[0,3],[4,7],[8,11]],width:660},
      kb:{start:55,octaves:2,labels:true} },
    { caption:"A rising sequence building intensity: the same leap-and-step shape climbing three levels, then releasing at the top.",
      staff:{clef:"treble",tempo:100,notes:[
        {p:"C4",d:"8"},{p:"E4",d:"8"},{p:"D4",d:"q"},
        {p:"D4",d:"8"},{p:"F4",d:"8"},{p:"E4",d:"q"},
        {p:"E4",d:"8"},{p:"G4",d:"8"},{p:"F4",d:"q"},
        {p:"G4",d:"h",label:"peak"},{bar:"final"}],
        beams:[[0,1],[3,4],[6,7]],width:620},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Sequence Sprint (45s)",
      intro:"Definitions, types and norms — race the facts!",
      miaIntro:"Same shape, new level! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Sequence","a motive repeated at a new pitch level"],
        ["Typical motion","by step, up or down"],
        ["Typical count","two or three statements"],
        ["Tonal sequence","stays in the key"],
        ["Exact (real) sequence","intervals preserved — accidentals"],
        ["Rising sequence","builds intensity"],
        ["Falling sequence","relaxes"],
        ["Repetition at the SAME pitch","not a sequence"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — sequence certified!":null },
    { type:"key-climb", title:"Game 2 · Play a Rising Sequence",
      intro:"Perform the shape on three levels: C-E-D, D-F-E, E-G-F!",
      miaIntro:"Climb the pattern! \u{1FA9C}",
      spec:{seq:[60,64,62, 62,65,64, 64,67,65],
        names:["C","E","D (level 1)","D","F","E (level 2)","E","G","F (level 3)"],
        start:60, octaves:2, title:"One shape, three levels"},
      result:(score)=>score!==null?"Sequence performed by hand!":null },
    { type:"symbol-hunt", title:"Game 3 · Sequence or Not?",
      intro:"Passages on cards — click what each round names!",
      miaIntro:"Watch the starting notes! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Rising sequence", spec:{clef:"treble",notes:[{p:"C4",d:"8"},{p:"D4",d:"8"},{p:"D4",d:"8"},{p:"E4",d:"8"},{p:"E4",d:"8"},{p:"F4",d:"8"}],beams:[[0,1],[2,3],[4,5]],width:210}},
        {label:"Falling sequence", spec:{clef:"treble",notes:[{p:"G4",d:"8"},{p:"F4",d:"8"},{p:"F4",d:"8"},{p:"E4",d:"8"},{p:"E4",d:"8"},{p:"D4",d:"8"}],beams:[[0,1],[2,3],[4,5]],width:210}},
        {label:"Simple repetition (same level)", spec:{clef:"treble",notes:[{p:"E4",d:"8"},{p:"F4",d:"8"},{p:"E4",d:"8"},{p:"F4",d:"8"},{p:"E4",d:"8"},{p:"F4",d:"8"}],beams:[[0,1],[2,3],[4,5]],width:210}},
        {label:"Unrelated notes", spec:{clef:"treble",notes:[{p:"C4",d:"8"},{p:"A4",d:"8"},{p:"D4",d:"8"},{p:"G4",d:"8"},{p:"B3",d:"8"},{p:"F4",d:"8"}],beams:[[0,1],[2,3],[4,5]],width:210}}]},
      result:(score)=>score>=5?"Sequences spotted instantly!":null },
    { type:"term-race", title:"Game 4 · Tonal or Exact?",
      intro:"Classify each description — at speed!",
      miaIntro:"In the key, or copied exactly? \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["No accidentals, intervals adjust","tonal sequence"],
        ["Accidentals keep intervals identical","exact sequence"],
        ["The common kind","tonal"],
        ["The striking rare kind","exact (real)"],
        ["Shape climbing by step","rising sequence"],
        ["Shape sinking by step","falling sequence"],
        ["Development's workhorse","the sequence"],
        ["Lesson 72's connection","motive development"]]},
      result:(score)=>score>=6?"Both types classified!":null }
  ],
  practiceIntro:"20 practice questions — shapes, levels and types. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Sequence","motive at new levels"],["Tonal","in the key"],["Exact","intervals preserved"],["Stepwise","the usual move"],["2-3 times","the usual count"]], reverse:true}, count:6 },
    { gen:"step-type", params:{}, count:2 },
    { type:"mc", q:"A sequence repeats a motive…", choices:["at a different pitch level","at the same pitch","in a different meter"], answer:0,
      explain:"The level must move." },
    { type:"mc", q:"Sequences usually move…", choices:["by step","by octave leaps","randomly"], answer:0,
      explain:"Up or down a 2nd per statement." },
    { type:"mc", q:"A tonal sequence…", choices:["stays inside the key","requires accidentals","changes meter"], answer:0,
      explain:"Diatonic notes only; intervals adjust." },
    { type:"mc", q:"An exact (real) sequence…", choices:["preserves every interval, using accidentals","ignores the motive","stays diatonic"], answer:0,
      explain:"Copied precisely, level by level." },
    { type:"truefalse", q:"Repeating a motive at the same pitch is a sequence.", answer:false,
      explain:"That is repetition; sequence moves." },
    { type:"truefalse", q:"Sequences typically repeat the pattern two or three times.", answer:true,
      explain:"Then the music moves on." },
    { type:"truefalse", q:"A rising sequence tends to build intensity.", answer:true,
      explain:"Climbing levels = growing energy." },
    { gen:"term-match", params:{subject:"term", pool:[["C-D-E → D-E-F","rising sequence"],["G-F-E → F-E-D","falling sequence"],["Same pitch twice","repetition"],["New level each time","sequence"]], reverse:true}, count:3 },
    { gen:"note-value", params:{}, count:2 }
  ],
  vocabulary:[
    {term:"Melodic Sequence", def:"A motive immediately repeated at a new pitch level — usually stepwise, two or three times."},
    {term:"Tonal Sequence", def:"Stays in the key; intervals adjust to the scale's own notes. The common type."},
    {term:"Exact (Real) Sequence", def:"Every interval preserved exactly — accidentals appear as the pattern moves."},
    {term:"Rising / Falling Sequence", def:"Direction of the levels: rising builds intensity; falling relaxes."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Sequence</b> = same shape, <b>new pitch level</b>, immediately.",
    "✔ Norms: <b>stepwise</b> motion, <b>2–3</b> statements.",
    "✔ <b>Tonal</b> = in the key (intervals adjust) · <b>exact</b> = intervals preserved (accidentals).",
    "✔ Rising = intensity · falling = relaxation.",
    "✔ Sequence is motive development's workhorse (Lesson 72's promise, kept)."
  ],
  tips:[
    "Compose faster: write ONE good measure, then sequence it up or down twice — three measures done.",
    "Spot sequences in sheet music by rhythm first: identical rhythms in a row usually mean a sequence.",
    "Play a scale in broken 3rds (C-E, D-F, E-G…) — that's a sequence you already know by hand.",
    "Next lesson: how many layers is the music made of? — TEXTURE."
  ],
  rewards:{ badge:"Pattern Climber", icon:"\u{1FA9C}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Same shape, moving level, two or three times.",
  quiz:[
    { type:"mc", q:"A melodic sequence is…", choices:["a motive repeated at a new pitch level","a scale played fast","a chord progression"], answer:0,
      explain:"Shape constant, level moving.", hint:"Repeat + move." },
    { type:"mc", q:"How does a typical sequence move between statements?", choices:["By step","By tritone","By two octaves"], answer:0,
      explain:"A 2nd up or down each time.", hint:"Small steps." },
    { type:"mc", q:"How many statements does a typical sequence make?", choices:["Two or three","Seven or more","Exactly one"], answer:0,
      explain:"Then the music moves on.", hint:"Not too many." },
    { type:"mc", q:"A tonal sequence…", choices:["uses only the key's notes","preserves every interval exactly","requires a key change"], answer:0,
      explain:"Intervals adjust to the scale.", hint:"Diatonic." },
    { type:"mc", q:"An exact (real) sequence is recognizable by…", choices:["accidentals keeping the intervals identical","its lack of rhythm","silence between statements"], answer:0,
      explain:"Precision costs accidentals.", hint:"The copied-exactly kind." },
    { type:"mc", q:"Identify the passage.",
      staff:{clef:"treble",notes:[{p:"C4",d:"8"},{p:"E4",d:"8"},{p:"D4",d:"8"},{p:"F4",d:"8"},{p:"E4",d:"8"},{p:"G4",d:"8"}],beams:[[0,1],[2,3],[4,5]],width:240},
      choices:["A rising sequence — the shape climbs by step","Simple repetition","A falling sequence"], answer:0,
      explain:"C-E, D-F, E-G: same shape, rising levels.", hint:"Track the first notes." },
    { type:"truefalse", q:"A sequence must change the motive's rhythm.", answer:false,
      explain:"The rhythm repeats; the PITCH LEVEL moves.", hint:"What stays, what moves?" },
    { type:"truefalse", q:"Most sequences in tonal music are tonal rather than exact.", answer:true,
      explain:"Staying in the key is the default.", hint:"The common kind." },
    { type:"mc", q:"Rising sequences tend to create…", choices:["growing intensity","instant silence","a key signature change"], answer:0,
      explain:"Climbing levels lift the energy.", hint:"Up = more." },
    { type:"mc", q:"A composer stretches one motive into three measures without new material. The tool is…", choices:["sequence","rest","clef change"], answer:0,
      explain:"Development's workhorse.", hint:"This lesson." },
    { type:"mc", q:"C-D-E then D-E-F♯ then E-F♯-G♯ (in C major) is…", choices:["an exact sequence — accidentals preserve the intervals","a tonal sequence","not a sequence"], answer:0,
      explain:"The sharps keep every interval a whole step.", hint:"Spot the accidentals." },
    { type:"mc", q:"Sequence connects most directly to which earlier idea?", choices:["Motive development (Lesson 72)","Key signatures","Meter"], answer:0,
      explain:"It develops motives by moving them.", hint:"The building blocks lesson." }
  ],
  miaPerfect:"PERFECT! Shapes climbed, levels tracked — the sequence obeys you. \u{1FA9C}\u{1F389}",
  miaPass:"Passed! One idea now goes a long way. Next: texture…",
  mia:{
    hook:{ label:"the welcome",
      explain:"One shape stated three times, each a step lower — a descending tonal sequence.",
      play:()=>{const M=[[72,71,72,67],[71,69,71,65],[69,67,69,64]];let t=0;M.forEach(seg=>{seg.forEach(m=>{MFAudio.tone(m,.28,t,.42);t+=.3;});t+=.15;});} },
    learn:{ label:"melodic sequence",
      explain:"Motive repeated at new levels, stepwise, 2-3 times. Tonal = in key; exact = intervals preserved with accidentals. Rising builds, falling relaxes.",
      hint:"Same shape, walking level.",
      play:()=>{[60,64,62, 62,65,64].forEach((m,i)=>MFAudio.tone(m,.3,i*.28,.42));} },
    example:{ label:"the examples",
      explain:"Example 1 descends through three levels to an arrival; example 2 climbs three levels to a peak." },
    game:{ label:"the games",
      explain:"Sprint the facts, play a rising sequence, sort sequence vs repetition on cards, then classify tonal vs exact.",
      hint:"Rhythm repeats, level moves." },
    quiz:{ label:"this question",
      explain:"Three checks: does the shape repeat immediately? Does the LEVEL move (else repetition)? In key (tonal) or with accidentals (exact)?",
      play:()=>{[64,62,64,60, 62,60,62,59].forEach((m,i)=>MFAudio.tone(m,.26,i*.27,.4));} }
  }
};
