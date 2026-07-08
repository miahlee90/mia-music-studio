/* Lesson 61 — Minor Chord Progressions (AEMT Book 3, Unit 15)
   Built from drafts/UNIT 15 – Lesson 61.md; AEMT3 p.97 verified by render.
   Core: i, iv, V(7) contain all the notes of the harmonic minor scale →
   they accompany minor melodies; V7 often replaces V; smoothing recipe:
   iv → iv⁶₄ (5th drops an octave), V → V⁶, V7 → V⁶₅; common tones connect
   neighbors. Smooth pattern: i → iv⁶₄ → i → V⁶(₅) → i, bass A-A-A-G♯-A.
   Root-finding reminders: triads — root on top of the 4th; sevenths — on top of the 2nd.
   NOTE: edit by FULL-FILE REWRITE only. */

/* common-tone finder in A minor */
function MF_L61_common(container,fb){
  const ROUNDS=[
    {a:{name:"i (A-C-E)", ps:["A3","C4","E4"]}, b:{name:"iv (D-F-A)", ps:["D4","F4","A4"]}, shared:"A",
      expl:"A is i's root and iv's 5th — hold it while the other voices step."},
    {a:{name:"i (A-C-E)", ps:["A3","C4","E4"]}, b:{name:"V (E-G♯-B)", ps:["E4","G#4","B4"]}, shared:"E",
      expl:"E is i's 5th and V's root — the hinge of every minor cadence."},
    {a:{name:"i (A-C-E)", ps:["A3","C4","E4"]}, b:{name:"V7 (E-G♯-B-D)", ps:["E4","G#4","B4","D5"]}, shared:"E",
      expl:"V7 keeps the same hinge — plus D, the 7th that leans toward C."}];
  let r=0;
  container.innerHTML=`<div class="big-q l61c-q" style="text-align:center"></div>
    <div class="l61c-staff"></div>
    <div style="text-align:center"><button class="play l61c-hear">▶ Hear both chords</button></div>`;
  const q=container.querySelector(".l61c-q"), holder=container.querySelector(".l61c-staff"), hear=container.querySelector(".l61c-hear");
  function ask(){
    if(r>=ROUNDS.length){ q.textContent="Every joint of the minor progression has its anchor — found by you!"; holder.innerHTML=""; hear.style.display="none"; return; }
    const R=ROUNDS[r];
    q.innerHTML=`${R.a.name} then ${R.b.name}: tap the note of the <b>second chord</b> that also lives in the first.`;
    const notes=[...R.a.ps.map((p,ix)=>ix===0?{p,d:"w",label:R.a.name.split(" ")[0]}:{p,d:"w",chord:true}),
                 ...R.b.ps.map((p,ix)=>ix===0?{p,d:"w",label:R.b.name.split(" ")[0]}:{p,d:"w",chord:true})];
    const bStart=R.a.ps.length;
    Staff.render(holder,{clef:"treble",notes,width:420,clickNotes:true,
      onNote:(i,p)=>{
        MFAudio.tone(MFAudio.midi(p),.5,0,.4);
        if(i<bStart){ fb(false,"Tap inside the SECOND chord."); return; }
        if(p[0]===ROUNDS[r].shared){ MFAudio.yay(); fb(true,`✓ ${ROUNDS[r].shared} is the common tone. ${ROUNDS[r].expl}`);
          r++; setTimeout(ask,1500); }
        else fb(false,`${p[0].replace("#","♯")} appears only in the second chord. Compare the spellings letter by letter.`);
      }});
  }
  hear.onclick=()=>{
    const R=ROUNDS[r]; if(!R) return;
    R.a.ps.forEach(p=>MFAudio.tone(MFAudio.midi(p),.9,0,.32));
    R.b.ps.forEach(p=>MFAudio.tone(MFAudio.midi(p),1.1,1.0,.32));
  };
  ask();
}

/* smooth-or-choppy compare in A minor */
function MF_L61_smooth(container,fb){
  let hA=false,hB=false;
  const CHOPPY=[[45,60,64,69],[50,62,65,69],[45,60,64,69],[52,64,68,71,74],[45,60,64,69]];
  const SMOOTH=[[45,60,64,69],[45,62,65,69],[45,60,64,69],[44,64,68,71,74],[45,60,64,69]];
  function playProg(rows){ rows.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,1.0,i*1.05,.27))); }
  container.innerHTML=`<div class="big-q" style="text-align:center">The same i-iv-i-V7-i progression, two ways. Which bass WALKS instead of leaping?</div>
    <div style="text-align:center">
      <button class="play l61-a">▶ Version A (all root position)</button>
      <button class="play l61-b">▶ Version B (with inversions)</button></div>
    <div class="choices l61-ch" style="display:none"><button>Version B — the bass held A, then slid to G♯</button><button>Version A — big leaps flow better</button></div>`;
  const ch=container.querySelector(".l61-ch");
  container.querySelector(".l61-a").onclick=()=>{ playProg(CHOPPY); hA=true; if(hB) setTimeout(()=>ch.style.display="",5600); };
  container.querySelector(".l61-b").onclick=()=>{ playProg(SMOOTH); hB=true; if(hA) setTimeout(()=>ch.style.display="",5600); };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(i===0) fb(true,"✓ Version B used iv⁶₄ and V⁶₅: the bass sang A-A-A-G♯-A — barely moving, with the leading tone as its only step. Same chords as version A, completely different flow.");
    else fb(false,"Follow only the LOWEST voice: A→D→A→E→A (leaps) versus A→A→A→G♯→A (a whisper). Which is smoother?");
  });
}

/* build-a-smooth-minor-progression */
function MF_L61_build(container,fb){
  const SLOTS=[
    {q:"Slot 2 — the iv chord. Which position keeps the bass ON A (the common tone with i)?",
      choices:["iv⁶₄ (A-D-F)","iv root position (D-F-A)"], right:0,
      expl:"The book's move: drop the iv chord's 5th (A) an octave — 2nd inversion, bass unchanged."},
    {q:"Slot 4 — the V7 chord. Which position lets the bass slide a half step to the leading tone?",
      choices:["V⁶₅ (G♯-B-D-E)","V7 root position (E-G♯-B-D)"], right:0,
      expl:"1st inversion puts G♯ — the leading tone — in the bass: A to G♯ to A, the tightest walk in music."}];
  let s=0;
  container.innerHTML=`<div class="big-q l61b-q" style="text-align:center"></div>
    <div class="l61b-map" style="text-align:center;font-weight:800;font-size:15px;letter-spacing:1px;margin:8px 0"></div>
    <div class="choices l61b-ch"></div>
    <div style="text-align:center"><button class="play l61b-play" style="display:none">▶ Play YOUR smooth minor progression</button></div>`;
  const q=container.querySelector(".l61b-q"), map=container.querySelector(".l61b-map"), ch=container.querySelector(".l61b-ch"), pl=container.querySelector(".l61b-play");
  const picked=[];
  function drawMap(){ map.textContent="i → "+(picked[0]||"?")+" → i → "+(picked[1]||"?")+" → i"; }
  function ask(){
    drawMap();
    if(s>=SLOTS.length){ q.textContent="Assembled — press play and feel the minor glide!"; ch.innerHTML=""; pl.style.display="inline-block"; return; }
    q.innerHTML=SLOTS[s].q; ch.innerHTML="";
    SLOTS[s].choices.forEach((c,i)=>{
      const b=document.createElement("button"); b.textContent=c;
      b.onclick=()=>{
        if(i===SLOTS[s].right){ MFAudio.yay(); picked.push(c.split(" ")[0]); fb(true,"✓ "+SLOTS[s].expl); s++; setTimeout(ask,1300); }
        else { MFAudio.tone(40,.2); fb(false,"That version makes the bass LEAP. Keep it on or next to A."); }
      };
      ch.appendChild(b);
    });
  }
  pl.onclick=()=>{
    const rows=[[45,60,64,69],[45,62,65,69],[45,60,64,69],[44,64,68,71,74],[45,60,64,69]];
    rows.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,1.0,i*1.05,.27)));
    setTimeout(()=>fb(true,"✓ i → iv⁶₄ → i → V⁶₅ → i: the book's smooth minor recipe — bass line A-A-A-G♯-A."),5400);
  };
  ask();
}

LESSON_CONTENT[61]={
  welcome:"The minor primaries learned to stand in Lesson 60. Today they learn to WALK. \u{1F32B}\u{FE0F}",
  hook:{
    say:"A minor progression, two performances. Same chords — <b>i, iv, V7, i</b> — but one trudges and one breathes. <b>What's version B's secret?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Version A</button>
          <button class="play hk-b">▶ Version B</button></div>
          <div class="choices hk-ch" style="display:none"><button>B used inversions — the bass barely moved</button><button>B changed to a major key</button><button>B skipped the V7 chord</button></div>`;
        const A=[[45,60,64,69],[50,62,65,69],[52,64,68,71],[45,60,64,69]];
        const B=[[45,60,64,69],[45,62,65,69],[44,64,68,71],[45,60,64,69]];
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        const play=rows=>rows.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,1.0,i*1.0,.27)));
        container.querySelector(".hk-a").onclick=()=>{ play(A); hA=true; if(hB) setTimeout(()=>ch.style.display="",4300); };
        container.querySelector(".hk-b").onclick=()=>{ play(B); hB=true; if(hA) setTimeout(()=>ch.style.display="",4300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Version B flipped iv and V into inversions so the bass could stay near A — including that gorgeous half-step A→G♯→A. Lesson 55's smoothing craft, now in minor!");
          else fb(false,"Both versions used the same four minor-key chords. The difference is in the BASS line…");
        });
      } }
  },
  objectives:[
    "Accompany minor melodies with i, iv and V(7) — they hold the whole scale",
    "Swap V7 in place of V, exactly as in major",
    "Smooth the progression: iv → iv⁶₄ and V(7) → V⁶(₅)",
    "Track the bass line: A - A - A - G♯ - A",
    "Keep common tones between neighboring chords",
    "Recall the root-finder tricks: top of the 4th (triads), top of the 2nd (sevenths)"
  ],
  steps:[
    { say:"Why these three chords again? Because <b>i, iv and V contain ALL the notes of the harmonic minor scale</b> — so they can <b>accompany most simple melodies in minor keys</b>. And as always, <b>V7 often replaces V</b>. \u{1F447} <b>Check: which scale notes do i, iv, V cover in A minor?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:80,notes:[
        {p:"A3",d:"h",label:"i"},{p:"C4",d:"h",chord:true},{p:"E4",d:"h",chord:true},
        {p:"D4",d:"h",label:"iv"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"E4",d:"h",label:"V"},{p:"G#4",d:"h",chord:true},{p:"B4",d:"h",chord:true}],width:440} },
      try:{ type:"mc", choices:["All seven: A-C-E + D-F-A + E-G♯-B","Only the white keys","Only five notes"], answer:0,
        success:"✓ A, B, C, D, E, F, G♯ — the complete harmonic minor. Any melody note has a chord waiting.",
        fail:"List them: i gives A,C,E; iv adds D,F; V adds B and G♯…",
        hint:"Count the distinct letters." } },
    { say:"The problem is the same as in major: all-root-position writing makes the bass LEAP (A→D→A→E→A). \u{1F447} <b>Hear both versions and judge:</b>",
      try:{ type:"custom",
        hint:"Track only the lowest voice.",
        mount:(container,fb)=>MF_L61_smooth(container,fb) } },
    { say:"The book's smoothing recipe, minor edition: in <b>iv</b>, move the <b>5th (A) down an octave</b> → iv⁶₄. In <b>V</b>, move the <b>3rd (G♯) and 5th (B) down</b> → V⁶. In <b>V7</b>, move the 3rd, 5th and 7th down → V⁶₅. \u{1F447} <b>Why is dropping the iv chord's 5th so clever?</b>",
      show:{ type:"staff", spec:{clef:"treble",notes:[
        {p:"D4",d:"w",label:"iv"},{p:"F4",d:"w",chord:true},{p:"A4",d:"w",chord:true},
        {p:"A3",d:"w",label:"iv⁶₄"},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true},
        {p:"E4",d:"w",label:"V7"},{p:"G#4",d:"w",chord:true},{p:"B4",d:"w",chord:true},{p:"D5",d:"w",chord:true},
        {p:"G#3",d:"w",label:"V⁶₅"},{p:"B3",d:"w",chord:true},{p:"D4",d:"w",chord:true},{p:"E4",d:"w",chord:true}],width:580} },
      try:{ type:"mc", choices:["That 5th IS the tonic note A — the bass never has to move from home","It makes the chord louder","It removes the minor quality"], answer:0,
        success:"✓ iv's 5th = A = the common tone with i. Drop it to the bass and i → iv⁶₄ happens without the floor shifting an inch.",
        fail:"What NOTE is the 5th of D-F-A? And what key are we in?",
        hint:"The dropped note becomes the bass — you want it to be the tonic." } },
    { say:"Find the anchors yourself — the common tones of the minor progression. \u{1F447}",
      try:{ type:"custom",
        hint:"Compare spellings letter by letter.",
        mount:(container,fb)=>MF_L61_common(container,fb) } },
    { say:"The finished formula: <b>i → iv⁶₄ → i → V⁶ (or V⁶₅) → i</b> — a common tone at every joint and a bass line of <b>A - A - A - G♯ - A</b>. \u{1F447} <b>What does the bass do at the V⁶₅ moment?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:70,notes:[
        {p:"A3",d:"h",label:"i"},{p:"C4",d:"h",chord:true},{p:"E4",d:"h",chord:true},
        {p:"A3",d:"h",label:"iv⁶₄"},{p:"D4",d:"h",chord:true},{p:"F4",d:"h",chord:true},
        {p:"A3",d:"h",label:"i"},{p:"C4",d:"h",chord:true},{p:"E4",d:"h",chord:true},
        {p:"G#3",d:"h",label:"V⁶₅"},{p:"B3",d:"h",chord:true},{p:"D4",d:"h",chord:true},{p:"E4",d:"h",chord:true},
        {p:"A3",d:"w",label:"i"},{p:"C4",d:"w",chord:true},{p:"E4",d:"w",chord:true},{bar:"final"}],width:620} },
      try:{ type:"mc", choices:["It slides a half step down to the leading tone, then home","It leaps a 5th","It stays on A"], answer:0,
        success:"✓ A → G♯ → A: the leading tone in the BASS — the single most magnetic bass move a minor key owns.",
        fail:"G♯ is not A… but it's very, very close.",
        hint:"Half step down, half step back." } },
    { say:"Assemble it yourself, arranger. \u{1F447}",
      try:{ type:"custom",
        hint:"Keep the bass on A or a half step away.",
        mount:(container,fb)=>MF_L61_build(container,fb) } },
    { say:"The book closes with two reminders you own already: in close position, a flipped <b>triad's root is the top of the 4th</b>; a flipped <b>V7's root is the top of the 2nd</b>. \u{1F447} <b>In the chord G♯-B-D-E, where is the root?</b>",
      try:{ type:"mc", choices:["E — the top of the 2nd (D-E)","G♯ — the bass is always the root","B — the middle"], answer:0,
        success:"✓ D→E is the 2nd; its upper note E is the root — this is E7 (V7 of A minor) in 1st inversion, our V⁶₅.",
        fail:"Find two neighbors a 2nd apart inside G♯-B-D-E…",
        hint:"Lesson 53's crunch-pair trick." } }
  ],
  examples:[
    { caption:"The CHOPPY version: i-iv-i-V7-i in root position. Honest, but hear the bass leap around: A, D, A, E, A.",
      staff:{clef:"treble",tempo:70,notes:[
        {p:"A3",d:"h",label:"i"},{p:"C4",d:"h",chord:true},{p:"E4",d:"h",chord:true},
        {p:"D4",d:"h",label:"iv"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"A3",d:"h",label:"i"},{p:"C4",d:"h",chord:true},{p:"E4",d:"h",chord:true},
        {p:"E4",d:"h",label:"V7"},{p:"G#4",d:"h",chord:true},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},
        {p:"A3",d:"w",label:"i"},{p:"C4",d:"w",chord:true},{p:"E4",d:"w",chord:true},{bar:"final"}],width:620},
      kb:{start:45,octaves:3,labels:true} },
    { caption:"The SMOOTH version: i-iv⁶₄-i-V⁶₅-i. The bass whispers A-A-A-G♯-A while the common tones hold hands above. The same harmony, now one connected thought.",
      staff:{clef:"treble",tempo:70,notes:[
        {p:"A3",d:"h",label:"i"},{p:"C4",d:"h",chord:true},{p:"E4",d:"h",chord:true},
        {p:"A3",d:"h",label:"iv⁶₄"},{p:"D4",d:"h",chord:true},{p:"F4",d:"h",chord:true},
        {p:"A3",d:"h",label:"i"},{p:"C4",d:"h",chord:true},{p:"E4",d:"h",chord:true},
        {p:"G#3",d:"h",label:"V⁶₅"},{p:"B3",d:"h",chord:true},{p:"D4",d:"h",chord:true},{p:"E4",d:"h",chord:true},
        {p:"A3",d:"w",label:"i"},{p:"C4",d:"w",chord:true},{p:"E4",d:"w",chord:true},{bar:"final"}],width:620},
      kb:{start:45,octaves:3,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Minor Toolkit Sprint (45s)",
      intro:"Inversions and figures — the tools that power smooth minor progressions!",
      miaIntro:"Everything from Units 13-15! \u{1F9F0}",
      spec:{gen:"inversion-id", params:{subject:"both", ask:"both"}, seconds:45},
      result:(score)=>score>=8?score+" — toolkit razor-sharp!":null },
    { type:"key-climb", title:"Game 2 · Smooth Minor Climb",
      intro:"Play the smooth progression chord by chord: i, iv⁶₄, V⁶₅, i!",
      miaIntro:"Feel the A→G♯→A magnet! \u{1FA9C}",
      spec:{seq:[57,60,64, 57,62,65, 56,59,62,64, 57,60,64],
        names:["A (i: bass)","C","E","A (iv⁶₄: same bass!)","D","F","G♯ (V⁶₅: leading tone!)","B","D","E","A (home)","C","E"],
        start:56, octaves:2, title:"i → iv⁶₄ → V⁶₅ → i in A minor"},
      result:(score)=>score!==null?"You PLAYED the minor glide!":null },
    { type:"symbol-hunt", title:"Game 3 · Minor Progression Spotter",
      intro:"The four chords of the smooth minor progression — click what's called!",
      miaIntro:"Know your minor cast! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"i (A-C-E)", spec:{clef:"treble",notes:[{p:"A3",d:"w"},{p:"C4",d:"w",chord:true},{p:"E4",d:"w",chord:true}],width:150}},
        {label:"iv⁶₄ (A-D-F)", spec:{clef:"treble",notes:[{p:"A3",d:"w"},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true}],width:150}},
        {label:"V⁶₅ (G♯-B-D-E)", spec:{clef:"treble",notes:[{p:"G#3",d:"w"},{p:"B3",d:"w",chord:true},{p:"D4",d:"w",chord:true},{p:"E4",d:"w",chord:true}],width:150}},
        {label:"V⁶ (G♯-B-E)", spec:{clef:"treble",notes:[{p:"G#3",d:"w"},{p:"B3",d:"w",chord:true},{p:"E4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Cast memorized — minor-key director!":null },
    { type:"term-race", title:"Game 4 · Minor-Progression Race",
      intro:"The smoothing recipe, the bass line, the anchors — at speed!",
      miaIntro:"A-A-A-G♯-A forever! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Smooth minor formula","i → iv⁶₄ → i → V⁶(₅) → i"],
        ["The smooth bass line","A - A - A - G♯ - A"],
        ["iv⁶₄","iv with its 5th (the tonic!) in the bass"],
        ["V⁶₅ in minor","V7 with the leading tone in the bass"],
        ["Common tone of i and iv","A"],
        ["Common tone of i and V","E"],
        ["Root of a flipped triad","top of the 4th"],
        ["Root of a flipped V7","top of the 2nd"]]},
      result:(score)=>score>=6?"The minor glide is second nature!":null }
  ],
  practiceIntro:"20 practice questions — the recipe, the anchors and the bass. Answer right and the next appears automatically!",
  practice:[
    { gen:"inversion-id", params:{subject:"both", ask:"both"}, count:5 },
    { gen:"term-match", params:{subject:"term", pool:[["i iv V in minor","they hold the whole harmonic minor scale"],["iv⁶₄","bass stays on the tonic"],["V⁶₅","leading tone in the bass"],["Common tone","the note two chords share"],["Smooth bass in A minor","A-A-A-G♯-A"]], reverse:true}, count:4 },
    { type:"mc", q:"Why can i, iv and V accompany most minor melodies?", choices:["They contain all the notes of the harmonic minor scale","They are the loudest chords","They avoid the leading tone"], answer:0,
      explain:"Every scale note lives in one of the three (AEMT3 p.97)." },
    { type:"mc", q:"To smooth the iv chord, the book moves which note down an octave?", choices:["its 5th (A)","its root (D)","its 3rd (F)"], answer:0,
      explain:"The 5th of iv IS the tonic — perfect bass material." },
    { type:"mc", q:"To smooth V7, which notes drop an octave?", choices:["the 3rd, 5th and 7th","only the root","only the 7th"], answer:0,
      explain:"E-G♯-B-D → G♯-B-D-E = V⁶₅." },
    { type:"mc", q:"The bass line of i → iv⁶₄ → i → V⁶₅ → i in A minor is…", choices:["A-A-A-G♯-A","A-D-A-E-A","A-C-E-G♯-A"], answer:0,
      explain:"Two anchors and one leading-tone slide." },
    { type:"mc", q:"The common tone between i and V in A minor is…", choices:["E","A","G♯"], answer:0,
      explain:"i's 5th = V's root." },
    { type:"truefalse", q:"V7 is often used in place of V in minor progressions.", answer:true,
      explain:"Same swap as in major keys." },
    { type:"truefalse", q:"All-root-position minor progressions sound smoother than inverted ones.", answer:false,
      explain:"Root-only = leaping bass = choppy." },
    { type:"truefalse", q:"In close position, a flipped triad's root is the upper note of the 4th.", answer:true,
      explain:"The book repeats the reminder here for good reason." },
    { type:"truefalse", q:"In close position, a flipped V7's root is the upper note of the 2nd.", answer:true,
      explain:"Find the crunch pair, take its top." },
    { type:"mc", q:"In D minor, the smooth bass line of i → iv⁶₄ → i → V⁶₅ → i would be…", choices:["D-D-D-C♯-D","D-G-D-A-D","D-F-A-C♯-D"], answer:0,
      explain:"Same shape, new tonic: the leading tone is C♯." }
  ],
  miaQuizIntro:"Quiz! Anchors hold, leading tone slides — the whole lesson in one bass line.",
  quiz:[
    { type:"mc", q:"The i, iv and V triads can accompany most simple minor melodies because…", choices:["they contain all the notes of the harmonic minor scale","minor melodies use only three notes","they never need inversions"], answer:0,
      explain:"Seven letters, three chords, full coverage.", hint:"Same argument as Lesson 55, minor edition." },
    { type:"mc", q:"To make a minor progression smoother, the iv chord often moves to…", choices:["2nd inversion (iv⁶₄)","3rd inversion","open position"], answer:0,
      explain:"Its 5th — the tonic A — drops to the bass.", hint:"Which inversion parks the tonic in the bass?" },
    { type:"mc", q:"…and the V or V7 chord moves to…", choices:["1st inversion (V⁶ or V⁶₅)","2nd inversion","root position"], answer:0,
      explain:"The 3rd (the leading tone!) takes the bass.", hint:"G♯ under everything." },
    { type:"mc", q:"In A minor's V⁶₅ (G♯-B-D-E), the bass note G♯ is special because…", choices:["it's the leading tone — a half step below the tonic","it's the loudest note","it's the chord's root"], answer:0,
      explain:"The bass itself leans into A.", hint:"What's a half step above G♯?" },
    { type:"truefalse", q:"There is a common tone between each pair of neighboring chords in the smooth progression.", answer:true,
      explain:"The book prints exactly this observation.", hint:"The anchors you found in the finder." },
    { type:"truefalse", q:"The common tone between i and iv in A minor is E.", answer:false,
      explain:"It's A (i's root, iv's 5th). E connects i and V.", hint:"Spell both chords." },
    { type:"mc", q:"Identify this chord in A minor.",
      staff:{clef:"treble",notes:[{p:"A3",d:"w"},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true}],width:200},
      choices:["iv⁶₄ — D minor with A in the bass","iv in root position","i with a wrong note"], answer:0,
      explain:"D-F-A flipped so the tonic anchors the bass.", hint:"Restack in 3rds: D-F-A." },
    { type:"mc", q:"Identify this chord in A minor.",
      staff:{clef:"treble",notes:[{p:"G#3",d:"w"},{p:"B3",d:"w",chord:true},{p:"D4",d:"w",chord:true},{p:"E4",d:"w",chord:true}],width:200},
      choices:["V⁶₅ — E7 with G♯ in the bass","V7 in root position","vii°"], answer:0,
      explain:"Four notes, 2nd on top (D-E) → root E → E7, 1st inversion.", hint:"Crunch pair D-E; root on top." },
    { type:"mc", q:"The smooth minor progression's bass line is…", choices:["A - A - A - G♯ - A","A - D - A - E - A","A - B - C - D - E"], answer:0,
      explain:"Hold, hold, hold, lean, resolve.", hint:"Almost nothing moves." },
    { type:"mc", q:"Compared with the major version (Lesson 55), the minor smooth progression…", choices:["uses the same recipe — only the qualities and the leading tone change","requires completely different inversions","cannot use V7"], answer:0,
      explain:"iv⁶₄ ↔ IV⁶₄, V⁶₅ ↔ V⁶₅ — one grammar, two moods.", hint:"Compare the two formulas side by side." },
    { type:"mc", q:"A student writes i → iv → i → V7 → i all in root position and complains it sounds jumpy. Your one-sentence fix?", choices:["Flip iv to iv⁶₄ and V7 to V⁶₅ so the bass stays near the tonic","Play it faster","Remove the V7"], answer:0,
      explain:"The whole lesson in one sentence.", hint:"Two flips, one glide." },
    { type:"mc", q:"In E minor, the V⁶₅ chord's bass note would be…", choices:["D♯ (the leading tone of E minor)","B","D"], answer:0,
      explain:"V7 = B-D♯-F♯-A; 1st inversion puts D♯ in the bass.", hint:"Half step below the tonic E." },
    /* generated */
    { gen:"inversion-id", params:{subject:"both", ask:"both"}, count:4 },
    { gen:"term-match", params:{subject:"term", pool:[["iv⁶₄","tonic in the bass"],["V⁶₅","leading tone in the bass"],["Common tone","the joint's anchor"],["A-A-A-G♯-A","the smooth minor bass"]], reverse:true}, count:2 },
    { gen:"triad-quality", params:{}, count:2 }
  ],
  vocabulary:[
    {term:"Minor Chord Progression", def:"i, iv and V(7) in motion — three chords that hold the entire harmonic minor scale."},
    {term:"iv⁶₄", def:"The iv chord in 2nd inversion — its 5th (the TONIC note) in the bass.",
      staff:{clef:"treble",notes:[{p:"A3",d:"w"},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true}],width:130}},
    {term:"V⁶₅ (minor key)", def:"V7 in 1st inversion — the LEADING TONE in the bass, a half step under home.",
      staff:{clef:"treble",notes:[{p:"G#3",d:"w"},{p:"B3",d:"w",chord:true},{p:"D4",d:"w",chord:true},{p:"E4",d:"w",chord:true}],width:130}},
    {term:"The Smooth Bass", def:"A - A - A - G♯ - A: two anchors and one half-step lean — the sound of good minor voice leading."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>i, iv, V(7)</b> hold every note of the harmonic minor scale → they accompany minor melodies.",
    "✔ Smoothing recipe: <b>iv → iv⁶₄</b> (5th = tonic drops to the bass), <b>V(7) → V⁶(₅)</b> (leading tone takes the bass).",
    "✔ The formula: <b>i → iv⁶₄ → i → V⁶(₅) → i</b>, bass <b>A-A-A-G♯-A</b>.",
    "✔ A <b>common tone</b> anchors every joint (A between i/iv, E between i/V).",
    "✔ Root-finders still work: triads — <b>top of the 4th</b>; sevenths — <b>top of the 2nd</b>."
  ],
  tips:[
    "Transpose the glide: in E minor the bass is E-E-E-D♯-E; in D minor, D-D-D-C♯-D. One shape, every minor key.",
    "That A→G♯→A bass is the DNA of countless laments, tangos and film scores — once you hear it, you'll hear it everywhere.",
    "Arranger's checklist: (1) common tone stays, (2) bass moves a half step at most, (3) everything else takes the nearest path.",
    "Next lesson we leave major/minor entirely: eight-note scales with GREEK names — the modes!"
  ],
  rewards:{ badge:"Minor Glide Pilot", icon:"\u{1F32B}\u{FE0F}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"PERFECT! Your minor progressions breathe like a cellist's bow. \u{1F32B}\u{FE0F}\u{1F389}",
  miaPass:"Passed! The A-G♯-A magnet is in your hands now. Greek scales next…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Both versions were i-iv-V7-i in A minor. Version B flipped iv and V7 so the bass walked A-A-G♯-A instead of leaping A-D-E-A.",
      play:()=>{const B=[[45,60,64,69],[45,62,65,69],[44,64,68,71],[45,60,64,69]];B.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,1.0,i*1.0,.27)));} },
    learn:{ label:"minor progressions",
      explain:"i-iv-V(7) cover the harmonic minor scale. Smooth them: iv⁶₄ keeps the tonic bass; V⁶₅ puts the leading tone under everything. Bass: A-A-A-G♯-A.",
      hint:"Anchors hold; the leading tone leans.",
      play:()=>{[[45,60,64,69],[45,62,65,69],[45,60,64,69],[44,64,68,71,74],[45,60,64,69]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,1.0,i*1.0,.25)));} },
    example:{ label:"the examples",
      explain:"Example 1 is the leaping root-position version; example 2 is the book's smooth rewrite with the whispering bass." },
    game:{ label:"the games",
      explain:"Sprint the toolkit, play the smooth climb, spot the minor cast, then race the recipe.",
      hint:"G♯ under a chord = V⁶₅ nearby." },
    quiz:{ label:"this question",
      explain:"Same grammar as major: common tones stay put, inversions shorten the bass's journey — plus one minor-only star, the leading tone in the bass.",
      play:()=>{[[45,60,64,69],[44,64,68,71,74],[45,60,64,69]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,1.0,i*1.0,.27)));} }
  }
};
