(function(){
  const ROOT = location.pathname.includes('/pages/') ? '..' : '.';

  // Charge header et footer
  async function loadPartials(){
    const [h,f] = await Promise.all([
      fetch(ROOT + '/partials/header.html').then(r=>r.text()),
      fetch(ROOT + '/partials/footer.html').then(r=>r.text())
    ]);
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');
    if(headerEl){ headerEl.innerHTML = h; wireHeaderLinks(headerEl); setActiveNav(); }
    if(footerEl){
      footerEl.innerHTML = f;
      const y = footerEl.querySelector('#year'); if(y) y.textContent = new Date().getFullYear();
    }
  }

  function wireHeaderLinks(scope){
    scope.querySelectorAll('[data-href]').forEach(a=>{
      a.setAttribute('href', ROOT + '/' + a.dataset.href);
    });
  }

  function setActiveNav(){
    const p = location.pathname;
    const map = [
  [/\/(index\.html)?$/, 'nav-home'],
  [/\/pages\/cursus\.html$/, 'nav-cursus'],
  [/\/pages\/projets\.html$/, 'nav-projets'],
  [/\/pages\/liens\.html$/, 'nav-liens'],
    ];
    const id = (map.find(([re])=> re.test(p))||[])[1];
    if(!id) return;
    const link = document.getElementById(id);
    if(link) link.setAttribute('aria-current','page');
  }

  // Animations "reveal"
  function attachReveal(){
    const els = document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){
      els.forEach(e=> e.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    els.forEach(e=> io.observe(e));
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    loadPartials().then(attachReveal);
  });

  // Expose ROOT if needed elsewhere
  window.__ROOT__ = ROOT;
})();
