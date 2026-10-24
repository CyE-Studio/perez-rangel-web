/* Web corporativa Transportes Pérez Rangel · interacción (sin dependencias) */
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cabecera: sólida al bajar, se oculta al bajar deprisa y reaparece al subir; enlace activo
  const header = document.querySelector('.site-header');
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('solid', y > 60);
    header.classList.toggle('hide', y > 400 && y > lastY + 4);
    if (y < lastY - 4) header.classList.remove('hide');
    lastY = y;
    let current = null;
    for (const s of sections) if (s.offsetTop <= y + 140) current = s.id;
    navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menú móvil
  const burger = document.querySelector('.burger');
  const mobileNav = document.getElementById('mobile-nav');
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    mobileNav.classList.toggle('open', open);
    header.classList.remove('hide');
  });
  mobileNav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
    }),
  );

  // Portada: fundido entre fotografías
  const slides = [...document.querySelectorAll('.hero .slide')];
  const dots = [...document.querySelectorAll('.hero-dots button')];
  let idx = 0;
  let timer = null;
  const caption = document.querySelector('.hero-caption');
  const show = (i) => {
    idx = (i + slides.length) % slides.length;
    if (caption) caption.textContent = slides[idx].dataset.caption || '';
    slides.forEach((s, k) => s.classList.toggle('is-active', k === idx));
    dots.forEach((d, k) => {
      d.classList.toggle('is-active', k === idx);
      d.setAttribute('aria-selected', String(k === idx));
    });
  };
  const start = () => {
    if (reduce || slides.length < 2) return;
    clearInterval(timer);
    timer = setInterval(() => show(idx + 1), 7000);
  };
  dots.forEach((d, k) => d.addEventListener('click', () => { show(k); start(); }));
  start();

  // Mapa de cobertura incrustado (permite animar las rutas)
  const mapCard = document.getElementById('map-card');
  if (mapCard && window.IBERIA_SVG) mapCard.innerHTML = window.IBERIA_SVG;

  // Botón volver arriba
  const toTop = document.querySelector('.to-top');
  if (toTop) window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 900), { passive: true });

  // Barra de progreso de lectura
  const progress = document.querySelector('.progress span');
  if (progress) {
    const upd = () => { const max = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%'; };
    window.addEventListener('scroll', upd, { passive: true });
    upd();
  }

  // Portada reactiva al ratón (desplazamiento sutil de la fotografía)
  const heroSlides = document.querySelector('.hero-slides');
  if (heroSlides && !reduce && window.matchMedia('(pointer: fine)').matches) {
    document.querySelector('.hero').addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * -14;
      const y = (e.clientY / window.innerHeight - 0.5) * -10;
      heroSlides.style.transform = 'translate3d(' + x.toFixed(1) + 'px, ' + y.toFixed(1) + 'px, 0)';
    });
  }

  // Lightbox para galería, nave y certificados
  const lb = document.querySelector('.lightbox');
  if (lb) {
    const items = [...document.querySelectorAll('[data-lightbox]')];
    const img = lb.querySelector('img');
    const cap = lb.querySelector('figcaption');
    let cur = 0;
    let lastFocus = null;
    const render = () => { img.src = items[cur].dataset.lightbox; img.alt = items[cur].dataset.caption || ''; cap.textContent = items[cur].dataset.caption || ''; };
    const open = (i) => { cur = i; render(); lb.hidden = false; lastFocus = document.activeElement; lb.querySelector('.lb-close').focus(); document.body.style.overflow = 'hidden'; };
    const close = () => { lb.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); };
    items.forEach((el, i) => {
      el.addEventListener('click', (e) => { e.preventDefault(); open(i); });
      if (el.tagName === 'IMG') el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
    });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', () => { cur = (cur - 1 + items.length) % items.length; render(); });
    lb.querySelector('.lb-next').addEventListener('click', () => { cur = (cur + 1) % items.length; render(); });
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') { cur = (cur + 1) % items.length; render(); }
      if (e.key === 'ArrowLeft') { cur = (cur - 1 + items.length) % items.length; render(); }
    });
  }

  // Parallax de bandas fotográficas
  const bands = [...document.querySelectorAll('[data-parallax]')];
  if (!reduce && bands.length) {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      for (const el of bands) {
        const speed = parseFloat(el.dataset.parallax) || 0;
        const rect = el.parentElement.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        el.style.transform = 'translate3d(0, ' + (progress * speed * 160).toFixed(1) + 'px, 0)';
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // Galería deslizante
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    const step = () => (gallery.querySelector('figure')?.getBoundingClientRect().width || 400) + 16;
    document.querySelector('.gal-prev')?.addEventListener('click', () => gallery.scrollBy({ left: -step(), behavior: 'smooth' }));
    document.querySelector('.gal-next')?.addEventListener('click', () => gallery.scrollBy({ left: step(), behavior: 'smooth' }));
    gallery.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') gallery.scrollBy({ left: step(), behavior: 'smooth' });
      if (e.key === 'ArrowLeft') gallery.scrollBy({ left: -step(), behavior: 'smooth' });
    });
  }

  // Aparición al entrar en pantalla
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // Contadores
  const counters = document.querySelectorAll('[data-count]');
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // 5000 → 5.000 (el navegador no agrupa cifras de cuatro dígitos en español)
  // La unidad (m²) va en un <small> para que no rompa la línea ni compita con la cifra.
  const paint = (el, n) => {
    const unit = el.dataset.suffix ? ' <small>' + el.dataset.suffix.trim() + '</small>' : '';
    el.innerHTML = (el.dataset.prefix || '') + fmt(n) + unit;
  };
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if (reduce) { paint(el, target); return; }
    // Arranca cuando la tarjeta ya ha terminado de aparecer (misma escalera de retardos que .reveal)
    const card = el.closest('.reveal');
    const delay = card ? parseFloat(getComputedStyle(card).transitionDelay) * 1000 + 350 : 0;
    // Empieza en un 60 % del valor: el recorrido es corto y no se ven ceros ni saltos largos
    const from = Math.round(target * 0.6);
    setTimeout(() => {
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / 1100);
        const eased = 1 - Math.pow(1 - p, 3);
        paint(el, Math.round(from + (target - from) * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
  };
  // Valor inicial coherente (prefijo y unidad ya colocados) para que no haya cambio de anchura brusco
  counters.forEach((el) => paint(el, reduce ? parseInt(el.dataset.count, 10) : Math.round(parseInt(el.dataset.count, 10) * 0.6)));
  if ('IntersectionObserver' in window) {
    const io2 = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { animate(e.target); io2.unobserve(e.target); }
    }, { threshold: 0.4 });
    counters.forEach((el) => io2.observe(el));
  } else {
    counters.forEach(animate);
  }

  // Formularios de demostración: no envían nada
  const toast = document.querySelector('.toast');
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.remove('show'), 4200);
  };
  document.querySelectorAll('form[data-mock]').forEach((form) => {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      if (!form.reportValidity()) return;
      showToast(form.dataset.mock === 'candidatura'
        ? 'Gracias. Esta es una maqueta: en la web real tu candidatura llegaría a administración.'
        : 'Gracias. Esta es una maqueta: en la web real recibirías respuesta de nuestro departamento de tráfico.');
      form.reset();
    });
  });
  document.querySelectorAll('.pending-link').forEach((a) =>
    a.addEventListener('click', (ev) => { ev.preventDefault(); showToast('Texto legal pendiente de facilitar por la empresa.'); }),
  );

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
