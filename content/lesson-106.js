/* Lesson 106 — Augmented Sixth Chords (Book 4, Unit 26 — SELF-AUTHORED)
   Core: predominants built on ♭6 with the interval of an AUGMENTED 6TH
   (♭6 up to ♯4) that expands OUTWARD to an octave on 5 (the V's root).
   Italian (3 notes), French (adds 2), German (adds ♭3).
   NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[106]={
  welcome:"Augmented sixths: two notes squeezing outward to V. \u{2194}\u{FE0F}",
  hook:{
    say:"<b>Two voices a strange wide 6th apart pull in OPPOSITE directions</b> — and land an octave apart on the dominant. \u{1F447} <b>Listen to the squeeze. Where does it open?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ The squeeze → the octave</button></div>
          <div class="choices hk-ch" style="display:none"><button>Outward to an octave on the DOMINANT</button><button>Inward to a unison</button><button>Nowhere</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ MFAudio.tone(53,.9,.05,.34); MFAudio.tone(63,.9,.05,.34); MFAudio.tone(52,1.1,1.0,.34); MFAudio.tone(64,1.1,1.0,.34); setTimeout(()=>ch.style.display="",2400); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ F and D♯ (an AUGMENTED 6TH) expanded outward to E and E — an octave on V's root. The augmented sixth chords: today's lesson!");
          else fb(false,"The low note fell, the high note rose — outward, into an octave…");
        });
      } }
  },
  objectives:[
    "Build the augmented 6th interval: ♭6 up to ♯4 (F to D♯ in A minor)",
    "Resolve it: both notes expand OUTWARD to the octave on 5",
    "Italian +6: ♭6, 1, ♯4 (three notes)",
    "French +6: adds scale degree 2",
    "German +6: adds ♭3 (and loves the cadential 6/4)",
    "Function: chromatic predominants driving to V"
  ],
  steps:[
    { say:"<b>The Engine Interval:</b> from <b>♭6 up to ♯4</b> — in A minor, F up to D♯ — an <b>augmented 6th</b>: wider than a major 6th, aching to open. \u{1F447} <b>The augmented 6th spans which two degrees?</b>",
      try:{ type:"mc", choices:["♭6 up to ♯4","1 up to 5","2 up to 7"], answer:0,
        success:"✓ The flat-side ♭6 below, the sharp-side ♯4 above — chromatic pincers.",
        fail:"F and D♯ in A minor are degrees…",
        hint:"Both chromatic in major keys." } },
    { say:"<b>The Resolution:</b> both notes move <b>outward by half step</b>: ♭6 falls to 5, ♯4 rises to 5 — an <b>octave on the dominant's root</b>. The chord exists to aim at V. \u{1F447} <b>The augmented 6th resolves to…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:66,notes:[
        {p:"F4",d:"h",label:"\u{266D}6"},{p:"D#5",d:"h",chord:true,label:"\u{266F}4"},
        {p:"E4",d:"w",label:"5"},{p:"E5",d:"w",chord:true,label:"octave!"},{bar:"final"}],width:380} },
      try:{ type:"mc", choices:["An octave on 5 — V's root","A unison on 1","A 3rd on 2"], answer:0,
        success:"✓ Outward expansion into the dominant — the chord's whole purpose.",
        fail:"Where did both voices land?",
        hint:"Both on E." } },
    { say:"<b>Italian +6 (It⁶):</b> the leanest — three notes: <b>♭6, 1, ♯4</b> (F-A-D♯ in A minor). \u{1F447} <b>The Italian sixth contains…</b>",
      try:{ type:"mc", choices:["♭6, 1 and ♯4","♭6 and ♯4 only","Four notes"], answer:0,
        success:"✓ The frame plus the tonic — Italy keeps it simple.",
        fail:"Count F-A-D♯…",
        hint:"Three notes." } },
    { say:"<b>French +6 (Fr⁶):</b> adds <b>scale degree 2</b> — F-A-B-D♯. The added 2 gives it a whole-tone shimmer (four notes of L82's scale!). \u{1F447} <b>The French sixth's extra note is…</b>",
      try:{ type:"mc", choices:["Degree 2 (B in A minor)","Degree ♭3","Degree 7"], answer:0,
        success:"✓ The B adds the Gallic tang — F, A, B, D♯.",
        fail:"F-A-?-D♯…",
        hint:"A whole step above the tonic." } },
    { say:"<b>German +6 (Ger⁶):</b> adds <b>♭3</b> — F-A-C-D♯ (sounds like an F7 chord!). Because its resolution risks parallel 5ths, it usually passes through the <b>cadential 6/4</b> first. <b>Remember: It = 3 notes · Fr = +2 · Ger = +♭3; all resolve outward to V.</b> \u{1F447} <b>The German sixth sounds deceptively like…</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Chord</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Notes (A minor)</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Extra note</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#2F6DA8">Italian +6</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">F-A-D♯</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">—</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#A9821F">French +6</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">F-A-B-D♯</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">degree 2</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#C05A21">German +6</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">F-A-C-D♯</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">degree \u{266D}3</td></tr></table>` },
      try:{ type:"mc", choices:["A dominant seventh chord (F7)","A major scale","A pedal point"], answer:0,
        success:"✓ F-A-C-D♯ ≈ F-A-C-E♭ — enharmonic twins with completely different resolutions.",
        fail:"Respell D♯ as E♭…",
        hint:"F-A-C-E♭ = ?" } },
    { say:"<b>Function & Spotting:</b> all three are <b>chromatic predominants to V</b> (like the Neapolitan, from the other side). Spot them by the <b>♭6 + ♯4 pair</b> aimed at the same note. \u{1F447} <b>Augmented sixths and the Neapolitan share…</b>",
      try:{ type:"mc", choices:["Predominant function — both drive to V","The same notes","Nothing"], answer:0,
        success:"✓ Two chromatic roads, one destination: the dominant.",
        fail:"What comes after each of them?",
        hint:"PD → D." } },
    { say:"<b>Review:</b> \u{1F447} <b>Which +6 chord adds scale degree 2?</b>",
      try:{ type:"mc", choices:["French","Italian","German"], answer:0,
        success:"✓ Fr⁶ = frame + tonic + degree 2.",
        fail:"The whole-tone one…",
        hint:"Adds B in A minor." } }
  ],
  examples:[
    { caption:"Italian sixth resolving in A minor: F-A-D♯ opens outward into E — the octave on V — then V leads home.",
      staff:{clef:"treble",tempo:69,notes:[
        {p:"F4",d:"h",label:"It+6"},{p:"A4",d:"h",chord:true},{p:"D#5",d:"h",chord:true},
        {p:"E4",d:"h",label:"V"},{p:"G#4",d:"h",chord:true},{p:"E5",d:"h",chord:true},
        {p:"A4",d:"w",label:"i"},{p:"C5",d:"w",chord:true},{p:"E5",d:"w",chord:true},{bar:"final"}],width:520},
      kb:{start:52,octaves:2,labels:true} },
    { caption:"The three flavors side by side: Italian (3 notes), French (+2), German (+♭3). One frame, three national colors.",
      staff:{clef:"treble",tempo:66,notes:[
        {p:"F4",d:"h",label:"It"},{p:"A4",d:"h",chord:true},{p:"D#5",d:"h",chord:true},
        {p:"F4",d:"h",label:"Fr"},{p:"A4",d:"h",chord:true},{p:"B4",d:"h",chord:true},{p:"D#5",d:"h",chord:true},
        {p:"F4",d:"h",label:"Ger"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},{p:"D#5",d:"h",chord:true},{bar:"final"}],width:560},
      kb:{start:53,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · +6 Sprint (45s)",
      intro:"Frames, flavors and resolutions — race them!",
      miaIntro:"Outward to the octave! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["The +6 interval","\u{266D}6 up to \u{266F}4"],
        ["Resolution","outward to an octave on 5"],
        ["Italian +6","\u{266D}6, 1, \u{266F}4 (three notes)"],
        ["French +6","adds degree 2"],
        ["German +6","adds \u{266D}3"],
        ["Ger+6 sounds like","a dominant 7th (enharmonic)"],
        ["Function","chromatic predominant to V"],
        ["In A minor the frame is","F up to D\u{266F}"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — three nations conquered!":null },
    { type:"key-climb", title:"Game 2 · Play the Squeeze",
      intro:"Play F, D♯, then both resolutions: E and E!",
      miaIntro:"Open the pincers! \u{1FA9C}",
      spec:{seq:[53,63,52,64],
        names:["F (♭6)","D♯ (♯4)","E (♭6 falls)","E (♯4 rises — octave!)"],
        start:52, octaves:2, title:"The outward resolution"},
      result:(score)=>score!==null?"The squeeze, opened!":null },
    { type:"symbol-hunt", title:"Game 3 · Which Nation?",
      intro:"+6 chords in A minor — click what each round names!",
      miaIntro:"Count the notes, find the extra! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Italian (F-A-D♯)", spec:{clef:"treble",notes:[{p:"F4",d:"w"},{p:"A4",d:"w",chord:true},{p:"D#5",d:"w",chord:true}],width:150}},
        {label:"French (F-A-B-D♯)", spec:{clef:"treble",notes:[{p:"F4",d:"w"},{p:"A4",d:"w",chord:true},{p:"B4",d:"w",chord:true},{p:"D#5",d:"w",chord:true}],width:150}},
        {label:"German (F-A-C-D♯)", spec:{clef:"treble",notes:[{p:"F4",d:"w"},{p:"A4",d:"w",chord:true},{p:"C5",d:"w",chord:true},{p:"D#5",d:"w",chord:true}],width:150}},
        {label:"Plain iv6 (F-A-D)", spec:{clef:"treble",notes:[{p:"F4",d:"w"},{p:"A4",d:"w",chord:true},{p:"D5",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Nations identified!":null },
    { type:"term-race", title:"Game 4 · Frame Facts Race",
      intro:"The +6 mechanics — at speed!",
      miaIntro:"Pincers to the dominant! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["\u{266D}6 moves","down a half step to 5"],
        ["\u{266F}4 moves","up a half step to 5"],
        ["Landing interval","an octave"],
        ["Landing note","the dominant's root"],
        ["Ger+6 usually passes through","the cadential 6/4"],
        ["Fr+6's shimmer","four whole-tone notes"],
        ["The +6 vs M6","a half step wider"],
        ["Neapolitan & +6 share","the predominant job"]]},
      result:(score)=>score>=6?"Mechanics mastered!":null }
  ],
  practiceIntro:"20 practice questions — frames, flavors and resolutions. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["It+6","3 notes"],["Fr+6","+ degree 2"],["Ger+6","+ \u{266D}3"],["Resolution","octave on 5"],["Function","PD to V"]], reverse:true}, count:6 },
    { gen:"interval-quality", params:{ask:"quality"}, count:2 },
    { type:"mc", q:"The augmented 6th interval runs from…", choices:["♭6 up to ♯4","1 to 5","2 to 6"], answer:0, explain:"F to D♯ in A minor." },
    { type:"mc", q:"Both notes of the +6 resolve…", choices:["outward to an octave on 5","inward to a unison","up together"], answer:0, explain:"♭6 falls, ♯4 rises." },
    { type:"mc", q:"The Italian sixth has how many different notes?", choices:["3","4","5"], answer:0, explain:"♭6, 1, ♯4." },
    { type:"mc", q:"The German sixth adds…", choices:["♭3","degree 2","degree 6"], answer:0, explain:"F-A-C-D♯." },
    { type:"truefalse", q:"The French sixth adds scale degree 2.", answer:true, explain:"F-A-B-D♯." },
    { type:"truefalse", q:"The German sixth is enharmonically a dominant seventh.", answer:true, explain:"F-A-C-D♯ ≈ F7." },
    { type:"truefalse", q:"Augmented sixth chords resolve to the tonic directly.", answer:false, explain:"To V — they are predominants." },
    { gen:"term-match", params:{subject:"term", pool:[["F-A-D\u{266F}","Italian"],["F-A-B-D\u{266F}","French"],["F-A-C-D\u{266F}","German"],["E + E octave","the landing"]], reverse:true}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 }
  ],
  vocabulary:[
    {term:"Augmented 6th Interval", def:"♭6 up to ♯4 — a chromatic pair that expands outward to an octave on the dominant's root."},
    {term:"Italian +6", def:"♭6, 1, ♯4 — the three-note frame."},
    {term:"French +6", def:"The frame plus scale degree 2 — a whole-tone shimmer."},
    {term:"German +6", def:"The frame plus ♭3 — enharmonically a dominant 7th; usually resolves through the cadential 6/4."}
  ],
  mistakes:[],
  summary:[
    "✔ Engine: <b>♭6 + ♯4</b> expanding outward to an <b>octave on 5</b>.",
    "✔ <b>Italian</b> = 3 notes · <b>French</b> = +2 · <b>German</b> = +♭3.",
    "✔ Ger⁶ ≈ a dominant 7th, enharmonically — context decides.",
    "✔ All three: <b>chromatic predominants to V</b>.",
    "✔ With the Neapolitan: the chromatic-PD family complete."
  ],
  tips:[
    "Spell any +6 fast: find 5, put half steps on both sides (♭6 below-target, ♯4 above-target… both aiming at 5).",
    "Hear Ger⁶ vs V7: identical sound, opposite futures — one opens outward, one falls a 5th.",
    "The Fr⁶'s four notes all belong to one whole-tone scale — L82 hiding inside L106.",
    "Next lesson: chords borrowed straight from the parallel key — modal mixture."
  ],
  rewards:{ badge:"Pincer Operator", icon:"\u{2194}\u{FE0F}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! ♭6 falls, ♯4 rises, the octave opens on 5.",
  quiz:[
    { type:"mc", q:"The augmented 6th interval spans…", choices:["♭6 up to ♯4","1 up to 6","5 up to 3"], answer:0, explain:"The chromatic pincers.", hint:"F to D♯." },
    { type:"mc", q:"Its resolution:", choices:["outward to an octave on the dominant","inward to a 3rd","a fall to the tonic"], answer:0, explain:"Both voices to 5.", hint:"E and E." },
    { type:"mc", q:"The Italian sixth in A minor:", choices:["F-A-D♯","F-A-B-D♯","F-A-C-D♯"], answer:0, explain:"Three notes.", hint:"The lean one." },
    { type:"mc", q:"The French sixth adds…", choices:["scale degree 2","♭3","the leading tone"], answer:0, explain:"F-A-B-D♯.", hint:"Whole-tone tang." },
    { type:"mc", q:"The German sixth adds…", choices:["♭3","degree 2","degree 4"], answer:0, explain:"F-A-C-D♯.", hint:"The fullest." },
    { type:"mc", q:"Which chord is the German sixth's enharmonic twin?", choices:["A dominant seventh","A major triad","vii°"], answer:0, explain:"F-A-C-D♯ ≈ F-A-C-E♭.", hint:"Respell D♯." },
    { type:"mc", q:"Identify (A minor).",
      staff:{clef:"treble",notes:[{p:"F4",d:"w"},{p:"A4",d:"w",chord:true},{p:"B4",d:"w",chord:true},{p:"D#5",d:"w",chord:true}],width:160},
      choices:["French +6","Italian +6","German +6"], answer:0, explain:"The added B names France.", hint:"Count and find the extra." },
    { type:"mc", q:"Augmented sixths function as…", choices:["chromatic predominants to V","tonic substitutes","cadences"], answer:0, explain:"PD, from the chromatic side.", hint:"Before the dominant." },
    { type:"truefalse", q:"♭6 resolves down and ♯4 resolves up.", answer:true, explain:"Outward pincers.", hint:"Opposite motion." },
    { type:"truefalse", q:"The German sixth often resolves through a cadential 6/4.", answer:true, explain:"Dodging parallel 5ths.", hint:"The detour." },
    { type:"mc", q:"In C major/minor, the +6 frame is…", choices:["A♭ up to F♯","A to F","G to E"], answer:0, explain:"♭6=A♭, ♯4=F♯ — aiming at G.", hint:"Both sides of 5." },
    { type:"mc", q:"The Neapolitan and the augmented sixths together form…", choices:["the chromatic predominant family","the tonic family","a rondo"], answer:0, explain:"Two roads to V.", hint:"Same job, different color." }
  ],
  miaPerfect:"PERFECT! Three nations, one octave — conquered. \u{2194}\u{FE0F}\u{1F389}",
  miaPass:"Passed! The pincers open on command. Next: borrowed chords…",
  mia:{
    hook:{ label:"the welcome",
      explain:"F and D♯ — an augmented 6th — expanded outward to an octave on E: the dominant. The +6 chords' engine.",
      play:()=>{MFAudio.tone(53,.9,.05,.34);MFAudio.tone(63,.9,.05,.34);MFAudio.tone(52,1.1,1.0,.34);MFAudio.tone(64,1.1,1.0,.34);} },
    learn:{ label:"augmented sixths",
      explain:"♭6+♯4 expand outward to the octave on 5. It=3 notes, Fr adds 2, Ger adds ♭3 (≈V7 enharmonically, via cadential 6/4). All PD→V.",
      hint:"Pincers on the dominant.",
      play:()=>{[53,57,63].forEach(m=>MFAudio.tone(m,.9,.05,.3));[52,56,64].forEach(m=>MFAudio.tone(m,1.0,1.0,.3));} },
    example:{ label:"the examples",
      explain:"Example 1 resolves the Italian sixth through V to i; example 2 lines up all three nations on one frame." },
    game:{ label:"the games",
      explain:"Sprint the flavors, open the pincers by hand, name the nations on cards, then race the mechanics.",
      hint:"Extra note names the nation." },
    quiz:{ label:"this question",
      explain:"Find the ♭6+♯4 pair aiming at 5; count the notes (3=It); name the extra (2=Fr, ♭3=Ger); resolve outward to V.",
      play:()=>{[53,63].forEach(m=>MFAudio.tone(m,.9,.05,.34));} }
  }
};
