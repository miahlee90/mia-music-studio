/* Lesson 72 — Basic Forms of Music: Motive and Phrase (AEMT Book 3, Unit 18)
   Built from drafts/UNIT 18 – Lesson 72.md; AEMT3 p.114 verified by render.
   Core: writing = letters→words→sentences; music = note→motive→phrase→piece.
   MOTIVE = a short melodic, rhythmic or harmonic element used repeatedly
   (Beethoven's 5th: the famous four-note pattern — reused in original form,
   transposition and variation). PHRASE = a short section of music, a complete
   or incomplete musical idea; its end gives a "lift" or breath, like a comma.
   NOTE: edit by FULL-FILE REWRITE only. */

/* motive hunter: tap the first note of each motive appearance */
function MF_L72_hunt(container,fb){
  /* melody: motive (D-D-D-G) stated, then transposed (E-E-E-A), then again (G-G-G-C) */
  const NOTES=[
    {p:"D4",d:"8"},{p:"D4",d:"8"},{p:"D4",d:"8"},{p:"G4",d:"q"},
    {p:"E4",d:"8"},{p:"E4",d:"8"},{p:"E4",d:"8"},{p:"A4",d:"q"},
    {p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"C5",d:"h"}];
  const STARTS=[0,4,8];
  let found=[];
  container.innerHTML=`<div class="big-q l72h-q" style="text-align:center">One tiny motive — three appearances (the later ones TRANSPOSED). Tap the <b>first note of each appearance</b>.</div>
    <div class="l72h-staff"></div>
    <div style="text-align:center"><button class="play l72h-play">▶ Hear the melody</button></div>`;
  const q=container.querySelector(".l72h-q"), holder=container.querySelector(".l72h-staff"), pl=container.querySelector(".l72h-play");
  const spec={clef:"treble",tempo:110,notes:NOTES,beams:[[0,2],[4,6],[8,10]],width:560,clickNotes:true,
    onNote:(i,p)=>{
      MFAudio.tone(MFAudio.midi(p),.4,0,.4);
      if(STARTS.includes(i)&&!found.includes(i)){
        found.push(i); MFAudio.yay();
        if(found.length<3) q.innerHTML=`✓ Appearance ${found.length} found! ${3-found.length} more — same short-short-short-LONG shape, new pitch level.`;
        else { q.textContent="All three appearances found!";
          fb(true,"✓ One motive, three statements — the 2nd and 3rd are TRANSPOSITIONS (same shape, higher start). That's how 'most music is based on the development and expansion of one or more motives.'"); }
      } else if(STARTS.includes(i)) q.innerHTML="Already counted that one — find the next appearance.";
      else fb(false,"That's mid-motive. Find where the short-short-short-LONG pattern BEGINS.");
    }};
  const api=Staff.render(holder,spec);
  pl.onclick=()=>Staff.play(spec,api);
}

/* phrase breaths: tap where each phrase ends */
function MF_L72_breath(container,fb){
  /* two phrases: rise…pause, rise…close */
  const NOTES=[
    {p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"h",label:"?"},
    {p:"E4",d:"q"},{p:"D4",d:"q"},{p:"B3",d:"q"},{p:"C4",d:"h",label:"?"}];
  const ENDS=[3,7];
  let found=[];
  container.innerHTML=`<div class="big-q l72b-q" style="text-align:center">Two phrases — two breaths. Play it, then tap the note where EACH phrase takes its breath.</div>
    <div class="l72b-staff"></div>
    <div style="text-align:center"><button class="play l72b-play">▶ Play the melody</button></div>`;
  const q=container.querySelector(".l72b-q"), holder=container.querySelector(".l72b-staff"), pl=container.querySelector(".l72b-play");
  const spec={clef:"treble",tempo:100,notes:NOTES,width:520,clickNotes:true,
    onNote:(i,p)=>{
      MFAudio.tone(MFAudio.midi(p),.5,0,.4);
      if(ENDS.includes(i)&&!found.includes(i)){
        found.push(i); MFAudio.yay();
        if(found.length<2) q.innerHTML="✓ One breath found — the long note where the line pauses, like a comma. One more!";
        else { q.textContent="Both breaths found!";
          fb(true,"✓ The long notes are where the music 'takes a breath' — each marks the END OF A PHRASE. Phrase 1 pauses on G (incomplete — a comma); phrase 2 settles on C (complete — a period)."); }
      } else if(ENDS.includes(i)) q.innerHTML="Counted! Where does the OTHER phrase breathe?";
      else fb(false,"Mid-phrase — sing along and notice where you'd naturally breathe: on the LONG notes.");
    }};
  const api=Staff.render(holder,spec);
  pl.onclick=()=>Staff.play(spec,api);
}

LESSON_CONTENT[72]={
  welcome:"The FINAL unit! We zoom out from notes and chords to whole pieces — starting with music's smallest idea. \u{1F9F1}",
  hook:{
    say:"Four notes. Just FOUR. Yet they may be the most famous idea in all of classical music. <b>Listen — do you recognize them?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ The four notes</button></div>
          <div class="choices hk-ch" style="display:none"><button>Beethoven's Symphony No. 5 — short-short-short-LONG</button><button>A random doorbell</button><button>The blues scale</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{
          [67,67,67].forEach((m,i)=>MFAudio.tone(m,.22,i*.24,.45));
          MFAudio.tone(63,1.6,.72,.5);
          setTimeout(()=>ch.style.display="",2100);
        };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ The opening MOTIVE of Beethoven's 5th — the book's own example. A motive is a SHORT element used repeatedly, and Beethoven built an entire symphony from those four notes. Today: motives and phrases, music's building blocks!");
          else fb(false,"Da-da-da-DUMMM… think of the most famous symphony opening ever written.");
        });
      } }
  },
  objectives:[
    "Follow the analogy: letters→words→sentences = notes→motives→phrases→pieces",
    "Define MOTIVE: a short melodic, rhythmic or harmonic element used repeatedly",
    "See how motives develop: repetition, transposition, variation",
    "Define PHRASE: a short section — a complete or incomplete musical idea",
    "Hear phrase endings as breaths ('lifts'), like commas in speech",
    "Count and compare the phrases of a simple song"
  ],
  steps:[
    { say:"The book's analogy: <b>writing begins with a letter</b> — letters combine into words, sentences, paragraphs, chapters. <b>Music begins with a NOTE</b>, combined into larger and larger units until a piece exists. \u{1F447} <b>Why learn the basic forms?</b>",
      try:{ type:"mc", choices:["To understand how a composition is organized and structured","To play louder","To avoid learning chords"], answer:0,
        success:"✓ Form is the architecture — after 71 lessons of bricks (notes, rhythms, chords), we now read the blueprints.",
        fail:"The book's second paragraph states the reason…",
        hint:"Organization and structure." } },
    { say:"Unit one of meaning: <b>a MOTIVE is a short melodic, rhythmic or harmonic element that is used REPEATEDLY throughout a piece</b> — and <b>most music is based on the development and expansion of one or more motives</b>. \u{1F447} <b>What makes four notes a motive?</b>",
      show:{ type:"staff", spec:{clef:"treble",time:"2/4",tempo:110,notes:[
        {rest:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"Eb4",d:"h",artic:"fermata"},{bar:"final"}],
        beams:[[1,3]],width:380} },
      try:{ type:"mc", choices:["Being SHORT and used REPEATEDLY","Being played by violins","Containing exactly four notes"], answer:0,
        success:"✓ Short + repeated = motive. Beethoven's is four notes, but a motive can also be a rhythm or even a chord pattern.",
        fail:"Two words in the definition carry all the weight…",
        hint:"Short… repeatedly…" } },
    { say:"How does one tiny idea fill a symphony? The book: after its introduction, the motive returns <b>in its original form, then in TRANSPOSITION and other variations</b> — its RHYTHM even becomes a motive in later movements. \u{1F447} <b>Hunt the motive yourself:</b>",
      try:{ type:"custom",
        hint:"Same shape (short-short-short-LONG), different starting pitches.",
        mount:(container,fb)=>MF_L72_hunt(container,fb) } },
    { say:"Unit two of meaning: <b>a PHRASE is a short section of music that may be a COMPLETE or INCOMPLETE musical idea</b>, containing one or more motives. Speech clue: <b>a phrase ends where a speaker would take a breath — at a comma</b>. \u{1F447} <b>The end of a musical phrase gives the performer…</b>",
      try:{ type:"mc", choices:["A 'lift' or breath","A louder dynamic","A new key signature"], answer:0,
        success:"✓ Singers literally breathe there; instrumentalists 'lift.' Music punctuates itself just like language.",
        fail:"What does the book say happens at a comma?",
        hint:"What do singers need regularly?" } },
    { say:"Find the breaths with your own ears and eyes. \u{1F447}",
      try:{ type:"custom",
        hint:"Phrases end on the LONG notes — where you'd naturally breathe.",
        mount:(container,fb)=>MF_L72_breath(container,fb) } },
    { say:"Complete vs incomplete: phrase 1 of our melody paused on G — a musical <b>comma</b> (incomplete, expecting more). Phrase 2 settled on C — a musical <b>period</b> (complete). \u{1F447} <b>A phrase ending away from the tonic feels…</b>",
      try:{ type:"mc", choices:["Incomplete — like a comma awaiting the next phrase","Complete — like a period","Like the end of the entire piece"], answer:0,
        success:"✓ Question-and-answer: incomplete phrases ask, complete phrases answer. Songs breathe in these pairs constantly.",
        fail:"Did the pause on G feel finished?",
        hint:"Comma vs period." } },
    { say:"Phrase-counting practice, book style: the classic nursery rhyme melody has <b>four phrases</b> (a, b, c, d) — and the book asks which two are SIMILAR. In our example, listen: phrase a and phrase c start identically. \u{1F447} <b>Two similar phrases in a song usually mean…</b>",
      try:{ type:"mc", choices:["The composer reused material — motives at work!","A printing error","The song has no form"], answer:0,
        success:"✓ Repetition is design, not laziness — recognizing similar phrases is the first step of FORM analysis, which the next three lessons build on.",
        fail:"Why would a composer bring an idea back?",
        hint:"Think of the motive lesson you JUST had." } }
  ],
  examples:[
    { caption:"A motive grows: stated, transposed up a step, transposed again — then one long landing. One four-note idea powers the whole line, Beethoven-style.",
      staff:{clef:"treble",tempo:110,notes:[
        {p:"D4",d:"8",label:"motive"},{p:"D4",d:"8"},{p:"D4",d:"8"},{p:"G4",d:"q"},
        {p:"E4",d:"8",label:"transposed"},{p:"E4",d:"8"},{p:"E4",d:"8"},{p:"A4",d:"q"},
        {p:"G4",d:"8",label:"again!"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"C5",d:"h"},{bar:"final"}],
        beams:[[0,2],[4,6],[8,10]],width:620},
      kb:{start:60,octaves:2,labels:true} },
    { caption:"Two phrases in question-and-answer: the first breathes on G (incomplete — a comma), the second settles on C (complete — a period). Every simple song you know breathes this way.",
      staff:{clef:"treble",tempo:100,notes:[
        {p:"C4",d:"q",label:"phrase 1…"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"h",label:"breath (comma)"},
        {p:"E4",d:"q",label:"phrase 2…"},{p:"D4",d:"q"},{p:"B3",d:"q"},{p:"C4",d:"h",label:"home (period)"},{bar:"final"}],width:620},
      kb:{start:57,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Building-Block Sprint (45s)",
      intro:"Motives, phrases, breaths and Beethoven — race the definitions!",
      miaIntro:"Short-short-short-LONG! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Motive","a short element used repeatedly"],
        ["A motive can be","melodic, rhythmic or harmonic"],
        ["Most music is based on","developing and expanding motives"],
        ["Beethoven's 5th motive","four notes: short-short-short-LONG"],
        ["Phrase","a short section — complete or incomplete idea"],
        ["A phrase's end","a 'lift' or breath, like a comma"],
        ["Transposition","the same motive at a new pitch level"],
        ["Music's basic unit","the note"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — blocks stacked high!":null },
    { type:"key-climb", title:"Game 2 · Play the Famous Motive",
      intro:"Perform the short-short-short-LONG shape — then its transposition!",
      miaIntro:"Fate knocks at the door! \u{1FA9C}",
      spec:{seq:[67,67,67,63, 65,65,65,62],
        names:["G","G","G","E♭ — the LONG one!","F (transposed!)","F","F","D — long again"],
        start:60, octaves:2, title:"The four-note motive, original and transposed"},
      result:(score)=>score!==null?"You just played music's most famous motive!":null },
    { type:"symbol-hunt", title:"Game 3 · Motive Detective",
      intro:"Original, transposed, varied — or unrelated? Click what each round names!",
      miaIntro:"Same shape, new address? \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"The motive (original)", spec:{clef:"treble",notes:[{p:"D4",d:"8"},{p:"D4",d:"8"},{p:"D4",d:"8"},{p:"G4",d:"q"}],beams:[[0,2]],width:170}},
        {label:"Transposed (same shape, higher)", spec:{clef:"treble",notes:[{p:"E4",d:"8"},{p:"E4",d:"8"},{p:"E4",d:"8"},{p:"A4",d:"q"}],beams:[[0,2]],width:170}},
        {label:"Rhythm varied (long-short-short-long)", spec:{clef:"treble",notes:[{p:"D4",d:"q"},{p:"D4",d:"8"},{p:"D4",d:"8"},{p:"G4",d:"q"}],beams:[[1,2]],width:170}},
        {label:"Unrelated material", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"C5",d:"q"}],width:170}}]},
      result:(score)=>score>=5?"No disguise fools the detective!":null },
    { type:"order-tap", title:"Game 4 · Build the Pyramid",
      intro:"Tap music's building blocks from SMALLEST to LARGEST!",
      miaIntro:"Note first, masterpiece last! \u{1F3C1}",
      spec:{sequence:["Note","Motive","Phrase","Section","Complete piece"],
        title:"Small to large: assemble the musical pyramid"},
      result:(stars)=>stars>=2?"Architecture understood, ground floor up!":null }
  ],
  practiceIntro:"20 practice questions — motives, phrases, breaths and the pyramid. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Motive","short, used repeatedly"],["Phrase","a complete or incomplete idea"],["Phrase ending","a breath or 'lift'"],["Transposition","same shape, new pitch"],["Music's basic unit","the note"]], reverse:true}, count:6 },
    { gen:"note-value", params:{}, count:2 },
    { type:"mc", q:"A MOTIVE is…", choices:["a short melodic, rhythmic or harmonic element used repeatedly","an entire song","a kind of tempo"], answer:0,
      explain:"The definition, word for word (AEMT3 p.114)." },
    { type:"mc", q:"Most music is based on…", choices:["the development and expansion of one or more motives","a single long melody with no repeats","random notes"], answer:0,
      explain:"Motives are the seeds of pieces." },
    { type:"mc", q:"The famous four-note motive belongs to…", choices:["Beethoven's Symphony No. 5","a piano exercise","the blues"], answer:0,
      explain:"The book's own example — first movement." },
    { type:"mc", q:"A PHRASE is…", choices:["a short section of music — a complete or incomplete idea","always exactly 4 notes","another word for motive"], answer:0,
      explain:"It may CONTAIN motives." },
    { type:"mc", q:"The end of a phrase is like…", choices:["a comma — a breath","a drum solo","a key change"], answer:0,
      explain:"Speakers pause at commas; singers breathe at phrase ends." },
    { type:"mc", q:"Restating a motive at a new pitch level is called…", choices:["transposition","inversion","syncopation"], answer:0,
      explain:"Same shape, new address." },
    { type:"truefalse", q:"A motive must be melodic — rhythms can't be motives.", answer:false,
      explain:"Melodic, RHYTHMIC or harmonic — Beethoven's rhythm returns in later movements." },
    { type:"truefalse", q:"A phrase may contain one or more motives.", answer:true,
      explain:"In original form or variation." },
    { type:"truefalse", q:"A phrase must always be a complete musical idea.", answer:false,
      explain:"Complete OR incomplete — commas exist in music too." },
    { type:"truefalse", q:"Understanding basic forms helps you understand how a composition is organized.", answer:true,
      explain:"The whole point of Unit 18." }
  ],
  miaQuizIntro:"Quiz! Small ideas, big pieces — show me the blueprint.",
  quiz:[
    { type:"mc", q:"Music's most basic unit is…", choices:["the note","the phrase","the chord"], answer:0,
      explain:"Like a letter of the alphabet.", hint:"The smallest brick." },
    { type:"mc", q:"A motive is a short element that is…", choices:["used repeatedly throughout a piece","played only once","always in the bass"], answer:0,
      explain:"Repetition is its identity.", hint:"Why we recognize da-da-da-DUM." },
    { type:"mc", q:"A motive may be melodic, rhythmic or…", choices:["harmonic","visual","verbal"], answer:0,
      explain:"Three possible kinds.", hint:"The third musical dimension." },
    { type:"mc", q:"After its introduction, Beethoven's motive returns…", choices:["in original form, transposition and other variations","never again","only in the finale"], answer:0,
      explain:"Development and expansion in action.", hint:"The book's description." },
    { type:"mc", q:"A phrase is a short section of music that may be…", choices:["a complete or incomplete musical idea","only complete","only incomplete"], answer:0,
      explain:"Both kinds exist — commas and periods.", hint:"Two options." },
    { type:"truefalse", q:"The end of a musical phrase provides a 'lift' or breath.", answer:true,
      explain:"For instrumentalist or singer alike.", hint:"The comma analogy." },
    { type:"truefalse", q:"When speaking, the end of a phrase usually happens at a comma.", answer:true,
      explain:"The book's speech analogy.", hint:"Where do you pause?" },
    { type:"mc", q:"Identify what happened to the motive between these two statements.",
      staff:{clef:"treble",notes:[{p:"D4",d:"8"},{p:"D4",d:"8"},{p:"D4",d:"8"},{p:"G4",d:"q"},{p:"E4",d:"8"},{p:"E4",d:"8"},{p:"E4",d:"8"},{p:"A4",d:"q"}],beams:[[0,2],[4,6]],width:420},
      choices:["It was transposed (same shape, higher pitch)","It was deleted","The rhythm changed completely"], answer:0,
      explain:"Short-short-short-long, moved up a step.", hint:"Compare shapes, then pitches." },
    { type:"mc", q:"How many phrases does the book count in 'Mary Had a Little Lamb'?", choices:["4 (a, b, c, d)","2","8"], answer:0,
      explain:"Four phrases, four breaths.", hint:"a through d." },
    { type:"mc", q:"A phrase ending on a long note AWAY from the tonic feels like…", choices:["a comma — more music is coming","a period — fully finished","an error"], answer:0,
      explain:"Incomplete = expectant.", hint:"The G pause in the example." },
    { type:"mc", q:"The writing analogy runs: letters → words → sentences. Music runs:", choices:["notes → motives → phrases","phrases → notes → motives","chords → scales → keys"], answer:0,
      explain:"Small to large, in order.", hint:"Game 4's pyramid." },
    { type:"mc", q:"Two phrases of a song begin identically. A form analyst would say…", choices:["the composer reused a motive — mark the phrases as similar","the song is broken","they must be deleted"], answer:0,
      explain:"Similarity-spotting IS form analysis.", hint:"The book's exercise 1 asks exactly this." },
    /* generated */
    { gen:"term-match", params:{subject:"term", pool:[["Motive","the repeated short idea"],["Phrase","the musical sentence-part"],["Breath","a phrase's ending lift"],["Transposition","same idea, new height"]], reverse:true}, count:3 },
    { gen:"rhythm-count", params:{}, count:2 },
    { gen:"note-value", params:{}, count:1 }
  ],
  vocabulary:[
    {term:"Motive", def:"A short melodic, rhythmic or harmonic element used repeatedly throughout a piece — the seed most music grows from.",
      staff:{clef:"treble",notes:[{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"Eb4",d:"q"}],beams:[[0,2]],width:130}},
    {term:"Phrase", def:"A short section of music — a complete or incomplete musical idea, often containing motives."},
    {term:"The Breath", def:"A phrase ends with a 'lift' or breath, like a comma in speech."},
    {term:"Transposition", def:"Restating a motive or phrase at a different pitch level — same shape, new height."}
  ],
  mistakes:[],
  summary:[
    "✔ Writing: letters→words→sentences. Music: <b>notes→motives→phrases→pieces</b>.",
    "✔ <b>MOTIVE</b> = a short melodic, rhythmic or harmonic element <b>used repeatedly</b> — most music develops one or more of them.",
    "✔ Beethoven's 5th: <b>four notes</b> reused in original form, <b>transposition</b> and variation.",
    "✔ <b>PHRASE</b> = a short section — a <b>complete or incomplete</b> idea, ending with a <b>breath</b> (comma).",
    "✔ Spotting similar phrases = the first step of <b>form analysis</b>."
  ],
  tips:[
    "Hum any song you love and clap ONLY its first rhythm — you probably just isolated its motive.",
    "Breath test for phrases: sing along; wherever you MUST inhale, a phrase just ended.",
    "Composers' secret: don't write more ideas — develop the one you have. Beethoven got a symphony from four notes.",
    "Next lesson, phrases combine into SECTIONS — and sections spell the alphabet of form: AB!"
  ],
  rewards:{ badge:"Idea Archaeologist", icon:"\u{1F9F1}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"PERFECT! Motives, phrases, breaths — the blueprint reader awakens. \u{1F9F1}\u{1F389}",
  miaPass:"Passed! You see the small ideas inside big music now. Sections are next…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Those four notes — short-short-short-LONG — are the opening motive of Beethoven's Symphony No. 5, the book's example of a motive.",
      play:()=>{[67,67,67].forEach((m,i)=>MFAudio.tone(m,.22,i*.24,.45));MFAudio.tone(63,1.6,.72,.5);} },
    learn:{ label:"motives & phrases",
      explain:"Motive = short element used repeatedly (melodic/rhythmic/harmonic); developed via repetition, transposition, variation. Phrase = short section, complete or incomplete, ending with a breath.",
      hint:"Motive = the idea; phrase = the sentence-part.",
      play:()=>{[62,62,62,67].forEach((m,i)=>MFAudio.tone(m,i===3?.8:.25,i*.26,.42));} },
    example:{ label:"the examples",
      explain:"Example 1 grows one motive through transpositions; example 2 shows two phrases breathing — comma, then period." },
    game:{ label:"the games",
      explain:"Sprint the definitions, play the famous motive, detect disguised motives, then build the pyramid from note to piece.",
      hint:"Short + repeated = motive." },
    quiz:{ label:"this question",
      explain:"Two definitions cover it all: motive (short, repeated, developed) and phrase (short section, complete or incomplete, ends with a breath).",
      play:()=>{[67,67,67].forEach((m,i)=>MFAudio.tone(m,.22,i*.24,.45));MFAudio.tone(63,1.4,.72,.5);} }
  }
};
