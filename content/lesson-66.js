/* Lesson 66 — Passing and Neighboring Tones (AEMT Book 3, Unit 16)
   Built from drafts/UNIT 16 – Lesson 66.md; AEMT3 p.104 verified by render.
   Core: NON-HARMONIC TONES = melody notes not in the harmony chord.
   PASSING TONE: steps between two DIFFERENT chord tones. NEIGHBORING TONE:
   leaves and returns to the SAME chord tone — UPPER (above) or LOWER (below).
   Both usually fall on WEAK beats, and should NOT influence chord choice.
   NOTE: edit by FULL-FILE REWRITE only. */

/* tone detective: tap the non-harmonic tone, then classify it */
function MF_L66_detect(container,fb){
  const ROUNDS=[
    {chord:"C (C-E-G)", ps:["C4","D4","E4"], nh:1, kind:0,
      expl:"C and E are chord tones; D bridges two DIFFERENT ones — a PASSING tone."},
    {chord:"C (C-E-G)", ps:["E4","F4","E4"], nh:1, kind:1,
      expl:"The melody leaves E and returns to the SAME E from above — an UPPER NEIGHBORING tone."},
    {chord:"C (C-E-G)", ps:["G4","F#4","G4"], nh:1, kind:2,
      expl:"Leaves G, dips below, returns to the same G — a LOWER NEIGHBORING tone."},
    {chord:"F (F-A-C)", ps:["F4","G4","A4"], nh:1, kind:0,
      expl:"F up to A with G between: two different chord tones bridged — PASSING."}];
  const KINDS=["Passing tone","Upper neighbor","Lower neighbor"];
  let r=0, found=false;
  container.innerHTML=`<div class="big-q l66d-q" style="text-align:center"></div>
    <div class="l66d-staff"></div>
    <div class="choices chips l66d-ch" style="display:none"><button>Passing tone</button><button>Upper neighbor</button><button>Lower neighbor</button></div>`;
  const q=container.querySelector(".l66d-q"), holder=container.querySelector(".l66d-staff"), ch=container.querySelector(".l66d-ch");
  function ask(){
    if(r>=ROUNDS.length){ q.textContent=`Detective work complete — passing and neighbors all identified!`; holder.innerHTML=""; ch.style.display="none"; return; }
    const R=ROUNDS[r]; found=false; ch.style.display="none";
    q.innerHTML=`The harmony is <b>${R.chord}</b>. Tap the melody note that does <b>NOT</b> belong to that chord.`;
    Staff.render(holder,{clef:"treble",notes:R.ps.map((p,i)=>({p,d:"q"})),width:300,clickNotes:true,
      onNote:(i,p)=>{
        MFAudio.tone(MFAudio.midi(p),.5,0,.4);
        if(found) return;
        const R2=ROUNDS[r];
        if(i===R2.nh){ found=true;
          q.innerHTML=`✓ ${p.replace(/\d/,"").replace("#","♯")} is the outsider. Now — what KIND of non-harmonic tone is it?`;
          ch.style.display=""; }
        else fb(false,`${p[0]} belongs to ${R2.chord} — it's a legitimate chord tone. Find the stranger.`);
      }});
  }
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    const R=ROUNDS[r]; if(!R||!found) return;
    if(i===R.kind){ MFAudio.yay();
      R.ps.forEach((p,ix)=>MFAudio.tone(MFAudio.midi(p),.45,.55+ix*.4,.4));
      fb(true,`✓ ${R.expl}`);
      r++; setTimeout(ask,1500); }
    else { MFAudio.tone(40,.2); fb(false,"Check the frame: does the melody land on a DIFFERENT chord tone (passing) or the SAME one (neighbor)? Above or below?"); }
  });
  ask();
}

LESSON_CONTENT[66]={
  welcome:"Today we let the melody wander off the chord — legally. \u{1F98B}",
  hook:{
    say:"Two melodies over the SAME C chord. One uses only chord tones; the other slips one extra note between them. <b>Which flows more smoothly — and is that extra note 'wrong'?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Melody A: C … E … G</button>
          <button class="play hk-b">▶ Melody B: C-D-E … G</button></div>
          <div class="choices hk-ch" style="display:none"><button>B flows better — the D is a legal 'bridge' note</button><button>B is wrong — D isn't in the C chord</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ [60,64,67].forEach((m,i)=>MFAudio.tone(m,.55,i*.55,.42)); [48,52,55].forEach(m=>MFAudio.tone(m,1.8,0,.18)); hA=true; if(hB) setTimeout(()=>ch.style.display="",2200); };
        container.querySelector(".hk-b").onclick=()=>{ [60,62,64,67].forEach((m,i)=>MFAudio.tone(m,.5,i*.45,.42)); [48,52,55].forEach(m=>MFAudio.tone(m,2.0,0,.18)); hB=true; if(hA) setTimeout(()=>ch.style.display="",2200); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ The D is a NON-HARMONIC TONE — specifically a PASSING tone, stepping smoothly between two chord tones. Not wrong: essential! Most real melodies are full of them. Today: passing and neighboring tones!");
          else fb(false,"It's outside the chord, yes — but did it SOUND wrong? Composers use these notes constantly, on purpose…");
        });
      } }
  },
  objectives:[
    "Define non-harmonic tones: melody notes outside the harmony chord",
    "Passing tone: steps between two DIFFERENT chord tones",
    "Neighboring tone: leaves and returns to the SAME chord tone",
    "Tell upper neighbors (above) from lower neighbors (below)",
    "Know they usually land on WEAK beats",
    "Never let them influence your chord choice"
  ],
  steps:[
    { say:"The big idea: <b>most melodies include tones that are not part of the harmony chord</b> — the book calls them <b>NON-HARMONIC TONES</b>. They aren't mistakes; they're seasoning. \u{1F447} <b>A non-harmonic tone is…</b>",
      try:{ type:"mc", choices:["A melody note outside the current chord","A wrong note","A note played too softly"], answer:0,
        success:"✓ Outside the chord, inside the music. Two flavors today: passing and neighboring.",
        fail:"The hook's D over a C chord was one…",
        hint:"Non-harmonic = not in the harmony." } },
    { say:"Flavor 1 — the <b>PASSING TONE</b>: the melody <b>passes from one chord tone to a DIFFERENT chord tone</b> with a stepping stone between (a half or whole step). C→D→E over a C chord: D is passing. \u{1F447} <b>What frames a passing tone?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:90,notes:[
        {p:"C4",d:"q",label:"chord tone"},{p:"D4",d:"q",label:"P"},{p:"E4",d:"q",label:"chord tone"},{p:"G4",d:"h"},{bar:"final"}],width:400} },
      try:{ type:"mc", choices:["Two DIFFERENT chord tones","The same chord tone twice","Two rests"], answer:0,
        success:"✓ Different departure and arrival — the passing tone is the bridge between them.",
        fail:"Where did the melody start and land — same place or new place?",
        hint:"PASSING = traveling THROUGH to somewhere new." } },
    { say:"Flavor 2 — the <b>NEIGHBORING TONE</b>: the melody <b>leaves a chord tone and returns to the SAME chord tone</b>, with the outsider between. Above = <b>UPPER neighbor</b>; below = <b>LOWER neighbor</b>. \u{1F447} <b>E→F→E over a C chord: the F is…</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:90,notes:[
        {p:"E4",d:"q",label:"chord tone"},{p:"F4",d:"q",label:"U"},{p:"E4",d:"q",label:"same tone!"},
        {p:"G4",d:"q",label:"chord tone"},{p:"F#4",d:"q",label:"L"},{p:"G4",d:"q",label:"same tone!"},{bar:"final"}],width:480} },
      try:{ type:"mc", choices:["An upper neighboring tone","A passing tone","A chord tone"], answer:0,
        success:"✓ Left E, visited the neighbor ABOVE, came home to the same E. (G→F♯→G shows the LOWER neighbor.)",
        fail:"Did the melody end up somewhere NEW, or back home?",
        hint:"Neighbors visit and RETURN." } },
    { say:"The rhythm rule: <b>passing and neighboring tones usually occur on a WEAK beat</b> — they decorate between the harmony's strong points. \u{1F447} <b>Why weak beats?</b>",
      try:{ type:"mc", choices:["Strong beats belong to chord tones; outsiders slip between them","Weak beats are quieter","It's a printing convention"], answer:0,
        success:"✓ The harmony anchors the strong beats; the seasoning sprinkles the weak ones. That's why the outsiders never sound wrong.",
        fail:"Where does the ear check the harmony most — strong or weak beats?",
        hint:"Anchors on the strong, decoration on the weak." } },
    { say:"And the harmonizing rule, crucial after Lesson 64: <b>non-harmonic tones should NOT be a factor in your choice of chord</b>. Harmonize the chord tones; let the decorations decorate. \u{1F447} <b>Melody C-D-E-F-G over one measure, harmony = C chord. The D and F are…</b>",
      try:{ type:"mc", choices:["Ignored for chord choice — they're passing tones","Proof the chord must be G7","Reasons to change chords twice"], answer:0,
        success:"✓ C, E, G anchor the C chord; D and F just pass through. One chord, five notes, zero problems.",
        fail:"Which of the five notes are IN C-E-G?",
        hint:"Harmonize the skeleton, not the skin." } },
    { say:"Detective time — find each outsider, then classify it. \u{1F447}",
      try:{ type:"custom",
        hint:"Different frame = passing; same frame = neighbor (upper/lower by direction).",
        mount:(container,fb)=>MF_L66_detect(container,fb) } },
    { say:"Full-phrase test, book style: the harmony is C throughout. \u{1F447} <b>In C-B-C-D-E, what is the B?</b>",
      show:{ type:"staff", spec:{clef:"treble",tempo:90,notes:[
        {p:"C4",d:"q"},{p:"B3",d:"q"},{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"h"},{bar:"final"}],width:420} },
      try:{ type:"mc", choices:["A lower neighboring tone (and the D is a passing tone)","A passing tone (and the D is a neighbor)","Both are chord tones"], answer:0,
        success:"✓ C→B→C = same-tone frame from below → LOWER neighbor. Then C→D→E = different-tone frame → PASSING. One phrase, both flavors!",
        fail:"Frame check: C…C (same) then C…E (different).",
        hint:"Watch where each three-note group starts and lands." } }
  ],
  examples:[
    { caption:"The book's demonstration: a melody over I-IV-V7-I where every arrow-note is a passing tone — outsiders bridging chord tones on weak beats.",
      staff:{clef:"treble",tempo:100,notes:[
        {p:"C4",d:"q",label:"I"},{p:"D4",d:"q",label:"P"},{p:"E4",d:"q"},{p:"G4",d:"q"},
        {p:"F4",d:"q",label:"IV"},{p:"G4",d:"q",label:"P"},{p:"A4",d:"q"},{p:"C5",d:"q"},
        {p:"B4",d:"q",label:"V7"},{p:"A4",d:"q",label:"P"},{p:"G4",d:"q"},{p:"F4",d:"q"},
        {p:"C5",d:"w",label:"I"},{bar:"final"}],width:640},
      kb:{start:60,octaves:2,labels:true} },
    { caption:"Neighbors at work: the melody keeps returning home — E-F-E (upper), G-F♯-G (lower) — while the C harmony holds still underneath.",
      staff:{clef:"treble",tempo:100,notes:[
        {p:"E4",d:"q",label:"C chord"},{p:"F4",d:"q",label:"U"},{p:"E4",d:"q"},{p:"G4",d:"q"},
        {p:"F#4",d:"q",label:"L"},{p:"G4",d:"q"},{p:"C5",d:"h"},{bar:"final"}],width:520},
      kb:{start:60,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Outsider Sprint (45s)",
      intro:"Passing, upper neighbor, lower neighbor — race the definitions!",
      miaIntro:"Bridge or boomerang? \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Non-harmonic tone","a melody note outside the harmony chord"],
        ["Passing tone","steps between two DIFFERENT chord tones"],
        ["Neighboring tone","leaves and returns to the SAME chord tone"],
        ["Upper neighbor","the visit from above"],
        ["Lower neighbor","the visit from below"],
        ["Their usual beat","weak"],
        ["Their role in chord choice","none — ignore them"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — outsider expertise certified!":null },
    { type:"key-climb", title:"Game 2 · Decorated Melody Climb",
      intro:"Play a melody WITH its decorations: C-D-E (passing), E-F-E (neighbor), G!",
      miaIntro:"Feel the bridge and the boomerang! \u{1FA9C}",
      spec:{seq:[60,62,64, 64,65,64, 62,60],
        names:["C (chord tone)","D (passing!)","E (chord tone)","E again","F (upper neighbor!)","E (home)","D (passing down)","C (home)"],
        start:60, octaves:2, title:"A melody full of legal outsiders"},
      result:(score)=>score!==null?"Decorations under your fingers!":null },
    { type:"symbol-hunt", title:"Game 3 · P, U or L?",
      intro:"Three-note figures on cards — click the one each round names! (Harmony: C chord.)",
      miaIntro:"Check the frame first! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Passing tone (C-D-E)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"}],width:170}},
        {label:"Upper neighbor (E-F-E)", spec:{clef:"treble",notes:[{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"E4",d:"q"}],width:170}},
        {label:"Lower neighbor (G-F♯-G)", spec:{clef:"treble",notes:[{p:"G4",d:"q"},{p:"F#4",d:"q"},{p:"G4",d:"q"}],width:170}},
        {label:"All chord tones (C-E-G)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"E4",d:"q"},{p:"G4",d:"q"}],width:170}}]},
      result:(score)=>score>=5?"Frames read at a glance!":null },
    { type:"term-race", title:"Game 4 · Non-Harmonic Fact Race",
      intro:"Everything about the melody's legal outsiders!",
      miaIntro:"Season to taste! \u{1F3C1}",
      spec:{rounds:8, reverse:true, pool:[
        ["C-D-E over a C chord","D is a passing tone"],
        ["E-F-E over a C chord","F is an upper neighbor"],
        ["G-F♯-G over a C chord","F♯ is a lower neighbor"],
        ["Passing tone's journey","one chord tone THROUGH to another"],
        ["Neighbor's journey","out and back to the same tone"],
        ["Weak beats","where non-harmonic tones usually live"],
        ["Chord choice","ignores non-harmonic tones"],
        ["Non-harmonic tones","seasoning, not mistakes"]]},
      result:(score)=>score>=6?"Fully seasoned — melody chef!":null }
  ],
  practiceIntro:"20 practice questions — frames, flavors and the weak-beat rule. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Non-harmonic tone","outside the chord"],["Passing tone","bridges two different chord tones"],["Upper neighbor","above, then back"],["Lower neighbor","below, then back"],["Weak beat","the outsiders' usual home"]], reverse:true}, count:6 },
    { gen:"triad-id", params:{}, count:2 },
    { type:"mc", q:"Tones not part of the harmony chord are called…", choices:["non-harmonic tones","rest tones","grace notes"], answer:0,
      explain:"The umbrella term (AEMT3 p.104)." },
    { type:"mc", q:"A passing tone connects…", choices:["two DIFFERENT chord tones","the same chord tone twice","two rests"], answer:0,
      explain:"It travels through to a new destination." },
    { type:"mc", q:"A neighboring tone returns to…", choices:["the SAME chord tone it left","a different chord tone","the tonic always"], answer:0,
      explain:"Out and back — the boomerang." },
    { type:"mc", q:"An upper neighboring tone sits ____ the chord tone.", choices:["above","below","exactly on"], answer:0,
      explain:"Upper = above; lower = below." },
    { type:"mc", q:"In C-D-E over a C chord, the D is a…", choices:["passing tone","upper neighbor","chord tone"], answer:0,
      explain:"C and E differ → passing." },
    { type:"mc", q:"In G-A-G over a C chord, the A is a…", choices:["upper neighboring tone","passing tone","lower neighbor"], answer:0,
      explain:"Same G frame, visitor from above." },
    { type:"truefalse", q:"Passing and neighboring tones usually occur on a strong beat.", answer:false,
      explain:"WEAK beats — between the harmony's anchors." },
    { type:"truefalse", q:"Non-harmonic tones should not influence which chord you choose.", answer:true,
      explain:"Harmonize the chord tones only." },
    { type:"truefalse", q:"A non-harmonic tone is a half or whole step from its chord tones.", answer:true,
      explain:"Steps, not leaps — that's what keeps them smooth." },
    { type:"truefalse", q:"Most melodies avoid non-harmonic tones entirely.", answer:false,
      explain:"MOST melodies include them — that's the book's first sentence." }
  ],
  miaQuizIntro:"Quiz! Frame first: different tones = passing, same tone = neighbor.",
  quiz:[
    { type:"mc", q:"Non-harmonic tones are…", choices:["melody tones not part of the harmony chord","chord tones played loudly","notes in the bass clef"], answer:0,
      explain:"Legal outsiders.", hint:"NON-harmonic." },
    { type:"mc", q:"A PASSING tone…", choices:["connects two different chord tones by step","returns to the same chord tone","is always the tonic"], answer:0,
      explain:"The bridge.", hint:"It passes THROUGH." },
    { type:"mc", q:"A NEIGHBORING tone…", choices:["leaves and returns to the same chord tone","connects two different chord tones","only occurs in minor keys"], answer:0,
      explain:"The boomerang.", hint:"Visit next door, come home." },
    { type:"mc", q:"An UPPER neighboring tone is ____ the chord tone; a LOWER one is ____.", choices:["above; below","below; above","before; after"], answer:0,
      explain:"Named by direction of the visit.", hint:"The names say it." },
    { type:"truefalse", q:"Passing and neighboring tones usually occur on a weak beat.", answer:true,
      explain:"Decoration between anchors.", hint:"Where do the anchors sit?" },
    { type:"truefalse", q:"These tones should be a major factor when choosing chords to harmonize a melody.", answer:false,
      explain:"The book: they should NOT be a factor.", hint:"Skeleton vs skin." },
    { type:"mc", q:"The harmony is C (C-E-G). Identify the middle note.",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"}],width:260},
      choices:["Passing tone","Upper neighbor","Chord tone"], answer:0,
      explain:"C→E via D: different frame → passing.", hint:"Start and landing differ?" },
    { type:"mc", q:"The harmony is C (C-E-G). Identify the middle note.",
      staff:{clef:"treble",notes:[{p:"G4",d:"q"},{p:"F#4",d:"q"},{p:"G4",d:"q"}],width:260},
      choices:["Lower neighboring tone","Passing tone","Upper neighboring tone"], answer:0,
      explain:"Same G frame, dip below → lower neighbor.", hint:"Same landing = neighbor; which side?" },
    { type:"mc", q:"The harmony is F (F-A-C). In F-G-A, the G is…", choices:["a passing tone","an upper neighbor","a chord tone of F"], answer:0,
      explain:"F and A are chord tones; G bridges them.", hint:"Spell F major first." },
    { type:"mc", q:"A melody over a C chord runs E-F-E-D-C. Classify F and D.", choices:["F = upper neighbor, D = passing tone","F = passing, D = neighbor","both are chord tones"], answer:0,
      explain:"E-F-E = boomerang; E-D-C = bridge downward.", hint:"Two frames, two flavors." },
    { type:"mc", q:"Why don't non-harmonic tones clash badly with the chord?", choices:["They step smoothly between chord tones on weak beats","They're played silently","They're actually in the chord"], answer:0,
      explain:"Steps + weak beats = seamless decoration.", hint:"The two rules combined." },
    { type:"mc", q:"When harmonizing C-D-E-F-G (one measure), you should analyze…", choices:["C, E, G — the chord tones — and pick the C chord","all five notes equally","only D and F"], answer:0,
      explain:"D and F pass; the skeleton spells C major.", hint:"Ignore the seasoning." },
    /* generated */
    { gen:"term-match", params:{subject:"term", pool:[["Passing","different frame"],["Neighbor","same frame"],["Upper","from above"],["Lower","from below"]], reverse:true}, count:3 },
    { gen:"triad-id", params:{}, count:2 },
    { gen:"degree-name", params:{ask:"name"}, count:1 }
  ],
  vocabulary:[
    {term:"Non-Harmonic Tone", def:"A melody tone that is not part of the chord used for the harmony."},
    {term:"Passing Tone", def:"A non-harmonic tone stepping between two DIFFERENT chord tones.",
      staff:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"}],width:130}},
    {term:"Neighboring Tone", def:"A non-harmonic tone that leaves and returns to the SAME chord tone — upper (above) or lower (below).",
      staff:{clef:"treble",notes:[{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"E4",d:"q"}],width:130}},
    {term:"The Weak-Beat Rule", def:"Passing and neighboring tones usually occur on weak beats — and never influence chord choice."}
  ],
  mistakes:[],
  summary:[
    "✔ <b>Non-harmonic tones</b> = melody notes outside the harmony chord — seasoning, not errors.",
    "✔ <b>Passing tone</b>: steps between two <b>DIFFERENT</b> chord tones (C-D-E).",
    "✔ <b>Neighboring tone</b>: out and back to the <b>SAME</b> chord tone — <b>upper</b> above, <b>lower</b> below.",
    "✔ Both usually live on <b>weak beats</b>.",
    "✔ They <b>never influence chord choice</b> — harmonize the chord tones only."
  ],
  tips:[
    "Analysis routine: bracket each 3-note group, compare first and last notes. Same = neighbor; different = passing.",
    "Sing 'London Bridge' — it's stuffed with passing and neighboring tones (the book uses it as an exercise!).",
    "Composer's cheat: turn any boring chord-tone melody into a real tune by inserting passing tones on the weak beats.",
    "Next lesson you COMPOSE: your own melody over a progression, decorations included."
  ],
  rewards:{ badge:"Tone Gardener", icon:"\u{1F98B}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"PERFECT! Passing, upper, lower — every outsider named on sight. \u{1F98B}\u{1F389}",
  miaPass:"Passed! The melody's decorations hold no secrets. Time to compose your own…",
  mia:{
    hook:{ label:"the welcome",
      explain:"Melody B added D between C and E — a PASSING tone: outside the C chord, but a smooth, legal bridge between two chord tones.",
      play:()=>{[60,62,64,67].forEach((m,i)=>MFAudio.tone(m,.5,i*.45,.42));[48,52,55].forEach(m=>MFAudio.tone(m,2.0,0,.18));} },
    learn:{ label:"passing & neighboring tones",
      explain:"Non-harmonic tones decorate: passing = between two different chord tones; neighbor = out-and-back to the same tone (upper/lower). Weak beats; never affect chord choice.",
      hint:"Frame check: same or different landing?",
      play:()=>{[64,65,64].forEach((m,i)=>MFAudio.tone(m,.45,i*.4,.42));} },
    example:{ label:"the examples",
      explain:"Example 1 threads passing tones through I-IV-V7-I; example 2 shows both neighbors over a still C chord." },
    game:{ label:"the games",
      explain:"Sprint the terms, play a decorated melody, classify P/U/L cards, then race the facts.",
      hint:"Passing passes; neighbors come home." },
    quiz:{ label:"this question",
      explain:"One method: identify the chord, find the outsider, check its frame (same tone = neighbor, different = passing), then the direction.",
      play:()=>{[60,62,64].forEach((m,i)=>MFAudio.tone(m,.45,i*.4,.42));} }
  }
};
