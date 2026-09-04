// ===== Reviews page: Google reviews grid + randomised "5.0 stories" stage =====
// Source: Google Business Profile "Hilltop English School", Nanglae, Chiang Rai — 5.0 · 15 reviews (checked 4 Sep 2026).
// To add a review: append an object below. `rating` renders honestly (a 4-star review shows ★★★★☆).
// `th`/`en` are the review text; `orig` says which language the reviewer wrote in (the other is a translation).
(function(){
  const GOOGLE=[
    {name:'Yves Adjavon',date:'2026-08',rating:5,orig:'th',
      th:'ถ้ากำลังหาโรงเรียนสอนภาษา ที่มีครูสอนเป็นเจ้าของภาษา ในราคาที่สมเหตุสมผลแลกกับพัฒนาการที่ดีขึ้นของลูกในการพูดภาษาอังกฤษ บรรยากาศอบอุ่น อยากแนะนำที่นี่เลยค่ะ💕 ทีชเชอร์ใจดี สนุกสนาน และเป็นกันเอง ทำให้เด็กๆไม่กลัวที่จะพูดคุยและสื่อสาร เพื่อนๆร่วมชั้นก็น่ารัก และต้อนรับเพื่อนที่มาใหม่ได้ดีมากๆ พี่เฟิร์นที่คอยดูแลเด็กๆระหว่างรอเข้าคลาสเรียนก็ดูแลเด็กๆดีมากๆ คอยสอนเด็กๆในเรื่องที่เด็กๆสงสัยหรือไม่เข้าใจได้ดี ใจเย็น และเป็นกันเอง ในทุกๆเดือนโรงเรียนจะจัดอีเว้นท์ ให้เด็กๆชวนผู้ปกครองมาทำกิจกรรมร่วมกัน ซึ่งเด็กๆจะชอบและตื่นเต้นมาก เพราะได้ทำกิจกรรมร่วมกันกับที่บ้าน บางคนพาพ่อแม่มา บางคนพาปู่ย่าตายายมา เป็นภาพที่น่ารักมาก ทางโรงเรียนใส่ใจในรายละเอียดเล็กๆน้อยๆดีมากค่ะ',
      en:'If you\'re looking for a language school with native English-speaking teachers at a reasonable price, offering great value for your child\'s improved English speaking skills in a warm and welcoming atmosphere, I highly recommend this place! 💕 The teachers are kind, fun and friendly, so the children feel comfortable speaking and communicating. The classmates are lovely and very welcoming to new students. Fern, who looks after the children while they wait for class, is very attentive and patiently explains anything the children don\'t understand. Every month the school organises events where children invite their parents to join activities together. The children love it — some bring their parents, others their grandparents. It\'s a very sweet sight. The school pays great attention to even the smallest details.'},
    {name:'Vivo Vivo',date:'2026-08',rating:5,orig:'th',
      th:'ครั้งแรกที่รู้จักกับ รร.สอนภาษาฮิลท็อปคือมีหลานๆเรียนอยู่แล้ว เลยอยากให้ลูกชายได้เรียน ครั้งแรกคือไม่ได้หวังอะไรเลย แค่อยากให้ลูกชายเข้าสังคมได้ เรียนรู้วัฒนธรรมชาวต่างชาติและพูด อ่านออกเขียนได้บ้าง เป็นความรู้ติดตัวไว้บ้างก็ยังดี แต่เกินคาดค่ะ ลูกชอบเรียนสไตล์นี้ เรียนแบบฝรั่ง มีกิจกรรมให้เด็กไปทำ พร้อมกับเรียนรู้เรื่องภาษาและไวยากรณ์ไปด้วย ลูกชายชอบมาก จากที่ไม่รู้อะไรเลยตอนนี้พูดได้ สำเนียงเป็น และสามารถพูดตอบโต้ แล้วเขียนเป็นประโยค และเข้าแข่งขันเล่านิทานภาษาอังกฤษได้ชนะเลิศ ภูมิใจมากค่ะ ที่นี่สอนดีมากๆค่า',
      en:'I first heard of Hilltop when my nieces and nephews were already studying there, so I wanted my son to learn too. At first I had no expectations — I just wanted him to socialise, learn about other cultures and speak, read and write a little. But it exceeded my expectations! He loves this Western style of learning, with activities for the children alongside language and grammar. From knowing nothing, he now speaks with a good accent, holds conversations and writes full sentences. He even won first place in an English storytelling competition! I\'m so proud. The teaching here is excellent.'},
    {name:'Orawan Kiki',date:'2026-08',rating:5,orig:'th',
      th:'ลูกสาวเรียนที่นี่ตั้งแต่อายุ 4 ปี จากที่น้องเป็นคนขี้อาย พอน้องได้มาเรียนจนตอนนี้น้องอายุ 8 ปีแล้ว น้องกล้าแสดงออก กล้าพูด กล้าตอบคำถาม น้องเรียนรู้ได้ไวมากๆ teacher ก็น่ารัก สอนได้ดีมากๆ มีกิจกรรมให้เด็กๆทำบ่อยให้เด็กๆได้เรียนรู้รอบด้านค่ะ',
      en:'My daughter has studied here since she was 4. She used to be shy, but now at 8 she is confident, outgoing and happy to speak up and answer questions. She learns very quickly. The teachers are lovely and teach very well, with frequent activities so the children learn in a well-rounded way.'},
    {name:'Kotchaphan Khumwang',date:'2026-08',rating:5,orig:'th',
      th:'โรงเรียนสอนภาษาที่มีคุณภาพมากค่ะ คุณครูสอนเข้าใจง่าย และมีกิจกรรมที่น่าสนใจให้ร่วมสนุกเยอะมาก ทำให้บรรยากาศการเรียนไม่น่าเบื่อและได้ฝึกใช้ภาษาจริงค่ะ',
      en:'A very high-quality language school. The teachers explain things clearly and there are lots of interesting, fun activities, so lessons are never boring and the children practise real-life English.'},
    {name:'เนตร์นภา',date:'2026-08',rating:5,orig:'th',
      th:'ลูกๆเรียนที่นี่ทั้งสองคนเลยค่ะ การสอนดีมาก มีคุณครูต่างชาติเป็นผู้สอน มีกิจกรรมหลากหลาย ลูกพูดภาษาอังกฤษได้ดีเลยค่ะ ราคาไม่แพงเลย',
      en:'Both of my children study here. The teaching is excellent, with foreign teachers and a variety of activities. My children speak English very well, and the price is very affordable.'},
    {name:'จรัส แสนละมูล',date:'2026-08',rating:5,orig:'th',student:true,
      th:'คุณครูสอนดีมากครับ ตอนผมมาวันแรกคือยังท่อง A B C ไม่ได้เลยครับ แต่ตอนนี้ดีขึ้นกว่าเดิมมากๆครับ',
      en:'The teachers are excellent. On my first day I couldn\'t even recite the ABCs — now I\'m so much better.'},
    {name:'Carol Starbuck',date:'2026-06',rating:5,orig:'en',
      th:'ทีมครูเอาใจใส่และมีคุณวุฒิ หลักสูตรดี บรรยากาศสนับสนุนและเป็นบวก ผลลัพธ์ประสบความสำเร็จ',
      en:'Caring and qualified staff; good curriculum; supportive and positive environment; successful outcomes.'},
    {name:'จินดา ศิริตา',date:'2025',rating:5,orig:'th',
      th:'ที่นี่เป็นจุดเริ่มต้นที่ทำให้ลูกชอบภาษาอังกฤษ เรียนแล้วสนุกและมีความสุข ครูสอนเป็นเจ้าของภาษาที่มีคุณภาพและน่ารัก',
      en:'This is the starting point that made my child love English. Learning is fun and joyful, and the teachers are qualified, lovely native speakers.'},
    {name:'Manusnun Senapa',date:'2024',rating:5,orig:'th',
      th:'ครูรักเด็ก สอดแทรกความรู้ผ่านกิจกรรมต่างๆ ทำให้เด็กมีความสุขกับการเรียนและเล่นกันอย่างสนุกสนานค่ะ',
      en:'The teachers love the children and weave knowledge into every activity, so the kids are happy learning and playing together.'},
    {name:'อรัญญา เตชะสาย',date:'2021',rating:5,orig:'th',tags:true,
      th:'ให้คะแนนด้านการสื่อสาร คุณภาพ ความเป็นมืออาชีพ และความคุ้มค่า',
      en:'Rated positively for communication, quality, professionalism and value.'},
    // Star-only ratings (no written text)
    {name:'ฤทัยชนก นาดา',date:'2025',rating:5},
    {name:'อภิญญา ปารมีวิศิษฏ์',date:'2025',rating:5},
    {name:'Panipak Panipak',date:'2025',rating:5},
    {name:'Miss Lazy',date:'2023',rating:5},
    {name:'Di_End sai',date:'2021',rating:5}
  ];

  const L=()=>document.documentElement.lang==='en'?'en':'th';
  const TH_M=['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'],EN_M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function when(d){const [y,m]=d.split('-');return {th:(m?TH_M[+m-1]+' ':'')+(+y+543),en:(m?EN_M[+m-1]+' ':'')+y}}
  function stars(n){return '★'.repeat(n)+'☆'.repeat(5-n)}
  const PAL=['a1','a2','a3','a4','a5'];
  function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}

  // ---- summary ----
  const avg=GOOGLE.reduce((a,r)=>a+r.rating,0)/GOOGLE.length;
  const num=document.getElementById('grevNum');if(num)num.textContent=avg.toFixed(1);
  const cnt=document.getElementById('grevCount');if(cnt)cnt.textContent=GOOGLE.length;
  const st=document.getElementById('grevStars');if(st)st.textContent=stars(Math.round(avg));

  // ---- written reviews grid ----
  const grid=document.getElementById('grevGrid');
  const written=GOOGLE.filter(r=>r.th),starOnly=GOOGLE.filter(r=>!r.th);
  if(grid){
    grid.innerHTML=written.map((r,i)=>{const w=when(r.date),l=L();
      const role=r.student?{th:'นักเรียน',en:'Student'}:{th:'ผู้ปกครอง',en:'Parent'};
      const note=r.orig==='en'?{th:' · แปลจากภาษาอังกฤษ',en:''}:{th:'',en:' · translated from Thai'};
      return `<article class="quote grev rv${r.th.length>260?' wide':''}" style="--d:${(i%3)*.12}s">
        <div class="grev-top"><div class="stars" aria-label="${r.rating} of 5">${stars(r.rating)}</div><span class="gbadge" title="Google review"><b>G</b> Google</span></div>
        <p data-th="${esc('“'+r.th+'”')}" data-en="${esc('“'+r.en+'”')}">“${l==='en'?r.en:r.th}”</p>
        <div class="who"><div class="avatar ${PAL[i%PAL.length]}">${esc(r.name.charAt(0))}</div><div><b>${esc(r.name)}</b><span><span data-th="${role.th}" data-en="${role.en}">${role[l]}</span> · <span data-th="${w.th}" data-en="${w.en}">${w[l]}</span><em data-th="${note.th}" data-en="${note.en}">${note[l]}</em></span></div></div>
      </article>`}).join('');
    grid.querySelectorAll('.rv').forEach(el=>{if(typeof io!=='undefined')io.observe(el);else el.classList.add('in')});
  }
  const more=document.getElementById('grevMore');
  if(more&&starOnly.length){const l=L();
    more.innerHTML=`<div class="grev-more-in"><div class="grev-faces">${starOnly.map((r,i)=>`<span class="avatar ${PAL[(i+2)%PAL.length]}" title="${esc(r.name)} · ${stars(r.rating)}">${esc(r.name.charAt(0))}</span>`).join('')}</div>
      <p><b data-th="อีก ${starOnly.length} ครอบครัว" data-en="${starOnly.length} more families">${l==='en'?starOnly.length+' more families':'อีก '+starOnly.length+' ครอบครัว'}</b> <span data-th="ให้ 5 ดาวบน Google โดยไม่เขียนข้อความ — ขอบคุณทุกท่านค่ะ" data-en="gave us five stars on Google without a note — thank you, every one of you.">${l==='en'?'gave us five stars on Google without a note — thank you, every one of you.':'ให้ 5 ดาวบน Google โดยไม่เขียนข้อความ — ขอบคุณทุกท่านค่ะ'}</span> <span class="stars">${stars(5)}</span></p></div>`;
  }

  // ---- 5.0 stories stage ----
  const SLIDES=[
    {theme:'kids',img:'assets/img/awards.jpg',
      label:{th:'เด็ก ๆ กำลังเติบโต',en:'Kids excelling'},
      head:{th:'จากยังไม่รู้อะไรเลย สู่แชมป์เล่านิทานภาษาอังกฤษ',en:'From not a word of English to first place in storytelling'},
      quote:{th:'จากที่ไม่รู้อะไรเลย ตอนนี้พูดได้ สำเนียงเป็น เขียนเป็นประโยค และเข้าแข่งขันเล่านิทานภาษาอังกฤษได้ชนะเลิศ ภูมิใจมากค่ะ',en:'From knowing nothing, he now speaks with a good accent, writes full sentences — and won first place in an English storytelling competition. I\'m so proud.'},
      who:{th:'คุณแม่ · รีวิว Google',en:'A mum · Google review'},badge:{th:'ชนะเลิศ 🏆',en:'1st place 🏆'}},
    {theme:'kids',img:'assets/img/orig_09.jpg',
      label:{th:'เด็ก ๆ กำลังเติบโต',en:'Kids excelling'},
      head:{th:'เริ่มตอน 4 ขวบด้วยความขี้อาย ตอนนี้ 8 ขวบ กล้าพูด กล้าตอบ',en:'Shy at four. At eight, first hand in the air.'},
      quote:{th:'จากที่น้องเป็นคนขี้อาย ตอนนี้น้องกล้าแสดงออก กล้าพูด กล้าตอบคำถาม น้องเรียนรู้ได้ไวมาก ๆ',en:'She used to be shy. Now she is confident, outgoing and happy to speak up and answer questions. She learns so quickly.'},
      who:{th:'คุณแม่ของนักเรียนอายุ 8 ขวบ · รีวิว Google',en:'Mother of an 8-year-old · Google review'},badge:{th:'4 ปีกับเรา',en:'4 years with us'}},
    {theme:'parents',img:'assets/img/orig_12.jpg',
      label:{th:'ผู้ปกครองอิ่มใจ',en:'Parents fulfilled'},
      head:{th:'ทุกเดือน เด็ก ๆ ชวนพ่อแม่ ปู่ย่าตายาย มาเรียนรู้ด้วยกัน',en:'Every month the children invite mum, dad and grandparents in'},
      quote:{th:'บางคนพาพ่อแม่มา บางคนพาปู่ย่าตายายมา เป็นภาพที่น่ารักมาก ทางโรงเรียนใส่ใจในรายละเอียดเล็ก ๆ น้อย ๆ ดีมากค่ะ',en:'Some bring their parents, others their grandparents — it\'s a very sweet sight. The school pays attention to even the smallest details.'},
      who:{th:'ผู้ปกครอง · รีวิว Google',en:'A parent · Google review'},badge:{th:'กิจกรรมครอบครัวทุกเดือน',en:'Family events monthly'}},
    {theme:'parents',img:'assets/img/parents-1.jpg',
      label:{th:'ผู้ปกครองอิ่มใจ',en:'Parents fulfilled'},
      head:{th:'ภาษาอังกฤษนำทุกวิชา และสอบเข้า ม.1 English Program ได้',en:'English led every subject — and opened the door to an English Program'},
      quote:{th:'น้องอาร์มเรียนตั้งแต่ ป.2 สอบโอเน็ตได้คะแนนดีมาก ๆ ค่ะ ที่สำคัญน้องยังสอบเข้า ม.1 สาย English Program รอบโควต้าเรียนดีด้วยค่ะ',en:'Arm studied here from Grade 2 and scored very well on the O-NET. Best of all, he was admitted to an English Program middle school through the academic-excellence quota.'},
      who:{th:'คุณแม่ของน้องอาร์ม',en:'Arm\'s mother'},badge:{th:'O-NET ดีมาก',en:'Top O-NET scores'}},
    {theme:'alumni',img:'assets/img/future-2.jpg',
      label:{th:'ศิษย์เก่าส่งต่อ',en:'Alumni pass it on'},
      head:{th:'ศิษย์เก่ากลับมาเล่า: กล้าพูด ฟังคล่อง ใช้ได้จริงในชีวิต',en:'Our alumni come back to say it: braver, more fluent, English they really use'},
      quote:{th:'เรียนกับครูชาวต่างชาติทำให้กล้าพูดอังกฤษมากขึ้น พูด/ฟังได้คล่องขึ้น นำไปใช้ในชีวิตประจำวันได้จริง เรียนตั้งแต่ ป.2 ไม่มีผิดหวังเลย',en:'Lessons with foreign teachers made me braver to speak and much more fluent — English I actually use every day. I studied here from Grade 2 and was never disappointed.'},
      who:{th:'ศิษย์เก่า · เชียงราย',en:'Alumna · Chiang Rai'},badge:{th:'รุ่นสู่รุ่น',en:'Generation to generation'}},
    {theme:'alumni',img:'assets/img/orig_16.jpg',
      label:{th:'ศิษย์เก่าส่งต่อ',en:'Alumni pass it on'},
      head:{th:'หลาน ๆ เรียนก่อน แล้วชวนน้อง ๆ มาต่อ',en:'Cousins came first — then they brought the next ones'},
      quote:{th:'ครั้งแรกที่รู้จักฮิลท็อปคือมีหลาน ๆ เรียนอยู่แล้ว เลยอยากให้ลูกชายได้เรียน ผลคือเกินคาดค่ะ',en:'I first heard of Hilltop because my nieces and nephews were already here, so I wanted my son to learn too. It exceeded every expectation.'},
      who:{th:'ผู้ปกครอง · รีวิว Google',en:'A parent · Google review'},badge:{th:'บอกต่อในครอบครัว',en:'Passed on within families'}},
    {theme:'mission',img:'assets/img/orig_20.jpg',
      label:{th:'เดินหน้าต่อ',en:'Moving forward'},
      head:{th:'ตั้งแต่ปี 2014 เราคือจุดเริ่มต้นที่ทำให้เด็กรักภาษาอังกฤษ',en:'Since 2014, the starting point that makes children love English'},
      quote:{th:'ที่นี่เป็นจุดเริ่มต้นที่ทำให้ลูกชอบภาษาอังกฤษ เรียนแล้วสนุกและมีความสุข ครูสอนเป็นเจ้าของภาษาที่มีคุณภาพและน่ารัก',en:'This is the starting point that made my child love English. Learning is fun and joyful, and the teachers are qualified, lovely native speakers.'},
      who:{th:'ผู้ปกครอง · รีวิว Google',en:'A parent · Google review'},badge:{th:'5.0 · 15 รีวิว Google',en:'5.0 · 15 Google reviews'}},
    {theme:'mission',img:'assets/img/orig_17.jpg',
      label:{th:'เดินหน้าต่อ',en:'Moving forward'},
      head:{th:'ครูรักเด็ก และสอดแทรกความรู้ในทุกกิจกรรม',en:'Teachers who love the children, and lessons hidden inside every activity'},
      quote:{th:'ครูรักเด็ก สอดแทรกความรู้ผ่านกิจกรรมต่าง ๆ ทำให้เด็กมีความสุขกับการเรียนและเล่นกันอย่างสนุกสนานค่ะ',en:'The teachers love the children and weave knowledge into every activity, so the kids are happy learning and playing together.'},
      who:{th:'ผู้ปกครอง · รีวิว Google',en:'A parent · Google review'},badge:{th:'ไม่เกิน 10 คนต่อห้อง',en:'Max 10 per class'}}
  ];
  const stage=document.getElementById('storyStage');if(!stage)return;
  const order=SLIDES.map((_,i)=>i).sort(()=>Math.random()-.5);   // random order every load
  const img=document.getElementById('stImg'),badge=document.getElementById('stBadge'),theme=document.getElementById('stTheme'),head=document.getElementById('stHead'),quote=document.getElementById('stQuote'),who=document.getElementById('stWho'),dots=document.getElementById('stDots'),bar=document.getElementById('stBar');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DUR=8000;let cur=-1,timer,busy=false,paused=false;
  SLIDES.forEach(s=>{const im=new Image();im.src=s.img});
  order.forEach((_,k)=>{const b=document.createElement('button');b.className='dot';b.setAttribute('aria-label','Story '+(k+1));b.addEventListener('click',()=>go(k,true));dots.appendChild(b)});
  function fill(k){const s=SLIDES[order[k]];
    stage.dataset.theme=s.theme;img.src=s.img;img.alt='';
    [[theme,s.label],[head,s.head],[quote,s.quote],[who,s.who],[badge,s.badge]].forEach(([el,t])=>{el.dataset.th=t.th;el.dataset.en=t.en;el.textContent=t[L()]});
    dots.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('on',i===k))}
  function go(k,manual){if(busy)return;k=(k+order.length)%order.length;if(k===cur)return;busy=true;
    const dir=k>cur||(cur===order.length-1&&k===0)?1:-1;stage.dataset.dir=dir;
    if(cur<0||reduce){fill(k);stage.classList.remove('out');stage.classList.add('in');cur=k;busy=false;restart();return}
    stage.classList.remove('in');stage.classList.add('out');
    setTimeout(()=>{fill(k);cur=k;stage.classList.remove('out');void stage.offsetWidth;stage.classList.add('in');busy=false;restart()},620);
    if(manual)restart()}
  function restart(){clearInterval(timer);if(reduce)return;bar.style.transition='none';bar.style.width='0';void bar.offsetWidth;bar.style.transition=`width ${DUR}ms linear`;bar.style.width='100%';
    timer=setInterval(()=>{if(document.hidden||paused)return;go(cur+1)},DUR)}
  document.getElementById('stPrev').addEventListener('click',()=>go(cur-1,true));
  document.getElementById('stNext').addEventListener('click',()=>go(cur+1,true));
  stage.addEventListener('mouseenter',()=>{paused=true;bar.style.animationPlayState='paused'});
  stage.addEventListener('mouseleave',()=>{paused=false});
  stage.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(cur+1,true);if(e.key==='ArrowLeft')go(cur-1,true)});
  let tx=null;stage.addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});
  stage.addEventListener('touchend',e=>{if(tx===null)return;const dx=e.changedTouches[0].clientX-tx;tx=null;if(Math.abs(dx)>40)go(cur+(dx<0?1:-1),true)});
  new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!stage.dataset.live){stage.dataset.live=1;setTimeout(()=>go(0),300)}}),{threshold:.35}).observe(stage);
})();
