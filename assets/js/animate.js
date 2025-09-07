const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('appear'); io.unobserve(e.target); }
  });
},{ threshold:0.15 });

export function attachFadeIns(root=document){
  root.querySelectorAll?.('.fade-in').forEach(el => { if(!el.classList.contains('appear')) io.observe(el); });
}
