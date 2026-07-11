/* Lesson 99 — Modulation (Book 4, Unit 24 — SELF-AUTHORED)
   Core: MODULATION = an actual key change, confirmed by a cadence in the
   new key. Closely related keys (±1 accidental + relatives). PIVOT-CHORD
   modulation (a chord shared by both keys), DIRECT (abrupt), PHRASE
   modulation (new key at a phrase boundary). NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[99]={
  welcome:"Modulation: moving to a new key — and staying. \u{1F5FA}\u{FE0F}",
  hook:{
    say:"<b>The music starts in C major… and ends somewhere else.</b> \u{1F447} <b>Listen: does it come back home?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the passage</button></div>
          <div class="choices hk-ch" style="display:none"><button>No — it cadenced in G major and stayed</button><button>Yes — it ended in C</button><button>It never left C</button></div>`;
        const ROWS=[[60,64,67],[65,69,72],[62,66,69],[55,59,62],[62,65,67],[55,59,62,67]];
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.85,.26))); setTimeout(()=>ch.style.display="",ROWS.length*850+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ The F♯ appeared, then a cadence CONFIRMED G major — the key actually changed: MODULATION. Today's lesson!");
          else fb(false,"The last cadence landed on G, with F♯ in force — the music moved house…");
        });
      } }
  },
  objectives:[
    "Define modulation: a real key change confirmed by a cadence",
    "Tell modulation from tonicization (Lesson 98)",
    "Know the CLOSELY RELATED keys: ±1 accidental plus relatives",
    "PIVOT-CHORD modulation: a chord both keys share",
    "DIRECT and PHRASE modulation",
    "Hear a key change and name its type"
  ],
  steps:[
    { say:"<b>Modulation:</b> the music <b>changes key and stays</b> — new accidentals persist, and a <b>cadence in the new key</b> seals it. Tonicization visits; modulation moves in. \u{1F447} <b>What confirms a modulation?</b>",
      try:{ type:"mc", choices:["A cadence in the new key","A single accidental","A tempo change"], answer:0,
        success:"✓ No cadence, no modulation — the new key must prove itself.",
        fail:"Visiting vs moving in…",
        hint:"The new key's period (PAC)." } },
    { say:"<b>Closely Related Keys:</b> the easiest destinations — keys whose signatures differ by <b>at most one accidental</b>, plus the <b>relative</b> pairs. From C major: <b>G, F, Am, Em, Dm</b>. \u{1F447} <b>Which keys are closely related to C major?</b>",
      show:{ type:"html", html:`<div style="text-align:center;font-weight:800;font-size:15px;line-height:2">
        <span style="color:#2F6DA8">C major</span> \u{2194} G · F · <span style="color:#C05A21">Am · Em · Dm</span><br>
        <span style="font-weight:400;font-size:12.5px;color:#555">(±1 accidental and the relative minors)</span></div>` },
      try:{ type:"mc", choices:["G, F, Am, Em and Dm","F♯ major and B♭ minor","Only C minor"], answer:0,
        success:"✓ One signature step away, plus the relatives — the modulation neighborhood.",
        fail:"±1 accidental…",
        hint:"Five neighbors." } },
    { say:"<b>Pivot-Chord Modulation:</b> the smoothest route — find a chord that <b>belongs to BOTH keys</b> and turn on it. Am is vi in C major AND ii in G major: enter it as vi, leave it as ii, cadence in G. \u{1F447} <b>A pivot chord must…</b>",
      show:{ type:"html", html:`<div style="text-align:center;font-weight:800;font-size:15px">
        C major: I → <span style="color:#A9821F">vi</span> … <span style="color:#A9821F">ii</span> ← G major: → V → I<br>
        <span style="font-weight:400;font-size:12.5px;color:#555">Am = the shared doorway (vi in C, ii in G)</span></div>` },
      try:{ type:"mc", choices:["Belong to both the old and new keys","Be the tonic of both","Contain an accidental"], answer:0,
        success:"✓ Shared membership = a seamless doorway.",
        fail:"Why did Am work?",
        hint:"Double citizenship." } },
    { say:"<b>Direct & Phrase Modulation:</b> <b>DIRECT</b> — the new key simply arrives, no pivot (dramatic, mid-phrase). <b>PHRASE</b> — the new key begins cleanly <b>at the next phrase</b> (the famous pop 'truck-driver' lift of a half or whole step). <b>Remember: pivot = shared chord · direct = abrupt · phrase = new key at the phrase line.</b> \u{1F447} <b>A pop song jumps up a whole step for the final chorus, right at the phrase start. This is…</b>",
      try:{ type:"mc", choices:["A phrase modulation","A pivot-chord modulation","No modulation"], answer:0,
        success:"✓ New phrase, new key, no pivot — the classic final-chorus lift.",
        fail:"Where did the change happen?",
        hint:"At the phrase boundary." } },
    { say:"<b>Hearing Modulation:</b> three clues — <b>1)</b> persistent new accidentals, <b>2)</b> a new note feels like \u{201C}do\u{201D}, <b>3)</b> a cadence confirms the new tonic. \u{1F447} <b>Persistent F♯s appear in a C major piece and a cadence lands on G. The music has…</b>",
      try:{ type:"mc", choices:["Modulated to G major","Tonicized ii","Stayed in C"], answer:0,
        success:"✓ Accidental + new do + cadence = a completed move to G.",
        fail:"All three clues point the same way…",
        hint:"Confirmed by cadence." } },
    { say:"<b>Modulation vs Tonicization — the Line:</b> one borrowed V→X is tonicization; a <b>confirmed cadence and continued music in the new key</b> is modulation. Length and cadence draw the line. \u{1F447} <b>V/V → V, then music continues in the OLD key. That was…</b>",
      try:{ type:"mc", choices:["Tonicization only","A full modulation","A phrase modulation"], answer:0,
        success:"✓ A visit, not a move — the old key never lost control.",
        fail:"Did the new key get a confirming cadence?",
        hint:"Lesson 98's boundary." } },
    { say:"<b>Review:</b> \u{1F447} <b>The smoothest modulation type uses…</b>",
      try:{ type:"mc", choices:["A pivot chord shared by both keys","A sudden jump","Silence"], answer:0,
        success:"✓ The shared chord turns the corner without a bump.",
        fail:"The doorway method…",
        hint:"Double-citizen chord." } }
  ],
  examples:[
    { caption:"A pivot modulation C→G: I – IV – vi(=ii of G) – V of G – I of G. The Am turns the corner; the cadence confirms the new home.",
      staff:{clef:"treble",tempo:72,notes:[
        {p:"C4",d:"h",label:"I (C)"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"F4",d:"h",label:"IV"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"A3",d:"h",label:"pivot vi=ii"},{p:"C4",d:"h",chord:true},{p:"E4",d:"h",chord:true},
        {p:"D4",d:"h",label:"V (of G)"},{p:"F#4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"G3",d:"w",label:"I (G!)"},{p:"B3",d:"w",chord:true},{p:"D4",d:"w",chord:true},{bar:"final"}],width:640},
      kb:{start:43,octaves:3,labels:true} },
    { caption:"A phrase modulation: the phrase ends in C; the next phrase simply begins in D major — the pop lift, up a whole step.",
      staff:{clef:"treble",tempo:84,notes:[
        {p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"C5",d:"h",label:"C ends"},{bar:"double"},
        {p:"D4",d:"q",label:"D begins!"},{p:"F#4",d:"q"},{p:"A4",d:"q"},{p:"D5",d:"h"},{bar:"final"}],width:560},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Modulation Sprint (45s)",
      intro:"Types, clues and neighbors — race them!",
      miaIntro:"Visit or move in? \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Modulation","a key change confirmed by cadence"],
        ["Tonicization","a brief visit — no confirming cadence"],
        ["Closely related keys","\u{00B1}1 accidental + relatives"],
        ["Pivot chord","belongs to both keys"],
        ["Direct modulation","the new key just arrives"],
        ["Phrase modulation","new key at the phrase boundary"],
        ["C major's neighbors","G, F, Am, Em, Dm"],
        ["The pop final-chorus lift","phrase modulation"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — modulation mapped!":null },
    { type:"key-climb", title:"Game 2 · Walk the Pivot Route",
      intro:"Play the roots of the pivot modulation: C, F, A(pivot), D, G!",
      miaIntro:"Through the doorway! \u{1FA9C}",
      spec:{seq:[60,65,57,62,55],
        names:["C (I of C)","F (IV)","A (the pivot!)","D (V of G)","G (the new home)"],
        start:55, octaves:2, title:"C to G, via the shared chord"},
      result:(score)=>score!==null?"Pivot route, walked!":null },
    { type:"order-tap", title:"Game 3 · Stage the Pivot Modulation",
      intro:"Tap the pivot modulation's stages in order!",
      miaIntro:"Old key, doorway, new key! \u{1F3C1}",
      spec:{sequence:["Establish the old key","Reach the shared (pivot) chord","Treat it as the NEW key's chord","Cadence in the new key"],
        title:"Four stages of a smooth move"},
      result:(stars)=>stars>=2?"The move, staged!":null },
    { type:"term-race", title:"Game 4 · Neighbor Race",
      intro:"Name the closely related keys — at speed!",
      miaIntro:"±1 accidental! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["C major's sharp-side neighbor","G major"],
        ["C major's flat-side neighbor","F major"],
        ["C major's relative","A minor"],
        ["G major's relative","E minor"],
        ["F major's relative","D minor"],
        ["G major's neighbors include","C and D major"],
        ["Distant from C major","F♯ major"],
        ["Relative keys share","the same key signature"]]},
      result:(score)=>score>=6?"The neighborhood memorized!":null }
  ],
  practiceIntro:"20 practice questions — types, clues, neighbors and pivots. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Modulation","confirmed key change"],["Pivot","shared chord"],["Direct","abrupt arrival"],["Phrase","at the phrase line"],["Closely related","\u{00B1}1 accidental"]], reverse:true}, count:6 },
    { gen:"rel-key", params:{ask:"both"}, count:3 },
    { type:"mc", q:"A modulation is confirmed by…", choices:["a cadence in the new key","one accidental","a rest"], answer:0,
      explain:"The new key must cadence." },
    { type:"mc", q:"Which list gives C major's closely related keys?", choices:["G, F, Am, Em, Dm","D, B♭, F♯m","only Am"], answer:0,
      explain:"±1 accidental + relatives." },
    { type:"mc", q:"A pivot chord belongs to…", choices:["both the old and new keys","neither key","only the new key"], answer:0,
      explain:"The shared doorway." },
    { type:"mc", q:"Am can pivot between C major and G major because it is…", choices:["vi in C and ii in G","the tonic of both","V in both"], answer:0,
      explain:"Double membership." },
    { type:"truefalse", q:"Tonicization and modulation are identical.", answer:false,
      explain:"Visit vs confirmed move." },
    { type:"truefalse", q:"Phrase modulation begins the new key at a phrase boundary.", answer:true,
      explain:"The pop-lift design." },
    { type:"truefalse", q:"Relative keys share the same key signature.", answer:true,
      explain:"C/Am, G/Em, F/Dm." },
    { gen:"rel-key", params:{ask:"both"}, count:2 },
    { gen:"triad-id", params:{ask:"numeral"}, count:3 }
  ],
  vocabulary:[
    {term:"Modulation", def:"A real key change — new accidentals persist and a cadence confirms the new tonic."},
    {term:"Closely Related Keys", def:"Signatures within one accidental, plus the relatives. From C: G, F, Am, Em, Dm."},
    {term:"Pivot-Chord Modulation", def:"A chord shared by both keys turns the corner — entered in the old key, left in the new."},
    {term:"Direct / Phrase Modulation", def:"Direct: the new key arrives abruptly. Phrase: the new key starts at a phrase boundary (the pop lift)."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Modulation</b> = key change + <b>confirming cadence</b>; tonicization only visits.",
    "✔ Easiest destinations: <b>closely related keys</b> (±1 accidental + relatives).",
    "✔ <b>Pivot chord</b>: double-citizen chord turns the corner smoothly.",
    "✔ <b>Direct</b> = abrupt · <b>phrase</b> = new key at the phrase line.",
    "✔ Hearing it: persistent accidentals → new 'do' → new-key cadence."
  ],
  tips:[
    "Find pivots fast: list the old key's triads, the new key's triads, and circle the shared ones.",
    "The V of the NEW key is the modulation's engine — the pivot just steers toward it.",
    "Final-chorus lifts are phrase modulations up a half or whole step — count them in tonight's playlist.",
    "Unit 24 complete! Next unit: ornaments, variations and the grand forms."
  ],
  rewards:{ badge:"Key Traveler", icon:"\u{1F5FA}\u{FE0F}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! No cadence, no modulation.",
  quiz:[
    { type:"mc", q:"Modulation means…", choices:["changing key and staying, confirmed by cadence","playing louder","repeating a motive"], answer:0,
      explain:"The confirmed move.", hint:"Move, not visit." },
    { type:"mc", q:"What separates modulation from tonicization?", choices:["A confirming cadence and continued new-key music","The tempo","The clef"], answer:0,
      explain:"Proof of residence.", hint:"Lesson 98's line." },
    { type:"mc", q:"Closely related keys differ by…", choices:["at most one accidental (plus relatives)","exactly three accidentals","nothing"], answer:0,
      explain:"The neighborhood rule.", hint:"±1." },
    { type:"mc", q:"C major's closely related keys are…", choices:["G, F, Am, Em, Dm","D, A, E","C♯ major only"], answer:0,
      explain:"Five neighbors.", hint:"Two majors, three minors." },
    { type:"mc", q:"A pivot chord…", choices:["belongs to both keys and turns the corner","is always the new tonic","contains the new accidental"], answer:0,
      explain:"The shared doorway.", hint:"Double citizenship." },
    { type:"mc", q:"Am serving as vi of C and ii of G is an example of…", choices:["a pivot chord","a pedal point","a deceptive cadence"], answer:0,
      explain:"One chord, two passports.", hint:"Both keys claim it." },
    { type:"mc", q:"The final chorus jumps up a whole step at the phrase line. This is…", choices:["a phrase modulation","a pivot modulation","tonicization"], answer:0,
      explain:"The pop lift.", hint:"New phrase, new key." },
    { type:"mc", q:"A new key that arrives mid-phrase with no shared chord is a…", choices:["direct modulation","phrase modulation","pivot modulation"], answer:0,
      explain:"The abrupt kind.", hint:"No doorway." },
    { type:"truefalse", q:"Persistent new accidentals are one clue that a modulation is underway.", answer:true,
      explain:"Clue #1 of three.", hint:"The tell-tale sharps/flats." },
    { type:"truefalse", q:"A single V/V followed by a return to the old key is a modulation.", answer:false,
      explain:"That is tonicization — a visit.", hint:"No cadence, no move." },
    { type:"mc", q:"From G major, which is NOT closely related?", choices:["E♭ major","D major","C major"], answer:0,
      explain:"Three flats away — distant.", hint:"Count the signature gap." },
    { type:"mc", q:"The typical pivot-modulation order is…", choices:["old key → pivot → new key's V → new-key cadence","cadence first, pivot last","new key → old key"], answer:0,
      explain:"The four stages.", hint:"Doorway before proof." }
  ],
  miaPerfect:"PERFECT! Keys changed, cadences confirmed, no one lost. \u{1F5FA}\u{FE0F}\u{1F389}",
  miaPass:"Passed — and UNIT 24 is COMPLETE! Chromatic harmony's first tools are yours. \u{1F389}",
  mia:{
    hook:{ label:"the welcome",
      explain:"The F♯ arrived, then a cadence confirmed G major — the piece modulated and stayed.",
      play:()=>{const ROWS=[[60,64,67],[65,69,72],[62,66,69],[55,59,62],[62,65,67],[55,59,62,67]];ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.75,i*.8,.26)));} },
    learn:{ label:"modulation",
      explain:"Key change + confirming cadence. Closely related keys (±1 accidental + relatives). Pivot (shared chord), direct (abrupt), phrase (at the boundary).",
      hint:"Cadence = proof.",
      play:()=>{[62,66,69].forEach(m=>MFAudio.tone(m,.8,.05,.27));[55,59,62,67].forEach(m=>MFAudio.tone(m,1.0,.95,.27));} },
    example:{ label:"the examples",
      explain:"Example 1 pivots C→G through Am; example 2 lifts a whole step at the phrase line — the pop modulation." },
    game:{ label:"the games",
      explain:"Sprint the types, walk the pivot route, stage the move in order, then race the neighbor keys.",
      hint:"±1 accidental = neighbors." },
    quiz:{ label:"this question",
      explain:"Three clues: persistent accidentals, a new 'do', and — decisive — a cadence in the new key.",
      play:()=>{[62,66,69].forEach(m=>MFAudio.tone(m,.8,.05,.27));[55,59,62].forEach(m=>MFAudio.tone(m,.9,.95,.27));} }
  }
};
