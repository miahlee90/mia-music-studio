/* Lesson 91 — Song Forms (Book 4, Unit 22 — SELF-AUTHORED)
   Binary/ternary/rondo (L73-75) get ONE review step only. New material:
   STROPHIC (same music, new words each verse), THROUGH-COMPOSED (new music
   throughout), 32-BAR AABA, VERSE-CHORUS form.
   NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[91]={
  welcome:"Song forms: the shapes whole songs take. \u{1F3A4}",
  hook:{
    say:"<b>A song repeats the same music for every verse</b> — only the words change. \u{1F447} <b>Listen to two 'verses.' What repeats, what changes?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Verse 1</button>
          <button class="play hk-b">▶ Verse 2</button></div>
          <div class="choices hk-ch" style="display:none"><button>The MUSIC repeats exactly — only the words would change</button><button>The music is completely new each time</button><button>Nothing repeats</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        const MEL=[64,64,65,67,67,65,64,62,60];
        container.querySelector(".hk-a").onclick=()=>{ MEL.forEach((m,i)=>MFAudio.tone(m,.3,i*.3,.42)); hA=true; if(hB) setTimeout(()=>ch.style.display="",2900); };
        container.querySelector(".hk-b").onclick=()=>{ MEL.forEach((m,i)=>MFAudio.tone(m,.3,i*.3,.42)); hB=true; if(hA) setTimeout(()=>ch.style.display="",2900); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Identical music both times — with new lyrics per verse, that design is STROPHIC form: the folk song's and hymn's favorite shape. Today: the song forms!");
          else fb(false,"Compare the two 'verses' — every note matched…");
        });
      } }
  },
  objectives:[
    "Review the section forms: AB, ABA, rondo",
    "Define STROPHIC form: the same music for every verse",
    "Define THROUGH-COMPOSED form: new music from start to finish",
    "Read the 32-bar AABA form: A A B A, with the B as bridge",
    "Know VERSE-CHORUS form: alternating story and refrain",
    "Match real songs to their forms"
  ],
  steps:[
    { say:"<b>Section Forms — Review:</b> you know <b>AB</b> (two sections), <b>ABA</b> (the first returns) and the <b>rondo</b> (A keeps returning). Today's forms describe <b>whole songs with lyrics</b>. \u{1F447} <b>ABA form is called…</b>",
      try:{ type:"mc", choices:["Ternary","Binary","Rondo"], answer:0,
        success:"✓ Ternary — statement, contrast, return (Lesson 74). Now the song shapes.",
        fail:"Three parts, two sections…",
        hint:"Ter = three." } },
    { say:"<b>Strophic Form:</b> the <b>same music repeats for every verse (strophe)</b> — only the lyrics change. Folk songs, hymns and carols live here. Labeled <b>A A A…</b> \u{1F447} <b>In strophic form, what changes between verses?</b>",
      try:{ type:"mc", choices:["Only the words","The whole melody","The key, every verse"], answer:0,
        success:"✓ One tune, many verses — the words carry the story.",
        fail:"The hook's two verses shared…",
        hint:"The music is fixed." } },
    { say:"<b>Through-Composed Form:</b> the opposite — <b>new music from start to finish</b>, with no large repeats. The music follows the text wherever it goes; art songs telling stories often work this way. \u{1F447} <b>Through-composed music…</b>",
      try:{ type:"mc", choices:["Keeps introducing new material without repeating sections","Repeats one section forever","Is always instrumental"], answer:0,
        success:"✓ No section returns — the music travels with the words.",
        fail:"Through = onward, never circling back…",
        hint:"The anti-strophic." } },
    { say:"<b>32-Bar AABA Form:</b> the classic popular-song shape — four 8-bar phrases: <b>A A B A</b>. The <b>B</b> is the <b>bridge</b> — new key area, new angle — before A returns. Jazz standards call the whole 32 bars a <b>chorus</b>. \u{1F447} <b>In AABA, the contrasting section is…</b>",
      show:{ type:"html", html:`<div style="display:flex;gap:8px;justify-content:center;font-weight:800;font-size:15px">
        <div style="border:2px solid #2F6DA8;border-radius:10px;padding:8px 14px;color:#2F6DA8">A<br><span style="font-weight:400;font-size:12px;color:#555">8 bars</span></div>
        <div style="border:2px solid #2F6DA8;border-radius:10px;padding:8px 14px;color:#2F6DA8">A<br><span style="font-weight:400;font-size:12px;color:#555">8 bars</span></div>
        <div style="border:2px solid #C05A21;border-radius:10px;padding:8px 14px;color:#C05A21">B<br><span style="font-weight:400;font-size:12px;color:#555">bridge</span></div>
        <div style="border:2px solid #2F6DA8;border-radius:10px;padding:8px 14px;color:#2F6DA8">A<br><span style="font-weight:400;font-size:12px;color:#555">8 bars</span></div></div>` },
      try:{ type:"mc", choices:["The B — the bridge","The first A","The last A"], answer:0,
        success:"✓ B is the bridge: contrast in the third 8, then home to A.",
        fail:"Which letter differs?",
        hint:"Three A's and one…" } },
    { say:"<b>Verse-Chorus Form:</b> today's pop standard — <b>verses</b> (new words, same music) alternate with a <b>chorus</b> (same words AND music, the hook). Often plus a <b>bridge</b> late in the song. <b>Remember: strophic = one tune repeated · through-composed = no repeats · AABA = bridge in the third slot · verse-chorus = alternating story and hook.</b> \u{1F447} <b>In verse-chorus form, which section repeats words AND music?</b>",
      try:{ type:"mc", choices:["The chorus","The verse","Neither"], answer:0,
        success:"✓ The chorus returns whole — that is why everyone sings it.",
        fail:"Which part does the crowd know by heart?",
        hint:"The hook." } },
    { say:"<b>Telling Them Apart:</b> ask two questions — <b>does music repeat?</b> (no → through-composed) and <b>what kind of repeat?</b> (whole song each verse → strophic · AABA chorus → 32-bar · verse/chorus alternation → verse-chorus). \u{1F447} <b>A song runs: story-verse, HOOK, story-verse, HOOK, bridge, HOOK. Its form is…</b>",
      try:{ type:"mc", choices:["Verse-chorus (with bridge)","Strophic","Through-composed"], answer:0,
        success:"✓ Alternating verse and returning chorus — modern pop's blueprint.",
        fail:"The HOOK keeps returning whole…",
        hint:"Story + hook alternation." } },
    { say:"<b>Review:</b> \u{1F447} <b>A hymn sings five verses to identical music. Its form is…</b>",
      try:{ type:"mc", choices:["Strophic","AABA","Through-composed"], answer:0,
        success:"✓ Same music, new words, verse after verse — strophic.",
        fail:"One tune, five texts…",
        hint:"A A A A A." } }
  ],
  examples:[
    { caption:"An 8-bar A phrase of an AABA song, in miniature: this melody would play twice (AA), yield to a bridge (B), then return (A).",
      staff:{clef:"treble",tempo:92,notes:[
        {p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},
        {p:"G4",d:"h"},{p:"E4",d:"h"},{bar:"single"},
        {p:"D4",d:"q"},{p:"F4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"},
        {p:"C5",d:"w",label:"A ends"},{bar:"final"}],width:640},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"A bridge (B) in miniature: new harmony color and direction — built to make A's return feel like home.",
      staff:{clef:"treble",tempo:92,notes:[
        {p:"A4",d:"q"},{p:"C5",d:"q"},{p:"E5",d:"h",label:"new color"},{bar:"single"},
        {p:"D5",d:"q"},{p:"B4",d:"q"},{p:"G4",d:"h",label:"turning…"},{bar:"single"},
        {p:"F4",d:"q"},{p:"G4",d:"q"},{p:"B4",d:"h",label:"…toward A"},{bar:"final"}],width:600},
      kb:{start:53,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Song Form Sprint (45s)",
      intro:"Four song shapes and their signatures — race them!",
      miaIntro:"What repeats? \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Strophic","same music every verse"],
        ["Through-composed","new music throughout"],
        ["32-bar AABA","A A bridge A"],
        ["Verse-chorus","story alternates with the hook"],
        ["The bridge","AABA's B section"],
        ["The chorus","repeats words AND music"],
        ["The verse","new words, same music"],
        ["Hymns and folk songs","usually strophic"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — song shapes mastered!":null },
    { type:"order-tap", title:"Game 2 · Assemble the 32 Bars",
      intro:"Tap the AABA sections in order!",
      miaIntro:"A, A, bridge, A! \u{1F3C1}",
      spec:{sequence:["A — first 8 bars","A — repeated 8","B — the bridge","A — home again"],
        title:"One 32-bar chorus"},
      result:(stars)=>stars>=2?"32 bars assembled!":null },
    { type:"order-tap", title:"Game 3 · Build the Pop Song",
      intro:"Tap a verse-chorus song's sections in performance order!",
      miaIntro:"Story, hook, story, hook! \u{1F3C1}",
      spec:{sequence:["Verse 1 — the story begins","Chorus — the hook","Verse 2 — story continues","Chorus — the hook again","Bridge — a new angle","Final chorus"],
        title:"A verse-chorus song, start to finish"},
      result:(stars)=>stars>=2?"The pop blueprint, in order!":null },
    { type:"term-race", title:"Game 4 · Name That Form",
      intro:"Describe → identify, at speed!",
      miaIntro:"Ask: what repeats? \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["5 verses, identical music","strophic"],
        ["No section ever returns","through-composed"],
        ["A A B A in 32 bars","AABA form"],
        ["Verses alternate with a hook","verse-chorus"],
        ["Two contrasting sections","AB (binary)"],
        ["Statement, contrast, return","ABA (ternary)"],
        ["A keeps coming back with new episodes","rondo"],
        ["The bridge's job","contrast before A returns"]]},
      result:(score)=>score>=6?"Every form named!":null }
  ],
  practiceIntro:"20 practice questions — song shapes old and new. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Strophic","A A A…"],["Through-composed","no repeats"],["AABA","bridge third"],["Verse-chorus","story + hook"],["Bridge","the B of AABA"]], reverse:true}, count:6 },
    { gen:"triad-id", params:{ask:"numeral"}, count:2 },
    { type:"mc", q:"Strophic form repeats…", choices:["the same music for every verse","nothing","only the bridge"], answer:0,
      explain:"New words, one tune." },
    { type:"mc", q:"Through-composed form…", choices:["introduces new music continuously","repeats one section","is always AABA"], answer:0,
      explain:"No large-scale repeats." },
    { type:"mc", q:"The 32-bar form's letters are…", choices:["A A B A","A B C D","A B A B"], answer:0,
      explain:"Four 8-bar phrases." },
    { type:"mc", q:"In AABA, the B section is called…", choices:["the bridge","the coda","the verse"], answer:0,
      explain:"Contrast before A returns." },
    { type:"truefalse", q:"In verse-chorus form, the chorus repeats both words and music.", answer:true,
      explain:"The hook returns whole." },
    { type:"truefalse", q:"Hymns are usually through-composed.", answer:false,
      explain:"Hymns are the classic STROPHIC repertoire." },
    { type:"truefalse", q:"AABA totals 32 bars when each section is 8 bars.", answer:true,
      explain:"4 × 8 = 32." },
    { gen:"term-match", params:{subject:"term", pool:[["Binary","AB"],["Ternary","ABA"],["Rondo","ABACA"],["Chorus","words + music repeat"]], reverse:true}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 }
  ],
  vocabulary:[
    {term:"Strophic Form", def:"The same music repeated for every verse (strophe) — only the words change. A A A…"},
    {term:"Through-Composed Form", def:"New music from start to finish; no large sections repeat."},
    {term:"32-Bar AABA Form", def:"Four 8-bar phrases — A A B A. The B is the bridge; the whole cycle is one chorus."},
    {term:"Verse-Chorus Form", def:"Verses (new words, same music) alternate with a chorus (same words and music), often plus a bridge."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Strophic</b>: one tune, every verse — hymns and folk songs.",
    "✔ <b>Through-composed</b>: new music throughout — story-following art songs.",
    "✔ <b>AABA</b>: 8+8+8+8 with the <b>bridge</b> third — jazz standards' chorus.",
    "✔ <b>Verse-chorus</b>: story alternates with the returning hook — modern pop.",
    "✔ ID method: does music repeat, and HOW?"
  ],
  tips:[
    "Radio exercise: label tonight's songs V-C-V-C-B-C — you'll find the blueprint everywhere.",
    "AABA hides inside many verse-chorus songs: choruses themselves often run AABA internally.",
    "Writing strophic verses? Make the melody neutral enough to carry different words — that's the craft.",
    "Unit 22 complete! Next unit: chords grow a fourth note — the seventh chords."
  ],
  rewards:{ badge:"Songsmith", icon:"\u{1F3A4}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! What repeats — and how?",
  quiz:[
    { type:"mc", q:"Strophic form is…", choices:["the same music for every verse","new music each verse","instrumental only"], answer:0,
      explain:"A A A — words change, tune stays.", hint:"Hymn design." },
    { type:"mc", q:"Through-composed form is…", choices:["continuously new music","one repeated section","always 32 bars"], answer:0,
      explain:"No section returns.", hint:"Onward only." },
    { type:"mc", q:"The 32-bar form runs…", choices:["A A B A","A B A C","B A A B"], answer:0,
      explain:"Four eights, bridge third.", hint:"Three A's." },
    { type:"mc", q:"AABA's B section is nicknamed…", choices:["the bridge","the intro","the outro"], answer:0,
      explain:"Contrast, then home.", hint:"Crosses to A's return." },
    { type:"mc", q:"In verse-chorus form, the verses…", choices:["keep the music, change the words","change everything","never appear twice"], answer:0,
      explain:"The story rides one tune.", hint:"Strophic DNA." },
    { type:"mc", q:"The chorus differs from the verse because it…", choices:["repeats words AND music","never repeats","has no melody"], answer:0,
      explain:"The whole hook returns.", hint:"Crowd's part." },
    { type:"mc", q:"A five-verse folk ballad with one tune is…", choices:["strophic","AABA","through-composed"], answer:0,
      explain:"A per verse.", hint:"One tune, many texts." },
    { type:"mc", q:"An art song whose music never repeats, following the poem line by line, is…", choices:["through-composed","strophic","verse-chorus"], answer:0,
      explain:"Music travels with the text.", hint:"No returns." },
    { type:"truefalse", q:"In AABA, the bridge comes third.", answer:true,
      explain:"A A B A.", hint:"Count the slots." },
    { type:"truefalse", q:"Verse-chorus songs may also contain a bridge.", answer:true,
      explain:"Usually before the final chorus.", hint:"The late-song contrast." },
    { type:"mc", q:"V-C-V-C-B-C describes…", choices:["a verse-chorus song with bridge","strophic form","a rondo"], answer:0,
      explain:"Modern pop's standard order.", hint:"Hook keeps returning." },
    { type:"mc", q:"Which two questions identify any song form?", choices:["Does music repeat — and how?","How loud — and how fast?","Which key — and which meter?"], answer:0,
      explain:"Repetition pattern = form.", hint:"The ID method." }
  ],
  miaPerfect:"PERFECT! Strophic to through-composed — every song shape mapped. \u{1F3A4}\u{1F389}",
  miaPass:"Passed — and UNIT 22 is COMPLETE! Structure, from phrase to whole song. \u{1F389}",
  mia:{
    hook:{ label:"the welcome",
      explain:"Both verses used identical music — with changing words, that is strophic form.",
      play:()=>{[64,64,65,67,67,65,64,62,60].forEach((m,i)=>MFAudio.tone(m,.3,i*.3,.42));} },
    learn:{ label:"song forms",
      explain:"Strophic (A A A), through-composed (no repeats), 32-bar AABA (bridge third), verse-chorus (story + hook, often bridge).",
      hint:"What repeats, and how?",
      play:()=>{[60,64,67,69,67].forEach((m,i)=>MFAudio.tone(m,.32,i*.3,.42));} },
    example:{ label:"the examples",
      explain:"Example 1 is an AABA song's A phrase; example 2 a bridge, engineered to make A's return satisfying." },
    game:{ label:"the games",
      explain:"Sprint the shapes, assemble 32 bars, build a pop song in order, then name forms from descriptions.",
      hint:"Bridge = the B slot." },
    quiz:{ label:"this question",
      explain:"One method: find what repeats. Whole tune per verse = strophic; nothing = through-composed; AABA = bridge third; verse/chorus alternation = pop form.",
      play:()=>{[60,64,67,72].forEach((m,i)=>MFAudio.tone(m,.34,i*.3,.42));} }
  }
};
