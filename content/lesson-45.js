/* Lesson 45 — Eighth Note Triplets (AEMT Book 2, Unit 11)
   Built from drafts/UNIT 11 – Lesson 45.md; AEMT p.70 verified by render.
   Core: triplet = 3 notes in the time of 2 of the same value; marked with a 3;
   count "tri-po-let" (primary; or 1-trip-let); famous in Nutcracker March & Arabesque.
   Uses staff.js v7.7 spec.tuplets:[{from,to}] (drawn 3 + 2/3-time playback).
   NOTE: edit by FULL-FILE REWRITE only. */

/* two-vs-three ear lab: even eighths or a triplet? */
function MF_L45_ear(container,fb){
  const ROUNDS=[true,false,true,false].sort(()=>Math.random()-.5);
  let i=0,heard=false;
  container.innerHTML=`<div class="big-q l45-q" style="text-align:center"></div>
    <div style="text-align:center"><button class="play l45-p">▶ Hear one beat</button></div>
    <div class="choices l45-ch" style="display:none"><button>\u{1F54A} Triplet — three smooth notes</button><button>\u{1F462} Even pair — two notes</button></div>`;
  const q=container.querySelector(".l45-q"), ch=container.querySelector(".l45-ch");
  function ask(){ heard=false; ch.style.display="none";
    q.textContent=`Beat ${i+1} of ${ROUNDS.length}: TWO even eighths, or a THREE-note triplet?`; }
  container.querySelector(".l45-p").onclick=()=>{
    const trip=ROUNDS[i];
    MFAudio.tone(48,.1,0,.6);
    if(trip){ [0,1,2].forEach(k=>MFAudio.tone(72,.16,k*.267,.5)); }
    else { [0,1].forEach(k=>MFAudio.tone(72,.22,k*.4,.5)); }
    heard=true; setTimeout(()=>ch.style.display="",1300);
  };
  [...ch.children].forEach((b,bi)=>b.onclick=()=>{
    if(!heard) return;
    const trip=ROUNDS[i];
    if((bi===0)===trip){ i++; MFAudio.yay();
      if(i>=ROUNDS.length){ ch.style.display="none"; container.querySelector(".l45-p").style.display="none";
        q.textContent="Two vs three: mastered!";
        fb(true,"✓ Four for four! Two even eighths split the beat in half; a triplet melts it into three equal drops. Your ear can now tell duple from triple instantly."); }
      else { fb(true,`✓ ${trip?"Triplet — tri-po-let!":"Even pair — 1 &."} Next beat…`); setTimeout(ask,900); } }
    else { MFAudio.tone(40,.25); fb(false,"Count along: does '1 &' fit, or does it need 'tri-po-let'?"); }
  });
  ask();
}

/* triplet tap: tap 3 evenly against the played beat */
function MF_L45_tap(container,fb){
  let taps=[], playing=false, t0=0;
  container.innerHTML=`<div class="big-q" style="text-align:center">Your turn to PLAY a triplet: press start, then tap the drum THREE times, evenly, inside each beat — “1-trip-let, 2-trip-let”!</div>
    <div style="text-align:center">
      <button class="play l45-tp">▶ Start (2 beats)</button>
      <button class="play l45-td" style="font-size:1.4rem">\u{1F941} TAP</button></div>
    <div class="l45-tm" style="text-align:center;font-weight:800;min-height:24px;color:var(--correct)"></div>`;
  const msg=container.querySelector(".l45-tm");
  const BPS=.9; /* seconds per beat */
  container.querySelector(".l45-tp").onclick=function(){
    if(playing) return; playing=true; taps=[]; this.disabled=true; msg.textContent="…tap tri-po-let on each beat!";
    [0,1].forEach(k=>MFAudio.tone(48,.12,k*BPS,.65));
    t0=performance.now();
    setTimeout(()=>{ playing=false; this.disabled=false;
      const targets=[]; [0,1].forEach(b=>[0,1,2].forEach(k=>targets.push((b+k/3)*BPS*1000)));
      let hit=0; targets.forEach(tt=>{ if(taps.some(tp=>Math.abs(tp-tt)<170)) hit++; });
      if(hit>=4&&taps.length<=8){ msg.textContent=`✓ ${hit} of 6 triplet slots hit!`;
        fb(true,`✓ You fit three even taps inside the beats — a real performed triplet. Smooth, not lumpy: that's the triplet feel of jazz, blues, and lullabies.`); }
      else { msg.textContent="Keep the three taps EVEN — try again!";
        fb(false,"Chant 'tri-po-let' out loud as you tap — three equal syllables, three equal taps."); }
    }, 2*BPS*1000+500);
  };
  container.querySelector(".l45-td").onclick=()=>{ if(!playing) return; MFAudio.tone(72,.1,0,.5); taps.push(performance.now()-t0); };
}

LESSON_CONTENT[45]={
  welcome:"Three notes, two notes' time. The triplet bends the beat without breaking it. \u{1F54A}",
  hook:{
    say:"Tchaikovsky's Nutcracker March hides today's rhythm. Listen: most beats split in TWO — but one beat suddenly melts into THREE. <b>Can you hear the melt?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center"><button class="play hk-a">▶ March fragment</button></div>
          <div class="choices hk-ch" style="display:none"><button>Yes — one beat flowed in three</button><button>No — every beat split in two</button></div>`;
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{
          MFAudio.tone(79,.25,0,.5); MFAudio.tone(79,.25,.4,.5);
          [0,1,2].forEach(k=>MFAudio.tone(76+k*2,.15,.8+k*.267,.5));
          MFAudio.tone(84,.5,1.6,.55);
          setTimeout(()=>ch.style.display="",2400);
        };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ That three-note swirl was an EIGHTH-NOTE TRIPLET — three notes squeezed into the time of two. Tchaikovsky, Debussy, every blues pianist: they all lean on it. Today it's yours.");
          else fb(false,"Play it again — listen for the beat that goes 'tri-po-let'.");
        });
      } }
  },
  objectives:[
    "Define a triplet (3 in the time of 2)",
    "Recognize the '3' marking on staff",
    "Count triplets: tri-po-let (or 1-trip-let)",
    "Hear duple vs triple beat divisions",
    "Perform even triplets against a beat",
    "Complete measures containing triplets"
  ],
  steps:[
    { say:"Definition first: when three notes are grouped with a small <b>3</b> above or below them, the group is a <b>TRIPLET</b> — <b>three notes played in the time of two notes of the same value</b>. An eighth-note triplet = 3 eighths in the time of 2 eighths (one quarter-note beat). \u{1F447} <b>An eighth-note triplet fills how much time?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:80,notes:[
        {p:"C5",d:"8",x:140},{p:"C5",d:"8",x:190},{p:"C5",d:"8",x:240},{p:"C5",d:"8",x:380},{p:"C5",d:"8",x:470},{bar:"final"}],
        beams:[[0,2],[3,4]],tuplets:[{from:0,to:2}],
        brackets:[{from:0,to:2,label:"triplet = 1 beat"},{from:3,to:4,label:"2 eighths = 1 beat"}],width:560} },
      try:{ type:"mc", choices:["One beat — same as two normal eighths","1½ beats","Three full beats"], answer:0,
        success:"✓ Three-in-the-time-of-two: the trio squeezes into ONE quarter-note beat. The 3 is the warning label.",
        fail:"The definition: 3 notes in the time of 2 eighths…",
        hint:"2 eighths = 1 beat, and the triplet borrows exactly that." } },
    { say:"Counting: instead of '1 &' you say '<b>tri-po-let</b>' (or '<b>1-trip-let</b>') — three even syllables spreading across the beat. 'tri-po-let, tri-po-let, 3 &, 4 &' mixes both worlds. \u{1F447} <b>Which count fits an eighth-note triplet on beat 2?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:80,time:"4/4",notes:[
        {p:"C5",d:"8",label:"1"},{p:"D5",d:"8",label:"&"},
        {p:"E5",d:"8",label:"tri"},{p:"F5",d:"8",label:"po"},{p:"G5",d:"8",label:"let"},
        {p:"E5",d:"q",label:"3"},{p:"C5",d:"q",label:"4"},{bar:"final"}],
        beams:[[0,1],[2,4]],tuplets:[{from:2,to:4}],width:560} },
      try:{ type:"mc", choices:["tri-po-let","2-e-&-a","2-&"], answer:0,
        success:"✓ Three even syllables for three even notes: tri-po-let. ('2-e-&-a' is FOUR sixteenths; '2-&' is two eighths.)",
        fail:"Count the notes in the group — three needs three syllables.",
        hint:"One syllable per note." } },
    { say:"Ear training — duple or triple? \u{1F447} <b>Two even eighths, or a triplet? Judge each beat:</b>",
      try:{ type:"custom",
        hint:"'1 &' = two; 'tri-po-let' = three smooth drops.",
        mount:(container,fb)=>MF_L45_ear(container,fb) } },
    { say:"Now PERFORM one. \u{1F447} <b>Tap three even notes inside each beat:</b>",
      try:{ type:"custom",
        hint:"Chant 'tri-po-let' aloud; your taps will follow your voice.",
        mount:(container,fb)=>MF_L45_tap(container,fb) } },
    { say:"Measure math: a triplet counts as <b>one beat</b> (in 2/4, 3/4, 4/4). So a 4/4 measure could hold: quarter + triplet + quarter + two eighths = 1+1+1+1 = 4. \u{1F447} <b>A 2/4 measure has one triplet. What else fits?</b>",
      try:{ type:"mc", choices:["One quarter note (1 beat)","Another two beats of notes","Nothing — it's full"], answer:0,
        success:"✓ Triplet (1 beat) + quarter (1 beat) = the full 2/4 measure. Triplets budget like any other single beat.",
        fail:"2 beats total, 1 used by the triplet…",
        hint:"The triplet spends exactly one beat." } },
    { say:"Connection to the last two lessons: a triplet is like borrowing <b>one beat of 6/8-feel</b> inside a simple meter — the same 'three little notes per pulse' you felt in fast 6/8, rented for a single beat. That's why triplets sound flowing and smooth. \u{1F447} <b>A triplet gives one beat the feel of…?</b>",
      try:{ type:"mc", choices:["Compound meter — three per pulse","Cut time — two per measure","A fermata"], answer:0,
        success:"✓ One beat of compound flow inside a duple world. Jazz 'swing' and blues shuffle live in exactly this space.",
        fail:"Where else did three little notes ride one pulse?",
        hint:"Lesson 43-44's bundles of three." } }
  ],
  examples:[
    { caption:"Straight eighths vs triplets, side by side — play and feel the beat first split in two, then melt into three.",
      staff:{clef:"treble",tempo:70,time:"2/4",notes:[
        {p:"C5",d:"8",label:"1"},{p:"C5",d:"8",label:"&"},
        {p:"C5",d:"8",label:"tri"},{p:"C5",d:"8",label:"po"},{p:"C5",d:"8",label:"let"},{bar:"single"},
        {p:"D5",d:"8",label:"tri"},{p:"D5",d:"8",label:"po"},{p:"D5",d:"8",label:"let"},
        {p:"C5",d:"q",label:"2"},{bar:"final"}],
        beams:[[0,1],[2,4],[6,8]],tuplets:[{from:2,to:4},{from:6,to:8}],width:600} },
    { caption:"À la Nutcracker — quarter, then a triplet swirl, then a resolving note: the triplet as a burst of motion inside a march.",
      staff:{clef:"treble",tempo:90,time:"4/4",notes:[
        {p:"G5",d:"q",label:"1"},{p:"G5",d:"8",label:"2"},{p:"G5",d:"8",label:"&"},
        {p:"E5",d:"8",label:"tri"},{p:"F5",d:"8",label:"po"},{p:"G5",d:"8",label:"let"},
        {p:"C6",d:"q",label:"4"},{bar:"final"}],
        beams:[[1,2],[3,5]],tuplets:[{from:3,to:5}],width:600} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Triplet Truths Sprint (45s)",
      intro:"Triplet facts and counts — match them before the clock!",
      miaIntro:"Tri-po-let, tri-po-let! \u{1F3C3}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Triplet","3 notes in the time of 2 of the same value"],
        ["Eighth-note triplet","3 eighths in one quarter-note beat"],
        ["The small 3","the mark that labels a triplet group"],
        ["Tri-po-let","the triplet count"],
        ["Tuplet","the general term for irregular groupings"],
        ["Triplet's total value","one beat in simple meter"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" triplet truths — flowing!":null },
    { type:"rhythm-tap", title:"Game 2 · Shuffle Tap Lab",
      intro:"Patterns mixing straight eighths and triplet feels — tap them true! (Triplet beats are marked.)",
      miaIntro:"Smooth, not lumpy! \u{1F54A}",
      spec:{tempo:70, rounds:2, patterns:[
        ["q","8","8","q"],
        ["8","8","q","q"]]},
      result:(score)=>score!==null?"Your shuffle is certified smooth!":null },
    { type:"measure-build", title:"Game 3 · Beat-Budget Builder",
      intro:"Fill a 4/4 measure — the TRIPLET button spends exactly one beat!",
      miaIntro:"Three notes, one beat's rent! \u{1F9F1}",
      spec:{beats:4, unique:false, buttons:[
        {t:"3",label:"Triplet (1 beat)",beats:1,item:{p:"B4",d:"q"}},
        {t:"q",label:"Quarter (1 beat)",beats:1,item:{p:"B4",d:"q"}},
        {t:"8",label:"Eighth (½)",beats:0.5,item:{p:"B4",d:"8"}},
        {t:"h",label:"Half (2)",beats:2,item:{p:"B4",d:"h"}}]},
      result:(score)=>score!==null?"Budgets balanced, triplets included!":null },
    { type:"term-race", title:"Game 4 · Triplet Vocabulary Race",
      intro:"Triplet, tuplet, the 3-mark, the count — final race of the lesson!",
      miaIntro:"Three-syllable sprint! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["Triplet","three notes in the time of two"],
        ["Eighth-note triplet","fills one quarter-note beat"],
        ["Bracket + 3","marks an unbeamed triplet"],
        ["1-trip-let","an alternative triplet count"],
        ["Swing / shuffle","styles built on the triplet feel"],
        ["Nutcracker March","Tchaikovsky piece famous for triplets"]]},
      result:(score)=>score>=7?"Triplet vocabulary: complete!":null }
  ],
  practiceIntro:"20 practice questions — definitions, counting, measure math, and the compound connection. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Triplet","3 notes in the time of 2 of the same value"],["Eighth-note triplet","3 eighths in one beat"],["The small 3","labels a triplet group"],["Tuplet","general term for irregular groupings"]], reverse:true}, count:4 },
    { type:"mc", q:"A triplet is a group of three notes played in the time of…", choices:["two notes of the same value","three notes of the same value","one note of the same value"], answer:0,
      explain:"3-in-the-time-of-2 (AEMT p.70)." },
    { type:"mc", q:"An eighth-note triplet equals…", choices:["one quarter note of time","one eighth note of time","1½ beats"], answer:0,
      explain:"Two eighths' worth = 1 beat." },
    { type:"mc", q:"A triplet group is marked with…", choices:["a small 3","a dot","a fermata"], answer:0,
      explain:"Above or below the beam/bracket." },
    { type:"mc", q:"Which count fits a triplet?", choices:["tri-po-let","1-e-&-a","1-&"], answer:0,
      explain:"Three even syllables for three even notes." },
    { type:"mc", q:"In 4/4, a measure with two triplets has used…", choices:["2 beats","3 beats","6 beats"], answer:0,
      explain:"Each triplet = 1 beat." },
    { type:"truefalse", q:"The three notes of a triplet are played evenly.", answer:true,
      explain:"Three equal drops — never long-short-short." },
    { type:"truefalse", q:"An eighth-note triplet lasts longer than two normal eighth notes.", answer:false,
      explain:"Identical total time — that's the whole trick." },
    { type:"mc", q:"'Tuplet' means…", choices:["any irregular rhythmic grouping","only triplets","a two-note slur"], answer:0,
      explain:"Triplets are the most common tuplet." },
    { type:"mc", q:"The triplet gives one beat the feel of…", choices:["compound meter","cut time","a rest"], answer:0,
      explain:"Three-per-pulse, rented for one beat." },
    { type:"mc", q:"Swing and blues shuffle grooves are built from…", choices:["the triplet feel","dotted whole notes","sixteenth rests"], answer:0,
      explain:"The flowing 3-in-2 division defines those styles." }
  ],
  miaQuizIntro:"Three even drops per beat — flow through the final quiz!",
  quiz:[
    { type:"mc", q:"A triplet is…", choices:["3 notes played in the time of 2 of the same value","3 notes played as fast as possible","3 notes tied together","a chord of 3 notes"], answer:0,
      explain:"The 3-in-2 definition.", hint:"Time borrowed from two." },
    { type:"mc", q:"An eighth-note triplet occupies…", choices:["one quarter-note beat","half a beat","1½ beats","three beats"], answer:0,
      explain:"= two normal eighths.", hint:"What do 2 eighths fill?" },
    { type:"mc", q:"The number that marks a triplet is…", choices:["3","2","6","8"], answer:0,
      explain:"Above or below the group.", hint:"Count the notes." },
    { type:"mc", q:"Triplets are counted…", choices:["tri-po-let","1-e-&-a","1-and-then","one-two"], answer:0,
      explain:"Or '1-trip-let' — three even syllables.", hint:"Three syllables." },
    { type:"truefalse", q:"A triplet's three notes are spaced evenly across the beat.", answer:true,
      explain:"Equal thirds of the beat.", hint:"Smooth, not lumpy." },
    { type:"truefalse", q:"In 4/4, an eighth-note triplet counts as two beats.", answer:false,
      explain:"One beat — the time of two eighths.", hint:"Same as '1 &'." },
    { type:"mc", q:"Name this rhythm.",
      staff:{clef:"treble",notes:[{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"}],beams:[[0,2]],tuplets:[{from:0,to:2}],width:200},
      choices:["Eighth-note triplet","Three sixteenths","Dotted eighth pair"], answer:0,
      explain:"Three beamed eighths under a 3.", hint:"See the little 3?" },
    { type:"mc", q:"Which fills a 2/4 measure?", choices:["triplet + quarter note","triplet + half note","three triplets"], answer:0,
      explain:"1 + 1 = 2 beats.", hint:"Triplet = 1 beat." },
    { type:"mc", q:"'1 &' vs 'tri-po-let' — the difference is…", choices:["two even notes vs three even notes in the beat","loud vs soft","short vs long beats"], answer:0,
      explain:"Duple vs triple division of the SAME beat.", hint:"Count the attacks." },
    { type:"mc", q:"The general term for irregular groupings like triplets is…", choices:["tuplet","doublet","bracket","tie"], answer:0,
      explain:"Triplets, quintuplets… all tuplets.", hint:"Starts like 'tuple'." },
    { type:"mc", q:"Which famous piece opens its march with triplet swirls?", choices:["Tchaikovsky's Nutcracker March","Beethoven's Ode to Joy","Twinkle Twinkle"], answer:0,
      explain:"The AEMT example — with Debussy's Arabesque No. 1.", hint:"A Christmas ballet." },
    { type:"mc", q:"A triplet borrows the feel of…", choices:["6/8's three-per-pulse flow","cut time's two big beats","a whole rest"], answer:0,
      explain:"One beat of compound inside simple meter.", hint:"Last lesson's bundles." },
    /* generated */
    { gen:"term-match", params:{subject:"term", pool:[["Triplet","3 notes in the time of 2 of the same value"],["Eighth-note triplet","3 eighths in one beat"],["Tri-po-let","the triplet count"],["Tuplet","general term for irregular groupings"]], reverse:true}, count:4 },
    { gen:"note-value", params:{values:["8","q","q."],ask:"beats"}, count:2 }
  ],
  vocabulary:[
    {term:"Triplet", def:"A group of three notes played in the time normally occupied by two notes of the same value — marked with a small 3.",
      staff:{clef:"treble",notes:[{p:"B4",d:"8"},{p:"B4",d:"8"},{p:"B4",d:"8"}],beams:[[0,2]],tuplets:[{from:0,to:2}],width:160}},
    {term:"Eighth-Note Triplet", def:"Three eighth notes performed in the time of one quarter note (two regular eighths) — one full beat."},
    {term:"Tuplet", def:"The general term for rhythmic groupings that divide the beat into irregular numbers of notes."},
    {term:"Bracket", def:"A curved or straight line with the number 3, marking a triplet when the notes aren't joined by a beam."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Triplet = 3 notes in the time of 2</b> of the same value, marked with a small <b>3</b>.",
    "✔ An eighth-note triplet fills exactly <b>one quarter-note beat</b>.",
    "✔ Count '<b>tri-po-let</b>' (or 1-trip-let) — three EVEN syllables.",
    "✔ Budget triplets as one beat in measure math.",
    "✔ The triplet rents one beat of compound (three-per-pulse) flow — the engine of swing and shuffle."
  ],
  tips:[
    "Evenness drill: alternate one '1 &' beat with one 'tri-po-let' beat, back and forth, until switching is effortless.",
    "Don't let triplets collapse into a dotted-8th+16th limp — three EQUAL notes, no swagger.",
    "Listen for triplets tonight: the Nutcracker March, Debussy's Arabesque No. 1, any slow blues.",
    "Next lesson finishes Unit 11: pick-up notes and syncopation — rhythm's grand entrance and its off-beat kick."
  ],
  rewards:{ badge:"Triplet Tamer", icon:"\u{1F54A}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"A perfect score — three-for-three on every beat! \u{1F54A}\u{1F389}",
  miaPass:"Passed! Keep the chant: tri-po-let, smooth and even.",
  mia:{
    hook:{ label:"the welcome",
      explain:"The fragment split its beats in two — until one beat swirled in THREE: an eighth-note triplet, straight out of the Nutcracker March.",
      play:()=>{MFAudio.tone(79,.25,0,.5);MFAudio.tone(79,.25,.4,.5);[0,1,2].forEach(k=>MFAudio.tone(76+k*2,.15,.8+k*.267,.5));MFAudio.tone(84,.5,1.6,.55);} },
    learn:{ label:"triplets",
      explain:"3 notes in the time of 2, marked with a 3, counted tri-po-let, worth one beat. Even spacing is everything.",
      hint:"Three EQUAL drops per beat.",
      play:()=>{[0,1,2].forEach(k=>MFAudio.tone(72,.16,k*.27,.5));} },
    example:{ label:"the examples",
      explain:"Example 1 alternates straight eighths with triplets so you can feel the melt; example 2 plants a triplet swirl inside a march." },
    game:{ label:"the games",
      explain:"Sprint the truths, tap the shuffle, budget beats with the triplet button, then race the vocabulary.",
      hint:"Everything hangs on 3-in-the-time-of-2." },
    quiz:{ label:"this question",
      explain:"One definition answers nearly all of it: three notes, time of two, one beat, counted tri-po-let.",
      play:()=>{[0,1,2].forEach(k=>MFAudio.tone(74,.15,k*.26,.5));} }
  }
};
