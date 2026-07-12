/* Lesson 109 — Suspended & Added Tone Chords (Book 4, Unit 27 — SELF-AUTHORED)
   Deep dive on L93's sus/add intro: sus4 & sus2 (no 3rd, resolution
   optional in modern styles), add9/add2 (same pitch classes, voicing varies),
   6 chords, and quartal harmony as a separate system. */

LESSON_CONTENT[109]={
  welcome:"Suspended chords replace the third; added-tone chords retain it.",
  hook:{
    say:"<b>Listen to the chord C–F–G.</b> \u{1F447} <b>Which chord member is absent, preventing the chord from being classified as a major or minor triad?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center"><button class="play hk-a">▶ Play C–F–G</button></div>
          <div class="choices hk-ch" style="display:none"><button>The third—this is Csus4</button><button>The root</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ [60,65,67].forEach(m=>MFAudio.tone(m,1.2,.05,.3)); setTimeout(()=>ch.style.display="",1600); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Correct. Csus4 contains C–F–G. The fourth, F, replaces the third, E, so the chord is not classified as a major or minor triad.");
          else fb(false,"C is present as the root. Identify the chord member that determines major or minor triad quality.");
        });
      } }
  },
  objectives:[
    "Review sus4/sus2: the 4th or 2nd REPLACES the 3rd (L93)",
    "Know the classical habit: sus4 resolves down to the 3rd (L96's 4-3)",
    "Know the modern habit: sus chords can stand unresolved",
    "add9 vs add2: same pitch-class collection; voicing conventions vary",
    "The 6 chord (added 6th) and the m6",
    "Use sus/add for open, modern color"
  ],
  steps:[
    { say:"<b>Suspended Chords—Review:</b> A sus4 chord contains root–fourth–fifth, while a sus2 chord contains root–second–fifth. In both chords, the third is omitted and replaced. Without the third, the basic chord is not classified as a major or minor triad. The sus4 sonority is related to the Classical 4–3 suspension, but the two concepts are not identical. A true 4–3 suspension requires preparation, a dissonant suspension over a change of harmony, and downward stepwise resolution. A lead-sheet sus4 chord may appear without preparation and may remain unresolved. \u{1F447} <b>What prevents a basic sus2 or sus4 chord from being classified as major or minor?</b>",
      try:{ type:"mc", choices:["The third is absent","The root is absent","The chord must be performed loudly"], answer:0,
        success:"✓ Correct. Major and minor triad quality is determined by the third, which is absent from a basic suspended chord.",
        fail:"Identify the chord member that determines major or minor quality.",
        hint:"Check the third above the root." } },
    { say:"<b>Sus2 and Sus4 Pitch Collections:</b> Csus2, C–D–G, and Gsus4, G–C–D, contain the same three pitch classes. However, their chord symbols imply different roots and harmonic interpretations. They should not automatically be described as inversions of the same chord. A sus4 may resolve downward from scale degree 4 to 3, while a sus2 may move upward from 2 to 3. In many contemporary styles, either chord may also remain unresolved. \u{1F447} <b>Which pitches form Csus2?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:72,notes:[
        {p:"C4",d:"h",label:"sus2"},{p:"D4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"C4",d:"h",label:"sus4"},{p:"F4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{bar:"final"}],width:400} },
      try:{ type:"mc", choices:["C-D-G","C-E-G","C-D-E"], answer:0,
        success:"✓ Correct. D, the second above C, replaces E, the third of the C triad.",
        fail:"Construct the chord from the root, second, and fifth.",
        hint:"C-D-G." } },
    { say:"<b>Add9 and Add2:</b> Cadd9 retains the C-major triad and adds D: C–E–G plus D. The symbol Cadd2 is sometimes used for the same pitch-class collection, particularly when D is voiced close to the root or third. However, chord-symbol conventions vary, and neither symbol always guarantees an exact register or voicing. The important distinction is between an added-tone chord and a suspended chord: Cadd9 contains C, D, E, and G—the third E remains; Csus2 contains C, D, and G—the third E is replaced. \u{1F447} <b>What distinguishes Cadd9 from Csus2?</b>",
      try:{ type:"mc", choices:["Cadd9 retains the third E, while Csus2 omits it","Cadd9 has no root","Csus2 is always minor"], answer:0,
        success:"✓ Correct. An add9 chord retains the underlying triad, while a sus2 chord replaces the third with the second.",
        fail:"Determine whether the chord contains the third E.",
        hint:"Added tone = triad retained; suspended tone = third replaced." } },
    { say:"<b>Sixth Chords:</b> A C6 chord combines a C-major triad with A, the major sixth above the root: C–E–G–A. It does not imply a seventh. Cm6 combines a C-minor triad with the major sixth A: C–E♭–G–A. C6 and Am7 contain the same pitch classes, but their chord symbols identify different roots and harmonic interpretations. Context, bass, and function help distinguish them. \u{1F447} <b>Which pitch is added to a C-major triad to form C6?</b>",
      try:{ type:"mc", choices:["A","B♭","D"], answer:0,
        success:"✓ Correct. C6 contains C–E–G–A, with no implied seventh.",
        fail:"Identify the pitch a major sixth above C.",
        hint:"The added pitch is A." } },
    { say:"<b>Suspended, Added-Tone, and Quartal Sonorities:</b> Suspended and added-tone chords are common in many contemporary styles, but their suitability depends on the melody and surrounding harmony. A melody note can still create dissonance with a sus or add chord. Suspended chords emphasize seconds or fourths, while quartal harmony is constructed primarily by stacking fourths. The sonorities may share some pitches or interval qualities, but they are not the same harmonic system. <b>Remember:</b> sus2 or sus4 replaces the third; add9 retains the triad and adds the ninth; 6 retains the triad and adds the sixth without implying a seventh; quartal harmony is built primarily from fourths. \u{1F447} <b>Which statement correctly compares suspended and quartal chords?</b>",
      try:{ type:"mc", choices:["Suspended chords replace the third, while quartal harmony is built primarily from stacked fourths","Every suspended chord is automatically a quartal chord","Both chord types fit every melody without conflict"], answer:0,
        success:"✓ Chord choice must be evaluated against the melody, bass, and harmonic context.",
        fail:"Check every melody note against the complete chord voicing.",
        hint:"Omitting the third removes one potential interval, but it does not eliminate every possible dissonance." } },
    { say:"<b>Review:</b> \u{1F447} <b>Which pitch collection represents Cadd9?</b>",
      try:{ type:"mc", choices:["C-D-E-G","C-D-G","C-F-G"], answer:0,
        success:"✓ Correct. Cadd9 contains the full C-major triad, C–E–G, plus D. The notes may be voiced in a different order.",
        fail:"Confirm that E, the third, remains in the chord.",
        hint:"Four pitch classes: C, D, E, and G." } }
  ],
  examples:[
    { caption:"The sus resolution vs the sus that stays: Gsus4→G (classical), then Csus2 held as pure color (modern).",
      staff:{clef:"treble",tempo:69,notes:[
        {p:"G3",d:"h",label:"sus4"},{p:"C4",d:"h",chord:true},{p:"D4",d:"h",chord:true},
        {p:"G3",d:"h",label:"resolves"},{p:"B3",d:"h",chord:true},{p:"D4",d:"h",chord:true},
        {p:"C4",d:"w",label:"sus2 — stays!"},{p:"D4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:520},
      kb:{start:43,octaves:2,labels:true} },
    { caption:"add9 and 6 side by side: Cadd9 (C-E-G-D) and C6 (C-E-G-A) — two ways to sweeten one triad.",
      staff:{clef:"treble",tempo:66,notes:[
        {p:"C4",d:"h",label:"add9"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{p:"D5",d:"h",chord:true},
        {p:"C4",d:"w",label:"C6"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"A4",d:"w",chord:true},{bar:"final"}],width:440},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Suspended and Added-Tone Chords (45s)",
      intro:"Identify whether the third is retained, replaced, or joined by an added tone.",
      miaIntro:"Check the third first.",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["sus4","4th replaces the 3rd"],
        ["sus2","2nd replaces the 3rd"],
        ["add9","triad + 9th, 3rd kept"],
        ["add2","same pitch classes as add9"],
        ["C6","C-E-G-A"],
        ["Sus chords","no 3rd"],
        ["Classical sus4","resolves 4-3"],
        ["Modern sus","may stand unresolved"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — Chord types identified!":null },
    { type:"key-climb", title:"Game 2 · Compare Sus4 and Add9",
      intro:"Play Csus4 → C major → Cadd9. Compare F resolving to E with D added while E remains in the final chord.",
      miaIntro:"In sus4, F replaces E; in add9, D is added beside the complete triad.",
      spec:{seq:[60,65,67, 60,64,67, 74],
        names:["C","F (the sus 4)","G","C","E (resolved!)","G","D (the added 9th)"],
        start:60, octaves:2, title:"Three colors in one pass"},
      result:(score)=>score!==null?"You performed and compared the three chords.":null },
    { type:"symbol-hunt", title:"Game 3 · Identify the Chord",
      intro:"Examine each pitch collection and identify the correct chord symbol.",
      miaIntro:"Check the root, third, replacement tone, and added tones.",
      spec:{rounds:6, pool:[
        {label:"Csus4 (C-F-G)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"F4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:150}},
        {label:"Csus2 (C-D-G)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"D4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:150}},
        {label:"Cadd9 (C-E-G-D)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"D5",d:"w",chord:true}],width:150}},
        {label:"C6 (C-E-G-A)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"A4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"You identified the chords correctly.":null },
    { type:"term-race", title:"Game 4 · Retain, Replace, or Add",
      intro:"Classify each symbol according to its treatment of the third.",
      miaIntro:"Is the third present or replaced?",
      spec:{rounds:8, reverse:true, pool:[
        ["sus4","replaces the 3rd"],["sus2","replaces the 3rd"],
        ["add9","keeps the 3rd"],["C6","keeps the 3rd"],
        ["Dsus4","D-G-A"],["Gsus2","G-A-D"],
        ["add2","keeps the 3rd"],["Cadd9","keeps the 3rd"]]},
      result:(score)=>score>=6?"You classified the chord symbols correctly.":null }
  ],
  practiceIntro:"Complete 20 practice questions on suspended, added-tone, and sixth chords.",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["sus4","root-4-5"],["sus2","root-2-5"],["add9","triad + 9"],["C6","triad + 6"],["No 3rd","not major or minor"]], reverse:true}, count:6 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 },
    { type:"mc", q:"Csus4 is spelled…", choices:["C-F-G","C-E-G","C-D-G"], answer:0, explain:"4 replaces 3." },
    { type:"mc", q:"Csus2 is spelled…", choices:["C-D-G","C-F-G","C-E-A"], answer:0, explain:"2 replaces 3." },
    { type:"mc", q:"Cadd9 keeps its 3rd?", choices:["Yes — E stays","No","Only in minor"], answer:0, explain:"ADD removes nothing." },
    { type:"mc", q:"C6 is spelled…", choices:["C-E-G-A","C-E-G-B","C-E-A-D"], answer:0, explain:"Triad + 6th." },
    { type:"truefalse", q:"A basic sus2 or sus4 chord is not classified as a major or minor triad because it omits the third.", answer:true, explain:"The third is omitted." },
    { type:"truefalse", q:"In many contemporary styles, a sus chord may remain unresolved.", answer:true, explain:"They may stand as color." },
    { type:"truefalse", q:"Cadd9 and Cadd2 may indicate the same pitch-class collection, although notation and voicing conventions vary.", answer:true, explain:"Voicing conventions vary." },
    { gen:"term-match", params:{subject:"term", pool:[["Classical sus4","4-3 resolution"],["Modern sus","stands alone"],["Cm6","C-E\u{266D}-G-A"],["Quartal harmony","stacked 4ths"]], reverse:true}, count:3 },
    { gen:"interval-quality", params:{ask:"quality"}, count:2 }
  ],
  vocabulary:[
    {term:"Sus4 / Sus2", def:"The 4th or 2nd replaces the 3rd — open, neither major nor minor. Classical: related to the 4-3 suspension. Modern: may stand."},
    {term:"Add9 / Add2", def:"The triad keeps its 3rd; the added tone (9th or 2nd) shares the same pitch class, with voicing conventions varying."},
    {term:"The 6 Chord", def:"Triad + 6th (C6 = C-E-G-A; Cm6 = C-E♭-G-A) — the vintage sweet ending."},
    {term:"Quartal Harmony", def:"Chords built primarily in stacked 4ths — a distinct 20th-century system, not the same as suspended harmony (L117 ahead)."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>sus</b> replaces the 3rd (4 or 2) · <b>add</b> keeps it.",
    "✔ The Classical 4-3 suspension is related to but not identical to a lead-sheet sus4; modern sus <b>can stand</b> unresolved.",
    "✔ <b>add9/add2</b>: same pitch classes; voicing conventions vary.",
    "✔ <b>6 chords</b>: triad + 6th, major or minor.",
    "✔ Suspended and added-tone colors suit many styles but must fit the melody and harmony; quartal harmony is a separate system."
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
  miaQuizIntro:"Quiz: Determine whether the third is retained, replaced, or accompanied by an added tone.",
  quiz:[
    { type:"mc", q:"What is the defining feature of a basic suspended chord?", choices:["The third is replaced by the second or fourth","The root is doubled","The chord contains six notes"], answer:0, explain:"By the 4th or 2nd.", hint:"Without the third, the chord is not classified as a major or minor triad." },
    { type:"mc", q:"Gsus4 is spelled…", choices:["G-C-D","G-B-D","G-A-D"], answer:0, explain:"4 replaces 3.", hint:"C in the middle." },
    { type:"mc", q:"Gsus2 is spelled…", choices:["G-A-D","G-C-D","G-B-E"], answer:0, explain:"2 replaces 3.", hint:"A in the middle." },
    { type:"mc", q:"A prepared 4–3 suspension normally resolves…", choices:["Downward by step from the fourth to the third","Upward by octave","It never resolves"], answer:0, explain:"A true suspension requires preparation, suspension, and resolution. A lead-sheet sus4 chord does not necessarily follow this complete process.", hint:"Falling release." },
    { type:"mc", q:"In many popular and film-music contexts, a sus chord…", choices:["May remain unresolved","Must always resolve immediately","Is prohibited"], answer:0, explain:"Sus chords may remain unresolved in these styles.", hint:"The modern habit." },
    { type:"mc", q:"Which pitch classes belong to Cadd9?", choices:["C-D-E-G","C-D-G","C-D-F-G"], answer:0, explain:"Triad intact + 9.", hint:"E stays." },
    { type:"mc", q:"Which statement best compares Cadd2 and Cadd9?", choices:["They may indicate the same pitch-class collection, but voicing conventions vary","They always contain entirely different pitches","One must be minor"], answer:0, explain:"Voicing conventions vary.", hint:"Compare pitch classes, not register." },
    { type:"mc", q:"Which pitch is added to C–E–G to form C6?", choices:["A","B♭","F"], answer:0, explain:"The added 6th.", hint:"No 7th involved." },
    { type:"mc", q:"Identify the chord.", staff:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"F4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:150},
      choices:["Csus4","C major","Cadd9"], answer:0, explain:"C-F-G contains the fourth F in place of the third E.", hint:"No 3rd." },
    { type:"truefalse", q:"A basic sus2 or sus4 chord contains the third that defines major or minor triad quality.", answer:false, explain:"A basic suspended chord omits the third.", hint:"Open." },
    { type:"truefalse", q:"Suspended chords and quartal chords are identical harmonic structures.", answer:false, explain:"Suspended chords replace the third with a second or fourth; quartal harmony is constructed primarily from stacked fourths.", hint:"They are different harmonic systems." },
    { type:"mc", q:"Which pair differs principally in whether the third E is retained?", choices:["Cadd9 and Csus2","C6 and C7","C major and C minor"], answer:0, explain:"Cadd9 contains C-D-E-G, while Csus2 contains C-D-G.", hint:"The D chords." }
  ],
  miaPerfect:"Perfect score! You accurately distinguished suspended, added-tone, and sixth chords.",
  miaPass:"You passed! Next, you will study chord substitution and chromatic reharmonization.",
  mia:{
    hook:{ label:"the welcome",
      explain:"C-F-G — the 4th in place of the 3rd: Csus4, neither major nor minor.",
      play:()=>{[60,65,67].forEach(m=>MFAudio.tone(m,1.1,.05,.3));} },
    learn:{ label:"sus & add",
      explain:"sus replaces the 3rd (the Classical 4-3 suspension is related but not identical; modern sus stands); add keeps it (add9/add2 share pitch classes, voicing varies); 6 chords add the 6th; quartal harmony is a separate system built in 4ths.",
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
