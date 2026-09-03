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
