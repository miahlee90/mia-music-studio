/* Lesson 83 — Interval Inversions & Compound Intervals (Book 4, Unit 20 — SELF-AUTHORED)
   Core: INVERT an interval = move the bottom note up an octave. Rule of 9:
   the numbers sum to 9 (2nd↔7th, 3rd↔6th, 4th↔5th). Quality flips:
   M↔m, A↔d, P↔P. COMPOUND intervals exceed the octave (9th = 2nd + octave);
   reduce by subtracting 7. NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[83]={
  welcome:"Flip an interval, keep the rules. \u{1F503}",
  hook:{
    say:"<b>One pair of notes, two intervals.</b> C up to E is a 3rd. Move the C up an octave — now E up to C. \u{1F447} <b>Listen to both. Is the second interval still a 3rd?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ C up to E (the 3rd)</button>
          <button class="play hk-b">▶ E up to C (flipped)</button></div>
          <div class="choices hk-ch" style="display:none"><button>No — it became a 6th</button><button>Yes — flipping changes nothing</button><button>It became a 2nd</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ MFAudio.tone(60,.6,0,.42); MFAudio.tone(64,.6,.7,.42); MFAudio.tone(60,.8,1.5,.3); MFAudio.tone(64,.8,1.5,.3); hA=true; if(hB) setTimeout(()=>ch.style.display="",2400); };
        container.querySelector(".hk-b").onclick=()=>{ MFAudio.tone(64,.6,0,.42); MFAudio.tone(72,.6,.7,.42); MFAudio.tone(64,.8,1.5,.3); MFAudio.tone(72,.8,1.5,.3); hB=true; if(hA) setTimeout(()=>ch.style.display="",2400); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ E up to C is a 6th. Flipping an interval INVERTS it — and the numbers always add to 9 (3+6). Today: inversions and intervals beyond the octave!");
          else fb(false,"Count the letter names E-F-G-A-B-C: six of them…");
        });
      } }
  },
  objectives:[
    "Invert an interval: move the bottom note up an octave",
    "Apply the RULE OF 9: the two numbers sum to nine",
    "Flip qualities: major↔minor, augmented↔diminished, perfect stays perfect",
    "Define compound intervals: larger than an octave",
    "Reduce a compound to its simple interval (subtract 7)",
    "Name 9ths, 10ths, 11ths, 12ths and 13ths"
  ],
  steps:[
    { say:"<b>Interval Inversion:</b> to invert an interval, <b>move the bottom note up one octave</b> (or the top note down one). C–E (3rd) becomes E–C (6th). \u{1F447} <b>How do you invert an interval?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:90,notes:[
        {p:"C4",d:"h",label:"3rd"},{p:"E4",d:"h",chord:true},
        {p:"E4",d:"h",label:"6th"},{p:"C5",d:"h",chord:true},{bar:"final"}],width:380} },
      try:{ type:"mc", choices:["Move the bottom note up an octave","Play it backwards","Add a sharp"], answer:0,
        success:"✓ The bottom becomes the top — the interval flips.",
        fail:"The notes stay the same letters…",
        hint:"Octave transfer." } },
    { say:"<b>The Rule of 9:</b> an interval and its inversion always <b>add up to nine</b>: 2nd↔7th · 3rd↔6th · 4th↔5th · unison↔octave. \u{1F447} <b>A 4th inverts to a…</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14.5px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Interval</th><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">unison</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">2nd</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">3rd</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">4th</td></tr>
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Inversion</th><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">octave</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">7th</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">6th</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">5th</td></tr>
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Sum</th><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#A9821F;font-weight:800">9</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#A9821F;font-weight:800">9</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#A9821F;font-weight:800">9</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#A9821F;font-weight:800">9</td></tr></table>` },
      try:{ type:"mc", choices:["5th (4 + 5 = 9)","6th","4th — it never changes"], answer:0,
        success:"✓ 4 + 5 = 9 — the rule of 9 never misses.",
        fail:"Subtract from nine…",
        hint:"9 − 4 = ?" } },
    { say:"<b>Quality Flips Too:</b> <b>major ↔ minor</b> · <b>augmented ↔ diminished</b> · <b>perfect stays perfect</b>. A major 3rd inverts to a minor 6th; a perfect 5th inverts to a perfect 4th. \u{1F447} <b>A major 2nd inverts to…</b>",
      try:{ type:"mc", choices:["A minor 7th","A major 7th","A perfect 7th"], answer:0,
        success:"✓ Number: 2→7. Quality: major→minor. M2 inverts to m7.",
        fail:"Both the number AND the quality flip…",
        hint:"M↔m." } },
    { say:"<b>Why Perfect Stays Perfect:</b> the perfect intervals (unison, 4th, 5th, octave) invert into each other — P4↔P5, P1↔P8 — so their family never changes. That stability is why they are called perfect. \u{1F447} <b>A perfect 5th inverts to…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:90,notes:[
        {p:"C4",d:"h",label:"P5"},{p:"G4",d:"h",chord:true},
        {p:"G4",d:"h",label:"P4"},{p:"C5",d:"h",chord:true},{bar:"final"}],width:380} },
      try:{ type:"mc", choices:["A perfect 4th","A diminished 5th","A major 4th"], answer:0,
        success:"✓ P5 → P4: still perfect, numbers summing to nine.",
        fail:"Perfect flips to…",
        hint:"P↔P." } },
    { say:"<b>Compound Intervals:</b> intervals <b>larger than an octave</b>. A 9th = a 2nd plus an octave; a 10th = a 3rd plus an octave. To find the simple interval, <b>subtract 7</b>. <b>Remember: rule of 9 for inversions · subtract 7 for compounds.</b> \u{1F447} <b>A 10th reduces to a…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:90,notes:[
        {p:"C4",d:"h",label:"9th"},{p:"D5",d:"h",chord:true},
        {p:"C4",d:"h",label:"10th"},{p:"E5",d:"h",chord:true},{bar:"final"}],width:380} },
      try:{ type:"mc", choices:["3rd (10 − 7 = 3)","2nd","5th"], answer:0,
        success:"✓ A 10th is a 3rd stretched past the octave.",
        fail:"Subtract seven from the compound number…",
        hint:"10 − 7." } },
    { say:"<b>The Compound Family:</b> 9th = 2nd · 10th = 3rd · 11th = 4th · 12th = 5th · 13th = 6th (all plus an octave). These numbers return in jazz chord symbols — C9, C11, C13. \u{1F447} <b>An 11th is a compound…</b>",
      try:{ type:"mc", choices:["4th","5th","2nd"], answer:0,
        success:"✓ 11 − 7 = 4. The 11th is a 4th plus an octave.",
        fail:"Apply the subtraction…",
        hint:"11 − 7 = ?" } },
    { say:"<b>Review:</b> \u{1F447} <b>A minor 3rd inverts to…</b>",
      try:{ type:"mc", choices:["A major 6th","A minor 6th","A perfect 6th"], answer:0,
        success:"✓ 3→6 by the rule of 9; minor→major by the quality flip.",
        fail:"Flip BOTH parts…",
        hint:"m↔M, 3↔6." } }
  ],
  examples:[
    { caption:"Inversion pairs played back to back: M3→m6, then P5→P4. Same letter names, flipped stacking — numbers always summing to nine.",
      staff:{clef:"treble",tempo:80,notes:[
        {p:"C4",d:"h",label:"M3"},{p:"E4",d:"h",chord:true},
        {p:"E4",d:"h",label:"m6"},{p:"C5",d:"h",chord:true},{bar:"single"},
        {p:"D4",d:"h",label:"P5"},{p:"A4",d:"h",chord:true},
        {p:"A4",d:"h",label:"P4"},{p:"D5",d:"h",chord:true},{bar:"final"}],width:560},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"Compound intervals from C: a 9th (D), a 10th (E) and a 13th (A) — each a simple interval pushed past the octave. Jazz chords borrow these numbers.",
      staff:{clef:"treble",tempo:80,notes:[
        {p:"C4",d:"h",label:"9th"},{p:"D5",d:"h",chord:true},
        {p:"C4",d:"h",label:"10th"},{p:"E5",d:"h",chord:true},
        {p:"C4",d:"h",label:"13th"},{p:"A5",d:"h",chord:true},{bar:"final"}],width:520},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Rule-of-9 Sprint (45s)",
      intro:"Inversion pairs and quality flips — race them!",
      miaIntro:"Sum to nine! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["2nd inverts to","7th"],
        ["3rd inverts to","6th"],
        ["4th inverts to","5th"],
        ["Major inverts to","minor"],
        ["Augmented inverts to","diminished"],
        ["Perfect inverts to","perfect"],
        ["The inversion rule","numbers sum to 9"],
        ["To invert","move the bottom note up an octave"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — rule of 9 automatic!":null },
    { type:"symbol-hunt", title:"Game 2 · Find the Inversion",
      intro:"An interval is called — click its INVERSION!",
      miaIntro:"Flip the stack! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"m6 (inverts M3)", spec:{clef:"treble",notes:[{p:"E4",d:"w"},{p:"C5",d:"w",chord:true}],width:140}},
        {label:"P4 (inverts P5)", spec:{clef:"treble",notes:[{p:"G4",d:"w"},{p:"C5",d:"w",chord:true}],width:140}},
        {label:"m7 (inverts M2)", spec:{clef:"treble",notes:[{p:"D4",d:"w"},{p:"C5",d:"w",chord:true}],width:140}},
        {label:"M6 (inverts m3)", spec:{clef:"treble",notes:[{p:"E4",d:"w"},{p:"C#5",d:"w",chord:true}],width:140}}]},
      result:(score)=>score>=5?"Inversions found on sight!":null },
    { type:"order-tap", title:"Game 3 · Compound Ladder",
      intro:"Tap the compound intervals from SMALLEST to LARGEST!",
      miaIntro:"Past the octave and climbing! \u{1F3C1}",
      spec:{sequence:["9th (= 2nd)","10th (= 3rd)","11th (= 4th)","12th (= 5th)","13th (= 6th)"],
        title:"The compound interval ladder"},
      result:(stars)=>stars>=2?"The ladder, in order!":null },
    { type:"term-race", title:"Game 4 · Reduce the Compound",
      intro:"Subtract 7 at speed — name each compound's simple interval!",
      miaIntro:"Minus seven! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["9th","a compound 2nd"],
        ["10th","a compound 3rd"],
        ["11th","a compound 4th"],
        ["12th","a compound 5th"],
        ["13th","a compound 6th"],
        ["Compound interval","larger than an octave"],
        ["Reduction rule","subtract 7"],
        ["C9, C11, C13 chords","named for compound intervals"]]},
      result:(score)=>score>=6?"Compounds reduced instantly!":null }
  ],
  practiceIntro:"20 practice questions — inversions, qualities and compounds. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["2nd↔","7th"],["3rd↔","6th"],["4th↔","5th"],["M↔","m"],["P↔","P"],["Sum","9"]], reverse:true}, count:6 },
    { gen:"interval-quality", params:{ask:"quality"}, count:3 },
    { type:"mc", q:"To invert an interval, you…", choices:["move the bottom note up an octave","remove a note","change the clef"], answer:0,
      explain:"Bottom becomes top." },
    { type:"mc", q:"A 6th inverts to a…", choices:["3rd","4th","6th"], answer:0,
      explain:"6 + 3 = 9." },
    { type:"mc", q:"A major interval inverts to a…", choices:["minor interval","major interval","perfect interval"], answer:0,
      explain:"M↔m always." },
    { type:"mc", q:"A perfect 4th inverts to a…", choices:["perfect 5th","major 5th","diminished 5th"], answer:0,
      explain:"Perfect stays perfect; 4+5=9." },
    { type:"truefalse", q:"An interval and its inversion sum to nine.", answer:true,
      explain:"The rule of 9." },
    { type:"truefalse", q:"A compound interval is smaller than an octave.", answer:false,
      explain:"LARGER than an octave." },
    { type:"truefalse", q:"A 9th reduces to a 2nd.", answer:true,
      explain:"9 − 7 = 2." },
    { gen:"term-match", params:{subject:"term", pool:[["9th","compound 2nd"],["10th","compound 3rd"],["11th","compound 4th"],["13th","compound 6th"]], reverse:true}, count:3 },
    { gen:"interval-quality", params:{ask:"quality"}, count:2 }
  ],
  vocabulary:[
    {term:"Interval Inversion", def:"Flipping an interval by moving the bottom note up an octave. Numbers sum to 9."},
    {term:"Rule of 9", def:"2nd↔7th · 3rd↔6th · 4th↔5th · unison↔octave — every pair adds to nine."},
    {term:"Quality Flip", def:"Major↔minor, augmented↔diminished; perfect inverts to perfect."},
    {term:"Compound Interval", def:"An interval larger than an octave: 9th, 10th, 11th, 12th, 13th. Subtract 7 to find its simple form."}
  ],
  mistakes:[],
  summary:[
    "✔ Invert = <b>bottom note up an octave</b>.",
    "✔ <b>Rule of 9</b>: 2↔7, 3↔6, 4↔5, 1↔8.",
    "✔ Qualities flip: <b>M↔m, A↔d, P↔P</b>.",
    "✔ <b>Compound</b> = past the octave; <b>subtract 7</b> to reduce (9th→2nd, 13th→6th).",
    "✔ Jazz chord numbers (9, 11, 13) come from compound intervals."
  ],
  tips:[
    "Fast check: M3 up from C is E; m6 up from E is C. If you return to your starting letter, the inversion is right.",
    "The tritone is its own inversion: A4↔d5 — both six half steps.",
    "Compound quality never changes: a major 10th is just a major 3rd, breathing higher.",
    "Next lesson: moving whole melodies to new keys — transposition."
  ],
  rewards:{ badge:"Interval Flipper", icon:"\u{1F503}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Sum to 9, flip the quality, subtract 7.",
  quiz:[
    { type:"mc", q:"How is an interval inverted?", choices:["The bottom note moves up an octave","Both notes move up","The interval is played twice"], answer:0,
      explain:"Bottom becomes top.", hint:"Octave transfer." },
    { type:"mc", q:"An interval and its inversion always sum to…", choices:["9","8","10"], answer:0,
      explain:"The rule of 9.", hint:"3+6, 4+5…" },
    { type:"mc", q:"A 2nd inverts to a…", choices:["7th","6th","5th"], answer:0,
      explain:"2 + 7 = 9.", hint:"Subtract from 9." },
    { type:"mc", q:"A major 3rd inverts to a…", choices:["minor 6th","major 6th","minor 3rd"], answer:0,
      explain:"3→6 and M→m.", hint:"Both parts flip." },
    { type:"mc", q:"An augmented 4th inverts to a…", choices:["diminished 5th","augmented 5th","perfect 5th"], answer:0,
      explain:"A↔d and 4↔5 — the tritone flips into itself.", hint:"A↔d." },
    { type:"mc", q:"Which quality stays the same under inversion?", choices:["Perfect","Major","Augmented"], answer:0,
      explain:"P4↔P5, P1↔P8.", hint:"The stable family." },
    { type:"mc", q:"A compound interval is…", choices:["larger than an octave","smaller than a 2nd","always dissonant"], answer:0,
      explain:"9ths and beyond.", hint:"Past the octave." },
    { type:"mc", q:"A 13th reduces to a…", choices:["6th","5th","7th"], answer:0,
      explain:"13 − 7 = 6.", hint:"Subtract 7." },
    { type:"mc", q:"Identify the interval.",
      staff:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"D5",d:"w",chord:true}],width:160},
      choices:["A 9th — a compound 2nd","A 2nd","An octave"], answer:0,
      explain:"C to the D past the octave = 9th.", hint:"Count past 8." },
    { type:"truefalse", q:"A minor 7th inverts to a major 2nd.", answer:true,
      explain:"7→2, m→M.", hint:"Run the flips." },
    { type:"truefalse", q:"A compound interval's quality differs from its simple form.", answer:false,
      explain:"A major 10th is a major 3rd — quality carries over.", hint:"Only the octave is added." },
    { type:"mc", q:"Jazz chords called C9, C11 and C13 take their numbers from…", choices:["compound intervals above the root","measure numbers","fingerings"], answer:0,
      explain:"9th, 11th, 13th above C.", hint:"The interval ladder." }
  ],
  miaPerfect:"PERFECT! Nines summed, sevens subtracted — intervals flip at your command. \u{1F503}\u{1F389}",
  miaPass:"Passed — and UNIT 20 is COMPLETE! Scales and intervals, fully expanded. \u{1F389}",
  mia:{
    hook:{ label:"the welcome",
      explain:"C–E (a 3rd) flipped into E–C (a 6th): inversion. The numbers 3 and 6 sum to nine — they always will.",
      play:()=>{MFAudio.tone(60,.5,0,.4);MFAudio.tone(64,.5,.55,.4);MFAudio.tone(64,.5,1.3,.4);MFAudio.tone(72,.5,1.85,.4);} },
    learn:{ label:"inversions & compounds",
      explain:"Invert = bottom up an octave; numbers sum to 9; M↔m, A↔d, P↔P. Compound = past the octave; subtract 7 (9th→2nd … 13th→6th).",
      hint:"9 for flips, 7 for compounds.",
      play:()=>{MFAudio.tone(60,.5,0,.4);MFAudio.tone(74,.5,.6,.4);} },
    example:{ label:"the examples",
      explain:"Example 1 plays inversion pairs (M3→m6, P5→P4); example 2 stretches simple intervals into 9ths, 10ths and 13ths." },
    game:{ label:"the games",
      explain:"Sprint the rule of 9, find inversions on cards, climb the compound ladder, then reduce compounds at speed.",
      hint:"Sum 9 · subtract 7." },
    quiz:{ label:"this question",
      explain:"Three moves solve everything: numbers sum to 9, qualities flip (P stays), compounds reduce by subtracting 7.",
      play:()=>{MFAudio.tone(60,.5,0,.4);MFAudio.tone(64,.5,.5,.4);MFAudio.tone(72,.6,1.1,.4);} }
  }
};
