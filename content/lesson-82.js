/* Lesson 82 — Whole Tone & Chromatic Scales (Book 4, Unit 20 — SELF-AUTHORED)
   Core: WHOLE TONE = six notes, all whole steps, only TWO exist; CHROMATIC
   = all twelve half steps; both are SYMMETRICAL scales — one repeating
   interval, so no note feels like home. NOTE: edit by FULL-FILE REWRITE only. */

/* ear lab: major vs whole tone vs chromatic */
function MF_L82_ear(container,fb){
  const SC={maj:[60,62,64,65,67,69,71,72], wt:[60,62,64,66,68,70,72], chr:[60,61,62,63,64,65,66,67]};
  const ROUNDS=[
    {play:"wt", ans:1, expl:"All whole steps, floating with no pull — the WHOLE TONE scale."},
    {play:"chr", ans:2, expl:"Every half step in a row — the CHROMATIC scale."},
    {play:"maj", ans:0, expl:"Whole and half steps mixed, with a clear pull home — a MAJOR scale."},
    {play:"wt", ans:1, expl:"Six evenly spaced notes, dreamlike — whole tone again."}];
  let r=0, played=false;
  container.innerHTML=`<div class="big-q l82e-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l82e-play">▶ Play the scale</button></div>
    <div class="choices l82e-ch" style="display:none"><button>Major — mixed steps, clear home</button><button>Whole tone — all whole steps, floating</button><button>Chromatic — all half steps</button></div>`;
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
    } else { MFAudio.tone(40,.2); fb(false,"Listen for the step sizes: all equal-large (whole tone), all equal-small (chromatic), or mixed (major)?"); }
  });
  q.innerHTML="Round 1 of 4: listen, then decide.";
}

LESSON_CONTENT[82]={
  welcome:"Whole tone and chromatic: scales without a home. \u{1F32B}\u{FE0F}",
  hook:{
    say:"<b>This scale has no pull toward any note</b> — it floats. \u{1F447} <b>Listen: what is unusual about its steps?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the floating scale</button></div>
          <div class="choices hk-ch" style="display:none"><button>Every step is the SAME size — a whole step</button><button>The steps get faster</button><button>It is a normal major scale</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{ [60,62,64,66,68,70,72].forEach((m,i)=>MFAudio.tone(m,.4,i*.34,.42)); setTimeout(()=>ch.style.display="",7*340+300); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Six notes, every step a whole step — the WHOLE TONE scale. With no half steps, no note leads anywhere: pure float. Today: the two symmetrical scales!");
          else fb(false,"The tempo was steady — listen to the DISTANCE between the notes: always equal…");
        });
      } }
  },
  objectives:[
    "Build the whole tone scale: six notes, all whole steps",
    "Know there are only TWO whole tone scales",
    "Review the chromatic scale: all twelve half steps",
    "Define symmetrical scale: one repeating interval, no tonic pull",
    "Hear major vs whole tone vs chromatic",
    "Know where these colors appear (dream scenes, tension builds)"
  ],
  steps:[
    { say:"<b>The Whole Tone Scale:</b> six notes per octave, <b>every step a whole step</b>: C - D - E - F♯ - G♯ - A♯ - C. No half steps anywhere. \u{1F447} <b>How many different notes does it contain?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:110,notes:[
        {p:"C4",d:"q",label:"W"},{p:"D4",d:"q",label:"W"},{p:"E4",d:"q",label:"W"},
        {p:"F#4",d:"q",label:"W"},{p:"G#4",d:"q",label:"W"},{p:"A#4",d:"q",label:"W"},{p:"C5",d:"q"},{bar:"final"}],width:520} },
      try:{ type:"mc", choices:["Six","Seven","Twelve"], answer:0,
        success:"✓ Six whole steps fill the octave exactly — 6 × 2 half steps = 12.",
        fail:"Count the noteheads before the octave returns…",
        hint:"One fewer than major." } },
    { say:"<b>Only Two Exist:</b> start a whole tone scale on any note and you land in one of just <b>two</b> collections: the one containing C, and the one containing C♯. Every other starting note repeats one of these. \u{1F447} <b>How many different whole tone scales are there?</b>",
      try:{ type:"mc", choices:["Two","Twelve","Seven"], answer:0,
        success:"✓ Two — start on C or on C♯; everything else duplicates them.",
        fail:"The scale on D reuses the C collection…",
        hint:"C-group and C♯-group." } },
    { say:"<b>The Chromatic Scale — Review:</b> all <b>twelve half steps</b> in a row; every key on the keyboard, black and white. Written with sharps going up, flats coming down. \u{1F447} <b>The chromatic scale's step pattern is…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:140,notes:[
        {p:"C4",d:"8"},{p:"C#4",d:"8"},{p:"D4",d:"8"},{p:"D#4",d:"8"},{p:"E4",d:"8"},{p:"F4",d:"8"},
        {p:"F#4",d:"8"},{p:"G4",d:"8"},{p:"G#4",d:"8"},{p:"A4",d:"8"},{p:"A#4",d:"8"},{p:"B4",d:"8"},{p:"C5",d:"8"},{bar:"final"}],width:620} },
      try:{ type:"mc", choices:["Half step after half step — all twelve","Whole steps only","Whole-whole-half repeating"], answer:0,
        success:"✓ Nothing but half steps — the complete twelve-note set.",
        fail:"Every neighboring key is used…",
        hint:"The smallest step, always." } },
    { say:"<b>Symmetrical Scales:</b> both scales repeat <b>one single interval</b> — whole tone: W-W-W-W-W-W · chromatic: H×12. With every step identical, <b>no note sounds like home</b> — there is no tonic pull. <b>Remember: symmetry removes the sense of home.</b> \u{1F447} <b>Why does a symmetrical scale feel tonic-free?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Scale</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Pattern</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Notes</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:5px 12px">Home?</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#2F6DA8">Major</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">W W H W W W H</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">7</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">strong tonic</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#C05A21">Whole tone</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">W W W W W W</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">6</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">none</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 12px;font-weight:800;color:#C05A21">Chromatic</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">H ×12</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center">12</td><td style="border:1.5px solid #cdd5e1;padding:4px 12px;text-align:center;font-weight:800">none</td></tr></table>` },
      try:{ type:"mc", choices:["Every step is identical, so no note stands out as a resting place","The notes are too quiet","It has too few notes"], answer:0,
        success:"✓ Uneven steps (like major's W-W-H) create landmarks; perfect symmetry erases them.",
        fail:"Compare with major's MIXED steps…",
        hint:"Landmarks need unevenness." } },
    { say:"Listen: major, whole tone, or chromatic? \u{1F447}",
      try:{ type:"custom",
        hint:"All-equal-large = whole tone; all-equal-small = chromatic; mixed = major.",
        mount:(container,fb)=>MF_L82_ear(container,fb) } },
    { say:"<b>Where These Colors Live:</b> the whole tone scale paints <b>dream sequences and underwater scenes</b>; the chromatic scale builds <b>tension, slides and chase scenes</b>. Composers reach for symmetry when they want the ground to disappear. \u{1F447} <b>A film needs a dream-dissolve. Which scale?</b>",
      try:{ type:"mc", choices:["Whole tone — floating, no gravity","Chromatic — maximum urgency","Major — solid ground"], answer:0,
        success:"✓ The whole tone float is cinema's dream signal.",
        fail:"Dreams float; chases climb by half steps…",
        hint:"No pull = no ground." } },
    { say:"<b>Review:</b> \u{1F447} <b>Which scale contains ALL twelve pitches?</b>",
      try:{ type:"mc", choices:["Chromatic","Whole tone","Pentatonic"], answer:0,
        success:"✓ Chromatic = the complete set; whole tone uses six; pentatonic five.",
        fail:"Twelve half steps = twelve notes…",
        hint:"Chroma = every color." } }
  ],
  examples:[
    { caption:"A whole tone phrase: six equal steps, then a float back down — no note asks to be home.",
      staff:{clef:"treble",tempo:100,notes:[
        {p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q"},
        {p:"G#4",d:"q"},{p:"A#4",d:"q"},{p:"C5",d:"h"},{bar:"single"},
        {p:"A#4",d:"q"},{p:"F#4",d:"q"},{p:"D4",d:"q"},{p:"C4",d:"h"},{bar:"final"}],width:620},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"A chromatic climb: half steps stacking tension until the release. Sharps going up — every key on the way.",
      staff:{clef:"treble",tempo:120,notes:[
        {p:"G4",d:"8"},{p:"G#4",d:"8"},{p:"A4",d:"8"},{p:"A#4",d:"8"},
        {p:"B4",d:"8"},{p:"C5",d:"8"},{p:"C#5",d:"8"},{p:"D5",d:"8"},
        {p:"E5",d:"h",label:"release!"},{bar:"final"}],
        beams:[[0,3],[4,7]],width:560},
      kb:{start:55,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Symmetry Sprint (45s)",
      intro:"Patterns, note counts and colors — race the facts!",
      miaIntro:"Equal steps, no home! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Whole tone scale","six notes, all whole steps"],
        ["Chromatic scale","all twelve half steps"],
        ["Symmetrical scale","one repeating interval"],
        ["Whole tone scales in existence","two"],
        ["Tonic pull in symmetrical scales","none"],
        ["Whole tone's film job","dream scenes"],
        ["Chromatic's film job","tension and chases"],
        ["Major scale (for contrast)","W-W-H mixed — strong home"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — symmetry mastered!":null },
    { type:"key-climb", title:"Game 2 · Climb the Whole Tone Scale",
      intro:"Play C whole tone up — six equal steps to the octave!",
      miaIntro:"W, W, W, W, W, W! \u{1FA9C}",
      spec:{seq:[60,62,64,66,68,70,72],
        names:["C","D","E","F♯","G♯","A♯","C (octave)"],
        start:60, octaves:1, title:"The C whole tone scale"},
      result:(score)=>score!==null?"Six whole steps, perfectly walked!":null },
    { type:"symbol-hunt", title:"Game 3 · Which Scale Is It?",
      intro:"Scale cards — click the one each round names!",
      miaIntro:"Check the step sizes! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Whole tone (6 notes)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q"},{p:"G#4",d:"q"},{p:"A#4",d:"q"}],width:210}},
        {label:"Chromatic (half steps)", spec:{clef:"treble",notes:[{p:"C4",d:"8"},{p:"C#4",d:"8"},{p:"D4",d:"8"},{p:"D#4",d:"8"},{p:"E4",d:"8"},{p:"F4",d:"8"}],width:210}},
        {label:"Major (W-W-H mix)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"}],width:190}},
        {label:"Pentatonic (gapped)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"}],width:190}}]},
      result:(score)=>score>=5?"Scale colors sorted on sight!":null },
    { type:"term-race", title:"Game 4 · Count & Compare Race",
      intro:"Note counts and patterns across every scale you know — at speed!",
      miaIntro:"5, 6, 7, 12! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Pentatonic","5 notes"],
        ["Whole tone","6 notes"],
        ["Major / minor","7 notes"],
        ["Chromatic","12 notes"],
        ["All whole steps","whole tone"],
        ["All half steps","chromatic"],
        ["No half steps, 5 notes","pentatonic"],
        ["W-W-H-W-W-W-H","major"]]},
      result:(score)=>score>=6?"Every scale counted!":null }
  ],
  practiceIntro:"20 practice questions — whole tone, chromatic and symmetry. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Whole tone","all whole steps"],["Chromatic","all half steps"],["Symmetrical","one repeating interval"],["Six notes","whole tone"],["Twelve notes","chromatic"]], reverse:true}, count:6 },
    { gen:"step-type", params:{}, count:2 },
    { type:"mc", q:"The whole tone scale contains how many notes?", choices:["6","7","12"], answer:0,
      explain:"Six whole steps fill the octave." },
    { type:"mc", q:"How many different whole tone scales exist?", choices:["2","12","6"], answer:0,
      explain:"The C collection and the C♯ collection." },
    { type:"mc", q:"The chromatic scale moves by…", choices:["half steps only","whole steps only","thirds"], answer:0,
      explain:"All twelve keys in a row." },
    { type:"mc", q:"A symmetrical scale lacks…", choices:["a tonic pull","notes","rhythm"], answer:0,
      explain:"Equal steps erase the landmarks." },
    { type:"truefalse", q:"The whole tone scale contains no half steps.", answer:true,
      explain:"W-W-W-W-W-W." },
    { type:"truefalse", q:"Ascending chromatic scales are usually written with sharps.", answer:true,
      explain:"Sharps up, flats down." },
    { type:"truefalse", q:"The major scale is a symmetrical scale.", answer:false,
      explain:"W-W-H mixing gives it a home — not symmetrical." },
    { gen:"term-match", params:{subject:"term", pool:[["Dream scene","whole tone"],["Chase scene","chromatic"],["Strong tonic","major"],["Two of them","whole tone scales"]], reverse:true}, count:3 },
    { gen:"enharmonic", params:{}, count:2 }
  ],
  vocabulary:[
    {term:"Whole Tone Scale", def:"Six notes per octave, every step a whole step. Only two exist.",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q"},{p:"G#4",d:"q"},{p:"A#4",d:"q"}],width:170}},
    {term:"Chromatic Scale", def:"All twelve half steps — every key, black and white. Sharps ascending, flats descending."},
    {term:"Symmetrical Scale", def:"A scale built from one repeating interval — no note feels like home."},
    {term:"Tonic Pull", def:"The gravity toward a home note — created by UNEVEN step patterns, erased by symmetry."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Whole tone</b>: 6 notes, all whole steps, only <b>two</b> collections exist.",
    "✔ <b>Chromatic</b>: all <b>12</b> half steps; sharps up, flats down.",
    "✔ Both are <b>symmetrical</b> — one repeating interval, <b>no tonic pull</b>.",
    "✔ Uneven patterns (major's W-W-H) create home; symmetry erases it.",
    "✔ Colors: whole tone = dreams and floating; chromatic = tension and motion."
  ],
  tips:[
    "Whole tone at the keyboard: C-D-E, then F♯-G♯-A♯ — three whites, three blacks.",
    "Play any note against a whole tone scale — nothing resolves. That's the point.",
    "Chromatic passages are about the DESTINATION: hear where the slide finally lands.",
    "Next lesson: flip intervals upside down — inversions and compounds."
  ],
  rewards:{ badge:"Symmetry Explorer", icon:"\u{1F32B}\u{FE0F}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Equal steps, counted notes, missing homes.",
  quiz:[
    { type:"mc", q:"The whole tone scale is built entirely from…", choices:["whole steps","half steps","minor thirds"], answer:0,
      explain:"W six times fills the octave.", hint:"The name says it." },
    { type:"mc", q:"How many notes are in a whole tone scale?", choices:["6","7","5"], answer:0,
      explain:"12 half steps ÷ 2 = 6 whole steps.", hint:"Divide the octave." },
    { type:"mc", q:"How many different whole tone scales exist?", choices:["Two","Seven","Twelve"], answer:0,
      explain:"Start on C or C♯ — all others repeat these.", hint:"Very few." },
    { type:"mc", q:"The chromatic scale contains…", choices:["all twelve pitches","only white keys","six notes"], answer:0,
      explain:"Every half step in the octave.", hint:"Complete set." },
    { type:"mc", q:"What makes a scale symmetrical?", choices:["One interval repeating with no variation","Loud and soft notes alternating","An odd number of notes"], answer:0,
      explain:"Whole tone (all W) and chromatic (all H).", hint:"The step pattern." },
    { type:"mc", q:"Why do symmetrical scales sound tonic-free?", choices:["Equal steps give no note a special position","They are too fast","They skip the octave"], answer:0,
      explain:"Home needs a landmark; symmetry has none.", hint:"No landmarks." },
    { type:"mc", q:"Identify the scale.",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q"},{p:"G#4",d:"q"},{p:"A#4",d:"q"},{p:"C5",d:"q"}],width:340},
      choices:["Whole tone","Major","Chromatic"], answer:0,
      explain:"Every step is a whole step — six notes plus the octave.", hint:"Measure the steps." },
    { type:"truefalse", q:"The chromatic scale is usually written with sharps ascending and flats descending.", answer:true,
      explain:"The notation convention.", hint:"Direction decides." },
    { type:"truefalse", q:"The whole tone scale has a strong leading tone.", answer:false,
      explain:"No half steps = no leading tone at all.", hint:"What makes a leading tone?" },
    { type:"mc", q:"A composer wants the ground to vanish in a dream scene. Best scale?", choices:["Whole tone","Major","Pentatonic"], answer:0,
      explain:"Float with no pull.", hint:"Cinema's dream signal." },
    { type:"mc", q:"A composer wants rising tension before a drop. Best device?", choices:["A chromatic climb","A pentatonic melody","A plain major scale"], answer:0,
      explain:"Half-step stacking = urgency.", hint:"Smallest steps, biggest squeeze." },
    { type:"mc", q:"Scale note-counts, smallest to largest:", choices:["pentatonic (5) → whole tone (6) → major (7) → chromatic (12)","major → chromatic → pentatonic","all have seven"], answer:0,
      explain:"5, 6, 7, 12.", hint:"Count each." }
  ],
  miaPerfect:"PERFECT! Six equal steps, twelve tiny ones — symmetry holds no mystery now. \u{1F32B}\u{FE0F}\u{1F389}",
  miaPass:"Passed! Floating and climbing both mastered. Next: interval inversions…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Every step was a whole step — the whole tone scale: six notes, perfectly even, no note pulling home.",
      play:()=>{[60,62,64,66,68,70,72].forEach((m,i)=>MFAudio.tone(m,.4,i*.34,.42));} },
    learn:{ label:"whole tone & chromatic",
      explain:"Whole tone: 6 notes, all W, two collections. Chromatic: 12 half steps. Both symmetrical — one repeating interval, no tonic pull.",
      hint:"Equal steps erase home.",
      play:()=>{[60,61,62,63,64,65,66].forEach((m,i)=>MFAudio.tone(m,.3,i*.24,.38));} },
    example:{ label:"the examples",
      explain:"Example 1 floats on the whole tone scale; example 2 climbs chromatically into a release." },
    game:{ label:"the games",
      explain:"Sprint the facts, climb the whole tone scale, sort scales on cards, then race the note counts.",
      hint:"5-6-7-12." },
    quiz:{ label:"this question",
      explain:"Check the step sizes: all whole = whole tone (6 notes), all half = chromatic (12), mixed = a home-having scale.",
      play:()=>{[60,62,64,66,68,70,72].forEach((m,i)=>MFAudio.tone(m,.36,i*.3,.4));} }
  }
};
