/* ASADA TACOS AZ — shared site behavior */
(function(){
  "use strict";
  var rm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* loader */
  var load=document.getElementById('load');
  if(load){
    window.addEventListener('load',function(){setTimeout(function(){load.classList.add('done')},700)});
    setTimeout(function(){load.classList.add('done')},2400);
  }

  /* nav scroll state + hero parallax */
  var hdr=document.getElementById('hdr');
  var heroimg=document.getElementById('heroimg');
  function onScroll(){
    var y=window.pageYOffset;
    if(hdr) hdr.classList.toggle('scrolled',y>40);
    if(heroimg&&!rm&&y<window.innerHeight){heroimg.style.transform='scale(1.08) translateY('+(y*0.16)+'px)';}
  }
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  /* mobile drawer */
  var burger=document.getElementById('burger'),drawer=document.getElementById('drawer'),dclose=document.getElementById('dclose');
  if(burger&&drawer){
    function setOpen(o){
      drawer.classList.toggle('open',o);
      burger.classList.toggle('open',o);
      document.body.style.overflow=o?'hidden':'';
    }
    burger.addEventListener('click',function(){setOpen(!drawer.classList.contains('open'));});
    burger.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();setOpen(true);}});
    if(dclose)dclose.addEventListener('click',function(){setOpen(false);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')setOpen(false);});
    drawer.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setOpen(false);});});
  }

  /* reveal on scroll */
  var rvs=document.querySelectorAll('.rv');
  if(rvs.length){
    if(rm||!('IntersectionObserver'in window)){rvs.forEach(function(el){el.classList.add('in');});}
    else{
      var io=new IntersectionObserver(function(es){es.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.16});
      rvs.forEach(function(el){io.observe(el);});
    }
  }

  /* ember cursor glow (desktop only) */
  var glow=document.getElementById('glow');
  if(glow&&!rm&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    var gx=innerWidth/2,gy=innerHeight/2,cx=gx,cy=gy;
    window.addEventListener('mousemove',function(e){gx=e.clientX;gy=e.clientY;});
    (function loop(){cx+=(gx-cx)*.12;cy+=(gy-cy)*.12;
      glow.style.transform='translate('+cx+'px,'+cy+'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);})();
  }

  /* schedule — highlight tonight's stop */
  var sched=document.querySelector('.sched');
  if(sched){
    var today=new Date().getDay();
    var row=sched.querySelector('.srow[data-day="'+today+'"]');
    if(row&&!row.classList.contains('closed')){
      row.classList.add('tonight');
      var tag=row.querySelector('.stag');
      if(tag&&!tag.innerHTML.trim()) tag.innerHTML='<i></i> Pouring tonight';
    }
  }
})();
