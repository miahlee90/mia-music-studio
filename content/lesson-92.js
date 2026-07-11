/* Lesson 92 — The Five Seventh Chords (Book 4, Unit 23 — SELF-AUTHORED)
   Core: triad + 7th above the root = seventh chord. Five common types:
   MAJOR 7 (M triad + M7) · DOMINANT 7 (M triad + m7) · MINOR 7 (m + m7) ·
   HALF-DIMINISHED 7 (dim + m7) · DIMINISHED 7 (dim + dim7).
   NOTE: edit by FULL-FILE REWRITE only. */

/* seventh-quality ear lab */
function MF_L92_ear(container,fb){
  const CH={maj7:[60,64,67,71], dom7:[60,64,67,70], m7:[60,63,67,70], hd7:[60,63,66,70], d7:[60,63,66,69]};
  const NAME={maj7:"Major 7 — smooth and calm", dom7:"Dominant 7 — bright with pull", m7:"Minor 7 — dark and mellow", hd7:"Half-diminished 7", d7:"Diminished 7 — maximum tension"};
  const ROUNDS=["dom7","maj7","m7","d7"];
  const KEY=["maj7","dom7","m7","d7"];
  let r=0, played=false;
  container.innerHTML=`<div class="big-q l92e-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l92e-play">▶ Hear the chord</button></div>
    <div class="choices l92e-ch" style="display:none"><button>Major 7</button><button>Dominant 7</button><button>Minor 7</button><button>Diminished 7</button></div>`;
  const q=container.querySelector(".l92e-q"), pl=container.querySelector(".l92e-play"), ch=container.querySelector(".l92e-ch");
  pl.onclick=()=>{ const w=ROUNDS[r]; if(!w) return; CH[w].forEach(m=>MFAudio.tone(m,1.1,.05,.28)); played=true; setTimeout(()=>ch.style.display="",1500); };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(!played) return;
    if(KEY[i]===ROUNDS[r]){ fb(true,"✓ "+NAME[ROUNDS[r]]+"."); r++; played=false; ch.style.display="none";
      if(r>=ROUNDS.length){ q.textContent="Excellent! Four seventh colors identified."; pl.style.display="none"; } else q.innerHTML=`Round ${r+1} of ${ROUNDS.length}: listen, then name the type.`;
    } else { MFAudio.tone(40,.2); fb(false,"Listen for the triad first (bright/dark/tense), then the 7th's color."); }
  });
  q.innerHTML="Round 1 of 4: listen, then name the type.";
}

LESSON_CONTENT[92]={
  welcome:"Five seventh chords: the four-note family. \u{1F455}",
  hook:{
    say:"<b>Same root, five different chords.</b> Each stacks a triad plus one more 3rd. \u{1F447} <b>Listen to all five. Do they share a mood?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the five chords</button></div>
          <div class="choices hk-ch" style="display:none"><button>No — five clearly different colors</button><button>Yes — identical mood</button><button>They are all triads</button></div>`;
        const ROWS=[[60,64,67,71],[60,64,67,70],[60,63,67,70],[60,63,66,70],[60,63,66,69]];
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.85,i*.95,.26))); setTimeout(()=>ch.style.display="",ROWS.length*950+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Five distinct colors from one root — major 7, dominant 7, minor 7, half-diminished 7, diminished 7. The complete seventh-chord family: today's lesson!");
          else fb(false,"Compare the first (calm) with the last (tense) — five different colors…");
        });
      } }
  },
  objectives:[
    "Build a seventh chord: triad + a 7th above the root",
    "MAJOR 7: major triad + major 7th (Cmaj7: C-E-G-B)",
    "DOMINANT 7: major triad + minor 7th (C7: C-E-G-B♭) — review",
    "MINOR 7: minor triad + minor 7th (Cm7: C-E♭-G-B♭)",
    "HALF-DIMINISHED 7 (Cm7♭5) and DIMINISHED 7 (C°7)",
    "Identify all five by formula, sight and sound"
  ],
  steps:[
    { say:"<b>The Seventh Chord:</b> add one more 3rd to a triad and you get a <b>four-note chord</b>: root, 3rd, 5th, <b>7th</b>. The triad type + the 7th type = five common combinations. \u{1F447} <b>A seventh chord contains…</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:13.5px;min-width:320px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 10px">Type</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 10px">Triad</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 10px">7th</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 10px">On C</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 10px;font-weight:800;color:#2F6DA8">Major 7</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center">major</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center">major</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px">C-E-G-B</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 10px;font-weight:800;color:#A9821F">Dominant 7</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center">major</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center">minor</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px">C-E-G-B♭</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 10px;font-weight:800;color:#C05A21">Minor 7</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center">minor</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center">minor</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px">C-E♭-G-B♭</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 10px;font-weight:800">Half-dim 7</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center">diminished</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center">minor</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px">C-E♭-G♭-B♭</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 10px;font-weight:800">Diminished 7</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center">diminished</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center">diminished</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px">C-E♭-G♭-B\u{266D}\u{266D}(A)</td></tr></table>` },
      try:{ type:"mc", choices:["Root, 3rd, 5th and 7th","Root and 5th only","Five notes"], answer:0,
        success:"✓ Four notes — a triad wearing one more 3rd.",
        fail:"Count the stack…",
        hint:"Triad + 1." } },
    { say:"<b>Major 7 (Cmaj7):</b> major triad + <b>major 7th</b> — C-E-G-<b>B</b>. Smooth, calm, jazzy warmth; the 7th sits a half step under the octave. \u{1F447} <b>Cmaj7's notes are…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:80,notes:[
        {p:"C4",d:"w",label:"Cmaj7"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"B4",d:"w",chord:true},{bar:"final"}],width:280} },
      try:{ type:"mc", choices:["C-E-G-B","C-E-G-B♭","C-E♭-G-B"], answer:0,
        success:"✓ Major triad plus the leading-tone-like B — the calm seventh.",
        fail:"Major 7th above C is…",
        hint:"A half step below the octave." } },
    { say:"<b>Dominant 7 (C7) — Review:</b> major triad + <b>minor 7th</b> — C-E-G-<b>B♭</b>. Bright but restless: the V7 of Lesson 50, now seen as a chord TYPE buildable on any root. \u{1F447} <b>What separates C7 from Cmaj7?</b>",
      try:{ type:"mc", choices:["The 7th: B♭ (minor) instead of B (major)","The root","The 5th"], answer:0,
        success:"✓ One half step in the 7th — calm becomes pull.",
        fail:"Compare the top notes…",
        hint:"B vs B♭." } },
    { say:"<b>Minor 7 (Cm7):</b> minor triad + minor 7th — C-E♭-G-B♭. Dark but relaxed — the mellow workhorse of jazz and R&B. \u{1F447} <b>Cm7 = …</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:80,notes:[
        {p:"C4",d:"w",label:"Cm7"},{p:"Eb4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true},{bar:"final"}],width:280} },
      try:{ type:"mc", choices:["Minor triad + minor 7th","Major triad + major 7th","Diminished triad + any 7th"], answer:0,
        success:"✓ m + m7 — dark triad, soft seventh.",
        fail:"Both parts are minor…",
        hint:"Double minor." } },
    { say:"<b>The Diminished Pair:</b> <b>half-diminished 7</b> (Cø7 / Cm7♭5) = diminished triad + minor 7th · <b>diminished 7</b> (C°7) = diminished triad + <b>diminished 7th</b> — all minor 3rds, maximum tension. <b>Remember: the five = maj7, dom7, m7, ø7, °7 — from calmest to tensest.</b> \u{1F447} <b>The fully diminished 7 stacks…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:80,notes:[
        {p:"C4",d:"h",label:"Cø7"},{p:"Eb4",d:"h",chord:true},{p:"Gb4",d:"h",chord:true},{p:"Bb4",d:"h",chord:true},
        {p:"C4",d:"h",label:"C°7"},{p:"Eb4",d:"h",chord:true},{p:"Gb4",d:"h",chord:true},{p:"A4",d:"h",chord:true},{bar:"final"}],width:420} },
      try:{ type:"mc", choices:["Minor 3rds only — perfectly even","Major 3rds only","Perfect 4ths"], answer:0,
        success:"✓ m3+m3+m3 — a symmetrical stack (like Lesson 82's scales, it has no gravity of its own, only tension).",
        fail:"Measure each gap in C-E♭-G♭-A…",
        hint:"All the same size." } },
    { say:"Name the seventh by ear. \u{1F447}",
      try:{ type:"custom",
        hint:"Triad color first, then the 7th.",
        mount:(container,fb)=>MF_L92_ear(container,fb) } },
    { say:"<b>Review:</b> \u{1F447} <b>Which formula builds a dominant 7th chord?</b>",
      try:{ type:"mc", choices:["Major triad + minor 7th","Major triad + major 7th","Minor triad + minor 7th"], answer:0,
        success:"✓ M + m7 — the pull chord on any root.",
        fail:"Bright triad, soft seventh…",
        hint:"C-E-G-B♭." } }
  ],
  examples:[
    { caption:"The five sevenths on one root, calmest to tensest: Cmaj7 · C7 · Cm7 · Cø7 · C°7. One note changes at a time — follow the colors.",
      staff:{clef:"treble",tempo:66,notes:[
        {p:"C4",d:"h",label:"maj7"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{p:"B4",d:"h",chord:true},
        {p:"C4",d:"h",label:"7"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{p:"Bb4",d:"h",chord:true},
        {p:"C4",d:"h",label:"m7"},{p:"Eb4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{p:"Bb4",d:"h",chord:true},
        {p:"C4",d:"h",label:"\u{00F8}7"},{p:"Eb4",d:"h",chord:true},{p:"Gb4",d:"h",chord:true},{p:"Bb4",d:"h",chord:true},
        {p:"C4",d:"h",label:"\u{00B0}7"},{p:"Eb4",d:"h",chord:true},{p:"Gb4",d:"h",chord:true},{p:"A4",d:"h",chord:true},{bar:"final"}],width:680},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"Sevenths in context: Dm7 → G7 → Cmaj7 — three of the five types chained into the smoothest progression in jazz (a preview of Lesson 95's ii-V-I).",
      staff:{clef:"treble",tempo:72,notes:[
        {p:"D4",d:"h",label:"Dm7"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"G3",d:"h",label:"G7"},{p:"B3",d:"h",chord:true},{p:"D4",d:"h",chord:true},{p:"F4",d:"h",chord:true},
        {p:"C4",d:"w",label:"Cmaj7"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"B4",d:"w",chord:true},{bar:"final"}],width:560},
      kb:{start:43,octaves:3,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Formula Sprint (45s)",
      intro:"Five formulas, five colors — race them!",
      miaIntro:"Triad + 7th! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Major 7","major triad + major 7th"],
        ["Dominant 7","major triad + minor 7th"],
        ["Minor 7","minor triad + minor 7th"],
        ["Half-diminished 7","diminished triad + minor 7th"],
        ["Diminished 7","diminished triad + diminished 7th"],
        ["Cmaj7","C-E-G-B"],
        ["C7","C-E-G-B\u{266D}"],
        ["Cm7","C-E\u{266D}-G-B\u{266D}"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — formulas fixed!":null },
    { type:"key-climb", title:"Game 2 · Build Two Sevenths",
      intro:"Play Cmaj7 bottom-up, then C7 — hear the 7th change!",
      miaIntro:"Four notes, then four again! \u{1FA9C}",
      spec:{seq:[60,64,67,71, 60,64,67,70],
        names:["C (root)","E (3rd)","G (5th)","B (major 7!)","C","E","G","B♭ (minor 7!)"],
        start:60, octaves:2, title:"Cmaj7, then C7"},
      result:(score)=>score!==null?"Two sevenths under your fingers!":null },
    { type:"symbol-hunt", title:"Game 3 · Spot the Seventh",
      intro:"Four-note chords on cards — click the type each round names!",
      miaIntro:"Check the 3rd, then the 7th! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Cmaj7 (C-E-G-B)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"B4",d:"w",chord:true}],width:150}},
        {label:"C7 (C-E-G-B♭)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true}],width:150}},
        {label:"Cm7 (C-E♭-G-B♭)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"Eb4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true}],width:150}},
        {label:"C°7 (C-E♭-G♭-A)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"Eb4",d:"w",chord:true},{p:"Gb4",d:"w",chord:true},{p:"A4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Sevenths spotted on sight!":null },
    { type:"term-race", title:"Game 4 · Color Race",
      intro:"Match each seventh to its sound color — at speed!",
      miaIntro:"Calm to tense! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Smooth, calm, jazzy","major 7"],
        ["Bright with pull (V7 type)","dominant 7"],
        ["Dark but mellow","minor 7"],
        ["Dark and unstable","half-diminished 7"],
        ["Maximum tension, symmetrical","diminished 7"],
        ["The ii chord's seventh (major key)","minor 7"],
        ["The V chord's seventh","dominant 7"],
        ["The I chord's seventh (jazz)","major 7"]]},
      result:(score)=>score>=6?"Five colors, sorted!":null }
  ],
  practiceIntro:"20 practice questions — formulas, spellings and colors. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["maj7","M triad + M7"],["dom7","M triad + m7"],["m7","m triad + m7"],["\u{00F8}7","dim + m7"],["\u{00B0}7","dim + dim7"]], reverse:true}, count:6 },
    { gen:"inversion-id", params:{subject:"v7", ask:"position"}, count:2 },
    { type:"mc", q:"A seventh chord has how many notes?", choices:["4","3","5"], answer:0,
      explain:"Root, 3rd, 5th, 7th." },
    { type:"mc", q:"Cmaj7 is spelled…", choices:["C-E-G-B","C-E-G-B♭","C-E♭-G-B♭"], answer:0,
      explain:"Major triad + major 7th." },
    { type:"mc", q:"C7 (dominant) is spelled…", choices:["C-E-G-B♭","C-E-G-B","C-E♭-G♭-B♭"], answer:0,
      explain:"Major triad + minor 7th." },
    { type:"mc", q:"Cm7 is spelled…", choices:["C-E♭-G-B♭","C-E-G-B♭","C-E♭-G♭-A"], answer:0,
      explain:"Minor triad + minor 7th." },
    { type:"truefalse", q:"The half-diminished 7 uses a diminished triad plus a MINOR 7th.", answer:true,
      explain:"ø7 = dim + m7." },
    { type:"truefalse", q:"The diminished 7 chord is built entirely of minor 3rds.", answer:true,
      explain:"m3+m3+m3 — symmetrical." },
    { type:"truefalse", q:"Cmaj7 and C7 differ in their 3rd.", answer:false,
      explain:"They differ in the 7th: B vs B♭." },
    { gen:"term-match", params:{subject:"term", pool:[["C-E-G-B","Cmaj7"],["C-E-G-B\u{266D}","C7"],["C-E\u{266D}-G-B\u{266D}","Cm7"],["C-E\u{266D}-G\u{266D}-A","C\u{00B0}7"]], reverse:true}, count:3 },
    { gen:"triad-quality", params:{}, count:2 }
  ],
  vocabulary:[
    {term:"Seventh Chord", def:"A four-note chord: triad + a 7th above the root."},
    {term:"Major 7 / Dominant 7", def:"maj7 = M triad + M7 (calm). dom7 = M triad + m7 (pull)."},
    {term:"Minor 7", def:"m triad + m7 — dark but relaxed."},
    {term:"Half-Diminished / Diminished 7", def:"ø7 = dim triad + m7. °7 = dim triad + dim 7th (all minor 3rds — symmetrical tension)."}
  ],
  mistakes:[],
  summary:[
    "✔ Seventh chord = <b>triad + 7th</b> — four notes.",
    "✔ <b>maj7</b> M+M7 · <b>dom7</b> M+m7 · <b>m7</b> m+m7 · <b>ø7</b> d+m7 · <b>°7</b> d+d7.",
    "✔ Color line: <b>calm → pull → mellow → unstable → maximum tension</b>.",
    "✔ °7 is a <b>symmetrical stack</b> of minor 3rds.",
    "✔ Diatonic homes: I→maj7 · ii→m7 · V→dom7 · vii→ø7 (major keys)."
  ],
  tips:[
    "Learn the five on C first; the formulas transfer to every root unchanged.",
    "Quick ID: 3rd tells the family (major/minor/dim); the 7th picks the member.",
    "The °7 splits the octave in four equal parts — any of its notes can act as root.",
    "Next lesson: how chord charts WRITE all of these — lead-sheet symbols."
  ],
  rewards:{ badge:"Seventh Collector", icon:"\u{1F455}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Triad type + 7th type = the five.",
  quiz:[
    { type:"mc", q:"A seventh chord adds what to a triad?", choices:["A 7th above the root","A 2nd below","Another root"], answer:0,
      explain:"Root-3rd-5th-7th.", hint:"One more 3rd on top." },
    { type:"mc", q:"Major triad + major 7th = …", choices:["major 7 chord","dominant 7","minor 7"], answer:0,
      explain:"Cmaj7: C-E-G-B.", hint:"Both parts major." },
    { type:"mc", q:"Major triad + minor 7th = …", choices:["dominant 7","major 7","half-diminished 7"], answer:0,
      explain:"C7: C-E-G-B♭ — the V7 type.", hint:"Lesson 50's chord." },
    { type:"mc", q:"Minor triad + minor 7th = …", choices:["minor 7","major 7","diminished 7"], answer:0,
      explain:"Cm7: C-E♭-G-B♭.", hint:"Double minor." },
    { type:"mc", q:"Diminished triad + minor 7th = …", choices:["half-diminished 7","diminished 7","dominant 7"], answer:0,
      explain:"Cø7 = Cm7♭5.", hint:"Half of the way down." },
    { type:"mc", q:"Diminished triad + diminished 7th = …", choices:["diminished 7","half-diminished 7","minor 7"], answer:0,
      explain:"C°7 — all minor 3rds.", hint:"Fully diminished." },
    { type:"mc", q:"Identify the chord.",
      staff:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true}],width:160},
      choices:["C7 — dominant seventh","Cmaj7","Cm7"], answer:0,
      explain:"Major triad + B♭.", hint:"Check the 7th." },
    { type:"mc", q:"Which seventh chord is a symmetrical stack of minor 3rds?", choices:["Diminished 7","Major 7","Dominant 7"], answer:0,
      explain:"m3 × 3 — evenly divided octave.", hint:"The tensest one." },
    { type:"truefalse", q:"Cmaj7 and C7 differ by one half step in the 7th.", answer:true,
      explain:"B vs B♭.", hint:"Top-note check." },
    { type:"truefalse", q:"The half-diminished 7 is also written m7♭5.", answer:true,
      explain:"Same chord, two names.", hint:"Lesson 93 preview." },
    { type:"mc", q:"Which seventh naturally sits on V in a major key?", choices:["Dominant 7","Major 7","Diminished 7"], answer:0,
      explain:"G7 in C major — the built-in pull.", hint:"Lesson 50." },
    { type:"mc", q:"Order the five from calmest to tensest:", choices:["maj7 → dom7 → m7 → ø7 → °7","°7 → maj7 → m7","all equal"], answer:0,
      explain:"The tension ladder.", hint:"Calm first." }
  ],
  miaPerfect:"PERFECT! Five formulas, five colors, zero confusion. \u{1F455}\u{1F389}",
  miaPass:"Passed! The four-note family is yours. Next: writing them on lead sheets…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Five chords, one root: maj7 (calm), dom7 (pull), m7 (mellow), ø7 (unstable), °7 (max tension).",
      play:()=>{const ROWS=[[60,64,67,71],[60,64,67,70],[60,63,67,70],[60,63,66,70],[60,63,66,69]];ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.9,.26)));} },
    learn:{ label:"the five sevenths",
      explain:"Triad + 7th: maj7 (M+M7), dom7 (M+m7), m7 (m+m7), ø7 (d+m7), °7 (d+d7). ID: 3rd first, 7th second.",
      hint:"Two ingredients per chord.",
      play:()=>{[60,64,67,71].forEach(m=>MFAudio.tone(m,.9,.05,.28));} },
    example:{ label:"the examples",
      explain:"Example 1 morphs one note at a time through all five; example 2 chains Dm7-G7-Cmaj7 — three types in one phrase." },
    game:{ label:"the games",
      explain:"Sprint the formulas, build two sevenths by hand, spot chords on cards, then match colors.",
      hint:"3rd = family, 7th = member." },
    quiz:{ label:"this question",
      explain:"Break every seventh into two questions: what is the TRIAD (M/m/dim)? What is the 7TH (M/m/dim)? The pair names the chord.",
      play:()=>{[60,63,67,70].forEach(m=>MFAudio.tone(m,.9,.05,.28));} }
  }
};
