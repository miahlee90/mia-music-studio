/* Lesson 62 — Modes Related to the Major Scale: Ionian, Mixolydian, Lydian
   (AEMT Book 3, Unit 15) — from drafts/UNIT 15 – Lesson 62.md; AEMT3 p.98.
   Core: a MODE is an 8-note scale in alphabetical order; it can begin on any
   degree of a major scale using the parent key signature; seven modes with
   Greek names (C: Ionian, D: Dorian, E: Phrygian, F: Lydian, G: Mixolydian,
   A: Aeolian, B: Locrian). Three relate to MAJOR: Ionian = major;
   Mixolydian = major with the 7th LOWERED; Lydian = major with the 4th RAISED.
   NOTE: edit by FULL-FILE REWRITE only. */

/* spot-the-bent-note: compare a mode with the plain major scale */
function MF_L62_spot(container,fb){
  const MAJOR=["C4","D4","E4","F4","G4","A4","B4","C5"];
  const ROUNDS=[
    {name:"C Mixolydian", ps:["C4","D4","E4","F4","G4","A4","Bb4","C5"], idx:6,
      expl:"Degree 7 dropped: B→B♭. Mixolydian = a major scale with the 7th LOWERED a half step."},
    {name:"C Lydian", ps:["C4","D4","E4","F#4","G4","A4","B4","C5"], idx:3,
      expl:"Degree 4 lifted: F→F♯. Lydian = a major scale with the 4th RAISED a half step."}];
  let r=0;
  container.innerHTML=`<div class="big-q l62s-q" style="text-align:center"></div>
    <div class="l62s-staff"></div>
    <div style="text-align:center"><button class="play l62s-hear">▶ Hear it</button></div>`;
  const q=container.querySelector(".l62s-q"), holder=container.querySelector(".l62s-staff"), hear=container.querySelector(".l62s-hear");
  function ask(){
    if(r>=ROUNDS.length){ q.textContent="Both alterations spotted — you can bend a major scale two ways now!"; holder.innerHTML=""; hear.style.display="none"; return; }
    const R=ROUNDS[r];
    q.innerHTML=`This is <b>${R.name}</b>. Compared with plain C major, ONE note moved. <b>Tap it.</b>`;
    Staff.render(holder,{clef:"treble",notes:R.ps.map((p,i)=>({p,d:"q",label:String(i+1)})),width:520,clickNotes:true,
      onNote:(i,p)=>{
        MFAudio.tone(MFAudio.midi(p),.5,0,.4);
        if(i===R.idx){ MFAudio.yay(); fb(true,`✓ ${R.expl}`);
          r++; setTimeout(ask,1500); }
        else fb(false,`Degree ${i+1} matches C major (${MAJOR[i].replace(/\d/,"")}). Look for the accidental!`);
      }});
  }
  hear.onclick=()=>{ const R=ROUNDS[r]; if(!R) return;
    R.ps.forEach((p,i)=>MFAudio.tone(MFAudio.midi(p),.42,i*.3,.4)); };
  ask();
}

/* keyboard builder: play C Mixolydian and C Lydian */
function MF_L62_build(container,fb){
  const ROUNDS=[
    {name:"C Mixolydian", pcs:[0,2,4,5,7,9,10,0], hintNote:"B♭ (the lowered 7th)",
      names:["C","D","E","F","G","A","B♭ — the lowered 7th!","C"]},
    {name:"C Lydian", pcs:[0,2,4,6,7,9,11,0], hintNote:"F♯ (the raised 4th)",
      names:["C","D","E","F♯ — the raised 4th!","G","A","B","C"]}];
  let r=0,k=0,last=null;
  container.innerHTML=`<div class="big-q l62b-q" style="text-align:center"></div><div class="l62b-kb"></div>`;
  const q=container.querySelector(".l62b-q"), kh=container.querySelector(".l62b-kb");
  function ask(){
    if(r>=ROUNDS.length){ q.textContent="Two modes under your fingers — the bent notes found themselves!"; return; }
    k=0; last=null;
    q.innerHTML=`Play <b>${ROUNDS[r].name}</b>, bottom to top, starting on C. Watch for <b>${ROUNDS[r].hintNote}</b>.`;
  }
  Keyboard.create(kh,{start:60,octaves:2,labels:true,
    onKey:m=>{
      const R=ROUNDS[r]; if(!R) return;
      const want=R.pcs[k];
      if(m%12===want && (last===null || m>last)){
        last=m; k++;
        if(k>=8){ MFAudio.yay();
          fb(true,`✓ ${R.name} complete — ${r===0?"that B♭ gives it a relaxed, bluesy glow.":"that F♯ makes it float like a film score."}`);
          r++; setTimeout(ask,1400); }
        else q.innerHTML=`Good — next: <b>${R.names[k]}</b>.`;
      } else { MFAudio.tone(40,.2);
        fb(false, R.pcs[k]===10? "Degree 7 is LOWERED here — the black key below B." : R.pcs[k]===6? "Degree 4 is RAISED here — the black key above F." : "Follow the C major letters — only ONE degree is bent."); }
    }});
  ask();
}

LESSON_CONTENT[62]={
  welcome:"Before major and minor ruled music, there were SEVEN scales with Greek names. Time to meet the family. \u{1F3DB}\u{FE0F}",
  hook:{
    say:"Listen to plain C major… then the SAME scale with one note gently bent. <b>That tiny bend has a 2,000-year-old Greek name. Hear it?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Scale 1 (plain)</button>
          <button class="play hk-b">▶ Scale 2 (one bend)</button></div>
          <div class="choices hk-ch" style="display:none"><button>Scale 2 lowered its 7th note</button><button>Scale 2 raised its 1st note</button><button>They're identical</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ [60,62,64,65,67,69,71,72].forEach((m,i)=>MFAudio.tone(m,.42,i*.3,.4)); hA=true; if(hB) setTimeout(()=>ch.style.display="",2900); };
        container.querySelector(".hk-b").onclick=()=>{ [60,62,64,65,67,69,70,72].forEach((m,i)=>MFAudio.tone(m,.42,i*.3,.4)); hB=true; if(hA) setTimeout(()=>ch.style.display="",2900); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ B became B♭ — and C major became C MIXOLYDIAN, the mode of countless rock and folk songs. Today: what modes are, and the three that grow from the major scale!");
          else fb(false,"Both scales started identically… the difference came right before the top.");
        });
      } }
  },
  objectives:[
    "Define a mode: 8 notes, alphabetical order, on any degree of a parent major scale",
    "Name all seven modes and their home degrees in C",
    "Ionian = the major scale itself",
    "Mixolydian = major with the 7th LOWERED a half step",
    "Lydian = major with the 4th RAISED a half step",
    "Recognize and build the three major-related modes"
  ],
  steps:[
    { say:"The definition, straight from the book: a <b>MODE</b> is a scale of <b>eight notes in alphabetical order</b>, and it <b>can begin on ANY scale degree of a major scale</b>, using the parent scale's key signature. In C: start on C, or D, or E… seven starting points, <b>seven modes, each with a Greek name</b>. \u{1F447} <b>A mode built on the white keys from D to D uses…</b>",
      try:{ type:"mc", choices:["No sharps or flats — C major's signature","Two sharps","One flat"], answer:0,
        success:"✓ The parent (C major) lends its signature to every child mode. Same notes, seven different homes.",
        fail:"The parent scale is C major — what's ITS signature?",
        hint:"Modes borrow the PARENT's signature." } },
    { say:"The family register, in the key of C: <b>C Ionian · D Dorian · E Phrygian · F Lydian · G Mixolydian · A Aeolian · B Locrian</b>. Two you secretly know already! \u{1F447} <b>Which mode is the natural minor scale in disguise?</b>",
      show:{ type:"html", html:`<div style="max-width:430px;margin:0 auto;font-size:14.5px;line-height:1.9;background:var(--card,#fff);border:1.5px solid #cdd5e1;border-radius:12px;padding:12px 18px">
        <b>C</b> → Ionian <span style="color:var(--muted,#667)">(= the major scale)</span><br>
        <b>D</b> → Dorian<br>
        <b>E</b> → Phrygian<br>
        <b>F</b> → Lydian<br>
        <b>G</b> → Mixolydian<br>
        <b>A</b> → Aeolian <span style="color:var(--muted,#667)">(= the natural minor scale)</span><br>
        <b>B</b> → Locrian</div>` },
      try:{ type:"mc", choices:["Aeolian (starting on A)","Locrian (starting on B)","Dorian (starting on D)"], answer:0,
        success:"✓ A to A on white keys = A natural minor = the AEOLIAN mode. And C to C is IONIAN — the major scale. You've been playing modes since Lesson 26!",
        fail:"Which white-key scale did Lesson 56 call the relative minor?",
        hint:"A to A…" } },
    { say:"Today's three are the <b>major-related</b> modes. First, the easy one: <b>IONIAN — a major scale</b>, full stop. Half steps between 3-4 and 7-8, like always. \u{1F447} <b>C Ionian differs from C major by…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:110,notes:[
        {p:"C4",d:"q",label:"1"},{p:"D4",d:"q",label:"2"},{p:"E4",d:"q",label:"3"},{p:"F4",d:"q",label:"4"},
        {p:"G4",d:"q",label:"5"},{p:"A4",d:"q",label:"6"},{p:"B4",d:"q",label:"7"},{p:"C5",d:"q",label:"8"}],width:520} },
      try:{ type:"mc", choices:["Nothing — they're the same scale","One sharp","The order of notes"], answer:0,
        success:"✓ Ionian is simply the major scale's ancient name. One mode down, free of charge!",
        fail:"Read the definition again — 'a major scale'…",
        hint:"It's a rename, not a remodel." } },
    { say:"Mode two: <b>MIXOLYDIAN — a major scale with the 7th LOWERED a half step</b>. The leading tone relaxes, and the scale stops 'needing' to resolve. Now — <b>find the bent notes yourself, by eye:</b> \u{1F447}",
      try:{ type:"custom",
        hint:"Compare each degree with plain C major: C D E F G A B C.",
        mount:(container,fb)=>MF_L62_spot(container,fb) } },
    { say:"Mode three recap: <b>LYDIAN — a major scale with the 4th RAISED a half step</b>. That ♯4 gives it a floating, wide-eyed shimmer. The half steps move: Mixolydian has them at 3-4 and 6-♭7; Lydian at ♯4-5 and 7-8. \u{1F447} <b>Which mode would a film composer pick for a 'flying' scene?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:110,notes:[
        {p:"C4",d:"q",label:"1"},{p:"D4",d:"q",label:"2"},{p:"E4",d:"q",label:"3"},{p:"F#4",d:"q",label:"♯4"},
        {p:"G4",d:"q",label:"5"},{p:"A4",d:"q",label:"6"},{p:"B4",d:"q",label:"7"},{p:"C5",d:"q",label:"8"}],width:520} },
      try:{ type:"mc", choices:["Lydian — the raised 4th floats","Ionian — plain is best","Neither, films avoid modes"], answer:0,
        success:"✓ Lydian's ♯4 is Hollywood's favorite lift-off sound. (Mixolydian's ♭7, meanwhile, powers rock anthems and bagpipes alike.)",
        fail:"Which alteration points UPWARD?",
        hint:"Raised = rising = floating." } },
    { say:"Play them — the bent notes are under your fingers. \u{1F447}",
      try:{ type:"custom",
        hint:"Mixolydian bends ONE note down (7th); Lydian bends ONE note up (4th).",
        mount:(container,fb)=>MF_L62_build(container,fb) } },
    { say:"Recipe check before the games. \u{1F447} <b>G Mixolydian would be a G major scale with…</b>",
      try:{ type:"mc", choices:["F♯ lowered to F♮","B lowered to B♭","C raised to C♯"], answer:0,
        success:"✓ Lower the 7th: G major's F♯ relaxes to F. The recipes transfer to ANY keynote — that's the book's 'slight alterations' method.",
        fail:"What is the 7th degree of G major, and what does Mixolydian do to 7ths?",
        hint:"G A B C D E F♯ G — bend the 7th down." } }
  ],
  examples:[
    { caption:"The three major-related modes on C, back to back: Ionian (plain), Mixolydian (♭7 — hear it relax), Lydian (♯4 — hear it float).",
      staff:{clef:"treble",tempo:120,notes:[
        {p:"C4",d:"q",label:"Ionian"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"},{p:"C5",d:"q"},{bar:"double"},
        {p:"C4",d:"q",label:"Mixolydian"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"Bb4",d:"q"},{p:"C5",d:"q"},{bar:"double"},
        {p:"C4",d:"q",label:"Lydian"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"},{p:"C5",d:"q"},{bar:"final"}],width:680},
      kb:{start:60,octaves:2,labels:true} },
    { caption:"The white-key family: the same seven notes starting on C (Ionian), then on G (Mixolydian), then on F (Lydian) — the book's original way of finding every mode.",
      staff:{clef:"treble",tempo:120,notes:[
        {p:"C4",d:"q",label:"C→C: Ionian"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"},{p:"C5",d:"q"},{bar:"double"},
        {p:"G4",d:"q",label:"G→G: Mixolydian"},{p:"A4",d:"q"},{p:"B4",d:"q"},{p:"C5",d:"q"},{p:"D5",d:"q"},{p:"E5",d:"q"},{p:"F5",d:"q"},{p:"G5",d:"q"},{bar:"double"},
        {p:"F4",d:"q",label:"F→F: Lydian"},{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"},{p:"C5",d:"q"},{p:"D5",d:"q"},{p:"E5",d:"q"},{p:"F5",d:"q"},{bar:"final"}],width:680},
      kb:{start:60,octaves:3,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Major-Mode Sprint (45s)",
      intro:"Scales flash by — name the mode, or match the recipe!",
      miaIntro:"♭7 or ♯4 — that's the whole question! \u{26A1}",
      spec:{gen:"mode-id", params:{set:"major", ask:"both"}, seconds:45},
      result:(score)=>score>=8?score+" modes named — Greek fluency rising!":null },
    { type:"key-climb", title:"Game 2 · Mixolydian & Lydian Climb",
      intro:"Play C Mixolydian up, then C Lydian — two bends, sixteen keys!",
      miaIntro:"B♭ down, F♯ up! \u{1FA9C}",
      spec:{seq:[60,62,64,65,67,69,70,72, 60,62,64,66,67,69,71,72],
        names:["C","D","E","F","G","A","B♭ (the Mixo bend!)","C","C again","D","E","F♯ (the Lydian bend!)","G","A","B","C"],
        start:60, octaves:2, title:"C Mixolydian, then C Lydian"},
      result:(score)=>score!==null?"Both bends played to perfection!":null },
    { type:"symbol-hunt", title:"Game 3 · Mode Spotter",
      intro:"Three modes on C — click the one each round names!",
      miaIntro:"Check degree 4, check degree 7! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Ionian (plain major)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"},{p:"C5",d:"q"}],width:250}},
        {label:"Mixolydian (♭7)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"Bb4",d:"q"},{p:"C5",d:"q"}],width:250}},
        {label:"Lydian (♯4)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"},{p:"C5",d:"q"}],width:250}}]},
      result:(score)=>score>=5?"No bent note escapes you!":null },
    { type:"order-tap", title:"Game 4 · The Seven-Mode Ladder",
      intro:"Tap the seven Greek names in white-key order, C through B!",
      miaIntro:"I Don't Particularly Like Modes A Lot — or make your own mnemonic! \u{1F3DB}\u{FE0F}",
      spec:{sequence:["Ionian (C)","Dorian (D)","Phrygian (E)","Lydian (F)","Mixolydian (G)","Aeolian (A)","Locrian (B)"],
        title:"The modes in scale-degree order"},
      result:(stars)=>stars>=2?"The whole Greek family, in order!":null }
  ],
  practiceIntro:"20 practice questions — names, recipes and bent notes. Answer right and the next appears automatically!",
  practice:[
    { gen:"mode-id", params:{set:"major", ask:"both"}, count:7 },
    { gen:"term-match", params:{subject:"term", pool:[["Mode","8 notes, alphabetical, any degree of the parent scale"],["Ionian","the major scale"],["Mixolydian","major with lowered 7th"],["Lydian","major with raised 4th"],["Aeolian","the natural minor scale"]], reverse:true}, count:5 },
    { type:"mc", q:"A mode can begin on…", choices:["any scale degree of a major scale","only the tonic","only C"], answer:0,
      explain:"Seven degrees → seven modes (AEMT3 p.98)." },
    { type:"mc", q:"How many modes are there altogether?", choices:["7","3","12"], answer:0,
      explain:"One per scale degree, each with a Greek name." },
    { type:"mc", q:"The mode built on the 5th degree (G in C major) is…", choices:["Mixolydian","Lydian","Dorian"], answer:0,
      explain:"G→G on white keys = Mixolydian." },
    { type:"mc", q:"The mode built on the 4th degree (F in C major) is…", choices:["Lydian","Phrygian","Ionian"], answer:0,
      explain:"F→F on white keys = Lydian." },
    { type:"mc", q:"C Mixolydian contains which accidental?", choices:["B♭","F♯","E♭"], answer:0,
      explain:"Major with its 7th lowered." },
    { type:"mc", q:"C Lydian contains which accidental?", choices:["F♯","B♭","G♯"], answer:0,
      explain:"Major with its 4th raised." },
    { type:"truefalse", q:"Ionian is another name for the major scale.", answer:true,
      explain:"Identical, note for note." },
    { type:"truefalse", q:"A mode uses the key signature of its parent major scale.", answer:true,
      explain:"White keys for all of C major's children." },
    { type:"truefalse", q:"Mixolydian raises the 7th of the major scale.", answer:false,
      explain:"It LOWERS the 7th — the opposite." },
    { type:"truefalse", q:"G Mixolydian uses F natural instead of F♯.", answer:true,
      explain:"Lower G major's 7th: F♯→F." }
  ],
  miaQuizIntro:"Quiz! Three modes, two bends: ♭7 relaxes, ♯4 floats.",
  quiz:[
    { type:"mc", q:"A mode is…", choices:["a scale of eight notes in alphabetical order","a type of chord","a rhythm pattern","a tempo marking"], answer:0,
      explain:"The book's opening definition.", hint:"Eight notes, A-B-C order." },
    { type:"mc", q:"A mode can begin on…", choices:["any scale degree of a major scale","only the 1st degree","only the 5th degree"], answer:0,
      explain:"Seven starting points, seven modes.", hint:"That's why there are seven." },
    { type:"mc", q:"In the key of C, the mode beginning on G is…", choices:["Mixolydian","Lydian","Aeolian","Dorian"], answer:0,
      explain:"C-D-E-F-G: the 5th degree hosts Mixolydian.", hint:"The rock-and-roll mode." },
    { type:"mc", q:"IONIAN mode is…", choices:["a major scale","a natural minor scale","major with a lowered 7th"], answer:0,
      explain:"The major scale's Greek name.", hint:"The free one." },
    { type:"mc", q:"MIXOLYDIAN mode is a major scale with…", choices:["the 7th lowered a half step","the 4th raised a half step","the 3rd lowered"], answer:0,
      explain:"♭7 — the relaxed leading tone.", hint:"The hook's bend." },
    { type:"mc", q:"LYDIAN mode is a major scale with…", choices:["the 4th raised a half step","the 7th lowered a half step","the 2nd lowered"], answer:0,
      explain:"♯4 — the floating bend.", hint:"The flying-scene mode." },
    { type:"truefalse", q:"There are seven modes altogether, each with a Greek name.", answer:true,
      explain:"One per degree of the parent scale.", hint:"Count the white keys C to B." },
    { type:"truefalse", q:"The Aeolian mode (starting on A) is the natural minor scale.", answer:true,
      explain:"Lesson 56's relative minor — with a toga on.", hint:"A to A, white keys." },
    { type:"mc", q:"Name this mode (built on C).",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"Bb4",d:"q"},{p:"C5",d:"q"}],width:400},
      choices:["C Mixolydian","C Ionian","C Lydian"], answer:0,
      explain:"The B♭ = lowered 7th = Mixolydian.", hint:"Find the accidental, name the degree." },
    { type:"mc", q:"Name this mode (built on C).",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"},{p:"C5",d:"q"}],width:400},
      choices:["C Lydian","C Mixolydian","C Ionian"], answer:0,
      explain:"The F♯ = raised 4th = Lydian.", hint:"Which degree wears the sharp?" },
    { type:"mc", q:"F Lydian (built on F with C major's white keys) sounds Lydian because…", choices:["its 4th (B) is naturally a raised 4th above F","F is a sharp key","it borrows notes from F major"], answer:0,
      explain:"F to B = an augmented 4th — no accidental needed on white keys.", hint:"Measure F up to B." },
    { type:"mc", q:"To build G Lydian, you would…", choices:["raise G major's 4th: C→C♯","lower G major's 7th: F♯→F","add a B♭"], answer:0,
      explain:"Same recipe, any keynote: ♯4.", hint:"G major first, then bend degree 4 up." },
    /* generated */
    { gen:"mode-id", params:{set:"major", ask:"both"}, count:5 },
    { gen:"term-match", params:{subject:"term", pool:[["Ionian","= major"],["Mixolydian","♭7"],["Lydian","♯4"],["Parent scale","lends its key signature to the mode"]], reverse:true}, count:2 }
  ],
  vocabulary:[
    {term:"Mode", def:"A scale of eight notes in alphabetical order, beginning on any degree of a parent major scale (using its signature). Seven exist, all with Greek names."},
    {term:"Ionian", def:"The mode on degree 1 — identical to the major scale.",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"C5",d:"q"}],width:130}},
    {term:"Mixolydian", def:"The mode on degree 5 — a major scale with its 7th LOWERED a half step.",
      staff:{clef:"treble",notes:[{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"Bb4",d:"q"},{p:"C5",d:"q"}],width:130}},
    {term:"Lydian", def:"The mode on degree 4 — a major scale with its 4th RAISED a half step.",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"F#4",d:"q"},{p:"G4",d:"q"},{p:"C5",d:"q"}],width:130}}
  ],
  mistakes:[],
  summary:[
    "✔ A <b>mode</b> = 8 notes in alphabetical order, starting on <b>any degree</b> of a parent major scale (same signature).",
    "✔ Seven modes, Greek names: <b>Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian</b> (C through B).",
    "✔ <b>Ionian = the major scale</b>; <b>Aeolian = the natural minor</b> — two old friends.",
    "✔ <b>Mixolydian = major with ♭7</b> (relaxed, rock-friendly).",
    "✔ <b>Lydian = major with ♯4</b> (floating, cinematic)."
  ],
  tips:[
    "Fast recall: Lydian's L points UP (♯4); Mixolydian relaxes DOWN (♭7).",
    "Hum the plain scale, then bend one note — modes are easier to HEAR than to memorize.",
    "White-key trick: any mode's flavor = play its home-to-home octave on white keys (G to G = instant Mixolydian).",
    "Lesson 63 finishes the family: the four modes that grow from the natural minor scale."
  ],
  rewards:{ badge:"Mode Traveler", icon:"\u{1F3DB}\u{FE0F}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"PERFECT! Ionian, Mixolydian, Lydian — the major family salutes you! \u{1F3DB}\u{FE0F}\u{1F389}",
  miaPass:"Passed! Two bends learned: ♭7 and ♯4. Four minor-family modes to go…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Scale 2 lowered its 7th (B→B♭): C Mixolydian — a major scale with one relaxed note.",
      play:()=>{[60,62,64,65,67,69,70,72].forEach((m,i)=>MFAudio.tone(m,.4,i*.28,.4));} },
    learn:{ label:"the modes",
      explain:"Mode = 8 alphabetical notes on any degree of the parent major scale. Ionian = major; Mixolydian = ♭7; Lydian = ♯4.",
      hint:"Find the accidental, name the degree, know the mode.",
      play:()=>{[60,62,64,66,67,69,71,72].forEach((m,i)=>MFAudio.tone(m,.4,i*.28,.4));} },
    example:{ label:"the examples",
      explain:"Example 1 bends C three ways (plain, ♭7, ♯4); example 2 shows the white-key origins — C→C, G→G, F→F." },
    game:{ label:"the games",
      explain:"Sprint the modes, climb both bends, spot them on cards, then tap the seven Greek names in order.",
      hint:"Degree 4 and degree 7 are the only suspects today." },
    quiz:{ label:"this question",
      explain:"Three modes, one method: compare with the plain major scale and locate the single bent degree.",
      play:()=>{[60,62,64,66,67,69,71,72].forEach((m,i)=>MFAudio.tone(m,.4,i*.28,.4));} }
  }
};
