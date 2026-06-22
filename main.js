'use strict';
document.body.classList.add('js-loaded');

function updateThemeIcon(){
  const t=document.documentElement.getAttribute('data-theme')||'dark';
  document.querySelectorAll('.theme-toggle').forEach(b=>{b.textContent=t==='dark'?'☀️':'🌙';});
}
function toggleTheme(){
  const c=document.documentElement.getAttribute('data-theme')||'dark',n=c==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-theme',n);localStorage.setItem('mk-theme',n);updateThemeIcon();
}
(function(){const s=localStorage.getItem('mk-theme');if(s)document.documentElement.setAttribute('data-theme',s);updateThemeIcon();})();

(function(){
  const h=document.querySelector('.nav-ham'),m=document.querySelector('.mobile-menu');
  if(!h||!m)return;
  h.addEventListener('click',function(){
    const o=this.classList.toggle('open');m.classList.toggle('open',o);document.body.style.overflow=o?'hidden':'';
  });
  m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{h.classList.remove('open');m.classList.remove('open');document.body.style.overflow='';}));
})();

(function(){
  const p=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a,.mobile-menu a').forEach(a=>{
    const h=(a.getAttribute('href')||'').split('#')[0];
    if(h===p||(p===''&&h==='index.html'))a.classList.add('active');
  });
})();

(function(){
  const nav=document.querySelector('nav');
  const prog=document.querySelector('.progress-bar');
  const btt=document.querySelector('.btt');
  window.addEventListener('scroll',()=>{
    const sy=window.scrollY;
    if(nav)nav.classList.toggle('scrolled',sy>20);
    if(prog){const h=document.documentElement.scrollHeight-window.innerHeight;prog.style.width=(h>0?sy/h*100:0)+'%';}
    if(btt)btt.classList.toggle('show',sy>500);
  },{passive:true});
  document.querySelector('.btt')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();

const ro=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('in');}),{threshold:.07,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

const bo=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('in');}),{threshold:.3});
document.querySelectorAll('.sbar').forEach(el=>bo.observe(el));

function animCounter(el){
  const t=parseInt(el.dataset.target||el.textContent)||0,sx=el.dataset.suffix||'',d=2000;
  let s=null;
  requestAnimationFrame(function step(ts){
    if(!s)s=ts;
    const p=Math.min((ts-s)/d,1),e=1-Math.pow(1-p,3);
    el.textContent=Math.round(e*t)+sx;
    if(p<1)requestAnimationFrame(step);
  });
}
const co=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting&&!x.target.dataset.animated){x.target.dataset.animated='1';animCounter(x.target);}}),{threshold:.5});
document.querySelectorAll('.counter').forEach(el=>co.observe(el));

function openModal(id){const m=document.getElementById(id);if(m){m.classList.add('open');document.body.style.overflow='hidden';}}
function closeModal(id){const m=document.getElementById(id);if(m){m.classList.remove('open');document.body.style.overflow='';}}
document.addEventListener('click',e=>{if(e.target.classList.contains('modal-bg')){e.target.classList.remove('open');document.body.style.overflow='';}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal-bg.open').forEach(m=>{m.classList.remove('open');document.body.style.overflow='';});});

function toggleWcag(){document.getElementById('wcag-panel')?.classList.toggle('open');}
document.addEventListener('click',e=>{
  const p=document.getElementById('wcag-panel');
  if(p?.classList.contains('open')&&!p.contains(e.target)&&!e.target.closest('.wcag-badge'))p.classList.remove('open');
});

document.querySelectorAll('[data-drag]').forEach(el=>{
  let d=false,sx,sl;
  el.addEventListener('mousedown',e=>{d=true;sx=e.pageX-el.offsetLeft;sl=el.scrollLeft;el.style.cursor='grabbing';});
  ['mouseleave','mouseup'].forEach(ev=>el.addEventListener(ev,()=>{d=false;el.style.cursor='grab';}));
  el.addEventListener('mousemove',e=>{if(!d)return;e.preventDefault();el.scrollLeft=sl-(e.pageX-el.offsetLeft-sx)*1.2;});
});

function tlS(n){
  document.querySelectorAll('.htl-node').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.htl-detail').forEach(x=>x.classList.remove('active'));
  n.classList.add('active');
  document.querySelector('.htl-detail[data-i="'+n.dataset.i+'"]')?.classList.add('active');
}
