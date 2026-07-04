/* Music Fundamentals — mini-game library (DD-17). Low-pressure: session scores only.
   v3 (Milestone 2, Session 13): adds note-race, alphabet-order, memory-match,
   clef-note, find-c, ledger-count, high-low-staff, pattern-fill;
   line-space now supports {clef:"bass"}; exposes Games.has(type) for validation.
   NOTE (maintenance): edit by FULL-FILE REWRITE only. */
const Games=(()=>{
  const LETTERS=["A","B","C","D","E","F","G"];
  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
  function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
  /* 7 letter buttons A–G */
  function letterRow(parent,onPick){
    const row=document.createElement("div"); row.className="gbtns"; row.style.display="none";
    LETTERS.forEach(l=>{ const b=document.createElement("button"); b.textContent=l; b.onclick=()=>onPick(l); row.appendChild(b); });
    parent.appendChild(row); return row;
  }
  const registry={

    /* Higher or Lower? — ear training. spec:{rounds:5} */
    "higher-lower":(el,spec,onFinish)=>{
      const rounds=spec.rounds||5;
      el.innerHTML=`<div class="game-arena">
        <button class="play gstart">▶ Start round</button>
        <div class="big-q gq"></div>
        <div class="gbtns" style="display:none"><button class="gh">⬆ Higher</button> <button class="gl">⬇ Lower</button></div>
        <div class="streak gs"></div></div>`;
      const $=s=>el.querySelector(s);
      let round=0,streak=0,best=0,pair=null;
      $(".gstart").onclick=()=>{
        round++;
        if(round>rounds){ $(".gq").textContent=`Game over — best streak: ${best} 🎉`;
          $(".gbtns").style.display="none"; $(".gstart").textContent="▶ Play again";
          if(onFinish)onFinish(best,rounds); round=0;streak=0; return; }
        const a=57+Math.floor(Math.random()*12), b=a+(Math.random()<.5?-1:1)*(2+Math.floor(Math.random()*10));
        pair=[a,b]; MFAudio.tone(a,.5,0); MFAudio.tone(b,.5,.65);
        $(".gq").textContent=`Round ${round} of ${rounds} — listening…`;
        setTimeout(()=>{ $(".gq").textContent="Was the second sound higher or lower?"; $(".gbtns").style.display="block"; },1300);
      };
      function ans(saidHigher){
        const ok=(pair[1]>pair[0])===saidHigher;
        if(ok){streak++;best=Math.max(best,streak);$(".gq").textContent="✓ Correct!";}
        else{streak=0;$(".gq").textContent="✗ Oops — listen closely next round!";}
        $(".gs").textContent=`Streak: ${streak} · Best: ${best}`;
        $(".gbtns").style.display="none";
        $(".gstart").textContent=round>=rounds?"▶ See result":"▶ Next round";
      }
      $(".gh").onclick=()=>ans(true); $(".gl").onclick=()=>ans(false);
    },

    /* Line or Space? — random note appears, choose. spec:{rounds:10, clef:"treble"|"bass"} */
    "line-space":(el,spec,onFinish)=>{
      const rounds=spec.rounds||10, clef=spec.clef||"treble";
      const POS={ treble:{lines:[["E4",1],["G4",2],["B4",3],["D5",4],["F5",5]], spaces:[["F4",1],["A4",2],["C5",3],["E5",4]]},
                  bass:  {lines:[["G2",1],["B2",2],["D3",3],["F3",4],["A3",5]], spaces:[["A2",1],["C3",2],["E3",3],["G3",4]]} };
      const LINES=POS[clef].lines, SPACES=POS[clef].spaces;
      el.innerHTML=`<div class="game-arena">
        <button class="play gstart">▶ Start</button>
        <div class="big-q gq"></div><div class="gstaff"></div>
        <div class="gbtns" style="display:none"><button class="gline">— Line</button> <button class="gspace">◽ Space</button></div>
        <div class="streak gs"></div></div>`;
      const $=s=>el.querySelector(s);
      let round=0,score=0,streak=0,cur=null;
      function ask(){
        round++;
        if(round>rounds){ $(".gq").innerHTML=`Done! You got <b>${score}</b> of ${rounds} 🎉`;
          $(".gstaff").innerHTML=""; $(".gbtns").style.display="none";
          $(".gstart").style.display="inline-block"; $(".gstart").textContent="▶ Play again";
          if(onFinish)onFinish(score,rounds); round=0;score=0;streak=0; return; }
        const isLine=Math.random()<.5;
        cur=isLine?["line",...pick(LINES)]:["space",...pick(SPACES)];
        Staff.render($(".gstaff"),{clef,notes:[{p:cur[1],d:"q"}],width:260});
        $(".gq").textContent=`Round ${round} of ${rounds}: is this note on a LINE or in a SPACE?`;
        $(".gbtns").style.display="block";
      }
      function ans(said){
        const ok=said===cur[0];
        MFAudio.tone(MFAudio.midi(cur[1]),.4);
        if(ok){score++;streak++;$(".gq").textContent=`✓ Yes — ${cur[0]==="line"?"Line":"Space"} ${cur[2]}!`;}
        else{streak=0;$(".gq").textContent=`✗ It's ${cur[0]==="line"?"Line":"Space"} ${cur[2]} — see how it ${cur[0]==="line"?"crosses the line":"sits between lines"}?`;}
        $(".gs").textContent=`Score: ${score} · Streak: ${streak}`;
        $(".gbtns").style.display="none";
        setTimeout(ask, ok?800:1800);
      }
      $(".gline").onclick=()=>ans("line"); $(".gspace").onclick=()=>ans("space");
      $(".gstart").onclick=function(){ this.style.display="none"; round=0;score=0;streak=0; ask(); };
    },

    /* Build the Staff — tap the lines in order, bottom-up. spec:{timer:0|seconds} */
    "build-staff":(el,spec,onFinish)=>{
      const timed=spec.timer||0;
      const PITCH={1:64,2:67,3:71,4:74,5:77};
      el.innerHTML=`<div class="game-arena">
        <div class="big-q gq">${timed?`Build the staff before the timer runs out! (${timed}s)`:"Build the staff: tap the lines in order — bottom first!"}</div>
        <div class="bs-slots"></div>
        <div class="bs-pile"></div>
        <div class="streak gs"></div>
        <button class="play gstart">▶ Start building</button></div>`;
      const $=s=>el.querySelector(s);
      const slots=$(".bs-slots"), pile=$(".bs-pile");
      let placed=0,mistakes=0,left=timed,tick=null,running=false;
      function setup(){
        placed=0;mistakes=0;left=timed;running=true;
        slots.innerHTML="";
        for(let i=5;i>=1;i--){ const s=document.createElement("div"); s.className="bs-slot"; s.dataset.n=i; s.innerHTML="<span>line "+i+"</span>"; slots.appendChild(s); }
        pile.innerHTML="";
        [1,2,3,4,5].sort(()=>Math.random()-.5).forEach(n=>{
          const b=document.createElement("button"); b.className="bs-bar"; b.textContent="Line "+n; b.dataset.n=n;
          b.onclick=()=>place(b,n); pile.appendChild(b);
        });
        $(".gs").textContent=timed?`⏱ ${left}s`:"";
        if(timed){ clearInterval(tick); tick=setInterval(()=>{ left--; $(".gs").textContent=`⏱ ${left}s`;
          if(left<=0){ clearInterval(tick); running=false;
            $(".gq").textContent="⏰ Time's up! Bottom line first — try again!";
            $(".gstart").style.display="inline-block"; $(".gstart").textContent="▶ Try again"; }
        },1000); }
      }
      function place(btn,n){
        if(!running) return;
        if(n===placed+1){
          placed++; btn.disabled=true; btn.style.visibility="hidden";
          const slot=slots.querySelector(`.bs-slot[data-n="${n}"]`);
          slot.classList.add("filled"); slot.innerHTML="";
          MFAudio.tone(PITCH[n],.35);
          if(placed===5){
            running=false; clearInterval(tick);
            const stars = timed ? (left>=15?3:left>=5?2:1) : (mistakes===0?3:mistakes<=2?2:1);
            $(".gq").innerHTML=`🎉 Staff complete! You earned ${"⭐".repeat(stars)}`;
            [64,67,71,74,77].forEach((m,i)=>MFAudio.tone(m,.3,.3+i*.12));
            $(".gstart").style.display="inline-block"; $(".gstart").textContent="▶ Build again";
            if(onFinish)onFinish(stars,3);
          }
        } else {
          mistakes++;
          btn.classList.add("shake"); setTimeout(()=>btn.classList.remove("shake"),450);
          MFAudio.tone(40,.25);
          $(".gq").textContent=`Not yet — line ${placed+1} comes next (count from the BOTTOM).`;
        }
      }
      $(".gstart").onclick=function(){ this.style.display="none"; $(".gq").textContent=timed?"Go! Bottom line first!":"Tap the lines in order — bottom first!"; setup(); };
    },

    /* Key hunt — find all keys of a letter. spec:{letter?,octaves:2} */
    "key-hunt":(el,spec,onFinish)=>{
      const letter=spec.letter||pick(["C","D","E","F","G","A","B"]);
      el.innerHTML=`<div class="game-arena"><div class="big-q gq">Find every <b>${letter}</b> on the keyboard!</div>
        <div class="gkb"></div><div class="streak gs"></div></div>`;
      const $=s=>el.querySelector(s);
      const start=60, map={C:0,D:2,E:4,F:5,G:7,A:9,B:11}, targets=[];
      for(let m=start;m<=start+24;m++) if(m%12===map[letter]) targets.push(m);
      let found=[];
      Keyboard.create($(".gkb"),{start,octaves:2,onKey:m=>{
        if(targets.includes(m)&&!found.includes(m)){ found.push(m);
          $(".gs").textContent=`Found ${found.length} of ${targets.length}`;
          if(found.length===targets.length){ $(".gq").innerHTML=`✓ You found them all! Every ${letter} sits in the same spot of its black-key group. 🎉`; if(onFinish)onFinish(targets.length,targets.length); }
        } else if(!targets.includes(m)) $(".gs").textContent="Not that one — check the black-key groups!";
      }});
    },

    /* Name That Note race. spec:{pool:[{p,clef}], rounds:10, seconds:0}
       seconds>0 = answer as many as possible before time runs out */
    "note-race":(el,spec,onFinish)=>{
      const pool=spec.pool||[{p:"E4",clef:"treble"},{p:"G4",clef:"treble"},{p:"B4",clef:"treble"},{p:"D5",clef:"treble"},{p:"F5",clef:"treble"},{p:"F4",clef:"treble"},{p:"A4",clef:"treble"},{p:"C5",clef:"treble"},{p:"E5",clef:"treble"}];
      const rounds=spec.rounds||10, secs=spec.seconds||0;
      el.innerHTML=`<div class="game-arena">
        <button class="play gstart">▶ ${secs?`Start the ${secs}-second challenge`:"Start"}</button>
        <div class="big-q gq"></div><div class="gstaff"></div><div class="streak gs"></div></div>`;
      const $=s=>el.querySelector(s);
      const row=letterRow(el.querySelector(".game-arena"),ans);
      let cur=null,score=0,asked=0,streak=0,left=secs,tick=null,running=false,waiting=false;
      function ask(){
        if(!running) return;
        if(!secs&&asked>=rounds){ end(); return; }
        let nxt=pick(pool); if(cur&&pool.length>1){ let guard=0; while(nxt.p===cur.p&&guard++<8) nxt=pick(pool); }
        cur=nxt; waiting=false;
        Staff.render($(".gstaff"),{clef:cur.clef||"treble",notes:[{p:cur.p,d:"q"}],width:260});
        $(".gq").textContent=secs?`Name the note!`:`Note ${asked+1} of ${rounds}: name it!`;
      }
      function ans(l){
        if(!running||waiting) return;
        waiting=true; asked++;
        const ok=l===cur.p[0];
        MFAudio.tone(MFAudio.midi(cur.p),.4);
        if(ok){ score++; streak++; $(".gq").textContent=`✓ Yes — ${cur.p[0]}!`; }
        else { streak=0; $(".gq").textContent=`✗ It's ${cur.p[0]} — count from the bottom!`; }
        $(".gs").textContent=(secs?`⏱ ${left}s · `:"")+`Score: ${score} · Streak: ${streak}`;
        setTimeout(ask, ok?550:1500);
      }
      function end(){
        running=false; clearInterval(tick); row.style.display="none"; $(".gstaff").innerHTML="";
        $(".gq").innerHTML=secs?`⏰ Time! You named <b>${score}</b> notes correctly 🎉`:`Done! <b>${score}</b> of ${rounds} 🎉`;
        $(".gstart").style.display="inline-block"; $(".gstart").textContent="▶ Play again";
        if(onFinish)onFinish(score,secs||rounds);
      }
      $(".gstart").onclick=function(){
        this.style.display="none"; score=0;asked=0;streak=0;left=secs;running=true; row.style.display="block";
        $(".gs").textContent=secs?`⏱ ${left}s`:"";
        if(secs){ clearInterval(tick); tick=setInterval(()=>{ left--;
          $(".gs").textContent=`⏱ ${left}s · Score: ${score} · Streak: ${streak}`;
          if(left<=0) end(); },1000); }
        ask();
      };
    },

    /* Musical Alphabet Race — tap A…G in order. spec:{timer:0|seconds} */
    "alphabet-order":(el,spec,onFinish)=>{
      const timed=spec.timer||0;
      const MIDI={A:57,B:59,C:60,D:62,E:64,F:65,G:67};
      el.innerHTML=`<div class="game-arena">
        <div class="big-q gq">${timed?`Arrange the musical alphabet before ${timed} seconds run out!`:"Tap the 7 letters in musical-alphabet order — A first!"}</div>
        <div class="gslots" style="min-height:40px;font-size:1.4rem;font-weight:700;letter-spacing:8px;margin:10px 0"></div>
        <div class="gbtns gpile" style="display:block"></div>
        <div class="streak gs"></div>
        <button class="play gstart">▶ Start</button></div>`;
      const $=s=>el.querySelector(s);
      let next=0,mistakes=0,left=timed,tick=null,running=false;
      function setup(){
        next=0;mistakes=0;left=timed;running=true;
        $(".gslots").textContent="_ _ _ _ _ _ _";
        const pile=$(".gpile"); pile.innerHTML="";
        shuffle(LETTERS).forEach(l=>{ const b=document.createElement("button"); b.textContent=l;
          b.onclick=()=>place(b,l); pile.appendChild(b); });
        $(".gs").textContent=timed?`⏱ ${left}s`:"";
        if(timed){ clearInterval(tick); tick=setInterval(()=>{ left--; $(".gs").textContent=`⏱ ${left}s`;
          if(left<=0){ clearInterval(tick); running=false;
            $(".gq").textContent="⏰ Time's up! A-B-C-D-E-F-G — try again!";
            $(".gstart").style.display="inline-block"; $(".gstart").textContent="▶ Try again"; }
        },1000); }
      }
      function place(btn,l){
        if(!running||btn.disabled) return;
        if(l===LETTERS[next]){
          next++; btn.disabled=true; MFAudio.tone(MIDI[l],.3);
          $(".gslots").textContent=(LETTERS.slice(0,next).join(" ")+" "+"_ ".repeat(7-next)).trim();
          if(next===7){
            running=false; clearInterval(tick);
            const stars=timed?(left>=timed/2?3:left>=3?2:1):(mistakes===0?3:mistakes<=2?2:1);
            $(".gq").innerHTML=`🎉 A-B-C-D-E-F-G — and after G it starts over at A! ${"⭐".repeat(stars)}`;
            $(".gstart").style.display="inline-block"; $(".gstart").textContent="▶ Play again";
            if(onFinish)onFinish(stars,3);
          }
        } else {
          mistakes++; MFAudio.tone(40,.25);
          btn.classList.add("shake"); setTimeout(()=>btn.classList.remove("shake"),450);
          $(".gq").textContent=`Not yet — ${LETTERS[next]} comes next.`;
        }
      }
      $(".gstart").onclick=function(){ this.style.display="none"; $(".gq").textContent=timed?"Go! A first!":"Tap the letters in order — A first!"; setup(); };
    },

    /* Memory Match — staff-note cards ↔ letter cards. spec:{pool:[{p,clef}], pairs:4} */
    "memory-match":(el,spec,onFinish)=>{
      const pairs=spec.pairs||4;
      const basePool=spec.pool||[{p:"E4",clef:"treble"},{p:"G4",clef:"treble"},{p:"B4",clef:"treble"},{p:"F4",clef:"treble"},{p:"A4",clef:"treble"},{p:"C5",clef:"treble"}];
      el.innerHTML=`<div class="game-arena">
        <div class="big-q gq">Match each staff note with its letter name!</div>
        <div class="mm-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:460px;margin:12px auto"></div>
        <div class="streak gs"></div>
        <button class="play gstart">▶ Start</button></div>`;
      const $=s=>el.querySelector(s);
      const grid=$(".mm-grid");
      let first=null,lock=false,moves=0,matched=0;
      function setup(){
        first=null;lock=false;moves=0;matched=0;
        const seen=new Set(), notes=[];
        shuffle(basePool).forEach(n=>{ if(notes.length<pairs&&!seen.has(n.p[0])){ seen.add(n.p[0]); notes.push(n); } });
        const cards=[];
        notes.forEach(n=>{ cards.push({kind:"staff",note:n,letter:n.p[0]}); cards.push({kind:"letter",letter:n.p[0]}); });
        grid.innerHTML="";
        shuffle(cards).forEach(c=>{
          const b=document.createElement("button");
          b.style.cssText="min-height:86px;font-size:1.5rem;font-weight:700;border-radius:10px";
          b.textContent="?"; b._card=c;
          b.onclick=()=>flip(b); grid.appendChild(b);
        });
        $(".gs").textContent="Moves: 0";
      }
      function showFace(b){
        const c=b._card;
        if(c.kind==="letter"){ b.textContent=c.letter; }
        else { b.textContent=""; const d=document.createElement("div"); b.appendChild(d);
          Staff.render(d,{clef:c.note.clef||"treble",notes:[{p:c.note.p,d:"q"}],width:150}); }
      }
      function hideFace(b){ b.textContent="?"; }
      function flip(b){
        if(lock||b.disabled||b===first) return;
        showFace(b);
        if(!first){ first=b; return; }
        moves++; $(".gs").textContent=`Moves: ${moves}`;
        const a=first._card,c=b._card;
        if(a.letter===c.letter&&a.kind!==c.kind){
          MFAudio.tone(MFAudio.midi(a.letter+"4"),.4);
          b.disabled=true; first.disabled=true;
          b.style.borderColor="#3a9b57"; first.style.borderColor="#3a9b57";
          matched++; first=null;
          if(matched===pairs){
            const stars=moves<=pairs+1?3:moves<=pairs+3?2:1;
            $(".gq").innerHTML=`🎉 All matched in ${moves} moves! ${"⭐".repeat(stars)}`;
            $(".gstart").style.display="inline-block"; $(".gstart").textContent="▶ Play again";
            if(onFinish)onFinish(stars,3);
          }
        } else {
          lock=true; const f=first; first=null;
          setTimeout(()=>{ hideFace(b); hideFace(f); lock=false; },900);
        }
      }
      $(".gstart").onclick=function(){ this.style.display="none"; $(".gq").textContent="Find the pairs — fewest moves wins!"; setup(); };
    },

    /* Treble vs Bass Challenge — identify the clef, then the note. spec:{rounds:6} */
    "clef-note":(el,spec,onFinish)=>{
      const rounds=spec.rounds||6;
      const POOLS={ treble:["E4","G4","B4","D5","F5","F4","A4","C5","E5"],
                    bass:["G2","B2","D3","F3","A3","A2","C3","E3","G3"] };
      el.innerHTML=`<div class="game-arena">
        <button class="play gstart">▶ Start</button>
        <div class="big-q gq"></div><div class="gstaff"></div>
        <div class="gbtns gclefs" style="display:none"><button class="gt">𝄞 Treble</button> <button class="gb2">𝄢 Bass</button></div>
        <div class="streak gs"></div></div>`;
      const $=s=>el.querySelector(s);
      const row=letterRow(el.querySelector(".game-arena"),ansNote);
      let round=0,score=0,cur=null,cleanRound=true;
      function ask(){
        round++;
        if(round>rounds){ $(".gq").innerHTML=`Done! Perfect rounds: <b>${score}</b> of ${rounds} 🎉`;
          $(".gstaff").innerHTML=""; row.style.display="none"; $(".gclefs").style.display="none";
          $(".gstart").style.display="inline-block"; $(".gstart").textContent="▶ Play again";
          if(onFinish)onFinish(score,rounds); round=0;score=0; return; }
        const clef=pick(["treble","bass"]);
        cur={clef,p:pick(POOLS[clef])}; cleanRound=true;
        Staff.render($(".gstaff"),{clef,notes:[{p:cur.p,d:"q"}],width:260});
        $(".gq").textContent=`Round ${round} of ${rounds}: which CLEF is this?`;
        $(".gclefs").style.display="block"; row.style.display="none";
      }
      function ansClef(said){
        if(said===cur.clef){ $(".gq").textContent="✓ Right clef! Now — name the note:"; }
        else { cleanRound=false; $(".gq").textContent=`✗ Look again — ${cur.clef==="treble"?"the swirl marks G (treble)":"the two dots mark F (bass)"}. Now name the note:`; }
        $(".gclefs").style.display="none"; row.style.display="block";
      }
      function ansNote(l){
        const ok=l===cur.p[0];
        MFAudio.tone(MFAudio.midi(cur.p),.4);
        if(!ok) cleanRound=false;
        if(ok&&cleanRound) score++;
        $(".gq").textContent=ok?`✓ ${cur.p[0]} on the ${cur.clef} staff!`:`✗ It's ${cur.p[0]} — remember which clef you're in!`;
        $(".gs").textContent=`Perfect rounds: ${score}`;
        row.style.display="none";
        setTimeout(ask, ok?700:1700);
      }
      $(".gt").onclick=()=>ansClef("treble"); $(".gb2").onclick=()=>ansClef("bass");
      $(".gstart").onclick=function(){ this.style.display="none"; round=0;score=0; ask(); };
    },

    /* Find Middle C — click the Middle C among several notes on the grand staff. spec:{rounds:5} */
    "find-c":(el,spec,onFinish)=>{
      const rounds=spec.rounds||5;
      const DISTR=[{p:"B3",clef:"treble"},{p:"D4",clef:"treble"},{p:"E4",clef:"treble"},{p:"G4",clef:"treble"},
                   {p:"A3",clef:"bass"},{p:"G3",clef:"bass"},{p:"E3",clef:"bass"},{p:"B2",clef:"bass"},{p:"D3",clef:"bass"}];
      el.innerHTML=`<div class="game-arena">
        <button class="play gstart">▶ Start</button>
        <div class="big-q gq"></div><div class="gstaff"></div><div class="streak gs"></div></div>`;
      const $=s=>el.querySelector(s);
      let round=0,score=0,answered=false;
      function ask(){
        round++;
        if(round>rounds){ $(".gq").innerHTML=`Done! You spotted Middle C <b>${score}</b> of ${rounds} times 🎉`;
          $(".gstaff").innerHTML="";
          $(".gstart").style.display="inline-block"; $(".gstart").textContent="▶ Play again";
          if(onFinish)onFinish(score,rounds); round=0;score=0; return; }
        answered=false;
        const notes=shuffle([{p:"C4",clef:pick(["treble","bass"])},...shuffle(DISTR).slice(0,3)]);
        Staff.render($(".gstaff"),{clef:"grand",notes:notes.map(n=>({p:n.p,d:"q",clef:n.clef})),clickNotes:true,width:420,
          onNote:(i,p)=>{
            if(answered) return; answered=true;
            MFAudio.tone(MFAudio.midi(p),.5);
            if(p==="C4"){ score++; $(".gq").textContent="✓ That's Middle C — on its own little ledger line between the staffs!"; }
            else $(".gq").textContent=`✗ That one is ${p[0]} — Middle C sits on a short ledger line between the two staffs.`;
            $(".gs").textContent=`Score: ${score}`;
            setTimeout(ask, p==="C4"?800:1800);
          }});
        $(".gq").textContent=`Round ${round} of ${rounds}: click MIDDLE C!`;
      }
      $(".gstart").onclick=function(){ this.style.display="none"; round=0;score=0; ask(); };
    },

    /* Ledger-line counting — how many ledger lines does this note use? spec:{rounds:8, pool} */
    "ledger-count":(el,spec,onFinish)=>{
      const rounds=spec.rounds||8;
      const pool=spec.pool||[
        {p:"E4",clef:"treble",n:0},{p:"G5",clef:"treble",n:0},{p:"C4",clef:"treble",n:1},
        {p:"A5",clef:"treble",n:1},{p:"C6",clef:"treble",n:2},{p:"E6",clef:"treble",n:3},
        {p:"C3",clef:"bass",n:0},{p:"E2",clef:"bass",n:1},{p:"C2",clef:"bass",n:2},{p:"A1",clef:"bass",n:3}];
      el.innerHTML=`<div class="game-arena">
        <button class="play gstart">▶ Start</button>
        <div class="big-q gq"></div><div class="gstaff"></div>
        <div class="gbtns gnums" style="display:none"><button>0</button><button>1</button><button>2</button><button>3</button></div>
        <div class="streak gs"></div></div>`;
      const $=s=>el.querySelector(s);
      let round=0,score=0,cur=null;
      [...el.querySelectorAll(".gnums button")].forEach((b,i)=>b.onclick=()=>ans(i));
      function ask(){
        round++;
        if(round>rounds){ $(".gq").innerHTML=`Done! <b>${score}</b> of ${rounds} 🎉`;
          $(".gstaff").innerHTML=""; $(".gnums").style.display="none";
          $(".gstart").style.display="inline-block"; $(".gstart").textContent="▶ Play again";
          if(onFinish)onFinish(score,rounds); round=0;score=0; return; }
        let nxt=pick(pool); if(cur&&pool.length>1){ let g=0; while(nxt.p===cur.p&&g++<8) nxt=pick(pool); }
        cur=nxt;
        Staff.render($(".gstaff"),{clef:cur.clef,notes:[{p:cur.p,d:"q"}],width:260});
        $(".gq").textContent=`Round ${round} of ${rounds}: how many LEDGER lines does this note use?`;
        $(".gnums").style.display="block";
      }
      function ans(i){
        const ok=i===cur.n;
        MFAudio.tone(MFAudio.midi(cur.p),.4);
        if(ok){ score++; $(".gq").textContent=`✓ Yes — ${cur.n===0?"it fits on the staff, no ledger lines needed":cur.n+" ledger line"+(cur.n>1?"s":"")}!`; }
        else $(".gq").textContent=`✗ Count the short extra lines: ${cur.n}.`;
        $(".gs").textContent=`Score: ${score}`;
        $(".gnums").style.display="none";
        setTimeout(ask, ok?800:1800);
      }
      $(".gstart").onclick=function(){ this.style.display="none"; round=0;score=0; ask(); };
    },

    /* High or Low? — above the treble staff or below the bass staff. spec:{rounds:8} */
    "high-low-staff":(el,spec,onFinish)=>{
      const rounds=spec.rounds||8;
      const HIGH=["A5","B5","C6","D6","E6"], LOW=["E2","D2","C2","B1","A1"];
      el.innerHTML=`<div class="game-arena">
        <button class="play gstart">▶ Start</button>
        <div class="big-q gq"></div><div class="gstaff"></div>
        <div class="gbtns" style="display:none"><button class="gh2">⬆ Above the treble staff</button> <button class="gl2">⬇ Below the bass staff</button></div>
        <div class="streak gs"></div></div>`;
      const $=s=>el.querySelector(s);
      let round=0,score=0,cur=null;
      function ask(){
        round++;
        if(round>rounds){ $(".gq").innerHTML=`Done! <b>${score}</b> of ${rounds} 🎉`;
          $(".gstaff").innerHTML=""; $(".gbtns").style.display="none";
          $(".gstart").style.display="inline-block"; $(".gstart").textContent="▶ Play again";
          if(onFinish)onFinish(score,rounds); round=0;score=0; return; }
        const isHigh=Math.random()<.5;
        cur={p:pick(isHigh?HIGH:LOW), high:isHigh};
        Staff.render($(".gstaff"),{clef:"grand",notes:[{p:cur.p,d:"q",clef:isHigh?"treble":"bass"}],width:300});
        MFAudio.tone(MFAudio.midi(cur.p),.5);
        $(".gq").textContent=`Round ${round} of ${rounds}: where does this note live?`;
        $(".gbtns").style.display="block";
      }
      function ans(saidHigh){
        const ok=saidHigh===cur.high;
        if(ok){ score++; $(".gq").textContent=`✓ Yes — ${cur.high?"climbing above the treble staff":"digging below the bass staff"}!`; }
        else $(".gq").textContent=`✗ Listen and look again — it's ${cur.high?"ABOVE the treble staff":"BELOW the bass staff"}.`;
        $(".gs").textContent=`Score: ${score}`;
        $(".gbtns").style.display="none";
        setTimeout(ask, ok?800:1800);
      }
      $(".gh2").onclick=()=>ans(true); $(".gl2").onclick=()=>ans(false);
      $(".gstart").onclick=function(){ this.style.display="none"; round=0;score=0; ask(); };
    },

    /* Complete the Pattern — fill the missing letter in an alphabet run. spec:{rounds:6} */
    "pattern-fill":(el,spec,onFinish)=>{
      const rounds=spec.rounds||6;
      el.innerHTML=`<div class="game-arena">
        <button class="play gstart">▶ Start</button>
        <div class="big-q gq"></div>
        <div class="gslots" style="font-size:1.6rem;font-weight:700;letter-spacing:10px;margin:10px 0"></div>
        <div class="streak gs"></div></div>`;
      const $=s=>el.querySelector(s);
      const row=letterRow(el.querySelector(".game-arena"),ans);
      let round=0,score=0,answer=null;
      function ask(){
        round++;
        if(round>rounds){ $(".gq").innerHTML=`Done! <b>${score}</b> of ${rounds} — the alphabet never changes 🎉`;
          $(".gslots").textContent=""; row.style.display="none";
          $(".gstart").style.display="inline-block"; $(".gstart").textContent="▶ Play again";
          if(onFinish)onFinish(score,rounds); round=0;score=0; return; }
        const start=Math.floor(Math.random()*7), seq=[];
        for(let i=0;i<4;i++) seq.push(LETTERS[(start+i)%7]);
        const blank=1+Math.floor(Math.random()*3);
        answer=seq[blank];
        $(".gslots").textContent=seq.map((l,i)=>i===blank?"?":l).join(" ");
        $(".gq").textContent=`Round ${round} of ${rounds}: which letter is missing? (after G comes A)`;
        row.style.display="block";
      }
      function ans(l){
        const ok=l===answer;
        if(ok){ score++; MFAudio.tone(MFAudio.midi((l==="A"||l==="B")?l+"3":l+"4"),.35); $(".gq").textContent="✓ The pattern continues perfectly!"; }
        else { MFAudio.tone(40,.25); $(".gq").textContent=`✗ It's ${answer} — say the alphabet from the letter before the blank.`; }
        $(".gs").textContent=`Score: ${score}`;
        row.style.display="none";
        setTimeout(ask, ok?700:1800);
      }
      $(".gstart").onclick=function(){ this.style.display="none"; round=0;score=0; ask(); };
    }
  };
  function mount(el,opts){
    opts=opts||{};
    if(!registry[opts.type]){ el.innerHTML="<p>Game unavailable.</p>"; return; }
    registry[opts.type](el,opts.spec||{},opts.onFinish);
  }
  function has(type){ return !!registry[type]; }
  return {mount,has};
})();
