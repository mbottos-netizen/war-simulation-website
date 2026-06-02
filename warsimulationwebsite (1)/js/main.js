/* Operation Synthesis — interactive behaviours */
document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('show'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('show')));
  }

  /* Highlight current page in nav */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  /* Scroll reveal */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* Animated number counters */
  const animateCount = el => {
    const target = parseFloat(el.dataset.count);
    const dec = (el.dataset.dec | 0);
    const dur = 1500; const t0 = performance.now();
    const step = now => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dec) + (el.dataset.suffix || '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); countIO.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => countIO.observe(el));

  /* Infographic bar fills */
  const barIO = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.width = e.target.dataset.w + '%'; barIO.unobserve(e.target); } });
  }, { threshold: 0.4 });
  document.querySelectorAll('.bar-fill').forEach(el => barIO.observe(el));

  /* Accordions */
  document.querySelectorAll('.acc-head').forEach(head => {
    head.addEventListener('click', () => {
      const body = head.nextElementSibling;
      const open = head.classList.toggle('open');
      body.style.maxHeight = open ? body.scrollHeight + 'px' : 0;
    });
  });

  /* Tabs */
  document.querySelectorAll('.tabs').forEach(group => {
    const btns = group.querySelectorAll('.tab-btn');
    const panels = group.parentElement.querySelectorAll('.tab-panel');
    btns.forEach(btn => btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = group.parentElement.querySelector('#' + btn.dataset.tab);
      if (panel) panel.classList.add('active');
    }));
  });
});
