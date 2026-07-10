/* Lesson 59 — Augmented and Diminished Triads (AEMT Book 3, Unit 14 FINALE)
   Built from drafts/UNIT 14 – Lesson 59.md; AEMT3 p.93 verified by render.
   Core: AUGMENTED (+) = major triad with the 5th RAISED ½ step (M3+M3);
   DIMINISHED (°) = minor triad with the 5th LOWERED ½ step (m3+m3);
   symbols: letter=major, m=minor, +=aug, °=dim; MAJOR TRIAD SCALE:
   degrees 1-4-5 major, 2-3-6 minor, 7 DIMINISHED (vii°).
   NOTE: edit by FULL-FILE REWRITE only. */

/* stretch & shrink lab: tap the 5th to alter it */
function MF_L59_lab(container,fb){
  const ROUNDS=[
    {from:"C major (C-E-G)", to:"C+ — AUGMENTED", base:["C4","E4","G4"], out:["C4","E4","G#4"], dir:"raise",
      expl:"G rose to G♯: a major triad stretched wider — bright, floating, unresolved. Symbol: C+."},
    {from:"C minor (C-E♭-G)", to:"C° — DIMINISHED", base:["C4","Eb4","G4"], out:["C4","Eb4","Gb4"], dir:"lower",
      expl:"G fell to G♭: a minor triad squeezed narrower — dark, tense, hungry to resolve. Symbol: C°."}];
  let r=0;
  container.innerHTML=`<div class="big-q l59l-q" style="text-align:center"></div>
    <div class="l59l-staff"></div>
    <div style="text-align:center"><button class="play l59l-next" style="display:none">▶ Next experiment</button></div>`;
  const q=container.querySelector(".l59l-q"), holder=container.querySelector(".l59l-staff"), nxt=container.querySelector(".l59l-next");
  function draw(ps,label,clickable){
    Staff.render(holder,{clef:"treble",notes:ps.map((p,ix)=>ix===0?{p,d:"w",label}:{p,d:"w",chord:true}),
      width:250, clickNotes:clickable,
      onNote: clickable? (i)=>{
        const R=ROUNDS[r];
        if(i===2){
          draw(R.out, R.to, false);
          R.out.forEach(p=>MFAudio.tone(MFAudio.midi(p),1.2,.1,.32));
          fb(true,`✓ ${R.expl}`);
          r++;
          if(r<ROUNDS.length) nxt.style.display="inline-block";
          else q.textContent="Both experiments complete — you stretched a chord and squeezed one!";
        } else { MFAudio.tone(40,.2); fb(false, i===0? "The ROOT never moves. Today's dial is the TOP note." : "The 3rd had its turn last lesson — today we alter the 5TH."); }
      } : undefined});
  }
  function ask(){
    const R=ROUNDS[r]; nxt.style.display="none";
    q.innerHTML=`${R.from}: tap the note we ${R.dir==="raise"?"RAISE":"LOWER"} a half step to make it ${R.to.split(" — ")[1]}.`;
    draw(R.base, R.from.split(" ")[0]+" "+R.from.split(" ")[1], true);
  }
  nxt.onclick=()=>ask();
  ask();
}

/* keyboard builder: all four qualities on one root */
function MF_L59_build(container,fb){
  const ROUNDS=[
    {name:"C major", sym:"C", pcs:[0,4,7], names:["C","E (M3)","G (P5)"]},
    {name:"C augmented", sym:"C+", pcs:[0,4,8], names:["C","E (M3)","G♯ (raised 5th!)"]},
    {name:"C minor", sym:"Cm", pcs:[0,3,7], names:["C","E♭ (m3)","G (P5)"]},
    {name:"C diminished", sym:"C°", pcs:[0,3,6], names:["C","E♭ (m3)","G♭ (lowered 5th!)"]}];
  let r=0,k=0,last=null,got=[];
  container.innerHTML=`<div class="big-q l59b-q" style="text-align:center"></div>
    <div class="l59b-staff"></div><div class="l59b-kb"></div>`;
  const q=container.querySelector(".l59b-q"), sh=container.querySelector(".l59b-staff"), kh=container.querySelector(".l59b-kb");
  function drawStaff(){
    if(!got.length){ sh.innerHTML=""; return; }
    const NAMES={0:"C",3:"Eb",4:"E",6:"Gb",7:"G",8:"G#"};
    const ps=got.map(m=>(NAMES[m%12]||"C")+(Math.floor(m/12)-1));
    Staff.render(sh,{clef:"treble",notes:ps.map((p,ix)=>ix===0?{p,d:"w"}:{p,d:"w",chord:true}),width:190});
  }
  function ask(){
    if(r>=ROUNDS.length){ q.textContent="All FOUR qualities built on one root — the complete triad family!"; return; }
    k=0; last=null; got=[]; drawStaff();
    q.innerHTML=`Build <b>${ROUNDS[r].name} (${ROUNDS[r].sym})</b>, bottom to top. Press <b>${ROUNDS[r].names[0]}</b> first.`;
  }
  Keyboard.create(kh,{start:60,octaves:2,labels:true,
    onKey:m=>{
      const R=ROUNDS[r]; if(!R) return;
      const want=R.pcs[k];
      if(m%12===want && (last===null || m>last)){
        last=m; got.push(m); k++; drawStaff();
        if(k>=3){ got.forEach(x=>MFAudio.tone(x,1.2,.1,.32));
          fb(true,`✓ ${R.name} — ${R.sym}. ${r===1?"Hear it float?":r===3?"Hear it squirm?":"Solid ground."}`);
          r++; setTimeout(ask,1500); }
        else q.innerHTML=`Good — now <b>${R.names[k]}</b>, above your last key.`;
      } else if(m%12===want){ MFAudio.tone(40,.2); fb(false,"Right key — build UPWARD."); }
      else { MFAudio.tone(40,.2); fb(false,k===2? (R.pcs[2]===8?"Raise the 5th: one key ABOVE G.":R.pcs[2]===6?"Lower the 5th: one key BELOW G.":"The perfect 5th is 7 half steps up.") : "Check the 3rd: major uses E, minor uses E♭."); }
    }});
  ask();
}

/* ear lab: all four qualities */
function MF_L59_ear(container,fb){
  const QUALS=[
    {name:"Major", midis:[60,64,67]},
    {name:"Minor", midis:[60,63,67]},
    {name:"Augmented", midis:[60,64,68]},
    {name:"Diminished", midis:[60,63,66]}];
  let order=[0,2,1,3].sort(()=>Math.random()-.5), r=0, played=false;
  container.innerHTML=`<div class="big-q l59e-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l59e-play">▶ Play the mystery chord</button></div>
    <div class="choices chips l59e-ch" style="display:none"><button>Major</button><button>Minor</button><button>Augmented</button><button>Diminished</button></div>`;
  const q=container.querySelector(".l59e-q"), pl=container.querySelector(".l59e-play"), ch=container.querySelector(".l59e-ch");
  function ask(){
    if(r>=order.length){ q.textContent="All four qualities identified by ear — Unit 14 ears complete!"; pl.style.display="none"; ch.style.display="none"; return; }
    played=false; ch.style.display="none";
    q.innerHTML=`Round ${r+1} of ${order.length}: solid, shaded, floating… or squirming?`;
  }
  pl.onclick=()=>{ const F=QUALS[order[r]]; if(!F) return;
    F.midis.forEach(m=>MFAudio.tone(m,1.3,0,.32)); played=true;
    setTimeout(()=>ch.style.display="",1000); };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(!played) return;
    const want=order[r];
    if(i===want){ MFAudio.yay();
      fb(true,`✓ ${QUALS[want].name}! ${["Solid and bright.","Shaded but stable.","Wide and floating — no ceiling.","Narrow and tense — it NEEDS to move."][want]}`);
      r++; setTimeout(ask,1300); }
    else { MFAudio.tone(40,.2); fb(false,"Replay it. Stable or unstable? Then: bright-wide (aug) or dark-narrow (dim)?"); }
  });
  ask();
}

LESSON_CONTENT[59]={
  welcome:"The Unit 14 finale — two chords that refuse to sit still. \u{26A1}",
  hook:{
    say:"You know major and minor. Now listen to these two strangers: one seems to <b>float upward with no ceiling</b>, the other <b>coils like a spring</b>. <b>Which is which?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Stranger 1</button>
          <button class="play hk-b">▶ Stranger 2</button></div>
          <div class="choices hk-ch" style="display:none"><button>1 floats (augmented) · 2 coils (diminished)</button><button>1 coils (diminished) · 2 floats (augmented)</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ [60,64,68].forEach(m=>MFAudio.tone(m,1.4,0,.32)); hA=true; if(hB) setTimeout(()=>ch.style.display="",1600); };
        container.querySelector(".hk-b").onclick=()=>{ [60,63,66].forEach(m=>MFAudio.tone(m,1.4,0,.32)); hB=true; if(hA) setTimeout(()=>ch.style.display="",1600); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Stranger 1 was C-E-G♯ — AUGMENTED, a major triad stretched a half step wider. Stranger 2 was C-E♭-G♭ — DIMINISHED, a minor triad squeezed narrower. Today: the last two triad qualities!");
          else fb(false,"Play them again: the WIDE one drifts upward; the NARROW one grinds inward.");
        });
      } }
  },
  objectives:[
    "Build an augmented triad: a major triad with its 5th RAISED a half step",
    "Build a diminished triad: a minor triad with its 5th LOWERED a half step",
    "Stack them: augmented = M3+M3, diminished = m3+m3",
    "Read the symbols: C, Cm, C+, C°",
    "Complete the major-triad scale: 1-4-5 major, 2-3-6 minor, 7 diminished",
    "Tell all four qualities apart by sight and ear"
  ],
  steps:[
    { say:"The idea: major and minor triads <b>can each be altered</b>. Make a major triad <b>LARGER</b> → augmented. Make a minor triad <b>SMALLER</b> → diminished. The dial this time isn't the 3rd — it's the <b>5th</b>. \u{1F447} <b>'Augmented' literally means…</b>",
      try:{ type:"mc", choices:["Made larger","Made smaller","Made louder"], answer:0,
        success:"✓ Augment = enlarge. And diminish = shrink. The names ARE the recipes.",
        fail:"Think of 'augmented reality' — ADDED, expanded…",
        hint:"aug+ = bigger; dim− = smaller." } },
    { say:"Experiment time: stretch a major triad, then squeeze a minor one. \u{1F447} <b>Tap the note that moves:</b>",
      try:{ type:"custom",
        hint:"The 5th — the TOP note of the snowman — moves a half step.",
        mount:(container,fb)=>MF_L59_lab(container,fb) } },
    { say:"The stacking summary — all four qualities in one table: <b>Major = M3+m3 · Minor = m3+M3 · Augmented = BOTH major · Diminished = BOTH minor</b>. \u{1F447} <b>An augmented triad stacks…</b>",
      show:{ type:"staff", spec:{clef:"treble",notes:[
        {p:"C4",d:"w",label:"C"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},
        {p:"C4",d:"w",label:"Cm"},{p:"Eb4",d:"w",chord:true},{p:"G4",d:"w",chord:true},
        {p:"C4",d:"w",label:"C+"},{p:"E4",d:"w",chord:true},{p:"G#4",d:"w",chord:true},
        {p:"C4",d:"w",label:"C°"},{p:"Eb4",d:"w",chord:true},{p:"Gb4",d:"w",chord:true}],width:560} },
      try:{ type:"mc", choices:["Two Major 3rds","Two minor 3rds","A m3 on top of a M3"], answer:0,
        success:"✓ M3 (C→E) + M3 (E→G♯). All-major stacking stretches the frame to an AUGMENTED 5th. (Two m3s squeeze it to a DIMINISHED 5th — hello again, Lesson 37's tritone!)",
        fail:"Aug is the ALL-BIG stack…",
        hint:"Symmetry: aug = both big, dim = both small." } },
    { say:"The symbols, straight from the book: <b>letter alone = major (C) · m = minor (Cm) · + = augmented (C+) · ° = diminished (C°)</b>. \u{1F447} <b>How would you write E-flat diminished?</b>",
      try:{ type:"mc", choices:["E♭°","E♭+","e♭m−"], answer:0,
        success:"✓ The little circle marks the squeezed chord. Four symbols now cover every triad you'll ever meet.",
        fail:"Diminished wears the degree-circle…",
        hint:"+ floats, ° coils." } },
    { say:"Now finish Lesson 58's treasure map. Building triads on EVERY degree of the major scale: <b>1-4-5 are major, 2-3-6 are minor… and the 7th degree is DIMINISHED</b> — the one wild resident, written <b>vii°</b>. \u{1F447} <b>Why does degree 7 come out diminished?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:80,notes:[
        {p:"C4",d:"h",label:"I"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"D4",d:"h",label:"ii"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"E4",d:"h",label:"iii"},{p:"G4",d:"h",chord:true},{p:"B4",d:"h",chord:true},
        {p:"F4",d:"h",label:"IV"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"G4",d:"h",label:"V"},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},
        {p:"A4",d:"h",label:"vi"},{p:"C5",d:"h",chord:true},{p:"E5",d:"h",chord:true},
        {p:"B4",d:"h",label:"vii°"},{p:"D5",d:"h",chord:true},{p:"F5",d:"h",chord:true},
        {p:"C5",d:"w",label:"I"},{p:"E5",d:"w",chord:true},{p:"G5",d:"w",chord:true},{bar:"final"}],width:680} },
      try:{ type:"mc", choices:["B-D-F stacks two minor 3rds — no accidentals needed","Someone added a flat","It has four notes"], answer:0,
        success:"✓ B→D = m3, D→F = m3: the white keys ALONE produce a diminished triad on degree 7. That B-F frame is the tritone that powers V7!",
        fail:"Spell it: B-D-F. Measure each 3rd…",
        hint:"Count half steps: B→D and D→F." } },
    { say:"Build the complete family on one root — feel the 5th stretch and shrink under your hand. \u{1F447}",
      try:{ type:"custom",
        hint:"C: E vs E♭ for the 3rd; G, G♯ or G♭ for the 5th.",
        mount:(container,fb)=>MF_L59_build(container,fb) } },
    { say:"The final ear exam of Unit 14: all four qualities, mixed. \u{1F447}",
      try:{ type:"custom",
        hint:"Stable? major/minor. Unstable? wide = aug, narrow = dim.",
        mount:(container,fb)=>MF_L59_ear(container,fb) } }
  ],
  examples:[
    { caption:"The four faces of C: major, minor, augmented, diminished — the 3rd shades it, then the 5th destabilizes it. Four chords, one root, four completely different futures.",
      staff:{clef:"treble",tempo:60,notes:[
        {p:"C4",d:"w",label:"C"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},
        {p:"C4",d:"w",label:"Cm"},{p:"Eb4",d:"w",chord:true},{p:"G4",d:"w",chord:true},
        {p:"C4",d:"w",label:"C+"},{p:"E4",d:"w",chord:true},{p:"G#4",d:"w",chord:true},
        {p:"C4",d:"w",label:"C°"},{p:"Eb4",d:"w",chord:true},{p:"Gb4",d:"w",chord:true}],width:560},
      kb:{start:60,octaves:2,labels:true} },
    { caption:"The complete major-triad scale of C: I ii iii IV V vi vii° I. Listen for the vii° — the built-in troublemaker that makes the final I feel so earned.",
      staff:{clef:"treble",tempo:90,notes:[
        {p:"C4",d:"h",label:"I"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"D4",d:"h",label:"ii"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"E4",d:"h",label:"iii"},{p:"G4",d:"h",chord:true},{p:"B4",d:"h",chord:true},
        {p:"F4",d:"h",label:"IV"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"G4",d:"h",label:"V"},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},
        {p:"A4",d:"h",label:"vi"},{p:"C5",d:"h",chord:true},{p:"E5",d:"h",chord:true},
        {p:"B4",d:"h",label:"vii°"},{p:"D5",d:"h",chord:true},{p:"F5",d:"h",chord:true},
        {p:"C5",d:"w",label:"I"},{p:"E5",d:"w",chord:true},{p:"G5",d:"w",chord:true},{bar:"final"}],width:680},
      kb:{start:60,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Four-Quality Sprint (45s)",
      intro:"Major, minor, augmented, diminished — judge every chord that flashes by!",
      miaIntro:"3rd first, then the 5th! \u{26A1}",
      spec:{gen:"triad-quality", params:{}, seconds:45},
      result:(score)=>score>=8?score+" chords sorted — quality-control master!":null },
    { type:"key-climb", title:"Game 2 · Quality Morph Tour",
      intro:"Play C major, C augmented, C minor, C diminished — feel each half-step shift!",
      miaIntro:"One root, four moods! \u{1FA9C}",
      spec:{seq:[60,64,67, 60,64,68, 60,63,67, 60,63,66],
        names:["C","E","G — major \u{2600}\u{FE0F}","C","E","G♯ — augmented \u{1F388}","C","E♭","G — minor \u{1F311}","C","E♭","G♭ — diminished \u{1F32A}\u{FE0F}"],
        start:60, octaves:2, title:"C → C+ → Cm → C°, chord by chord"},
      result:(score)=>score!==null?"The whole quality wheel under your fingers!":null },
    { type:"symbol-hunt", title:"Game 3 · Symbol Match",
      intro:"C, Cm, C+ and C° on cards — click what each round calls!",
      miaIntro:"Letter, m, plus, circle! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"C (major)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:150}},
        {label:"Cm (minor)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"Eb4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:150}},
        {label:"C+ (augmented)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G#4",d:"w",chord:true}],width:150}},
        {label:"C° (diminished)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"Eb4",d:"w",chord:true},{p:"Gb4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Symbols locked in!":null },
    { type:"term-race", title:"Game 4 · UNIT 14 GRAND FINALE Race",
      intro:"The victory lap — relatives, three minors, four qualities!",
      miaIntro:"Everything from Unit 14 — GO! \u{1F3C6}",
      spec:{rounds:10, reverse:true, pool:[
        ["Augmented triad","a major triad with a raised 5th"],
        ["Diminished triad","a minor triad with a lowered 5th"],
        ["C+","C-E-G♯"],
        ["C°","C-E♭-G♭"],
        ["vii° in a major key","the diminished triad on degree 7"],
        ["Relative minor","the major scale's 6th degree"],
        ["Harmonic minor","raised 7th, both directions"],
        ["Melodic minor","♯6 ♯7 up, natural down"],
        ["Minor triad","root + m3 + P5"],
        ["Aug stacking","M3 + M3"]]},
      result:(score)=>score>=8?"UNIT 14 CHAMPION — the minor world is yours!":null }
  ],
  practiceIntro:"20 practice questions — stretches, squeezes, symbols and the full triad scale. Answer right and the next appears automatically!",
  practice:[
    { gen:"triad-quality", params:{}, count:6 },
    { gen:"triad-quality", params:{ask:"symbol"}, count:4 },
    { gen:"term-match", params:{subject:"term", pool:[["Augmented","major + raised 5th"],["Diminished","minor + lowered 5th"],["+","the augmented symbol"],["°","the diminished symbol"],["vii°","degree 7's diminished triad"]], reverse:true}, count:3 },
    { type:"mc", q:"An augmented triad is a major triad with…", choices:["a raised 5th","a lowered 3rd","an added 7th"], answer:0,
      explain:"Stretch the top a half step (AEMT3 p.93)." },
    { type:"mc", q:"A diminished triad is a minor triad with…", choices:["a lowered 5th","a raised root","a lowered root"], answer:0,
      explain:"Squeeze the top a half step." },
    { type:"mc", q:"C augmented is spelled…", choices:["C-E-G♯","C-E♭-G♯","C-E-G♭"], answer:0,
      explain:"Major 3rd kept, 5th raised." },
    { type:"mc", q:"C diminished is spelled…", choices:["C-E♭-G♭","C-E-G♭","C-E♭-G♯"], answer:0,
      explain:"Minor 3rd kept, 5th lowered." },
    { type:"mc", q:"In the major-triad scale, degree 7 carries a…", choices:["diminished triad","major triad","augmented triad"], answer:0,
      explain:"B-D-F in C major: two minor 3rds, no accidentals." },
    { type:"truefalse", q:"An augmented triad stacks two Major 3rds.", answer:true,
      explain:"M3+M3 — the all-big stack." },
    { type:"truefalse", q:"A diminished triad stacks two minor 3rds.", answer:true,
      explain:"m3+m3 — the all-small stack." },
    { type:"truefalse", q:"The symbol for augmented is °.", answer:false,
      explain:"° is diminished; + is augmented." },
    { type:"truefalse", q:"Augmented and diminished triads sound stable and restful.", answer:false,
      explain:"Both are tense — that's their job." }
  ],
  miaQuizIntro:"The Unit 14 finale quiz! Third for the shade, fifth for the stretch.",
  quiz:[
    { type:"mc", q:"An AUGMENTED triad is made by…", choices:["raising the 5th of a major triad a half step","lowering the 5th of a minor triad","lowering the 3rd of a major triad","adding a 7th"], answer:0,
      explain:"Major, made LARGER.", hint:"The name means 'enlarged'." },
    { type:"mc", q:"A DIMINISHED triad is made by…", choices:["lowering the 5th of a minor triad a half step","raising the 5th of a major triad","raising the 3rd of a minor triad"], answer:0,
      explain:"Minor, made SMALLER.", hint:"The name means 'shrunk'." },
    { type:"mc", q:"Match the stacking: augmented = ?", choices:["M3 + M3","m3 + m3","M3 + m3","m3 + M3"], answer:0,
      explain:"Both thirds major → widest triad.", hint:"All-big." },
    { type:"mc", q:"Match the stacking: diminished = ?", choices:["m3 + m3","M3 + M3","M3 + m3","m3 + M3"], answer:0,
      explain:"Both thirds minor → narrowest triad.", hint:"All-small." },
    { type:"truefalse", q:"Chord letter alone (like C) means a major triad.", answer:true,
      explain:"C=major, Cm=minor, C+=aug, C°=dim.", hint:"The book's symbol table." },
    { type:"truefalse", q:"In a major key, the triad on the 7th scale degree is minor.", answer:false,
      explain:"It's DIMINISHED — vii° (B-D-F in C).", hint:"The wild resident." },
    { type:"mc", q:"Identify this triad.",
      staff:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G#4",d:"w",chord:true}],width:200},
      choices:["C+ (augmented)","C major","C° (diminished)"], answer:0,
      explain:"Major 3rd + raised 5th = augmented.", hint:"The ♯ stretched the top." },
    { type:"mc", q:"Identify this triad.",
      staff:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"Eb4",d:"w",chord:true},{p:"Gb4",d:"w",chord:true}],width:200},
      choices:["C° (diminished)","C minor","C+ (augmented)"], answer:0,
      explain:"m3 + lowered 5th = diminished.", hint:"TWO flats squeeze it." },
    { type:"mc", q:"Identify this triad — careful, no accidentals!",
      staff:{clef:"treble",notes:[{p:"B4",d:"w"},{p:"D5",d:"w",chord:true},{p:"F5",d:"w",chord:true}],width:200},
      choices:["B diminished (vii° of C major)","B minor","B major"], answer:0,
      explain:"B→D and D→F are BOTH minor 3rds — diminished on white keys alone.", hint:"Count each 3rd's half steps." },
    { type:"mc", q:"In C major, the complete triad-quality lineup I through vii is…", choices:["M m m M M m dim","M M m m M m M","m M m M m M dim"], answer:0,
      explain:"1-4-5 major, 2-3-6 minor, 7 diminished.", hint:"The book's three bullet points." },
    { type:"mc", q:"Which triad quality contains the TRITONE between its root and 5th?", choices:["Diminished","Major","Augmented"], answer:0,
      explain:"The diminished 5th (B-F) is a tritone — the famously unstable interval from Lesson 37, now living inside a chord.", hint:"The squeezed frame." },
    { type:"mc", q:"Which pair correctly describes the SOUND of the two new chords?", choices:["Augmented floats without direction; diminished coils with tension","Both sound calm and final","Augmented is dark; diminished is bright"], answer:0,
      explain:"Both unstable — one drifts, one grinds.", hint:"The two strangers of the hook." },
    /* generated */
    { gen:"triad-quality", params:{}, count:4 },
    { gen:"triad-quality", params:{ask:"symbol"}, count:2 },
    { gen:"rel-key", params:{ask:"both"}, count:2 }
  ],
  vocabulary:[
    {term:"Augmented Triad (+)", def:"A major triad with its 5th raised a half step — M3+M3. Bright, floating, unstable.",
      staff:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G#4",d:"w",chord:true}],width:130}},
    {term:"Diminished Triad (°)", def:"A minor triad with its 5th lowered a half step — m3+m3. Dark, tense, resolution-hungry.",
      staff:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"Eb4",d:"w",chord:true},{p:"Gb4",d:"w",chord:true}],width:130}},
    {term:"Chord Symbols", def:"Letter only = major · m = minor · + = augmented · ° = diminished."},
    {term:"vii°", def:"The diminished triad living on degree 7 of every major scale (B-D-F in C major).",
      staff:{clef:"treble",notes:[{p:"B4",d:"w"},{p:"D5",d:"w",chord:true},{p:"F5",d:"w",chord:true}],width:130}}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Augmented (+)</b> = major triad, 5th RAISED a half step: <b>M3+M3</b> (C-E-G♯).",
    "✔ <b>Diminished (°)</b> = minor triad, 5th LOWERED a half step: <b>m3+m3</b> (C-E♭-G♭).",
    "✔ Symbols: <b>C · Cm · C+ · C°</b> — four marks, four qualities.",
    "✔ Major-triad scale: <b>1-4-5 major, 2-3-6 minor, 7 diminished (vii°)</b>.",
    "✔ The 3rd sets major/minor; the <b>5th</b> sets stable/unstable. <b>UNIT 14 COMPLETE!</b> \u{1F389}"
  ],
  tips:[
    "Two-question quality test: (1) Is the 3rd big or small? (2) Is the 5th perfect, stretched, or squeezed? Two answers = one quality.",
    "The augmented chord is film music's favorite 'dream sequence' sound; the diminished chord is its favorite 'danger!' sound. Listen for them tonight.",
    "vii° is secretly V7's upper three notes (B-D-F ⊂ G-B-D-F) — that's why both chords crave I.",
    "Unit 15 next: the primary chords move INTO minor keys — i, iv, V… and why that V stays major."
  ],
  rewards:{ badge:"Quality Alchemist — Unit 14 Champion", icon:"\u{26A1}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"PERFECT! All four qualities, sight AND sound — Unit 14 conquered in style! \u{26A1}\u{1F3C6}\u{1F389}",
  miaPass:"Passed — and Unit 14 is COMPLETE! Major, minor, augmented, diminished: the full palette. \u{1F389}",
  mia:{
    hook:{ label:"the welcome",
      explain:"Stranger 1 was C-E-G♯ (augmented — stretched, floating); stranger 2 was C-E♭-G♭ (diminished — squeezed, coiled).",
      play:()=>{[60,64,68].forEach(m=>MFAudio.tone(m,1.2,0,.32));[60,63,66].forEach(m=>MFAudio.tone(m,1.4,1.5,.32));} },
    learn:{ label:"aug & dim triads",
      explain:"Aug = major + raised 5th (M3+M3, symbol +). Dim = minor + lowered 5th (m3+m3, symbol °). Major scale: 1-4-5 M, 2-3-6 m, 7 dim.",
      hint:"3rd = shade; 5th = stability.",
      play:()=>{[60,64,68].forEach(m=>MFAudio.tone(m,1.2,.1,.32));} },
    example:{ label:"the examples",
      explain:"Example 1 plays the four faces of C; example 2 walks the entire triad scale I→vii°→I — listen for the wobble on degree 7." },
    game:{ label:"the games",
      explain:"Sprint all four qualities, morph C through its four moods, match the symbols, then run the Unit 14 victory lap.",
      hint:"+ floats, ° coils." },
    quiz:{ label:"this question",
      explain:"Two dials answer everything: the 3rd (major/minor) and the 5th (perfect/raised/lowered). Spell, measure, name.",
      play:()=>{[60,63,66].forEach(m=>MFAudio.tone(m,1.3,0,.32));[60,64,67].forEach(m=>MFAudio.tone(m,1.2,1.5,.33));} }
  }
};
