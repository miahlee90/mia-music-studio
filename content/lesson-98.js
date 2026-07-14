/* Lesson 98 — Secondary Dominants (Book 4, Unit 24 — SELF-AUTHORED)
   Core: any major or minor diatonic chord can be preceded by ITS OWN
   dominant: V/V (D major in C), V/ii, V/vi, V/IV. Spot them by the
   accidental; they TONICIZE their target briefly.
   NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[98]={stackFigures:true,
  welcome:"Secondary dominants temporarily tonicize chords other than the tonic.",
  hook:{
    say:"<b>In C major, a D major chord containing F♯ appears and resolves to G.</b> \u{1F447} <b>What function does the D major chord perform?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the progression</button></div>
          <div class="choices hk-ch" style="display:none"><button>It resolves to G and functions as the dominant of G</button><button>It ends the piece as the tonic</button><button>It has no harmonic relationship to G</button></div>`;
        const ROWS=[[60,64,67],[62,66,69],[55,59,62],[60,64,67]];
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.85,i*.9,.27))); setTimeout(()=>ch.style.display="",ROWS.length*900+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Correct. D major functions as the dominant of G, the V chord in C major. It is therefore labeled V/V, a secondary or applied dominant.");
          else fb(false,"Follow F♯ as it resolves upward to G. The D major chord creates a temporary dominant-to-tonic relationship with G.");
        });
      } }
  },
  objectives:[
    "Define secondary dominant: the dominant OF a chord other than I",
    "Read the notation: V/V, V/ii, V/vi, V/IV ('five of five')",
    "Build one: go a P5 above the target, make that chord major (or Mm7)",
    "Spot them by their accidentals",
    "Understand tonicization: the target briefly sounds like a tonic",
    "Resolve them: V/X → X"
  ],
  steps:[
    { say:"<b>The Basic Idea:</b> A <b>secondary dominant</b>, also called an <b>applied dominant</b>, is a major triad or dominant seventh chord that functions temporarily as V of a diatonic chord other than the tonic. In C major, D major may precede G major and function as V of V. It is labeled <b>V/V</b> and read \u{201C}five of five.\u{201D} Secondary dominants most commonly tonicize major or minor diatonic triads; the diminished leading-tone triad is not normally treated as a temporary tonic. \u{1F447} <b>A secondary dominant is…</b>",
      try:{ type:"mc", choices:["A chord that temporarily functions as the dominant of a nontonic chord","Any chord performed loudly","The second chord in a progression"], answer:0,
        success:"✓ Correct. A secondary dominant applies dominant function temporarily to a major or minor chord other than the tonic.",
        fail:"Identify the chord to which D major resolves.",
        hint:"D major is the dominant of G." } },
    { say:"<b>Constructing a Secondary Dominant:</b> <b>1)</b> Identify the target chord and its root. <b>2)</b> Find the pitch a perfect fifth above the target root—or a perfect fourth below it. <b>3)</b> Build a major triad or dominant seventh chord on that pitch. <b>4)</b> Spell the temporary leading tone correctly and check the expected resolution to the target. Example: in C major the target ii chord is D minor; A is a perfect fifth above D, so A major (A–C♯–E) functions as V/ii, and A7 (A–C♯–E–G) can function as V⁷/ii. \u{1F447} <b>V/vi in C major is…</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14.5px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 12px">Target</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 12px">Secondary dominant</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 12px">Accidental (in C)</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">V (G)</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">V/V = D major</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#C05A21;font-weight:800">F♯</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">ii (Dm)</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">V/ii = A major</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#C05A21;font-weight:800">C♯</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">vi (Am)</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">V/vi = E major</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#C05A21;font-weight:800">G♯</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">IV (F)</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">V/IV = C(7)</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;color:#C05A21;font-weight:800">B♭ (as C7)</td></tr></table>` },
      try:{ type:"mc", choices:["E major: E–G♯–B","E minor: E–G–B","A major: A–C♯–E"], answer:0,
        success:"✓ Correct. E is a perfect fifth above the target root A. The G♯ in E major functions as the temporary leading tone to A.",
        fail:"Find the dominant root of A, and then build a major triad.",
        hint:"E–G♯–B is the dominant triad of A." } },
    { say:"<b>Identifying Secondary Dominants:</b> Secondary dominants often contain chromatic pitches not found in the prevailing key. In C major, F♯ may appear as the temporary leading tone in D major (V/V); C♯ may appear in A major (V/ii); and G♯ may appear in E major (V/vi). An accidental alone does not prove that a chord is a secondary dominant—identify the complete chord, determine its expected target, and examine its resolution and musical context. \u{1F447} <b>In C major, an E major chord containing G♯ resolves to A minor. How should E major be analyzed?</b>",
      try:{ type:"mc", choices:["V/vi","A printing error","A modulation to G major"], answer:0,
        success:"✓ Correct. G♯ acts as a temporary leading tone to A, and E major functions as V of vi.",
        fail:"Identify the pitch a half step above G♯ and the chord rooted on that pitch.",
        hint:"G♯ resolves upward to A." } },
    { say:"<b>Tonicization:</b> Tonicization occurs when a chord other than the tonic is treated temporarily as a local tonic, often through an applied dominant or applied leading-tone chord; the prevailing key remains structurally active. Modulation establishes a new key more substantially through factors such as cadential confirmation, sustained harmonic activity, thematic emphasis, or formal placement. Duration may contribute to the distinction, but it is not the only factor. \u{1F447} <b>What is tonicization?</b>",
      try:{ type:"mc", choices:["The temporary treatment of a nontonic chord as a local tonic","A permanently fixed change of key","An increase in the tonic chord's dynamic level"], answer:0,
        success:"✓ Correct. Tonicization briefly emphasizes a local tonic without displacing the prevailing key structurally.",
        fail:"Determine whether the original key remains structurally active.",
        hint:"Tonicization is temporary and locally focused." } },
    { say:"<b>Expected Resolution:</b> A secondary dominant normally resolves to its indicated target: V/V → V, V/ii → ii, and V/vi → vi. The temporary leading tone normally resolves upward by step to the target root; when the applied dominant includes a chordal seventh, that seventh normally resolves downward by step. The notation V/X identifies X as the expected tonicized target, though secondary dominants may occasionally resolve deceptively or move elsewhere, so the full context must be examined. \u{1F447} <b>What is the expected resolution of V/ii?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:72,notes:[
        {p:"A3",d:"w",label:"V/ii"},{p:"C#4",d:"w",chord:true},{p:"E4",d:"w",chord:true},
        {p:"D4",d:"w",label:"ii"},{p:"F4",d:"w",chord:true},{p:"A4",d:"w",chord:true},{bar:"final"}],width:380} },
      try:{ type:"mc", choices:["ii","I","V"], answer:0,
        success:"✓ Correct. In C major, A major or A7 functions as V/ii and normally resolves to D minor.",
        fail:"Read the chord named after the slash.",
        hint:"The denominator identifies the expected target." } },
    { say:"<b>Secondary Dominants in Progressions:</b> Applied dominants can strengthen the expectation of an approaching diatonic chord and introduce chromatic voice leading. For example, I → <b>V/ii</b> → ii → V → I uses A major or A7 to tonicize ii before continuing through predominant, dominant, and tonic functions. Secondary dominants occur in classical, jazz, popular, film, and many other tonal styles. \u{1F447} <b>What effect does placing V/V immediately before V commonly create?</b>",
      try:{ type:"mc", choices:["It strengthens the expectation of arrival on V","It eliminates the dominant function of V","It requires the music to stop"], answer:0,
        success:"✓ Correct. V/V creates a local dominant-to-tonic relationship directed toward V.",
        fail:"Consider how a dominant prepares its expected tonic.",
        hint:"V/V points toward V." } },
    { say:"<b>Review:</b> \u{1F447} <b>Which chord functions as V/V in F major?</b>",
      try:{ type:"mc", choices:["G major, G–B♮–D, normally resolving to C","G minor, G–B♭–D","B♭ major, B♭–D–F"], answer:0,
        success:"✓ Correct. C is V in F major, and G major is the dominant of C. The chromatic pitch B♮ functions as the temporary leading tone to C.",
        fail:"Identify the dominant of C, the dominant chord in F major.",
        hint:"Find V of V in two stages: F → C → G." } }
  ],
  examples:[
    { caption:"I → V/V → V → I in C major: the D major chord (F♯) loads the arrival on G, which then closes home. Hear the double push.",
      staff:{clef:"treble",tempo:72,notes:[
        {p:"C4",d:"w",label:"I"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},
        {p:"D4",d:"w",label:"V/V"},{p:"F#4",d:"w",chord:true},{p:"A4",d:"w",chord:true},
        {p:"G3",d:"w",label:"V"},{p:"B3",d:"w",chord:true},{p:"D4",d:"w",chord:true},
        {p:"C4",d:"w",label:"I"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:560},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"I → V/vi → vi: E major's G♯ tonicizes A minor — for one moment, Am sounds like home. Brief homeness = tonicization.",
      staff:{clef:"treble",tempo:72,notes:[
        {p:"C4",d:"w",label:"I"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},
        {p:"E4",d:"w",label:"V/vi"},{p:"G#4",d:"w",chord:true},{p:"B4",d:"w",chord:true},
        {p:"A4",d:"w",label:"vi"},{p:"C5",d:"w",chord:true},{p:"E5",d:"w",chord:true},{bar:"final"}],width:480},
      kb:{start:60,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Applied-Dominant Identification",
      intro:"Identify targets, spellings, and temporary leading tones.",
      miaIntro:"Read V/X as \u{201C}five of X.\u{201D}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Secondary dominant","the V of a non-tonic chord"],
        ["V/V in C","D major (F♯)"],
        ["V/ii in C","A major (C♯)"],
        ["V/vi in C","E major (G♯)"],
        ["V/IV in C","C7 (B♭)"],
        ["The temporary leading tone","an accidental within a secondary dominant"],
        ["Tonicization","a chord briefly treated as tonic"],
        ["V/X resolves to","X"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — Secondary dominants identified!":null },
    { type:"key-climb", title:"Game 2 · Perform the Applied-Dominant Progression",
      intro:"Play the complete chords C major → D major → G major → C major. Listen to V/V → V → I.",
      miaIntro:"Follow F♯ as it resolves to G.",
      spec:{seq:[60,62,55,60],
        names:["C major (I)","D major (V/V — includes F♯)","G major (V — loaded arrival)","C major (I — home)"],
        start:55, octaves:2, title:"I → V/V → V → I"},
      result:(score)=>score!==null?"You performed the applied-dominant progression.":null },
    { type:"symbol-hunt", title:"Game 3 · Identify the Secondary Dominant",
      intro:"Examine each chromatic chord and its resolution, then select the correct secondary-dominant label.",
      miaIntro:"Identify the chord, temporary leading tone, and target.",
      spec:{rounds:6, pool:[
        {label:"V/V (D-F♯-A)", spec:{clef:"treble",notes:[{p:"D4",d:"w"},{p:"F#4",d:"w",chord:true},{p:"A4",d:"w",chord:true}],width:150}},
        {label:"V/ii (A-C♯-E)", spec:{clef:"treble",notes:[{p:"A3",d:"w"},{p:"C#4",d:"w",chord:true},{p:"E4",d:"w",chord:true}],width:150}},
        {label:"V/vi (E-G♯-B)", spec:{clef:"treble",notes:[{p:"E4",d:"w"},{p:"G#4",d:"w",chord:true},{p:"B4",d:"w",chord:true}],width:150}},
        {label:"Plain ii (D-F-A)", spec:{clef:"treble",notes:[{p:"D4",d:"w"},{p:"F4",d:"w",chord:true},{p:"A4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"You identified the applied dominants from their spelling and context.":null },
    { type:"term-race", title:"Game 4 · Resolve the Applied Dominant",
      intro:"Identify the expected target of each applied dominant.",
      miaIntro:"Read the chord after the slash.",
      spec:{rounds:8, reverse:true, pool:[
        ["V/V","resolves to V"],
        ["V/ii","resolves to ii"],
        ["V/vi","resolves to vi"],
        ["V/IV","resolves to IV"],
        ["F♯ in C major","V/V's leading tone"],
        ["C♯ in C major","V/ii's leading tone"],
        ["G♯ in C major","V/vi's leading tone"],
        ["Extended tonicization","becomes modulation"]]},
      result:(score)=>score>=6?"You identified each expected target correctly.":null }
  ],
  practiceIntro:"Complete 20 practice questions on constructing, identifying, and resolving secondary dominants.",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["V/V","D major in C"],["V/ii","A major in C"],["V/vi","E major in C"],["Tonicization","brief tonic treatment"],["V/X","resolves to X"]], reverse:true}, count:6 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 },
    { type:"mc", q:"A secondary dominant temporarily functions as the dominant of…", choices:["a major or minor chord other than the prevailing tonic","only the prevailing tonic","no identifiable target"], answer:0,
      explain:"A secondary dominant applies dominant function to a nontonic chord." },
    { type:"mc", q:"To construct V/X, find the dominant root of X and build…", choices:["a major triad or dominant seventh chord","a minor triad","a diminished triad"], answer:0,
      explain:"An applied V is a major triad; an applied V⁷ is a major-minor seventh chord." },
    { type:"mc", q:"V/V in C major is…", choices:["D major","D minor","G major"], answer:0,
      explain:"A P5 above G, with F♯." },
    { type:"mc", q:"V/vi in C major needs which accidental?", choices:["G♯","F♯","B♭"], answer:0,
      explain:"Am's leading tone." },
    { type:"truefalse", q:"V/ii resolves to ii.", answer:true,
      explain:"The slash names the target." },
    { type:"truefalse", q:"Tonicization briefly treats a nontonic chord as a local tonic while the prevailing key remains structurally active.", answer:true,
      explain:"The prevailing key remains structurally active during a tonicization." },
    { type:"truefalse", q:"Accidentals can help identify secondary dominants, but chord spelling and resolution must also be examined.", answer:true,
      explain:"An accidental alone does not confirm a secondary dominant." },
    { gen:"term-match", params:{subject:"term", pool:[["P5 above the target","the secondary's root"],["Borrowed leading tone","rises to the target's root"],["V/IV in C","C7"],["Double push","V/V then V"]], reverse:true}, count:3 },
    { gen:"inversion-id", params:{subject:"v7", ask:"position"}, count:2 }
  ],
  vocabulary:[
    {term:"Secondary Dominant", def:"The dominant of a chord other than I — V/V, V/ii, V/vi, V/IV. Read 'five of five,' etc."},
    {term:"Building V/X", def:"A P5 above X's root, made major (or a dominant 7th). The accidental is X's temporary leading tone."},
    {term:"Tonicization", def:"The target chord briefly sounds like a tonic. Extended tonicization becomes modulation."},
    {term:"Resolution V/X → X", def:"The temporary leading tone rises; the chordal 7th falls; the target arrives loaded."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>V/X</b> = X's own applied (secondary) dominant; resolves <b>V/X → X</b>.",
    "✔ Build: <b>P5 above the target, made major</b> (accidental = temporary leading tone).",
    "✔ In C: V/V = <b>D(F♯)</b> · V/ii = <b>A(C♯)</b> · V/vi = <b>E(G♯)</b> · V/IV = <b>C7(B♭)</b>.",
    "✔ <b>Tonicization</b> = brief homeness; extended = modulation.",
    "✔ Purpose: loaded arrivals and chained pushes."
  ],
  tips:[
    "See an accidental mid-phrase? Ask: whose leading tone is this? The answer names the target.",
    "V7/X is even stronger than V/X — the borrowed 7th adds the tritone pull.",
    "Chain them: V/vi → vi can continue vi → V/V → V → I — pushes all the way home.",
    "Next lesson: when the borrowed key KEEPS the spotlight — modulation."
  ],
  rewards:{ badge:"Dominant Lender", icon:"\u{1F3AF}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz: Identify the target, construct its dominant, and examine the expected resolution.",
  quiz:[
    { type:"mc", q:"A secondary dominant is…", choices:["a chord that temporarily functions as V of a nontonic chord","any seventh chord","the tonic chord with a different spelling"], answer:0,
      explain:"A secondary dominant applies dominant function to a nontonic chord.", hint:"V of something else." },
    { type:"mc", q:"How is 'V/V' read aloud?", choices:["five of five","five-five","V slash V"], answer:0,
      explain:"The dominant OF the dominant.", hint:"Of." },
    { type:"mc", q:"To build V/ii in C major:", choices:["A major — a P5 above D","D major","A minor"], answer:0,
      explain:"V/ii in C major is A major or A7, containing the temporary leading tone C♯.", hint:"Target root D." },
    { type:"mc", q:"V/vi in C major is spelled…", choices:["E-G♯-B","E-G-B","A-C♯-E"], answer:0,
      explain:"V/vi in C major is E–G♯–B; G♯ resolves toward A.", hint:"Points at Am." },
    { type:"mc", q:"In C major, F♯ most reliably signals V/V when it…", choices:["belongs to a D major or D7 chord that resolves to G","appears anywhere in the melody","is the only accidental present"], answer:0,
      explain:"F♯ may signal V/V when it belongs to a D major or D7 chord that points toward G; the accidental alone does not confirm it.", hint:"Check the whole chord and its resolution." },
    { type:"mc", q:"What is V⁷/IV in C major?", choices:["C7, C–E–G–B♭","F major, F–A–C","G7, G–B–D–F"], answer:0,
      explain:"C7 functions as the dominant seventh of F. The added B♭ distinguishes V⁷/IV from the diatonic tonic triad C major.", hint:"Add the B♭ seventh to C." },
    { type:"mc", q:"Identify the chord (key: C major).",
      staff:{clef:"treble",notes:[{p:"D4",d:"w"},{p:"F#4",d:"w",chord:true},{p:"A4",d:"w",chord:true}],width:160},
      choices:["V/V — D major resolving toward G","ii — D minor","IV — F major"], answer:0,
      explain:"D–F♯–A forms a major triad. When it points toward G, it functions as V/V.", hint:"Spot the accidental." },
    { type:"mc", q:"What is the expected resolution of V/vi?", choices:["vi","V","I"], answer:0,
      explain:"The slash names the target.", hint:"Read after the slash." },
    { type:"truefalse", q:"Tonicization temporarily treats a nontonic chord as a local tonic.", answer:true,
      explain:"Momentary homeness while the prevailing key remains active.", hint:"Brief." },
    { type:"truefalse", q:"A secondary dominant triad has major quality.", answer:true,
      explain:"An applied dominant seventh has major-minor seventh quality.", hint:"V quality." },
    { type:"mc", q:"In I → V/V → V → I, which chord is directly tonicized by V/V?", choices:["V","The opening I","The final I"], answer:0,
      explain:"V/V functions as the dominant of V and therefore directs attention toward V.", hint:"The loaded chord." },
    { type:"mc", q:"When a new key receives structural confirmation through sustained harmonic activity or cadential emphasis, the process is called…", choices:["Modulation","Cadence","Pedal point"], answer:0,
      explain:"A modulation establishes a new tonic more substantially than a brief tonicization.", hint:"L99." }
  ],
  miaPerfect:"Perfect score! You accurately constructed and identified secondary dominants and their targets.",
  miaPass:"You passed! Next, you will study modulation between keys.",
  mia:{
    hook:{ label:"the welcome",
      explain:"D major (F♯) resolved into G exactly as a V resolves to I — V/V, the dominant of the dominant.",
      play:()=>{const ROWS=[[60,64,67],[62,66,69],[55,59,62],[60,64,67]];ROWS.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.85,.27)));} },
    learn:{ label:"secondary dominants",
      explain:"V/X = major chord a P5 above X; accidental = temporary leading tone; resolves V/X→X; brief homeness = tonicization.",
      hint:"P5 up, made major.",
      play:()=>{[62,66,69].forEach(m=>MFAudio.tone(m,.8,.05,.27));[55,59,62].forEach(m=>MFAudio.tone(m,.9,.95,.27));} },
    example:{ label:"the examples",
      explain:"Example 1 loads V with its own dominant (I-V/V-V-I); example 2 tonicizes vi with E major's G♯." },
    game:{ label:"the games",
      explain:"Sprint the spellings, walk the double push, spot secondaries by accidental, then resolve targets at speed.",
      hint:"The accidental points at the target." },
    quiz:{ label:"this question",
      explain:"Whose leading tone is the accidental? That names the target; the chord is a P5 above it, made major; it resolves to the slash.",
      play:()=>{[64,68,71].forEach(m=>MFAudio.tone(m,.8,.05,.27));[69,72,76].forEach(m=>MFAudio.tone(m,.9,.95,.27));} }
  }
};
