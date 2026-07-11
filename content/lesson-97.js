/* Lesson 97 — Voice Leading Basics (Book 4, Unit 24 — SELF-AUTHORED)
   Core: SATB — four voices, their ranges and vertical spacing (≤ octave
   between adjacent upper voices); no VOICE CROSSING; move voices as little
   as possible (common tones, steps); avoid parallel 5ths/octaves (intro).
   NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[97]={
  welcome:"Voice leading: four singers, smooth paths. \u{1F465}",
  hook:{
    say:"<b>Two ways to connect the same two chords.</b> Version A leaps everywhere; version B moves each voice as little as possible. \u{1F447} <b>Which connection sounds smoother?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Version A (leaps)</button>
          <button class="play hk-b">▶ Version B (smooth)</button></div>
          <div class="choices hk-ch" style="display:none"><button>Version B — each voice moved by step or stayed</button><button>Version A — big leaps are smoother</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ [48,64,67,72].forEach(m=>MFAudio.tone(m,.9,.05,.26)); [65,69,72,77].forEach(m=>MFAudio.tone(m,1.0,1.0,.26)); hA=true; if(hB) setTimeout(()=>ch.style.display="",2300); };
        container.querySelector(".hk-b").onclick=()=>{ [48,64,67,72].forEach(m=>MFAudio.tone(m,.9,.05,.26)); [53,65,69,72].forEach(m=>MFAudio.tone(m,1.0,1.0,.26)); hB=true; if(hA) setTimeout(()=>ch.style.display="",2300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Version B kept the common tone (C) and stepped the rest — VOICE LEADING: moving each voice the smallest useful distance. Today's lesson!");
          else fb(false,"Version A leapt every voice. Which version felt CONNECTED?");
        });
      } }
  },
  objectives:[
    "Name the four voices: Soprano, Alto, Tenor, Bass (SATB)",
    "Know each voice's general range and staff position",
    "Space adjacent upper voices within an octave",
    "Avoid voice crossing",
    "Keep common tones; move by step where possible",
    "Meet the classic prohibition: parallel 5ths and octaves (introduction)"
  ],
  steps:[
    { say:"<b>SATB:</b> choral writing uses four voices — <b>Soprano, Alto, Tenor, Bass</b>, high to low. On the grand staff: S+A share the treble staff (S stems up, A down), T+B the bass staff. \u{1F447} <b>The four voices, high to low, are…</b>",
      try:{ type:"mc", choices:["Soprano, alto, tenor, bass","Bass, tenor, alto, soprano","Soprano, tenor, alto, bass"], answer:0,
        success:"✓ S-A-T-B — the four-part standard.",
        fail:"Start at the top…",
        hint:"S first." } },
    { say:"<b>Ranges (working guide):</b> Soprano C4–G5 · Alto G3–D5 · Tenor C3–G4 · Bass E2–C4. Keeping voices in range keeps real singers comfortable. \u{1F447} <b>Which voice sings the lowest?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14.5px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Voice</th><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#2F6DA8">Soprano</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#A9821F">Alto</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#C05A21">Tenor</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800">Bass</td></tr>
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Range</th><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">C4–G5</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">G3–D5</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">C3–G4</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">E2–C4</td></tr></table>` },
      try:{ type:"mc", choices:["Bass","Tenor","Alto"], answer:0,
        success:"✓ The bass — harmony's foundation voice.",
        fail:"B is last in SATB…",
        hint:"The bottom." } },
    { say:"<b>Spacing:</b> keep <b>adjacent UPPER voices within an octave</b> of each other (S–A and A–T); the bass may sit farther below the tenor. Wider gaps up top sound hollow. \u{1F447} <b>Which pair may exceed an octave?</b>",
      try:{ type:"mc", choices:["Tenor and bass","Soprano and alto","Alto and tenor"], answer:0,
        success:"✓ Only T–B stretches freely; S–A and A–T stay within the octave.",
        fail:"The exception is at the BOTTOM…",
        hint:"The bass roams." } },
    { say:"<b>No Voice Crossing:</b> voices keep their vertical order — the alto never sings above the soprano, the tenor never below the bass. Crossing confuses the ear's tracking of each line. \u{1F447} <b>The alto written higher than the soprano is called…</b>",
      try:{ type:"mc", choices:["Voice crossing — avoid it","Good counterpoint","A pedal point"], answer:0,
        success:"✓ Crossed voices lose their identity — keep S above A above T above B.",
        fail:"The lines swapped lanes…",
        hint:"Stay in your lane." } },
    { say:"<b>Smooth Motion:</b> the golden habits — <b>keep common tones</b> in the same voice, move other voices <b>by step</b>, leap only when needed (usually in the bass). <b>Remember: smallest useful motion, voice by voice.</b> \u{1F447} <b>Two chords share the note G. The G should…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:72,notes:[
        {p:"C4",d:"h",label:"I"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"B3",d:"h",label:"V"},{p:"D4",d:"h",chord:true},{p:"G4",d:"h",chord:true,label:"G stays!"},{p:"D5",d:"h",chord:true},{bar:"final"}],width:440} },
      try:{ type:"mc", choices:["Stay in the same voice","Leap to another octave","Be removed"], answer:0,
        success:"✓ Common tones hold still; the other voices step around them.",
        fail:"The shared note is the anchor…",
        hint:"Keep it where it is." } },
    { say:"<b>Parallel 5ths & Octaves (Introduction):</b> two voices a perfect 5th (or octave) apart should not move to ANOTHER 5th (or octave) in the same direction — the voices momentarily fuse and independence dies. The classic prohibition of part writing. \u{1F447} <b>Parallel perfect 5ths are avoided because…</b>",
      try:{ type:"mc", choices:["The two voices lose their independence","They are too quiet","They change the key"], answer:0,
        success:"✓ Perfect intervals blend so completely that the two lines briefly become one.",
        fail:"What happens to the two separate lines?",
        hint:"Independence." } },
    { say:"<b>Review:</b> \u{1F447} <b>The first questions of good voice leading are…</b>",
      try:{ type:"mc", choices:["Any common tones? Can the rest move by step?","How loud? How fast?","Which clef?"], answer:0,
        success:"✓ Hold the shared, step the rest — smoothness by design.",
        fail:"The golden habits…",
        hint:"Common tones first." } }
  ],
  examples:[
    { caption:"I–IV–V–I with smooth voice leading (upper voices on one staff): common tones held, steps everywhere else, bass doing the leaping.",
      staff:{clef:"treble",tempo:69,notes:[
        {p:"C4",d:"h",label:"I"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"C4",d:"h",label:"IV"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"B3",d:"h",label:"V"},{p:"D4",d:"h",chord:true},{p:"G4",d:"h",chord:true},{p:"D5",d:"h",chord:true},
        {p:"C4",d:"w",label:"I"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"C5",d:"w",chord:true},{bar:"final"}],width:620},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"Spacing on display: the first chord keeps S–A and A–T inside an octave (balanced); the second spreads the top voices too far (hollow). Hear the difference.",
      staff:{clef:"treble",tempo:60,notes:[
        {p:"C4",d:"w",label:"balanced"},{p:"G4",d:"w",chord:true},{p:"E5",d:"w",chord:true,label:"…hmm"},{bar:"single"},
        {p:"C4",d:"w",label:"good"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"C5",d:"w",chord:true},{bar:"final"}],width:420},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · SATB Sprint (45s)",
      intro:"Voices, ranges, rules — race them!",
      miaIntro:"Stay in your lane! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["SATB","soprano, alto, tenor, bass"],
        ["Adjacent upper voices","within an octave"],
        ["Tenor–bass gap","may exceed an octave"],
        ["Voice crossing","forbidden — keep the order"],
        ["Common tone","hold it in the same voice"],
        ["Other voices","move by step when possible"],
        ["Parallel 5ths/octaves","avoided — independence dies"],
        ["The leaping voice","usually the bass"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — part-writing rules locked!":null },
    { type:"order-tap", title:"Game 2 · Stack the Choir",
      intro:"Tap the voices from HIGHEST to LOWEST!",
      miaIntro:"S, A, T, B! \u{1F3C1}",
      spec:{sequence:["Soprano — highest","Alto","Tenor","Bass — lowest"],
        title:"The four-voice stack"},
      result:(stars)=>stars>=2?"The choir, in order!":null },
    { type:"symbol-hunt", title:"Game 3 · Good or Broken?",
      intro:"Voicings on cards — click what each round names!",
      miaIntro:"Check spacing and order! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Balanced spacing", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"C5",d:"w",chord:true}],width:150}},
        {label:"Hollow top (S–A over an octave)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G5",d:"w",chord:true}],width:150}},
        {label:"Common tone held (I→V)", spec:{clef:"treble",notes:[{p:"G4",d:"h"},{p:"C5",d:"h",chord:true},{p:"G4",d:"h"},{p:"B4",d:"h",chord:true}],width:170}},
        {label:"Leaping upper voices (rough)", spec:{clef:"treble",notes:[{p:"E4",d:"h"},{p:"C5",d:"h",chord:true},{p:"A4",d:"h"},{p:"F5",d:"h",chord:true}],width:170}}]},
      result:(score)=>score>=5?"Voicings judged on sight!":null },
    { type:"term-race", title:"Game 4 · Rule or Myth?",
      intro:"Sort real part-writing rules from myths — at speed!",
      miaIntro:"True rules only! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Keep common tones","real rule"],
        ["Move by step when possible","real rule"],
        ["Never let voices cross","real rule"],
        ["Avoid parallel perfect 5ths","real rule"],
        ["S–A within an octave","real rule"],
        ["Every voice must leap","myth"],
        ["The alto may top the soprano","myth"],
        ["Bass may sit far below tenor","real rule"]]},
      result:(score)=>score>=6?"Rules sorted from myths!":null }
  ],
  practiceIntro:"20 practice questions — voices, spacing and smooth motion. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["S","soprano"],["A","alto"],["T","tenor"],["B","bass"],["Common tone","hold it"],["Step motion","the default"]], reverse:true}, count:6 },
    { gen:"triad-id", params:{}, count:2 },
    { type:"mc", q:"SATB stands for…", choices:["soprano, alto, tenor, bass","strings and two brass","slow and then bright"], answer:0,
      explain:"The four choral voices." },
    { type:"mc", q:"Adjacent upper voices should stay within…", choices:["an octave","a 3rd","two octaves"], answer:0,
      explain:"S–A and A–T spacing rule." },
    { type:"mc", q:"Which voice pair may be spaced beyond an octave?", choices:["Tenor and bass","Soprano and alto","Alto and tenor"], answer:0,
      explain:"The bass roams free." },
    { type:"mc", q:"When two chords share a note, that note should…", choices:["stay in the same voice","leap octaves","disappear"], answer:0,
      explain:"Common-tone retention." },
    { type:"truefalse", q:"Voice crossing means the alto sings above the soprano.", answer:true,
      explain:"Any swap of the vertical order." },
    { type:"truefalse", q:"Parallel perfect 5ths are encouraged in SATB writing.", answer:false,
      explain:"They are the classic prohibition." },
    { type:"truefalse", q:"The bass leaps more than the upper voices.", answer:true,
      explain:"Roots often demand leaps; upper voices step." },
    { gen:"term-match", params:{subject:"term", pool:[["Crossing","forbidden swap"],["Parallel 5ths","independence lost"],["Spacing","octave rule up top"],["Bass","the leaper"]], reverse:true}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 }
  ],
  vocabulary:[
    {term:"SATB", def:"Soprano, alto, tenor, bass — the four standard voices of part writing."},
    {term:"Spacing", def:"Adjacent upper voices (S–A, A–T) within an octave; the bass may sit farther below."},
    {term:"Voice Crossing", def:"A voice moving above/below its neighbor — avoided; each line keeps its lane."},
    {term:"Parallel 5ths / Octaves", def:"Two voices moving from one perfect 5th/octave to another in the same direction — avoided because the lines fuse."}
  ],
  mistakes:[],
  summary:[
    "✔ Four voices: <b>S-A-T-B</b>, each in its range.",
    "✔ Spacing: <b>S–A and A–T within an octave</b>; T–B free.",
    "✔ <b>No crossing</b> — keep the vertical order.",
    "✔ <b>Hold common tones, step the rest</b>; the bass does the leaping.",
    "✔ Avoid <b>parallel perfect 5ths and octaves</b> — independence first."
  ],
  tips:[
    "Write the outer voices (S and B) first — if they sound good together, the middle fills easily.",
    "Check parallels the mechanical way: find every P5/P8 pair, then look one chord ahead.",
    "Piano players: practice I-IV-V-I holding common tones — your hands learn voice leading before your eyes do.",
    "Next lesson: dominants that point at chords OTHER than I — secondary dominants."
  ],
  rewards:{ badge:"Part Writer", icon:"\u{1F465}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Hold the common, step the rest, cross nothing.",
  quiz:[
    { type:"mc", q:"The four voices, high to low:", choices:["S, A, T, B","B, T, A, S","S, T, A, B"], answer:0,
      explain:"Soprano to bass.", hint:"The acronym." },
    { type:"mc", q:"Which voices share the treble staff?", choices:["Soprano and alto","Tenor and bass","Alto and tenor"], answer:0,
      explain:"S stems up, A stems down.", hint:"The top pair." },
    { type:"mc", q:"The octave spacing rule applies to…", choices:["adjacent upper voices (S–A, A–T)","tenor and bass","all pairs equally"], answer:0,
      explain:"The bass is exempt.", hint:"Up top only." },
    { type:"mc", q:"Voice crossing is…", choices:["a voice moving past its neighbor — avoided","a good blending technique","required at cadences"], answer:0,
      explain:"Lanes stay fixed.", hint:"S above A above T above B." },
    { type:"mc", q:"Two consecutive chords share the note E. Best practice:", choices:["keep E in the same voice","move E up an octave","drop E"], answer:0,
      explain:"Common-tone glue.", hint:"The anchor note." },
    { type:"mc", q:"Voices without a common tone should generally move…", choices:["by step","by leap","in parallel octaves"], answer:0,
      explain:"Smallest useful motion.", hint:"Neighbor notes." },
    { type:"mc", q:"Parallel perfect 5ths are avoided because…", choices:["the voices fuse and lose independence","they are too dissonant","they are hard to sing"], answer:0,
      explain:"Perfect blend = one line, not two.", hint:"Independence." },
    { type:"mc", q:"Which voice most often leaps?", choices:["The bass","The alto","The soprano"], answer:0,
      explain:"Root motion lives downstairs.", hint:"The foundation." },
    { type:"truefalse", q:"The alto's range sits below the soprano's.", answer:true,
      explain:"Each voice a notch lower.", hint:"S-A-T-B order." },
    { type:"truefalse", q:"Good voice leading moves every voice as far as possible.", answer:false,
      explain:"As LITTLE as possible.", hint:"Smoothness." },
    { type:"mc", q:"S–A spaced a 10th apart is…", choices:["too wide — exceeds the octave rule","perfect spacing","required"], answer:0,
      explain:"Upper pairs stay within the octave.", hint:"Count the gap." },
    { type:"mc", q:"The practical order for writing a chorale is…", choices:["outer voices first, then fill the middle","alto first","all four at random"], answer:0,
      explain:"S+B frame the texture.", hint:"The frame first." }
  ],
  miaPerfect:"PERFECT! Four lanes, zero collisions. \u{1F465}\u{1F389}",
  miaPass:"Passed! Your voices move like singers. Next: dominants of dominants…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Version B held the common tone and stepped the rest — voice leading: smallest useful motion per voice.",
      play:()=>{[48,64,67,72].forEach(m=>MFAudio.tone(m,.9,.05,.26));[53,65,69,72].forEach(m=>MFAudio.tone(m,1.0,1.0,.26));} },
    learn:{ label:"voice leading",
      explain:"SATB ranges; S–A/A–T within an octave; no crossing; hold common tones, step the rest; avoid parallel 5ths/octaves.",
      hint:"Hold, step, don't cross.",
      play:()=>{[48,64,67,72].forEach(m=>MFAudio.tone(m,.8,.05,.26));[47,62,67,74].forEach(m=>MFAudio.tone(m,.9,.95,.26));} },
    example:{ label:"the examples",
      explain:"Example 1 voice-leads I-IV-V-I with held common tones; example 2 contrasts balanced vs hollow spacing." },
    game:{ label:"the games",
      explain:"Sprint the rules, stack the choir, judge voicings on cards, then separate rules from myths.",
      hint:"Smoothness is the goal." },
    quiz:{ label:"this question",
      explain:"The checklist: ranges ok? spacing within octaves up top? order uncrossed? common tones held? parallels avoided?",
      play:()=>{[48,64,67,72].forEach(m=>MFAudio.tone(m,.9,.05,.26));} }
  }
};
