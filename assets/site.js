// ---- language toggle (Thai default) ----
const toggle=document.getElementById('langToggle');
function setLang(lang){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-th]').forEach(el=>{
    el.innerHTML=el.dataset[lang]||el.innerHTML;
  });
  if(toggle)toggle.querySelectorAll('span').forEach(s=>s.classList.toggle('on',s.dataset.lang===lang));
  try{localStorage.setItem('hilltop-lang',lang)}catch(e){}
}
if(toggle)toggle.addEventListener('click',()=>{
  setLang(document.documentElement.lang==='th'?'en':'th');
});
let saved='th';try{saved=localStorage.getItem('hilltop-lang')||'th'}catch(e){}
if(saved!=='th')setLang(saved);

// ---- sticky nav ----
const nav=document.getElementById('nav');
if(nav&&!nav.classList.contains('solid')){
  addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});
}

// ---- scroll reveal ----
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

// ---- playable diamond board ----
document.querySelectorAll('.dia').forEach(d=>{
  d.addEventListener('click',()=>{
    d.classList.toggle('flip');
    d.style.animationPlayState=d.classList.contains('flip')?'paused':'running';
  });
});

// ---- mobile hamburger menu (auto-injected) ----
(function(){
  const links=document.querySelector('.nav-links');
  if(!links)return;
  const burger=document.createElement('button');
  burger.className='burger';burger.setAttribute('aria-label','Menu');
  burger.innerHTML='<span></span><span></span><span></span>';
  const li=document.createElement('li');li.appendChild(burger);
  links.appendChild(li);
  const menu=document.createElement('div');
  menu.className='mobile-menu';
  document.querySelectorAll('.nav-links li.pg > a, .nav-links .nav-drop a, .nav-links a.nav-cta').forEach(a=>{
    if(a.closest('.nav-drop')&&a.getAttribute('href')==='staff.html')return;
    const c=a.cloneNode(true);if(a.closest('.nav-drop'))c.classList.add('sub');menu.appendChild(c);
  });
  document.querySelector('nav').appendChild(menu);
  burger.addEventListener('click',()=>{
    menu.classList.toggle('open');
    burger.classList.toggle('open');
  });
})();

// ---- hero slideshow ----
const slides=document.querySelectorAll('.hero-slide');
if(slides.length>1){
  const dotsBox=document.querySelector('.hero-dots');
  let cur=0,timer;
  slides.forEach((s,i)=>{
    if(dotsBox){
      const b=document.createElement('button');
      if(i===0)b.classList.add('on');
      b.addEventListener('click',()=>{go(i);restart()});
      dotsBox.appendChild(b);
    }
  });
  const dots=dotsBox?dotsBox.querySelectorAll('button'):[];
  function go(i){
    slides[cur].classList.remove('on');
    if(dots[cur])dots[cur].classList.remove('on');
    cur=i%slides.length;
    slides[cur].classList.add('on');
    if(dots[cur])dots[cur].classList.add('on');
  }
  function restart(){clearInterval(timer);timer=setInterval(()=>go(cur+1),6000)}
  restart();
}

// ---- hero: rotating mission text, synced with the slideshow ----
(function(){
  const h1=document.querySelector('.hero h1'),lede=document.querySelector('.hero p.lede');
  if(!h1||!lede)return;
  const msgs=[
    {h:{th:h1.dataset.th,en:h1.dataset.en},p:{th:lede.dataset.th,en:lede.dataset.en}},
    {h:{th:'เรียนรู้อย่างมีความสุข<br><em>ไม่มีความเครียด</em>',en:'Learning with joy, <em>never with stress</em>'},
     p:{th:'ที่ฮิลท็อป ไม่มีการท่องจำแบบน่าเบื่อ เด็ก ๆ สร้างทัศนคติที่ดีต่อภาษาอังกฤษ และตั้งตารอที่จะมาโรงเรียนทุกวัน',
        en:'No rote memorization here. Children build a positive attitude toward English and look forward to coming to school every day.'}},
    {h:{th:'ครูเจ้าของภาษา<br><em>ที่ใส่ใจทุกคน</em>',en:'Native-speaker teachers <em>who truly care</em>'},
     p:{th:'ครูชาวไทยและครูต่างชาติที่มีวุฒิการศึกษาจริง ประสบการณ์จริง และหัวใจที่ทุ่มเทให้เด็กทุกคน',
        en:'Thai and native-speaker teachers with real qualifications, real experience, and hearts devoted to every child.'}},
    {h:{th:'ห้องเรียนเล็ก<br><em>ความใส่ใจที่ยิ่งใหญ่</em>',en:'Small classes, <em>big attention</em>'},
     p:{th:'ไม่เกิน 10 คนต่อห้อง และจัดระดับตามความสามารถ ไม่ใช่ตามอายุ เพื่อให้เด็กทุกคนได้รับการดูแลอย่างแท้จริง',
        en:'No more than 10 students per class, placed by ability rather than age, so every child gets real personal attention.'}},
    {h:{th:'โอกาสที่ดี<br><em>ในราคาที่เข้าถึงได้</em>',en:'Real opportunities, <em>at a fair price</em>'},
     p:{th:'ภารกิจของเราตั้งแต่ปี 2014: ให้เด็กไทยเข้าถึงการศึกษาคุณภาพในราคาที่จับต้องได้ เพื่ออนาคตที่สดใส',
        en:'Our mission since 2014: give Thai children access to quality education at an affordable price — and a brighter future.'}}
  ];
  let i=0;
  function apply(){
    const m=msgs[i],lang=document.documentElement.lang==='en'?'en':'th';
    h1.dataset.th=m.h.th;h1.dataset.en=m.h.en;lede.dataset.th=m.p.th;lede.dataset.en=m.p.en;
    h1.innerHTML=m.h[lang];lede.innerHTML=m.p[lang];
  }
  const dots=document.querySelectorAll('.hero-dots button');
  function swap(n){
    i=n%msgs.length;
    h1.classList.add('txt-out');lede.classList.add('txt-out');
    setTimeout(()=>{apply();h1.classList.remove('txt-out');lede.classList.remove('txt-out')},600);
  }
  dots.forEach((b,n)=>b.addEventListener('click',()=>swap(n)));
  // follow the slideshow: watch which slide is active
  const slidesEl=document.querySelectorAll('.hero-slide');
  const mo=new MutationObserver(()=>{slidesEl.forEach((s,n)=>{if(s.classList.contains('on')&&n!==i)swap(n)})});
  slidesEl.forEach(s=>mo.observe(s,{attributes:true,attributeFilter:['class']}));
})();

// ---- counters (About page) ----
(function(){
  const nums=document.querySelectorAll('.daily-num[data-count]');
  if(!nums.length)return;
  const ob=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;ob.unobserve(e.target);
    const el=e.target,end=+el.dataset.count,t0=performance.now(),dur=1400;
    (function tick(t){const p=Math.min(1,(t-t0)/dur),v=Math.round(end*(1-Math.pow(1-p,3)));el.textContent=v.toLocaleString();if(p<1)requestAnimationFrame(tick)})(t0);
  }),{threshold:.5});
  nums.forEach(n=>ob.observe(n));
})();

// ---- video clips: play on hover / when visible, open full video ----
(function(){
  const clips=document.querySelectorAll('.clip video');
  if(!clips.length)return;
  const vo=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){v.play().catch(()=>{})}else v.pause()}),{threshold:.4});
  clips.forEach(v=>vo.observe(v));
  const lb=document.getElementById('lightbox'),fv=document.getElementById('fullVideo');
  function open(){lb.hidden=false;document.body.style.overflow='hidden';fv.play().catch(()=>{})}
  function close(){fv.pause();lb.hidden=true;document.body.style.overflow=''}
  document.querySelectorAll('.clip,#playFull').forEach(b=>b.addEventListener('click',open));
  lb.querySelector('.lb-close').addEventListener('click',close);
  lb.addEventListener('click',e=>{if(e.target===lb)close()});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!lb.hidden)close()});
})();

// ---- visit: random slideshow with Hilly cameos ----
(function(){
  const box=document.querySelector('.roller-box');if(!box)return;
  const imgs=[...box.querySelectorAll('.rs-img')],stage=box.querySelector('.roller-stage'),hw=box.querySelector('.hilly-visit');
  let cur=0,n=0,busy=false;
  function swap(){let k;do{k=Math.floor(Math.random()*imgs.length)}while(k===cur&&imgs.length>1);imgs[cur].classList.remove('on');cur=k;imgs[cur].classList.add('on')}
  function cameo(){
    if(!hw||!hw._hilly){swap();return}
    busy=true;stage.classList.add('dim');hw.className='hilly-wrap hilly-visit walk-in';
    setTimeout(()=>{hw.className='hilly-wrap hilly-visit stand';hw._hilly.say(()=>{
      hw.className='hilly-wrap hilly-visit walk-out';
      setTimeout(()=>{swap();stage.classList.remove('dim');hw.className='hilly-wrap hilly-visit';busy=false},1500);
    })},1700);
  }
  function tick(){if(document.hidden||busy)return;n++;if(n%3===0)cameo();else swap()}
  const io2=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!box.dataset.live){box.dataset.live=1;setInterval(tick,6000);setTimeout(cameo,2500)}})},{threshold:.4});
  io2.observe(box);
  box.addEventListener('click',()=>{if(!busy)cameo()});
})();

// ---- visit carousel caption follows the active image ----
(function(){
  const cap=document.querySelector('.rs-cap-text');if(!cap)return;
  let busy=false;
  function upd(){
    if(busy)return;
    const on=document.querySelector('.rs-img.on');if(!on)return;
    const t=document.documentElement.lang==='en'?on.dataset.capEn:on.dataset.capTh;
    if(!t||cap.textContent===t)return;
    busy=true;cap.classList.add('fade');
    setTimeout(()=>{cap.textContent=t;cap.classList.remove('fade');busy=false},400);
  }
  const mo=new MutationObserver(upd);
  document.querySelectorAll('.rs-img').forEach(img=>mo.observe(img,{attributes:true,attributeFilter:['class']}));
  document.getElementById('langToggle')?.addEventListener('click',()=>setTimeout(upd,50));upd();
})();

// ---- Hilly the sheep: reusable talking mascot ----
(function(){
  const SVG=`<svg class="hilly" viewBox="0 0 360 300" aria-label="Hilly the sheep">
  <g class="legs" fill="#2b2b2b"><rect x="150" y="206" width="20" height="70" rx="9"/><rect x="186" y="212" width="18" height="66" rx="9"/><rect x="262" y="212" width="18" height="66" rx="9"/><rect x="296" y="204" width="20" height="70" rx="9"/><rect x="146" y="266" width="28" height="16" rx="7"/><rect x="182" y="270" width="26" height="14" rx="7"/><rect x="258" y="270" width="26" height="14" rx="7"/><rect x="292" y="264" width="28" height="16" rx="7"/></g>
  <g class="wool" fill="#fff" stroke="#e3e3e3" stroke-width="2"><circle cx="333" cy="158" r="30"/><circle cx="324" cy="188" r="26"/><circle cx="298" cy="213" r="30"/><circle cx="260" cy="230" r="26"/><circle cx="215" cy="236" r="30"/><circle cx="170" cy="230" r="26"/><circle cx="132" cy="213" r="30"/><circle cx="106" cy="188" r="26"/><circle cx="97" cy="158" r="30"/><circle cx="106" cy="128" r="26"/><circle cx="132" cy="103" r="30"/><circle cx="170" cy="86" r="26"/><circle cx="215" cy="80" r="30"/><circle cx="260" cy="86" r="26"/><circle cx="298" cy="103" r="30"/><circle cx="324" cy="128" r="26"/><ellipse cx="215" cy="158" rx="118" ry="78" stroke="none"/><circle class="tail" cx="336" cy="150" r="16"/></g>
  <g class="head">
    <path class="ear-l" d="M70 118c-26-10-48-4-52 10-3 10 10 16 26 12 14-4 24-12 26-22z" fill="#b39a74"/><path d="M62 122c-14-4-28-2-30 6 6 4 18 2 30-6z" fill="#f2a6a0" opacity=".7"/>
    <path class="ear-r" d="M148 112c26-12 48-6 52 8 3 10-10 16-26 12-14-4-24-12-26-20z" fill="#b39a74"/>
    <ellipse cx="108" cy="140" rx="46" ry="50" fill="#b39a74"/>
    <g fill="#fff" stroke="#e3e3e3" stroke-width="2"><circle cx="82" cy="98" r="20"/><circle cx="108" cy="88" r="24"/><circle cx="134" cy="98" r="20"/><circle cx="108" cy="104" r="22" stroke="none"/></g>
    <g class="eyes"><circle cx="90" cy="136" r="11" fill="#fff"/><circle cx="128" cy="136" r="11" fill="#fff"/><circle cx="92" cy="137" r="5.5" fill="#1f2a25"/><circle cx="130" cy="137" r="5.5" fill="#1f2a25"/><circle cx="94" cy="135" r="1.8" fill="#fff"/><circle cx="132" cy="135" r="1.8" fill="#fff"/>
      <rect class="eye-lid" x="78" y="125" width="24" height="22" rx="11" fill="#b39a74"/><rect class="eye-lid" x="116" y="125" width="24" height="22" rx="11" fill="#b39a74"/></g>
    <g class="glasses" fill="none" stroke="#1f2a25" stroke-width="4"><circle cx="90" cy="136" r="15"/><circle cx="128" cy="136" r="15"/><path d="M105 136h8M75 132l-12-5M143 132l12-5"/></g>
    <path class="glasses-shine" d="M81 129l8-8M119 129l8-8" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0"/>
    <ellipse cx="108" cy="164" rx="10" ry="7" fill="#e2724a"/>
    <path class="mouth-closed" d="M98 176q10 8 20 0" fill="none" stroke="#1f2a25" stroke-width="3" stroke-linecap="round"/>
    <ellipse class="mouth-open" cx="108" cy="178" rx="9" ry="7" fill="#1f2a25"/>
    <circle cx="74" cy="158" r="6" fill="#f2a6a0" opacity=".6"/><circle cx="142" cy="158" r="6" fill="#f2a6a0" opacity=".6"/>
  </g>
</svg>`;
  const SCRIPTS={
    parents:[
      ['TH','สวัสดีครับคุณพ่อคุณแม่ ผมฮิลลี่ครับ 👋'],['TH','ผมรู้ว่าการเลี้ยงลูกให้เก่งสองภาษาไม่ง่ายเลย'],
      ['EN','Hi Mum, hi Dad — Hilly here.'],['EN','I know raising a bilingual child is not easy. Some days are hard.'],
      ['EN','But here is a secret from the classroom: the children who grow fastest have parents who talk with them, not just about them.'],
      ['EN','You don\'t need perfect English. You need ten minutes, a smile, and a question like "What was fun today?"'],
      ['EN','Read to them in Thai. Sing with them in English. Praise the trying, not just the right answer.'],
      ['EN','And when you are tired, that\'s okay. Tomorrow is another ten minutes.'],
      ['EN','You are your child\'s first teacher. We are honored to be the second.'],['TH','เราอยู่ข้างคุณเสมอครับ 🐑']],
    thailand:[
      ['TH','สวัสดีครับ! 👋'],['TH','ผมชื่อ ฮิลลี่ เป็นแกะประจำโรงเรียนฮิลล์ท็อปครับ'],['TH','ขอลองพูดภาษาอังกฤษให้ฟังนะครับ…'],
      ['EN','Hi! I\'m Hilly, the Hilltop sheep.'],['EN','See? I just switched to English. Easy!'],['EN','I was born on this hill in Nanglae, Chiang Rai.'],
      ['EN','Every afternoon, kids come here to play, sing and speak English.'],['EN','No stress. No boring memorizing. Just fun.'],
      ['EN','Our teachers come from Thailand, America and beyond.'],['EN','Classes are small, so every child gets a turn to talk.'],
      ['EN','English opens doors: pilots, doctors, engineers, hotel managers…'],['EN','The earlier you start, the easier it gets. Trust a sheep!'],
      ['EN','Want to see a class in action? Come visit us.'],['EN','Bye for now… '],['TH','แล้วพบกันที่ฮิลล์ท็อปนะครับ! 🐑']],
    faq:[
      ['TH','สวัสดีครับ ผมฮิลลี่เอง 👋'],['TH','มีคำถามใช่ไหมครับ? ผู้ปกครองส่วนใหญ่ก็มีเหมือนกัน'],
      ['EN','Hi, Hilly here! Got questions? Most parents do.'],['EN','This list answers the ones we hear every single week.'],
      ['EN','How old should my child be? Tap the first question.'],['EN','What if they already know some English? We test and place them, no starting over.'],
      ['EN','What does it cost? Which days? Is it hard? It\'s all right here.'],['EN','Still wondering about something? Call Teacher Mind or send us a LINE message.'],
      ['EN','Or better: come and watch a class. Seeing is believing.'],['TH','อ่านคำตอบด้านข้างได้เลยครับ แล้วมาเจอกันนะ! 🐑']]
  };
  const SCRIPTS_VISIT=[
    ['EN','Come and visit us! สวัสดีครับ!'],['EN','This is our classroom. Real kids, real English.'],['EN','Weekdays, 3:30 to 7. Just drop by! มาเลยนะครับ'],
    ['EN','Call Teacher Mind. She loves questions.'],['EN','Small classes. Big smiles. ยิ้มกว้าง ๆ'],['EN','Every child gets a turn to talk here.'],
    ['EN','See you at the top of the hill! แล้วเจอกันนะ'],['EN','Bring your child. Watch a class. No pressure.'],['EN','We speak English all afternoon. And a little Thai. นิดหน่อย']
  ];
  SCRIPTS.visit=SCRIPTS_VISIT;
  document.querySelectorAll('[data-hilly]').forEach(wrap=>{
    const script=SCRIPTS[wrap.dataset.hilly]||SCRIPTS.thailand;
    wrap.innerHTML='<div class="bubble"><span class="lang">TH</span><span class="htxt"></span><span class="cursor"></span></div><div class="ground"></div>'+SVG+'<div class="hilly-name" data-th="ฮิลลี่ · แกะน้อยแห่งฮิลล์ท็อป" data-en="Hilly · the Hilltop sheep">ฮิลลี่ · แกะน้อยแห่งฮิลล์ท็อป</div>';
    if(document.documentElement.lang==='en')wrap.querySelector('.hilly-name').textContent='Hilly · the Hilltop sheep';
    const el=wrap.querySelector('.hilly'),bub=wrap.querySelector('.bubble'),txt=wrap.querySelector('.htxt'),lang=wrap.querySelector('.lang');
    let i=0,running=false,timer;
    function type(str,done){let k=0;txt.textContent='';el.classList.add('talking');
      (function step(){if(k<=str.length){txt.textContent=str.slice(0,k++);timer=setTimeout(step,str.charCodeAt(0)>3000?55:38)}else{el.classList.remove('talking');done()}})()}
    function next(){
      if(document.hidden){timer=setTimeout(next,1500);return}
      const [l,s]=script[i];lang.textContent=l;bub.classList.add('show');
      type(s,()=>{timer=setTimeout(()=>{i=(i+1)%script.length;if(i===0){bub.classList.remove('show');timer=setTimeout(next,2500)}else next()},Math.max(1800,s.length*70))});
    }
    if(wrap.hasAttribute('data-hilly-manual')){
      let k=Math.floor(Math.random()*script.length);
      wrap._hilly={say(cb){const [l,s]=script[k];k=(k+1)%script.length;lang.textContent=l;bub.classList.add('show');type(s,()=>setTimeout(()=>{bub.classList.remove('show');cb&&cb()},Math.max(1500,s.length*55)))}};
      return;
    }
    new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!running){running=true;setTimeout(next,600)}}),{threshold:.3}).observe(el);
    el.addEventListener('click',()=>{clearTimeout(timer);el.classList.remove('talking');i=(i+1)%script.length;next()});
  });
})();

// ---- "What we teach": fresh set of floating letters every visit ----
(function(){
  const f=document.getElementById('letterField');if(!f)return;
  const pool='AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'.split('').concat(['?','!','★','✎','♪','✿','+','&']);
  const pal=[['#1e4d3b','#143528'],['#e2724a','#b85634'],['#f4a83d','#c9862a'],['#3f7d5c','#2c5a42'],['#ff5ea8','#c9407f'],['#4a90d9','#2f6fb0']];
  const small=innerWidth<640,n=small?14:26,used=[];
  for(let i=0;i<n;i++){
    const el=document.createElement('span');el.className='lt';
    el.textContent=pool[Math.floor(Math.random()*pool.length)];
    const depth=Math.random();               // 0 far … 1 near
    const size=(small?2.2:3)+depth*(small?3:6);
    const [c,sh]=pal[Math.floor(Math.random()*pal.length)];
    let x,y,tries=0;do{x=Math.random()*94;y=Math.random()*92;tries++}while(tries<20&&used.some(u=>Math.abs(u[0]-x)<9&&Math.abs(u[1]-y)<12));
    used.push([x,y]);
    el.style.cssText=`left:${x}%;top:${y}%;font-size:${size.toFixed(2)}rem;--c:${c};--s:${sh};--o:${(0.07+depth*0.11).toFixed(2)};--z:${Math.round(-260+depth*320)}px;--r:${Math.round(-28+Math.random()*56)}deg;--sc:${(0.85+Math.random()*0.35).toFixed(2)};--x:${Math.round(-40+Math.random()*80)}px;--y:${Math.round(-70+Math.random()*40)}px;--d:${(11+Math.random()*12).toFixed(1)}s;--delay:-${(Math.random()*12).toFixed(1)}s`;
    if(depth<0.3)el.classList.add('deep');
    f.appendChild(el);
  }
  // gentle parallax on pointer move (desktop only)
  if(!small&&matchMedia('(pointer:fine)').matches){
    const sec=f.closest('section');
    sec.addEventListener('pointermove',e=>{const r=sec.getBoundingClientRect(),dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5;f.style.transform=`rotateY(${dx*6}deg) rotateX(${-dy*6}deg)`},{passive:true});
    sec.addEventListener('pointerleave',()=>{f.style.transform=''});
  }
})();

// ---- classes: rotate the highlighted fact pill ----
(function(){const ps=document.querySelectorAll('.cine-pills .pill');if(!ps.length)return;let i=0;setInterval(()=>{if(document.hidden)return;ps[i].classList.remove('on');i=(i+1)%ps.length;ps[i].classList.add('on')},3200)})();

// ---- simple random slider (data-slider) ----
document.querySelectorAll('[data-slider]').forEach(sl=>{
  let imgs=[...sl.querySelectorAll('img')];const dots=sl.querySelector('.slider-dots');let cur=0;
  if(sl.hasAttribute('data-shuffle')){imgs.forEach(i=>i.classList.remove('on'));imgs.sort(()=>Math.random()-.5);imgs.forEach(i=>sl.insertBefore(i,dots));imgs[0].classList.add('on')}
  imgs.forEach((_,i)=>{const b=document.createElement('button');b.setAttribute('aria-label','Photo '+(i+1));if(!i)b.classList.add('on');b.addEventListener('click',()=>{show(i);restart()});dots.appendChild(b)});
  const bs=dots.querySelectorAll('button');
  const cap=sl.querySelector('.cap-text');
  function setCap(){if(!cap)return;const l=document.documentElement.lang==='en'?'capEn':'capTh';const t=imgs[cur].dataset[l];if(t&&cap.textContent!==t){cap.classList.add('fade');setTimeout(()=>{cap.textContent=t;cap.classList.remove('fade')},350)}}
  function show(i){imgs[cur].classList.remove('on');bs[cur].classList.remove('on');cur=i;imgs[cur].classList.add('on');bs[cur].classList.add('on');setCap()}
  setCap();document.getElementById('langToggle')?.addEventListener('click',()=>setTimeout(setCap,50));
  let t;function tick(){if(document.hidden)return;let n;do{n=Math.floor(Math.random()*imgs.length)}while(n===cur&&imgs.length>1);show(n)}
  function restart(){clearInterval(t);t=setInterval(tick,7000)}restart();
});

// ---- Why English cards: light one at a time, random pulse ----
(function(){const cards=[...document.querySelectorAll('.road-card')];if(!cards.length)return;let cur=-1;
  function lit(){if(document.hidden)return;let n;do{n=Math.floor(Math.random()*cards.length)}while(n===cur);if(cur>=0)cards[cur].classList.remove('lit');cur=n;cards[cur].classList.add('lit')}
  new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!cards[0].dataset.live){cards[0].dataset.live=1;lit();setInterval(lit,3600)}}),{threshold:.3}).observe(cards[0]);
})();

// ---- Timeline: progression animation ----
(function(){const tl=document.getElementById('growTimeline');if(!tl)return;const li=[...tl.children];let i=-1;
  function step(){if(document.hidden)return;li.forEach(l=>l.classList.remove('now'));i=(i+1)%(li.length+1);
    if(i===li.length){li.forEach(l=>l.classList.remove('done'));tl.style.setProperty('--fill','0%');i=-1;return}
    li.forEach((l,k)=>l.classList.toggle('done',k<i));li[i].classList.add('now');tl.style.setProperty('--fill',((i+.5)/li.length*100)+'%')}
  new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!tl.dataset.live){tl.dataset.live=1;step();setInterval(step,2600)}}),{threshold:.4}).observe(tl);
  li.forEach((l,k)=>l.addEventListener('click',()=>{i=k-1;step()}));
})();

// ---- home: story video lightbox ----
(function(){const b=document.getElementById('playStory'),lb=document.getElementById('storyBox');if(!b||!lb)return;const v=document.getElementById('storyVideo');
  function open(){lb.hidden=false;document.body.style.overflow='hidden';v.play().catch(()=>{})}
  function close(){v.pause();lb.hidden=true;document.body.style.overflow=''}
  b.addEventListener('click',open);lb.querySelector('.lb-close').addEventListener('click',close);lb.addEventListener('click',e=>{if(e.target===lb)close()});addEventListener('keydown',e=>{if(e.key==='Escape'&&!lb.hidden)close()});
})();

// ---- Parents page: in-pill audio players (Gemini-recorded files, browser voice fallback) ----
(function(){
  const btns=document.querySelectorAll('.audio-btn[data-audio]');if(!btns.length)return;
  let current=null;
  const fmt=s=>{s=Math.max(0,Math.round(s||0));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
  btns.forEach(btn=>{
    btn.insertAdjacentHTML('afterbegin','<span class="ap-ic" aria-hidden="true"></span>');
    btn.insertAdjacentHTML('beforeend','<span class="ap-player"><span class="ap-eq"><i></i><i></i><i></i><i></i></span><span class="ap-track"><b></b></span><span class="ap-time">0:00</span><span class="ap-replay" title="Replay">↺</span></span>');
    const bar=btn.querySelector('.ap-track b'),time=btn.querySelector('.ap-time'),replay=btn.querySelector('.ap-replay');
    let audio=null,hover=false,closeT;
    function src(){return `assets/audio/parents-${btn.dataset.audio}-${document.documentElement.lang==='en'?'en':'th'}.mp3`}
    function open(){clearTimeout(closeT);btn.classList.add('open')}
    function maybeClose(){clearTimeout(closeT);closeT=setTimeout(()=>{if(!btn.classList.contains('playing')&&!hover)btn.classList.remove('open')},900)}
    function load(){if(audio&&audio.dataset.src===src())return audio;if(audio){audio.pause()}audio=new Audio(src());audio.dataset.src=src();audio.preload='metadata';
      audio.addEventListener('timeupdate',()=>{if(audio.duration){bar.style.width=(audio.currentTime/audio.duration*100)+'%';time.textContent=fmt(audio.duration-audio.currentTime)}});
      audio.addEventListener('loadedmetadata',()=>{time.textContent=fmt(audio.duration)});
      audio.addEventListener('ended',()=>{btn.classList.remove('playing');bar.style.width='100%';time.textContent='0:00';maybeClose()});
      audio.addEventListener('pause',()=>{btn.classList.remove('playing');maybeClose()});
      audio.addEventListener('play',()=>{btn.classList.add('playing');open();if(current&&current!==audio)current.pause();current=audio});
      audio.addEventListener('error',()=>{btn.classList.remove('playing','open')});return audio}
    btn.addEventListener('click',e=>{if(e.target.closest('.ap-replay')){const a=load();a.currentTime=0;a.play().catch(()=>{});return}
      const a=load();if(a.paused){a.play().catch(()=>{})}else a.pause()});
    btn.addEventListener('mouseenter',()=>{hover=true;if(audio&&audio.currentTime>0)open()});
    btn.addEventListener('mouseleave',()=>{hover=false;maybeClose()});
    document.getElementById('langToggle')?.addEventListener('click',()=>{if(audio){audio.pause();audio=null;bar.style.width='0';time.textContent='0:00';btn.classList.remove('open')}});
  });
  addEventListener('pagehide',()=>{if(current)current.pause()});
})();

// ---- Ken Burns bands (Age 12+, Reviews): slides, rotating words / quotes, optional shuffle ----
document.querySelectorAll('.kb-band').forEach(b=>{
  let sl=[...b.querySelectorAll('.kb-slide')];const w=b.querySelectorAll('.kb-word'),q=b.querySelectorAll('.kb-q');
  if(b.hasAttribute('data-shuffle')){sl.forEach(s=>s.classList.remove('on'));sl.sort(()=>Math.random()-.5);sl[0].classList.add('on')}
  let i=0,qi=0;w[0]&&w[0].classList.add('on');
  setInterval(()=>{if(document.hidden)return;sl[i].classList.remove('on');w[i]&&w[i].classList.remove('on');i=(i+1)%sl.length;sl[i].classList.add('on');w[i]&&w[i].classList.add('on');
    if(q.length){q[qi].classList.remove('on');qi=(qi+1)%q.length;q[qi].classList.add('on')}},7000);
});

// ---- typed headings: type when scrolled into view, retype on language change ----
(function(){const hs=document.querySelectorAll('[data-typed]');if(!hs.length)return;
  function type(h){const full=h.dataset[document.documentElement.lang==='en'?'en':'th']||h.textContent;let k=0;clearTimeout(h._t);h.innerHTML='<span class="tcur"></span>';
    (function step(){h.innerHTML=full.slice(0,k)+'<span class="tcur"></span>';if(k++<full.length)h._t=setTimeout(step,full.charCodeAt(0)>3000?70:48);else setTimeout(()=>{h.innerHTML=full},1800)})()}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!e.target.dataset.done){e.target.dataset.done=1;type(e.target)}}),{threshold:.6});
  hs.forEach(h=>{h.textContent='';io.observe(h)});
  function chk(){hs.forEach(h=>{if(h.dataset.done)return;const r=h.getBoundingClientRect();if(r.top<innerHeight*.85&&r.bottom>0){h.dataset.done=1;type(h)}})}
  addEventListener('scroll',chk,{passive:true});setTimeout(chk,800);
  document.getElementById('langToggle')?.addEventListener('click',()=>setTimeout(()=>hs.forEach(h=>{if(h.dataset.done)type(h)}),60));
})();

// ---- Contact: sliding + typing mottos ----
(function(){const el=document.getElementById('mottoLine');if(!el)return;
  const M=[
    ['ขยันเรียน ขยันทำ แล้ว<em>ไปให้ถึงเป้าหมาย</em>','Work hard, study hard, and <em>reach your goals.</em>'],
    ['เราดูแลให้ทุกครอบครัวมีแรงสนับสนุนที่ต้องการ <em>เพื่อไปให้ไกลกว่าเดิม</em>','We make sure every family has the support they need <em>to go further in life.</em>'],
    ['ทุกคำที่ลูกกล้าพูด <em>คือประตูอีกบานที่เปิดออก</em>','Every word your child dares to say <em>is another door opening.</em>'],
    ['เรียนแบบไม่เครียด <em>แต่ผลลัพธ์จริงจัง</em>','Stress-free learning. <em>Serious results.</em>'],
    ['เด็กที่มีความสุขในวันนี้ <em>คือผู้ใหญ่ที่มั่นใจในวันหน้า</em>','A happy child today <em>is a confident adult tomorrow.</em>'],
    ['ห้องเรียนเล็ก <em>ความฝันใหญ่</em>','Small classes. <em>Big dreams.</em>'],
    ['พ่อแม่คือครูคนแรก <em>เราภูมิใจที่ได้เป็นครูคนที่สอง</em>','Parents are the first teachers. <em>We are honored to be the second.</em>'],
    ['ภาษาอังกฤษไม่ใช่วิชา <em>แต่คือกุญแจ</em>','English is not a subject. <em>It is a key.</em>'],
    ['ทุกคนได้รับความรักและเกียรติ <em>ทุกวัน</em>','Every child treated with love and honor, <em>every day.</em>'],
    ['เริ่มวันนี้ <em>แล้วดูลูกเติบโตวันละนิด</em>','Start today, <em>and watch them grow a little every day.</em>'],
    ['จากนางแล เชียงราย <em>สู่โลกทั้งใบ</em>','From Nanglae, Chiang Rai, <em>to the whole world.</em>'],
    ['ความพยายามวันนี้ <em>คือโอกาสของวันหน้า</em>','Today\'s effort <em>is tomorrow\'s opportunity.</em>']
  ];
  const dirs=['translate(0,-70px)','translate(0,70px)','translate(-90px,0)','translate(90px,0)','translate(-70px,-50px) rotate(-4deg)','translate(70px,50px) rotate(4deg)','scale(.6)','rotateX(70deg)'];
  let i=Math.floor(Math.random()*M.length),t;
  function show(){
    if(document.hidden){t=setTimeout(show,1500);return}
    const lang=document.documentElement.lang==='en'?1:0,html=M[i][lang];
    el.classList.remove('in');el.classList.add('out');
    setTimeout(()=>{
      el.classList.remove('out');el.style.transform=dirs[Math.floor(Math.random()*dirs.length)];el.innerHTML='<span class="tcur"></span>';
      void el.offsetWidth;el.classList.add('in');
      // type the plain text, then swap in the highlighted version
      const plain=html.replace(/<\/?em>/g,'');let k=0;
      (function step(){if(k<=plain.length){el.innerHTML=plain.slice(0,k++)+'<span class="tcur"></span>';t=setTimeout(step,plain.charCodeAt(0)>3000?45:34)}
        else{el.innerHTML=html;i=(i+1)%M.length;t=setTimeout(show,3200)}})();
    },520);
  }
  new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!el.dataset.live){el.dataset.live=1;show()}}),{threshold:.3}).observe(el.closest('.motto'));
  document.getElementById('langToggle')?.addEventListener('click',()=>{if(el.dataset.live){clearTimeout(t);show()}});
})();

// ---- Our Story: on phones, move the diamond board between the first paragraph and the quote ----
(function(){const st=document.querySelector('.story');if(!st)return;const board=st.querySelector('.board'),hint=st.querySelector('.play-hint'),text=st.querySelector('.story .wrap > div:first-child'),side=st.querySelector('.story .wrap > div:last-child');if(!board||!text||!side)return;
  const firstP=text.querySelector('p'),quote=text.querySelector('blockquote');
  function place(){const mobile=innerWidth<=900;
    if(mobile&&board.parentElement!==text){text.insertBefore(board,quote||firstP.nextSibling);if(hint)text.insertBefore(hint,quote||null)}
    else if(!mobile&&board.parentElement===text){side.prepend(board);if(hint)side.appendChild(hint)}}
  place();addEventListener('resize',place);
})();

// ---- Parents: victories path + rotating highlight; "hard days" fades after a random delay ----
(function(){
  const g=document.getElementById('victGrid');
  if(g){const cards=[...g.querySelectorAll('.vict')];let k=-1;
    new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!g.dataset.live){g.dataset.live=1;g.classList.add('in');
      const step=()=>{if(document.hidden)return;if(k>=0)cards[k].classList.remove('lit');k=(k+1)%cards.length;cards[k].classList.add('lit')};setTimeout(()=>{step();setInterval(step,3800)},2200)}}),{threshold:.3}).observe(g);}
  const hard=document.querySelector('.soften .s-hard');
  if(hard){const delay=[10000,60000,120000][Math.floor(Math.random()*3)];
    const h=hard.closest('.rv');const start=()=>setTimeout(()=>{const el=document.querySelector('.soften .s-hard');if(el){el.style.transition='opacity 3s ease';el.style.opacity='0'}},delay+2500);
    if(h&&h.classList.contains('in'))start();else new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){o.disconnect();start()}}),{threshold:.3}).observe(h||hard);}
})();
