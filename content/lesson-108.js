/* Lesson 108 — Extended Chords (Book 4, Unit 27 — SELF-AUTHORED)
   Core: stack 3rds past the 7th → 9th, 11th, 13th chords. Numbers from
   L83's compound intervals. Voicings omit notes (5th first); the 13th is
   the practical ceiling. NOTE: edit by FULL-FILE REWRITE only. */

LESSON_CONTENT[108]={
  welcome:"Extended chords: stacking past the seventh. \u{1F5FC}",
  hook:{
    say:"<b>A seventh chord keeps growing</b> — one 3rd at a time. \u{1F447} <b>Listen: how far does the stack climb?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center"><button class="play hk-a">▶ 7th → 9th → 13th</button></div>
          <div class="choices hk-ch" style="display:none"><button>Past the octave — 9th, 11th, 13th territory</button><button>It stays inside one octave</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ [[55,59,62,65],[55,59,62,65,69],[55,59,65,69,72,76]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.9,i*1.0,.24))); setTimeout(()=>ch.style.display="",3400); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ The stack climbed past the octave: 9th, then 13th — EXTENDED CHORDS, jazz harmony's skyline. Today's lesson!");
          else fb(false,"The top notes rose beyond the octave — compound-interval territory (L83)…");
        });
      } }
  },
  objectives:[
    "Build extensions: keep stacking 3rds past the 7th",
    "Name them by compound intervals: 9th, 11th, 13th (L83)",
    "Spell C9, C11, C13 (dominant family by default)",
    "Know the practical voicing rule: omit the 5th (and often the 11th)",
    "Why 13 is the ceiling: the 15th would repeat the root",
    "Hear the added color of each extension"
  ],
  steps:[
    { say:"<b>Keep Stacking:</b> a 7th chord + another 3rd = a <b>9th chord</b>; again = an <b>11th</b>; again = a <b>13th</b>. G13 contains G-B-D-F-A-C-E — every scale note, stacked. \u{1F447} <b>A 9th chord contains how many different notes?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Chord</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Stack (on C)</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#2F6DA8">C9</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px">C-E-G-B\u{266D}-D</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#A9821F">C11</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px">…+ F</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#C05A21">C13</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px">…+ A</td></tr></table>` },
      try:{ type:"mc", choices:["Five","Three","Nine"], answer:0,
        success:"✓ Root, 3rd, 5th, 7th, 9th — five notes.",
        fail:"Count C-E-G-B♭-D…",
        hint:"7th chord + one." } },
    { say:"<b>The Numbers Come from L83:</b> the 9th = a compound 2nd, the 11th = a compound 4th, the 13th = a compound 6th — always counted <b>above the root</b>, past the octave. \u{1F447} <b>The 13th reduces to a simple…</b>",
      try:{ type:"mc", choices:["6th (13 − 7)","3rd","5th"], answer:0,
        success:"✓ Subtract 7 — L83's rule powers all chord numbers.",
        fail:"13 − 7 = …",
        hint:"Six." } },
    { say:"<b>Default Quality:</b> like plain \u{201C}7\u{201D}, a bare number means the <b>dominant family</b>: C9 = C7 + D · C13 = C7 + A. Major/minor versions must say so: Cmaj9, Cm9. \u{1F447} <b>C9 contains which 7th?</b>",
      try:{ type:"mc", choices:["B♭ — the dominant 7th","B — major 7th","No 7th"], answer:0,
        success:"✓ Extensions stack ON TOP of the dominant 7th by default.",
        fail:"C9 = C7 + 9…",
        hint:"L93's plain-7 rule." } },
    { say:"<b>Voicing Reality:</b> six or seven notes exceed two hands — players <b>omit the 5th</b> first (it adds least), and usually the 11th in dominant chords (it clashes with the 3rd). Root, 3rd, 7th + the extension = the essentials. \u{1F447} <b>Which note leaves a 13th chord first?</b>",
      try:{ type:"mc", choices:["The 5th","The root","The 13th itself"], answer:0,
        success:"✓ The 5th is filler (L50 said so about V7 — still true up here).",
        fail:"Which note did L50 call omittable?",
        hint:"The same one." } },
    { say:"<b>The Ceiling:</b> after the 13th, the next 3rd is the <b>15th — the root again</b>. So 13 is the top floor: beyond it the stack repeats itself. <b>Remember: 9 = +2 · 11 = +4 · 13 = +6, all over a dominant 7th by default.</b> \u{1F447} <b>Why do extensions stop at 13?</b>",
      try:{ type:"mc", choices:["The 15th would duplicate the root","Players get tired","13 is unlucky"], answer:0,
        success:"✓ Seven different notes exhausted — the octave closes the loop.",
        fail:"What note sits a 3rd above the 13th?",
        hint:"Home again." } },
    { say:"<b>Review:</b> \u{1F447} <b>C13's essential voicing keeps…</b>",
      try:{ type:"mc", choices:["C, E, B♭ and A (root, 3rd, 7th, 13th)","All seven notes always","Only C and G"], answer:0,
        success:"✓ The essential four: root (bass), 3rd (quality), 7th (tension), extension (color).",
        fail:"Essentials = root, 3rd, 7th + extension…",
        hint:"Four notes." } }
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
    { type:"gen-race", title:"Game 1 · Extension Sprint (45s)",
      intro:"Stacks, numbers and voicings — race them!",
      miaIntro:"Past the 7th! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["9th chord","7th chord + a 3rd"],
        ["The 9th","a compound 2nd"],
        ["The 11th","a compound 4th"],
        ["The 13th","a compound 6th"],
        ["Bare number (C9)","dominant family"],
        ["First note omitted","the 5th"],
        ["Why stop at 13","the 15th repeats the root"],
        ["C9 spelled","C-E-G-B\u{266D}-D"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — skyline built!":null },
    { type:"key-climb", title:"Game 2 · Climb to the 13th",
      intro:"Stack G13 by hand: G, B, F, A, E!",
      miaIntro:"Essentials only! \u{1FA9C}",
      spec:{seq:[55,59,65,69,76],
        names:["G (root)","B (3rd)","F (7th)","A (9th)","E (13th!)"],
        start:55, octaves:2, title:"A practical G13"},
      result:(score)=>score!==null?"The skyline, climbed!":null },
    { type:"symbol-hunt", title:"Game 3 · Name the Extension",
      intro:"Chords on cards — click what each round names!",
      miaIntro:"Find the top color! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"C9 (C-E-B♭-D)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true},{p:"D5",d:"w",chord:true}],width:150}},
        {label:"C13 (C-E-B♭-A)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true},{p:"A5",d:"w",chord:true}],width:150}},
        {label:"Cmaj9 (C-E-B-D)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"B4",d:"w",chord:true},{p:"D5",d:"w",chord:true}],width:150}},
        {label:"Plain C7", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Extensions spotted!":null },
    { type:"term-race", title:"Game 4 · Reduce & Stack Race",
      intro:"Compound numbers and stacks — at speed!",
      miaIntro:"Minus seven! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["9 − 7","2"],["11 − 7","4"],["13 − 7","6"],
        ["C9's added note","D"],["C11's added note","F"],["C13's added note","A"],
        ["Cmaj9's 7th","B natural"],["Cm9's triad","C minor"]]},
      result:(score)=>score>=6?"Stacked and reduced!":null }
  ],
  practiceIntro:"20 practice questions — stacks, numbers and voicings. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["9th","compound 2nd"],["11th","compound 4th"],["13th","compound 6th"],["Bare 9/13","dominant family"],["Omit first","the 5th"]], reverse:true}, count:6 },
    { gen:"interval-quality", params:{ask:"quality"}, count:2 },
    { type:"mc", q:"A 9th chord is a 7th chord plus…", choices:["another 3rd on top","a rest","a new root"], answer:0, explain:"The stack grows." },
    { type:"mc", q:"C9's five notes are…", choices:["C-E-G-B♭-D","C-E-G-B-D","C-D-E-F-G"], answer:0, explain:"Dominant 7th + 9." },
    { type:"mc", q:"The 13th above C is…", choices:["A","F","E"], answer:0, explain:"Compound 6th." },
    { type:"mc", q:"Cmaj9 differs from C9 in its…", choices:["7th (B vs B♭)","root","9th"], answer:0, explain:"maj = major 7th under the 9." },
    { type:"truefalse", q:"The 5th is usually the first note omitted in big voicings.", answer:true, explain:"Least flavor per finger." },
    { type:"truefalse", q:"A 15th chord adds a new note.", answer:false, explain:"The 15th IS the root again." },
    { type:"truefalse", q:"C13 contains a dominant 7th by default.", answer:true, explain:"Bare numbers = dominant family." },
    { gen:"term-match", params:{subject:"term", pool:[["G13's 13th","E"],["Essentials","root, 3rd, 7th + extension"],["11th clash","with the major 3rd"],["Full G13","all seven scale notes"]], reverse:true}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 }
  ],
  vocabulary:[
    {term:"Extended Chord", def:"A chord stacked past the 7th: 9th, 11th, 13th — compound intervals above the root."},
    {term:"Default Quality", def:"Bare numbers ride a dominant 7th (C9 = C7+9); maj9/m9 must say so."},
    {term:"Practical Voicing", def:"Omit the 5th first (and often the 11th); keep root, 3rd, 7th + the extension."},
    {term:"The 13 Ceiling", def:"A 3rd above the 13th is the 15th — the root again. Seven notes is the whole ladder."}
  ],
  mistakes:[],
  summary:[
    "✔ Stack 3rds past the 7th: <b>9 → 11 → 13</b>.",
    "✔ Numbers = <b>compound intervals</b> (L83): 9=2+oct, 11=4+oct, 13=6+oct.",
    "✔ Bare numbers = <b>dominant family</b>; maj/m must be written.",
    "✔ Voice the essentials: <b>root, 3rd, 7th + extension</b> (5th leaves first).",
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
  miaQuizIntro:"Quiz! Stack, number, omit, stop at 13.",
  quiz:[
    { type:"mc", q:"An extended chord stacks 3rds past the…", choices:["7th","root","octave only"], answer:0, explain:"Into 9-11-13 land.", hint:"Beyond L92." },
    { type:"mc", q:"The 9th is a compound…", choices:["2nd","3rd","5th"], answer:0, explain:"9−7=2.", hint:"Subtract 7." },
    { type:"mc", q:"The 11th is a compound…", choices:["4th","6th","2nd"], answer:0, explain:"11−7=4.", hint:"Subtract 7." },
    { type:"mc", q:"The 13th is a compound…", choices:["6th","4th","7th"], answer:0, explain:"13−7=6.", hint:"Subtract 7." },
    { type:"mc", q:"C9 contains…", choices:["C-E-G-B♭-D","C-E-G-B-D","C-E-A-D"], answer:0, explain:"C7 + D.", hint:"Dominant default." },
    { type:"mc", q:"To write a MAJOR-7th-based 9th chord:", choices:["Cmaj9","C9","Cm9"], answer:0, explain:"Say maj.", hint:"L93's rule." },
    { type:"mc", q:"Which note leaves a big voicing first?", choices:["The 5th","The 3rd","The 7th"], answer:0, explain:"Least color.", hint:"L50's omittable note." },
    { type:"mc", q:"Identify.", staff:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true},{p:"D5",d:"w",chord:true}],width:160},
      choices:["C9 (5th omitted)","Cmaj7","C13"], answer:0, explain:"C7 essentials + the 9.", hint:"Top note D." },
    { type:"truefalse", q:"A full 13th chord contains all seven scale notes.", answer:true, explain:"The complete stack.", hint:"Count them." },
    { type:"truefalse", q:"Extensions can continue meaningfully past the 13th.", answer:false, explain:"The 15th = the root.", hint:"The ceiling." },
    { type:"mc", q:"Dm9 → G13 → Cmaj9 is an extended…", choices:["ii-V-I","12-bar blues","plagal cadence"], answer:0, explain:"L95's engine, dressed up.", hint:"Count degrees." },
    { type:"mc", q:"The essential tones of any extended chord:", choices:["root, 3rd, 7th + the extension","root and 5th","all notes always"], answer:0, explain:"The essential four.", hint:"Four notes." }
  ],
  miaPerfect:"PERFECT! The whole skyline, floor by floor. \u{1F5FC}\u{1F389}",
  miaPass:"Passed! Ninths and thirteenths at your service. Next: sus and add, revisited…",
  mia:{
    hook:{ label:"the welcome",
      explain:"The stack grew past the octave — 9th, then 13th: extended chords.",
      play:()=>{[[55,59,62,65],[55,59,62,65,69],[55,59,65,69,76]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.8,i*.9,.24)));} },
    learn:{ label:"extended chords",
      explain:"Stack 3rds past the 7th: 9/11/13 (compound 2/4/6). Bare numbers = dominant family. Voice essentials; omit the 5th; 13 is the ceiling.",
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
