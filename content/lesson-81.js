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
  container.innerHTML=`<div class="big-q l81i-q" style="text-align:center">The black keys form a PENTATONIC scale. Improvise on black keys only — every note will fit.</div>
    <div class="l81i-kb"></div>
    <div class="streak l81i-s" style="text-align:center"></div>`;
  const kh=container.querySelector(".l81i-kb"), s=container.querySelector(".l81i-s");
  Keyboard.create(kh,{start:60,octaves:2,labels:true,
    onKey:m=>{
      if(PENTA.has(m%12)){ hits++; s.textContent=`\u{2B50} pentatonic note · total: ${hits}`;
        if(hits===10){ MFAudio.yay(); fb(true,"✓ Ten black-key notes — you are improvising on the pentatonic scale. No wrong notes: gapped scales remove the half-step clashes."); } }
      else { s.textContent="that was a white key — stay on the black keys"; fb(false,"White key — the black-key pentatonic uses only the five black keys."); }
    }});
}

LESSON_CONTENT[81]={
  welcome:"Pentatonic scales: five notes, no collisions. \u{2B50}",
  hook:{
    say:"<b>This melody uses only five different notes</b> — and it is almost impossible to make it sound wrong. \u{1F447} <b>Listen: how many DIFFERENT notes do you hear?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the melody</button></div>
          <div class="choices hk-ch" style="display:none"><button>Five — a pentatonic scale</button><button>Seven — a full major scale</button><button>Twelve — the chromatic scale</button></div>`;
        const MEL=[60,62,64,67,69,72,69,67,64,62,60];
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ MEL.forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.42)); setTimeout(()=>ch.style.display="",MEL.length*300+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Just five: C, D, E, G, A — the MAJOR PENTATONIC scale. Penta = five. Five-note scales power folk songs on every continent. Today's lesson!");
          else fb(false,"Listen again and count — no F, no B ever appears…");
        });
      } }
  },
  objectives:[
    "Define pentatonic: a five-note (gapped) scale",
    "Build the MAJOR pentatonic: major scale minus degrees 4 and 7",
    "Build the MINOR pentatonic: natural minor minus degrees 2 and 6",
    "Connect relatives: C major pentatonic = A minor pentatonic",
    "Play the black-key pentatonic",
    "Know the pentatonic's place in world music"
  ],
  steps:[
    { say:"<b>Pentatonic Scale:</b> a scale of <b>five notes</b> per octave (penta = five). Because two notes are omitted, it is called a <b>gapped scale</b> — the gaps remove the half-step tensions. \u{1F447} <b>How many notes are in a pentatonic scale?</b>",
      try:{ type:"mc", choices:["Five","Seven","Twelve"], answer:0,
        success:"✓ Five notes — a gapped scale with the clashes removed.",
        fail:"Penta- means…",
        hint:"Pentagon = five sides." } },
    { say:"<b>Major Pentatonic:</b> take a major scale and <b>remove degrees 4 and 7</b> — the two notes that form half steps. C major pentatonic: <b>C - D - E - G - A</b>. \u{1F447} <b>Which degrees are removed?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 10px">Major scale</th><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800;color:#2F6DA8">C</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800;color:#2F6DA8">D</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800;color:#2F6DA8">E</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center">F</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800;color:#2F6DA8">G</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800;color:#2F6DA8">A</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center">B</td></tr>
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 10px">Major pentatonic</th><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800">C</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800">D</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800">E</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;color:#C05A21">—</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800">G</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;font-weight:800">A</td><td style="border:1.5px solid #cdd5e1;padding:5px 10px;text-align:center;color:#C05A21">—</td></tr></table>` },
      try:{ type:"mc", choices:["4 and 7","2 and 6","1 and 5"], answer:0,
        success:"✓ Degrees 4 and 7 leave — and every half step leaves with them.",
        fail:"The removed notes are the half-step makers…",
        hint:"F and B in C major." } },
    { say:"<b>Minor Pentatonic:</b> take natural minor and <b>remove degrees 2 and 6</b>. A minor pentatonic: <b>A - C - D - E - G</b> — the rock and blues soloist's home scale. \u{1F447} <b>A minor pentatonic contains…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:110,notes:[
        {p:"A3",d:"q",label:"1"},{p:"C4",d:"q",label:"3"},{p:"D4",d:"q",label:"4"},
        {p:"E4",d:"q",label:"5"},{p:"G4",d:"q",label:"7"},{p:"A4",d:"q",label:"8"},{bar:"final"}],width:440} },
      try:{ type:"mc", choices:["A, C, D, E, G","A, B, C, D, E","A, C, E only"], answer:0,
        success:"✓ Five notes: natural minor minus its 2nd (B) and 6th (F).",
        fail:"Remove B and F from A natural minor…",
        hint:"Degrees 1, 3, 4, 5, 7." } },
    { say:"<b>Relative Pentatonics:</b> C major pentatonic (C-D-E-G-A) and A minor pentatonic (A-C-D-E-G) use <b>the same five notes</b> — like relative major and minor keys, only the tonic differs. \u{1F447} <b>G major pentatonic shares its notes with…</b>",
      try:{ type:"mc", choices:["E minor pentatonic","G minor pentatonic","C major pentatonic"], answer:0,
        success:"✓ Same five notes (G-A-B-D-E), tonic on E — the relative pair works exactly like keys.",
        fail:"Find G's relative minor…",
        hint:"Down a minor 3rd from G." } },
    { say:"<b>The Black Keys:</b> the five black keys form a ready-made pentatonic scale (G♭ major / E♭ minor pentatonic). <b>Remember: major pentatonic = major − 4 & 7 · minor pentatonic = minor − 2 & 6.</b> \u{1F447} <b>Improvise on black keys only:</b>",
      try:{ type:"custom",
        hint:"Black keys only — every combination works.",
        mount:(container,fb)=>MF_L81_improv(container,fb) } },
    { say:"<b>Pentatonics Around the World:</b> five-note scales appear in folk music of <b>East Asia, West Africa, Scotland and the Americas</b> — and in spirituals, blues and rock. The gapped design travels because it always sounds smooth. \u{1F447} <b>Why does the pentatonic avoid harsh clashes?</b>",
      try:{ type:"mc", choices:["Its gaps remove the half-step tensions","It has extra sharps","It is always played slowly"], answer:0,
        success:"✓ No half steps = no strong clashes — smooth in any combination.",
        fail:"What did removing 4 and 7 eliminate?",
        hint:"The half steps left with them." } },
    { say:"<b>Review:</b> \u{1F447} <b>Which spelling is the C MAJOR pentatonic?</b>",
      try:{ type:"mc", choices:["C-D-E-G-A","C-D-E-F-G","C-E♭-F-G-B♭"], answer:0,
        success:"✓ Major scale minus 4 (F) and 7 (B).",
        fail:"No F, no B…",
        hint:"Five notes, no half steps." } }
  ],
  examples:[
    { caption:"A major-pentatonic melody: C-D-E-G-A only. With no 4th or 7th, every leap lands safely — the folk-song sound.",
      staff:{clef:"treble",tempo:96,notes:[
        {p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},
        {p:"A4",d:"h"},{p:"G4",d:"q"},{p:"E4",d:"q"},
        {p:"D4",d:"q"},{p:"C4",d:"h",label:"home"},{bar:"final"}],width:600},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"The same five notes, tonic moved to A: the minor pentatonic — the backbone of blues and rock solos.",
      staff:{clef:"treble",tempo:96,notes:[
        {p:"A3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},
        {p:"G4",d:"h"},{p:"E4",d:"q"},{p:"D4",d:"q"},
        {p:"C4",d:"q"},{p:"A3",d:"h",label:"home"},{bar:"final"}],width:600},
      kb:{start:45,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Pentatonic Sprint (45s)",
      intro:"Spellings, removals and relatives — race the facts!",
      miaIntro:"Five notes, fast! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Pentatonic","a five-note (gapped) scale"],
        ["Major pentatonic","major scale minus 4 and 7"],
        ["Minor pentatonic","natural minor minus 2 and 6"],
        ["C major pentatonic","C-D-E-G-A"],
        ["A minor pentatonic","A-C-D-E-G"],
        ["The black keys","a built-in pentatonic"],
        ["Relative pentatonics","same notes, different tonic"],
        ["Why it sounds smooth","no half steps remain"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — pentatonic fluent!":null },
    { type:"key-climb", title:"Game 2 · Climb the Two Pentatonics",
      intro:"Play C major pentatonic up, then A minor pentatonic up!",
      miaIntro:"Same notes, two homes! \u{1FA9C}",
      spec:{seq:[60,62,64,67,69,72, 57,60,62,64,67,69],
        names:["C","D","E","G","A","C (top)","A (new home)","C","D","E","G","A (top)"],
        start:57, octaves:2, title:"Major pentatonic, then its relative minor"},
      result:(score)=>score!==null?"Both pentatonics under your fingers!":null },
    { type:"symbol-hunt", title:"Game 3 · Spot the Pentatonic",
      intro:"Scales on cards — click the one each round names!",
      miaIntro:"Count the notes, find the gaps! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"C major pentatonic", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"}],width:190}},
        {label:"A minor pentatonic", spec:{clef:"treble",notes:[{p:"A3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"}],width:190}},
        {label:"Full C major scale", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"}],width:230}},
        {label:"C blues scale", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"Eb4",d:"q"},{p:"F4",d:"q"},{p:"Gb4",d:"q"},{p:"G4",d:"q"},{p:"Bb4",d:"q"}],width:210}}]},
      result:(score)=>score>=5?"Gapped scales spotted instantly!":null },
    { type:"term-race", title:"Game 4 · Build-a-Pentatonic Race",
      intro:"Which notes leave, which stay — at speed!",
      miaIntro:"Subtract two, keep five! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Major pentatonic removes","degrees 4 and 7"],
        ["Minor pentatonic removes","degrees 2 and 6"],
        ["G major pentatonic","G-A-B-D-E"],
        ["E minor pentatonic","E-G-A-B-D"],
        ["Gapped scale","a scale with omitted notes"],
        ["Half steps in a pentatonic","none"],
        ["Blues soloist's home","the minor pentatonic"],
        ["Folk melodies worldwide","often pentatonic"]]},
      result:(score)=>score>=6?"Pentatonics built blind!":null }
  ],
  practiceIntro:"20 practice questions — spellings, removals and relatives. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Pentatonic","five notes"],["Major pent","− 4 & 7"],["Minor pent","− 2 & 6"],["Gapped scale","omitted notes"],["Black keys","pentatonic"]], reverse:true}, count:6 },
    { gen:"rel-key", params:{ask:"both"}, count:2 },
    { type:"mc", q:"C major pentatonic is spelled…", choices:["C-D-E-G-A","C-D-E-F-G","C-E-G-B-D"], answer:0,
      explain:"Major minus 4 (F) and 7 (B)." },
    { type:"mc", q:"A minor pentatonic is spelled…", choices:["A-C-D-E-G","A-B-C-D-E","A-C-E-G-B"], answer:0,
      explain:"Natural minor minus 2 (B) and 6 (F)." },
    { type:"mc", q:"Which two degrees does the MAJOR pentatonic omit?", choices:["4 and 7","2 and 6","1 and 8"], answer:0,
      explain:"The half-step makers." },
    { type:"mc", q:"Which two degrees does the MINOR pentatonic omit?", choices:["2 and 6","4 and 7","3 and 5"], answer:0,
      explain:"Natural minor's half-step makers." },
    { type:"truefalse", q:"A pentatonic scale contains no half steps.", answer:true,
      explain:"That is why it never clashes." },
    { type:"truefalse", q:"C major pentatonic and A minor pentatonic share the same five notes.", answer:true,
      explain:"Relatives — only the tonic differs." },
    { type:"truefalse", q:"The black keys of the piano form a pentatonic scale.", answer:true,
      explain:"Five black keys, pentatonic pattern." },
    { gen:"term-match", params:{subject:"term", pool:[["C-D-E-G-A","C major pentatonic"],["A-C-D-E-G","A minor pentatonic"],["G-A-B-D-E","G major pentatonic"],["Relative pair","same notes, new tonic"]], reverse:true}, count:3 },
    { gen:"degree-name", params:{ask:"name"}, count:2 }
  ],
  vocabulary:[
    {term:"Pentatonic Scale", def:"A five-note scale (penta = five)."},
    {term:"Gapped Scale", def:"A scale with omitted notes — the pentatonic omits two of the seven."},
    {term:"Major Pentatonic", def:"Major scale minus degrees 4 and 7. C: C-D-E-G-A.",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"}],width:150}},
    {term:"Minor Pentatonic", def:"Natural minor minus degrees 2 and 6. A: A-C-D-E-G.",
      staff:{clef:"treble",notes:[{p:"A3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"}],width:150}}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Pentatonic</b> = five notes; a <b>gapped</b> scale with <b>no half steps</b>.",
    "✔ <b>Major pentatonic</b> = major − 4 & 7 (C-D-E-G-A).",
    "✔ <b>Minor pentatonic</b> = natural minor − 2 & 6 (A-C-D-E-G).",
    "✔ Relatives share all five notes — C major pent = A minor pent.",
    "✔ The <b>black keys</b> are a pentatonic; folk traditions worldwide use the pattern."
  ],
  tips:[
    "Stuck improvising? Switch to the pentatonic — the clashes are pre-removed.",
    "Blues soloing: minor pentatonic + the ♭5 from Lesson 71 = the blues scale.",
    "Sing a spiritual or a lullaby and check the notes — many use only five.",
    "Next lesson: two scales with NO tonic pull at all — whole tone and chromatic."
  ],
  rewards:{ badge:"Pentatonic Voyager", icon:"\u{2B50}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Five notes, two removals, one smooth sound.",
  quiz:[
    { type:"mc", q:"A pentatonic scale has how many notes?", choices:["5","7","6"], answer:0,
      explain:"Penta = five.", hint:"The name says it." },
    { type:"mc", q:"Why is the pentatonic called a gapped scale?", choices:["Notes are omitted from the seven-note scale","It skips octaves","It has extra notes"], answer:0,
      explain:"Two of seven notes are removed.", hint:"Gaps = missing notes." },
    { type:"mc", q:"The major pentatonic removes…", choices:["degrees 4 and 7","degrees 2 and 6","degrees 1 and 5"], answer:0,
      explain:"C major → C-D-E-G-A.", hint:"F and B leave C major." },
    { type:"mc", q:"The minor pentatonic removes…", choices:["degrees 2 and 6","degrees 4 and 7","degrees 3 and 7"], answer:0,
      explain:"A minor → A-C-D-E-G.", hint:"B and F leave A minor." },
    { type:"mc", q:"G major pentatonic is spelled…", choices:["G-A-B-D-E","G-A-B-C-D","G-B-D-F-A"], answer:0,
      explain:"G major minus C (4) and F♯ (7).", hint:"Five notes, no 4 or 7." },
    { type:"mc", q:"Which pentatonic shares its notes with C major pentatonic?", choices:["A minor pentatonic","C minor pentatonic","G major pentatonic"], answer:0,
      explain:"The relative pair: C-D-E-G-A = A-C-D-E-G.", hint:"Down a minor 3rd." },
    { type:"mc", q:"Identify the scale.",
      staff:{clef:"treble",notes:[{p:"A3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"}],width:300},
      choices:["A minor pentatonic","A natural minor","A major pentatonic"], answer:0,
      explain:"Five different notes: A-C-D-E-G.", hint:"Count the different letters." },
    { type:"truefalse", q:"A pentatonic scale contains half steps.", answer:false,
      explain:"The removals eliminate them all.", hint:"Why it never clashes." },
    { type:"truefalse", q:"The five black keys form a pentatonic scale.", answer:true,
      explain:"G♭ major / E♭ minor pentatonic.", hint:"Try it at the piano." },
    { type:"mc", q:"The minor pentatonic plus a lowered 5th equals…", choices:["the blues scale","the major scale","Dorian"], answer:0,
      explain:"A-C-D-(E♭)-E-G — Lesson 71's scale.", hint:"One added blue note." },
    { type:"mc", q:"Pentatonic melodies appear in…", choices:["folk traditions on every continent","only European music","only modern pop"], answer:0,
      explain:"East Asia, Africa, Scotland, the Americas and beyond.", hint:"It travels." },
    { type:"mc", q:"Why does black-key improvising always sound smooth?", choices:["The black keys form a pentatonic — no half steps","Black keys are quieter","They are tuned differently"], answer:0,
      explain:"Gapped = clash-free.", hint:"Which scale are they?" }
  ],
  miaPerfect:"PERFECT! Five notes and you own them all. \u{2B50}\u{1F389}",
  miaPass:"Passed! The gapped scale is yours. Next: whole tone and chromatic…",
  mia:{
    hook:{ label:"the welcome",
      explain:"The melody used only C, D, E, G, A — the major pentatonic. Removing degrees 4 and 7 removes every half step.",
      play:()=>{[60,62,64,67,69,72,69,67,64,62,60].forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.42));} },
    learn:{ label:"pentatonic scales",
      explain:"Five-note gapped scale. Major pent = major − 4 & 7; minor pent = minor − 2 & 6; relatives share notes; black keys = pentatonic; worldwide folk scale.",
      hint:"Subtract two, keep five.",
      play:()=>{[60,62,64,67,69,72].forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.42));} },
    example:{ label:"the examples",
      explain:"Example 1 sings the major pentatonic; example 2 moves the same notes to the A tonic — the minor pentatonic." },
    game:{ label:"the games",
      explain:"Sprint the facts, climb both pentatonics, spot gapped scales on cards, then build pentatonics at speed.",
      hint:"Major −4&7 · minor −2&6." },
    quiz:{ label:"this question",
      explain:"Two formulas answer everything: major pentatonic = major − 4 & 7; minor pentatonic = natural minor − 2 & 6. Relatives share all five notes.",
      play:()=>{[57,60,62,64,67,69].forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.42));} }
  }
};
