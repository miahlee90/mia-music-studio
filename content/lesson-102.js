/* Lesson 102 — Sonata Form (Book 4, Unit 25 — SELF-AUTHORED)
   Core: EXPOSITION (theme 1 in tonic, theme 2 in a new key — usually V or
   relative major) → DEVELOPMENT (themes fragmented, sequenced, modulating)
   → RECAPITULATION (both themes home in the tonic) → optional CODA.
   Built on: periods (L88), sequence (L89), modulation (L99).
   NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[102]={
  welcome:"Sonata form presents, develops, and recomposes contrasting tonal and thematic material.",
  hook:{
    say:"<b>The exposition presents primary material in the tonic and secondary material in a contrasting key. After a developmental passage, the opening material returns.</b> \u{1F447} <b>What happens to the secondary material in the recapitulation?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the short sonata-form example</button></div>
          <div class="choices hk-ch" style="display:none"><button>The primary and secondary material return in the tonic key area</button><button>Entirely unrelated themes replace the opening material</button><button>The opening material never returns</button></div>`;
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
          if(i===0) fb(true,"✓ Correct. The exposition establishes contrasting tonal areas, the development destabilizes or transforms the material, and the recapitulation returns the principal material with the secondary area resolved into the tonic region.");
          else fb(false,"Listen for the return of the opening material and the new tonal placement of the secondary theme group.");
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
    { say:"<b>The Basic Plan:</b> Sonata form is commonly organized into three large functional sections. <b>Exposition</b> establishes the principal thematic material and contrasting tonal areas. <b>Development</b> transforms, fragments, combines, or reinterprets material while creating tonal instability. <b>Recapitulation</b> returns the principal material and resolves the exposition's tonal contrast, usually within the tonic region. A slow introduction may precede the exposition, and a coda may follow the recapitulation; expositions are also frequently repeated. \u{1F447} <b>What are the three principal sections of sonata form?</b>",
      show:{ type:"html", html:`<div style="border:1px solid #A9821F;background:#FBF6E9;border-radius:8px;padding:8px 12px;margin-bottom:10px;font-size:12.5px;color:#5a4a12;text-align:left"><b>Sonata form vs. sonata genre:</b> Sonata form is the formal design studied in this lesson. A <i>sonata</i> is a multi-movement instrumental genre. A movement of a sonata may use sonata form, but not every movement does, and sonata form also appears in symphonies, quartets, concertos, overtures, and other genres.</div><div style="display:flex;gap:8px;justify-content:center;font-weight:800;font-size:14px;flex-wrap:wrap">
        <div style="border:2px solid #2F6DA8;border-radius:10px;padding:8px 12px;color:#2F6DA8">EXPOSITION<br><span style="font-weight:400;font-size:11.5px;color:#555">primary (tonic) · secondary (new key)</span></div>
        <div style="border:2px solid #C05A21;border-radius:10px;padding:8px 12px;color:#C05A21">DEVELOPMENT<br><span style="font-weight:400;font-size:11.5px;color:#555">fragments · sequences · keys</span></div>
        <div style="border:2px solid #2F6DA8;border-radius:10px;padding:8px 12px;color:#2F6DA8">RECAPITULATION<br><span style="font-weight:400;font-size:11.5px;color:#555">primary + secondary in tonic</span></div>
        <div style="border:2px solid #A9821F;border-radius:10px;padding:8px 12px;color:#A9821F">CODA<br><span style="font-weight:400;font-size:11.5px;color:#555">optional tail</span></div></div>` },
      try:{ type:"mc", choices:["exposition, development, and recapitulation","verse, chorus, and bridge","A, B, A, C, and A"], answer:0,
        success:"✓ Correct. The exposition establishes the material, the development transforms it, and the recapitulation returns and tonally resolves it.",
        fail:"Recall the three principal formal functions.",
        hint:"Exposition → development → recapitulation." } },
    { say:"<b>The Exposition:</b> The primary thematic area normally begins in the tonic. A transition leads toward a contrasting tonal area, where the secondary theme group appears. In a major-key movement, the secondary area is commonly the dominant. In a minor-key movement, it is often the relative major, although other key relationships occur. A closing section may confirm the secondary key. \u{1F447} <b>In a conventional C-major sonata-form exposition, which key commonly supports the secondary theme group?</b>",
      try:{ type:"mc", choices:["G major, the dominant","C major, the tonic","F♯ minor"], answer:0,
        success:"✓ Correct. In a conventional major-key exposition, the secondary thematic area commonly appears in the dominant key.",
        fail:"Identify the dominant key of C major.",
        hint:"The dominant of C major is G major." } },
    { say:"<b>The Development:</b> The development often transforms material from the exposition through fragmentation, sequence, recombination, rhythmic change, contrapuntal treatment, and modulation. It may also introduce new material. Tonal instability and increasing emphasis on the dominant commonly prepare the return of the tonic and the recapitulation. \u{1F447} <b>Which process commonly occurs in a development section?</b>",
      try:{ type:"mc", choices:["thematic transformation and tonal instability","initial presentation of the complete exposition","exact repetition of the exposition in every detail"], answer:0,
        success:"✓ Correct. The development reworks familiar material or introduces related ideas within a less tonally stable context.",
        fail:"Listen for fragmentation, sequence, recombination, and changes of key.",
        hint:"The exposition's material is transformed rather than simply restated." } },
    { say:"<b>The Recapitulation:</b> The recapitulation begins with the return of the primary thematic area, usually in the tonic. The transition is recomposed so that the secondary thematic area also appears in the tonic region rather than the contrasting key of the exposition. This tonal return provides the principal large-scale resolution of the form. \u{1F447} <b>What is the principal tonal change to the secondary thematic area in a conventional recapitulation?</b>",
      try:{ type:"mc", choices:["it returns in the tonic region","it is always omitted","it becomes a fugue"], answer:0,
        success:"✓ Correct. The secondary area is recomposed into the tonic region, resolving the exposition's large-scale tonal contrast.",
        fail:"Compare the key of the secondary area in the exposition with its key in the recapitulation.",
        hint:"The recapitulation brings the secondary area into the tonic region." } },
    { say:"<b>Optional Framing Sections:</b> An introduction may precede the exposition and may use a slower tempo or different character. A coda may follow the main recapitulation and extend, reinforce, or further develop the closing tonic area. Codas range from brief closing gestures to substantial formal sections. <b>Remember: exposition establishes thematic material and tonal contrast · development transforms material and creates tonal instability · recapitulation returns the principal material and resolves the contrast · coda is an optional closing extension.</b> \u{1F447} <b>What is a coda in sonata form?</b>",
      try:{ type:"mc", choices:["an optional closing section following the main recapitulation","the required secondary theme","a melodic ornament"], answer:0,
        success:"✓ Correct. A coda extends the closing portion of the movement and reinforces or develops its final tonal resolution.",
        fail:"Identify the optional section that extends the ending.",
        hint:"It occurs after the main recapitulation." } },
    { say:"<b>Where Sonata Form Appears:</b> Sonata form is especially common in first movements of Classical and Romantic sonatas, symphonies, string quartets, and concertos. It also appears in finales, overtures, slow movements, and works from later periods. Its design varies according to genre, historical period, and composer. \u{1F447} <b>In which musical context is sonata form especially common?</b>",
      try:{ type:"mc", choices:["first movements of many sonatas, symphonies, and chamber works","strophic folk-song verses only","unaccompanied drum solos only"], answer:0,
        success:"✓ Correct. Sonata form is especially common in first movements, although it may appear in other movements and genres.",
        fail:"Consider large instrumental movements from the Classical and Romantic traditions.",
        hint:"It frequently appears in opening movements." } },
    { say:"<b>Review:</b> \u{1F447} <b>Which sequence shows the principal sections of sonata form in their usual order?</b>",
      try:{ type:"mc", choices:["exposition → development → recapitulation → optional coda","development → exposition → coda","recapitulation → exposition → development"], answer:0,
        success:"✓ Correct. The exposition establishes the formal and tonal material, the development transforms it, and the recapitulation returns and resolves it. A coda may follow.",
        fail:"Begin with the section that establishes the thematic and tonal material.",
        hint:"E–D–R, followed by an optional coda." } }
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
    { type:"gen-race", title:"Game 1 · Sonata-Form Functions",
      intro:"Match each formal section with its thematic and tonal function.",
      miaIntro:"Establish, develop, recapitulate.",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Exposition","contrasting tonal areas"],
        ["Development","fragments, sequences, modulations"],
        ["Recapitulation","secondary area now in the tonic"],
        ["Coda","the optional tail"],
        ["Theme 1's key","the tonic"],
        ["Theme 2's key (exposition)","dominant or relative major"],
        ["Theme 2's key (recap)","the tonic — resolved"],
        ["Sonata form's home","first movements"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — sonata-form functions identified!":null },
    { type:"order-tap", title:"Game 2 · Arrange the Formal Events",
      intro:"Arrange the principal events of a conventional sonata-form movement.",
      miaIntro:"Exposition → development → recapitulation → optional coda.",
      spec:{sequence:["Theme 1 — tonic","Theme 2 — new key","Development — fragments wander","Recapitulation — both themes home","Coda — the tail"],
        title:"One movement, start to finish"},
      result:(stars)=>stars>=2?"You arranged the formal events correctly.":null },
    { type:"key-climb", title:"Game 3 · Perform the Tonal Plan",
      intro:"Play a short primary idea in C major, a secondary idea in G major, and then the secondary idea in C major as it would appear in the recapitulation.",
      miaIntro:"Exposition contrast, then recapitulation in the tonic.",
      spec:{seq:[60,67,60],
        names:["C — primary idea","G — secondary idea","C — secondary idea resolved"],
        start:55, octaves:2, title:"The tonal plot in three notes"},
      result:(score)=>score!==null?"You demonstrated the conventional tonal plan.":null },
    { type:"term-race", title:"Game 4 · Identify the Section",
      intro:"Match each description with the appropriate sonata-form section.",
      miaIntro:"Identify both the thematic process and tonal function.",
      spec:{rounds:8, reverse:true, pool:[
        ["Theme 2 enters in the dominant","exposition"],
        ["A motive sequences through keys","development"],
        ["Theme 2 returns — in the tonic","recapitulation"],
        ["A slow opening before theme 1","introduction"],
        ["Closing section after the recap","coda"],
        ["Maximum instability","development"],
        ["The key conflict is created","exposition"],
        ["The key conflict is resolved","recapitulation"]]},
      result:(score)=>score>=6?"You identified the sections correctly.":null }
  ],
  practiceIntro:"Complete 20 practice questions on sonata-form sections, thematic processes, and tonal relationships.",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Exposition","presents"],["Development","argues"],["Recapitulation","resolves"],["Coda","tail"],["Transition","modulating bridge"]], reverse:true}, count:6 },
    { gen:"rel-key", params:{ask:"both"}, count:2 },
    { type:"mc", q:"Sonata form's three main sections are…", choices:["exposition, development, recapitulation","intro, verse, chorus","A, B, A"], answer:0, explain:"E-D-R." },
    { type:"mc", q:"In a conventional major-key exposition, the secondary thematic area normally appears in…", choices:["a contrasting key, commonly the dominant","the tonic in every case","no identifiable key"], answer:0, explain:"The key conflict." },
    { type:"mc", q:"The development treats the themes by…", choices:["fragmenting and sequencing them through keys","ignoring them","playing them backwards only"], answer:0, explain:"Instability by design." },
    { type:"mc", q:"In a conventional recapitulation, the secondary thematic area…", choices:["returns in the tonic region","must remain in the exposition's contrasting key","must disappear"], answer:0, explain:"Resolution." },
    { type:"truefalse", q:"A coda is required in every sonata-form movement.", answer:false, explain:"Optional tail." },
    { type:"truefalse", q:"A minor-key exposition often puts theme 2 in the relative major.", answer:true, explain:"The minor-mode convention." },
    { type:"truefalse", q:"Many symphonic first movements use sonata form.", answer:true, explain:"Sonata form also appears in other movements and genres." },
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
  miaQuizIntro:"Quiz: Identify the thematic and tonal functions of exposition, development, and recapitulation.",
  quiz:[
    { type:"mc", q:"Sonata form's sections, in order:", choices:["exposition, development, recapitulation","development, exposition, coda","recapitulation, development, exposition"], answer:0, explain:"E-D-R.", hint:"Present first." },
    { type:"mc", q:"What does the exposition normally establish?", choices:["principal thematic material and contrasting tonal areas","exactly one theme with no tonal contrast","chords without thematic material"], answer:0, explain:"Thematic material plus contrasting tonal areas.", hint:"The conflict." },
    { type:"mc", q:"In a C major movement, theme 2's usual expo key is…", choices:["G major","C minor","B♭ major"], answer:0, explain:"The dominant.", hint:"Closest neighbor." },
    { type:"mc", q:"In a minor-key exposition, the secondary thematic area often appears in…", choices:["the relative major","the subdominant minor in every case","no key"], answer:0, explain:"The relative major shares the minor key's key signature and commonly provides the contrasting tonal area.", hint:"Shared key signature." },
    { type:"mc", q:"The development is characterized by…", choices:["fragmentation, sequence and modulation","complete silence","exact repetition"], answer:0, explain:"Instability by design.", hint:"The argument." },
    { type:"mc", q:"What is the recapitulation's principal tonal resolution?", choices:["the secondary thematic area returns in the tonic region","the primary theme is always omitted","the meter must change"], answer:0, explain:"Conflict resolved.", hint:"Home for everyone." },
    { type:"mc", q:"A coda is…", choices:["an added ending after the recapitulation","the second theme","the development's nickname"], answer:0, explain:"The tail.", hint:"Extra closing." },
    { type:"mc", q:"A slow section before theme 1 is…", choices:["an introduction","a cadenza","a refrain"], answer:0, explain:"The optional opening frame.", hint:"Before the expo." },
    { type:"truefalse", q:"A development section must remain in one stable key throughout.", answer:false, explain:"Developments often move through several keys or destabilize the tonic, although individual examples vary.", hint:"The unstable core." },
    { type:"truefalse", q:"Sonata form resolves the exposition's key conflict in the recapitulation.", answer:true, explain:"Both themes home.", hint:"The payoff." },
    { type:"mc", q:"Which techniques commonly appear in a development section?", choices:["motive fragmentation, sequence, recombination, and modulation","clef changes and rest notation only","twelve-bar blues only"], answer:0, explain:"Familiar material transformed through several techniques.", hint:"Transforming the themes." },
    { type:"mc", q:"After a development, the primary thematic area returns in the tonic and leads to a tonic-key restatement of the secondary area. Which section is this?", choices:["the recapitulation","the exposition","the introduction"], answer:0, explain:"The recapitulation returns the principal thematic material and resolves the secondary tonal area into the tonic region.", hint:"Both areas home in the tonic." }
  ],
  miaPerfect:"Perfect score! You accurately identified the thematic and tonal functions of sonata form.",
  miaPass:"You passed! Next, you will compare larger instrumental forms.",
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
