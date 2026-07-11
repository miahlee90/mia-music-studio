/* Lesson 93 — Lead Sheet Chord Symbols (Book 4, Unit 23 — SELF-AUTHORED)
   Core: reading/writing chord symbols: C, Cm, C+, C°, Cmaj7, Cm7, C7,
   Cm7b5, Cdim7, Csus4, Csus2, Cadd9, slash chords (C/E).
   NOTE: edit by FULL-FILE REWRITE only. */

/* symbol-to-sound: read a symbol, pick its notes */
function MF_L93_read(container,fb){
  const ROUNDS=[
    {sym:"Cmaj7", notes:[60,64,67,71], wrong:[[60,64,67,70],[60,63,67,70]], names:["C-E-G-B","C-E-G-B♭","C-E♭-G-B♭"]},
    {sym:"Am7", notes:[57,60,64,67], wrong:[[57,61,64,67],[57,60,63,67]], names:["A-C-E-G","A-C♯-E-G","A-C-E♭-G"]},
    {sym:"Gsus4", notes:[55,60,62], wrong:[[55,59,62],[55,58,62]], names:["G-C-D (4 replaces 3)","G-B-D","G-B♭-D"]},
    {sym:"C/E", notes:[52,60,64,67], wrong:[[60,64,67],[52,55,60]], names:["C chord with E in the bass","C chord, root position","E minor chord"]}];
  let r=0;
  container.innerHTML=`<div class="big-q l93r-q" style="text-align:center"></div>
    <div class="choices l93r-ch"></div>`;
  const q=container.querySelector(".l93r-q"), ch=container.querySelector(".l93r-ch");
  function ask(){
    if(r>=ROUNDS.length){ q.textContent="Excellent! Every symbol decoded."; ch.innerHTML=""; return; }
    const R=ROUNDS[r];
    q.innerHTML=`Symbol ${r+1} of ${ROUNDS.length}: what does <b>${R.sym}</b> mean?`;
    ch.innerHTML="";
    R.names.forEach((name,i)=>{
      const b=document.createElement("button"); b.textContent=name;
      b.onclick=()=>{
        const R2=ROUNDS[r];
        if(i===0){ R2.notes.forEach(m=>MFAudio.tone(m,.9,.05,.28)); fb(true,`✓ ${R2.sym} = ${R2.names[0]}.`); r++; setTimeout(ask,1300); }
        else { MFAudio.tone(40,.2); fb(false,"Decode the parts: root letter, quality, number, and any slash."); }
      };
      ch.appendChild(b);
    });
  }
  ask();
}

LESSON_CONTENT[93]={
  welcome:"Lead sheet symbols: harmony in shorthand. \u{1F4DD}",
  hook:{
    say:"<b>A lead sheet gives a melody and letters like Cmaj7, Am7, G7.</b> From those letters alone, players build the whole accompaniment. \u{1F447} <b>What must the letters encode?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Hear Cmaj7 → Am7 → G7 → C</button></div>
          <div class="choices hk-ch" style="display:none"><button>Each chord's root, quality and extensions</button><button>Only the melody</button><button>The lyrics</button></div>`;
        const ROWS=[[60,64,67,71],[57,60,64,67],[55,59,62,65],[60,64,67,72]];
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.85,.26))); setTimeout(()=>ch.style.display="",ROWS.length*850+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Root + quality + extras, all in a few characters — the lead-sheet symbol system. Today: reading and writing it fluently!");
          else fb(false,"The letters produced full CHORDS — what information did they carry?");
        });
      } }
  },
  objectives:[
    "Read the symbol anatomy: root + quality + number + alterations",
    "Triads: C, Cm, C+, C° (dim)",
    "Sevenths: Cmaj7, Cm7, C7, Cm7♭5 (ø7), Cdim7 (°7)",
    "Suspensions: Csus4, Csus2 — the 3rd replaced",
    "Added tones: Cadd9, C6",
    "Slash chords: C/E = C chord, E in the bass"
  ],
  steps:[
    { say:"<b>Symbol Anatomy:</b> a chord symbol reads left to right — <b>ROOT letter</b> → <b>quality</b> (nothing = major, m = minor, + = aug, ° = dim) → <b>number</b> (7, 9…) → <b>alterations/instructions</b> (♭5, sus4, add9, /bass). \u{1F447} <b>In \u{201C}Cm7\u{201D}, the \u{201C}m\u{201D} tells you…</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14.5px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Symbol</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Meaning</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">On C</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;font-weight:800">C</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px">major triad</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px">C-E-G</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;font-weight:800">Cm</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px">minor triad</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px">C-E♭-G</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;font-weight:800">C+ / C°</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px">augmented / diminished</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px">C-E-G♯ / C-E♭-G♭</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;font-weight:800">C7 · Cmaj7 · Cm7</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px">the sevenths</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px">Lesson 92's family</td></tr></table>` },
      try:{ type:"mc", choices:["The triad is minor","Play more quietly","The meter"], answer:0,
        success:"✓ m = minor triad; the 7 then adds a minor 7th.",
        fail:"Quality comes right after the root…",
        hint:"m for minor." } },
    { say:"<b>The Seventh Symbols:</b> <b>Cmaj7</b> (also C\u{25B3}7) = major 7 · <b>C7</b> = dominant 7 · <b>Cm7</b> = minor 7 · <b>Cm7♭5</b> (also Cø7) = half-diminished · <b>Cdim7</b> (C°7) = diminished 7. Note: plain \u{201C}7\u{201D} always means the DOMINANT type. \u{1F447} <b>\u{201C}C7\u{201D} is…</b>",
      try:{ type:"mc", choices:["The dominant seventh: C-E-G-B♭","The major seventh: C-E-G-B","A minor chord"], answer:0,
        success:"✓ Plain 7 = dominant type. Major 7 must SAY maj7.",
        fail:"Which type gets no prefix?",
        hint:"The pull chord." } },
    { say:"<b>Sus Chords:</b> <b>sus4</b> replaces the 3rd with the <b>4th</b> (Csus4 = C-F-G); <b>sus2</b> replaces it with the <b>2nd</b> (Csus2 = C-D-G). No 3rd = neither major nor minor — suspended, waiting to resolve. \u{1F447} <b>In Csus4, which note replaces which?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:80,notes:[
        {p:"C4",d:"h",label:"Csus4"},{p:"F4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"C4",d:"h",label:"C"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{bar:"final"}],width:400} },
      try:{ type:"mc", choices:["The 4th replaces the 3rd","The root is removed","The 5th is doubled"], answer:0,
        success:"✓ F stands where E was — then classically resolves down to E.",
        fail:"SUSpended = the 3rd is held away…",
        hint:"4 in place of 3." } },
    { say:"<b>Add Chords:</b> <b>add9</b> keeps the triad and <b>adds</b> the 9th — Cadd9 = C-E-G-D. Unlike sus, nothing is replaced. <b>C6</b> adds the 6th (C-E-G-A). \u{1F447} <b>Cadd9 contains…</b>",
      try:{ type:"mc", choices:["C-E-G plus D","C-D-G only","C-E-G-B"], answer:0,
        success:"✓ Full triad + the 9th — color without losing the 3rd.",
        fail:"ADD means nothing leaves…",
        hint:"Triad + 1 extra." } },
    { say:"<b>Slash Chords:</b> <b>C/E</b> = \u{201C}C chord, <b>E in the bass</b>\u{201D} — the letter after the slash names the bass note. C/E is C major in 1st inversion (Lesson 51, in lead-sheet clothes). <b>Remember: root + quality + number + extras; slash = bass note.</b> \u{1F447} <b>G/B means…</b>",
      try:{ type:"mc", choices:["A G chord with B in the bass","A B chord with G on top","Two chords at once"], answer:0,
        success:"✓ Chord before the slash, bass after — G major, 1st inversion.",
        fail:"The slash points at the BASS…",
        hint:"chord / bass." } },
    { say:"Decode symbols yourself. \u{1F447}",
      try:{ type:"custom",
        hint:"Root → quality → number → slash.",
        mount:(container,fb)=>MF_L93_read(container,fb) } },
    { say:"<b>Review:</b> \u{1F447} <b>Which symbol means half-diminished seventh?</b>",
      try:{ type:"mc", choices:["Cm7♭5","Cmaj7","Csus4"], answer:0,
        success:"✓ m7♭5 spells the recipe: minor 7th chord with the 5th lowered — ø7.",
        fail:"Read the alteration…",
        hint:"Also written ø7." } }
  ],
  examples:[
    { caption:"A lead-sheet progression realized: Cmaj7 · Am7 · Dm7 · G7 — the symbols above, the sounding chords below.",
      staff:{clef:"treble",tempo:72,notes:[
        {p:"C4",d:"h",label:"Cmaj7"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{p:"B4",d:"h",chord:true},
        {p:"A3",d:"h",label:"Am7"},{p:"C4",d:"h",chord:true},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"D4",d:"h",label:"Dm7"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"G3",d:"h",label:"G7"},{p:"B3",d:"h",chord:true},{p:"D4",d:"h",chord:true},{p:"F4",d:"h",chord:true},{bar:"final"}],width:640},
      kb:{start:43,octaves:3,labels:true} },
    { caption:"Sus resolving: Gsus4 → G → C. The suspended 4th (C) steps down to the 3rd (B) — tension released before the cadence.",
      staff:{clef:"treble",tempo:72,notes:[
        {p:"G3",d:"h",label:"Gsus4"},{p:"C4",d:"h",chord:true},{p:"D4",d:"h",chord:true},
        {p:"G3",d:"h",label:"G"},{p:"B3",d:"h",chord:true},{p:"D4",d:"h",chord:true},
        {p:"C4",d:"w",label:"C"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:480},
      kb:{start:43,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Symbol Sprint (45s)",
      intro:"Symbols to spellings — race the shorthand!",
      miaIntro:"Root, quality, number! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["C7","dominant 7 (C-E-G-B\u{266D})"],
        ["Cmaj7","major 7 (C-E-G-B)"],
        ["Cm7","minor 7 (C-E\u{266D}-G-B\u{266D})"],
        ["Cm7\u{266D}5","half-diminished 7"],
        ["Cdim7","diminished 7"],
        ["Csus4","4th replaces the 3rd"],
        ["Cadd9","triad + 9th, nothing removed"],
        ["C/E","C chord, E in the bass"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — shorthand fluent!":null },
    { type:"key-climb", title:"Game 2 · Play the Symbols",
      intro:"Realize Csus4 → C by hand — feel the 4 resolve to 3!",
      miaIntro:"Suspend, then release! \u{1FA9C}",
      spec:{seq:[60,65,67, 60,64,67],
        names:["C (root)","F (the sus 4!)","G (5th)","C","E (the 3rd returns)","G"],
        start:60, octaves:1, title:"Csus4 resolving to C"},
      result:(score)=>score!==null?"Suspension resolved by hand!":null },
    { type:"symbol-hunt", title:"Game 3 · Match Symbol to Notes",
      intro:"Chords on cards — click the one each symbol names!",
      miaIntro:"Decode, then find! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Csus4 (C-F-G)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"F4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:150}},
        {label:"Cadd9 (C-E-G-D)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"D5",d:"w",chord:true}],width:150}},
        {label:"C/E (E in the bass)", spec:{clef:"treble",notes:[{p:"E4",d:"w"},{p:"G4",d:"w",chord:true},{p:"C5",d:"w",chord:true}],width:150}},
        {label:"Cm7 (C-E♭-G-B♭)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"Eb4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Symbols matched on sight!":null },
    { type:"term-race", title:"Game 4 · Symbol Grammar Race",
      intro:"What does each PART of a symbol mean — at speed!",
      miaIntro:"Read left to right! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["A bare letter (C)","major triad"],
        ["m after the root","minor triad"],
        ["Plain 7","dominant type"],
        ["maj7","major 7th type"],
        ["\u{266D}5","lower the 5th"],
        ["sus4","4th replaces the 3rd"],
        ["add9","add the 9th, keep the 3rd"],
        ["/E","E in the bass"]]},
      result:(score)=>score>=6?"Grammar mastered!":null }
  ],
  practiceIntro:"20 practice questions — reading and writing the shorthand. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["C","major triad"],["Cm","minor triad"],["C7","dominant 7"],["Cmaj7","major 7"],["Csus4","4 replaces 3"],["C/G","G in the bass"]], reverse:true}, count:6 },
    { gen:"triad-quality", params:{}, count:2 },
    { type:"mc", q:"A bare letter like 'F' means…", choices:["F major triad","F minor triad","F dominant 7"], answer:0,
      explain:"No suffix = major triad." },
    { type:"mc", q:"'Am' means…", choices:["A minor triad","A major","A augmented"], answer:0,
      explain:"m = minor." },
    { type:"mc", q:"Plain '7' (as in G7) always means…", choices:["the dominant-seventh type","the major-seventh type","a 7-note chord"], answer:0,
      explain:"maj7 must be written out." },
    { type:"mc", q:"Dsus4 contains…", choices:["D-G-A","D-F♯-A","D-F-A"], answer:0,
      explain:"The 4th (G) replaces the 3rd." },
    { type:"truefalse", q:"In an add9 chord, the 3rd is removed.", answer:false,
      explain:"ADD keeps everything and adds the 9th." },
    { type:"truefalse", q:"C/E is a C major chord with E as the lowest note.", answer:true,
      explain:"Slash = bass note — 1st inversion." },
    { type:"truefalse", q:"Cm7♭5 and Cø7 name the same chord.", answer:true,
      explain:"Two spellings, one half-diminished chord." },
    { gen:"term-match", params:{subject:"term", pool:[["Gsus2","G-A-D"],["C6","C-E-G-A"],["Cdim7","\u{00B0}7 chord"],["F/A","F chord, A bass"]], reverse:true}, count:3 },
    { gen:"inversion-id", params:{subject:"triad", ask:"position"}, count:2 }
  ],
  vocabulary:[
    {term:"Lead Sheet", def:"Melody + chord symbols — the player realizes the harmony from the shorthand."},
    {term:"Chord Symbol Anatomy", def:"Root letter → quality (m, +, °) → number (7, 9) → alterations (♭5, sus, add, /bass)."},
    {term:"Sus4 / Sus2", def:"The 4th (or 2nd) REPLACES the 3rd — suspended, usually resolving to the 3rd."},
    {term:"Slash Chord", def:"C/E: the chord before the slash, the BASS note after it — lead-sheet inversions."}
  ],
  mistakes:[],
  summary:[
    "✔ Read symbols left to right: <b>root → quality → number → extras</b>.",
    "✔ Plain <b>7 = dominant</b>; major 7th must say <b>maj7</b>.",
    "✔ <b>sus</b> replaces the 3rd; <b>add</b> keeps it and adds a tone.",
    "✔ <b>m7♭5 = ø7</b>; <b>dim7 = °7</b>.",
    "✔ <b>C/E</b> = C chord over an E bass — inversions in shorthand."
  ],
  tips:[
    "Realize lead sheets root-position first; add inversions (slash chords) once the changes flow.",
    "sus4 wants to resolve: let the 4th fall to the 3rd and the symbol makes sense to the ear.",
    "Jazz charts often write △7 for maj7 and ø for m7♭5 — same chords, alternate dress.",
    "Next lesson: sevenths turned upside down — inversions of seventh chords."
  ],
  rewards:{ badge:"Chart Reader", icon:"\u{1F4DD}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Root → quality → number → slash.",
  quiz:[
    { type:"mc", q:"In chord symbols, a bare root letter means…", choices:["a major triad","a minor triad","a seventh chord"], answer:0,
      explain:"C = C-E-G.", hint:"No suffix needed." },
    { type:"mc", q:"'m' directly after the root means…", choices:["minor triad","major 7th","muted"], answer:0,
      explain:"Cm = C-E♭-G.", hint:"Lowercase quality." },
    { type:"mc", q:"G7 is…", choices:["a dominant seventh","a major seventh","G plus 7 extra notes"], answer:0,
      explain:"Plain 7 = dominant type.", hint:"The default 7." },
    { type:"mc", q:"To write a MAJOR seventh on F, the symbol is…", choices:["Fmaj7","F7","Fm7"], answer:0,
      explain:"maj must be explicit.", hint:"Say it fully." },
    { type:"mc", q:"Csus4 = …", choices:["C-F-G","C-E-G","C-D-E"], answer:0,
      explain:"4 replaces 3.", hint:"No E anywhere." },
    { type:"mc", q:"Cadd9 = …", choices:["C-E-G-D","C-D-G","C-E-G-B"], answer:0,
      explain:"Triad intact + 9th.", hint:"Nothing removed." },
    { type:"mc", q:"C/G means…", choices:["C major with G in the bass","G major with C on top","C and G played separately"], answer:0,
      explain:"2nd inversion, lead-sheet style.", hint:"Slash = bass." },
    { type:"mc", q:"Which pair names the SAME chord?", choices:["Cm7♭5 and Cø7","C7 and Cmaj7","Csus4 and Cadd9"], answer:0,
      explain:"Half-diminished, two spellings.", hint:"Lesson 92's ø." },
    { type:"mc", q:"Decode the notes: A-C-E-G. The symbol is…", choices:["Am7","Amaj7","A7"], answer:0,
      explain:"Minor triad + minor 7th.", hint:"Check the 3rd: C natural." },
    { type:"truefalse", q:"A sus chord is neither major nor minor.", answer:true,
      explain:"No 3rd = no gender.", hint:"What did sus remove?" },
    { type:"truefalse", q:"In C6, the 6th replaces the 5th.", answer:false,
      explain:"C6 ADDS A to the full triad.", hint:"Add, not replace." },
    { type:"mc", q:"A chart shows: Dm7 → G7 → Cmaj7. You recognize this as…", choices:["a ii-V-I in C major","a 12-bar blues","a plagal cadence"], answer:0,
      explain:"Lead-sheet ii-V-I — Lesson 95 ahead.", hint:"Count the degrees in C." }
  ],
  miaPerfect:"PERFECT! Every symbol realized on demand. \u{1F4DD}\u{1F389}",
  miaPass:"Passed! Charts hold no secrets. Next: sevenths, inverted…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Four symbols became four chords: root + quality + number (+ slash) is all the information a player needs.",
      play:()=>{const ROWS=[[60,64,67,71],[57,60,64,67],[55,59,62,65],[60,64,67,72]];ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.75,i*.8,.26)));} },
    learn:{ label:"lead sheet symbols",
      explain:"Root → quality (m/+/°) → number (plain 7 = dominant) → extras (♭5, sus, add, /bass). sus replaces the 3rd; add keeps it.",
      hint:"Left to right.",
      play:()=>{[60,65,67].forEach(m=>MFAudio.tone(m,.7,.05,.3));[60,64,67].forEach(m=>MFAudio.tone(m,.8,.9,.3));} },
    example:{ label:"the examples",
      explain:"Example 1 realizes a Cmaj7-Am7-Dm7-G7 chart; example 2 resolves Gsus4 into G, then home to C." },
    game:{ label:"the games",
      explain:"Sprint the symbols, resolve a sus by hand, match symbols to staff chords, then master the grammar.",
      hint:"Plain 7 = dominant." },
    quiz:{ label:"this question",
      explain:"Parse every symbol the same way: root letter, quality suffix, number, then alterations and the slash-bass.",
      play:()=>{[57,60,64,67].forEach(m=>MFAudio.tone(m,.9,.05,.28));} }
  }
};
