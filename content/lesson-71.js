/* Lesson 71 — The Blues Scale (AEMT Book 3, Unit 17 FINALE)
   Built from drafts/UNIT 17 – Lesson 71.md; AEMT3 p.111 verified by render.
   Core: the blues sound = the progression (L70) + a unique SCALE. The BLUES
   SCALE has only 7 notes with a flatted 3rd, 5th and 7th — the BLUE NOTES.
   Recipe from major: 1) remove degrees 2 and 6; 2) flat the 3rd and 7th;
   3) add a flatted 5th. C blues: C-E♭-F-G♭-G-B♭-C. IMPROVISING = to
   spontaneously create a unique solo.
   NOTE: edit by FULL-FILE REWRITE only. */

/* scale surgery: major → blues in three operations */
function MF_L71_convert(container,fb){
  let phase=0, removed=[], flatted=[];
  container.innerHTML=`<div class="big-q l71c-q" style="text-align:center"></div>
    <div class="l71c-staff"></div>
    <div style="text-align:center"><button class="play l71c-add" style="display:none">➕ Add the flatted 5th (G♭)</button></div>`;
  const q=container.querySelector(".l71c-q"), holder=container.querySelector(".l71c-staff"), addBtn=container.querySelector(".l71c-add");
  function currentNotes(){
    if(phase===0||phase===1){
      const base=[["C4",1],["D4",2],["E4",3],["F4",4],["G4",5],["A4",6],["B4",7],["C5",8]];
      return base.filter(([p,d])=>!removed.includes(d)).map(([p,d])=>{
        let pp=p;
        if(flatted.includes(d)) pp=p[0]+"b"+p[1];
        return {p:pp, d:"q", label:String(d===8?1:d), deg:d};
      });
    }
    return [{p:"C4",d:"q",label:"R"},{p:"Eb4",d:"q",label:"♭3"},{p:"F4",d:"q",label:"4"},{p:"Gb4",d:"q",label:"♭5"},{p:"G4",d:"q",label:"5"},{p:"Bb4",d:"q",label:"♭7"},{p:"C5",d:"q",label:"R"}];
  }
  function draw(clickable){
    const notes=currentNotes();
    Staff.render(holder,{clef:"treble",notes:notes.map(n=>({p:n.p,d:n.d,label:n.label})),width:520,clickNotes:clickable,
      onNote: clickable? (i,p)=>{
        MFAudio.tone(MFAudio.midi(p),.5,0,.4);
        const n=notes[i];
        if(phase===0){
          if(n.deg===2||n.deg===6){
            if(!removed.includes(n.deg)){ removed.push(n.deg); MFAudio.yay();
              if(removed.length<2){ q.innerHTML="✓ Gone! One more to remove…"; draw(true); }
              else { fb(true,"✓ Degrees 2 and 6 removed — operation 1 complete. Now operation 2: FLAT the 3rd and the 7th (tap them)."); phase=1; q.innerHTML="Operation 2: tap the <b>3rd</b> and the <b>7th</b> to flat them."; draw(true); } }
          } else fb(false,`Keep degree ${n.deg===8?1:n.deg} — operation 1 removes only the 2nd and the 6th.`);
        } else if(phase===1){
          if((n.deg===3||n.deg===7)&&!flatted.includes(n.deg)){
            flatted.push(n.deg); MFAudio.yay();
            MFAudio.tone(MFAudio.midi(n.p[0]+"b"+n.p[n.p.length-1]),.6,.1,.42);
            if(flatted.length<2){ q.innerHTML="✓ Flatted! One more…"; draw(true); }
            else { fb(true,"✓ E→E♭ and B→B♭ — operation 2 complete. One thing missing: operation 3 adds a brand-new note!");
              q.innerHTML="Operation 3: press the button to add the <b>flatted 5th</b>."; draw(false); addBtn.style.display="inline-block"; }
          } else if(n.deg===3||n.deg===7) q.innerHTML="Already flatted — get the other one!";
          else fb(false,`Degree ${n.deg===8?1:n.deg} stays natural — flat only the 3rd and the 7th.`);
        }
      } : undefined});
  }
  addBtn.onclick=()=>{
    phase=2; addBtn.style.display="none"; draw(false);
    [60,63,65,66,67,70,72].forEach((m,i)=>MFAudio.tone(m,.45,.2+i*.32,.42));
    fb(true,"✓ G♭ slides in between F and G — and there it is: the C BLUES SCALE. C-E♭-F-G♭-G-B♭-C: seven notes, three of them BLUE (♭3, ♭5, ♭7).");
    q.textContent="Surgery complete — the patient now plays the blues.";
  };
  q.innerHTML="Operation 1: this is C major. Tap the <b>2nd</b> and the <b>6th</b> degrees to REMOVE them.";
  draw(true);
}

/* improv lab: blues-scale free play over an optional vamp */
function MF_L71_improv(container,fb){
  const BLUES=new Set([0,3,5,6,7,10]);
  let hits=0, streak=0, vamped=false;
  container.innerHTML=`<div class="big-q l71i-q" style="text-align:center">The blues scale: <b>C · E♭ · F · G♭ · G · B♭</b> (any octave). Improvise — make up YOUR solo. Blue notes get bonus sparkle!</div>
    <div style="text-align:center"><button class="play l71i-vamp">▶ Start a 4-bar backing vamp</button></div>
    <div class="l71i-kb"></div>
    <div class="streak l71i-s" style="text-align:center"></div>`;
  const q=container.querySelector(".l71i-q"), kh=container.querySelector(".l71i-kb"), s=container.querySelector(".l71i-s"), vb=container.querySelector(".l71i-vamp");
  vb.onclick=()=>{
    const rows=[[48,64,67,72],[53,65,69,72],[43,67,71,77],[48,64,67,72]];
    rows.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,1.1,i*1.2,.22)));
    if(!vamped){ vamped=true; fb(true,"✓ Vamp rolling — now solo over it with the blues scale!"); }
  };
  Keyboard.create(kh,{start:60,octaves:2,labels:true,
    onKey:m=>{
      const pc=m%12;
      if(BLUES.has(pc)){
        hits++; streak++;
        if(pc===3||pc===6||pc===10){ s.textContent=`\u{1F535} BLUE NOTE! · notes: ${hits} · streak: ${streak}`; }
        else s.textContent=`✓ in the scale · notes: ${hits} · streak: ${streak}`;
        if(hits===12){ MFAudio.yay(); fb(true,"✓ Twelve blues notes — you're IMPROVISING: spontaneously creating a unique solo, exactly as the book defines it. B.B. King would nod."); }
      } else {
        streak=0; s.textContent=`✗ outside the scale · streak reset`;
        fb(false,"That one's not in the C blues scale — stick to C, E♭, F, G♭, G, B♭ (any octave).");
      }
    }});
}

LESSON_CONTENT[71]={
  welcome:"The final ingredient of the blues — a scale with three bent, beautiful BLUE notes. \u{1F535}",
  hook:{
    say:"Two quick solos over the same blues chord. One uses the plain major scale… one uses THE scale. <b>Which one actually sounds like the blues?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Solo A</button>
          <button class="play hk-b">▶ Solo B</button></div>
          <div class="choices hk-ch" style="display:none"><button>Solo B — those bent notes ARE the blues</button><button>Solo A — plain and sunny is bluesier</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ [60,62,64,67,69,72].forEach((m,i)=>MFAudio.tone(m,.4,i*.3,.42)); [48,64,67].forEach(m=>MFAudio.tone(m,2.2,0,.18)); hA=true; if(hB) setTimeout(()=>ch.style.display="",2400); };
        container.querySelector(".hk-b").onclick=()=>{ [60,63,65,66,67,70,72].forEach((m,i)=>MFAudio.tone(m,.4,i*.3,.42)); [48,64,67].forEach(m=>MFAudio.tone(m,2.4,0,.18)); hB=true; if(hA) setTimeout(()=>ch.style.display="",2400); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Solo B used the BLUES SCALE — with its flatted 3rd, 5th and 7th, the BLUE NOTES. That bend against the major chord underneath is the very sound of the blues. Today: build the scale and improvise with it!");
          else fb(false,"Solo A was the plain major scale — pretty, but no ache. Listen for the BENT notes in B…");
        });
      } }
  },
  objectives:[
    "Know both blues ingredients: the 12-bar progression AND the blues scale",
    "The blues scale has only 7 notes, with flatted 3rd, 5th and 7th",
    "Call the flatted notes by name: BLUE NOTES",
    "Convert any major scale: remove 2 & 6 → flat 3 & 7 → add ♭5",
    "Spell the C blues scale: C-E♭-F-G♭-G-B♭-C",
    "Define IMPROVISING — and do some!"
  ],
  steps:[
    { say:"The book's claim: the blues sound comes <b>not only from the chord progression but also from its unique scale</b>. Compared with major, <b>the BLUES SCALE has only 7 notes and includes a flatted 3rd, 5th and 7th</b>. \u{1F447} <b>The flatted notes are often called…</b>",
      try:{ type:"mc", choices:["Blue notes","Sad notes","Broken notes"], answer:0,
        success:"✓ BLUE NOTES — ♭3, ♭5, ♭7. Three small bends, one giant style.",
        fail:"The scale's own name is the clue…",
        hint:"What color is the blues?" } },
    { say:"The conversion recipe, three operations: <b>1) remove the 2nd and 6th degrees · 2) flat the 3rd and 7th · 3) add a flatted 5th</b>. Perform the surgery yourself: \u{1F447}",
      try:{ type:"custom",
        hint:"Remove 2 & 6 → flat 3 & 7 → add ♭5.",
        mount:(container,fb)=>MF_L71_convert(container,fb) } },
    { say:"The result, spelled out: <b>C - E♭ - F - G♭ - G - B♭ - C</b>, labeled <b>Root, ♭3, 4, ♭5, 5, ♭7, Root</b>. Count them! \u{1F447} <b>How many DIFFERENT notes does the blues scale contain?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:110,notes:[
        {p:"C4",d:"q",label:"Root"},{p:"Eb4",d:"q",label:"♭3"},{p:"F4",d:"q",label:"4"},{p:"Gb4",d:"q",label:"♭5"},
        {p:"G4",d:"q",label:"5"},{p:"Bb4",d:"q",label:"♭7"},{p:"C5",d:"q",label:"Root"}],width:520} },
      try:{ type:"mc", choices:["7 (counting the root once… it's 6 pitches + the octave return)","12","8 like any scale"], answer:0,
        success:"✓ The book counts 7 notes root-to-root — fewer than major's 8, because two degrees left and only one (♭5) moved in.",
        fail:"Count the noteheads on the staff…",
        hint:"8 minus 2 removed plus 1 added." } },
    { say:"Look closely at the neighbors <b>G♭ and G</b> — the flatted 5th sits right against the natural 5th, a chromatic crunch INSIDE the scale. \u{1F447} <b>Which pair of blues-scale notes is only a half step apart?</b>",
      try:{ type:"mc", choices:["♭5 and 5 (G♭ and G)","Root and ♭3","4 and ♭7"], answer:0,
        success:"✓ That ♭5→5 slide is the scale's most electric move — solo players lean on it constantly.",
        fail:"Find the two notes sharing almost the same letter…",
        hint:"The added note and its neighbor." } },
    { say:"Now the magic word: <b>IMPROVISING — to spontaneously create a unique solo</b>. Write or improvise blues-scale notes <b>over a blues chord progression</b> and \u{201C}the special sound of the blues is created.\u{201D} \u{1F447} <b>Improvising means…</b>",
      try:{ type:"mc", choices:["Spontaneously creating a unique solo","Playing exactly what's written","Playing without any rhythm"], answer:0,
        success:"✓ Made up in the moment, unique to you — with the blues scale as your safety net: every note in it works over the progression.",
        fail:"The book defines it in five words…",
        hint:"Spontaneous + unique." } },
    { say:"YOUR TURN — the improv lab. \u{1F447}",
      try:{ type:"custom",
        hint:"C, E♭, F, G♭, G, B♭ — any octave, any order, any rhythm. Start the vamp for atmosphere!",
        mount:(container,fb)=>MF_L71_improv(container,fb) } },
    { say:"Transfer: the recipe works from ANY major scale. \u{1F447} <b>The G blues scale is…</b>",
      try:{ type:"mc", choices:["G-B♭-C-D♭-D-F-G","G-A-B-C-D-E-F♯-G","G-B-C-D-F♯-G"], answer:0,
        success:"✓ From G major: drop A and E, flat B and F♯ (→B♭, F), add D♭. Root, ♭3, 4, ♭5, 5, ♭7, Root — the book's exercise 1!",
        fail:"Apply the three operations to G major, one at a time…",
        hint:"Remove 2&6, flat 3&7, add ♭5." } }
  ],
  examples:[
    { caption:"C major vs C blues, side by side: two notes leave, three notes bend blue. Hear the transformation from sunshine to smoke.",
      staff:{clef:"treble",tempo:110,notes:[
        {p:"C4",d:"q",label:"C major"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},{p:"B4",d:"q"},{p:"C5",d:"q"},{bar:"double"},
        {p:"C4",d:"q",label:"C blues"},{p:"Eb4",d:"q"},{p:"F4",d:"q"},{p:"Gb4",d:"q"},{p:"G4",d:"q"},{p:"Bb4",d:"q"},{p:"C5",d:"q"},{bar:"final"}],width:640},
      kb:{start:60,octaves:2,labels:true} },
    { caption:"A written blues lick — blues-scale notes over the I chord, exactly what the book means by 'writing or improvising… over a blues chord progression.' The ♭3 against the chord's natural 3rd IS the blues.",
      staff:{clef:"treble",tempo:100,time:"4/4",notes:[
        {p:"C4",d:"8"},{p:"Eb4",d:"8"},{p:"F4",d:"8"},{p:"Gb4",d:"8"},{p:"G4",d:"q"},{p:"Bb4",d:"q"},
        {p:"G4",d:"8"},{p:"Gb4",d:"8"},{p:"F4",d:"8"},{p:"Eb4",d:"8"},{p:"C4",d:"h"},{bar:"final"}],
        beams:[[0,1],[2,3],[6,7],[8,9]],width:600},
      kb:{start:60,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Blue-Note Sprint (45s)",
      intro:"Recipe steps, spellings and definitions — race the blues facts!",
      miaIntro:"♭3, ♭5, ♭7 — paint them blue! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Blue notes","the flatted 3rd, 5th and 7th"],
        ["Blues scale size","only 7 notes"],
        ["Recipe step 1","remove the 2nd and 6th degrees"],
        ["Recipe step 2","flat the 3rd and 7th"],
        ["Recipe step 3","add a flatted 5th"],
        ["C blues scale","C-E♭-F-G♭-G-B♭-C"],
        ["Improvising","spontaneously creating a unique solo"],
        ["The blues sound","the progression + the scale together"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — blue-note fluent!":null },
    { type:"key-climb", title:"Game 2 · Blues Scale Round Trip",
      intro:"Climb the C blues scale up and slide back down — feel the ♭5 crunch both ways!",
      miaIntro:"Up the smoke, down the smoke! \u{1FA9C}",
      spec:{seq:[60,63,65,66,67,70,72, 70,67,66,65,63,60],
        names:["C (root)","E♭ (♭3 — blue!)","F (4)","G♭ (♭5 — blue!)","G (5)","B♭ (♭7 — blue!)","C (top)","B♭","G","G♭","F","E♭","C — home"],
        start:60, octaves:2, title:"C blues scale, up and down"},
      result:(score)=>score!==null?"The blues scale lives in your fingers now!":null },
    { type:"symbol-hunt", title:"Game 3 · Spot the Blue Note",
      intro:"Four intervals from the root — click the BLUE one each round calls!",
      miaIntro:"Which bend is which? \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"♭3 (C to E♭)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"Eb4",d:"w",chord:true}],width:150}},
        {label:"♭5 (C to G♭)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"Gb4",d:"w",chord:true}],width:150}},
        {label:"♭7 (C to B♭)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"Bb4",d:"w",chord:true}],width:150}},
        {label:"Natural 5 (C to G) — NOT blue", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"G4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Blue vision: activated!":null },
    { type:"term-race", title:"Game 4 · UNIT 17 GRAND FINALE Race",
      intro:"The victory lap — minor harmonizing, composing, 12 bars and blue notes!",
      miaIntro:"Everything from Unit 17 — GO! \u{1F3C6}",
      spec:{rounds:10, reverse:true, pool:[
        ["Minor chart rows","1,3,5→i · 2,4,5,7→V · 1,4,6→iv"],
        ["Raised 7th in a melody","harmonize with V(7)"],
        ["Minor composing frame","root of i at both ends"],
        ["12-bar blues map","I×4 · IV×2 · I×2 · V×1 · IV×1 · I×2"],
        ["The blues' birthplace","America's south"],
        ["Blue notes","♭3, ♭5, ♭7"],
        ["Blues scale recipe","remove 2&6, flat 3&7, add ♭5"],
        ["C blues scale","C-E♭-F-G♭-G-B♭-C"],
        ["Improvising","a spontaneous, unique solo"],
        ["The complete blues sound","12-bar progression + blues scale"]]},
      result:(score)=>score>=8?"UNIT 17 CHAMPION — you've got the blues (the good kind)!":null }
  ],
  practiceIntro:"20 practice questions — the recipe, the spelling and the blue notes. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Blue notes","♭3, ♭5, ♭7"],["Step 1","remove degrees 2 and 6"],["Step 2","flat degrees 3 and 7"],["Step 3","add the flatted 5th"],["Improvise","create a solo spontaneously"]], reverse:true}, count:6 },
    { gen:"interval-quality", params:{ask:"quality"}, count:2 },
    { type:"mc", q:"The blues scale has how many notes?", choices:["7","8","5"], answer:0,
      explain:"Two fewer than major's 8, plus one added (AEMT3 p.111)." },
    { type:"mc", q:"Which degrees are FLATTED in the blues scale?", choices:["3rd, 5th and 7th","2nd and 6th","1st and 4th"], answer:0,
      explain:"The three blue notes." },
    { type:"mc", q:"Which degrees are REMOVED when converting major to blues?", choices:["2nd and 6th","3rd and 7th","1st and 5th"], answer:0,
      explain:"Operation 1 of the recipe." },
    { type:"mc", q:"The C blues scale is spelled…", choices:["C-E♭-F-G♭-G-B♭-C","C-D-E♭-F-G-A-B♭-C","C-E-F-G-B-C"], answer:0,
      explain:"Root, ♭3, 4, ♭5, 5, ♭7, Root." },
    { type:"mc", q:"The flatted notes of the blues scale are often called…", choices:["blue notes","gray notes","passing tones"], answer:0,
      explain:"The style's namesake notes." },
    { type:"mc", q:"IMPROVISING means…", choices:["spontaneously creating a unique solo","reading music perfectly","playing someone else's solo"], answer:0,
      explain:"The book's exact definition." },
    { type:"truefalse", q:"The blues sound comes only from the chord progression.", answer:false,
      explain:"NOT only — the unique scale matters just as much." },
    { type:"truefalse", q:"The blues scale contains both G♭ and G (in C).", answer:true,
      explain:"♭5 AND 5 — the chromatic crunch." },
    { type:"truefalse", q:"The blues scale keeps the major scale's 2nd degree.", answer:false,
      explain:"Degree 2 is removed in operation 1." },
    { type:"truefalse", q:"Playing blues-scale notes over a blues progression creates the special blues sound.", answer:true,
      explain:"The book's closing formula." }
  ],
  miaQuizIntro:"The Unit 17 finale quiz! Seven notes, three of them blue — and a license to improvise.",
  quiz:[
    { type:"mc", q:"The special sound of the blues comes from…", choices:["its chord progression AND its unique scale","only its tempo","only its lyrics"], answer:0,
      explain:"Two ingredients, one style.", hint:"Lessons 70 + 71 together." },
    { type:"mc", q:"Compared to the major scale, the blues scale has…", choices:["only 7 notes with flatted 3rd, 5th and 7th","more notes","the same notes, reordered"], answer:0,
      explain:"Leaner and bent.", hint:"The book's comparison sentence." },
    { type:"mc", q:"The flatted notes are often called…", choices:["blue notes","soft notes","minor notes"], answer:0,
      explain:"♭3, ♭5, ♭7 — the blue trio.", hint:"The lesson's color." },
    { type:"mc", q:"Step 1 of converting a major scale to blues:", choices:["remove the 2nd and 6th degrees","flat everything","add three sharps"], answer:0,
      explain:"Two degrees pack their bags.", hint:"Subtraction first." },
    { type:"mc", q:"Step 2:", choices:["flat the 3rd and 7th degrees","flat the 1st","remove the 5th"], answer:0,
      explain:"Two bends.", hint:"The first two blue notes." },
    { type:"mc", q:"Step 3:", choices:["add a flatted 5th","add a sharped 4th","remove the root"], answer:0,
      explain:"The newcomer between 4 and 5.", hint:"The final blue note." },
    { type:"mc", q:"Identify this scale.",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"Eb4",d:"q"},{p:"F4",d:"q"},{p:"Gb4",d:"q"},{p:"G4",d:"q"},{p:"Bb4",d:"q"},{p:"C5",d:"q"}],width:440},
      choices:["The C blues scale","C natural minor","C major with typos"], answer:0,
      explain:"Root, ♭3, 4, ♭5, 5, ♭7, Root.", hint:"Count the notes: seven." },
    { type:"mc", q:"Which two notes of the C blues scale are a half step apart?", choices:["G♭ and G","C and E♭","F and B♭"], answer:0,
      explain:"♭5 against 5 — the crunch.", hint:"The added note's neighbor." },
    { type:"truefalse", q:"Improvising means spontaneously creating a unique solo.", answer:true,
      explain:"Word for word from the book.", hint:"The improv lab's goal." },
    { type:"mc", q:"The blues scale's ♭3 (E♭) played over a C MAJOR chord (with E♮)…", choices:["creates the signature blues clash — on purpose","is always an error","cancels the chord"], answer:0,
      explain:"That intentional rub IS the blues.", hint:"Why solo B sounded so good." },
    { type:"mc", q:"The G blues scale (from the recipe) is…", choices:["G-B♭-C-D♭-D-F-G","G-A-B♭-C-D-E♭-F-G","G-B-D-F-G"], answer:0,
      explain:"Remove A & E, flat B & F♯, add D♭.", hint:"Apply all three operations to G major." },
    { type:"mc", q:"To create the blues sound, you play blues-scale notes…", choices:["over a blues chord progression","without any chords","only as block chords"], answer:0,
      explain:"Scale + progression = the blues.", hint:"The two lessons combined." },
    /* generated */
    { gen:"term-match", params:{subject:"term", pool:[["♭3, ♭5, ♭7","the blue notes"],["Remove 2 & 6","recipe step 1"],["Add ♭5","recipe step 3"],["Improvise","spontaneous unique solo"]], reverse:true}, count:3 },
    { gen:"interval-quality", params:{ask:"quality"}, count:2 },
    { gen:"triad-id", params:{ask:"numeral"}, count:1 }
  ],
  vocabulary:[
    {term:"Blues Scale", def:"A 7-note scale with flatted 3rd, 5th and 7th. In C: C-E♭-F-G♭-G-B♭-C.",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"Eb4",d:"q"},{p:"Gb4",d:"q"},{p:"Bb4",d:"q"}],width:130}},
    {term:"Blue Notes", def:"The flatted 3rd, 5th and 7th — the bent notes that give the blues its ache."},
    {term:"The Recipe", def:"Major → blues: 1) remove degrees 2 & 6 · 2) flat 3 & 7 · 3) add a flatted 5th."},
    {term:"Improvise", def:"To spontaneously create a unique solo — blues-scale notes over a blues progression."}
  ],
  mistakes:[],
  summary:[
    "✔ The blues = <b>the 12-bar progression + the blues scale</b>.",
    "✔ The scale has <b>7 notes</b> with <b>♭3, ♭5, ♭7 — the BLUE NOTES</b>.",
    "✔ Recipe: <b>remove 2 & 6 → flat 3 & 7 → add ♭5</b>.",
    "✔ C blues: <b>C-E♭-F-G♭-G-B♭-C</b> (Root, ♭3, 4, ♭5, 5, ♭7, Root).",
    "✔ <b>IMPROVISE</b> = spontaneously create a unique solo. <b>UNIT 17 COMPLETE!</b> \u{1F389}"
  ],
  tips:[
    "Every note of the blues scale works over every chord of the 12-bar progression — that's why it's the improviser's first scale.",
    "The ♭5 is strongest as a PASSING note — slide G♭ into G (or down into F) rather than parking on it.",
    "Practice trick: loop the Game 2 round trip until your fingers know it blind, then improvise by rearranging its pieces.",
    "Unit 18 — the FINAL unit — zooms all the way out: how whole pieces of music are built. Form!"
  ],
  rewards:{ badge:"Blue-Note Bender — Unit 17 Champion", icon:"\u{1F535}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"PERFECT — recipe, spelling, blue notes AND a solo of your own! Unit 17 conquered. \u{1F535}\u{1F3C6}\u{1F389}",
  miaPass:"Passed — and Unit 17 is COMPLETE! You harmonize, compose AND improvise now. \u{1F389}",
  mia:{
    hook:{ label:"the welcome",
      explain:"Solo A used plain C major; solo B used the BLUES SCALE — its ♭3, ♭5 and ♭7 bending against the chord created the blues ache.",
      play:()=>{[60,63,65,66,67,70,72].forEach((m,i)=>MFAudio.tone(m,.4,i*.3,.42));[48,64,67].forEach(m=>MFAudio.tone(m,2.4,0,.18));} },
    learn:{ label:"the blues scale",
      explain:"7 notes: Root, ♭3, 4, ♭5, 5, ♭7, Root. Recipe: remove 2&6, flat 3&7, add ♭5. The flatted notes are the blue notes; improvising = spontaneous unique solo.",
      hint:"C-E♭-F-G♭-G-B♭-C.",
      play:()=>{[60,63,65,66,67,70,72].forEach((m,i)=>MFAudio.tone(m,.42,i*.3,.42));} },
    example:{ label:"the examples",
      explain:"Example 1 sets C major and C blues side by side; example 2 is a written blues lick over the I chord — the ♭3 rub in action." },
    game:{ label:"the games",
      explain:"Sprint the recipe, climb the scale both ways, spot the blue intervals, then run the Unit 17 victory lap.",
      hint:"Three blue notes: ♭3, ♭5, ♭7." },
    quiz:{ label:"this question",
      explain:"Everything comes from the recipe (remove 2&6, flat 3&7, add ♭5) and the spelling it produces. When in doubt, rebuild the scale.",
      play:()=>{[60,63,65,66,67,70,72].forEach((m,i)=>MFAudio.tone(m,.4,i*.28,.42));} }
  }
};
