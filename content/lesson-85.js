/* Lesson 85 — Diatonic Triads (Book 4, Unit 21 — SELF-AUTHORED)
   Core: build a triad on EVERY scale degree. Major key qualities:
   I ii iii IV V vi vii° = M m m M M m dim. Harmonic minor:
   i ii° III+ iv V VI vii° (L60 introduced this — reviewed here).
   Case convention: upper = major, lower = minor, ° = dim, + = aug.
   This lesson is the prerequisite for Roman numeral analysis (L86).
   NOTE: edit by FULL-FILE REWRITE only. */

/* quality detective: name the quality of the triad on each degree of C major */
function MF_L85_quality(container,fb){
  const DEG=[["I","C-E-G","M",0],["ii","D-F-A","m",1],["iii","E-G-B","m",2],["IV","F-A-C","M",3],["V","G-B-D","M",4],["vi","A-C-E","m",5],["vii°","B-D-F","d",6]];
  const CH={0:[60,64,67],1:[62,65,69],2:[64,67,71],3:[65,69,72],4:[67,71,74],5:[69,72,76],6:[71,74,77]};
  const ORDER=[0,3,1,4,6,2,5];
  let r=0;
  container.innerHTML=`<div class="big-q l85q-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l85q-play">▶ Hear the triad</button></div>
    <div class="choices chips l85q-ch"><button>Major</button><button>Minor</button><button>Diminished</button></div>`;
  const q=container.querySelector(".l85q-q"), pl=container.querySelector(".l85q-play"), ch=container.querySelector(".l85q-ch");
  function ask(){
    if(r>=ORDER.length){ q.textContent="Excellent! All seven diatonic qualities identified."; pl.style.display="none"; ch.style.display="none"; return; }
    const D=DEG[ORDER[r]];
    q.innerHTML=`Triad ${r+1} of 7 — degree <b>${D[0]}</b> (${D[1]}). What quality?`;
  }
  pl.onclick=()=>{ const D=DEG[ORDER[r]]; if(!D) return; CH[D[3]].forEach(m=>MFAudio.tone(m,.9,.05,.3)); };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    const D=DEG[ORDER[r]]; if(!D) return;
    const map={0:"M",1:"m",2:"d"};
    if(map[i]===D[2]){ CH[D[3]].forEach(m=>MFAudio.tone(m,.7,.05,.28));
      fb(true,`✓ ${D[0]} (${D[1]}) is ${i===0?"MAJOR":i===1?"minor":"diminished"} — the pattern M-m-m-M-M-m-d° never changes in major keys.`);
      r++; setTimeout(ask,1300);
    } else { MFAudio.tone(40,.2); fb(false,"Stack the 3rds and measure them — or recall the pattern M-m-m-M-M-m-d°."); }
  });
  ask();
}

LESSON_CONTENT[85]={
  welcome:"Seven degrees, seven triads. \u{1F3D7}\u{FE0F}",
  hook:{
    say:"<b>Build a triad on EVERY note of the major scale</b> — same stacking, different results. Listen to the ladder. \u{1F447} <b>Do all seven triads sound the same quality?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play all seven triads</button></div>
          <div class="choices hk-ch" style="display:none"><button>No — some are major, some minor, one diminished</button><button>Yes — all major</button><button>Yes — all minor</button></div>`;
        const CH=[[60,64,67],[62,65,69],[64,67,71],[65,69,72],[67,71,74],[69,72,76],[71,74,77],[72,76,79]];
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ CH.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.55,i*.6,.26))); setTimeout(()=>ch.style.display="",CH.length*600+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Three qualities live inside one scale: major (I, IV, V), minor (ii, iii, vi) and one diminished (vii°). The full diatonic family — today's lesson!");
          else fb(false,"Listen again — some triads sound bright, some dark, and the seventh sounds unstable…");
        });
      } }
  },
  objectives:[
    "Build a triad on every degree of the major scale",
    "Memorize the major-key pattern: M-m-m-M-M-m-dim",
    "Write the numerals with correct case: I ii iii IV V vi vii°",
    "Review the harmonic-minor pattern: i ii° III+ iv V VI vii°",
    "Identify any diatonic triad's quality by ear and by eye",
    "Prepare for Roman numeral analysis"
  ],
  steps:[
    { say:"<b>Diatonic Triads:</b> stack two 3rds on <b>each degree of the scale</b>, using only the key's own notes. Seven degrees → seven triads — the key's complete chord family. \u{1F447} <b>A diatonic triad uses…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:80,notes:[
        {p:"C4",d:"h",label:"I"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"D4",d:"h",label:"ii"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"E4",d:"h",label:"iii"},{p:"G4",d:"h",chord:true},{p:"B4",d:"h",chord:true},
        {p:"F4",d:"h",label:"IV"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},{bar:"final"}],width:560} },
      try:{ type:"mc", choices:["Only the key's own notes","Any sharps you like","Only black keys"], answer:0,
        success:"✓ Diatonic = inside the key. No outside notes allowed.",
        fail:"Dia-TONIC = of the key…",
        hint:"The key's seven notes." } },
    { say:"<b>The Major-Key Pattern:</b> the qualities always come out <b>M - m - m - M - M - m - diminished</b>. Every major key, no exceptions. \u{1F447} <b>Which degrees carry MAJOR triads?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14.5px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Degree</th><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center;font-weight:800;color:#2F6DA8">I</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center;color:#C05A21">ii</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center;color:#C05A21">iii</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center;font-weight:800;color:#2F6DA8">IV</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center;font-weight:800;color:#2F6DA8">V</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center;color:#C05A21">vi</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center">vii°</td></tr>
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Quality</th><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center;color:#2F6DA8">Major</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center;color:#C05A21">minor</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center;color:#C05A21">minor</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center;color:#2F6DA8">Major</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center;color:#2F6DA8">Major</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center;color:#C05A21">minor</td><td style="border:1.5px solid #cdd5e1;padding:4px 10px;text-align:center;font-weight:800">dim</td></tr></table>` },
      try:{ type:"mc", choices:["I, IV and V","ii, iii and vi","Only I"], answer:0,
        success:"✓ I, IV and V — the three primary triads — are the major ones. (ii, iii, vi are minor; vii° diminished.)",
        fail:"The primary triads are the major ones…",
        hint:"1, 4, 5." } },
    { say:"<b>The Case Convention:</b> numerals SHOW quality — <b>UPPERCASE = major</b> (I, IV, V) · <b>lowercase = minor</b> (ii, iii, vi) · <b>° = diminished</b> (vii°) · <b>+ = augmented</b> (III+). \u{1F447} <b>“vi” means the triad is…</b>",
      try:{ type:"mc", choices:["Minor — lowercase says so","Major","Diminished"], answer:0,
        success:"✓ Lowercase vi = the minor triad on degree 6.",
        fail:"Read the CASE…",
        hint:"Small letters, small (minor) 3rd on the bottom." } },
    { say:"<b>Minor Keys (Review):</b> using the harmonic minor scale, the pattern becomes <b>i - ii° - III+ - iv - V - VI - vii°</b> — the raised 7th makes V major and vii° diminished. <b>Remember: major keys = M-m-m-M-M-m-d° · harmonic minor = m-d°-A-m-M-M-d°.</b> \u{1F447} <b>In harmonic minor, V is…</b>",
      try:{ type:"mc", choices:["Major — thanks to the raised 7th","Minor","Diminished"], answer:0,
        success:"✓ The raised 7th (the leading tone) sits inside V and makes it major.",
        fail:"Which note did harmonic minor raise?",
        hint:"The leading tone lives in V." } },
    { say:"Name each quality by ear and eye. \u{1F447}",
      try:{ type:"custom",
        hint:"Pattern: M-m-m-M-M-m-d°.",
        mount:(container,fb)=>MF_L85_quality(container,fb) } },
    { say:"<b>Why This Matters:</b> the seven diatonic triads are the <b>vocabulary of harmony</b>. Progressions, cadences and Roman numeral analysis (next lesson) all draw from this family. \u{1F447} <b>The chord family of a key contains…</b>",
      try:{ type:"mc", choices:["Seven triads — one per scale degree","Only three chords","Twelve chromatic chords"], answer:0,
        success:"✓ Seven triads, three qualities, one key.",
        fail:"One triad per degree…",
        hint:"Count the degrees." } },
    { say:"<b>Review:</b> \u{1F447} <b>In any major key, the triad on degree 7 is…</b>",
      try:{ type:"mc", choices:["Diminished (vii°)","Major","Augmented"], answer:0,
        success:"✓ vii° — two minor 3rds stacked, the family's one unstable member.",
        fail:"The last slot of the pattern…",
        hint:"M-m-m-M-M-m-?" } }
  ],
  examples:[
    { caption:"The complete C major triad ladder: I ii iii IV V vi vii° and home again — listen for bright (M), dark (m) and tense (°) as it climbs.",
      staff:{clef:"treble",tempo:76,notes:[
        {p:"C4",d:"q",label:"I"},{p:"E4",d:"q",chord:true},{p:"G4",d:"q",chord:true},
        {p:"D4",d:"q",label:"ii"},{p:"F4",d:"q",chord:true},{p:"A4",d:"q",chord:true},
        {p:"E4",d:"q",label:"iii"},{p:"G4",d:"q",chord:true},{p:"B4",d:"q",chord:true},
        {p:"F4",d:"q",label:"IV"},{p:"A4",d:"q",chord:true},{p:"C5",d:"q",chord:true},
        {p:"G4",d:"q",label:"V"},{p:"B4",d:"q",chord:true},{p:"D5",d:"q",chord:true},
        {p:"A4",d:"q",label:"vi"},{p:"C5",d:"q",chord:true},{p:"E5",d:"q",chord:true},
        {p:"B4",d:"q",label:"vii°"},{p:"D5",d:"q",chord:true},{p:"F5",d:"q",chord:true},
        {p:"C5",d:"h",label:"I"},{p:"E5",d:"h",chord:true},{p:"G5",d:"h",chord:true},{bar:"final"}],width:680},
      kb:{start:48,octaves:3,labels:true} },
    { caption:"A harmonic-minor ladder in A minor: i ii° III+ iv V VI vii° — the G♯ colors III+ augmented, V major and vii° diminished.",
      staff:{clef:"treble",tempo:76,notes:[
        {p:"A3",d:"q",label:"i"},{p:"C4",d:"q",chord:true},{p:"E4",d:"q",chord:true},
        {p:"B3",d:"q",label:"ii°"},{p:"D4",d:"q",chord:true},{p:"F4",d:"q",chord:true},
        {p:"C4",d:"q",label:"III+"},{p:"E4",d:"q",chord:true},{p:"G#4",d:"q",chord:true},
        {p:"D4",d:"q",label:"iv"},{p:"F4",d:"q",chord:true},{p:"A4",d:"q",chord:true},
        {p:"E4",d:"q",label:"V"},{p:"G#4",d:"q",chord:true},{p:"B4",d:"q",chord:true},
        {p:"F4",d:"q",label:"VI"},{p:"A4",d:"q",chord:true},{p:"C5",d:"q",chord:true},
        {p:"G#4",d:"q",label:"vii°"},{p:"B4",d:"q",chord:true},{p:"D5",d:"q",chord:true},
        {p:"A4",d:"h",label:"i"},{p:"C5",d:"h",chord:true},{p:"E5",d:"h",chord:true},{bar:"final"}],width:680},
      kb:{start:45,octaves:3,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Quality-Pattern Sprint (45s)",
      intro:"Every degree, every quality — race the family!",
      miaIntro:"M-m-m-M-M-m-d°! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["I, IV, V in major","major triads"],
        ["ii, iii, vi in major","minor triads"],
        ["vii°","diminished"],
        ["Uppercase numeral","major quality"],
        ["Lowercase numeral","minor quality"],
        ["° symbol","diminished"],
        ["+ symbol","augmented"],
        ["III+ (harmonic minor)","augmented triad"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — the family memorized!":null },
    { type:"key-climb", title:"Game 2 · Climb the Triad Roots",
      intro:"Play the ROOT of each diatonic triad up the C major scale!",
      miaIntro:"Seven roots, one ladder! \u{1FA9C}",
      spec:{seq:[60,62,64,65,67,69,71,72],
        names:["C (I)","D (ii)","E (iii)","F (IV)","G (V)","A (vi)","B (vii°)","C (I)"],
        start:60, octaves:2, title:"Diatonic roots, degree by degree"},
      result:(score)=>score!==null?"Seven roots walked!":null },
    { type:"symbol-hunt", title:"Game 3 · Which Triad Is It?",
      intro:"C major diatonic triads on cards — click the numeral each round names!",
      miaIntro:"Read the root, know the number! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"ii (D-F-A)", spec:{clef:"treble",notes:[{p:"D4",d:"w"},{p:"F4",d:"w",chord:true},{p:"A4",d:"w",chord:true}],width:150}},
        {label:"IV (F-A-C)", spec:{clef:"treble",notes:[{p:"F4",d:"w"},{p:"A4",d:"w",chord:true},{p:"C5",d:"w",chord:true}],width:150}},
        {label:"vi (A-C-E)", spec:{clef:"treble",notes:[{p:"A4",d:"w"},{p:"C5",d:"w",chord:true},{p:"E5",d:"w",chord:true}],width:150}},
        {label:"vii° (B-D-F)", spec:{clef:"treble",notes:[{p:"B4",d:"w"},{p:"D5",d:"w",chord:true},{p:"F5",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Numerals matched on sight!":null },
    { type:"term-race", title:"Game 4 · Case & Symbol Race",
      intro:"Numerals to qualities, at speed!",
      miaIntro:"Case tells quality! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["I","major tonic triad"],
        ["ii","minor supertonic triad"],
        ["iii","minor mediant triad"],
        ["IV","major subdominant triad"],
        ["V","major dominant triad"],
        ["vi","minor submediant triad"],
        ["vii°","diminished leading-tone triad"],
        ["i (minor key)","minor tonic triad"]]},
      result:(score)=>score>=6?"Every numeral decoded!":null }
  ],
  practiceIntro:"20 practice questions — qualities, cases and both key patterns. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["I IV V","major"],["ii iii vi","minor"],["vii°","diminished"],["Uppercase","major"],["Lowercase","minor"],["°","diminished"]], reverse:true}, count:6 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:3 },
    { type:"mc", q:"How many diatonic triads does a key contain?", choices:["7","3","12"], answer:0,
      explain:"One per scale degree." },
    { type:"mc", q:"The major-key quality pattern is…", choices:["M-m-m-M-M-m-dim","all major","m-M-m-M-m-M-m"], answer:0,
      explain:"Fixed for every major key." },
    { type:"mc", q:"In G major, the triad on degree 2 (A-C-E) is…", choices:["minor (ii)","major (II)","diminished"], answer:0,
      explain:"Degree 2 is always minor in major keys." },
    { type:"mc", q:"In harmonic minor, the triad on the raised 7th is…", choices:["diminished (vii°)","major","minor"], answer:0,
      explain:"Same as major's vii° — the leading-tone triad." },
    { type:"truefalse", q:"Uppercase Roman numerals indicate major triads.", answer:true,
      explain:"Case = quality." },
    { type:"truefalse", q:"In a major key, iii is a major triad.", answer:false,
      explain:"Lowercase iii = minor." },
    { type:"truefalse", q:"III+ in harmonic minor is augmented.", answer:true,
      explain:"The raised 7th stretches its 5th." },
    { gen:"triad-id", params:{}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 }
  ],
  vocabulary:[
    {term:"Diatonic Triads", def:"The seven triads built on the scale degrees using only the key's own notes."},
    {term:"Major-Key Pattern", def:"I ii iii IV V vi vii° = M-m-m-M-M-m-diminished. Identical in every major key."},
    {term:"Harmonic-Minor Pattern", def:"i ii° III+ iv V VI vii° — the raised 7th creates III+, major V and vii°."},
    {term:"Case Convention", def:"UPPERCASE = major · lowercase = minor · ° = diminished · + = augmented."}
  ],
  mistakes:[],
  summary:[
    "✔ Seven degrees → <b>seven diatonic triads</b>, built only from the key's notes.",
    "✔ Major keys: <b>M-m-m-M-M-m-d°</b> — I ii iii IV V vi vii°, always.",
    "✔ Harmonic minor: <b>i ii° III+ iv V VI vii°</b> — the raised 7th does the coloring.",
    "✔ <b>Case shows quality</b>: I vs i, plus ° and +.",
    "✔ This family is the vocabulary for progressions, cadences and analysis."
  ],
  tips:[
    "Memorize by groups: majors 1-4-5, minors 2-3-6, diminished 7 — three facts instead of seven.",
    "At the keyboard, play the triad ladder daily in one new key — the pattern transfers by itself.",
    "vii° sounds like V7 missing its root — they share three notes and one job.",
    "Next lesson: give every chord its NUMERAL and its FUNCTION — Roman numeral analysis."
  ],
  rewards:{ badge:"Chord Family Keeper", icon:"\u{1F3D7}\u{FE0F}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! M-m-m-M-M-m-d° — case closed.",
  quiz:[
    { type:"mc", q:"A diatonic triad is built from…", choices:["only the key's own notes","any chromatic notes","black keys only"], answer:0,
      explain:"Diatonic = inside the key.", hint:"No outsiders." },
    { type:"mc", q:"The quality pattern in every major key is…", choices:["M-m-m-M-M-m-dim","M-M-M-m-m-m-dim","random"], answer:0,
      explain:"Fixed and universal.", hint:"Three majors: 1, 4, 5." },
    { type:"mc", q:"Which degrees are minor in a major key?", choices:["2, 3 and 6","1, 4 and 5","5 and 7"], answer:0,
      explain:"ii, iii, vi.", hint:"The lowercase trio." },
    { type:"mc", q:"The triad on degree 7 of a major key is…", choices:["diminished","major","augmented"], answer:0,
      explain:"vii° — two minor 3rds.", hint:"The ° degree." },
    { type:"mc", q:"“IV” tells you the triad is…", choices:["major, on degree 4","minor, on degree 4","diminished"], answer:0,
      explain:"Uppercase = major.", hint:"Read the case." },
    { type:"mc", q:"“vii°” tells you the triad is…", choices:["diminished, on degree 7","major, on degree 7","augmented"], answer:0,
      explain:"The ° marks diminished.", hint:"The circle." },
    { type:"mc", q:"Identify the numeral (key: C major).",
      staff:{clef:"treble",notes:[{p:"A4",d:"w"},{p:"C5",d:"w",chord:true},{p:"E5",d:"w",chord:true}],width:160},
      choices:["vi — A minor","VI — A major","IV"], answer:0,
      explain:"A-C-E on degree 6, minor.", hint:"Root A = degree 6." },
    { type:"mc", q:"In harmonic minor, which triad is augmented?", choices:["III+","V","iv"], answer:0,
      explain:"The raised 7th stretches III's 5th.", hint:"The + symbol." },
    { type:"mc", q:"In harmonic minor, V is major because…", choices:["the raised 7th is its 3rd","all Vs are major everywhere","the key signature says so"], answer:0,
      explain:"The leading tone lives inside V.", hint:"Lesson 60's story." },
    { type:"truefalse", q:"The pattern M-m-m-M-M-m-d° changes from key to key.", answer:false,
      explain:"It is identical in every major key.", hint:"Universal." },
    { type:"truefalse", q:"ii° appears in harmonic minor.", answer:true,
      explain:"Degree 2 in minor is diminished.", hint:"The minor pattern's second slot." },
    { type:"mc", q:"In F major, the triad G-B♭-D is…", choices:["ii — minor","II — major","vii°"], answer:0,
      explain:"Degree 2 of F major, minor quality.", hint:"Count from F." }
  ],
  miaPerfect:"PERFECT! The whole chord family answers your roll call. \u{1F3D7}\u{FE0F}\u{1F389}",
  miaPass:"Passed! Seven triads, three qualities, zero doubts. Next: Roman numeral analysis…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Seven triads on seven degrees produced three qualities: major (I, IV, V), minor (ii, iii, vi) and diminished (vii°).",
      play:()=>{const CH=[[60,64,67],[62,65,69],[64,67,71],[65,69,72],[67,71,74],[69,72,76],[71,74,77],[72,76,79]];CH.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.5,i*.55,.26)));} },
    learn:{ label:"diatonic triads",
      explain:"Triad per degree, key notes only. Major: M-m-m-M-M-m-d°. Harmonic minor: i ii° III+ iv V VI vii°. Case shows quality; ° dim, + aug.",
      hint:"Majors 1-4-5, minors 2-3-6, dim 7.",
      play:()=>{[60,64,67].forEach(m=>MFAudio.tone(m,.6,0,.3));[62,65,69].forEach(m=>MFAudio.tone(m,.6,.7,.3));[71,74,77].forEach(m=>MFAudio.tone(m,.7,1.4,.3));} },
    example:{ label:"the examples",
      explain:"Example 1 climbs all seven C major triads; example 2 climbs A harmonic minor — hear the G♯ recolor III, V and vii." },
    game:{ label:"the games",
      explain:"Sprint the pattern, walk the roots, match numerals on cards, then decode case and symbols at speed.",
      hint:"Case = quality." },
    quiz:{ label:"this question",
      explain:"Two memorized patterns answer everything: M-m-m-M-M-m-d° (major) and i ii° III+ iv V VI vii° (harmonic minor).",
      play:()=>{[65,69,72].forEach(m=>MFAudio.tone(m,.6,0,.3));[69,72,76].forEach(m=>MFAudio.tone(m,.6,.7,.3));} }
  }
};
