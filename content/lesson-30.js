/* Lesson 30 — Key Signatures: The Flat Keys (AEMT Book 2, Unit 7)
   Built from drafts/UNIT 7 – Lesson 30.md; AEMT p.47 verified by render.
   Uses staff.js v7 keysig rendering (spec.keysig, .ksgroup).
   QA note honored: flat order = REVERSE of sharp order; repeated practice of the
   next-to-last-flat rule AND the F-major (one flat) exception.
   NOTE: edit by FULL-FILE REWRITE only. */

/* tap the flats in key-signature order — staff grows as you go */
function MF_L30_buildSig(container,fb){
  const ORDER=["B♭","E♭","A♭","D♭"];
  let i=0;
  container.innerHTML=`<div class="big-q l30-q" style="text-align:center">Build the key signature of <b>A♭ major</b> (4 flats). Tap the flats in the correct order!</div>
    <div class="l30-staff"></div><div class="choices chips l30-ch"></div>`;
  const holder=container.querySelector(".l30-staff"), ch=container.querySelector(".l30-ch"), q=container.querySelector(".l30-q");
  function draw(){ Staff.render(holder, i===0? {clef:"treble",notes:[],width:300} : {clef:"treble",keysig:{flats:i},notes:[],width:300}); }
  ["E♭","B♭","D♭","A♭","G♭"].forEach(lbl=>{ const b=document.createElement("button"); b.textContent=lbl;
    b.onclick=()=>{
      if(i>=ORDER.length) return;
      if(lbl===ORDER[i]){ i++; MFAudio.tone(58+i*4,.3); draw();
        if(i>=ORDER.length){ q.innerHTML="✓ B♭ E♭ A♭ D♭ — the key signature of <b>A♭ major</b>!";
          fb(true,"✓ Four flats in perfect order. The next-to-last flat is A♭ — and A♭ is the name of the key!"); }
        else q.innerHTML=`✓ ${ORDER.slice(0,i).join(" ")} — which flat comes next?`; }
      else { MFAudio.tone(40,.25); fb(false,`Flats always follow B–E–A–D–G–C–F. The ${["1st","2nd","3rd","4th"][i]} flat is ${ORDER[i]}.`); }
    };
    ch.appendChild(b); });
  draw();
}

/* name-the-key drill: 4 rounds across treble & bass, incl. the F exception */
function MF_L30_nameKey(container,fb){
  const ROUNDS=[{key:"F",clef:"treble",why:"one flat alone = F major (the exception!)"},
                {key:"Bb",clef:"bass",why:"next-to-last flat is B♭"},
                {key:"Eb",clef:"treble",why:"next-to-last flat is E♭"},
                {key:"Ab",clef:"bass",why:"next-to-last flat is A♭"}];
  const NAME={F:"F Major",Bb:"B♭ Major",Eb:"E♭ Major",Ab:"A♭ Major"};
  let i=0;
  container.innerHTML=`<div class="big-q l30-nq" style="text-align:center"></div><div class="l30-nstaff"></div><div class="choices chips l30-nch"></div>`;
  const q=container.querySelector(".l30-nq"), holder=container.querySelector(".l30-nstaff"), ch=container.querySelector(".l30-nch");
  ["F Major","B♭ Major","E♭ Major","A♭ Major"].forEach(lbl=>{ const b=document.createElement("button"); b.textContent=lbl;
    b.onclick=()=>{
      const cur=ROUNDS[i];
      if(lbl===NAME[cur.key]){ i++; MFAudio.tone(72,.3);
        if(i>=ROUNDS.length){ ch.style.display="none"; holder.innerHTML=""; q.textContent="All four flat keys identified!";
          fb(true,"✓ F, B♭, E♭, A♭ — the next-to-last flat names the key, and one flat alone is always F major."); }
        else { fb(true,`✓ Right — ${cur.why}. Next…`); ask(); } }
      else { MFAudio.tone(40,.25); fb(false, cur.key==="F"? "Only ONE flat here — that's the exception: F major." : "Find the NEXT-TO-LAST flat — it names the key."); }
    };
    ch.appendChild(b); });
  function ask(){ const cur=ROUNDS[i];
    q.innerHTML=`Key ${i+1} of ${ROUNDS.length}: name this major key (${cur.clef} clef).`;
    Staff.render(holder,{clef:cur.clef,keysig:cur.key,notes:[],width:240}); }
  ask();
}

LESSON_CONTENT[30]={
  welcome:"Sharp keys have their rule — flat keys have a sneakier one. Plus ONE famous exception. \u{1F511}",
  hook:{
    say:"A musician glances at the staff below and says the key name in under a second. Look at the flats… can you guess their secret?",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div class="hk-staff"></div>
          <div class="choices hk-ch"><button>One of the flats IS the key name</button><button>You count the lines</button><button>You memorize all 7 signatures</button></div>`;
        Staff.render(container.querySelector(".hk-staff"),{clef:"treble",keysig:"Eb",notes:[],width:280});
        [...container.querySelector(".hk-ch").children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Exactly! The NEXT-TO-LAST flat names the key: B♭–E♭–A♭ → the key of E♭ major. Today you master that shortcut — and its one exception.");
          else fb(false,"There's a faster secret hiding in plain sight — one of those flats is doing double duty…");
        });
      } }
  },
  objectives:[
    "Define a flat key signature",
    "Memorize the order of flats",
    "Identify major keys from flat key signatures",
    "Apply the next-to-last-flat rule",
    "Recognize the special case of F major",
    "Read flat key signatures on both treble and bass staves"
  ],
  steps:[
    { say:"Just like sharps, all the flats used in a scale or piece can be placed in the <b>KEY SIGNATURE</b> right after the clef. Flats are always added in the same order: <b>B – E – A – D – G – C – F</b> — the <b>reverse of the order of sharps</b>. Mnemonic: <b><i>BEAD Goes Clean Fast</i></b>. \u{1F447} <b>What is the correct order of flats?</b>",
      show:{ type:"staff", spec:{clef:"grand",keysig:"Bb",notes:[],width:340} },
      try:{ type:"mc",
        choices:["B E A D G C F","F C G D A E B","B A G F E D C","C F B E A D G"], answer:0,
        success:"✓ BEAD Goes Clean Fast — B E A D G C F.",
        fail:"It spells a word at the start: B-E-A-D…",
        hint:"The reverse of F C G D A E B." } },
    { say:"Naming flat keys uses a different shortcut: <b>the next-to-last flat IS the name of the key</b>. Below, the flats are B♭–E♭–A♭, and the next-to-last (highlighted) is <b>E♭</b>. \u{1F447} <b>So this key signature means which major key?</b>",
      show:{ type:"custom", mount:(el)=>{
        const api=Staff.render(el,{clef:"treble",keysig:"Eb",notes:[],width:260});
        const g=api.svg.querySelectorAll(".ksgroup"); if(g.length>1) g[g.length-2].classList.add("hl");
      } },
      try:{ type:"mc", choices:["E♭ major","A♭ major","B♭ major","F major"], answer:0,
        success:"✓ Three flats, next-to-last is E♭ — E♭ major. The signature names itself!",
        fail:"Count in from the END: the SECOND-to-last flat names the key.",
        hint:"B♭ … E♭ … A♭ — which one is next-to-last?" } },
    { say:"One important exception: with only <b>ONE flat (B♭)</b> there is no 'next-to-last' — and that key is always <b>F MAJOR</b>. It's the only flat major key that ignores the rule. \u{1F447} <b>True or false: the key signature with one flat is B♭ major.</b>",
      show:{ type:"staff", spec:{clef:"grand",keysig:"F",notes:[],width:340} },
      try:{ type:"mc", choices:["False — it's F major","True — it's B♭ major"], answer:0,
        success:"✓ One flat alone = F major. Memorize the exception!",
        fail:"Remember Lesson 28: which scale needed exactly one flat?",
        hint:"The scale F–G–A–B♭–C–D–E–F." } },
    { say:"The keys you already know from their scales: <b>Key of F — 1 flat (B♭)</b> and <b>Key of B♭ — 2 flats (B♭, E♭)</b>. The order of flats for up to two flats is <b>B E</b>. \u{1F447} <b>The key of B♭ major has which flats?</b>",
      show:{ type:"staff", spec:{clef:"grand",keysig:"Bb",notes:[],width:340} },
      try:{ type:"mc", choices:["B♭ and E♭","B♭ and A♭","E♭ and A♭","B♭ only"], answer:0,
        success:"✓ B♭ then E♭ — exactly the flats the B♭ major scale needs.",
        fail:"Count the flats on the staff above and name them in order.",
        hint:"BEAD starts with B, E…" } },
    { say:"Drill time — treble AND bass, exception included. \u{1F447} <b>Name each key from its signature:</b>",
      try:{ type:"custom",
        hint:"Next-to-last flat names the key; one flat alone = F major.",
        mount:(container,fb)=>MF_L30_nameKey(container,fb) } },
    { say:"Now write one yourself. \u{1F447} <b>Build the A♭ major key signature — four flats, correct order:</b>",
      try:{ type:"custom",
        hint:"BEAD: B♭, E♭, A♭, D♭.",
        mount:(container,fb)=>MF_L30_buildSig(container,fb) } }
  ],
  examples:[
    { caption:"Key of F — 1 flat (B♭). No flat is written before the B in the music, yet it still PLAYS as B♭: the key signature does the work.",
      staff:{clef:"treble",tempo:100,keysig:"F",notes:[{p:"F4",d:"q",label:"F"},{p:"G4",d:"q",label:"G"},{p:"A4",d:"q",label:"A"},{p:"B4",sound:"Bb4",d:"q",label:"B♭!"},{p:"C5",d:"q",label:"C"},{p:"D5",d:"q",label:"D"},{p:"E5",d:"q",label:"E"},{p:"F5",d:"q",label:"F"}],width:540},
      kb:{start:60,octaves:2,labels:true,marks:[65,67,69,70,72,74,76,77]} },
    { caption:"Key of B♭ — 2 flats (B♭, E♭). Every B and every E in the piece is played flat, in any octave, without another sign.",
      staff:{clef:"treble",tempo:100,keysig:"Bb",notes:[{p:"B3",sound:"Bb3",d:"q",label:"B♭!"},{p:"C4",d:"q",label:"C"},{p:"D4",d:"q",label:"D"},{p:"E4",sound:"Eb4",d:"q",label:"E♭!"},{p:"F4",d:"q",label:"F"},{p:"G4",d:"q",label:"G"},{p:"A4",d:"q",label:"A"},{p:"B4",sound:"Bb4",d:"q",label:"B♭!"}],width:540},
      kb:{start:57,octaves:2,labels:true,marks:[58,60,62,63,65,67,69,70]} }
  ],
  games:[
    { type:"order-tap", title:"Game 1 · Order of Flats Race",
      intro:"All seven flats, perfect order — BEAD Goes Clean Fast!",
      miaIntro:"The full flat parade! \u{1F3C1}",
      spec:{sequence:["B♭","E♭","A♭","D♭","G♭","C♭","F♭"], title:"Tap the 7 flats in key-signature order!"},
      result:(stars)=>stars>=3?"B E A D G C F — flawless!":null },
    { type:"term-race", title:"Game 2 · Flats-per-Key Race",
      intro:"How many flats in each key? Match at speed!",
      miaIntro:"Key facts, fast! \u{26A1}",
      spec:{rounds:8, reverse:true, pool:[
        ["F Major","1 flat — B♭ (the exception!)"],
        ["B♭ Major","2 flats — B♭ E♭"],
        ["E♭ Major","3 flats — B♭ E♭ A♭"],
        ["A♭ Major","4 flats — B♭ E♭ A♭ D♭"],
        ["C Major","No flats at all"]]},
      result:(score)=>score>=7?"Flat-key librarian!":null },
    { type:"symbol-hunt", title:"Game 3 · Signature Hunt",
      intro:"Four flat key signatures — click the key that's named!",
      miaIntro:"Read the signatures at a glance! \u{1F50D}",
      spec:{rounds:6, pool:[
        {label:"Key of F (1 flat)", spec:{clef:"treble",keysig:"F",notes:[],width:150}},
        {label:"Key of B♭ (2 flats)", spec:{clef:"treble",keysig:"Bb",notes:[],width:150}},
        {label:"Key of E♭ (3 flats)", spec:{clef:"treble",keysig:"Eb",notes:[],width:150}},
        {label:"Key of A♭ (4 flats)", spec:{clef:"treble",keysig:"Ab",notes:[],width:150}}]},
      result:(score)=>score>=5?"Signatures read in a blink!":null },
    { type:"term-race", title:"Game 4 · Next-to-Last Flat Race",
      intro:"The next-to-last flat names the key — and one flat alone means F. Ready?",
      miaIntro:"Apply the rule at speed! \u{1F511}",
      spec:{rounds:8, pool:[
        ["One flat only (B♭)","F Major — the exception"],
        ["Flats B♭ E♭","B♭ Major"],
        ["Flats B♭ E♭ A♭","E♭ Major"],
        ["Flats B♭ E♭ A♭ D♭","A♭ Major"]]},
      result:(score)=>score>=7?"The rule (and the exception) are pure reflex!":null },
    { type:"sig-match", title:"Game 5 · Key-Signature Match-Up — ALL Keys!",
      intro:"The grand finale: sharps, flats AND the empty signature together. Drag each key name onto its signature — three rounds!",
      miaIntro:"Every signature you know, in one game — sharps, flats, and one with nothing at all! \u{1F3C6}",
      spec:{rounds:3, perRound:4, clefs:["treble","bass"], pool:[
        {key:"C", label:"C Major"},
        {key:"G", label:"G Major"},
        {key:"D", label:"D Major"},
        {key:"A", label:"A Major"},
        {key:"E", label:"E Major"},
        {key:"F", label:"F Major"},
        {key:"Bb", label:"B♭ Major"},
        {key:"Eb", label:"E♭ Major"},
        {key:"Ab", label:"A♭ Major"}]},
      result:(stars)=>stars>=3?"A perfect match-up across BOTH key families!":null }
  ],
  practiceIntro:"20 practice questions — the order of flats, the next-to-last-flat rule, and the F major exception. Answer right and the next appears automatically!",
  practice:[
    { gen:"keysig-id", params:{kind:"flat", max:4}, count:6 },
    { gen:"term-match", params:{subject:"key", pool:[["F Major","1 flat — B♭"],["B♭ Major","2 flats — B♭ E♭"],["E♭ Major","3 flats — B♭ E♭ A♭"],["A♭ Major","4 flats — B♭ E♭ A♭ D♭"]], reverse:true}, count:4 },
    { type:"mc", q:"What is the correct order of flats?", choices:["B E A D G C F","F C G D A E B","B A G F E D C"], answer:0,
      explain:"BEAD Goes Clean Fast." },
    { type:"mc", q:"The order of flats is the ____ of the order of sharps.", choices:["reverse","same","first half"], answer:0,
      explain:"F C G D A E B backwards is B E A D G C F." },
    { type:"mc", q:"Which is the fourth flat in the order of flats?", choices:["D♭","A♭","G♭"], answer:0,
      explain:"B♭, E♭, A♭, then D♭ — BEAD." },
    { type:"truefalse", q:"Flat key signatures always follow the same order.", answer:true,
      explain:"B–E–A–D–G–C–F, never rearranged." },
    { type:"truefalse", q:"The key signature with one flat is B♭ major.", answer:false,
      explain:"One flat alone = F MAJOR — the exception." },
    { type:"mc", q:"If the key signature contains B♭, E♭ and A♭, the key is ____ major.", choices:["E♭","A♭","B♭"], answer:0,
      explain:"The next-to-last flat (E♭) names the key." },
    /* — review style — */
    { type:"mc", q:"Write the order of the first two flats.", choices:["B♭ E♭","E♭ B♭","B♭ A♭"], answer:0,
      explain:"For up to two flats the order is B E." },
    { type:"mc", q:"Write the first four flats in order.", choices:["B♭ E♭ A♭ D♭","B♭ A♭ E♭ D♭","E♭ B♭ D♭ A♭"], answer:0,
      explain:"BEAD — B♭ E♭ A♭ D♭." },
    { type:"mc", q:"A key signature contains B♭ and E♭. Name the key.", choices:["B♭ Major","E♭ Major","F Major"], answer:0,
      explain:"Next-to-last flat is B♭ — B♭ major." },
    { type:"mc", q:"How many flats does A♭ major have?", choices:["4","3","5"], answer:0,
      explain:"B♭, E♭, A♭, D♭." }
  ],
  miaQuizIntro:"BEAD Goes Clean Fast — and don't let the F major exception trip you!",
  quiz:[
    { type:"mc", q:"What is the correct order of flats?",
      choices:["F C G D A E B","B E A D G C F","B A G F E D C","C F B E A D G"], answer:1,
      explain:"BEAD Goes Clean Fast.", hint:"It starts by spelling a word." },
    { type:"mc", q:"The order of flats is:",
      choices:["The same as the order of sharps","The reverse of the order of sharps","Different every time","Alphabetical"], answer:1,
      explain:"B–E–A–D–G–C–F is F–C–G–D–A–E–B backwards.", hint:"Compare the two orders end to end." },
    { type:"mc", q:"Which is the fourth flat in the order of flats?", choices:["A♭","D♭","G♭","C♭"], answer:1,
      explain:"B♭, E♭, A♭, D♭ — the D completes BEAD.", hint:"Spell BEAD." },
    { type:"truefalse", q:"Flat key signatures always follow the same order.", answer:true,
      explain:"The order B–E–A–D–G–C–F never changes.", hint:"Same as sharps: fixed order." },
    { type:"truefalse", q:"The key signature with one flat is B♭ major.", answer:false,
      explain:"One flat (B♭) alone = F major — the one exception.", hint:"Remember Lesson 28's one-flat scale." },
    { type:"mc", q:"Which matching is correct?",
      choices:["F→1 · B♭→2 · E♭→3 · A♭→4 flats","F→2 · B♭→1 · E♭→4 · A♭→3 flats","F→3 · B♭→4 · E♭→1 · A♭→2 flats"], answer:0,
      explain:"The flat keys accumulate one flat at a time: F, B♭, E♭, A♭.", hint:"F major starts the chain with B♭." },
    { type:"mc", q:"The first four flats are:",
      choices:["B♭, E♭, A♭, D♭","B♭, A♭, E♭, D♭","E♭, B♭, A♭, G♭"], answer:0,
      explain:"BEAD.", hint:"Spell it out." },
    { type:"mc", q:"If the key signature contains B♭, E♭ and A♭, the key is ____ major.", choices:["A♭","E♭","B♭"], answer:1,
      explain:"Next-to-last flat = E♭.", hint:"Count in from the end." },
    { type:"mc", q:"Write the first five flats in the correct order.",
      choices:["B♭, E♭, A♭, D♭, G♭","B♭, E♭, D♭, A♭, G♭","G♭, C♭, F♭, B♭, E♭"], answer:0,
      explain:"BEAD + G — Goes.", hint:"BEAD Goes…" },
    { type:"mc", q:"A key signature contains B♭ and E♭. Name the key.", choices:["E♭ Major","B♭ Major","F Major"], answer:1,
      explain:"Next-to-last flat is B♭ — B♭ major.", hint:"Two flats: apply the rule." },
    { type:"mc", q:"A key signature contains B♭, E♭, A♭, D♭ and G♭. What is the major key?",
      choices:["A♭ Major","D♭ Major","G♭ Major","C♭ Major"], answer:1,
      explain:"Five flats — next-to-last is D♭.", hint:"Second from the end." },
    { type:"mc", q:"Name this major key signature.",
      staff:{clef:"treble",keysig:"Bb",notes:[],width:220},
      choices:["B♭ Major","F Major","E♭ Major"], answer:0,
      explain:"Two flats (B♭, E♭) — next-to-last is B♭.", hint:"Count the flats, then use the rule." },
    { type:"mc", q:"Name this major key signature (bass clef).",
      staff:{clef:"bass",keysig:"F",notes:[],width:220},
      choices:["F Major","B♭ Major","C Major"], answer:0,
      explain:"One flat alone = F major — the exception works in any clef.", hint:"Only one flat here…" },
    { type:"mc", q:"Why is F major called the exception among flat keys?",
      choices:["Its single flat leaves no next-to-last flat to read","It has no flats","Its flats are out of order"], answer:0,
      explain:"With only B♭ in the signature, the rule can't apply — so memorize: one flat = F major.", hint:"The rule needs at least two flats." },
    /* generated */
    { gen:"keysig-id", params:{kind:"flat", max:4}, count:4 },
    { gen:"term-match", params:{subject:"key", pool:[["F Major","1 flat — B♭"],["B♭ Major","2 flats — B♭ E♭"],["E♭ Major","3 flats — B♭ E♭ A♭"],["A♭ Major","4 flats — B♭ E♭ A♭ D♭"]], reverse:true}, count:2 }
  ],
  vocabulary:[
    {term:"Key Signature", def:"Indicates the notes that will be sharped or flatted each time they appear. These are placed right after the clef sign.",
      staff:{clef:"treble",keysig:"Bb",notes:[],width:130}},
    {term:"Flat Keys", def:"Major keys whose key signatures contain one or more flats."},
    {term:"Order of Flats", def:"The sequence in which flats are added to key signatures: B – E – A – D – G – C – F. (BEAD Goes Clean Fast.) The reverse of the order of sharps."},
    {term:"Next-to-Last-Flat Rule", def:"For two or more flats, the next-to-last flat names the major key. The exception: one flat alone (B♭) is always F major."}
  ],
  mistakes:[],
  summary:[
    "✔ Order of flats: <b>B – E – A – D – G – C – F</b> — <i>BEAD Goes Clean Fast</i> — the <b>reverse of the sharps</b>.",
    "✔ <b>Next-to-last flat = the key name</b> (for two or more flats).",
    "✔ <b>Exception: one flat (B♭) alone = F MAJOR</b>.",
    "✔ F = 1♭ · B♭ = 2♭ · E♭ = 3♭ · A♭ = 4♭ (and on to D♭, G♭, C♭).",
    "✔ \u{1F389} <b>UNIT 7 COMPLETE</b> — tetrachords, four new scales, and both families of key signatures!"
  ],
  tips:[
    "Notice the two-for-one: the flat KEYS (F, B♭, E♭, A♭…) follow the same B-E-A-D chain as the flats themselves, one step behind.",
    "Fastest check ever: see flats → look at the second-from-the-end → that's your key. See ONE flat → say F major.",
    "Sharp rule and flat rule are different — half step UP from the LAST sharp, but the NEXT-TO-LAST flat IS the name.",
    "Next lesson: the remaining major scales — every key signature from 0 to 7 accidentals joins the family."
  ],
  rewards:{ badge:"Flat Key Decoder", icon:"\u{1F511}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secGame4","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"Perfect score — Unit 7 conquered! Scales built, signatures decoded, exception memorized. \u{1F511}\u{1F389}\u{1F389}",
  miaPass:"You passed — and finished Unit 7! Keep BEAD Goes Clean Fast handy, and never forget: one flat = F major.",
  mia:{
    hook:{ label:"the welcome",
      explain:"The shortcut hiding in every flat signature: the next-to-last flat IS the key name. B♭–E♭–A♭ → E♭ major.",
      play:()=>{[70,68,72].forEach((m,i)=>MFAudio.tone(m,.35,i*.35));} },
    learn:{ label:"flat key signatures",
      explain:"Flats stack in the order B–E–A–D–G–C–F (reverse of sharps). Next-to-last flat names the key; one flat alone is F major.",
      hint:"BEAD Goes Clean Fast.",
      play:()=>{MFAudio.tone(70,.3,0);MFAudio.tone(63,.3,.35);MFAudio.tone(68,.3,.7);} },
    example:{ label:"the examples",
      explain:"Both scales are written WITHOUT accidentals in the music — yet the B (and E) still play flat. That's the key signature working." },
    game:{ label:"the games",
      explain:"Race the flat order, match keys to their flats, read signatures on sight, and drill the next-to-last-flat rule with its exception.",
      hint:"Two facts + one exception win every round." },
    quiz:{ label:"this question",
      explain:"Three tools solve everything: the order B–E–A–D–G–C–F, the next-to-last-flat rule, and the F major exception.",
      play:()=>{MFAudio.tone(65,.3,0);MFAudio.tone(70,.5,.4);} }
  }
};
