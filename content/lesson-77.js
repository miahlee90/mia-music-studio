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
  welcome:"Triplets and duplets: borrowed divisions. \u{1F3B6}",
  hook:{
    say:"<b>A simple-meter beat normally divides in two.</b> Listen: the second pattern squeezes THREE notes into that same beat. \u{1F447} <b>What happened in pattern 2?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Pattern 1 (normal)</button>
          <button class="play hk-b">▶ Pattern 2 (borrowed)</button></div>
          <div class="choices hk-ch" style="display:none"><button>Three notes filled one beat — a TRIPLET</button><button>The tempo doubled</button><button>The beat disappeared</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ for(let b=0;b<4;b++){ MFAudio.tone(48,.3,b*.55,.4); for(let j=0;j<2;j++) MFAudio.tone(76,.11,b*.55+j*.275,.17); } hA=true; if(hB) setTimeout(()=>ch.style.display="",2400); };
        container.querySelector(".hk-b").onclick=()=>{ for(let b=0;b<4;b++){ MFAudio.tone(48,.3,b*.55,.4); for(let j=0;j<3;j++) MFAudio.tone(76,.11,b*.55+j*(.55/3),.17); } hB=true; if(hA) setTimeout(()=>ch.style.display="",2400); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Three notes in the time of two — a TRIPLET, marked with a small 3. Borrowing a division from the other meter family is today's lesson!");
          else fb(false,"The beat stayed steady — listen to how many notes fill EACH beat…");
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
    { say:"<b>Irregular Division:</b> A beat's normal division can be replaced by a <b>borrowed division</b> from the other meter family. <b style='color:#2F6DA8'>Simple meter borrows three → the TRIPLET</b>. <b style='color:#C05A21'>Compound meter borrows two → the DUPLET</b>. \u{1F447} <b>What is an irregular division?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14.5px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Meter</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Normal division</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Borrowed division</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;color:#2F6DA8;font-weight:800">Simple</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">2 parts</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800">Triplet (3)</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;color:#C05A21;font-weight:800">Compound</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">3 parts</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800">Duplet (2)</td></tr></table>` },
      try:{ type:"mc", choices:["A division borrowed from the other meter family","A wrong rhythm","A change of time signature"], answer:0,
        success:"✓ Borrowed, not wrong — the meter stays the same for that one beat's division.",
        fail:"The time signature does not change…",
        hint:"Borrowing, not breaking." } },
    { say:"<b>The Triplet:</b> a triplet plays <b>three notes in the time of two</b>. An eighth-note triplet fills <b>one quarter-note beat</b> and is marked with a small <b>3</b>. \u{1F447} <b>An eighth-note triplet lasts as long as…</b>",
      show:{ type:"staff", spec:{clef:"treble",time:"4/4",tempo:76,notes:[
        {p:"G4",d:"8"},{p:"G4",d:"8"},
        {p:"C5",d:"8"},{p:"C5",d:"8"},{p:"C5",d:"8"},
        {p:"G4",d:"8"},{p:"G4",d:"8"},
        {p:"C5",d:"8"},{p:"C5",d:"8"},{p:"C5",d:"8"},{bar:"final"}],
        beams:[[0,1],[2,4],[5,6],[7,9]], tuplets:[{from:2,to:4},{from:7,to:9}], width:520} },
      try:{ type:"mc", choices:["One quarter note (one beat)","One whole note","Half an eighth note"], answer:0,
        success:"✓ Three triplet eighths squeeze into the time of two eighths — exactly one quarter-note beat.",
        fail:"The triplet replaces TWO eighth notes…",
        hint:"3 in the time of 2." } },
    { say:"<b>Counting triplets:</b> say <b>\u{201C}tri-po-let\u{201D}</b> (or \u{201C}1-la-li\u{201D}) evenly across the beat. Straight eighths say \u{201C}1 &\u{201D}; triplets say \u{201C}tri-po-let\u{201D}. \u{1F447} <b>Which syllables fit a triplet beat?</b>",
      try:{ type:"mc", choices:["tri-po-let — three even syllables","1-& — two syllables","1-e-&-a — four syllables"], answer:0,
        success:"✓ Three even syllables, one per triplet note.",
        fail:"Count the notes in the triplet…",
        hint:"Three notes, three syllables." } },
    { say:"<b>The Duplet:</b> in compound meter the borrowing reverses — a duplet plays <b>two notes in the time of three</b>, marked with a small <b>2</b>. A duplet fills <b>one dotted-quarter beat</b> in 6/8. \u{1F447} <b>A duplet in 6/8 lasts as long as…</b>",
      show:{ type:"staff", spec:{clef:"treble",time:"6/8",tempo:60,notes:[
        {p:"G4",d:"8"},{p:"A4",d:"8"},{p:"B4",d:"8"},
        {p:"C5",d:"8"},{p:"C5",d:"8"},{bar:"final"}],
        beams:[[0,2],[3,4]], tuplets:[{from:3,to:4,n:2}], width:400} },
      try:{ type:"mc", choices:["One dotted-quarter beat (three eighths)","Two full measures","One sixteenth note"], answer:0,
        success:"✓ Two even notes stretch across the beat that normally holds three.",
        fail:"The duplet replaces THREE eighth notes…",
        hint:"2 in the time of 3." } },
    { say:"<b>Other Tuplets:</b> any number can borrow: a <b>quintuplet</b> (5) or <b>sextuplet</b> (6) squeezes that many notes into one beat, each marked with its number. <b>Remember: triplet = 3 in the time of 2 · duplet = 2 in the time of 3.</b> \u{1F447} <b>What does a small 5 over a note group mean?</b>",
      try:{ type:"mc", choices:["Five notes in the time of the normal division","Play five times louder","Skip five notes"], answer:0,
        success:"✓ A quintuplet — five even notes in one beat's time.",
        fail:"The number always counts the NOTES…",
        hint:"Same logic as the 3." } },
    { say:"Listen: straight eighths or triplets? \u{1F447}",
      try:{ type:"custom",
        hint:"Two per beat = straight; three per beat = triplet.",
        mount:(container,fb)=>MF_L77_ear(container,fb) } },
    { say:"<b>Review:</b> \u{1F447} <b>Which marking shows two notes in the time of three?</b>",
      try:{ type:"mc", choices:["A duplet (small 2, in compound meter)","A triplet (small 3)","A fermata"], answer:0,
        success:"✓ The duplet — compound meter's borrowed division.",
        fail:"Which direction does compound meter borrow?",
        hint:"Compound borrows TWO." } }
  ],
  examples:[
    { caption:"Triplets among straight eighths in 4/4: beats 1–2 divide in two, beats 3–4 borrow the triplet. Listen for the shift from '1 &' to 'tri-po-let'.",
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
      intro:"Triplets, duplets and their values — race the facts!",
      miaIntro:"3 in 2, 2 in 3! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Irregular division","a borrowed division"],
        ["Triplet","three notes in the time of two"],
        ["Duplet","two notes in the time of three"],
        ["Simple meter borrows","the triplet"],
        ["Compound meter borrows","the duplet"],
        ["Eighth-note triplet equals","one quarter-note beat"],
        ["Duplet in 6/8 equals","one dotted-quarter beat"],
        ["Quintuplet","five notes in one beat's time"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — tuplet fluent!":null },
    { type:"symbol-hunt", title:"Game 2 · Spot the Tuplet",
      intro:"Rhythm cards — click the one each round names!",
      miaIntro:"Look for the small number! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Triplet (3 in one beat)", spec:{clef:"treble",time:"2/4",notes:[{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"q"}],beams:[[0,2]],tuplets:[{from:0,to:2}],width:190}},
        {label:"Straight eighths (2 per beat)", spec:{clef:"treble",time:"2/4",notes:[{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"q"}],beams:[[0,1]],width:170}},
        {label:"Duplet (2 in a compound beat)", spec:{clef:"treble",time:"6/8",notes:[{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"q."}],beams:[[0,1]],tuplets:[{from:0,to:1,n:2}],width:190}},
        {label:"Normal 6/8 beat (3 eighths)", spec:{clef:"treble",time:"6/8",notes:[{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"q."}],beams:[[0,2]],width:190}}]},
      result:(score)=>score>=5?"Tuplets spotted on sight!":null },
    { type:"order-tap", title:"Game 3 · Build the Borrowing Rule",
      intro:"Tap the borrowing chain in order!",
      miaIntro:"Who borrows what? \u{1F3C1}",
      spec:{sequence:["Simple meter divides in 2","It borrows 3 — the triplet","Compound meter divides in 3","It borrows 2 — the duplet"],
        title:"The borrowed-division rule"},
      result:(stars)=>stars>=2?"The borrowing rule is yours!":null },
    { type:"term-race", title:"Game 4 · Tuplet Value Race",
      intro:"How long does each tuplet last? At speed!",
      miaIntro:"Values, fast! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Eighth triplet","one quarter beat"],
        ["Quarter triplet","one half note"],
        ["Duplet in 6/8","one dotted-quarter beat"],
        ["The small 3","triplet marking"],
        ["The small 2","duplet marking"],
        ["The small 5","quintuplet"],
        ["The small 6","sextuplet"],
        ["Tuplet numbers count","the notes in the group"]]},
      result:(score)=>score>=6?"Every tuplet valued correctly!":null }
  ],
  practiceIntro:"20 practice questions — triplets, duplets and other tuplets. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Triplet","3 in the time of 2"],["Duplet","2 in the time of 3"],["Irregular division","borrowed division"],["Quintuplet","5 in one beat"],["Sextuplet","6 in one beat"]], reverse:true}, count:6 },
    { gen:"rhythm-count", params:{}, count:2 },
    { type:"mc", q:"A triplet plays how many notes in the time of two?", choices:["3","2","4"], answer:0,
      explain:"Three even notes — 3 in the time of 2." },
    { type:"mc", q:"Which meter family uses the duplet?", choices:["Compound","Simple","Neither"], answer:0,
      explain:"Compound meter borrows the two-part division." },
    { type:"mc", q:"An eighth-note triplet fills…", choices:["one quarter-note beat","one full measure","half a beat"], answer:0,
      explain:"It replaces two eighths = one beat." },
    { type:"mc", q:"Which syllables count a triplet?", choices:["tri-po-let","1-e-&-a","1-&"], answer:0,
      explain:"Three even syllables." },
    { type:"truefalse", q:"A duplet plays two notes in the time of three.", answer:true,
      explain:"Compound meter's borrowed division." },
    { type:"truefalse", q:"Using a triplet changes the time signature.", answer:false,
      explain:"Only that beat's division changes." },
    { type:"truefalse", q:"A quintuplet squeezes five notes into one beat's time.", answer:true,
      explain:"The number counts the notes." },
    { gen:"term-match", params:{subject:"term", pool:[["Simple borrows","triplet"],["Compound borrows","duplet"],["Small 3","triplet"],["Small 2","duplet"]], reverse:true}, count:3 },
    { gen:"note-value", params:{}, count:2 }
  ],
  vocabulary:[
    {term:"Irregular Division (Borrowed Division)", def:"A beat division borrowed from the other meter family — the time signature does not change."},
    {term:"Triplet", def:"Three notes in the time of two, marked with a small 3. Simple meter's borrowed division.",
      staff:{clef:"treble",time:"2/4",notes:[{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"q"}],beams:[[0,2]],tuplets:[{from:0,to:2}],width:150}},
    {term:"Duplet", def:"Two notes in the time of three, marked with a small 2. Compound meter's borrowed division.",
      staff:{clef:"treble",time:"6/8",notes:[{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"q."}],beams:[[0,1]],tuplets:[{from:0,to:1,n:2}],width:150}},
    {term:"Other Tuplets", def:"Quintuplet (5), sextuplet (6) and beyond — the small number counts the notes in one beat's time."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Irregular division</b> = a division <b>borrowed</b> from the other meter family.",
    "✔ <b>Triplet</b>: 3 in the time of 2 — simple meter borrows; count <b>tri-po-let</b>.",
    "✔ <b>Duplet</b>: 2 in the time of 3 — compound meter borrows.",
    "✔ Eighth triplet = one <b>quarter</b> beat; 6/8 duplet = one <b>dotted-quarter</b> beat.",
    "✔ Any number can borrow: <b>quintuplet (5), sextuplet (6)</b> — the number counts the notes."
  ],
  tips:[
    "Keep the BEAT steady and let the tuplet bend inside it — tap your foot while saying tri-po-let.",
    "Swing feel lives between straight eighths and triplets — first hear both cleanly, then split the difference.",
    "When you see a small number over notes, read it as 'this many notes in the normal time.'",
    "Next lesson: rhythms that fight the beat on purpose — SYNCOPATION."
  ],
  rewards:{ badge:"Tuplet Technician", icon:"\u{1F3B6}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! 3 in the time of 2 · 2 in the time of 3.",
  quiz:[
    { type:"mc", q:"What is an irregular (borrowed) division?", choices:["A division borrowed from the other meter family","A rhythm mistake","A tempo change"], answer:0,
      explain:"Borrowed for one beat; the meter stays.", hint:"Borrowing, not breaking." },
    { type:"mc", q:"A triplet plays…", choices:["three notes in the time of two","two notes in the time of three","three measures quickly"], answer:0,
      explain:"The small 3 marks it.", hint:"Simple meter's borrow." },
    { type:"mc", q:"A duplet plays…", choices:["two notes in the time of three","three notes in the time of two","two beats at once"], answer:0,
      explain:"The small 2 marks it.", hint:"Compound meter's borrow." },
    { type:"mc", q:"Which meter family borrows the triplet?", choices:["Simple meter","Compound meter","Neither"], answer:0,
      explain:"Simple divides in 2; it borrows 3.", hint:"Whose normal division is two?" },
    { type:"mc", q:"An eighth-note triplet lasts as long as…", choices:["one quarter note","one eighth note","one dotted quarter"], answer:0,
      explain:"It replaces two eighths.", hint:"One simple beat." },
    { type:"mc", q:"A duplet in 6/8 lasts as long as…", choices:["one dotted quarter","one quarter","two measures"], answer:0,
      explain:"It replaces three eighths — one compound beat.", hint:"One compound beat." },
    { type:"mc", q:"Identify the marking.",
      staff:{clef:"treble",time:"2/4",notes:[{p:"A4",d:"8"},{p:"A4",d:"8"},{p:"A4",d:"8"},{p:"A4",d:"q"}],beams:[[0,2]],tuplets:[{from:0,to:2}],width:200},
      choices:["A triplet — three in one beat","A duplet","Three separate beats"], answer:0,
      explain:"Small 3 over three beamed eighths.", hint:"Count the group." },
    { type:"mc", q:"Which syllable pattern fits a triplet?", choices:["tri-po-let","1-e-&-a","1-&-2-&"], answer:0,
      explain:"Three even syllables per beat.", hint:"Three notes." },
    { type:"truefalse", q:"A small 5 over a note group means five notes in the normal division's time.", answer:true,
      explain:"A quintuplet.", hint:"The number counts notes." },
    { type:"truefalse", q:"Tuplets change the time signature of the measure.", answer:false,
      explain:"Only one beat's division is borrowed.", hint:"The meter stays." },
    { type:"mc", q:"In 4/4, you hear beats 1–2 divide in two and beats 3–4 divide in three. Beats 3–4 use…", choices:["triplets","duplets","a new time signature"], answer:0,
      explain:"Simple meter borrowing three = triplets.", hint:"Which family is 4/4?" },
    { type:"mc", q:"Which pairing is correct?", choices:["Simple→triplet · Compound→duplet","Simple→duplet · Compound→triplet","Both borrow triplets"], answer:0,
      explain:"Each family borrows the OTHER's division.", hint:"Borrow across." }
  ],
  miaPerfect:"PERFECT! Triplets, duplets, quintuplets — every borrow accounted for. \u{1F3B6}\u{1F389}",
  miaPass:"Passed! Borrowed divisions hold no secrets. Next: syncopation…",
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
      explain:"One rule answers everything: the small number tells how many notes play in the normal division's time — and each family borrows the other's number.",
      play:()=>{MFAudio.tone(48,.3,0,.4);for(let j=0;j<3;j++) MFAudio.tone(76,.11,j*.18,.17);} }
  }
};
