/* Lesson 68 — Harmonizing a Melody in a Minor Key (AEMT Book 3, Unit 17)
   Built from drafts/UNIT 17 – Lesson 68.md; AEMT3 p.108 verified by render.
   Core: same method as major — i, iv, V(7) hold every note of the HARMONIC
   minor scale. The minor chart: degrees 1,3,5 → i · 2,4,5,7 → V(7) ·
   1,4,6 → iv. Ear decides ties; begin/end with i; V(7) precedes the last
   chord. Model: A harmonic minor scale harmonized i-V-i-iv-i-iv-V-i.
   NOTE: edit by FULL-FILE REWRITE only. */

/* harmonize A harmonic minor, degree by degree */
function MF_L68_harm(container,fb){
  const STEPS=[
    {deg:1, note:"A4", ok:["i","iv"], why:"Degree 1 lives in i (root) and iv (5th) — most minor harmonizations BEGIN with i."},
    {deg:2, note:"B4", ok:["V7"], why:"Degree 2 (B) belongs only to V — its 5th."},
    {deg:3, note:"C5", ok:["i"], why:"Degree 3 (C) is the 3rd of i — the note that makes the key MINOR."},
    {deg:4, note:"D5", ok:["iv","V7"], why:"Degree 4 fits iv (root) or V7 (7th) — the book's model picks iv here."},
    {deg:5, note:"E5", ok:["i","V7"], why:"Degree 5 fits i (5th) or V (root) — the flexible one, in minor too."},
    {deg:6, note:"F5", ok:["iv"], why:"Degree 6 (F) belongs only to iv — its 3rd."},
    {deg:7, note:"G#5", ok:["V7"], why:"The RAISED 7th (G♯) is V's major 3rd — the harmonic minor at work!"},
    {deg:8, note:"A5", ok:["i"], why:"End on i — home, with V(7) just before."}];
  const CH={i:[57,60,64], iv:[57,62,65], V7:[56,59,62,64]};
  let k=0; const picked=[];
  container.innerHTML=`<div class="big-q l68h-q" style="text-align:center"></div>
    <div class="l68h-staff"></div>
    <div class="choices chips l68h-ch"><button>i</button><button>iv</button><button>V7</button></div>
    <div style="text-align:center"><button class="play l68h-play" style="display:none">▶ Play your harmonized minor scale</button></div>`;
  const q=container.querySelector(".l68h-q"), holder=container.querySelector(".l68h-staff"), ch=container.querySelector(".l68h-ch"), pl=container.querySelector(".l68h-play");
  function draw(){
    Staff.render(holder,{clef:"treble",notes:STEPS.map((s,i)=>({p:s.note,d:"q",label:i<picked.length?picked[i]:String(s.deg)})),width:560});
  }
  function ask(){
    draw();
    if(k>=STEPS.length){ q.textContent="The whole A harmonic minor scale, harmonized — the book's model, rebuilt by you!"; ch.style.display="none"; pl.style.display="inline-block"; return; }
    q.innerHTML=`Melody note ${k+1} of 8 — scale degree <b>${STEPS[k].deg}</b>${STEPS[k].deg===7?" (raised!)":""}. Which chord? <i>(Minor chart: 1,3,5→i · 2,4,5,7→V7 · 1,4,6→iv)</i>`;
  }
  [...ch.children].forEach(b=>b.onclick=()=>{
    const S=STEPS[k]; if(!S) return;
    if(S.ok.includes(b.textContent)){
      MFAudio.tone(MFAudio.midi(S.note),.8,.05,.42);
      CH[b.textContent].forEach(m=>MFAudio.tone(m,.9,.05,.25));
      picked.push(b.textContent); k++;
      fb(true,`✓ ${S.why}`);
      setTimeout(ask,1200);
    } else { MFAudio.tone(40,.2); fb(false,`Degree ${S.deg} isn't in that chord — spell i (A-C-E), iv (D-F-A) and V7 (E-G♯-B-D) and look again.`); }
  });
  pl.onclick=()=>{
    STEPS.forEach((s,i)=>{
      MFAudio.tone(MFAudio.midi(s.note),.55,i*.62,.42);
      CH[picked[i]].forEach(m=>MFAudio.tone(m,.58,i*.62,.2));
    });
    setTimeout(()=>fb(true,"✓ A complete minor-key harmonization — hear the E major glow under the raised 7th."),5300);
  };
  ask();
}

LESSON_CONTENT[68]={
  welcome:"Unit 17! Everything you learned about harmonizing… now under moonlight. \u{1F319}",
  hook:{
    say:"A minor melody, dressed two ways: once with the MINOR chart, once with chords borrowed carelessly from C major. <b>Which suit fits the moonlight?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Version A</button>
          <button class="play hk-b">▶ Version B</button></div>
          <div class="choices hk-ch" style="display:none"><button>A — i, iv and V7 of A minor, raised 7th included</button><button>B — major chords brighten everything nicely</button></div>`;
        const mel=[69,72,71,68,69];
        const goodCh=[[57,60,64],[57,62,65],[56,59,64],[56,59,64],[57,60,64]];
        const badCh=[[60,64,67],[60,65,69],[59,62,67],[60,64,67],[60,64,67]];
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        const play=(chs)=>mel.forEach((m,i)=>{ MFAudio.tone(m,.6,i*.68,.42); chs[i].forEach(c=>MFAudio.tone(c,.6,i*.68,.2)); });
        container.querySelector(".hk-a").onclick=()=>{ play(goodCh); hA=true; if(hB) setTimeout(()=>ch.style.display="",3800); };
        container.querySelector(".hk-b").onclick=()=>{ play(badCh); hB=true; if(hA) setTimeout(()=>ch.style.display="",3800); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Version A used the MINOR key's own primaries — i, iv, V7 with the raised G♯ meeting the melody. Harmonizing in minor works exactly like major… with the harmonic minor's chart. Today's lesson!");
          else fb(false,"Version B's borrowed chords fought the melody's minor tones. Listen again for the fit…");
        });
      } }
  },
  objectives:[
    "Harmonize minor melodies the same way as major ones",
    "Use the minor chart: 1,3,5 → i · 2,4,5,7 → V(7) · 1,4,6 → iv",
    "Remember: the chart reads the HARMONIC minor scale (raised 7th)",
    "Let the ear break ties (degrees 1, 4, 5)",
    "Begin and end with i; V(7) precedes the last chord",
    "Harmonize the full A harmonic minor scale"
  ],
  steps:[
    { say:"The headline: <b>harmonizing in a minor key is similar to harmonizing in a major key</b> — because <b>i, iv and V(7) contain all the notes of the HARMONIC minor scale</b>. \u{1F447} <b>Which scale form does minor harmonization lean on?</b>",
      try:{ type:"mc", choices:["Harmonic minor — the raised 7th feeds the V chord","Natural minor only","Melodic minor descending"], answer:0,
        success:"✓ The raised 7th (G♯ in A minor) is exactly what makes V major — Lesson 60's whole story, now applied.",
        fail:"Which form gave the V chord its major 3rd?",
        hint:"The 'most used' minor form." } },
    { say:"The minor chart — same shape as Lesson 64's, lowercase where it counts: <b>degrees 1, 3, 5 → i · degrees 2, 4, 5, 7 → V (or V7) · degrees 1, 4, 6 → iv</b>. \u{1F447} <b>Melody note F (degree 6 in A minor) takes…</b>",
      show:{ type:"html", html:`<div style="max-width:380px;margin:0 auto;font-size:15px;line-height:2;background:var(--card,#fff);border:1.5px solid #cdd5e1;border-radius:12px;padding:12px 18px;text-align:center">
        <b>1, 3, 5</b> → i chord<br><b>2, 4, 5, 7</b> → V (or V7) chord<br><b>1, 4, 6</b> → iv chord</div>` },
      try:{ type:"mc", choices:["iv — degree 6's only row","i — it sounds sad enough","V7 — sevens and sixes rhyme"], answer:0,
        success:"✓ F is the 3rd of D-F-A. Same chart logic as major — only the chord qualities changed.",
        fail:"Scan the rows for a 6…",
        hint:"One row only." } },
    { say:"The special resident: melody note <b>G♯ — the raised 7th</b>. It is the <b>3rd of the V chord</b> (E-G♯-B), and NO other primary contains it. \u{1F447} <b>Every raised-7th melody note must be harmonized by…</b>",
      show:{ type:"staff", spec:{clef:"treble",notes:[
        {p:"G#4",d:"h",label:"the melody's ♯7…"},
        {p:"E4",d:"w",label:"…lives in V"},{p:"G#4",d:"w",chord:true},{p:"B4",d:"w",chord:true}],width:400} },
      try:{ type:"mc", choices:["V or V7","iv","i"], answer:0,
        success:"✓ G♯ has exactly one home. When you see the raised 7th in a minor melody, the dominant is already chosen for you.",
        fail:"Spell all three primaries — which contains G♯?",
        hint:"E-G♯-B." } },
    { say:"The familiar habits transfer whole: minor harmonizations <b>usually begin and end with i</b>, and <b>a V (or V7) usually precedes the last chord</b>. \u{1F447} <b>The classic minor ending is…</b>",
      try:{ type:"mc", choices:["V(7) → i","iv → iv","i → V, stopping on V"], answer:0,
        success:"✓ Dominant to tonic — the same handshake, in the minor mode. E(7) → Am closes the book's own model.",
        fail:"Same rule as major, minor spelling…",
        hint:"The pre-final chord rule." } },
    { say:"THE MAIN EVENT: harmonize the entire <b>A harmonic minor scale</b> with the chart. \u{1F447}",
      try:{ type:"custom",
        hint:"i = A-C-E, iv = D-F-A, V7 = E-G♯-B-D. Watch degree 7!",
        mount:(container,fb)=>MF_L68_harm(container,fb) } },
    { say:"Ear-tie check: degree 5 (E) fits <b>i</b> (as its 5th) and <b>V</b> (as its root) — the book's model actually chooses i there. \u{1F447} <b>Who makes the final call on such ties?</b>",
      try:{ type:"mc", choices:["Your ear","The metronome","Always the V chord"], answer:0,
        success:"✓ 'Your ear should always be the final guide' — the book repeats it word for word in the minor chapter.",
        fail:"Same tie-breaker as Lesson 64…",
        hint:"The final guide." } },
    { say:"Transfer: harmonizing in <b>E minor</b> (the exercise key!). \u{1F447} <b>Its three chord spellings are…</b>",
      try:{ type:"mc", choices:["Em (E-G-B), Am (A-C-E), B7 (B-D♯-F♯-A)","Em, Am, Bm — all minor","E, A, B — all major"], answer:0,
        success:"✓ i and iv minor, V7 major with the raised D♯. The chart rides along to every minor key.",
        fail:"Raise E minor's 7th (D→D♯) and build V on B…",
        hint:"i, iv minor; V7 major with ♯7 inside." } }
  ],
  examples:[
    { caption:"The book's model: the A harmonic minor scale harmonized with only i, iv and V(7) — i, V, i, iv, i, iv, V, i. Hear the E major chords glow under degrees 2 and 7.",
      staff:{clef:"treble",tempo:80,notes:[
        {p:"A4",d:"q",label:"i"},{p:"B4",d:"q",label:"V7"},{p:"C5",d:"q",label:"i"},{p:"D5",d:"q",label:"iv"},
        {p:"E5",d:"q",label:"i"},{p:"F5",d:"q",label:"iv"},{p:"G#5",d:"q",label:"V7"},{p:"A5",d:"q",label:"i"},{bar:"final"}],width:560},
      kb:{start:56,octaves:3,labels:true} },
    { caption:"The minor cadence, isolated: iv → V7 → i. The same closing handshake as major — with the leading tone G♯ pulling the door shut.",
      staff:{clef:"treble",tempo:80,notes:[
        {p:"D4",d:"h",label:"iv"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"E4",d:"h",label:"V7"},{p:"G#4",d:"h",chord:true},{p:"D5",d:"h",chord:true},
        {p:"A3",d:"w",label:"i"},{p:"C4",d:"w",chord:true},{p:"E4",d:"w",chord:true},{bar:"final"}],width:480},
      kb:{start:56,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Minor-Chart Sprint (45s)",
      intro:"Scale degrees in minor — name their chords at speed!",
      miaIntro:"Same rows, minor mood! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Degree 3 (minor)","the i chord (only)"],
        ["Degree 6 (minor)","the iv chord (only)"],
        ["Degree 2 (minor)","the V(7) chord (only)"],
        ["Raised degree 7","the V(7) chord (only)"],
        ["Degree 1 (minor)","i or iv — ear decides"],
        ["Degree 5 (minor)","i or V — ear decides"],
        ["Degree 4 (minor)","iv or V7 — ear decides"],
        ["The final minor chord","usually i, preceded by V(7)"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — minor chart mastered!":null },
    { type:"key-climb", title:"Game 2 · Minor Cadence Climb",
      intro:"Play the minor handshake: iv, V7, then home to i — mind the G♯!",
      miaIntro:"The leading tone lives in V! \u{1FA9C}",
      spec:{seq:[62,65,69, 64,68,71,74, 69,72,76],
        names:["D (iv: root)","F","A","E (V7: root)","G♯ — the raised 7th!","B","D (the 7th)","A (i: home)","C","E"],
        start:57, octaves:2, title:"iv → V7 → i in A minor"},
      result:(score)=>score!==null?"The minor cadence is in your hands!":null },
    { type:"symbol-hunt", title:"Game 3 · Which Minor Chord Holds the Note?",
      intro:"A melody note is called — click the A-minor chord that CONTAINS it!",
      miaIntro:"Spell i, iv and V7 first! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"i — holds A, C, E", spec:{clef:"treble",notes:[{p:"A3",d:"w"},{p:"C4",d:"w",chord:true},{p:"E4",d:"w",chord:true}],width:150}},
        {label:"iv — holds D, F, A", spec:{clef:"treble",notes:[{p:"D4",d:"w"},{p:"F4",d:"w",chord:true},{p:"A4",d:"w",chord:true}],width:150}},
        {label:"V7 — holds E, G♯, B, D", spec:{clef:"treble",notes:[{p:"E4",d:"w"},{p:"G#4",d:"w",chord:true},{p:"B4",d:"w",chord:true},{p:"D5",d:"w",chord:true}],width:150}},
        {label:"V — holds E, G♯, B", spec:{clef:"treble",notes:[{p:"E4",d:"w"},{p:"G#4",d:"w",chord:true},{p:"B4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Minor note-to-chord mapping complete!":null },
    { type:"term-race", title:"Game 4 · Minor Harmonizer's Race",
      intro:"The whole minor-harmonizing rulebook — at speed!",
      miaIntro:"Moonlight rulebook! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Minor harmonizing","similar to major — new chart, same method"],
        ["The scale it reads","harmonic minor (raised 7th)"],
        ["i, iv, V(7) together","every note of the harmonic minor scale"],
        ["G♯ in an A-minor melody","must take V or V7"],
        ["First and last chord","usually i"],
        ["Just before the end","V or V7"],
        ["Tie-breaker","the ear, always"],
        ["V7 of E minor","B7 (B-D♯-F♯-A)"]]},
      result:(score)=>score>=6?"Minor rulebook memorized!":null }
  ],
  practiceIntro:"20 practice questions — the minor chart, the G♯ rule and the cadence. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Degree 3","i only"],["Degree 6","iv only"],["Degree 2","V(7) only"],["Raised 7","V(7) only"],["Degree 5","i or V"],["Degree 4","iv or V7"]], reverse:true}, count:6 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 },
    { type:"mc", q:"Harmonizing a melody in a minor key is…", choices:["similar to harmonizing in a major key","completely different","impossible with three chords"], answer:0,
      explain:"The book's opening sentence (AEMT3 p.108)." },
    { type:"mc", q:"The i, iv and V(7) chords contain all the notes of…", choices:["the harmonic minor scale","the natural minor scale","the chromatic scale"], answer:0,
      explain:"The raised 7th is included — via V." },
    { type:"mc", q:"In A minor, melody note C (degree 3) takes…", choices:["the i chord","the iv chord","the V7 chord"], answer:0,
      explain:"C is i's 3rd — its only primary home." },
    { type:"mc", q:"In A minor, melody note F (degree 6) takes…", choices:["the iv chord","the i chord","the V chord"], answer:0,
      explain:"F is iv's 3rd." },
    { type:"mc", q:"In A minor, melody note G♯ takes…", choices:["V or V7","iv","i"], answer:0,
      explain:"The raised 7th is V's 3rd — nowhere else." },
    { type:"mc", q:"Most minor harmonizations begin and end with…", choices:["the i chord","the V chord","the iv chord"], answer:0,
      explain:"Home rules transfer from major." },
    { type:"truefalse", q:"A V or V7 usually precedes the last chord in minor too.", answer:true,
      explain:"The cadence is universal." },
    { type:"truefalse", q:"Degree 5 in minor can be harmonized by i or V.", answer:true,
      explain:"E = i's 5th = V's root; ear decides." },
    { type:"truefalse", q:"The minor chart gives degree 4 to the iv chord only.", answer:false,
      explain:"iv OR V7 (as its 7th) — a tie for the ear." },
    { type:"truefalse", q:"In E minor, the V7 chord contains D♯.", answer:true,
      explain:"B-D♯-F♯-A — the raised 7th of E minor." }
  ],
  miaQuizIntro:"Quiz! Same chart shape, minor spellings — and G♯ always points at V.",
  quiz:[
    { type:"mc", q:"Why can many minor melodies be harmonized with just i, iv and V(7)?", choices:["Those chords contain all the notes of the harmonic minor scale","Minor melodies avoid most notes","The chart forbids other chords"], answer:0,
      explain:"Complete coverage, minor edition.", hint:"Same argument as Lesson 64." },
    { type:"mc", q:"The minor chart assigns degrees 1, 3 and 5 to…", choices:["the i chord","the iv chord","the V7 chord"], answer:0,
      explain:"They are i's own tones.", hint:"Root, 3rd, 5th of the tonic." },
    { type:"mc", q:"Degrees 2, 4, 5 and 7 (raised) go to…", choices:["V (or V7)","i","iv"], answer:0,
      explain:"All four live in E-G♯-B-D.", hint:"The dominant's row." },
    { type:"mc", q:"Degrees 1, 4 and 6 go to…", choices:["iv","i","V7"], answer:0,
      explain:"D-F-A = degrees 4, 6, 1.", hint:"The remaining row." },
    { type:"truefalse", q:"When more than one chord fits, your ear should always be the final guide.", answer:true,
      explain:"Word for word, again.", hint:"The universal tie-breaker." },
    { type:"truefalse", q:"Most minor harmonizations begin and end with a V7 chord.", answer:false,
      explain:"They begin and end with i.", hint:"Where is home in minor?" },
    { type:"mc", q:"A melody in A minor ends …G♯ → A. The final two chords should be…", choices:["V7 → i","iv → i","i → iv"], answer:0,
      explain:"G♯ forces V7; the final A lands on i.", hint:"Who owns G♯?" },
    { type:"mc", q:"Which chord contains melody note D in A minor?", choices:["iv (D-F-A) and V7 (E-G♯-B-D)","only i","none of the primaries"], answer:0,
      explain:"Root of iv, 7th of V7 — an ear tie.", hint:"Two homes." },
    { type:"mc", q:"The raised 7th appears in a minor melody because…", choices:["the harmonization draws on the HARMONIC minor scale","of a printing error","minor keys borrow from Lydian"], answer:0,
      explain:"Harmonic minor is the harmonizer's scale.", hint:"Its very name says so." },
    { type:"mc", q:"In D minor, the V7 chord is spelled…", choices:["A-C♯-E-G","A-C-E-G","D-F♯-A-C"], answer:0,
      explain:"Raise D minor's 7th: C→C♯; build on A.", hint:"The raised 7th sits inside." },
    { type:"mc", q:"In E minor, melody note C (degree 6) takes…", choices:["Am — the iv chord","Em — the i chord","B7 — the V7"], answer:0,
      explain:"Degree 6 → iv; iv of E minor is A-C-E.", hint:"Degrees first, letters second." },
    { type:"mc", q:"The biggest difference between the major and minor harmonizing charts is…", choices:["only the chord QUALITIES — the degree rows are identical","completely different degree rows","minor needs six chords"], answer:0,
      explain:"1,3,5 / 2,4,5,7 / 1,4,6 — same rows, lowercase i and iv.", hint:"Compare them side by side." },
    /* generated */
    { gen:"term-match", params:{subject:"term", pool:[["Degrees 1,3,5","i"],["Degrees 2,4,5,7","V(7)"],["Degrees 1,4,6","iv"],["G♯ in A minor","V's 3rd"]], reverse:true}, count:3 },
    { gen:"rel-key", params:{ask:"both"}, count:2 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:1 }
  ],
  vocabulary:[
    {term:"Minor Harmonizing Chart", def:"Degrees 1,3,5 → i · 2,4,5,7 → V(7) · 1,4,6 → iv — read from the HARMONIC minor scale."},
    {term:"The G♯ Rule", def:"A raised-7th melody note can only be harmonized by V(7) — it is that chord's 3rd.",
      staff:{clef:"treble",notes:[{p:"E4",d:"w"},{p:"G#4",d:"w",chord:true},{p:"B4",d:"w",chord:true}],width:130}},
    {term:"Minor Cadence", def:"iv (or i) → V(7) → i — the same closing handshake as major, in moonlight."},
    {term:"The Ear", def:"Still the final guide whenever two chords fit one melody note."}
  ],
  mistakes:[],
  summary:[
    "✔ Minor harmonizing = <b>major harmonizing with the minor chart</b>: 1,3,5 → i · 2,4,5,7 → V(7) · 1,4,6 → iv.",
    "✔ The chart reads the <b>HARMONIC minor</b> — the raised 7th belongs to V.",
    "✔ <b>G♯-type notes have exactly one chord</b>: V(7).",
    "✔ Begin and end with <b>i</b>; <b>V(7)</b> precedes the final chord.",
    "✔ Ties (degrees 1, 4, 5): <b>the ear decides</b>."
  ],
  tips:[
    "Spot the raised 7th FIRST when harmonizing a minor melody — those notes lock in V, and the rest falls into place around them.",
    "The chart is identical to major's in its rows. Learn ONE chart, own both modes.",
    "Play the harmonized minor scale daily; the i→V7 alternation at the top (F, G♯) is the most minor-sounding move in music.",
    "Next lesson you'll COMPOSE in minor — Pat-A-Pan style."
  ],
  rewards:{ badge:"Moonlight Tailor", icon:"\u{1F319}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"PERFECT! The minor chart obeys you completely. \u{1F319}\u{1F389}",
  miaPass:"Passed! Minor melodies leave your shop well-dressed too. Now compose one…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Version A used A minor's own primaries — i, iv, V7 with the raised G♯. Version B borrowed C major's chords and clashed with the minor melody.",
      play:()=>{const mel=[69,72,71,68,69],chs=[[57,60,64],[57,62,65],[56,59,64],[56,59,64],[57,60,64]];mel.forEach((m,i)=>{MFAudio.tone(m,.6,i*.65,.42);chs[i].forEach(c=>MFAudio.tone(c,.6,i*.65,.2));});} },
    learn:{ label:"minor harmonizing",
      explain:"Same method as major; chart: 1,3,5→i, 2,4,5,7→V(7), 1,4,6→iv, read from harmonic minor. G♯ notes force V. Begin/end on i.",
      hint:"The chord must contain the note — minor edition.",
      play:()=>{[57,60,64].forEach(m=>MFAudio.tone(m,.7,0,.3));[56,59,62,64].forEach(m=>MFAudio.tone(m,.7,.8,.3));[57,60,64,69].forEach(m=>MFAudio.tone(m,1,1.6,.3));} },
    example:{ label:"the examples",
      explain:"Example 1 is the book's harmonized A harmonic minor scale; example 2 isolates the minor cadence iv → V7 → i." },
    game:{ label:"the games",
      explain:"Sprint the minor chart, climb the cadence, match notes to minor chords, then race the rulebook.",
      hint:"i = A-C-E, iv = D-F-A, V7 = E-G♯-B-D." },
    quiz:{ label:"this question",
      explain:"Find the degree, find its row(s), let the ear break ties — and remember the raised 7th belongs to V alone.",
      play:()=>{[64,68,71,74].forEach(m=>MFAudio.tone(m,.8,0,.3));[57,60,64].forEach(m=>MFAudio.tone(m,1,.9,.35));} }
  }
};
