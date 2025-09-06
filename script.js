/********** Configuration **********/
    const RECIPIENT_NAME = 'Mamali Sahoo'; // change here to personalize
    const GIFT_LINK = '#'; // change to your portfolio URL

    /********** helper: stars **********/
    (function createStars(){
      const container = document.querySelector('.stars');
      for(let i=0;i<60;i++){
        const s = document.createElement('div');
        s.className='star';
        s.style.left = Math.random()*100+'%';
        s.style.top = Math.random()*100+'%';
        s.style.opacity = 0.2+Math.random()*0.9;
        s.style.width = s.style.height = (1+Math.random()*3)+'px';
        container.appendChild(s);
      }
    })();

    /********** typed wish **********/
    const fullText = `Happy Birthday, ${RECIPIENT_NAME}! \nI love you ❤️`;
    const typedEl = document.getElementById('typed');
    const wishText = document.getElementById('wishText');
    let i=0;
    function type(){
      if(i<fullText.length){
        let ch = fullText[i++];
        if(ch==='\n'){ typedEl.innerHTML += '<br/>'; } else {
          typedEl.innerHTML += ch;
        }
        setTimeout(type, 70 + Math.random()*60);
      } else {
        document.querySelector('.cursor').style.display='none';
        typedEl.classList.add('glow','bounce');
      }
    }
    setTimeout(type,600);

    /********** album slider **********/
    const slides = [...document.querySelectorAll('#slides img')];
    let curSlide = 0, autoAlbum;
    function showSlide(n){
      slides.forEach((s,idx)=> s.classList.toggle('active', idx===n));
      curSlide = n;
    }
    document.getElementById('prevSlide').onclick = ()=> showSlide((curSlide-1+slides.length)%slides.length);
    document.getElementById('nextSlide').onclick = ()=> showSlide((curSlide+1)%slides.length);
    function albumAuto(){ autoAlbum = setInterval(()=> showSlide((curSlide+1)%slides.length), 3500); }
    albumAuto();

    // add uploaded photos
    const photoUpload = document.getElementById('photoUpload');
    photoUpload.addEventListener('change', (e)=>{
      const files = [...e.target.files];
      files.forEach(file=>{
        const reader = new FileReader();
        reader.onload = ()=>{
          const img = document.createElement('img'); 
		  img.src = reader.result; img.alt = file.name;
          img.style.opacity=0; img.style.transform='scale(1.03)';
          document.getElementById('slides').appendChild(img);
          slides.push(img);
          // show newly added
          showSlide(slides.length-1);
        };
        reader.readAsDataURL(file);
      })
    });

    /********** WebAudio gentle chime **********/
	const bgMusic = document.getElementById("bgMusic");
	const volControl = document.getElementById("vol");

	document.getElementById("playMusic").addEventListener("click", () => {
	  bgMusic.volume = parseFloat(volControl.value);
	  bgMusic.play();
	});

	document.getElementById("stopMusic").addEventListener("click", () => {
	  bgMusic.pause();
	  bgMusic.currentTime = 0;
	});

	volControl.addEventListener("input", () => {
	  bgMusic.volume = parseFloat(volControl.value);
	});
	
	
	    /********** quotes slider **********/
    const quotes = [
      'You are my sunshine — today and always.',
      'Every day with you is my favorite day. Happy birthday.',
      'Love you more than words can say.',
      'To the woman who steals my heart — happy birthday!',
      'With you, every moment is magic.'
    ];
    let qi=0; const quoteText = document.getElementById('quoteText');
    function showQuote(n){ qi = (n+quotes.length)%quotes.length; quoteText.style.opacity=0; setTimeout(()=>{ quoteText.textContent = '"'+quotes[qi]+'"'; quoteText.style.opacity=1 },200)}
    document.getElementById('prevQuote').onclick = ()=> showQuote(qi-1);
    document.getElementById('nextQuote').onclick = ()=> showQuote(qi+1);
    setInterval(()=> showQuote(qi+1), 5500);
    showQuote(0);

    /********** balloons (create many) **********/
    function createBalloons(){
      const colors = ['#ff8a80','#ff80ab','#b388ff','#ffd180','#80d8ff','#a7ffeb'];
      for(let i=0;i<12;i++){
        const b = document.createElement('div'); b.className='balloon';
        b.style.left = (5+i*8)+'%'; b.style.background = colors[i%colors.length];
        b.style.animation = `floatUp ${12 + Math.random()*8}s linear ${(Math.random()*-10)}s infinite`;
        b.style.zIndex = 3;
        b.style.transform = `translateY(0) rotate(${(Math.random()*20-10)}deg)`;
        b.textContent = '❤';
        document.body.appendChild(b);
      }
    }
    createBalloons();

    /********** confetti canvas **********/
    const confettiCanvas = document.getElementById('confetti');
    confettiCanvas.width = innerWidth; confettiCanvas.height = innerHeight;
    window.addEventListener('resize', ()=>{ confettiCanvas.width = innerWidth; confettiCanvas.height = innerHeight; });
    const ctx = confettiCanvas.getContext('2d');
    let confettiPieces = [];
    function confettiBurst(x=innerWidth/2,y=innerHeight/3, count=80){
      for(let i=0;i<count;i++){
        confettiPieces.push({x,y,vx:(Math.random()-0.5)*8, vy:(Math.random()*-6)-2, r:4+Math.random()*8, color:`hsl(${Math.random()*360},80%,60%)`, rot:Math.random()*360, spin:(Math.random()-0.5)*0.2});
      }
      if(!confettiLoop) runConfetti();
    }
    let confettiLoop = null;
    function runConfetti(){
      if(confettiLoop) return;
      confettiLoop = setInterval(()=>{
        ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
        for(let i=confettiPieces.length-1;i>=0;i--){
          const p = confettiPieces[i];
          p.x += p.vx; p.vy += 0.2; p.y += p.vy; p.rot += p.spin;
          ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot);
          ctx.fillStyle = p.color; ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*0.7);
          ctx.restore();
          if(p.y>confettiCanvas.height+40 || p.x<-40 || p.x>confettiCanvas.width+40) confettiPieces.splice(i,1);
        }
        if(confettiPieces.length===0){ clearInterval(confettiLoop); confettiLoop=null; ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);}      
      }, 20);
    }

    /********** modal surprise **********/
    const modal = document.getElementById('modal');
    document.getElementById('openSurprise').addEventListener('click', ()=>{
      modal.classList.add('show'); document.getElementById('modal').removeAttribute('aria-hidden');
      confettiBurst();
    });
    document.getElementById('modalClose').addEventListener('click', ()=>{ modal.classList.remove('show'); });
    document.getElementById('modalConfetti').addEventListener('click', ()=> confettiBurst());
    // gift link:
    const openGiftLink = document.getElementById('openGiftLink'); openGiftLink.href = GIFT_LINK;
    document.getElementById('openGiftBtn').addEventListener('click', ()=>{ // quick reveal
      confettiBurst(); modal.classList.add('show'); document.getElementById('modal').removeAttribute('aria-hidden');
    });

    /********** sliding puzzle (3x3) **********/
    const puzzleEl = document.getElementById('puzzle');
    let board = [1,2,3,4,5,6,7,8,0]; // 0 is empty
    function renderPuzzle(){
      puzzleEl.innerHTML='';
      board.forEach((v,idx)=>{
        const el = document.createElement('div'); el.className='tile';
        if(v===0){ el.classList.add('empty'); el.textContent=''; } else { el.textContent=v; }
        el.addEventListener('click', ()=> tryMove(idx));
        puzzleEl.appendChild(el);
      });
    }
    function canSwap(i,j){ const xi=i%3, yi=Math.floor(i/3); const xj=j%3, yj=Math.floor(j/3); return Math.abs(xi-xj)+Math.abs(yi-yj)===1 }
    function tryMove(i){ const empty = board.indexOf(0); if(canSwap(i,empty)){ [board[i],board[empty]] = [board[empty],board[i]]; renderPuzzle(); checkWin(); } }
    function shuffleBoard(times=120){ for(let k=0;k<times;k++){ const empty = board.indexOf(0); const candidates = [];
        for(let d of [-1,1,-3,3]){ const j = empty + d; if(j>=0 && j<9 && canSwap(j,empty)) candidates.push(j); }
        const pick = candidates[Math.floor(Math.random()*candidates.length)]; if(pick!=null) [board[pick],board[empty]]=[board[empty],board[pick]];
      } renderPuzzle();
    }
    function solveBoard(){ board = [1,2,3,4,5,6,7,8,0]; renderPuzzle(); }
    function checkWin(){ if(board.join(',')==='1,2,3,4,5,6,7,8,0'){ // win
        setTimeout(()=>{ confettiBurst(innerWidth/2,innerHeight/3,120); alert('You solved it! 🎉 Click "Open Gift" to reveal more.'); },200);
      }}
    document.getElementById('shuffleBtn').addEventListener('click', ()=>shuffleBoard());
    document.getElementById('solveBtn').addEventListener('click', ()=>solveBoard());
    renderPuzzle();

    /********** puzzle win: extra confetti already triggers **********/

    /********** extra polish: small auto-play pause when hovering album **********/
    document.getElementById('slides').addEventListener('mouseenter', ()=> clearInterval(autoAlbum));
    document.getElementById('slides').addEventListener('mouseleave', ()=> albumAuto());

    // update title area after typing finished (replace after timeout)
    setTimeout(()=>{ document.title = `Happy Birthday — ${RECIPIENT_NAME}`; }, 2400);

    // prevent accidental navigation from using gift link placeholder
    if(GIFT_LINK.trim()==='#') openGiftLink.addEventListener('click', (e)=>{ e.preventDefault(); alert('Replace the GIFT_LINK constant in the HTML with your portfolio or gift URL to make this button navigate.'); });

    // accessibility: keyboard to close modal
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') modal.classList.remove('show'); });

    // small helper: expose confetti trigger globally for debugging
    window._confettiBurst = confettiBurst;
