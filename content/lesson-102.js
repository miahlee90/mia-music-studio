/* Lesson 102 — Sonata Form (Book 4, Unit 25 — SELF-AUTHORED)
   Core: EXPOSITION (theme 1 in tonic, theme 2 in a new key — usually V or
   relative major) → DEVELOPMENT (themes fragmented, sequenced, modulating)
   → RECAPITULATION (both themes home in the tonic) → optional CODA.
   Built on: periods (L88), sequence (L89), modulation (L99).
   NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[102]={
  welcome:"Sonata form: the grand argument. \u{1F3F0}",
  hook:{
    say:"<b>Two themes walk in — one at home, one in a new key.</b> They are broken apart, then both come home. \u{1F447} <b>Listen to the mini-drama. What happens at the end?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the mini-sonata</button></div>
          <div class="choices hk-ch" style="display:none"><button>Both themes returned — in the HOME key</button><button>New themes appeared at the end</button><button>The music never returned</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{
          let t=0;
          [[60,.3],[64,.3],[67,.6]].forEach(([m,d])=>{MFAudio.tone(m,d*.9,t,.42);t+=d;});         /* T1 in C */
          [[74,.3],[71,.3],[67,.6]].forEach(([m,d])=>{MFAudio.tone(m,d*.9,t,.42);t+=d;});         /* T2 in G-ish */
          [[64,.2],[67,.2],[66,.2],[69,.2],[68,.2],[71,.2]].forEach(([m,d])=>{MFAudio.tone(m,d*.9,t,.38);t+=d;}); /* development */
          [[60,.3],[64,.3],[67,.6]].forEach(([m,d])=>{MFAudio.tone(m,d*.9,t,.42);t+=d;});         /* T1 home */
          [[67,.3],[64,.3],[60,.8]].forEach(([m,d])=>{MFAudio.tone(m,d*.9,t,.42);t+=d;});         /* T2 home */
          setTimeout(()=>ch.style.display="",t*1000+400);
        };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Exposition (two themes, two keys) → development (fragments wandering) → RECAPITULATION: both themes home in the tonic. SONATA FORM — today's lesson!");
          else fb(false,"The opening ideas came back at the end — and this time both sat in the home key…");
        });
      } }
  },
  objectives:[
    "Name the three big sections: exposition, development, recapitulation",
    "Exposition: theme 1 in the tonic, theme 2 in a NEW key",
    "Development: fragmentation, sequence and modulation",
    "Recapitulation: both themes return IN THE TONIC",
    "Know the optional frames: introduction and coda",
    "Connect the form to periods, sequence and modulation"
  ],
  steps:[
    { say:"<b>The Map:</b> sonata form has three big sections — <b>EXPOSITION</b> (present the themes), <b>DEVELOPMENT</b> (argue about them), <b>RECAPITULATION</b> (restate them at home) — plus an optional <b>coda</b>. \u{1F447} <b>The three main sections are…</b>",
      show:{ type:"html", html:`<div style="display:flex;gap:8px;justify-content:center;font-weight:800;font-size:14px;flex-wrap:wrap">
        <div style="border:2px solid #2F6DA8;border-radius:10px;padding:8px 12px;color:#2F6DA8">EXPOSITION<br><span style="font-weight:400;font-size:11.5px;color:#555">T1 (tonic) · T2 (new key)</span></div>
        <div style="border:2px solid #C05A21;border-radius:10px;padding:8px 12px;color:#C05A21">DEVELOPMENT<br><span style="font-weight:400;font-size:11.5px;color:#555">fragments · sequences · keys</span></div>
        <div style="border:2px solid #2F6DA8;border-radius:10px;padding:8px 12px;color:#2F6DA8">RECAPITULATION<br><span style="font-weight:400;font-size:11.5px;color:#555">T1 + T2, both in tonic</span></div>
        <div style="border:2px solid #A9821F;border-radius:10px;padding:8px 12px;color:#A9821F">CODA<br><span style="font-weight:400;font-size:11.5px;color:#555">optional tail</span></div></div>` },
      try:{ type:"mc", choices:["Exposition, development, recapitulation","Verse, chorus, bridge","A, B, A, C, A"], answer:0,
        success:"✓ Present, argue, restate — the grand three.",
        fail:"Read the map…",
        hint:"E-D-R." } },
    { say:"<b>The Exposition:</b> <b>theme 1</b> appears in the <b>tonic</b>; a modulating <b>transition</b> carries the music to a new key, where <b>theme 2</b> appears — usually the <b>dominant</b> (or the relative major, in minor-key works). \u{1F447} <b>Theme 2 of a C major sonata usually sits in…</b>",
      try:{ type:"mc", choices:["G major — the dominant","C major","F♯ minor"], answer:0,
        success:"✓ The two-key tension IS the exposition's plot.",
        fail:"The closest important key…",
        hint:"L99's first neighbor." } },
    { say:"<b>The Development:</b> the themes are <b>fragmented into motives, run through sequences, and pushed across keys</b> — instability by design (L72's motives + L89's sequences + L99's modulations, all at once). \u{1F447} <b>The development section mainly…</b>",
      try:{ type:"mc", choices:["Fragments and destabilizes the themes across keys","Introduces the themes","Repeats the exposition exactly"], answer:0,
        success:"✓ The argument: familiar material, unfamiliar ground.",
        fail:"What happened to the themes mid-piece?",
        hint:"Broken and wandering." } },
    { say:"<b>The Recapitulation:</b> both themes return — but now <b>theme 2 stays in the TONIC</b>. The exposition's key conflict is resolved; that resolution is the form's payoff. \u{1F447} <b>What changes about theme 2 in the recapitulation?</b>",
      try:{ type:"mc", choices:["It now appears in the home key","It is deleted","It becomes a fugue"], answer:0,
        success:"✓ Both themes home = conflict resolved.",
        fail:"The exposition's tension was between two KEYS…",
        hint:"Home at last." } },
    { say:"<b>Frames:</b> a slow <b>introduction</b> may precede the exposition; a <b>coda</b> (\u{201C}tail\u{201D}) may extend the ending. <b>Remember: exposition = two themes, two keys · development = fragments wander · recapitulation = both themes home.</b> \u{1F447} <b>A coda is…</b>",
      try:{ type:"mc", choices:["An added closing section after the recapitulation","The second theme","A kind of trill"], answer:0,
        success:"✓ The tail that seals the argument.",
        fail:"Coda = tail…",
        hint:"After everything." } },
    { say:"<b>Where It Lives:</b> first movements of sonatas, symphonies, string quartets and concertos — the default grand design from the Classical era onward. \u{1F447} <b>Sonata form is most at home in…</b>",
      try:{ type:"mc", choices:["First movements of sonatas and symphonies","Folk verses","Drum solos"], answer:0,
        success:"✓ The first-movement form — which is why it is also called 'first-movement form.'",
        fail:"The grandest movements…",
        hint:"Openers." } },
    { say:"<b>Review:</b> \u{1F447} <b>Order the drama:</b>",
      try:{ type:"mc", choices:["Exposition → development → recapitulation (→ coda)","Development → exposition → coda","Recapitulation first"], answer:0,
        success:"✓ Present, argue, resolve — then the tail.",
        fail:"Present before arguing…",
        hint:"E-D-R-C." } }
  ],
  examples:[
    { caption:"An exposition in miniature: theme 1 in C, a rising transition, theme 2 in G — two themes, two keys, one tension.",
      staff:{clef:"treble",tempo:96,notes:[
        {p:"C4",d:"q",label:"T1 (C)"},{p:"E4",d:"q"},{p:"G4",d:"h"},{bar:"single"},
        {p:"A4",d:"8",label:"transition"},{p:"B4",d:"8"},{p:"C5",d:"8"},{p:"D5",d:"8"},{bar:"single"},
        {p:"D5",d:"q",label:"T2 (G!)"},{p:"B4",d:"q"},{p:"G4",d:"h"},{bar:"final"}],
        beams:[[4,7]],width:620},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"Development in miniature: theme 1's opening fragment, sequenced through rising keys — familiar material on unstable ground.",
      staff:{clef:"treble",tempo:96,notes:[
        {p:"C4",d:"8",label:"fragment"},{p:"E4",d:"8"},{p:"G4",d:"q"},
        {p:"D4",d:"8",label:"sequenced…"},{p:"F#4",d:"8"},{p:"A4",d:"q"},
        {p:"E4",d:"8",label:"…and again"},{p:"G#4",d:"8"},{p:"B4",d:"q"},{bar:"final"}],
        beams:[[0,1],[3,4],[6,7]],width:620},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Sonata Sprint (45s)",
      intro:"Sections, keys and jobs — race the form!",
      miaIntro:"Present, argue, resolve! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Exposition","two themes, two keys"],
        ["Development","fragments, sequences, modulations"],
        ["Recapitulation","both themes in the tonic"],
        ["Coda","the optional tail"],
        ["Theme 1's key","the tonic"],
        ["Theme 2's key (exposition)","dominant or relative major"],
        ["Theme 2's key (recap)","the tonic — resolved"],
        ["Sonata form's home","first movements"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — the grand map memorized!":null },
    { type:"order-tap", title:"Game 2 · Stage the Drama",
      intro:"Tap sonata form's events in order!",
      miaIntro:"E, D, R, coda! \u{1F3C1}",
      spec:{sequence:["Theme 1 — tonic","Theme 2 — new key","Development — fragments wander","Recapitulation — both themes home","Coda — the tail"],
        title:"One movement, start to finish"},
      result:(stars)=>stars>=2?"The drama, staged!":null },
    { type:"key-climb", title:"Game 3 · Play the Key Plan",
      intro:"Play the exposition's key journey: C (T1), G (T2), then home C (recap)!",
      miaIntro:"Tonic, dominant, tonic! \u{1FA9C}",
      spec:{seq:[60,67,60],
        names:["C — theme 1's home","G — theme 2's new key","C — the recapitulation resolves"],
        start:55, octaves:2, title:"The tonal plot in three notes"},
      result:(score)=>score!==null?"Key plan walked!":null },
    { type:"term-race", title:"Game 4 · Which Section Am I?",
      intro:"Description → section, at speed!",
      miaIntro:"Locate the moment! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Theme 2 enters in the dominant","exposition"],
        ["A motive sequences through keys","development"],
        ["Theme 2 returns — in the tonic","recapitulation"],
        ["A slow opening before theme 1","introduction"],
        ["Closing section after the recap","coda"],
        ["Maximum instability","development"],
        ["The key conflict is created","exposition"],
        ["The key conflict is resolved","recapitulation"]]},
      result:(score)=>score>=6?"Every moment located!":null }
  ],
  practiceIntro:"20 practice questions — sections, keys and the drama. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Exposition","presents"],["Development","argues"],["Recapitulation","resolves"],["Coda","tail"],["Transition","modulating bridge"]], reverse:true}, count:6 },
    { gen:"rel-key", params:{ask:"both"}, count:2 },
    { type:"mc", q:"Sonata form's three main sections are…", choices:["exposition, development, recapitulation","intro, verse, chorus","A, B, A"], answer:0, explain:"E-D-R." },
    { type:"mc", q:"In the exposition, theme 2 appears in…", choices:["a new key (usually V)","the tonic","no key"], answer:0, explain:"The key conflict." },
    { type:"mc", q:"The development treats the themes by…", choices:["fragmenting and sequencing them through keys","ignoring them","playing them backwards only"], answer:0, explain:"Instability by design." },
    { type:"mc", q:"In the recapitulation, theme 2…", choices:["returns in the tonic","stays in the dominant","disappears"], answer:0, explain:"Resolution." },
    { type:"truefalse", q:"A coda is required in every sonata movement.", answer:false, explain:"Optional tail." },
    { type:"truefalse", q:"A minor-key exposition often puts theme 2 in the relative major.", answer:true, explain:"The minor-mode convention." },
    { type:"truefalse", q:"Sonata form typically opens symphonies' first movements.", answer:true, explain:"First-movement form." },
    { gen:"term-match", params:{subject:"term", pool:[["T1's key","tonic"],["T2's key (expo)","dominant"],["T2's key (recap)","tonic"],["Development's tools","fragment + sequence + modulate"]], reverse:true}, count:3 },
    { gen:"triad-id", params:{ask:"numeral"}, count:3 }
  ],
  vocabulary:[
    {term:"Exposition", def:"Theme 1 in the tonic; a transition modulates; theme 2 in a new key (usually V, or relative major)."},
    {term:"Development", def:"The themes fragmented, sequenced and driven through keys — the form's unstable core."},
    {term:"Recapitulation", def:"Both themes restated — theme 2 now in the tonic. The key conflict resolves."},
    {term:"Introduction / Coda", def:"Optional frames: a slow opening before, an added tail after."}
  ],
  mistakes:[],
  summary:[
    "✔ Three acts: <b>exposition → development → recapitulation</b> (+ coda).",
    "✔ Exposition: <b>T1 tonic, T2 new key</b> — conflict created.",
    "✔ Development: <b>fragments, sequences, modulations</b> — conflict explored.",
    "✔ Recapitulation: <b>both themes in the tonic</b> — conflict resolved.",
    "✔ Built from your toolkit: periods (L88), sequence (L89), modulation (L99)."
  ],
  tips:[
    "Listen for the recapitulation's arrival — theme 1's return in the tonic is the movement's biggest landmark.",
    "In the development, follow one motive; it is your map through the key changes.",
    "Minor-key sonatas often brighten: theme 2 in the relative major, sometimes major-mode recaps.",
    "Next lesson: the forms around the sonata — minuet & trio, scherzo, march, concerto."
  ],
  rewards:{ badge:"Form Architect", icon:"\u{1F3F0}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Present, argue, resolve.",
  quiz:[
    { type:"mc", q:"Sonata form's sections, in order:", choices:["exposition, development, recapitulation","development, exposition, coda","recapitulation, development, exposition"], answer:0, explain:"E-D-R.", hint:"Present first." },
    { type:"mc", q:"The exposition presents…", choices:["two themes in two keys","one theme once","only chords"], answer:0, explain:"T1 tonic, T2 new key.", hint:"The conflict." },
    { type:"mc", q:"In a C major movement, theme 2's usual expo key is…", choices:["G major","C minor","B♭ major"], answer:0, explain:"The dominant.", hint:"Closest neighbor." },
    { type:"mc", q:"In a minor-key movement, theme 2 often appears in…", choices:["the relative major","the subdominant minor","no key"], answer:0, explain:"III of the system — the bright cousin.", hint:"L56's pairing." },
    { type:"mc", q:"The development is characterized by…", choices:["fragmentation, sequence and modulation","complete silence","exact repetition"], answer:0, explain:"Instability by design.", hint:"The argument." },
    { type:"mc", q:"The recapitulation's crucial change:", choices:["theme 2 returns in the TONIC","theme 1 is cut","the meter doubles"], answer:0, explain:"Conflict resolved.", hint:"Home for everyone." },
    { type:"mc", q:"A coda is…", choices:["an added ending after the recapitulation","the second theme","the development's nickname"], answer:0, explain:"The tail.", hint:"Extra closing." },
    { type:"mc", q:"A slow section before theme 1 is…", choices:["an introduction","a cadenza","a refrain"], answer:0, explain:"The optional opening frame.", hint:"Before the expo." },
    { type:"truefalse", q:"The development usually stays calmly in one key.", answer:false, explain:"It modulates restlessly.", hint:"The unstable core." },
    { type:"truefalse", q:"Sonata form resolves the exposition's key conflict in the recapitulation.", answer:true, explain:"Both themes home.", hint:"The payoff." },
    { type:"mc", q:"Which toolkit lessons does the development combine?", choices:["Motives (72), sequence (89), modulation (99)","Clefs (3), rests (7)","Blues (70) only"], answer:0, explain:"All three at once.", hint:"The builders." },
    { type:"mc", q:"You hear theme 1 return in the home key after wandering music. You are at…", choices:["the recapitulation","the exposition","the coda"], answer:0, explain:"The landmark return.", hint:"Home again." }
  ],
  miaPerfect:"PERFECT! The grand argument, mapped end to end. \u{1F3F0}\u{1F389}",
  miaPass:"Passed! Present, argue, resolve — sonata form is yours. Next: the forms around it…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Two themes (tonic, then new key), a wandering middle, then both themes home — exposition, development, recapitulation.",
      play:()=>{let t=0;[[60,.3],[64,.3],[67,.6],[74,.3],[71,.3],[67,.6]].forEach(([m,d])=>{MFAudio.tone(m,d*.9,t,.42);t+=d;});} },
    learn:{ label:"sonata form",
      explain:"Exposition (T1 tonic, T2 new key) → development (fragment/sequence/modulate) → recapitulation (both home) → coda.",
      hint:"E-D-R.",
      play:()=>{let t=0;[[60,.3],[64,.3],[67,.5],[60,.3],[64,.3],[67,.7]].forEach(([m,d])=>{MFAudio.tone(m,d*.9,t,.42);t+=d;});} },
    example:{ label:"the examples",
      explain:"Example 1 is a miniature exposition (two themes, two keys); example 2 a development fragment climbing in sequence." },
    game:{ label:"the games",
      explain:"Sprint the map, stage the drama, walk the key plan, then locate moments in the form.",
      hint:"Where is the tonic?" },
    quiz:{ label:"this question",
      explain:"Track two things: WHICH theme, and WHICH key. Exposition splits them; the recapitulation reunites them at home.",
      play:()=>{let t=0;[[74,.3],[71,.3],[67,.5],[67,.3],[64,.3],[60,.7]].forEach(([m,d])=>{MFAudio.tone(m,d*.9,t,.42);t+=d;});} }
  }
};
