/* Lesson 67 — Composing a Melody in a Major Key (AEMT Book 3, Unit 16 FINALE)
   Built from drafts/UNIT 16 – Lesson 67.md; AEMT3 p.105 verified by render.
   Core: COMPOSE = create a melody for a chord progression (the reverse of
   harmonizing). Method: analyze the progression (numerals below, symbols
   above) → melody from CHORD TONES + non-harmonic decorations. The first
   and last melody note tends to be the ROOT of I; V(7) precedes the last
   chord. The book labels melody notes R / 3 / 5 / 7 / P (chord member or
   passing tone) — as in its Ghanaian folk-song model.
   NOTE: edit by FULL-FILE REWRITE only. */

/* compose-a-melody: pick a chord tone per measure, then hear your piece */
function MF_L67_compose(container,fb){
  const MEAS=[
    {label:"I", sym:"C", tones:{C:60,E:64,G:67}, chord:[48,64,67], must:"C",
      note:"Rule: a melody TENDS TO BEGIN on the root of I."},
    {label:"IV", sym:"F", tones:{F:65,A:69,C:72}, chord:[53,65,69],
      note:"Any tone of F-A-C sings here."},
    {label:"I", sym:"C", tones:{C:72,E:76,G:67}, chord:[48,64,67],
      note:"Back home — pick any C-chord tone."},
    {label:"V7", sym:"G7", tones:{G:67,B:71,D:74,F:77}, chord:[43,67,71,77],
      note:"The dominant before the close — B (the leading tone) loves this spot."},
    {label:"I", sym:"C", tones:{C:72}, chord:[48,64,67], must:"C",
      note:"Rule: end on the ROOT of the final I."}];
  let k=0; const picked=[];
  container.innerHTML=`<div class="big-q l67c-q" style="text-align:center"></div>
    <div class="l67c-map" style="text-align:center;font-weight:800;letter-spacing:1px;margin:6px 0"></div>
    <div class="choices chips l67c-ch"></div>
    <div style="text-align:center"><button class="play l67c-play" style="display:none">▶ Play YOUR composition</button></div>`;
  const q=container.querySelector(".l67c-q"), map=container.querySelector(".l67c-map"), ch=container.querySelector(".l67c-ch"), pl=container.querySelector(".l67c-play");
  function drawMap(){ map.textContent=MEAS.map((m,i)=>`${m.label}:${i<picked.length?picked[i].name:"·"}`).join("  |  "); }
  function ask(){
    drawMap();
    if(k>=MEAS.length){ q.textContent="Composition complete — five measures, all yours. Press play, composer!"; ch.innerHTML=""; pl.style.display="inline-block"; return; }
    const M=MEAS[k];
    q.innerHTML=`Measure ${k+1} — chord: <b>${M.sym} (${M.label})</b>. ${M.must?`<b>Required: ${M.must}</b> — `:""}pick your melody note. <i>${M.note}</i>`;
    ch.innerHTML="";
    const opts=Object.keys(M.tones);
    if(!M.must) opts.push(k===1?"B":"F#"); /* one outsider distractor */
    opts.sort(()=>Math.random()-.5).forEach(name=>{
      const b=document.createElement("button"); b.textContent=name;
      b.onclick=()=>{
        const M2=MEAS[k];
        if(M2.must && name!==M2.must){ MFAudio.tone(40,.2); fb(false,`The ${k===0?"first":"last"} note tends to be the ROOT of the I chord — that's ${M2.must}.`); return; }
        if(M2.tones[name]===undefined){ MFAudio.tone(40,.2); fb(false,`${name} isn't a tone of ${M2.sym} — for the skeleton, stay INSIDE the chord. (Decorations come later!)`); return; }
        MFAudio.yay();
        MFAudio.tone(M2.tones[name],.7,0,.42);
        M2.chord.forEach(m=>MFAudio.tone(m,.8,0,.2));
        picked.push({name, midi:M2.tones[name]}); k++;
        fb(true,`✓ ${name} over ${M2.sym} — a chord tone doing its job.`);
        setTimeout(ask,1000);
      };
      ch.appendChild(b);
    });
  }
  pl.onclick=()=>{
    picked.forEach((p,i)=>{
      MFAudio.tone(p.midi,.8,i*.85,.44);
      MEAS[i].chord.forEach(m=>MFAudio.tone(m,.85,i*.85,.2));
    });
    setTimeout(()=>fb(true,"✓ You COMPOSED that — begins on the root, closes V7 → I on the root. Try again for a different tune; every choice makes a new melody!"),4700);
  };
  ask();
}

LESSON_CONTENT[67]={
  welcome:"The Unit 16 finale — today you stop analyzing music and START WRITING IT. \u{270D}\u{FE0F}",
  hook:{
    say:"Here's a bare chord progression: I - IV - I - V7 - I. Now the same progression with a <b>melody composed on top</b>. <b>Where did that melody's notes come from?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Chords alone</button>
          <button class="play hk-b">▶ Chords + composed melody</button></div>
          <div class="choices hk-ch" style="display:none"><button>Mostly from INSIDE each chord (plus a passing tone)</button><button>From a completely different key</button><button>Random notes</button></div>`;
        const chords=[[48,64,67],[53,65,69],[48,64,67],[43,67,71,77],[48,64,67]];
        const mel=[72,69,76,74,72];
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ chords.forEach((row,i)=>row.forEach(m=>MFAudio.tone(m,.85,i*.9,.25))); hA=true; if(hB) setTimeout(()=>ch.style.display="",4700); };
        container.querySelector(".hk-b").onclick=()=>{ chords.forEach((row,i)=>{ row.forEach(m=>MFAudio.tone(m,.85,i*.9,.2)); MFAudio.tone(mel[i],.8,i*.9,.44); }); hB=true; if(hA) setTimeout(()=>ch.style.display="",4700); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Each melody note was a CHORD TONE of its measure's chord — C from C major, A from F major, E from C, D from G7, home to C. Composing = harmonizing in reverse, and today it's YOUR turn!");
          else fb(false,"Listen again — every melody note agreed perfectly with its chord…");
        });
      } }
  },
  objectives:[
    "Define composing: creating a melody for a chord progression",
    "Analyze first: numerals below the staff, symbols above",
    "Build the melody skeleton from CHORD TONES",
    "Decorate with passing and neighboring tones",
    "Begin and end on the root of I; V(7) precedes the last chord",
    "Read the book's R / 3 / 5 / P melody labels"
  ],
  steps:[
    { say:"The definition: just as you added chords to a melody, <b>you can COMPOSE (create or write) a melody to a previously written chord progression</b> — harmonizing, reversed. \u{1F447} <b>Composing, in this lesson, means…</b>",
      try:{ type:"mc", choices:["Writing a melody to fit a given progression","Writing a progression to fit a melody","Copying an existing tune"], answer:0,
        success:"✓ The chords come first this time; the tune is yours to invent.",
        fail:"Which direction is the REVERSE of Lesson 64?",
        hint:"Progression → melody." } },
    { say:"Step one is always ANALYSIS: <b>write the Roman numerals under the chords, then the chord symbols above the staff</b>. Know your materials before you build. \u{1F447} <b>Why analyze before composing?</b>",
      try:{ type:"mc", choices:["Each measure's chord tells you which melody notes will fit","It makes the page look professional","Analysis replaces composing"], answer:0,
        success:"✓ The progression is your palette — each chord hands you three or four guaranteed-good notes.",
        fail:"What did every melody note in the hook have in common with its chord?",
        hint:"Chord tones = safe notes." } },
    { say:"The material: build your melody from <b>chord tones</b>, then <b>add non-harmonic tones (passing and neighboring) to make it more interesting</b> — Lesson 66's toolkit, now in creation mode. \u{1F447} <b>The skeleton/decoration split is…</b>",
      try:{ type:"mc", choices:["Skeleton = chord tones; decoration = passing & neighboring tones","Skeleton = rests; decoration = chords","There is no split"], answer:0,
        success:"✓ Bones first, ornaments second — exactly how the book's model melody is labeled.",
        fail:"Which notes are guaranteed to fit? Which ones bridge them?",
        hint:"Lesson 66 built the decoration kit." } },
    { say:"The frame rules: <b>the first and last note of a melody tends to be the ROOT of the I chord</b>, and <b>a V (or V7) usually precedes the last chord</b>. \u{1F447} <b>A melody in C major should probably begin and end on…</b>",
      try:{ type:"mc", choices:["C","G","B"], answer:0,
        success:"✓ Home-to-home. And the second-to-last measure will usually carry G7 pointing the way.",
        fail:"The root of I in C major is…",
        hint:"The tonic itself." } },
    { say:"Reading the book's labels: under its model melody, each note carries <b>R (root), 3 (3rd), 5 (5th), 7</b> — or <b>P for passing tone</b>. Decode this measure over a C chord: \u{1F447} <b>the D is labeled…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:100,notes:[
        {p:"E4",d:"q",label:"3"},{p:"D4",d:"q",label:"?"},{p:"C4",d:"q",label:"R"},{p:"G4",d:"h",label:"5"},{bar:"final"}],width:420} },
      try:{ type:"mc", choices:["P — a passing tone between 3 and R","5 — the chord's fifth","R — a second root"], answer:0,
        success:"✓ E(3) → D(P) → C(R): the outsider bridges two chord members, so it earns a P.",
        fail:"Is D inside C-E-G?",
        hint:"Chord member or bridge?" } },
    { say:"THE MAIN EVENT: compose your own five-measure melody over <b>I - IV - I - V7 - I</b>. \u{1F447}",
      try:{ type:"custom",
        hint:"Chord tones only for the skeleton; first and last notes are fixed by the frame rule.",
        mount:(container,fb)=>MF_L67_compose(container,fb) } },
    { say:"Transfer: composing over a G major progression (G - C - D7 - G). \u{1F447} <b>Your first note should probably be…</b>",
      try:{ type:"mc", choices:["G — the root of the I chord","C — the loudest note","F♯ — the leading tone"], answer:0,
        success:"✓ Root of I, first and last — in any key. You now own the complete composer's checklist: analyze, skeleton, decorate, frame.",
        fail:"What's the I chord in G major, and what's its root?",
        hint:"Same frame rule, new key." } }
  ],
  examples:[
    { caption:"A composed melody with the book's labels: every note is R, 3, 5 — or P for a passing tone. The skeleton is pure chord tones; the P notes are the seasoning.",
      staff:{clef:"treble",tempo:100,notes:[
        {p:"C5",d:"q",label:"R"},{p:"E5",d:"q",label:"3"},{p:"G5",d:"q",label:"5"},{p:"E5",d:"q",label:"3"},
        {p:"A4",d:"q",label:"3 (of IV)"},{p:"B4",d:"q",label:"P"},{p:"C5",d:"h",label:"5 (of IV)"},
        {p:"E5",d:"q",label:"3 (of I)"},{p:"D5",d:"q",label:"5 (of V7)"},{p:"B4",d:"q",label:"3 (of V7)"},{p:"D5",d:"q",label:"5"},
        {p:"C5",d:"w",label:"R (of I) — home!"},{bar:"final"}],width:660},
      kb:{start:57,octaves:2,labels:true} },
    { caption:"Before and after decoration: the same skeleton (chord tones only), then with passing tones slipped onto the weak beats. Hear how the P notes turn blocks into a line.",
      staff:{clef:"treble",tempo:100,notes:[
        {p:"C4",d:"h",label:"skeleton…"},{p:"E4",d:"h"},{p:"G4",d:"h"},{p:"C5",d:"h"},{bar:"double"},
        {p:"C4",d:"q",label:"…decorated!"},{p:"D4",d:"q",label:"P"},{p:"E4",d:"q"},{p:"F4",d:"q",label:"P"},{p:"G4",d:"q"},{p:"A4",d:"q",label:"P"},{p:"B4",d:"q",label:"P"},{p:"C5",d:"q"},{bar:"final"}],width:640},
      kb:{start:60,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Composer's Checklist Sprint (45s)",
      intro:"Analyze, skeleton, decorate, frame — race the method!",
      miaIntro:"The four-step checklist! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["To compose","create a melody for a chord progression"],
        ["Step 1","analyze: numerals below, symbols above"],
        ["The skeleton","chord tones"],
        ["The decorations","passing and neighboring tones"],
        ["First & last melody note","the root of the I chord"],
        ["Before the last chord","V or V7"],
        ["R / 3 / 5 labels","which chord member the note is"],
        ["P label","a passing tone"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — checklist locked in!":null },
    { type:"key-climb", title:"Game 2 · Play the Model Melody",
      intro:"Perform the example's first phrase: R-3-5-3 on C, then 3-P-5 on F!",
      miaIntro:"Composer, meet performer! \u{1FA9C}",
      spec:{seq:[72,76,79,76, 69,71,72],
        names:["C (R)","E (3)","G (5)","E (3)","A (3rd of F)","B (P — passing!)","C (5th of F)"],
        start:60, octaves:2, title:"The model melody, phrase one"},
      result:(score)=>score!==null?"Composed AND performed!":null },
    { type:"symbol-hunt", title:"Game 3 · Safe-Note Spotter",
      intro:"A chord is called — click the melody fragment that fits ENTIRELY inside it!",
      miaIntro:"Skeleton notes only! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Fits the C chord (C-E-G)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"E4",d:"q"}],width:170}},
        {label:"Fits the F chord (F-A-C)", spec:{clef:"treble",notes:[{p:"F4",d:"q"},{p:"A4",d:"q"},{p:"C5",d:"q"},{p:"A4",d:"q"}],width:170}},
        {label:"Fits the G7 chord (G-B-D-F)", spec:{clef:"treble",notes:[{p:"G4",d:"q"},{p:"B4",d:"q"},{p:"D5",d:"q"},{p:"F5",d:"q"}],width:170}},
        {label:"Fits NO single chord (scale run)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"}],width:170}}]},
      result:(score)=>score>=5?"Safe notes spotted instantly!":null },
    { type:"term-race", title:"Game 4 · UNIT 16 GRAND FINALE Race",
      intro:"The victory lap — harmonizing, textures, outsiders and composing!",
      miaIntro:"Everything from Unit 16 — GO! \u{1F3C6}",
      spec:{rounds:10, reverse:true, pool:[
        ["To harmonize","add chords to a melody"],
        ["To compose","add a melody to chords"],
        ["Degrees 1,3,5","the I chord's row"],
        ["Degrees 1,4,6","the IV chord's row"],
        ["Block chord","tones together"],
        ["Arpeggio","tones in sequence — 'upon a harp'"],
        ["Passing tone","bridges two different chord tones"],
        ["Neighboring tone","out and back to the same tone"],
        ["First & last note","root of I"],
        ["The pre-final chord","V or V7"]]},
      result:(score)=>score>=8?"UNIT 16 CHAMPION — a real composer now!":null }
  ],
  practiceIntro:"20 practice questions — the method, the labels and the frame rules. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Compose","melody for a progression"],["Analyze first","numerals below, symbols above"],["Skeleton","chord tones"],["Decoration","passing & neighboring tones"],["R","the root as a melody note"],["P","a passing tone"]], reverse:true}, count:6 },
    { gen:"triad-id", params:{ask:"numeral"}, count:2 },
    { type:"mc", q:"To COMPOSE, in this lesson, means to…", choices:["create a melody for a chord progression","play by ear","write a drum part"], answer:0,
      explain:"The reverse of harmonizing (AEMT3 p.105)." },
    { type:"mc", q:"Before writing any melody notes, you should…", choices:["analyze the progression: numerals below, symbols above","choose a tempo","erase the chords"], answer:0,
      explain:"Know the palette first." },
    { type:"mc", q:"The melody's first and last note tends to be…", choices:["the root of the I chord","the leading tone","degree 5"], answer:0,
      explain:"Home at both ends." },
    { type:"mc", q:"The chord that usually precedes the final chord is…", choices:["V or V7","IV","ii"], answer:0,
      explain:"The cadence rule, one more time." },
    { type:"mc", q:"Over an F chord (F-A-C), which melody notes are 'safe' skeleton notes?", choices:["F, A and C","any white key","only F"], answer:0,
      explain:"Chord tones = guaranteed fits." },
    { type:"mc", q:"The book's label 'P' under a melody note means…", choices:["passing tone","perfect","piano"], answer:0,
      explain:"The one non-chord label in the model." },
    { type:"truefalse", q:"A composed melody may include non-harmonic tones.", answer:true,
      explain:"They make it MORE interesting — the book says so." },
    { type:"truefalse", q:"Every note of a composed melody must be a chord tone.", answer:false,
      explain:"Skeleton yes; decorations no." },
    { type:"truefalse", q:"The numbers between the staffs (R, 3, 5) name each melody note's chord member.", answer:true,
      explain:"The book's analysis labels." },
    { type:"truefalse", q:"Composing and harmonizing are the same process in opposite directions.", answer:true,
      explain:"Melody→chords vs chords→melody." }
  ],
  miaQuizIntro:"The Unit 16 finale quiz! Analyze, skeleton, decorate, frame — compose your answers.",
  quiz:[
    { type:"mc", q:"COMPOSING a melody, as taught here, starts from…", choices:["a previously written chord progression","a blank page with no chords","someone else's melody"], answer:0,
      explain:"Chords first, tune second.", hint:"What does the exercise page give you?" },
    { type:"mc", q:"The first analysis step is writing…", choices:["Roman numerals under the chords and symbols above the staff","the melody immediately","the time signature"], answer:0,
      explain:"Map before you travel.", hint:"Numerals below, symbols above." },
    { type:"mc", q:"The main source of melody notes is…", choices:["the tones of each measure's chord","the chromatic scale","the drum pattern"], answer:0,
      explain:"Chord tones are the skeleton.", hint:"The hook's discovery." },
    { type:"mc", q:"To make the melody MORE INTERESTING, the book says to add…", choices:["passing and neighboring tones","more rests","louder dynamics"], answer:0,
      explain:"Lesson 66's toolkit, applied.", hint:"The legal outsiders." },
    { type:"truefalse", q:"The first and last note of a melody tends to be the root of the I chord.", answer:true,
      explain:"The frame rule.", hint:"Home-to-home." },
    { type:"truefalse", q:"A V or V7 chord usually precedes the last chord.", answer:true,
      explain:"The cadence sets up the landing.", hint:"Third time this unit!" },
    { type:"mc", q:"Over a G7 measure, which is NOT a skeleton note?", choices:["A","G","B","F"], answer:0,
      explain:"G7 = G-B-D-F; A is an outsider (it could only visit as a decoration).", hint:"Spell G7." },
    { type:"mc", q:"In the label set R / 3 / 5 / P, the letters and numbers refer to…", choices:["the melody note's role in the current chord","finger numbers","measure numbers"], answer:0,
      explain:"Root, third, fifth — or passing.", hint:"Chord-member ID badges." },
    { type:"mc", q:"A melody measure over C major reads E-D-C. The best labels are…", choices:["3 - P - R","R - 3 - 5","5 - 3 - R"], answer:0,
      explain:"E is the 3rd, C the root; D bridges them.", hint:"Which note is the outsider?" },
    { type:"mc", q:"You're composing in F major. Your final two measures should likely carry…", choices:["C7 then F, melody ending on F","B♭ then G, ending on A","F then C7, ending on C"], answer:0,
      explain:"V7→I with the root on top — frame complete.", hint:"V7 of F is C7." },
    { type:"mc", q:"Two students compose over the same progression and produce different melodies. Who's right?", choices:["Both — the chord tones offer many valid paths","Only the one using roots","Neither — progressions allow one melody"], answer:0,
      explain:"Composition is choice; the rules just keep the choices musical.", hint:"Your builder made a unique tune too." },
    { type:"mc", q:"The complete composer's checklist, in order, is…", choices:["analyze → chord-tone skeleton → decorate → check the frame","decorate → analyze → skeleton","skeleton → analyze → frame → erase"], answer:0,
      explain:"Four steps to a real melody.", hint:"What did you do in the builder?" },
    /* generated */
    { gen:"term-match", params:{subject:"term", pool:[["Compose","chords → melody"],["Harmonize","melody → chords"],["Skeleton","chord tones"],["P","passing tone"]], reverse:true}, count:3 },
    { gen:"triad-id", params:{ask:"numeral"}, count:2 },
    { gen:"inversion-id", params:{subject:"triad", ask:"position"}, count:1 }
  ],
  vocabulary:[
    {term:"Compose", def:"To create (write) a melody for a previously written chord progression — harmonizing in reverse."},
    {term:"Melody Skeleton", def:"The chord tones that anchor a composed melody — one safe note set per measure."},
    {term:"R / 3 / 5 / P Labels", def:"The book's analysis marks: which chord member each melody note is — or P for a passing tone."},
    {term:"The Frame Rule", def:"Begin and end on the root of I; let V(7) set up the final chord."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Composing</b> = writing a melody over a given progression — the reverse of harmonizing.",
    "✔ Method: <b>analyze</b> (numerals below, symbols above) → <b>skeleton from chord tones</b> → <b>decorate</b> with passing/neighboring tones.",
    "✔ Frame: <b>first and last note = root of I</b>; <b>V(7) precedes the final chord</b>.",
    "✔ The labels <b>R / 3 / 5 / P</b> name each melody note's job.",
    "✔ Many melodies fit one progression — <b>your choices make yours</b>. UNIT 16 COMPLETE! \u{1F389}"
  ],
  tips:[
    "Composer's warm-up: take ANY progression you know and hum only roots. Then upgrade some roots to 3rds and 5ths. Then add one passing tone. Congratulations — you compose.",
    "The 3rd of each chord is the juiciest melody note — it carries the chord's whole personality.",
    "Steal the book's trick: label your own melodies R/3/5/P and see whether the P's land on weak beats.",
    "Unit 17 takes composing into MINOR keys — and then somewhere unexpected: the blues."
  ],
  rewards:{ badge:"Composer's Quill — Unit 16 Champion", icon:"\u{270D}\u{FE0F}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"PERFECT — analyzed, built, decorated and framed! Unit 16 bows to its newest composer. \u{270D}\u{FE0F}\u{1F3C6}\u{1F389}",
  miaPass:"Passed — and Unit 16 is COMPLETE! You harmonize, you texture, you decorate, you COMPOSE. \u{1F389}",
  mia:{
    hook:{ label:"the welcome",
      explain:"The melody's notes came from inside each measure's chord: C, A, E, D, C over C-F-C-G7-C. Chord tones are the composer's palette.",
      play:()=>{const chords=[[48,64,67],[53,65,69],[48,64,67],[43,67,71,77],[48,64,67]],mel=[72,69,76,74,72];chords.forEach((row,i)=>{row.forEach(m=>MFAudio.tone(m,.85,i*.9,.2));MFAudio.tone(mel[i],.8,i*.9,.44);});} },
    learn:{ label:"composing",
      explain:"Analyze the progression, build a skeleton from chord tones, decorate with passing/neighboring tones, frame it: root of I at both ends, V(7) before the close.",
      hint:"Analyze → skeleton → decorate → frame.",
      play:()=>{[72,76,79,76].forEach((m,i)=>MFAudio.tone(m,.5,i*.45,.42));} },
    example:{ label:"the examples",
      explain:"Example 1 is a fully labeled composed melody (R/3/5/P); example 2 shows the same skeleton before and after decoration." },
    game:{ label:"the games",
      explain:"Sprint the checklist, perform the model, spot safe notes, then run the Unit 16 victory lap.",
      hint:"Chord tones first — always." },
    quiz:{ label:"this question",
      explain:"Every question is one of the four steps: analyze, skeleton, decorate, frame. Identify which step, and the answer follows.",
      play:()=>{[67,71,74,77].forEach(m=>MFAudio.tone(m,.8,0,.3));[60,64,67,72].forEach(m=>MFAudio.tone(m,1,.9,.32));} }
  }
};
