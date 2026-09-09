(function(){function Shim(cb){var self=this;this.els=new Set();this.check=function(){var vh=innerHeight,es=[];self.els.forEach(function(el){var r=el.getBoundingClientRect();if(r.top<vh*0.95&&r.bottom>0&&(r.width||r.height)){es.push({target:el,isIntersecting:true,boundingClientRect:r});}});if(es.length)cb(es,self);};addEventListener('scroll',this.check,{passive:true});addEventListener('resize',this.check);setInterval(this.check,600);}Shim.prototype.observe=function(el){var s=this;this.els.add(el);requestAnimationFrame(function(){s.check();});};Shim.prototype.unobserve=function(el){this.els.delete(el);};Shim.prototype.disconnect=function(){this.els.clear();};window.IntersectionObserver=Shim;})();

// ---

const reduceR=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceR){
  const so=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;so.unobserve(e.target);
    const t=+e.target.dataset.t,s=e.target.dataset.s||'',st=performance.now();
    const tick=n=>{const p=Math.min((n-st)/1200,1);e.target.textContent=Math.round(t*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(tick)};
    requestAnimationFrame(tick);
  }),{threshold:.5});
  document.querySelectorAll('.tstat .num').forEach(el=>so.observe(el));
}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rev').forEach((el,i)=>{el.style.transitionDelay=(i%3)*.08+'s';io.observe(el)});

// ---

const inner=document.getElementById('tstInner'),logos=document.getElementById('tstLogos');
const items=[...inner.querySelectorAll('.tst-item')],btns=[...logos.querySelectorAll('.tst-logo')];
const reduceT=matchMedia('(prefers-reduced-motion: reduce)').matches;
function render(i){
  items.forEach((el,j)=>el.classList.toggle('on',j===i));
  btns.forEach((b,j)=>{b.classList.toggle('on',j===i);b.setAttribute('aria-selected',j===i)});
}
function show(i){
  if(reduceT){render(i);return}
  inner.classList.add('out');
  setTimeout(()=>{render(i);inner.classList.remove('out')},280);
}
btns.forEach((b,i)=>b.addEventListener('click',()=>{idx=i;show(i);restart()}));
let idx=0,timer=null;
function nextT(){idx=(idx+1)%items.length;show(idx)}
function restart(){clearInterval(timer);if(!reduceT)timer=setInterval(nextT,15000)}
const tstBox=document.querySelector('.tst');
[tstBox,logos].forEach(el=>{el.addEventListener('mouseenter',()=>clearInterval(timer));el.addEventListener('mouseleave',restart)});
restart();

// ---

(function(){
const ns="http://www.w3.org/2000/svg";
/* rajzolt aláhúzások a kiemeléseken */
document.querySelectorAll('.mark').forEach(el=>{
  el.classList.add('marks');
  const s=document.createElementNS(ns,'svg');
  s.setAttribute('viewBox','0 0 200 20');s.setAttribute('preserveAspectRatio','none');
  s.setAttribute('filter','url(#skrough2)');s.setAttribute('aria-hidden','true');
  const p=document.createElementNS(ns,'path');
  p.setAttribute('d','M4,12 C50,7 120,15 196,9');p.setAttribute('pathLength','300');
  p.setAttribute('stroke-dasharray','300');p.setAttribute('stroke-dashoffset','300');
  s.appendChild(p);el.appendChild(s);
});
/* megrajzolódás görgetéskor */
const dio=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  e.target.querySelectorAll('rect,path').forEach(x=>x.style.strokeDashoffset='0');
  dio.unobserve(e.target);
}),{threshold:.35});
document.querySelectorAll('.marks>svg').forEach(s=>dio.observe(s));
})();

// ---

(function(){
const b=document.querySelector('.menu-btn');if(!b)return;
const close=()=>{document.body.classList.remove('mopen');b.setAttribute('aria-expanded','false');document.getElementById('mmenu').setAttribute('aria-hidden','true')};
b.addEventListener('click',()=>{const o=document.body.classList.toggle('mopen');b.setAttribute('aria-expanded',o);document.getElementById('mmenu').setAttribute('aria-hidden',!o)});
document.querySelectorAll('.mmenu a').forEach(a=>a.addEventListener('click',close));
addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();

// ---

/* Logó-hover → a partnerlistában kiemeli az adott cég nevét */
(function(){
  var flow=document.querySelector('.lg-flow'); if(!flow) return;
  var names=[].slice.call(document.querySelectorAll('.partner-list .pn'));
  function set(slug,on){names.forEach(function(n){if(n.dataset.p===slug)n.classList.toggle('on',on)})}
  function cellOf(e){return e.target.closest?e.target.closest('.cell'):null}
  flow.addEventListener('mouseover',function(e){var c=cellOf(e);if(c&&c.dataset.p)set(c.dataset.p,true)});
  flow.addEventListener('mouseout', function(e){var c=cellOf(e);if(c&&c.dataset.p)set(c.dataset.p,false)});
  flow.addEventListener('mouseleave',function(){names.forEach(function(n){n.classList.remove('on')})});
})();

// ---

document.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a'):null;if(!a)return;var h=a.getAttribute('href')||'';if(h.lastIndexOf('final-',0)===0){e.preventDefault();var s=h.replace('final-','').split('.html')[0];parent.postMessage({rvgoto:s},'*');}},true);