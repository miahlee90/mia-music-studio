/* Lesson 34 — Circle of Fifths (AEMT Book 2, Unit 8)
   Built from drafts/UNIT 8 – Lesson 34.md; AEMT p.53 verified by render.
   The circle diagram the instructor has wanted since L29 ("나중에 다 정리되고 어딘가에") —
   drawn as an original interactive SVG: 12 positions, C on top, enharmonic dual
   labels at the bottom (B/C♭ · F♯/G♭ · C♯/D♭), clockwise = +1♯, counterclockwise = +1♭.
   QA note honored: exploration over rote — click keys, step around, build the circle.
   NOTE: edit by FULL-FILE REWRITE only. */

/* the circle data: 12 positions clockwise from the top */
const MF_L34_POS=[
  {k:"C",  n:"0"},        {k:"G",  n:"1♯"}, {k:"D",n:"2♯"}, {k:"A",n:"3♯"},
  {k:"E",  n:"4♯"},       {k:"B",  alt:"C♭", n:"5♯"}, {k:"F♯", alt:"G♭", n:"6♯"},
  {k:"C♯", alt:"D♭", n:"7♯"}, {k:"A♭", n:"4♭"}, {k:"E♭",n:"3♭"}, {k:"B♭",n:"2♭"}, {k:"F",n:"1♭"}];
function MF_L34_ks(label){ return label.replace("♯","#").replace("♭","b"); }

/* draw the circle. opts:{blank:[indexes], hot:true(clickable), onKey(i,node), mark:[indexes]} */
function MF_L34_circle(el,opts){
  opts=opts||{};
  const W=340, cx=170, cy=170, R=128;
  const blank=new Set(opts.blank||[]);
  let svg=`<svg viewBox="0 0 ${W} ${W}" width="100%" style="max-width:${W}px;display:block;margin:0 auto" xmlns="http://www.w3.org/2000/svg">`;
  svg+=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#c9d2e4" stroke-width="2"/>`;
  svg+=`<text x="${cx}" y="${cy-8}" text-anchor="middle" style="font-weight:800;font-size:17px" fill="#1c1e54">Circle</text>`;
  svg+=`<text x="${cx}" y="${cy+10}" text-anchor="middle" style="font-weight:800;font-size:17px" fill="#1c1e54">of 5ths</text>`;
  svg+=`<text x="${cx+56}" y="${cy-52}" text-anchor="middle" style="font-size:12px;font-weight:700" fill="#2E8B57">+1♯ ↻</text>`;
  svg+=`<text x="${cx-56}" y="${cy-52}" text-anchor="middle" style="font-size:12px;font-weight:700" fill="#533afd">↺ +1♭</text>`;
  MF_L34_POS.forEach((p,i)=>{
    const a=(-90+i*30)*Math.PI/180, x=cx+R*Math.cos(a), y=cy+R*Math.sin(a);
    const mark=(opts.mark||[]).includes(i);
    const fill=mark? "#ffd166" : (blank.has(i)? "#fff" : "#eef1ff");
    const stroke=blank.has(i)? "#b9b9f9" : "#4434d4";
    const dash=blank.has(i)? ` stroke-dasharray="4 3"` : "";
    svg+=`<g class="cof-node" data-i="${i}" style="cursor:${opts.hot?"pointer":"default"}">`;
    svg+=`<circle cx="${x}" cy="${y}" r="21" fill="${fill}" stroke="${stroke}" stroke-width="2"${dash}/>`;
    if(!blank.has(i)){
      if(p.alt){
        svg+=`<text x="${x}" y="${y-1}" text-anchor="middle" style="font-weight:800;font-size:12px" fill="#1c1e54">${p.k}</text>`;
        svg+=`<text x="${x}" y="${y+11}" text-anchor="middle" style="font-size:10px" fill="#64748d">${p.alt}</text>`;
      } else svg+=`<text x="${x}" y="${y+5}" text-anchor="middle" style="font-weight:800;font-size:14px" fill="#1c1e54">${p.k}</text>`;
    } else svg+=`<text x="${x}" y="${y+5}" text-anchor="middle" style="font-weight:800;font-size:14px" fill="#b9b9f9">?</text>`;
    svg+=`</g>`;
  });
  svg+=`</svg>`;
  el.innerHTML=svg;
  if(opts.onKey) el.querySelectorAll(".cof-node").forEach(g=>g.addEventListener("click",()=>opts.onKey(+g.dataset.i,MF_L34_POS[+g.dataset.i])));
  return el.querySelector("svg");
}

/* explorer: click any key → signature + facts */
function MF_L34_explorer(container,fb){
  let seen=new Set();
  container.innerHTML=`<div class="cof-c"></div>
    <div class="big-q cof-q" style="text-align:center">Tap any key on the circle to inspect it! (Explore at least 3.)</div>
    <div class="cof-info"></div>`;
  const info=container.querySelector(".cof-info"), q=container.querySelector(".cof-q");
  MF_L34_circle(container.querySelector(".cof-c"),{hot:true,onKey:(i,p)=>{
    seen.add(i);
    const left=MF_L34_POS[(i+11)%12], right=MF_L34_POS[(i+1)%12];
    const cnt=p.n==="0"? "no sharps or flats" : p.n.replace("♯"," sharp(s)").replace("♭"," flat(s)");
    info.innerHTML=`<div style="text-align:center;font-weight:700;margin:6px 0">${p.k} Major${p.alt?` (= ${p.alt} Major)`:""} — ${cnt}<br>
      <span style="font-size:13px;color:var(--muted)">neighbors: ${left.k} (counterclockwise) · ${right.k} (clockwise)</span></div><div class="cof-sig"></div>`;
    Staff.render(info.querySelector(".cof-sig"),{clef:"treble",keysig:MF_L34_ks(p.k),notes:[],width:220});
    MFAudio.tone(60+((i*7)%12),.35);
    if(seen.size>=3){ q.textContent="Explorer's log complete — every key is one step from its neighbors!";
      fb(true,"✓ Notice the pattern: whichever key you tap, its clockwise neighbor has ONE more sharp, and its counterclockwise neighbor has one more flat."); }
  }});
}

/* build the circle: C is given, fill the other 11 */
function MF_L34_build(container,fb){
  let sel=null, filled=new Set([0]);
  container.innerHTML=`<div class="big-q cof-bq" style="text-align:center">Rebuild the circle! Tap a key name, then tap its spot. Clockwise from C: +1 sharp each step.</div>
    <div class="cof-bc"></div><div class="choices chips cof-bch"></div>`;
  const holder=container.querySelector(".cof-bc"), ch=container.querySelector(".cof-bch"), q=container.querySelector(".cof-bq");
  function draw(){
    MF_L34_circle(holder,{hot:true,blank:MF_L34_POS.map((_,i)=>i).filter(i=>!filled.has(i)),
      onKey:(i)=>{
        if(!sel||filled.has(i)) return;
        if(MF_L34_POS[i].k===sel){
          filled.add(i); MFAudio.tone(58+((i*7)%14),.3);
          const b=[...ch.children].find(x=>x.dataset.k===sel); b.disabled=true; b.style.opacity=".35"; b.style.outline="";
          sel=null; draw();
          if(filled.size>=12){ ch.style.display="none"; q.textContent="The circle is complete!";
            fb(true,"✓ All twelve positions! Clockwise C→G→D→A→E→B→F♯→C♯ adds sharps; counterclockwise C→F→B♭→E♭→A♭ adds flats — and the twins meet at the bottom."); }
          else fb(true,"✓ Placed! Keep building…"); }
        else { MFAudio.tone(40,.25);
          fb(false,"Not that spot — count the steps: each clockwise move is +1 sharp, each counterclockwise move is +1 flat."); }
      }});
  }
  MF_L34_POS.slice(1).map(p=>p.k).forEach(k=>{
    const b=document.createElement("button"); b.textContent=k; b.dataset.k=k;
    b.onclick=()=>{ if(b.disabled) return; [...ch.children].forEach(x=>x.style.outline=""); sel=k; b.style.outline="3px solid #ffd166"; };
    ch.appendChild(b); });
  draw();
}

/* step around the circle: guided clockwise/counterclockwise walking */
function MF_L34_walk(container,fb,dir){
  const seq=dir==="cw"? ["C","G","D","A","E"] : ["C","F","B♭","E♭","A♭"];
  const acc=dir==="cw"? "sharp" : "flat";
  let i=0;
  container.innerHTML=`<div class="cof-wc"></div>
    <div style="text-align:center"><button class="play cof-step">▶ Step ${dir==="cw"?"CLOCKWISE ↻":"COUNTERCLOCKWISE ↺"}</button></div>
    <div class="big-q cof-wq" style="text-align:center;min-height:24px"></div>`;
  const holder=container.querySelector(".cof-wc"), q=container.querySelector(".cof-wq");
  function draw(){ const idx=seq.slice(0,i+1).map(k=>MF_L34_POS.findIndex(p=>p.k===k));
    MF_L34_circle(holder,{mark:idx}); }
  container.querySelector(".cof-step").onclick=function(){
    if(i>=seq.length-1){ return; }
    i++; draw(); MFAudio.tone(dir==="cw"? 60+i*7 : 60-i*5+12,.4);
    q.innerHTML=`<b>${seq[i]} major</b> — ${i} ${acc}${i>1?"s":""}. ${i<seq.length-1?"Keep stepping!":`Every ${dir==="cw"?"clockwise":"counterclockwise"} step added one ${acc}!`}`;
    if(i>=seq.length-1){ this.style.display="none";
      fb(true,`✓ ${seq.join(" → ")} — one ${acc} joins the signature at every step. That's the whole secret of this direction.`); }
  };
  draw(); q.textContent="Start at C (no sharps or flats) and step!";
}

LESSON_CONTENT[34]={
  welcome:"Every key you've learned, connected in one elegant wheel — the musician's road map! \u{1F9ED}",
  hook:{
    say:"Here is the whole kingdom of keys arranged in a circle. Look at any two NEIGHBORING keys… <b>what do you think separates a key from its neighbor?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        const c=document.createElement("div"); container.appendChild(c);
        MF_L34_circle(c,{});
        const ch=document.createElement("div"); ch.className="choices";
        ch.innerHTML=`<button>Exactly ONE sharp or flat</button><button>A completely different alphabet</button><button>Nothing — they're identical</button>`;
        container.appendChild(ch);
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ One accidental — that's all! Move clockwise and gain a sharp; move counterclockwise and gain a flat. This wheel is the CIRCLE OF FIFTHS, and today you learn to drive it.");
          else fb(false,"Compare C and G, or C and F — how different are their signatures really?");
        });
      } }
  },
  objectives:[
    "Explain the purpose of the Circle of Fifths",
    "Identify clockwise and counterclockwise movement",
    "Determine how many sharps or flats a key contains",
    "Recognize neighboring keys",
    "Locate all major keys (and the enharmonic twins) on the circle",
    "Use the circle to identify key signatures"
  ],
  steps:[
    { say:"First, <b>HOW the circle is BUILT</b>. Put <b>C at the top</b> (no sharps or flats). Now stack <b>PERFECT 5THS</b>: go up a 5th from C and you get G (1♯); up a 5th again, D (2♯); again, A (3♯) — every <b>clockwise</b> step climbs a perfect 5th and adds <b>one sharp</b>: C→G→D→A→E→B→F♯→C♯. Build the other direction and every <b>counterclockwise</b> step adds <b>one flat</b>: C→F→B♭→E♭→A♭→D♭→G♭→C♭. That construction is exactly what the finished circle shows: the relationship of one key to another by the <b>number of sharps or flats</b> and the <b>order</b> in which they occur. \u{1F447} <b>The circle is built by stacking which interval clockwise from C?</b>",
      show:{ type:"custom", mount:(el)=>{ const c=document.createElement("div"); el.appendChild(c); MF_L34_circle(c,{}); } },
      try:{ type:"mc", choices:["Perfect 5ths","Half steps","Octaves","3rds"], answer:0,
        success:"✓ Perfect 5ths, one per step — that's why it's called the Circle of FIFTHS, and why each step gains exactly one sharp (or, backwards, one flat).",
        fail:"Count C up to G: C(1) D(2) E(3) F(4) G(5)…",
        hint:"The interval is in the circle's NAME." } },
    { say:"Drive it <b>CLOCKWISE ↻</b>: each step moves UP a <b>perfect 5th</b> and adds <b>one sharp</b>: C → G → D → A → E… \u{1F447} <b>Step around the wheel yourself and watch the sharps pile up:</b>",
      try:{ type:"custom",
        hint:"Five letters up each time: C→G→D→A→E — and +1♯ per step.",
        mount:(container,fb)=>MF_L34_walk(container,fb,"cw") } },
    { say:"Now drive it <b>COUNTERCLOCKWISE ↺</b>: each step adds <b>one flat</b>: C → F → B♭ → E♭ → A♭… \u{1F447} <b>Step the flat direction:</b>",
      try:{ type:"custom",
        hint:"C→F→B♭→E♭→A♭ — +1♭ per step.",
        mount:(container,fb)=>MF_L34_walk(container,fb,"ccw") } },
    { say:"Time to rebuild the wheel from memory — only C is in place. \u{1F447} <b>Put all eleven keys back on the circle:</b>",
      try:{ type:"custom",
        hint:"Clockwise from C: G D A E B F♯ C♯. Counterclockwise: F B♭ E♭ A♭. The dual-name spots sit at the bottom.",
        mount:(container,fb)=>MF_L34_build(container,fb) } },
    { say:"Finally, explore freely — every key's signature, count and neighbors, one tap away. Notice the <b>enharmonic twins</b> sharing the bottom three spots. \u{1F447} <b>Inspect at least three keys:</b>",
      try:{ type:"custom",
        hint:"Tap B, F♯ or C♯ at the bottom — each wears two names.",
        mount:(container,fb)=>MF_L34_explorer(container,fb) } }
  ],
  examples:[
    { caption:"The engine of the circle: perfect 5ths. C up to G, G up to D — each leap is the same interval that powers every clockwise step.",
      staff:{clef:"treble",tempo:80,notes:[{p:"C4",d:"h",label:"C"},{p:"G4",d:"h",label:"G"},{p:"D5",d:"h",label:"D"}],brackets:[{from:0,to:1,label:"5th"},{from:1,to:2,label:"5th"}],width:380} },
    { caption:"A harmonic perfect 5th — the most stable interval after the octave. Hear why neighboring keys feel so closely related.",
      staff:{clef:"treble",tempo:60,notes:[{p:"C4",d:"w"},{p:"G4",d:"w",chord:true}],brackets:[{from:0,to:1,label:"perfect 5th"}],width:240} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Compass Sprint (45s) \u{1F9ED}",
      intro:"Start at a key, move N steps clockwise or counterclockwise — where do you land? Race the clock!",
      miaIntro:"Navigator, take the wheel! \u{1F9ED}",
      spec:{gen:"circle-nav", params:{maxMove:3}, seconds:45},
      result:(score)=>score>=7?score+" landings in 45 seconds — a true navigator!":null },
    { type:"order-tap", title:"Game 2 · Clockwise Lap",
      intro:"Lap the sharp side of the circle in order — C to C♯!",
      miaIntro:"Full lap, sharp side! \u{1F3CE}",
      spec:{sequence:["C","G","D","A","E","B","F♯","C♯"], title:"Tap the clockwise lap — C first, +1♯ each step!"},
      result:(stars)=>stars>=3?"A clean sharp-side lap!":null },
    { type:"order-tap", title:"Game 3 · Counterclockwise Lap",
      intro:"Now the flat side — C to C♭, one flat at a time!",
      miaIntro:"Reverse lap, flat side! \u{1F3CE}",
      spec:{sequence:["C","F","B♭","E♭","A♭","D♭","G♭","C♭"], title:"Tap the counterclockwise lap — C first, +1♭ each step!"},
      result:(stars)=>stars>=3?"A clean flat-side lap!":null },
    { type:"gen-race", title:"Game 4 · Signature Recall (10 rounds)",
      intro:"The circle in your head: signatures flash, you name the key.",
      miaIntro:"No wheel to look at — just memory! \u{1F9E0}",
      spec:{gen:"keysig-id", params:{max:7}, rounds:10},
      result:(score)=>score>=8?"The circle lives in your head now!":null }
  ],
  practiceIntro:"20 practice questions — directions, counts, neighbors and landings. Answer right and the next appears automatically!",
  practice:[
    { gen:"circle-nav", params:{maxMove:3}, count:6 },
    { gen:"keysig-id", params:{max:7}, count:4 },
    { type:"mc", q:"Moving clockwise around the Circle of Fifths adds…", choices:["one sharp","one flat","one natural"], answer:0,
      explain:"Clockwise = up a 5th = +1♯." },
    { type:"mc", q:"Moving counterclockwise adds…", choices:["one flat","one sharp","two flats"], answer:0,
      explain:"Counterclockwise = +1♭ per step." },
    { type:"truefalse", q:"C Major is located at the top of the Circle of Fifths.", answer:true,
      explain:"The empty signature crowns the wheel." },
    { type:"truefalse", q:"Neighboring keys differ by one accidental.", answer:true,
      explain:"That's what makes neighbors closely related." },
    { type:"mc", q:"Moving clockwise from C Major, the next key is…", choices:["G Major","F Major","D Major"], answer:0,
      explain:"Up a perfect 5th: C→G." },
    { type:"mc", q:"The key of F♯ Major contains ____ sharps.", choices:["6","5","7"], answer:0,
      explain:"F♯ sits six clockwise steps from C." },
    /* — review style — */
    { type:"mc", q:"Complete the clockwise sequence: C → G → D → ____ → E", choices:["A","F","B"], answer:0,
      explain:"3 steps clockwise = A major (3♯)." },
    { type:"mc", q:"Complete the counterclockwise sequence: C → F → B♭ → ____ → A♭", choices:["E♭","D♭","G♭"], answer:0,
      explain:"3 steps counterclockwise = E♭ major (3♭)." },
    { type:"mc", q:"In the circle of fifths, go clockwise and ascend by 5ths for the ____ keys.", choices:["sharp","flat","minor"], answer:0,
      explain:"Clockwise = the sharp keys; counterclockwise = the flat keys." },
    { type:"mc", q:"Which pair are NEIGHBORS on the circle?", choices:["D and A","D and F","C and E"], answer:0,
      explain:"D (2♯) and A (3♯) sit side by side — one accidental apart." }
  ],
  miaQuizIntro:"Hands on the wheel — navigate the whole kingdom of keys!",
  quiz:[
    { type:"mc", q:"What does the Circle of Fifths show?",
      choices:["Rhythm patterns","The relationship among keys and their key signatures","Dynamic markings","Time signatures"], answer:1,
      explain:"Keys organized by their sharps and flats.", hint:"It's a key map." },
    { type:"mc", q:"Moving clockwise around the Circle of Fifths adds:", choices:["One flat","One sharp","One natural","One octave"], answer:1,
      explain:"Each clockwise step = up a 5th = +1♯.", hint:"Right = sharps." },
    { type:"mc", q:"Moving counterclockwise adds:", choices:["One sharp","One flat","Two sharps","Two flats"], answer:1,
      explain:"Each counterclockwise step = +1♭.", hint:"Left = flats." },
    { type:"truefalse", q:"C Major is located at the top of the Circle of Fifths.", answer:true,
      explain:"Zero accidentals — the twelve o'clock position.", hint:"Where did every walk begin?" },
    { type:"truefalse", q:"Neighboring keys differ by one accidental.", answer:true,
      explain:"One step = one accidental, always.", hint:"That's the circle's whole design." },
    { type:"mc", q:"Which matching is correct?",
      choices:["G→1♯ · D→2♯ · F→1♭ · B♭→2♭","G→2♯ · D→1♯ · F→2♭ · B♭→1♭","G→1♭ · D→2♭ · F→1♯ · B♭→2♯"], answer:0,
      explain:"One step each way from C on both sides.", hint:"First stops clockwise and counterclockwise." },
    { type:"mc", q:"Moving clockwise from C Major, the next key is ____.", choices:["G Major","F Major","D Major"], answer:0,
      explain:"C up a perfect 5th = G.", hint:"Count five letters up from C." },
    { type:"mc", q:"The key of F♯ Major contains ____ sharps.", choices:["6","5","7"], answer:0,
      explain:"Six clockwise steps from C.", hint:"Its twin G♭ has six flats too." },
    { type:"mc", q:"Complete the clockwise sequence: C → G → D → ____ → E", choices:["A","B","F"], answer:0,
      explain:"G(1♯) D(2♯) A(3♯) E(4♯).", hint:"3 steps = 3 sharps." },
    { type:"mc", q:"Complete the counterclockwise sequence: C → F → B♭ → ____ → A♭", choices:["E♭","D♭","G♭"], answer:0,
      explain:"F(1♭) B♭(2♭) E♭(3♭) A♭(4♭).", hint:"3 steps = 3 flats." },
    { type:"mc", q:"Which statement is correct?",
      choices:["Moving clockwise adds one flat","Moving counterclockwise adds one sharp","Neighboring keys on the Circle of Fifths differ by one accidental","C Major has one sharp"], answer:2,
      explain:"One step, one accidental — in either direction.", hint:"Test each claim against the wheel." },
    { type:"mc", q:"The interval that powers each clockwise step is a…", choices:["perfect 5th","3rd","half step"], answer:0,
      explain:"C→G→D→A… each leap is a perfect 5th — hence the circle's name.", hint:"It's in the title." },
    { type:"mc", q:"Which keys share the BOTTOM of the circle with two names each?",
      choices:["B/C♭ · F♯/G♭ · C♯/D♭","C/D · E/F · G/A","A/B♭ · C/C♯ · D/E♭"], answer:0,
      explain:"The three enharmonic twin pairs from Lesson 31 meet at the bottom of the wheel.", hint:"Remember the twins!" },
    /* generated */
    { gen:"circle-nav", params:{maxMove:3}, count:4 },
    { gen:"keysig-id", params:{max:7}, count:2 },
    { gen:"term-match", params:{subject:"term", pool:[["Circle of Fifths","keys organized by their sharps and flats"],["Perfect Fifth","the interval of each clockwise step (like C to G)"],["Clockwise","+1 sharp per step"],["Counterclockwise","+1 flat per step"]], reverse:true}, count:1 }
  ],
  vocabulary:[
    {term:"Circle of Fifths", def:"Shows the relationship of one key to another by the number of sharps or flats in the key signature and the order in which the sharps or flats occur."},
    {term:"Perfect Fifth", def:"An interval spanning five letter names — like C up to G. Each clockwise step of the circle is a perfect 5th.",
      staff:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"G4",d:"w",chord:true}],width:130}},
    {term:"Clockwise ↻", def:"Moving by ascending perfect fifths, adding one SHARP at each step: C → G → D → A → E → B → F♯ → C♯."},
    {term:"Counterclockwise ↺", def:"Moving the other way, adding one FLAT at each step: C → F → B♭ → E♭ → A♭ → D♭ → G♭ → C♭."}
  ],
  mistakes:[],
  summary:[
    "✔ The <b>Circle of Fifths</b> maps every key by its <b>sharps and flats</b> — C on top with none.",
    "✔ <b>Clockwise ↻ = +1♯</b> per step (C G D A E B F♯ C♯) · <b>Counterclockwise ↺ = +1♭</b> (C F B♭ E♭ A♭ D♭ G♭ C♭).",
    "✔ <b>Neighbors differ by exactly one accidental</b> — that's why they sound so closely related.",
    "✔ Each clockwise step is a <b>perfect 5th</b> up — the interval from Lesson 33!",
    "✔ The three <b>enharmonic twins</b> (B/C♭ · F♯/G♭ · C♯/D♭) share the bottom of the wheel. \u{1F389} <b>UNIT 8 COMPLETE!</b>"
  ],
  tips:[
    "Your L29/L30 key ladders were the circle unrolled into straight lines — now they've curled into a wheel.",
    "Stuck on a signature? Walk the circle from C in your head, counting accidentals as you go.",
    "The circle also predicts which keys blend beautifully in real music: neighbors first.",
    "Unit 9 sharpens the ruler: intervals gain QUALITIES — perfect, major, minor."
  ],
  rewards:{ badge:"Circle Navigator", icon:"\u{1F9ED}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"A perfect lap of the entire circle — Unit 8 conquered, navigator! \u{1F9ED}\u{1F389}\u{1F389}",
  miaPass:"You passed — and finished Unit 8! Keep a mental hand on the wheel: right for sharps, left for flats.",
  mia:{
    hook:{ label:"the welcome",
      explain:"Neighboring keys differ by exactly one accidental — the whole circle is built from that single fact.",
      play:()=>{MFAudio.tone(60,.4,0);MFAudio.tone(67,.5,.45);} },
    learn:{ label:"the circle",
      explain:"C on top; clockwise adds sharps (C G D A E B F♯ C♯), counterclockwise adds flats (C F B♭ E♭ A♭ D♭ G♭ C♭); the enharmonic twins share the bottom.",
      hint:"Right = sharps, left = flats.",
      play:()=>{[60,67,62,69].forEach((m,i)=>MFAudio.tone(m,.3,i*.3));} },
    example:{ label:"the examples",
      explain:"The perfect 5th is the engine: every clockwise step is that same leap, first melodic (C-G-D), then rung as harmony." },
    game:{ label:"the games",
      explain:"Sprint the compass, lap the wheel both directions, then recall signatures with no wheel in sight.",
      hint:"In the sprint: direction first (♯ or ♭?), then count the steps." },
    quiz:{ label:"this question",
      explain:"Steer with three facts: clockwise +1♯, counterclockwise +1♭, neighbors differ by one accidental.",
      play:()=>{MFAudio.tone(60,.3,0);MFAudio.tone(67,.3,.35);MFAudio.tone(74,.4,.7);} }
  }
};
