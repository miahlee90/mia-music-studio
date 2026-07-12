/* Lesson 108 — Extended Chords (Book 4, Unit 27 — SELF-AUTHORED)
   Core: stack 3rds past the 7th → 9th, 11th, 13th chords. Numbers from
   L83's compound intervals. Voicings omit notes (5th first); the 13th is
   the practical ceiling. NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[108]={
  welcome:"Extended chords continue the stack of thirds beyond the seventh.",
  hook:{
    say:"<b>Listen as thirds are added above a seventh chord.</b> \u{1F447} <b>Which compound intervals are added to create ninth, eleventh, and thirteenth chords?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center"><button class="play hk-a">▶ Build the complete stack</button></div>
          <div class="choices hk-ch" style="display:none"><button>The stack extends to the 9th, 11th, and 13th</button><button>The stack contains only a root-position triad</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ [[55,59,62,65],[55,59,62,65,69],[55,59,65,69,72,76]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.9,i*1.0,.24))); setTimeout(()=>ch.style.display="",3400); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Correct. Continuing the tertian stack beyond the seventh produces the ninth, eleventh, and thirteenth. These are called chord extensions.");
          else fb(false,"Count the compound intervals above the root: 9th, 11th, and 13th.");
        });
      } }
  },
  objectives:[
    "Build extensions: keep stacking 3rds past the 7th",
    "Name them by compound intervals: 9th, 11th, 13th (L83)",
    "Spell C9, C11, C13 (dominant family by default)",
    "Know practical voicing: omit the unaltered 5th (and the natural 11th in dominants)",
    "Why 13 is the ceiling: the 15th would repeat the root",
    "Hear the added color of each extension"
  ],
  steps:[
    { say:"<b>Continuing the Stack:</b> Adding a third above a seventh chord produces a <b>ninth chord</b>. Adding another third produces an <b>eleventh chord</b>, and adding one more produces a <b>thirteenth chord</b>. The complete theoretical G13 stack is G–B–D–F–A–C–E: root, third, fifth, seventh, ninth, eleventh, and thirteenth. Actual performance voicings normally use fewer notes. \u{1F447} <b>How many different chord members are in a complete theoretical ninth chord?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Chord</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Stack (on C)</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#2F6DA8">C9</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px">C-E-G-B\u{266D}-D</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#A9821F">C11</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px">…+ F</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#C05A21">C13</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px">…+ A</td></tr></table>` },
      try:{ type:"mc", choices:["Five","Three","Nine"], answer:0,
        success:"✓ Correct. A complete ninth chord contains the root, third, fifth, seventh, and ninth.",
        fail:"Count the different chord members in C–E–G–B♭–D.",
        hint:"A complete seventh chord plus one additional third." } },
    { say:"<b>Extension Numbers:</b> Chord extensions are named as compound intervals above the root: the 9th = a compound 2nd, the 11th = a compound 4th, the 13th = a compound 6th. These numbers describe each chord member's theoretical relationship to the root. In an actual voicing, an extension may be placed within the same octave as the root or in another register. \u{1F447} <b>What is the simple equivalent of a thirteenth?</b>",
      try:{ type:"mc", choices:["Sixth","Third","Fifth"], answer:0,
        success:"✓ Correct. Subtracting 7 from 13 gives 6, so a thirteenth is a compound sixth.",
        fail:"Reduce the compound interval to its simple equivalent.",
        hint:"13 − 7 = 6." } },
    { say:"<b>Chord-Symbol Quality:</b> When 9, 11, or 13 follows a bare root letter, the symbol normally indicates a dominant-seventh foundation: C9 = C7 with an added ninth, C11 = C7 with upper extensions through the eleventh, C13 = C7 with a thirteenth extension. Major- and minor-seventh foundations must be identified explicitly: Cmaj9, Cm9, Cmaj13, or Cm11. An added-tone symbol such as Cadd9 adds the ninth without implying a seventh. \u{1F447} <b>Which seventh does C9 contain?</b>",
      try:{ type:"mc", choices:["B♭, a minor seventh above C","B♮, a major seventh above C","No seventh"], answer:0,
        success:"✓ Correct. C9 is based on C7, so it contains B♭. Use Cmaj9 for a chord containing B♮.",
        fail:"Begin with C7 and add D, the ninth.",
        hint:"A bare root followed by 9 implies a dominant-seventh-quality foundation." } },
    { say:"<b>Practical Voicing:</b> Complete eleventh and thirteenth stacks can sound dense, so performers select chord members according to musical context. The third and seventh often receive priority because they define chord quality and dominant function. The named extension should normally be present. An unaltered perfect fifth is often omitted, while an altered fifth should normally remain because it defines the chord's sound. The root may be omitted by a pianist or guitarist when a bass instrument supplies it. In dominant eleventh and thirteenth chords, the natural eleventh is often omitted because it forms a minor ninth with the major third. The ninth may be included or omitted according to voicing, style, and available instruments. \u{1F447} <b>Which chord member is often the first omitted from a large unaltered dominant voicing?</b>",
      try:{ type:"mc", choices:["The perfect fifth","The named extension","The third in every context"], answer:0,
        success:"✓ Correct. An unaltered perfect fifth is often omitted because the root and other instruments may already imply it. Altered fifths should be retained when they define the chord.",
        fail:"Identify the chord member that contributes the least new information when it is an unaltered perfect fifth.",
        hint:"The perfect fifth is often optional in extended voicings." } },
    { say:"<b>Why Extensions Conventionally Stop at 13:</b> Continuing the diatonic stack of thirds above the thirteenth produces the fifteenth, which duplicates the root two octaves higher. The next thirds similarly duplicate the third, fifth, and seventh. For this reason, 9, 11, and 13 are the conventional chord-extension numbers. <b>Remember: 9 = +2 · 11 = +4 · 13 = +6, all over a dominant 7th by default.</b> \u{1F447} <b>Why is 13 the highest conventional extension number?</b>",
      try:{ type:"mc", choices:["The next stacked third produces the fifteenth, which duplicates the root","Performers cannot count above 13","The number 13 has a special rhythmic meaning"], answer:0,
        success:"✓ Correct. A complete thirteenth stack contains all seven diatonic letter names; the fifteenth repeats the root.",
        fail:"Continue the diatonic stack one third above the thirteenth.",
        hint:"In a C13 stack, A is the thirteenth and the next third is C." } },
    { say:"<b>Review:</b> \u{1F447} <b>Which voicing provides a practical root-present C13 sonority?</b>",
      try:{ type:"mc", choices:["C–E–B♭–A: root, third, seventh, and thirteenth","All seven theoretical chord members in every performance","C and G only"], answer:0,
        success:"✓ Correct. C–E–B♭–A includes the root, the two guide tones, and the named extension. Other valid voicings may include the ninth, omit the root when a bassist supplies it, or redistribute the notes among registers.",
        fail:"Identify the root, guide tones, and named extension.",
        hint:"For this root-present dominant voicing, use C, E, B♭, and A." } }
  ],
  examples:[
    { caption:"G9 and G13 voiced practically: root and 7th below, extensions above — the 5th politely absent.",
      staff:{clef:"treble",tempo:66,notes:[
        {p:"G3",d:"h",label:"G9"},{p:"B3",d:"h",chord:true},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"G3",d:"w",label:"G13"},{p:"B3",d:"w",chord:true},{p:"F4",d:"w",chord:true},{p:"E5",d:"w",chord:true},{bar:"final"}],width:440},
      kb:{start:43,octaves:3,labels:true} },
    { caption:"The extended ii-V-I: Dm9 → G13 → Cmaj9 — Lesson 95's engine wearing its evening clothes.",
      staff:{clef:"treble",tempo:69,notes:[
        {p:"D4",d:"h",label:"Dm9"},{p:"F4",d:"h",chord:true},{p:"C5",d:"h",chord:true},{p:"E5",d:"h",chord:true},
        {p:"G3",d:"h",label:"G13"},{p:"B3",d:"h",chord:true},{p:"F4",d:"h",chord:true},{p:"E5",d:"h",chord:true},
        {p:"C4",d:"w",label:"Cmaj9"},{p:"E4",d:"w",chord:true},{p:"B4",d:"w",chord:true},{p:"D5",d:"w",chord:true},{bar:"final"}],width:560},
      kb:{start:43,octaves:3,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Extended-Chord Identification (45s)",
      intro:"Identify chord extensions, symbols, and practical voicings.",
      miaIntro:"Identify the 9th, 11th, and 13th.",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["9th chord","7th chord + a 3rd"],
        ["The 9th","a compound 2nd"],
        ["The 11th","a compound 4th"],
        ["The 13th","a compound 6th"],
        ["Bare number (C9)","dominant family"],
        ["First note omitted","the 5th"],
        ["Why stop at 13","the 15th repeats the root"],
        ["C9 spelled","C-E-G-B\u{266D}-D"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?"Extended chords identified!":null },
    { type:"key-climb", title:"Game 2 · Build a G13 Voicing",
      intro:"First build the complete theoretical stack G–B–D–F–A–C–E. Then play a practical G13 voicing such as G–B–F–E, or B–F–A–E when a bass instrument supplies G.",
      miaIntro:"Retain the guide tones and the thirteenth.",
      spec:{seq:[55,59,65,76],
        names:["G (root)","B (3rd)","F (7th)","E (13th)"],
        start:55, octaves:2, title:"A practical G13"},
      result:(score)=>score!==null?"You compared the complete stack with a practical voicing.":null },
    { type:"symbol-hunt", title:"Game 3 · Identify the Extension",
      intro:"Examine each chord symbol and voicing, then identify the named extension.",
      miaIntro:"Find the extension by its relationship to the root, not simply by the highest sounding pitch.",
      spec:{rounds:6, pool:[
        {label:"C9 (C-E-B♭-D)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true},{p:"D5",d:"w",chord:true}],width:150}},
        {label:"C13 (C-E-B♭-A)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true},{p:"A5",d:"w",chord:true}],width:150}},
        {label:"Cmaj9 (C-E-B-D)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"B4",d:"w",chord:true},{p:"D5",d:"w",chord:true}],width:150}},
        {label:"Plain C7", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"You identified the extensions correctly.":null },
    { type:"term-race", title:"Game 4 · Reduce and Construct",
      intro:"Reduce compound intervals and construct their corresponding chord extensions.",
      miaIntro:"9 → 2, 11 → 4, 13 → 6.",
      spec:{rounds:8, reverse:true, pool:[
        ["9 − 7","2"],["11 − 7","4"],["13 − 7","6"],
        ["C9's added note","D"],["C11's added note","F"],["C13's added note","A"],
        ["Cmaj9's 7th","B natural"],["Cm9's triad","C minor"]]},
      result:(score)=>score>=6?"You reduced and constructed the extensions correctly.":null }
  ],
  practiceIntro:"Complete 20 practice questions on theoretical stacks, chord symbols, extensions, and practical voicings.",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["9th","compound 2nd"],["11th","compound 4th"],["13th","compound 6th"],["Bare 9/13","dominant family"],["Omit first","the 5th"]], reverse:true}, count:6 },
    { gen:"interval-quality", params:{ask:"quality"}, count:2 },
    { type:"mc", q:"A complete ninth chord is a seventh chord plus…", choices:["another third above","a rest","a new root"], answer:0, explain:"A complete ninth chord adds another third above a seventh chord." },
    { type:"mc", q:"C9 is theoretically spelled…", choices:["C–E–G–B♭–D","C–E–G–B♮–D","C–D–E–F–G"], answer:0, explain:"C9 is theoretically spelled C–E–G–B♭–D." },
    { type:"mc", q:"The thirteenth above C is…", choices:["A","F","E"], answer:0, explain:"A is the thirteenth above C and the simple sixth above C." },
    { type:"mc", q:"Cmaj9 and C9 differ in the quality of their…", choices:["seventh (B♮ vs B♭)","root","ninth"], answer:0, explain:"Cmaj9 and C9 differ in the quality of their seventh: B♮ versus B♭." },
    { type:"truefalse", q:"An unaltered perfect fifth is often omitted from a dense extended-chord voicing.", answer:true, explain:"An altered fifth should remain when it defines the chord quality." },
    { type:"truefalse", q:"A fifteenth introduces a new diatonic letter name beyond the complete thirteenth stack.", answer:false, explain:"The fifteenth duplicates the root two octaves higher." },
    { type:"truefalse", q:"A bare symbol such as C13 normally implies a dominant-seventh-quality foundation.", answer:true, explain:"Bare numbers indicate the dominant family." },
    { gen:"term-match", params:{subject:"term", pool:[["G13's 13th","E"],["Essentials","root, 3rd, 7th + extension"],["11th clash","with the major 3rd"],["Full G13","all seven scale notes"]], reverse:true}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 }
  ],
  vocabulary:[
    {term:"Extended Chord", def:"A chord stacked past the 7th: 9th, 11th, 13th — compound intervals above the root."},
    {term:"Default Quality", def:"Bare numbers ride a dominant 7th (C9 = C7+9); maj9/m9 must say so."},
    {term:"Practical Voicing", def:"A practical starting point: keep the 3rd, 7th, and named extension, omit an unaltered 5th, and let chord type and instrumentation guide other choices."},
    {term:"The 13 Ceiling", def:"A 3rd above the 13th is the 15th — the root again. Seven notes is the whole ladder."}
  ],
  mistakes:[],
  summary:[
    "✔ Stack 3rds past the 7th: <b>9 → 11 → 13</b>.",
    "✔ Numbers = <b>compound intervals</b> (L83): 9=2+oct, 11=4+oct, 13=6+oct.",
    "✔ Bare numbers = <b>dominant family</b>; maj/m must be written.",
    "✔ Voice the essentials in context: <b>3rd, 7th + the extension</b> (an unaltered 5th usually leaves first).",
    "✔ 13 is the ceiling — the 15th repeats the root."
  ],
  tips:[
    "Two-hand recipe: left hand root+7th, right hand 3rd+extension — instant jazz.",
    "The 9th is the friendliest extension — try Cmaj9 wherever Cmaj7 lived.",
    "Dominant 11ths usually drop the 3rd (or become sus chords) to avoid the clash.",
    "Next lesson: chords that replace or add without stacking — sus and add revisited."
  ],
  rewards:{ badge:"Skyline Stacker", icon:"\u{1F5FC}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz: Construct the theoretical stack, interpret the chord symbol, and select a practical voicing.",
  quiz:[
    { type:"mc", q:"Extended tertian chords continue stacking thirds beyond the…", choices:["Seventh","Root","Third only"], answer:0, explain:"Into 9-11-13 land.", hint:"Beyond L92." },
    { type:"mc", q:"The 9th is a compound…", choices:["2nd","3rd","5th"], answer:0, explain:"9−7=2.", hint:"Subtract 7." },
    { type:"mc", q:"The 11th is a compound…", choices:["4th","6th","2nd"], answer:0, explain:"11−7=4.", hint:"Subtract 7." },
    { type:"mc", q:"The 13th is a compound…", choices:["6th","4th","7th"], answer:0, explain:"13−7=6.", hint:"Subtract 7." },
    { type:"mc", q:"Which pitches form the complete theoretical C9 chord?", choices:["C–E–G–B♭–D","C–E–G–B♮–D","C–E–A–D"], answer:0, explain:"C7 + D.", hint:"Dominant default." },
    { type:"mc", q:"Which symbol represents a major-seventh-based ninth chord on C?", choices:["Cmaj9","C9","Cm9"], answer:0, explain:"Say maj.", hint:"L93's rule." },
    { type:"mc", q:"Which chord member is often omitted from a dense extended dominant voicing when it is unaltered?", choices:["Perfect fifth","Altered fifth","Named extension"], answer:0, explain:"An unaltered perfect fifth is the usual omission; an altered fifth should remain.", hint:"An unaltered fifth is often optional." },
    { type:"mc", q:"Identify the chord.", staff:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true},{p:"D5",d:"w",chord:true}],width:160},
      choices:["C9 with the perfect fifth omitted","Cmaj7","C13"], answer:0, explain:"C, E, B♭, and D provide the root, third, minor seventh, and ninth.", hint:"The ninth need not be the highest note." },
    { type:"truefalse", q:"A complete theoretical thirteenth chord contains seven different diatonic chord members.", answer:true, explain:"Actual performance voicings normally omit one or more members.", hint:"Count them." },
    { type:"truefalse", q:"In conventional tertian chord-symbol notation, the fifteenth introduces a new pitch class beyond the thirteenth.", answer:false, explain:"The fifteenth duplicates the root. Wider voicings and other harmonic structures may still extend above that register.", hint:"The ceiling." },
    { type:"mc", q:"In C major, Dm9–G13–Cmaj9 elaborates which progression?", choices:["ii–V–I","Twelve-bar blues","Plagal cadence"], answer:0, explain:"L95's engine, dressed up.", hint:"Count degrees." },
    { type:"mc", q:"Which statement best describes practical extended-chord voicing?", choices:["Prioritize chord-defining tones and the named extension; omissions depend on chord type, instrumentation, and context","Every extended chord must contain all seven theoretical members","Every extended chord should contain only the root and fifth"], answer:0, explain:"Thirds, sevenths, alterations, and named extensions often define the chord, while roots and perfect fifths may be supplied or omitted according to context.", hint:"Chord-defining tones plus the named extension." }
  ],
  miaPerfect:"Perfect score! You accurately constructed and interpreted ninth, eleventh, and thirteenth chords.",
  miaPass:"You passed! Next, you will compare suspended and added-tone chords.",
  mia:{
    hook:{ label:"the welcome",
      explain:"The stack grew past the octave — 9th, 11th, then 13th: extended chords.",
      play:()=>{[[55,59,62,65],[55,59,62,65,69],[55,59,65,69,76]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.9,.24)));} },
    learn:{ label:"extended chords",
      explain:"Stack 3rds past the 7th: 9/11/13 (compound 2/4/6). Bare numbers = dominant family. Voice the essentials in context; omit an unaltered 5th; 13 is the ceiling.",
      hint:"Minus 7 names the color.",
      play:()=>{[55,59,65,69,76].forEach(m=>MFAudio.tone(m,.9,.05,.24));} },
    example:{ label:"the examples",
      explain:"Example 1 voices G9 and G13 practically; example 2 dresses ii-V-I in extensions." },
    game:{ label:"the games",
      explain:"Sprint the stacks, climb a G13, name extensions on cards, then reduce compounds at speed.",
      hint:"Root-3rd-7th + color." },
    quiz:{ label:"this question",
      explain:"Subtract 7 to name the extension; check the 7th for family (B♭ = dominant, B = maj); essentials carry the sound.",
      play:()=>{[55,59,65,69].forEach(m=>MFAudio.tone(m,.9,.05,.26));} }
  }
};
