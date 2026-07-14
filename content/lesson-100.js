/* Lesson 100 — Ornaments (Book 4, Unit 25 — SELF-AUTHORED)
   Core: TRILL (rapid alternation with upper neighbor), MORDENT (single
   quick alternation; upper/lower), TURN (four-note loop around the note),
   GRACE NOTES (appoggiatura long / acciaccatura crushed).
   NOTE: edit by FULL-FILE REWRITE only. */

/* ornament ear lab */
function MF_L100_ear(container,fb){
  const play={
    trill:()=>{ for(let i=0;i<8;i++) MFAudio.tone(i%2?74:72,.09,i*.09,.34); MFAudio.tone(72,.5,.75,.4); return 1.4; },
    mord:()=>{ MFAudio.tone(72,.09,0,.36); MFAudio.tone(74,.09,.09,.34); MFAudio.tone(72,.7,.18,.42); return 1.0; },
    turn:()=>{ [74,72,71,72].forEach((m,i)=>MFAudio.tone(m,.12,i*.12,.36)); MFAudio.tone(72,.5,.5,.4); return 1.1; },
    grace:()=>{ MFAudio.tone(71,.07,0,.3); MFAudio.tone(72,.8,.07,.42); return 1.0; }};
  const NAME={trill:"Trill — rapid alternation",mord:"Mordent — one quick alternation",turn:"Turn — around the note",grace:"Grace note — crushed in"};
  const ROUNDS=["mord","trill","grace","turn"], KEY=["trill","mord","turn","grace"];
  let r=0, played=false;
  container.innerHTML=`<div class="big-q l100e-q" style="text-align:center">Round 1 of 4: listen, then name the ornament.</div>
    <div style="text-align:center"><button class="play l100e-play">▶ Play</button></div>
    <div class="choices l100e-ch" style="display:none"><button>Trill</button><button>Mordent</button><button>Turn</button><button>Grace note</button></div>`;
  const q=container.querySelector(".l100e-q"), pl=container.querySelector(".l100e-play"), ch=container.querySelector(".l100e-ch");
  pl.onclick=()=>{ const w=ROUNDS[r]; if(!w) return; const d=play[w](); played=true; setTimeout(()=>ch.style.display="",d*1000+300); };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(!played) return;
    if(KEY[i]===ROUNDS[r]){ fb(true,"✓ "+NAME[ROUNDS[r]]+"."); r++; played=false; ch.style.display="none";
      if(r>=ROUNDS.length){ q.textContent="Excellent! Every ornament named by ear."; pl.style.display="none"; } else q.innerHTML=`Round ${r+1} of 4: listen, then name the ornament.`;
    } else { MFAudio.tone(40,.2); fb(false,"Count the alternations: many = trill, one = mordent, a loop = turn, a crush = grace note."); }
  });
}

LESSON_CONTENT[100]={
  welcome:"Ornaments embellish melodic notes and gestures.",
  hook:{
    say:"<b>Listen to a sustained note and then to an ornamented version.</b> \u{1F447} <b>What does the ornament add?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Plain</button>
          <button class="play hk-b">▶ Decorated</button></div>
          <div class="choices hk-ch" style="display:none"><button>A rapid alternation between the written note and its upper neighbor</button><button>A completely unrelated melody</button><button>Nothing</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ MFAudio.tone(72,.9,.05,.42); hA=true; if(hB) setTimeout(()=>ch.style.display="",1400); };
        container.querySelector(".hk-b").onclick=()=>{ for(let i=0;i<8;i++) MFAudio.tone(i%2?74:72,.09,i*.09,.36); MFAudio.tone(72,.5,.75,.42); hB=true; if(hA) setTimeout(()=>ch.style.display="",1700); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Correct. A trill rapidly alternates between the written note and its upper neighbor. The ornament changes the musical surface while embellishing the underlying melodic note.");
          else fb(false,"The written note remains the structural focus. Listen to the neighboring pitch that alternates with it.");
        });
      } }
  },
  objectives:[
    "Define ornament: a decoration of a single melody note",
    "TRILL (tr): rapid alternation with the upper neighbor",
    "MORDENT: one quick alternation — upper or lower",
    "TURN: upper neighbor, note, lower neighbor, note",
    "GRACE NOTES: appoggiatura (leans) vs acciaccatura (crushed)",
    "Identify ornaments by symbol and by ear"
  ],
  steps:[
    { say:"<b>Performance-Practice Note:</b> The execution of ornaments varies according to historical period, musical style, tempo, instrument, composer, and edition. The patterns in this lesson provide common modern introductory interpretations, not universal rules.<br><br><b>Ornament:</b> An ornament embellishes a written note or melodic gesture by adding neighboring pitches, rhythmic activity, or expressive emphasis. Ornament symbols may appear above or below a note. Their interpretation depends on the symbol and the music's style and historical context. \u{1F447} <b>What does an ornament normally do?</b>",
      try:{ type:"mc", choices:["It embellishes a written note or melodic gesture","It replaces the complete formal structure","It changes the key automatically"], answer:0,
        success:"✓ Correct. An ornament changes the musical surface while preserving the underlying melodic function.",
        fail:"Compare the structural note with its ornamented realization.",
        hint:"The written note remains the focus of the embellishment." } },
    { say:"<b>The Trill (tr):</b> A trill is a rapid alternation between a written note and its upper neighboring note. It is indicated by 'tr,' sometimes followed by a wavy extension line. The alternation normally continues for much or all of the written note's duration. Its starting pitch, speed, and ending pattern depend on style and performance practice. The upper neighbor follows the key signature unless an accidental near the ornament indicates otherwise. \u{1F447} <b>Which neighboring pitch participates in a standard trill?</b>",
      try:{ type:"mc", choices:["The upper neighbor","The lower octave","The tonic in every key"], answer:0,
        success:"✓ Correct. A standard trill alternates the written pitch with its upper neighbor.",
        fail:"Compare the neighboring pitch with the written note.",
        hint:"The trill uses the note immediately above according to the key or indicated accidental." } },
    { say:"<b>The Mordent:</b> In common modern notation, a mordent is a brief ornament consisting of the written note, a neighboring note, and a return to the written note. An upper mordent uses the upper neighbor; a lower mordent uses the lower neighbor and is commonly shown with a vertical stroke through the symbol. Mordent terminology and symbol interpretation vary historically, so performers should consider the edition and musical style. \u{1F447} <b>How does a mordent normally differ from an extended trill?</b>",
      try:{ type:"mc", choices:["It usually consists of one brief main–neighbor–main figure","It spans two octaves","It never returns to the written note"], answer:0,
        success:"✓ Correct. A mordent is normally a brief three-note figure rather than an extended alternation.",
        fail:"Listen for a single brief movement to the neighbor and back.",
        hint:"Written note → neighbor → written note." } },
    { say:"<b>The Turn:</b> In a common modern realization, a turn circles the written note through four pitches: upper neighbor → written note → lower neighbor → written note. It is represented by a curved symbol resembling a sideways S. The rhythm and placement of these pitches depend on where the symbol appears and on stylistic context. Accidentals placed above or below the turn symbol may alter the upper or lower neighbor. \u{1F447} <b>Which pattern represents the common turn introduced in this lesson?</b>",
      try:{ type:"mc", choices:["Upper neighbor → written note → lower neighbor → written note","Written note → octave → written note","Lower neighbor → lower neighbor → upper neighbor"], answer:0,
        success:"✓ Correct. This common realization moves above the written note, returns to it, moves below it, and returns again.",
        fail:"Follow the motion around the written note.",
        hint:"Upper → main → lower → main." } },
    { say:"<b>Grace Notes:</b> Grace notes are written smaller than the principal notes. Their timing and duration depend on style and context. A notated appoggiatura is commonly shown as a small unslashed note. It normally receives perceptible duration, often borrowing time from the following principal note. An acciaccatura is commonly shown as a small note with a slash through its stem. It is performed very briefly before or at the beginning of the principal note, according to stylistic practice. <b>Remember — trill: repeated alternation with the upper neighbor · mordent: brief main–neighbor–main figure · turn: a pattern circling the written note · grace note: a small notated embellishing note.</b> \u{1F447} <b>How is an acciaccatura commonly performed?</b>",
      try:{ type:"mc", choices:["Very briefly before or at the beginning of the principal note, according to style","Always as exactly half the principal note's value","Always after the principal note ends"], answer:0,
        success:"✓ Correct. An acciaccatura is performed very briefly, but its exact placement depends on musical style and performance practice.",
        fail:"Distinguish the slashed acciaccatura from the unslashed appoggiatura.",
        hint:"The slashed grace note is normally very brief." } },
    { say:"Listen to each clearly presented ornament and identify its type. \u{1F447}",
      try:{ type:"custom",
        hint:"Listen for an extended alternation, a brief neighbor-and-return figure, a four-note turn, or a short grace note.",
        mount:(container,fb)=>MF_L100_ear(container,fb) } },
    { say:"<b>Review:</b> \u{1F447} <b>In the common realization taught here, which ornament follows the pattern upper neighbor → written note → lower neighbor → written note?</b>",
      try:{ type:"mc", choices:["Turn","Trill","Mordent"], answer:0,
        success:"✓ Correct. This four-note pattern is a common realization of a turn.",
        fail:"Identify the ornament that circles the written pitch.",
        hint:"Upper → main → lower → main." } }
  ],
  examples:[
    { caption:"Ornaments written out: a trill on C (C-D alternating), then a mordent (C-D-C), then a turn (D-C-B-C). Same main note, three decorations.",
      staff:{clef:"treble",tempo:112,notes:[
        {p:"C5",d:"8",label:"trill…"},{p:"D5",d:"8"},{p:"C5",d:"8"},{p:"D5",d:"8"},
        {p:"C5",d:"8",label:"mordent"},{p:"D5",d:"8"},{p:"C5",d:"q"},
        {p:"D5",d:"8",label:"turn"},{p:"C5",d:"8"},{p:"B4",d:"8"},{p:"C5",d:"q"},{bar:"final"}],
        beams:[[0,3],[4,5],[7,9]],width:640},
      kb:{start:69,octaves:1,labels:true} },
    { caption:"Grace notes in context: a crushed acciaccatura into the downbeat, then an appoggiatura that leans on the harmony before resolving.",
      staff:{clef:"treble",tempo:88,notes:[
        {p:"B4",d:"8",label:"crush"},{p:"C5",d:"q."},
        {p:"D5",d:"8",label:"lean…"},{p:"C5",d:"q."},{p:"C5",d:"q"},{bar:"final"}],
        beams:[[0,0]],width:440},
      kb:{start:69,octaves:1,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Ornament Identification (45s)",
      intro:"Match common ornament symbols with their introductory realizations.",
      miaIntro:"Compare the neighboring-note patterns.",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Trill","rapid alternation, upper neighbor"],
        ["Mordent","one quick alternation"],
        ["Turn","upper, note, lower, note"],
        ["Appoggiatura","leaning grace note — takes real time"],
        ["Acciaccatura","crushed grace note — slashed"],
        ["'tr' marking","trill"],
        ["Sideways S","turn"],
        ["Ornaments decorate","a single note"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?"Ornaments identified!":null },
    { type:"key-climb", title:"Game 2 · Perform a Turn",
      intro:"In C major, play a turn around C as D–C–B–C.",
      miaIntro:"Upper neighbor → main note → lower neighbor → main note.",
      spec:{seq:[62,60,59,60],
        names:["D (upper)","C (the note)","B (lower)","C (home)"],
        start:55, octaves:1, title:"A written-out turn"},
      result:(score)=>score!==null?"You performed the turn correctly.":null },
    { type:"order-tap", title:"Game 3 · Build the Turn",
      intro:"Arrange the four pitches of the indicated turn in order.",
      miaIntro:"Upper → main → lower → main.",
      spec:{sequence:["Upper neighbor","The main note","Lower neighbor","The main note again"],
        title:"The turn's path"},
      result:(stars)=>stars>=2?"You constructed the turn correctly.":null },
    { type:"term-race", title:"Game 4 · Which Ornament?",
      intro:"Match each description with the appropriate ornament.",
      miaIntro:"Compare the pitch pattern, duration, and notation.",
      spec:{rounds:8, reverse:true, pool:[
        ["Shimmers as long as the note","trill"],
        ["One fast bite","mordent"],
        ["Four-note orbit","turn"],
        ["Tiny slashed note","acciaccatura"],
        ["Small note taking real time","appoggiatura"],
        ["Lower mordent's mark","a vertical slash"],
        ["Trill's partner note","the upper neighbor"],
        ["All ornaments decorate","one note"]]},
      result:(score)=>score>=6?"You identified each ornament correctly.":null }
  ],
  practiceIntro:"Complete 20 practice questions on trills, mordents, turns, and grace notes.",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Trill","many alternations"],["Mordent","main–neighbor–main"],["Turn","the orbit"],["Acciaccatura","crushed"],["Appoggiatura","leans"]], reverse:true}, count:6 },
    { gen:"note-value", params:{}, count:2 },
    { type:"mc", q:"An ornament normally embellishes…", choices:["a written note or melodic gesture","the entire formal structure","the key signature"], answer:0, explain:"It adds surface detail to an underlying melodic event." },
    { type:"mc", q:"A standard trill alternates the written note with…", choices:["its upper neighbor","its lower octave","the tonic in every context"], answer:0, explain:"Rapidly, for much of the note's length." },
    { type:"mc", q:"A mordent normally consists of…", choices:["one brief main–neighbor–main figure","an extended continuous alternation","no neighboring motion"], answer:0, explain:"A brief main–neighbor–main figure." },
    { type:"mc", q:"In the common realization taught here, a turn follows which pattern?", choices:["Upper neighbor → main note → lower neighbor → main note","Four repetitions of the main note","Lower → upper → lower → upper"], answer:0, explain:"The orbit." },
    { type:"truefalse", q:"An acciaccatura is normally performed very briefly.", answer:true, explain:"Exact timing depends on style and context." },
    { type:"truefalse", q:"A notated appoggiatura normally receives perceptible duration, often borrowing time from the principal note.", answer:true, explain:"It leans before resolving." },
    { type:"truefalse", q:"A standard trill uses the upper neighbor of the written note.", answer:true, explain:"The trill uses the upper neighbor; its starting pitch is a separate, style-dependent matter." },
    { gen:"term-match", params:{subject:"term", pool:[["tr","trill"],["Sideways S","turn"],["Slash through stem","acciaccatura"],["Vertical slash on mordent","lower mordent"]], reverse:true}, count:3 },
    { gen:"step-type", params:{}, count:2 }
  ],
  vocabulary:[
    {term:"Trill (tr)", def:"Rapid alternation between the note and its upper neighbor, lasting the note's length."},
    {term:"Mordent", def:"A brief main–neighbor–main figure — upper, or lower (the lower form often marked with a vertical stroke)."},
    {term:"Turn", def:"Upper neighbor → note → lower neighbor → note. Written as a sideways S."},
    {term:"Grace Notes", def:"Appoggiatura: an unslashed grace note that normally takes perceptible time. Acciaccatura: slashed, performed very briefly according to style."}
  ],
  mistakes:[],
  summary:[
    "✔ Ornaments decorate <b>one note</b> — the melody survives intact.",
    "✔ <b>Trill</b>: many alternations (upper neighbor) · <b>mordent</b>: one.",
    "✔ <b>Turn</b>: up, home, down, home — the orbit.",
    "✔ <b>Appoggiatura</b> leans (real time) · <b>acciaccatura</b> crushes (slashed).",
    "✔ Ear test: count the alternations."
  ],
  tips:[
    "Practice trills slowly first — evenness beats speed.",
    "Baroque scores assume ornaments even where unmarked; editions add suggestions in small print.",
    "The turn fits beautifully on dotted notes — orbit during the dot.",
    "Next lesson: whole VARIATIONS built from decorating a theme."
  ],
  rewards:{ badge:"Note Jeweler", icon:"\u{2728}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz: Identify ornament symbols, neighboring-note patterns, and grace-note notation.",
  quiz:[
    { type:"mc", q:"An ornament is best described as…", choices:["an embellishment of a written note or melodic gesture","a new formal section","a chord quality"], answer:0, explain:"An embellishment of an underlying melodic event.", hint:"Small scale." },
    { type:"mc", q:"What does 'tr' above a note indicate?", choices:["Trill","Turn","Triple forte"], answer:0, explain:"Rapid upper-neighbor alternation.", hint:"Two letters." },
    { type:"mc", q:"A standard trill alternates the written note with…", choices:["the upper neighbor","the pitch a fifth below","the octave only"], answer:0, explain:"Above, rapidly.", hint:"Up." },
    { type:"mc", q:"Which pattern best describes a common mordent?", choices:["A brief main–neighbor–main figure","An ornament lasting at least two measures","An extended alternation lasting the complete phrase"], answer:0, explain:"A brief main–neighbor–main figure.", hint:"Shortest ornament." },
    { type:"mc", q:"In the common realization taught here, what is the pitch order of a turn?", choices:["Upper neighbor → main note → lower neighbor → main note","Main note → upper neighbor → main note → upper neighbor","Lower neighbor → lower neighbor → main note"], answer:0, explain:"The four-note orbit.", hint:"S shape." },
    { type:"mc", q:"A slashed grace note normally indicates…", choices:["A very brief acciaccatura whose timing depends on style","A note that always lasts exactly half a beat","A note performed after the principal note has ended"], answer:0, explain:"The slash distinguishes the acciaccatura from a common unslashed appoggiatura notation.", hint:"Very brief, but not literally without duration." },
    { type:"mc", q:"A common notated appoggiatura…", choices:["receives perceptible duration, often borrowed from the principal note","is silent","is nonmusical noise"], answer:0, explain:"It leans, then resolves.", hint:"Its analytical and expressive function depends on the surrounding harmony and performance style." },
    { type:"mc", q:"In C major, D–C–B–C ornamenting C represents…", choices:["A turn","A trill","A mordent"], answer:0, explain:"Upper, note, lower, note.", hint:"The orbit." },
    { type:"truefalse", q:"In the modern convention taught here, a lower mordent uses the note below the written note.", answer:true, explain:"A vertical stroke through the mordent symbol commonly indicates the lower-neighbor form. Historical conventions may differ.", hint:"Direction switch." },
    { type:"truefalse", q:"An ornament can alter the surface rhythm and pitches while embellishing an underlying melodic note.", answer:true, explain:"It changes the musical surface while the underlying melodic note remains.", hint:"Surface versus structure." },
    { type:"mc", q:"Which ornament normally continues through much or all of a sustained note's duration?", choices:["Trill","Mordent","Acciaccatura"], answer:0, explain:"A trill may continue for much or all of the written duration, depending on style and notation.", hint:"The long one." },
    { type:"mc", q:"Which listening feature commonly distinguishes a mordent from an extended trill?", choices:["A mordent normally uses one brief neighbor-and-return figure, while a trill repeats the alternation","The dynamic level","The key signature alone"], answer:0, explain:"A brief neighbor-and-return figure versus a repeated alternation.", hint:"Count." }
  ],
  miaPerfect:"Perfect score! You accurately identified common trills, mordents, turns, and grace-note symbols.",
  miaPass:"You passed! Next, you will study theme and variations.",
  mia:{
    hook:{ label:"the welcome",
      explain:"The decorated C rapidly alternated with D — a trill: the note plus its upper neighbor.",
      play:()=>{for(let i=0;i<8;i++) MFAudio.tone(i%2?74:72,.09,i*.09,.36); MFAudio.tone(72,.5,.75,.42);} },
    learn:{ label:"ornaments",
      explain:"Trill = many alternations (upper); mordent = one; turn = up-home-down-home; appoggiatura leans, acciaccatura crushes.",
      hint:"Count the alternations.",
      play:()=>{[74,72,71,72].forEach((m,i)=>MFAudio.tone(m,.12,i*.12,.36));} },
    example:{ label:"the examples",
      explain:"Example 1 writes out trill, mordent and turn on one note; example 2 contrasts the two grace notes." },
    game:{ label:"the games",
      explain:"Sprint the names, play a turn, build its path, then match descriptions at speed.",
      hint:"Many-one-loop-crush." },
    quiz:{ label:"this question",
      explain:"Identify by count and path: many = trill, one = mordent, orbit = turn, tiny-before = grace (slash = crushed).",
      play:()=>{MFAudio.tone(72,.09,0,.36);MFAudio.tone(74,.09,.09,.34);MFAudio.tone(72,.6,.18,.42);} }
  }
};
