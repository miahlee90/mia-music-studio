/* Lesson 86 — Roman Numeral Analysis (Book 4, Unit 21 — SELF-AUTHORED)
   Core: numerals name each chord's DEGREE + QUALITY, portable to any key.
   HARMONIC FUNCTION: Tonic (I, vi) = rest · Predominant (ii, IV) = motion
   toward D · Dominant (V, vii°) = tension seeking T. Flow: T → PD → D → T.
   Color code: T = blue #2F6DA8 · PD = gold #A9821F · D = orange #C05A21.
   NOTE: edit by FULL-FILE REWRITE only. */

/* label the progression: hear 4 chords, pick the numeral for each */
function MF_L86_label(container,fb){
  const CH={I:[60,64,67],ii:[62,65,69],IV:[65,69,72],V:[67,71,74],vi:[69,72,76]};
  const PROG=["I","IV","V","I"], PROG2=["I","vi","ii","V"];
  let stage=0, k=0, cur=PROG;
  container.innerHTML=`<div class="big-q l86l-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l86l-play">▶ Hear chord</button></div>
    <div class="choices chips l86l-ch"><button>I</button><button>ii</button><button>IV</button><button>V</button><button>vi</button></div>
    <div class="l86l-map" style="text-align:center;font-weight:800;letter-spacing:4px;margin-top:6px"></div>`;
  const q=container.querySelector(".l86l-q"), pl=container.querySelector(".l86l-play"), ch=container.querySelector(".l86l-ch"), map=container.querySelector(".l86l-map");
  const done=[];
  function draw(){ map.textContent=cur.map((c,i)=>i<done.length?done[i]:"·").join("  "); }
  function ask(){
    draw();
    if(k>=cur.length){
      if(stage===0){ stage=1; cur=PROG2; k=0; done.length=0; fb(true,"✓ I-IV-V-I labeled! Now a longer trip: listen for the vi and ii."); setTimeout(ask,1500); return; }
      q.textContent="Excellent! Both progressions analyzed."; pl.style.display="none"; ch.style.display="none"; return;
    }
    q.innerHTML=`Progression ${stage+1} — chord ${k+1} of 4. Hear it, then choose its numeral. <i>(Key: C major)</i>`;
  }
  pl.onclick=()=>{ if(k>=cur.length) return; CH[cur[k]].forEach(m=>MFAudio.tone(m,.9,.05,.3)); };
  [...ch.children].forEach(b=>b.onclick=()=>{
    if(k>=cur.length) return;
    if(b.textContent===cur[k]){ CH[cur[k]].forEach(m=>MFAudio.tone(m,.7,.05,.28)); done.push(cur[k]); k++;
      fb(true,`✓ ${done[done.length-1]} — correct.`); setTimeout(ask,900);
    } else { MFAudio.tone(40,.2); fb(false,"Listen again — compare the bass note with the C major scale degrees."); }
  });
  ask();
}

LESSON_CONTENT[86]={
  welcome:"Roman numeral analysis: harmony's universal language. \u{1F3DB}\u{FE0F}",
  hook:{
    say:"<b>Two songs in two different keys can be THE SAME progression.</b> Listen: one in C, one in G. \u{1F447} <b>What do they share?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ In C major</button>
          <button class="play hk-b">▶ In G major</button></div>
          <div class="choices hk-ch" style="display:none"><button>The same numerals: I-IV-V-I</button><button>The same exact notes</button><button>Nothing at all</button></div>`;
        const A=[[60,64,67],[65,69,72],[67,71,74],[60,64,67]], B=[[67,71,74],[72,76,79],[74,78,81],[67,71,74]];
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ A.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.7,i*.75,.28))); hA=true; if(hB) setTimeout(()=>ch.style.display="",3400); };
        container.querySelector(".hk-b").onclick=()=>{ B.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.7,i*.75,.28))); hB=true; if(hA) setTimeout(()=>ch.style.display="",3400); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Different notes, same STORY: I-IV-V-I in both keys. Roman numerals capture what keys share — today's lesson!");
          else fb(false,"The notes differed (C vs G major) — but the RELATIONSHIPS matched. What language describes relationships?");
        });
      } }
  },
  objectives:[
    "Analyze chords with Roman numerals: degree + quality in one symbol",
    "Know why numerals are portable across keys",
    "Assign each triad a FUNCTION: Tonic, Predominant or Dominant",
    "Follow the function flow: T → PD → D → T",
    "Label progressions by ear and by eye",
    "Read function colors: T = blue, PD = gold, D = orange"
  ],
  steps:[
    { say:"<b>Roman Numeral Analysis:</b> a numeral names the chord's <b>scale degree</b> (the number) and its <b>quality</b> (the case). \u{201C}IV in C\u{201D} = the major triad on F. Because numerals speak in degrees, <b>one analysis fits every key</b>. \u{1F447} <b>What does a Roman numeral tell you?</b>",
      try:{ type:"mc", choices:["The chord's degree and quality","The tempo","The lyrics"], answer:0,
        success:"✓ Degree + quality in one compact symbol — harmony's shorthand.",
        fail:"Number AND case…",
        hint:"Two facts per symbol." } },
    { say:"<b>Harmonic Function:</b> chords do <b>jobs</b>. <b style='color:#2F6DA8'>TONIC (T)</b> — rest and home: <b>I</b> and <b>vi</b> · <b style='color:#A9821F'>PREDOMINANT (PD)</b> — motion toward the dominant: <b>ii</b> and <b>IV</b> · <b style='color:#C05A21'>DOMINANT (D)</b> — tension that seeks home: <b>V</b> and <b>vii°</b>. \u{1F447} <b>Which chords share the DOMINANT job?</b>",
      show:{ type:"html", html:`<table style="border-collapse:collapse;margin:0 auto;font-size:14.5px;min-width:300px">
        <tr><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Function</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Job</th><th style="border:1.5px solid #cdd5e1;background:#eef1ff;padding:6px 14px">Chords</th></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;font-weight:800;color:#2F6DA8">Tonic (T)</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px">rest, home</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800;color:#2F6DA8">I · vi</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;font-weight:800;color:#A9821F">Predominant (PD)</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px">moves toward D</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800;color:#A9821F">ii · IV</td></tr>
        <tr><td style="border:1.5px solid #cdd5e1;padding:4px 14px;font-weight:800;color:#C05A21">Dominant (D)</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px">tension, seeks home</td><td style="border:1.5px solid #cdd5e1;padding:4px 14px;text-align:center;font-weight:800;color:#C05A21">V · vii°</td></tr></table>` },
      try:{ type:"mc", choices:["V and vii°","I and vi","ii and IV"], answer:0,
        success:"✓ V and vii° both carry the leading tone — the tension engine.",
        fail:"Which two chords contain the leading tone?",
        hint:"Degree 5 and degree 7." } },
    { say:"<b>The Function Flow:</b> most tonal music cycles <b style='color:#2F6DA8'>T</b> → <b style='color:#A9821F'>PD</b> → <b style='color:#C05A21'>D</b> → <b style='color:#2F6DA8'>T</b>: home, departure, tension, return. I-IV-V-I and I-ii-V-I both walk this exact path. \u{1F447} <b>What usually comes between predominant and tonic?</b>",
      show:{ type:"html", html:`<div style="text-align:center;font-weight:800;font-size:17px;letter-spacing:1px">
        <span style="color:#2F6DA8">T</span> \u{2192} <span style="color:#A9821F">PD</span> \u{2192} <span style="color:#C05A21">D</span> \u{2192} <span style="color:#2F6DA8">T</span></div>` },
      try:{ type:"mc", choices:["The dominant — tension before the return","Another tonic","Silence"], answer:0,
        success:"✓ PD hands off to D; D resolves to T. The cycle of tonal harmony.",
        fail:"Follow the arrows…",
        hint:"PD → ? → T." } },
    { say:"<b>Analyzing on the Staff:</b> to label a chord — <b>1)</b> find its root, <b>2)</b> count the root's scale degree, <b>3)</b> write the numeral in the correct case. <b>Remember: T = I, vi · PD = ii, IV · D = V, vii°.</b> \u{1F447} <b>In C major, the chord F-A-C is…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:80,notes:[
        {p:"C4",d:"h",label:"I"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"F4",d:"h",label:"?"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"G4",d:"h",label:"V"},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},
        {p:"C4",d:"w",label:"I"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{bar:"final"}],width:560} },
      try:{ type:"mc", choices:["IV — major triad on degree 4","iv","ii"], answer:0,
        success:"✓ Root F = degree 4; major quality = uppercase IV. Function: predominant.",
        fail:"F is which degree of C major?",
        hint:"C-D-E-F: count." } },
    { say:"Label two progressions by ear. \u{1F447}",
      try:{ type:"custom",
        hint:"Track the bass: C=I, D=ii, F=IV, G=V, A=vi.",
        mount:(container,fb)=>MF_L86_label(container,fb) } },
    { say:"<b>Why Numerals Travel:</b> \u{201C}I-vi-IV-V\u{201D} describes thousands of songs at once — in ANY key. Chord letters (C, Am, F, G) name one key's version; numerals name them all. \u{1F447} <b>I-vi-IV-V in G major is…</b>",
      try:{ type:"mc", choices:["G - Em - C - D","G - Gm - C - D","C - Am - F - G"], answer:0,
        success:"✓ Same numerals, G major's letters: G-Em-C-D.",
        fail:"Translate each degree into G major…",
        hint:"Degree 6 of G = E." } },
    { say:"<b>Review:</b> \u{1F447} <b>Which numeral set is entirely PREDOMINANT?</b>",
      try:{ type:"mc", choices:["ii and IV","I and vi","V and vii°"], answer:0,
        success:"✓ ii and IV — the bridge from home to tension.",
        fail:"PD moves TOWARD the dominant…",
        hint:"The gold column." } }
  ],
  examples:[
    { caption:"I-IV-V7-I in C major with its analysis — hear T (home), PD (departure), D (tension), T (return).",
      staff:{clef:"treble",tempo:80,notes:[
        {p:"C4",d:"h",label:"I"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"F4",d:"h",label:"IV"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"G4",d:"h",label:"V7"},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},{p:"F5",d:"h",chord:true},
        {p:"C4",d:"w",label:"I"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"C5",d:"w",chord:true},{bar:"final"}],width:600},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"I-vi-ii-V — the classic turnaround: two tonics' worth of rest, then predominant and dominant hand in hand back to the top.",
      staff:{clef:"treble",tempo:80,notes:[
        {p:"C4",d:"h",label:"I"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"A3",d:"h",label:"vi"},{p:"C4",d:"h",chord:true},{p:"E4",d:"h",chord:true},
        {p:"D4",d:"h",label:"ii"},{p:"F4",d:"h",chord:true},{p:"A4",d:"h",chord:true},
        {p:"G4",d:"w",label:"V"},{p:"B4",d:"w",chord:true},{p:"D5",d:"w",chord:true},{bar:"final"}],width:600},
      kb:{start:45,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Function Sprint (45s)",
      intro:"Numerals to functions — race the assignments!",
      miaIntro:"T, PD or D! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["I","tonic function"],
        ["vi","tonic function (substitute)"],
        ["ii","predominant function"],
        ["IV","predominant function"],
        ["V","dominant function"],
        ["vii°","dominant function (substitute)"],
        ["The flow","T \u{2192} PD \u{2192} D \u{2192} T"],
        ["Numerals are portable because","they speak in degrees"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — functions assigned!":null },
    { type:"symbol-hunt", title:"Game 2 · Numeral Spotter",
      intro:"Chords in C major — click the numeral each round names!",
      miaIntro:"Root → degree → case! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"I (C-E-G)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:150}},
        {label:"ii (D-F-A)", spec:{clef:"treble",notes:[{p:"D4",d:"w"},{p:"F4",d:"w",chord:true},{p:"A4",d:"w",chord:true}],width:150}},
        {label:"V (G-B-D)", spec:{clef:"treble",notes:[{p:"G4",d:"w"},{p:"B4",d:"w",chord:true},{p:"D5",d:"w",chord:true}],width:150}},
        {label:"vi (A-C-E)", spec:{clef:"treble",notes:[{p:"A4",d:"w"},{p:"C5",d:"w",chord:true},{p:"E5",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Numerals spotted on sight!":null },
    { type:"order-tap", title:"Game 3 · Walk the Function Flow",
      intro:"Tap the harmonic journey in order!",
      miaIntro:"Home, departure, tension, home! \u{1F3C1}",
      spec:{sequence:["Tonic — home (I)","Predominant — departure (IV or ii)","Dominant — tension (V)","Tonic — return (I)"],
        title:"The tonal cycle"},
      result:(stars)=>stars>=2?"The cycle walks itself now!":null },
    { type:"term-race", title:"Game 4 · Translate the Numerals",
      intro:"I-vi-IV-V into letters, key by key — at speed!",
      miaIntro:"Degrees into letters! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["I in G major","G"],
        ["vi in G major","Em"],
        ["IV in G major","C"],
        ["V in G major","D"],
        ["I in F major","F"],
        ["vi in F major","Dm"],
        ["IV in F major","B\u{266D}"],
        ["V in F major","C"]]},
      result:(score)=>score>=6?"Numerals translated everywhere!":null }
  ],
  practiceIntro:"20 practice questions — numerals, functions and the flow. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["I, vi","tonic"],["ii, IV","predominant"],["V, vii°","dominant"],["T\u{2192}PD\u{2192}D\u{2192}T","the flow"],["Numeral case","quality"]], reverse:true}, count:6 },
    { gen:"triad-id", params:{ask:"numeral"}, count:3 },
    { type:"mc", q:"A Roman numeral shows a chord's…", choices:["degree and quality","volume","tempo"], answer:0,
      explain:"Number + case." },
    { type:"mc", q:"The tonic-function chords are…", choices:["I and vi","ii and IV","V and vii°"], answer:0,
      explain:"Home and its substitute." },
    { type:"mc", q:"The predominant chords are…", choices:["ii and IV","I and V","iii and vii°"], answer:0,
      explain:"They move toward the dominant." },
    { type:"mc", q:"The usual function order is…", choices:["T → PD → D → T","D → PD → T","PD → T → D"], answer:0,
      explain:"Home, departure, tension, return." },
    { type:"truefalse", q:"V and vii° share the dominant function.", answer:true,
      explain:"Both carry the leading tone." },
    { type:"truefalse", q:"Roman numerals only work in C major.", answer:false,
      explain:"They are portable to every key — that is the point." },
    { type:"truefalse", q:"vi can substitute for I as a tonic-function chord.", answer:true,
      explain:"It shares two notes with I." },
    { gen:"triad-id", params:{ask:"numeral"}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 }
  ],
  vocabulary:[
    {term:"Roman Numeral Analysis", def:"Labeling each chord by scale degree (number) and quality (case) — portable to every key."},
    {term:"Tonic Function (T)", def:"Rest and home: I, with vi as substitute."},
    {term:"Predominant Function (PD)", def:"Motion toward the dominant: ii and IV."},
    {term:"Dominant Function (D)", def:"Tension seeking home: V and vii° — both carry the leading tone."}
  ],
  mistakes:[],
  summary:[
    "✔ Numeral = <b>degree + quality</b>; one analysis fits <b>every key</b>.",
    "✔ Functions: <b style='color:#2F6DA8'>T = I, vi</b> · <b style='color:#A9821F'>PD = ii, IV</b> · <b style='color:#C05A21'>D = V, vii°</b>.",
    "✔ The flow: <b>T → PD → D → T</b> — home, departure, tension, return.",
    "✔ To analyze: root → degree → case.",
    "✔ I-vi-IV-V describes thousands of songs in one line."
  ],
  tips:[
    "Analyze the bass line first — roots usually live there, and degrees follow.",
    "When a progression feels 'stuck at home,' look for vi masquerading as tonic.",
    "Translate one favorite song into numerals this week — then play it in three keys from the numerals alone.",
    "Next lesson: where progressions STOP — the cadences."
  ],
  rewards:{ badge:"Harmony Analyst", icon:"\u{1F3DB}\u{FE0F}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Root → degree → case → function.",
  quiz:[
    { type:"mc", q:"What two facts does a Roman numeral encode?", choices:["Scale degree and chord quality","Tempo and dynamics","Key and meter"], answer:0,
      explain:"Number + case.", hint:"Two in one." },
    { type:"mc", q:"Why do numerals work in every key?", choices:["They describe degrees, not fixed notes","They ignore the music","They only work in C"], answer:0,
      explain:"Degrees are key-independent.", hint:"Relationships, not letters." },
    { type:"mc", q:"The three harmonic functions are…", choices:["tonic, predominant, dominant","loud, soft, medium","fast, slow, moderate"], answer:0,
      explain:"T, PD, D.", hint:"Home, bridge, tension." },
    { type:"mc", q:"Which chords carry TONIC function?", choices:["I and vi","ii and IV","V and vii°"], answer:0,
      explain:"Home plus its substitute.", hint:"The blue pair." },
    { type:"mc", q:"Which chords carry PREDOMINANT function?", choices:["ii and IV","I and V","vi and vii°"], answer:0,
      explain:"The bridge to the dominant.", hint:"The gold pair." },
    { type:"mc", q:"Which chords carry DOMINANT function?", choices:["V and vii°","I and IV","ii and vi"], answer:0,
      explain:"Leading-tone carriers.", hint:"The orange pair." },
    { type:"mc", q:"The standard function flow is…", choices:["T → PD → D → T","D → T → PD","PD → D → PD"], answer:0,
      explain:"Home, departure, tension, return.", hint:"Ends where it starts." },
    { type:"mc", q:"In C major, label the chord.",
      staff:{clef:"treble",notes:[{p:"D4",d:"w"},{p:"F4",d:"w",chord:true},{p:"A4",d:"w",chord:true}],width:160},
      choices:["ii — minor, predominant","II — major","IV"], answer:0,
      explain:"Root D = degree 2, minor = lowercase.", hint:"Root first." },
    { type:"mc", q:"I-vi-IV-V in F major reads…", choices:["F - Dm - B♭ - C","F - D - B - C","C - Am - F - G"], answer:0,
      explain:"Degrees 1, 6, 4, 5 of F major.", hint:"F major has B♭." },
    { type:"truefalse", q:"vi shares tonic function with I.", answer:true,
      explain:"Two common tones make it the tonic substitute.", hint:"A-C-E vs C-E-G." },
    { type:"truefalse", q:"IV has dominant function.", answer:false,
      explain:"IV is predominant — it precedes the dominant.", hint:"The gold column." },
    { type:"mc", q:"A progression runs I → IV → V → I. Its function story is…", choices:["T → PD → D → T","T → D → PD → T","all tonic"], answer:0,
      explain:"T→PD→D→T — the standard function cycle.", hint:"Map each numeral." }
  ],
  miaPerfect:"PERFECT! Degrees, cases, functions — analysis complete. \u{1F3DB}\u{FE0F}\u{1F389}",
  miaPass:"Passed! You read harmony's universal language. Next: cadences…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Both versions played I-IV-V-I — different keys, identical numerals. Roman numerals name what keys share.",
      play:()=>{const B=[[67,71,74],[72,76,79],[74,78,81],[67,71,74]];B.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.7,i*.75,.28)));} },
    learn:{ label:"Roman numeral analysis",
      explain:"Numeral = degree + quality, portable everywhere. Functions: T (I, vi), PD (ii, IV), D (V, vii°); flow T→PD→D→T.",
      hint:"Root → degree → case → function.",
      play:()=>{[[60,64,67],[65,69,72],[67,71,74],[60,64,67]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.6,i*.65,.28)));} },
    example:{ label:"the examples",
      explain:"Example 1 analyzes I-IV-V7-I; example 2 walks the I-vi-ii-V turnaround — hear each function do its job." },
    game:{ label:"the games",
      explain:"Sprint the functions, spot numerals on cards, walk the cycle in order, then translate numerals across keys.",
      hint:"T blue, PD gold, D orange." },
    quiz:{ label:"this question",
      explain:"Four steps solve everything: find the root, count its degree, set the case, assign the function.",
      play:()=>{[[62,65,69],[67,71,74],[60,64,67]].forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.6,i*.65,.28)));} }
  }
};
