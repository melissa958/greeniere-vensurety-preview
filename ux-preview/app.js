const dialog = document.querySelector('#preview-dialog');
document.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#dialog-title').textContent = button.dataset.preview;
  dialog.showModal();
}));
dialog.addEventListener('click', event => { if(event.target === dialog) { const box = dialog.getBoundingClientRect(); if(event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') !== 'true'; menuToggle.setAttribute('aria-expanded',String(open)); menuToggle.setAttribute('aria-label',open?'Close main menu':'Open main menu'); mobileMenu.hidden = !open; });
const sectionToggle = document.querySelector('.section-toggle');
const sectionNav = document.querySelector('.section-nav');
sectionToggle.addEventListener('click', () => { const open = sectionToggle.getAttribute('aria-expanded') !== 'true'; sectionToggle.setAttribute('aria-expanded',String(open)); sectionNav.classList.toggle('expanded',open); });
document.querySelectorAll('.section-links a, #mobile-menu a').forEach(anchor => anchor.addEventListener('click', () => {sectionNav.classList.remove('expanded');sectionToggle.setAttribute('aria-expanded','false');mobileMenu.hidden = true;menuToggle.setAttribute('aria-expanded','false');}));
const heroButton = document.querySelector('.hero-apply');
new IntersectionObserver(entries => { document.querySelector('.sticky-apply').classList.toggle('visible', !entries[0].isIntersecting); },{threshold:0}).observe(heroButton);
const anchors = [...document.querySelectorAll('.section-links a')];
const sectionObserver = new IntersectionObserver(entries => { for(const entry of entries) if(entry.isIntersecting) { const active = anchors.find(a => a.hash === '#'+entry.target.id); anchors.forEach(a => {a.classList.toggle('active',a===active); if(a===active) a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}); if(active) document.querySelector('#current-section').textContent = active.textContent; } },{rootMargin:'-15% 0px -65% 0px',threshold:0});
anchors.forEach(a => sectionObserver.observe(document.querySelector(a.hash)));
const tabs = [...document.querySelectorAll('[role=tab]')];
const mobileBond = matchMedia('(max-width:700px)');
const tabContainer = document.querySelector('.bond-tabs');
const panelContainer = document.querySelector('.bond-panels');
const performanceIcon = document.querySelector('.bond-icon');
function adaptBondLayout(){
  if(mobileBond.matches){
    tabContainer.removeAttribute('role');tabContainer.removeAttribute('aria-orientation');
    tabs.forEach((tab,i)=>{tab.removeAttribute('role');tab.removeAttribute('aria-selected');tab.setAttribute('aria-expanded',String(!document.querySelector('#panel-'+i).hidden));tab.tabIndex=0;tab.after(document.querySelector('#panel-'+i));});
    tabs[0].prepend(performanceIcon);
  }else{
    tabContainer.setAttribute('role','tablist');tabContainer.setAttribute('aria-orientation','vertical');
    tabs.forEach((tab,i)=>{tab.setAttribute('role','tab');tab.removeAttribute('aria-expanded');tab.setAttribute('aria-selected',String(!document.querySelector('#panel-'+i).hidden));tab.tabIndex=document.querySelector('#panel-'+i).hidden?-1:0;panelContainer.append(document.querySelector('#panel-'+i));});
    document.querySelector('#panel-0').prepend(performanceIcon);
  }
}
mobileBond.addEventListener('change',adaptBondLayout);adaptBondLayout();
function selectTab(index, focus = false) {tabs.forEach((tab,i) => {if(mobileBond.matches){tab.setAttribute('aria-expanded',String(i===index));tab.tabIndex=0;}else{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;}document.querySelector('#panel-'+i).hidden = i!==index;});if(focus) tabs[index].focus();}
tabs.forEach((tab,index) => {tab.addEventListener('click',()=>selectTab(index));tab.addEventListener('keydown',event=>{let next=index;if(['ArrowDown','ArrowRight'].includes(event.key)) next=(index+1)%tabs.length;else if(['ArrowUp','ArrowLeft'].includes(event.key)) next=(index-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();selectTab(next,true);});});
const track = document.querySelector('.steps-track');
const cards = [...track.children];
const prev = [...document.querySelectorAll('.step-prev')];
const next = [...document.querySelectorAll('.step-next')];
function cardWidth() {return cards[1].offsetLeft-cards[0].offsetLeft;}
function updateSteps(){if(!track.clientWidth)return;const index=Math.round(track.scrollLeft/cardWidth());document.querySelector('#step-count').textContent=(index+1)+' of 6';const end=track.scrollLeft+track.clientWidth>=track.scrollWidth-3;prev.forEach(b=>b.disabled=track.scrollLeft<3);next.forEach(b=>b.disabled=end);document.querySelector('.mobile-step-nav .step-prev img').src=index===0?'../580bf.svg':'../a9e73.svg';document.querySelector('.mobile-step-nav .step-next img').src=end?'../caeab.svg':'../2c596.svg';}
prev.forEach(button=>button.addEventListener('click',()=>track.scrollBy({left:-cardWidth(),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})));
next.forEach(button=>button.addEventListener('click',()=>track.scrollBy({left:cardWidth(),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})));
track.addEventListener('scroll',updateSteps,{passive:true});window.addEventListener('resize',updateSteps);updateSteps();
document.querySelectorAll('.nav-dropdown').forEach(details=>details.addEventListener('toggle',()=>{if(details.open) document.querySelectorAll('.nav-dropdown').forEach(other=>{if(other!==details)other.open=false;});}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){mobileMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false');sectionNav.classList.remove('expanded');sectionToggle.setAttribute('aria-expanded','false');document.querySelectorAll('.nav-dropdown').forEach(d=>d.open=false);}});
document.querySelector('#newsletter').addEventListener('submit',event=>{event.preventDefault();document.querySelector('#newsletter-status').textContent='Preview only — your email has not been submitted or saved.';});

const detailedProcess = document.querySelector('#full-process');
detailedProcess.addEventListener('toggle',()=>{if(detailedProcess.open)requestAnimationFrame(updateSteps);});
document.querySelectorAll('[data-reveal="prepare"]').forEach(anchor=>anchor.addEventListener('click',event=>{event.preventDefault();document.querySelector('.preparation-details').open=true;document.querySelector('#prepare').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});history.replaceState(null,'','#prepare');}));
if(location.hash==='#prepare')document.querySelector('.preparation-details').open=true;