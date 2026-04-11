(() => {
  'use strict';

  /* ── Lenis smooth scroll ────────────────────────── */
  const lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 1.5,
  });

  gsap.registerPlugin(ScrollTrigger);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  /* ── Menu overlay ─────────────────────────────────── */
  const burger = document.getElementById('burger');
  const overlay = document.getElementById('menuOverlay');

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    overlay.classList.toggle('open');
    if (overlay.classList.contains('open')) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });

  overlay.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      overlay.classList.remove('open');
      lenis.start();
    });
  });

  /* ── Smooth scroll anchors (via Lenis) ──────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.5 });
    });
  });

  /* ── Nav scroll shrink ────────────────────────────── */
  const navLogo = document.getElementById('navLogo');
  const navPill = document.getElementById('navPill');
  const heroSection = document.querySelector('.hero');

  if (navLogo && navPill && heroSection) {
    ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      onLeave: () => {
        navLogo.classList.add('scrolled');
        navPill.classList.add('scrolled');
      },
      onEnterBack: () => {
        navLogo.classList.remove('scrolled');
        navPill.classList.remove('scrolled');
      }
    });
  }

  /* ── Hero entrance ──────────────────────────────── */
  const heroTL = gsap.timeline({ delay: 0.5 });
  heroTL
    .from('.hero-title', { y: 60, opacity: 0, duration: 1.4, ease: 'power3.out' })
    .from('.hero-sub', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
    .from('.hero-ctas', { y: 25, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6');

  /* ── Reveal animations (smooth fade-up) ──────────── */
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.set(el, { y: 35, opacity: 0 });
    gsap.to(el, {
      y: 0, opacity: 1, duration: 1.2, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  /* ── Staggered: work projects ────────────────────── */
  gsap.utils.toArray('.work-project').forEach(el => {
    gsap.set(el, { opacity: 0, y: 50 });
  });
  ScrollTrigger.batch('.work-project', {
    onEnter: batch => gsap.to(batch, {
      y: 0, opacity: 1,
      duration: 1, ease: 'power2.out', stagger: 0.15
    }),
    start: 'top 85%'
  });

  /* ── Staggered: service bento tiles ────────────── */
  gsap.utils.toArray('.svc-tile').forEach(el => gsap.set(el, { y: 30, opacity: 0 }));
  ScrollTrigger.batch('.svc-tile', {
    onEnter: batch => gsap.to(batch, {
      y: 0, opacity: 1,
      duration: 1, ease: 'power2.out', stagger: 0.12
    }),
    start: 'top 88%'
  });

  /* ── Staggered: FAQ items ───────────────────────── */
  ScrollTrigger.batch('.faq-item', {
    onEnter: batch => gsap.to(batch, { y: 0, opacity: 1, duration: 1.1, ease: 'power2.out', stagger: 0.1 }),
    start: 'top 85%'
  });


  /* ── Staggered: process cards (fixaplan style) ────── */
  gsap.utils.toArray('.process-card').forEach(el => gsap.set(el, { y: 40, opacity: 0 }));
  ScrollTrigger.batch('.process-card', {
    onEnter: batch => gsap.to(batch, {
      y: 0, opacity: 1,
      duration: 1.1, ease: 'power3.out', stagger: 0.12
    }),
    start: 'top 85%'
  });

  /* ── About stat count-up ─────────────────────────── */
  document.querySelectorAll('.about-stat').forEach(stat => {
    const numEl = stat.querySelector('.about-stat-num');
    if (!numEl) return;

    const target = parseInt(numEl.dataset.count);
    if (isNaN(target)) return;

    const obj = { val: 0 };
    gsap.set(stat, { y: 20, opacity: 0 });

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(stat, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' });
        gsap.to(obj, {
          val: target, duration: 2.2, ease: 'power2.out',
          onUpdate: () => { numEl.textContent = Math.round(obj.val); }
        });
      }
    });
  });

  /* ── Performance counters + ring charts ──────────── */
  const circumference = 2 * Math.PI * 25;

  document.querySelectorAll('.perf-item').forEach(item => {
    const numEl = item.querySelector('.perf-num');
    const ringFill = item.querySelector('.perf-ring-fill');
    const target = parseFloat(numEl?.dataset.target);
    if (!numEl || isNaN(target)) return;

    const isDecimal = target % 1 !== 0;
    const obj = { val: 0 };
    const ringPercent = parseFloat(ringFill?.dataset.percent || 50);
    const targetOffset = circumference - (circumference * ringPercent / 100);

    gsap.set(item, { y: 30, opacity: 0 });

    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(item, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' });

        gsap.to(obj, {
          val: target, duration: 2.4, ease: 'power2.out',
          onUpdate: () => {
            numEl.textContent = isDecimal ? obj.val.toFixed(1) : Math.round(obj.val);
          }
        });

        if (ringFill) {
          gsap.to(ringFill, {
            attr: { 'stroke-dashoffset': targetOffset },
            duration: 2.4, ease: 'power2.out'
          });
        }
      }
    });
  });

  /* ── Footer CTA entrance ────────────────────────── */
  const strokeText = document.querySelector('.footer-cta-stroke');
  if (strokeText) {
    gsap.fromTo(strokeText,
      { letterSpacing: '0.06em', opacity: 0 },
      {
        letterSpacing: '-0.03em', opacity: 1, ease: 'none',
        scrollTrigger: {
          trigger: '.neon-rain-zone',
          start: 'top 60%',
          end: 'center center',
          scrub: 1.5
        }
      }
    );
  }

  const solidText = document.querySelector('.footer-cta-solid');
  if (solidText) {
    gsap.fromTo(solidText,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, ease: 'none',
        scrollTrigger: {
          trigger: '.neon-rain-zone',
          start: 'top 70%',
          end: 'top 35%',
          scrub: 1.5
        }
      }
    );
  }

  /* ── Label slide-in ─────────────────────────────── */
  gsap.utils.toArray('.label').forEach(label => {
    gsap.set(label, { x: -15, opacity: 0 });
    gsap.to(label, {
      x: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: label, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  /* ── Founder cards staggered rise ───────────────── */
  gsap.utils.toArray('.story-founder').forEach((el, i) => {
    gsap.set(el, { y: 25, opacity: 0 });
    gsap.to(el, {
      y: 0, opacity: 1, duration: 1, ease: 'power2.out',
      delay: i * 0.12,
      scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' }
    });
  });

  /* ── Google badge pulse ─────────────────────────── */
  const googleBadge = document.querySelector('.story-google-badge');
  if (googleBadge) {
    gsap.fromTo(googleBadge,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 1.2, ease: 'elastic.out(1,0.5)',
        scrollTrigger: { trigger: googleBadge, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  }

  /* ═══════════════════════════════════════════════════════
     NEON RAIN CANVAS
     ═══════════════════════════════════════════════════════ */
  const canvas = document.getElementById('neonRainCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let drops = [];
    let animId;
    let isVisible = false;

    const COLORS = [
      { r: 0, g: 255, b: 180 },
      { r: 0, g: 200, b: 255 },
      { r: 120, g: 0, b: 255 },
      { r: 0, g: 255, b: 120 },
      { r: 80, g: 180, b: 255 },
    ];

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    function createDrop() {
      const w = canvas.width / devicePixelRatio;
      const h = canvas.height / devicePixelRatio;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x: Math.random() * w,
        y: -Math.random() * h * 0.3,
        speed: 1.5 + Math.random() * 3,
        length: 40 + Math.random() * 100,
        opacity: 0.08 + Math.random() * 0.18,
        width: 0.5 + Math.random() * 1.5,
        color,
        drift: (Math.random() - 0.5) * 0.3,
      };
    }

    function initDrops() {
      const w = canvas.width / devicePixelRatio;
      const h = canvas.height / devicePixelRatio;
      const count = Math.floor((w * h) / 4000);
      drops = [];
      for (let i = 0; i < count; i++) {
        const d = createDrop();
        d.y = Math.random() * h;
        drops.push(d);
      }
    }

    function draw() {
      const w = canvas.width / devicePixelRatio;
      const h = canvas.height / devicePixelRatio;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const grad = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.length);
        grad.addColorStop(0, `rgba(${d.color.r},${d.color.g},${d.color.b},0)`);
        grad.addColorStop(0.3, `rgba(${d.color.r},${d.color.g},${d.color.b},${d.opacity})`);
        grad.addColorStop(1, `rgba(${d.color.r},${d.color.g},${d.color.b},0)`);

        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.drift * d.length, d.y + d.length);
        ctx.strokeStyle = grad;
        ctx.lineWidth = d.width;
        ctx.lineCap = 'round';
        ctx.stroke();

        d.y += d.speed;
        d.x += d.drift * 0.3;

        if (d.y > h + d.length) {
          drops[i] = createDrop();
        }
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    initDrops();

    ScrollTrigger.create({
      trigger: '.neon-rain-zone',
      start: 'top 90%',
      end: 'bottom top',
      onEnter: () => {
        if (!isVisible) { isVisible = true; draw(); }
      },
      onLeave: () => {
        isVisible = false;
        cancelAnimationFrame(animId);
      },
      onEnterBack: () => {
        if (!isVisible) { isVisible = true; draw(); }
      },
      onLeaveBack: () => {
        isVisible = false;
        cancelAnimationFrame(animId);
      }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); initDrops(); }, 200);
    });
  }

  /* ── Case study accordion ─────────────────────────── */
  function runImpactCountUp(caseStudy) {
    const nums = caseStudy.querySelectorAll('.case-study-impact-num');
    nums.forEach(numEl => {
      const target = parseFloat(numEl.dataset.num);
      const suffix = numEl.dataset.suffix || '';
      if (isNaN(target)) return;
      const isDecimal = target % 1 !== 0;
      const obj = { val: 0 };
      gsap.killTweensOf(obj);
      numEl.textContent = '0' + suffix;
      gsap.to(obj, {
        val: target,
        duration: 2.2,
        ease: 'power2.out',
        onUpdate: () => {
          const v = isDecimal ? obj.val.toFixed(1) : Math.round(obj.val).toLocaleString();
          numEl.textContent = v + suffix;
        }
      });
    });
  }

  document.querySelectorAll('.case-study-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const cs = btn.closest('.case-study');
      const isOpen = cs.classList.contains('open');

      document.querySelectorAll('.case-study.open').forEach(openCs => {
        openCs.classList.remove('open');
        openCs.querySelector('.case-study-toggle').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        cs.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        // Wait for the max-height transition to start, then animate numbers
        setTimeout(() => runImpactCountUp(cs), 200);
      }
    });
  });

  /* ── Staggered: case study cards ────────────────────── */
  gsap.utils.toArray('.case-study').forEach(el => {
    gsap.set(el, { opacity: 0, y: 50 });
  });
  ScrollTrigger.batch('.case-study', {
    onEnter: batch => gsap.to(batch, {
      y: 0, opacity: 1,
      duration: 1, ease: 'power2.out', stagger: 0.15
    }),
    start: 'top 85%'
  });

  /* ── FAQ accordion ──────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Lazy video play/pause via IntersectionObserver ── */
  const lazyVideos = document.querySelectorAll('video[preload="none"]');
  if (lazyVideos.length && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          if (video.paused) video.play().catch(() => {});
        } else {
          if (!video.paused) video.pause();
        }
      });
    }, { rootMargin: '200px 0px' });

    lazyVideos.forEach(video => videoObserver.observe(video));
  }

})();
