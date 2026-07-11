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
  welcome:"Ornaments: decorating a single note. \u{2728}",
  hook:{
    say:"<b>One plain note, then the same note decorated.</b> \u{1F447} <b>What did the decoration add?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Plain</button>
          <button class="play hk-b">▶ Decorated</button></div>
          <div class="choices hk-ch" style="display:none"><button>A rapid alternation with the note above — a trill</button><button>A new melody</button><button>Nothing</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ MFAudio.tone(72,.9,.05,.42); hA=true; if(hB) setTimeout(()=>ch.style.display="",1400); };
        container.querySelector(".hk-b").onclick=()=>{ for(let i=0;i<8;i++) MFAudio.tone(i%2?74:72,.09,i*.09,.36); MFAudio.tone(72,.5,.75,.42); hB=true; if(hA) setTimeout(()=>ch.style.display="",1700); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ A TRILL — the note rapidly alternating with its upper neighbor. Ornaments decorate single notes without changing the melody. Today's lesson!");
          else fb(false,"The melody note stayed C — something shimmered AROUND it…");
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
    { say:"<b>Ornament:</b> a <b>decoration of one melody note</b> — the note keeps its identity; the ornament adds sparkle around it. Symbols above the note tell the player which decoration. \u{1F447} <b>An ornament changes…</b>",
      try:{ type:"mc", choices:["Nothing structural — it decorates one note","The whole melody","The key"], answer:0,
        success:"✓ The melody survives; one note gets jewelry.",
        fail:"Did the hook's melody change?",
        hint:"Decoration, not replacement." } },
    { say:"<b>The Trill (tr):</b> <b>rapid alternation between the note and its UPPER neighbor</b> — written 'tr' (often with a wavy line). Length: as long as the note lasts. \u{1F447} <b>A trill alternates with which note?</b>",
      try:{ type:"mc", choices:["The upper neighbor","The lower octave","The tonic"], answer:0,
        success:"✓ Note + upper neighbor, as fast as elegant.",
        fail:"Listen to the hook again — up or down?",
        hint:"Above." } },
    { say:"<b>The Mordent:</b> <b>a single quick alternation</b> — main note, neighbor, main note, done. Upper mordent uses the note above; lower mordent (marked with a vertical slash) the note below. \u{1F447} <b>A mordent differs from a trill by…</b>",
      try:{ type:"mc", choices:["Alternating only ONCE","Using two octaves","Never resolving"], answer:0,
        success:"✓ One bite instead of a shimmer.",
        fail:"Count the alternations…",
        hint:"Single vs many." } },
    { say:"<b>The Turn:</b> a four-note loop <b>around</b> the main note: <b>upper neighbor → note → lower neighbor → note</b>. Written as a sideways S. \u{1F447} <b>The turn's path is…</b>",
      try:{ type:"mc", choices:["Above, note, below, note","Note, octave, note","Below, below, above"], answer:0,
        success:"✓ A graceful orbit — up, home, down, home.",
        fail:"Trace the loop…",
        hint:"An S around the note." } },
    { say:"<b>Grace Notes:</b> tiny notes before the beat-note. <b>Appoggiatura</b> (small note, no slash): <b>leans</b> — takes real time from the main note. <b>Acciaccatura</b> (slash through the stem): <b>crushed</b> — as fast as possible. <b>Remember: trill = many, mordent = one, turn = loop, grace = before.</b> \u{1F447} <b>The slashed grace note is played…</b>",
      try:{ type:"mc", choices:["As fast as possible — crushed","Half the main note's length","After the main note"], answer:0,
        success:"✓ The acciaccatura crushes in and vanishes.",
        fail:"The slash means speed…",
        hint:"Crushed." } },
    { say:"Name each ornament by ear. \u{1F447}",
      try:{ type:"custom",
        hint:"Many = trill · one = mordent · loop = turn · crush = grace.",
        mount:(container,fb)=>MF_L100_ear(container,fb) } },
    { say:"<b>Review:</b> \u{1F447} <b>Upper neighbor → note → lower neighbor → note is a…</b>",
      try:{ type:"mc", choices:["Turn","Trill","Mordent"], answer:0,
        success:"✓ The four-note orbit — a turn.",
        fail:"The looping one…",
        hint:"Sideways S." } }
  ],
  examples:[
    { caption:"Ornaments written out: a trill on C (C-D alternating), then a mordent (C-D-C), then a turn (D-C-B-C). Same main note, three decorations.",
      staff:{clef:"treble",tempo:112,notes:[
        {p:"C5",d:"8",label:"trill…"},{p:"D5",d:"8"},{p:"C5",d:"8"},{p:"D5",d:"8"},
        {p:"C5",d:"8",label:"mordent"},{p:"D5",d:"8"},{p:"C5",d:"q"},
        {p:"D5",d:"8",label:"turn"},{p:"C5",d:"8"},{p:"B4",d:"8"},{p:"C5",d:"q"},{bar:"final"}],
        beams:[[0,3],[4,5],[7,9]],width:640},
      kb:{start:59,octaves:2,labels:true} },
    { caption:"Grace notes in context: a crushed acciaccatura into the downbeat, then an appoggiatura that leans on the harmony before resolving.",
      staff:{clef:"treble",tempo:88,notes:[
        {p:"B4",d:"8",label:"crush"},{p:"C5",d:"q."},
        {p:"D5",d:"8",label:"lean…"},{p:"C5",d:"q."},{p:"C5",d:"q"},{bar:"final"}],
        beams:[[0,0]],width:440},
      kb:{start:59,octaves:1,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Ornament Sprint (45s)",
      intro:"Names, paths and symbols — race them!",
      miaIntro:"Decorate at speed! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Trill","rapid alternation, upper neighbor"],
        ["Mordent","one quick alternation"],
        ["Turn","upper, note, lower, note"],
        ["Appoggiatura","leaning grace note — takes real time"],
        ["Acciaccatura","crushed grace note — slashed"],
        ["'tr' marking","trill"],
        ["Sideways S","turn"],
        ["Ornaments decorate","a single note"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — ornament fluent!":null },
    { type:"key-climb", title:"Game 2 · Play a Turn",
      intro:"Play the turn on C: D, C, B, C!",
      miaIntro:"Orbit the note! \u{1FA9C}",
      spec:{seq:[62,60,59,60],
        names:["D (upper)","C (the note)","B (lower)","C (home)"],
        start:55, octaves:1, title:"A written-out turn"},
      result:(score)=>score!==null?"The orbit, played!":null },
    { type:"order-tap", title:"Game 3 · Build the Turn",
      intro:"Tap the turn's four notes in order!",
      miaIntro:"Up, home, down, home! \u{1F3C1}",
      spec:{sequence:["Upper neighbor","The main note","Lower neighbor","The main note again"],
        title:"The turn's path"},
      result:(stars)=>stars>=2?"Turn assembled!":null },
    { type:"term-race", title:"Game 4 · Which Ornament?",
      intro:"Description → name, at speed!",
      miaIntro:"Count the alternations! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Shimmers as long as the note","trill"],
        ["One fast bite","mordent"],
        ["Four-note orbit","turn"],
        ["Tiny slashed note","acciaccatura"],
        ["Small note taking real time","appoggiatura"],
        ["Lower mordent's mark","a vertical slash"],
        ["Trill's partner note","the upper neighbor"],
        ["All ornaments decorate","one note"]]},
      result:(score)=>score>=6?"Every ornament named!":null }
  ],
  practiceIntro:"20 practice questions — trills, turns and graces. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Trill","many alternations"],["Mordent","one alternation"],["Turn","the orbit"],["Acciaccatura","crushed"],["Appoggiatura","leans"]], reverse:true}, count:6 },
    { gen:"note-value", params:{}, count:2 },
    { type:"mc", q:"An ornament decorates…", choices:["a single note","the whole piece","the key signature"], answer:0, explain:"One note's jewelry." },
    { type:"mc", q:"A trill alternates the note with…", choices:["its upper neighbor","its lower octave","the tonic"], answer:0, explain:"Rapidly, for the note's length." },
    { type:"mc", q:"A mordent alternates…", choices:["once","continuously","never"], answer:0, explain:"One quick bite." },
    { type:"mc", q:"The turn's four notes are…", choices:["upper, note, lower, note","note, note, note, note","lower, upper, lower, upper"], answer:0, explain:"The orbit." },
    { type:"truefalse", q:"An acciaccatura is played as fast as possible.", answer:true, explain:"Crushed — the slash says so." },
    { type:"truefalse", q:"An appoggiatura takes real time from the main note.", answer:true, explain:"It leans before resolving." },
    { type:"truefalse", q:"A trill uses the note below.", answer:false, explain:"The UPPER neighbor." },
    { gen:"term-match", params:{subject:"term", pool:[["tr","trill"],["Sideways S","turn"],["Slash through stem","acciaccatura"],["Vertical slash on mordent","lower mordent"]], reverse:true}, count:3 },
    { gen:"step-type", params:{}, count:2 }
  ],
  vocabulary:[
    {term:"Trill (tr)", def:"Rapid alternation between the note and its upper neighbor, lasting the note's length."},
    {term:"Mordent", def:"A single quick alternation — upper, or lower (marked with a vertical slash)."},
    {term:"Turn", def:"Upper neighbor → note → lower neighbor → note. Written as a sideways S."},
    {term:"Grace Notes", def:"Appoggiatura: leans, taking real time. Acciaccatura: slashed, crushed in as fast as possible."}
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
  miaQuizIntro:"Quiz! Count the alternations, watch the slash.",
  quiz:[
    { type:"mc", q:"An ornament is…", choices:["a decoration of a single note","a new section","a chord type"], answer:0, explain:"Jewelry for one note.", hint:"Small scale." },
    { type:"mc", q:"'tr' above a note means…", choices:["trill","turn","triple forte"], answer:0, explain:"Rapid upper-neighbor alternation.", hint:"Two letters." },
    { type:"mc", q:"A trill alternates with…", choices:["the upper neighbor","the lower 5th","the octave"], answer:0, explain:"Above, rapidly.", hint:"Up." },
    { type:"mc", q:"The mordent's length is…", choices:["one quick alternation","the whole measure","two beats minimum"], answer:0, explain:"A single bite.", hint:"Shortest ornament." },
    { type:"mc", q:"The turn's path is…", choices:["upper → note → lower → note","note → upper → note → upper","lower → lower → note"], answer:0, explain:"The four-note orbit.", hint:"S shape." },
    { type:"mc", q:"A slashed grace note (acciaccatura) is played…", choices:["crushed — as fast as possible","half the beat","after the main note"], answer:0, explain:"The slash = crush.", hint:"No real time taken." },
    { type:"mc", q:"An unslashed grace note (appoggiatura) …", choices:["takes real time from the main note","is silent","is optional noise"], answer:0, explain:"It leans, then resolves.", hint:"L96's cousin." },
    { type:"mc", q:"Identify the written-out ornament: D-C-B-C around main note C.", choices:["A turn","A trill","A mordent"], answer:0, explain:"Upper, note, lower, note.", hint:"The orbit." },
    { type:"truefalse", q:"A lower mordent uses the note below the main note.", answer:true, explain:"Marked with a vertical slash.", hint:"Direction switch." },
    { type:"truefalse", q:"Ornaments change the underlying melody note.", answer:false, explain:"They decorate it; it remains.", hint:"Decoration." },
    { type:"mc", q:"Which ornament lasts as long as its note?", choices:["The trill","The mordent","The acciaccatura"], answer:0, explain:"It shimmers to the end.", hint:"The long one." },
    { type:"mc", q:"Fastest way to tell mordent from trill by ear:", choices:["count the alternations","measure the volume","check the key"], answer:0, explain:"One vs many.", hint:"Count." }
  ],
  miaPerfect:"PERFECT! Every sparkle named. \u{2728}\u{1F389}",
  miaPass:"Passed! Notes decorated with confidence. Next: variations on a theme…",
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
