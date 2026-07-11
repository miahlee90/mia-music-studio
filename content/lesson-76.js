/* Lesson 76 — Compound Meter Expanded (Book 4, Unit 19 — SELF-AUTHORED)
   Advanced tone begins here (college-intro theory). DD-34 style.
   Core: compound meter = each beat divides into THREE; beat = dotted note;
   6/8 duple · 9/8 triple · 12/8 quadruple; beats = top ÷ 3; conducting
   patterns follow the BEATS, not the divisions.
   Color code: simple/2-division = #2F6DA8 (blue) · compound/3-division = #C05A21 (orange).
   NOTE: edit by FULL-FILE REWRITE only. */

/* conducting-pattern matcher: a meter is called; click the correct beat pattern */
function MF_L76_conduct(container,fb){
  const PAT={
    2:`<svg viewBox="0 0 120 110" width="110"><path d="M60 15 L60 80 M60 80 Q75 95 85 70 Q90 55 60 22" fill="none" stroke="#2F6DA8" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="15" r="5" fill="#2F6DA8"/><text x="60" y="105" text-anchor="middle" font-size="13" font-weight="800">2-beat</text></svg>`,
    3:`<svg viewBox="0 0 120 110" width="110"><path d="M60 15 L60 70 L95 78 Q100 60 62 20" fill="none" stroke="#C05A21" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="15" r="5" fill="#C05A21"/><text x="60" y="105" text-anchor="middle" font-size="13" font-weight="800">3-beat</text></svg>`,
    4:`<svg viewBox="0 0 120 110" width="110"><path d="M60 15 L60 65 L30 72 L92 80 Q98 55 62 20" fill="none" stroke="#A9821F" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="15" r="5" fill="#A9821F"/><text x="60" y="105" text-anchor="middle" font-size="13" font-weight="800">4-beat</text></svg>`};
  const ROUNDS=[
    {meter:"6/8", beats:2, why:"6 ÷ 3 = 2 beats — compound DUPLE conducts a 2-beat pattern."},
    {meter:"9/8", beats:3, why:"9 ÷ 3 = 3 beats — compound TRIPLE conducts a 3-beat pattern."},
    {meter:"12/8", beats:4, why:"12 ÷ 3 = 4 beats — compound QUADRUPLE conducts a 4-beat pattern."},
    {meter:"6/8", beats:2, why:"Conducting follows the BEATS (2 dotted quarters), never the six divisions."}];
  let r=0;
  container.innerHTML=`<div class="big-q l76c-q" style="text-align:center"></div>
    <div class="l76c-pats" style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap"></div>`;
  const q=container.querySelector(".l76c-q"), pats=container.querySelector(".l76c-pats");
  [2,3,4].forEach(b=>{
    const d=document.createElement("div");
    d.style.cssText="cursor:pointer;border:2px solid #cdd5e1;border-radius:12px;padding:6px;background:#fff";
    d.innerHTML=PAT[b];
    d.onclick=()=>{
      const R=ROUNDS[r]; if(!R) return;
      if(b===R.beats){
        for(let i=0;i<R.beats;i++){ MFAudio.tone(48,.28,i*.5,.4); for(let j=1;j<3;j++) MFAudio.tone(72,.12,i*.5+j*.166,.18); }
        fb(true,"✓ "+R.why); r++; setTimeout(ask,1400);
      } else { MFAudio.tone(40,.2); fb(false,"Count the BEATS: divide the top number by 3."); }
    };
    pats.appendChild(d);
  });
  function ask(){
    if(r>=ROUNDS.length){ q.textContent="Excellent! You matched every conducting pattern."; pats.style.display="none"; return; }
    q.innerHTML=`Round ${r+1} of ${ROUNDS.length}: a piece is in <b>${ROUNDS[r].meter}</b>. Which conducting pattern fits?`;
  }
  ask();
}

/* ear lab: simple (2-division) vs compound (3-division) */
function MF_L76_ear(container,fb){
  const ROUNDS=[1,0,1,0].sort(()=>Math.random()-.5); /* 1 = compound */
  let r=0, played=false;
  container.innerHTML=`<div class="big-q l76e-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l76e-play">▶ Play the pattern</button></div>
    <div class="choices l76e-ch" style="display:none"><button>Simple — beats divide in TWO</button><button>Compound — beats divide in THREE</button></div>`;
  const q=container.querySelector(".l76e-q"), pl=container.querySelector(".l76e-play"), ch=container.querySelector(".l76e-ch");
  pl.onclick=()=>{
    if(r>=ROUNDS.length) return;
    const comp=ROUNDS[r]===1, div=comp?3:2, beatLen=comp?.6:.5;
    for(let b=0;b<4;b++){ MFAudio.tone(48,.3,b*beatLen,.42); for(let j=1;j<div;j++) MFAudio.tone(74,.12,b*beatLen+j*(beatLen/div),.16); }
    played=true; setTimeout(()=>ch.style.display="",4*beatLen*1000+300);
  };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(!played) return;
    const comp=ROUNDS[r]===1;
    if((i===1)===comp){ fb(true,comp?"✓ Each beat carried THREE quick notes — compound meter.":"✓ Each beat carried TWO quick notes — simple meter."); r++; played=false; ch.style.display="none";
      if(r>=ROUNDS.length){ q.textContent="Excellent! Your ear tells simple from compound."; pl.style.display="none"; } else q.innerHTML=`Round ${r+1} of ${ROUNDS.length}: listen, then decide.`;
    } else { MFAudio.tone(40,.2); fb(false,"Listen again — count how many quick notes fill each low beat: two or three?"); }
  });
  q.innerHTML="Round 1 of 4: listen, then decide.";
}

LESSON_CONTENT[76]={
  welcome:"Compound meter: every beat divides into three. \u{1F3B5}",
  hook:{
    say:"<b>Two patterns use the same beat.</b> In one, each beat divides into TWO parts; in the other, into THREE. Listen to both. \u{1F447} <b>Which pattern divides each beat into three?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Pattern 1</button>
          <button class="play hk-b">▶ Pattern 2</button></div>
          <div class="choices hk-ch" style="display:none"><button>Pattern 2 — three quick notes per beat</button><button>Pattern 1 — two quick notes per beat</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ for(let b=0;b<4;b++){ MFAudio.tone(48,.3,b*.5,.42); MFAudio.tone(74,.12,b*.5+.25,.16); } hA=true; if(hB) setTimeout(()=>ch.style.display="",2300); };
        container.querySelector(".hk-b").onclick=()=>{ for(let b=0;b<4;b++){ MFAudio.tone(48,.3,b*.6,.42); MFAudio.tone(74,.12,b*.6+.2,.16); MFAudio.tone(74,.12,b*.6+.4,.16); } hB=true; if(hA) setTimeout(()=>ch.style.display="",2700); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Pattern 2 divided each beat into THREE equal parts. Meters whose beats divide into three are called COMPOUND meters — today's lesson!");
          else fb(false,"Pattern 1's beats split in half — two parts. Listen again for the beat that splits into THREE…");
        });
      } }
  },
  objectives:[
    "Define compound meter: each beat divides into THREE equal parts",
    "Separate the BEAT (dotted quarter) from the DIVISION (eighth notes)",
    "Read 6/8 (duple), 9/8 (triple) and 12/8 (quadruple)",
    "Find the beat count: top number ÷ 3",
    "Match each compound meter to its conducting pattern",
    "Hear the difference between simple and compound meter"
  ],
  steps:[
    { say:"<b>Compound Meter:</b> In a compound meter, <b>each beat divides into three equal parts</b>. In a simple meter, each beat divides into two. The beat in compound meter is a <b>dotted note</b> — usually the dotted quarter. \u{1F447} <b>In compound meter, each beat divides into…</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14.5px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px"></th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px;color:#2F6DA8">Simple Meter</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px;color:#C05A21">Compound Meter</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;font-weight:800">Beat divides into</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;color:#2F6DA8;font-weight:800">2 parts</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;color:#C05A21;font-weight:800">3 parts</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;font-weight:800">Beat note</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">plain note (♩)</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">dotted note (♩.)</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;font-weight:800">Examples</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">2/4, 3/4, 4/4</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">6/8, 9/8, 12/8</td></tr></table>` },
      try:{ type:"mc", choices:["Three equal parts","Two equal parts","Four equal parts"], answer:0,
        success:"✓ Three equal parts — that is the definition of compound meter.",
        fail:"Compare with simple meter, which divides in two…",
        hint:"Com-POUND = beats of three." } },
    { say:"<b>Beat vs. Division:</b> 6/8 contains six eighth notes, but at normal tempos it has only <b>TWO beats</b> — each a <b>dotted quarter</b>. The six eighth notes are the <b>divisions</b> of those two beats. The bottom number names the division note, not the beat. \u{1F447} <b>In 6/8 at a normal tempo, which note gets the beat?</b>",
      show:{ type:"staff", spec:{clef:"treble",time:"6/8",tempo:60,notes:[
        {p:"G4",d:"8",label:"1"},{p:"G4",d:"8",label:"&"},{p:"G4",d:"8",label:"a"},
        {p:"D5",d:"8",label:"2"},{p:"D5",d:"8",label:"&"},{p:"D5",d:"8",label:"a"},{bar:"final"}],
        beams:[[0,2],[3,5]],width:420} },
      try:{ type:"mc", choices:["The dotted quarter note","The eighth note","The whole note"], answer:0,
        success:"✓ The dotted quarter — one beat containing three eighth-note divisions.",
        fail:"Which note equals three eighth notes?",
        hint:"♪+♪+♪ = ♩." } },
    { say:"<b>The Three Compound Meters:</b> <b style='color:#C05A21'>6/8 = compound DUPLE</b> (2 beats) · <b style='color:#C05A21'>9/8 = compound TRIPLE</b> (3 beats) · <b style='color:#C05A21'>12/8 = compound QUADRUPLE</b> (4 beats). <b>Remember: beats = top number ÷ 3.</b> \u{1F447} <b>How many beats does 9/8 have?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14.5px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Meter</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Beats</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Name</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800;color:#C05A21">6/8</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">6 ÷ 3 = 2</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;color:#C05A21;font-weight:800">Compound Duple</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800;color:#C05A21">9/8</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">9 ÷ 3 = 3</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;color:#C05A21;font-weight:800">Compound Triple</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800;color:#C05A21">12/8</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center">12 ÷ 3 = 4</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;color:#C05A21;font-weight:800">Compound Quadruple</td></tr></table>` },
      try:{ type:"mc", choices:["3 beats","9 beats","2 beats"], answer:0,
        success:"✓ 9 ÷ 3 = 3 dotted-quarter beats — compound triple.",
        fail:"Divide the top number by 3…",
        hint:"9 ÷ 3." } },
    { say:"<b>9/8 and 12/8 on the staff:</b> the eighth notes are beamed <b>in groups of three</b> — one group per beat. The beaming shows the beat structure at a glance. \u{1F447} <b>In 12/8, how many groups of three appear in each measure?</b>",
      show:{ type:"staff", spec:{clef:"treble",time:"12/8",tempo:60,notes:[
        {p:"C4",d:"8"},{p:"E4",d:"8"},{p:"G4",d:"8"},{p:"C5",d:"8"},{p:"G4",d:"8"},{p:"E4",d:"8"},
        {p:"F4",d:"8"},{p:"A4",d:"8"},{p:"C5",d:"8"},{p:"G4",d:"q."},{bar:"final"}],
        beams:[[0,2],[3,5],[6,8]],width:520} },
      try:{ type:"mc", choices:["Four groups","Three groups","Twelve groups"], answer:0,
        success:"✓ Four groups of three eighths — four dotted-quarter beats.",
        fail:"12 ÷ 3 = …",
        hint:"One beamed group = one beat." } },
    { say:"<b>Conducting Patterns:</b> conductors show the <b>beats</b>, never the divisions. 6/8 uses a <b>2-beat</b> pattern, 9/8 a <b>3-beat</b> pattern, 12/8 a <b>4-beat</b> pattern — the same patterns as 2/4, 3/4 and 4/4. \u{1F447} <b>Match each meter to its pattern:</b>",
      try:{ type:"custom",
        hint:"Beats = top ÷ 3. Conduct the beats.",
        mount:(container,fb)=>MF_L76_conduct(container,fb) } },
    { say:"<b>6/8 vs. 3/4 — same six eighths, different grouping:</b> <b style='color:#2F6DA8'>3/4 groups them 2+2+2</b> (three beats); <b style='color:#C05A21'>6/8 groups them 3+3</b> (two beats). The grouping — not the count — makes the meter. \u{1F447} <b>Six eighth notes beamed 3+3 belong to…</b>",
      show:{ type:"staff", spec:{clef:"treble",time:"6/8",tempo:60,notes:[
        {p:"C5",d:"8"},{p:"B4",d:"8"},{p:"A4",d:"8"},{p:"G4",d:"8"},{p:"F4",d:"8"},{p:"E4",d:"8"},{bar:"final"}],
        beams:[[0,2],[3,5]],width:380} },
      try:{ type:"mc", choices:["6/8 — two beats of three","3/4 — three beats of two","4/4"], answer:0,
        success:"✓ 3+3 grouping = 6/8. The same notes beamed 2+2+2 would be 3/4.",
        fail:"Count the notes inside each beam group…",
        hint:"Groups of three = compound." } },
    { say:"Listen to the difference. \u{1F447}",
      try:{ type:"custom",
        hint:"Count the quick notes inside each low beat: two = simple, three = compound.",
        mount:(container,fb)=>MF_L76_ear(container,fb) } },
    { say:"<b>Review:</b> \u{1F447} <b>Which time signature is compound duple?</b>",
      try:{ type:"mc", choices:["6/8","3/4","9/8"], answer:0,
        success:"✓ 6/8 — two dotted-quarter beats, each dividing into three.",
        fail:"Duple = 2 beats; compound = top ÷ 3…",
        hint:"Top number 6." } }
  ],
  examples:[
    { caption:"A 6/8 melody: two dotted-quarter beats per measure, eighth notes beamed 3+3. Count '1-&-a 2-&-a' while it plays.",
      staff:{clef:"treble",time:"6/8",tempo:66,notes:[
        {p:"G4",d:"8"},{p:"A4",d:"8"},{p:"B4",d:"8"},{p:"C5",d:"8"},{p:"B4",d:"8"},{p:"A4",d:"8"},{bar:"single"},
        {p:"G4",d:"q."},{p:"D5",d:"q."},{bar:"single"},
        {p:"E5",d:"8"},{p:"D5",d:"8"},{p:"C5",d:"8"},{p:"B4",d:"8"},{p:"A4",d:"8"},{p:"B4",d:"8"},{bar:"single"},
        {p:"G4",d:"q."},{p:"G4",d:"q."},{bar:"final"}],
        beams:[[0,2],[3,5],[10,12],[13,15]],width:660},
      kb:{start:55,octaves:2,labels:true} },
    { caption:"The same rhythm idea in 12/8: four beats, each a group of three. 12/8 is common in slow ballads and the blues shuffle.",
      staff:{clef:"treble",time:"12/8",tempo:56,notes:[
        {p:"C4",d:"8"},{p:"E4",d:"8"},{p:"G4",d:"8"},{p:"C5",d:"8"},{p:"G4",d:"8"},{p:"E4",d:"8"},
        {p:"F4",d:"8"},{p:"A4",d:"8"},{p:"C5",d:"8"},{p:"C4",d:"q."},{bar:"final"}],
        beams:[[0,2],[3,5],[6,8]],width:560},
      kb:{start:48,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Compound Meter Sprint (45s)",
      intro:"Beats, divisions and the three compound meters — race the facts!",
      miaIntro:"Top ÷ 3! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Compound meter","each beat divides into THREE"],
        ["Simple meter","each beat divides into two"],
        ["The compound beat note","the dotted quarter"],
        ["6/8","compound duple — 2 beats"],
        ["9/8","compound triple — 3 beats"],
        ["12/8","compound quadruple — 4 beats"],
        ["Finding the beats","top number ÷ 3"],
        ["Conducting","follows the beats, not the divisions"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — compound meter mastered!":null },
    { type:"symbol-hunt", title:"Game 2 · Spot the Meter",
      intro:"Beamed rhythms on cards — click the meter each round names!",
      miaIntro:"Read the beam groups! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"6/8 (3+3)", spec:{clef:"treble",time:"6/8",notes:[{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"}],beams:[[0,2],[3,5]],width:190}},
        {label:"9/8 (3+3+3)", spec:{clef:"treble",time:"9/8",notes:[{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"}],beams:[[0,2],[3,5],[6,8]],width:240}},
        {label:"3/4 (2+2+2)", spec:{clef:"treble",time:"3/4",notes:[{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"}],beams:[[0,1],[2,3],[4,5]],width:190}},
        {label:"12/8 (four groups)", spec:{clef:"treble",time:"12/8",notes:[{p:"D5",d:"q."},{p:"D5",d:"q."},{p:"D5",d:"q."},{p:"D5",d:"q."}],width:220}}]},
      result:(score)=>score>=5?"Meters spotted on sight!":null },
    { type:"order-tap", title:"Game 3 · Small to Large",
      intro:"Tap the compound meters from FEWEST beats to MOST!",
      miaIntro:"2, then 3, then 4! \u{1F3C1}",
      spec:{sequence:["6/8 — compound duple (2 beats)","9/8 — compound triple (3 beats)","12/8 — compound quadruple (4 beats)"],
        title:"The compound meters, by beat count"},
      result:(stars)=>stars>=2?"The compound family, in order!":null },
    { type:"term-race", title:"Game 4 · Beat or Division?",
      intro:"Every fact about beats vs divisions — at speed!",
      miaIntro:"Beats carry, divisions fill! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["The BEAT in 6/8","the dotted quarter"],
        ["The DIVISION in 6/8","the eighth note"],
        ["Divisions per beat (compound)","three"],
        ["Divisions per beat (simple)","two"],
        ["Six eighths beamed 3+3","6/8"],
        ["Six eighths beamed 2+2+2","3/4"],
        ["Beats in 12/8","four"],
        ["The conductor shows","beats only"]]},
      result:(score)=>score>=6?"Beat and division never confused again!":null }
  ],
  practiceIntro:"20 practice questions — compound meters, beats and divisions. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Compound meter","beats divide into three"],["6/8","compound duple"],["9/8","compound triple"],["12/8","compound quadruple"],["Beat note","dotted quarter"],["Division note","eighth note"]], reverse:true}, count:6 },
    { gen:"rhythm-count", params:{}, count:2 },
    { type:"mc", q:"How many beats are in one measure of 6/8?", choices:["2","6","3"], answer:0,
      explain:"6 ÷ 3 = 2 dotted-quarter beats." },
    { type:"mc", q:"How many beats are in one measure of 12/8?", choices:["4","12","6"], answer:0,
      explain:"12 ÷ 3 = 4." },
    { type:"mc", q:"Which note receives the beat in compound meter (bottom number 8)?", choices:["The dotted quarter","The eighth","The half note"], answer:0,
      explain:"One beat = three eighths = a dotted quarter." },
    { type:"mc", q:"Which meter is compound triple?", choices:["9/8","3/4","6/8"], answer:0,
      explain:"9 ÷ 3 = 3 beats." },
    { type:"truefalse", q:"In compound meter, each beat divides into three equal parts.", answer:true,
      explain:"The defining feature." },
    { type:"truefalse", q:"3/4 is a compound meter.", answer:false,
      explain:"3/4 is simple triple — its beats divide in two." },
    { type:"truefalse", q:"Conducting patterns follow the divisions, not the beats.", answer:false,
      explain:"Conductors show the BEATS." },
    { gen:"term-match", params:{subject:"term", pool:[["Top ÷ 3","the beat count"],["3+3 beaming","compound"],["2+2+2 beaming","simple triple"],["Dotted note","the compound beat"]], reverse:true}, count:3 },
    { gen:"note-value", params:{}, count:2 }
  ],
  vocabulary:[
    {term:"Compound Meter", def:"A meter in which each beat divides into three equal parts. The beat is a dotted note."},
    {term:"Beat vs. Division", def:"The beat is the pulse you conduct (dotted quarter); the divisions are the three notes inside it (eighths)."},
    {term:"Compound Duple / Triple / Quadruple", def:"6/8 (2 beats) · 9/8 (3 beats) · 12/8 (4 beats). Beats = top number ÷ 3."},
    {term:"Conducting Pattern", def:"The shape a conductor traces — one motion per BEAT: 2-beat, 3-beat or 4-beat."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Compound meter</b>: each beat divides into <b>three</b>; the beat is a <b>dotted quarter</b>.",
    "✔ <b>Beats = top number ÷ 3</b>: 6/8 → 2 · 9/8 → 3 · 12/8 → 4.",
    "✔ The bottom number names the <b>division</b>, not the beat.",
    "✔ Beaming in groups of <b>three</b> shows the beats — 3+3 (6/8) vs 2+2+2 (3/4).",
    "✔ Conduct the <b>beats</b>: 6/8 in two, 9/8 in three, 12/8 in four."
  ],
  tips:[
    "Say '1-&-a 2-&-a' for 6/8 — the '&-a' fills each beat's three divisions.",
    "Hearing test: if the quick notes come in threes, the meter is compound.",
    "12/8 powers the blues shuffle and slow doo-wop ballads — four big beats, each rolling in three.",
    "Next lesson: what happens when a SIMPLE meter borrows a three-division — the triplet — and compound borrows two: the duplet."
  ],
  rewards:{ badge:"Compound Conductor", icon:"\u{1F3B5}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Beats = top ÷ 3, divisions come in threes.",
  quiz:[
    { type:"mc", q:"In compound meter, each beat divides into…", choices:["three equal parts","two equal parts","four equal parts"], answer:0,
      explain:"The definition of compound meter.", hint:"Not two." },
    { type:"mc", q:"Which note gets the beat in 6/8, 9/8 and 12/8?", choices:["The dotted quarter","The eighth","The quarter"], answer:0,
      explain:"Three eighths = one dotted quarter.", hint:"A dotted note." },
    { type:"mc", q:"6/8 is called…", choices:["compound duple","compound triple","simple duple"], answer:0,
      explain:"6 ÷ 3 = 2 beats.", hint:"Count the beats." },
    { type:"mc", q:"9/8 has how many beats per measure?", choices:["3","9","4"], answer:0,
      explain:"9 ÷ 3 = 3 — compound triple.", hint:"Top ÷ 3." },
    { type:"mc", q:"12/8 is called…", choices:["compound quadruple","compound duple","simple quadruple"], answer:0,
      explain:"12 ÷ 3 = 4 beats.", hint:"Four beats of three." },
    { type:"mc", q:"How do you find the number of beats in a compound meter?", choices:["Divide the top number by 3","Read the top number directly","Divide the bottom number by 2"], answer:0,
      explain:"6→2, 9→3, 12→4.", hint:"÷ 3." },
    { type:"mc", q:"Identify the meter.", 
      staff:{clef:"treble",time:"9/8",notes:[{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"G4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"D5",d:"8"},{p:"D5",d:"8"},{p:"D5",d:"8"}],beams:[[0,2],[3,5],[6,8]],width:300},
      choices:["9/8 — compound triple","6/8 — compound duple","3/4 — simple triple"], answer:0,
      explain:"Three groups of three eighths.", hint:"Count the beam groups." },
    { type:"mc", q:"Six eighth notes beamed 2+2+2 belong to which meter?", choices:["3/4","6/8","12/8"], answer:0,
      explain:"Groups of two = simple meter — 3/4.", hint:"Pairs, not triples." },
    { type:"mc", q:"Which conducting pattern fits 12/8?", choices:["The 4-beat pattern","The 12-beat pattern","The 3-beat pattern"], answer:0,
      explain:"Conduct the four beats, not the twelve divisions.", hint:"Beats only." },
    { type:"truefalse", q:"The bottom number of 6/8 names the beat note.", answer:false,
      explain:"It names the DIVISION (the eighth); the beat is the dotted quarter.", hint:"Beat vs division." },
    { type:"truefalse", q:"You hear three quick notes inside every beat. The meter is compound.", answer:true,
      explain:"Three-part divisions define compound meter.", hint:"The ear test." },
    { type:"mc", q:"Which pair shows the SAME six eighth notes in two different meters?", choices:["6/8 (3+3) and 3/4 (2+2+2)","6/8 and 12/8","4/4 and 2/4"], answer:0,
      explain:"The grouping — not the count — makes the meter.", hint:"Beaming decides." }
  ],
  miaPerfect:"PERFECT! Beats, divisions, patterns — compound meter is yours. \u{1F3B5}\u{1F389}",
  miaPass:"Passed! You count in threes now. Next: triplets and duplets…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Pattern 1 divided each beat into two (simple); pattern 2 divided each beat into three (compound). That three-part division is today's subject.",
      play:()=>{for(let b=0;b<4;b++){ MFAudio.tone(48,.3,b*.6,.42); MFAudio.tone(74,.12,b*.6+.2,.16); MFAudio.tone(74,.12,b*.6+.4,.16); }} },
    learn:{ label:"compound meter",
      explain:"Beats divide into three; beat = dotted quarter; beats = top ÷ 3 (6/8→2, 9/8→3, 12/8→4); beaming 3+3 shows the beats; conduct the beats.",
      hint:"Top ÷ 3.",
      play:()=>{for(let b=0;b<2;b++){ MFAudio.tone(48,.3,b*.6,.42); for(let j=1;j<3;j++) MFAudio.tone(74,.12,b*.6+j*.2,.16); }} },
    example:{ label:"the examples",
      explain:"Example 1 is a 6/8 melody counted '1-&-a 2-&-a'; example 2 moves the same idea into 12/8 — four rolling beats." },
    game:{ label:"the games",
      explain:"Sprint the facts, spot meters from beaming, order the compound family, then race beat-vs-division.",
      hint:"3+3 = compound; 2+2+2 = simple." },
    quiz:{ label:"this question",
      explain:"Two checks answer everything: does the beat divide in three (compound)? And beats = top number ÷ 3.",
      play:()=>{for(let b=0;b<3;b++){ MFAudio.tone(48,.3,b*.6,.42); for(let j=1;j<3;j++) MFAudio.tone(74,.12,b*.6+j*.2,.16); }} }
  }
};
