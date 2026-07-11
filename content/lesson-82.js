/* Lesson 82 — Whole-Tone & Chromatic Scales (Book 4, Unit 20 — SELF-AUTHORED)
   Core: WHOLE-TONE = six pitch classes, all whole steps, two distinct
   collections; CHROMATIC = all twelve half steps; both have EQUAL-INTERVAL
   symmetry — one repeating interval, so only a weak internal tonic
   hierarchy. NOTE: edit by FULL-FILE REWRITE only. */

/* ear lab: major vs whole tone vs chromatic */
function MF_L82_ear(container,fb){
  const SC={maj:[60,62,64,65,67,69,71,72], wt:[60,62,64,66,68,70,72], chr:[60,61,62,63,64,65,66,67]};
  const ROUNDS=[
    {play:"wt", ans:1, expl:"All whole steps — the WHOLE-TONE scale."},
    {play:"chr", ans:2, expl:"Every half step in a row — the CHROMATIC scale."},
    {play:"maj", ans:0, expl:"Whole and half steps mixed, with a clear pull home — a MAJOR scale."},
    {play:"wt", ans:1, expl:"Six evenly spaced notes — the whole-tone scale again."}];
  let r=0, played=false;
  container.innerHTML=`<div class="big-q l82e-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l82e-play">▶ Play the scale</button></div>
    <div class="choices l82e-ch" style="display:none"><button>Major — a mixture of whole and half steps</button><button>Whole-tone — all whole steps</button><button>Chromatic — all half steps</button></div>`;
  const q=container.querySelector(".l82e-q"), pl=container.querySelector(".l82e-play"), ch=container.querySelector(".l82e-ch");
  pl.onclick=()=>{
    const R=ROUNDS[r]; if(!R) return;
    SC[R.play].forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.4));
    played=true; setTimeout(()=>ch.style.display="",SC[R.play].length*300+300);
  };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    const R=ROUNDS[r]; if(!R||!played) return;
    if(i===R.ans){ fb(true,"✓ "+R.expl); r++; played=false; ch.style.display="none";
      if(r>=ROUNDS.length){ q.textContent="Excellent! Three scale colors, all identified."; pl.style.display="none"; } else q.innerHTML=`Round ${r+1} of ${ROUNDS.length}: listen, then decide.`;
    } else { MFAudio.tone(40,.2); fb(false,"Listen to the interval sizes: all whole steps (whole-tone), all half steps (chromatic), or a mixture of whole and half steps (major)?"); }
  });
  q.innerHTML="Round 1 of 4: listen, then decide.";
}

LESSON_CONTENT[82]={
  welcome:"Whole-tone and chromatic scales are built from equal intervals.",
  hook:{
    say:"Listen to the scale. \u{1F447} <b>What is unusual about the interval between each pair of adjacent notes?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the scale</button></div>
          <div class="choices hk-ch" style="display:none"><button>Every step is the same size — a whole step</button><button>The steps gradually become faster</button><button>It follows the major-scale pattern</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ [60,62,64,66,68,70,72].forEach((m,i)=>MFAudio.tone(m,.4,i*.34,.42)); setTimeout(()=>ch.style.display="",7*340+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Correct. The whole-tone scale contains six different pitch classes, with a whole step between each adjacent pair. Its equal-interval pattern does not produce the half-step relationships found in major and minor scales.");
          else fb(false,"The tempo remains steady. Listen again to the pitch distance between each pair of adjacent notes.");
        });
      } }
  },
  objectives:[
    "Build the whole-tone scale: six pitch classes, all whole steps",
    "Know there are two distinct whole-tone pitch collections",
    "Review the chromatic scale: all twelve half steps",
    "Define equal-interval symmetry: one repeating interval, weak internal tonic hierarchy",
    "Hear major vs whole-tone vs chromatic",
    "Explore musical applications of whole-tone and chromatic scales"
  ],
  steps:[
    { say:"<b>The Whole-Tone Scale:</b> A whole-tone scale contains six different pitch classes within an octave. Every adjacent pitch is separated by a whole step. One whole-tone collection is C–D–E–F♯–G♯–A♯, followed by the return to C at the octave. \u{1F447} <b>How many different pitch classes does a whole-tone scale contain?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:110,notes:[
        {p:"C4",d:"q",label:"W"},{p:"D4",d:"q",label:"W"},{p:"E4",d:"q",label:"W"},
        {p:"F#4",d:"q",label:"W"},{p:"G#4",d:"q",label:"W"},{p:"A#4",d:"q",label:"W"},{p:"C5",d:"q"},{bar:"final"}],width:520} },
      try:{ type:"mc", choices:["Six","Seven","Twelve"], answer:0,
        success:"✓ Correct. Six whole steps fill an octave: 6 × 2 half steps = 12 half steps.",
        fail:"Count the different pitches before the opening pitch class returns at the octave.",
        hint:"Divide the octave's 12 half steps by 2." } },
    { say:"<b>Two Distinct Collections:</b> In twelve-tone equal temperament, there are two distinct whole-tone pitch collections. One contains C, D, E, F♯, G♯, and A♯; the other contains C♯, D♯, F, G, A, and B. Beginning on another member of either collection produces the same pitch collection in a different order. \u{1F447} <b>How many distinct whole-tone pitch collections are available in twelve-tone equal temperament?</b>",
      try:{ type:"mc", choices:["Two","Twelve","Seven"], answer:0,
        success:"✓ Correct. Any whole-tone scale uses one of two distinct pitch collections. Beginning on another note reorders one of these collections.",
        fail:"A whole-tone scale beginning on D uses the same pitch classes as the collection beginning on C.",
        hint:"Think of the C collection and the C♯ collection." } },
    { say:"<b>The Chromatic Scale — Review:</b> The chromatic scale contains all twelve pitch classes within the octave and moves entirely by half steps. On the piano, it uses every key within the octave. Its enharmonic spelling depends on melodic direction, tonal context, and notational clarity. \u{1F447} <b>What is the interval pattern of the chromatic scale?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:140,notes:[
        {p:"C4",d:"8"},{p:"C#4",d:"8"},{p:"D4",d:"8"},{p:"D#4",d:"8"},{p:"E4",d:"8"},{p:"F4",d:"8"},
        {p:"F#4",d:"8"},{p:"G4",d:"8"},{p:"G#4",d:"8"},{p:"A4",d:"8"},{p:"A#4",d:"8"},{p:"B4",d:"8"},{p:"C5",d:"8"},{bar:"final"}],width:620} },
      try:{ type:"mc", choices:["A continuous series of half steps","A continuous series of whole steps","A repeating whole–whole–half pattern"], answer:0,
        success:"✓ Correct. The chromatic scale moves by half step and includes all twelve pitch classes.",
        fail:"On the piano, each adjacent key is included.",
        hint:"It uses the smallest interval in the twelve-tone system." } },
    { say:"<b>Equal-Interval Symmetry:</b> Both scales repeat a single interval throughout the octave. The whole-tone scale repeats six whole steps, while the chromatic scale repeats twelve half steps. Because their internal step patterns treat every pitch position alike, the scales themselves do not establish the strong tonic hierarchy found in major and minor scales. Musical context, however, can still create a tonal center. \u{1F447} <b>Why does an equal-interval scale create less tonic hierarchy than a major scale?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Scale</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Pattern</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Notes</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Tonic hierarchy</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#2F6DA8">Major</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">W W H W W W H</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">7</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">strong</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#C05A21">Whole-tone</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">W W W W W W</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">6</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">weak</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#C05A21">Chromatic</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">H ×12</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">12</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">weak</td></tr></table>` },
      try:{ type:"mc", choices:["Its repeated interval pattern gives each pitch a similar structural position","Its notes must be played quietly","It contains too few pitches"], answer:0,
        success:"✓ Correct. Major scales contain an unequal arrangement of whole and half steps that distinguishes individual scale degrees. Equal-interval scales lack those internal distinctions.",
        fail:"Compare the repeated interval with the unequal whole- and half-step arrangement of a major scale.",
        hint:"In an equal-interval pattern, every starting point produces the same sequence of intervals." } },
    { say:"Listen and identify the major, whole-tone, or chromatic scale. \u{1F447}",
      try:{ type:"custom",
        hint:"Whole-tone scales use only whole steps; chromatic scales use only half steps; major scales use a specific mixture of whole and half steps.",
        mount:(container,fb)=>MF_L82_ear(container,fb) } },
    { say:"<b>Musical Applications:</b> Composers use whole-tone collections when they want to weaken traditional major–minor relationships or create an ambiguous harmonic color. Chromatic scales may connect pitches, decorate a melody, intensify motion, or create tension. The effect of either scale depends on tempo, harmony, register, articulation, instrumentation, and context. \u{1F447} <b>Which scale is built entirely from whole steps and therefore avoids the half-step relationships of major and minor scales?</b>",
      try:{ type:"mc", choices:["The whole-tone scale","The chromatic scale","The major scale"], answer:0,
        success:"✓ Correct. The whole-tone scale repeats one whole step throughout the octave.",
        fail:"The chromatic scale moves by half steps, and the major scale mixes whole and half steps…",
        hint:"Identify the equal-interval scale with six pitch classes." } },
    { say:"<b>Review:</b> \u{1F447} <b>Which scale contains all twelve pitch classes?</b>",
      try:{ type:"mc", choices:["The chromatic scale","The whole-tone scale","A pentatonic scale"], answer:0,
        success:"✓ Correct. The chromatic scale contains all twelve pitch classes. A whole-tone scale contains six, and a pentatonic scale contains five.",
        fail:"Count the different pitch classes before the octave repeats.",
        hint:"This scale includes every pitch class in the twelve-tone system." } }
  ],
  examples:[
    { caption:"A whole-tone phrase: six equal steps up, then back down — no single pitch receives strong structural emphasis.",
      staff:{clef:"treble",tempo:100,notes:[
        {p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q"},
        {p:"G#4",d:"q"},{p:"A#4",d:"q"},{p:"C5",d:"h"},{bar:"single"},
        {p:"A#4",d:"q"},{p:"F#4",d:"q"},{p:"D4",d:"q"},{p:"C4",d:"h"},{bar:"final"}],width:620},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"A chromatic climb: consecutive half steps rising to a release, spelled here with sharps — every key on the way.",
      staff:{clef:"treble",tempo:120,notes:[
        {p:"G4",d:"8"},{p:"G#4",d:"8"},{p:"A4",d:"8"},{p:"A#4",d:"8"},
        {p:"B4",d:"8"},{p:"C5",d:"8"},{p:"C#5",d:"8"},{p:"D5",d:"8"},
        {p:"E5",d:"h",label:"release!"},{bar:"final"}],
        beams:[[0,3],[4,7]],width:560},
      kb:{start:55,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Equal-Interval Sprint (45s)",
      intro:"Identify interval patterns and pitch-class counts before time runs out.",
      miaIntro:"Compare the repeated whole-step and half-step patterns.",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Whole-tone scale","six pitch classes, all whole steps"],
        ["Chromatic scale","all twelve half steps"],
        ["Equal-interval scale","one repeating interval"],
        ["Whole-tone pitch collections","two"],
        ["Tonic hierarchy in equal-interval scales","weak"],
        ["Interval between adjacent whole-tone notes","whole step"],
        ["Interval between adjacent chromatic notes","half step"],
        ["Major scale (for contrast)","unequal whole- and half-step pattern"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — Equal-interval patterns identified!":null },
    { type:"key-climb", title:"Game 2 · Climb the Whole-Tone Scale",
      intro:"Play the C whole-tone scale ascending through six whole steps to the octave.",
      miaIntro:"Maintain one whole step between each pair of adjacent notes.",
      spec:{seq:[60,62,64,66,68,70,72],
        names:["C","D","E","F♯","G♯","A♯","C (octave)"],
        start:60, octaves:1, title:"The C whole-tone scale"},
      result:(score)=>score!==null?"You performed all six whole steps correctly.":null },
    { type:"symbol-hunt", title:"Game 3 · Which Scale Is It?",
      intro:"Examine each notated scale and select its correct name.",
      miaIntro:"Examine the interval between each pair of adjacent notes.",
      spec:{rounds:6, pool:[
        {label:"Whole-tone (6 notes)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q"},{p:"G#4",d:"q"},{p:"A#4",d:"q"}],width:210}},
        {label:"Chromatic (half steps)", spec:{clef:"treble",notes:[{p:"C4",d:"8"},{p:"C#4",d:"8"},{p:"D4",d:"8"},{p:"D#4",d:"8"},{p:"E4",d:"8"},{p:"F4",d:"8"}],width:210}},
        {label:"Major (W-W-H mix)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"}],width:190}},
        {label:"Pentatonic (gapped)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"}],width:190}}]},
      result:(score)=>score>=5?"You identified the scales correctly.":null },
    { type:"term-race", title:"Game 4 · Count and Compare",
      intro:"Compare the pitch-class counts and interval patterns of the scales studied so far.",
      miaIntro:"Pentatonic 5, whole-tone 6, diatonic 7, chromatic 12.",
      spec:{rounds:8, reverse:true, pool:[
        ["Pentatonic","5 notes"],
        ["Whole-tone","6 notes"],
        ["Major / minor","7 notes"],
        ["Chromatic","12 notes"],
        ["All whole steps","whole-tone"],
        ["All half steps","chromatic"],
        ["No half steps, 5 notes","pentatonic"],
        ["W-W-H-W-W-W-H","major"]]},
      result:(score)=>score>=6?"You compared the scale collections correctly.":null }
  ],
  practiceIntro:"Complete 20 practice questions on whole-tone scales, chromatic scales, and equal-interval patterns. The next question will appear after each correct answer.",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Whole-tone","all whole steps"],["Chromatic","all half steps"],["Equal-interval","one repeating interval"],["Six pitch classes","whole-tone"],["Twelve pitch classes","chromatic"]], reverse:true}, count:6 },
    { gen:"step-type", params:{}, count:2 },
    { type:"mc", q:"How many different pitch classes does a whole-tone scale contain?", choices:["6","7","12"], answer:0,
      explain:"Six whole steps fill the octave." },
    { type:"mc", q:"How many distinct whole-tone pitch collections exist in twelve-tone equal temperament?", choices:["2","12","6"], answer:0,
      explain:"The C collection and the C♯ collection." },
    { type:"mc", q:"The chromatic scale moves entirely by…", choices:["half steps","whole steps","thirds"], answer:0,
      explain:"All twelve keys in a row." },
    { type:"mc", q:"Compared with a major scale, an equal-interval scale provides less internal support for…", choices:["a strong tonic hierarchy","identifiable pitches","a steady rhythm"], answer:0,
      explain:"Repeating the same interval gives each pitch a similar structural position, although musical context can still establish a tonal center." },
    { type:"truefalse", q:"A whole-tone scale contains no half steps between adjacent scale tones.", answer:true,
      explain:"W-W-W-W-W-W." },
    { type:"truefalse", q:"The spelling of a chromatic scale may depend on its direction and tonal or harmonic context.", answer:true,
      explain:"Ascending-sharp and descending-flat spellings are useful introductory conventions, but context determines the most appropriate notation." },
    { type:"truefalse", q:"The major scale repeats one identical interval throughout the octave.", answer:false,
      explain:"The major scale contains an unequal pattern of whole and half steps rather than one continuously repeated interval." },
    { gen:"term-match", params:{subject:"term", pool:[["All whole steps","whole-tone"],["All half steps","chromatic"],["Strong tonic hierarchy","major"],["Two distinct collections","whole-tone"]], reverse:true}, count:3 },
    { gen:"enharmonic", params:{}, count:2 }
  ],
  vocabulary:[
    {term:"Whole-Tone Scale", def:"Six pitch classes per octave, every step a whole step. Two distinct collections exist.",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q"},{p:"G#4",d:"q"},{p:"A#4",d:"q"}],width:170}},
    {term:"Chromatic Scale", def:"All twelve pitch classes, moving by half steps. Its enharmonic spelling depends on direction, tonal context, and notational clarity."},
    {term:"Equal-Interval (Symmetrical) Scale", def:"A scale built from one repeating interval, giving each pitch a similar structural position."},
    {term:"Tonic Hierarchy", def:"The sense of a central home note, supported by uneven step patterns. Equal-interval scales give it little internal support, though musical context can still create a tonal center."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Whole-tone</b>: 6 pitch classes, all whole steps; <b>two</b> distinct collections exist.",
    "✔ <b>Chromatic</b>: all <b>12</b> pitch classes; spelling depends on direction and context.",
    "✔ Both have <b>equal-interval symmetry</b> — one repeating interval, so only a <b>weak internal tonic hierarchy</b>.",
    "✔ Major's uneven pattern distinguishes scale degrees; equal intervals do not — though context can still create a tonal center.",
    "✔ Applications: whole-tone = ambiguous, floating harmonic color; chromatic = connecting pitches and intensifying motion."
  ],
  tips:[
    "Whole-tone at the keyboard: C-D-E, then F♯-G♯-A♯ — three whites, three blacks.",
    "Play any note against a whole-tone scale — resolutions are weak. That is part of its color.",
    "Chromatic passages are about the DESTINATION: hear where the slide finally lands.",
    "Next lesson: flip intervals upside down — inversions and compounds."
  ],
  rewards:{ badge:"Symmetry Explorer", icon:"\u{1F32B}\u{FE0F}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz: Identify equal-interval patterns and compare their pitch collections.",
  quiz:[
    { type:"mc", q:"The whole-tone scale is built entirely from…", choices:["whole steps","half steps","minor thirds"], answer:0,
      explain:"W six times fills the octave.", hint:"The name says it." },
    { type:"mc", q:"How many different pitch classes are in a whole-tone scale?", choices:["6","7","5"], answer:0,
      explain:"12 half steps ÷ 2 = 6 whole steps.", hint:"Divide the octave." },
    { type:"mc", q:"How many distinct whole-tone pitch collections exist in twelve-tone equal temperament?", choices:["Two","Seven","Twelve"], answer:0,
      explain:"The two collections can be represented by scales beginning on C and C♯. Other starting notes reorder one of these collections.", hint:"Very few." },
    { type:"mc", q:"The chromatic scale contains…", choices:["all twelve pitch classes","only the white-key pitch classes","six pitch classes"], answer:0,
      explain:"Every half step in the octave.", hint:"Complete set." },
    { type:"mc", q:"What gives the whole-tone and chromatic scales their equal-interval symmetry?", choices:["Each scale repeats one interval throughout the octave","Loud and soft notes alternate","Each scale contains an odd number of notes"], answer:0,
      explain:"Whole-tone (all whole steps) and chromatic (all half steps).", hint:"The step pattern." },
    { type:"mc", q:"Why do equal-interval scales provide less internal support for a tonic hierarchy than major scales?", choices:["Their repeated interval patterns give each pitch a similar structural position","They must be performed quickly","They do not reach the octave"], answer:0,
      explain:"Major scales contain unequal interval patterns that distinguish scale degrees. Equal-interval scales lack those internal distinctions.", hint:"Compare identical steps with the major scale's unequal step pattern." },
    { type:"mc", q:"Identify the scale.",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q"},{p:"G#4",d:"q"},{p:"A#4",d:"q"},{p:"C5",d:"q"}],width:340},
      choices:["Whole-tone scale","Major scale","Chromatic scale"], answer:0,
      explain:"The scale contains six different pitch classes separated by whole steps, followed by the octave repetition.", hint:"Measure the steps." },
    { type:"truefalse", q:"The direction of a chromatic line is the only factor that determines its enharmonic spelling.", answer:false,
      explain:"Direction may influence spelling, but tonal context, harmony, and voice leading must also be considered.", hint:"Consider tonal context, harmony, and voice leading as well." },
    { type:"truefalse", q:"The whole-tone scale contains a leading tone a half step below its starting pitch.", answer:false,
      explain:"A whole-tone collection contains no pitch a half step below another member, so it does not contain a diatonic leading tone to the starting pitch.", hint:"What makes a leading tone?" },
    { type:"mc", q:"Which scale would best demonstrate a continuous series of equal whole steps?", choices:["The whole-tone scale","The major scale","The minor pentatonic scale"], answer:0,
      explain:"The whole-tone scale repeats a whole step throughout the octave.", hint:"Identify the scale built from one repeated interval." },
    { type:"mc", q:"Which device creates a continuous ascending line by half steps?", choices:["A chromatic ascent","A whole-tone ascent","A major arpeggio"], answer:0,
      explain:"A chromatic ascent moves through consecutive half steps. Whether it creates tension depends on its musical context.", hint:"The smallest interval in the twelve-tone system." },
    { type:"mc", q:"Which sequence orders these scales by number of pitch classes, from fewest to most?", choices:["pentatonic (5) → whole-tone (6) → major (7) → chromatic (12)","major (7) → chromatic (12) → pentatonic (5) → whole-tone (6)","all four scales contain seven pitch classes"], answer:0,
      explain:"5, 6, 7, 12.", hint:"Count each." }
  ],
  miaPerfect:"Perfect score! You accurately identified whole-tone, chromatic, and major-scale interval patterns.",
  miaPass:"You passed! Next, you will study interval inversions and compound intervals.",
  mia:{
    hook:{ label:"the welcome",
      explain:"Every step was a whole step — the whole-tone scale: six pitch classes, perfectly even, with no half steps between adjacent notes.",
      play:()=>{[60,62,64,66,68,70,72].forEach((m,i)=>MFAudio.tone(m,.4,i*.34,.42));} },
    learn:{ label:"whole-tone & chromatic",
      explain:"Whole-tone: 6 pitch classes, all whole steps, two collections. Chromatic: 12 half steps. Both repeat one interval, so they give only weak internal support for a tonic.",
      hint:"Equal steps give each pitch a similar position.",
      play:()=>{[60,61,62,63,64,65,66].forEach((m,i)=>MFAudio.tone(m,.3,i*.24,.38));} },
    example:{ label:"the examples",
      explain:"Example 1 uses the whole-tone scale; example 2 climbs chromatically into a release." },
    game:{ label:"the games",
      explain:"Sprint the facts, climb the whole-tone scale, sort scales on cards, then race the note counts.",
      hint:"5-6-7-12." },
    quiz:{ label:"this question",
      explain:"Check the step sizes: all whole steps = whole-tone (6 pitch classes), all half steps = chromatic (12), mixed = major.",
      play:()=>{[60,62,64,66,68,70,72].forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.4));} }
  }
};
