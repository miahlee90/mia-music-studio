/* Lesson 96 — Nonharmonic Tones Expanded (Book 4, Unit 24 — SELF-AUTHORED)
   L66's passing/neighbor tones = ONE review step. New: SUSPENSION (4-3, 7-6,
   9-8: preparation-suspension-resolution), APPOGGIATURA (leap in, step out),
   ESCAPE TONE (step in, leap out), ANTICIPATION (melodic — early arrival of
   the NEXT chord's tone; distinct from L78's rhythmic anticipation),
   PEDAL POINT (held bass under changing harmony), RETARDATION (upward
   suspension). NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[96]={
  welcome:"Six more ways a note can not belong. \u{1F3AD}",
  hook:{
    say:"<b>Listen: a note HOLDS while the chord changes under it</b> — it clashes for a moment, then slides down to fit. \u{1F447} <b>What resolved the clash?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the suspension</button></div>
          <div class="choices hk-ch" style="display:none"><button>The held note stepped DOWN into the new chord</button><button>The chord changed again</button><button>The note jumped an octave</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{
          [53,57,60].forEach(m=>MFAudio.tone(m,1.0,.05,.25)); MFAudio.tone(72,1.0,.05,.4);   /* F chord, C on top */
          [55,59,62].forEach(m=>MFAudio.tone(m,1.0,1.15,.25)); MFAudio.tone(72,.7,1.15,.4);  /* G chord, C held = 4-3 sus */
          MFAudio.tone(71,1.1,1.9,.42);                                                      /* resolves to B */
          setTimeout(()=>ch.style.display="",3300);
        };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ The C held over the new G chord (clash!), then stepped down to B (fit) — a SUSPENSION: prepare, suspend, resolve. Six new non-chord tones today!");
          else fb(false,"Follow the top note: it stayed… clashed… then moved by STEP…");
        });
      } }
  },
  objectives:[
    "Review passing and neighboring tones (Lesson 66) in one step",
    "SUSPENSION: prepare - suspend - resolve down (4-3, 7-6, 9-8)",
    "RETARDATION: a suspension resolving UP",
    "APPOGGIATURA: leap in, step out",
    "ESCAPE TONE: step in, leap out",
    "ANTICIPATION and PEDAL POINT"
  ],
  steps:[
    { say:"<b>Review:</b> a non-chord tone is a melody note outside the current chord (Lesson 66): <b>passing</b> connects two different chord tones by step; <b>neighbor</b> leaves and returns to the same one. Today's six are classified the same way — <b>by how they enter and leave</b>. \u{1F447} <b>Non-chord tones are identified by…</b>",
      try:{ type:"mc", choices:["How they enter and how they leave","Their volume","Their octave"], answer:0,
        success:"✓ Approach + departure = the tone's name.",
        fail:"Passing: step in, step on. Neighbor: step in, step back…",
        hint:"In and out." } },
    { say:"<b>Suspension:</b> three stages — <b>PREPARATION</b> (the note belongs to chord 1) → <b>SUSPENSION</b> (it holds while chord 2 arrives — dissonance) → <b>RESOLUTION</b> (it steps DOWN into chord 2). Named by intervals above the bass: <b>4-3, 7-6, 9-8</b>. \u{1F447} <b>A suspension resolves by…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:66,notes:[
        {p:"C5",d:"h",label:"prep"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"C5",d:"h",label:"SUS (4)"},{p:"G4",d:"h",chord:true},{p:"D5",d:"h",chord:true},
        {p:"B4",d:"w",label:"res (3)"},{p:"G4",d:"w",chord:true},{p:"D5",d:"w",chord:true},{bar:"final"}],width:520} },
      try:{ type:"mc", choices:["Stepping DOWN into the new chord","Leaping up an octave","Staying forever"], answer:0,
        success:"✓ Down by step — 4 falls to 3, 7 to 6, 9 to 8.",
        fail:"Which direction did the hook's C move?",
        hint:"Gravity wins." } },
    { say:"<b>Retardation:</b> the same prepare-hold-resolve shape, but the resolution goes <b>UP</b> — most often 7 rising to 8 at a final cadence. \u{1F447} <b>A retardation is a suspension that…</b>",
      try:{ type:"mc", choices:["Resolves upward","Never resolves","Skips the preparation"], answer:0,
        success:"✓ Same engine, upward release — the leading tone's favorite.",
        fail:"Re-TARD = delayed, but rising…",
        hint:"7 → 8." } },
    { say:"<b>Appoggiatura vs Escape Tone:</b> mirror twins. <b>APPOGGIATURA: LEAP in, STEP out</b> — an accented lean into the chord. <b>ESCAPE TONE: STEP in, LEAP out</b> — an unaccented slip away. \u{1F447} <b>A note approached by leap and left by step is…</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14.5px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Tone</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Enters by</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Leaves by</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;font-weight:800;color:#2F6DA8">Passing</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">step</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">step (onward)</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;font-weight:800;color:#2F6DA8">Neighbor</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">step</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">step (back)</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;font-weight:800;color:#C05A21">Appoggiatura</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800">leap</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">step</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;font-weight:800;color:#C05A21">Escape tone</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">step</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800">leap</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;font-weight:800;color:#A9821F">Suspension</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">held over</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">step down</td></tr></table>` },
      try:{ type:"mc", choices:["An appoggiatura","An escape tone","A pedal point"], answer:0,
        success:"✓ Leap in, step out — the accented lean.",
        fail:"Check the table's rows…",
        hint:"Leap first." } },
    { say:"<b>Anticipation (melodic):</b> a note of the <b>NEXT chord arrives early</b>, clashing briefly with the current one, then the chord catches up. (Lesson 78's anticipation was about rhythm; this one is about pitch — same instinct, different domain.) \u{1F447} <b>A melodic anticipation belongs to…</b>",
      try:{ type:"mc", choices:["The NEXT chord — it arrives ahead of it","The previous chord","No chord at all"], answer:0,
        success:"✓ Tomorrow's note today — the harmony arrives and absorbs it.",
        fail:"Antici-PATE = ahead of…",
        hint:"Early guest." } },
    { say:"<b>Pedal Point:</b> a <b>bass note HELD (or repeated) while harmonies change above it</b> — usually the tonic or dominant. The pedal is consonant, then dissonant, then consonant again as chords pass. <b>Remember: suspensions fall, retardations rise, appoggiaturas leap in, escape tones leap out, anticipations come early, pedals stay put.</b> \u{1F447} <b>A pedal point lives in which voice, usually?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:72,notes:[
        {p:"C4",d:"h",label:"pedal C"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"C4",d:"h",label:"(held)"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"C4",d:"h"},{p:"D4",d:"h",chord:true},{p:"B4",d:"h",chord:true},
        {p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:560} },
      try:{ type:"mc", choices:["The bass","The soprano always","No voice"], answer:0,
        success:"✓ The bass anchors while harmony travels — tonic and dominant pedals are the classics.",
        fail:"PEDAL — think organ feet…",
        hint:"The lowest voice." } },
    { say:"<b>Review:</b> \u{1F447} <b>Prepare on chord 1, hold into chord 2, step down: which tone?</b>",
      try:{ type:"mc", choices:["Suspension","Appoggiatura","Escape tone"], answer:0,
        success:"✓ The three-stage fall — prepare, suspend, resolve.",
        fail:"Three stages, downward landing…",
        hint:"4-3." } }
  ],
  examples:[
    { caption:"A 4-3 suspension at a cadence: the C prepares over F (IV), holds over G (V) as a dissonant 4th, then falls to B — the 3rd. Prepare, suspend, resolve.",
      staff:{clef:"treble",tempo:63,notes:[
        {p:"C5",d:"h",label:"prep"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"C5",d:"h",label:"sus 4"},{p:"G4",d:"h",chord:true},{p:"D5",d:"h",chord:true},
        {p:"B4",d:"h",label:"res 3"},{p:"G4",d:"h",chord:true},{p:"D5",d:"h",chord:true},
        {p:"C5",d:"w",label:"I"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:600},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"A tonic pedal: C holds in the bass through I, IV and V7 colors above — consonant, dissonant, consonant — then everything agrees again.",
      staff:{clef:"treble",tempo:69,notes:[
        {p:"C4",d:"h",label:"pedal"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"C4",d:"h"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"C4",d:"h"},{p:"B3",d:"h",chord:true},{p:"F4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:620},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Non-Chord Tone Sprint (45s)",
      intro:"Eight tones, one classification system — race it!",
      miaIntro:"In and out! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Suspension","hold over, resolve DOWN"],
        ["Retardation","hold over, resolve UP"],
        ["Appoggiatura","leap in, step out"],
        ["Escape tone","step in, leap out"],
        ["Anticipation (melodic)","next chord's note, early"],
        ["Pedal point","held bass under changing chords"],
        ["Passing tone","step through to a new chord tone"],
        ["Neighbor tone","step out and back"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — all eight classified!":null },
    { type:"order-tap", title:"Game 2 · Stage the Suspension",
      intro:"Tap the suspension's three stages in order!",
      miaIntro:"Prepare, suspend, resolve! \u{1F3C1}",
      spec:{sequence:["Preparation — the note belongs to chord 1","Suspension — it holds as chord 2 clashes","Resolution — it steps down into chord 2"],
        title:"The three-stage fall"},
      result:(stars)=>stars>=2?"Stages mastered!":null },
    { type:"symbol-hunt", title:"Game 3 · Name the Figures",
      intro:"Suspension figures on cards — click what each round names!",
      miaIntro:"Count above the bass! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"4-3 suspension", spec:{clef:"treble",notes:[{p:"G3",d:"h"},{p:"C5",d:"h",chord:true},{p:"G3",d:"h"},{p:"B4",d:"h",chord:true}],width:180}},
        {label:"7-6 suspension", spec:{clef:"treble",notes:[{p:"A3",d:"h"},{p:"G4",d:"h",chord:true},{p:"A3",d:"h"},{p:"F4",d:"h",chord:true}],width:180}},
        {label:"9-8 suspension", spec:{clef:"treble",notes:[{p:"C4",d:"h"},{p:"D5",d:"h",chord:true},{p:"C4",d:"h"},{p:"C5",d:"h",chord:true}],width:180}},
        {label:"Retardation (7-8, rising)", spec:{clef:"treble",notes:[{p:"C4",d:"h"},{p:"B4",d:"h",chord:true},{p:"C4",d:"h"},{p:"C5",d:"h",chord:true}],width:180}}]},
      result:(score)=>score>=5?"Figures read above the bass!":null },
    { type:"term-race", title:"Game 4 · Enter/Exit Race",
      intro:"Approach + departure → name the tone, at speed!",
      miaIntro:"Two moves name it! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Leap in, step out","appoggiatura"],
        ["Step in, leap out","escape tone"],
        ["Held over, falls","suspension"],
        ["Held over, rises","retardation"],
        ["Arrives before its chord","anticipation"],
        ["Bass that will not move","pedal point"],
        ["Step-step onward","passing tone"],
        ["Step-step back","neighbor tone"]]},
      result:(score)=>score>=6?"Entries and exits automatic!":null }
  ],
  practiceIntro:"20 practice questions — entries, exits and figures. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Suspension","falls by step"],["Retardation","rises by step"],["Appoggiatura","leap in"],["Escape tone","leap out"],["Pedal","held bass"],["Anticipation","early arrival"]], reverse:true}, count:6 },
    { gen:"triad-id", params:{ask:"numeral"}, count:2 },
    { type:"mc", q:"The suspension's three stages are…", choices:["preparation, suspension, resolution","attack, decay, release","verse, chorus, bridge"], answer:0,
      explain:"Belong, clash, fall." },
    { type:"mc", q:"Suspension figures count intervals above…", choices:["the bass","the melody","the root"], answer:0,
      explain:"4-3, 7-6, 9-8 — all bass-relative." },
    { type:"mc", q:"An appoggiatura enters by…", choices:["leap","step","holding over"], answer:0,
      explain:"Leap in, step out." },
    { type:"mc", q:"An escape tone leaves by…", choices:["leap","step","not leaving"], answer:0,
      explain:"Step in, leap out." },
    { type:"truefalse", q:"A retardation resolves upward.", answer:true,
      explain:"Usually 7 rising to 8." },
    { type:"truefalse", q:"A pedal point usually sits in the soprano.", answer:false,
      explain:"The BASS — tonic or dominant pedals." },
    { type:"truefalse", q:"A melodic anticipation belongs to the chord that is coming.", answer:true,
      explain:"It arrives early and waits." },
    { gen:"term-match", params:{subject:"term", pool:[["4-3","suspension figure"],["7-8 rising","retardation"],["Tonic or dominant","common pedal notes"],["L78's anticipation","rhythm; this one is pitch"]], reverse:true}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 }
  ],
  vocabulary:[
    {term:"Suspension (4-3, 7-6, 9-8)", def:"Prepare on chord 1, hold into chord 2, resolve DOWN by step. Figures count from the bass."},
    {term:"Retardation", def:"A suspension that resolves UP — usually 7 rising to 8."},
    {term:"Appoggiatura / Escape Tone", def:"Appoggiatura: leap in, step out (accented). Escape tone: step in, leap out (unaccented)."},
    {term:"Anticipation / Pedal Point", def:"Anticipation: the next chord's note arrives early. Pedal: a held bass under changing harmony."}
  ],
  mistakes:[],
  summary:[
    "✔ Non-chord tones are named by <b>entry + exit</b>.",
    "✔ <b>Suspension</b>: prepare → hold → fall (4-3, 7-6, 9-8) · <b>retardation</b> rises.",
    "✔ <b>Appoggiatura</b>: leap in, step out · <b>escape tone</b>: step in, leap out.",
    "✔ <b>Anticipation</b>: tomorrow's note today · <b>pedal</b>: the bass that stays.",
    "✔ With L66's passing and neighbor: eight tones, one system."
  ],
  tips:[
    "Suspensions are expressive gold: the clash is the emotion, the resolution is the relief — do not rush them.",
    "Hear a 4-3 everywhere: it is the classic 'sus4 resolving' from Lesson 93, now with its full name.",
    "Pedal test: if the bass refuses to move while chords argue above, it is a pedal point.",
    "Next lesson: writing for four voices — SATB voice leading."
  ],
  rewards:{ badge:"Tension Curator", icon:"\u{1F3AD}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Entry + exit = the name.",
  quiz:[
    { type:"mc", q:"Non-chord tones are classified by…", choices:["how they enter and leave","their loudness","their octave"], answer:0,
      explain:"Approach + departure.", hint:"Two moves." },
    { type:"mc", q:"The suspension's stages, in order:", choices:["preparation → suspension → resolution","resolution → suspension → preparation","leap → step → hold"], answer:0,
      explain:"Belong, clash, fall.", hint:"P-S-R." },
    { type:"mc", q:"A 4-3 suspension resolves…", choices:["down by step to the chord's 3rd","up an octave","to the root"], answer:0,
      explain:"The 4th above the bass falls to the 3rd.", hint:"Numbers name intervals above the bass." },
    { type:"mc", q:"A retardation differs from a suspension by…", choices:["resolving upward","having no preparation","being in the bass"], answer:0,
      explain:"Usually 7 rising to 8.", hint:"Direction." },
    { type:"mc", q:"Leap in, step out describes…", choices:["the appoggiatura","the escape tone","the pedal point"], answer:0,
      explain:"The accented lean.", hint:"Landing softened by step." },
    { type:"mc", q:"Step in, leap out describes…", choices:["the escape tone","the appoggiatura","the suspension"], answer:0,
      explain:"The unaccented slip away.", hint:"Mirror twin." },
    { type:"mc", q:"A melodic anticipation is…", choices:["the next chord's tone arriving early","the previous chord's tone holding","a held bass"], answer:0,
      explain:"Early guest, soon absorbed.", hint:"Ahead of the change." },
    { type:"mc", q:"A pedal point is…", choices:["a sustained bass under changing harmonies","a fast melody","a type of cadence"], answer:0,
      explain:"Usually tonic or dominant in the bass.", hint:"The unmoving voice." },
    { type:"truefalse", q:"Suspension figures 4-3, 7-6 and 9-8 count intervals above the bass.", answer:true,
      explain:"Bass-relative, like figured bass.", hint:"Lesson 54's habit." },
    { type:"truefalse", q:"This lesson's anticipation and Lesson 78's anticipation are the same concept.", answer:false,
      explain:"L78's was rhythmic (timing); this one is melodic (pitch).", hint:"Different domains." },
    { type:"mc", q:"Identify: the soprano holds C over a G chord, then falls to B.", choices:["A 4-3 suspension","An escape tone","A pedal point"], answer:0,
      explain:"C is the 4th above G; B the 3rd.", hint:"Held, then fell." },
    { type:"mc", q:"Which pair are exact mirror processes?", choices:["Appoggiatura and escape tone","Suspension and pedal","Passing and anticipation"], answer:0,
      explain:"Leap-step vs step-leap.", hint:"Swapped entries and exits." }
  ],
  miaPerfect:"PERFECT! Eight tones, every entry and exit tracked. \u{1F3AD}\u{1F389}",
  miaPass:"Passed! Dissonance now works FOR you. Next: four voices at once…",
  mia:{
    hook:{ label:"the welcome",
      explain:"The C held over the new chord, clashed, then stepped down — a suspension: prepare, suspend, resolve.",
      play:()=>{[53,57,60].forEach(m=>MFAudio.tone(m,1.0,.05,.25));MFAudio.tone(72,1.0,.05,.4);[55,59,62].forEach(m=>MFAudio.tone(m,1.0,1.15,.25));MFAudio.tone(72,.7,1.15,.4);MFAudio.tone(71,1.1,1.9,.42);} },
    learn:{ label:"non-chord tones expanded",
      explain:"Entry+exit names the tone: suspension (hold, fall), retardation (hold, rise), appoggiatura (leap in), escape (leap out), anticipation (early), pedal (bass holds).",
      hint:"Two moves, one name.",
      play:()=>{MFAudio.tone(72,.8,.05,.4);MFAudio.tone(71,.9,.9,.42);} },
    example:{ label:"the examples",
      explain:"Example 1 is a full 4-3 suspension at a cadence; example 2 a tonic pedal holding under I, IV and V7." },
    game:{ label:"the games",
      explain:"Sprint the eight tones, stage a suspension, read figures on cards, then race entries and exits.",
      hint:"P-S-R for suspensions." },
    quiz:{ label:"this question",
      explain:"Ask two things about the odd note: how did it ARRIVE (step/leap/held/early) and how did it LEAVE (step on/back/down/up/leap)?",
      play:()=>{MFAudio.tone(74,.8,.05,.4);MFAudio.tone(72,.9,.9,.42);} }
  }
};
