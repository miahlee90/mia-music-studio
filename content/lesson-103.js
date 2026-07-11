/* Lesson 103 — Larger Instrumental Forms (Book 4, Unit 25 — SELF-AUTHORED)
   Core: MINUET & TRIO (ternary of ternaries, 3/4, moderate) · SCHERZO
   (its faster replacement) · MARCH (duple, trio section) · CONCERTO intro
   (soloist vs orchestra, three movements, cadenza).
   NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[103]={
  welcome:"The forms around the sonata. \u{1F3BB}",
  hook:{
    say:"<b>A stately dance in three, a middle section for fewer players, then the dance again.</b> \u{1F447} <b>Which large form is this?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Dance — middle — dance</button></div>
          <div class="choices hk-ch" style="display:none"><button>Minuet & Trio — ABA at grand scale</button><button>A fugue</button><button>A 12-bar blues</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{
          let t=0;
          [[60,64,67],[65,69,72],[67,71,74],[60,64,67]].forEach(row=>{ row.forEach(m=>MFAudio.tone(m,.55,t,.26)); t+=.6; });
          [[57,60,64],[62,65,69]].forEach(row=>{ row.forEach(m=>MFAudio.tone(m,.55,t,.18)); t+=.6; });
          [[60,64,67],[67,71,74],[60,64,67]].forEach(row=>{ row.forEach(m=>MFAudio.tone(m,.55,t,.26)); t+=.6; });
          setTimeout(()=>ch.style.display="",t*1000+400);
        };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Minuet — Trio (lighter middle) — Minuet again: L74's ABA grown to movement size. Today: the larger instrumental forms!");
          else fb(false,"Dance, contrasting middle, dance again — which small form did that resemble, made large?");
        });
      } }
  },
  objectives:[
    "MINUET & TRIO: a 3/4 dance in large ABA (each part itself binary)",
    "SCHERZO: the minuet's faster, playful successor",
    "MARCH: duple meter with a contrasting trio",
    "CONCERTO (intro): soloist vs orchestra, three movements, cadenza",
    "Place these forms inside multi-movement works",
    "Recognize each by meter, tempo and plan"
  ],
  steps:[
    { say:"<b>Minuet & Trio:</b> a moderate <b>3/4 dance</b> in grand <b>ABA</b>: Minuet — <b>Trio</b> (a contrasting, often lighter middle) — Minuet again. Each section is itself a small binary form. \u{1F447} <b>The trio is…</b>",
      try:{ type:"mc", choices:["The contrasting middle section","The last chord","A three-note motive"], answer:0,
        success:"✓ Named for its old three-instrument scoring — the lighter B of the big ABA.",
        fail:"The middle of the sandwich…",
        hint:"B at large scale." } },
    { say:"<b>Scherzo:</b> the minuet's successor — same ABA-with-trio plan, but <b>much faster and playful</b> (scherzo = \u{201C}joke\u{201D}). Beethoven made it the standard third movement. \u{1F447} <b>A scherzo differs from a minuet mainly in…</b>",
      try:{ type:"mc", choices:["Tempo and character — fast and playful","Meter — it abandons three","Having no trio"], answer:0,
        success:"✓ Same skeleton, triple the mischief.",
        fail:"The plan stayed; what accelerated?",
        hint:"The joke." } },
    { say:"<b>March:</b> <b>duple meter</b>, steady tread, strong downbeats — and like the minuet, marches carry a contrasting <b>trio</b> (often in the subdominant, smoother in character). \u{1F447} <b>A march moves in…</b>",
      try:{ type:"mc", choices:["Duple meter — left, right","Triple meter","Free rhythm"], answer:0,
        success:"✓ Two feet, two beats — with a lyrical trio for contrast.",
        fail:"Feet come in twos…",
        hint:"2/4 or cut time." } },
    { say:"<b>Concerto (Introduction):</b> a work for <b>soloist and orchestra</b> in <b>three movements (fast–slow–fast)</b>. First movements use sonata form; near the end comes the <b>CADENZA</b> — the soloist alone, brilliant, on a held dominant. \u{1F447} <b>A cadenza is…</b>",
      try:{ type:"mc", choices:["A brilliant solo passage near the movement's end","The orchestra's loudest chord","A type of trill"], answer:0,
        success:"✓ The soloist's spotlight — historically improvised.",
        fail:"Who plays alone?",
        hint:"The star's moment." } },
    { say:"<b>The Multi-Movement Map:</b> a Classical symphony or sonata typically runs — <b>1)</b> fast, sonata form · <b>2)</b> slow, songful (ABA or variations) · <b>3)</b> minuet or scherzo · <b>4)</b> fast finale (rondo or sonata). <b>Remember: minuet/scherzo = big ABA with trio · march = duple + trio · concerto = soloist, 3 movements, cadenza.</b> \u{1F447} <b>The minuet/scherzo usually sits at movement…</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Mvt</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Tempo</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Usual form</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">1</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">fast</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">sonata form</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">2</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">slow</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">ABA or variations</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">3</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">dance</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">minuet or scherzo</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">4</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">fast</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">rondo or sonata</td></tr></table>` },
      try:{ type:"mc", choices:["Third","First","Last"], answer:0,
        success:"✓ The third-movement dance slot.",
        fail:"Read the table…",
        hint:"After the slow movement." } },
    { say:"<b>Recognizing Them:</b> ask three questions — <b>meter?</b> (3 = minuet/scherzo, 2 = march) · <b>tempo/character?</b> (stately = minuet, quick joke = scherzo, tread = march) · <b>soloist against orchestra?</b> (concerto). \u{1F447} <b>Fast, playful, in 3, with a trio: which form?</b>",
      try:{ type:"mc", choices:["Scherzo","Minuet","March"], answer:0,
        success:"✓ The joke in three — a scherzo.",
        fail:"Fast + 3/4 + trio…",
        hint:"Beethoven's favorite swap." } },
    { say:"<b>Review:</b> \u{1F447} <b>Minuet & trio is, at the largest scale, which small form grown up?</b>",
      try:{ type:"mc", choices:["ABA (ternary)","AB (binary)","Rondo"], answer:0,
        success:"✓ Statement, contrast, return — L74 at movement size.",
        fail:"Dance — trio — dance…",
        hint:"Three parts, two ideas." } }
  ],
  examples:[
    { caption:"A minuet phrase: moderate 3/4, elegant steps — the courtly dance that became a symphonic movement.",
      staff:{clef:"treble",time:"3/4",tempo:120,notes:[
        {p:"G4",d:"q"},{p:"C5",d:"q"},{p:"E5",d:"q"},{bar:"single"},
        {p:"D5",d:"q"},{p:"B4",d:"q"},{p:"G4",d:"q"},{bar:"single"},
        {p:"A4",d:"q"},{p:"F4",d:"q"},{p:"D4",d:"q"},{bar:"single"},
        {p:"E4",d:"h."},{bar:"final"}],width:620},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"A march phrase: duple meter, dotted tread, strong downbeats — left, right, left, right.",
      staff:{clef:"treble",time:"2/4",tempo:112,notes:[
        {p:"C4",d:"q.",artic:"accent"},{p:"C4",d:"8"},{bar:"single"},
        {p:"E4",d:"q",artic:"accent"},{p:"G4",d:"q"},{bar:"single"},
        {p:"F4",d:"q.",artic:"accent"},{p:"D4",d:"8"},{bar:"single"},
        {p:"C4",d:"h"},{bar:"final"}],width:560},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Large-Form Sprint (45s)",
      intro:"Forms, meters and movements — race them!",
      miaIntro:"Grand plans! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Minuet & trio","3/4 dance in big ABA"],
        ["Trio","the contrasting middle section"],
        ["Scherzo","the fast, playful minuet successor"],
        ["March","duple tread with a trio"],
        ["Concerto","soloist vs orchestra, 3 movements"],
        ["Cadenza","the soloist's brilliant solo passage"],
        ["Movement 3 of a symphony","minuet or scherzo"],
        ["Concerto movement plan","fast - slow - fast"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — grand forms mapped!":null },
    { type:"order-tap", title:"Game 2 · Assemble the Symphony",
      intro:"Tap the classical four movements in order!",
      miaIntro:"Fast, slow, dance, finale! \u{1F3C1}",
      spec:{sequence:["Mvt 1 — fast, sonata form","Mvt 2 — slow, songful","Mvt 3 — minuet or scherzo","Mvt 4 — fast finale"],
        title:"The four-movement plan"},
      result:(stars)=>stars>=2?"The symphony, assembled!":null },
    { type:"order-tap", title:"Game 3 · Stage the Minuet & Trio",
      intro:"Tap the movement's sections in order!",
      miaIntro:"Dance, trio, dance! \u{1F3C1}",
      spec:{sequence:["Minuet (A)","Trio (B) — lighter, contrasting","Minuet again (A)"],
        title:"Big ABA"},
      result:(stars)=>stars>=2?"Ternary at grand scale!":null },
    { type:"term-race", title:"Game 4 · Which Form Am I?",
      intro:"Clues → forms, at speed!",
      miaIntro:"Meter, tempo, cast! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Stately, 3/4, with trio","minuet"],
        ["Fast joke, 3/4, with trio","scherzo"],
        ["Duple tread, trio section","march"],
        ["Soloist + orchestra","concerto"],
        ["Soloist alone near the end","cadenza"],
        ["Three movements fast-slow-fast","concerto plan"],
        ["Each minuet section internally","a small binary"],
        ["The big shape of minuet & trio","ABA"]]},
      result:(score)=>score>=6?"Every form identified!":null }
  ],
  practiceIntro:"20 practice questions — dances, marches and concertos. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Minuet","stately 3/4"],["Scherzo","fast joke"],["Trio","the middle"],["March","duple tread"],["Cadenza","solo spotlight"]], reverse:true}, count:6 },
    { gen:"rhythm-count", params:{}, count:2 },
    { type:"mc", q:"The minuet's meter is…", choices:["3/4","2/4","6/8"], answer:0, explain:"The triple-time dance." },
    { type:"mc", q:"Minuet & trio's overall shape is…", choices:["ABA","AB","ABACA"], answer:0, explain:"Dance — trio — dance." },
    { type:"mc", q:"The scherzo replaced the minuet by becoming…", choices:["faster and more playful","slower","duple"], answer:0, explain:"The joke movement." },
    { type:"mc", q:"A concerto features…", choices:["a soloist with orchestra","voices only","two conductors"], answer:0, explain:"The star and the ensemble." },
    { type:"truefalse", q:"The cadenza is played by the full orchestra.", answer:false, explain:"The SOLOIST alone." },
    { type:"truefalse", q:"Marches usually include a trio section.", answer:true, explain:"Contrast, often subdominant." },
    { type:"truefalse", q:"A classical concerto has three movements: fast-slow-fast.", answer:true, explain:"The standard plan." },
    { gen:"term-match", params:{subject:"term", pool:[["Mvt 1","sonata form"],["Mvt 2","slow, ABA/variations"],["Mvt 3","minuet/scherzo"],["Mvt 4","rondo or sonata finale"]], reverse:true}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 }
  ],
  vocabulary:[
    {term:"Minuet & Trio", def:"A moderate 3/4 dance in grand ABA — minuet, contrasting trio, minuet again; each part a small binary."},
    {term:"Scherzo", def:"The minuet's fast, playful successor ('joke') — same plan, new energy."},
    {term:"March", def:"Duple-meter tread with strong downbeats and a contrasting trio."},
    {term:"Concerto / Cadenza", def:"Soloist vs orchestra in three movements (fast-slow-fast); the cadenza is the soloist's brilliant solo near the first movement's end."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Minuet & trio</b> = big ABA in 3/4; sections internally binary.",
    "✔ <b>Scherzo</b> = the same plan, fast and playful.",
    "✔ <b>March</b> = duple tread + trio.",
    "✔ <b>Concerto</b> = soloist vs orchestra, fast-slow-fast, with <b>cadenza</b>.",
    "✔ Symphony map: sonata · slow · dance · finale."
  ],
  tips:[
    "The trio is your landmark: hear the texture lighten, and you are in the B of the big ABA.",
    "Scherzo hunting: symphony third movements after Beethoven — count how fast the 'minuet' got.",
    "In concertos, the orchestra's sudden silence announces the cadenza.",
    "Unit 25 complete! Next unit: chromatic harmony — leading-tone chords, Neapolitan, augmented sixths."
  ],
  rewards:{ badge:"Grand Designer", icon:"\u{1F3BB}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Meter, tempo, cast — name the form.",
  quiz:[
    { type:"mc", q:"Minuet & trio is organized as…", choices:["big ABA — dance, trio, dance","AB only","a rondo"], answer:0, explain:"Ternary at movement scale.", hint:"L74 grown up." },
    { type:"mc", q:"The minuet's meter and character:", choices:["3/4, stately","2/4, martial","4/4, free"], answer:0, explain:"The courtly dance.", hint:"Three elegant beats." },
    { type:"mc", q:"The trio section is typically…", choices:["lighter and contrasting","louder and identical","a drum solo"], answer:0, explain:"The B of the big ABA.", hint:"Fewer 'players.'" },
    { type:"mc", q:"Scherzo means…", choices:["joke","song","slow"], answer:0, explain:"Fast and playful.", hint:"Italian humor." },
    { type:"mc", q:"A march's meter is…", choices:["duple","triple","irregular"], answer:0, explain:"Left-right.", hint:"Two feet." },
    { type:"mc", q:"A concerto is written for…", choices:["soloist and orchestra","unaccompanied choir","two pianos only"], answer:0, explain:"Star vs ensemble.", hint:"The dialogue." },
    { type:"mc", q:"The concerto's movement plan:", choices:["fast - slow - fast","slow - slow - slow","one movement"], answer:0, explain:"Three movements.", hint:"Outer speed." },
    { type:"mc", q:"The cadenza occurs…", choices:["near the first movement's end, soloist alone","at the very beginning","in the trio"], answer:0, explain:"On a held dominant, historically improvised.", hint:"The spotlight." },
    { type:"truefalse", q:"Each section of a minuet & trio is internally a small binary form.", answer:true, explain:"Binary inside ternary.", hint:"Forms nest." },
    { type:"truefalse", q:"The scherzo abandoned the trio section.", answer:false, explain:"It kept the plan, changed the speed.", hint:"Same skeleton." },
    { type:"mc", q:"In a classical symphony, the dance movement is number…", choices:["3","1","4"], answer:0, explain:"Minuet/scherzo slot.", hint:"After the slow movement." },
    { type:"mc", q:"Fast, playful, triple meter, trio in the middle:", choices:["scherzo","march","concerto"], answer:0, explain:"The joke in three.", hint:"Not stately." }
  ],
  miaPerfect:"PERFECT! Dances, marches and concertos all placed. \u{1F3BB}\u{1F389}",
  miaPass:"Passed — and UNIT 25 is COMPLETE! Expression and the grand forms are yours. \u{1F389}",
  mia:{
    hook:{ label:"the welcome",
      explain:"Dance — lighter middle — dance again: minuet & trio, ternary form at movement scale.",
      play:()=>{let t=0;[[60,64,67],[65,69,72],[67,71,74],[60,64,67]].forEach(row=>{row.forEach(m=>MFAudio.tone(m,.5,t,.26));t+=.55;});} },
    learn:{ label:"larger forms",
      explain:"Minuet & trio (big ABA, 3/4), scherzo (fast joke), march (duple + trio), concerto (soloist, 3 mvts, cadenza); symphony map 1-4.",
      hint:"Meter, tempo, cast.",
      play:()=>{let t=0;[[60,64,67],[62,65,69],[60,64,67]].forEach(row=>{row.forEach(m=>MFAudio.tone(m,.5,t,.26));t+=.55;});} },
    example:{ label:"the examples",
      explain:"Example 1 dances a minuet phrase in 3/4; example 2 treads a dotted march in 2/4." },
    game:{ label:"the games",
      explain:"Sprint the forms, assemble a symphony, stage the minuet & trio, then identify forms from clues.",
      hint:"Three questions: meter, tempo, cast." },
    quiz:{ label:"this question",
      explain:"Meter narrows it (3 vs 2), character decides (stately/joke/tread), and a soloist against orchestra means concerto.",
      play:()=>{let t=0;[[60,64,67],[65,69,72]].forEach(row=>{row.forEach(m=>MFAudio.tone(m,.5,t,.26));t+=.55;});} }
  }
};
