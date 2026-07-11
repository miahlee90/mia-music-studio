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
  welcome:"Recognize, hear, and apply the seven diatonic modes.",
  hook:{
    say:"<b>The two melodies share the same tonic.</b> Melody A uses the major scale, while Melody B lowers the seventh scale degree. \u{1F447} <b>Which melody is Mixolydian?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Melody A</button>
          <button class="play hk-b">▶ Melody B</button></div>
          <div class="choices hk-ch" style="display:none"><button>Melody B — its seventh scale degree is lowered</button><button>Melody A — it uses the major scale without a lowered seventh</button><button>Neither melody uses a modal alteration</button></div>`;
        const A=[60,64,67,71,72,67,64,60], B=[60,64,67,70,72,70,67,60];
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ A.forEach((m,i)=>MFAudio.tone(m,.38,i*.32,.42)); hA=true; if(hB) setTimeout(()=>ch.style.display="",2900); };
        container.querySelector(".hk-b").onclick=()=>{ B.forEach((m,i)=>MFAudio.tone(m,.38,i*.32,.42)); hB=true; if(hA) setTimeout(()=>ch.style.display="",2900); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Correct. Melody B lowers B to B♭, changing the major scale's seventh degree and producing Mixolydian. This lowered seventh is Mixolydian's characteristic scale degree.");
          else fb(false,"Compare the seventh scale degree in the two melodies. It is lowered in the Mixolydian melody.");
        });
      } }
  },
  objectives:[
    "Review the seven modes and their two families (major-type, minor-type)",
    "Name each mode's distinctive scale degrees",
    "Order the modes in the commonly used bright-to-dark arrangement",
    "Identify modes by ear from their distinctive scale degrees",
    "Write a modal melody: establish the tonic, use the mode's scale degrees, emphasize the distinctive ones",
    "Know musical contexts where each mode commonly appears"
  ],
  steps:[
    { say:"<b>The Seven Modes — Review:</b> Ionian, Lydian, and Mixolydian are <b style='color:#2F6DA8'>major-type</b> modes because they contain a major third above the tonic. Dorian, Phrygian, and Aeolian are <b style='color:#C05A21'>minor-type</b> modes because they contain a minor third above the tonic. Locrian also contains a minor third, but its diminished fifth makes it difficult to establish a stable tonic triad. \u{1F447} <b>Which modes are major-type modes?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px;color:#2F6DA8">Major-type</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px;color:#C05A21">Minor-type</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Unstable</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#2F6DA8">Ionian · Lydian · Mixolydian</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#C05A21">Dorian · Phrygian · Aeolian</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">Locrian</td></tr></table>` },
      try:{ type:"mc", choices:["Ionian, Lydian, and Mixolydian","Dorian, Phrygian, and Aeolian","Phrygian, Aeolian, and Locrian"], answer:0,
        success:"✓ Correct. Each of these modes contains a major third above its tonic.",
        fail:"Identify the modes with a major third above the tonic.",
        hint:"Begin with Ionian, the major-scale mode." } },
    { say:"<b>Characteristic Scale Degrees:</b> Several modes can be compared efficiently with the parallel major or natural minor scale. <b>Lydian is major with a raised fourth; Mixolydian is major with a lowered seventh; Dorian is natural minor with a raised sixth; and Phrygian is natural minor with a lowered second.</b> Ionian is the major scale, and Aeolian is the natural minor scale. Locrian differs from natural minor in two important ways: it has a lowered second and a lowered fifth. \u{1F447} <b>Compared with the parallel natural minor scale, Dorian has…</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Mode</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Base scale</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Changed note</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;color:#2F6DA8;font-weight:800">Lydian</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">major</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#A9821F">♯4</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;color:#2F6DA8;font-weight:800">Mixolydian</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">major</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#A9821F">♭7</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;color:#C05A21;font-weight:800">Dorian</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">natural minor</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#A9821F">raised 6</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;color:#C05A21;font-weight:800">Phrygian</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">natural minor</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800;color:#A9821F">♭2</td></tr></table>` },
      try:{ type:"mc", choices:["a raised sixth","a lowered seventh","a raised fourth"], answer:0,
        success:"✓ Correct. Dorian has a minor third and a raised sixth compared with the parallel natural minor scale.",
        fail:"Compare Dorian with the parallel natural minor scale.",
        hint:"Dorian raises one scale degree of natural minor." } },
    { say:"<b>Relative Brightness of the Modes:</b> When the seven diatonic modes are compared above the same tonic, they are often arranged from brighter to darker as follows: <b>Lydian → Ionian → Mixolydian → Dorian → Aeolian → Phrygian → Locrian</b>. Moving from one mode to the next in this sequence lowers one scale degree. \u{1F447} <b>In this commonly used bright-to-dark ordering, which mode comes first?</b>",
      try:{ type:"mc", choices:["Lydian","Locrian","Aeolian"], answer:0,
        success:"✓ Correct. Lydian's raised fourth places it first in this commonly used ordering.",
        fail:"Compare Lydian with the parallel major scale.",
        hint:"Look for the major-type mode with a raised fourth." } },
    { say:"<b>Identifying a Mode on the Staff:</b> First, determine the tonic or tonal center. Next, examine the third to identify a major-type or minor-type sound. Finally, check the scale degrees that distinguish the mode from the parallel major or natural minor scale. \u{1F447} <b>A scale uses only white keys from D to the next D. Which mode is it?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:120,notes:[
        {p:"D4",d:"q",label:"tonic"},{p:"E4",d:"q"},{p:"F4",d:"q",label:"m3"},{p:"G4",d:"q"},
        {p:"A4",d:"q"},{p:"B4",d:"q",label:"raised 6!"},{p:"C5",d:"q"},{p:"D5",d:"q"},{bar:"final"}],width:560} },
      try:{ type:"mc", choices:["D Dorian","D Aeolian","D Lydian"], answer:0,
        success:"✓ Correct. F forms a minor third above D, and B♮ is the raised sixth compared with D natural minor. These pitches identify D Dorian.",
        fail:"Check the third above D, then compare the sixth with D natural minor.",
        hint:"It is a minor-type mode with a raised sixth." } },
    { say:"Listen for the scale degrees that distinguish each mode. \u{1F447}",
      try:{ type:"custom",
        hint:"To distinguish Ionian from Mixolydian, listen to the seventh. To distinguish Dorian from Aeolian, listen to the sixth.",
        mount:(container,fb)=>MF_L80_ear(container,fb) } },
    { say:"<b>Writing a Modal Melody:</b> First, establish the tonic clearly. Next, use the scale degrees of the selected mode accurately. Finally, give appropriate emphasis to the mode's distinctive scale degrees through duration, repetition, melodic placement, or harmony. Avoid harmonic progressions that strongly imply a different major or minor key. \u{1F447} <b>Which strategy would help establish a Mixolydian melody?</b>",
      try:{ type:"mc", choices:["Establish a major-type tonic, use a lowered seventh, and feature that scale degree","Avoid the seventh scale degree entirely","Add chromatic sharps throughout the melody"], answer:0,
        success:"✓ Correct. A clearly established major-type tonic combined with a lowered seventh supports a Mixolydian sound.",
        fail:"Compare Mixolydian with the parallel major scale.",
        hint:"Major-type mode with a lowered seventh." } },
    { say:"<b>Modes in Musical Styles:</b> <b>Dorian</b> appears in some folk, jazz, rock, and popular music. <b>Mixolydian</b> is common in rock, folk, blues-influenced music, and other popular styles. <b>Lydian</b> is frequently used for distinctive major-type color in film and game music. <b>Phrygian</b> appears in some metal and Mediterranean musical traditions. \u{1F447} <b>A film composer wants a major-type modal sound distinguished by a raised fourth. Which mode best fits that description?</b>",
      try:{ type:"mc", choices:["Lydian","Locrian","Phrygian"], answer:0,
        success:"✓ Correct. Lydian combines a major third with a raised fourth, producing its distinctive major-type sound.",
        fail:"Look for the major-type mode with a raised fourth.",
        hint:"Major with a raised fourth." } },
    { say:"<b>Review:</b> \u{1F447} <b>Compared with the parallel natural minor scale, which mode has a lowered second?</b>",
      try:{ type:"mc", choices:["Phrygian","Dorian","Mixolydian"], answer:0,
        success:"✓ Correct. Phrygian has a minor second above the tonic, created by its lowered second scale degree.",
        fail:"Look for the minor-type mode with a lowered second.",
        hint:"Natural minor with a lowered second." } }
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
    { type:"gen-race", title:"Game 1 · Distinctive Scale-Degree Sprint (45s)",
      intro:"Identify the scale degrees that distinguish each mode before time runs out.",
      miaIntro:"Compare each mode with the parallel major or natural minor scale.",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Lydian","major + ♯4"],
        ["Mixolydian","major + ♭7"],
        ["Dorian","natural minor + raised 6"],
        ["Phrygian","natural minor + ♭2"],
        ["Ionian","plain major"],
        ["Aeolian","plain natural minor"],
        ["Brightest mode","Lydian"],
        ["Darkest (unstable) mode","Locrian"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — Distinctive scale degrees identified!":null },
    { type:"symbol-hunt", title:"Game 2 · Mode Detective",
      intro:"Examine each scale and select the correct mode. For this activity, the first and final notes identify the tonic.",
      miaIntro:"Find the tonic, check the third, and then examine the distinctive scale degrees.",
      spec:{rounds:6, pool:[
        {label:"D Dorian (m3 + raised 6)", spec:{clef:"treble",notes:[{p:"D4",d:"q"},{p:"F4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"},{p:"D5",d:"q"}],width:190}},
        {label:"G Mixolydian (M3 + ♭7)", spec:{clef:"treble",notes:[{p:"G4",d:"q"},{p:"B4",d:"q"},{p:"D5",d:"q"},{p:"F5",d:"q"},{p:"G5",d:"q"}],width:190}},
        {label:"F Lydian (M3 + ♯4)", spec:{clef:"treble",notes:[{p:"F4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"},{p:"C5",d:"q"},{p:"F5",d:"q"}],width:190}},
        {label:"E Phrygian (m3 + ♭2)", spec:{clef:"treble",notes:[{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"B4",d:"q"},{p:"E5",d:"q"}],width:190}}]},
      result:(score)=>score>=5?"You identified the modes correctly.":null },
    { type:"order-tap", title:"Game 3 · Bright to Dark",
      intro:"Arrange the modes according to the commonly used bright-to-dark ordering.",
      miaIntro:"Begin with Lydian and end with Locrian.",
      spec:{sequence:["Lydian","Ionian","Mixolydian","Dorian","Aeolian","Phrygian","Locrian"],
        title:"The mode color line"},
      result:(stars)=>stars>=2?"You arranged the modes in the conventional order.":null },
    { type:"term-race", title:"Game 4 · Modes in Musical Contexts",
      intro:"Match each mode with a musical context in which it commonly appears.",
      miaIntro:"Remember that each mode appears in many different styles.",
      spec:{rounds:8, reverse:true, pool:[
        ["Dorian","folk & rock minor songs"],
        ["Mixolydian","rock & blues-leaning major"],
        ["Lydian","film & fantasy scores"],
        ["Phrygian","metal & Mediterranean traditions"],
        ["Ionian","most major-key songs"],
        ["Aeolian","most minor-key songs"],
        ["To write modal","establish tonic + emphasize distinctive degrees"],
        ["Mode ID by ear","tonic → 3rd → distinctive degrees"]]},
      result:(score)=>score>=6?"You matched the modes with representative musical contexts.":null }
  ],
  practiceIntro:"Complete 20 practice questions on modal families, distinctive scale degrees, and modal melody writing. The next question will appear after each correct answer.",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Lydian","♯4"],["Mixolydian","♭7"],["Dorian","raised 6"],["Phrygian","♭2"],["Ionian","= major"],["Aeolian","= natural minor"]], reverse:true}, count:6 },
    { gen:"mode-id", params:{set:"all", ask:"recipe"}, count:4 },
    { type:"mc", q:"Why is Dorian classified as a minor-type mode?", choices:["It contains a minor third above the tonic","It contains a major third above the tonic","It has no third"], answer:0,
      explain:"Dorian contains a minor third above its tonic." },
    { type:"mc", q:"Which mode comes first in the commonly used bright-to-dark ordering?", choices:["Lydian","Ionian","Aeolian"], answer:0,
      explain:"Major plus a raised 4th." },
    { type:"mc", q:"To create Dorian from the parallel natural minor scale, raise the…", choices:["sixth scale degree","third scale degree","fourth scale degree"], answer:0,
      explain:"Then emphasize that raised 6th." },
    { type:"truefalse", q:"Locrian differs from the parallel natural minor scale in both its second and fifth degrees.", answer:true,
      explain:"Locrian has a lowered second and lowered fifth compared with natural minor." },
    { type:"truefalse", q:"Compared with the parallel major scale, Mixolydian lowers the seventh scale degree.", answer:true,
      explain:"Mixolydian has a lowered seventh compared with the parallel major scale." },
    { gen:"mode-id", params:{set:"all", ask:"scale"}, count:3 },
    { gen:"term-match", params:{subject:"term", pool:[["Brightest","Lydian"],["Darkest","Locrian"],["Rock's major mode","Mixolydian"],["Minor-type mode with ♭2","Phrygian"]], reverse:true}, count:2 }
  ],
  vocabulary:[
    {term:"Distinctive Scale Degree", def:"A scale degree that helps distinguish a mode from a closely related parallel scale."},
    {term:"Major-type Modes", def:"Ionian, Lydian, Mixolydian — a major 3rd above the tonic."},
    {term:"Minor-type Modes", def:"Dorian, Phrygian, Aeolian — a minor 3rd above the tonic."},
    {term:"Bright-to-Dark Order", def:"A commonly used ordering: Lydian → Ionian → Mixolydian → Dorian → Aeolian → Phrygian → Locrian."}
  ],
  mistakes:[],
  summary:[
    "✔ Two families: <b>major-type</b> (Ionian, Lydian, Mixolydian) and <b>minor-type</b> (Dorian, Phrygian, Aeolian) — Locrian also has a minor 3rd, plus a diminished 5th.",
    "✔ Distinctive degrees: <b>Lydian ♯4 · Mixolydian ♭7 · Dorian raised 6 · Phrygian ♭2</b>; Locrian = natural minor with ♭2 and ♭5.",
    "✔ Often arranged bright to dark: <b>Lydian → … → Locrian</b>, one lowered degree per step.",
    "✔ To write modal: <b>establish the tonic</b>, then emphasize the distinctive scale degrees.",
    "✔ By ear: find the tonic, check the 3rd for family, then listen for the distinctive scale degrees."
  ],
  tips:[
    "Fast ID at the keyboard: play white-key scales from each note — D=Dorian, E=Phrygian, F=Lydian, G=Mixolydian, A=Aeolian.",
    "Without a clear tonic and its distinctive scale degrees, a modal melody may sound like a related major or minor key.",
    "Improvise over a single drone note and shift one scale tone at a time — you'll HEAR the color line.",
    "Next lesson: scales that skip notes entirely — the pentatonics."
  ],
  rewards:{ badge:"Mode Painter", icon:"\u{1F3A8}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz: Establish the tonic, identify the modal family, and examine the distinctive scale degrees.",
  quiz:[
    { type:"mc", q:"What is a distinctive scale degree of a mode?", choices:["A scale degree that helps distinguish the mode from a closely related parallel scale","The loudest note in the scale","A scale degree that must always be the tonic"], answer:0,
      explain:"Distinctive scale degrees help listeners differentiate closely related modes.", hint:"It sets the mode apart from a parallel scale." },
    { type:"mc", q:"Compared with the parallel major scale, Lydian has…", choices:["a raised fourth","a lowered seventh","a lowered second"], answer:0,
      explain:"The raised fourth distinguishes Lydian from the parallel major scale.", hint:"Major-type mode with a raised fourth." },
    { type:"mc", q:"Compared with the parallel major scale, Mixolydian has…", choices:["a lowered seventh","a raised sixth","a raised fourth"], answer:0,
      explain:"The lowered seventh removes the leading tone found in the parallel major scale.", hint:"Major-type mode without a leading tone." },
    { type:"mc", q:"Compared with the parallel natural minor scale, Dorian has…", choices:["a raised sixth","a lowered second","a raised seventh"], answer:0,
      explain:"The raised sixth distinguishes Dorian from the parallel natural minor scale.", hint:"One RAISED note." },
    { type:"mc", q:"Compared with the parallel natural minor scale, Phrygian has…", choices:["a lowered second","a raised fourth","a raised sixth"], answer:0,
      explain:"The lowered second creates a half step between the tonic and second scale degree.", hint:"Minor-type mode with a lowered second." },
    { type:"mc", q:"In the commonly used bright-to-dark ordering of the diatonic modes, which mode comes first?", choices:["Lydian","Ionian","Mixolydian"], answer:0,
      explain:"Lydian → Ionian → Mixolydian → …", hint:"Brighter than major." },
    { type:"mc", q:"A scale using only white keys from G to the next G is…", choices:["G Mixolydian","G Ionian","G Dorian"], answer:0,
      explain:"B forms a major third above G, and F♮ is the lowered seventh compared with G major.", hint:"Check the 7th." },
    { type:"mc", q:"Identify the mode.",
      staff:{clef:"treble",notes:[{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"},{p:"C5",d:"q"},{p:"D5",d:"q"},{p:"E5",d:"q"}],width:400},
      choices:["E Phrygian — F♮ forms a minor second above the tonic","E major","E Lydian"], answer:0,
      explain:"The white-key collection from E to E contains F♮, a minor second above E, identifying E Phrygian.", hint:"Look at the second note." },
    { type:"truefalse", q:"Establishing the tonic and featuring a mode's distinctive scale degrees help make the mode recognizable.", answer:true,
      explain:"Without a clear tonic and distinctive scale degrees, a passage may sound like a related major or minor key.", hint:"Feature it." },
    { type:"truefalse", q:"Parallel Dorian and Aeolian scales differ only in their sixth scale degree.", answer:true,
      explain:"Dorian has a major sixth above the tonic, while Aeolian has a minor sixth.", hint:"The minor pair." },
    { type:"mc", q:"A major-type passage consistently uses a lowered seventh and clearly establishes its tonic. Which mode does it suggest?", choices:["Mixolydian","Ionian","Locrian"], answer:0,
      explain:"Mixolydian combines a major third with a lowered seventh.", hint:"The relaxed 7th." },
    { type:"mc", q:"Which strategy is most useful for identifying a mode by ear?", choices:["Identify the tonic, listen to the third, and then locate the distinctive scale degrees","Count the number of measures","Listen only to the rhythm"], answer:0,
      explain:"First establish the tonic and modal family; then listen for the scale degrees that distinguish the mode.", hint:"Tonic → third → distinctive scale degrees." }
  ],
  miaPerfect:"Perfect score! You accurately identified the modal families and their distinctive scale degrees.",
  miaPass:"You passed! Next, you will explore pentatonic scales.",
  mia:{
    hook:{ label:"the welcome",
      explain:"Melody B lowered its 7th (B→B♭), turning plain major into Mixolydian — one characteristic note changed the whole color.",
      play:()=>{[60,64,67,70,72,70,67,60].forEach((m,i)=>MFAudio.tone(m,.38,i*.32,.42));} },
    learn:{ label:"modes in practice",
      explain:"Two families by the 3rd; distinctive degrees: Lydian ♯4, Mixolydian ♭7, Dorian raised 6, Phrygian ♭2; often arranged bright to dark; write modal = establish the tonic, then emphasize the distinctive degrees.",
      hint:"Tonic → family → distinctive degrees.",
      play:()=>{[57,59,60,62,64,66,67,69].forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.4));} },
    example:{ label:"the examples",
      explain:"Example 1 features Dorian's raised 6th; example 2 leans on Mixolydian's ♭7 — both melodies advertise their fingerprint." },
    game:{ label:"the games",
      explain:"Sprint the distinctive scale degrees, identify scales on cards, arrange the bright-to-dark ordering, then match modes to musical contexts.",
      hint:"Listen for the distinctive degrees." },
    quiz:{ label:"this question",
      explain:"Find the tonic first, check whether the 3rd is major or minor (family), then locate the scale degrees that differ from the parallel major or natural minor scale.",
      play:()=>{[62,64,65,67,69,71,72,74].forEach((m,i)=>MFAudio.tone(m,.34,i*.28,.4));} }
  }
};
