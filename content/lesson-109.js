/* Lesson 109 — Suspended & Added Tone Chords (Book 4, Unit 27 — SELF-AUTHORED)
   Deep dive on L93's sus/add intro: sus4 & sus2 (no 3rd, resolution
   optional in modern styles), add9/add2 (same notes, register choice),
   6 chords, quartal flavor of stacked sus. NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[109]={
  welcome:"Sus and add: color without the 3rd — or beside it. \u{1F308}",
  hook:{
    say:"<b>One chord refuses to say major or minor.</b> \u{1F447} <b>Listen: what is missing?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center"><button class="play hk-a">▶ The open chord</button></div>
          <div class="choices hk-ch" style="display:none"><button>The 3rd — a sus chord, neither major nor minor</button><button>The root</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ [60,65,67].forEach(m=>MFAudio.tone(m,1.2,.05,.3)); setTimeout(()=>ch.style.display="",1600); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ C-F-G: the 4th where the 3rd should be — Csus4, open and floating. Sus and add chords: today's lesson!");
          else fb(false,"C was right at the bottom — the missing voice was the gender-teller…");
        });
      } }
  },
  objectives:[
    "Review sus4/sus2: the 4th or 2nd REPLACES the 3rd (L93)",
    "Know the classical habit: sus4 resolves down to the 3rd (L96's 4-3)",
    "Know the modern habit: sus chords can stand unresolved",
    "add9 vs add2: same notes, different register choice",
    "The 6 chord (added 6th) and the m6",
    "Use sus/add for open, modern color"
  ],
  steps:[
    { say:"<b>Sus Review + The Two Habits:</b> sus4 = root-4-5, sus2 = root-2-5 — <b>no 3rd, no gender</b>. Classical music treats sus4 as a 4-3 suspension (L96); pop and film let it <b>stand unresolved</b> for open color. \u{1F447} <b>What makes a sus chord 'open'?</b>",
      try:{ type:"mc", choices:["No 3rd — neither major nor minor","No root","Extra volume"], answer:0,
        success:"✓ Remove the gender-teller and the chord floats.",
        fail:"Which note names major vs minor?",
        hint:"The missing middle." } },
    { say:"<b>sus4 vs sus2 — Mirrors:</b> Csus2 (C-D-G) is Gsus4 (G-C-D) rearranged — the two sus flavors are <b>inversions of each other's ideas</b>. Both love stepwise resolution but no longer require it. \u{1F447} <b>Csus2 contains…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:72,notes:[
        {p:"C4",d:"h",label:"sus2"},{p:"D4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"C4",d:"h",label:"sus4"},{p:"F4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{bar:"final"}],width:400} },
      try:{ type:"mc", choices:["C-D-G","C-E-G","C-D-E"], answer:0,
        success:"✓ The 2nd replaces the 3rd — same openness, lower shimmer.",
        fail:"sus2 = root, 2, 5…",
        hint:"D in the middle." } },
    { say:"<b>add9 vs add2:</b> both ADD D to C-E-G (nothing removed — the 3rd stays!). <b>add9</b> voices the D an octave up; <b>add2</b> tucks it beside the 3rd. Same four pitch classes, different sparkle. \u{1F447} <b>add chords differ from sus chords because…</b>",
      try:{ type:"mc", choices:["The 3rd remains in the chord","They have no root","They are always minor"], answer:0,
        success:"✓ ADD keeps everything; SUS replaces the 3rd — L93's rule, deepened.",
        fail:"Check for E in Cadd9…",
        hint:"Keep vs replace." } },
    { say:"<b>The 6 Chords:</b> C6 = C-E-G-A (added 6th, no 7th) — the vintage-sweet ending chord; Cm6 = C-E♭-G-A. \u{1F447} <b>C6 adds which note to the triad?</b>",
      try:{ type:"mc", choices:["A — the 6th","B♭ — the 7th","D — the 9th"], answer:0,
        success:"✓ The 6th rides above the triad — jazz's favorite final chord before maj7 took over.",
        fail:"6 above C is…",
        hint:"A." } },
    { say:"<b>Modern Color:</b> stack sus chords and you approach <b>quartal</b> sound (4ths piled up — a 20th-century preview); pop pads live on sus2/add9 because open chords blend under any melody. <b>Remember: sus replaces the 3rd · add keeps it · 6 adds the 6th.</b> \u{1F447} <b>Why do producers love sus2/add9 pads?</b>",
      try:{ type:"mc", choices:["Their openness fits under any melody","They are louder","They need no root"], answer:0,
        success:"✓ No 3rd-clash, no gender commitment — universal cushions.",
        fail:"What can't clash if it isn't there?",
        hint:"The absent 3rd." } },
    { say:"<b>Review:</b> \u{1F447} <b>Which spelling is Cadd9?</b>",
      try:{ type:"mc", choices:["C-E-G-D","C-D-G","C-F-G"], answer:0,
        success:"✓ Full triad + D — nothing replaced.",
        fail:"add = keep the 3rd…",
        hint:"Four notes." } }
  ],
  examples:[
    { caption:"The sus resolution vs the sus that stays: Gsus4→G (classical), then Csus2 held as pure color (modern).",
      staff:{clef:"treble",tempo:69,notes:[
        {p:"G3",d:"h",label:"sus4"},{p:"C4",d:"h",chord:true},{p:"D4",d:"h",chord:true},
        {p:"G3",d:"h",label:"resolves"},{p:"B3",d:"h",chord:true},{p:"D4",d:"h",chord:true},
        {p:"C4",d:"w",label:"sus2 — stays!"},{p:"D4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:520},
      kb:{start:43,octaves:2,labels:true} },
    { caption:"add9 and 6 side by side: Cadd9 (C-E-G-D) sparkles; C6 (C-E-G-A) smiles — two ways to sweeten one triad.",
      staff:{clef:"treble",tempo:66,notes:[
        {p:"C4",d:"h",label:"add9"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{p:"D5",d:"h",chord:true},
        {p:"C4",d:"w",label:"C6"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"A4",d:"w",chord:true},{bar:"final"}],width:440},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Sus & Add Sprint (45s)",
      intro:"Replacements, additions and colors — race them!",
      miaIntro:"Keep or replace? \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["sus4","4th replaces the 3rd"],
        ["sus2","2nd replaces the 3rd"],
        ["add9","triad + 9th, 3rd kept"],
        ["add2","same notes as add9, lower register"],
        ["C6","C-E-G-A"],
        ["Sus chords' gender","none — no 3rd"],
        ["Classical sus4","resolves 4-3"],
        ["Modern sus","may stand unresolved"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — colors mixed!":null },
    { type:"key-climb", title:"Game 2 · Sus, Resolve, Add",
      intro:"Play Csus4 → C → Cadd9's top D!",
      miaIntro:"Float, land, sparkle! \u{1FA9C}",
      spec:{seq:[60,65,67, 60,64,67, 74],
        names:["C","F (the sus 4)","G","C","E (resolved!)","G","D (the add9 sparkle)"],
        start:60, octaves:2, title:"Three colors in one pass"},
      result:(score)=>score!==null?"Colors under your fingers!":null },
    { type:"symbol-hunt", title:"Game 3 · Which Color?",
      intro:"Chords on cards — click what each round names!",
      miaIntro:"Check the middle! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Csus4 (C-F-G)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"F4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:150}},
        {label:"Csus2 (C-D-G)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"D4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:150}},
        {label:"Cadd9 (C-E-G-D)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"D5",d:"w",chord:true}],width:150}},
        {label:"C6 (C-E-G-A)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"A4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Colors identified!":null },
    { type:"term-race", title:"Game 4 · Keep or Replace Race",
      intro:"Sort the devices — at speed!",
      miaIntro:"The 3rd's fate! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["sus4","replaces the 3rd"],["sus2","replaces the 3rd"],
        ["add9","keeps the 3rd"],["C6","keeps the 3rd"],
        ["Dsus4","D-G-A"],["Gsus2","G-A-D"],
        ["Stacked sus sounds","quartal (4ths)"],["Sus pads work because","no 3rd to clash"]]},
      result:(score)=>score>=6?"Every fate decided!":null }
  ],
  practiceIntro:"20 practice questions — sus, add and 6 chords. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["sus4","root-4-5"],["sus2","root-2-5"],["add9","triad + 9"],["C6","triad + 6"],["No 3rd","no gender"]], reverse:true}, count:6 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 },
    { type:"mc", q:"Csus4 is spelled…", choices:["C-F-G","C-E-G","C-D-G"], answer:0, explain:"4 replaces 3." },
    { type:"mc", q:"Csus2 is spelled…", choices:["C-D-G","C-F-G","C-E-A"], answer:0, explain:"2 replaces 3." },
    { type:"mc", q:"Cadd9 keeps its 3rd?", choices:["Yes — E stays","No","Only in minor"], answer:0, explain:"ADD removes nothing." },
    { type:"mc", q:"C6 is spelled…", choices:["C-E-G-A","C-E-G-B","C-E-A-D"], answer:0, explain:"Triad + 6th." },
    { type:"truefalse", q:"A sus chord is neither major nor minor.", answer:true, explain:"No 3rd, no gender." },
    { type:"truefalse", q:"In modern styles, sus chords must always resolve.", answer:false, explain:"They may stand as color." },
    { type:"truefalse", q:"add9 and add2 use the same pitch classes.", answer:true, explain:"Register is the difference." },
    { gen:"term-match", params:{subject:"term", pool:[["Classical sus4","4-3 resolution"],["Modern sus","stands alone"],["Cm6","C-E\u{266D}-G-A"],["Quartal preview","stacked 4ths"]], reverse:true}, count:3 },
    { gen:"interval-quality", params:{ask:"quality"}, count:2 }
  ],
  vocabulary:[
    {term:"Sus4 / Sus2", def:"The 4th or 2nd replaces the 3rd — open, genderless. Classical: resolve to the 3rd. Modern: may stand."},
    {term:"Add9 / Add2", def:"The triad keeps its 3rd; the 9th (or 2nd — same pitch, lower register) is added."},
    {term:"The 6 Chord", def:"Triad + 6th (C6 = C-E-G-A; Cm6 = C-E♭-G-A) — the vintage sweet ending."},
    {term:"Quartal Color", def:"Stacked sus shapes approach chords built in 4ths — a 20th-century door (L117 ahead)."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>sus</b> replaces the 3rd (4 or 2) · <b>add</b> keeps it.",
    "✔ Classical sus4 = the 4-3 suspension; modern sus <b>can stand</b>.",
    "✔ <b>add9/add2</b>: same notes, register choice.",
    "✔ <b>6 chords</b>: triad + 6th, major or minor.",
    "✔ Open colors blend anywhere — and point toward quartal harmony."
  ],
  tips:[
    "Guitarists' trick on keys: alternate C ↔ Csus4 ↔ C ↔ Csus2 — instant accompaniment shimmer.",
    "End a piece on C6 once — hear the 1940s smile.",
    "add9 arpeggiated = the modern ballad intro; try 1-5-9-3 as a pattern.",
    "Next lesson: swapping whole chords — tritone substitution and chromatic mediants."
  ],
  rewards:{ badge:"Color Mixer", icon:"\u{1F308}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! The 3rd: kept, replaced, or joined.",
  quiz:[
    { type:"mc", q:"A sus chord's defining feature:", choices:["the 3rd is replaced","the root is doubled","it has six notes"], answer:0, explain:"By the 4th or 2nd.", hint:"Suspended gender." },
    { type:"mc", q:"Gsus4 is spelled…", choices:["G-C-D","G-B-D","G-A-D"], answer:0, explain:"4 replaces 3.", hint:"C in the middle." },
    { type:"mc", q:"Gsus2 is spelled…", choices:["G-A-D","G-C-D","G-B-E"], answer:0, explain:"2 replaces 3.", hint:"A in the middle." },
    { type:"mc", q:"In classical style, sus4 resolves…", choices:["down to the 3rd","up an octave","never"], answer:0, explain:"L96's 4-3.", hint:"Falling release." },
    { type:"mc", q:"In pop and film, a sus chord…", choices:["may stand unresolved as color","must resolve immediately","is forbidden"], answer:0, explain:"Open pads everywhere.", hint:"The modern habit." },
    { type:"mc", q:"Cadd9 contains…", choices:["C-E-G-D","C-D-G","C-F-G-D"], answer:0, explain:"Triad intact + 9.", hint:"E stays." },
    { type:"mc", q:"add2 vs add9:", choices:["same notes, different register","different notes entirely","one is minor"], answer:0, explain:"D beside E vs D above.", hint:"Where the D sits." },
    { type:"mc", q:"C6 adds…", choices:["A above the triad","B♭","F"], answer:0, explain:"The added 6th.", hint:"No 7th involved." },
    { type:"mc", q:"Identify.", staff:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"F4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:150},
      choices:["Csus4","C major","Cadd9"], answer:0, explain:"F where E should be.", hint:"No 3rd." },
    { type:"truefalse", q:"Sus chords commit to major or minor.", answer:false, explain:"No 3rd = no commitment.", hint:"Open." },
    { type:"truefalse", q:"Stacking sus shapes approaches quartal harmony.", answer:true, explain:"4ths piling up — L117 preview.", hint:"The modern door." },
    { type:"mc", q:"Which pair differs ONLY by keeping vs replacing the 3rd?", choices:["Cadd9 vs Csus2","C6 vs C7","C vs Cm"], answer:0, explain:"D added beside E vs D replacing E.", hint:"The D chords." }
  ],
  miaPerfect:"PERFECT! Open colors, mixed and mastered. \u{1F308}\u{1F389}",
  miaPass:"Passed! Sus and add serve your palette. Next: chord substitution…",
  mia:{
    hook:{ label:"the welcome",
      explain:"C-F-G — the 4th in place of the 3rd: Csus4, floating without gender.",
      play:()=>{[60,65,67].forEach(m=>MFAudio.tone(m,1.1,.05,.3));} },
    learn:{ label:"sus & add",
      explain:"sus replaces the 3rd (classical resolves 4-3; modern stands); add keeps it (add9/add2 registers); 6 chords add the 6th; stacked sus → quartal.",
      hint:"The 3rd's fate.",
      play:()=>{[60,62,67].forEach(m=>MFAudio.tone(m,1.0,.05,.3));} },
    example:{ label:"the examples",
      explain:"Example 1 resolves one sus and lets another stand; example 2 compares add9 and C6 sweetness." },
    game:{ label:"the games",
      explain:"Sprint the colors, play sus-resolve-add, spot chords, then sort keep-vs-replace.",
      hint:"Look at the middle note." },
    quiz:{ label:"this question",
      explain:"One check: is the 3rd present? Present = add/6 family; absent with 4 or 2 = sus family.",
      play:()=>{[60,64,67,74].forEach(m=>MFAudio.tone(m,.9,.05,.28));} }
  }
};
