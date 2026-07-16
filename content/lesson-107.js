/* Lesson 107 — Borrowed Chords / Modal Mixture (Book 4, Unit 26 — SELF-AUTHORED)
   Core: PARALLEL keys (C major / C minor) share a tonic; MODAL MIXTURE
   borrows chords across: iv, ii°, ♭VI, ♭III, ♭VII into major (darkening);
   the Picardy third (major I ending minor) borrows the other way.
   NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[107]={
  welcome:"Modal mixture introduces pitches and chords from the parallel mode.",
  hook:{
    say:"A phrase in C major includes an F minor chord drawn from the parallel minor mode before returning to C major. \u{1F447} <b>Which chord demonstrates modal mixture?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play IV–iv–I in C major</button></div>
          <div class="choices hk-ch" style="display:none"><button>F minor, iv — drawn from the parallel minor mode</button><button>C major, I — the diatonic tonic chord</button><button>The passage permanently modulates to C minor</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ [[65,69,72],[65,68,72],[60,64,67]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.85,i*.9,.27))); setTimeout(()=>ch.style.display="",3*900+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Correct. F–A♭–C is iv in C minor. Its use within a passage that remains centered on C major demonstrates modal mixture.");
          else fb(false,"Listen for A♭, the pitch that changes the diatonic F-major triad into F minor.");
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
    { say:"<b>Parallel and Relative Keys:</b> Parallel keys share the same tonic but use different modes and key signatures. C major and C minor are parallel keys. Relative major and minor keys share a key signature but have different tonics; C major and A minor are relative keys. Modal mixture draws pitches or chords from the parallel mode. \u{1F447} <b>What is the parallel minor of C major?</b>",
      try:{ type:"mc", choices:["C minor — the same tonic in a different mode","A minor — the relative minor","G minor"], answer:0,
        success:"✓ Correct. C major and C minor share the tonic C but use different modal collections.",
        fail:"Identify the minor key that shares the tonic C.",
        hint:"Parallel keys share a tonic; relative keys share a key signature." } },
    { say:"<b>Modal Mixture:</b> Modal mixture occurs when music in a major or minor key uses pitches or chords associated with its parallel mode. Major-key passages frequently use chords from the parallel minor, and minor-key passages may use chords or scale degrees associated with the parallel major. Modal mixture does not by itself establish a new tonic. \u{1F447} <b>Modal mixture draws material from…</b>",
      try:{ type:"mc", choices:["The parallel mode","The dominant key by definition","A key with an unrelated tonic by definition"], answer:0,
        success:"✓ Correct. Modal mixture combines material from parallel major and minor modes, which share the same tonic.",
        fail:"Identify the mode that shares the current tonic.",
        hint:"Parallel modes share the same tonic pitch." } },
    { say:"<b>Common Mixture Chords in Major:</b> A passage in C major may draw chords from the parallel minor collection. These chords commonly introduce scale degrees <b>♭3, ♭6, and ♭7</b> into the major mode; their function must be determined from context. \u{1F447} <b>How is ♭VI spelled in C major?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Borrowed</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">In C major</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Imported note</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#C05A21">iv</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">F-A\u{266D}-C</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">\u{266D}6</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#C05A21">ii\u{00B0}</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">D-F-A\u{266D}</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">\u{266D}6</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#C05A21">ii\u{00F8}7</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">D-F-A\u{266D}-C</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">\u{266D}6</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#C05A21">\u{266D}III</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">E\u{266D}-G-B\u{266D}</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">\u{266D}3, \u{266D}7</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#C05A21">\u{266D}VI</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">A\u{266D}-C-E\u{266D}</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">\u{266D}6, \u{266D}3</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#C05A21">\u{266D}VII</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">B\u{266D}-D-F</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">\u{266D}7</td></tr></table>` },
      try:{ type:"mc", choices:["A♭-C-E♭","A-C-E","A♭-C♭-E♭"], answer:0,
        success:"✓ Correct. A♭–C–E♭ is an A♭ major triad rooted on scale degree ♭6.",
        fail:"Lower scale degree 6 from A to A♭ and build a major triad.",
        hint:"♭VI in C major is A♭ major." } },
    { say:"<b>Modal Mixture and Tonal Center:</b> Modal mixture changes the available pitch and chord collection while the prevailing tonic may remain unchanged. The progression IV–iv–I in major is a common example: the diatonic IV moves to a minor iv drawn from the parallel minor before resolving to I. At a phrase ending, iv–I may create a minor plagal cadence. \u{1F447} <b>Which statement best describes modal mixture?</b>",
      try:{ type:"mc", choices:["It introduces material from the parallel mode without necessarily establishing a new tonic","It must permanently change the tonic","It changes the meter"], answer:0,
        success:"✓ Correct. A borrowed chord can alter the harmonic collection while the prevailing tonic remains active.",
        fail:"Determine whether another tonic receives structural confirmation.",
        hint:"Identify the tonal center before and after the mixture chord." } },
    { say:"<b>The Picardy Third:</b> A Picardy third occurs when a composition or substantial section in a minor key ends with a major tonic triad; the third of the tonic chord is raised by half step, changing i to I at the final cadence. Mixture in minor is not limited to the Picardy third — minor-key passages may also use chords such as major IV or other pitches associated with the parallel major. \u{1F447} <b>What is a Picardy third?</b>",
      try:{ type:"mc", choices:["A raised third that creates a major tonic at the end of a minor-key composition or section","A minor iv chord in a major key","A melodic ornament"], answer:0,
        success:"✓ Correct. Raising the tonic triad's third changes the final chord from minor to major.",
        fail:"Compare the final tonic triad with the parallel major tonic.",
        hint:"The final i chord becomes I." } },
    { say:"<b>Identifying Modal Mixture:</b> First, identify the prevailing tonic and mode. Next, spell the chromatic chord and determine whether its pitches correspond to a chord associated with the parallel mode. Finally, analyze its function and confirm the passage does not establish another tonic more strongly — a single altered pitch is not sufficient evidence. \u{1F447} <b>In C major, an F–A♭–C chord functions as iv and resolves to C major without establishing another tonic. How should it be analyzed?</b>",
      try:{ type:"mc", choices:["Modal mixture from the parallel minor","Modulation to A♭ major","A notation error"], answer:0,
        success:"✓ Correct. F minor is iv in the parallel minor mode and functions here within C major.",
        fail:"Identify the chord and determine whether another tonic is structurally established.",
        hint:"F–A♭–C is iv in C minor." } },
    { say:"<b>Review:</b> \u{1F447} <b>In C major, how is IV–iv–I best described?</b>",
      try:{ type:"mc", choices:["A mixture progression using minor iv before tonic","A descending-fifths progression","A half cadence"], answer:0,
        success:"✓ Correct. The minor iv is drawn from the parallel minor and resolves to I. At a phrase ending, the iv–I motion may form a minor plagal cadence.",
        fail:"Identify the chord containing A♭.",
        hint:"F minor is iv in C minor." } }
  ],
  examples:[
    { caption:"The sad plagal in C: IV (F-A-C) → iv (F-A♭-C) → I. One half-step darkening, maximum emotion.",
      staff:{clef:"treble",tempo:69,notes:[
        {p:"F4",d:"w",label:"IV"},{p:"A4",d:"w",chord:true},{p:"C5",d:"w",chord:true},
        {p:"F4",d:"w",label:"iv!"},{p:"Ab4",d:"w",chord:true},{p:"C5",d:"w",chord:true},
        {p:"E4",d:"w",label:"I"},{p:"G4",d:"w",chord:true},{p:"C5",d:"w",chord:true},{bar:"final"}],width:520},
      kb:{start:60,octaves:1,labels:true} },
    { caption:"♭VI and ♭VII climbing home: A♭ → B♭ → C — the borrowed 'Mario cadence' of film and game scores.",
      staff:{clef:"treble",tempo:76,notes:[
        {p:"Ab4",d:"w",label:"\u{266D}VI"},{p:"C5",d:"w",chord:true},{p:"Eb5",d:"w",chord:true},
        {p:"Bb4",d:"w",label:"\u{266D}VII"},{p:"D5",d:"w",chord:true},{p:"F5",d:"w",chord:true},
        {p:"C5",d:"w",label:"I"},{p:"E5",d:"w",chord:true},{p:"G5",d:"w",chord:true},{bar:"final"}],width:520},
      kb:{start:65,octaves:1.5,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Modal-Mixture Identification",
      intro:"Identify parallel modes and common borrowed-chord spellings.",
      miaIntro:"Same tonic, parallel mode.",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Parallel keys","same tonic, different mode"],
        ["Modal mixture","borrowing from the parallel key"],
        ["iv in C major","F-A\u{266D}-C (borrowed)"],
        ["\u{266D}VI in C major","A\u{266D}-C-E\u{266D}"],
        ["\u{266D}VII in C major","B\u{266D}-D-F"],
        ["The imported notes","\u{266D}6, \u{266D}3, \u{266D}7"],
        ["Picardy third","minor piece ends on major I"],
        ["Mixture vs modulation","color change vs key change"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — modal-mixture chords identified!":null },
    { type:"key-climb", title:"Game 2 · Perform the Minor Plagal Progression",
      intro:"Play the complete progression F major → F minor → C major. Listen to the inner line A–A♭–G.",
      miaIntro:"Follow the chromatic inner voice A–A♭–G.",
      spec:{seq:[65,69,72,65,68,72,60,64,67],
        names:["F (root of IV)","A (3rd of IV)","C (5th of IV)","F (root of iv)","A♭ (borrowed 3rd of iv)","C (5th of iv)","C (root of I)","E (3rd of I)","G (5th of I)"],
        start:60, octaves:1, title:"Play each complete chord: IV → iv → I"},
      result:(score)=>score!==null?"You performed the mixture progression.":null },
    { type:"symbol-hunt", title:"Game 3 · Borrowed or Diatonic?",
      intro:"Examine each chord in a C-major context and determine whether it is diatonic or drawn from the parallel minor.",
      miaIntro:"Spell the complete chord and identify its function.",
      spec:{rounds:6, pool:[
        {label:"Borrowed iv (F-A♭-C)", spec:{clef:"treble",notes:[{p:"F4",d:"w"},{p:"Ab4",d:"w",chord:true},{p:"C5",d:"w",chord:true}],width:150}},
        {label:"Diatonic IV (F-A-C)", spec:{clef:"treble",notes:[{p:"F4",d:"w"},{p:"A4",d:"w",chord:true},{p:"C5",d:"w",chord:true}],width:150}},
        {label:"♭VI (A♭-C-E♭)", spec:{clef:"treble",notes:[{p:"Ab4",d:"w"},{p:"C5",d:"w",chord:true},{p:"Eb5",d:"w",chord:true}],width:150}},
        {label:"♭VII (B♭-D-F)", spec:{clef:"treble",notes:[{p:"Bb3",d:"w"},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"You classified the chords correctly.":null },
    { type:"term-race", title:"Game 4 · Identify the Mixture Device",
      intro:"Match each musical description with the appropriate mixture technique.",
      miaIntro:"Parallel minor borrowing or parallel major inflection?",
      spec:{rounds:8, reverse:true, pool:[
        ["IV \u{2192} iv \u{2192} I","minor iv borrowed from the parallel minor"],
        ["\u{266D}VI \u{2192} \u{266D}VII \u{2192} I","the borrowed climb"],
        ["Minor ending on major I","Picardy third"],
        ["A\u{266D} in one C major chord","mixture, not modulation"],
        ["Mixture's effect","darkens without moving"],
        ["Parallel of G major","G minor"],
        ["Parallel of A minor","A major"],
        ["Relative vs parallel","signature-share vs tonic-share"]]},
      result:(score)=>score>=6?"You identified the mixture techniques correctly.":null }
  ],
  practiceIntro:"Complete 20 practice questions on parallel keys, borrowed chords, modal mixture, and the Picardy third.",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Parallel keys","same tonic"],["Mixture","parallel borrowing"],["iv in major","borrowed"],["\u{266D}VI","A\u{266D} major in C"],["Picardy","major I ending a minor piece"]], reverse:true}, count:6 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 },
    { type:"mc", q:"C major's parallel minor is…", choices:["C minor","A minor","G major"], answer:0, explain:"The same tonic in a different mode." },
    { type:"mc", q:"Modal mixture draws material from…", choices:["the parallel mode","the relative mode","no other key"], answer:0, explain:"The tonic-sharing parallel mode." },
    { type:"mc", q:"The borrowed iv in C major is…", choices:["F-A♭-C","F-A-C","F♯-A-C"], answer:0, explain:"Contains ♭6 (A♭)." },
    { type:"mc", q:"♭VII in C major is…", choices:["B♭-D-F","B-D-F","B♭-D♭-F"], answer:0, explain:"B♭–D–F; context determines whether it functions as mixture or broader modal harmony." },
    { type:"truefalse", q:"Modal mixture necessarily establishes a new tonic.", answer:false, explain:"Mixture may occur while the prevailing tonic remains active, although borrowed chords can participate in a larger modulation." },
    { type:"truefalse", q:"A Picardy third creates a major final tonic in a minor-key composition or section.", answer:true, explain:"The tonic triad's third is raised at the final cadence." },
    { type:"truefalse", q:"Common mixture chords in a major key often introduce ♭3, ♭6, or ♭7.", answer:true, explain:"These characteristic altered scale degrees still require context to confirm function." },
    { gen:"term-match", params:{subject:"term", pool:[["IV\u{2192}iv\u{2192}I","minor plagal progression"],["\u{266D}VI-\u{266D}VII-I","borrowed climb"],["G major's parallel","G minor"],["No new-key cadence","not a modulation"]], reverse:true}, count:3 },
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
  miaQuizIntro:"Quiz: Identify material drawn from parallel major and minor modes.",
  quiz:[
    { type:"mc", q:"Parallel keys share…", choices:["the same tonic","the same signature","nothing"], answer:0, explain:"C major / C minor.", hint:"Not relatives." },
    { type:"mc", q:"Modal mixture means…", choices:["using material associated with the parallel mode","changing meter","adding trills"], answer:0, explain:"Parallel major and minor share the tonic.", hint:"The parallel mode." },
    { type:"mc", q:"The borrowed iv of C major is spelled…", choices:["F-A♭-C","F-A-C","D-F-A"], answer:0, explain:"♭6 darkens the IV.", hint:"One flat." },
    { type:"mc", q:"♭VI in C major is…", choices:["A♭ major","A minor","A♭ minor"], answer:0, explain:"A♭-C-E♭.", hint:"Major on ♭6." },
    { type:"mc", q:"Which altered scale degrees commonly appear in mixture chords borrowed from the parallel minor?", choices:["♭3, ♭6, and ♭7","♯4 and ♯5 only","the unchanged leading tone only"], answer:0, explain:"The characteristic scale degrees of the parallel minor.", hint:"The lowered degrees." },
    { type:"mc", q:"In C major, IV–iv–I demonstrates…", choices:["Modal mixture through the minor iv chord","A circle-of-fifths sequence","A Picardy third"], answer:0, explain:"F minor is drawn from the parallel minor mode.", hint:"The minor iv is borrowed." },
    { type:"mc", q:"Identify the chord in C major.",
      staff:{clef:"treble",notes:[{p:"Ab4",d:"w"},{p:"C5",d:"w",chord:true},{p:"Eb5",d:"w",chord:true}],width:160},
      choices:["♭VI — A♭ major","vi — A minor","IV — F major"], answer:0, explain:"A♭–C–E♭ is a major triad rooted on scale degree ♭6.", hint:"Root on ♭6." },
    { type:"mc", q:"What is a Picardy third?", choices:["A raised third that creates a major final tonic in a minor-key work or section","A minor tonic ending a major-key work","An augmented-sixth chord"], answer:0, explain:"The tonic triad's third is raised at the final cadence.", hint:"i becomes I at the end." },
    { type:"truefalse", q:"Modal mixture by itself requires the establishment of a new tonic.", answer:false, explain:"Mixture may occur while the prevailing tonic remains active, though borrowed chords can also participate in a modulation.", hint:"L99's test." },
    { type:"truefalse", q:"In a clearly established C-major context, B♭ major may function as ♭VII drawn from the parallel minor collection.", answer:true, explain:"In other contexts, ♭VII may be better understood as part of Mixolydian or other modal harmony.", hint:"The ♭7 chord." },
    { type:"mc", q:"What is the parallel minor of G major?", choices:["G minor","E minor","B minor"], answer:0, explain:"Same tonic G, different mode.", hint:"Not the relative." },
    { type:"mc", q:"Which statement best distinguishes modal mixture from modulation?", choices:["Mixture may introduce parallel-mode material while the prevailing tonic remains active","Mixture always establishes a permanent new tonic","Mixture changes only the tempo"], answer:0, explain:"Determine whether another tonic receives structural confirmation before labeling a modulation.", hint:"Is a new tonic confirmed?" }
  ],
  miaPerfect:"Perfect score! You accurately identified common borrowed chords and modal-mixture procedures.",
  miaPass:"You passed and completed unit 26. Next, you will study extended chords.",
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
