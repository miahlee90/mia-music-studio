/* Lesson 69 — Composing a Melody in a Minor Key (AEMT Book 3, Unit 17)
   Built from drafts/UNIT 17 – Lesson 69.md; AEMT3 p.109 verified by render.
   Core: same method as major — melody from CHORD TONES of the progression,
   decorated with passing/neighboring tones. First and last note tends to be
   the root of the i chord; V(7) precedes the last chord. The book's model
   (Pat-A-Pan, D minor) labels notes R / 3 / 5 / U / L / P.
   NOTE: edit by FULL-FILE REWRITE only. */

/* compose in D minor: pick chord tones over i - iv - i - V7 - i */
function MF_L69_compose(container,fb){
  const MEAS=[
    {label:"i", sym:"Dm", tones:{D:62,F:65,A:69}, chord:[50,62,65,69], must:"D",
      note:"Rule: begin on the root of i."},
    {label:"iv", sym:"Gm", tones:{G:67,"B♭":70,D:74}, chord:[43,58,62,67],
      note:"G minor's tones sing here — B♭ is the darkest choice."},
    {label:"i", sym:"Dm", tones:{D:74,F:77,A:69}, chord:[50,62,65,69],
      note:"Home again — any D-minor tone."},
    {label:"V7", sym:"A7", tones:{A:69,"C♯":73,E:76,G:79}, chord:[45,61,64,67],
      note:"The dominant — C♯ (the raised 7th of D minor!) burns brightest here."},
    {label:"i", sym:"Dm", tones:{D:74}, chord:[50,62,65,69], must:"D",
      note:"Rule: end on the root of the final i."}];
  let k=0; const picked=[];
  container.innerHTML=`<div class="big-q l69c-q" style="text-align:center"></div>
    <div class="l69c-map" style="text-align:center;font-weight:800;letter-spacing:1px;margin:6px 0"></div>
    <div class="choices chips l69c-ch"></div>
    <div style="text-align:center"><button class="play l69c-play" style="display:none">▶ Play YOUR minor composition</button></div>`;
  const q=container.querySelector(".l69c-q"), map=container.querySelector(".l69c-map"), ch=container.querySelector(".l69c-ch"), pl=container.querySelector(".l69c-play");
  function drawMap(){ map.textContent=MEAS.map((m,i)=>`${m.label}:${i<picked.length?picked[i].name:"·"}`).join("  |  "); }
  function ask(){
    drawMap();
    if(k>=MEAS.length){ q.textContent="A minor-key melody, composed by you. Press play and brood magnificently!"; ch.innerHTML=""; pl.style.display="inline-block"; return; }
    const M=MEAS[k];
    q.innerHTML=`Measure ${k+1} — chord: <b>${M.sym} (${M.label})</b>. ${M.must?`<b>Required: ${M.must}</b> — `:""}pick your melody note. <i>${M.note}</i>`;
    ch.innerHTML="";
    const opts=Object.keys(M.tones);
    if(!M.must) opts.push(k===1?"E":"B♮");
    opts.sort(()=>Math.random()-.5).forEach(name=>{
      const b=document.createElement("button"); b.textContent=name;
      b.onclick=()=>{
        const M2=MEAS[k];
        if(M2.must && name!==M2.must){ MFAudio.tone(40,.2); fb(false,`The ${k===0?"first":"last"} note tends to be the root of i — that's ${M2.must}.`); return; }
        if(M2.tones[name]===undefined){ MFAudio.tone(40,.2); fb(false,`${name} isn't a tone of ${M2.sym}. Skeleton first — decorations later!`); return; }
        MFAudio.tone(M2.tones[name],.7,.05,.44);
        M2.chord.forEach(m=>MFAudio.tone(m,.8,.05,.2));
        picked.push({name, midi:M2.tones[name]}); k++;
        fb(true,`✓ ${name} over ${M2.sym}.`);
        setTimeout(ask,1000);
      };
      ch.appendChild(b);
    });
  }
  pl.onclick=()=>{
    picked.forEach((p,i)=>{
      MFAudio.tone(p.midi,.8,i*.88,.46);
      MEAS[i].chord.forEach(m=>MFAudio.tone(m,.85,i*.88,.2));
    });
    setTimeout(()=>fb(true,"✓ Root of i at both ends, A7 setting up the close — a textbook minor melody, in YOUR voice."),4900);
  };
  ask();
}

/* label detective: decode R/3/5/U/L/P on a D-minor phrase */
function MF_L69_labels(container,fb){
  const ROUNDS=[
    {ps:["D4","D4","A4"], chord:"Dm (D-F-A)", target:null, labels:["R","R","5"], ask:2, answer:"5",
      expl:"D is the root (R, twice); A is the chord's 5th → label 5."},
    {ps:["A4","G4","A4"], chord:"Dm (D-F-A)", ask:1, answer:"L",
      expl:"A…G…A — leaves the 5th, dips BELOW, returns: G is a Lower neighboring tone (L)."},
    {ps:["F4","E4","D4"], chord:"Dm (D-F-A)", ask:1, answer:"P",
      expl:"F (3) down to D (R) via E: a Passing tone (P) on the way."}];
  const OPTS=["R","3","5","P","U","L"];
  let r=0;
  container.innerHTML=`<div class="big-q l69l-q" style="text-align:center"></div>
    <div class="l69l-staff"></div>
    <div class="choices chips l69l-ch"></div>`;
  const q=container.querySelector(".l69l-q"), holder=container.querySelector(".l69l-staff"), ch=container.querySelector(".l69l-ch");
  function ask(){
    if(r>=ROUNDS.length){ q.textContent="All labels decoded — you read melodies the way the book writes them!"; holder.innerHTML=""; ch.innerHTML=""; return; }
    const R=ROUNDS[r];
    q.innerHTML=`Harmony: <b>${R.chord}</b>. What label belongs under the <b>${["first","second","third"][R.ask]}</b> note?`;
    Staff.render(holder,{clef:"treble",notes:R.ps.map((p,i)=>({p,d:"q",label:i===R.ask?"?":undefined})),width:300});
    ch.innerHTML="";
    OPTS.forEach(o=>{
      const b=document.createElement("button"); b.textContent=o;
      b.onclick=()=>{
        const R2=ROUNDS[r];
        if(o===R2.answer){
          R2.ps.forEach((p,ix)=>MFAudio.tone(MFAudio.midi(p),.45,.05+ix*.4,.42));
          fb(true,`✓ ${R2.expl}`);
          r++; setTimeout(ask,1500); }
        else { MFAudio.tone(40,.2); fb(false,"Is the note IN D-F-A (then R/3/5) or outside it (then P/U/L by its journey)?"); }
      };
      ch.appendChild(b);
    });
  }
  ask();
}

LESSON_CONTENT[69]={
  welcome:"Yesterday you composed in sunlight. Tonight, we write by moonlight. \u{1F58B}\u{FE0F}",
  hook:{
    say:"A bare minor progression — i, iv, V7, i — and then the same chords wearing a <b>composed melody</b>. <b>What gave the melody its minor character?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Chords alone</button>
          <button class="play hk-b">▶ Chords + melody</button></div>
          <div class="choices hk-ch" style="display:none"><button>Its notes came from the minor chords — F over Dm, C♯ over A7…</button><button>It was played more slowly</button><button>Minor melodies use a special clef</button></div>`;
        const chords=[[50,62,65,69],[43,58,62,67],[45,61,64,67],[50,62,65,69]];
        const mel=[74,70,73,74];
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ chords.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.85,i*.9,.25))); hA=true; if(hB) setTimeout(()=>ch.style.display="",3900); };
        container.querySelector(".hk-b").onclick=()=>{ chords.forEach((row,i)=>{ row.forEach(m=>MFAudio.tone(m,.85,i*.9,.2)); MFAudio.tone(mel[i],.8,i*.9,.46); }); hB=true; if(hA) setTimeout(()=>ch.style.display="",3900); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ D from Dm, B♭ from Gm, C♯ from A7 — the melody is built from each chord's own tones, so it inherits the minor mood automatically. Same method as Lesson 67, new mode. Today: composing in minor!");
          else fb(false,"Tempo and clef were identical. The minor color lives in WHICH notes were chosen…");
        });
      } }
  },
  objectives:[
    "Compose a minor melody the same way as a major one",
    "Analyze first: numerals below, symbols above",
    "Skeleton from chord tones — including the raised 7th in V(7)",
    "Decorate with passing and neighboring tones",
    "Begin and end on the root of i; V(7) precedes the last chord",
    "Read the model's labels: R / 3 / 5 / U / L / P"
  ],
  steps:[
    { say:"The book's assurance: <b>composing a melody in a minor key is SIMILAR to composing in a major key</b> — the melody is created from <b>the tones of the chord accompaniment</b>. \u{1F447} <b>What changes when the key turns minor?</b>",
      try:{ type:"mc", choices:["Only the chords — the method stays identical","Everything about the method","You may not use passing tones"], answer:0,
        success:"✓ Analyze → skeleton → decorate → frame. Four steps, both modes. The chords supply the mood; the method supplies the melody.",
        fail:"Compare with Lesson 67's checklist…",
        hint:"Method vs materials." } },
    { say:"Step one, as always: <b>analyze the progression — Roman numerals under the chords, symbols above the staff</b>. In D minor, i = Dm, iv = Gm, V7 = A7 (with C♯ — the raised 7th!). \u{1F447} <b>Why does A7 contain a C♯?</b>",
      try:{ type:"mc", choices:["D minor's harmonic scale raises its 7th, which is A7's 3rd","A7 always has sharps","It's borrowed from D major"], answer:0,
        success:"✓ Lesson 60's logic rides along: the raised 7th (C♯) lives inside V7 and pulls to D.",
        fail:"What note is a half step below D — and which chord owns it?",
        hint:"The leading tone of D minor." } },
    { say:"The frame rules, minor edition: <b>first and last note tend to be the ROOT of the i chord</b>; <b>V (or V7) usually precedes the last chord</b>. \u{1F447} <b>Composing in D minor, your first note should probably be…</b>",
      try:{ type:"mc", choices:["D","A","F"], answer:0,
        success:"✓ Root of i, both ends — the same bookends as major, moved into moonlight.",
        fail:"The root of the i chord in D minor is…",
        hint:"The key's own name." } },
    { say:"The book's model (its French carol) labels every melody note: <b>R = root, 3 = 3rd, 5 = 5th, U = upper neighbor, L = lower neighbor, P = passing tone</b>. Decode a few yourself. \u{1F447}",
      try:{ type:"custom",
        hint:"In the chord → R/3/5. Outside it → P (bridge), U (visit above), L (visit below).",
        mount:(container,fb)=>MF_L69_labels(container,fb) } },
    { say:"THE MAIN EVENT: compose your own five-measure melody over <b>i - iv - i - V7 - i</b> in D minor. \u{1F447}",
      try:{ type:"custom",
        hint:"Chord tones only; D at both ends; try the C♯ over A7 for maximum pull.",
        mount:(container,fb)=>MF_L69_compose(container,fb) } },
    { say:"Decoration reminder: after the skeleton, <b>add passing and neighboring tones to make the melody more interesting</b> — the model tune is peppered with U's, L's and P's. \u{1F447} <b>Where do those decorations usually sit?</b>",
      try:{ type:"mc", choices:["On weak beats, between chord tones","On every strong beat","Only in the bass"], answer:0,
        success:"✓ Lesson 66's law survives the mode change: anchors on the strong beats, seasoning on the weak.",
        fail:"Same rule as in major…",
        hint:"Strong = skeleton; weak = decoration." } },
    { say:"Transfer: composing in <b>E minor</b> over Em - Am - B7 - Em. \u{1F447} <b>Which melody note over B7 would give the strongest pull home?</b>",
      try:{ type:"mc", choices:["D♯ — the raised 7th, a half step under E","B — the root","A — the 7th"], answer:0,
        success:"✓ The leading tone D♯ aches toward E — put it near the end of the phrase and the resolution lands itself.",
        fail:"Which note of B-D♯-F♯-A is a half step from the tonic E?",
        hint:"The raised 7th, always." } }
  ],
  examples:[
    { caption:"A composed D-minor melody with the book's full label set: chord tones (R, 3, 5) anchor the strong beats; a passing tone and a lower neighbor decorate the weak ones.",
      staff:{clef:"treble",tempo:100,notes:[
        {p:"D4",d:"q",label:"R"},{p:"F4",d:"q",label:"3"},{p:"A4",d:"q",label:"5"},{p:"G4",d:"q",label:"L"},
        {p:"A4",d:"q",label:"5"},{p:"Bb4",d:"q",label:"3 (of iv)"},{p:"G4",d:"h",label:"R (of iv)"},
        {p:"A4",d:"q",label:"R (of V7)"},{p:"C#5",d:"q",label:"3 (of V7)"},
        {p:"D5",d:"w",label:"R (of i) — home"},{bar:"final"}],width:660},
      kb:{start:50,octaves:3,labels:true} },
    { caption:"Skeleton vs decorated, minor edition: the bare chord-tone frame, then the same frame with a passing tone and an upper neighbor breathing life into it.",
      staff:{clef:"treble",tempo:100,notes:[
        {p:"D4",d:"h",label:"skeleton…"},{p:"F4",d:"h"},{p:"A4",d:"h"},{p:"D5",d:"h"},{bar:"double"},
        {p:"D4",d:"q",label:"…decorated!"},{p:"E4",d:"q",label:"P"},{p:"F4",d:"q"},{p:"G4",d:"q",label:"P"},{p:"A4",d:"q"},{p:"Bb4",d:"q",label:"U"},{p:"A4",d:"q"},{p:"D5",d:"q"},{bar:"final"}],width:640},
      kb:{start:50,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Label Sprint (45s)",
      intro:"R, 3, 5, U, L, P — race the model's label language!",
      miaIntro:"Six little letters! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["R","the melody note is the chord's root"],
        ["3","the melody note is the chord's 3rd"],
        ["5","the melody note is the chord's 5th"],
        ["P","a passing tone between two chord tones"],
        ["U","an upper neighboring tone"],
        ["L","a lower neighboring tone"],
        ["First & last note (minor)","the root of the i chord"],
        ["Before the final chord","V or V7"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — label-literate!":null },
    { type:"key-climb", title:"Game 2 · Play a Model Phrase",
      intro:"Perform a labeled minor phrase: R-R-5-5-L-5 in D minor — the carol's shape!",
      miaIntro:"Composer's fingers on! \u{1FA9C}",
      spec:{seq:[62,62,69,69,67,69, 65,62],
        names:["D (R)","D (R)","A (5)","A (5)","G (L — the lower neighbor!)","A (5)","F (3)","D (R — home)"],
        start:57, octaves:2, title:"A Pat-A-Pan-style phrase in D minor"},
      result:(score)=>score!==null?"Model phrase performed!":null },
    { type:"symbol-hunt", title:"Game 3 · Minor Safe-Note Spotter",
      intro:"A D-minor chord is called — click the melody fragment that fits inside it!",
      miaIntro:"Skeleton check! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Fits Dm (D-F-A)", spec:{clef:"treble",notes:[{p:"D4",d:"q"},{p:"F4",d:"q"},{p:"A4",d:"q"},{p:"F4",d:"q"}],width:170}},
        {label:"Fits Gm (G-B♭-D)", spec:{clef:"treble",notes:[{p:"G4",d:"q"},{p:"Bb4",d:"q"},{p:"D5",d:"q"},{p:"Bb4",d:"q"}],width:170}},
        {label:"Fits A7 (A-C♯-E-G)", spec:{clef:"treble",notes:[{p:"A4",d:"q"},{p:"C#5",d:"q"},{p:"E5",d:"q"},{p:"G5",d:"q"}],width:170}},
        {label:"Fits NO single chord", spec:{clef:"treble",notes:[{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"}],width:170}}]},
      result:(score)=>score>=5?"Minor skeletons spotted on sight!":null },
    { type:"term-race", title:"Game 4 · Minor Composer's Race",
      intro:"The method, the frame, the raised 7th — everything from Lessons 68-69!",
      miaIntro:"Compose at speed! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Composing in minor","same method as major, minor chords"],
        ["The skeleton's source","each measure's chord tones"],
        ["The decorations","passing & neighboring tones (weak beats)"],
        ["First & last note","root of i"],
        ["The pre-final chord","V or V7"],
        ["C♯ over A7 in D minor","the raised 7th — maximum pull"],
        ["V7 of D minor","A7 (A-C♯-E-G)"],
        ["V7 of E minor","B7 (B-D♯-F♯-A)"]]},
      result:(score)=>score>=6?"Minor composing: mastered!":null }
  ],
  practiceIntro:"20 practice questions — method, labels and the minor frame. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["R","chord root in the melody"],["3","chord 3rd in the melody"],["5","chord 5th in the melody"],["P","passing tone"],["U","upper neighbor"],["L","lower neighbor"]], reverse:true}, count:6 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 },
    { type:"mc", q:"Composing a melody in a minor key is…", choices:["similar to composing in a major key","entirely different","not possible with three chords"], answer:0,
      explain:"The book's first sentence (AEMT3 p.109)." },
    { type:"mc", q:"The melody is created based on…", choices:["the tones in the chord accompaniment","random chromatic notes","the drum part"], answer:0,
      explain:"Chord tones are the source." },
    { type:"mc", q:"The first and last note of a minor melody tends to be…", choices:["the root of the i chord","the 5th of V","the raised 7th"], answer:0,
      explain:"Home at both ends — minor edition." },
    { type:"mc", q:"In D minor, the V7 chord is…", choices:["A7 (A-C♯-E-G)","A minor 7","G7"], answer:0,
      explain:"The raised C♯ makes it major-with-a-7th." },
    { type:"mc", q:"Over a Gm measure (G-B♭-D), which melody note is a SKELETON note?", choices:["B♭","C","E"], answer:0,
      explain:"Only chord tones qualify for the skeleton." },
    { type:"mc", q:"The label 'U' under a melody note means…", choices:["upper neighboring tone","unison","up-bow"], answer:0,
      explain:"A visit from above, then home." },
    { type:"truefalse", q:"Non-harmonic tones make a composed minor melody more interesting.", answer:true,
      explain:"The book prescribes them for both modes." },
    { type:"truefalse", q:"A V or V7 usually precedes the final chord in a minor composition.", answer:true,
      explain:"The frame rule survives the mode change." },
    { type:"truefalse", q:"The numbers between the staffs in the model refer to the melody notes.", answer:true,
      explain:"Each names its note's chord-member role." },
    { type:"truefalse", q:"In minor composing, the raised 7th should be avoided.", answer:false,
      explain:"Quite the opposite — it powers the V7 and the pull home." }
  ],
  miaQuizIntro:"Quiz! Same checklist, minor palette — and let the C♯ do its magic.",
  quiz:[
    { type:"mc", q:"Composing a minor melody uses which method?", choices:["The same as major: analyze, chord-tone skeleton, decorate, frame","A special minor-only method","Free improvisation with no rules"], answer:0,
      explain:"One checklist, two moods.", hint:"Lesson 67's four steps." },
    { type:"mc", q:"The melody is based on the tones of…", choices:["the chord accompaniment","the chromatic scale","a different key"], answer:0,
      explain:"Each measure's chord = each measure's palette.", hint:"The hook's discovery." },
    { type:"mc", q:"Begin by analyzing the progression and writing…", choices:["Roman numerals under the chords, symbols above the staff","the melody first","the tempo marking"], answer:0,
      explain:"Map before travel — both modes.", hint:"Numerals below, symbols above." },
    { type:"mc", q:"The first and last note of the melody tends to be…", choices:["the root of the i chord","any chord tone","the leading tone"], answer:0,
      explain:"D to D in D minor.", hint:"Home-to-home." },
    { type:"truefalse", q:"A V (or V7) usually precedes the last chord.", answer:true,
      explain:"The universal cadence rule.", hint:"Fourth lesson in a row!" },
    { type:"truefalse", q:"The labels U and L mark upper and lower neighboring tones.", answer:true,
      explain:"The model's decoration marks.", hint:"Lesson 66 vocabulary." },
    { type:"mc", q:"Over an A7 measure in D minor, which melody note is NOT a chord tone?", choices:["D","A","C♯","E"], answer:0,
      explain:"A7 = A-C♯-E-G; D would be a decoration here.", hint:"Spell A7." },
    { type:"mc", q:"A melody measure over Dm reads A-G-A. The G is labeled…", choices:["L — lower neighboring tone","P — passing tone","5 — a chord tone"], answer:0,
      explain:"Same-tone frame (A…A), visit below → L.", hint:"Frame check first." },
    { type:"mc", q:"A melody measure over Dm reads F-E-D. The E is labeled…", choices:["P — passing tone","U — upper neighbor","3 — a chord tone"], answer:0,
      explain:"3 down to R via a bridge → P.", hint:"Different landing = passing." },
    { type:"mc", q:"Why does C♯ (over A7) make a D-minor melody so directional?", choices:["It's the leading tone — a half step below the tonic D","It's the loudest available note","It cancels the minor key"], answer:0,
      explain:"Raised 7th = built-in gravity.", hint:"What's a half step above C♯?" },
    { type:"mc", q:"Composing over Em - Am - B7 - Em, your last note should be…", choices:["E","B","D♯"], answer:0,
      explain:"Root of the final i.", hint:"The frame rule, transposed." },
    { type:"mc", q:"Two composers write different melodies over the same minor progression. The book would say…", choices:["both can be correct — chord tones offer many valid paths","only one can be right","minor allows exactly one melody"], answer:0,
      explain:"'You can compose your own unique melody' — the book's own words.", hint:"Uniqueness is the point." },
    /* generated */
    { gen:"term-match", params:{subject:"term", pool:[["R/3/5","chord-member labels"],["P","the bridge"],["U/L","the neighbors"],["The frame","root of i at both ends"]], reverse:true}, count:3 },
    { gen:"rel-key", params:{ask:"both"}, count:2 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:1 }
  ],
  vocabulary:[
    {term:"Composing in Minor", def:"Creating a melody for a minor-key progression — same four steps as major: analyze, skeleton, decorate, frame."},
    {term:"R / 3 / 5 / U / L / P", def:"The book's full label set: chord members (root/3rd/5th) plus the decorations (upper, lower, passing)."},
    {term:"The Minor Frame", def:"Begin and end on the ROOT of i; V(7) — with its raised 7th — precedes the final chord."},
    {term:"The C♯ Effect", def:"In D minor, the raised 7th inside A7 pulls straight to D — put it late in the phrase and the ending writes itself.",
      staff:{clef:"treble",notes:[{p:"C#5",d:"h"},{p:"D5",d:"h"}],width:130}}
  ],
  mistakes:[],
  summary:[
    "✔ Minor composing = <b>major composing with minor chords</b>: analyze → skeleton → decorate → frame.",
    "✔ Skeleton from <b>chord tones</b>; decorations (P/U/L) on <b>weak beats</b>.",
    "✔ Frame: <b>root of i</b> at both ends; <b>V(7)</b> before the close.",
    "✔ The model's labels: <b>R, 3, 5, U, L, P</b> — read them, then write with them.",
    "✔ The <b>raised 7th</b> (C♯ in D minor) is your strongest melodic magnet."
  ],
  tips:[
    "Give your minor melody ONE C♯ moment near the end — listeners will feel the homecoming without knowing why.",
    "The 3rd of i (F in D minor) is the single most 'minor-sounding' melody note. Lean on it when you want maximum mood.",
    "Label everything you write for a week — R/3/5/P/U/L. Analysis and composition are the same muscle.",
    "Next lesson, something completely different: a 12-bar progression born in America's south — the BLUES."
  ],
  rewards:{ badge:"Moonlight Composer", icon:"\u{1F58B}\u{FE0F}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"PERFECT! Your minor melodies brood beautifully AND correctly. \u{1F58B}\u{FE0F}\u{1F389}",
  miaPass:"Passed! Two modes of composing conquered. Now — the blues is calling…",
  mia:{
    hook:{ label:"the welcome",
      explain:"The melody drew from each chord's own tones — D from Dm, B♭ from Gm, C♯ from A7 — inheriting the minor mood note by note.",
      play:()=>{const chords=[[50,62,65,69],[43,58,62,67],[45,61,64,67],[50,62,65,69]],mel=[74,70,73,74];chords.forEach((row,i)=>{row.forEach(m=>MFAudio.tone(m,.85,i*.9,.2));MFAudio.tone(mel[i],.8,i*.9,.46);});} },
    learn:{ label:"minor composing",
      explain:"Same checklist as major. i=Dm, iv=Gm, V7=A7 (with the raised C♯). Frame on the root of i; decorate with P/U/L on weak beats.",
      hint:"Analyze → skeleton → decorate → frame.",
      play:()=>{[62,65,69,67,69].forEach((m,i)=>MFAudio.tone(m,.5,i*.42,.42));} },
    example:{ label:"the examples",
      explain:"Example 1 is a fully labeled minor melody; example 2 shows the same skeleton before and after decoration." },
    game:{ label:"the games",
      explain:"Sprint the labels, perform a model phrase, spot minor skeletons, then race the composer facts.",
      hint:"R/3/5 inside the chord; P/U/L outside it." },
    quiz:{ label:"this question",
      explain:"Everything reduces to the four steps — and in minor, one extra ally: the raised 7th living inside V7.",
      play:()=>{[45,61,64,67].forEach(m=>MFAudio.tone(m,.8,0,.3));[50,62,65,69].forEach(m=>MFAudio.tone(m,1,.9,.3));} }
  }
};
