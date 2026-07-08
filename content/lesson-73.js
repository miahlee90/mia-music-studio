/* Lesson 73 — AB (Binary) Form (AEMT Book 3, Unit 18)
   Built from drafts/UNIT 18 – Lesson 73.md; AEMT3 p.115 verified by render.
   Core: phrases combine into SECTIONS; TWO-PART FORMS = AB (BINARY): the
   A section's material CONTRASTS with the B section's — variety through
   ELEMENTS: melody, rhythm, harmony, time signature, tempo. Sections may
   share a motive or end similarly, but each is distinct. VERSE (tells a
   story, changes each time) + REFRAIN/CHORUS (repeats) is typical AB.
   NOTE: edit by FULL-FILE REWRITE only. */

/* contrast detective: hear A and B, name what differs */
function MF_L73_contrast(container,fb){
  const A={notes:[60,62,64,65,67,67], durs:[.4,.4,.4,.4,.8,.8], label:"A: rising quarters"};
  const B={notes:[72,71,69,67,69,67], durs:[.8,.4,.2,.2,.4,.8], label:"B: falling, dotted rhythm"};
  const ROUNDS=[
    {q:"Round 1: which ELEMENT contrasts most between A and B?",
      choices:["Melody direction — A rises, B falls","The key signature","The clef"], right:0,
      expl:"A climbs stepwise; B tumbles downward. Melodic contrast — element #1."},
    {q:"Round 2: listen again — what ELSE differs?",
      choices:["The rhythm — A is even, B mixes long and short","The instrument","Nothing else"], right:0,
      expl:"A moves in even values; B uses longs and quick shorts — rhythmic contrast, exactly like the book's example."}];
  let r=0, heardA=false, heardB=false;
  container.innerHTML=`<div class="big-q l73c-q" style="text-align:center"></div>
    <div style="text-align:center">
      <button class="play l73c-a">▶ Section A</button>
      <button class="play l73c-b">▶ Section B</button></div>
    <div class="choices l73c-ch" style="display:none"></div>`;
  const q=container.querySelector(".l73c-q"), ch=container.querySelector(".l73c-ch");
  function play(S){ let t=0; S.notes.forEach((m,i)=>{ MFAudio.tone(m,S.durs[i]*.95,t,.42); t+=S.durs[i]; }); return t; }
  function ask(){
    if(r>=ROUNDS.length){ q.textContent="Both contrasts caught — melody AND rhythm. That's how B earns its own letter!"; ch.style.display="none"; return; }
    q.innerHTML=ROUNDS[r].q; ch.style.display="none"; ch.innerHTML="";
    ROUNDS[r].choices.forEach((c,i)=>{
      const b=document.createElement("button"); b.textContent=c;
      b.onclick=()=>{
        if(i===ROUNDS[r].right){ MFAudio.yay(); fb(true,"✓ "+ROUNDS[r].expl); r++; heardA=false; heardB=false; setTimeout(ask,1400); }
        else { MFAudio.tone(40,.2); fb(false,"Play both sections again and compare that specific element."); }
      };
      ch.appendChild(b);
    });
  }
  container.querySelector(".l73c-a").onclick=()=>{ play(A); heardA=true; if(heardB) setTimeout(()=>ch.style.display="",3300); };
  container.querySelector(".l73c-b").onclick=()=>{ play(B); heardB=true; if(heardA) setTimeout(()=>ch.style.display="",3300); };
  ask();
}

/* verse-or-refrain sorter */
function MF_L73_vr(container,fb){
  const ROUNDS=[
    {desc:"This section's WORDS CHANGE every time it comes around — verse 1 tells the beginning, verse 2 continues the story…", ans:0,
      expl:"Changing words + storytelling = the VERSE."},
    {desc:"This section REPEATS with the same words after every verse — the whole room sings along.", ans:1,
      expl:"The repeated crowd-singer = the REFRAIN (or chorus)."},
    {desc:"In 'Go, Tell It On the Mountain,' the part marked A tells the seeker's story differently in each stanza.", ans:0,
      expl:"Story that changes = verse — the book marks it as the A section."},
    {desc:"The part that always returns with 'Go, tell it on the mountain…' word for word.", ans:1,
      expl:"Same words, every time = refrain — the B section of the book's example."}];
  let r=0;
  container.innerHTML=`<div class="big-q l73v-q" style="text-align:center"></div>
    <div class="choices chips l73v-ch"><button>Verse</button><button>Refrain</button></div>`;
  const q=container.querySelector(".l73v-q"), ch=container.querySelector(".l73v-ch");
  function ask(){
    if(r>=ROUNDS.length){ q.textContent="Verse and refrain sorted — the AB song format is yours!"; ch.style.display="none"; return; }
    q.innerHTML=`Card ${r+1} of ${ROUNDS.length}: <i>${ROUNDS[r].desc}</i>`;
  }
  [...ch.children].forEach((b,i)=>b.onclick=()=>{
    const R=ROUNDS[r]; if(!R) return;
    if(i===R.ans){ MFAudio.yay(); fb(true,"✓ "+R.expl); r++; setTimeout(ask,1300); }
    else { MFAudio.tone(40,.2); fb(false,"Does it CHANGE each time (verse) or REPEAT the same (refrain)?"); }
  });
  ask();
}

LESSON_CONTENT[73]={
  welcome:"Phrases learned to breathe. Now they join teams — Team A and Team B. \u{1F1E6}",
  hook:{
    say:"Two sections of one little piece. <b>Listen: do they feel like the SAME idea twice — or like two DIFFERENT ideas taking turns?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ First section</button>
          <button class="play hk-b">▶ Second section</button></div>
          <div class="choices hk-ch" style="display:none"><button>Two different ideas — A, then a contrasting B</button><button>The same idea twice</button></div>`;
        const ch=container.querySelector(".hk-ch");
        let hA=false,hB=false;
        container.querySelector(".hk-a").onclick=()=>{ [60,62,64,65,67,67].forEach((m,i)=>MFAudio.tone(m,.4,i*.42,.42)); hA=true; if(hB) setTimeout(()=>ch.style.display="",2800); };
        container.querySelector(".hk-b").onclick=()=>{ const d=[.7,.35,.2,.2,.35,.7]; let t=0; [72,71,69,67,69,67].forEach((m,i)=>{ MFAudio.tone(m,d[i],t,.42); t+=d[i]; }); hB=true; if(hA) setTimeout(()=>ch.style.display="",2800); };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Rising even notes… then falling dotted ones: TWO contrasting sections. Music built as A-then-B is called AB or BINARY FORM — two parts, each distinct. Today's lesson!");
          else fb(false,"Compare the direction and the rhythm of the two sections — same or different?");
        });
      } }
  },
  objectives:[
    "Combine phrases into complete SECTIONS (parts)",
    "Define AB (binary) form: two contrasting sections",
    "List the contrast ELEMENTS: melody, rhythm, harmony, time signature, tempo",
    "Know sections may share a motive yet remain distinct",
    "Define VERSE (changing story) and REFRAIN/CHORUS (repeats)",
    "Recognize verse + refrain as typical AB form"
  ],
  steps:[
    { say:"Scaling up: <b>several phrases can be combined to form a complete SECTION (or part)</b>. When a piece has TWO sections whose material <b>contrasts</b>, it's in <b>AB — BINARY — FORM</b>. \u{1F447} <b>'Binary' means the piece has…</b>",
      try:{ type:"mc", choices:["Two contrasting parts","Two composers","Two tempos always"], answer:0,
        success:"✓ Bi = two. A states, B contrasts — like a conversation between two speakers.",
        fail:"Count the letters in 'AB'…",
        hint:"Bi-nary, bi-cycle…" } },
    { say:"How is contrast made? Through <b>ELEMENTS: melody, rhythm, harmony, time signature and tempo</b>. In the book's example, A opens with an <b>ascending melody in quarter notes</b>; B answers with a <b>descending melody</b> in longs, dotted 8ths and 16ths. \u{1F447} <b>Detect the contrasts yourself:</b>",
      try:{ type:"custom",
        hint:"Compare direction first, then rhythm.",
        mount:(container,fb)=>MF_L73_contrast(container,fb) } },
    { say:"Important nuance: the two sections <b>may share a motive or end similarly</b> — but <b>each is musically distinct</b>. (In the book's song, the time signature stays the same and the harmony is similar; melody and rhythm carry the contrast.) \u{1F447} <b>For AB form, the sections must…</b>",
      try:{ type:"mc", choices:["Be musically distinct from each other","Share absolutely nothing","Use different time signatures always"], answer:0,
        success:"✓ Distinct, not alien — B can borrow a motive and still be its own section. Contrast in SOME elements is enough.",
        fail:"Total separation isn't required — the book allows sharing…",
        hint:"Distinct ≠ unrelated." } },
    { say:"The song-format connection: <b>a VERSE tells a story and CHANGES with each repetition; the REFRAIN (or CHORUS) REPEATS after every verse</b>. And: <b>the verse-refrain format is typical of AB form</b>. \u{1F447} <b>Sort these cards:</b>",
      try:{ type:"custom",
        hint:"Changing story = verse; repeated sing-along = refrain.",
        mount:(container,fb)=>MF_L73_vr(container,fb) } },
    { say:"Map it: in \u{201C}Go, Tell It On the Mountain\u{201D} the book labels the <b>verse as A</b> and the <b>refrain as B</b>. \u{1F447} <b>When the congregation joins in on the famous title line, they're singing…</b>",
      try:{ type:"mc", choices:["The B section — the refrain","The A section — the verse","An improvised solo"], answer:0,
        success:"✓ The repeated, join-in part is the refrain — section B of this AB song.",
        fail:"Which part repeats word-for-word every time?",
        hint:"Refrain = the repeater = B here." } },
    { say:"Analysis drill, book style: a piece's first section ends with a <b>V7 chord</b> (incomplete — a musical comma); its second ends on <b>I</b> (complete). \u{1F447} <b>Which section probably ends on V7?</b>",
      try:{ type:"mc", choices:["A — leaving the door open for B","B — endings love V7","Neither can end on V7"], answer:0,
        success:"✓ A pauses expectantly (V7), B closes the door (I) — the same comma/period logic as phrases, one level up. (The book's exercise 2 asks exactly this!)",
        fail:"Which section needs to lead INTO the other?",
        hint:"Commas come before the end, not at it." } },
    { say:"Big-picture check. \u{1F447} <b>Which of these is an AB-form song plan?</b>",
      try:{ type:"mc", choices:["Verse (A) → Refrain (B), repeated","One melody with no sections","A section played three times identically"], answer:0,
        success:"✓ Story, sing-along, story, sing-along — binary form powering half the songbook. Next lesson: what happens when A comes BACK after B…",
        fail:"AB needs TWO different sections…",
        hint:"The typical format from the book's last paragraph." } }
  ],
  examples:[
    { caption:"A miniature binary piece: section A rises in even quarters and pauses on V7 (the comma); section B falls in dotted rhythm and closes on I (the period). Two sections, one journey.",
      staff:{clef:"treble",tempo:100,notes:[
        {p:"C4",d:"q",label:"A"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"},{p:"G4",d:"h",label:"…ends on V7"},{p:"B4",d:"h"},{bar:"double"},
        {p:"C5",d:"q.",label:"B"},{p:"B4",d:"8"},{p:"A4",d:"q"},{p:"G4",d:"q"},{p:"E4",d:"h",label:"…ends on I"},{p:"C4",d:"h"},{bar:"final"}],width:640},
      kb:{start:57,octaves:2,labels:true} },
    { caption:"The verse-refrain wheel: A (the changing story) hands off to B (the repeated refrain), again and again — the typical AB song format.",
      staff:{clef:"treble",tempo:110,notes:[
        {p:"E4",d:"q",label:"A: verse 1…"},{p:"G4",d:"q"},{p:"E4",d:"q"},{p:"D4",d:"h"},
        {p:"G4",d:"q",label:"B: refrain!"},{p:"A4",d:"q"},{p:"G4",d:"q"},{p:"C5",d:"h"},{bar:"double"},
        {p:"E4",d:"q",label:"A: verse 2…"},{p:"G4",d:"q"},{p:"F4",d:"q"},{p:"D4",d:"h"},
        {p:"G4",d:"q",label:"B: refrain!"},{p:"A4",d:"q"},{p:"G4",d:"q"},{p:"C5",d:"h"},{bar:"final"}],width:660},
      kb:{start:57,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Binary Sprint (45s)",
      intro:"Sections, elements, verses and refrains — race the form facts!",
      miaIntro:"A states, B contrasts! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["AB form","two contrasting sections (binary)"],
        ["A section","the first statement"],
        ["B section","the contrasting second part"],
        ["Contrast elements","melody, rhythm, harmony, time signature, tempo"],
        ["Verse","tells a story — changes each repetition"],
        ["Refrain (chorus)","repeats after every verse"],
        ["Verse + refrain","the typical AB song format"],
        ["Section","several phrases combined"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — binary brilliance!":null },
    { type:"key-climb", title:"Game 2 · Play A, Then B",
      intro:"Perform both sections: A rises evenly, B falls in style!",
      miaIntro:"Feel the contrast in your fingers! \u{1FA9C}",
      spec:{seq:[60,62,64,65,67, 72,71,69,67,60],
        names:["C (A: rising…)","D","E","F","G — A complete!","C (B: falling…)","B","A","G","C — B lands home!"],
        start:57, octaves:2, title:"Section A up, section B down"},
      result:(score)=>score!==null?"Both sections performed — binary hands!":null },
    { type:"symbol-hunt", title:"Game 3 · Which Section Is It?",
      intro:"A-material, B-material — click what each round names!",
      miaIntro:"Direction and rhythm are the clues! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"A material (rising, even)", spec:{clef:"treble",notes:[{p:"C4",d:"q"},{p:"D4",d:"q"},{p:"E4",d:"q"},{p:"F4",d:"q"}],width:170}},
        {label:"B material (falling, dotted)", spec:{clef:"treble",notes:[{p:"C5",d:"q."},{p:"B4",d:"8"},{p:"A4",d:"q"},{p:"G4",d:"q"}],width:170}},
        {label:"A's ending (V7 — the comma)", spec:{clef:"treble",notes:[{p:"G4",d:"w"},{p:"B4",d:"w",chord:true},{p:"F5",d:"w",chord:true}],width:150}},
        {label:"B's ending (I — the period)", spec:{clef:"treble",notes:[{p:"C4",d:"w"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true}],width:150}}]},
      result:(score)=>score>=5?"Sections sorted on sight!":null },
    { type:"order-tap", title:"Game 4 · Assemble the AB Song",
      intro:"Tap the parts of a two-verse AB song in performance order!",
      miaIntro:"Story, sing-along, repeat! \u{1F3C1}",
      spec:{sequence:["Verse 1 (A)","Refrain (B)","Verse 2 (A — new words)","Refrain (B — same words)"],
        title:"One AB song, start to finish"},
      result:(stars)=>stars>=2?"The AB wheel turns in your head now!":null }
  ],
  practiceIntro:"20 practice questions — sections, contrasts and the verse-refrain format. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Binary","two-part"],["A section","the statement"],["B section","the contrast"],["Verse","the changing story"],["Refrain","the repeater"],["Section","phrases combined"]], reverse:true}, count:6 },
    { gen:"triad-id", params:{ask:"numeral"}, count:2 },
    { type:"mc", q:"Several phrases combine to form a…", choices:["complete section (or part)","motive","key signature"], answer:0,
      explain:"The next size up from a phrase (AEMT3 p.115)." },
    { type:"mc", q:"Two-part forms are called…", choices:["AB or binary form","ABA form","rondo form"], answer:0,
      explain:"Bi = two." },
    { type:"mc", q:"In AB form, the material of the A section ____ the B section's.", choices:["contrasts with","is identical to","is louder than"], answer:0,
      explain:"Contrast defines the form." },
    { type:"mc", q:"Which are contrast ELEMENTS named by the book?", choices:["melody, rhythm, harmony, time signature, tempo","only volume","only key"], answer:0,
      explain:"Five levers of variety." },
    { type:"mc", q:"A VERSE is a section that…", choices:["tells a story and changes with each repetition","never changes","is always instrumental"], answer:0,
      explain:"The storyteller." },
    { type:"mc", q:"A REFRAIN (or chorus) is…", choices:["repeated after each verse","sung only once","the same as a motive"], answer:0,
      explain:"The sing-along that returns." },
    { type:"truefalse", q:"The two sections of an AB piece may share a motive.", answer:true,
      explain:"Shared DNA is allowed — distinctness is required." },
    { type:"truefalse", q:"The verse-refrain song format is typical of AB form.", answer:true,
      explain:"The book's closing point." },
    { type:"truefalse", q:"AB form requires a different time signature in each section.", answer:false,
      explain:"The book's example keeps ONE time signature throughout." },
    { type:"truefalse", q:"In 'Go, Tell It On the Mountain,' the refrain is the B section.", answer:true,
      explain:"Verse = A, refrain = B." }
  ],
  miaQuizIntro:"Quiz! Two letters, five elements, one storytelling wheel.",
  quiz:[
    { type:"mc", q:"In music, several phrases can be combined to form…", choices:["a complete section (or part)","a single note","a key signature"], answer:0,
      explain:"Phrases → sections → forms.", hint:"The pyramid's next floor." },
    { type:"mc", q:"Two-part forms are called…", choices:["AB or binary form","ternary form","rondo"], answer:0,
      explain:"Two letters, two parts.", hint:"Bi-." },
    { type:"mc", q:"In AB form, the first section's material ____ the second's.", choices:["contrasts with","copies","must be shorter than"], answer:0,
      explain:"Contrast is the definition.", hint:"Why B gets its own letter." },
    { type:"mc", q:"Variety between sections is achieved through differences in ELEMENTS such as…", choices:["melody, rhythm, harmony, time signature and tempo","paper size","the performer's outfit"], answer:0,
      explain:"The book's list of five.", hint:"All musical dials." },
    { type:"truefalse", q:"The two sections may share a motive or end similarly.", answer:true,
      explain:"…while remaining musically distinct.", hint:"The nuance step." },
    { type:"truefalse", q:"A verse changes with each repetition.", answer:true,
      explain:"The story moves on.", hint:"Verse 1, verse 2…" },
    { type:"mc", q:"The section repeated after each verse is the…", choices:["refrain (or chorus)","bridge","coda"], answer:0,
      explain:"The book gives both names.", hint:"The crowd's favorite part." },
    { type:"mc", q:"In the book's 'Go, Tell It On the Mountain': verse and refrain map to…", choices:["verse = A, refrain = B","verse = B, refrain = A","both are A"], answer:0,
      explain:"Story first, sing-along second.", hint:"The order they arrive." },
    { type:"mc", q:"In the book's example, which elements carry the A/B contrast?", choices:["Melody direction and rhythm (time signature stays, harmony similar)","Time signature only","Nothing differs"], answer:0,
      explain:"Ascending quarters vs descending dotted figures.", hint:"The contrast detective's findings." },
    { type:"mc", q:"Section A ends on V7; section B ends on I. This means…", choices:["A pauses like a comma; B closes like a period","A is finished; B is incomplete","both are complete"], answer:0,
      explain:"Phrase logic, one level up.", hint:"Which chord says 'to be continued'?" },
    { type:"mc", q:"A song alternates 'story stanza' → 'same-words chorus' → 'new story stanza' → 'same-words chorus.' Its form is…", choices:["AB (binary) — verse and refrain","one giant A","rondo"], answer:0,
      explain:"The typical AB format in action.", hint:"Two alternating jobs." },
    { type:"mc", q:"Which is NOT enough, by itself, to create true AB form?", choices:["Playing the same section twice at the same volume","Contrasting melodies between sections","Contrasting rhythms between sections"], answer:0,
      explain:"Repetition without contrast = still just A.", hint:"B must be DIFFERENT." },
    /* generated */
    { gen:"term-match", params:{subject:"term", pool:[["A","the statement"],["B","the contrast"],["Verse","changes each time"],["Refrain","repeats each time"]], reverse:true}, count:3 },
    { gen:"triad-id", params:{ask:"numeral"}, count:2 },
    { gen:"note-value", params:{}, count:1 }
  ],
  vocabulary:[
    {term:"Section (Part)", def:"Several phrases combined into one complete unit of a piece."},
    {term:"AB (Binary) Form", def:"A two-part form whose A and B sections contrast — through melody, rhythm, harmony, time signature or tempo."},
    {term:"Verse", def:"The section that tells a story and CHANGES with each repetition."},
    {term:"Refrain (Chorus)", def:"The section REPEATED after each verse — verse + refrain is the typical AB song format."}
  ],
  mistakes:[],
  summary:[
    "✔ Phrases combine into <b>SECTIONS</b>; two contrasting sections = <b>AB (BINARY) FORM</b>.",
    "✔ Contrast comes from <b>elements</b>: melody, rhythm, harmony, time signature, tempo.",
    "✔ Sections may <b>share a motive</b> — but each stays <b>musically distinct</b>.",
    "✔ <b>Verse</b> = changing story (A); <b>refrain/chorus</b> = repeated sing-along (B).",
    "✔ Verse + refrain = <b>the typical AB song format</b>."
  ],
  tips:[
    "Radio test: in almost any song, the part you can't help singing is the refrain — you've been analyzing AB form your whole life.",
    "When writing your own AB piece, change TWO elements between sections (say, direction and rhythm) — one is rarely enough contrast.",
    "A section is just phrases holding hands: count the breaths inside each section like you did in Lesson 72.",
    "Next lesson: what if A comes back AFTER B? Three letters, and one of music's favorite shapes…"
  ],
  rewards:{ badge:"Binary Navigator", icon:"\u{1F1E6}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"PERFECT! A and B hold no secrets — the two-part world is mapped. \u{1F1E6}\u{1F389}",
  miaPass:"Passed! Statement and contrast, verse and refrain. Now — what if A returns?",
  mia:{
    hook:{ label:"the welcome",
      explain:"The first section rose in even notes; the second fell in dotted rhythm — two CONTRASTING sections: AB (binary) form.",
      play:()=>{[60,62,64,65,67].forEach((m,i)=>MFAudio.tone(m,.38,i*.4,.42));const d=[.6,.3,.2,.2,.3,.6];let t=2.3;[72,71,69,67,69,67].forEach((m,i)=>{MFAudio.tone(m,d[i],t,.42);t+=d[i];});} },
    learn:{ label:"AB form",
      explain:"Phrases → sections. AB = two contrasting sections (via melody, rhythm, harmony, time signature, tempo). Verse (changes) + refrain (repeats) = typical AB.",
      hint:"A states, B contrasts.",
      play:()=>{[60,62,64,65,67,67].forEach((m,i)=>MFAudio.tone(m,.38,i*.4,.42));} },
    example:{ label:"the examples",
      explain:"Example 1 is a miniature binary piece (A ends on V7, B on I); example 2 turns the verse-refrain wheel twice." },
    game:{ label:"the games",
      explain:"Sprint the facts, play both sections, sort A/B material, then assemble a two-verse song.",
      hint:"Contrast = different letter." },
    quiz:{ label:"this question",
      explain:"Three ideas answer everything: sections are phrase-teams, AB means contrast, and verse/refrain is AB's most famous costume.",
      play:()=>{[72,71,69,67,60].forEach((m,i)=>MFAudio.tone(m,.4,i*.38,.42));} }
  }
};
