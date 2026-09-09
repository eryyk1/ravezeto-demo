(function(){function Shim(cb){var self=this;this.els=new Set();this.check=function(){var vh=innerHeight,es=[];self.els.forEach(function(el){var r=el.getBoundingClientRect();if(r.top<vh*0.95&&r.bottom>0&&(r.width||r.height)){es.push({target:el,isIntersecting:true,boundingClientRect:r});}});if(es.length)cb(es,self);};addEventListener('scroll',this.check,{passive:true});addEventListener('resize',this.check);setInterval(this.check,600);}Shim.prototype.observe=function(el){var s=this;this.els.add(el);requestAnimationFrame(function(){s.check();});};Shim.prototype.unobserve=function(el){this.els.delete(el);};Shim.prototype.disconnect=function(){this.els.clear();};window.IntersectionObserver=Shim;})();

// ---

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rev,.tagrow').forEach((el,i)=>{el.style.transitionDelay=(i%3)*.08+'s';io.observe(el)});

// ---

/* Képzési katalógus – kategóriaváltó */
const cInner=document.getElementById('catInner'),cTabs=document.getElementById('catTabs');
const cPanels=[...cInner.querySelectorAll('.cat-panel')],cBtns=[...cTabs.querySelectorAll('.cat-tab')];
const reduceC=matchMedia('(prefers-reduced-motion: reduce)').matches;
function crender(i){
  cPanels.forEach((p,j)=>p.classList.toggle('on',j===i));
  cBtns.forEach((b,j)=>{b.classList.toggle('on',j===i);b.setAttribute('aria-selected',j===i)});
}
function cshow(i){
  if(reduceC){crender(i);return}
  cInner.classList.add('out');
  setTimeout(()=>{crender(i);cInner.classList.remove('out')},280);
}
cBtns.forEach((b,i)=>b.addEventListener('click',()=>cshow(i)));

// ---

(function(){
const ns="http://www.w3.org/2000/svg";
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
if(matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('.doc').forEach(d=>d.classList.add('stamped'));return}
const doc=document.querySelector('.doc');if(!doc)return;
doc.querySelectorAll('.num').forEach(n=>{const t=n.textContent;n.textContent='';
  [...t].forEach((c,i)=>{const s=document.createElement('span');s.textContent=c;s.style.transition='opacity .22s ease '+(i*.045)+'s';n.appendChild(s)})});
new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('stamped');o.unobserve(e.target)}}),{threshold:.4}).observe(doc);
})();

// ---

document.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a'):null;if(!a)return;var h=a.getAttribute('href')||'';if(h.lastIndexOf('final-',0)===0){e.preventDefault();var s=h.replace('final-','').split('.html')[0];parent.postMessage({rvgoto:s},'*');}},true);