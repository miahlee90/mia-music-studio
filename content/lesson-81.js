/* Lesson 81 — Pentatonic Scales (Book 4, Unit 20 — SELF-AUTHORED)
   Core: PENTATONIC = five-note "gapped" scale. Major pentatonic = major
   scale minus 4 & 7. Minor pentatonic = natural minor minus 2 & 6.
   Relatives share notes (C major pent = A minor pent). The black keys form
   a pentatonic scale. Found in music worldwide.
   NOTE: edit by FULL-FILE REWRITE only. */

/* black-key improv: every black key belongs — free play */
function MF_L81_improv(container,fb){
  const PENTA=new Set([1,3,6,8,10]); /* black-key pitch classes */
  let hits=0;
  container.innerHTML=`<div class="big-q l81i-q" style="text-align:center">The five black keys form a PENTATONIC scale. Improvise using only the black keys — establish either G♭ or E♭ as the tonal center, and create short rhythmic and melodic patterns.</div>
    <div class="l81i-kb"></div>
    <div class="streak l81i-s" style="text-align:center"></div>`;
  const kh=container.querySelector(".l81i-kb"), s=container.querySelector(".l81i-s");
  Keyboard.create(kh,{start:60,octaves:2,labels:true,
    onKey:m=>{
      if(PENTA.has(m%12)){ hits++; s.textContent=`\u{2B50} pentatonic note · total: ${hits}`;
        if(hits===10){ MFAudio.yay(); fb(true,"✓ Ten black-key notes — you are improvising on the pentatonic scale. Keep a clear tonal center, and shape your rhythm and phrasing."); } }
      else { s.textContent="that was a white key — stay on the black keys"; fb(false,"White key — the black-key pentatonic uses only the five black keys."); }
    }});
}

LESSON_CONTENT[81]={
  welcome:"Pentatonic scales use five notes per octave.",
  hook:{
    say:"<b>This melody uses only five different pitches.</b> \u{1F447} <b>Listen carefully: how many different pitches do you hear?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the melody</button></div>
          <div class="choices hk-ch" style="display:none"><button>Five — a pentatonic scale</button><button>Seven — a diatonic scale</button><button>Twelve — the complete chromatic collection</button></div>`;
        const MEL=[60,62,64,67,69,72,69,67,64,62,60];
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ MEL.forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.42)); setTimeout(()=>ch.style.display="",MEL.length*300+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Correct. The melody uses C, D, E, G, and A — the notes of the C major pentatonic scale. The prefix “penta-” means five.");
          else fb(false,"Listen again and count the different pitches. This melody does not use F or B.");
        });
      } }
  },
  objectives:[
    "Define pentatonic: a scale of five pitch classes per octave",
    "Build the MAJOR pentatonic: major scale minus degrees 4 and 7",
    "Build the MINOR pentatonic: natural minor minus degrees 2 and 6",
    "Connect relatives: C major pentatonic = A minor pentatonic",
    "Play the black-key pentatonic",
    "Know the pentatonic's place in world music"
  ],
  steps:[
    { say:"<b>Pentatonic Scale:</b> A pentatonic scale contains <b>five different pitch classes</b> within an octave. Major and minor pentatonic scales can be derived from seven-note major and natural minor scales by omitting two scale degrees. These two common forms contain no half steps, although other types of pentatonic scales may include them. \u{1F447} <b>How many different pitch classes are in a pentatonic scale?</b>",
      try:{ type:"mc", choices:["Five","Seven","Twelve"], answer:0,
        success:"✓ Correct. A pentatonic scale contains five different pitch classes within an octave.",
        fail:"The prefix “penta-” refers to the number five.",
        hint:"A pentagon has five sides." } },
    { say:"<b>Major Pentatonic Scale:</b> One way to construct a major pentatonic scale is to begin with a major scale and <b>omit scale degrees 4 and 7</b>. For example, C major pentatonic is <b>C–D–E–G–A</b>. Omitting F and B removes the half steps found in the C major scale. \u{1F447} <b>Which scale degrees of the major scale are omitted to form the major pentatonic scale?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 10px">Major scale</th><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800;color:#2F6DA8">C</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800;color:#2F6DA8">D</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800;color:#2F6DA8">E</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center">F</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800;color:#2F6DA8">G</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800;color:#2F6DA8">A</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center">B</td></tr>
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 10px">Major pentatonic</th><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800">C</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800">D</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800">E</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;color:#C05A21">—</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800">G</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800">A</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;color:#C05A21">—</td></tr></table>` },
      try:{ type:"mc", choices:["Scale degrees 4 and 7","Scale degrees 2 and 6","Scale degrees 1 and 5"], answer:0,
        success:"✓ Correct. Omitting scale degrees 4 and 7 produces the major pentatonic pattern without half steps.",
        fail:"Identify the scale degrees involved in the major scale’s two half steps.",
        hint:"In C major, omit F and B." } },
    { say:"<b>Minor Pentatonic Scale:</b> One way to construct a minor pentatonic scale is to begin with a natural minor scale and <b>omit scale degrees 2 and 6</b>. For example, A minor pentatonic is <b>A–C–D–E–G</b>. This scale is widely used in blues, rock, folk, and many other musical styles. \u{1F447} <b>Which notes form the A minor pentatonic scale?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:110,notes:[
        {p:"A3",d:"q",label:"1"},{p:"C4",d:"q",label:"3"},{p:"D4",d:"q",label:"4"},
        {p:"E4",d:"q",label:"5"},{p:"G4",d:"q",label:"7"},{p:"A4",d:"q",label:"8"},{bar:"final"}],width:440} },
      try:{ type:"mc", choices:["A, C, D, E, G","A, B, C, D, E","A, C, E only"], answer:0,
        success:"✓ Correct. Begin with A natural minor and omit scale degree 2, B, and scale degree 6, F.",
        fail:"Begin with A natural minor and omit its second and sixth scale degrees.",
        hint:"Use scale degrees 1, 3, 4, 5, and 7." } },
    { say:"<b>Relative Pentatonic Scales:</b> C major pentatonic and A minor pentatonic contain <b>the same five pitch classes</b>: C, D, E, G, and A. Their tonal centers differ, just as relative major and minor keys share a key signature but have different tonics. \u{1F447} <b>Which minor pentatonic scale contains the same pitch collection as G major pentatonic?</b>",
      try:{ type:"mc", choices:["E minor pentatonic","G minor pentatonic","C minor pentatonic"], answer:0,
        success:"✓ Correct. G major pentatonic and E minor pentatonic share the pitch collection G–A–B–D–E but establish different tonal centers.",
        fail:"Find the relative minor tonic of G major.",
        hint:"Move down a minor third from G to E." } },
    { say:"<b>The Black Keys:</b> The five black-key pitch classes form G♭ major pentatonic when G♭ is heard as the tonic and E♭ minor pentatonic when E♭ is heard as the tonic. <b>Major pentatonic uses scale degrees 1, 2, 3, 5, and 6; minor pentatonic uses 1, 3, 4, 5, and 7.</b> \u{1F447} <b>Improvise using only the black keys.</b>",
      try:{ type:"custom",
        hint:"Establish either G♭ or E♭ as the tonal center, and create short rhythmic and melodic patterns using the five black keys.",
        mount:(container,fb)=>MF_L81_improv(container,fb) } },
    { say:"<b>Pentatonic Scales in Musical Traditions:</b> Many types of five-note scales appear in musical traditions throughout the world, including traditions from <b>East Asia, Africa, Europe, and the Americas</b>. Pentatonic collections also appear in spirituals, blues, rock, jazz, and contemporary popular music. Their structures and musical functions vary across cultures and styles. \u{1F447} <b>Why do the major and minor pentatonic scales contain no half steps?</b>",
      try:{ type:"mc", choices:["Their construction omits the scale degrees that form half steps in the related major or natural minor scale","They contain additional sharps","They must be performed slowly"], answer:0,
        success:"✓ Correct. The major and minor pentatonic patterns omit the scale degrees that would create half steps.",
        fail:"In the major pentatonic scale, what interval type disappears when scale degrees 4 and 7 are omitted?",
        hint:"Compare the major scale with its major pentatonic form." } },
    { say:"<b>Review:</b> \u{1F447} <b>Which spelling represents C major pentatonic?</b>",
      try:{ type:"mc", choices:["C–D–E–G–A","C–D–E–F–G","C–E♭–F–G–B♭"], answer:0,
        success:"✓ Correct. C major pentatonic contains scale degrees 1, 2, 3, 5, and 6 of C major.",
        fail:"Omit scale degrees 4 and 7 of C major.",
        hint:"Use C, D, E, G, and A." } }
  ],
  examples:[
    { caption:"A major-pentatonic melody: C–D–E–G–A only. With no 4th or 7th, the melody contains no half steps — a familiar folk-song sound.",
      staff:{clef:"treble",tempo:96,notes:[
        {p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},
        {p:"A4",d:"h"},{p:"G4",d:"q"},{p:"E4",d:"q"},
        {p:"D4",d:"q"},{p:"C4",d:"h",label:"home"},{bar:"final"}],width:600},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"The same five notes, tonic moved to A: the minor pentatonic — widely used in blues, rock and many other styles.",
      staff:{clef:"treble",tempo:96,notes:[
        {p:"A3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},
        {p:"G4",d:"h"},{p:"E4",d:"q"},{p:"D4",d:"q"},
        {p:"C4",d:"q"},{p:"A3",d:"h",label:"home"},{bar:"final"}],width:600},
      kb:{start:45,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Pentatonic Sprint (45s)",
      intro:"Identify pentatonic spellings, omitted scale degrees, and relative pairs before time runs out.",
      miaIntro:"Check the five scale degrees carefully.",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Pentatonic","five pitch classes per octave"],
        ["Major pentatonic","major scale minus 4 and 7"],
        ["Minor pentatonic","natural minor minus 2 and 6"],
        ["C major pentatonic","C-D-E-G-A"],
        ["A minor pentatonic","A-C-D-E-G"],
        ["The black keys","a built-in pentatonic"],
        ["Relative pentatonics","same notes, different tonic"],
        ["Half steps in major and minor pentatonic","none remain"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — Pentatonic-scale challenge completed!":null },
    { type:"key-climb", title:"Game 2 · Climb the Two Pentatonics",
      intro:"Play the C major pentatonic scale ascending, followed by the A minor pentatonic scale.",
      miaIntro:"The scales share the same pitch collection but have different tonics.",
      spec:{seq:[60,62,64,67,69,72, 57,60,62,64,67,69],
        names:["C","D","E","G","A","C (top)","A (new home)","C","D","E","G","A (top)"],
        start:57, octaves:2, title:"Major pentatonic, then its relative minor"},
      result:(score)=>score!==null?"You performed both pentatonic scales correctly.":null },
    { type:"symbol-hunt", title:"Game 3 · Spot the Pentatonic",
      intro:"Examine each scale and select the requested pentatonic scale.",
      miaIntro:"Count the pitch classes and examine the interval pattern.",
      spec:{rounds:6, pool:[
        {label:"C major pentatonic", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"}],width:190}},
        {label:"A minor pentatonic", spec:{clef:"treble",notes:[{p:"A3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"}],width:190}},
        {label:"Full C major scale", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"}],width:230}},
        {label:"C minor blues scale", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"Eb4",d:"q"},{p:"F4",d:"q"},{p:"Gb4",d:"q"},{p:"G4",d:"q"},{p:"Bb4",d:"q"}],width:210}}]},
      result:(score)=>score>=5?"You identified the pentatonic scales correctly.":null },
    { type:"term-race", title:"Game 4 · Build a Pentatonic Scale",
      intro:"Select the scale degrees needed to construct each pentatonic scale.",
      miaIntro:"Major omits 4 and 7; minor omits 2 and 6.",
      spec:{rounds:8, reverse:true, pool:[
        ["Major pentatonic removes","degrees 4 and 7"],
        ["Minor pentatonic removes","degrees 2 and 6"],
        ["G major pentatonic","G-A-B-D-E"],
        ["E minor pentatonic","E-G-A-B-D"],
        ["Gapped scale","a scale with omitted notes"],
        ["Half steps in major/minor pentatonic","none"],
        ["Widely used in blues and rock","the minor pentatonic"],
        ["Folk melodies worldwide","often pentatonic"]]},
      result:(score)=>score>=6?"You constructed the pentatonic scales correctly.":null }
  ],
  practiceIntro:"Complete 20 practice questions on pentatonic spellings, omitted scale degrees, and relative pairs. The next question will appear after each correct answer.",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Pentatonic","five notes"],["Major pent","− 4 & 7"],["Minor pent","− 2 & 6"],["Gapped scale","omitted notes"],["Black keys","pentatonic"]], reverse:true}, count:6 },
    { gen:"rel-key", params:{ask:"both"}, count:2 },
    { type:"mc", q:"C major pentatonic is spelled…", choices:["C-D-E-G-A","C-D-E-F-G","C-E-G-B-D"], answer:0,
      explain:"C major pentatonic contains scale degrees 1, 2, 3, 5, and 6 of C major." },
    { type:"mc", q:"A minor pentatonic is spelled…", choices:["A-C-D-E-G","A-B-C-D-E","A-C-E-G-B"], answer:0,
      explain:"A minor pentatonic contains scale degrees 1, 3, 4, 5, and 7 of A natural minor." },
    { type:"mc", q:"Which two degrees does the MAJOR pentatonic omit?", choices:["4 and 7","2 and 6","1 and 8"], answer:0,
      explain:"The major pentatonic scale omits scale degrees 4 and 7." },
    { type:"mc", q:"Which two degrees does the MINOR pentatonic omit?", choices:["2 and 6","4 and 7","3 and 5"], answer:0,
      explain:"The minor pentatonic scale omits scale degrees 2 and 6." },
    { type:"truefalse", q:"The major and minor pentatonic scales taught in this lesson contain no half steps.", answer:true,
      explain:"Their interval patterns consist of whole steps and minor thirds. Other pentatonic scales may contain half steps." },
    { type:"truefalse", q:"C major pentatonic and A minor pentatonic share the same five notes.", answer:true,
      explain:"They share the same pitch collection but establish different tonics." },
    { type:"truefalse", q:"The five black-key pitch classes can form G♭ major pentatonic or E♭ minor pentatonic.", answer:true,
      explain:"The same five pitch classes form different relative pentatonic scales depending on the tonal center." },
    { gen:"term-match", params:{subject:"term", pool:[["C-D-E-G-A","C major pentatonic"],["A-C-D-E-G","A minor pentatonic"],["G-A-B-D-E","G major pentatonic"],["Relative pair","same notes, new tonic"]], reverse:true}, count:3 },
    { gen:"degree-name", params:{ask:"name"}, count:2 }
  ],
  vocabulary:[
    {term:"Pentatonic Scale", def:"A scale of five different pitch classes per octave (penta = five)."},
    {term:"Gapped Scale", def:"A term sometimes used for scales with omitted notes — major and minor pentatonic scales omit two degrees of a seven-note scale."},
    {term:"Major Pentatonic", def:"Major scale minus degrees 4 and 7. C: C-D-E-G-A."},
    {term:"Minor Pentatonic", def:"Natural minor minus degrees 2 and 6. A: A-C-D-E-G."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Pentatonic</b> = five pitch classes per octave; the major and minor forms contain <b>no half steps</b>.",
    "✔ <b>Major pentatonic</b> = major − 4 & 7 (C-D-E-G-A).",
    "✔ <b>Minor pentatonic</b> = natural minor − 2 & 6 (A-C-D-E-G).",
    "✔ Relatives share all five notes — C major pent = A minor pent.",
    "✔ The <b>black keys</b> form a pentatonic; many types of five-note scales appear in traditions worldwide."
  ],
  tips:[
    "Improvising with the major or minor pentatonic? A clear tonal center, rhythm and phrasing still matter.",
    "Blues soloing: minor pentatonic + the ♭5 from Lesson 71 = the commonly taught minor blues scale.",
    "Sing a spiritual or a lullaby and check the notes — many use only five.",
    "Next lesson: whole-tone and chromatic scales — scales that do not point to a tonic by structure alone."
  ],
  rewards:{ badge:"Pentatonic Voyager", icon:"\u{2B50}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz: Identify five-note scales, omitted scale degrees, and relative pentatonic pairs.",
  quiz:[
    { type:"mc", q:"How many different pitch classes does a pentatonic scale contain within an octave?", choices:["5","7","6"], answer:0,
      explain:"Penta = five.", hint:"The name says it." },
    { type:"mc", q:"Why are major and minor pentatonic scales sometimes described as gapped scales?", choices:["They omit two scale degrees from the related seven-note scale","They omit entire octaves","They add chromatic notes"], answer:0,
      explain:"They can be constructed by omitting two scale degrees from a major or natural minor scale.", hint:"Gaps = missing notes." },
    { type:"mc", q:"The major pentatonic removes…", choices:["scale degrees 4 and 7","scale degrees 2 and 6","scale degrees 1 and 5"], answer:0,
      explain:"C major → C–D–E–G–A.", hint:"F and B leave C major." },
    { type:"mc", q:"The minor pentatonic removes…", choices:["scale degrees 2 and 6","scale degrees 4 and 7","scale degrees 3 and 7"], answer:0,
      explain:"A minor → A–C–D–E–G.", hint:"B and F leave A minor." },
    { type:"mc", q:"G major pentatonic is spelled…", choices:["G–A–B–D–E","G–A–B–C–D","G–B–D–F–A"], answer:0,
      explain:"G major minus C (4) and F♯ (7).", hint:"Five notes, no 4 or 7." },
    { type:"mc", q:"Which pentatonic shares its notes with C major pentatonic?", choices:["A minor pentatonic","C minor pentatonic","G major pentatonic"], answer:0,
      explain:"The relative pentatonic pair: C–D–E–G–A = A–C–D–E–G.", hint:"Down a minor 3rd." },
    { type:"mc", q:"Identify the scale.",
      staff:{clef:"treble",notes:[{p:"A3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"}],width:300},
      choices:["A minor pentatonic","A natural minor","A major pentatonic"], answer:0,
      explain:"The scale contains the five pitch classes A–C–D–E–G, the notes of A minor pentatonic.", hint:"Compare the pitches with scale degrees 1, 3, 4, 5, and 7 of A natural minor." },
    { type:"truefalse", q:"The major and minor pentatonic scales taught in this lesson contain half steps.", answer:false,
      explain:"These two pentatonic patterns contain whole steps and minor thirds but no half steps. Other pentatonic scales may include half steps.", hint:"Examine the interval pattern." },
    { type:"truefalse", q:"The five black-key pitch classes can form G♭ major pentatonic or E♭ minor pentatonic.", answer:true,
      explain:"G♭ major / E♭ minor pentatonic.", hint:"Try it at the piano." },
    { type:"mc", q:"Adding a chromatic pitch between scale degrees 4 and 5 of the minor pentatonic scale produces which commonly taught scale?", choices:["the minor blues scale","the major scale","the Dorian mode"], answer:0,
      explain:"In A, adding E♭ to A–C–D–E–G produces the commonly taught minor blues scale: A–C–D–E♭–E–G.", hint:"Add the chromatic pitch between D and E." },
    { type:"mc", q:"In which statement is the use of pentatonic scales described most accurately?", choices:["Many types of pentatonic scales appear in musical traditions throughout the world","Pentatonic scales occur only in European music","Pentatonic scales occur only in modern popular music"], answer:0,
      explain:"Five-note scales occur in many cultures, although their interval patterns and musical functions vary.", hint:"Pentatonic scales are not limited to one culture or historical period." },
    { type:"mc", q:"Why are the black keys useful for practicing major and minor pentatonic improvisation?", choices:["They form a five-note collection that can be heard as G♭ major pentatonic or E♭ minor pentatonic","Black keys are quieter than white keys","Black keys use a different tuning system"], answer:0,
      explain:"The five black-key pitch classes form a major/minor pentatonic relative pair. Effective improvisation still requires rhythm, phrasing, and a clear tonal center.", hint:"Identify the five-note pitch collection." }
  ],
  miaPerfect:"Perfect score! You accurately constructed and identified major and minor pentatonic scales.",
  miaPass:"You passed! Next, you will compare whole-tone and chromatic scales.",
  mia:{
    hook:{ label:"the welcome",
      explain:"The melody used only C, D, E, G, A — the major pentatonic. Removing degrees 4 and 7 removes every half step.",
      play:()=>{[60,62,64,67,69,72,69,67,64,62,60].forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.42));} },
    learn:{ label:"pentatonic scales",
      explain:"Five pitch classes per octave. Major pent = major − 4 & 7; minor pent = minor − 2 & 6; relatives share notes; black keys form a pentatonic; found in many traditions.",
      hint:"Subtract two, keep five.",
      play:()=>{[60,62,64,67,69,72].forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.42));} },
    example:{ label:"the examples",
      explain:"Example 1 sings the major pentatonic; example 2 moves the same notes to the A tonic — the minor pentatonic." },
    game:{ label:"the games",
      explain:"Sprint the facts, climb both pentatonics, spot pentatonic scales on cards, then build pentatonics at speed.",
      hint:"Major −4&7 · minor −2&6." },
    quiz:{ label:"this question",
      explain:"Two formulas answer everything: major pentatonic = major − 4 & 7; minor pentatonic = natural minor − 2 & 6. Relatives share all five notes.",
      play:()=>{[57,60,62,64,67,69].forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.42));} }
  }
};
