/* Lesson 70 — 12-Bar Blues Chord Progression (AEMT Book 3, Unit 17)
   Built from drafts/UNIT 17 – Lesson 70.md; AEMT3 p.110 verified by render.
   Core: the BLUES has roots in America's south — West African rhythms +
   gospel singing + European harmonies; found in jazz, rock and pop.
   A BLUES CHORD PROGRESSION is usually 12 measures ("bars"); the traditional
   form: I (4 bars) · IV (2) · I (2) · V or V7 (1) · IV (1) · I (2).
   NOTE: edit by FULL-FILE REWRITE only. */

/* build the 12-bar blues, bar by bar */
function MF_L70_build(container,fb){
  const FORM=["I","I","I","I","IV","IV","I","I","V7","IV","I","I"];
  const HINTS=["Four bars of I to start…","…still I…","…still I…","…one more!","Bar 5: the FIRST change — up to…","…two bars of it.","Back to I for two…","…second one.","Bar 9: V or V7!","Bar 10: step down through…","Back to I…","…and done!"];
  const CH={I:[48,64,67,72], IV:[53,65,69,72], V7:[43,67,71,77]};
  let k=0; const picked=[];
  container.innerHTML=`<div class="big-q l70b-q" style="text-align:center"></div>
    <div class="l70b-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;max-width:420px;margin:10px auto"></div>
    <div class="choices chips l70b-ch"><button>I</button><button>IV</button><button>V7</button></div>
    <div style="text-align:center"><button class="play l70b-play" style="display:none">▶ Play YOUR 12-bar blues</button></div>`;
  const q=container.querySelector(".l70b-q"), grid=container.querySelector(".l70b-grid"), ch=container.querySelector(".l70b-ch"), pl=container.querySelector(".l70b-play");
  function drawGrid(){
    grid.innerHTML="";
    FORM.forEach((f,i)=>{
      const cell=document.createElement("div");
      cell.style.cssText="border:2px solid "+(i<picked.length?"#3a9b57":"#cdd5e1")+";border-radius:8px;padding:8px 2px;text-align:center;font-weight:800;background:"+(i===picked.length?"#fff7df":"#fff");
      cell.textContent=(i+1)+": "+(i<picked.length?picked[i]:"·");
      grid.appendChild(cell);
    });
  }
  function ask(){
    drawGrid();
    if(k>=FORM.length){ q.textContent="Excellent! Your 12-bar blues is complete. Listen to your progression!"; ch.style.display="none"; pl.style.display="inline-block"; return; }
    q.innerHTML=`Bar ${k+1} of 12 — <i>${HINTS[k]}</i>`;
  }
  [...ch.children].forEach(b=>b.onclick=()=>{
    if(k>=FORM.length) return;
    if(b.textContent===FORM[k]){
      CH[b.textContent].forEach(m=>MFAudio.tone(m,.7,.05,.26));
      picked.push(b.textContent); k++;
      fb(true,`✓ Great! Bar ${k}: ${picked[k-1]}. ${k===12?"Pattern complete!":"Keep building the progression."}`);
      ask();
    } else { MFAudio.tone(40,.2); fb(false,`Which chord belongs in bar ${k+1}? The pattern: I×4, IV×2, I×2, V7×1, IV×1, I×2.`); }
  });
  pl.onclick=()=>{
    picked.forEach((f,i)=>CH[f].forEach(m=>MFAudio.tone(m,.75,i*.8,.26)));
    setTimeout(()=>fb(true,"✓ Twelve bars of blues — one of the most common progressions in popular music, built by you."),9800);
  };
  ask();
}

LESSON_CONTENT[70]={
  welcome:"The 12-bar blues: one pattern, thousands of songs. \u{1F3B7}",
  hook:{
    say:"<b>Many blues, rock, and jazz songs use the same chord pattern.</b> Listen to these twelve bars. <b>Can you recognize the 12-bar blues?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the 12 bars</button></div>
          <div class="choices hk-ch" style="display:none"><button>Yes — it's the famous BLUES progression</button><button>No — it's a classical symphony pattern</button><button>No — it sounds brand new</button></div>`;
        const FORM=[[48,64,67,72],[48,64,67,72],[48,64,67,72],[48,64,67,72],[53,65,69,72],[53,65,69,72],[48,64,67,72],[48,64,67,72],[43,67,71,77],[53,65,69,72],[48,64,67,72],[48,64,67,72]];
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{
          FORM.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.72,i*.75,.26)));
          setTimeout(()=>ch.style.display="",9200);
        };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ The 12-BAR BLUES — born in America's south from West African rhythms, gospel singing and European harmonies, and used in jazz, rock and pop. Today you learn its pattern!");
          else fb(false,"Think of old rock'n'roll, boogie-woogie piano, jazz jams… this chord pattern is everywhere.");
        });
      } }
  },
  objectives:[
    "Know where the blues began: the southern United States — West African rhythms + gospel + European harmonies",
    "Know where it lives now: jazz, rock and pop",
    "Define the form: 12 measures ('bars')",
    "Know the traditional pattern: I×4 · IV×2 · I×2 · V(7)×1 · IV×1 · I×2",
    "Build a 12-bar blues in C (and transfer to other keys)",
    "Use only I, IV and V(7)"
  ],
  steps:[
    { say:"<b>The Blues:</b> Blues music began in the southern United States. It combines <b>West African rhythms, gospel singing, and European harmony</b>. Today, blues influences jazz, rock, and pop music. \u{1F447} <b>Blues music combines which musical traditions?</b>",
      try:{ type:"mc", choices:["West African rhythms + gospel singing + European harmonies","A single European composer","Electronic dance music"], answer:0,
        success:"✓ Three traditions met in the American south and built a musical language the whole world now speaks.",
        fail:"Three traditions combined…",
        hint:"Rhythms + singing + harmonies." } },
    { say:"<b>The 12-Bar Blues:</b> A traditional blues progression lasts <b>12 measures (bars)</b>. It mainly uses three chords: <b>I, IV, and V (or V7)</b>. \u{1F447} <b>How many measures are in a standard blues progression?</b>",
      try:{ type:"mc", choices:["12 bars","8 bars","16 bars"], answer:0,
        success:"✓ Twelve — hence the name. And those twelve bars loop, verse after verse.",
        fail:"The lesson's title has the number…",
        hint:"It's in the name." } },
    { say:"<b>Bars 1–4:</b> The progression begins with <b>four measures of the I chord</b>. \u{1F447} <b>Which chord is played in bars 1–4 of a C blues?</b>",
      try:{ type:"mc", choices:["C (the I chord)","F (the IV chord)","G7 (the V7)"], answer:0,
        success:"✓ Four bars of I. (Singers use these bars for the first line of the verse.)",
        fail:"The progression begins on the tonic…",
        hint:"The I chord opens the form." } },
    { say:"<b>Bars 5–8:</b> Bars 5–6 use the <b>IV chord</b>. Bars 7–8 return to the <b>I chord</b>. \u{1F447} <b>When does the first chord change occur?</b>",
      show:{ type:"html", html:`<div style="max-width:430px;margin:0 auto;font-size:15px;line-height:2.1;background:var(--card,#fff);border:1.5px solid #cdd5e1;border-radius:12px;padding:12px 18px;text-align:center;font-weight:700">
        Bars 1-4: <b>I</b> &nbsp;·&nbsp; Bars 5-6: <b>IV</b> &nbsp;·&nbsp; Bars 7-8: <b>I</b><br>Bar 9: <b>V or V7</b> &nbsp;·&nbsp; Bar 10: <b>IV</b> &nbsp;·&nbsp; Bars 11-12: <b>I</b></div>` },
      try:{ type:"mc", choices:["Bar 5 — up to IV","Bar 2","Bar 9"], answer:0,
        success:"✓ Bar 5 — after four bars of I, the progression moves to IV.",
        fail:"Count the four bars of I first…",
        hint:"After the long opening." } },
    { say:"<b>Bars 9–12:</b> Bar 9 uses <b>V (or V7)</b>. Bar 10 moves to <b>IV</b>. Bars 11–12 return to <b>I</b>. <b>Remember: the chord pattern stays the same. Only the key changes.</b> \u{1F447} <b>Which chord comes after V?</b>",
      try:{ type:"mc", choices:["V(7) then IV","IV then V","I then V"], answer:0,
        success:"✓ V then IV — unlike a classical cadence, IV comes AFTER V here. That is part of the blues sound!",
        fail:"Bar 9 is V; bar 10 steps down…",
        hint:"V, then IV, then I." } },
    { say:"Build a complete 12-bar blues progression in C major. \u{1F447}",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:13px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:4px 7px">Bar</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:4px 7px">1</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:4px 7px">2</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:4px 7px">3</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:4px 7px">4</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:4px 7px">5</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:4px 7px">6</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:4px 7px">7</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:4px 7px">8</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:4px 7px">9</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:4px 7px">10</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:4px 7px">11</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:4px 7px">12</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 7px;font-weight:800">Chord</td><td style="border:1.5px solid #cdd5e1;padding:4px 7px;text-align:center;font-weight:800">I</td><td style="border:1.5px solid #cdd5e1;padding:4px 7px;text-align:center;font-weight:800">I</td><td style="border:1.5px solid #cdd5e1;padding:4px 7px;text-align:center;font-weight:800">I</td><td style="border:1.5px solid #cdd5e1;padding:4px 7px;text-align:center;font-weight:800">I</td><td style="border:1.5px solid #cdd5e1;padding:4px 7px;text-align:center;font-weight:800">IV</td><td style="border:1.5px solid #cdd5e1;padding:4px 7px;text-align:center;font-weight:800">IV</td><td style="border:1.5px solid #cdd5e1;padding:4px 7px;text-align:center;font-weight:800">I</td><td style="border:1.5px solid #cdd5e1;padding:4px 7px;text-align:center;font-weight:800">I</td><td style="border:1.5px solid #cdd5e1;padding:4px 7px;text-align:center;font-weight:800">V7</td><td style="border:1.5px solid #cdd5e1;padding:4px 7px;text-align:center;font-weight:800">IV</td><td style="border:1.5px solid #cdd5e1;padding:4px 7px;text-align:center;font-weight:800">I</td><td style="border:1.5px solid #cdd5e1;padding:4px 7px;text-align:center;font-weight:800">I</td></tr></table>` },
      try:{ type:"custom",
        hint:"I×4 · IV×2 · I×2 · V7×1 · IV×1 · I×2.",
        mount:(container,fb)=>MF_L70_build(container,fb) } },
    { say:"<b>Try Another Key:</b> Use the same pattern in G major. \u{1F447} <b>Which three chords are used?</b>",
      try:{ type:"mc", choices:["G, C and D7","G, A and B7","C, F and G7"], answer:0,
        success:"✓ I=G, IV=C, V7=D7. The chord pattern stays the same — only the key changes.",
        fail:"Find I, IV and V of G major…",
        hint:"Count up 4 and 5 from G." } }
  ],
  examples:[
    { caption:"The C major 12-bar blues: four bars of I, two of IV, two of I, one V7, one IV, and two bars of I. Follow the numerals!",
      staff:{clef:"treble",tempo:120,notes:[
        {p:"C4",d:"w",label:"I (bars 1-4)"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},
        {p:"F4",d:"w",label:"IV (5-6)"},{p:"A4",d:"w",chord:true},{p:"C5",d:"w",chord:true},
        {p:"C4",d:"w",label:"I (7-8)"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},
        {p:"G4",d:"w",label:"V7 (9)"},{p:"B4",d:"w",chord:true},{p:"F5",d:"w",chord:true},
        {p:"F4",d:"w",label:"IV (10)"},{p:"A4",d:"w",chord:true},{p:"C5",d:"w",chord:true},
        {p:"C4",d:"w",label:"I (11-12)"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:660},
      kb:{start:48,octaves:3,labels:true} },
    { caption:"The same pattern in B♭: B♭, E♭ and F7 take the same positions. The numerals never change; the letters follow the key.",
      staff:{clef:"treble",tempo:120,notes:[
        {p:"Bb3",d:"w",label:"I = B♭"},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true},
        {p:"Eb4",d:"w",label:"IV = E♭"},{p:"G4",d:"w",chord:true},{p:"Bb4",d:"w",chord:true},
        {p:"F4",d:"w",label:"V7 = F7"},{p:"A4",d:"w",chord:true},{p:"Eb5",d:"w",chord:true},
        {p:"Bb3",d:"w",label:"I"},{p:"D4",d:"w",chord:true},{p:"F4",d:"w",chord:true},{bar:"final"}],width:560},
      kb:{start:46,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Blues Pattern Sprint (45s)",
      intro:"Bars, origins, chords — race everything 12-bar!",
      miaIntro:"I, IV, V7 — twelve seats! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["The blues' roots","America's south"],
        ["Its three ingredients","West African rhythms + gospel + European harmonies"],
        ["Where it lives today","jazz, rock and pop"],
        ["Length of a blues progression","12 measures (bars)"],
        ["Bars 1-4","the I chord"],
        ["Bars 5-6","the IV chord"],
        ["Bar 9","V or V7"],
        ["Bar 10","IV — after the V"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — pattern memorized!":null },
    { type:"key-climb", title:"Game 2 · Blues Bass Walk",
      intro:"Play the ROOT of each of the 12 bars — the bass player's night at work!",
      miaIntro:"C-C-C-C, F-F, C-C, G-F, C-C! \u{1FA9C}",
      spec:{seq:[48,48,48,48, 53,53, 48,48, 55,53, 48,48],
        names:["C (bar 1)","C (2)","C (3)","C (4)","F (5 — first change!)","F (6)","C (7)","C (8)","G (9 — the V bar!)","F (10 — step down)","C (11)","C (12 — done!)"],
        start:48, octaves:2, title:"The 12-bar bass roots, in order"},
      result:(score)=>score!==null?"Twelve bars walked — hired for the gig!":null },
    { type:"symbol-hunt", title:"Game 3 · Blues Chord Spotter",
      intro:"The three chords of a C blues — click the bar's chord when called!",
      miaIntro:"Just three chords to know! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"I (C-E-G) — bars 1-4, 7-8, 11-12", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:150}},
        {label:"IV (F-A-C) — bars 5-6 and 10", spec:{clef:"treble",notes:[{p:"F4",d:"w"},{p:"A4",d:"w",chord:true},{p:"C5",d:"w",chord:true}],width:150}},
        {label:"V7 (G-B-D-F) — bar 9", spec:{clef:"treble",notes:[{p:"G4",d:"w"},{p:"B4",d:"w",chord:true},{p:"D5",d:"w",chord:true},{p:"F5",d:"w",chord:true}],width:150}},
        {label:"V (G-B-D) — bar 9's other option", spec:{clef:"treble",notes:[{p:"G4",d:"w"},{p:"B4",d:"w",chord:true},{p:"D5",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Three chords, twelve bars, zero doubts!":null },
    { type:"order-tap", title:"Game 4 · Assemble the Pattern",
      intro:"Tap the six segments of the 12-bar blues in order!",
      miaIntro:"Six segments, in order! \u{1F3C1}",
      spec:{sequence:["I — four bars","IV — two bars","I — two bars","V(7) — one bar","IV — one bar","I — two bars"],
        title:"The traditional 12-bar blues, segment by segment"},
      result:(stars)=>stars>=2?"The 12-bar pattern is yours!":null }
  ],
  practiceIntro:"20 practice questions — the map, the history and the transfers. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["12 bars","the blues' usual length"],["Bars 1-4","I"],["Bars 5-6","IV"],["Bars 7-8","I again"],["Bar 9","V or V7"],["Bar 10","IV"],["Bars 11-12","I — home"]], reverse:true}, count:6 },
    { gen:"triad-id", params:{ask:"numeral"}, count:2 },
    { type:"mc", q:"Where did blues music begin?", choices:["The southern United States","Northern Europe","Ancient Greece"], answer:0,
      explain:"Where three musical traditions met." },
    { type:"mc", q:"Which musical traditions influenced the blues?", choices:["West African rhythms, gospel singing, European harmonies","Asian scales and electronic beats","Opera and plainchant"], answer:0,
      explain:"Three traditions, one style." },
    { type:"mc", q:"The blues can often be found in…", choices:["jazz, rock and pop","only opera","only folk dances"], answer:0,
      explain:"It crossed into nearly every popular style." },
    { type:"mc", q:"A blues chord progression is usually…", choices:["12 measures long","4 measures long","32 measures long"], answer:0,
      explain:"Twelve bars — the name says it." },
    { type:"mc", q:"How many bars of I open the traditional blues?", choices:["4","2","1"], answer:0,
      explain:"The long settle-in." },
    { type:"mc", q:"Which chord is played in bar 9?", choices:["V or V7","IV","I"], answer:0,
      explain:"One bar of the dominant." },
    { type:"truefalse", q:"The traditional blues uses only the I, IV and V(7) chords.", answer:true,
      explain:"Three chords, endless songs." },
    { type:"truefalse", q:"Bar 10 uses the IV chord after bar 9's V (or V7).", answer:true,
      explain:"V → IV → I — a signature blues move." },
    { type:"truefalse", q:"There are many variations of the blues progression.", answer:true,
      explain:"Ours is the traditional version." },
    { type:"truefalse", q:"A 12-bar blues in F uses F, B♭ and C7.", answer:true,
      explain:"I=F, IV=B♭, V7=C7." }
  ],
  miaQuizIntro:"Quiz! Twelve bars, six segments, three chords.",
  quiz:[
    { type:"mc", q:"Where did blues music begin?", choices:["The southern United States","Vienna","The Baroque courts"], answer:0,
      explain:"The southern United States.", hint:"Its birthplace." },
    { type:"mc", q:"Which musical traditions helped create the blues?", choices:["West African rhythms, gospel singing, European harmonies","Baroque figures, waltzes, marches","Plainchant, opera, ragtime"], answer:0,
      explain:"Three traditions combined.", hint:"Rhythm + voice + harmony." },
    { type:"mc", q:"A blues chord progression is usually how long?", choices:["12 measures","8 measures","24 measures"], answer:0,
      explain:"Hence '12-bar blues.'", hint:"The title." },
    { type:"mc", q:"The traditional blues opens with…", choices:["four bars of the I chord","four bars of V7","two bars of IV"], answer:0,
      explain:"Four bars of the tonic.", hint:"The longest segment." },
    { type:"mc", q:"Bars 5 and 6 carry…", choices:["the IV chord","the V chord","the ii chord"], answer:0,
      explain:"The first change, two bars of it.", hint:"Up a 4th from I." },
    { type:"mc", q:"Which chord is played in bar 9?", choices:["V or V7","IV","vi"], answer:0,
      explain:"One bar of the dominant.", hint:"The V chord's moment." },
    { type:"mc", q:"Immediately after the V(7) bar comes…", choices:["one bar of IV","two bars of V","the final chord immediately"], answer:0,
      explain:"V → IV → I: the blues' signature order.", hint:"The step-down." },
    { type:"truefalse", q:"The last two bars of the traditional 12-bar blues are the I chord.", answer:true,
      explain:"I closes the form — ready to repeat.", hint:"Bars 11-12." },
    { type:"mc", q:"Complete the 12-bar blues pattern: I×4, IV×2, I×2, ___, ___, I×2.", choices:["V(7)×1, IV×1","IV×1, V×1","V×2, nothing"], answer:0,
      explain:"Bars 9 and 10 in order.", hint:"V, then IV." },
    { type:"mc", q:"A 12-bar blues in G uses…", choices:["G, C and D7","G, B and D","C, F and G7"], answer:0,
      explain:"I=G, IV=C, V7=D7.", hint:"Translate the numerals." },
    { type:"mc", q:"A 12-bar blues in B♭ uses…", choices:["B♭, E♭ and F7","B♭, C and D7","F, B♭ and C7"], answer:0,
      explain:"I=B♭, IV=E♭, V7=F7.", hint:"Count up 4 and 5 from B♭." },
    { type:"mc", q:"Why is the 12-bar blues progression important?", choices:["It is one of the most common progressions in blues, jazz, rock, and pop","It was the first progression ever written","It uses chords no other style has"], answer:0,
      explain:"Learn one pattern, play a thousand songs.", hint:"Think of how many genres use it." },
    /* generated */
    { gen:"term-match", params:{subject:"term", pool:[["I×4","the opening"],["IV×2, I×2","the middle"],["V7, IV","bars 9 and 10"],["I×2","the close"]], reverse:true}, count:3 },
    { gen:"triad-id", params:{ask:"numeral"}, count:2 },
    { gen:"inversion-id", params:{subject:"v7", ask:"position"}, count:1 }
  ],
  vocabulary:[
    {term:"The Blues", def:"Music born in America's south from West African rhythms, gospel singing and European harmonies — alive today in jazz, rock and pop."},
    {term:"Bar", def:"Another word for measure — the blues is counted in bars."},
    {term:"12-Bar Blues Progression", def:"The traditional form: I (4 bars) · IV (2) · I (2) · V or V7 (1) · IV (1) · I (2)."},
    {term:"The V→IV Descent", def:"Bars 9-10: the dominant steps DOWN through IV before landing home — a signature blues move.",
      staff:{clef:"treble",notes:[{p:"G4",d:"w",label:"V7"},{p:"B4",d:"w",chord:true},{p:"F5",d:"w",chord:true},{p:"F4",d:"w",label:"IV"},{p:"A4",d:"w",chord:true},{p:"C5",d:"w",chord:true}],width:130}}
  ],
  mistakes:[],
  summary:[
    "✔ The blues: <b>America's south</b> — West African rhythms + gospel singing + European harmonies → <b>jazz, rock, pop</b>.",
    "✔ Usually <b>12 measures ('bars')</b> long, with many variations.",
    "✔ The traditional map: <b>I×4 · IV×2 · I×2 · V(7)×1 · IV×1 · I×2</b>.",
    "✔ Only <b>three chords</b> — I, IV, V(7) — carry the whole form.",
    "✔ Translate the numerals and the blues plays in <b>every key</b>."
  ],
  tips:[
    "Count bars in groups of four: 'I-I-I-I / IV-IV-I-I / V-IV-I-I.' Twelve becomes easy.",
    "Play the bass-root walk (Game 2) every day this week — your hands will memorize the form before your head does.",
    "Listen test: put on early rock'n'roll tonight and count to twelve. You'll catch the pattern within one song.",
    "Next lesson: the blues' other secret — a special SCALE with three 'blue notes'."
  ],
  rewards:{ badge:"12-Bar Architect", icon:"\u{1F3B7}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"PERFECT! Twelve bars, zero mistakes — the bandstand awaits. \u{1F3B7}\u{1F389}",
  miaPass:"Passed! The 12-bar pattern is yours. Next: the blues SCALE…",
  mia:{
    hook:{ label:"the welcome",
      explain:"That was the traditional 12-bar blues: I×4, IV×2, I×2, V7, IV, I×2 — the most reused progression in popular music.",
      play:()=>{const F=[[48,64,67,72],[53,65,69,72],[48,64,67,72],[43,67,71,77],[53,65,69,72],[48,64,67,72]];F.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.7,i*.75,.26)));} },
    learn:{ label:"the 12-bar blues",
      explain:"Born in America's south (African rhythms + gospel + European harmony). 12 bars: I×4, IV×2, I×2, V(7), IV, I×2 — three chords total.",
      hint:"4-2-2-1-1-2.",
      play:()=>{[48,64,67,72].forEach(m=>MFAudio.tone(m,.8,0,.26));[53,65,69,72].forEach(m=>MFAudio.tone(m,.8,.9,.26));[43,67,71,77].forEach(m=>MFAudio.tone(m,.8,1.8,.26));} },
    example:{ label:"the examples",
      explain:"Example 1 charts the full C blues with bar numbers; example 2 moves the same pattern to B♭." },
    game:{ label:"the games",
      explain:"Sprint the pattern, walk the bass, spot the three chords, then assemble the segments in order.",
      hint:"Segments: 4-2-2-1-1-2." },
    quiz:{ label:"this question",
      explain:"Everything hangs on the pattern — I×4, IV×2, I×2, V(7), IV, I×2 — plus the three traditions that created the blues.",
      play:()=>{[43,67,71,77].forEach(m=>MFAudio.tone(m,.8,0,.27));[53,65,69,72].forEach(m=>MFAudio.tone(m,.8,.85,.27));[48,64,67,72].forEach(m=>MFAudio.tone(m,1,1.7,.27));} }
  }
};
