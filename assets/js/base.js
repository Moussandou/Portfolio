// Resolve base path for partials on nested pages
(function(){
  const headers = document.querySelectorAll('[data-include]');
  headers.forEach(el => {
    const base = el.getAttribute('data-base') || '';
    const file = el.getAttribute('data-include');
    fetch(base ? base + file.replace('../','') : file)
      .then(r=>r.text()).then(html => { el.outerHTML = html; activateNav(); initMenu(); setYear(); })
      .catch(()=>{ /* ignore */ });
  });

  function activateNav(){
    const links = document.querySelectorAll('.nav__links a');
    const path = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a=>{
      const href = a.getAttribute('href');
      const target = href.split('/').pop();
      if(target === path) a.classList.add('is-active');
    });
  }
  function initMenu(){
    const btn = document.querySelector('.nav__toggle');
    const ul = document.querySelector('.nav__links');
    if(!btn || !ul) return;
    btn.addEventListener('click', ()=>{
      const open = ul.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
    // Fix root links from nested pages
    document.querySelectorAll('[data-root]').forEach(a=>{
      const href = a.getAttribute('href');
      if(location.pathname.includes('/pages/')) a.setAttribute('href', href.replace('./', '../'));
    });
  }
  function setYear(){
    const y = document.getElementById('year');
    if(y) y.textContent = new Date().getFullYear();
  }

  // IntersectionObserver for reveal animations
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold: .1});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();
