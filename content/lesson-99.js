/* Lesson 99 — Modulation (Book 4, Unit 24 — SELF-AUTHORED)
   Core: MODULATION = an actual key change, confirmed by a cadence in the
   new key. Closely related keys (±1 accidental + relatives). PIVOT-CHORD
   modulation (a chord shared by both keys), DIRECT (abrupt), PHRASE
   modulation (new key at a phrase boundary). NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[99]={
  welcome:"Modulation establishes a new tonic and key within a composition.",
  hook:{
    say:"<b>The passage begins in C major but later establishes G major through a cadence.</b> \u{1F447} <b>In which key does the passage end?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the passage</button></div>
          <div class="choices hk-ch" style="display:none"><button>G major—the final cadence confirms G as the new tonic</button><button>C major—the passage returns to its original tonic</button><button>The passage remains entirely in C major</button></div>`;
        const ROWS=[[60,64,67],[65,69,72],[62,66,69],[55,59,62],[62,66,67],[55,59,62,67]];
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.85,.26))); setTimeout(()=>ch.style.display="",ROWS.length*850+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Correct. F♯ supports the new key, and a cadence in G major confirms G as the new tonic. The passage has modulated from C major to G major.");
          else fb(false,"Listen to the final harmonic progression and identify the tonic confirmed by the cadence.");
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
    { say:"<b>Modulation:</b> Modulation occurs when music establishes a new tonic and key. A cadence in the new key provides strong confirmation, especially when supported by a functional progression, consistent pitch collection, formal emphasis, or continued harmonic activity. A composition may later modulate again or return to its original key. Tonicization gives a nontonic chord brief local emphasis; modulation establishes the new key more structurally. \u{1F447} <b>Which event provides especially strong confirmation of a modulation?</b>",
      try:{ type:"mc", choices:["A cadence that establishes the new tonic","A single isolated accidental","A change in tempo alone"], answer:0,
        success:"✓ Correct. A cadence in the new key is strong evidence of modulation, especially when the surrounding harmony also supports the new tonic.",
        fail:"Determine whether the new tonic receives sustained or structural harmonic confirmation.",
        hint:"Listen for dominant-to-tonic motion in the new key." } },
    { say:"<b>Closely Related Keys:</b> For a major key, closely related keys include its relative minor, dominant and subdominant keys, and the relative minor keys of the dominant and subdominant. Their key signatures are identical to or differ by one accidental from the original major key. The closely related keys of C major are A minor, G major, E minor, F major, and D minor. \u{1F447} <b>Which list contains the closely related keys of C major?</b>",
      show:{ type:"html", html:`<div style="text-align:center;font-weight:800;font-size:15px;line-height:2">
        <span style="color:#2F6DA8">C major</span> \u{2194} G · F · <span style="color:#C05A21">Am · Em · Dm</span><br>
        <span style="font-weight:400;font-size:12.5px;color:#555">(±1 accidental and the relative minors)</span></div>` },
      try:{ type:"mc", choices:["G major, F major, A minor, E minor, and D minor","F♯ major and B♭ minor","C minor only"], answer:0,
        success:"✓ Correct. These keys have the same key signature as C major or differ from it by one accidental. They also share several diatonic chords with C major.",
        fail:"Compare the key signatures and relative-key relationships.",
        hint:"Relative minor, dominant, subdominant, and their relative minors." } },
    { say:"<b>Pivot-Chord Modulation:</b> A pivot chord, or common chord, is diatonic to both the original key and the destination key. It is first understood in the original key and then reinterpreted in the new key. For example, A minor is vi in C major and ii in G major. A progression may approach it as vi in C major, reinterpret it as ii in G major, and then continue to V–I in G. \u{1F447} <b>What must be true of a diatonic pivot chord?</b>",
      show:{ type:"html", html:`<div style="text-align:center;font-weight:800;font-size:15px">
        C major: I → <span style="color:#A9821F">vi</span> … <span style="color:#A9821F">ii</span> ← G major: → V → I<br>
        <span style="font-weight:400;font-size:12.5px;color:#555">Am = the shared doorway (vi in C, ii in G)</span></div>` },
      try:{ type:"mc", choices:["It belongs to both the original and destination keys","It must be the tonic triad of both keys","It must contain a chromatic accidental"], answer:0,
        success:"✓ Correct. A pivot chord has a valid diatonic function in both keys, allowing it to be reinterpreted.",
        fail:"Identify A minor's Roman numeral in each key.",
        hint:"Am is vi in C major and ii in G major." } },
    { say:"<b>Direct and Phrase Modulation:</b> A direct modulation moves to a new key without using a diatonic pivot chord. It may occur within a phrase or at a formal boundary. When the new key begins at the start of a new phrase or section, the process is often called phrase modulation. A common popular-music example is a final chorus transposed upward by a half step or whole step. Terminology varies among textbooks; phrase modulation may be treated as a type of direct modulation. <b>Remember: pivot-chord modulation uses a chord shared by both keys · direct modulation changes key without a diatonic pivot chord · phrase modulation begins the new key at a phrase or section boundary.</b> \u{1F447} <b>A final chorus begins one whole step higher without a pivot chord. How is this best described?</b>",
      try:{ type:"mc", choices:["Phrase modulation, a type of direct modulation","Pivot-chord modulation","No modulation"], answer:0,
        success:"✓ Correct. The new key begins at a phrase boundary without a shared pivot chord, creating phrase modulation.",
        fail:"Identify the formal location of the key change.",
        hint:"The new key begins with the new phrase." } },
    { say:"<b>Recognizing Modulation:</b> Listen and look for several types of evidence: a new pitch is emphasized as tonic; dominant-function harmony points toward the new tonic; a cadence confirms the new key; the new key continues or receives formal and thematic emphasis; accidentals may support the new pitch collection, although they are not required in every modulation. \u{1F447} <b>A passage in C major introduces F♯, develops dominant harmony directed toward G, and cadences in G major. What has occurred?</b>",
      try:{ type:"mc", choices:["A modulation to G major","A tonicization of ii","No change of tonal center"], answer:0,
        success:"✓ Correct. The pitch collection, dominant preparation, and cadence work together to establish G as the new tonic.",
        fail:"Combine the chromatic, harmonic, and cadential evidence.",
        hint:"The cadence confirms G as tonic." } },
    { say:"<b>Modulation and Tonicization:</b> A brief applied dominant resolving to a diatonic chord normally creates tonicization. Modulation establishes a new key more substantially through cadential confirmation, continued functional harmony, formal emphasis, or other structural evidence. Duration may contribute to the distinction, but duration alone does not determine it. \u{1F447} <b>V/V resolves to V, after which the progression continues clearly in the original key. How should the event be classified?</b>",
      try:{ type:"mc", choices:["Tonicization of V","Modulation to the dominant key","Phrase modulation"], answer:0,
        success:"✓ Correct. V receives temporary dominant emphasis, but the original tonic remains structurally active.",
        fail:"Determine whether V becomes a structurally confirmed tonic or remains a tonicized diatonic chord.",
        hint:"The progression returns immediately to the original key's harmonic syntax." } },
    { say:"<b>Review:</b> \u{1F447} <b>Which modulation technique uses a chord that is diatonic to both the original and destination keys?</b>",
      try:{ type:"mc", choices:["Pivot-chord modulation","Direct modulation","Modulation created by silence alone"], answer:0,
        success:"✓ Correct. The shared chord is reinterpreted from a function in the original key to a function in the new key.",
        fail:"Identify the technique that uses a common chord.",
        hint:"The pivot chord belongs to both keys." } }
  ],
  examples:[
    { caption:"A pivot modulation C→G: I – IV – vi(=ii of G) – V of G – I of G. The Am turns the corner; the cadence confirms the new home.",
      staff:{clef:"treble",tempo:72,notes:[
        {p:"C4",d:"w",label:"I (C)"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},
        {p:"F4",d:"w",label:"IV"},{p:"A4",d:"w",chord:true},{p:"C5",d:"w",chord:true},
        {p:"A3",d:"w",label:"pivot vi=ii"},{p:"C4",d:"w",chord:true},{p:"E4",d:"w",chord:true},
        {p:"D4",d:"w",label:"V (of G)"},{p:"F#4",d:"w",chord:true},{p:"A4",d:"w",chord:true},
        {p:"G3",d:"w",label:"I (G!)"},{p:"B3",d:"w",chord:true},{p:"D4",d:"w",chord:true},{bar:"final"}],width:640},
      kb:{start:43,octaves:3,labels:true} },
    { caption:"A phrase modulation: the phrase ends in C; the next phrase simply begins in D major — the pop lift, up a whole step.",
      staff:{clef:"treble",tempo:84,notes:[
        {p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"C5",d:"h",label:"C ends"},{bar:"double"},
        {p:"D4",d:"q",label:"D begins!"},{p:"F#4",d:"q"},{p:"A4",d:"q"},{p:"D5",d:"h"},{bar:"final"}],width:560},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Modulation Identification (45s)",
      intro:"Identify modulation types, tonal evidence, and closely related keys.",
      miaIntro:"Tonicization or structurally confirmed new key?",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Modulation","a key change confirmed by cadence"],
        ["Tonicization","a brief visit — no confirming cadence"],
        ["Closely related keys","\u{00B1}1 accidental + relatives"],
        ["Pivot chord","belongs to both keys"],
        ["Direct modulation","the new key just arrives"],
        ["Phrase modulation","new key at the phrase boundary"],
        ["C major's neighbors","G, F, Am, Em, Dm"],
        ["The pop final-chorus lift","phrase modulation"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?"Modulations identified!":null },
    { type:"key-climb", title:"Game 2 · Perform a Pivot-Chord Modulation",
      intro:"Play the complete progression C major → F major → A minor → D7 → G major. Hear A minor first as vi in C major and then as ii in G major.",
      miaIntro:"Reinterpret Am, then confirm G with D7–G.",
      spec:{seq:[60,65,57,62,55],
        names:["C major (I of C)","F major (IV)","A minor (pivot: vi of C = ii of G)","D7 (V of G)","G major (the new home)"],
        start:55, octaves:2, title:"C to G, via the shared chord"},
      result:(score)=>score!==null?"You performed the pivot-chord modulation.":null },
    { type:"order-tap", title:"Game 3 · Build the Pivot Modulation",
      intro:"Arrange the stages of a pivot-chord modulation.",
      miaIntro:"Original key → pivot chord → new-key dominant → new-key tonic.",
      spec:{sequence:["Establish the old key","Reach the shared (pivot) chord","Treat it as the NEW key's chord","Cadence in the new key"],
        title:"Four stages of a smooth move"},
      result:(stars)=>stars>=2?"You arranged the modulation correctly.":null },
    { type:"term-race", title:"Game 4 · Closely Related Keys",
      intro:"Identify the closely related keys of each major key.",
      miaIntro:"Include the relative minor, dominant, subdominant, and their relative minors.",
      spec:{rounds:8, reverse:true, pool:[
        ["C major's sharp-side neighbor","G major"],
        ["C major's flat-side neighbor","F major"],
        ["C major's relative","A minor"],
        ["G major's relative","E minor"],
        ["F major's relative","D minor"],
        ["G major's neighbors include","C and D major"],
        ["Distant from C major","F♯ major"],
        ["Relative keys share","the same key signature"]]},
      result:(score)=>score>=6?"You identified the closely related keys correctly.":null }
  ],
  practiceIntro:"Complete 20 practice questions on modulation types, tonal evidence, closely related keys, and pivot chords.",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Modulation","confirmed key change"],["Pivot","shared chord"],["Direct","no shared pivot chord"],["Phrase","at the phrase line"],["Closely related","\u{00B1}1 accidental"]], reverse:true}, count:6 },
    { gen:"rel-key", params:{ask:"both"}, count:3 },
    { type:"mc", q:"Which event provides especially strong confirmation of a new key?", choices:["A cadence establishing the new tonic","One isolated accidental","A rest"], answer:0,
      explain:"The new key must cadence." },
    { type:"mc", q:"Which list contains the closely related keys of C major?", choices:["G major, F major, A minor, E minor, and D minor","D major, B♭ major, and F♯ minor","A minor only"], answer:0,
      explain:"±1 accidental + relatives." },
    { type:"mc", q:"A pivot chord belongs to…", choices:["both the old and new keys","neither key","only the new key"], answer:0,
      explain:"The shared doorway." },
    { type:"mc", q:"Am can pivot between C major and G major because it is…", choices:["vi in C and ii in G","the tonic of both","V in both"], answer:0,
      explain:"Double membership." },
    { type:"truefalse", q:"Tonicization and modulation establish a new key with equal structural strength.", answer:false,
      explain:"Visit vs confirmed move." },
    { type:"truefalse", q:"Phrase modulation begins the new key at a phrase or section boundary.", answer:true,
      explain:"The pop-lift design." },
    { type:"truefalse", q:"Relative major and minor keys share the same key signature.", answer:true,
      explain:"C/Am, G/Em, F/Dm." },
    { gen:"rel-key", params:{ask:"both"}, count:2 },
    { gen:"triad-id", params:{ask:"numeral"}, count:3 }
  ],
  vocabulary:[
    {term:"Modulation", def:"A key change that establishes a new tonic, with a cadence in the new key providing strong confirmation."},
    {term:"Closely Related Keys", def:"Signatures within one accidental, plus the relatives. From C: G, F, Am, Em, Dm."},
    {term:"Pivot-Chord Modulation", def:"A chord shared by both keys turns the corner — entered in the old key, left in the new."},
    {term:"Direct / Phrase Modulation", def:"Direct: the new key arrives without a diatonic pivot chord. Phrase: the new key starts at a phrase or section boundary (the pop lift)."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Modulation</b> = key change + <b>confirming cadence</b>; tonicization only visits.",
    "✔ <b>Closely related keys</b> (±1 accidental + relatives) share many diatonic chords.",
    "✔ <b>Pivot chord</b>: double-citizen chord turns the corner smoothly.",
    "✔ <b>Direct</b> = no diatonic pivot chord · <b>phrase</b> = new key at the phrase or section line.",
    "✔ Recognizing it: new tonic emphasized → dominant harmony → new-key cadence (accidentals may help, not required)."
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
  miaQuizIntro:"Quiz: Distinguish brief tonicization from structurally confirmed modulation.",
  quiz:[
    { type:"mc", q:"Modulation occurs when music…", choices:["establishes a new tonic and key","increases its dynamic level","repeats a motive"], answer:0,
      explain:"A cadence and continued harmonic emphasis can provide strong confirmation of the new key.", hint:"Move, not visit." },
    { type:"mc", q:"Which evidence most strongly distinguishes modulation from brief tonicization?", choices:["Structural confirmation of the new tonic through cadence, continued harmony, or formal emphasis","A change in tempo","A change of clef"], answer:0,
      explain:"The new tonic receives more substantial structural confirmation.", hint:"Lesson 98's line." },
    { type:"mc", q:"For a major key, closely related keys generally have key signatures that…", choices:["are identical to or differ by one accidental","differ by exactly three accidentals","must be identical"], answer:0,
      explain:"The neighborhood rule.", hint:"±1." },
    { type:"mc", q:"Which list contains the closely related keys of C major?", choices:["G major, F major, A minor, E minor, and D minor","D major, A major, and E major","C♯ major only"], answer:0,
      explain:"Five neighbors.", hint:"Two majors, three minors." },
    { type:"mc", q:"A diatonic pivot chord…", choices:["belongs to both the original and destination keys","must be the tonic of the destination key","must contain the destination key's new accidental"], answer:0,
      explain:"The same chord is reinterpreted with a different Roman-numeral function.", hint:"Double citizenship." },
    { type:"mc", q:"A minor functions as vi in C major and ii in G major. In a modulation from C to G, it can serve as…", choices:["A pivot chord","A pedal point","A deceptive cadence"], answer:0,
      explain:"One chord, two passports.", hint:"Both keys claim it." },
    { type:"mc", q:"A final chorus begins one whole step higher at a phrase boundary without a pivot chord. What type of modulation occurs?", choices:["Phrase modulation","Pivot-chord modulation","Tonicization"], answer:0,
      explain:"The pop lift.", hint:"New phrase, new key." },
    { type:"mc", q:"A new key is established without a diatonic pivot chord. Which broad technique is used?", choices:["Direct modulation","Pivot-chord modulation","Tonicization only"], answer:0,
      explain:"No diatonic pivot chord is used.", hint:"No doorway." },
    { type:"truefalse", q:"Accidentals consistent with a new key can provide evidence of modulation, but they are not sufficient by themselves.", answer:true,
      explain:"Accidentals help but are not sufficient alone.", hint:"The tell-tale sharps/flats." },
    { type:"truefalse", q:"A single V/V–V motion followed by an immediate return to the original key is normally a modulation.", answer:false,
      explain:"It normally represents tonicization of V.", hint:"No cadence, no move." },
    { type:"mc", q:"Which key is not closely related to G major?", choices:["E♭ major","D major","C major"], answer:0,
      explain:"E♭ major is more distantly related.", hint:"Count the signature gap." },
    { type:"mc", q:"Which sequence describes a common pivot-chord modulation process?", choices:["Original key → pivot chord → dominant of the new key → cadence in the new key","Cadence in the new key → pivot chord → original key","New key → original key without confirmation"], answer:0,
      explain:"The pivot chord is reinterpreted before the new key receives dominant and cadential confirmation.", hint:"Doorway before proof." }
  ],
  miaPerfect:"Perfect score! You accurately identified tonicization, pivot-chord modulation, direct modulation, and phrase modulation.",
  miaPass:"You passed and completed unit 24. Next, you will study melodic ornaments.",
  mia:{
    hook:{ label:"the welcome",
      explain:"The F♯ arrived and a cadence confirmed G major — the piece modulated from C major to G major.",
      play:()=>{const ROWS=[[60,64,67],[65,69,72],[62,66,69],[55,59,62],[62,66,67],[55,59,62,67]];ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.75,i*.8,.26)));} },
    learn:{ label:"modulation",
      explain:"Key change + confirming cadence. Closely related keys (±1 accidental + relatives). Pivot (shared chord), direct (no pivot chord), phrase (at the boundary).",
      hint:"Cadence = proof.",
      play:()=>{[62,66,69].forEach(m=>MFAudio.tone(m,.8,.05,.27));[55,59,62,67].forEach(m=>MFAudio.tone(m,1.0,.95,.27));} },
    example:{ label:"the examples",
      explain:"Example 1 pivots C→G through Am; example 2 lifts a whole step at the phrase line — the pop modulation." },
    game:{ label:"the games",
      explain:"Sprint the types, walk the pivot route, stage the move in order, then race the neighbor keys.",
      hint:"±1 accidental = neighbors." },
    quiz:{ label:"this question",
      explain:"Evidence: a new tonic emphasized, dominant harmony, and — decisive — a cadence in the new key.",
      play:()=>{[62,66,69].forEach(m=>MFAudio.tone(m,.8,.05,.27));[55,59,62].forEach(m=>MFAudio.tone(m,.9,.95,.27));} }
  }
};
