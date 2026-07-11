/* Lesson 101 — Theme and Variations (Book 4, Unit 25 — SELF-AUTHORED)
   Core: a THEME stated, then VARIATIONS that keep its identity while
   changing one dimension at a time: melodic ornamentation, rhythmic
   variation, mode change (major<->minor), harmony/texture change.
   NOTE: edit by FULL-FILE REWRITE only. */

/* which dimension changed? ear lab */
function MF_L101_ear(container,fb){
  const THEME=[[60,.5],[64,.5],[67,.5],[64,.5],[60,1.0]];
  const V={
    orn:[[60,.25],[62,.25],[64,.25],[65,.25],[67,.5],[64,.5],[60,1.0]],
    rhythm:[[60,.25],[60,.25],[64,.25],[64,.25],[67,.25],[67,.25],[64,.5],[60,.75]],
    minor:[[60,.5],[63,.5],[67,.5],[63,.5],[60,1.0]]};
  const NAME={orn:"Melodic ornamentation — extra notes decorate the line",rhythm:"Rhythmic variation — the note values changed",minor:"Mode change — major turned minor"};
  const ROUNDS=["minor","orn","rhythm"], KEY=["orn","rhythm","minor"];
  let r=0, played=false;
  container.innerHTML=`<div class="big-q l101e-q" style="text-align:center">Round 1 of 3: hear the THEME, then the variation. What changed?</div>
    <div style="text-align:center">
      <button class="play l101e-t">▶ Theme</button>
      <button class="play l101e-v">▶ Variation</button></div>
    <div class="choices l101e-ch" style="display:none"><button>Ornamentation</button><button>Rhythm</button><button>Mode (minor)</button></div>`;
  const q=container.querySelector(".l101e-q"), ch=container.querySelector(".l101e-ch");
  const play=(P)=>{ let t=0; P.forEach(([m,d])=>{ MFAudio.tone(m,d*.9,t,.42); t+=d; }); return t; };
  container.querySelector(".l101e-t").onclick=()=>play(THEME);
  container.querySelector(".l101e-v").onclick=()=>{ const w=ROUNDS[r]; if(!w) return; const d=play(V[w]); played=true; setTimeout(()=>ch.style.display="",d*1000+300); };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(!played) return;
    if(KEY[i]===ROUNDS[r]){ fb(true,"✓ "+NAME[ROUNDS[r]]+"."); r++; played=false; ch.style.display="none";
      if(r>=ROUNDS.length){ q.textContent="Excellent! Every variation dimension identified."; } else q.innerHTML=`Round ${r+1} of 3: theme, then variation — what changed?`;
    } else { MFAudio.tone(40,.2); fb(false,"Compare with the theme: extra notes? new note values? or a darker 3rd?"); }
  });
}

LESSON_CONTENT[101]={
  welcome:"Theme and variations: one idea, many suits. \u{1F3A0}",
  hook:{
    say:"<b>A simple theme, then a variation.</b> The theme is still recognizable inside it. \u{1F447} <b>What kept its identity, and what changed?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Theme</button>
          <button class="play hk-b">▶ Variation</button></div>
          <div class="choices hk-ch" style="display:none"><button>The outline stayed; extra notes decorated it</button><button>Everything changed</button><button>Nothing changed</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ [[60,.5],[64,.5],[67,.5],[64,.5],[60,1.0]].forEach(([m,d],i)=>{}); let t=0; [[60,.5],[64,.5],[67,.5],[64,.5],[60,1.0]].forEach(([m,d])=>{ MFAudio.tone(m,d*.9,t,.42); t+=d; }); hA=true; if(hB) setTimeout(()=>ch.style.display="",3200); };
        container.querySelector(".hk-b").onclick=()=>{ let t=0; [[60,.25],[62,.25],[64,.25],[65,.25],[67,.5],[65,.25],[64,.25],[60,1.0]].forEach(([m,d])=>{ MFAudio.tone(m,d*.9,t,.42); t+=d; }); hB=true; if(hA) setTimeout(()=>ch.style.display="",2900); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ The C-E-G-E-C outline survived; passing tones decorated the path. THEME AND VARIATIONS: keep the identity, change the dress. Today's lesson!");
          else fb(false,"Hum both — the same core structure lives in each…");
        });
      } }
  },
  objectives:[
    "Define theme and variations: a theme stated, then transformed repeatedly",
    "Keep the theme's identity while changing one dimension",
    "Vary by MELODIC ORNAMENTATION (added notes)",
    "Vary by RHYTHM (new note values, new meter)",
    "Vary by MODE (major ↔ minor), harmony or texture",
    "Hear which dimension a variation changed"
  ],
  steps:[
    { say:"<b>The Form:</b> a <b>THEME</b> (usually a small binary tune) is stated plainly, then <b>VARIATIONS</b> restate it transformed: Theme, Var. 1, Var. 2, … Each variation keeps the theme <b>recognizable</b>. \u{1F447} <b>The form's plan is…</b>",
      try:{ type:"mc", choices:["Theme, then transformed restatements","One long melody","Verse and chorus"], answer:0,
        success:"✓ A A\u{2032} A\u{2033} A\u{2034}… — one identity, many suits.",
        fail:"What returned, changed, each time?",
        hint:"The theme, again and again." } },
    { say:"<b>What Stays:</b> variations usually preserve the theme's <b>length, phrase structure and harmonic outline</b> — the core structure — while resurfacing everything else. \u{1F447} <b>A variation usually keeps the theme's…</b>",
      try:{ type:"mc", choices:["Length and harmonic outline","Exact notes only","Nothing"], answer:0,
        success:"✓ The frame holds; the surface transforms.",
        fail:"What made the hook's variation recognizable?",
        hint:"The core structure." } },
    { say:"<b>Melodic Ornamentation:</b> the commonest variation — <b>decorate the theme's notes</b> with passing tones, neighbors and Lesson 100's ornaments; the outline shines through the filigree. \u{1F447} <b>An ornamented variation adds…</b>",
      try:{ type:"mc", choices:["Extra notes around the theme's tones","A new theme","Silence"], answer:0,
        success:"✓ The theme wears jewelry — L66 and L100 at work.",
        fail:"What filled the gaps between theme notes?",
        hint:"Decorations." } },
    { say:"<b>Rhythmic Variation:</b> change the <b>note values</b> (even → dotted, quarters → running sixteenths) or even the <b>meter</b> (2/4 theme → 3/8 variation). Pitches survive; time transforms. \u{1F447} <b>A rhythmic variation changes…</b>",
      try:{ type:"mc", choices:["Durations (and possibly the meter)","Only the pitches","The instrument"], answer:0,
        success:"✓ Same pitch outline, new engine.",
        fail:"Which dimension is rhythm?",
        hint:"Time, not pitch." } },
    { say:"<b>Mode, Harmony & Texture:</b> the <b>minore</b> variation (major theme turned minor) is a classic; others reharmonize the outline or change texture — theme in the bass, theme in canon. <b>Remember: one dimension at a time keeps the theme audible.</b> \u{1F447} <b>A 'minore' variation changes the theme's…</b>",
      try:{ type:"mc", choices:["Mode — major to minor","Length","Title only"], answer:0,
        success:"✓ The 3rd darkens; the identity survives.",
        fail:"Minore = …",
        hint:"E becomes E♭." } },
    { say:"Which dimension changed? \u{1F447}",
      try:{ type:"custom",
        hint:"Extra notes = ornamentation · new values = rhythm · darker 3rd = mode.",
        mount:(container,fb)=>MF_L101_ear(container,fb) } },
    { say:"<b>Review:</b> \u{1F447} <b>Why can listeners follow a good set of variations?</b>",
      try:{ type:"mc", choices:["Each variation keeps the theme's core structure recognizable","The variations are identical","The theme never returns"], answer:0,
        success:"✓ Identity + transformation — the form's contract with the ear.",
        fail:"What thread runs through every variation?",
        hint:"The core structure." } }
  ],
  examples:[
    { caption:"Theme (C-E-G-E-C outline), then an ornamented variation: passing tones fill the 3rds; the core structure is untouched.",
      staff:{clef:"treble",tempo:88,notes:[
        {p:"C4",d:"q",label:"theme"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"E4",d:"q"},{p:"C4",d:"h"},{bar:"single"},
        {p:"C4",d:"8",label:"var. 1"},{p:"D4",d:"8"},{p:"E4",d:"8"},{p:"F4",d:"8"},{p:"G4",d:"q"},{p:"F4",d:"8"},{p:"E4",d:"8"},{p:"C4",d:"h"},{bar:"final"}],
        beams:[[6,9],[11,12]],width:660},
      kb:{start:48,octaves:2,labels:true} },
    { caption:"The minore variation: the same outline with E♭ — one changed 3rd recolors everything.",
      staff:{clef:"treble",tempo:88,notes:[
        {p:"C4",d:"q"},{p:"Eb4",d:"q",label:"minore"},{p:"G4",d:"q"},{p:"Eb4",d:"q"},{p:"C4",d:"h"},{bar:"final"}],width:440},
      kb:{start:48,octaves:1,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Variation Sprint (45s)",
      intro:"Dimensions and devices — race them!",
      miaIntro:"Keep the core structure! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Theme and variations","theme + transformed restatements"],
        ["What stays","length + harmonic outline"],
        ["Melodic ornamentation","extra notes decorate the theme"],
        ["Rhythmic variation","new note values or meter"],
        ["Minore variation","major theme turned minor"],
        ["Texture variation","theme moves voice or becomes canon"],
        ["The listener's thread","the recognizable core structure"],
        ["Typical theme","a small binary tune"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — variation master!":null },
    { type:"key-climb", title:"Game 2 · Theme, Then Ornament It",
      intro:"Play the theme C-E-G-E-C, then its filled-in variation!",
      miaIntro:"Core structure, then ornament! \u{1FA9C}",
      spec:{seq:[60,64,67,64,60, 60,62,64,65,67,65,64,62,60],
        names:["C","E","G","E","C (theme)","C","D","E","F","G","F","E","D","C (ornamented!)"],
        start:60, octaves:1, title:"Theme and one variation"},
      result:(score)=>score!==null?"Both versions performed!":null },
    { type:"order-tap", title:"Game 3 · Assemble the Set",
      intro:"Tap a variation set's parts in order!",
      miaIntro:"Theme first! \u{1F3C1}",
      spec:{sequence:["Theme — stated plainly","Variation 1 — ornamented","Variation 2 — new rhythm","Variation 3 — minore","Final variation — brilliant finish"],
        title:"One variation set"},
      result:(stars)=>stars>=2?"The set, in order!":null },
    { type:"term-race", title:"Game 4 · Which Dimension?",
      intro:"Description → dimension, at speed!",
      miaIntro:"What changed? \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Sixteenth notes flood the tune","rhythmic variation"],
        ["Passing tones fill the 3rds","ornamentation"],
        ["E becomes E♭ throughout","mode (minore)"],
        ["Theme sinks into the bass","texture change"],
        ["2/4 becomes 3/8","meter variation"],
        ["New chords under old notes","reharmonization"],
        ["What every variation keeps","the core structure"],
        ["Changing everything at once","loses the theme"]]},
      result:(score)=>score>=6?"Dimensions sorted!":null }
  ],
  practiceIntro:"20 practice questions — dimensions, devices and the core structure. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Theme","stated plainly first"],["Variation","transformed restatement"],["Ornamentation","added notes"],["Minore","major→minor"],["Core Structure","what survives"]], reverse:true}, count:6 },
    { gen:"rhythm-count", params:{}, count:2 },
    { type:"mc", q:"A theme-and-variations set begins with…", choices:["the plain theme","the loudest variation","a cadenza"], answer:0, explain:"State it, then transform it." },
    { type:"mc", q:"Variations usually preserve the theme's…", choices:["length and harmonic outline","dynamics only","title"], answer:0, explain:"The core structure holds." },
    { type:"mc", q:"An ornamented variation uses…", choices:["passing tones, neighbors and ornaments","silence","a new key only"], answer:0, explain:"L66 + L100 devices." },
    { type:"mc", q:"A minore variation changes the theme's…", choices:["mode","meter","length"], answer:0, explain:"Major to minor." },
    { type:"truefalse", q:"A good variation changes every dimension at once.", answer:false, explain:"One at a time keeps the theme audible." },
    { type:"truefalse", q:"Rhythmic variation can change the meter.", answer:true, explain:"2/4 → 3/8 is classic." },
    { type:"truefalse", q:"The theme must stay recognizable in each variation.", answer:true, explain:"The form's contract." },
    { gen:"term-match", params:{subject:"term", pool:[["Var. in canon","texture"],["Dotted-rhythm var.","rhythm"],["Filigree var.","ornamentation"],["E♭ for E","minore"]], reverse:true}, count:3 },
    { gen:"triad-quality", params:{quals:["M","m"]}, count:2 }
  ],
  vocabulary:[
    {term:"Theme and Variations", def:"A theme stated plainly, then restated in successive transformations — A A\u{2032} A\u{2033}…"},
    {term:"Core Structure", def:"What survives every variation: length, phrase structure, harmonic outline."},
    {term:"Ornamented / Rhythmic Variation", def:"Added decorations around the theme's tones; or new note values and meters under its pitches."},
    {term:"Minore Variation", def:"The major theme recast in minor — one changed 3rd, a whole new color."}
  ],
  mistakes:[],
  summary:[
    "✔ Plan: <b>theme → transformed restatements</b>.",
    "✔ The <b>core structure</b> (length, phrases, harmony) survives every variation.",
    "✔ Dimensions: <b>ornamentation · rhythm/meter · mode · harmony · texture</b>.",
    "✔ One dimension at a time keeps the theme audible.",
    "✔ Hearing a variation = asking <b>what changed?</b>"
  ],
  tips:[
    "Write your own: take L67's composed melody, add passing tones (var. 1), dot the rhythm (var. 2), turn it minor (var. 3).",
    "In classical sets, the last variation often speeds up brilliantly and the minore sits near the middle.",
    "Variation hearing is structure hearing — hum the theme UNDER each variation.",
    "Next lesson: the largest form yet — SONATA FORM."
  ],
  rewards:{ badge:"Transformer", icon:"\u{1F3A0}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaQuizIntro:"Quiz! Core structure stays, surface transforms.",
  quiz:[
    { type:"mc", q:"Theme and variations is best described as…", choices:["a theme, then transformed restatements","two contrasting sections","a fugue"], answer:0, explain:"A A\u{2032} A\u{2033}…", hint:"One identity." },
    { type:"mc", q:"What typically survives every variation?", choices:["Length, phrasing and harmonic outline","The exact notes","Nothing"], answer:0, explain:"The core structure.", hint:"The frame." },
    { type:"mc", q:"Passing tones and trills all over the theme make…", choices:["an ornamented variation","a minore variation","a meter change"], answer:0, explain:"Melodic decoration.", hint:"Jewelry." },
    { type:"mc", q:"Quarters become running sixteenths. The variation is…", choices:["rhythmic","modal","textural"], answer:0, explain:"New values, same pitches.", hint:"Time changed." },
    { type:"mc", q:"The minore variation…", choices:["turns the major theme minor","removes the theme","doubles the tempo"], answer:0, explain:"E→E♭ and cousins.", hint:"Darker 3rd." },
    { type:"mc", q:"The theme moves into the bass with new figuration above. The dimension is…", choices:["texture","mode","length"], answer:0, explain:"Who carries the tune.", hint:"Layers." },
    { type:"truefalse", q:"Variations may change the meter.", answer:true, explain:"A classic rhythmic transformation.", hint:"2/4 → 3/8." },
    { type:"truefalse", q:"The theme of a variation set is usually stated last.", answer:false, explain:"FIRST — then transformed.", hint:"State, then vary." },
    { type:"mc", q:"Why change only one dimension per variation?", choices:["So the theme stays recognizable","To save paper","No reason"], answer:0, explain:"Identity + transformation.", hint:"The contract." },
    { type:"mc", q:"You hear the theme's outline with E♭ instead of E. The variation is…", choices:["minore","ornamented","rhythmic"], answer:0, explain:"Mode change.", hint:"One dark note." },
    { type:"mc", q:"Which earlier lessons power the ornamented variation?", choices:["L66 (non-chord tones) and L100 (ornaments)","L70 (blues)","L84 (transposition)"], answer:0, explain:"Decoration toolkits.", hint:"The decorators." },
    { type:"mc", q:"The listener's test for any variation:", choices:["'What changed — and can I still hum the theme?'","'How loud is it?'","'Which clef?'"], answer:0, explain:"Core structure first.", hint:"Two questions." }
  ],
  miaPerfect:"PERFECT! One theme, endless suits — all traced. \u{1F3A0}\u{1F389}",
  miaPass:"Passed! Transformation with identity. Next: sonata form…",
  mia:{
    hook:{ label:"the welcome",
      explain:"The variation decorated the C-E-G-E-C core structure with passing tones — identity kept, surface changed.",
      play:()=>{let t=0;[[60,.25],[62,.25],[64,.25],[65,.25],[67,.5],[65,.25],[64,.25],[60,1.0]].forEach(([m,d])=>{MFAudio.tone(m,d*.9,t,.42);t+=d;});} },
    learn:{ label:"theme and variations",
      explain:"Theme stated, then transformed: ornamentation, rhythm/meter, mode (minore), harmony, texture — one dimension at a time over a surviving core structure.",
      hint:"What changed?",
      play:()=>{let t=0;[[60,.5],[63,.5],[67,.5],[63,.5],[60,1.0]].forEach(([m,d])=>{MFAudio.tone(m,d*.9,t,.42);t+=d;});} },
    example:{ label:"the examples",
      explain:"Example 1 states the theme and ornaments it; example 2 recolors it minore." },
    game:{ label:"the games",
      explain:"Sprint the dimensions, play theme-plus-variation, order a set, then name what changed.",
      hint:"Hum the theme outline." },
    quiz:{ label:"this question",
      explain:"Every variation question reduces to: which single dimension moved — notes added, time changed, mode darkened, texture shifted?",
      play:()=>{let t=0;[[60,.25],[60,.25],[64,.25],[64,.25],[67,.5]].forEach(([m,d])=>{MFAudio.tone(m,d*.9,t,.4);t+=d;});} }
  }
};
