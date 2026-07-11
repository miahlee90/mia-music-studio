/* Lesson 105 — The Neapolitan Chord (Book 4, Unit 26 — SELF-AUTHORED)
   Core: ♭II — a MAJOR triad on the lowered 2nd degree; usually FIRST
   INVERSION (N6); PREDOMINANT function → V; darkest in minor keys.
   NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[105]={
  welcome:"The Neapolitan: a major chord from the flat side. \u{1F30B}",
  hook:{
    say:"<b>In A minor, a B♭ MAJOR chord appears</b> — one half step above the tonic — then pushes to V. \u{1F447} <b>Listen. How does it feel?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ i → N6 → V → i</button></div>
          <div class="choices hk-ch" style="display:none"><button>Dark and dramatic — then it drives to V</button><button>Like plain major throughout</button><button>Silent</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ [[57,60,64],[50,58,65],[52,56,59],[57,60,64]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.85,i*.9,.27))); setTimeout(()=>ch.style.display="",4*900+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ B♭-D-F in A minor — the NEAPOLITAN (♭II), a chromatic predominant with a dark glow, driving into V. Today's lesson!");
          else fb(false,"That B♭ chord doesn't belong to A minor's diatonic set — hear its shadow, then its push…");
        });
      } }
  },
  objectives:[
    "Build the Neapolitan: a MAJOR triad on ♭2 (B♭-D-F in A minor)",
    "Use it in FIRST INVERSION: N6 (the 4th scale degree in the bass)",
    "Assign its function: PREDOMINANT → V",
    "Voice-lead ♭2 down toward the leading tone",
    "Know its home: minor keys (borrowed into major)",
    "Recognize N6 by ear and by eye"
  ],
  steps:[
    { say:"<b>The Neapolitan (♭II):</b> a <b>major triad built on the LOWERED 2nd degree</b>. In A minor: <b>B♭-D-F</b>. Chromatic (B♭ is outside the key's signature), dark, unmistakable. \u{1F447} <b>The Neapolitan's quality is…</b>",
      try:{ type:"mc", choices:["Major — despite its dark effect","Minor","Diminished"], answer:0,
        success:"✓ A MAJOR triad on a flattened root — brightness in shadow.",
        fail:"Spell B♭-D-F…",
        hint:"M3 + m3." } },
    { say:"<b>First Inversion — N6:</b> the Neapolitan almost always appears in <b>first inversion</b>, its 3rd (the key's <b>4th degree</b>) in the bass — so the bass stays diatonic while the harmony glows chromatic. \u{1F447} <b>In A minor, N6's bass note is…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:72,notes:[
        {p:"D4",d:"w",label:"N6: D in the bass"},{p:"F4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true},{bar:"final"}],width:300} },
      try:{ type:"mc", choices:["D — the 4th degree","B♭","A"], answer:0,
        success:"✓ D under B♭-D-F: chromatic color over a diatonic bass.",
        fail:"The 3rd of B♭-D-F is…",
        hint:"First inversion = 3rd in the bass." } },
    { say:"<b>Function:</b> the Neapolitan is a <b>PREDOMINANT</b> — it replaces ii° or iv and drives to <b>V</b> (often through a cadential pattern). N6 → V → i is its signature route. \u{1F447} <b>N6 leads to…</b>",
      try:{ type:"mc", choices:["V — like every predominant","I directly","Nowhere"], answer:0,
        success:"✓ The gold-column job (L86), in chromatic dress.",
        fail:"Which function precedes the dominant?",
        hint:"PD → D." } },
    { say:"<b>Voice Leading:</b> the chromatic note <b>♭2 falls</b> — down toward the <b>leading tone</b> (a diminished 3rd apart!) or through the tonic. B♭ → G♯ in A minor is the chord's most dramatic move. \u{1F447} <b>♭2 usually resolves…</b>",
      try:{ type:"mc", choices:["Down toward the leading tone","Up an octave","It never moves"], answer:0,
        success:"✓ B♭ falls to G♯ (via or across A) — the dark-to-tense signature.",
        fail:"Flat notes fall…",
        hint:"Toward V's leading tone." } },
    { say:"<b>Where It Lives:</b> native to <b>minor keys</b> (where ♭6 supports it); borrowed into major for shadow. <b>Remember: N = major triad on ♭2, in first inversion, predominant to V.</b> \u{1F447} <b>The Neapolitan sounds most at home in…</b>",
      try:{ type:"mc", choices:["Minor keys","Whole-tone music","Percussion parts"], answer:0,
        success:"✓ Minor's flat colors welcome it; major borrows it for drama.",
        fail:"Which mode already owns flat colors?",
        hint:"The darker mode." } },
    { say:"<b>Review:</b> \u{1F447} <b>Build the Neapolitan of E minor.</b>",
      try:{ type:"mc", choices:["F major (F-A-C)","F♯ major","B major"], answer:0,
        success:"✓ ♭2 of E is F♮ — F major, usually as N6 with A in the bass.",
        fail:"Lower E minor's 2nd degree (F♯ → F)…",
        hint:"A half step above E." } }
  ],
  examples:[
    { caption:"The signature route in A minor: i → N6 → V → i. The B♭ glows dark over the diatonic D bass, then drives home.",
      staff:{clef:"treble",tempo:72,notes:[
        {p:"A3",d:"h",label:"i"},{p:"C4",d:"h",chord:true},{p:"E4",d:"h",chord:true},
        {p:"D4",d:"h",label:"N6"},{p:"F4",d:"h",chord:true},{p:"Bb4",d:"h",chord:true},
        {p:"E4",d:"h",label:"V"},{p:"G#4",d:"h",chord:true},{p:"B4",d:"h",chord:true},
        {p:"A3",d:"w",label:"i"},{p:"C4",d:"w",chord:true},{p:"E4",d:"w",chord:true},{bar:"final"}],width:560},
      kb:{start:45,octaves:2,labels:true} },
    { caption:"The dramatic melodic move: ♭2 (B♭) falling to the leading tone (G♯) — a diminished 3rd, the Neapolitan's darkest step.",
      staff:{clef:"treble",tempo:76,notes:[
        {p:"Bb4",d:"h",label:"\u{266D}2"},{p:"A4",d:"q",label:"(tonic)"},{p:"G#4",d:"h",label:"leading tone"},{p:"A4",d:"w",label:"home"},{bar:"final"}],width:440},
      kb:{start:55,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Neapolitan Sprint (45s)",
      intro:"Spelling, inversion, function — race them!",
      miaIntro:"Flat two, major three! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["The Neapolitan","a major triad on \u{266D}2"],
        ["In A minor","B\u{266D}-D-F"],
        ["Usual position","first inversion (N6)"],
        ["N6's bass note","the 4th scale degree"],
        ["Function","predominant \u{2192} V"],
        ["\u{266D}2 resolves","down toward the leading tone"],
        ["Native mode","minor"],
        ["N of E minor","F major"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — Neapolitan mastered!":null },
    { type:"key-climb", title:"Game 2 · Walk the Route",
      intro:"Play the N6 route's bass: A, D, E, A!",
      miaIntro:"i, N6, V, i! \u{1FA9C}",
      spec:{seq:[57,50,52,45],
        names:["A (i)","D (N6's bass)","E (V)","A (home)"],
        start:45, octaves:2, title:"The Neapolitan cadence bass"},
      result:(score)=>score!==null?"Route walked!":null },
    { type:"symbol-hunt", title:"Game 3 · Spot the Neapolitan",
      intro:"Chords in A minor — click what each round names!",
      miaIntro:"Find the B♭! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"N6 (D-F-B♭)", spec:{clef:"treble",notes:[{p:"D4",d:"w"},{p:"F4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true}],width:150}},
        {label:"iv (D-F-A)", spec:{clef:"treble",notes:[{p:"D4",d:"w"},{p:"F4",d:"w",chord:true},{p:"A4",d:"w",chord:true}],width:150}},
        {label:"ii° (B-D-F)", spec:{clef:"treble",notes:[{p:"B3",d:"w"},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true}],width:150}},
        {label:"V (E-G♯-B)", spec:{clef:"treble",notes:[{p:"E4",d:"w"},{p:"G#4",d:"w",chord:true},{p:"B4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"The flat-side chord, spotted!":null },
    { type:"term-race", title:"Game 4 · Build the N Race",
      intro:"Name each key's Neapolitan — at speed!",
      miaIntro:"Half step up, made major! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["N of A minor","B\u{266D} major"],
        ["N of E minor","F major"],
        ["N of D minor","E\u{266D} major"],
        ["N of B minor","C major"],
        ["N of C minor","D\u{266D} major"],
        ["N replaces","ii\u{00B0} or iv"],
        ["N6's figure","6 (first inversion)"],
        ["After N6 comes","V"]]},
      result:(score)=>score>=6?"Neapolitans in every key!":null }
  ],
  practiceIntro:"20 practice questions — spelling, function and the route. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["\u{266D}II","the Neapolitan"],["N6","first inversion"],["Function","predominant"],["Target","V"],["Native mode","minor"]], reverse:true}, count:6 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 },
    { type:"mc", q:"The Neapolitan is built on…", choices:["the lowered 2nd degree","the raised 4th","the 7th"], answer:0, explain:"♭2, made major." },
    { type:"mc", q:"In A minor, the Neapolitan is…", choices:["B♭ major","B major","G♯ diminished"], answer:0, explain:"B♭-D-F." },
    { type:"mc", q:"N6 means the Neapolitan in…", choices:["first inversion","root position","third inversion"], answer:0, explain:"3rd (degree 4) in the bass." },
    { type:"mc", q:"The Neapolitan's function is…", choices:["predominant","dominant","tonic"], answer:0, explain:"It drives to V." },
    { type:"truefalse", q:"The Neapolitan is a minor triad.", answer:false, explain:"MAJOR — that is its surprise." },
    { type:"truefalse", q:"♭2 typically falls toward the leading tone.", answer:true, explain:"B♭ → (A) → G♯." },
    { type:"truefalse", q:"The Neapolitan is native to minor keys.", answer:true, explain:"Borrowed into major for shadow." },
    { gen:"term-match", params:{subject:"term", pool:[["N of D minor","E\u{266D}"],["N of E minor","F"],["N replaces","iv/ii\u{00B0}"],["N6 bass","degree 4"]], reverse:true}, count:3 },
    { gen:"inversion-id", params:{subject:"triad", ask:"position"}, count:2 }
  ],
  vocabulary:[
    {term:"Neapolitan Chord (♭II)", def:"A major triad on the lowered 2nd degree — B♭-D-F in A minor. Chromatic, dark, dramatic."},
    {term:"N6", def:"The Neapolitan in first inversion — the key's 4th degree in the bass; its standard position."},
    {term:"Predominant Function", def:"N replaces ii°/iv and drives to V: the route i → N6 → V → i."},
    {term:"The ♭2 Resolution", def:"The chromatic ♭2 falls toward the leading tone — a diminished 3rd of pure drama."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>♭II</b>: a MAJOR triad on the lowered 2nd — B♭-D-F in A minor.",
    "✔ Standard dress: <b>N6</b> (first inversion, degree 4 in the bass).",
    "✔ Function: <b>predominant → V</b> (replacing ii°/iv).",
    "✔ Voice leading: <b>♭2 falls</b> toward the leading tone.",
    "✔ Native to minor; borrowed into major for shadow."
  ],
  tips:[
    "Fastest spell: go a half step above the tonic, build major, then flip to first inversion.",
    "The N6 → V move often passes through a cadential I6/4 — listen for it in real scores.",
    "Film composers use N for instant menace — listen for the flat-two glow under villains.",
    "Next lesson: three chromatic chords named after countries — the augmented sixths."
  ],
  rewards:{ badge:"Flat-Side Voyager", icon:"\u{1F30B}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Flat two, major quality, first inversion, to V.",
  quiz:[
    { type:"mc", q:"The Neapolitan chord is a…", choices:["major triad on ♭2","minor triad on 2","diminished triad on 7"], answer:0, explain:"Major on the lowered second.", hint:"The surprise quality." },
    { type:"mc", q:"In A minor the Neapolitan is spelled…", choices:["B♭-D-F","B-D-F","B♭-D♭-F"], answer:0, explain:"♭2 made major.", hint:"Half step above A." },
    { type:"mc", q:"Why 'N6'?", choices:["It appears in first inversion","It has six notes","It lasts six beats"], answer:0, explain:"Figure 6 = 1st inversion.", hint:"L51's figures." },
    { type:"mc", q:"N6's bass note in A minor is…", choices:["D","B♭","F"], answer:0, explain:"The chord's 3rd = degree 4.", hint:"Diatonic bass." },
    { type:"mc", q:"The Neapolitan functions as a…", choices:["predominant","dominant","tonic substitute"], answer:0, explain:"Gold column, chromatic dress.", hint:"Before V." },
    { type:"mc", q:"The signature route is…", choices:["i → N6 → V → i","i → N6 → IV","N6 → i directly"], answer:0, explain:"PD to D to T.", hint:"Through the dominant." },
    { type:"mc", q:"♭2 resolves…", choices:["down toward the leading tone","up to 3","nowhere"], answer:0, explain:"B♭ falls to G♯ (via A).", hint:"A diminished 3rd." },
    { type:"mc", q:"Identify (key: A minor).",
      staff:{clef:"treble",notes:[{p:"D4",d:"w"},{p:"F4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true}],width:160},
      choices:["N6","iv","ii°"], answer:0, explain:"D-F-B♭ = B♭ major, 1st inversion.", hint:"Find the B♭." },
    { type:"truefalse", q:"The Neapolitan belongs to the key's diatonic chords.", answer:false, explain:"Chromatic — ♭2 is outside.", hint:"The borrowed glow." },
    { type:"truefalse", q:"The Neapolitan replaces ii° or iv.", answer:true, explain:"Same slot, darker color.", hint:"PD substitutes." },
    { type:"mc", q:"The Neapolitan of D minor is…", choices:["E♭ major","E major","F major"], answer:0, explain:"♭2 of D = E♭.", hint:"Half step above D." },
    { type:"mc", q:"Major keys use the Neapolitan…", choices:["as a borrowed dramatic color","never","as their tonic"], answer:0, explain:"Imported shadow.", hint:"Borrowing." }
  ],
  miaPerfect:"PERFECT! The flat side answers to you. \u{1F30B}\u{1F389}",
  miaPass:"Passed! ♭II glows on command. Next: the augmented sixths…",
  mia:{
    hook:{ label:"the welcome",
      explain:"B♭ major in A minor — the Neapolitan (♭II): chromatic predominant, driving into V.",
      play:()=>{[[57,60,64],[50,58,65],[52,56,59],[57,60,64]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.85,.27)));} },
    learn:{ label:"the Neapolitan",
      explain:"Major triad on ♭2, standard in first inversion (N6, degree-4 bass), predominant to V; ♭2 falls toward the leading tone.",
      hint:"Half step up, made major.",
      play:()=>{[50,58,65].forEach(m=>MFAudio.tone(m,.9,.05,.28));[52,56,59].forEach(m=>MFAudio.tone(m,1.0,1.0,.28));} },
    example:{ label:"the examples",
      explain:"Example 1 runs the full i-N6-V-i route; example 2 isolates ♭2 falling to the leading tone." },
    game:{ label:"the games",
      explain:"Sprint the facts, walk the bass route, spot N6 among lookalikes, then build Neapolitans across keys.",
      hint:"D-F-B♭ vs D-F-A: one half step." },
    quiz:{ label:"this question",
      explain:"Three checks: lowered 2nd as root? major quality? first inversion heading to V? Then it is the Neapolitan.",
      play:()=>{[50,58,65].forEach(m=>MFAudio.tone(m,.9,.05,.28));} }
  }
};
