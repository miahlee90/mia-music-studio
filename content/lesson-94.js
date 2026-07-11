/* Lesson 94 — Inversions of Seventh Chords (Book 4, Unit 23 — SELF-AUTHORED)
   L51-54 covered triad inversions + V7 inversions + figured bass — reviewed
   in ONE step. New: ALL five seventh types invert the same way; figures
   7 / 6-5 / 4-3 / 4-2 apply to every seventh chord; bass-line reading;
   lead-sheet slash equivalents. NOTE: edit by FULL-FILE REWRITE only. */

/* position detective for any seventh chord */
function MF_L94_pos(container,fb){
  const ROUNDS=[
    {name:"Cmaj7, E in the bass", notes:[52,60,67,71], pos:1, expl:"3rd in the bass = 1st inversion — figure 6/5."},
    {name:"Dm7, C in the bass", notes:[48,62,65,69], pos:3, expl:"7th in the bass = 3rd inversion — figure 4/2."},
    {name:"G7, D in the bass", notes:[50,55,59,65], pos:2, expl:"5th in the bass = 2nd inversion — figure 4/3."},
    {name:"Am7, A in the bass", notes:[45,60,64,67], pos:0, expl:"Root in the bass = root position — figure 7."}];
  let r=0, played=false;
  container.innerHTML=`<div class="big-q l94p-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l94p-play">▶ Hear the voicing</button></div>
    <div class="choices l94p-ch" style="display:none"><button>Root position (7)</button><button>1st inversion (6/5)</button><button>2nd inversion (4/3)</button><button>3rd inversion (4/2)</button></div>`;
  const q=container.querySelector(".l94p-q"), pl=container.querySelector(".l94p-play"), ch=container.querySelector(".l94p-ch");
  pl.onclick=()=>{ const R=ROUNDS[r]; if(!R) return; R.notes.forEach(m=>MFAudio.tone(m,1.0,.05,.28)); played=true; setTimeout(()=>ch.style.display="",1400); };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    const R=ROUNDS[r]; if(!R||!played) return;
    if(i===R.pos){ fb(true,"✓ "+R.expl); r++; played=false; ch.style.display="none";
      if(r>=ROUNDS.length){ q.textContent="Excellent! Positions read from any bass note."; pl.style.display="none"; } else ask();
    } else { MFAudio.tone(40,.2); fb(false,"Which chord member is LOWEST — root, 3rd, 5th or 7th?"); }
  });
  function ask(){ q.innerHTML=`Voicing ${r+1} of ${ROUNDS.length}: <b>${ROUNDS[r].name}</b>. Which position?`; }
  ask();
}

LESSON_CONTENT[94]={
  welcome:"Seventh chords, upside down: four positions each. \u{1F504}",
  hook:{
    say:"<b>Four notes mean FOUR possible bass notes.</b> Listen to Cmaj7 four ways — root, then 3rd, 5th and 7th in the bass. \u{1F447} <b>What changes between voicings?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the four positions</button></div>
          <div class="choices hk-ch" style="display:none"><button>The bass note — the chord members take turns on the bottom</button><button>The chord's name</button><button>The number of notes</button></div>`;
        const ROWS=[[48,64,67,71],[52,60,67,71],[55,60,64,71],[59,60,64,67]];
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.85,i*.9,.26))); setTimeout(()=>ch.style.display="",ROWS.length*900+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Same four notes each time — only the BASS rotated: root, 3rd, 5th, 7th. Four positions for every seventh chord. Today's lesson!");
          else fb(false,"The chord stayed Cmaj7 throughout — listen to the LOWEST voice…");
        });
      } }
  },
  objectives:[
    "Review triad inversions and figured bass (L51–54) in one step",
    "Invert any seventh chord into four positions",
    "Attach the figures: 7 · 6/5 · 4/3 · 4/2",
    "Apply the figures to ALL five seventh types",
    "Read the bass note to name the position",
    "Translate to lead-sheet slashes (G7/B = V6/5)"
  ],
  steps:[
    { say:"<b>Review:</b> triads invert twice (root, 6, 6/4 — Lessons 51–52); V7 inverts three times (7, 6/5, 4/3, 4/2 — Lesson 53); figured bass numbers count intervals above the BASS (Lesson 54). \u{1F447} <b>Figures count intervals above…</b>",
      try:{ type:"mc", choices:["The bass (lowest) note","The root","The melody"], answer:0,
        success:"✓ Always the bass — whatever chord member sits there.",
        fail:"Lesson 54's rule…",
        hint:"The lowest voice." } },
    { say:"<b>Four Positions for Every Seventh:</b> with four notes, any member can be the bass: <b>root (7) · 3rd (6/5) · 5th (4/3) · 7th (4/2)</b>. This applies to <b>all five types</b> — maj7, dom7, m7, ø7, °7. \u{1F447} <b>How many inversions does a seventh chord have?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14.5px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Bass note</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Position</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Figure</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">Root</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">root position</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800">7</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">3rd</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">1st inversion</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800">6\u{2085} (6/5)</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">5th</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">2nd inversion</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800">4\u{2083} (4/3)</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">7th</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">3rd inversion</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800">4\u{2082} (4/2)</td></tr></table>` },
      try:{ type:"mc", choices:["Three (plus root position = four positions)","One","Seven"], answer:0,
        success:"✓ Root position + three inversions = four ways to voice it.",
        fail:"Four notes, four possible basses…",
        hint:"One per chord member." } },
    { say:"<b>Reading a Position:</b> find the <b>bass note</b>, ask \u{201C}which member is it?\u{201D} Example: Dm7 with F in the bass — F is the 3rd → 1st inversion → figure 6/5 → \u{201C}ii6/5\u{201D} in C major. \u{1F447} <b>G7 with F in the bass is…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:80,notes:[
        {p:"F4",d:"w",label:"bass = 7th"},{p:"G4",d:"w",chord:true},{p:"B4",d:"w",chord:true},{p:"D5",d:"w",chord:true},{bar:"final"}],width:300} },
      try:{ type:"mc", choices:["3rd inversion — V4/2","1st inversion — V6/5","Root position"], answer:0,
        success:"✓ F is G7's 7th; 7th in the bass = 3rd inversion = 4/2.",
        fail:"F's role inside G-B-D-F is…",
        hint:"The last-added note." } },
    { say:"<b>Same Figures, Every Type:</b> Cmaj7/E, Cm7/E♭ and C°7/E♭ are ALL 6/5 chords — the figures care about the bass member, not the chord's quality. <b>Remember: root=7 · 3rd=6/5 · 5th=4/3 · 7th=4/2 — for all five types.</b> \u{1F447} <b>Am7 with G in the bass carries which figure?</b>",
      try:{ type:"mc", choices:["4/2 — G is the 7th","6/5 — G is the 3rd","7 — G is the root"], answer:0,
        success:"✓ G is Am7's 7th → 3rd inversion → 4/2. Quality never changes the figure.",
        fail:"Spell Am7: A-C-E-G. Which member is G?",
        hint:"The top of the stack, moved downstairs." } },
    { say:"<b>Slash-Symbol Bridge:</b> lead sheets write inversions with slashes — <b>G7/B</b> (B in the bass) IS <b>V6/5</b> in C. One chord, two notations: classical figures, popular slashes. \u{1F447} <b>Dm7/C in lead-sheet equals which figure?</b>",
      try:{ type:"mc", choices:["4/2 — C is Dm7's 7th","6/5","7"], answer:0,
        success:"✓ C under Dm7 = 7th in the bass = 4/2 — two notations, one sound.",
        fail:"Spell Dm7: D-F-A-C…",
        hint:"What is C's role?" } },
    { say:"Name positions by ear and spelling. \u{1F447}",
      try:{ type:"custom",
        hint:"Ask: which member is lowest?",
        mount:(container,fb)=>MF_L94_pos(container,fb) } },
    { say:"<b>Why Invert Sevenths?</b> smooth <b>bass lines</b>: root-position leaps become stepwise motion when inversions fill the gaps — the example below walks its bass with a 4/2 and a 6/5. \u{1F447} <b>Inversions mainly serve…</b>",
      try:{ type:"mc", choices:["Smooth, stepwise bass motion","Louder playing","Faster tempos"], answer:0,
        success:"✓ The bass walks instead of leaping — Lesson 55's principle, now with four-note chords.",
        fail:"Watch the bass line in the example…",
        hint:"Stepwise basses." } },
    { say:"<b>Review:</b> \u{1F447} <b>Which figure marks a seventh chord with its 5th in the bass?</b>",
      try:{ type:"mc", choices:["4/3","6/5","4/2"], answer:0,
        success:"✓ 5th in the bass = 2nd inversion = 4/3.",
        fail:"Middle member, middle figure…",
        hint:"Between 6/5 and 4/2." } }
  ],
  examples:[
    { caption:"G7 in all four positions: 7 → 6/5 → 4/3 → 4/2. Same four notes; the bass rotates through root, 3rd, 5th, 7th.",
      staff:{clef:"treble",tempo:66,notes:[
        {p:"G3",d:"h",label:"7"},{p:"B3",d:"h",chord:true},{p:"D4",d:"h",chord:true},{p:"F4",d:"h",chord:true},
        {p:"B3",d:"h",label:"6/5"},{p:"D4",d:"h",chord:true},{p:"F4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"D4",d:"h",label:"4/3"},{p:"F4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{p:"B4",d:"h",chord:true},
        {p:"F4",d:"h",label:"4/2"},{p:"G4",d:"h",chord:true},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},{bar:"final"}],width:640},
      kb:{start:43,octaves:3,labels:true} },
    { caption:"Inversions building the bass line: I → V4/2 → I6 → ii6/5 → V7 → I. The bass moves C-F-E-F-G-C — the 4/2 and 6/5 keep the middle stepwise.",
      staff:{clef:"treble",tempo:72,notes:[
        {p:"C4",d:"h",label:"I"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"F4",d:"h",label:"V4/2"},{p:"G4",d:"h",chord:true},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},
        {p:"E4",d:"h",label:"I6"},{p:"G4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"F4",d:"h",label:"ii6/5"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},{p:"D5",d:"h",chord:true},
        {p:"G3",d:"h",label:"V7"},{p:"B3",d:"h",chord:true},{p:"D4",d:"h",chord:true},{p:"F4",d:"h",chord:true},
        {p:"C4",d:"w",label:"I"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:680},
      kb:{start:43,octaves:3,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Figure Sprint (45s)",
      intro:"Bass members to figures — race them!",
      miaIntro:"7, 6/5, 4/3, 4/2! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Root in the bass","7 (root position)"],
        ["3rd in the bass","6/5 (1st inversion)"],
        ["5th in the bass","4/3 (2nd inversion)"],
        ["7th in the bass","4/2 (3rd inversion)"],
        ["The figures apply to","all five seventh types"],
        ["G7/B in figures","V6/5"],
        ["Dm7/C in figures","ii4/2 (in C)"],
        ["Inversions exist for","smooth bass lines"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — figures fluent!":null },
    { type:"key-climb", title:"Game 2 · Rotate the Bass",
      intro:"Play G7's four bass notes in position order: G, B, D, F!",
      miaIntro:"Root, 3rd, 5th, 7th! \u{1FA9C}",
      spec:{seq:[55,59,62,65],
        names:["G (root — 7)","B (3rd — 6/5)","D (5th — 4/3)","F (7th — 4/2)"],
        start:55, octaves:1, title:"One chord, four bass notes"},
      result:(score)=>score!==null?"The bass rotation, by hand!":null },
    { type:"symbol-hunt", title:"Game 3 · Position Spotter",
      intro:"G7 voicings on cards — click the position each round names!",
      miaIntro:"Read the LOWEST note! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Root position (7)", spec:{clef:"treble",notes:[{p:"G3",d:"w"},{p:"B3",d:"w",chord:true},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true}],width:150}},
        {label:"1st inversion (6/5)", spec:{clef:"treble",notes:[{p:"B3",d:"w"},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:150}},
        {label:"2nd inversion (4/3)", spec:{clef:"treble",notes:[{p:"D4",d:"w"},{p:"F4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"B4",d:"w",chord:true}],width:150}},
        {label:"3rd inversion (4/2)", spec:{clef:"treble",notes:[{p:"F4",d:"w"},{p:"G4",d:"w",chord:true},{p:"B4",d:"w",chord:true},{p:"D5",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Positions spotted on sight!":null },
    { type:"term-race", title:"Game 4 · Slash ↔ Figure Race",
      intro:"Translate between lead-sheet slashes and figures — at speed!",
      miaIntro:"Two notations, one chord! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["G7/B","V6/5 in C"],
        ["G7/D","V4/3 in C"],
        ["G7/F","V4/2 in C"],
        ["Cmaj7/E","Imaj 6/5 in C"],
        ["Root position slash","no slash needed"],
        ["6/5's bass member","the 3rd"],
        ["4/3's bass member","the 5th"],
        ["4/2's bass member","the 7th"]]},
      result:(score)=>score>=6?"Both notations, one brain!":null }
  ],
  practiceIntro:"20 practice questions — positions, figures and slashes. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Root bass","7"],["3rd bass","6/5"],["5th bass","4/3"],["7th bass","4/2"],["G7/F","4/2"],["Figures count from","the bass"]], reverse:true}, count:6 },
    { gen:"inversion-id", params:{subject:"v7", ask:"both"}, count:4 },
    { type:"mc", q:"A seventh chord has how many positions (including root)?", choices:["4","3","2"], answer:0,
      explain:"One per chord member." },
    { type:"mc", q:"The figure 6/5 means the bass is the chord's…", choices:["3rd","root","7th"], answer:0,
      explain:"1st inversion." },
    { type:"mc", q:"The figure 4/2 means the bass is the chord's…", choices:["7th","5th","3rd"], answer:0,
      explain:"3rd inversion." },
    { type:"mc", q:"Cm7 with G in the bass is…", choices:["2nd inversion (4/3)","1st inversion","root position"], answer:0,
      explain:"G is the 5th of C-E♭-G-B♭." },
    { type:"truefalse", q:"The figures 7, 6/5, 4/3, 4/2 apply only to dominant sevenths.", answer:false,
      explain:"They apply to ALL five seventh types." },
    { type:"truefalse", q:"G7/B and V6/5 (in C) describe the same voicing.", answer:true,
      explain:"Slash and figure agree." },
    { type:"truefalse", q:"Inversions mainly exist to create smooth bass motion.", answer:true,
      explain:"Stepwise basses beat leaping ones." },
    { gen:"inversion-id", params:{subject:"v7", ask:"figure"}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 }
  ],
  vocabulary:[
    {term:"Third Inversion", def:"The 7th in the bass — unique to seventh chords. Figure: 4/2."},
    {term:"The Four Figures", def:"7 (root) · 6/5 (3rd in bass) · 4/3 (5th) · 4/2 (7th) — quality-independent."},
    {term:"Slash Equivalent", def:"G7/B = V6/5: lead sheets and figured bass name the same voicings."},
    {term:"Walking Bass by Inversion", def:"Inversions let the bass move by step while the harmony holds."}
  ],
  mistakes:[],
  summary:[
    "✔ Four notes → <b>four positions</b>: root, 1st, 2nd, 3rd inversion.",
    "✔ Figures: <b>7 · 6/5 · 4/3 · 4/2</b> — bass member decides, quality never does.",
    "✔ Works for <b>all five seventh types</b>.",
    "✔ Lead-sheet slashes say the same thing: <b>G7/B = V6/5</b>.",
    "✔ Purpose: <b>stepwise bass lines</b>."
  ],
  tips:[
    "Memory aid: the figures COUNT DOWN as the bass climbs — 7, 65, 43, 42.",
    "4/2 chords love resolving to 6 chords: the bass 7th steps down to the next chord's 3rd.",
    "At the keyboard, rotate one seventh chord through all four positions daily — pick a new type each day.",
    "Next lesson: chaining chords into the progressions everyone plays."
  ],
  rewards:{ badge:"Position Master", icon:"\u{1F504}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Which member is in the bass?",
  quiz:[
    { type:"mc", q:"How many inversions does a seventh chord have?", choices:["Three","Two","Four"], answer:0,
      explain:"Plus root position = four total positions.", hint:"Four notes, minus the root." },
    { type:"mc", q:"Root position of a seventh chord takes the figure…", choices:["7","6/5","4/2"], answer:0,
      explain:"Just the 7.", hint:"Simplest figure." },
    { type:"mc", q:"1st inversion (3rd in the bass) takes…", choices:["6/5","4/3","7"], answer:0,
      explain:"The 6/5 chord.", hint:"After 7 comes…" },
    { type:"mc", q:"2nd inversion (5th in the bass) takes…", choices:["4/3","6/5","4/2"], answer:0,
      explain:"The 4/3 chord.", hint:"The middle figure." },
    { type:"mc", q:"3rd inversion (7th in the bass) takes…", choices:["4/2","4/3","6/5"], answer:0,
      explain:"The 4/2 chord — unique to sevenths.", hint:"The last figure." },
    { type:"mc", q:"Identify the position.",
      staff:{clef:"treble",notes:[{p:"B3",d:"w"},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:160},
      choices:["G7 in 1st inversion (6/5)","G7 root position","G7 4/2"], answer:0,
      explain:"B (the 3rd) is lowest.", hint:"Name the bass member." },
    { type:"mc", q:"Fmaj7 with E in the bass is…", choices:["3rd inversion (4/2)","1st inversion (6/5)","root position"], answer:0,
      explain:"E is Fmaj7's 7th (F-A-C-E).", hint:"Spell it first." },
    { type:"mc", q:"The lead-sheet equivalent of ii6/5 in C major is…", choices:["Dm7/F","Dm7/C","Dm7"], answer:0,
      explain:"3rd (F) in the bass.", hint:"6/5 = 3rd downstairs." },
    { type:"truefalse", q:"The figure 4/2 can apply to a minor seventh chord.", answer:true,
      explain:"Figures ignore quality — any type, any position.", hint:"Universal figures." },
    { type:"truefalse", q:"A triad can be in 3rd inversion.", answer:false,
      explain:"Triads have no 7th — only sevenths reach 4/2.", hint:"Count the notes." },
    { type:"mc", q:"Why do composers use 4/2 chords before 6 chords?", choices:["The bass 7th resolves down by step","They are louder","They avoid the dominant"], answer:0,
      explain:"C under D7 falls to B under G/B — stepwise.", hint:"Where does a 7th want to go?" },
    { type:"mc", q:"The main musical purpose of inversions is…", choices:["smooth, stepwise bass lines","changing the chord's name","playing faster"], answer:0,
      explain:"Walks, not leaps.", hint:"Lesson 55's principle." }
  ],
  miaPerfect:"PERFECT! Every bass note read, every figure attached. \u{1F504}\u{1F389}",
  miaPass:"Passed! Sevenths spin at your command. Next: the progressions everyone plays…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Cmaj7 four ways: the bass rotated root → 3rd → 5th → 7th while the chord stayed itself — four positions.",
      play:()=>{const ROWS=[[48,64,67,71],[52,60,67,71],[55,60,64,71],[59,60,64,67]];ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.85,.26)));} },
    learn:{ label:"seventh inversions",
      explain:"Four positions: 7, 6/5, 4/3, 4/2 by bass member (root/3rd/5th/7th) — same for all five types; slashes say it in lead-sheet.",
      hint:"Find the bass, name its role.",
      play:()=>{[50,55,59,65].forEach(m=>MFAudio.tone(m,.9,.05,.28));} },
    example:{ label:"the examples",
      explain:"Example 1 rotates G7 through all four positions; example 2 builds a stepwise bass from inversions." },
    game:{ label:"the games",
      explain:"Sprint the figures, rotate a bass by hand, spot positions on cards, then translate slash ↔ figure.",
      hint:"7-65-43-42." },
    quiz:{ label:"this question",
      explain:"One question always works: which chord member is in the BASS? Root=7, 3rd=6/5, 5th=4/3, 7th=4/2.",
      play:()=>{[52,60,67,71].forEach(m=>MFAudio.tone(m,.9,.05,.28));} }
  }
};
