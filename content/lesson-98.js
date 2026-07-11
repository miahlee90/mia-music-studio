/* Lesson 98 — Secondary Dominants (Book 4, Unit 24 — SELF-AUTHORED)
   Core: any major or minor diatonic chord can be preceded by ITS OWN
   dominant: V/V (D major in C), V/ii, V/vi, V/IV. Spot them by the
   accidental; they TONICIZE their target briefly.
   NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[98]={
  welcome:"Secondary dominants: every chord can borrow a V. \u{1F3AF}",
  hook:{
    say:"<b>In C major, a D MAJOR chord suddenly appears (F♯!).</b> Listen where it leads. \u{1F447} <b>What did that D major chord do?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the passage</button></div>
          <div class="choices hk-ch" style="display:none"><button>It pushed straight into G — acting as G's own dominant</button><button>It ended the piece</button><button>Nothing — it was a mistake</button></div>`;
        const ROWS=[[60,64,67],[62,66,69],[55,59,62],[60,64,67]];
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.85,i*.9,.27))); setTimeout(()=>ch.style.display="",ROWS.length*900+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ D major (with F♯) resolved to G exactly like a V resolves to I — a SECONDARY DOMINANT: V of V. Today's lesson!");
          else fb(false,"Follow the F♯ — it rose to G, and the D chord landed on G like a dominant landing home…");
        });
      } }
  },
  objectives:[
    "Define secondary dominant: the dominant OF a chord other than I",
    "Read the notation: V/V, V/ii, V/vi, V/IV ('five of five')",
    "Build one: go a P5 above the target, make that chord major (or Mm7)",
    "Spot them by their accidentals",
    "Understand tonicization: the target briefly sounds like a tonic",
    "Resolve them: V/X → X"
  ],
  steps:[
    { say:"<b>The Idea:</b> V→I is harmony's strongest move. A <b>secondary dominant</b> gives that push to OTHER chords: before G (the V of C major), play <b>D major — the V of G</b>. Written <b>V/V</b>, read \u{201C}five of five.\u{201D} \u{1F447} <b>A secondary dominant is…</b>",
      try:{ type:"mc", choices:["The dominant of a chord other than the tonic","Any loud chord","The second chord of a piece"], answer:0,
        success:"✓ Every chord can borrow its own personal V.",
        fail:"Whose dominant was D major?",
        hint:"V of something else." } },
    { say:"<b>Building One:</b> two steps — <b>1)</b> find the note a <b>P5 above the target's root</b>; <b>2)</b> build a <b>major triad (or dominant 7th)</b> there. Target ii (Dm)? A 5th above D is A → <b>A major = V/ii</b> (needs C♯). \u{1F447} <b>V/vi in C major is…</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14.5px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 12px">Target</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 12px">Secondary dominant</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 12px">Accidental (in C)</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">V (G)</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">V/V = D major</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#C05A21;font-weight:800">F♯</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">ii (Dm)</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">V/ii = A major</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#C05A21;font-weight:800">C♯</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">vi (Am)</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">V/vi = E major</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#C05A21;font-weight:800">G♯</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">IV (F)</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">V/IV = C(7)</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#C05A21;font-weight:800">B♭ (as C7)</td></tr></table>` },
      try:{ type:"mc", choices:["E major (E-G♯-B)","E minor","A major"], answer:0,
        success:"✓ A P5 above A (vi's root) is E; made major with G♯ — V/vi.",
        fail:"Count a 5th above A…",
        hint:"E, made major." } },
    { say:"<b>Spotting Them:</b> the giveaway is an <b>accidental</b> — F♯ in C major usually announces V/V; C♯ announces V/ii; G♯ announces V/vi. The accidental is the borrowed leading tone. \u{1F447} <b>You see G♯ in a C major piece. Suspect…</b>",
      try:{ type:"mc", choices:["V/vi (E major) heading to Am","A misprint","A key change to G"], answer:0,
        success:"✓ G♯ is Am's leading tone — E major is pointing at vi.",
        fail:"Whose leading tone is G♯?",
        hint:"A half step below A." } },
    { say:"<b>Tonicization:</b> for a moment, the target chord <b>sounds like a tonic</b> — the borrowed V treats it as home. Brief = tonicization; extended = modulation (next lesson). \u{1F447} <b>Tonicization means…</b>",
      try:{ type:"mc", choices:["A chord briefly treated as a tonic","A permanent key change","Playing the tonic louder"], answer:0,
        success:"✓ A moment of borrowed homeness — the seed of modulation.",
        fail:"Brief vs permanent…",
        hint:"Temporary spotlight." } },
    { say:"<b>Resolution:</b> a secondary dominant <b>resolves to its target</b>: V/V→V, V/ii→ii, V/vi→vi. The borrowed leading tone rises; the borrowed 7th (if any) falls. <b>Remember: V/X → X — build a major chord a P5 above X.</b> \u{1F447} <b>V/ii resolves to…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:72,notes:[
        {p:"A3",d:"h",label:"V/ii"},{p:"C#4",d:"h",chord:true},{p:"E4",d:"h",chord:true},
        {p:"D4",d:"w",label:"ii"},{p:"F4",d:"w",chord:true},{p:"A4",d:"w",chord:true},{bar:"final"}],width:380} },
      try:{ type:"mc", choices:["ii (Dm)","I","V"], answer:0,
        success:"✓ A major pushes into D minor — its target.",
        fail:"V of WHAT resolves to WHAT…",
        hint:"The slash names the target." } },
    { say:"<b>In Progressions:</b> secondary dominants intensify motion: I → <b>V/ii</b> → ii → V → I chains borrowed pushes into the circle. Pop bridges and jazz turnarounds live on them. \u{1F447} <b>Adding V/V before V makes the arrival on V…</b>",
      try:{ type:"mc", choices:["Stronger — V gets its own dominant push","Weaker","Silent"], answer:0,
        success:"✓ The borrowed V→I energy loads the arrival.",
        fail:"What does a dominant do for its tonic?",
        hint:"Extra gravity." } },
    { say:"<b>Review:</b> \u{1F447} <b>Build V/V in F major.</b>",
      try:{ type:"mc", choices:["G major (G-B♮-D) → resolving to C","G minor","B♭ major"], answer:0,
        success:"✓ F's V is C; a P5 above C is G, made major with B♮ — V/V.",
        fail:"F major's V is C; now find C's V…",
        hint:"Two fifths up from F." } }
  ],
  examples:[
    { caption:"I → V/V → V → I in C major: the D major chord (F♯) loads the arrival on G, which then closes home. Hear the double push.",
      staff:{clef:"treble",tempo:72,notes:[
        {p:"C4",d:"h",label:"I"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"D4",d:"h",label:"V/V"},{p:"F#4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"G3",d:"h",label:"V"},{p:"B3",d:"h",chord:true},{p:"D4",d:"h",chord:true},
        {p:"C4",d:"w",label:"I"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:560},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"I → V/vi → vi: E major's G♯ tonicizes A minor — for one moment, Am sounds like home. Brief homeness = tonicization.",
      staff:{clef:"treble",tempo:72,notes:[
        {p:"C4",d:"h",label:"I"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"E4",d:"h",label:"V/vi"},{p:"G#4",d:"h",chord:true},{p:"B4",d:"h",chord:true},
        {p:"A4",d:"w",label:"vi"},{p:"C5",d:"w",chord:true},{p:"E5",d:"w",chord:true},{bar:"final"}],width:480},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · V-of Sprint (45s)",
      intro:"Targets, spellings and accidentals — race them!",
      miaIntro:"Five of five! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Secondary dominant","the V of a non-tonic chord"],
        ["V/V in C","D major (F♯)"],
        ["V/ii in C","A major (C♯)"],
        ["V/vi in C","E major (G♯)"],
        ["V/IV in C","C7 (B♭)"],
        ["The giveaway","an accidental — the borrowed leading tone"],
        ["Tonicization","a chord briefly treated as tonic"],
        ["V/X resolves to","X"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — secondary dominants secured!":null },
    { type:"key-climb", title:"Game 2 · Play the Double Push",
      intro:"Play the roots: C → D (V/V) → G (V) → C!",
      miaIntro:"Loaded arrival! \u{1FA9C}",
      spec:{seq:[60,62,55,60],
        names:["C (I)","D (V/V — the borrowed push)","G (V — loaded arrival)","C (I — home)"],
        start:55, octaves:2, title:"I → V/V → V → I roots"},
      result:(score)=>score!==null?"The double push, walked!":null },
    { type:"symbol-hunt", title:"Game 3 · Spot the Secondary",
      intro:"Chords in C major on cards — click what each round names!",
      miaIntro:"Find the accidental! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"V/V (D-F♯-A)", spec:{clef:"treble",notes:[{p:"D4",d:"w"},{p:"F#4",d:"w",chord:true},{p:"A4",d:"w",chord:true}],width:150}},
        {label:"V/ii (A-C♯-E)", spec:{clef:"treble",notes:[{p:"A3",d:"w"},{p:"C#4",d:"w",chord:true},{p:"E4",d:"w",chord:true}],width:150}},
        {label:"V/vi (E-G♯-B)", spec:{clef:"treble",notes:[{p:"E4",d:"w"},{p:"G#4",d:"w",chord:true},{p:"B4",d:"w",chord:true}],width:150}},
        {label:"Plain ii (D-F-A)", spec:{clef:"treble",notes:[{p:"D4",d:"w"},{p:"F4",d:"w",chord:true},{p:"A4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Secondaries spotted by accidental!":null },
    { type:"term-race", title:"Game 4 · Resolve It Race",
      intro:"Name each secondary dominant's target — at speed!",
      miaIntro:"The slash tells you! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["V/V","resolves to V"],
        ["V/ii","resolves to ii"],
        ["V/vi","resolves to vi"],
        ["V/IV","resolves to IV"],
        ["F♯ in C major","V/V's leading tone"],
        ["C♯ in C major","V/ii's leading tone"],
        ["G♯ in C major","V/vi's leading tone"],
        ["Extended tonicization","becomes modulation"]]},
      result:(score)=>score>=6?"Every target hit!":null }
  ],
  practiceIntro:"20 practice questions — building, spotting and resolving. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["V/V","D major in C"],["V/ii","A major in C"],["V/vi","E major in C"],["Tonicization","brief tonic treatment"],["V/X","resolves to X"]], reverse:true}, count:6 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 },
    { type:"mc", q:"A secondary dominant is the dominant of…", choices:["a chord other than the tonic","the tonic only","no chord"], answer:0,
      explain:"Borrowed V→I energy." },
    { type:"mc", q:"To build V/X, go a P5 above X's root and build…", choices:["a major triad (or Mm7)","a minor triad","a diminished triad"], answer:0,
      explain:"Dominants are major-family chords." },
    { type:"mc", q:"V/V in C major is…", choices:["D major","D minor","G major"], answer:0,
      explain:"A P5 above G, with F♯." },
    { type:"mc", q:"V/vi in C major needs which accidental?", choices:["G♯","F♯","B♭"], answer:0,
      explain:"Am's leading tone." },
    { type:"truefalse", q:"V/ii resolves to ii.", answer:true,
      explain:"The slash names the target." },
    { type:"truefalse", q:"Tonicization is a permanent key change.", answer:false,
      explain:"Brief only — permanent = modulation." },
    { type:"truefalse", q:"Accidentals often reveal secondary dominants.", answer:true,
      explain:"The borrowed leading tone shows." },
    { gen:"term-match", params:{subject:"term", pool:[["P5 above the target","the secondary's root"],["Borrowed leading tone","rises to the target's root"],["V/IV in C","C7"],["Double push","V/V then V"]], reverse:true}, count:3 },
    { gen:"inversion-id", params:{subject:"v7", ask:"position"}, count:2 }
  ],
  vocabulary:[
    {term:"Secondary Dominant", def:"The dominant of a chord other than I — V/V, V/ii, V/vi, V/IV. Read 'five of five,' etc."},
    {term:"Building V/X", def:"A P5 above X's root, made major (or a dominant 7th). The accidental is X's borrowed leading tone."},
    {term:"Tonicization", def:"The target chord briefly sounds like a tonic. Extended tonicization becomes modulation."},
    {term:"Resolution V/X → X", def:"The borrowed leading tone rises; the borrowed 7th falls; the target arrives loaded."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>V/X</b> = X's own borrowed dominant; resolves <b>V/X → X</b>.",
    "✔ Build: <b>P5 above the target, made major</b> (accidental = borrowed leading tone).",
    "✔ In C: V/V = <b>D(F♯)</b> · V/ii = <b>A(C♯)</b> · V/vi = <b>E(G♯)</b> · V/IV = <b>C7(B♭)</b>.",
    "✔ <b>Tonicization</b> = brief homeness; extended = modulation.",
    "✔ Purpose: loaded arrivals and chained pushes."
  ],
  tips:[
    "See an accidental mid-phrase? Ask: whose leading tone is this? The answer names the target.",
    "V7/X is even stronger than V/X — the borrowed 7th adds the tritone pull.",
    "Chain them: V/vi → vi can continue vi → V/V → V → I — pushes all the way home.",
    "Next lesson: when the borrowed key KEEPS the spotlight — modulation."
  ],
  rewards:{ badge:"Dominant Lender", icon:"\u{1F3AF}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! P5 above, made major, resolves to the slash.",
  quiz:[
    { type:"mc", q:"A secondary dominant is…", choices:["the dominant of a non-tonic chord","any seventh chord","the tonic in disguise"], answer:0,
      explain:"Borrowed V-power.", hint:"V of something else." },
    { type:"mc", q:"How is 'V/V' read aloud?", choices:["five of five","five-five","V slash V"], answer:0,
      explain:"The dominant OF the dominant.", hint:"Of." },
    { type:"mc", q:"To build V/ii in C major:", choices:["A major — a P5 above D","D major","A minor"], answer:0,
      explain:"P5 above the target, made major (C♯).", hint:"Target root D." },
    { type:"mc", q:"V/vi in C major is spelled…", choices:["E-G♯-B","E-G-B","A-C♯-E"], answer:0,
      explain:"E major with the G♯ leading tone.", hint:"Points at Am." },
    { type:"mc", q:"Which accidental signals V/V in C major?", choices:["F♯","B♭","C♯"], answer:0,
      explain:"G's leading tone.", hint:"Rises to G." },
    { type:"mc", q:"V/IV in C major is…", choices:["C7 (adds B♭)","F major","G7"], answer:0,
      explain:"C made dominant of F needs the B♭ seventh.", hint:"I turns into a dominant." },
    { type:"mc", q:"Identify the chord (key: C major).",
      staff:{clef:"treble",notes:[{p:"D4",d:"w"},{p:"F#4",d:"w",chord:true},{p:"A4",d:"w",chord:true}],width:160},
      choices:["V/V — D major with F♯","ii — D minor","IV"], answer:0,
      explain:"The F♯ makes it a borrowed dominant.", hint:"Spot the accidental." },
    { type:"mc", q:"V/vi resolves to…", choices:["vi","V","I"], answer:0,
      explain:"The slash names the target.", hint:"Read after the slash." },
    { type:"truefalse", q:"Tonicization briefly treats a chord as a tonic.", answer:true,
      explain:"Momentary homeness.", hint:"Brief." },
    { type:"truefalse", q:"A secondary dominant must be a minor triad.", answer:false,
      explain:"Dominants are MAJOR (or Mm7).", hint:"V quality." },
    { type:"mc", q:"I → V/V → V → I strengthens which arrival?", choices:["The arrival on V","The first I","Nothing"], answer:0,
      explain:"V receives its own dominant push.", hint:"The loaded chord." },
    { type:"mc", q:"When a tonicization lasts and the new key takes over, it becomes…", choices:["a modulation","a cadence","a pedal point"], answer:0,
      explain:"Next lesson's subject.", hint:"L99." }
  ],
  miaPerfect:"PERFECT! Every chord's personal V, at your service. \u{1F3AF}\u{1F389}",
  miaPass:"Passed! Borrowed dominants obey you. Next: changing keys for real…",
  mia:{
    hook:{ label:"the welcome",
      explain:"D major (F♯) resolved into G exactly as a V resolves to I — V/V, the dominant of the dominant.",
      play:()=>{const ROWS=[[60,64,67],[62,66,69],[55,59,62],[60,64,67]];ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.85,.27)));} },
    learn:{ label:"secondary dominants",
      explain:"V/X = major chord a P5 above X; accidental = borrowed leading tone; resolves V/X→X; brief homeness = tonicization.",
      hint:"P5 up, made major.",
      play:()=>{[62,66,69].forEach(m=>MFAudio.tone(m,.8,.05,.27));[55,59,62].forEach(m=>MFAudio.tone(m,.9,.95,.27));} },
    example:{ label:"the examples",
      explain:"Example 1 loads V with its own dominant (I-V/V-V-I); example 2 tonicizes vi with E major's G♯." },
    game:{ label:"the games",
      explain:"Sprint the spellings, walk the double push, spot secondaries by accidental, then resolve targets at speed.",
      hint:"The accidental points at the target." },
    quiz:{ label:"this question",
      explain:"Whose leading tone is the accidental? That names the target; the chord is a P5 above it, made major; it resolves to the slash.",
      play:()=>{[64,68,71].forEach(m=>MFAudio.tone(m,.8,.05,.27));[69,72,76].forEach(m=>MFAudio.tone(m,.9,.95,.27));} }
  }
};
