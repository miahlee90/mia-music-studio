/* Lesson 110 — Chord Substitution (Book 4, Unit 27 — SELF-AUTHORED)
   Core: TRITONE SUBSTITUTION — two dominant 7ths a tritone apart share
   the same tritone (3rd/7th swap), so D♭7 can replace G7 (bass falls
   chromatically: ii - ♭II7 - I). CHROMATIC MEDIANTS — chords a 3rd away
   sharing one tone, same quality (C→E, C→A♭): cinematic color.
   NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[110]={
  welcome:"Substitution: new chords in old slots. \u{1F98E}",
  hook:{
    say:"<b>The same cadence twice</b> — but the second time, a stranger replaces the V7 and the bass slides by half step. \u{1F447} <b>Listen to both endings.</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ ii - V7 - I</button>
          <button class="play hk-b">▶ ii - ?? - I</button></div>
          <div class="choices hk-ch" style="display:none"><button>A chord a tritone from G replaced V7 — the bass slid D-D♭-C</button><button>Nothing changed</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ [[50,65,69,72],[55,65,71,74],[48,64,67,72]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.85,i*.9,.26))); hA=true; if(hB) setTimeout(()=>ch.style.display="",3100); };
        container.querySelector(".hk-b").onclick=()=>{ [[50,65,69,72],[49,65,68,71],[48,64,67,72]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.85,i*.9,.26))); hB=true; if(hA) setTimeout(()=>ch.style.display="",3100); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ D♭7 replaced G7 — the TRITONE SUBSTITUTION. Same pull, chromatic bass. Today: swapping chords without breaking the music!");
          else fb(false,"The second ending's bass slid down by half steps — a substitute was at work…");
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
    { say:"<b>The Idea:</b> a <b>substitute chord</b> takes another's place while keeping its <b>function</b> — the progression's story survives, the color changes. \u{1F447} <b>A good substitute preserves the original's…</b>",
      try:{ type:"mc", choices:["Function","Exact notes","Volume"], answer:0,
        success:"✓ Same job, new suit.",
        fail:"The slot's PURPOSE must survive…",
        hint:"T, PD or D." } },
    { say:"<b>Why the Tritone Sub Works:</b> G7's engine is its tritone <b>B–F</b> (3rd + 7th). D♭7 contains <b>F–C♭(B)</b> — the SAME two notes, swapped! Two dominants a tritone apart share one tritone. \u{1F447} <b>G7 and D♭7 share…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:66,notes:[
        {p:"G3",d:"h",label:"G7"},{p:"B3",d:"h",chord:true},{p:"F4",d:"h",chord:true},
        {p:"Db4",d:"h",label:"D\u{266D}7"},{p:"F4",d:"h",chord:true},{p:"B4",d:"h",chord:true},{bar:"final"}],width:400} },
      try:{ type:"mc", choices:["Their tritone (B and F)","Their roots","Nothing"], answer:0,
        success:"✓ The pull-making pair lives in both — so either resolves to C.",
        fail:"Compare each chord's 3rd and 7th…",
        hint:"Swapped jobs, same notes." } },
    { say:"<b>Using It:</b> replace V7 with <b>♭II7</b>: ii - V7 - I becomes <b>ii - D♭7 - I</b> — and the bass walks <b>D - D♭ - C</b>, pure chromatic silk. Jazz's favorite reharmonization. \u{1F447} <b>The tritone sub's bass line moves…</b>",
      try:{ type:"mc", choices:["Down by half steps","Up by 5ths","Not at all"], answer:0,
        success:"✓ 2 - ♭2 - 1: the chromatic slide is the sub's signature.",
        fail:"D… D♭… C…",
        hint:"Half steps down." } },
    { say:"<b>Chromatic Mediants:</b> chords a <b>3rd apart, same quality, one shared tone</b> — C major → E major (share E) or C → A♭ (share C). Neither diatonic nor functional: pure <b>color shift</b>, film scoring's favorite wonder-move. \u{1F447} <b>C major and E major share which note?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:66,notes:[
        {p:"C4",d:"h",label:"C"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"E4",d:"h",label:"E!"},{p:"G#4",d:"h",chord:true},{p:"B4",d:"h",chord:true},{bar:"final"}],width:380} },
      try:{ type:"mc", choices:["E","G","C"], answer:0,
        success:"✓ One common tone anchors the leap; the other notes shift chromatically — instant awe.",
        fail:"Which letter appears in both C-E-G and E-G♯-B?",
        hint:"The shared hinge." } },
    { say:"<b>When to Substitute:</b> subs shine at cadences (tritone sub), at wonder-moments (mediants) and wherever a loop needs fresh paint — but the FUNCTION or the shared tone must carry the ear. <b>Remember: tritone sub = ♭II7 for V7 (shared tritone) · chromatic mediant = 3rd-related, same quality, one common tone.</b> \u{1F447} <b>Both devices depend on…</b>",
      try:{ type:"mc", choices:["Shared notes carrying the ear across","Louder playing","New time signatures"], answer:0,
        success:"✓ The common tones are the bridge — the ear follows what it can hold.",
        fail:"What made D♭7 and E major acceptable?",
        hint:"What was kept." } },
    { say:"<b>Review:</b> \u{1F447} <b>The tritone substitute for C7 is…</b>",
      try:{ type:"mc", choices:["G♭7 (F♯7)","F7","B7"], answer:0,
        success:"✓ A tritone from C is G♭ — G♭7 shares C7's E–B♭ tritone.",
        fail:"Count six half steps from C…",
        hint:"The octave's midpoint." } }
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
    { type:"gen-race", title:"Game 1 · Substitution Sprint (45s)",
      intro:"Subs, mediants and shared notes — race them!",
      miaIntro:"Same job, new suit! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Tritone sub","\u{266D}II7 replaces V7"],
        ["Why it works","the two dominants share a tritone"],
        ["Sub for G7","D\u{266D}7"],
        ["Sub for C7","G\u{266D}7"],
        ["The sub's bass line","2 - \u{266D}2 - 1 chromatic"],
        ["Chromatic mediant","3rd apart, same quality, one shared tone"],
        ["C major's mediants","E, A\u{266D} (and E\u{266D}, A)"],
        ["Mediants' home","film scoring's wonder-shift"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — substitution licensed!":null },
    { type:"key-climb", title:"Game 2 · Slide the Bass",
      intro:"Play the substituted cadence bass: D, D♭, C!",
      miaIntro:"Chromatic silk! \u{1FA9C}",
      spec:{seq:[50,49,48],
        names:["D (ii)","D♭ (the sub!)","C (home)"],
        start:48, octaves:1, title:"ii - \u{266D}II7 - I bass"},
      result:(score)=>score!==null?"The slide, played!":null },
    { type:"symbol-hunt", title:"Game 3 · Sub or Original?",
      intro:"Cadence chords — click what each round names!",
      miaIntro:"Check the root! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"V7 (G7)", spec:{clef:"treble",notes:[{p:"G3",d:"w"},{p:"B3",d:"w",chord:true},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true}],width:150}},
        {label:"Tritone sub (D♭7)", spec:{clef:"treble",notes:[{p:"Db4",d:"w"},{p:"F4",d:"w",chord:true},{p:"Ab4",d:"w",chord:true},{p:"B4",d:"w",chord:true}],width:150}},
        {label:"Chromatic mediant of C (E major)", spec:{clef:"treble",notes:[{p:"E4",d:"w"},{p:"G#4",d:"w",chord:true},{p:"B4",d:"w",chord:true}],width:150}},
        {label:"Plain I (C)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Subs spotted!":null },
    { type:"term-race", title:"Game 4 · Find the Sub Race",
      intro:"Name each dominant's tritone sub — at speed!",
      miaIntro:"Six half steps away! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["G7's sub","D\u{266D}7"],["C7's sub","G\u{266D}7"],["D7's sub","A\u{266D}7"],["F7's sub","B7"],
        ["A7's sub","E\u{266D}7"],["E7's sub","B\u{266D}7"],
        ["Shared between subs","the tritone (3rd/7th swapped)"],
        ["C's chromatic mediants","E and A\u{266D} majors"]]},
      result:(score)=>score>=6?"Every sub found!":null }
  ],
  practiceIntro:"20 practice questions — subs, mediants and shared tones. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Tritone sub","\u{266D}II7 for V7"],["Shared engine","the tritone"],["Bass line","2-\u{266D}2-1"],["Chromatic mediant","3rd + shared tone"],["Function","must survive"]], reverse:true}, count:6 },
    { gen:"interval-quality", params:{ask:"quality"}, count:2 },
    { type:"mc", q:"A substitute chord must keep the original's…", choices:["function","root","spelling"], answer:0, explain:"Job over identity." },
    { type:"mc", q:"G7's tritone substitute is…", choices:["D♭7","C7","B7"], answer:0, explain:"Six half steps from G." },
    { type:"mc", q:"G7 and D♭7 share…", choices:["their tritone (B/F)","their roots","their 5ths"], answer:0, explain:"3rd and 7th, swapped." },
    { type:"mc", q:"The substituted cadence bass runs…", choices:["D - D♭ - C","D - G - C","C - F - G"], answer:0, explain:"Chromatic descent." },
    { type:"truefalse", q:"Chromatic mediants share exactly one common tone.", answer:true, explain:"The hinge note." },
    { type:"truefalse", q:"C major and E major are chromatic mediants.", answer:true, explain:"Same quality, a 3rd apart, sharing E." },
    { type:"truefalse", q:"Chromatic mediants are strongly functional.", answer:false, explain:"Pure color — that is the point." },
    { gen:"term-match", params:{subject:"term", pool:[["C7's sub","G\u{266D}7"],["A7's sub","E\u{266D}7"],["C \u{2192} A\u{266D}","mediant (shares C)"],["C \u{2192} E","mediant (shares E)"]], reverse:true}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 }
  ],
  vocabulary:[
    {term:"Chord Substitution", def:"A new chord in an old slot, preserving the function while changing the color."},
    {term:"Tritone Substitution", def:"♭II7 replaces V7 — dominant 7ths a tritone apart share their tritone (3rd/7th swapped)."},
    {term:"The Chromatic Bass", def:"ii - ♭II7 - I walks 2 - ♭2 - 1 — the sub's silky signature."},
    {term:"Chromatic Mediant", def:"Same-quality chords a 3rd apart with one shared tone (C→E, C→A♭) — cinematic color, minimal function."}
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
    "Mediant magic: hold the shared tone in the melody while the chords leap — the ear never falls.",
    "Next lesson: the blues, revisited in depth — dominant-everywhere harmony and turnarounds."
  ],
  rewards:{ badge:"Harmonic Alchemist", icon:"\u{1F98E}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Shared tritones, shared tones, same jobs.",
  quiz:[
    { type:"mc", q:"Chord substitution keeps the slot's…", choices:["function","exact notes","tempo"], answer:0, explain:"Same story, new voice.", hint:"T/PD/D survives." },
    { type:"mc", q:"The tritone substitute of V7 is…", choices:["♭II7","IV7","vii°"], answer:0, explain:"A tritone from the root.", hint:"D♭7 for G7." },
    { type:"mc", q:"Why does D♭7 replace G7 so smoothly?", choices:["They share the same tritone (B/F)","They share all notes","They are both quiet"], answer:0, explain:"3rd and 7th trade places.", hint:"The engine is identical." },
    { type:"mc", q:"In ii - ♭II7 - I, the bass moves…", choices:["D - D♭ - C","D - G - C","up in 4ths"], answer:0, explain:"Chromatic descent.", hint:"Half steps." },
    { type:"mc", q:"C7's tritone sub is…", choices:["G♭7","F7","D7"], answer:0, explain:"Six half steps up/down.", hint:"The midpoint." },
    { type:"mc", q:"A chromatic mediant relationship requires…", choices:["3rd-distance, same quality, a common tone","5th-distance","identical roots"], answer:0, explain:"C→E, C→A♭.", hint:"The hinge tone." },
    { type:"mc", q:"C major → A♭ major share which tone?", choices:["C","E","G"], answer:0, explain:"C lives in A♭-C-E♭.", hint:"Look in both spellings." },
    { type:"mc", q:"Identify the move: C major chord leaps to E major, melody holding E.", choices:["A chromatic mediant shift","A tritone sub","A plagal cadence"], answer:0, explain:"3rd-related, same quality, shared E.", hint:"The wonder-shift." },
    { type:"truefalse", q:"Tritone-related dominant 7ths share two notes.", answer:true, explain:"Each other's 3rd and 7th.", hint:"B and F." },
    { type:"truefalse", q:"Chromatic mediants create strong dominant function.", answer:false, explain:"They trade function for color.", hint:"Film, not cadence." },
    { type:"mc", q:"Where does the tritone sub shine most?", choices:["At cadences replacing V7","In drum solos","In key signatures"], answer:0, explain:"The reharmonized close.", hint:"Jazz endings." },
    { type:"mc", q:"Both devices work because…", choices:["shared notes bridge the swap","volume increases","the meter changes"], answer:0, explain:"The ear follows the held thread.", hint:"Common tones." }
  ],
  miaPerfect:"PERFECT! Swaps and shifts, all under control. \u{1F98E}\u{1F389}",
  miaPass:"Passed! You reharmonize with confidence. Next: blues harmony in depth…",
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
