/* Lesson 95 — Common Chord Progressions (Book 4, Unit 23 — SELF-AUTHORED)
   Core: ii-V-I (jazz's engine) · circle progression (roots falling in 5ths)
   · I-V-vi-IV / I-vi-IV-V (pop loops) · 12-bar blues (review step) ·
   HARMONIC RHYTHM (how fast chords change).
   NOTE: edit by FULL-FILE REWRITE only. */

/* progression ear lab */
function MF_L95_ear(container,fb){
  const P={
    twofive:[[62,65,69,72],[55,59,62,65],[60,64,67,71]],
    pop:[[60,64,67],[67,71,74],[69,72,76],[65,69,72]],
    circle:[[57,60,64],[62,65,69],[67,71,74],[60,64,67]]};
  const NAME={twofive:"ii-V-I — the jazz close", pop:"I-V-vi-IV — the pop loop", circle:"vi-ii-V-I — the circle"};
  const ROUNDS=["pop","twofive","circle"];
  const KEY=["twofive","pop","circle"];
  let r=0, played=false;
  container.innerHTML=`<div class="big-q l95e-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l95e-play">▶ Hear the progression</button></div>
    <div class="choices l95e-ch" style="display:none"><button>ii-V-I</button><button>I-V-vi-IV</button><button>vi-ii-V-I (circle)</button></div>`;
  const q=container.querySelector(".l95e-q"), pl=container.querySelector(".l95e-play"), ch=container.querySelector(".l95e-ch");
  pl.onclick=()=>{ const w=ROUNDS[r]; if(!w) return; P[w].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.85,i*.9,.27))); played=true; setTimeout(()=>ch.style.display="",P[w].length*900+300); };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(!played) return;
    if(KEY[i]===ROUNDS[r]){ fb(true,"✓ "+NAME[ROUNDS[r]]+"."); r++; played=false; ch.style.display="none";
      if(r>=ROUNDS.length){ q.textContent="Excellent! Three famous progressions identified."; pl.style.display="none"; } else q.innerHTML=`Round ${r+1} of ${ROUNDS.length}: listen, then name it.`;
    } else { MFAudio.tone(40,.2); fb(false,"Count the chords (3 or 4?) and track the bass — does it fall in 5ths?"); }
  });
  q.innerHTML="Round 1 of 3: listen, then name it.";
}

LESSON_CONTENT[95]={
  welcome:"The progressions everyone plays. \u{1F501}",
  hook:{
    say:"<b>Thousands of songs share a handful of chord loops.</b> Here is the most famous four-chord loop of all. \u{1F447} <b>Listen — how many different chords cycle?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the loop (twice)</button></div>
          <div class="choices hk-ch" style="display:none"><button>Four — I, V, vi, IV, looping</button><button>Twelve</button><button>One</button></div>`;
        const ROWS=[[60,64,67],[67,71,74],[69,72,76],[65,69,72]];
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ for(let k=0;k<2;k++) ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.75,(k*4+i)*.8,.26))); setTimeout(()=>ch.style.display="",8*800+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Four chords — I-V-vi-IV — cycling endlessly. A few such loops power enormous stretches of popular music. Today: the famous progressions and how fast chords change!");
          else fb(false,"Track the bass: C… G… A… F… then around again — count them…");
        });
      } }
  },
  objectives:[
    "Play and recognize ii-V-I — the jazz cadential engine",
    "Follow the CIRCLE progression: roots falling in 5ths",
    "Know the pop loops: I-V-vi-IV and I-vi-IV-V",
    "Review the 12-bar blues as a progression",
    "Define HARMONIC RHYTHM: the rate of chord change",
    "Identify progressions by ear"
  ],
  steps:[
    { say:"<b>ii–V–I:</b> jazz's essential close — <b>predominant → dominant → tonic</b> in three chords, usually as sevenths: Dm7 → G7 → Cmaj7. Lesson 86's function flow, distilled. \u{1F447} <b>ii-V-I walks which function path?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:72,notes:[
        {p:"D4",d:"h",label:"ii7"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"G3",d:"h",label:"V7"},{p:"B3",d:"h",chord:true},{p:"D4",d:"h",chord:true},{p:"F4",d:"h",chord:true},
        {p:"C4",d:"w",label:"Imaj7"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"B4",d:"w",chord:true},{bar:"final"}],width:520} },
      try:{ type:"mc", choices:["PD → D → T","T → T → T","D → PD → T"], answer:0,
        success:"✓ Predominant, dominant, tonic — the flow in miniature.",
        fail:"Map each numeral to its function…",
        hint:"Lesson 86's colors." } },
    { say:"<b>The Circle Progression:</b> roots <b>falling in 5ths</b>: vi → ii → V → I (A-D-G-C in C major). Each root acts as the dominant of the next root. \u{1F447} <b>In the circle progression, each root falls by a…</b>",
      try:{ type:"mc", choices:["5th","2nd","3rd"], answer:0,
        success:"✓ Falling 5ths: A→D→G→C — the strongest root motion in tonal music.",
        fail:"A down to D is a…",
        hint:"The circle of 5ths, in motion." } },
    { say:"<b>The Pop Loops:</b> <b>I-V-vi-IV</b> (the modern four-chord loop) and its older cousin <b>I-vi-IV-V</b> (the 1950s progression). Both loop endlessly under verse after verse. \u{1F447} <b>In C major, I-V-vi-IV spells…</b>",
      try:{ type:"mc", choices:["C - G - Am - F","C - F - G - C","C - Dm - Em - F"], answer:0,
        success:"✓ C-G-Am-F — learn it once, hear it everywhere.",
        fail:"Translate each numeral in C…",
        hint:"Degrees 1, 5, 6, 4." } },
    { say:"<b>12-Bar Blues — Review:</b> I×4 · IV×2 · I×2 · V·IV · I×2 (Lesson 70) — a PROGRESSION with a fixed length and bar map, unlike the endless loops. \u{1F447} <b>What makes the 12-bar blues different from a pop loop?</b>",
      try:{ type:"mc", choices:["It has a fixed 12-bar length and bar-by-bar map","It never uses I","It has no chords"], answer:0,
        success:"✓ A complete 12-bar cycle with assigned bars — a form-sized progression.",
        fail:"Loops float; the blues counts its bars…",
        hint:"Twelve, exactly." } },
    { say:"<b>Harmonic Rhythm:</b> the <b>rate at which chords change</b> — one chord per measure (slow), per beat (fast), or mixed. Same progression, different harmonic rhythm = different energy. <b>Remember: ii-V-I closes · circle falls in 5ths · loops cycle · harmonic rhythm = chord-change speed.</b> \u{1F447} <b>A song changes chords every beat instead of every measure. Its harmonic rhythm is…</b>",
      try:{ type:"mc", choices:["Faster","Slower","Unchanged"], answer:0,
        success:"✓ More changes per measure = faster harmonic rhythm — more drive.",
        fail:"Count changes per measure…",
        hint:"Rate of change." } },
    { say:"Name the progression by ear. \u{1F447}",
      try:{ type:"custom",
        hint:"3 chords closing = ii-V-I; 4-chord cycle = the loop; falling-5th bass = circle.",
        mount:(container,fb)=>MF_L95_ear(container,fb) } },
    { say:"<b>Review:</b> \u{1F447} <b>Dm7 → G7 → Cmaj7 is…</b>",
      try:{ type:"mc", choices:["ii-V-I in C major","I-V-vi-IV","a 12-bar blues"], answer:0,
        success:"✓ The jazz close, spelled in C.",
        fail:"Count the degrees: D=2, G=5, C=1…",
        hint:"Three chords, one landing." } }
  ],
  examples:[
    { caption:"The circle in action: vi-ii-V-I with roots falling in 5ths (A-D-G-C). Gravity does the work.",
      staff:{clef:"treble",tempo:76,notes:[
        {p:"A3",d:"h",label:"vi"},{p:"C4",d:"h",chord:true},{p:"E4",d:"h",chord:true},
        {p:"D4",d:"h",label:"ii"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"G3",d:"h",label:"V"},{p:"B3",d:"h",chord:true},{p:"D4",d:"h",chord:true},
        {p:"C4",d:"w",label:"I"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:560},
      kb:{start:45,octaves:3,labels:true} },
    { caption:"Harmonic rhythm demonstrated: first I and IV at one chord per measure, then the full I-IV-V-I at two chords per measure — feel the energy double.",
      staff:{clef:"treble",tempo:84,notes:[
        {p:"C4",d:"w",label:"1 per bar"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"single"},
        {p:"F4",d:"w"},{p:"A4",d:"w",chord:true},{p:"C5",d:"w",chord:true},{bar:"single"},
        {p:"C4",d:"h",label:"2 per bar"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"F4",d:"h"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},{bar:"single"},
        {p:"G4",d:"h"},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},
        {p:"C4",d:"h"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{bar:"final"}],width:680},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Progression Sprint (45s)",
      intro:"Loops, circles and closes — race them!",
      miaIntro:"Name the pattern! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["ii-V-I","the jazz close (PD-D-T)"],
        ["Circle progression","roots falling in 5ths"],
        ["I-V-vi-IV","the modern pop loop"],
        ["I-vi-IV-V","the 1950s progression"],
        ["12-bar blues","fixed 12-measure map"],
        ["Harmonic rhythm","the rate of chord change"],
        ["ii-V-I in C","Dm7 - G7 - Cmaj7"],
        ["I-V-vi-IV in C","C - G - Am - F"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — progressions catalogued!":null },
    { type:"key-climb", title:"Game 2 · Walk the Circle Bass",
      intro:"Play the falling-5th roots: A, D, G, C!",
      miaIntro:"Gravity in 5ths! \u{1FA9C}",
      spec:{seq:[57,50,55,48],
        names:["A (vi)","D (ii — down a 5th)","G (V — down a 5th)","C (I — home)"],
        start:45, octaves:2, title:"The circle's bass line"},
      result:(score)=>score!==null?"The circle, walked!":null },
    { type:"order-tap", title:"Game 3 · Assemble ii-V-I",
      intro:"Tap the jazz close in functional order!",
      miaIntro:"PD, D, T! \u{1F3C1}",
      spec:{sequence:["ii7 — predominant (Dm7)","V7 — dominant (G7)","Imaj7 — tonic (Cmaj7)"],
        title:"The three-chord close"},
      result:(stars)=>stars>=2?"The close, assembled!":null },
    { type:"term-race", title:"Game 4 · Translate the Loop",
      intro:"Numerals into letters across keys — at speed!",
      miaIntro:"Loops in every key! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["I-V-vi-IV in C","C-G-Am-F"],
        ["I-V-vi-IV in G","G-D-Em-C"],
        ["ii-V-I in C","Dm-G-C"],
        ["ii-V-I in F","Gm-C-F"],
        ["I-vi-IV-V in C","C-Am-F-G"],
        ["vi-ii-V-I in C","Am-Dm-G-C"],
        ["One chord per measure","slow harmonic rhythm"],
        ["Chords every beat","fast harmonic rhythm"]]},
      result:(score)=>score>=6?"Loops translated everywhere!":null }
  ],
  practiceIntro:"20 practice questions — loops, circles, closes and harmonic rhythm. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["ii-V-I","jazz close"],["Circle","falling 5ths"],["I-V-vi-IV","pop loop"],["I-vi-IV-V","1950s"],["Harmonic rhythm","chord-change rate"]], reverse:true}, count:6 },
    { gen:"triad-id", params:{ask:"numeral"}, count:3 },
    { type:"mc", q:"ii-V-I in C major uses the chords…", choices:["Dm(7) - G(7) - C(maj7)","C - F - G","Am - F - C"], answer:0,
      explain:"Degrees 2, 5, 1." },
    { type:"mc", q:"The circle progression's roots move by…", choices:["falling 5ths","rising 2nds","random leaps"], answer:0,
      explain:"vi→ii→V→I: A-D-G-C." },
    { type:"mc", q:"I-V-vi-IV in G major is…", choices:["G - D - Em - C","G - C - D - G","G - Am - B - C"], answer:0,
      explain:"Degrees 1, 5, 6, 4 of G." },
    { type:"mc", q:"Harmonic rhythm measures…", choices:["how often the chords change","how loud the chords are","the melody's speed"], answer:0,
      explain:"Chord changes per unit of time." },
    { type:"truefalse", q:"The 12-bar blues has a fixed number of measures.", answer:true,
      explain:"Twelve, with a bar map." },
    { type:"truefalse", q:"ii-V-I follows the function path PD → D → T.", answer:true,
      explain:"Lesson 86's flow, condensed." },
    { type:"truefalse", q:"Changing chords more often slows the harmonic rhythm.", answer:false,
      explain:"More changes = FASTER harmonic rhythm." },
    { gen:"term-match", params:{subject:"term", pool:[["Dm7-G7-Cmaj7","ii-V-I"],["C-G-Am-F","I-V-vi-IV"],["A-D-G-C roots","circle"],["I×4 IV×2 I×2 V IV I×2","12-bar blues"]], reverse:true}, count:3 },
    { gen:"inversion-id", params:{subject:"v7", ask:"position"}, count:2 }
  ],
  vocabulary:[
    {term:"ii-V-I", def:"Predominant-dominant-tonic in three chords — jazz's essential close, usually played as sevenths."},
    {term:"Circle Progression", def:"Roots falling in 5ths (vi-ii-V-I) — the strongest root motion in tonal music."},
    {term:"Pop Loops", def:"I-V-vi-IV (modern) and I-vi-IV-V (1950s) — four-chord cycles under countless songs."},
    {term:"Harmonic Rhythm", def:"The rate at which chords change — per measure, per beat, or mixed."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>ii-V-I</b> = PD→D→T — the jazz close (Dm7-G7-Cmaj7).",
    "✔ <b>Circle</b>: roots fall in 5ths — vi-ii-V-I.",
    "✔ Loops: <b>I-V-vi-IV</b> and <b>I-vi-IV-V</b> cycle endlessly.",
    "✔ <b>12-bar blues</b>: the fixed-length progression (review).",
    "✔ <b>Harmonic rhythm</b> = chord-change speed; faster = more drive."
  ],
  tips:[
    "Learn ii-V-I in three keys this week — jazz tunes are chains of them.",
    "Hearing a song? Track the bass first: falling 5ths = circle family; a 4-note cycle = loop family.",
    "Composers control energy with harmonic rhythm: verses change slowly, choruses often double the rate.",
    "Unit 23 complete! Next unit: notes that do not belong — and how harmony handles them."
  ],
  rewards:{ badge:"Progression Pilot", icon:"\u{1F501}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Loops cycle, circles fall, ii-V-I lands.",
  quiz:[
    { type:"mc", q:"ii-V-I is prized because it…", choices:["walks PD → D → T in three chords","avoids the tonic","uses no dominants"], answer:0,
      explain:"The function flow, distilled.", hint:"Three functions, three chords." },
    { type:"mc", q:"In C major, ii-V-I as sevenths is…", choices:["Dm7 - G7 - Cmaj7","Cm7 - F7 - B♭maj7","Em7 - A7 - Dmaj7"], answer:0,
      explain:"Degrees 2-5-1 of C.", hint:"Start on D." },
    { type:"mc", q:"The circle progression moves its roots by…", choices:["descending 5ths","ascending 2nds","tritones"], answer:0,
      explain:"A→D→G→C.", hint:"The strongest motion." },
    { type:"mc", q:"I-V-vi-IV in C major is…", choices:["C - G - Am - F","C - Am - F - G","C - F - Am - G"], answer:0,
      explain:"The modern loop.", hint:"5 then 6 then 4." },
    { type:"mc", q:"I-vi-IV-V in C major is…", choices:["C - Am - F - G","C - G - Am - F","C - Dm - G - C"], answer:0,
      explain:"The 1950s progression.", hint:"6 comes second." },
    { type:"mc", q:"Which progression has a FIXED length?", choices:["The 12-bar blues","I-V-vi-IV","ii-V-I"], answer:0,
      explain:"Twelve bars, mapped.", hint:"Lesson 70." },
    { type:"mc", q:"Harmonic rhythm describes…", choices:["how often chords change","the drum pattern","the melody's contour"], answer:0,
      explain:"Rate of harmonic change.", hint:"Chords per measure." },
    { type:"mc", q:"A verse changes chords each measure; the chorus changes twice per measure. The chorus's harmonic rhythm is…", choices:["faster","slower","identical"], answer:0,
      explain:"Double the changes, double the drive.", hint:"Count per bar." },
    { type:"mc", q:"Identify: Am - Dm - G - C.", choices:["vi-ii-V-I — a circle progression","I-V-vi-IV","a 12-bar blues"], answer:0,
      explain:"Roots fall A→D→G→C in 5ths.", hint:"Follow the bass." },
    { type:"truefalse", q:"ii-V-I usually appears with seventh chords in jazz.", answer:true,
      explain:"Dm7-G7-Cmaj7 — three seventh types chained.", hint:"Lesson 92's example." },
    { type:"truefalse", q:"I-V-vi-IV and I-vi-IV-V contain the same four chords.", answer:true,
      explain:"Same chords, different order — different eras.", hint:"Compare the sets." },
    { type:"mc", q:"Why does the circle progression feel inevitable?", choices:["Each root motion is a falling 5th — harmony's strongest pull","It is always loud","It avoids the tonic"], answer:0,
      explain:"Dominant-style motion, chord after chord.", hint:"V→I, repeated." }
  ],
  miaPerfect:"PERFECT! Every loop, circle and close in your pocket. \u{1F501}\u{1F389}",
  miaPass:"Passed — and UNIT 23 is COMPLETE! Sevenths built, written, inverted, chained. \u{1F389}",
  mia:{
    hook:{ label:"the welcome",
      explain:"Four chords cycling — I-V-vi-IV, the modern pop loop.",
      play:()=>{const ROWS=[[60,64,67],[67,71,74],[69,72,76],[65,69,72]];ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.75,i*.8,.26)));} },
    learn:{ label:"common progressions",
      explain:"ii-V-I (PD-D-T), circle (falling 5ths), pop loops (I-V-vi-IV, I-vi-IV-V), 12-bar blues (fixed map), harmonic rhythm (change rate).",
      hint:"Track the bass.",
      play:()=>{[[62,65,69,72],[55,59,62,65],[60,64,67,71]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.85,.27)));} },
    example:{ label:"the examples",
      explain:"Example 1 rides the circle's falling 5ths; example 2 doubles the harmonic rhythm mid-passage — hear the energy shift." },
    game:{ label:"the games",
      explain:"Sprint the patterns, walk the circle bass, assemble ii-V-I, then translate loops across keys.",
      hint:"Bass first, always." },
    quiz:{ label:"this question",
      explain:"Identify progressions by bass motion: falling 5ths = circle family; a repeating 4-chord cycle = loop; PD-D-T in three = ii-V-I.",
      play:()=>{[[57,60,64],[62,65,69],[67,71,74],[60,64,67]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.75,i*.8,.26)));} }
  }
};
