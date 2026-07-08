/* Lesson 65 — Broken Chords and Arpeggiated Accompaniments (AEMT Book 3, Unit 16)
   Built from drafts/UNIT 16 – Lesson 65.md; AEMT3 p.103 verified by render.
   Core: BLOCK CHORD = notes together; BROKEN CHORD = notes NOT together;
   ARPEGGIO = chord tones played sequentially, one after another (Italian
   arpeggiare, "to play upon a harp"); may extend an octave or more; arpeggios
   outline the chords; a repeated chord's symbol is not re-written.
   NOTE: edit by FULL-FILE UPDATE only. */

/* texture detective: block, broken or arpeggio — by ear */
function MF_L65_ear(container,fb){
  const KINDS=[
    {name:"Block chord", play:()=>[60,64,67].forEach(m=>MFAudio.tone(m,1.4,0,.33))},
    {name:"Broken chord", play:()=>{[60,67,64,67].forEach((m,i)=>MFAudio.tone(m,.5,i*.42,.38));}},
    {name:"Arpeggio", play:()=>{[60,64,67,72].forEach((m,i)=>MFAudio.tone(m,.5,i*.4,.38));}}];
  let order=[0,2,1,2].sort(()=>Math.random()-.5), r=0, played=false;
  container.innerHTML=`<div class="big-q l65e-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l65e-play">▶ Play the mystery texture</button></div>
    <div class="choices chips l65e-ch" style="display:none"><button>Block</button><button>Broken</button><button>Arpeggio</button></div>`;
  const q=container.querySelector(".l65e-q"), pl=container.querySelector(".l65e-play"), ch=container.querySelector(".l65e-ch");
  function ask(){
    if(r>=order.length){ q.textContent="Every texture identified — your ears know their chords in any outfit!"; pl.style.display="none"; ch.style.display="none"; return; }
    played=false; ch.style.display="none";
    q.innerHTML=`Round ${r+1} of ${order.length}: same C chord — which TEXTURE?`;
  }
  pl.onclick=()=>{ const K=KINDS[order[r]]; if(!K) return;
    K.play(); played=true; setTimeout(()=>ch.style.display="",1900); };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(!played) return;
    const want=order[r];
    if(i===want){ MFAudio.yay();
      fb(true,`✓ ${KINDS[want].name}! ${want===0?"All notes at once — a solid wall.":want===1?"The notes took turns but bounced around — broken.":"One after another, straight up like a harp sweep — arpeggio."}`);
      r++; setTimeout(ask,1300); }
    else { MFAudio.tone(40,.2); fb(false,"Replay: together = block; taking turns = broken; climbing in ORDER = arpeggio."); }
  });
  ask();
}

/* arpeggio builder: sweep C and G chords over an octave-plus */
function MF_L65_build(container,fb){
  const ROUNDS=[
    {name:"C major arpeggio", pcs:[60,64,67,72,76], names:["C","E","G","C (octave!)","E — keep sweeping"]},
    {name:"G major arpeggio", pcs:[55,59,62,67,71], names:["G","B","D","G (octave!)","B — the harp sweep"]}];
  let r=0,k=0;
  container.innerHTML=`<div class="big-q l65b-q" style="text-align:center"></div><div class="l65b-kb"></div>`;
  const q=container.querySelector(".l65b-q"), kh=container.querySelector(".l65b-kb");
  function ask(){
    if(r>=ROUNDS.length){ q.textContent="Two arpeggios swept — arpeggiare achieved! \u{1F3B5}"; return; }
    k=0;
    q.innerHTML=`Sweep a <b>${ROUNDS[r].name}</b> — chord tones one after another, past the octave. Start on <b>${ROUNDS[r].names[0]}</b>.`;
  }
  Keyboard.create(kh,{start:55,octaves:2,labels:true,
    onKey:m=>{
      const R=ROUNDS[r]; if(!R) return;
      if(m===R.pcs[k]){
        k++;
        if(k>=R.pcs.length){ MFAudio.yay();
          fb(true,`✓ ${R.name} — the chord stretched into a glittering line, an octave and beyond.`);
          r++; setTimeout(ask,1400); }
        else q.innerHTML=`Good — next: <b>${R.names[k]}</b>.`;
      } else { MFAudio.tone(40,.2); fb(false,"Chord tones only, in rising order — root, 3rd, 5th, root again…"); }
    }});
  ask();
}

LESSON_CONTENT[65]={
  welcome:"Same chords, new sparkle: today we un-stack the snowman. \u{1F3B5}",
  hook:{
    say:"One C major chord, three costumes. <b>Which one sounds like a HARP?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Costume 1</button>
          <button class="play hk-b">▶ Costume 2</button>
          <button class="play hk-c">▶ Costume 3</button></div>
          <div class="choices hk-ch" style="display:none"><button>Costume 3 — notes rippling upward one by one</button><button>Costume 1 — all at once is harp-like</button><button>Costume 2 — bouncing is the harp sound</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let heard=new Set();
        const show=()=>{ if(heard.size>=3) setTimeout(()=>ch.style.display="",2200); };
        container.querySelector(".hk-a").onclick=()=>{ [60,64,67].forEach(m=>MFAudio.tone(m,1.3,0,.33)); heard.add(1); show(); };
        container.querySelector(".hk-b").onclick=()=>{ [60,67,64,67].forEach((m,i)=>MFAudio.tone(m,.5,i*.42,.38)); heard.add(2); show(); };
        container.querySelector(".hk-c").onclick=()=>{ [60,64,67,72,76].forEach((m,i)=>MFAudio.tone(m,.5,i*.38,.38)); heard.add(3); show(); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Costume 3 was an ARPEGGIO — from Italian arpeggiare, 'to play upon a harp': chord tones in sequence, sweeping past the octave. Costume 1 was a BLOCK chord, costume 2 a BROKEN chord. Today: all three textures!");
          else fb(false,"A harp's strings ripple one after another, in order, climbing…");
        });
      } }
  },
  objectives:[
    "Define block chord: chord tones played together",
    "Define broken chord: chord tones NOT played together",
    "Define arpeggio: chord tones in sequence — 'to play upon a harp'",
    "Extend arpeggios an octave or more",
    "See how arpeggiated accompaniments outline the chords",
    "Know that a repeated chord's symbol isn't re-written"
  ],
  steps:[
    { say:"Two words, one difference: play a chord's notes <b>together</b> and it's a <b>BLOCK CHORD</b>; play them <b>not together</b> and it's a <b>BROKEN CHORD</b>. Same notes, different delivery. \u{1F447} <b>What changes between block and broken?</b>",
      show:{ type:"staff", spec:{clef:"bass",tempo:80,time:"4/4",notes:[
        {p:"C3",d:"q",label:"block"},{p:"E3",d:"q",chord:true},{p:"G3",d:"q",chord:true},
        {p:"C3",d:"q",label:"broken…"},{p:"G3",d:"q"},{p:"E3",d:"q"},{bar:"final"}],width:420} },
      try:{ type:"mc", choices:["Only the TIMING — the notes are identical","The notes themselves","The key"], answer:0,
        success:"✓ C-E-G either way. Texture is about WHEN, not WHAT.",
        fail:"Compare the letters in both halves of the staff…",
        hint:"Same snowman, different schedule." } },
    { say:"The star of the day: when chord tones are played <b>sequentially, one after the other</b>, that's an <b>ARPEGGIO</b> — Italian <i>arpeggiare</i>, <b>\u{201C}to play upon a harp.\u{201D}</b> And it <b>may be extended an octave or more</b>. \u{1F447} <b>What separates an arpeggio from any broken chord?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:100,notes:[
        {p:"C4",d:"8"},{p:"E4",d:"8"},{p:"G4",d:"8"},{p:"C5",d:"8"},{p:"E5",d:"8"},{p:"G5",d:"8"},{p:"C6",d:"q"},{bar:"final"}],
        beams:[[0,1],[2,3],[4,5]],width:460} },
      try:{ type:"mc", choices:["Its tones run in ORDER, often past the octave","It uses different notes than the chord","It's always slower"], answer:0,
        success:"✓ Sequential and sweeping — root, 3rd, 5th, root, 3rd… as far as your hands (or harp) can reach.",
        fail:"Think of the harp image: strings brushed one after another…",
        hint:"Broken = apart; arpeggio = apart AND in sequence." } },
    { say:"Train your ear on the three textures. \u{1F447}",
      try:{ type:"custom",
        hint:"Together = block; taking turns = broken; climbing in order = arpeggio.",
        mount:(container,fb)=>MF_L65_ear(container,fb) } },
    { say:"Why bother? ACCOMPANIMENT. Under a melody, an arpeggiated left hand <b>outlines each chord in root position</b> — harmony AND motion at once. The book's German lullaby does exactly this. \u{1F447} <b>An arpeggiated accompaniment gives you…</b>",
      try:{ type:"mc", choices:["The chord's harmony plus a gentle flowing motion","Louder chords","A different set of chords"], answer:0,
        success:"✓ Same I-IV-V toolkit as Lesson 64, but liquid instead of solid — the lullaby texture.",
        fail:"What does rippling add that a solid block doesn't have?",
        hint:"Think of what a lullaby needs." } },
    { say:"Score-reading detail from the book: <b>when a chord repeats in the following measures, its symbol is NOT written again</b> — no news is good news. \u{1F447} <b>Measure 2 has no chord symbol. What do you play?</b>",
      try:{ type:"mc", choices:["The same chord as the previous measure","No chord at all","The I chord automatically"], answer:0,
        success:"✓ A missing symbol means 'carry on.' Chord charts stay clean this way.",
        fail:"Would writers really re-stamp the same chord every bar?",
        hint:"Silence = repetition." } },
    { say:"Sweep them yourself — two arpeggios, past the octave. \u{1F447}",
      try:{ type:"custom",
        hint:"Root → 3rd → 5th → root → 3rd, always climbing.",
        mount:(container,fb)=>MF_L65_build(container,fb) } },
    { say:"Spot-check: here's a bass line from an accompaniment. \u{1F447} <b>Which chord does it outline?</b>",
      show:{ type:"staff", spec:{clef:"bass",tempo:100,notes:[
        {p:"G2",d:"q"},{p:"B2",d:"q"},{p:"D3",d:"q"},{p:"G3",d:"q"},{bar:"final"}],width:340} },
      try:{ type:"mc", choices:["G major (G-B-D)","C major","E minor"], answer:0,
        success:"✓ G-B-D-G: a root-position G chord, unrolled into a line. Arpeggios ARE chords — just read them vertically in your head.",
        fail:"Stack the four notes into 3rds…",
        hint:"Collect the letters: G, B, D." } }
  ],
  examples:[
    { caption:"One chord, three textures: block (solid), broken (taking turns), arpeggio (sweeping past the octave). Watch the keyboard ripple on the last one.",
      staff:{clef:"treble",tempo:90,notes:[
        {p:"C4",d:"h",label:"block"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"C4",d:"q",label:"broken"},{p:"G4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},
        {p:"C4",d:"8",label:"arpeggio"},{p:"E4",d:"8"},{p:"G4",d:"8"},{p:"C5",d:"8"},{p:"E5",d:"q"},{bar:"final"}],
        beams:[[7,8],[9,10]],width:620},
      kb:{start:60,octaves:2,labels:true} },
    { caption:"A lullaby-style accompaniment: the bass arpeggiates I, then V, then I in root position — each measure's notes outline exactly one chord, just like the book's German lullaby.",
      staff:{clef:"bass",tempo:90,time:"3/4",notes:[
        {p:"C3",d:"q",label:"I"},{p:"E3",d:"q"},{p:"G3",d:"q"},{bar:true},
        {p:"G2",d:"q",label:"V"},{p:"B2",d:"q"},{p:"D3",d:"q"},{bar:true},
        {p:"C3",d:"q",label:"I"},{p:"E3",d:"q"},{p:"G3",d:"q"},{bar:"final"}],width:560},
      kb:{start:43,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Texture-Term Sprint (45s)",
      intro:"Block, broken, arpeggio — race the definitions and the Italian!",
      miaIntro:"Arpeggiare — say it with flair! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Block chord","chord tones played together"],
        ["Broken chord","chord tones NOT played together"],
        ["Arpeggio","chord tones in sequence, one after another"],
        ["Arpeggiare","Italian: 'to play upon a harp'"],
        ["An arpeggio's range","may extend an octave or more"],
        ["Repeated chord in a chart","symbol not written again"],
        ["Arpeggiated accompaniment","outlines each chord as a flowing line"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — texture vocabulary secured!":null },
    { type:"key-climb", title:"Game 2 · Grand Arpeggio Sweep",
      intro:"Sweep C major over TWO octaves — up like a harpist's glissando!",
      miaIntro:"Root-3rd-5th, rinse and rise! \u{1FA9C}",
      spec:{seq:[60,64,67,72,76,79,84],
        names:["C","E","G","C (octave 1!)","E","G","C (octave 2!)"],
        start:60, octaves:2, title:"C major arpeggio, two octaves up"},
      result:(score)=>score!==null?"A true harp sweep — arpeggio royalty!":null },
    { type:"symbol-hunt", title:"Game 3 · Texture Spotter",
      intro:"Block, broken and arpeggio in NOTATION — click what's called!",
      miaIntro:"Stacked or strung out? \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Block chord", spec:{clef:"treble",notes:[{p:"C4",d:"h"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true}],width:150}},
        {label:"Broken chord", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"G4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"}],width:170}},
        {label:"Arpeggio (rising)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"C5",d:"q"}],width:170}},
        {label:"Scale (not a chord!)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"}],width:170}}]},
      result:(score)=>score>=5?"No texture disguises itself from you!":null },
    { type:"term-race", title:"Game 4 · Outline Detective Race",
      intro:"Arpeggiated lines fly by as text — name the chord each outlines!",
      miaIntro:"Stack the letters in your head! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["C-E-G-C rising","outlines the C major chord"],
        ["G-B-D-G rising","outlines the G major chord"],
        ["F-A-C-F rising","outlines the F major chord"],
        ["A-C-E-A rising","outlines the A minor chord"],
        ["G-B-D-F rising","outlines the G7 chord"],
        ["D-F-A-D rising","outlines the D minor chord"],
        ["Block chord","all tones at once"],
        ["Arpeggio","tones in rising (or falling) order"]]},
      result:(score)=>score>=6?"Outlines read like large print!":null }
  ],
  practiceIntro:"20 practice questions — textures, the Italian, and outline-reading. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Block chord","notes together"],["Broken chord","notes apart"],["Arpeggio","notes in sequence"],["Arpeggiare","to play upon a harp"],["Octave or more","how far an arpeggio may extend"]], reverse:true}, count:6 },
    { gen:"triad-id", params:{}, count:3 },
    { type:"mc", q:"When the notes of a chord are played together, it is called a…", choices:["block chord","broken chord","cluster"], answer:0,
      explain:"Solid, vertical, all-at-once (AEMT3 p.103)." },
    { type:"mc", q:"When they are NOT played together, it is called a…", choices:["broken chord","block chord","rest"], answer:0,
      explain:"Same tones, spread over time." },
    { type:"mc", q:"An arpeggio plays chord tones…", choices:["sequentially, one after another","all at once","in random order"], answer:0,
      explain:"The defining word is SEQUENTIALLY." },
    { type:"mc", q:"The word arpeggio comes from Italian arpeggiare, meaning…", choices:["to play upon a harp","to break apart","to hurry"], answer:0,
      explain:"The harp's ripple, borrowed by every instrument." },
    { type:"mc", q:"An arpeggio may be extended…", choices:["an octave or more","only five notes","never past the 5th"], answer:0,
      explain:"Sweep as far as the instrument allows." },
    { type:"mc", q:"The rising bass line F-A-C-F outlines which chord?", choices:["F major","C major","D minor"], answer:0,
      explain:"F-A-C stacked = F major, root position." },
    { type:"truefalse", q:"Block and broken chords contain different notes.", answer:false,
      explain:"Identical notes — only the timing differs." },
    { type:"truefalse", q:"When a chord repeats in the next measure, its symbol is written again.", answer:false,
      explain:"No symbol = same chord continues." },
    { type:"truefalse", q:"Arpeggiated accompaniments outline the chords of the harmony.", answer:true,
      explain:"A chord unrolled is still that chord." },
    { type:"truefalse", q:"Every broken chord is an arpeggio.", answer:false,
      explain:"Arpeggios are the SEQUENTIAL kind of broken chord." }
  ],
  miaQuizIntro:"Quiz! Solid, scattered, or sweeping — you'll know each on sight and sound.",
  quiz:[
    { type:"mc", q:"A BLOCK chord is played…", choices:["with all notes together","one note at a time","with the melody only"], answer:0,
      explain:"The vertical wall.", hint:"Think 'building block'." },
    { type:"mc", q:"A BROKEN chord is played…", choices:["with its notes not together","with wrong notes","without the root"], answer:0,
      explain:"Same tones, spread out.", hint:"Broken apart in TIME." },
    { type:"mc", q:"An ARPEGGIO plays the chord tones…", choices:["sequentially, one after the other","simultaneously","backwards only"], answer:0,
      explain:"The harp sweep.", hint:"Arpeggiare!" },
    { type:"mc", q:"Arpeggiare means…", choices:["to play upon a harp","to march","to whisper"], answer:0,
      explain:"Italy named the ripple.", hint:"The instrument with 47 strings." },
    { type:"truefalse", q:"An arpeggio may extend an octave or more.", answer:true,
      explain:"Sweeps love to climb.", hint:"How far did Game 2 go?" },
    { type:"truefalse", q:"When a chord is repeated in following measures, the chord symbol must be repeated too.", answer:false,
      explain:"The book: it is NOT necessary.", hint:"Clean charts." },
    { type:"mc", q:"Identify the texture.",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"C5",d:"q"}],width:280},
      choices:["A rising arpeggio (C major)","A block chord","A scale"], answer:0,
      explain:"Chord tones in order = arpeggio.", hint:"Are these steps or skips?" },
    { type:"mc", q:"Identify the texture.",
      staff:{clef:"treble",notes:[{p:"F4",d:"h"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true}],width:220},
      choices:["A block chord (F major)","A broken chord","An arpeggio"], answer:0,
      explain:"Stacked and simultaneous.", hint:"One stem, one moment." },
    { type:"mc", q:"This accompaniment bass plays G-B-D-G. The harmony is…", choices:["the V chord in C major (G major)","the I chord in C major","the IV chord"], answer:0,
      explain:"G-B-D = G major = V of C.", hint:"Stack, then place in the key." },
    { type:"mc", q:"Why do lullabies love arpeggiated accompaniment?", choices:["Gentle, continuous motion instead of solid strikes","It's louder","It changes the melody"], answer:0,
      explain:"The rocking ripple — the book's German lullaby is the model.", hint:"What rocks a cradle?" },
    { type:"mc", q:"Which is true of block vs broken chords?", choices:["Same notes, different timing","Different notes, same timing","Nothing in common"], answer:0,
      explain:"Texture ≠ content.", hint:"The step-1 discovery." },
    { type:"mc", q:"A pianist sees the symbol 'C' over measure 1 and nothing over measure 2. Measure 2's harmony is…", choices:["still C major","silence","automatically G7"], answer:0,
      explain:"No new symbol = carry on.", hint:"The score-reading rule." },
    /* generated */
    { gen:"term-match", params:{subject:"term", pool:[["Block","together"],["Broken","apart"],["Arpeggio","in sequence"],["Arpeggiare","play upon a harp"]], reverse:true}, count:3 },
    { gen:"triad-id", params:{}, count:2 },
    { gen:"inversion-id", params:{subject:"triad", ask:"position"}, count:1 }
  ],
  vocabulary:[
    {term:"Block Chord", def:"All chord tones played together — solid and vertical.",
      staff:{clef:"treble",notes:[{p:"C4",d:"h"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true}],width:130}},
    {term:"Broken Chord", def:"Chord tones NOT played together — spread over time.",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"G4",d:"q"},{p:"E4",d:"q"}],width:130}},
    {term:"Arpeggio", def:"Chord tones played sequentially, one after another — may extend an octave or more. From arpeggiare, 'to play upon a harp.'",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"C5",d:"q"}],width:130}},
    {term:"Arpeggiated Accompaniment", def:"A flowing accompaniment whose arpeggios outline each chord of the harmony."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Block chord</b> = tones together; <b>broken chord</b> = tones apart.",
    "✔ <b>Arpeggio</b> = tones in SEQUENCE — <i>arpeggiare</i>, 'to play upon a harp' — extendable <b>an octave or more</b>.",
    "✔ Arpeggiated accompaniments <b>outline the chords</b> in root position while adding motion.",
    "✔ A repeated chord's <b>symbol is not re-written</b>.",
    "✔ Texture changes the delivery, <b>never the harmony</b>."
  ],
  tips:[
    "Reading trick: when a bass line skips (not steps), try stacking its notes — you're probably looking at an unrolled chord.",
    "Alberti bass — the classical pattern low-high-middle-high (C-G-E-G) — is history's most famous broken chord. Mozart built careers on it.",
    "Play yesterday's harmonized scale again, but arpeggiate every chord: instant lullaby.",
    "Next lesson: the melody itself gets decorated — passing tones and neighbors that don't belong to the chord (on purpose!)."
  ],
  rewards:{ badge:"Harp Whisperer", icon:"\u{1F3B5}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"PERFECT! Solid, scattered or sweeping — chords obey you in every texture. \u{1F3B5}\u{1F389}",
  miaPass:"Passed! Your chords have learned to ripple. Now let's decorate the melody…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Costume 1 = block (together), 2 = broken (taking turns), 3 = arpeggio — sequential, past the octave, the harp's signature.",
      play:()=>{[60,64,67,72,76].forEach((m,i)=>MFAudio.tone(m,.5,i*.36,.38));} },
    learn:{ label:"chord textures",
      explain:"Block = together; broken = apart; arpeggio = apart AND in sequence, an octave or more. Accompaniments arpeggiate to add motion; repeated chords don't repeat their symbol.",
      hint:"Together / apart / in-order-apart.",
      play:()=>{[60,64,67].forEach(m=>MFAudio.tone(m,.9,0,.3));[60,64,67,72].forEach((m,i)=>MFAudio.tone(m,.45,1.1+i*.32,.36));} },
    example:{ label:"the examples",
      explain:"Example 1 dresses one chord three ways; example 2 is a lullaby-style bass arpeggiating I-V-I." },
    game:{ label:"the games",
      explain:"Sprint the terms, sweep two octaves, spot textures in notation, then decode outlined chords.",
      hint:"Skips in a line usually spell a chord." },
    quiz:{ label:"this question",
      explain:"Two axes: WHAT (the chord — stack the letters) and HOW (block/broken/arpeggio — the timing).",
      play:()=>{[55,59,62,67].forEach((m,i)=>MFAudio.tone(m,.5,i*.35,.38));} }
  }
};
