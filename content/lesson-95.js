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
  const NAME={twofive:"ii-V-I", pop:"I-V-vi-IV", circle:"vi-ii-V-I — descending-fifths roots"};
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
    } else { MFAudio.tone(40,.2); fb(false,"Identify the chord roots, then compare with ii-V-I, I-V-vi-IV, or descending-fifths root motion."); }
  });
  q.innerHTML="Round 1 of 3: listen, then name it.";
}

LESSON_CONTENT[95]={stackFigures:true,
  welcome:"Recognize and perform several common chord progressions.",
  hook:{
    say:"<b>Many songs use recurring chord patterns.</b> Listen to this four-chord loop. \u{1F447} <b>How many different chords occur before the pattern repeats?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the loop (twice)</button></div>
          <div class="choices hk-ch" style="display:none"><button>Four — I, V, vi, and IV</button><button>Three — I, V, and IV</button><button>Five — I, ii, IV, V, and vi</button></div>`;
        const ROWS=[[60,64,67],[67,71,74],[69,72,76],[65,69,72]];
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ for(let k=0;k<2;k++) ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.75,(k*4+i)*.8,.26))); setTimeout(()=>ch.style.display="",8*800+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Correct. The loop contains four chords — I-V-vi-IV — and then repeats. This progression appears in many popular-music contexts.");
          else fb(false,"Identify the chord roots C, G, A, and F before the progression repeats.");
        });
      } }
  },
  objectives:[
    "Play and recognize ii-V-I — the predominant-dominant-tonic progression",
    "Follow the descending-fifths progression: vi-ii-V-I",
    "Know the four-chord loops: I-V-vi-IV and I-vi-IV-V",
    "Review the 12-bar blues as a progression",
    "Define HARMONIC RHYTHM: the rate of chord change",
    "Identify progressions by ear"
  ],
  steps:[
    { say:"<b>The ii–V–I Progression:</b> The progression ii–V–I follows a common <b>predominant–dominant–tonic</b> pattern. In jazz and related styles, the chords frequently appear as seventh chords. In C major, ii⁷-V⁷-Imaj7 is Dm7-G7-Cmaj7. \u{1F447} <b>Which functional pattern does ii–V–I represent?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:72,notes:[
        {p:"D4",d:"w",label:"ii7"},{p:"F4",d:"w",chord:true},{p:"A4",d:"w",chord:true},{p:"C5",d:"w",chord:true},
        {p:"G3",d:"w",label:"V7"},{p:"B3",d:"w",chord:true},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true},
        {p:"C4",d:"w",label:"Imaj7"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"B4",d:"w",chord:true},{bar:"final"}],width:520} },
      try:{ type:"mc", choices:["Predominant → dominant → tonic","Tonic → tonic → tonic","Dominant → predominant → tonic"], answer:0,
        success:"✓ Correct. ii commonly serves predominant function, V serves dominant function, and I serves tonic function.",
        fail:"Identify the common function of ii, V, and I.",
        hint:"ii prepares V, and V resolves to I." } },
    { say:"<b>The Descending-Fifths Progression:</b> In vi–ii–V–I, each chord root moves <b>down a fifth — or equivalently up a fourth</b> — to the next root. In C major, the roots are A-D-G-C. This root pattern follows part of the circle of fifths. \u{1F447} <b>In vi–ii–V–I, how does each chord root move to the next?</b>",
      try:{ type:"mc", choices:["Down a fifth, or equivalently up a fourth","Down a second","Up a third"], answer:0,
        success:"✓ Correct. The roots A-D-G-C form a sequence of descending fifths, or ascending fourths.",
        fail:"Measure the descending interval from A to D.",
        hint:"Follow the circle-of-fifths relationship among the roots." } },
    { say:"<b>Common Four-Chord Loops:</b> <b>I-V-vi-IV</b> and <b>I-vi-IV-V</b> are two recurring progressions found in many popular styles. They use the same four diatonic chords in different orders. Either progression may repeat as a loop or appear as part of a larger harmonic design. \u{1F447} <b>Which chord symbols realize I–V–vi–IV in C major?</b>",
      try:{ type:"mc", choices:["C - G - Am - F","C - F - G - C","C - Dm - Em - F"], answer:0,
        success:"✓ Correct. In C major, I is C, V is G, vi is A minor, and IV is F.",
        fail:"Match scale degrees 1, 5, 6, and 4 with their diatonic triads in C major.",
        hint:"I = C, V = G, vi = Am, and IV = F." } },
    { say:"<b>Twelve-Bar Blues — Review:</b> Twelve-bar blues is organized as a repeating twelve-measure cycle. One basic version is: <b>measures 1–4: I · measures 5–6: IV · measures 7–8: I · measure 9: V · measure 10: IV · measures 11–12: I</b>. Many blues performances use substitutions, quick changes, seventh chords, and a turnaround in measure 12. \u{1F447} <b>What distinguishes twelve-bar blues from the four-chord loops introduced in this lesson?</b>",
      try:{ type:"mc", choices:["It is conventionally organized as a twelve-measure cycle with recognizable harmonic locations","It never includes the tonic chord","It contains no chord progression"], answer:0,
        success:"✓ Correct. Twelve-bar blues combines a recurring harmonic progression with a conventional twelve-measure formal cycle.",
        fail:"Identify the conventional number of measures in each blues cycle.",
        hint:"The form contains twelve measures per cycle." } },
    { say:"<b>Harmonic Rhythm:</b> Harmonic rhythm is the <b>rate at which harmonies change</b>. A passage may sustain one chord for several measures, change once per measure, change several times within a measure, or use an irregular pattern. The same progression can produce a different sense of motion when its harmonic rhythm changes. <b>Remember: ii-V-I = common predominant–dominant–tonic progression · vi-ii-V-I = descending-fifths root motion · four-chord loops = recurring chord order · harmonic rhythm = rate of harmonic change.</b> \u{1F447} <b>A passage changes chords on every beat rather than once per measure. How has its harmonic rhythm changed?</b>",
      try:{ type:"mc", choices:["It has become faster","It has become slower","It has remained unchanged"], answer:0,
        success:"✓ Correct. More frequent harmonic changes create a faster harmonic rhythm. The expressive effect depends on the complete musical context.",
        fail:"Compare the number of harmonic changes within each measure.",
        hint:"Harmonic rhythm measures the rate of chord changes." } },
    { say:"Listen to each progression and identify its chord roots and qualities before naming the pattern. \u{1F447}",
      try:{ type:"custom",
        hint:"Identify the key and chord roots. Listen for ii-V-I, I-V-vi-IV, or a sequence of descending-fifths roots.",
        mount:(container,fb)=>MF_L95_ear(container,fb) } },
    { say:"<b>Review:</b> \u{1F447} <b>In C major, how is Dm7–G7–Cmaj7 analyzed?</b>",
      try:{ type:"mc", choices:["ii⁷-V⁷-Imaj7","I-V-vi-IV","Twelve-bar blues"], answer:0,
        success:"✓ Correct. Dm7 is ii⁷, G7 is V⁷, and Cmaj7 is the tonic major-seventh chord in C major.",
        fail:"Identify each chord root's scale degree in C major.",
        hint:"The roots are scale degrees 2, 5, and 1." } }
  ],
  examples:[
    { caption:"Descending fifths in action: vi-ii-V-I with roots falling in 5ths, or rising in 4ths (A-D-G-C).",
      staff:{clef:"treble",tempo:76,notes:[
        {p:"A3",d:"w",label:"vi"},{p:"C4",d:"w",chord:true},{p:"E4",d:"w",chord:true},
        {p:"D4",d:"w",label:"ii"},{p:"F4",d:"w",chord:true},{p:"A4",d:"w",chord:true},
        {p:"G3",d:"w",label:"V"},{p:"B3",d:"w",chord:true},{p:"D4",d:"w",chord:true},
        {p:"C4",d:"w",label:"I"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:560},
      kb:{start:45,octaves:3,labels:true} },
    { caption:"Harmonic rhythm demonstrated: first I and IV at one chord per measure, then the full I-IV-V-I at two chords per measure — the rate of harmonic change doubles.",
      staff:{clef:"treble",tempo:84,notes:[
        {p:"C4",d:"w",label:"1 per bar"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"single"},
        {p:"F4",d:"w"},{p:"A4",d:"w",chord:true},{p:"C5",d:"w",chord:true},{bar:"single"},
        {p:"C4",d:"w",label:"2 per bar"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},
        {p:"F4",d:"w"},{p:"A4",d:"w",chord:true},{p:"C5",d:"w",chord:true},{bar:"single"},
        {p:"G4",d:"w"},{p:"B4",d:"w",chord:true},{p:"D5",d:"w",chord:true},
        {p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:680},
      kb:{start:60,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Progression Identification (45s)",
      intro:"Identify common progressions from their Roman numerals and chord symbols.",
      miaIntro:"Identify the key, roots, and chord order.",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["ii-V-I","the PD-D-T progression"],
        ["Descending-fifths progression","roots falling in 5ths"],
        ["I-V-vi-IV","a common four-chord loop"],
        ["I-vi-IV-V","often called the doo-wop loop"],
        ["12-bar blues","conventional 12-measure cycle"],
        ["Harmonic rhythm","the rate of chord change"],
        ["ii-V-I in C","Dm7 - G7 - Cmaj7"],
        ["I-V-vi-IV in C","C - G - Am - F"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — Progression-identification challenge completed!":null },
    { type:"key-climb", title:"Game 2 · Perform Descending-Fifths Roots",
      intro:"Play the roots A-D-G-C, moving each root down a fifth or up a fourth to remain within a practical register.",
      miaIntro:"Follow the circle-of-fifths root pattern.",
      spec:{seq:[57,50,55,48],
        names:["A (vi)","D (ii — down a 5th)","G (V — up a 4th)","C (I — down a 5th)"],
        start:45, octaves:2, title:"The descending-fifths roots"},
      result:(score)=>score!==null?"You performed the descending-fifths root sequence.":null },
    { type:"order-tap", title:"Game 3 · Assemble ii-V-I",
      intro:"Arrange ii-V-I in its common functional order.",
      miaIntro:"Predominant → dominant → tonic.",
      spec:{sequence:["ii7 — predominant (Dm7)","V7 — dominant (G7)","Imaj7 — tonic (Cmaj7)"],
        title:"The three-chord close"},
      result:(stars)=>stars>=2?"You assembled the ii-V-I progression.":null },
    { type:"term-race", title:"Game 4 · Translate the Loop",
      intro:"Translate I-V-vi-IV into chord symbols in several major keys.",
      miaIntro:"Match each numeral with its diatonic triad.",
      spec:{rounds:8, reverse:true, pool:[
        ["I-V-vi-IV in C","C-G-Am-F"],
        ["I-V-vi-IV in G","G-D-Em-C"],
        ["ii-V-I in C","Dm-G-C"],
        ["ii-V-I in F","Gm-C-F"],
        ["I-vi-IV-V in C","C-Am-F-G"],
        ["vi-ii-V-I in C","Am-Dm-G-C"],
        ["One chord per measure","slow harmonic rhythm"],
        ["Chords every beat","fast harmonic rhythm"]]},
      result:(score)=>score>=6?"You translated the progression correctly.":null }
  ],
  practiceIntro:"Complete 20 practice questions on ii-V-I, descending-fifths progressions, four-chord loops, twelve-bar blues, and harmonic rhythm.",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["ii-V-I","PD-D-T close"],["Descending fifths","falling-5th roots"],["I-V-vi-IV","C-G-Am-F in C"],["I-vi-IV-V","C-Am-F-G in C"],["Harmonic rhythm","chord-change rate"]], reverse:true}, count:6 },
    { gen:"triad-id", params:{ask:"numeral"}, count:3 },
    { type:"mc", q:"Which seventh chords form ii-V-I in C major?", choices:["Dm7 - G7 - Cmaj7","C - F - G","Am - F - C"], answer:0,
      explain:"Degrees 2, 5, 1." },
    { type:"mc", q:"In vi-ii-V-I, the chord roots move by…", choices:["descending fifths or ascending fourths","ascending seconds","random intervals"], answer:0,
      explain:"vi→ii→V→I: A-D-G-C." },
    { type:"mc", q:"How is I-V-vi-IV realized in G major?", choices:["G - D - Em - C","G - C - D - G","G - Am - B - C"], answer:0,
      explain:"Degrees 1, 5, 6, 4 of G." },
    { type:"mc", q:"Harmonic rhythm describes…", choices:["the rate of harmonic change","the dynamic level of the chords","the speed of the melody"], answer:0,
      explain:"Chord changes per unit of time." },
    { type:"truefalse", q:"A standard twelve-bar blues cycle contains twelve measures.", answer:true,
      explain:"The harmonic details may vary, but the conventional cycle contains twelve measures." },
    { type:"truefalse", q:"ii-V-I commonly follows the functional path PD → D → T.", answer:true,
      explain:"Lesson 86's flow, condensed." },
    { type:"truefalse", q:"Changing chords more frequently creates a faster harmonic rhythm.", answer:true,
      explain:"More changes = FASTER harmonic rhythm." },
    { gen:"term-match", params:{subject:"term", pool:[["Dm7-G7-Cmaj7","ii-V-I"],["C-G-Am-F","I-V-vi-IV"],["A-D-G-C roots","descending fifths"],["I×4 IV×2 I×2 V IV I×2","12-bar blues"]], reverse:true}, count:3 },
    { gen:"inversion-id", params:{subject:"v7", ask:"position"}, count:2 }
  ],
  vocabulary:[
    {term:"ii-V-I", def:"A common predominant-dominant-tonic progression; in jazz and related styles it frequently appears as seventh chords."},
    {term:"Descending-Fifths Progression", def:"Roots moving down a fifth — or up a fourth — as in vi-ii-V-I; the root pattern follows part of the circle of fifths."},
    {term:"Four-Chord Loops", def:"I-V-vi-IV and I-vi-IV-V — recurring progressions in many popular styles, using the same four chords in different orders."},
    {term:"Harmonic Rhythm", def:"The rate at which harmonies change — per measure, per beat, or in irregular patterns."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>ii-V-I</b> = PD→D→T — frequently as sevenths (Dm7-G7-Cmaj7).",
    "✔ <b>Descending fifths</b>: roots fall in 5ths, or rise in 4ths — vi-ii-V-I.",
    "✔ Loops: <b>I-V-vi-IV</b> and <b>I-vi-IV-V</b> — the same four chords in different orders.",
    "✔ <b>12-bar blues</b>: a conventional twelve-measure cycle (review).",
    "✔ <b>Harmonic rhythm</b> = the rate of harmonic change."
  ],
  tips:[
    "Learn ii-V-I in three keys this week — jazz tunes are chains of them.",
    "Hearing a song? Identify the chord roots: descending-fifths root motion suggests vi-ii-V-I; a repeating four-chord order suggests a loop.",
    "Composers vary harmonic rhythm: verses often change chords slowly, while choruses may change more frequently.",
    "Unit 23 complete! Next unit: notes that do not belong — and how harmony handles them."
  ],
  rewards:{ badge:"Progression Pilot", icon:"\u{1F501}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz: Identify common chord orders, root motion, and rates of harmonic change.",
  quiz:[
    { type:"mc", q:"Which functional pattern does ii-V-I commonly express?", choices:["Predominant → dominant → tonic","Tonic → tonic → tonic","Dominant → tonic → predominant"], answer:0,
      explain:"The function flow, distilled.", hint:"Three functions, three chords." },
    { type:"mc", q:"Which seventh chords form ii-V-I in C major?", choices:["Dm7 - G7 - Cmaj7","Cm7 - F7 - B♭maj7","Em7 - A7 - Dmaj7"], answer:0,
      explain:"Degrees 2-5-1 of C.", hint:"Start on D." },
    { type:"mc", q:"In a descending-fifths progression, each root moves…", choices:["down a fifth or up a fourth","up a second","by a tritone"], answer:0,
      explain:"A→D→G→C.", hint:"The roots follow a segment of the circle of fifths." },
    { type:"mc", q:"I-V-vi-IV in C major is…", choices:["C - G - Am - F","C - Am - F - G","C - F - Am - G"], answer:0,
      explain:"C, G, Am, F — degrees 1, 5, 6, 4.", hint:"5 then 6 then 4." },
    { type:"mc", q:"I-vi-IV-V in C major is…", choices:["C - Am - F - G","C - G - Am - F","C - Dm - G - C"], answer:0,
      explain:"C, Am, F, G — degrees 1, 6, 4, 5.", hint:"6 comes second." },
    { type:"mc", q:"Which progression is conventionally organized as a twelve-measure formal cycle?", choices:["Twelve-bar blues","I-V-vi-IV","ii-V-I"], answer:0,
      explain:"Twelve-bar blues uses a conventional twelve-measure framework, although its chord details may vary.", hint:"Lesson 70." },
    { type:"mc", q:"Harmonic rhythm describes…", choices:["the rate at which harmonies change","the drum pattern","the melodic contour"], answer:0,
      explain:"Rate of harmonic change.", hint:"Chords per measure." },
    { type:"mc", q:"A verse changes chords once per measure, while the chorus changes chords twice per measure. Which section has the faster harmonic rhythm?", choices:["The chorus","The verse","They have identical harmonic rhythm"], answer:0,
      explain:"The chorus changes harmony more frequently. This does not by itself determine its total expressive energy.", hint:"Count per bar." },
    { type:"mc", q:"In C major, how is Am - Dm - G - C analyzed?", choices:["vi-ii-V-I, with descending-fifths root motion","I-V-vi-IV","Twelve-bar blues"], answer:0,
      explain:"Roots fall A→D→G→C in 5ths.", hint:"Follow the chord roots A-D-G-C." },
    { type:"truefalse", q:"In jazz and related styles, ii-V-I frequently appears with seventh chords.", answer:true,
      explain:"Dm7-G7-Cmaj7 — three seventh types chained.", hint:"Lesson 92's example." },
    { type:"truefalse", q:"In a major key, I-V-vi-IV and I-vi-IV-V use the same four chord roots and qualities in different orders.", answer:true,
      explain:"The two progressions contain I, IV, V, and vi but arrange them differently.", hint:"Compare the sets." },
    { type:"mc", q:"Which statement accurately describes vi-ii-V-I in a major key?", choices:["Its roots form a sequence of descending fifths","Every chord has dominant function","The progression avoids tonic"], answer:0,
      explain:"The roots move vi → ii → V → I by descending fifths, but the individual chords do not all serve dominant function.", hint:"Trace the roots A, D, G, C." }
  ],
  miaPerfect:"Perfect score! You accurately identified common progressions and harmonic-rhythm patterns.",
  miaPass:"You passed and completed unit 23. Next, you will expand your study of nonharmonic tones.",
  mia:{
    hook:{ label:"the welcome",
      explain:"Four chords cycling — I-V-vi-IV, a common four-chord loop.",
      play:()=>{const ROWS=[[60,64,67],[67,71,74],[69,72,76],[65,69,72]];ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.75,i*.8,.26)));} },
    learn:{ label:"common progressions",
      explain:"ii-V-I (PD-D-T), descending fifths (vi-ii-V-I), four-chord loops (I-V-vi-IV, I-vi-IV-V), 12-bar blues (conventional 12-measure cycle), harmonic rhythm (rate of change).",
      hint:"Identify the chord roots.",
      play:()=>{[[62,65,69,72],[55,59,62,65],[60,64,67,71]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.85,.27)));} },
    example:{ label:"the examples",
      explain:"Example 1 follows descending-fifths roots; example 2 doubles the harmonic rhythm mid-passage — hear how the rate of change shifts." },
    game:{ label:"the games",
      explain:"Identify the patterns, perform the descending-fifths roots, assemble ii-V-I, then translate loops across keys.",
      hint:"Identify the roots first." },
    quiz:{ label:"this question",
      explain:"Identify progressions by their chord roots: descending-fifths roots suggest vi-ii-V-I; compare the chord order with I-V-vi-IV; PD-D-T in three chords suggests ii-V-I.",
      play:()=>{[[57,60,64],[62,65,69],[67,71,74],[60,64,67]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.75,i*.8,.26)));} }
  }
};
