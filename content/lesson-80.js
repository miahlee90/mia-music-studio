/* Lesson 80 — Modes in Practice (Book 4, Unit 20 — SELF-AUTHORED)
   Prerequisites: L62–63 defined all seven modes. This lesson puts them to
   WORK: characteristic notes, bright-to-dark order, hearing modes, writing
   modal melodies, modes in real music. NOTE: edit by FULL-FILE REWRITE only. */

/* ear lab: major (Ionian) vs Mixolydian (b7) / minor (Aeolian) vs Dorian (raised 6) */
function MF_L80_ear(container,fb){
  const SCALES={
    ion:[60,62,64,65,67,69,71,72], mix:[60,62,64,65,67,69,70,72],
    aeo:[57,59,60,62,64,65,67,69], dor:[57,59,60,62,64,66,67,69]};
  const ROUNDS=[
    {a:"ion",b:"mix",q:"Ionian (major) or Mixolydian?",names:["Ionian — natural 7","Mixolydian — lowered 7"],play:"mix",ans:1,
      expl:"The 7th was LOWERED (B♭) — Mixolydian."},
    {a:"aeo",b:"dor",q:"Aeolian (natural minor) or Dorian?",names:["Aeolian — lowered 6","Dorian — raised 6"],play:"dor",ans:1,
      expl:"The 6th was RAISED (F♯) — Dorian."},
    {a:"ion",b:"mix",q:"Ionian or Mixolydian?",names:["Ionian — natural 7","Mixolydian — lowered 7"],play:"ion",ans:0,
      expl:"The 7th led home a half step — Ionian (major)."},
    {a:"aeo",b:"dor",q:"Aeolian or Dorian?",names:["Aeolian — lowered 6","Dorian — raised 6"],play:"aeo",ans:0,
      expl:"The 6th stayed low (F♮) — Aeolian."}];
  let r=0, played=false;
  container.innerHTML=`<div class="big-q l80e-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l80e-play">▶ Play the scale</button></div>
    <div class="choices l80e-ch" style="display:none"><button></button><button></button></div>`;
  const q=container.querySelector(".l80e-q"), pl=container.querySelector(".l80e-play"), ch=container.querySelector(".l80e-ch");
  function ask(){
    if(r>=ROUNDS.length){ q.textContent="Excellent! You identified every mode by its characteristic note."; pl.style.display="none"; ch.style.display="none"; return; }
    const R=ROUNDS[r];
    q.innerHTML=`Round ${r+1} of ${ROUNDS.length}: ${R.q}`;
    [...ch.children].forEach((b,i)=>b.textContent=R.names[i]);
    ch.style.display="none"; played=false;
  }
  pl.onclick=()=>{
    const R=ROUNDS[r]; if(!R) return;
    SCALES[R.play].forEach((m,i)=>MFAudio.tone(m,.4,i*.34,.4));
    played=true; setTimeout(()=>ch.style.display="",8*340+300);
  };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    const R=ROUNDS[r]; if(!R||!played) return;
    if(i===R.ans){ fb(true,"✓ "+R.expl); r++; setTimeout(ask,1300); }
    else { MFAudio.tone(40,.2); fb(false,"Listen once more to the CHARACTERISTIC note — the 6th (minor pair) or the 7th (major pair)."); }
  });
  ask();
}

LESSON_CONTENT[80]={
  welcome:"The seven modes, put to work. \u{1F3A8}",
  hook:{
    say:"<b>Two melodies start on the same note.</b> One uses the plain major scale; the other lowers ONE note and changes the whole color. \u{1F447} <b>Which melody changed a note — and did you hear where?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Melody A</button>
          <button class="play hk-b">▶ Melody B</button></div>
          <div class="choices hk-ch" style="display:none"><button>Melody B — its 7th was lowered (Mixolydian)</button><button>Melody A — major scales change notes</button><button>Neither changed anything</button></div>`;
        const A=[60,64,67,71,72,67,64,60], B=[60,64,67,70,72,70,67,60];
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ A.forEach((m,i)=>MFAudio.tone(m,.38,i*.32,.42)); hA=true; if(hB) setTimeout(()=>ch.style.display="",2900); };
        container.querySelector(".hk-b").onclick=()=>{ B.forEach((m,i)=>MFAudio.tone(m,.38,i*.32,.42)); hB=true; if(hA) setTimeout(()=>ch.style.display="",2900); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Melody B lowered the 7th (B→B♭) — one note turned major into MIXOLYDIAN. Each mode has one such characteristic note. Today: using the modes for real!");
          else fb(false,"Compare the note just below the top — natural in one melody, lowered in the other…");
        });
      } }
  },
  objectives:[
    "Review the seven modes and their two families (major-type, minor-type)",
    "Name each mode's CHARACTERISTIC note",
    "Order the modes from brightest to darkest",
    "Identify modes by ear from the characteristic note",
    "Write a modal melody: pick the family, change one note, emphasize it",
    "Know where each mode lives in real music"
  ],
  steps:[
    { say:"<b>The Seven Modes — Review:</b> three feel <b style='color:#2F6DA8'>major-type</b> (major 3rd): Ionian, Lydian, Mixolydian; three feel <b style='color:#C05A21'>minor-type</b> (minor 3rd): Dorian, Phrygian, Aeolian — plus unstable Locrian. \u{1F447} <b>Which modes are major-type?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px;color:#2F6DA8">Major-type</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px;color:#C05A21">Minor-type</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Unstable</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#2F6DA8">Ionian · Lydian · Mixolydian</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#C05A21">Dorian · Phrygian · Aeolian</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">Locrian</td></tr></table>` },
      try:{ type:"mc", choices:["Ionian, Lydian and Mixolydian","Dorian, Phrygian and Aeolian","Only Locrian"], answer:0,
        success:"✓ The three with a major 3rd above the tonic.",
        fail:"Which three contain a MAJOR 3rd?",
        hint:"Ionian is plain major." } },
    { say:"<b>The Characteristic Note:</b> each mode differs from plain major or natural minor by <b>one note</b> — its fingerprint. <b>Remember: Lydian = major + ♯4 · Mixolydian = major + ♭7 · Dorian = minor + raised 6 · Phrygian = minor + ♭2.</b> \u{1F447} <b>Dorian's characteristic note is…</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Mode</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Base scale</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Changed note</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;color:#2F6DA8;font-weight:800">Lydian</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">major</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#A9821F">♯4</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;color:#2F6DA8;font-weight:800">Mixolydian</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">major</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#A9821F">♭7</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;color:#C05A21;font-weight:800">Dorian</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">natural minor</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#A9821F">raised 6</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;color:#C05A21;font-weight:800">Phrygian</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">natural minor</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#A9821F">♭2</td></tr></table>` },
      try:{ type:"mc", choices:["The raised 6th","The lowered 7th","The raised 4th"], answer:0,
        success:"✓ Dorian = natural minor with the 6th raised — minor with a brighter middle.",
        fail:"Dorian starts from natural minor…",
        hint:"Minor + one RAISED note." } },
    { say:"<b>Bright to Dark:</b> the modes form a color line, brightest to darkest: <b>Lydian → Ionian → Mixolydian → Dorian → Aeolian → Phrygian → Locrian</b>. Each step lowers one more note. \u{1F447} <b>Which mode is the brightest?</b>",
      try:{ type:"mc", choices:["Lydian — major plus a raised 4th","Locrian","Aeolian"], answer:0,
        success:"✓ Lydian sits above even plain major — its ♯4 lifts the color.",
        fail:"Brighter than major means a RAISED note…",
        hint:"The ♯4 mode." } },
    { say:"<b>Identifying a Mode on the Staff:</b> find the tonic, check the 3rd (major-type or minor-type family), then find the <b>characteristic note</b>. \u{1F447} <b>All white keys from D to D — which mode?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:120,notes:[
        {p:"D4",d:"q",label:"tonic"},{p:"E4",d:"q"},{p:"F4",d:"q",label:"m3"},{p:"G4",d:"q"},
        {p:"A4",d:"q"},{p:"B4",d:"q",label:"raised 6!"},{p:"C5",d:"q"},{p:"D5",d:"q"},{bar:"final"}],width:560} },
      try:{ type:"mc", choices:["Dorian — minor 3rd plus raised 6th","Aeolian — plain natural minor","Lydian — it has a ♯4"], answer:0,
        success:"✓ F gives the minor 3rd; B♮ is the raised 6th — D Dorian.",
        fail:"Check the 3rd first, then the 6th…",
        hint:"Minor family, bright 6." } },
    { say:"Hear the characteristic note. \u{1F447}",
      try:{ type:"custom",
        hint:"Major pair: listen to the 7th. Minor pair: listen to the 6th.",
        mount:(container,fb)=>MF_L80_ear(container,fb) } },
    { say:"<b>Writing a Modal Melody:</b> three moves — <b>1)</b> pick the family (major- or minor-type), <b>2)</b> change the one characteristic note, <b>3)</b> <b>emphasize that note</b> so the listener hears the mode. \u{1F447} <b>To write in Mixolydian you would…</b>",
      try:{ type:"mc", choices:["Write in major but lower the 7th — and feature it","Avoid the 7th entirely","Add sharps everywhere"], answer:0,
        success:"✓ Major + ♭7, featured prominently = unmistakable Mixolydian.",
        fail:"Mixolydian's fingerprint is one lowered note…",
        hint:"Major + ♭7." } },
    { say:"<b>Modes in Real Music:</b> <b>Dorian</b> — folk and rock minor-key songs · <b>Mixolydian</b> — rock and blues-leaning major songs · <b>Lydian</b> — film and fantasy scores · <b>Phrygian</b> — flamenco and metal. \u{1F447} <b>A film score wants a floating, magical major sound. Best fit?</b>",
      try:{ type:"mc", choices:["Lydian — major with the raised 4th","Locrian","Phrygian"], answer:0,
        success:"✓ Lydian's ♯4 is film music's favorite brightener.",
        fail:"Magical + major points to the brightest mode…",
        hint:"Brighter than major." } },
    { say:"<b>Review:</b> \u{1F447} <b>Natural minor with a LOWERED 2nd is which mode?</b>",
      try:{ type:"mc", choices:["Phrygian","Dorian","Mixolydian"], answer:0,
        success:"✓ The ♭2 half-step over the tonic = Phrygian.",
        fail:"Minor family, darkened second degree…",
        hint:"Flamenco's mode." } }
  ],
  examples:[
    { caption:"D Dorian in action: a minor-family melody whose raised 6th (B♮) keeps brightening the line. The characteristic note is featured, not hidden.",
      staff:{clef:"treble",tempo:100,notes:[
        {p:"D4",d:"q"},{p:"F4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q",label:"raised 6"},
        {p:"A4",d:"q"},{p:"F4",d:"q"},{p:"E4",d:"q"},{p:"D4",d:"q"},{bar:"final"}],width:560},
      kb:{start:50,octaves:2,labels:true} },
    { caption:"G Mixolydian: a major-family melody that leans on its lowered 7th (F♮) instead of F♯ — the rock sound in eight notes.",
      staff:{clef:"treble",tempo:100,notes:[
        {p:"G4",d:"q"},{p:"B4",d:"q"},{p:"D5",d:"q"},{p:"F5",d:"q",label:"♭7"},
        {p:"D5",d:"q"},{p:"F5",d:"q",label:"♭7"},{p:"D5",d:"q"},{p:"G4",d:"q"},{bar:"final"}],width:560},
      kb:{start:55,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Characteristic-Note Sprint (45s)",
      intro:"Each mode's fingerprint — race the facts!",
      miaIntro:"One note changes everything! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Lydian","major + ♯4"],
        ["Mixolydian","major + ♭7"],
        ["Dorian","natural minor + raised 6"],
        ["Phrygian","natural minor + ♭2"],
        ["Ionian","plain major"],
        ["Aeolian","plain natural minor"],
        ["Brightest mode","Lydian"],
        ["Darkest (unstable) mode","Locrian"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — fingerprints memorized!":null },
    { type:"symbol-hunt", title:"Game 2 · Mode Detective",
      intro:"Scales on cards — click the mode each round names! (Tonic = first note.)",
      miaIntro:"3rd first, fingerprint second! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"D Dorian (m3 + raised 6)", spec:{clef:"treble",notes:[{p:"D4",d:"q"},{p:"F4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"},{p:"D5",d:"q"}],width:190}},
        {label:"G Mixolydian (M3 + ♭7)", spec:{clef:"treble",notes:[{p:"G4",d:"q"},{p:"B4",d:"q"},{p:"D5",d:"q"},{p:"F5",d:"q"},{p:"G5",d:"q"}],width:190}},
        {label:"F Lydian (M3 + ♯4)", spec:{clef:"treble",notes:[{p:"F4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"},{p:"C5",d:"q"},{p:"F5",d:"q"}],width:190}},
        {label:"E Phrygian (m3 + ♭2)", spec:{clef:"treble",notes:[{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"B4",d:"q"},{p:"E5",d:"q"}],width:190}}]},
      result:(score)=>score>=5?"Modes identified on sight!":null },
    { type:"order-tap", title:"Game 3 · Bright to Dark",
      intro:"Tap the modes from BRIGHTEST to DARKEST!",
      miaIntro:"Lydian leads, Locrian ends! \u{1F3C1}",
      spec:{sequence:["Lydian","Ionian","Mixolydian","Dorian","Aeolian","Phrygian","Locrian"],
        title:"The mode color line"},
      result:(stars)=>stars>=2?"The color line, in order!":null },
    { type:"term-race", title:"Game 4 · Where Modes Live",
      intro:"Match each mode to its musical home — at speed!",
      miaIntro:"Real music, real modes! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Dorian","folk & rock minor songs"],
        ["Mixolydian","rock & blues-leaning major"],
        ["Lydian","film & fantasy scores"],
        ["Phrygian","flamenco & metal"],
        ["Ionian","most major-key songs"],
        ["Aeolian","most minor-key songs"],
        ["To write modal","change + emphasize ONE note"],
        ["Mode ID by ear","listen for the characteristic note"]]},
      result:(score)=>score>=6?"Modal map complete!":null }
  ],
  practiceIntro:"20 practice questions — fingerprints, families and modal writing. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Lydian","♯4"],["Mixolydian","♭7"],["Dorian","raised 6"],["Phrygian","♭2"],["Ionian","= major"],["Aeolian","= natural minor"]], reverse:true}, count:6 },
    { gen:"mode-id", params:{set:"all", ask:"recipe"}, count:4 },
    { type:"mc", q:"Which family is Dorian in?", choices:["Minor-type (minor 3rd)","Major-type","Neither"], answer:0,
      explain:"m3 above the tonic." },
    { type:"mc", q:"The brightest mode is…", choices:["Lydian","Ionian","Aeolian"], answer:0,
      explain:"Major plus a raised 4th." },
    { type:"mc", q:"To write a Dorian melody, start from natural minor and…", choices:["raise the 6th","lower the 3rd","raise the 4th"], answer:0,
      explain:"Then emphasize that raised 6th." },
    { type:"truefalse", q:"Each mode differs from plain major or minor by one characteristic note.", answer:true,
      explain:"The mode's fingerprint." },
    { type:"truefalse", q:"Mixolydian raises the 7th.", answer:false,
      explain:"It LOWERS the 7th." },
    { gen:"mode-id", params:{set:"all", ask:"scale"}, count:3 },
    { gen:"term-match", params:{subject:"term", pool:[["Brightest","Lydian"],["Darkest","Locrian"],["Rock's major mode","Mixolydian"],["Flamenco's mode","Phrygian"]], reverse:true}, count:2 }
  ],
  vocabulary:[
    {term:"Characteristic Note", def:"The one note that separates a mode from plain major or natural minor — its fingerprint."},
    {term:"Major-type Modes", def:"Ionian, Lydian, Mixolydian — a major 3rd above the tonic."},
    {term:"Minor-type Modes", def:"Dorian, Phrygian, Aeolian — a minor 3rd above the tonic."},
    {term:"Bright-to-Dark Order", def:"Lydian → Ionian → Mixolydian → Dorian → Aeolian → Phrygian → Locrian."}
  ],
  mistakes:[],
  summary:[
    "✔ Two families: <b>major-type</b> (Ionian, Lydian, Mixolydian) and <b>minor-type</b> (Dorian, Phrygian, Aeolian).",
    "✔ Fingerprints: <b>Lydian ♯4 · Mixolydian ♭7 · Dorian raised 6 · Phrygian ♭2</b>.",
    "✔ Color line: <b>Lydian → … → Locrian</b>, one lowered note per step.",
    "✔ To write modal: change the one note — then <b>emphasize it</b>.",
    "✔ By ear: check the 3rd for family, then hunt the characteristic note."
  ],
  tips:[
    "Fast ID at the keyboard: play white-key scales from each note — D=Dorian, E=Phrygian, F=Lydian, G=Mixolydian, A=Aeolian.",
    "A modal melody that avoids its characteristic note just sounds like major or minor — feature the fingerprint.",
    "Improvise over a single drone note and shift one scale tone at a time — you'll HEAR the color line.",
    "Next lesson: scales that skip notes entirely — the pentatonics."
  ],
  rewards:{ badge:"Mode Painter", icon:"\u{1F3A8}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Family first, fingerprint second.",
  quiz:[
    { type:"mc", q:"A mode's characteristic note is…", choices:["the one note separating it from plain major or minor","its loudest note","always the tonic"], answer:0,
      explain:"The fingerprint.", hint:"One changed note." },
    { type:"mc", q:"Lydian is major with…", choices:["a raised 4th","a lowered 7th","a lowered 2nd"], answer:0,
      explain:"The ♯4 lifts it above plain major.", hint:"Film-score bright." },
    { type:"mc", q:"Mixolydian is major with…", choices:["a lowered 7th","a raised 6th","a raised 4th"], answer:0,
      explain:"The ♭7 relaxes the pull home.", hint:"Rock's major." },
    { type:"mc", q:"Dorian is natural minor with…", choices:["a raised 6th","a lowered 2nd","a raised 7th"], answer:0,
      explain:"Minor, brightened in the middle.", hint:"One RAISED note." },
    { type:"mc", q:"Phrygian is natural minor with…", choices:["a lowered 2nd","a raised 4th","a raised 6th"], answer:0,
      explain:"The ♭2 darkens the opening step.", hint:"Flamenco color." },
    { type:"mc", q:"Order the modes bright to dark. Which comes FIRST?", choices:["Lydian","Ionian","Mixolydian"], answer:0,
      explain:"Lydian → Ionian → Mixolydian → …", hint:"Brighter than major." },
    { type:"mc", q:"All white keys from G to G is…", choices:["G Mixolydian","G Ionian","G Dorian"], answer:0,
      explain:"Major 3rd (B) + lowered 7th (F♮).", hint:"Check the 7th." },
    { type:"mc", q:"Identify the mode.",
      staff:{clef:"treble",notes:[{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"},{p:"C5",d:"q"},{p:"D5",d:"q"},{p:"E5",d:"q"}],width:400},
      choices:["E Phrygian — the ♭2 (F) gives it away","E major","E Lydian"], answer:0,
      explain:"White keys E to E; the F♮ a half step up = ♭2.", hint:"Look at the second note." },
    { type:"truefalse", q:"To make a mode audible, emphasize its characteristic note.", answer:true,
      explain:"Hidden fingerprints sound like plain major/minor.", hint:"Feature it." },
    { type:"truefalse", q:"Dorian and Aeolian differ only in their 6th degree.", answer:true,
      explain:"Raised 6 (Dorian) vs lowered 6 (Aeolian).", hint:"The minor pair." },
    { type:"mc", q:"A rock song is major but its 7th never leads home. The mode is…", choices:["Mixolydian","Ionian","Locrian"], answer:0,
      explain:"♭7 = no leading tone = Mixolydian.", hint:"The relaxed 7th." },
    { type:"mc", q:"Which strategy identifies a mode by ear?", choices:["Check the 3rd for family, then find the characteristic note","Count the measures","Listen only to the rhythm"], answer:0,
      explain:"Family → fingerprint.", hint:"Two checks." }
  ],
  miaPerfect:"PERFECT! Seven colors, one painter — the modes answer to you. \u{1F3A8}\u{1F389}",
  miaPass:"Passed! Family first, fingerprint second. Next: five-note scales…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Melody B lowered its 7th (B→B♭), turning plain major into Mixolydian — one characteristic note changed the whole color.",
      play:()=>{[60,64,67,70,72,70,67,60].forEach((m,i)=>MFAudio.tone(m,.38,i*.32,.42));} },
    learn:{ label:"modes in practice",
      explain:"Two families by the 3rd; fingerprints: Lydian ♯4, Mixolydian ♭7, Dorian raised 6, Phrygian ♭2; bright-to-dark line; write modal = change + emphasize one note.",
      hint:"Family → fingerprint.",
      play:()=>{[57,59,60,62,64,66,67,69].forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.4));} },
    example:{ label:"the examples",
      explain:"Example 1 features Dorian's raised 6th; example 2 leans on Mixolydian's ♭7 — both melodies advertise their fingerprint." },
    game:{ label:"the games",
      explain:"Sprint the fingerprints, identify scales on cards, order the color line, then map modes to real styles.",
      hint:"One note = one mode." },
    quiz:{ label:"this question",
      explain:"Always two checks: is the 3rd major or minor (family)? Which single note differs from plain major/minor (fingerprint)?",
      play:()=>{[62,64,65,67,69,71,72,74].forEach((m,i)=>MFAudio.tone(m,.34,i*.28,.4));} }
  }
};
