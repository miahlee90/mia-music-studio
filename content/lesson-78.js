/* Lesson 78 — Syncopation (Book 4, Unit 19 — SELF-AUTHORED)
   Core: SYNCOPATION = accent shifted to a weak beat or off-beat. Made by
   off-beat accents, by TIES holding through strong beats, and by RHYTHMIC
   ANTICIPATION (a note arriving just before the beat). The 3+3+2 pattern.
   (A melodic non-harmonic tone also called "anticipation" appears later in
   the harmony lessons — this lesson's anticipation is purely rhythmic.)
   NOTE: edit by FULL-FILE REWRITE only. */

/* ear lab: straight rhythm vs syncopated rhythm */
function MF_L78_ear(container,fb){
  const ROUNDS=[1,0,1,0].sort(()=>Math.random()-.5); /* 1 = syncopated */
  let r=0, played=false;
  container.innerHTML=`<div class="big-q l78e-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l78e-play">▶ Play the rhythm</button></div>
    <div class="choices l78e-ch" style="display:none"><button>On the beat — no syncopation</button><button>Syncopated — accents between the beats</button></div>`;
  const q=container.querySelector(".l78e-q"), pl=container.querySelector(".l78e-play"), ch=container.querySelector(".l78e-ch");
  pl.onclick=()=>{
    if(r>=ROUNDS.length) return;
    const sync=ROUNDS[r]===1;
    for(let b=0;b<4;b++) MFAudio.tone(48,.22,b*.5,.34);
    if(sync){ [0,.75,1.25,1.75,2.5,3.25].forEach(t=>MFAudio.tone(76,.16,t,.3)); }
    else { [0,.5,1,1.5,2,2.5,3,3.5].forEach(t=>MFAudio.tone(76,.13,t,.24)); }
    played=true; setTimeout(()=>ch.style.display="",2500);
  };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(!played) return;
    const sync=ROUNDS[r]===1;
    if((i===1)===sync){ fb(true,sync?"✓ The melody notes landed BETWEEN the low beats — syncopation.":"✓ Every melody note landed ON a beat — no syncopation."); r++; played=false; ch.style.display="none";
      if(r>=ROUNDS.length){ q.textContent="Excellent! You hear syncopation instantly."; pl.style.display="none"; } else q.innerHTML=`Round ${r+1} of ${ROUNDS.length}: listen, then decide.`;
    } else { MFAudio.tone(40,.2); fb(false,"Compare the high notes with the low beats — do they line up or land between?"); }
  });
  q.innerHTML="Round 1 of 4: listen, then decide.";
}

LESSON_CONTENT[78]={
  welcome:"Syncopation: accents that land between the beats. \u{1F941}",
  hook:{
    say:"<b>Two versions of one rhythm.</b> In one, every note lands on a beat; in the other, the accents slide between the beats. \u{1F447} <b>Which version is syncopated?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Version A</button>
          <button class="play hk-b">▶ Version B</button></div>
          <div class="choices hk-ch" style="display:none"><button>Version B — its accents land between the beats</button><button>Version A — on-the-beat playing is syncopation</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ for(let b=0;b<4;b++){ MFAudio.tone(48,.22,b*.5,.34); MFAudio.tone(76,.15,b*.5,.28); } hA=true; if(hB) setTimeout(()=>ch.style.display="",2300); };
        container.querySelector(".hk-b").onclick=()=>{ for(let b=0;b<4;b++) MFAudio.tone(48,.22,b*.5,.34); [0,.75,1.25,2,2.75,3.25].forEach(t=>MFAudio.tone(76,.16,t,.3)); hB=true; if(hA) setTimeout(()=>ch.style.display="",2300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Version B accented the OFF-beats — the spaces between the pulse. That shifted accent is SYNCOPATION, the engine of jazz, pop, and Latin rhythm. Today's lesson!");
          else fb(false,"Version A matched the pulse exactly. Listen for accents that land BETWEEN the low beats…");
        });
      } }
  },
  objectives:[
    "Define syncopation: accents shifted to weak beats or off-beats",
    "Accent the off-beat (the '&') on purpose",
    "Create syncopation with TIES that hold through a strong beat",
    "Define rhythmic anticipation: arriving just before the beat",
    "Read and clap the 3+3+2 pattern",
    "Hear syncopated vs on-the-beat rhythms"
  ],
  steps:[
    { say:"<b>Syncopation:</b> Syncopation places the <b>accent on a weak beat or between the beats</b> — where the ear does not expect it. The steady pulse continues underneath; the rhythm plays against it. \u{1F447} <b>What is syncopation?</b>",
      try:{ type:"mc", choices:["An accent shifted to a weak beat or off-beat","Playing faster than the tempo","Removing the beat entirely"], answer:0,
        success:"✓ The pulse stays steady; the ACCENT moves against it.",
        fail:"The tempo never changes…",
        hint:"Where does the accent land?" } },
    { say:"<b>Off-beat Accents:</b> the simplest syncopation accents the <b>\u{201C}&\u{201D}</b> — the second half of each beat. Count \u{201C}1 & 2 & 3 & 4 &\u{201D} and stress the <b>&</b>. \u{1F447} <b>In \u{201C}1 & 2 & 3 & 4 &\u{201D}, which syllables are the off-beats?</b>",
      show:{ type:"staff", spec:{clef:"treble",time:"4/4",tempo:88,notes:[
        {rest:"8"},{p:"G4",d:"8",artic:"accent"},{rest:"8"},{p:"G4",d:"8",artic:"accent"},
        {rest:"8"},{p:"G4",d:"8",artic:"accent"},{rest:"8"},{p:"G4",d:"8",artic:"accent"},{bar:"final"}],width:460} },
      try:{ type:"mc", choices:["The '&'s — between the numbered beats","The numbers 1 and 3","Only beat 4"], answer:0,
        success:"✓ The &'s sit exactly between the beats — accenting them creates instant syncopation.",
        fail:"The numbers ARE the beats…",
        hint:"Between the numbers." } },
    { say:"<b>Ties Create Syncopation:</b> when a note starts on an off-beat and a <b>tie holds it through the next strong beat</b>, the strong beat passes silently — the accent has moved early. \u{1F447} <b>Why does this measure sound syncopated?</b>",
      show:{ type:"staff", spec:{clef:"treble",time:"4/4",tempo:84,notes:[
        {p:"E4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"q"},{p:"G4",d:"8"},{p:"C5",d:"8"},{p:"C5",d:"q"},{bar:"final"}],
        beams:[[0,1],[3,4]],arcs:[{from:1,to:2,type:"tie"},{from:4,to:5,type:"tie"}],width:460} },
      try:{ type:"mc", choices:["The tied notes start off the beat and hold through the strong beat","The notes are too long","Ties always mean silence"], answer:0,
        success:"✓ Beats 2 and 4 arrive during held notes — the attack came early, on the off-beat.",
        fail:"Where do the tied notes BEGIN?",
        hint:"Attack on the &, hold through the beat." } },
    { say:"<b>Rhythmic Anticipation:</b> a note that belongs on the next beat <b>arrives just before it</b> — usually a half beat early — and holds. Pop and jazz melodies anticipate constantly. (A melody tone called <i>anticipation</i> also appears in harmony lessons later — that one is about pitch; this one is purely rhythm.) \u{1F447} <b>A rhythmic anticipation arrives…</b>",
      try:{ type:"mc", choices:["Just before the beat it belongs to","Exactly on the beat","One full measure late"], answer:0,
        success:"✓ Early arrival + hold = anticipation, one of pop music's signature sounds.",
        fail:"Anticipate = act early…",
        hint:"Before, not after." } },
    { say:"<b>The 3+3+2 Pattern:</b> eight eighth notes grouped <b>3+3+2</b> put accents on 1, the 'a' of 2, and 4 — a built-in syncopation used worldwide, from Latin dance to rock. <b>Remember: syncopation = steady pulse + shifted accent.</b> \u{1F447} <b>Where do the 3+3+2 accents fall?</b>",
      show:{ type:"staff", spec:{clef:"treble",time:"4/4",tempo:92,notes:[
        {p:"C5",d:"8",artic:"accent"},{p:"G4",d:"8"},{p:"G4",d:"8"},
        {p:"C5",d:"8",artic:"accent"},{p:"G4",d:"8"},{p:"G4",d:"8"},
        {p:"C5",d:"8",artic:"accent"},{p:"G4",d:"8"},{bar:"final"}],
        beams:[[0,2],[3,5],[6,7]],width:480} },
      try:{ type:"mc", choices:["At the start of each group: notes 1, 4 and 7","On every eighth note","Only on the last note"], answer:0,
        success:"✓ Accents on 1, 4 and 7 of the eight eighths — the 3+3+2 shape.",
        fail:"Each beamed group starts with its accent…",
        hint:"Count the group starts." } },
    { say:"Listen: on the beat, or syncopated? \u{1F447}",
      try:{ type:"custom",
        hint:"Compare the melody attacks with the low pulse.",
        mount:(container,fb)=>MF_L78_ear(container,fb) } },
    { say:"<b>Review:</b> \u{1F447} <b>Which of these creates syncopation?</b>",
      try:{ type:"mc", choices:["A tie holding an off-beat note through the next strong beat","A whole note on beat 1","A rest at the end of a measure"], answer:0,
        success:"✓ The held off-beat attack shifts the accent — syncopation.",
        fail:"Which option moves an accent off the beat?",
        hint:"Think of step 3." } }
  ],
  examples:[
    { caption:"On-the-beat, then syncopated: the same melody twice — first plain, then with tied off-beat attacks. Listen for the accents sliding between the beats.",
      staff:{clef:"treble",time:"4/4",tempo:88,notes:[
        {p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"E4",d:"q"},{bar:"single"},
        {p:"C4",d:"8"},{p:"E4",d:"8"},{p:"E4",d:"q"},{p:"G4",d:"8"},{p:"E4",d:"8"},{p:"E4",d:"q"},{bar:"final"}],
        beams:[[5,6],[8,9]],arcs:[{from:6,to:7,type:"tie"},{from:9,to:10,type:"tie"}],width:640},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"The 3+3+2 pattern over a steady bass: three, three, then two — the accents make the groove, not the tempo.",
      staff:{clef:"treble",time:"4/4",tempo:96,notes:[
        {p:"E4",d:"8",artic:"accent"},{p:"E4",d:"8"},{p:"E4",d:"8"},
        {p:"G4",d:"8",artic:"accent"},{p:"G4",d:"8"},{p:"G4",d:"8"},
        {p:"C5",d:"8",artic:"accent"},{p:"C5",d:"8"},{bar:"single"},
        {p:"C4",d:"h"},{p:"C4",d:"h"},{bar:"final"}],
        beams:[[0,2],[3,5],[6,7]],width:640},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Syncopation Sprint (45s)",
      intro:"Off-beats, ties, anticipations — race the facts!",
      miaIntro:"Accent the &! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Syncopation","an accent shifted off the strong beat"],
        ["The off-beat","the '&' between beats"],
        ["Tie syncopation","attack early, hold through the beat"],
        ["Rhythmic anticipation","arriving just before the beat"],
        ["3+3+2","a built-in syncopated grouping"],
        ["The pulse during syncopation","stays steady"],
        ["Off-beat accent count","1 & 2 & — stress the &"],
        ["Syncopation's home styles","jazz, pop, Latin, rock"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — syncopation certified!":null },
    { type:"symbol-hunt", title:"Game 2 · Spot the Syncopation",
      intro:"Rhythm cards — click the one each round names!",
      miaIntro:"Watch for ties and off-beat starts! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"On-the-beat quarters", spec:{clef:"treble",time:"2/4",notes:[{p:"G4",d:"q"},{p:"G4",d:"q"}],width:150}},
        {label:"Tie syncopation", spec:{clef:"treble",time:"2/4",notes:[{p:"G4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"q"}],beams:[[0,1]],arcs:[{from:1,to:2,type:"tie"}],width:170}},
        {label:"Off-beat accents", spec:{clef:"treble",time:"2/4",notes:[{rest:"8"},{p:"G4",d:"8",artic:"accent"},{rest:"8"},{p:"G4",d:"8",artic:"accent"}],width:170}},
        {label:"3+3+2 grouping", spec:{clef:"treble",time:"4/4",notes:[{p:"B4",d:"8",artic:"accent"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8",artic:"accent"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8",artic:"accent"},{p:"B4",d:"8"}],beams:[[0,2],[3,5],[6,7]],width:240}}]},
      result:(score)=>score>=5?"Syncopation spotted on sight!":null },
    { type:"order-tap", title:"Game 3 · Build the Definition",
      intro:"Tap the chain that creates syncopation, in order!",
      miaIntro:"Pulse first, shift second! \u{1F3C1}",
      spec:{sequence:["Keep the pulse steady","Attack on an off-beat","Hold through the strong beat","The accent has shifted — syncopation"],
        title:"How syncopation happens"},
      result:(stars)=>stars>=2?"The recipe for groove, in order!":null },
    { type:"term-race", title:"Game 4 · Where's the Accent?",
      intro:"Name where each device puts its accent — at speed!",
      miaIntro:"Find the landing spot! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Off-beat accent","on the '&'"],
        ["Tie through beat 3","accent arrives before beat 3"],
        ["Rhythmic anticipation","half a beat early"],
        ["3+3+2 accents","on eighths 1, 4 and 7"],
        ["Unsyncopated rhythm","accents on the numbered beats"],
        ["The backbeat (pop drums)","beats 2 and 4"],
        ["Syncopation needs","a steady pulse underneath"],
        ["Strong beats in 4/4","1 and 3"]]},
      result:(score)=>score>=6?"Every accent tracked!":null }
  ],
  practiceIntro:"20 practice questions — off-beats, ties and anticipations. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Syncopation","shifted accent"],["Off-beat","the '&'"],["Tie syncopation","hold through the strong beat"],["Anticipation","arrive early"],["3+3+2","syncopated grouping"]], reverse:true}, count:6 },
    { gen:"rhythm-count", params:{}, count:2 },
    { type:"mc", q:"Syncopation shifts the accent to…", choices:["a weak beat or off-beat","the downbeat","the barline"], answer:0,
      explain:"Against the expected pulse." },
    { type:"mc", q:"In '1 & 2 & 3 & 4 &', the off-beats are…", choices:["the &'s","the odd numbers","the even numbers"], answer:0,
      explain:"Between the numbered beats." },
    { type:"mc", q:"A tie creates syncopation when it…", choices:["holds an off-beat note through a strong beat","connects two downbeats","shortens a note"], answer:0,
      explain:"The strong beat passes inside the held note." },
    { type:"mc", q:"A rhythmic anticipation arrives…", choices:["just before its beat","exactly on its beat","after its beat"], answer:0,
      explain:"Early arrival, then hold." },
    { type:"truefalse", q:"During syncopation, the underlying pulse stays steady.", answer:true,
      explain:"The rhythm plays against a steady pulse." },
    { type:"truefalse", q:"The 3+3+2 pattern accents eighth notes 1, 4 and 7.", answer:true,
      explain:"The start of each group." },
    { type:"truefalse", q:"Accenting beats 1 and 3 in 4/4 creates syncopation.", answer:false,
      explain:"Those ARE the strong beats — no shift." },
    { gen:"term-match", params:{subject:"term", pool:[["Strong beats (4/4)","1 and 3"],["Backbeat","2 and 4"],["The '&'","the off-beat"],["Steady pulse","syncopation's foundation"]], reverse:true}, count:3 },
    { gen:"note-value", params:{}, count:2 }
  ],
  vocabulary:[
    {term:"Syncopation", def:"An accent shifted to a weak beat or off-beat while the pulse stays steady."},
    {term:"Off-beat", def:"The space between beats — the '&' when counting '1 & 2 &'."},
    {term:"Rhythmic Anticipation", def:"A note that arrives just before the beat it belongs to and holds through it."},
    {term:"3+3+2", def:"Eight eighth notes grouped three-three-two — accents on 1, 4 and 7. A built-in syncopation."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Syncopation</b> = accent on a <b>weak beat or off-beat</b>; the pulse never moves.",
    "✔ Three tools: <b>off-beat accents</b>, <b>ties through strong beats</b>, <b>rhythmic anticipation</b>.",
    "✔ <b>Anticipation</b> arrives just <b>before</b> its beat and holds.",
    "✔ <b>3+3+2</b>: accents on eighths 1, 4, 7 — groove by grouping.",
    "✔ Jazz, pop, Latin and rock are built on these shifts."
  ],
  tips:[
    "Practice trick: tap the pulse with your foot and clap only the &'s — when it stops feeling wrong, you own the off-beat.",
    "In pop vocals, almost every phrase-ending note anticipates the barline. Listen for it tonight.",
    "Write four measures of quarter notes, then tie each off-beat eighth into the next beat — instant syncopated version.",
    "Next lesson: meters that are THEMSELVES uneven — 5/4, 7/8 and changing meter."
  ],
  rewards:{ badge:"Off-Beat Operator", icon:"\u{1F941}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Steady pulse, shifted accent.",
  quiz:[
    { type:"mc", q:"What is syncopation?", choices:["An accent shifted to a weak beat or off-beat","A faster tempo","A missing measure"], answer:0,
      explain:"The pulse stays; the accent moves.", hint:"Where does the accent land?" },
    { type:"mc", q:"Which counting syllables mark the off-beats?", choices:["The &'s","The 1 and 3","The barlines"], answer:0,
      explain:"'1 & 2 &' — the &'s sit between beats.", hint:"Between the numbers." },
    { type:"mc", q:"How does a tie create syncopation?", choices:["An off-beat note holds through the next strong beat","Two downbeats connect","The note gets quieter"], answer:0,
      explain:"The strong beat passes inside the held note.", hint:"Attack early, hold." },
    { type:"mc", q:"A rhythmic anticipation…", choices:["arrives just before its beat and holds","arrives exactly on its beat","skips its beat entirely"], answer:0,
      explain:"Early arrival — pop music's habit.", hint:"Antici-PATE = early." },
    { type:"mc", q:"The 3+3+2 pattern contains how many eighth notes?", choices:["8","6","12"], answer:0,
      explain:"3+3+2 = 8 — one 4/4 measure of eighths.", hint:"Add the groups." },
    { type:"mc", q:"Where are the 3+3+2 accents?", choices:["Eighths 1, 4 and 7","Every eighth","Eighths 2, 4 and 6"], answer:0,
      explain:"The first note of each group.", hint:"Group starts." },
    { type:"mc", q:"Identify the rhythm.",
      staff:{clef:"treble",time:"2/4",notes:[{p:"G4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"q"}],beams:[[0,1]],arcs:[{from:1,to:2,type:"tie"}],width:200},
      choices:["Tie syncopation — the attack lands off the beat","Plain quarter notes","A triplet"], answer:0,
      explain:"The B starts on the '&' and holds through beat 2.", hint:"Follow the tie." },
    { type:"truefalse", q:"Syncopation requires the tempo to change.", answer:false,
      explain:"Only the accents move; the pulse is steady.", hint:"Pulse vs accent." },
    { type:"truefalse", q:"Accenting beats 2 and 4 in 4/4 (the backbeat) shifts weight off the strong beats.", answer:true,
      explain:"1 and 3 are the strong beats — 2 and 4 is a shift.", hint:"Strong beats are 1 and 3." },
    { type:"mc", q:"Which style list depends most on syncopation?", choices:["Jazz, pop, Latin and rock","Slow chant only","Metronome exercises"], answer:0,
      explain:"Shifted accents are the groove.", hint:"Think of dancing." },
    { type:"mc", q:"You hear melody attacks landing consistently between the low pulse beats. The rhythm is…", choices:["syncopated","on the beat","in free time"], answer:0,
      explain:"Between the beats = off-beat attacks.", hint:"The ear test." },
    { type:"mc", q:"The rhythmic anticipation and the harmony lesson's anticipation share a name. The RHYTHMIC one concerns…", choices:["timing — arriving early","pitch — a neighboring tone","dynamics — playing softer"], answer:0,
      explain:"Purely about WHEN the note arrives.", hint:"Rhythm = time." }
  ],
  miaPerfect:"PERFECT! Off-beats, ties, anticipations — the groove is yours. \u{1F941}\u{1F389}",
  miaPass:"Passed! Your accents land wherever you choose. Next: uneven meters…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Version A attacked on every beat; version B attacked between them — syncopation: a steady pulse with shifted accents.",
      play:()=>{for(let b=0;b<4;b++) MFAudio.tone(48,.22,b*.5,.34); [0,.75,1.25,2,2.75,3.25].forEach(t=>MFAudio.tone(76,.16,t,.3));} },
    learn:{ label:"syncopation",
      explain:"Accent shifted to weak beats/off-beats; made by off-beat accents, ties through strong beats, and rhythmic anticipation; 3+3+2 = built-in syncopation.",
      hint:"Steady pulse + shifted accent.",
      play:()=>{for(let b=0;b<2;b++) MFAudio.tone(48,.22,b*.5,.34); [0,.75].forEach(t=>MFAudio.tone(76,.16,t,.3));} },
    example:{ label:"the examples",
      explain:"Example 1 plays a melody plain, then with tied off-beat attacks; example 2 grooves the 3+3+2 pattern over a steady bass." },
    game:{ label:"the games",
      explain:"Sprint the facts, spot syncopation on cards, build the definition chain, then race the accent landing spots.",
      hint:"Ties + off-beats = shifted accents." },
    quiz:{ label:"this question",
      explain:"Ask one thing: did the accent move off the strong beat while the pulse stayed steady? If yes — syncopation.",
      play:()=>{for(let b=0;b<2;b++) MFAudio.tone(48,.22,b*.5,.34); MFAudio.tone(76,.16,.25,.3); MFAudio.tone(76,.16,.75,.3);} }
  }
};
