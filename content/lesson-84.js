/* Lesson 84 — Transposition (Book 4, Unit 21 — SELF-AUTHORED)
   Core: TRANSPOSE = rewrite/perform music at a new pitch level; every note
   moves the SAME interval; scale degrees stay identical. Methods: by
   interval, by key (new signature + same degrees). Why: singer range,
   instrument range, transposing instruments (intro).
   NOTE: edit by FULL-FILE REWRITE only. */

/* play-the-transposition: perform C-major motive, then the same motive from G */
function MF_L84_play(container,fb){
  const ROUNDS=[
    {name:"Original in C", seq:[60,64,67,64,60], names:["C","E","G","E","C"]},
    {name:"Transposed to G (up a P5)", seq:[67,71,74,71,67], names:["G","B","D","B","G"]}];
  let r=0,k=0;
  container.innerHTML=`<div class="big-q l84p-q" style="text-align:center"></div>
    <div class="l84p-kb"></div>`;
  const q=container.querySelector(".l84p-q"), kh=container.querySelector(".l84p-kb");
  function ask(){
    if(r>=ROUNDS.length){ q.textContent="Excellent! Same shape, new pitch level — you transposed it."; return; }
    const R=ROUNDS[r];
    q.innerHTML=`${R.name}: play <b>${R.names[k]}</b> (${k+1} of ${R.seq.length}).`;
  }
  Keyboard.create(kh,{start:60,octaves:2,labels:true,
    onKey:m=>{
      const R=ROUNDS[r]; if(!R) return;
      if(m%12===R.seq[k]%12){ k++;
        if(k>=R.seq.length){ MFAudio.yay(); fb(true, r===0? "✓ The motive in C. Now the SAME shape starting on G — every note up a perfect 5th.":"✓ Transposed! Every note moved up a P5; the shape and the scale degrees never changed."); r++; k=0; setTimeout(ask,1200); }
        else ask();
      } else { MFAudio.tone(40,.2); fb(false,`Play ${R.names[k]} — the same melodic shape, note by note.`); }
    }});
  ask();
}

LESSON_CONTENT[84]={
  welcome:"Transposition: the same music, moved to a new key. \u{1F4E6}",
  hook:{
    say:"<b>The same melody, twice.</b> The second time it starts higher — but nothing about its SHAPE changes. \u{1F447} <b>What happened between the two versions?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Version 1</button>
          <button class="play hk-b">▶ Version 2</button></div>
          <div class="choices hk-ch" style="display:none"><button>Every note moved UP the same distance</button><button>The rhythm changed</button><button>Random notes changed</button></div>`;
        const A=[60,62,64,65,67,64,60], B=[67,69,71,72,74,71,67];
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ A.forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.42)); hA=true; if(hB) setTimeout(()=>ch.style.display="",2400); };
        container.querySelector(".hk-b").onclick=()=>{ B.forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.42)); hB=true; if(hA) setTimeout(()=>ch.style.display="",2400); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Every note rose a perfect 5th — the melody was TRANSPOSED from C major to G major. Same shape, same degrees, new key. Today's lesson!");
          else fb(false,"The rhythm and shape were identical — compare the STARTING pitch of each version…");
        });
      } }
  },
  objectives:[
    "Define transposition: the same music at a new pitch level",
    "Transpose by interval: move every note the same distance",
    "Transpose by key: new key signature, same scale degrees",
    "Know why musicians transpose: voice range, instrument range",
    "Meet transposing instruments (introduction)",
    "Perform a motive in two keys"
  ],
  steps:[
    { say:"<b>Transposition:</b> to transpose is to <b>rewrite or perform music at a different pitch level</b>. Every note moves by the <b>same interval</b>, so the shape, rhythm and scale degrees stay identical — only the key changes. \u{1F447} <b>What stays the same in a transposition?</b>",
      try:{ type:"mc", choices:["The shape, rhythm and scale degrees","Only the first note","Nothing"], answer:0,
        success:"✓ Everything musical survives — only the pitch level moves.",
        fail:"Compare the hook's two versions…",
        hint:"Only the key changes." } },
    { say:"<b>Method 1 — By Interval:</b> choose the interval and move <b>every note</b> by it. C-D-E up a major 2nd becomes D-E-F♯. Watch the accidentals: the interval must stay EXACT. \u{1F447} <b>C-D-E transposed up a M2 is…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:100,notes:[
        {p:"C4",d:"q",label:"1"},{p:"D4",d:"q",label:"2"},{p:"E4",d:"q",label:"3"},
        {p:"D4",d:"q",label:"1"},{p:"E4",d:"q",label:"2"},{p:"F#4",d:"q",label:"3"},{bar:"final"}],width:460} },
      try:{ type:"mc", choices:["D-E-F♯","D-E-F","C♯-D♯-E♯"], answer:0,
        success:"✓ E up a M2 is F♯, not F — exact intervals need the right accidentals.",
        fail:"E up a whole step lands on…",
        hint:"Whole step above E." } },
    { say:"<b>Method 2 — By Key:</b> think in <b>scale degrees</b>. Write the new key signature, then place each note on the <b>same degree</b> of the new key. Degrees 1-2-3 in C (C-D-E) become 1-2-3 in F (F-G-A). \u{1F447} <b>Degrees 5-3-1 in G major are…</b>",
      try:{ type:"mc", choices:["D-B-G","G-E-C","D-B♭-G"], answer:0,
        success:"✓ In G major: degree 5 = D, 3 = B, 1 = G. Degrees make transposition automatic.",
        fail:"Count up the G major scale…",
        hint:"G major: G-A-B-C-D…" } },
    { say:"<b>Why Transpose?</b> to fit a <b>singer's range</b> (the song is too high or low), to suit an <b>instrument's range</b>, or to make a key easier to play. The music itself is unchanged. \u{1F447} <b>A song sits too high for a singer. You should…</b>",
      try:{ type:"mc", choices:["Transpose it down to a comfortable key","Ask the singer to strain","Delete the high notes"], answer:0,
        success:"✓ Transposing preserves the song and rescues the singer.",
        fail:"The melody must survive intact…",
        hint:"Move the whole song." } },
    { say:"<b>Transposing Instruments (Introduction):</b> some instruments sound a <b>different pitch than written</b>. A B♭ trumpet playing written C sounds B♭ — so its parts are written a <b>major 2nd higher</b> than the desired sound. F horns and E♭ saxes work the same way with their own intervals. <b>Remember: every note moves the same interval; degrees never change.</b> \u{1F447} <b>A B♭ trumpet plays written C. What pitch sounds?</b>",
      try:{ type:"mc", choices:["B♭ — a major 2nd below the written note","C — exactly as written","F♯"], answer:0,
        success:"✓ Written C sounds B♭ — the instrument's name tells you its sounding pitch.",
        fail:"The instrument's name is the clue…",
        hint:"B♭ instrument → sounds B♭." } },
    { say:"Perform a transposition yourself. \u{1F447}",
      try:{ type:"custom",
        hint:"Same shape: 1-3-5-3-1 in C, then in G.",
        mount:(container,fb)=>MF_L84_play(container,fb) } },
    { say:"<b>Review:</b> \u{1F447} <b>A melody in F major is transposed to A major. Each note moves…</b>",
      try:{ type:"mc", choices:["Up a major 3rd — the same interval for every note","A different interval per note","Only the first note moves"], answer:0,
        success:"✓ F to A is a M3; every single note travels exactly that far.",
        fail:"One interval fits all…",
        hint:"F up to A = ?" } }
  ],
  examples:[
    { caption:"One motive, three keys: C major, F major, G major. The scale degrees (1-2-3-5-3-1) never change — only the starting pitch.",
      staff:{clef:"treble",tempo:104,notes:[
        {p:"C4",d:"8"},{p:"D4",d:"8"},{p:"E4",d:"8"},{p:"G4",d:"8"},{p:"E4",d:"8"},{p:"C4",d:"8"},{bar:"single"},
        {p:"F4",d:"8"},{p:"G4",d:"8"},{p:"A4",d:"8"},{p:"C5",d:"8"},{p:"A4",d:"8"},{p:"F4",d:"8"},{bar:"single"},
        {p:"G4",d:"8"},{p:"A4",d:"8"},{p:"B4",d:"8"},{p:"D5",d:"8"},{p:"B4",d:"8"},{p:"G4",d:"8"},{bar:"final"}],
        beams:[[0,2],[3,5],[7,9],[10,12],[14,16],[17,19]],width:660},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"Accidentals keep intervals exact: the motive D-F♯-A in D major becomes E♭-G-B♭ in E♭ major — every note up a half step.",
      staff:{clef:"treble",tempo:96,notes:[
        {p:"D4",d:"q"},{p:"F#4",d:"q"},{p:"A4",d:"h"},{bar:"single"},
        {p:"Eb4",d:"q"},{p:"G4",d:"q"},{p:"Bb4",d:"h"},{bar:"final"}],width:480},
      kb:{start:50,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Transposition Sprint (45s)",
      intro:"Methods, reasons and rules — race the facts!",
      miaIntro:"Same shape, new home! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Transpose","perform music at a new pitch level"],
        ["What moves","every note, by the SAME interval"],
        ["What stays","shape, rhythm, scale degrees"],
        ["Method 1","move each note by the interval"],
        ["Method 2","new key signature + same degrees"],
        ["Why transpose","singer or instrument range"],
        ["B♭ trumpet's written C","sounds B♭"],
        ["Exact intervals need","the right accidentals"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — transposition fluent!":null },
    { type:"key-climb", title:"Game 2 · One Motive, Two Keys",
      intro:"Play 1-2-3-1 in C major, then in F major!",
      miaIntro:"Degrees never lie! \u{1FA9C}",
      spec:{seq:[60,62,64,60, 65,67,69,65],
        names:["C (1)","D (2)","E (3)","C (1)","F (new 1!)","G (2)","A (3)","F (1)"],
        start:60, octaves:2, title:"The same degrees in two keys"},
      result:(score)=>score!==null?"Two keys, one motive — transposed by hand!":null },
    { type:"symbol-hunt", title:"Game 3 · Find the Transposition",
      intro:"The original is C-E-G. Click what each round asks for!",
      miaIntro:"Track the interval! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Up a P5 (G-B-D)", spec:{clef:"treble",notes:[{p:"G4",d:"q"},{p:"B4",d:"q"},{p:"D5",d:"q"}],width:160}},
        {label:"Up a M2 (D-F♯-A)", spec:{clef:"treble",notes:[{p:"D4",d:"q"},{p:"F#4",d:"q"},{p:"A4",d:"q"}],width:160}},
        {label:"Up a P4 (F-A-C)", spec:{clef:"treble",notes:[{p:"F4",d:"q"},{p:"A4",d:"q"},{p:"C5",d:"q"}],width:160}},
        {label:"The original (C-E-G)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"}],width:160}}]},
      result:(score)=>score>=5?"Every transposition tracked!":null },
    { type:"term-race", title:"Game 4 · Degree Translator Race",
      intro:"Name the note for each degree in each key — at speed!",
      miaIntro:"Degrees → notes! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Degree 1 in G major","G"],
        ["Degree 3 in G major","B"],
        ["Degree 5 in F major","C"],
        ["Degree 1 in D major","D"],
        ["Degree 3 in F major","A"],
        ["Degree 5 in G major","D"],
        ["Degree 2 in D major","E"],
        ["Degree 3 in D major","F♯"]]},
      result:(score)=>score>=6?"Instant degree translation!":null }
  ],
  practiceIntro:"20 practice questions — intervals, degrees and transposing instruments. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Transpose","new pitch level"],["Same interval","every note"],["Degrees","stay identical"],["New key","new signature"],["B♭ instrument","sounds B♭ on written C"]], reverse:true}, count:6 },
    { gen:"degree-name", params:{ask:"name"}, count:3 },
    { type:"mc", q:"Transposing means…", choices:["performing music at a different pitch level","playing faster","changing the rhythm"], answer:0,
      explain:"Same music, new key." },
    { type:"mc", q:"C-D-E transposed up a P4 becomes…", choices:["F-G-A","G-A-B","E-F-G"], answer:0,
      explain:"Every note up a perfect 4th." },
    { type:"mc", q:"In a key transposition, each note keeps its…", choices:["scale degree","exact pitch","accidental"], answer:0,
      explain:"Degree 3 stays degree 3 in the new key." },
    { type:"mc", q:"A song is too low for a singer. Transpose it…", choices:["up to a comfortable key","down further","not at all"], answer:0,
      explain:"Move the whole song up." },
    { type:"truefalse", q:"In transposition, every note moves by the same interval.", answer:true,
      explain:"That is the definition." },
    { type:"truefalse", q:"Transposing changes the melody's rhythm.", answer:false,
      explain:"Only pitch level changes." },
    { type:"truefalse", q:"A B♭ trumpet sounds exactly the pitches written in its part.", answer:false,
      explain:"It sounds a M2 lower — written C sounds B♭." },
    { gen:"term-match", params:{subject:"term", pool:[["Up a M2 from E","F♯"],["Up a P5 from C","G"],["Up a P4 from D","G"],["Up a M3 from F","A"]], reverse:true}, count:3 },
    { gen:"interval-quality", params:{ask:"quality"}, count:2 }
  ],
  vocabulary:[
    {term:"Transposition", def:"Rewriting or performing music at a new pitch level — every note moves the same interval."},
    {term:"Transposing by Interval", def:"Pick the interval; move each note exactly that far, accidentals included."},
    {term:"Transposing by Key", def:"Write the new key signature; place each note on the same scale degree."},
    {term:"Transposing Instrument", def:"An instrument that sounds a different pitch than written — a B♭ trumpet's written C sounds B♭."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Transpose</b> = same music, <b>new pitch level</b>; shape, rhythm and degrees survive.",
    "✔ By interval: <b>every note the same distance</b> — mind the accidentals.",
    "✔ By key: <b>new signature + same scale degrees</b>.",
    "✔ Reasons: <b>voice range, instrument range, easier keys</b>.",
    "✔ Transposing instruments sound <b>away from written</b> — B♭ trumpet: written C sounds B♭."
  ],
  tips:[
    "Check a transposition fast: play both versions' FIRST notes — that interval must hold for every pair.",
    "Singers ask for keys, not notes: 'take it down a whole step' = transpose everything down a M2.",
    "The degree method beats the interval method in fast sessions — think 1-3-5, not letter names.",
    "Next lesson: build a triad on EVERY degree of the scale — the diatonic seven."
  ],
  rewards:{ badge:"Key Mover", icon:"\u{1F4E6}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! One interval for every note; degrees never change.",
  quiz:[
    { type:"mc", q:"Transposition means…", choices:["performing music at a different pitch level","repeating a motive","changing the meter"], answer:0,
      explain:"New key, same music.", hint:"Move the whole thing." },
    { type:"mc", q:"In transposition every note moves…", choices:["by the same interval","by different intervals","only if it is sharp"], answer:0,
      explain:"One interval for all.", hint:"Uniform motion." },
    { type:"mc", q:"C-E-G transposed up a P5 is…", choices:["G-B-D","F-A-C","A-C-E"], answer:0,
      explain:"Each note up a perfect 5th.", hint:"C→G leads the way." },
    { type:"mc", q:"E transposed up a major 2nd is…", choices:["F♯","F","G"], answer:0,
      explain:"A whole step above E is F♯.", hint:"Watch the accidental." },
    { type:"mc", q:"In the key method, notes keep their…", choices:["scale degrees","letter names","octave"], answer:0,
      explain:"Degree 5 stays degree 5.", hint:"Think numbers." },
    { type:"mc", q:"Degrees 1-2-3 of F major are…", choices:["F-G-A","F-G-A♭","C-D-E"], answer:0,
      explain:"The first three notes of F major.", hint:"F major has one flat — B♭." },
    { type:"mc", q:"Identify the relationship.",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"D4",d:"q"},{p:"F#4",d:"q"},{p:"A4",d:"q"}],width:340},
      choices:["The second group is the first transposed up a M2","They are unrelated","The second is an inversion"], answer:0,
      explain:"C-E-G → D-F♯-A: everything up a whole step.", hint:"Compare note by note." },
    { type:"mc", q:"Why do musicians transpose songs for singers?", choices:["To fit the singer's comfortable range","To make songs longer","To change the lyrics"], answer:0,
      explain:"Range rescue.", hint:"Too high? Move it down." },
    { type:"mc", q:"A B♭ trumpet plays written C. The sounding pitch is…", choices:["B♭","C","D"], answer:0,
      explain:"The instrument name = the sounding pitch of written C.", hint:"Named for its note." },
    { type:"truefalse", q:"Transposition changes the scale degrees of a melody.", answer:false,
      explain:"Degrees are exactly what it preserves.", hint:"1-3-5 stays 1-3-5." },
    { type:"truefalse", q:"To keep intervals exact, transposed notes may need new accidentals.", answer:true,
      explain:"E up a M2 = F♯, never F.", hint:"Exactness first." },
    { type:"mc", q:"A melody in D major is transposed to G major. Every note moves…", choices:["up a perfect 4th","up a major 3rd","down a 5th only"], answer:0,
      explain:"D up to G = P4 (or down a P5 — one consistent choice).", hint:"D→G distance." }
  ],
  miaPerfect:"PERFECT! Any melody, any key, on demand. \u{1F4E6}\u{1F389}",
  miaPass:"Passed! Music moves where you send it. Next: triads on every degree…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Version 2 was version 1 moved up a perfect 5th — a transposition from C major to G major. Shape and degrees untouched.",
      play:()=>{[67,69,71,72,74,71,67].forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.42));} },
    learn:{ label:"transposition",
      explain:"Same music, new pitch level. By interval (every note the same distance) or by key (new signature, same degrees). Reasons: ranges, ease. B♭ instruments sound lower than written.",
      hint:"One interval for every note.",
      play:()=>{[60,64,67].forEach((m,i)=>MFAudio.tone(m,.4,i*.35,.42));[62,66,69].forEach((m,i)=>MFAudio.tone(m,.4,1.3+i*.35,.42));} },
    example:{ label:"the examples",
      explain:"Example 1 sends one motive through three keys by degrees; example 2 shows accidentals keeping the intervals exact." },
    game:{ label:"the games",
      explain:"Sprint the facts, play a motive in two keys, spot transpositions on cards, then translate degrees at speed.",
      hint:"Think degrees, not letters." },
    quiz:{ label:"this question",
      explain:"Two tools: the constant interval (check any note pair) and the degree method (1-3-5 stays 1-3-5 in any key).",
      play:()=>{[60,62,64].forEach((m,i)=>MFAudio.tone(m,.38,i*.32,.42));[65,67,69].forEach((m,i)=>MFAudio.tone(m,.38,1.2+i*.32,.42));} }
  }
};
