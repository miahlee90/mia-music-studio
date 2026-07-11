/* Lesson 79 — Asymmetrical & Changing Meter (Book 4, Unit 19 — SELF-AUTHORED)
   Core: ASYMMETRICAL meter = beats of unequal length (5/4 = 3+2 or 2+3;
   7/8 = 2+2+3 etc.). ADDITIVE thinking: read the top number as a sum of
   2s and 3s. CHANGING (mixed) meter = the time signature changes from
   measure to measure. NOTE: edit by FULL-FILE REWRITE only. */

/* ear lab: regular 4/4 vs asymmetrical 5/4 (3+2) */
function MF_L79_ear(container,fb){
  const ROUNDS=[1,0,1,0].sort(()=>Math.random()-.5); /* 1 = 5/4 */
  let r=0, played=false;
  container.innerHTML=`<div class="big-q l79e-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l79e-play">▶ Play two measures</button></div>
    <div class="choices l79e-ch" style="display:none"><button>4/4 — even, four beats</button><button>5/4 — uneven, 3+2 grouping</button></div>`;
  const q=container.querySelector(".l79e-q"), pl=container.querySelector(".l79e-play"), ch=container.querySelector(".l79e-ch");
  pl.onclick=()=>{
    if(r>=ROUNDS.length) return;
    const five=ROUNDS[r]===1, per=five?5:4;
    for(let m=0;m<2;m++) for(let b=0;b<per;b++){
      const strong = five? (b===0||b===3) : (b===0||b===2);
      MFAudio.tone(strong?43:55,.24,(m*per+b)*.42,strong?.42:.22);
    }
    played=true; setTimeout(()=>ch.style.display="",2*per*420+300);
  };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(!played) return;
    const five=ROUNDS[r]===1;
    if((i===1)===five){ fb(true,five?"✓ STRONG-2-3-strong-2 — five beats grouped 3+2.":"✓ STRONG-2-strong-2 — four even beats."); r++; played=false; ch.style.display="none";
      if(r>=ROUNDS.length){ q.textContent="Excellent! Uneven meters can't hide from you."; pl.style.display="none"; } else q.innerHTML=`Round ${r+1} of ${ROUNDS.length}: listen, then decide.`;
    } else { MFAudio.tone(40,.2); fb(false,"Count the beats between the strong accents: equal groups, or a 3 followed by a 2?"); }
  });
  q.innerHTML="Round 1 of 4: listen, then decide.";
}

LESSON_CONTENT[79]={
  welcome:"Asymmetrical meter: beats of unequal size. \u{2696}\u{FE0F}",
  hook:{
    say:"<b>Most meters divide evenly — these do not.</b> Listen: one pattern marches in equal beats, the other limps in a 3+2 shape. \u{1F447} <b>Which pattern is uneven?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Pattern 1</button>
          <button class="play hk-b">▶ Pattern 2</button></div>
          <div class="choices hk-ch" style="display:none"><button>Pattern 2 — its beats group 3+2</button><button>Pattern 1 — even beats are uneven</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ for(let m=0;m<2;m++) for(let b=0;b<4;b++){ const s=b===0||b===2; MFAudio.tone(s?43:55,.24,(m*4+b)*.42,s?.42:.22); } hA=true; if(hB) setTimeout(()=>ch.style.display="",3700); };
        container.querySelector(".hk-b").onclick=()=>{ for(let m=0;m<2;m++) for(let b=0;b<5;b++){ const s=b===0||b===3; MFAudio.tone(s?43:55,.24,(m*5+b)*.42,s?.42:.22); } hB=true; if(hA) setTimeout(()=>ch.style.display="",4600); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Pattern 2 counted STRONG-2-3-STRONG-2 — five beats in unequal groups. Meters built from unequal groups are ASYMMETRICAL. Today's lesson!");
          else fb(false,"Pattern 1's accents came at even distances. Listen for the limp — a long group then a short one…");
        });
      } }
  },
  objectives:[
    "Define asymmetrical meter: groups of unequal length inside the measure",
    "Read 5/4 as 3+2 or 2+3",
    "Read 7/8 as 2+2+3, 2+3+2 or 3+2+2",
    "Think additively: the top number = a sum of 2s and 3s",
    "Follow changing (mixed) meter from measure to measure",
    "Hear even vs uneven meters"
  ],
  steps:[
    { say:"<b>Asymmetrical Meter:</b> In 4/4 every beat group is equal. An asymmetrical meter mixes <b>groups of 2 and groups of 3</b> inside one measure — the pulse feels uneven on purpose. 5/4 and 7/8 are the most common. \u{1F447} <b>What makes a meter asymmetrical?</b>",
      try:{ type:"mc", choices:["Its measure mixes unequal groups (2s and 3s)","It has no time signature","It is always slow"], answer:0,
        success:"✓ Unequal groups inside the measure — a deliberate, energetic limp.",
        fail:"Compare 4/4's equal groups…",
        hint:"2s AND 3s together." } },
    { say:"<b>5/4 — Two Shapes:</b> five quarter-note beats group as <b style='color:#2F6DA8'>3+2</b> (STRONG-2-3-strong-2) or <b style='color:#C05A21'>2+3</b> (STRONG-2-strong-2-3). The accents mark the group starts. \u{1F447} <b>In 3+2 grouping, which beats are accented?</b>",
      show:{ type:"staff", spec:{clef:"treble",time:"5/4",tempo:100,notes:[
        {p:"G4",d:"q",artic:"accent",label:"1"},{p:"G4",d:"q",label:"2"},{p:"G4",d:"q",label:"3"},
        {p:"D5",d:"q",artic:"accent",label:"4"},{p:"D5",d:"q",label:"5"},{bar:"final"}],width:440} },
      try:{ type:"mc", choices:["Beats 1 and 4","Beats 1 and 3","Every beat"], answer:0,
        success:"✓ Beat 1 starts the group of three; beat 4 starts the group of two.",
        fail:"Count: 1-2-3 | 4-5…",
        hint:"Group starts get the accents." } },
    { say:"<b>7/8 — Three Shapes:</b> seven eighth notes group as <b>2+2+3</b>, <b>2+3+2</b> or <b>3+2+2</b>. The groups of two feel SHORT; the group of three feels LONG — the signature lopsided drive of Balkan dance music. \u{1F447} <b>How many eighth notes are in one measure of 7/8?</b>",
      show:{ type:"staff", spec:{clef:"treble",time:"7/8",tempo:80,notes:[
        {p:"E4",d:"8",artic:"accent"},{p:"E4",d:"8"},
        {p:"G4",d:"8",artic:"accent"},{p:"G4",d:"8"},
        {p:"B4",d:"8",artic:"accent"},{p:"B4",d:"8"},{p:"B4",d:"8"},{bar:"final"}],
        beams:[[0,1],[2,3],[4,6]],width:440} },
      try:{ type:"mc", choices:["7","8","3"], answer:0,
        success:"✓ Seven eighths — here beamed 2+2+3. The beaming shows the grouping.",
        fail:"Read the top number…",
        hint:"7 over 8." } },
    { say:"<b>Additive Meter:</b> read uneven meters by <b>adding small groups</b>: 5 = 3+2 · 7 = 2+2+3 · 8 can even be 3+3+2. Count the groups, not the single beats: \u{201C}ONE-two-three ONE-two.\u{201D} <b>Remember: asymmetrical meter = unequal groups of 2s and 3s.</b> \u{1F447} <b>7/8 grouped 3+2+2 is counted…</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14.5px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Meter</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Common groupings</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800">5/4 · 5/8</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">3+2 · 2+3</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800">7/8</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">2+2+3 · 2+3+2 · 3+2+2</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800">8/8 (uneven)</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">3+3+2</td></tr></table>` },
      try:{ type:"mc", choices:["ONE-two-three ONE-two ONE-two","ONE-two ONE-two ONE-two-three","seven equal ONEs"], answer:0,
        success:"✓ The 3 leads, then two 2s — count the groups.",
        fail:"3 first, then 2, then 2…",
        hint:"Say the group starts loudly." } },
    { say:"<b>Changing (Mixed) Meter:</b> the time signature itself can <b>change from measure to measure</b> — 4/4 to 3/4 and back. Each new signature applies until the next one. \u{1F447} <b>In the passage below, how many beats does the middle measure get?</b>",
      show:{ type:"html", html:`<div style="display:flex;gap:10px;justify-content:center;align-items:center;font-weight:800;font-size:16px">
        <div style="border:2px solid #2F6DA8;border-radius:10px;padding:10px 16px;background:#fff"><span style="color:#2F6DA8">4/4</span><br>♩ ♩ ♩ ♩</div>
        <div style="border:2px solid #C05A21;border-radius:10px;padding:10px 16px;background:#fff"><span style="color:#C05A21">3/4</span><br>♩ ♩ ♩</div>
        <div style="border:2px solid #2F6DA8;border-radius:10px;padding:10px 16px;background:#fff"><span style="color:#2F6DA8">4/4</span><br>♩ ♩ ♩ ♩</div></div>` },
      try:{ type:"mc", choices:["Three — its own signature rules it","Four — the first signature rules all","None"], answer:0,
        success:"✓ Each signature governs its measure until a new one appears.",
        fail:"Read the middle box's own signature…",
        hint:"Signatures apply until replaced." } },
    { say:"Listen: even or uneven? \u{1F447}",
      try:{ type:"custom",
        hint:"Track the distance between strong accents: equal (4/4) or long-short (5/4)?",
        mount:(container,fb)=>MF_L79_ear(container,fb) } },
    { say:"<b>Review:</b> \u{1F447} <b>Which time signature is asymmetrical?</b>",
      try:{ type:"mc", choices:["7/8","4/4","12/8"], answer:0,
        success:"✓ 7/8 — its 2s and 3s can never divide evenly. (12/8 is compound but EVEN: 3+3+3+3.)",
        fail:"Can the top number split into equal groups?",
        hint:"7 has no equal split." } }
  ],
  examples:[
    { caption:"A 5/4 melody grouped 3+2: accents on beats 1 and 4. Count 'ONE-two-three ONE-two' as it plays.",
      staff:{clef:"treble",time:"5/4",tempo:104,notes:[
        {p:"D4",d:"q",artic:"accent"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"A4",d:"q",artic:"accent"},{p:"G4",d:"q"},{bar:"single"},
        {p:"F4",d:"q",artic:"accent"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"D4",d:"h",artic:"accent"},{bar:"final"}],width:640},
      kb:{start:50,octaves:2,labels:true} },
    { caption:"7/8 grouped 2+2+3: two short steps and a long one. The beaming shows the groups — feel the drive in the final three.",
      staff:{clef:"treble",time:"7/8",tempo:84,notes:[
        {p:"E4",d:"8",artic:"accent"},{p:"F#4",d:"8"},
        {p:"G4",d:"8",artic:"accent"},{p:"A4",d:"8"},
        {p:"B4",d:"8",artic:"accent"},{p:"A4",d:"8"},{p:"G4",d:"8"},{bar:"single"},
        {p:"F#4",d:"8",artic:"accent"},{p:"E4",d:"8"},
        {p:"F#4",d:"8",artic:"accent"},{p:"G4",d:"8"},
        {p:"E4",d:"q.",artic:"accent"},{bar:"final"}],
        beams:[[0,1],[2,3],[4,6],[8,9],[10,11]],width:640},
      kb:{start:52,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Uneven Meter Sprint (45s)",
      intro:"Groupings, counts and signatures — race the facts!",
      miaIntro:"2s and 3s! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Asymmetrical meter","unequal groups of 2s and 3s"],
        ["5/4 groupings","3+2 or 2+3"],
        ["7/8 groupings","2+2+3, 2+3+2 or 3+2+2"],
        ["Additive thinking","read the top as a sum of 2s and 3s"],
        ["Changing meter","the signature changes mid-piece"],
        ["Accents fall on","each group's first note"],
        ["Uneven 8/8","3+3+2"],
        ["An even meter","4/4 — equal groups"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — uneven-meter fluent!":null },
    { type:"symbol-hunt", title:"Game 2 · Name That Grouping",
      intro:"Beamed measures on cards — click the grouping each round names!",
      miaIntro:"Read the beams! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"5/4 as 3+2", spec:{clef:"treble",time:"5/4",notes:[{p:"G4",d:"q",artic:"accent"},{p:"G4",d:"q"},{p:"G4",d:"q"},{p:"G4",d:"q",artic:"accent"},{p:"G4",d:"q"}],width:230}},
        {label:"7/8 as 2+2+3", spec:{clef:"treble",time:"7/8",notes:[{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"}],beams:[[0,1],[2,3],[4,6]],width:230}},
        {label:"7/8 as 3+2+2", spec:{clef:"treble",time:"7/8",notes:[{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"}],beams:[[0,2],[3,4],[5,6]],width:230}},
        {label:"4/4 — even", spec:{clef:"treble",time:"4/4",notes:[{p:"G4",d:"q"},{p:"G4",d:"q"},{p:"G4",d:"q"},{p:"G4",d:"q"}],width:200}}]},
      result:(score)=>score>=5?"Groupings read at a glance!":null },
    { type:"order-tap", title:"Game 3 · Count the 7/8 Measure",
      intro:"Tap the 2+2+3 count in order!",
      miaIntro:"Short, short, LONG! \u{1F3C1}",
      spec:{sequence:["ONE-two (first group of 2)","ONE-two (second group of 2)","ONE-two-three (the group of 3)"],
        title:"One measure of 7/8, group by group"},
      result:(stars)=>stars>=2?"7/8 counted like a native!":null },
    { type:"term-race", title:"Game 4 · Even or Uneven?",
      intro:"Sort the signatures — at speed!",
      miaIntro:"Can it split equally? \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["5/4","asymmetrical"],
        ["7/8","asymmetrical"],
        ["4/4","even — simple quadruple"],
        ["12/8","even — compound quadruple"],
        ["8/8 as 3+3+2","uneven grouping"],
        ["3/4","even — simple triple"],
        ["Meter that changes each measure","changing (mixed) meter"],
        ["Where uneven accents fall","on group starts"]]},
      result:(score)=>score>=6?"Every signature sorted!":null }
  ],
  practiceIntro:"20 practice questions — 5/4, 7/8, additive and changing meter. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Asymmetrical","unequal groups"],["5/4","3+2 or 2+3"],["7/8","2+2+3 and friends"],["Additive meter","sum of 2s and 3s"],["Changing meter","new signature mid-piece"]], reverse:true}, count:6 },
    { gen:"rhythm-count", params:{}, count:2 },
    { type:"mc", q:"How many beats are in one measure of 5/4?", choices:["5","4","3"], answer:0,
      explain:"Five quarter-note beats, grouped unevenly." },
    { type:"mc", q:"Which is a common 7/8 grouping?", choices:["2+2+3","4+4","3+3+3"], answer:0,
      explain:"Seven splits into 2s and one 3." },
    { type:"mc", q:"In 5/4 grouped 2+3, the accents fall on beats…", choices:["1 and 3","1 and 4","2 and 5"], answer:0,
      explain:"Group starts: 1-2 | 3-4-5." },
    { type:"mc", q:"When the time signature changes mid-piece, each signature…", choices:["rules until the next one appears","lasts one beat","is ignored"], answer:0,
      explain:"Changing (mixed) meter." },
    { type:"truefalse", q:"7/8 can be divided into equal groups.", answer:false,
      explain:"7 always leaves a 3 among 2s — asymmetrical." },
    { type:"truefalse", q:"12/8 is asymmetrical.", answer:false,
      explain:"12/8 is compound but EVEN: 3+3+3+3." },
    { type:"truefalse", q:"In additive meter, you count group starts, not every beat equally.", answer:true,
      explain:"ONE-two-three ONE-two." },
    { gen:"term-match", params:{subject:"term", pool:[["Group of 3","the long step"],["Group of 2","the short step"],["Accent","each group's first note"],["8/8 uneven","3+3+2"]], reverse:true}, count:3 },
    { gen:"note-value", params:{}, count:2 }
  ],
  vocabulary:[
    {term:"Asymmetrical Meter", def:"A meter whose measure mixes unequal groups (2s and 3s) — 5/4, 7/8."},
    {term:"Additive Meter", def:"Reading the top number as a sum of small groups: 5 = 3+2, 7 = 2+2+3."},
    {term:"Changing (Mixed) Meter", def:"The time signature changes from measure to measure; each rules until replaced."},
    {term:"Grouping Accent", def:"The accent on each group's first note — it tells the listener the meter's shape."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Asymmetrical meter</b> mixes <b>unequal groups</b> — the limp is the point.",
    "✔ <b>5/4</b> = 3+2 or 2+3 · <b>7/8</b> = 2+2+3, 2+3+2 or 3+2+2.",
    "✔ Think <b>additively</b>: the top number is a sum of 2s and 3s; count the group starts.",
    "✔ <b>Changing meter</b>: each new signature rules until the next.",
    "✔ Beaming and accents reveal the grouping at a glance."
  ],
  tips:[
    "Walk it: step LONG-short for 5/4 (3+2) — your feet learn asymmetry faster than your eyes.",
    "In 7/8, find the 3 first; the 2s fall into place around it.",
    "Famous asymmetry to find tonight: a jazz classic in 5/4 — count ONE-two-three ONE-two along with it.",
    "Unit 19 complete! Next unit returns to pitch: the modes, put to WORK."
  ],
  rewards:{ badge:"Odd-Meter Navigator", icon:"\u{2696}\u{FE0F}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Sum the 2s and 3s, accent the group starts.",
  quiz:[
    { type:"mc", q:"What makes a meter asymmetrical?", choices:["Unequal groups (2s and 3s) inside the measure","A missing time signature","A slow tempo"], answer:0,
      explain:"The uneven grouping defines it.", hint:"Un-equal." },
    { type:"mc", q:"Which are the two common groupings of 5/4?", choices:["3+2 and 2+3","4+1 and 1+4","5 equal groups"], answer:0,
      explain:"A three-group and a two-group, either order.", hint:"3 and 2." },
    { type:"mc", q:"Which is NOT a common 7/8 grouping?", choices:["4+3","2+2+3","3+2+2"], answer:0,
      explain:"7/8 groups use 2s and 3s, not 4s.", hint:"Only 2s and 3s." },
    { type:"mc", q:"In 5/4 grouped 3+2, the accents are on beats…", choices:["1 and 4","1 and 3","2 and 4"], answer:0,
      explain:"1-2-3 | 4-5 — group starts.", hint:"After the group of three." },
    { type:"mc", q:"Additive meter means…", choices:["reading the top number as a sum of 2s and 3s","adding extra beats freely","doubling the tempo"], answer:0,
      explain:"5 = 3+2, 7 = 2+2+3, 8 = 3+3+2.", hint:"Addition." },
    { type:"mc", q:"Identify the grouping.",
      staff:{clef:"treble",time:"7/8",notes:[{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"D5",d:"8"},{p:"D5",d:"8"}],beams:[[0,2],[3,4],[5,6]],width:240},
      choices:["3+2+2","2+2+3","7 equal"], answer:0,
      explain:"The beam groups read 3, then 2, then 2.", hint:"Count each beam." },
    { type:"mc", q:"What is changing (mixed) meter?", choices:["The time signature changes from measure to measure","Playing two meters at once","A meter with no barlines"], answer:0,
      explain:"4/4 → 3/4 → 4/4, each ruling its measure.", hint:"Signatures in sequence." },
    { type:"truefalse", q:"In changing meter, a new time signature applies until the next one appears.", answer:true,
      explain:"Each signature rules its stretch.", hint:"Until replaced." },
    { type:"truefalse", q:"9/8 divided 3+3+3 is asymmetrical.", answer:false,
      explain:"Equal threes = compound triple, perfectly even.", hint:"Are the groups equal?" },
    { type:"mc", q:"You hear STRONG-two-three STRONG-two repeating. The meter is…", choices:["5/4 grouped 3+2","4/4","6/8"], answer:0,
      explain:"A three-group then a two-group — five beats.", hint:"Count to the next strong beat." },
    { type:"mc", q:"8/8 grouped 3+3+2 sounds uneven because…", choices:["its groups are unequal, unlike 4/4's even pairs","eight is an odd number","it has no accents"], answer:0,
      explain:"Same eight eighths as 4/4 — different grouping, different feel.", hint:"Grouping decides." },
    { type:"mc", q:"Which signature list is entirely asymmetrical?", choices:["5/4, 7/8, 5/8","4/4, 3/4, 2/4","6/8, 9/8, 12/8"], answer:0,
      explain:"All mix 2s and 3s unequally.", hint:"The odd tops." }
  ],
  miaPerfect:"PERFECT! 3+2, 2+2+3, mixed measures — asymmetry obeys you. \u{2696}\u{FE0F}\u{1F389}",
  miaPass:"Passed — and UNIT 19 is COMPLETE! Rhythm's full toolkit is yours. \u{1F389}",
  mia:{
    hook:{ label:"the welcome",
      explain:"Pattern 1 pulsed in equal fours; pattern 2 limped STRONG-2-3-STRONG-2 — five beats in unequal groups: asymmetrical meter.",
      play:()=>{for(let b=0;b<5;b++){ const s=b===0||b===3; MFAudio.tone(s?43:55,.24,b*.42,s?.42:.22);} } },
    learn:{ label:"asymmetrical & changing meter",
      explain:"Unequal groups of 2s and 3s: 5/4 = 3+2/2+3; 7/8 = 2+2+3 etc.; think additively; changing meter swaps signatures measure to measure.",
      hint:"Sum of 2s and 3s.",
      play:()=>{for(let b=0;b<7;b++){ const s=b===0||b===2||b===4; MFAudio.tone(s?43:55,.2,b*.3,s?.4:.2);} } },
    example:{ label:"the examples",
      explain:"Example 1 walks a 5/4 melody in 3+2; example 2 drives 7/8 in 2+2+3 — the beams show the groups." },
    game:{ label:"the games",
      explain:"Sprint the groupings, read beams on cards, count a 7/8 measure in order, then sort even from uneven.",
      hint:"Accents mark group starts." },
    quiz:{ label:"this question",
      explain:"Two checks: can the top number split into EQUAL groups (even) or only into mixed 2s and 3s (asymmetrical)? And which signature currently rules the measure?",
      play:()=>{for(let b=0;b<5;b++){ const s=b===0||b===3; MFAudio.tone(s?43:55,.22,b*.4,s?.4:.2);} } }
  }
};
