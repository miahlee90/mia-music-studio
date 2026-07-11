/* Lesson 90 — Texture (Book 4, Unit 22 — SELF-AUTHORED)
   Core: MONOPHONIC = one melody alone · HOMOPHONIC = melody + accompaniment
   (or chords moving together) · POLYPHONIC = independent melodies at once ·
   HETEROPHONIC (intro) = one melody, simultaneous variants.
   NOTE: edit by FULL-FILE REWRITE only. */

/* texture ear lab */
function MF_L90_ear(container,fb){
  const play={
    mono:()=>{ [60,62,64,65,67,65,64,62,60].forEach((m,i)=>MFAudio.tone(m,.32,i*.3,.44)); return 2.9; },
    homo:()=>{ const mel=[72,74,76,77,79], ch=[[48,64,67],[48,64,67],[53,65,69],[55,67,71],[48,64,67,72]];
      mel.forEach((m,i)=>{ MFAudio.tone(m,.5,i*.55,.42); ch[i].forEach(c=>MFAudio.tone(c,.5,i*.55,.16)); }); return 3.0; },
    poly:()=>{ [60,62,64,65,67,69,71,72].forEach((m,i)=>MFAudio.tone(m,.34,i*.36,.34));
      [67,65,64,62,60,59,57,55].forEach((m,i)=>MFAudio.tone(m,.34,i*.36+.18,.3)); return 3.2; }};
  const ROUNDS=["homo","mono","poly","mono"];
  const KEY=["mono","homo","poly"];
  let r=0, played=false;
  container.innerHTML=`<div class="big-q l90e-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l90e-play">▶ Play the music</button></div>
    <div class="choices l90e-ch" style="display:none"><button>Monophonic — one line alone</button><button>Homophonic — melody + accompaniment</button><button>Polyphonic — independent lines together</button></div>`;
  const q=container.querySelector(".l90e-q"), pl=container.querySelector(".l90e-play"), ch=container.querySelector(".l90e-ch");
  pl.onclick=()=>{ const w=ROUNDS[r]; if(!w) return; const dur=play[w](); played=true; setTimeout(()=>ch.style.display="",dur*1000+300); };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(!played) return;
    if(KEY[i]===ROUNDS[r]){ fb(true,"✓ "+["One unaccompanied line — monophonic.","Melody on top, chords beneath — homophonic.","Two lines with independent directions — polyphonic."][i]); r++; played=false; ch.style.display="none";
      if(r>=ROUNDS.length){ q.textContent="Excellent! Every texture identified."; pl.style.display="none"; } else q.innerHTML=`Round ${r+1} of ${ROUNDS.length}: listen, then name the texture.`;
    } else { MFAudio.tone(40,.2); fb(false,"Count the layers: one alone? melody over support? or several independent lines?"); }
  });
  q.innerHTML="Round 1 of 4: listen, then name the texture.";
}

LESSON_CONTENT[90]={
  welcome:"Texture: how many layers, doing what? \u{1F9F6}",
  hook:{
    say:"<b>The same melody, three ways:</b> alone · over chords · woven against a second melody. \u{1F447} <b>Listen to version 3. How many independent lines do you hear?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ 1: alone</button>
          <button class="play hk-b">▶ 2: with chords</button>
          <button class="play hk-c">▶ 3: two melodies</button></div>
          <div class="choices hk-ch" style="display:none"><button>Two — each moving independently</button><button>One — the chords are the same line</button><button>None</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let h=0;
        const mel=[64,65,67,69,67,65,64];
        container.querySelector(".hk-a").onclick=()=>{ mel.forEach((m,i)=>MFAudio.tone(m,.34,i*.32,.44)); h|=1; if(h===7) setTimeout(()=>ch.style.display="",2600); };
        container.querySelector(".hk-b").onclick=()=>{ mel.forEach((m,i)=>MFAudio.tone(m,.34,i*.32,.42)); [[48,64,67],[53,65,69],[48,64,67]].forEach((row,i)=>row.forEach(c=>MFAudio.tone(c,.65,i*.75,.16))); h|=2; if(h===7) setTimeout(()=>ch.style.display="",2600); };
        container.querySelector(".hk-c").onclick=()=>{ mel.forEach((m,i)=>MFAudio.tone(m,.34,i*.32,.4)); [48,50,52,53,55,53,52].forEach((m,i)=>MFAudio.tone(m,.34,i*.32+.16,.34)); h|=4; if(h===7) setTimeout(()=>ch.style.display="",2800); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Two independent melodies at once — POLYPHONIC texture. Version 1 was MONOPHONIC (one line); version 2 HOMOPHONIC (melody + support). Today: the textures!");
          else fb(false,"Listen to version 3 again — the low line has its own direction and rhythm…");
        });
      } }
  },
  objectives:[
    "Define texture: how musical layers combine",
    "MONOPHONIC: one melody alone",
    "HOMOPHONIC: melody with accompaniment (or chords moving together)",
    "POLYPHONIC: two or more independent melodies",
    "Meet HETEROPHONIC texture (introduction)",
    "Identify textures by ear"
  ],
  steps:[
    { say:"<b>Texture:</b> the way musical <b>layers</b> combine — how many lines sound at once, and what jobs they do. Three main textures plus one bonus. \u{1F447} <b>Texture describes…</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Texture</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Layers</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Example setting</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#2F6DA8">Monophonic</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px">one melody alone</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px">solo voice, unaccompanied</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#A9821F">Homophonic</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px">melody + accompaniment</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px">singer + guitar chords</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#C05A21">Polyphonic</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px">independent melodies together</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px">a round; a fugue</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800">Heterophonic</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px">one melody, simultaneous variants</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px">many folk traditions</td></tr></table>` },
      try:{ type:"mc", choices:["How musical layers combine","How loud the music is","Which key it is in"], answer:0,
        success:"✓ Layers and their jobs — that is texture.",
        fail:"Think fabric: threads woven together…",
        hint:"Layers." } },
    { say:"<b>Monophonic:</b> <b>one melody, nothing else</b> — no chords, no second line. Everyone singing the SAME line in unison is still monophonic. \u{1F447} <b>Forty people sing one melody in unison, unaccompanied. The texture is…</b>",
      try:{ type:"mc", choices:["Monophonic — one line, however many voices","Polyphonic","Homophonic"], answer:0,
        success:"✓ One LINE = monophonic, whether one singer or forty.",
        fail:"Count the LINES, not the people…",
        hint:"Mono = one." } },
    { say:"<b>Homophonic:</b> <b>one melody leads; the other layers support</b> — chords under a tune, or all voices moving together in the same rhythm (chordal/hymn style). The most common texture in songs. \u{1F447} <b>A singer with piano chords is…</b>",
      try:{ type:"mc", choices:["Homophonic — melody plus accompaniment","Monophonic","Heterophonic"], answer:0,
        success:"✓ Leader + support = homophonic — most popular music lives here.",
        fail:"The chords SUPPORT rather than compete…",
        hint:"Homo = together (one leads)." } },
    { say:"<b>Polyphonic:</b> <b>two or more melodies of equal importance</b>, each with its own direction — they interweave rather than support. Rounds, canons and fugues live here. \u{1F447} <b>In polyphonic texture, the lines are…</b>",
      try:{ type:"mc", choices:["Independent and equally important","One leader plus followers","Always identical"], answer:0,
        success:"✓ Equal, independent voices — woven counterpoint.",
        fail:"Poly = many — many WHAT?",
        hint:"Many independent melodies." } },
    { say:"<b>Heterophonic (Introduction):</b> <b>one melody performed in different versions at the same time</b> — one voice plain, another ornamented. Common in folk traditions worldwide, rare in Western notation. <b>Remember: mono = 1 line · homo = melody + support · poly = independent lines · hetero = one melody, many variants.</b> \u{1F447} <b>Two players play the SAME tune, one adding ornaments. The texture is…</b>",
      try:{ type:"mc", choices:["Heterophonic","Polyphonic","Monophonic"], answer:0,
        success:"✓ One melody in simultaneous variants — heterophony.",
        fail:"It is one melody, but not in unison…",
        hint:"Hetero = different (versions)." } },
    { say:"Name the texture by ear. \u{1F447}",
      try:{ type:"custom",
        hint:"One alone? Leader + support? Independent lines?",
        mount:(container,fb)=>MF_L90_ear(container,fb) } },
    { say:"<b>Review:</b> \u{1F447} <b>A round like \u{201C}Row, Row, Row Your Boat\u{201D} (same melody entering at staggered times) creates which texture?</b>",
      try:{ type:"mc", choices:["Polyphonic — overlapping independent entries","Monophonic","Homophonic"], answer:0,
        success:"✓ Staggered entries overlap into independent simultaneous lines — polyphony.",
        fail:"Once the second voice enters, how many lines sound?",
        hint:"The overlap decides." } }
  ],
  examples:[
    { caption:"Homophonic texture on the staff: the melody rides on top while chords move together beneath it — leader and support.",
      staff:{clef:"treble",tempo:84,notes:[
        {p:"E5",d:"q",label:"melody"},{p:"C4",d:"q",chord:true},{p:"E4",d:"q",chord:true},{p:"G4",d:"q",chord:true},
        {p:"F5",d:"q"},{p:"C4",d:"q",chord:true},{p:"F4",d:"q",chord:true},{p:"A4",d:"q",chord:true},
        {p:"G5",d:"q"},{p:"B3",d:"q",chord:true},{p:"D4",d:"q",chord:true},{p:"G4",d:"q",chord:true},
        {p:"E5",d:"h"},{p:"C4",d:"h",chord:true},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{bar:"final"}],width:620},
      kb:{start:48,octaves:3,labels:true} },
    { caption:"Polyphonic texture: two independent lines — the upper climbs while the lower descends, each with its own path. (Played together.)",
      staff:{clef:"treble",tempo:88,notes:[
        {p:"C4",d:"q",label:"line 2"},{p:"E5",d:"q",chord:true,label:"line 1"},
        {p:"B3",d:"q"},{p:"F5",d:"q",chord:true},
        {p:"A3",d:"q"},{p:"G5",d:"q",chord:true},
        {p:"G3",d:"h"},{p:"E5",d:"h",chord:true},{bar:"final"}],width:520},
      kb:{start:43,octaves:3,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Texture Sprint (45s)",
      intro:"Four textures, their layers and homes — race them!",
      miaIntro:"Count the lines! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Monophonic","one melody alone"],
        ["Homophonic","melody + accompaniment"],
        ["Polyphonic","independent melodies together"],
        ["Heterophonic","one melody, simultaneous variants"],
        ["Unison choir, no accompaniment","monophonic"],
        ["Singer + guitar chords","homophonic"],
        ["A round or fugue","polyphonic"],
        ["Plain + ornamented same tune","heterophonic"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — textures sorted!":null },
    { type:"order-tap", title:"Game 2 · Fewest to Most Independent",
      intro:"Tap the textures from simplest to most interwoven!",
      miaIntro:"1 line → many lines! \u{1F3C1}",
      spec:{sequence:["Monophonic — one line","Homophonic — melody + support","Polyphonic — independent lines"],
        title:"The texture ladder"},
      result:(stars)=>stars>=2?"The ladder, in order!":null },
    { type:"symbol-hunt", title:"Game 3 · Texture on the Page",
      intro:"Score snippets on cards — click the texture each round names!",
      miaIntro:"Read the layers! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Monophonic (single line)", spec:{clef:"treble",notes:[{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"E4",d:"q"}],width:190}},
        {label:"Homophonic (melody + chords)", spec:{clef:"treble",notes:[{p:"E5",d:"q"},{p:"C4",d:"q",chord:true},{p:"G4",d:"q",chord:true},{p:"F5",d:"q"},{p:"C4",d:"q",chord:true},{p:"A4",d:"q",chord:true}],width:210}},
        {label:"Polyphonic (two directions)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"E5",d:"q",chord:true},{p:"D4",d:"q"},{p:"D5",d:"q",chord:true},{p:"E4",d:"q"},{p:"C5",d:"q",chord:true}],width:210}},
        {label:"Chordal homophony (block motion)", spec:{clef:"treble",notes:[{p:"C4",d:"h"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{p:"D4",d:"h"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true}],width:210}}]},
      result:(score)=>score>=5?"Layers read at a glance!":null },
    { type:"term-race", title:"Game 4 · Which Texture Lives Here?",
      intro:"Match settings to textures — at speed!",
      miaIntro:"Real music, real layers! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Unaccompanied chant","monophonic"],
        ["Pop song (voice + band chords)","homophonic"],
        ["Hymn: all voices same rhythm","homophonic (chordal)"],
        ["Round: staggered same melody","polyphonic"],
        ["Fugue","polyphonic"],
        ["Solo flute alone","monophonic"],
        ["Folk tune plain + ornamented at once","heterophonic"],
        ["Texture asks","how layers combine"]]},
      result:(score)=>score>=6?"Every setting placed!":null }
  ],
  practiceIntro:"20 practice questions — layers, jobs and settings. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Mono","one line"],["Homo","melody + support"],["Poly","independent lines"],["Hetero","simultaneous variants"],["Texture","layer combination"]], reverse:true}, count:6 },
    { gen:"triad-id", params:{}, count:2 },
    { type:"mc", q:"Texture describes…", choices:["how layers of music combine","the speed of the music","the key signature"], answer:0,
      explain:"Lines and their jobs." },
    { type:"mc", q:"One unaccompanied melody is…", choices:["monophonic","homophonic","polyphonic"], answer:0,
      explain:"Mono = one line." },
    { type:"mc", q:"Melody plus chord accompaniment is…", choices:["homophonic","monophonic","heterophonic"], answer:0,
      explain:"Leader + support." },
    { type:"mc", q:"Two independent melodies woven together are…", choices:["polyphonic","monophonic","homophonic"], answer:0,
      explain:"Poly = many independent lines." },
    { type:"truefalse", q:"A choir singing in unison without accompaniment is monophonic.", answer:true,
      explain:"One LINE, many voices." },
    { type:"truefalse", q:"In homophonic texture, all lines are equally important.", answer:false,
      explain:"One leads; the rest support. (Equal = polyphonic.)" },
    { type:"truefalse", q:"Heterophony is one melody performed in simultaneous variants.", answer:true,
      explain:"Plain + ornamented at once." },
    { gen:"term-match", params:{subject:"term", pool:[["Chant alone","monophonic"],["Song + chords","homophonic"],["Fugue","polyphonic"],["Ornamented unison","heterophonic"]], reverse:true}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 }
  ],
  vocabulary:[
    {term:"Texture", def:"How the layers of music combine — how many lines, and what each does."},
    {term:"Monophonic", def:"One melody alone (even sung by many in unison)."},
    {term:"Homophonic", def:"One melody leads with accompaniment — or all voices move together chordally."},
    {term:"Polyphonic / Heterophonic", def:"Polyphonic: independent equal melodies. Heterophonic: one melody in simultaneous variants (intro)."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Texture</b> = the combination of layers.",
    "✔ <b>Monophonic</b>: one line alone — unison counts.",
    "✔ <b>Homophonic</b>: melody + support — most songs.",
    "✔ <b>Polyphonic</b>: independent, equal lines — rounds and fugues.",
    "✔ <b>Heterophonic</b>: one melody, simultaneous variants (worldwide folk)."
  ],
  tips:[
    "Ear test order: is there more than one line? If no — mono. If yes: does one lead? homo. All equal? poly.",
    "Most pieces CHANGE texture section by section — listen for the shifts, not one label per piece.",
    "Sing a round with friends: you'll build polyphony out of a monophonic tune in real time.",
    "Next lesson: the shapes whole SONGS take — strophic, through-composed and AABA."
  ],
  rewards:{ badge:"Layer Listener", icon:"\u{1F9F6}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Count the lines, name their jobs.",
  quiz:[
    { type:"mc", q:"Texture describes…", choices:["how musical layers combine","tempo markings","the form of a piece"], answer:0,
      explain:"Layers and jobs.", hint:"Fabric of sound." },
    { type:"mc", q:"Monophonic texture has…", choices:["one melody and nothing else","melody plus chords","two independent lines"], answer:0,
      explain:"One line only.", hint:"Mono = 1." },
    { type:"mc", q:"A soloist singing over guitar chords is…", choices:["homophonic","monophonic","polyphonic"], answer:0,
      explain:"Melody + accompaniment.", hint:"Leader + support." },
    { type:"mc", q:"Polyphonic texture features…", choices:["independent melodies of equal importance","one line alone","chords only"], answer:0,
      explain:"Woven equals.", hint:"Poly = many." },
    { type:"mc", q:"A hymn where all four voices move in the same rhythm is…", choices:["chordal homophony","polyphony","monophony"], answer:0,
      explain:"Moving together = homophonic type.", hint:"Block motion." },
    { type:"mc", q:"Heterophonic texture is…", choices:["one melody in simultaneous variants","many unrelated melodies","silence plus one chord"], answer:0,
      explain:"Plain and ornamented at once.", hint:"Same tune, different versions." },
    { type:"mc", q:"A round ('Row, Row, Row Your Boat' with staggered entries) becomes…", choices:["polyphonic","monophonic throughout","homophonic"], answer:0,
      explain:"Overlapping independent entries.", hint:"After voice 2 enters…" },
    { type:"truefalse", q:"Forty singers in unison create polyphonic texture.", answer:false,
      explain:"One LINE = monophonic, regardless of voice count.", hint:"Count lines, not people." },
    { type:"truefalse", q:"Homophonic texture is the most common in popular songs.", answer:true,
      explain:"Voice + accompaniment rules the charts.", hint:"Singer + band." },
    { type:"mc", q:"Identify the texture on the staff.",
      staff:{clef:"treble",notes:[{p:"E5",d:"q"},{p:"C4",d:"q",chord:true},{p:"G4",d:"q",chord:true},{p:"F5",d:"q"},{p:"C4",d:"q",chord:true},{p:"A4",d:"q",chord:true}],width:220},
      choices:["Homophonic — melody with chords beneath","Monophonic","Polyphonic"], answer:0,
      explain:"Top line leads; lower notes support.", hint:"Who leads?" },
    { type:"mc", q:"Which list pairs textures with homes correctly?", choices:["Chant→mono · pop song→homo · fugue→poly","Fugue→mono · chant→poly","All music→homophonic"], answer:0,
      explain:"Three textures, three habitats.", hint:"Match the layers." },
    { type:"mc", q:"The quickest ear test for texture is…", choices:["counting the independent lines and checking who leads","measuring the tempo","finding the key signature"], answer:0,
      explain:"Lines + leadership = texture.", hint:"Two questions." }
  ],
  miaPerfect:"PERFECT! Every layer counted, every job named. \u{1F9F6}\u{1F389}",
  miaPass:"Passed! You hear music in layers now. Next: song forms…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Version 1: one line (monophonic). Version 2: melody + chords (homophonic). Version 3: two independent lines (polyphonic).",
      play:()=>{const mel=[64,65,67,69,67,65,64];mel.forEach((m,i)=>MFAudio.tone(m,.34,i*.32,.4));[48,50,52,53,55,53,52].forEach((m,i)=>MFAudio.tone(m,.34,i*.32+.16,.34));} },
    learn:{ label:"texture",
      explain:"Mono = one line; homo = melody + support (or block chords); poly = independent equals; hetero = one melody, simultaneous variants.",
      hint:"Count lines, check who leads.",
      play:()=>{[60,62,64,65,67].forEach((m,i)=>MFAudio.tone(m,.32,i*.3,.42));} },
    example:{ label:"the examples",
      explain:"Example 1 is homophonic (melody over chords); example 2 is polyphonic (two lines in contrary motion)." },
    game:{ label:"the games",
      explain:"Sprint the textures, order the ladder, read layers on cards, then place real settings.",
      hint:"Lines + leadership." },
    quiz:{ label:"this question",
      explain:"Two questions answer everything: how many independent lines? And does one lead while others support?",
      play:()=>{[64,65,67].forEach((m,i)=>MFAudio.tone(m,.34,i*.32,.4));[[48,64,67]].forEach(row=>row.forEach(c=>MFAudio.tone(c,.7,1.1,.2)));} }
  }
};
