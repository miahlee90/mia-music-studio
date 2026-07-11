/* Lesson 104 — Leading-Tone Chords (Book 4, Unit 26 — SELF-AUTHORED)
   Core: vii° (dim triad) and vii°7 / viiø7 as DOMINANT-FUNCTION chords —
   V7 without its root. vii°7 (fully dim, from harmonic minor) works in
   major too; resolves to I with the leading tone rising. Augmented triad's
   function (III+) gets one step. NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[104]={
  welcome:"Leading-tone chords: dominants without a root. \u{1F511}",
  hook:{
    say:"<b>A tense little chord built on the leading tone</b> pushes home just like V7. \u{1F447} <b>Listen: where does it resolve?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ vii° → ?</button></div>
          <div class="choices hk-ch" style="display:none"><button>To I — it acts like a dominant</button><button>To IV</button><button>Nowhere</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ [59,62,65].forEach(m=>MFAudio.tone(m,.9,.05,.3)); [60,64,67].forEach(m=>MFAudio.tone(m,1.1,1.0,.3)); setTimeout(()=>ch.style.display="",2300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ B-D-F pushed into C — vii° shares three notes with G7 and does the same job: DOMINANT FUNCTION without the root. Today's lesson!");
          else fb(false,"The B rose to C, the F fell to E — that motion is a dominant resolving…");
        });
      } }
  },
  objectives:[
    "Recall vii°: the diminished triad on the leading tone",
    "See it as V7 minus the root — dominant function (L86 review)",
    "Build vii°7 (fully diminished) and viiø7 (half-diminished)",
    "Resolve leading-tone chords to I (leading tone rises)",
    "Use vii°7's symmetry: any note can act as root",
    "One step for the augmented triad's function (III+ in minor)"
  ],
  steps:[
    { say:"<b>vii° = V7 Without a Root:</b> in C major, vii° is <b>B-D-F</b> — exactly G7's upper three notes. Same tritone, same pull, <b>dominant function</b>. \u{1F447} <b>vii° shares how many notes with V7?</b>",
      try:{ type:"mc", choices:["Three — all but V7's root","One","None"], answer:0,
        success:"✓ B, D, F live in both — vii° is the rootless V7.",
        fail:"Spell both: G-B-D-F vs B-D-F…",
        hint:"Remove G." } },
    { say:"<b>The Seventh Versions:</b> add a 7th to vii°: in major, <b>viiø7</b> (B-D-F-A, half-diminished); borrow harmonic minor's ♭6 and you get <b>vii°7</b> (B-D-F-A♭, fully diminished) — usable in major AND minor. \u{1F447} <b>vii°7 in C contains…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:70,notes:[
        {p:"B3",d:"h",label:"vii\u{00F8}7"},{p:"D4",d:"h",chord:true},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"B3",d:"h",label:"vii\u{00B0}7"},{p:"D4",d:"h",chord:true},{p:"F4",d:"h",chord:true},{p:"Ab4",d:"h",chord:true},{bar:"final"}],width:440} },
      try:{ type:"mc", choices:["B-D-F-A♭ — all minor 3rds","B-D-F-A","B-D-F-G"], answer:0,
        success:"✓ The symmetrical stack (L92's °7) built on the leading tone.",
        fail:"Fully diminished needs the LOWERED 7th above B…",
        hint:"A♭, not A." } },
    { say:"<b>Resolution:</b> leading-tone chords resolve to <b>I</b> (or i): the <b>leading tone rises</b> to the tonic; the chord's dissonances fall. Usually used in <b>first inversion</b> (vii°6) as a passing chord between I and I6. \u{1F447} <b>In vii° → I, the leading tone…</b>",
      try:{ type:"mc", choices:["Rises a half step to the tonic","Falls a 5th","Stays"], answer:0,
        success:"✓ B → C: the chord's whole reason for existing.",
        fail:"Where does a leading tone always want to go?",
        hint:"Up a half step." } },
    { say:"<b>vii°7's Symmetry:</b> all minor 3rds means <b>any of its four notes can behave as the leading tone</b> — one chord, four possible resolutions. Composers use it as a pivot into distant keys. \u{1F447} <b>Why is vii°7 so flexible?</b>",
      try:{ type:"mc", choices:["Its equal stacking lets any note act as root/leading tone","It has five notes","It is always loud"], answer:0,
        success:"✓ Symmetry = ambiguity = doors into many keys (L82's principle, harmonized).",
        fail:"What did L92 say about the °7's structure?",
        hint:"m3 + m3 + m3." } },
    { say:"<b>The Augmented Triad's Function:</b> III+ (harmonic minor's augmented triad, L85) usually intensifies motion to <b>iv or VI</b> — its raised note behaves like a leading tone inside the chord. <b>Remember: vii° family = dominant function; the leading tone always rises.</b> \u{1F447} <b>Leading-tone chords carry which function?</b>",
      try:{ type:"mc", choices:["Dominant (D)","Predominant","Tonic"], answer:0,
        success:"✓ D — beside V and V7 in Lesson 86's orange column.",
        fail:"Which chords share the leading tone?",
        hint:"The orange column." } },
    { say:"<b>Review:</b> \u{1F447} <b>vii°6 placed between I and I6 acts as…</b>",
      try:{ type:"mc", choices:["A passing chord — dominant color connecting two tonics","A final cadence","A key change"], answer:0,
        success:"✓ The classic use: I - vii°6 - I6, bass walking C-D-E.",
        fail:"What does the stepwise bass suggest?",
        hint:"Connecting, not closing." } }
  ],
  examples:[
    { caption:"I – vii°6 – I6: the leading-tone chord as a passing chord; the bass walks C-D-E while dominant color flickers between two tonics.",
      staff:{clef:"treble",tempo:76,notes:[
        {p:"C4",d:"h",label:"I"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"D4",d:"h",label:"vii\u{00B0}6"},{p:"F4",d:"h",chord:true},{p:"B4",d:"h",chord:true},
        {p:"E4",d:"h",label:"I6"},{p:"G4",d:"h",chord:true},{p:"C5",d:"h",chord:true},{bar:"final"}],width:480},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"vii°7 resolving to i in C minor: every tendency tone obeys — B rises, the dissonances fall — maximum tension into calm.",
      staff:{clef:"treble",tempo:70,notes:[
        {p:"B3",d:"h",label:"vii\u{00B0}7"},{p:"D4",d:"h",chord:true},{p:"F4",d:"h",chord:true},{p:"Ab4",d:"h",chord:true},
        {p:"C4",d:"w",label:"i"},{p:"Eb4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:420},
      kb:{start:47,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Leading-Tone Sprint (45s)",
      intro:"Spellings, functions, resolutions — race them!",
      miaIntro:"Rootless dominants! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["vii° in C","B-D-F"],
        ["vii° is","V7 without its root"],
        ["viiø7","half-diminished (B-D-F-A)"],
        ["vii°7","fully diminished (B-D-F-A\u{266D})"],
        ["The leading tone resolves","up to the tonic"],
        ["Leading-tone chords' function","dominant"],
        ["vii°7's structure","all minor 3rds — symmetrical"],
        ["Classic usage","vii°6 passing between I and I6"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — the key chord unlocked!":null },
    { type:"key-climb", title:"Game 2 · Resolve vii°7 by Hand",
      intro:"Play B-D-F-A♭, then resolve to C!",
      miaIntro:"Tension, then home! \u{1FA9C}",
      spec:{seq:[59,62,65,68,60],
        names:["B (leading tone)","D","F","A♭ (the °7)","C — resolution!"],
        start:55, octaves:2, title:"vii°7 into the tonic"},
      result:(score)=>score!==null?"Resolution performed!":null },
    { type:"symbol-hunt", title:"Game 3 · Which Chord Is It?",
      intro:"Chords on the leading tone — click what each round names!",
      miaIntro:"Count the 3rds! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"vii° (B-D-F)", spec:{clef:"treble",notes:[{p:"B3",d:"w"},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true}],width:150}},
        {label:"viiø7 (B-D-F-A)", spec:{clef:"treble",notes:[{p:"B3",d:"w"},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true},{p:"A4",d:"w",chord:true}],width:150}},
        {label:"vii°7 (B-D-F-A♭)", spec:{clef:"treble",notes:[{p:"B3",d:"w"},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true},{p:"Ab4",d:"w",chord:true}],width:150}},
        {label:"V7 (G-B-D-F)", spec:{clef:"treble",notes:[{p:"G3",d:"w"},{p:"B3",d:"w",chord:true},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Leading-tone chords on sight!":null },
    { type:"term-race", title:"Game 4 · Function & Resolution Race",
      intro:"Where does each chord go — at speed!",
      miaIntro:"Everything resolves! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["vii° resolves to","I (or i)"],
        ["vii°7 resolves to","I (or i)"],
        ["The leading tone moves","up a half step"],
        ["The chord's dissonances","fall by step"],
        ["vii° shares its tritone with","V7"],
        ["vii°7 as a pivot","opens distant keys"],
        ["III+ (minor) intensifies motion to","iv or VI"],
        ["D-function chords","V, V7, vii°, vii°7"]]},
      result:(score)=>score>=6?"Every resolution tracked!":null }
  ],
  practiceIntro:"20 practice questions — spellings, functions and resolutions. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["vii°","B-D-F in C"],["viiø7","+A"],["vii°7","+A\u{266D}"],["Function","dominant"],["Resolution","to I"]], reverse:true}, count:6 },
    { gen:"triad-quality", params:{}, count:2 },
    { type:"mc", q:"vii° in C major is spelled…", choices:["B-D-F","B-D-F♯","G-B-D"], answer:0, explain:"The diminished triad on the leading tone." },
    { type:"mc", q:"vii° functions as…", choices:["a dominant","a tonic","a predominant"], answer:0, explain:"V7 minus the root." },
    { type:"mc", q:"vii°7 adds which 7th above B (in C)?", choices:["A♭","A","G"], answer:0, explain:"Fully diminished — all m3s." },
    { type:"mc", q:"In vii° → I, the leading tone…", choices:["rises to the tonic","falls to the dominant","disappears"], answer:0, explain:"B→C." },
    { type:"truefalse", q:"vii° shares its tritone (B-F) with V7.", answer:true, explain:"Same engine." },
    { type:"truefalse", q:"vii°7's symmetry lets any note act as leading tone.", answer:true, explain:"Four doors, one chord." },
    { type:"truefalse", q:"viiø7 and vii°7 are identical.", answer:false, explain:"A vs A♭ — half vs fully diminished." },
    { gen:"term-match", params:{subject:"term", pool:[["I - vii°6 - I6","the passing use"],["Symmetry","distant-key pivot"],["III+","intensifies iv/VI"],["Tritone","B-F"]], reverse:true}, count:3 },
    { gen:"inversion-id", params:{subject:"triad", ask:"position"}, count:2 }
  ],
  vocabulary:[
    {term:"vii° (Leading-Tone Triad)", def:"The diminished triad on the leading tone — V7 without its root; dominant function."},
    {term:"viiø7 / vii°7", def:"Half-diminished (B-D-F-A, major keys) vs fully diminished (B-D-F-A♭, borrowed from minor — usable anywhere)."},
    {term:"Resolution Rule", def:"Leading tone rises to the tonic; the dissonances fall. Target: I or i."},
    {term:"°7 Symmetry", def:"All minor 3rds — any note can act as leading tone, opening pivots to distant keys."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>vii° = rootless V7</b> — same tritone, same dominant function.",
    "✔ Sevenths: <b>viiø7</b> (major) · <b>vii°7</b> (borrowed, fits both modes).",
    "✔ Resolve to <b>I</b>: leading tone up, dissonances down.",
    "✔ Classic use: <b>I - vii°6 - I6</b> passing motion.",
    "✔ °7 symmetry = four resolutions = distant-key doors."
  ],
  tips:[
    "Hear vii° as 'V7 lite' — softer bass, same push.",
    "vii°7 loves dramatic moments: diminished-seventh tension is opera's favorite chord.",
    "Spell any vii°7 fast: leading tone + minor 3rds all the way up.",
    "Next lesson: a chromatic predominant from the flat side — the Neapolitan."
  ],
  rewards:{ badge:"Key Holder", icon:"\u{1F511}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Rootless dominants, rising leading tones.",
  quiz:[
    { type:"mc", q:"vii° in C major is…", choices:["B-D-F","B♭-D-F","B-D♯-F♯"], answer:0, explain:"Diminished, on the leading tone.", hint:"Two m3s." },
    { type:"mc", q:"vii° relates to V7 as…", choices:["V7 without its root","V7 with an added root","no relation"], answer:0, explain:"B-D-F ⊂ G-B-D-F.", hint:"Remove G." },
    { type:"mc", q:"The leading-tone chords carry which function?", choices:["Dominant","Tonic","Predominant"], answer:0, explain:"L86's orange column.", hint:"They push home." },
    { type:"mc", q:"vii°7 in C is spelled…", choices:["B-D-F-A♭","B-D-F-A","B-D-F-G♯"], answer:0, explain:"All minor 3rds.", hint:"Lowered 7th." },
    { type:"mc", q:"viiø7 differs from vii°7 by…", choices:["its 7th: A vs A♭","its root","its 3rd"], answer:0, explain:"Half vs fully diminished.", hint:"Top note." },
    { type:"mc", q:"vii° resolves to…", choices:["I","IV","vi"], answer:0, explain:"Dominant home.", hint:"Where V goes." },
    { type:"mc", q:"In the resolution, the leading tone…", choices:["rises a half step","falls a whole step","leaps an octave"], answer:0, explain:"B→C, always.", hint:"Its name says so." },
    { type:"mc", q:"Identify (key: C).",
      staff:{clef:"treble",notes:[{p:"B3",d:"w"},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true},{p:"Ab4",d:"w",chord:true}],width:160},
      choices:["vii°7","viiø7","V7"], answer:0, explain:"B-D-F-A♭ — fully diminished.", hint:"Check the top note." },
    { type:"truefalse", q:"vii°6 often passes between I and I6.", answer:true, explain:"Bass walks 1-2-3.", hint:"The passing use." },
    { type:"truefalse", q:"vii°7 may only appear in minor keys.", answer:false, explain:"Borrowed freely into major.", hint:"Both modes." },
    { type:"mc", q:"vii°7's usefulness as a distant-key pivot comes from…", choices:["its symmetrical structure","its loudness","its major 3rd"], answer:0, explain:"Any note can lead.", hint:"m3 stack." },
    { type:"mc", q:"The full dominant-function team is…", choices:["V, V7, vii°, vii°7","I and vi","ii and IV"], answer:0, explain:"All carry the leading tone.", hint:"The pushers." }
  ],
  miaPerfect:"PERFECT! The rootless dominant serves you now. \u{1F511}\u{1F389}",
  miaPass:"Passed! Leading tones rise on command. Next: the Neapolitan…",
  mia:{
    hook:{ label:"the welcome",
      explain:"B-D-F resolved into C-E-G — vii°, the rootless V7, doing dominant work.",
      play:()=>{[59,62,65].forEach(m=>MFAudio.tone(m,.9,.05,.3));[60,64,67].forEach(m=>MFAudio.tone(m,1.1,1.0,.3));} },
    learn:{ label:"leading-tone chords",
      explain:"vii° = V7 minus root (dominant function); viiø7 major, vii°7 borrowed; resolve to I with the leading tone rising; °7 symmetry pivots far.",
      hint:"B rises to C.",
      play:()=>{[59,62,65,68].forEach(m=>MFAudio.tone(m,.9,.05,.28));[60,63,67].forEach(m=>MFAudio.tone(m,1.0,1.0,.3));} },
    example:{ label:"the examples",
      explain:"Example 1 passes vii°6 between two tonics; example 2 resolves vii°7 into C minor." },
    game:{ label:"the games",
      explain:"Sprint the spellings, resolve by hand, spot the chords, then race the resolutions.",
      hint:"Count the minor 3rds." },
    quiz:{ label:"this question",
      explain:"Spell from the leading tone in minor 3rds; assign dominant function; resolve leading tone UP into I.",
      play:()=>{[59,62,65].forEach(m=>MFAudio.tone(m,.9,.05,.3));} }
  }
};
