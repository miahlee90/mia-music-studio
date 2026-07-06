/* Lesson 21 — D.C., D.S., Coda and Fine (AEMT Book 1, Unit 5)
   Built from drafts/UNIT 5 – Lesson 21.md.
   QA note honored: symbols introduced ONE at a time, then combined into complete
   roadmaps with follow-the-path interaction and highlighted playback.
   NOTE: edit by FULL-FILE REWRITE only. */

/* where-do-you-go drill (unique L21 prefix) */
function MF_L21_whereGo(container,fb){
  const rounds=[
    {see:"D.C. (Da Capo)",a:0,why:"Da Capo = “from the head” — back to the BEGINNING."},
    {see:"D.S. (Dal Segno)",a:1,why:"Dal Segno = “from the sign” — back to the SEGNO \u{1D10B}-style symbol."},
    {see:"Fine",a:2,why:"Fine = “the end” — STOP here."},
    {see:"To Coda ➔",a:3,why:"Jump to the CODA — the special ending section."}];
  const OPTS=["The beginning","The Segno sign","Stop — this is the end","The Coda section"];
  let i=0;
  container.innerHTML=`<div class="big-q wg-q" style="text-align:center;min-height:56px"></div>
    <div class="choices wg-ch"></div>`;
  const q=container.querySelector(".wg-q"), ch=container.querySelector(".wg-ch");
  OPTS.forEach((o,oi)=>{ const b=document.createElement("button"); b.textContent=o;
    b.onclick=()=>{
      const cur=rounds[i];
      if(oi===cur.a){ MFAudio.tone(76,.3); i++;
        if(i>=rounds.length){ ch.style.display="none"; q.textContent="GPS calibrated!";
          fb(true,"✓ Beginning, Sign, Stop, Special ending — all four destinations locked in!"); }
        else { fb(true,"✓ "+cur.why+" Next sign…"); ask(); } }
      else { MFAudio.tone(40,.25); fb(false,cur.why); }
    };
    ch.appendChild(b); });
  function ask(){ q.innerHTML=`Sign ${i+1} of ${rounds.length}: you see <b>${rounds[i].see}</b>. Where do you go?`; }
  ask();
}

LESSON_CONTENT[21]={
  welcome:"Grab the map — music has GPS! \u{1F5FA}\u{FE0F}",
  hook:{
    say:"Have you ever followed a treasure map? Music has maps too! Composers use special symbols to tell musicians <b>where to go, when to repeat, and where to finish</b>. \u{1F447} <b>What would you guess “Fine” (FEE-neh) means?</b>",
    interact:{ type:"custom",
      mount:(container,fb)=>{
        container.innerHTML=`<div class="choices hk-ch"><button>\u{1F6D1} “The end” — stop here</button><button>“Play finely and delicately”</button><button>“Speed up”</button></div>`;
        const ch=container.querySelector(".hk-ch");
        [...ch.children].forEach((b,i)=>b.onclick=()=>{
          if(i===0) fb(true,"✓ Fine is Italian for THE END — the stop sign of the musical map. Today you'll learn the whole GPS!");
          else fb(false,"It's Italian, not English — think of “finish”…");
        });
      } }
  },
  objectives:[
    "Identify D.C., D.S., Fine and Coda",
    "Explain what each roadmap marking means",
    "Recognize the Segno and Coda symbols",
    "Follow musical repeat directions correctly",
    "Read simple musical roadmaps",
    "Perform music in the correct order"
  ],
  steps:[
    { say:"Four road signs, one at a time: \u{1F3E0} <b>D.C. (Da Capo)</b> = “from the beginning” — go back to the start. \u{1F516} <b>D.S. (Dal Segno)</b> = “from the sign” — go back to the <b>Segno</b> symbol. \u{1F6D1} <b>Fine</b> = “the end” — stop here. \u{1F3C1} <b>Coda</b> = a special ending you JUMP to. \u{1F447} <b>What does D.C. (Da Capo) tell you to do?</b>",
      show:{ type:"staff", spec:{clef:"treble",time:"4/4",notes:[
        {mark:"segno",label:"Segno"},{p:"C4",d:"h"},{p:"E4",d:"h"},{bar:"single"},
        {p:"G4",d:"h"},{p:"E4",d:"h"},{mark:"fine",label:"Fine"},{bar:"double"},
        {p:"F4",d:"h"},{p:"D4",d:"h"},{mark:"dc",label:"D.C."},{bar:"single"},
        {mark:"coda",label:"Coda"},{p:"C5",d:"w"},{bar:"final"}],width:470} },
      try:{ type:"mc",
        choices:["Go back to the beginning","Go to the Segno","Stop playing"], answer:0,
        success:"✓ Da Capo — literally “from the head.” Back to bar one!",
        fail:"Capo means “head” — the HEAD of the piece is its…?",
        hint:"\u{1F3E0} home = the start." } },
    { say:"Signs combine into instructions: <b>D.C. al Fine</b> = back to the beginning, play until <b>Fine</b>, stop. <b>D.S. al Fine</b> = back to the <b>Segno</b>, stop at Fine. <b>D.C. al Coda</b> = back to the start, play to “To Coda,” then JUMP to the Coda. \u{1F447} <b>Follow this map with your ears:</b>",
      try:{ type:"custom",
        hint:"Watch the highlight — it plays A, B, C, hits D.C. al Fine, restarts, and STOPS at Fine.",
        mount:(container,fb)=>{
          const spec={clef:"treble",time:"4/4",tempo:112,
            notes:[{p:"C4",d:"h",label:"A"},{p:"E4",d:"h",label:"B (Fine)"},{mark:"fine"},{p:"G4",d:"h",label:"C"},{p:"E4",d:"h",label:"D"},{mark:"dc-fine"},{bar:"final"}],width:470};
          container.innerHTML=`<div class="gps-staff"></div>
            <div style="text-align:center"><button class="play gps-play">▶ Follow the map</button></div>
            <div class="big-q gps-q" style="text-align:center;min-height:32px"></div>`;
          const api=Staff.render(container.querySelector(".gps-staff"),spec);
          const q=container.querySelector(".gps-q");
          container.querySelector(".gps-play").onclick=()=>{
            const spb=60/112;
            const trip=[[0,0,"A…"],[1,2,"B…"],[3,4,"C…"],[4,6,"D — “D.C. al Fine!”"],[0,8,"back to A…"],[1,10,"B — Fine: STOP."]];
            trip.forEach(([idx,beat,txt])=>{
              const n=spec.notes[idx];
              setTimeout(()=>{ api.highlight(idx); q.textContent=txt; }, beat*spb*1000);
              MFAudio.tone(MFAudio.midi(n.p), 2*spb*.9, beat*spb);
            });
            setTimeout(()=>{ api.highlight(null); q.textContent="";
              fb(true,"✓ You followed D.C. al Fine: play through, restart from the top, and stop exactly at Fine."); }, 12.5*spb*1000);
          };
        } } },
    { say:"Learn the two special SYMBOLS: the <b>Segno</b> (an S with a slash and dots — your bookmark \u{1F516}) and the <b>Coda</b> (a circle with a cross — the finish flag \u{1F3C1}). \u{1F447} <b>Which is which?</b>",
      show:{ type:"staff", spec:{clef:"treble",notes:[{mark:"segno",label:"1"},{p:"B4",d:"q",label:"2"},{mark:"coda",label:"3"}],width:360} },
      try:{ type:"mc",
        choices:["1 = Segno, 3 = Coda","1 = Coda, 3 = Segno","They're the same symbol"], answer:0,
        success:"✓ The slashed S is the Segno bookmark; the crossed circle is the Coda target.",
        fail:"S-shape = Segno (S for Sign!); circle+cross = Coda.",
        hint:"S is for Segno." } },
    { say:"Where do you go? Test every sign. \u{1F447}",
      try:{ type:"custom",
        hint:"Beginning · Sign · Stop · Special ending.",
        mount:(container,fb)=>MF_L21_whereGo(container,fb) } },
    { say:"Final mission: assemble a <b>D.C. al Fine</b> performance from start to stop. \u{1F447} <b>Tap the steps in order:</b>",
      try:{ type:"custom",
        hint:"Play everything once, see the instruction, restart, stop at Fine.",
        mount:(container,fb)=>{
          const seq=["Play section A","Play section B (Fine is here)","Play to the end — see “D.C. al Fine”","Return to the beginning","Play section A again","STOP at Fine"];
          let next=0;
          container.innerHTML=`<div class="big-q ro-q" style="text-align:center">Build the D.C. al Fine journey:</div>
            <div class="ro-done" style="text-align:center;font-weight:700;min-height:30px;color:var(--primary)"></div>
            <div class="choices ro-ch"></div>`;
          const done=container.querySelector(".ro-done"), ch=container.querySelector(".ro-ch");
          [...seq].sort(()=>Math.random()-.5).forEach(s=>{
            const b=document.createElement("button"); b.textContent=s;
            b.onclick=()=>{
              if(s===seq[next]){ next++; b.disabled=true; MFAudio.tone(58+next*3,.25);
                done.textContent=seq.slice(0,next).map((x,i)=>i+1).join("·");
                if(next===seq.length){ ch.style.display="none"; done.textContent=seq.join(" → ");
                  fb(true,"✓ A complete D.C. al Fine journey — play, return, and stop at the sign that says “the end.”"); } }
              else { MFAudio.tone(40,.25); fb(false,`What happens ${next===0?"first":"after “"+seq[next-1]+"”"}?`); }
            };
            ch.appendChild(b);
          });
        } } }
  ],
  examples:[
    { caption:"A map with every landmark: Segno bookmark, Fine stop sign, To-Coda jump point, and the Coda flag.",
      staff:{clef:"treble",notes:[{mark:"segno"},{p:"C4",d:"q",label:"music…"},{mark:"fine"},{p:"E4",d:"q",label:"more…"},{mark:"tocoda"},{p:"G4",d:"q",label:"…"},{mark:"coda",label:"special ending"},{bar:"final"}],width:470} },
    { caption:"D.C. al Fine written where you'd meet it — at the END of the music, sending you back to the top.",
      staff:{clef:"treble",tempo:112,time:"4/4",notes:[{p:"C4",d:"h",label:"A"},{p:"E4",d:"h",label:"B (Fine)"},{mark:"fine"},{p:"G4",d:"h",label:"C"},{mark:"dc-fine"},{bar:"final"}],width:460} }
  ],
  games:[
    { type:"term-race", title:"Game 1 · GPS Term Dash",
      intro:"A sign flashes — where does it send you? All the roadmap vocabulary at speed!",
      miaIntro:"Quick — read the road signs! \u{26A1}",
      spec:{rounds:8, pool:[
        ["D.C. (Da Capo)","Return to the beginning"],
        ["D.S. (Dal Segno)","Return to the Segno sign"],
        ["Fine","The end — stop here"],
        ["Coda","A special ending section"],
        ["Segno","The bookmark symbol D.S. returns to"],
        ["To Coda","The jump point — leap to the Coda"],
        ["D.C. al Fine","From the beginning, stop at Fine"]]},
      result:(score)=>score>=7?"Roadmap vocabulary — navigation ready!":null },
    { type:"symbol-hunt", title:"Game 2 · Landmark Hunt",
      intro:"Segno, Coda, Fine, repeat signs — click the landmark Mia names!",
      miaIntro:"Find each landmark on the map! \u{1F50D}",
      spec:{rounds:6, pool:[
        {label:"Segno", spec:{clef:"treble",notes:[{mark:"segno"}]}},
        {label:"Coda symbol", spec:{clef:"treble",notes:[{mark:"coda"}]}},
        {label:"Fine", spec:{clef:"treble",notes:[{mark:"fine"}]}},
        {label:"D.C. al Fine", spec:{clef:"treble",notes:[{mark:"dc-fine"}]}},
        {label:"Repeat Sign", spec:{clef:"treble",notes:[{bar:"repeat-end"}]}}]},
      result:(score)=>score>=5?"Every landmark spotted from a distance!":null },
    { type:"order-tap", title:"Game 3 · The D.S. al Coda Run",
      intro:"The trickiest route: tap the D.S. al Coda journey in perfect order!",
      miaIntro:"Advanced navigation — sign to coda! \u{1F3C1}",
      spec:{title:"Run the D.S. al Coda route in order!",
        sequence:["Play from the start","Pass the Segno","See “D.S. al Coda”","Return to the Segno","Play to “To Coda”","Jump to the Coda","Finish!"]},
      result:(stars)=>stars>=3?"D.S. al Coda — the expert route, aced!":null },
    { type:"term-race", title:"Game 4 · Reverse GPS (45s)",
      intro:"Mia names the destination, YOU name the sign — 45 seconds on the clock!",
      miaIntro:"Final sprint — destinations to signs! \u{23F1}",
      spec:{seconds:45, reverse:true, pool:[
        ["D.C.","Return to the beginning"],
        ["D.S.","Return to the Segno sign"],
        ["Fine","The end — stop here"],
        ["Coda","A special ending section"],
        ["To Coda","The jump point to the special ending"]]},
      result:(score)=>score>=11?score+" — instant sign recall!":null }
  ],
  practiceIntro:"20 practice questions — the four signs, the two symbols, and complete journeys. Answer right and the next appears automatically!",
  practice:[
    { gen:"term-match", params:{subject:"roadmap marking", pool:[["D.C. (Da Capo)","Return to the beginning"],["D.S. (Dal Segno)","Return to the Segno sign"],["Fine","The end — stop here"],["Coda","A special ending section"],["Segno","The bookmark D.S. returns to"],["To Coda","Jump to the Coda"]], reverse:true}, count:8 },
    { gen:"note-value", params:{values:["q","q.","8","h"], ask:"beats"}, count:2 },
    { gen:"note-name", params:{clef:"treble"}, count:2 },
    { type:"mc", q:"Da Capo literally means…", choices:["“from the head” (the beginning)","“from the sign”","“the end”"], answer:0,
      explain:"Capo = head — the top of the piece." },
    { type:"mc", q:"Dal Segno means…", choices:["“from the sign”","“from the beginning”","“jump to the end”"], answer:0,
      explain:"Segno = sign — return to the bookmark." },
    { type:"truefalse", q:"Fine marks where the piece truly ends.", answer:true,
      explain:"When directed there, you STOP at Fine." },
    { type:"truefalse", q:"The Coda is a special ending section.", answer:true,
      explain:"You JUMP to it when the map says so." },
    { type:"mc", q:"D.C. al Fine means…", choices:["back to the beginning, stop at Fine","back to the Segno, jump to the Coda","repeat the last measure"], answer:0,
      explain:"From the top, until the stop sign." },
    { type:"mc", q:"D.C. al Coda means…", choices:["back to the start, play to “To Coda,” then jump to the Coda","stop immediately","play the Coda twice"], answer:0,
      explain:"Restart, reach the jump point, leap to the special ending." },
    { type:"truefalse", q:"The Segno symbol looks like an S with a slash and two dots.", answer:true,
      explain:"S for Segno — your musical bookmark." },
    { type:"truefalse", q:"These roadmap signs exist so composers don't have to write the same music twice.", answer:true,
      explain:"Just like repeat signs — but with more powerful jumps." }
  ],
  miaQuizIntro:"Quiz time! Read every sign before you turn — GO!",
  quiz:[
    { type:"mc", q:"What does Fine mean?", choices:["Repeat","Beginning","The end","Play louder"], answer:2,
      explain:"Italian for “the end” — stop there when directed.", hint:"\u{1F6D1}" },
    { type:"mc", q:"What does Da Capo (D.C.) tell you to do?", choices:["Go to the Coda","Go to the Segno","Return to the beginning","Stop playing"], answer:2,
      explain:"From the head — the very start.", hint:"\u{1F3E0}" },
    { type:"mc", q:"What does Dal Segno (D.S.) mean?", choices:["Go to the beginning","Go to the Segno sign","Repeat the last measure","Skip to the end"], answer:1,
      explain:"Return to the bookmark symbol.", hint:"\u{1F516}" },
    { type:"truefalse", q:"A Coda is a special ending section.", answer:true,
      explain:"The finish-flag section you jump to.", hint:"\u{1F3C1}" },
    { type:"truefalse", q:"Fine means to continue playing.", answer:false,
      explain:"Fine = STOP — the end.", hint:"The stop sign." },
    { type:"truefalse", q:"D.C. means to return to the beginning.", answer:true,
      explain:"Da Capo — from the head.", hint:"Capo = head." },
    { type:"mc", q:"Which marking sends you back to the SEGNO sign?", choices:["D.C.","D.S.","Fine","Coda"], answer:1,
      explain:"Dal Segno — from the sign.", hint:"S for Segno." },
    { type:"mc", q:"Which matching is correct?",
      choices:["D.C. → beginning · D.S. → Segno · Fine → end · Coda → special ending",
               "D.C. → Segno · D.S. → end · Fine → beginning · Coda → repeat",
               "D.C. → Coda · D.S. → beginning · Fine → special ending · Coda → end"], answer:0,
      explain:"Home, bookmark, stop sign, finish flag.", hint:"\u{1F3E0}\u{1F516}\u{1F6D1}\u{1F3C1}" },
    { type:"mc", q:"The Italian word Fine means ____.", choices:["the end","the sign","again"], answer:0,
      explain:"The end.", hint:"Finish." },
    { type:"mc", q:"Da Capo tells you to return to the ____.", choices:["beginning","Segno","Coda"], answer:0,
      explain:"The head of the piece.", hint:"\u{1F3E0}" },
    { type:"mc", q:"Which symbol is the SEGNO?",
      staff:{clef:"treble",notes:[{mark:"segno",label:"1"},{mark:"coda",label:"2"},{mark:"fine",label:"3"}],width:360},
      choices:["1","2","3"], answer:0,
      explain:"The slashed S with dots. (2 = Coda, 3 = Fine.)",
      hint:"S shape." },
    { type:"mc", q:"Which statement is correct?",
      choices:["Fine means repeat from the beginning","D.S. means return to the Segno sign","Coda means stop immediately","D.C. means play louder"], answer:1,
      explain:"Dal Segno = from the sign.", hint:"Check each translation." },
    /* generated */
    { gen:"term-match", params:{subject:"roadmap marking", pool:[["D.C.","Return to the beginning"],["D.S.","Return to the Segno sign"],["Fine","The end — stop here"],["Coda","A special ending section"],["To Coda","Jump to the Coda"]], reverse:true}, count:5 },
    { gen:"note-value", params:{values:["q","q.","8","h"], ask:"beats"}, count:2 },
    { gen:"note-name", params:{clef:"treble"}, count:1 }
  ],
  vocabulary:[
    {def:"“From the beginning” — return to the start", term:"Da Capo (D.C.)"},
    {def:"“From the sign” — return to the Segno", term:"Dal Segno (D.S.)"},
    {def:"The bookmark symbol D.S. returns to", term:"Segno", staff:{clef:"none",notes:[{mark:"segno"}],width:140}},
    {def:"“The end” — stop here when directed", term:"Fine", staff:{clef:"none",notes:[{mark:"fine"}],width:140}},
    {def:"A special ending section you JUMP to", term:"Coda", staff:{clef:"none",notes:[{mark:"coda"}],width:140}}
  ],
  mistakes:[],
  summary:[
    "✔ <b>D.C.</b> = from the <b>beginning</b> \u{1F3E0} · <b>D.S.</b> = from the <b>Segno</b> \u{1F516}.",
    "✔ <b>Fine</b> = the end \u{1F6D1} · <b>Coda</b> = the special ending \u{1F3C1}.",
    "✔ <b>D.C. al Fine</b>: restart, stop at Fine.",
    "✔ <b>D.C./D.S. al Coda</b>: go back, play to “To Coda,” JUMP to the Coda.",
    "✔ Trace the route with your finger BEFORE you play."
  ],
  tips:[
    "Read the signs like a treasure map: home \u{1F3E0}, bookmark \u{1F516}, stop \u{1F6D1}, flag \u{1F3C1}.",
    "In real scores, mark your route with a pencil — every pro does it!",
    "Meet the instruction at the END of the written music — it always sends you somewhere you've been.",
    "\u{1F389} Unit 5 complete! Next: Unit 6 — accidentals! Flats make notes lower…"
  ],
  rewards:{ badge:"Musical GPS Guide", icon:"\u{1F5FA}\u{FE0F}" },
  sectionOrder:["secHook","secObjectives","secLearn","secExample","secReview",
    "secGame0","secGame1","secGame2","secGame3","secPractice","secQuiz","secTips","secNext"],
  miaPerfect:"PERFECT navigation — not one wrong turn on the whole map! Unit 6 awaits. \u{1F5FA}\u{FE0F}\u{1F389}",
  miaPass:"You passed! The musical GPS is calibrated. Review below or run the route once more.",
  mia:{
    hook:{ label:"the welcome",
      explain:"Four signs run music's GPS: D.C. (beginning), D.S. (the Segno sign), Fine (stop), Coda (special ending).",
      play:()=>{[72,67,64,60].forEach((m,k)=>MFAudio.tone(m,.3,k*.3));} },
    learn:{ label:"the roadmap signs",
      explain:"D.C. = beginning; D.S. = Segno; Fine = stop; Coda = jump-to ending. Combined: D.C. al Fine, D.S. al Coda, etc.",
      hint:"Home, bookmark, stop sign, finish flag.",
      play:()=>{[60,64,67,72,67,64,60].forEach((m,k)=>MFAudio.tone(m,.25,k*.25));} },
    example:{ label:"the examples",
      explain:"Example 1 shows every landmark in place; example 2 is a real D.C. al Fine — trace it with your finger." },
    game:{ label:"the games",
      explain:"Race the signs, hunt the landmarks, run the expert D.S. al Coda route, and reverse-match under time.",
      hint:"Always know your destination BEFORE you move." },
    quiz:{ label:"this question",
      explain:"Translate first: Capo = head/beginning, Segno = sign, Fine = end, Coda = tail/special ending.",
      play:()=>{MFAudio.tone(60,.3,0);MFAudio.tone(72,.5,.4);} }
  }
};
