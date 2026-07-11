/* Lesson 107 — Borrowed Chords / Modal Mixture (Book 4, Unit 26 — SELF-AUTHORED)
   Core: PARALLEL keys (C major / C minor) share a tonic; MODAL MIXTURE
   borrows chords across: iv, ii°, ♭VI, ♭III, ♭VII into major (darkening);
   the Picardy third (major I ending minor) borrows the other way.
   NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[107]={
  welcome:"Borrowed chords: colors from the parallel key. \u{1F3A8}",
  hook:{
    say:"<b>A C major phrase suddenly darkens</b> — one chord came from C MINOR — then brightens home. \u{1F447} <b>Listen for the shadow.</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ I → iv → V → I</button></div>
          <div class="choices hk-ch" style="display:none"><button>The IV became MINOR — borrowed from C minor</button><button>The key changed permanently</button><button>Nothing changed</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ [[60,64,67],[53,56,60],[55,59,62],[60,64,67]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.85,i*.9,.27))); setTimeout(()=>ch.style.display="",4*900+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ F-A♭-C — the minor iv inside C major, borrowed from C minor. MODAL MIXTURE: today's lesson!");
          else fb(false,"The A♭ was the shadow — one chord on loan from the parallel minor…");
        });
      } }
  },
  objectives:[
    "Define parallel keys: same tonic, different mode (C major / C minor)",
    "Define modal mixture: borrowing chords from the parallel key",
    "The common borrowings into major: iv, ii°, ♭VI, ♭III, ♭VII",
    "Hear the darkening color of mixture",
    "Meet the Picardy third: minor borrowing major I at the end",
    "Read mixture accidentals (♭6, ♭3, ♭7 of the key)"
  ],
  steps:[
    { say:"<b>Parallel Keys:</b> C major and C minor share a <b>tonic</b> but differ in mode — unlike RELATIVE keys (C/Am), which share a signature. Mixture trades between PARALLELS. \u{1F447} <b>C major's parallel minor is…</b>",
      try:{ type:"mc", choices:["C minor — same tonic","A minor — same signature","G minor"], answer:0,
        success:"✓ Same letter, different color — the mixture partners.",
        fail:"Parallel = same TONIC…",
        hint:"Not the relative." } },
    { say:"<b>Modal Mixture:</b> using a chord <b>borrowed from the parallel key</b> — most often minor-key chords imported into major for <b>instant darkening</b>, without leaving the key. \u{1F447} <b>Modal mixture borrows from…</b>",
      try:{ type:"mc", choices:["The parallel key","The dominant key","A distant key"], answer:0,
        success:"✓ Across the parallel border — C major shops in C minor.",
        fail:"Same tonic, other mode…",
        hint:"The shadow twin." } },
    { say:"<b>The Common Borrowings:</b> into C major come C minor's <b>iv</b> (F-A♭-C), <b>ii°</b> (D-F-A♭), <b>♭VI</b> (A♭-C-E♭), <b>♭III</b> (E♭-G-B♭) and <b>♭VII</b> (B♭-D-F). The imported accidentals are the key's <b>♭6, ♭3 and ♭7</b>. \u{1F447} <b>♭VI in C major is spelled…</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Borrowed</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">In C major</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Imported note</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#C05A21">iv</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">F-A\u{266D}-C</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">\u{266D}6</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#C05A21">\u{266D}VI</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">A\u{266D}-C-E\u{266D}</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">\u{266D}6, \u{266D}3</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#C05A21">\u{266D}VII</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">B\u{266D}-D-F</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">\u{266D}7</td></tr></table>` },
      try:{ type:"mc", choices:["A♭-C-E♭","A-C-E","A♭-C♭-E♭"], answer:0,
        success:"✓ A major triad on the lowered 6th — the most beloved borrowing.",
        fail:"Lower the 6th, build major…",
        hint:"A♭ major." } },
    { say:"<b>The Sound:</b> mixture <b>darkens without modulating</b> — the tonic stays C; the borrowed chord passes like a cloud. Pop and film use iv and ♭VI constantly (\u{201C}the sad plagal\u{201D} IV→iv→I). \u{1F447} <b>Mixture changes the key's…</b>",
      try:{ type:"mc", choices:["Color only — the tonic stays","Tonic","Meter"], answer:0,
        success:"✓ A shadow, not a move — that is its charm.",
        fail:"Did the hook leave C?",
        hint:"Clouds, not relocation." } },
    { say:"<b>The Picardy Third:</b> mixture's oldest trick runs the OTHER way — a <b>minor piece ends on a MAJOR tonic chord</b> (the raised 3rd). <b>Remember: mixture = parallel-key borrowing; major borrows ♭6/♭3/♭7 chords; minor borrows the major I to end.</b> \u{1F447} <b>A Picardy third is…</b>",
      try:{ type:"mc", choices:["A major I ending a minor piece","A minor iv in major","A type of trill"], answer:0,
        success:"✓ Centuries of minor works end on borrowed sunshine.",
        fail:"Which direction does THIS borrowing go?",
        hint:"Minor borrows major's ending." } },
    { say:"<b>Spotting Mixture:</b> look for the key's <b>♭6, ♭3 or ♭7</b> in a chord that then returns to normal — a borrowed cloud, not a modulation (no new-key cadence, L99's test). \u{1F447} <b>A♭ appears in one C major chord, then the music continues in C. That was…</b>",
      try:{ type:"mc", choices:["Modal mixture","A modulation to A♭","An error"], answer:0,
        success:"✓ One borrowed shadow — the tonic never moved.",
        fail:"Was there a cadence in a new key?",
        hint:"L99's boundary test." } },
    { say:"<b>Review:</b> \u{1F447} <b>IV → iv → I (F major, F minor, C major) is…</b>",
      try:{ type:"mc", choices:["The 'sad plagal' — mixture darkening the close","A circle progression","A half cadence"], answer:0,
        success:"✓ The borrowed iv melts the plagal cadence — pop's favorite tear.",
        fail:"Which chord got borrowed mid-cadence?",
        hint:"A♭ inside the second chord." } }
  ],
  examples:[
    { caption:"The sad plagal in C: IV (F-A-C) → iv (F-A♭-C) → I. One half-step darkening, maximum emotion.",
      staff:{clef:"treble",tempo:69,notes:[
        {p:"F4",d:"h",label:"IV"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"F4",d:"h",label:"iv!"},{p:"Ab4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"E4",d:"w",label:"I"},{p:"G4",d:"w",chord:true},{p:"C5",d:"w",chord:true},{bar:"final"}],width:520},
      kb:{start:52,octaves:2,labels:true} },
    { caption:"♭VI and ♭VII climbing home: A♭ → B♭ → C — the borrowed 'Mario cadence' of film and game scores.",
      staff:{clef:"treble",tempo:76,notes:[
        {p:"Ab4",d:"h",label:"\u{266D}VI"},{p:"C5",d:"h",chord:true},{p:"Eb5",d:"h",chord:true},
        {p:"Bb4",d:"h",label:"\u{266D}VII"},{p:"D5",d:"h",chord:true},{p:"F5",d:"h",chord:true},
        {p:"C5",d:"w",label:"I"},{p:"E5",d:"w",chord:true},{p:"G5",d:"w",chord:true},{bar:"final"}],width:520},
      kb:{start:56,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Mixture Sprint (45s)",
      intro:"Parallels, borrowings and colors — race them!",
      miaIntro:"Shop next door! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Parallel keys","same tonic, different mode"],
        ["Modal mixture","borrowing from the parallel key"],
        ["iv in C major","F-A\u{266D}-C (borrowed)"],
        ["\u{266D}VI in C major","A\u{266D}-C-E\u{266D}"],
        ["\u{266D}VII in C major","B\u{266D}-D-F"],
        ["The imported notes","\u{266D}6, \u{266D}3, \u{266D}7"],
        ["Picardy third","minor piece ends on major I"],
        ["Mixture vs modulation","color change vs key change"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — borrowing license granted!":null },
    { type:"key-climb", title:"Game 2 · Play the Sad Plagal",
      intro:"Play A (IV's 3rd), A♭ (borrowed!), then G (I's 5th)!",
      miaIntro:"The melting half step! \u{1FA9C}",
      spec:{seq:[69,68,67],
        names:["A (bright IV)","A♭ (the borrowed shadow)","G (home in I)"],
        start:64, octaves:1, title:"IV → iv → I, in one voice"},
      result:(score)=>score!==null?"The tear, performed!":null },
    { type:"symbol-hunt", title:"Game 3 · Borrowed or Diatonic?",
      intro:"Chords in C major — click what each round names!",
      miaIntro:"Hunt the flats! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Borrowed iv (F-A♭-C)", spec:{clef:"treble",notes:[{p:"F4",d:"w"},{p:"Ab4",d:"w",chord:true},{p:"C5",d:"w",chord:true}],width:150}},
        {label:"Diatonic IV (F-A-C)", spec:{clef:"treble",notes:[{p:"F4",d:"w"},{p:"A4",d:"w",chord:true},{p:"C5",d:"w",chord:true}],width:150}},
        {label:"♭VI (A♭-C-E♭)", spec:{clef:"treble",notes:[{p:"Ab4",d:"w"},{p:"C5",d:"w",chord:true},{p:"Eb5",d:"w",chord:true}],width:150}},
        {label:"♭VII (B♭-D-F)", spec:{clef:"treble",notes:[{p:"Bb3",d:"w"},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Borrowings spotted!":null },
    { type:"term-race", title:"Game 4 · Color Race",
      intro:"Which device makes which color — at speed!",
      miaIntro:"Clouds and sunshine! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["IV \u{2192} iv \u{2192} I","the sad plagal"],
        ["\u{266D}VI \u{2192} \u{266D}VII \u{2192} I","the borrowed climb"],
        ["Minor ending on major I","Picardy third"],
        ["A\u{266D} in one C major chord","mixture, not modulation"],
        ["Mixture's effect","darkens without moving"],
        ["Parallel of G major","G minor"],
        ["Parallel of A minor","A major"],
        ["Relative vs parallel","signature-share vs tonic-share"]]},
      result:(score)=>score>=6?"Every color mixed!":null }
  ],
  practiceIntro:"20 practice questions — parallels, borrowings and the Picardy. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Parallel keys","same tonic"],["Mixture","parallel borrowing"],["iv in major","borrowed"],["\u{266D}VI","A\u{266D} major in C"],["Picardy","major I ending a minor piece"]], reverse:true}, count:6 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 },
    { type:"mc", q:"C major's parallel key is…", choices:["C minor","A minor","G major"], answer:0, explain:"Same tonic." },
    { type:"mc", q:"Modal mixture borrows chords from…", choices:["the parallel key","the relative key","no key"], answer:0, explain:"Across the tonic-sharing border." },
    { type:"mc", q:"The borrowed iv in C major is…", choices:["F-A♭-C","F-A-C","F♯-A-C"], answer:0, explain:"♭6 inside." },
    { type:"mc", q:"♭VII in C major is…", choices:["B♭-D-F","B-D-F","B♭-D♭-F"], answer:0, explain:"Major triad on ♭7." },
    { type:"truefalse", q:"Mixture changes the tonic.", answer:false, explain:"Color changes; home stays." },
    { type:"truefalse", q:"The Picardy third ends a minor piece on a major tonic.", answer:true, explain:"Borrowed sunshine." },
    { type:"truefalse", q:"Mixture chords import the key's ♭6, ♭3 or ♭7.", answer:true, explain:"The three shadows." },
    { gen:"term-match", params:{subject:"term", pool:[["IV\u{2192}iv\u{2192}I","sad plagal"],["\u{266D}VI-\u{266D}VII-I","borrowed climb"],["G major's parallel","G minor"],["No new-key cadence","not a modulation"]], reverse:true}, count:3 },
    { gen:"rel-key", params:{ask:"both"}, count:2 }
  ],
  vocabulary:[
    {term:"Parallel Keys", def:"Same tonic, opposite mode: C major / C minor. (Relatives share the signature instead.)"},
    {term:"Modal Mixture (Borrowed Chords)", def:"Using chords from the parallel key — iv, ii°, ♭VI, ♭III, ♭VII into major."},
    {term:"The Sad Plagal (IV→iv→I)", def:"The bright IV melts into borrowed iv before landing home — pop's favorite darkening."},
    {term:"Picardy Third", def:"A minor piece ending on a MAJOR tonic chord — mixture borrowing brightness."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Parallel keys</b> share the tonic; <b>mixture</b> borrows across.",
    "✔ Major borrows: <b>iv, ii°, ♭VI, ♭III, ♭VII</b> (imports ♭6/♭3/♭7).",
    "✔ Effect: <b>darkening WITHOUT modulating</b> — the tonic holds.",
    "✔ <b>Picardy third</b>: minor ends on borrowed major I.",
    "✔ Test vs modulation: no new-key cadence = mixture."
  ],
  tips:[
    "Songwriters: try iv in place of your last IV — instant bittersweetness.",
    "♭VI-♭VII-I powers countless game and film finales — the borrowed climb home.",
    "Every mixture chord still resolves within C — treat the flats as visitors, not settlers.",
    "Unit 26 complete! Next unit: extended chords — 9ths, 11ths, 13ths and beyond."
  ],
  rewards:{ badge:"Color Borrower", icon:"\u{1F3A8}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Same tonic, borrowed shadows.",
  quiz:[
    { type:"mc", q:"Parallel keys share…", choices:["the same tonic","the same signature","nothing"], answer:0, explain:"C major / C minor.", hint:"Not relatives." },
    { type:"mc", q:"Modal mixture means…", choices:["borrowing chords from the parallel key","changing meter","adding trills"], answer:0, explain:"Cross-border shopping.", hint:"The shadow twin." },
    { type:"mc", q:"The borrowed iv of C major is spelled…", choices:["F-A♭-C","F-A-C","D-F-A"], answer:0, explain:"♭6 darkens the IV.", hint:"One flat." },
    { type:"mc", q:"♭VI in C major is…", choices:["A♭ major","A minor","A♭ minor"], answer:0, explain:"A♭-C-E♭.", hint:"Major on ♭6." },
    { type:"mc", q:"Which notes do major-key borrowings import?", choices:["♭6, ♭3, ♭7","♯4, ♯5","the leading tone"], answer:0, explain:"Minor's colors.", hint:"The flat trio." },
    { type:"mc", q:"IV → iv → I is nicknamed…", choices:["the sad plagal","the circle","the Picardy"], answer:0, explain:"The melting close.", hint:"A tear in the cadence." },
    { type:"mc", q:"Identify (key: C major).",
      staff:{clef:"treble",notes:[{p:"Ab4",d:"w"},{p:"C5",d:"w",chord:true},{p:"Eb5",d:"w",chord:true}],width:160},
      choices:["♭VI — borrowed A♭ major","vi — A minor","IV"], answer:0, explain:"Two imported flats.", hint:"Root on ♭6." },
    { type:"mc", q:"A Picardy third is…", choices:["a major I ending a minor piece","a minor I ending a major piece","an augmented 6th"], answer:0, explain:"Borrowed sunshine at the close.", hint:"The reverse borrow." },
    { type:"truefalse", q:"Mixture requires a cadence in the new key.", answer:false, explain:"That would be modulation — mixture never moves the tonic.", hint:"L99's test." },
    { type:"truefalse", q:"♭VII (B♭ major in C) is a common borrowed chord.", answer:true, explain:"The rock-and-film staple.", hint:"The ♭7 chord." },
    { type:"mc", q:"G major's parallel minor is…", choices:["G minor","E minor","B minor"], answer:0, explain:"Same tonic G.", hint:"Not the relative." },
    { type:"mc", q:"Mixture's overall effect is…", choices:["color change while home stays","permanent relocation","tempo change"], answer:0, explain:"Clouds across the tonic sun.", hint:"Shadow, not move." }
  ],
  miaPerfect:"PERFECT! Every shadow borrowed and returned. \u{1F3A8}\u{1F389}",
  miaPass:"Passed — and UNIT 26 is COMPLETE! Chromatic harmony's core is yours. \u{1F389}",
  mia:{
    hook:{ label:"the welcome",
      explain:"F-A♭-C inside C major — the borrowed iv from C minor: modal mixture's signature shadow.",
      play:()=>{[[60,64,67],[53,56,60],[55,59,62],[60,64,67]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.85,.27)));} },
    learn:{ label:"modal mixture",
      explain:"Parallel keys share a tonic; major borrows iv, ii°, ♭VI, ♭III, ♭VII (♭6/♭3/♭7); minor borrows the Picardy major I; color without modulation.",
      hint:"Flats as visitors.",
      play:()=>{[53,56,60].forEach(m=>MFAudio.tone(m,.9,.05,.28));[60,64,67].forEach(m=>MFAudio.tone(m,1.0,1.0,.28));} },
    example:{ label:"the examples",
      explain:"Example 1 melts IV into iv (the sad plagal); example 2 climbs ♭VI-♭VII-I — the borrowed ascent." },
    game:{ label:"the games",
      explain:"Sprint the borrowings, play the melting half step, spot flats on cards, then race the colors.",
      hint:"Find ♭6, ♭3, ♭7." },
    quiz:{ label:"this question",
      explain:"Ask: does the chord import ♭6, ♭3 or ♭7 while the tonic holds? Then it is mixture — name it by its minor-key numeral.",
      play:()=>{[56,60,63].forEach(m=>MFAudio.tone(m,.9,.05,.28));} }
  }
};
