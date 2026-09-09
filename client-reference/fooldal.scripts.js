(function(){function Shim(cb){var self=this;this.els=new Set();this.check=function(){var vh=innerHeight,es=[];self.els.forEach(function(el){var r=el.getBoundingClientRect();if(r.top<vh*0.95&&r.bottom>0&&(r.width||r.height)){es.push({target:el,isIntersecting:true,boundingClientRect:r});}});if(es.length)cb(es,self);};addEventListener('scroll',this.check,{passive:true});addEventListener('resize',this.check);setInterval(this.check,600);}Shim.prototype.observe=function(el){var s=this;this.els.add(el);requestAnimationFrame(function(){s.check();});};Shim.prototype.unobserve=function(el){this.els.delete(el);};Shim.prototype.disconnect=function(){this.els.clear();};window.IntersectionObserver=Shim;})();

// ---

const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* beúszás + számlálók */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rev').forEach((el,i)=>{el.style.transitionDelay=(i%3)*.08+'s';io.observe(el)});
if(!reduce){
  const so=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;so.unobserve(e.target);
    const t=+e.target.dataset.t,s=e.target.dataset.s||'',st=performance.now();
    const tick=n=>{const p=Math.min((n-st)/1200,1);e.target.textContent=Math.round(t*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(tick)};
    requestAnimationFrame(tick);
  }),{threshold:.5});
  document.querySelectorAll('.stat .num').forEach(el=>so.observe(el));
}

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

(function(){
const red=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* kontúr-duplázás a nagy szavak mögé */
document.querySelectorAll('.word-sec .big').forEach(b=>{
  const g=document.createElement('span');g.className='ghost';g.setAttribute('aria-hidden','true');
  g.textContent=b.textContent;b.appendChild(g);
});
if(red)return;
/* hero-vonalak parallaxa */
const L=document.querySelector('.lines');
if(L){let t=false;addEventListener('scroll',()=>{if(!t){t=true;requestAnimationFrame(()=>{L.style.transform='translateY('+(scrollY*.12)+'px)';t=false})}},{passive:true})}
/* arany vonal megrajzolódása betöltéskor */
const gp=document.querySelector('.lines path:nth-child(3)');
if(gp){gp.setAttribute('pathLength','600');gp.style.strokeDasharray='600';gp.style.strokeDashoffset='600';
requestAnimationFrame(()=>{requestAnimationFrame(()=>{gp.style.transition='stroke-dashoffset 2.5s ease .4s';gp.style.strokeDashoffset='0'})})}
})();

// ---

document.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a'):null;if(!a)return;var h=a.getAttribute('href')||'';if(h.lastIndexOf('final-',0)===0){e.preventDefault();var s=h.replace('final-','').split('.html')[0];parent.postMessage({rvgoto:s},'*');}},true);