/* Lesson 77 — Triplets & Duplets (Book 4, Unit 19 — SELF-AUTHORED)
   Core: IRREGULAR DIVISION = a borrowed division. Simple meter borrows the
   three-part division (TRIPLET, "3"); compound meter borrows the two-part
   division (DUPLET, "2"). Other tuplets exist (quintuplet, sextuplet).
   Uses staff.js v8.1 tuplets:[{from,to,n}] — n=2 renders a duplet.
   NOTE: edit by FULL-FILE REWRITE only. */

/* ear lab: straight eighths vs triplets over the same beat */
function MF_L77_ear(container,fb){
  const ROUNDS=[1,0,0,1].sort(()=>Math.random()-.5); /* 1 = triplet */
  let r=0, played=false;
  container.innerHTML=`<div class="big-q l77e-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l77e-play">▶ Play the pattern</button></div>
    <div class="choices l77e-ch" style="display:none"><button>Straight eighths — two per beat</button><button>Triplets — three per beat</button></div>`;
  const q=container.querySelector(".l77e-q"), pl=container.querySelector(".l77e-play"), ch=container.querySelector(".l77e-ch");
  pl.onclick=()=>{
    if(r>=ROUNDS.length) return;
    const trip=ROUNDS[r]===1, div=trip?3:2;
    for(let b=0;b<4;b++){ MFAudio.tone(48,.3,b*.55,.4); for(let j=0;j<div;j++) MFAudio.tone(76,.11,b*.55+j*(.55/div),.17); }
    played=true; setTimeout(()=>ch.style.display="",2600);
  };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(!played) return;
    const trip=ROUNDS[r]===1;
    if((i===1)===trip){ fb(true,trip?"✓ Three even notes per beat — triplets.":"✓ Two even notes per beat — straight eighths."); r++; played=false; ch.style.display="none";
      if(r>=ROUNDS.length){ q.textContent="Excellent! You hear triplets instantly."; pl.style.display="none"; } else q.innerHTML=`Round ${r+1} of ${ROUNDS.length}: listen, then decide.`;
    } else { MFAudio.tone(40,.2); fb(false,"Count the notes riding each low beat: two or three?"); }
  });
  q.innerHTML="Round 1 of 4: listen, then decide.";
}

LESSON_CONTENT[77]={
  welcome:"Triplets and duplets temporarily change the normal division of a beat.",
  hook:{
    say:"<b>In simple meter, a beat normally divides into two equal parts.</b> Listen to the two patterns. \u{1F447} <b>What happens to the beat division in Pattern 2?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Pattern 1 — two divisions per beat</button>
          <button class="play hk-b">▶ Pattern 2 — three divisions per beat</button></div>
          <div class="choices hk-ch" style="display:none"><button>Three notes divide one beat equally, forming a triplet</button><button>The tempo doubled</button><button>The beat disappeared</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ for(let b=0;b<4;b++){ MFAudio.tone(48,.3,b*.55,.4); for(let j=0;j<2;j++) MFAudio.tone(76,.11,b*.55+j*.275,.17); } hA=true; if(hB) setTimeout(()=>ch.style.display="",2400); };
        container.querySelector(".hk-b").onclick=()=>{ for(let b=0;b<4;b++){ MFAudio.tone(48,.3,b*.55,.4); for(let j=0;j<3;j++) MFAudio.tone(76,.11,b*.55+j*(.55/3),.17); } hB=true; if(hA) setTimeout(()=>ch.style.display="",2400); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Correct. Pattern 2 divides the beat into three equal notes in the time normally occupied by two. This is a triplet, indicated by a small 3.");
          else fb(false,"The beat remains steady. Listen again and count the notes within each beat.");
        });
      } }
  },
  objectives:[
    "Define irregular division: a division borrowed from the other meter family",
    "Triplet: THREE notes in the time of two (simple meter borrows)",
    "Duplet: TWO notes in the time of three (compound meter borrows)",
    "Read the small 3 and 2 markings",
    "Know the values: eighth-note triplet = one quarter beat; duplet = one dotted-quarter beat",
    "Meet other tuplets: quintuplet, sextuplet"
  ],
  steps:[
    { say:"<b>Irregular Beat Division:</b> A <b>tuplet</b> temporarily divides a beat differently from its normal division. <b style='color:#2F6DA8'>In simple meter, a triplet divides the beat into three equal parts instead of two</b>. <b style='color:#C05A21'>In compound meter, a duplet divides the beat into two equal parts instead of three</b>. \u{1F447} <b>What is an irregular beat division?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14.5px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Meter</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Normal division</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Borrowed division</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;color:#2F6DA8;font-weight:800">Simple</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">2 parts</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800">Triplet (3)</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;color:#C05A21;font-weight:800">Compound</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">3 parts</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800">Duplet (2)</td></tr></table>` },
      try:{ type:"mc", choices:["A temporary division that differs from the beat's normal division","An incorrectly performed rhythm","A change of time signature"], answer:0,
        success:"✓ Correct. The beat division changes temporarily, but the time signature remains the same.",
        fail:"The time signature remains unchanged. Consider what changes within the beat.",
        hint:"The beat division changes, not the meter." } },
    { say:"<b>The Triplet:</b> A triplet places <b>three notes of equal written value</b> in the time normally occupied by two. For example, three eighth-note triplets fill <b>one quarter-note beat</b> and are indicated by a small <b>3</b>. \u{1F447} <b>Three eighth-note triplets have the same total duration as…</b>",
      show:{ type:"staff", spec:{clef:"treble",time:"4/4",tempo:76,notes:[
        {p:"G4",d:"8"},{p:"G4",d:"8"},
        {p:"C5",d:"8"},{p:"C5",d:"8"},{p:"C5",d:"8"},
        {p:"G4",d:"8"},{p:"G4",d:"8"},
        {p:"C5",d:"8"},{p:"C5",d:"8"},{p:"C5",d:"8"},{bar:"final"}],
        beams:[[0,1],[2,4],[5,6],[7,9]], tuplets:[{from:2,to:4},{from:7,to:9}], width:520} },
      try:{ type:"mc", choices:["One quarter note","One whole note","One eighth note"], answer:0,
        success:"✓ Correct. Three eighth-note triplets occupy the same amount of time as two regular eighth notes, or one quarter note.",
        fail:"Three eighth-note triplets occupy the time normally given to two regular eighth notes.",
        hint:"Three in the time of two." } },
    { say:"<b>Counting Triplets:</b> Use three evenly spaced syllables for each beat, such as <b>\u{201C}1-trip-let\u{201D}</b> or \u{201C}1-la-li\u{201D}. By comparison, straight eighth notes may be counted \u{201C}1-and\u{201D}. \u{1F447} <b>Which counting pattern fits an eighth-note triplet?</b>",
      try:{ type:"mc", choices:["1-trip-let — three even syllables","1-and — two even syllables","1-e-and-a — four even syllables"], answer:0,
        success:"✓ Correct. Each triplet note receives one evenly spaced syllable.",
        fail:"Count the three notes within the beat.",
        hint:"Three notes require three evenly spaced syllables." } },
    { say:"<b>The Duplet:</b> In compound meter, a duplet divides a beat into <b>two equal parts instead of the usual three</b>. It is indicated by a small <b>2</b>. In 6/8, a pair of eighth-note duplets fills <b>one dotted-quarter beat</b>. \u{1F447} <b>A pair of eighth-note duplets in 6/8 has the same total duration as…</b>",
      show:{ type:"staff", spec:{clef:"treble",time:"6/8",tempo:60,notes:[
        {p:"G4",d:"8"},{p:"A4",d:"8"},{p:"B4",d:"8"},
        {p:"C5",d:"8"},{p:"C5",d:"8"},{bar:"final"}],
        beams:[[0,2],[3,4]], tuplets:[{from:3,to:4,n:2}], width:400} },
      try:{ type:"mc", choices:["One dotted-quarter beat","Two full measures","One sixteenth note"], answer:0,
        success:"✓ Correct. The two duplet notes divide the time normally occupied by three eighth notes.",
        fail:"The duplet group occupies the time normally given to three eighth notes.",
        hint:"Two in the time of three." } },
    { say:"<b>Other Tuplets:</b> Tuplets can contain other numbers of notes. A <b>quintuplet</b> contains five equal notes, and a <b>sextuplet</b> contains six. A number placed above or below the group identifies <b>how many notes it contains</b>. The number of notes they replace depends on the meter, note values, and musical context. \u{1F447} <b>What does a small 5 above or below a note group indicate?</b>",
      try:{ type:"mc", choices:["The group contains five tuplet notes","The notes should be played five times louder","Five notes should be omitted"], answer:0,
        success:"✓ Correct. The 5 identifies the group as a quintuplet containing five evenly spaced notes. Its total duration is determined by the notation and musical context.",
        fail:"The number identifies how many notes belong to the tuplet group.",
        hint:"The number identifies the notes within the group." } },
    { say:"Listen and identify whether the beat contains straight eighth notes or eighth-note triplets. \u{1F447}",
      try:{ type:"custom",
        hint:"In simple meter, two equal eighth notes form the normal division; three equal notes form an eighth-note triplet.",
        mount:(container,fb)=>MF_L77_ear(container,fb) } },
    { say:"<b>Review</b> \u{1F447} <b>Which tuplet divides a compound beat into two equal parts instead of three?</b>",
      try:{ type:"mc", choices:["A duplet, indicated by a small 2","A triplet, indicated by a small 3","A fermata"], answer:0,
        success:"✓ Correct. A duplet replaces the normal three-part division of a compound beat with two equal parts.",
        fail:"Compound meter normally divides each beat into three. Which tuplet divides it into two?",
        hint:"Look for the small 2." } }
  ],
  examples:[
    { caption:"Triplets among straight eighths in 4/4: beats 1–2 divide in two, beats 3–4 borrow the triplet. Listen for the shift from '1-and' to '1-trip-let'.",
      staff:{clef:"treble",time:"4/4",tempo:80,notes:[
        {p:"C4",d:"8"},{p:"E4",d:"8"},{p:"G4",d:"8"},{p:"E4",d:"8"},
        {p:"C5",d:"8"},{p:"B4",d:"8"},{p:"A4",d:"8"},
        {p:"G4",d:"8"},{p:"F4",d:"8"},{p:"E4",d:"8"},
        {p:"C4",d:"q"},{bar:"final"}],
        beams:[[0,1],[2,3],[4,6],[7,9]], tuplets:[{from:4,to:6},{from:7,to:9}], width:600},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"A duplet in 6/8: the first beat rolls normally in three; the second stretches two even notes across the same time — marked 2.",
      staff:{clef:"treble",time:"6/8",tempo:63,notes:[
        {p:"E4",d:"8"},{p:"G4",d:"8"},{p:"B4",d:"8"},
        {p:"C5",d:"8"},{p:"G4",d:"8"},{bar:"single"},
        {p:"A4",d:"8"},{p:"B4",d:"8"},{p:"C5",d:"8"},
        {p:"B4",d:"q."},{bar:"final"}],
        beams:[[0,2],[3,4],[6,8]], tuplets:[{from:3,to:4,n:2}], width:560},
      kb:{start:52,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Tuplet Sprint (45s)",
      intro:"Identify triplets, duplets, and their rhythmic values before time runs out.",
      miaIntro:"A triplet is three in the time of two; a duplet is two in the time of three.",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Irregular division","a borrowed division"],
        ["Triplet","three notes in the time of two"],
        ["Duplet","two notes in the time of three"],
        ["Simple meter borrows","the triplet"],
        ["Compound meter borrows","the duplet"],
        ["Eighth-note triplet equals","one quarter-note beat"],
        ["Duplet in 6/8 equals","one dotted-quarter beat"],
        ["Quintuplet","a group of five tuplet notes"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — Tuplet challenge completed!":null },
    { type:"symbol-hunt", title:"Game 2 · Spot the Tuplet",
      intro:"Select the rhythm that contains the named tuplet.",
      miaIntro:"Look for the number above or below the note group.",
      spec:{rounds:6, pool:[
        {label:"Triplet (3 in one beat)", spec:{clef:"treble",time:"2/4",notes:[{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"q"}],beams:[[0,2]],tuplets:[{from:0,to:2}],width:190}},
        {label:"Straight eighths (2 per beat)", spec:{clef:"treble",time:"2/4",notes:[{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"q"}],beams:[[0,1]],width:170}},
        {label:"Duplet (2 in a compound beat)", spec:{clef:"treble",time:"6/8",notes:[{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"q."}],beams:[[0,1]],tuplets:[{from:0,to:1,n:2}],width:190}},
        {label:"Normal 6/8 beat (3 eighths)", spec:{clef:"treble",time:"6/8",notes:[{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"q."}],beams:[[0,2]],width:190}}]},
      result:(score)=>score>=5?"You identified the tuplets correctly.":null },
    { type:"order-tap", title:"Game 3 · Build the Borrowing Rule",
      intro:"Arrange the meter types and their irregular divisions in the correct order.",
      miaIntro:"Simple meter uses triplets; compound meter uses duplets.",
      spec:{sequence:["Simple meter divides in 2","It borrows 3 — the triplet","Compound meter divides in 3","It borrows 2 — the duplet"],
        title:"The borrowed-division rule"},
      result:(stars)=>stars>=2?"You matched each meter with its irregular beat division.":null },
    { type:"term-race", title:"Game 4 · Tuplet Value Race",
      intro:"Determine the total duration of each tuplet group before time runs out.",
      miaIntro:"Compare each tuplet with the notes it replaces.",
      spec:{rounds:8, reverse:true, pool:[
        ["Eighth triplet","one quarter beat"],
        ["Quarter triplet","one half note"],
        ["Duplet in 6/8","one dotted-quarter beat"],
        ["The small 3","triplet marking"],
        ["The small 2","duplet marking"],
        ["The small 5","quintuplet"],
        ["The small 6","sextuplet"],
        ["Tuplet numbers count","the notes in the group"]]},
      result:(score)=>score>=6?"You identified each tuplet's duration correctly.":null }
  ],
  practiceIntro:"Complete 20 practice questions on triplets, duplets, and other tuplets. The next question will appear after each correct answer.",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Triplet","3 in the time of 2"],["Duplet","2 in the time of 3"],["Irregular division","borrowed division"],["Quintuplet","a five-note group"],["Sextuplet","a six-note group"]], reverse:true}, count:6 },
    { gen:"rhythm-count", params:{}, count:2 },
    { type:"mc", q:"How many equal notes does a triplet place in the time normally occupied by two?", choices:["3","2","4"], answer:0,
      explain:"A triplet places three equal notes in the time normally occupied by two." },
    { type:"mc", q:"In which meter type does a duplet replace the normal three-part beat division?", choices:["Compound meter","Simple meter","Neither type"], answer:0,
      explain:"In compound meter, a duplet divides the beat into two equal parts instead of three." },
    { type:"mc", q:"A complete group of three eighth-note triplets fills…", choices:["one quarter-note beat","one full measure","half of a quarter-note beat"], answer:0,
      explain:"The three triplet notes occupy the time normally given to two regular eighth notes, or one quarter note." },
    { type:"mc", q:"Which counting pattern can be used for an eighth-note triplet?", choices:["1-trip-let","1-e-and-a","1-and"], answer:0,
      explain:"The three syllables correspond to the three evenly spaced triplet notes." },
    { type:"truefalse", q:"A duplet places two equal notes in the time normally occupied by three.", answer:true,
      explain:"A duplet replaces the normal three-part division of a compound beat with two equal parts." },
    { type:"truefalse", q:"Using a triplet changes the notated time signature.", answer:false,
      explain:"The beat division changes temporarily, but the time signature remains the same." },
    { type:"truefalse", q:"A quintuplet contains five evenly spaced tuplet notes.", answer:true,
      explain:"The number 5 identifies the five notes in the tuplet group. Its total duration depends on the notation and context." },
    { gen:"term-match", params:{subject:"term", pool:[["Simple borrows","triplet"],["Compound borrows","duplet"],["Small 3","triplet"],["Small 2","duplet"]], reverse:true}, count:3 },
    { gen:"note-value", params:{}, count:2 }
  ],
  vocabulary:[
    {term:"Irregular Division (Borrowed Division)", def:"A beat division borrowed from the other meter family — the time signature does not change."},
    {term:"Triplet", def:"Three notes in the time of two, marked with a small 3. Simple meter's borrowed division.",
      staff:{clef:"treble",time:"2/4",notes:[{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"q"}],beams:[[0,2]],tuplets:[{from:0,to:2}],width:150}},
    {term:"Duplet", def:"Two notes in the time of three, marked with a small 2. Compound meter's borrowed division.",
      staff:{clef:"treble",time:"6/8",notes:[{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"q."}],beams:[[0,1]],tuplets:[{from:0,to:1,n:2}],width:150}},
    {term:"Other Tuplets", def:"Quintuplet (5), sextuplet (6) and beyond — the small number identifies how many notes the group contains; the notes they replace depend on the meter, note values, and context."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Irregular division</b> = a division <b>borrowed</b> from the other meter family.",
    "✔ <b>Triplet</b>: 3 in the time of 2 — simple meter borrows; count <b>1-trip-let</b>.",
    "✔ <b>Duplet</b>: 2 in the time of 3 — compound meter borrows.",
    "✔ Eighth triplet = one <b>quarter</b> beat; 6/8 duplet = one <b>dotted-quarter</b> beat.",
    "✔ Any number can borrow: <b>quintuplet (5), sextuplet (6)</b> — the number counts the notes."
  ],
  tips:[
    "Keep the BEAT steady and let the tuplet bend inside it — tap your foot while saying 1-trip-let.",
    "Swing feel lives between straight eighths and triplets — first hear both cleanly, then split the difference.",
    "When you see a small number over notes, read it as 'this many notes in this group.'",
    "Next lesson: rhythms that fight the beat on purpose — SYNCOPATION."
  ],
  rewards:{ badge:"Tuplet Technician", icon:"\u{1F3B6}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"A triplet places three notes in the time of two; a duplet places two notes in the time of three.",
  quiz:[
    { type:"mc", q:"What is an irregular beat division?", choices:["A temporary beat division that differs from the meter's normal division","A rhythmic performance error","A change in tempo"], answer:0,
      explain:"The division changes temporarily while the meter remains the same.", hint:"The division changes, not the meter." },
    { type:"mc", q:"A triplet places…", choices:["three equal notes in the time normally occupied by two","two equal notes in the time normally occupied by three","three measures within one beat"], answer:0,
      explain:"A small 3 identifies the triplet group.", hint:"Look for three notes replacing the usual two-part division." },
    { type:"mc", q:"A duplet places…", choices:["two equal notes in the time normally occupied by three","three equal notes in the time normally occupied by two","two beats at the same time"], answer:0,
      explain:"A small 2 identifies the duplet group.", hint:"Look for two notes replacing the usual three-part division." },
    { type:"mc", q:"In which meter type does a triplet replace the normal two-part beat division?", choices:["Simple meter","Compound meter","Neither meter type"], answer:0,
      explain:"Simple meter normally divides each beat into two. A triplet temporarily divides it into three.", hint:"Which meter type normally divides each beat into two?" },
    { type:"mc", q:"A complete group of three eighth-note triplets lasts as long as…", choices:["one quarter note","one eighth note","one dotted quarter note"], answer:0,
      explain:"The group occupies the time normally given to two eighth notes.", hint:"One simple beat." },
    { type:"mc", q:"A complete pair of eighth-note duplets in 6/8 lasts as long as…", choices:["one dotted quarter note","one quarter note","two measures"], answer:0,
      explain:"The pair occupies the time normally given to three eighth notes, or one dotted-quarter beat.", hint:"One compound beat." },
    { type:"mc", q:"Identify the marking.",
      staff:{clef:"treble",time:"2/4",notes:[{p:"A4",d:"8"},{p:"A4",d:"8"},{p:"A4",d:"8"},{p:"A4",d:"q"}],beams:[[0,2]],tuplets:[{from:0,to:2}],width:200},
      choices:["An eighth-note triplet — three equal notes within one quarter-note beat","An eighth-note duplet","Three separate beats"], answer:0,
      explain:"A small 3 above three beamed eighth notes identifies a triplet.", hint:"Count the group." },
    { type:"mc", q:"Which counting pattern fits an eighth-note triplet?", choices:["1-trip-let","1-e-and-a","1-and"], answer:0,
      explain:"Three even syllables per beat.", hint:"Three notes." },
    { type:"truefalse", q:"A small 5 above or below a note group identifies five notes as a quintuplet.", answer:true,
      explain:"The number 5 identifies the five notes in the tuplet group.", hint:"The number counts notes." },
    { type:"truefalse", q:"Using a tuplet changes the notated time signature of the measure.", answer:false,
      explain:"A tuplet temporarily changes the rhythmic division without changing the time signature.", hint:"The meter stays." },
    { type:"mc", q:"In 4/4, beats 1 and 2 divide into two equal eighth notes, while beats 3 and 4 each divide into three equal notes. Which rhythmic device is used on beats 3 and 4?", choices:["eighth-note triplets","eighth-note duplets","a new time signature"], answer:0,
      explain:"In simple meter, dividing a beat into three equal parts produces a triplet.", hint:"Which family is 4/4?" },
    { type:"mc", q:"Which pairing correctly matches each meter type with its common irregular beat division?", choices:["Simple meter → triplet; compound meter → duplet","Simple meter → duplet; compound meter → triplet","Both meter types use only triplets"], answer:0,
      explain:"A triplet introduces a three-part division in simple meter, while a duplet introduces a two-part division in compound meter.", hint:"Compare each irregular division with the meter's normal beat division." }
  ],
  miaPerfect:"Perfect score! You accurately identified triplets, duplets, and other tuplets.",
  miaPass:"You passed! Next, you will explore syncopation.",
  mia:{
    hook:{ label:"the welcome",
      explain:"Pattern 2 squeezed three notes into a beat that normally holds two — a triplet, simple meter's borrowed division.",
      play:()=>{for(let b=0;b<4;b++){ MFAudio.tone(48,.3,b*.55,.4); for(let j=0;j<3;j++) MFAudio.tone(76,.11,b*.55+j*(.55/3),.17); }} },
    learn:{ label:"triplets & duplets",
      explain:"Irregular division = borrowed division. Triplet: 3 in the time of 2 (simple borrows). Duplet: 2 in the time of 3 (compound borrows). Quintuplet/sextuplet extend the idea.",
      hint:"3 in 2 · 2 in 3.",
      play:()=>{MFAudio.tone(48,.3,0,.4);for(let j=0;j<3;j++) MFAudio.tone(76,.11,j*.18,.17);MFAudio.tone(48,.3,.6,.4);for(let j=0;j<2;j++) MFAudio.tone(76,.13,.6+j*.27,.17);} },
    example:{ label:"the examples",
      explain:"Example 1 mixes straight eighths with triplets in 4/4; example 2 places a duplet inside 6/8." },
    game:{ label:"the games",
      explain:"Sprint the facts, spot tuplets on cards, build the borrowing rule, then race the values.",
      hint:"The small number counts the notes." },
    quiz:{ label:"this question",
      explain:"One rule answers everything: the small number tells how many notes belong to the tuplet group — and each family borrows the other's number.",
      play:()=>{MFAudio.tone(48,.3,0,.4);for(let j=0;j<3;j++) MFAudio.tone(76,.11,j*.18,.17);} }
  }
};
