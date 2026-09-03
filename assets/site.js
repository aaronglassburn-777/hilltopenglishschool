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
  document.querySelectorAll('.nav-links li.pg a, .nav-links a.nav-cta').forEach(a=>{
    menu.appendChild(a.cloneNode(true));
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

// ---- visit: hand + roller image changer ----
(function(){
  const box=document.querySelector('.roller-box');if(!box)return;
  const imgs=[...box.querySelectorAll('.rs-img')],hand=box.querySelector('.hand');
  let cur=0,busy=false;
  function step(){
    if(busy||document.hidden)return;busy=true;
    const nxt=(cur+1)%imgs.length,a=imgs[cur],b=imgs[nxt];
    b.classList.add('next');
    hand.className='hand enter';
    setTimeout(()=>{hand.className='hand roll';b.classList.add('rolling')},700);
    setTimeout(()=>{hand.className='hand exit';a.classList.remove('on');b.classList.remove('next','rolling');b.classList.add('on');cur=nxt},2350);
    setTimeout(()=>{hand.className='hand';busy=false},3000);
  }
  const io2=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!box.dataset.live){box.dataset.live=1;setTimeout(step,1500);setInterval(step,5500)}})},{threshold:.4});
  io2.observe(box);
  box.addEventListener('click',step);
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
  function show(i){imgs[cur].classList.remove('on');bs[cur].classList.remove('on');cur=i;imgs[cur].classList.add('on');bs[cur].classList.add('on')}
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
