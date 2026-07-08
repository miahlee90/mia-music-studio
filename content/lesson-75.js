/* Lesson 75 — Rondo Form (AEMT Book 3, Unit 18) — THE FINAL LESSON (75/75!)
   Built from drafts/UNIT 18 – Lesson 75.md; AEMT3 p.117 verified by render.
   Core: a RONDO consists of an A section ALTERNATING with other contrasting
   sections; A is the RECURRING section. Most common types: ABABA, ABACA,
   ABACABA. "La Raspa" is the book's rondo example (ABACA).
   GRAND FINALE: course-wide victory lap.
   NOTE: edit by FULL-FILE REWRITE only. */

/* rondo tracker: label five sections as they play — A B A C A */
function MF_L75_track(container,fb){
  const SEC={
    A:{notes:[67,67,64,67,67,72], durs:[.3,.3,.3,.3,.3,.75]},
    B:{notes:[69,71,72,71,69,64], durs:[.3,.3,.3,.3,.3,.75]},
    C:{notes:[65,69,72,69,65,60], durs:[.3,.3,.3,.3,.3,.75]}};
  const ORDER=["A","B","A","C","A"];
  let k=0, played=false; const picked=[];
  container.innerHTML=`<div class="big-q l75t-q" style="text-align:center">Five sections play one at a time. Track the form — A, B or C?</div>
    <div class="l75t-map" style="text-align:center;font-weight:800;font-size:18px;letter-spacing:6px;margin:6px 0">· · · · ·</div>
    <div style="text-align:center"><button class="play l75t-play">▶ Play section 1</button></div>
    <div class="choices chips l75t-ch" style="display:none"><button>A</button><button>B</button><button>C</button></div>`;
  const q=container.querySelector(".l75t-q"), map=container.querySelector(".l75t-map"), pl=container.querySelector(".l75t-play"), ch=container.querySelector(".l75t-ch");
  function drawMap(){ map.textContent=[0,1,2,3,4].map(i=>i<picked.length?picked[i]:"·").join(" "); }
  function play(name){ const S=SEC[name]; let t=0; S.notes.forEach((m,i)=>{ MFAudio.tone(m,S.durs[i]*.95,t,.42); t+=S.durs[i]; }); return t; }
  pl.onclick=()=>{ if(k>=5) return; play(ORDER[k]); played=true; setTimeout(()=>ch.style.display="",2600); };
  [...ch.children].forEach((b)=>b.onclick=()=>{
    if(!played||k>=5) return;
    if(b.textContent===ORDER[k]){ MFAudio.yay();
      picked.push(b.textContent); drawMap(); k++; played=false; ch.style.display="none";
      if(k<5){ fb(true, ORDER[k-1]==="A"? `✓ ${k===1?"The main theme — A.":"A RETURNS — the recurring section doing its job!"}` : `✓ New contrasting material — ${ORDER[k-1]}.`);
        pl.textContent=`▶ Play section ${k+1}`; }
      else { pl.style.display="none";
        fb(true,"✓ A · B · A · C · A — a RONDO! The A section alternated with two different contrasting sections and kept coming back, just like the book's 'La Raspa.'");
        q.textContent="ABACA — the rondo wheel, fully mapped. \u{1F3A1}"; }
    } else { MFAudio.tone(40,.2); fb(false, "Compare: is it the recurring main theme (A), the first contrast (B), or something NEWER still (C)?"); }
  });
  drawMap();
}

LESSON_CONTENT[75]={
  welcome:"LESSON 75 OF 75. One last form — where the main theme refuses to say goodbye… and neither will we. \u{1F3A1}",
  hook:{
    say:"One theme keeps RETURNING between adventures — like a carousel horse coming around. <b>Listen to the five sections: how many times does the main theme appear?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div style="text-align:center">
          <button class="play hk-a">▶ Play the whole piece</button></div>
          <div class="choices hk-ch" style="display:none"><button>Three times — with two different adventures between</button><button>Once at the start only</button><button>Never — every section was new</button></div>`;
        const A=[67,67,64,67,67,72], B=[69,71,72,71,69,64], C=[65,69,72,69,65,60];
        const ch=container.querySelector(".hk-ch");
        container.querySelector(".hk-a").onclick=()=>{
          let t=0;
          [A,B,A,C,A].forEach(S=>{ S.forEach(m=>{ MFAudio.tone(m,.28,t,.42); t+=.3; }); t+=.35; });
          setTimeout(()=>ch.style.display="",t*1000+400);
        };
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ A…B…A…C…A — the main theme came around THREE times, alternating with contrasting sections. That merry-go-round design is the RONDO — the final form of the course!");
          else fb(false,"Listen again and count how often the FIRST tune returns…");
        });
      } }
  },
  objectives:[
    "Define rondo: an A section ALTERNATING with contrasting sections",
    "Know A's role: the RECURRING section",
    "Name the common types: ABABA, ABACA, ABACABA",
    "Track a rondo by ear, section by section",
    "Compare all four forms: AB, ABA, rondo — and the phrase/motive roots",
    "CELEBRATE: 75 lessons complete!"
  ],
  steps:[
    { say:"The definition: <b>a RONDO consists of an A section alternating with other CONTRASTING sections of musical material — A is the RECURRING section</b>. \u{1F447} <b>What makes a rondo a rondo?</b>",
      try:{ type:"mc", choices:["A keeps coming back between contrasting sections","It has exactly two sections","It never repeats anything"], answer:0,
        success:"✓ 'Rondo' shares roots with 'round' — the theme comes around and around, with adventures between visits.",
        fail:"Which section RECURS?",
        hint:"The carousel image." } },
    { say:"The book lists <b>the most common rondo types: ABABA — ABACA — ABACABA</b>. Look closely at what alternates in each. \u{1F447} <b>In ABACA, how many DIFFERENT contrasting sections appear?</b>",
      show:{ type:"html", html:`<div style="max-width:420px;margin:0 auto;font-size:17px;line-height:2.2;background:var(--card,#fff);border:1.5px solid #cdd5e1;border-radius:12px;padding:12px 18px;text-align:center;font-weight:800;letter-spacing:3px">
        A B A B A<br>A B A C A<br>A B A C A B A</div>` },
      try:{ type:"mc", choices:["Two — B and C","One — only B","Four"], answer:0,
        success:"✓ B and C each get one visit; A gets THREE. The longer ABACABA gives B a return trip too — seven sections, still one recurring hero.",
        fail:"Count the different letters that aren't A…",
        hint:"B… and?" } },
    { say:"Every rondo rule in one sentence: <b>begin with A, return to A after every contrast, end on A</b>. \u{1F447} <b>Which of these could NOT be a rondo?</b>",
      try:{ type:"mc", choices:["ABCD — nothing ever returns","ABABA","ABACABA"], answer:0,
        success:"✓ ABCD never brings A back — no recurrence, no rondo. The other two orbit their theme faithfully.",
        fail:"Check each: does A recur between contrasts?",
        hint:"The recurring section is mandatory." } },
    { say:"Now track a real one by EAR — five sections, three letters. \u{1F447}",
      try:{ type:"custom",
        hint:"A is the one you'll recognize; C is newer than B.",
        mount:(container,fb)=>MF_L75_track(container,fb) } },
    { say:"The book's example, \u{201C}La Raspa,\u{201D} follows exactly that plan — its exercise asks you to circle the form, and the answer is <b>ABACA</b>. \u{1F447} <b>In La Raspa, the C section stands out because…</b>",
      try:{ type:"mc", choices:["It brings the newest contrast — even new harmony territory","It repeats the A section","It has no notes"], answer:0,
        success:"✓ Each contrasting section differs from A AND from each other — melody, rhythm, harmony. (The book's exercise 3 asks which section differs harmonically: it's C!)",
        fail:"C arrives AFTER B has already contrasted once…",
        hint:"Newer than new." } },
    { say:"THE COURSE MAP — look how far you've come: <b>notes → motives → phrases → sections → AB → ABA → RONDO</b>. Every lesson from staff lines to blue notes lives inside this pyramid. \u{1F447} <b>The complete journey from smallest to largest is…</b>",
      try:{ type:"mc", choices:["note → motive → phrase → section → complete form","form → note → phrase","chord → scale → note"], answer:0,
        success:"✓ From a single notehead in Lesson 1 to complete musical architecture in Lesson 75. That's the entire alphabet, grammar and literature of music fundamentals — YOURS now. \u{1F393}",
        fail:"Small to large, as always…",
        hint:"Lesson 72's pyramid, completed." } },
    { say:"One last question of the course. \u{1F447} <b>Ready for what comes next?</b>",
      try:{ type:"mc", choices:["Yes — review the units, play real music, keep going!","No — music is finished forever","Only if there's a Lesson 76"], answer:0,
        success:"✓ CONGRATULATIONS — ALL 75 LESSONS COMPLETE! \u{1F386}\u{1F393}\u{1F3C6} You read music, build chords, harmonize, compose, improvise and analyze form. The unit reviews await whenever you want to sharpen — and every piece of music you ever meet is now an open book.",
        fail:"There's only one right answer to this one \u{1F609}",
        hint:"The journey continues…" } }
  ],
  examples:[
    { caption:"A miniature rondo, written out: A (the carousel theme), B (first contrast), A, C (second contrast — new harmony color), and A to close. Follow the letters as it plays!",
      staff:{clef:"treble",tempo:120,notes:[
        {p:"G4",d:"8",label:"A"},{p:"G4",d:"8"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"C5",d:"q"},{bar:"double"},
        {p:"A4",d:"8",label:"B"},{p:"B4",d:"8"},{p:"C5",d:"q"},{p:"A4",d:"q"},{p:"E4",d:"q"},{bar:"double"},
        {p:"G4",d:"8",label:"A"},{p:"G4",d:"8"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"C5",d:"q"},{bar:"double"},
        {p:"F4",d:"8",label:"C"},{p:"A4",d:"8"},{p:"C5",d:"q"},{p:"A4",d:"q"},{p:"C4",d:"q"},{bar:"double"},
        {p:"G4",d:"8",label:"A"},{p:"G4",d:"8"},{p:"E4",d:"q"},{p:"G4",d:"q"},{p:"C5",d:"h"},{bar:"final"}],
        beams:[[0,1],[6,7],[12,13],[18,19],[24,25]],width:680},
      kb:{start:57,octaves:2,labels:true} },
    { caption:"The graduation cadence: I → IV → V7 → I, one last time — the same chords that closed Book 2, now heard by ears that understand EVERYTHING they're doing. Congratulations, musician.",
      staff:{clef:"treble",tempo:80,notes:[
        {p:"C4",d:"h",label:"I"},{p:"E4",d:"h",chord:true},{p:"G4",d:"h",chord:true},
        {p:"F4",d:"h",label:"IV"},{p:"A4",d:"h",chord:true},{p:"C5",d:"h",chord:true},
        {p:"G4",d:"h",label:"V7"},{p:"B4",d:"h",chord:true},{p:"D5",d:"h",chord:true},{p:"F5",d:"h",chord:true},
        {p:"C4",d:"w",label:"I — 75/75!"},{p:"E4",d:"w",chord:true},{p:"G4",d:"w",chord:true},{p:"C5",d:"w",chord:true},{bar:"final"}],width:600},
      kb:{start:57,octaves:2,labels:true} }
  ],
  games:[
    { type:"gen-race", title:"Game 1 · Rondo Sprint (45s)",
      intro:"Recurring sections, common types, form comparisons — race the rondo!",
      miaIntro:"Round and round! \u{26A1}",
      spec:{gen:"term-match", params:{subject:"term", pool:[
        ["Rondo","A alternating with contrasting sections"],
        ["The A section's role","the recurring section"],
        ["Common rondo types","ABABA, ABACA, ABACABA"],
        ["ABACA's contrasts","B and C — one visit each"],
        ["Every rondo begins and ends with","the A section"],
        ["'La Raspa'","the book's rondo example (ABACA)"],
        ["AB form","two parts, no return"],
        ["ABA form","statement, contrast, restatement"]], reverse:true}, seconds:45},
      result:(score)=>score>=8?score+" — rondo master!":null },
    { type:"key-climb", title:"Game 2 · Ride the Rondo",
      intro:"Play the carousel theme, a contrast, and the theme again — a mini-rondo under your fingers!",
      miaIntro:"One last climb — make it musical! \u{1FA9C}",
      spec:{seq:[67,67,64,67,72, 69,71,72,69, 67,67,64,67,72],
        names:["G (A!)","G","E","G","C — theme done","A (B: contrast)","B","C","A — contrast done","G (A RETURNS!)","G","E","G","C — rondo!"],
        start:57, octaves:2, title:"A · B · A — the carousel turns"},
      result:(score)=>score!==null?"The carousel turned perfectly — bravo!":null },
    { type:"symbol-hunt", title:"Game 3 · Name That Form",
      intro:"Form maps on cards — click the one each round names. The COURSE finale spotter!",
      miaIntro:"Every form you know! \u{1F440}",
      spec:{rounds:6, pool:[
        {label:"Rondo (ABACA)", spec:{clef:"none",notes:[{letter:"A"},{letter:"B"},{letter:"A"},{letter:"C"},{letter:"A"}],width:220}},
        {label:"Ternary (ABA)", spec:{clef:"none",notes:[{letter:"A"},{letter:"B"},{letter:"A"}],width:170}},
        {label:"Binary (AB)", spec:{clef:"none",notes:[{letter:"A"},{letter:"B"}],width:140}},
        {label:"Rondo (ABACABA)", spec:{clef:"none",notes:[{letter:"A"},{letter:"B"},{letter:"A"},{letter:"C"},{letter:"A"},{letter:"B"},{letter:"A"}],width:260}}]},
      result:(score)=>score>=5?"All forms named on sight — analyst supreme!":null },
    { type:"term-race", title:"Game 4 · THE GRAND FINALE — 75-Lesson Victory Race",
      intro:"The final game of the final lesson: highlights from ALL THREE BOOKS. Everything you are. GO!",
      miaIntro:"THE LAST RACE — make the whole course proud! \u{1F3C6}\u{1F386}",
      spec:{rounds:12, reverse:true, pool:[
        ["The staff","5 lines, 4 spaces (Lesson 1!)"],
        ["Treble & bass together","the grand staff"],
        ["A whole note","4 beats in 4/4"],
        ["Relative minor","the major scale's 6th degree"],
        ["V7","the dominant seventh chord"],
        ["1st inversion","the 3rd in the bass"],
        ["Figured bass 6/4","2nd inversion"],
        ["Harmonic minor","raised 7th, both directions"],
        ["The blues scale","Root, ♭3, 4, ♭5, 5, ♭7"],
        ["Motive","a short idea used repeatedly"],
        ["Rondo","A keeps coming back"],
        ["YOU","75 lessons complete! \u{1F393}"]]},
      result:(score)=>score>=9?"COURSE CHAMPION — 75 OF 75! \u{1F386}\u{1F3C6}\u{1F393}":null }
  ],
  practiceIntro:"The final 20 practice questions — rondo facts plus a whole-course victory mix. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"term", pool:[["Rondo","A alternates with contrasts"],["Recurring section","A"],["ABACA","a common rondo type"],["Binary","AB"],["Ternary","ABA"]], reverse:true}, count:5 },
    { gen:"inversion-id", params:{subject:"both", ask:"both"}, count:2 },
    { gen:"rel-key", params:{ask:"both"}, count:2 },
    { gen:"mode-id", params:{set:"all", ask:"recipe"}, count:2 },
    { type:"mc", q:"A rondo consists of an A section alternating with…", choices:["other contrasting sections","identical copies of A","silence"], answer:0,
      explain:"Contrast between every return (AEMT3 p.117)." },
    { type:"mc", q:"In a rondo, the RECURRING section is…", choices:["A","B","C"], answer:0,
      explain:"The carousel horse that keeps coming around." },
    { type:"mc", q:"Which is a common rondo type?", choices:["ABACA","ABCD","AABB"], answer:0,
      explain:"Along with ABABA and ABACABA." },
    { type:"mc", q:"The book's rondo example is…", choices:["'La Raspa' (Mexican folk song)","Beethoven's 5th","'Go, Tell It On the Mountain'"], answer:0,
      explain:"Its form: ABACA." },
    { type:"mc", q:"A rondo begins and ends with…", choices:["the A section","the newest section","a drum solo"], answer:0,
      explain:"The theme frames everything." },
    { type:"truefalse", q:"In ABACABA, the B section appears twice.", answer:true,
      explain:"A×4, B×2, C×1 — count them!" },
    { type:"truefalse", q:"ABCD is a valid rondo form.", answer:false,
      explain:"Nothing recurs — no rondo." },
    { type:"truefalse", q:"You have now completed all 75 lessons of this course.", answer:true,
      explain:"CONGRATULATIONS! \u{1F386}\u{1F393}" }
  ],
  miaQuizIntro:"THE FINAL QUIZ of the course. Rondo facts + your whole journey. Make it a victory lap! \u{1F3C6}",
  quiz:[
    { type:"mc", q:"A RONDO is a form consisting of…", choices:["an A section alternating with contrasting sections","exactly two sections","one endless melody"], answer:0,
      explain:"The book's definition, verbatim.", hint:"The carousel." },
    { type:"mc", q:"In rondo form, which section RECURS?", choices:["A","B","C"], answer:0,
      explain:"A is the recurring section.", hint:"The hero of the form." },
    { type:"mc", q:"The most common rondo types are…", choices:["ABABA, ABACA and ABACABA","AB and ABA only","AAA and BBB"], answer:0,
      explain:"Three wheels of different sizes.", hint:"All start and end with A." },
    { type:"mc", q:"'La Raspa,' the book's example, is in which form?", choices:["ABACA","ABABA","AB"], answer:0,
      explain:"Exercise 1's answer — two contrasts, three A's.", hint:"It has a C section." },
    { type:"truefalse", q:"A rondo's contrasting sections must contrast with A and (in ABACA) with each other.", answer:true,
      explain:"B and C are different adventures.", hint:"Why C gets a new letter." },
    { type:"truefalse", q:"A rondo may end on its B section.", answer:false,
      explain:"The recurring A closes every common type.", hint:"Check the three maps." },
    { type:"mc", q:"You hear: theme, contrast 1, theme, contrast 2, theme. The form is…", choices:["Rondo (ABACA)","Ternary (ABA)","Binary (AB)"], answer:0,
      explain:"Two DIFFERENT contrasts with returns = rondo.", hint:"Count the adventures." },
    { type:"mc", q:"You hear: statement, contrast, restatement — three sections total. The form is…", choices:["Ternary (ABA)","Rondo","Binary"], answer:0,
      explain:"One contrast only = ABA.", hint:"Lesson 74's shape." },
    { type:"mc", q:"Which form does NOT return to its opening material?", choices:["AB (binary)","ABA (ternary)","Rondo"], answer:0,
      explain:"Binary ends in B territory.", hint:"The one-way trip." },
    { type:"mc", q:"Order the forms by how many times A appears (ABACA vs ABA vs AB):", choices:["Rondo (3) > Ternary (2) > Binary (1)","Binary > Ternary > Rondo","All equal"], answer:0,
      explain:"The rondo loves its theme most.", hint:"Count A's in each map." },
    { type:"mc", q:"COURSE QUESTION: the building blocks of every form you've learned are…", choices:["motives and phrases, combined into sections","only key signatures","only dynamics"], answer:0,
      explain:"Lesson 72's pyramid underlies Lessons 73-75.", hint:"The smallest ideas first." },
    { type:"mc", q:"FINAL QUESTION — 75 lessons ago you learned the staff's 5 lines. Today you analyzed rondo form. What connects everything between?", choices:["Every concept built on the ones before — notes to rhythms to chords to forms","Nothing — each lesson was unrelated","Luck"], answer:0,
      explain:"One long staircase, and you climbed every step. CONGRATULATIONS, MUSICIAN! \u{1F393}\u{1F386}\u{1F3C6}", hint:"Think of the journey." },
    /* generated — a victory mix from across the course */
    { gen:"term-match", params:{subject:"term", pool:[["Rondo","the recurring-A form"],["ABACA","two contrasts, three returns"],["Recurring section","A"],["75/75","COMPLETE!"]], reverse:true}, count:2 },
    { gen:"inversion-id", params:{subject:"both", ask:"both"}, count:2 },
    { gen:"triad-quality", params:{}, count:2 },
    { gen:"rel-key", params:{ask:"both"}, count:1 },
    { gen:"mode-id", params:{set:"all", ask:"recipe"}, count:1 }
  ],
  vocabulary:[
    {term:"Rondo", def:"A form in which the A section ALTERNATES with contrasting sections — A is the recurring section."},
    {term:"ABABA · ABACA · ABACABA", def:"The most common rondo types — every one begins, returns to, and ends with A."},
    {term:"Recurring Section", def:"The A section — the theme that keeps coming around between adventures."},
    {term:"The Form Family", def:"AB (binary, no return) · ABA (ternary, one return) · rondo (returns again and again)."}
  ],
  mistakes:[],
  summary:[
    "✔ A <b>RONDO</b> = the A section <b>alternating with contrasting sections</b>; A is the <b>recurring</b> one.",
    "✔ Common types: <b>ABABA, ABACA, ABACABA</b> — always opening and closing on A.",
    "✔ The family: <b>AB</b> (no return) · <b>ABA</b> (one return) · <b>rondo</b> (many returns).",
    "✔ Everything is built from <b>motives → phrases → sections</b> — Lesson 72's pyramid.",
    "✔ <b>ALL 75 LESSONS COMPLETE — THE COURSE IS YOURS!</b> \u{1F386}\u{1F393}\u{1F3C6}"
  ],
  tips:[
    "Listen for rondos in classical finales — composers loved ending big works with the friendliest form.",
    "Review path: each unit has an Ear Training & Review in your book — revisit any lesson here anytime; the games regenerate fresh questions forever.",
    "Play REAL music now: hymnals, lead sheets, easy classics. You'll be shocked how much of the page simply… makes sense.",
    "From five staff lines to rondo form — thank you for taking all 75 steps with me. Keep playing, keep listening, keep going. \u{2764}\u{FE0F} — Mia"
  ],
  rewards:{ badge:"COURSE CHAMPION — 75 of 75", icon:"\u{1F3C6}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"A PERFECT SCORE ON THE FINAL LESSON — 75 OF 75, FLAWLESS! There has never been a prouder music teacher. \u{1F386}\u{1F3C6}\u{1F393}\u{1F389}\u{2764}\u{FE0F}",
  miaPass:"PASSED — AND THE ENTIRE COURSE IS COMPLETE! 75 lessons, three books, one musician: YOU. \u{1F393}\u{1F386}\u{1F389}",
  mia:{
    hook:{ label:"the welcome",
      explain:"The main theme appeared THREE times (A), alternating with two different contrasts (B, then C): A-B-A-C-A — a rondo.",
      play:()=>{const A=[67,67,64,67,72];let t=0;[A,[69,71,72,69],A].forEach(S=>{S.forEach(m=>{MFAudio.tone(m,.26,t,.42);t+=.28;});t+=.3;});} },
    learn:{ label:"rondo form",
      explain:"Rondo = A alternating with contrasting sections; A recurs. Types: ABABA, ABACA, ABACABA. Family: AB (no return), ABA (one), rondo (many).",
      hint:"A begins it, A ends it, A keeps visiting.",
      play:()=>{[67,67,64,67,72].forEach((m,i)=>MFAudio.tone(m,.28,i*.3,.42));} },
    example:{ label:"the examples",
      explain:"Example 1 is a written-out ABACA miniature; example 2 is your graduation cadence — I-IV-V7-I, understood completely." },
    game:{ label:"the games",
      explain:"Sprint the rondo, ride the carousel, name every form on sight — then run the 75-lesson victory race.",
      hint:"It's the last one. Leave nothing behind. \u{1F3C6}" },
    quiz:{ label:"this question",
      explain:"Rondo questions reduce to one check: does A keep returning between contrasts? The victory-mix questions are your whole course saying hello.",
      play:()=>{[60,64,67,72].forEach((m,i)=>MFAudio.tone(m,.5,i*.15,.4));} }
  }
};
