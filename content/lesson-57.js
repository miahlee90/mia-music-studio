/* Lesson 57 — Natural, Harmonic and Melodic Minor Scales (AEMT Book 3, Unit 14)
   Built from drafts/UNIT 14 – Lesson 57.md; AEMT3 p.91 verified by render.
   Core: three forms — NATURAL (relative major's tones only), HARMONIC (raised
   7th ascending AND descending; the most used), MELODIC (raised 6th & 7th
   ascending, natural form descending). Harmonic minor diatonic intervals:
   P1 M2 m3 P4 P5 m6 M7 P8. Hard concept → extra-slow steps, hands-on fixes.
   NOTE: edit by FULL-FILE REWRITE only. */

/* fix-the-scale: tap the degree(s) that get raised */
function MF_L57_fix(container,fb){
  const NAT=["A3","B3","C4","D4","E4","F4","G4","A4"];
  let stage=0; /* 0 = raise 7th (harmonic), 1 = raise 6th then 7th (melodic) */
  let done=[];
  container.innerHTML=`<div class="big-q l57f-q" style="text-align:center"></div>
    <div class="l57f-staff"></div>`;
  const q=container.querySelector(".l57f-q"), holder=container.querySelector(".l57f-staff");
  function draw(ps,label){
    Staff.render(holder,{clef:"treble",notes:ps.map((p,i)=>({p,d:"q",label:i===0?label:undefined})),
      width:520, clickNotes:true,
      onNote:(i,p)=>{
        MFAudio.tone(MFAudio.midi(p),.5,0,.4);
        if(stage===0){
          if(i===6){
            const H=["A3","B3","C4","D4","E4","F4","G#4","A4"];
            draw(H,"A harmonic minor");
            H.forEach((pp,ix)=>MFAudio.tone(MFAudio.midi(pp),.4,.3+ix*.28,.38));
            fb(true,"✓ G becomes G♯ — the raised 7th is now a LEADING TONE, one half step under A. This is the HARMONIC MINOR, and the raise applies going up AND coming down.");
            stage=1; done=[];
            setTimeout(()=>{ q.innerHTML="Now build the <b>MELODIC minor (ascending)</b>: starting again from natural minor, tap the <b>6th</b> and the <b>7th</b> — both get raised."; draw(NAT,"A natural minor"); },3400);
          } else fb(false,`That's degree ${i+1}. The harmonic minor raises only the 7TH.`);
        } else {
          if(i===5&&!done.includes(5)){ done.push(5);
            draw(["A3","B3","C4","D4","E4","F#4","G4","A4"],"6th raised…");
            q.innerHTML="✓ F→F♯. One more: tap the <b>7th</b>."; }
          else if(i===6&&done.includes(5)){
            const M=["A3","B3","C4","D4","E4","F#4","G#4","A4"];
            draw(M,"A melodic minor (ascending)");
            M.forEach((pp,ix)=>MFAudio.tone(MFAudio.midi(pp),.4,.3+ix*.28,.38));
            fb(true,"✓ F♯ AND G♯ — the MELODIC minor ascending. The raised 6th smooths the path into the raised 7th. (Coming down, both cancel — it descends as natural minor.)");
            q.textContent="Both fixes built — three scales from one set of letters!";
          }
          else if(i===6&&!done.includes(5)) fb(false,"Raise the 6TH first — melodic minor lifts both, in order.");
          else fb(false,`That's degree ${i+1}. Melodic minor raises degrees 6 and 7.`);
        }
      }});
  }
  q.innerHTML="A <b>natural minor</b>. Make it HARMONIC: tap the degree that gets raised a half step.";
  draw(NAT,"A natural minor");
}

/* ear lab: which form did you hear? */
function MF_L57_ear(container,fb){
  const FORMS=[
    {name:"Natural minor", midis:[57,59,60,62,64,65,67,69]},
    {name:"Harmonic minor", midis:[57,59,60,62,64,65,68,69]},
    {name:"Melodic minor (ascending)", midis:[57,59,60,62,64,66,68,69]}];
  let order=[0,1,2,1].sort(()=>Math.random()-.5), r=0, played=false;
  container.innerHTML=`<div class="big-q l57e-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l57e-play">▶ Play the mystery scale</button></div>
    <div class="choices chips l57e-ch" style="display:none"><button>Natural</button><button>Harmonic</button><button>Melodic</button></div>`;
  const q=container.querySelector(".l57e-q"), pl=container.querySelector(".l57e-play"), ch=container.querySelector(".l57e-ch");
  function ask(){
    if(r>=order.length){ q.textContent="Ears calibrated — you can NAME a minor's flavor now!"; pl.style.display="none"; ch.style.display="none"; return; }
    played=false; ch.style.display="none";
    q.innerHTML=`Round ${r+1} of ${order.length}: listen closely to degrees 6 and 7…`;
  }
  pl.onclick=()=>{
    const F=FORMS[order[r]]; if(!F) return;
    F.midis.forEach((m,i)=>MFAudio.tone(m,.42,i*.3,.4));
    played=true; setTimeout(()=>ch.style.display="",F.midis.length*300+300);
  };
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    if(!played) return;
    const want=order[r];
    if(i===want){ MFAudio.yay(); fb(true,`✓ ${FORMS[want].name}! ${want===0?"Plain 6 and 7 — no lifts.":want===1?"Only the 7th was raised — that exotic gap between 6 and ♯7 gives it away.":"Both 6 and 7 raised — the top of the scale sounded almost major."}`);
      r++; setTimeout(ask,1400); }
    else { MFAudio.tone(40,.2); fb(false,"Replay it and stare at the last three notes: were 6 and 7 low, half-lifted, or both lifted?"); }
  });
  ask();
}

LESSON_CONTENT[57]={
  welcome:"Major scales come in one flavor. Minor scales come in THREE. Let's taste them all. \u{1F3AD}",
  hook:{
    say:"One scale, two endings. Ending A strolls to the top; ending B <b>yearns</b> its way there. <b>Which ending pulls harder into the final note?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Ending A: …F, G, A</button>
          <button class="play hk-b">▶ Ending B: …F, G♯, A</button></div>
          <div class="choices hk-ch" style="display:none"><button>Ending B — the G♯ leaned into A</button><button>Ending A — plain G pulls harder</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ [64,65,67,69].forEach((m,i)=>MFAudio.tone(m,.5,i*.4,.42)); hA=true; if(hB) setTimeout(()=>ch.style.display="",2100); };
        container.querySelector(".hk-b").onclick=()=>{ [64,65,68,69].forEach((m,i)=>MFAudio.tone(m,.5,i*.4,.42)); hB=true; if(hA) setTimeout(()=>ch.style.display="",2100); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Raising that one note (G→G♯) created a LEADING TONE — a half step below home that begs to arrive. That single lift is why the minor scale grew extra forms. Today: all three!");
          else fb(false,"Play both again — which last-but-one note sounds like it's on tiptoe?");
        });
      } }
  },
  objectives:[
    "Name the three forms: natural, harmonic, melodic",
    "Natural minor: only the tones of the relative major",
    "Harmonic minor: raised 7th — up AND down; the most used form",
    "Melodic minor: raised 6th & 7th ascending; natural form descending",
    "Explain WHY each raise exists (leading tone / smooth melody)",
    "Identify the forms by sight and by ear"
  ],
  steps:[
    { say:"Form 1 — the <b>NATURAL minor</b>: it uses <b>only the tones of the relative major scale</b> (Lesson 56's scale IS this form). Nothing raised, nothing added. \u{1F447} <b>A natural minor contains how many accidentals?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:110,notes:[
        {p:"A3",d:"q",label:"1"},{p:"B3",d:"q",label:"2"},{p:"C4",d:"q",label:"3"},{p:"D4",d:"q",label:"4"},
        {p:"E4",d:"q",label:"5"},{p:"F4",d:"q",label:"6"},{p:"G4",d:"q",label:"7"},{p:"A4",d:"q",label:"8"}],width:540} },
      try:{ type:"mc", choices:["None — same notes as C major","One sharp","One flat"], answer:0,
        success:"✓ Pure relative-major material. The natural minor is the 'factory setting.'",
        fail:"It shares EVERYTHING with its relative major…",
        hint:"A minor's relative major is C major." } },
    { say:"But the factory setting has a soft spot: its 7th (G) sits a WHOLE step below home, so arrivals feel mild — you heard it in the hook. Composers wanted the tug of a <b>leading tone</b>. \u{1F447} <b>A leading tone sits how far below the tonic?</b>",
      try:{ type:"mc", choices:["A half step","A whole step","A minor 3rd"], answer:0,
        success:"✓ One half step of pure gravity. To get it, the minor scale needs surgery on its 7th…",
        fail:"The closer to home, the stronger the pull.",
        hint:"Think of B→C in C major." } },
    { say:"Do the surgery yourself — twice. \u{1F447} <b>Build the harmonic, then the melodic form:</b>",
      try:{ type:"custom",
        hint:"Harmonic: raise degree 7 only. Melodic: degrees 6 AND 7 (ascending).",
        mount:(container,fb)=>MF_L57_fix(container,fb) } },
    { say:"Form 2 — the <b>HARMONIC minor</b>: 7th raised a half step, and — mark this — <b>both ascending AND descending</b>. The book adds: it is <b>the most frequently used of the three</b>. \u{1F447} <b>Does harmonic minor lower the ♯7 on the way down?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:110,notes:[
        {p:"A3",d:"q"},{p:"B3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q",label:"6"},{p:"G#4",d:"q",label:"♯7"},{p:"A4",d:"q",label:"8"}],width:540} },
      try:{ type:"mc", choices:["No — ♯7 stays in both directions","Yes — it descends naturally","Only on weekends"], answer:0,
        success:"✓ The raise is permanent in this form — that's what separates it from melodic minor.",
        fail:"Harmonic minor is the consistent one…",
        hint:"Only ONE form changes on the way down." } },
    { say:"But the fix created a new quirk: from F up to G♯ is <b>1½ steps</b> — a dramatic, exotic gap that's awkward for smooth MELODIES. Form 3 — the <b>MELODIC minor</b> — solves it: <b>raise the 6th AND 7th ascending</b>… then <b>descend like the natural minor</b>. \u{1F447} <b>Why raise the 6th too?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:110,notes:[
        {p:"A3",d:"q",label:"up:"},{p:"B3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q",label:"♯6"},{p:"G#4",d:"q",label:"♯7"},{p:"A4",d:"q"},
        {p:"G4",d:"q",acc:"n",label:"down: ♮7"},{p:"F4",d:"q",acc:"n",label:"♮6"},{p:"E4",d:"q"},{p:"D4",d:"q"},{p:"C4",d:"q"},{p:"B3",d:"q"},{p:"A3",d:"q"},{bar:"final"}],width:660} },
      try:{ type:"mc", choices:["To close the awkward 1½-step gap between 6 and ♯7","To make the scale louder","Because 6 is unlucky"], answer:0,
        success:"✓ F♯ smooths the staircase into G♯: whole step, half step — singable again. Coming down there's no leading-tone job to do, so both lifts cancel.",
        fail:"Measure F to G♯ — how many half steps?",
        hint:"Three half steps = the gap that needed patching." } },
    { say:"Memory anchor: <b>7 → Harmony</b> (the raised 7th powers CHORDS — hence 'harmonic'), <b>6 & 7 → Melody</b> (smooth LINES — hence 'melodic'). \u{1F447} <b>A scale with ♯6 and ♯7 going up but plain notes coming down is…</b>",
      try:{ type:"mc", choices:["Melodic minor","Harmonic minor","Natural minor"], answer:0,
        success:"✓ The shape-shifter itself. One name per behavior: natural never changes, harmonic changes once forever, melodic changes going up and repents coming down.",
        fail:"Which form has a two-way personality?",
        hint:"Up ♯6♯7, down natural — the book's exact description." } },
    { say:"Bonus — the <b>diatonic intervals of the HARMONIC minor</b> (measured from the tonic) are all P, M or m: <b>P1, M2, m3, P4, P5, m6, M7, P8</b>. Compare with major: only the 3rd and 6th shrink to minor. \u{1F447} <b>In harmonic minor, the interval from tonic up to degree 7 is…</b>",
      show:{ type:"staff", spec:{clef:"treble",notes:[
        {p:"A3",d:"h",label:"m3"},{p:"C4",d:"h",chord:true},
        {p:"A3",d:"h",label:"m6"},{p:"F4",d:"h",chord:true},
        {p:"A3",d:"h",label:"M7"},{p:"G#4",d:"h",chord:true},
        {p:"A3",d:"h",label:"P5"},{p:"E4",d:"h",chord:true}],width:480} },
      try:{ type:"mc", choices:["A Major 7th","A minor 7th","A Perfect 7th"], answer:0,
        success:"✓ A up to G♯ = M7 — the raised 7th upgraded that interval from minor to Major. (And 'perfect 7th' doesn't exist!)",
        fail:"G♯ is the RAISED 7th…",
        hint:"Raising the top note makes an interval BIGGER." } },
    { say:"Final exam for your ears. \u{1F447} <b>Name the form by sound alone:</b>",
      try:{ type:"custom",
        hint:"Focus on the last three notes: plain (natural), one lift with a gap (harmonic), or two lifts (melodic).",
        mount:(container,fb)=>MF_L57_ear(container,fb) } }
  ],
  examples:[
    { caption:"The three forms of A minor, back to back: natural (plain), harmonic (♯7 — hear the exotic gap), melodic ascending (♯6 ♯7 — smooth as major until the last step).",
      staff:{clef:"treble",tempo:120,notes:[
        {p:"A3",d:"q",label:"natural"},{p:"B3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"},{bar:"double"},
        {p:"A3",d:"q",label:"harmonic"},{p:"B3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G#4",d:"q"},{p:"A4",d:"q"},{bar:"double"},
        {p:"A3",d:"q",label:"melodic ↑"},{p:"B3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q"},{p:"G#4",d:"q"},{p:"A4",d:"q"},{bar:"final"}],width:680},
      kb:{start:57,octaves:2,labels:true} },
    { caption:"The melodic minor's full round trip: ♯6 and ♯7 climbing up… then the naturals reappear on the way home. One scale, two faces.",
      staff:{clef:"treble",tempo:120,notes:[
        {p:"A3",d:"q"},{p:"B3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q"},{p:"G#4",d:"q"},{p:"A4",d:"q"},
        {p:"G4",d:"q",acc:"n"},{p:"F4",d:"q",acc:"n"},{p:"E4",d:"q"},{p:"D4",d:"q"},{p:"C4",d:"q"},{p:"B3",d:"q"},{p:"A3",d:"h"},{bar:"final"}],width:680},
      kb:{start:57,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Three-Form Fact Sprint (45s)",
      intro:"Which form raises what? Race the rules of all three minors!",
      miaIntro:"7 → harmony, 6&7 → melody! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Natural minor","only the relative major's tones"],
        ["Harmonic minor","raised 7th — up AND down"],
        ["Melodic minor ascending","raised 6th and 7th"],
        ["Melodic minor descending","same as natural minor"],
        ["Leading tone","a half step below the tonic"],
        ["Most used minor form","harmonic minor"],
        ["The awkward harmonic gap","1½ steps between 6 and ♯7"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" facts — three forms fully filed!":null },
    { type:"key-climb", title:"Game 2 · Melodic Round Trip",
      intro:"Climb A melodic minor up (with F♯ and G♯) and come home the natural way!",
      miaIntro:"Up with lifts, down without! \u{1FA9C}",
      spec:{seq:[57,59,60,62,64,66,68,69, 67,65,64,62,60,59,57],
        names:["A","B","C","D","E","F♯ (raised 6!)","G♯ (raised 7!)","A — top!","G♮ (back to natural)","F♮","E","D","C","B","A — home"],
        start:48, octaves:2, title:"A melodic minor: ascend raised, descend natural"},
      result:(score)=>score!==null?"The shape-shifter, mastered in both directions!":null },
    { type:"symbol-hunt", title:"Game 3 · Form Spotter",
      intro:"Three A-minor scales on cards — click the form each round names!",
      miaIntro:"Stare at degrees 6 and 7! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Natural minor", spec:{clef:"treble",notes:[{p:"A3",d:"q"},{p:"B3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"}],width:250}},
        {label:"Harmonic minor (♯7)", spec:{clef:"treble",notes:[{p:"A3",d:"q"},{p:"B3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G#4",d:"q"},{p:"A4",d:"q"}],width:250}},
        {label:"Melodic minor ↑ (♯6 ♯7)", spec:{clef:"treble",notes:[{p:"A3",d:"q"},{p:"B3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q"},{p:"G#4",d:"q"},{p:"A4",d:"q"}],width:250}}]},
      result:(score)=>score>=5?"No form can hide from you!":null },
    { type:"term-race", title:"Game 4 · Minor-Scale Grand Race",
      intro:"Everything from Lessons 56-57 — relatives and all three forms!",
      miaIntro:"The minor world so far! \u{1F3C1}",
      spec:{rounds:9, reverse:true, pool:[
        ["Relative minor","starts on the major's 6th degree"],
        ["Natural minor","the unchanged form"],
        ["Harmonic minor","♯7 in both directions"],
        ["Melodic minor","♯6 ♯7 up, natural down"],
        ["Leading tone","the raised 7th's new job"],
        ["Why 'harmonic'","the raised 7th strengthens chords"],
        ["Why 'melodic'","the raised 6th smooths the line"],
        ["A harmonic minor's ♯7","G♯"],
        ["Harmonic minor intervals","P1 M2 m3 P4 P5 m6 M7 P8"]]},
      result:(score)=>score>=7?"Minor scholar — all forms complete!":null }
  ],
  practiceIntro:"20 practice questions — forms, raises, directions and reasons. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Natural minor","no raised tones"],["Harmonic minor","raised 7th only"],["Melodic minor ascending","raised 6th and 7th"],["Melodic minor descending","identical to natural minor"],["Leading tone","half step below tonic"]], reverse:true}, count:6 },
    { gen:"rel-key", params:{ask:"both"}, count:3 },
    { type:"mc", q:"The natural minor scale uses…", choices:["only the tones of the relative major","one added sharp","two added sharps"], answer:0,
      explain:"It IS the relative major's material, re-homed (AEMT3 p.91)." },
    { type:"mc", q:"The harmonic minor raises which degree?", choices:["the 7th","the 6th","the 3rd"], answer:0,
      explain:"G→G♯ in A minor — ascending AND descending." },
    { type:"mc", q:"The melodic minor ascending raises…", choices:["the 6th and 7th","only the 7th","the 2nd and 3rd"], answer:0,
      explain:"F♯ and G♯ in A minor — for a smooth climb." },
    { type:"mc", q:"Descending, the melodic minor sounds like…", choices:["the natural minor","the harmonic minor","the major scale"], answer:0,
      explain:"The lifts cancel on the way down." },
    { type:"mc", q:"Which form does the book call the most frequently used?", choices:["Harmonic minor","Natural minor","Melodic minor"], answer:0,
      explain:"Its leading tone powers the strongest chords." },
    { type:"mc", q:"In A harmonic minor, the raised 7th is…", choices:["G♯","F♯","C♯"], answer:0,
      explain:"The 7th letter from A is G — raised to G♯." },
    { type:"truefalse", q:"The harmonic minor's ♯7 is cancelled when descending.", answer:false,
      explain:"Harmonic keeps it both ways; only MELODIC cancels." },
    { type:"truefalse", q:"The raised 7th of a minor scale acts as a leading tone.", answer:true,
      explain:"Half step below tonic = maximum pull." },
    { type:"truefalse", q:"In the harmonic minor, the interval tonic→7th is a Major 7th.", answer:true,
      explain:"A→G♯ = M7 (the book's interval chart)." },
    { type:"truefalse", q:"The melodic minor exists because F→G♯ was awkward to sing.", answer:true,
      explain:"Raising the 6th patches the 1½-step gap." }
  ],
  miaQuizIntro:"Final quiz! Natural, harmonic, melodic — know what changes, which way, and WHY.",
  quiz:[
    { type:"mc", q:"How many common forms does the minor scale have?", choices:["3","1","2","5"], answer:0,
      explain:"Natural, harmonic, melodic.", hint:"Today's whole lesson in one number." },
    { type:"mc", q:"The NATURAL minor scale…", choices:["uses only the tones of its relative major","raises the 7th","raises the 6th and 7th"], answer:0,
      explain:"The unaltered, factory-setting form.", hint:"'Natural' = untouched." },
    { type:"mc", q:"The HARMONIC minor scale raises the 7th…", choices:["ascending AND descending","ascending only","descending only"], answer:0,
      explain:"The raise is permanent in this form.", hint:"It's the consistent sibling." },
    { type:"mc", q:"The MELODIC minor scale ascending raises…", choices:["the 6th and 7th","only the 6th","the 4th and 5th"], answer:0,
      explain:"Two lifts for one smooth staircase.", hint:"6 & 7 → melody." },
    { type:"truefalse", q:"The melodic minor descends exactly like the natural minor.", answer:true,
      explain:"No leading-tone job downhill — the lifts cancel.", hint:"The round-trip game." },
    { type:"truefalse", q:"The harmonic minor is the most frequently used minor form.", answer:true,
      explain:"Straight from the book.", hint:"Its name hints at chords — music's engine." },
    { type:"mc", q:"The purpose of raising the 7th is to create…", choices:["a leading tone that pulls to the tonic","a louder scale","a new key signature"], answer:0,
      explain:"Half step below home = the tug you heard in the hook.", hint:"What did G♯ do to A?" },
    { type:"mc", q:"The awkward interval inside the harmonic minor lies between…", choices:["degrees 6 and ♯7","degrees 1 and 2","degrees 4 and 5"], answer:0,
      explain:"F to G♯: 1½ steps — the gap melodic minor fixes.", hint:"Right below the raised note." },
    { type:"mc", q:"Identify this scale.",
      staff:{clef:"treble",notes:[{p:"A3",d:"q"},{p:"B3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G#4",d:"q"},{p:"A4",d:"q"}],width:400},
      choices:["A harmonic minor","A natural minor","A melodic minor ascending"], answer:0,
      explain:"Only the 7th (G♯) is raised.", hint:"Count the sharps: one, on degree 7." },
    { type:"mc", q:"Identify this scale.",
      staff:{clef:"treble",notes:[{p:"A3",d:"q"},{p:"B3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F#4",d:"q"},{p:"G#4",d:"q"},{p:"A4",d:"q"}],width:400},
      choices:["A melodic minor ascending","A harmonic minor","A major"], answer:0,
      explain:"♯6 AND ♯7 going up = melodic.", hint:"Two sharps, top of the scale." },
    { type:"mc", q:"In the harmonic minor, ALL diatonic intervals from the tonic are…", choices:["perfect, major or minor","augmented or diminished","perfect only"], answer:0,
      explain:"P1 M2 m3 P4 P5 m6 M7 P8.", hint:"Same three families as the major scale." },
    { type:"mc", q:"A singer finds F→G♯ hard to pitch, so the composer writes F♯ before the G♯. The singer is now singing…", choices:["melodic minor","harmonic minor","natural minor"], answer:0,
      explain:"Raising the 6th for melodic smoothness is the melodic minor's whole reason to exist.", hint:"Which form was invented for SINGERS?" },
    /* generated */
    { gen:"term-match", params:{subject:"term", pool:[["Natural","no changes"],["Harmonic","♯7 both ways"],["Melodic up","♯6 ♯7"],["Melodic down","natural again"]], reverse:true}, count:3 },
    { gen:"rel-key", params:{ask:"both"}, count:3 }
  ],
  vocabulary:[
    {term:"Natural Minor", def:"The basic form — only the tones of the relative major, re-centered on the minor tonic.",
      staff:{clef:"treble",notes:[{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"q"},{p:"A4",d:"q"}],width:130}},
    {term:"Harmonic Minor", def:"Natural minor with a raised 7th — ascending AND descending. The most used form; its ♯7 is a leading tone.",
      staff:{clef:"treble",notes:[{p:"F4",d:"q"},{p:"G#4",d:"q"},{p:"A4",d:"h"}],width:130}},
    {term:"Melodic Minor", def:"Raised 6th and 7th ascending; descends as the natural minor.",
      staff:{clef:"treble",notes:[{p:"F#4",d:"q"},{p:"G#4",d:"q"},{p:"A4",d:"h"}],width:130}},
    {term:"Leading Tone", def:"A note one half step below the tonic, pulling strongly toward it — the raised 7th's new job."}
  ],
  mistakes:[],
  summary:[
    "✔ Three forms: <b>natural</b> (unchanged), <b>harmonic</b> (♯7, both directions), <b>melodic</b> (♯6 ♯7 up, natural down).",
    "✔ The raised 7th = a <b>leading tone</b> — a half step below home with maximum pull.",
    "✔ Harmonic minor is <b>the most frequently used</b>; its 6→♯7 gap (1½ steps) is its trademark sound.",
    "✔ Melodic minor raises the 6th to <b>smooth the climb</b>, then cancels everything downhill.",
    "✔ Harmonic minor intervals from the tonic: <b>P1 M2 m3 P4 P5 m6 M7 P8</b> — all P/M/m."
  ],
  tips:[
    "Memory hooks: 7 → HARMONY (chords need the leading tone), 6&7 → MELODY (lines need smoothness).",
    "That 6-to-♯7 gap is the sound of countless film scores and folk traditions — play F to G♯ and you'll recognize it instantly.",
    "Practice trick: sing 'up like major (almost), down like natural' for melodic minor.",
    "Next lesson the minor scale starts BUILDING: minor triads live on its degrees 1, 3 and 5."
  ],
  rewards:{ badge:"Three-Form Shapeshifter", icon:"\u{1F3AD}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"PERFECT! All three forms, both directions, every reason why. \u{1F3AD}\u{1F389}",
  miaPass:"Passed! Natural, harmonic, melodic — filed and findable. Minor triads await!",
  mia:{
    hook:{ label:"the welcome",
      explain:"Ending A used the natural 7th (G) — a whole step from home. Ending B raised it to G♯, a leading tone half a step from A: instant yearning.",
      play:()=>{[64,65,68,69].forEach((m,i)=>MFAudio.tone(m,.5,i*.4,.42));} },
    learn:{ label:"the three forms",
      explain:"Natural = untouched. Harmonic = ♯7 both ways (leading tone; most used). Melodic = ♯6♯7 up for smoothness, natural coming down.",
      hint:"7 → harmony; 6&7 → melody.",
      play:()=>{[57,59,60,62,64,65,68,69].forEach((m,i)=>MFAudio.tone(m,.4,i*.28,.4));} },
    example:{ label:"the examples",
      explain:"Example 1 plays all three forms back to back; example 2 takes melodic minor on its full round trip — lifted up, natural down." },
    game:{ label:"the games",
      explain:"Sprint the facts, climb the melodic round trip, spot forms on cards, then run the minor grand race.",
      hint:"Always check degrees 6 and 7 first." },
    quiz:{ label:"this question",
      explain:"Ask two things of any minor scale: WHAT is raised (nothing / 7 / 6+7), and does it stay raised coming DOWN (yes for harmonic, no for melodic)?",
      play:()=>{[64,65,68,69].forEach((m,i)=>MFAudio.tone(m,.5,i*.4,.42));} }
  }
};
