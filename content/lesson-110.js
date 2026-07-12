/* Lesson 110 — Chord Substitution (Book 4, Unit 27 — SELF-AUTHORED)
   Core: TRITONE SUBSTITUTION — two dominant 7ths a tritone apart share
   the same tritone (3rd/7th swap), so D♭7 can replace G7 (bass falls
   chromatically: ii - ♭II7 - I). CHROMATIC MEDIANTS — chords a 3rd away
   sharing one tone, same quality (C→E, C→A♭): cinematic color.
   NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[110]={
  welcome:"Chord substitution and reharmonization create alternative harmonic paths.",
  hook:{
    say:"Listen to two approaches to the tonic. The first uses ii–V7–I. In the second, a chromatic dominant seventh replaces V7, creating a descending chromatic bass line. \u{1F447} <b>What changed?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Dm7–G7–Cmaj7</button>
          <button class="play hk-b">▶ Dm7–D♭7–Cmaj7</button></div>
          <div class="choices hk-ch" style="display:none"><button>D♭7 replaces G7, creating the bass line D–D♭–C</button><button>Both progressions use exactly the same chords</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ [[50,65,69,72],[55,65,71,74],[48,64,67,72]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.85,i*.9,.26))); hA=true; if(hB) setTimeout(()=>ch.style.display="",3100); };
        container.querySelector(".hk-b").onclick=()=>{ [[50,65,69,72],[49,65,68,71],[48,64,67,72]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.85,i*.9,.26))); hB=true; if(hA) setTimeout(()=>ch.style.display="",3100); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Correct. D♭7 replaces G7 as a tritone substitute and resolves to C. The substitution creates the chromatic root motion D–D♭–C.");
          else fb(false,"Compare the roots of the final three chords in each progression.");
        });
      } }
  },
  objectives:[
    "Define substitution: a new chord doing an old chord's job",
    "TRITONE SUB: dominant 7ths a tritone apart share their tritone",
    "Use it: ii - ♭II7 - I with a chromatic bass (D-D♭-C)",
    "CHROMATIC MEDIANTS: same-quality chords a 3rd apart, one shared tone",
    "Hear the mediant's cinematic lift (C→E, C→A♭)",
    "Know when to substitute: color without losing function"
  ],
  steps:[
    { say:"<b>Chord Substitution and Reharmonization:</b> A chord substitution replaces an expected chord with another chord that preserves enough of its harmonic role, voice leading, melody compatibility, or structural placement to function convincingly in context. Functional substitutes often serve a similar role, but reharmonization may intentionally change the original harmonic function.<br>Examples of common functional relationships:<br>• Tonic-related: I and sometimes vi or iii<br>• Predominant-related: ii and IV<br>• Dominant-related: V7, vii°, and in some styles, a tritone substitute \u{1F447} <b>What should be considered when choosing a substitute chord?</b>",
      try:{ type:"mc", choices:["Harmonic function, melody compatibility, and voice leading","Exact duplication of every original pitch","Dynamic level only"], answer:0,
        success:"✓ Correct. A substitute should support the musical context, even when it changes some notes or alters the original harmonic function.",
        fail:"Consider the chord's role, the melody note, and the surrounding voice leading.",
        hint:"Begin with function, then check melody and voice leading." } },
    { say:"<b>Why Tritone Substitution Works:</b> G7 contains the tritone <b>B–F</b>, formed by its third and seventh. D♭7 contains <b>F–C♭</b>, also its third and seventh. In twelve-tone equal temperament, C♭ sounds like B, so the two chords contain enharmonically equivalent guide-tone pitch classes with their chord-member roles reversed.<br>In G7: B is the third and F is the seventh<br>In D♭7: F is the third and C♭ is the seventh<br>The roots G and D♭ are a tritone apart. Both chords can direct their guide tones toward C tonic harmony, but they use different root motion and spelling. \u{1F447} <b>Which chord members create the connection between G7 and D♭7?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:66,notes:[
        {p:"G3",d:"h",label:"G7"},{p:"B3",d:"h",chord:true},{p:"F4",d:"h",chord:true},
        {p:"Db4",d:"h",label:"D\u{266D}7"},{p:"F4",d:"h",chord:true},{p:"B4",d:"h",chord:true},{bar:"final"}],width:400} },
      try:{ type:"mc", choices:["Their enharmonically equivalent thirds and sevenths","Their roots","Their perfect fifths only"], answer:0,
        success:"✓ Correct. B–F in G7 is enharmonically equivalent to C♭–F in D♭7. The guide tones resolve toward the C tonic chord.",
        fail:"Spell the third and seventh of both dominant seventh chords.",
        hint:"B sounds like C♭ in equal temperament, but the spellings show different chord functions." } },
    { say:"<b>Using the Tritone Substitute:</b> In a major-key ii–V7–I progression, V7 may be replaced by a dominant seventh chord whose root lies a tritone away. In C major:<br>Original: Dm7–G7–Cmaj7<br>Substitution: Dm7–D♭7–Cmaj7<br>Analysis: ii7–subV7/I–Imaj7<br>D♭7 may also be labeled ♭II7, but it should not be confused with the Neapolitan chord. The Neapolitan is normally a major triad, often in first inversion, with predominant function. D♭7 is a dominant-seventh-quality chord serving substitute-dominant function. \u{1F447} <b>What root motion occurs in Dm7–D♭7–Cmaj7?</b>",
      try:{ type:"mc", choices:["D–D♭–C, descending by half step","D–G–C, descending by fifth","The root remains unchanged"], answer:0,
        success:"✓ Correct. The roots move 2–♭2–1, producing a descending chromatic line.",
        fail:"Follow the chord roots in order.",
        hint:"Each root descends by half step." } },
    { say:"<b>Chromatic Mediant Relationships:</b> In the conventional definition introduced here, chromatic mediants are major or minor triads whose roots are a major or minor third apart, have the same chord quality, and share one common tone. At least one chord is chromatic within the prevailing key.<br>Examples:<br>C major → E major: the roots are a major third apart, and the chords share E<br>C major → A♭ major: the roots are a major third apart, and the chords share C<br>Chromatic mediant describes a chord relationship, not a single fixed harmonic function. In context, E major in C may function as V/vi, while A♭ major may function as the borrowed ♭VI chord. In other passages, the relationship may support chromatic planing, modulation, or nonfunctional color. \u{1F447} <b>Which pitch is shared by C major and E major?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:66,notes:[
        {p:"C4",d:"h",label:"C"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"E4",d:"h",label:"E!"},{p:"G#4",d:"h",chord:true},{p:"B4",d:"h",chord:true},{bar:"final"}],width:380} },
      try:{ type:"mc", choices:["E","G","C"], answer:0,
        success:"✓ Correct. C–E–G and E–G♯–B share E, while the remaining voices may move chromatically or by small intervals.",
        fail:"Compare the pitch content of the two triads.",
        hint:"Identify the common tone E." } },
    { say:"<b>Applying Reharmonization:</b> A tritone substitute is especially common when a dominant-function chord approaches its tonic. Chromatic mediants may connect chords through a common tone and smooth chromatic voice leading, but their function depends on the larger progression.<br>Before replacing a chord, check:<br>Does the substitute support the melody note?<br>Does it provide convincing voice leading?<br>Does it preserve or intentionally alter the harmonic function?<br>Does its spelling reflect its intended resolution?<br>Remember:<br>Tritone substitution: subV7 replaces V7 through enharmonically equivalent guide tones<br>Chromatic mediant: a third-related chromatic chord relationship, commonly with the same quality and one common tone \u{1F447} <b>Which consideration is important in both chord substitution and chromatic reharmonization?</b>",
      try:{ type:"mc", choices:["Clear voice leading and compatibility with the surrounding melody and harmony","An increase in volume","A change of meter"], answer:0,
        success:"✓ Correct. Effective reharmonization depends on context, voice leading, melody, and harmonic purpose.",
        fail:"Consider what both devices rely on to connect harmonies.",
        hint:"Examine what changes and what connects the two harmonies." } },
    { say:"<b>Review:</b> \u{1F447} <b>What is the correctly spelled tritone substitute for C7 when resolving to F?</b>",
      try:{ type:"mc", choices:["G♭7","F7","B7"], answer:0,
        success:"✓ Correct. The roots C and G♭ are a tritone apart. C7 contains E–B♭, while G♭7 contains B♭–F♭. F♭ is enharmonically equivalent to E, so the two chords contain enharmonically equivalent guide tones.",
        fail:"Find the root a tritone from C and spell the chord to resolve toward F.",
        hint:"Use G♭7, not F♯7, for the expected downward resolution to F." } }
  ],
  examples:[
    { caption:"ii - ♭II7 - I: the tritone sub in place, bass sliding D-D♭-C — same landing, silkier road.",
      staff:{clef:"treble",tempo:69,notes:[
        {p:"D4",d:"h",label:"ii7"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"Db4",d:"h",label:"\u{266D}II7"},{p:"F4",d:"h",chord:true},{p:"Ab4",d:"h",chord:true},{p:"B4",d:"h",chord:true},
        {p:"C4",d:"w",label:"I"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:560},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"Chromatic mediants: C → E → A♭ → C — three same-quality chords hinged on common tones, circling home in major 3rds.",
      staff:{clef:"treble",tempo:72,notes:[
        {p:"C4",d:"h",label:"C"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"E4",d:"h",label:"E"},{p:"G#4",d:"h",chord:true},{p:"B4",d:"h",chord:true},
        {p:"Eb4",d:"h",label:"A\u{266D}"},{p:"Ab4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"C4",d:"w",label:"C"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:560},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Substitution and Reharmonization (45s)",
      intro:"Identify functional substitutes, tritone substitutes, and chromatic mediant relationships.",
      miaIntro:"Check function, guide tones, and voice leading.",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Tritone sub","\u{266D}II7 replaces V7"],
        ["Why it works","the two dominants share a tritone"],
        ["Sub for G7","D\u{266D}7"],
        ["Sub for C7","G\u{266D}7"],
        ["The sub's bass line","2 - \u{266D}2 - 1 chromatic"],
        ["Chromatic mediant","3rd apart, same quality, one shared tone"],
        ["C major's mediants","E, A\u{266D} (and E\u{266D}, A)"],
        ["Mediants' home","film scoring's wonder-shift"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — Substitutions identified!":null },
    { type:"key-climb", title:"Game 2 · Perform the Tritone-Sub Progression",
      intro:"Play the complete progression Dm7–D♭7–Cmaj7. Then isolate the roots D–D♭–C and listen to the chromatic descent.",
      miaIntro:"Follow the guide tones and descending roots.",
      spec:{seq:[50,49,48],
        names:["D (ii)","D♭ (the sub!)","C (home)"],
        start:48, octaves:1, title:"ii - \u{266D}II7 - I bass"},
      result:(score)=>score!==null?"You performed the tritone-substitution progression.":null },
    { type:"symbol-hunt", title:"Game 3 · Original or Substitute?",
      intro:"Examine each approach to tonic and identify the original dominant or its tritone substitute.",
      miaIntro:"Check the root, chord quality, spelling, and resolution.",
      spec:{rounds:6, pool:[
        {label:"V7 (G7)", spec:{clef:"treble",notes:[{p:"G3",d:"w"},{p:"B3",d:"w",chord:true},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true}],width:150}},
        {label:"Tritone sub (D♭7)", spec:{clef:"treble",notes:[{p:"Db4",d:"w"},{p:"F4",d:"w",chord:true},{p:"Ab4",d:"w",chord:true},{p:"B4",d:"w",chord:true}],width:150}},
        {label:"Chromatic mediant of C (E major)", spec:{clef:"treble",notes:[{p:"E4",d:"w"},{p:"G#4",d:"w",chord:true},{p:"B4",d:"w",chord:true}],width:150}},
        {label:"Plain I (C)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"You identified the substitute dominants correctly.":null },
    { type:"term-race", title:"Game 4 · Find the Tritone Substitute",
      intro:"Identify and correctly spell the tritone substitute for each dominant seventh chord.",
      miaIntro:"Find the tritone-related root and check its expected resolution.",
      spec:{rounds:8, reverse:true, pool:[
        ["G7's sub","D\u{266D}7"],["C7's sub","G\u{266D}7"],["D7's sub","A\u{266D}7"],["F7's sub","B7"],
        ["A7's sub","E\u{266D}7"],["E7's sub","B\u{266D}7"],
        ["Shared between subs","the tritone (3rd/7th swapped)"],
        ["C's chromatic mediants","E and A\u{266D} majors"]]},
      result:(score)=>score>=6?"You identified the tritone substitutes correctly.":null }
  ],
  practiceIntro:"Complete 20 practice questions on functional substitution, tritone substitution, chromatic mediants, and voice leading.",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Tritone sub","\u{266D}II7 for V7"],["Shared engine","the tritone"],["Bass line","2-\u{266D}2-1"],["Chromatic mediant","3rd + shared tone"],["Function","must survive"]], reverse:true}, count:6 },
    { gen:"interval-quality", params:{ask:"quality"}, count:2 },
    { type:"mc", q:"Which factors should be considered when selecting a substitute chord?", choices:["Function, melody compatibility, and voice leading","Root spelling only","Dynamic level only"], answer:0, explain:"Support the context, not just the notes." },
    { type:"mc", q:"What is the tritone substitute for G7 when resolving to C?", choices:["D♭7","C7","B7"], answer:0, explain:"A tritone from G, resolving to C." },
    { type:"mc", q:"What do G7 and D♭7 contain in common?", choices:["Enharmonically equivalent thirds and sevenths","Their roots","Their fifths"], answer:0, explain:"B–F equals C♭–F enharmonically." },
    { type:"mc", q:"What root line does Dm7–D♭7–Cmaj7 produce?", choices:["D–D♭–C","D–G–C","C–F–G"], answer:0, explain:"Descending chromatic roots." },
    { type:"truefalse", q:"Under the conventional same-quality definition used in this lesson, chromatic mediant triads share one common tone.", answer:true, explain:"The hinge note." },
    { type:"truefalse", q:"C major and E major form a chromatic mediant relationship.", answer:true, explain:"Same quality, a 3rd apart, sharing E." },
    { type:"truefalse", q:"The harmonic function of a chromatic mediant depends on its musical context.", answer:true, explain:"E major in C may function as V/vi; A♭ major as borrowed ♭VI." },
    { gen:"term-match", params:{subject:"term", pool:[["C7's sub","G\u{266D}7"],["A7's sub","E\u{266D}7"],["C \u{2192} A\u{266D}","mediant (shares C)"],["C \u{2192} E","mediant (shares E)"]], reverse:true}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 }
  ],
  vocabulary:[
    {term:"Chord Substitution", def:"A new chord in an old slot that usually preserves the original's role, though reharmonization may intentionally alter the function."},
    {term:"Tritone Substitution", def:"♭II7 replaces V7 — dominant 7ths a tritone apart share their tritone (3rd/7th swapped)."},
    {term:"The Chromatic Bass", def:"ii - ♭II7 - I walks 2 - ♭2 - 1 — the sub's silky signature."},
    {term:"Chromatic Mediant", def:"Same-quality chords a 3rd apart with one shared tone (C→E, C→A♭); its harmonic function depends on context."}
  ],
  mistakes:[],
  summary:[
    "✔ Substitution = <b>same function, new color</b>.",
    "✔ <b>Tritone sub</b>: ♭II7 for V7 — shared tritone, swapped 3rd/7th.",
    "✔ Signature bass: <b>2 - ♭2 - 1</b>.",
    "✔ <b>Chromatic mediants</b>: 3rd-related, same quality, one common tone — the wonder-shift.",
    "✔ Common tones carry the ear across every swap."
  ],
  tips:[
    "Find any tritone sub instantly: the octave's midpoint from the dominant's root.",
    "Try the sub in L95's ii-V-I tonight: Dm7 - D♭7 - Cmaj7.",
    "Mediant magic: hold the shared tone in the melody while the chords leap — the ear never falls."
  ],
  rewards:{ badge:"Harmonic Alchemist", icon:"\u{1F98E}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz: Analyze substitute dominants, enharmonic guide tones, and chromatic mediant relationships.",
  quiz:[
    { type:"mc", q:"What should an effective chord substitution support?", choices:["The melody, voice leading, and intended harmonic role","The exact original pitches in every case","The tempo only"], answer:0, explain:"Support the context, not just the notes.", hint:"Think role, melody, and voice leading." },
    { type:"mc", q:"What is the common tritone substitute for V7 in a major key?", choices:["subV7/I, often spelled as ♭II7","IV7","vii°"], answer:0, explain:"Its root lies a tritone from V and a half step above the tonic.", hint:"D♭7 for G7." },
    { type:"mc", q:"Why can D♭7 substitute for G7 when resolving to C?", choices:["Their thirds and sevenths are enharmonically equivalent and resolve smoothly toward C harmony","The chords contain all four identical pitches","The roots are identical"], answer:0, explain:"3rd and 7th are enharmonically equivalent guide tones.", hint:"The guide tones are shared." },
    { type:"mc", q:"What is the root motion in Dm7–D♭7–Cmaj7?", choices:["D–D♭–C","D–G–C","D–E–F"], answer:0, explain:"Chromatic descent.", hint:"Half steps." },
    { type:"mc", q:"What is the correctly spelled tritone substitute for C7 when resolving to F?", choices:["G♭7","F7","D7"], answer:0, explain:"C and G♭ are a tritone apart; G♭7 resolves toward F.", hint:"Use G♭7, not F♯7." },
    { type:"mc", q:"Under the definition used in this lesson, a chromatic mediant relationship involves…", choices:["Triads of the same quality with roots a third apart and one common tone","Roots a fifth apart","Identical roots"], answer:0, explain:"C→E, C→A♭.", hint:"The hinge tone." },
    { type:"mc", q:"Which pitch is shared by C major and A♭ major?", choices:["C","E","G"], answer:0, explain:"C lives in A♭–C–E♭.", hint:"Look in both spellings." },
    { type:"mc", q:"C major moves to E major while the melody sustains E. What chord relationship is present?", choices:["Chromatic mediant relationship","Tritone substitution","Plagal cadence"], answer:0, explain:"The roots are a major third apart, both triads are major, and E is the common tone. The function of E major depends on what follows.", hint:"Third-related, same quality, shared E." },
    { type:"truefalse", q:"Tritone-related dominant seventh chords contain enharmonically equivalent guide-tone pitch classes.", answer:true, explain:"Each other's third and seventh, enharmonically.", hint:"B and F." },
    { type:"truefalse", q:"A chromatic mediant chord may have a functional interpretation, depending on context.", answer:true, explain:"E major in C may act as V/vi; A♭ major as borrowed ♭VI.", hint:"Function depends on context." },
    { type:"mc", q:"In which progression does D♭7 function as a tritone substitute for G7?", choices:["Dm7–D♭7–Cmaj7","Cmaj7–Fmaj7–Cmaj7","G7–C7–F7 without a C-tonic resolution"], answer:0, explain:"D♭7 replaces G7 resolving to C.", hint:"Look for the C-tonic resolution." },
    { type:"mc", q:"Which statement correctly distinguishes the two concepts?", choices:["Tritone substitution replaces a dominant through enharmonic guide-tone voice leading; chromatic mediant describes a third-related chromatic chord relationship","Both terms mean exactly the same harmonic procedure","Neither concept involves voice leading"], answer:0, explain:"They are different procedures.", hint:"One replaces a dominant; the other is a third relationship." }
  ],
  miaPerfect:"Perfect score! You accurately analyzed tritone substitutions and chromatic mediant relationships.",
  miaPass:"You passed and completed Lesson 110. You can now identify and apply the principal harmonic, melodic, rhythmic, and formal concepts in Music Theory 1.",
  mia:{
    hook:{ label:"the welcome",
      explain:"D♭7 replaced G7 — the tritone substitution: same tritone engine, chromatic bass slide.",
      play:()=>{[[50,65,69,72],[49,65,68,71],[48,64,67,72]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.85,.26)));} },
    learn:{ label:"chord substitution",
      explain:"Tritone sub: ♭II7 for V7 via the shared tritone; bass 2-♭2-1. Chromatic mediants: 3rd-related same-quality chords hinged on one tone.",
      hint:"What is shared?",
      play:()=>{[49,53,56,59].forEach(m=>MFAudio.tone(m,.9,.05,.27));[48,64,67].forEach(m=>MFAudio.tone(m,1.0,1.0,.28));} },
    example:{ label:"the examples",
      explain:"Example 1 slides the substituted cadence; example 2 circles C-E-A♭-C on mediant hinges." },
    game:{ label:"the games",
      explain:"Sprint the subs, slide the bass, spot subs on cards, then find every dominant's twin.",
      hint:"Six half steps to the sub." },
    quiz:{ label:"this question",
      explain:"Tritone sub: find the root a tritone away, check the shared 3rd/7th pair. Mediant: 3rd-distance + same quality + one held tone.",
      play:()=>{[49,65,68,71].forEach(m=>MFAudio.tone(m,.9,.05,.27));} }
  }
};
