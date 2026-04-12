(() => {
  'use strict';

  /* ── Device + connection awareness ──────────────── */
  const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
  const isTouchOnly = window.matchMedia('(hover: none)').matches;
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveData = !!(conn && conn.saveData);
  const slowNetwork = !!(conn && /(^|\b)(2g|slow-2g)($|\b)/i.test(conn.effectiveType || ''));
  // Only treat genuinely constrained conditions as "low-end", not plain
  // mobile viewport. Mobile users still deserve full-resolution hero video
  // and full-quality motion unless they've opted into Save-Data or are on
  // a 2g/slow-2g connection.
  const lowEndDevice = saveData || slowNetwork;

  /* ── Bandwidth guard (Save-Data / 2g only) ──────── */
  if (lowEndDevice) {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
      heroVideo.setAttribute('preload', 'metadata');
      heroVideo.removeAttribute('fetchpriority');
    }
  }

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

  /* ── Refresh ScrollTrigger when lazy videos finally load ─
     Full-bleed videos use preload="none"; when they finally load their
     intrinsic size can shift layout, which invalidates the scroll-trigger
     positions captured on page load. A single refresh() per video on
     loadedmetadata keeps all downstream triggers honest. */
  // Debounced refresh: multiple videos loading close together should
  // only trigger one refresh, not N.
  let refreshTimer;
  const debouncedRefresh = () => {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
  };
  document.querySelectorAll('video').forEach(v => {
    v.addEventListener('loadedmetadata', debouncedRefresh, { once: true });
  });
  window.addEventListener('load', debouncedRefresh);

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

  /* ═══════════════════════════════════════════════════════
     PREMIUM ANIMATION SYSTEM
     One ease. One distance. One duration. Consistency
     is what separates premium from flashy.

     Ease: power3.out (smooth deceleration, Apple-grade)
     Distance: 24px translateY (small, refined, intentional)
     Duration: 1.0s for reveals, 1.1s for hero, 0.8s for counters
     Stagger: 0.1s uniform
     ═══════════════════════════════════════════════════════ */
  const EASE = 'power3.out';
  const DIST = 24;
  const DUR  = 1.0;

  /* ── Hero entrance ──────────────────────────────── */
  const heroTL = gsap.timeline({ delay: 0.6 });
  heroTL
    .from('.hero-title', { y: DIST, opacity: 0, duration: 1.1, ease: EASE })
    .from('.hero-sub',   { y: 16,   opacity: 0, duration: 0.9, ease: EASE }, '-=0.7')
    .from('.hero-ctas',  { y: 14,   opacity: 0, duration: 0.8, ease: EASE }, '-=0.55');

  /* ── Reveal: unified fade-up for all .reveal elements ─ */
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.set(el, { y: DIST, opacity: 0 });
    gsap.to(el, {
      y: 0, opacity: 1,
      duration: DUR, ease: EASE,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  /* ── Staggered batches: same system, same values ── */
  gsap.utils.toArray('.work-project').forEach(el => gsap.set(el, { opacity: 0, y: DIST }));
  ScrollTrigger.batch('.work-project', {
    onEnter: batch => gsap.to(batch, { y: 0, opacity: 1, duration: DUR, ease: EASE, stagger: 0.1 }),
    start: 'top 85%'
  });

  gsap.utils.toArray('.svc-tile').forEach(el => gsap.set(el, { y: DIST, opacity: 0 }));
  ScrollTrigger.batch('.svc-tile', {
    onEnter: batch => gsap.to(batch, { y: 0, opacity: 1, duration: DUR, ease: EASE, stagger: 0.1 }),
    start: 'top 88%'
  });

  gsap.utils.toArray('.faq-item').forEach(el => gsap.set(el, { y: DIST, opacity: 0 }));
  ScrollTrigger.batch('.faq-item', {
    onEnter: batch => gsap.to(batch, { y: 0, opacity: 1, duration: DUR, ease: EASE, stagger: 0.08 }),
    start: 'top 85%'
  });


  /* ── Process section: integrated method rail entrance ───── */
  const methodRail = document.querySelector('.method-rail');
  if (methodRail) {
    ScrollTrigger.create({
      trigger: methodRail,
      start: 'top 82%',
      once: true,
      onEnter: () => methodRail.classList.add('is-in')
    });
  }

  /* Particles: no continuous tweens. Scroll-coupled drift only
     (handled in the parallax block below). Continuous opacity-pulse
     tweens on every particle were causing frame-budget competition
     with the reveal and parallax animations. */

  /* ── About stat count-up ─────────────────────────── */
  document.querySelectorAll('.about-stat').forEach(stat => {
    const numEl = stat.querySelector('.about-stat-num');
    if (!numEl) return;
    const target = parseInt(numEl.dataset.count);
    if (isNaN(target)) return;

    numEl.style.fontVariantNumeric = 'tabular-nums';
    const obj = { val: 0 };
    gsap.set(stat, { y: DIST, opacity: 0, force3D: true });

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(stat, { y: 0, opacity: 1, duration: DUR, ease: EASE, force3D: true });
        gsap.to(obj, {
          val: target,
          duration: 1.2,
          ease: EASE,
          onUpdate: () => { numEl.textContent = Math.round(obj.val); },
          onComplete: () => { numEl.textContent = target; }
        });
      }
    });
  });

  /* ── Performance counters + ring charts (butter-smooth) ─ */
  const circumference = 2 * Math.PI * 25;   // ~157.08, matches HTML dasharray

  document.querySelectorAll('.perf-item').forEach(item => {
    const numEl = item.querySelector('.perf-num');
    const ringFill = item.querySelector('.perf-ring-fill');
    const target = parseFloat(numEl?.dataset.target);
    if (!numEl || isNaN(target)) return;

    const isDecimal = target % 1 !== 0;
    numEl.style.fontVariantNumeric = 'tabular-nums';
    numEl.textContent = isDecimal ? '0.0' : '0';

    const ringPercent = parseFloat(ringFill?.dataset.percent || 50);
    const targetOffset = circumference - (circumference * ringPercent / 100);

    // Idempotent initial state. Don't rely on inline HTML alone.
    if (ringFill) ringFill.setAttribute('stroke-dashoffset', circumference);

    gsap.set(item, { y: DIST, opacity: 0, force3D: true });

    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        // Card rise
        gsap.to(item, {
          y: 0, opacity: 1,
          duration: DUR, ease: EASE, force3D: true
        });

        // Number count-up
        const numObj = { val: 0 };
        gsap.to(numObj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            numEl.textContent = isDecimal ? numObj.val.toFixed(1) : Math.round(numObj.val);
          },
          onComplete: () => {
            numEl.textContent = isDecimal ? target.toFixed(1) : target;
          }
        });

        // Ring fill. Plugin-free: animate a plain object and write the
        // SVG attribute in onUpdate. Same pattern as the number counter,
        // guaranteed to work regardless of AttrPlugin state.
        if (ringFill) {
          const ringObj = { offset: circumference };
          gsap.to(ringObj, {
            offset: targetOffset,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => ringFill.setAttribute('stroke-dashoffset', ringObj.offset),
            onComplete: () => ringFill.setAttribute('stroke-dashoffset', targetOffset)
          });
        }
      }
    });
  });

  /* ── Founder cards: add .is-in on viewport entry so the CSS
       animations (SVG mark draw-in) fire on scroll. ── */
  gsap.utils.toArray('.story-fcard').forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        setTimeout(() => card.classList.add('is-in'), i * 100);
      }
    });
  });

  /* ── Footer CTA wordmark: trigger split-letter reveal + rule on scroll ── */
  const fortyWordmark = document.querySelector('.footer-cta-wordmark');
  const fortyRule = document.querySelector('.footer-cta-rule');
  if (fortyWordmark) {
    ScrollTrigger.create({
      trigger: '.footer-cta-zone',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        fortyWordmark.classList.add('is-in');
        if (fortyRule) fortyRule.classList.add('is-in');
      }
    });
  }

  /* ── Label slide-in ─────────────────────────────── */
  gsap.utils.toArray('.label').forEach(label => {
    gsap.set(label, { x: -10, opacity: 0 });
    gsap.to(label, {
      x: 0, opacity: 1, duration: 0.8, ease: EASE,
      scrollTrigger: { trigger: label, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  /* ── Google badge entrance ───────────────────────── */
  const googleBadge = document.querySelector('.story-google-badge');
  if (googleBadge) {
    gsap.fromTo(googleBadge,
      { scale: 0.92, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: DUR, ease: EASE,
        scrollTrigger: { trigger: googleBadge, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  }


  /* ── Case study accordion with subtle fade-in on impact ─ */
  function revealImpactNumbers(caseStudy) {
    const nums = caseStudy.querySelectorAll('.case-study-impact-num');
    nums.forEach((numEl, idx) => {
      const target = parseFloat(numEl.dataset.num);
      const suffix = numEl.dataset.suffix || '';
      if (isNaN(target)) return;
      const isDecimal = target % 1 !== 0;
      const displayVal = (isDecimal ? target.toFixed(1) : target) + suffix;
      numEl.textContent = displayVal;

      gsap.killTweensOf(numEl);
      gsap.fromTo(numEl,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0,
          duration: 1.1, ease: 'power2.out',
          delay: idx * 0.08
        }
      );
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
        requestAnimationFrame(() => revealImpactNumbers(cs));
      }
    });
  });

  /* ── Staggered: case study cards ────────────────────── */
  gsap.utils.toArray('.case-study').forEach(el => gsap.set(el, { opacity: 0, y: DIST }));
  ScrollTrigger.batch('.case-study', {
    onEnter: batch => gsap.to(batch, { y: 0, opacity: 1, duration: DUR, ease: EASE, stagger: 0.1 }),
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

  /* ── Reel + brands carousels: constant-speed, GPU-composited ─
     The previous scroll-velocity-boost system ran a global
     ScrollTrigger + a separate rAF lerp loop on every scroll frame,
     mutating timeScale on all carousel tweens. That competed with
     the parallax scrubs for frame budget and caused jitter. Now
     carousels just run at a steady pace. Simpler = smoother. */
  gsap.utils.toArray('.reel-track').forEach(track => {
    const isReverse = track.classList.contains('reel-track--reverse');
    const dur = window.innerWidth <= 768 ? 24 : 40;
    if (isReverse) gsap.set(track, { xPercent: -50 });
    gsap.to(track, {
      xPercent: isReverse ? 0 : -50,
      duration: dur,
      ease: 'none',
      repeat: -1,
      force3D: true
    });
  });

  const brandsTrack = document.querySelector('.brands-track');
  if (brandsTrack) {
    brandsTrack.style.animation = 'none';
    gsap.to(brandsTrack, {
      xPercent: -50,
      duration: window.innerWidth <= 768 ? 22 : 50,
      ease: 'none',
      repeat: -1,
      force3D: true
    });
  }

  /* ── Lazy video play/pause via IntersectionObserver ── */
  const lazyVideos = document.querySelectorAll('video[preload="none"], video[preload="metadata"]');
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
    }, { rootMargin: '600px 0px' });

    lazyVideos.forEach(video => videoObserver.observe(video));
  }

  /* ── Fade in CTA video when ready ───────────────── */
  const ctaVideo = document.querySelector('.cta .full-bleed-video');
  if (ctaVideo) {
    const markReady = () => ctaVideo.classList.add('is-ready');
    if (ctaVideo.readyState >= 2) {
      markReady();
    } else {
      ctaVideo.addEventListener('loadeddata', markReady, { once: true });
      ctaVideo.addEventListener('canplay', markReady, { once: true });
    }
  }

  /* ═══════════════════════════════════════════════════════
     SUBTLE PARALLAX: site-wide
     Small, scrub-linked translations on full-bleed videos,
     case study images, theory cards, and section headings.
     Skipped entirely on touch devices or reduced-motion.
     ═══════════════════════════════════════════════════════ */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && !isTouchOnly && !lowEndDevice) {
    // Higher scrub = more smoothing = less per-frame jitter.
    // 2.5 gives a buttery "floating" feel without feeling laggy.
    const SCRUB = 2.5;

    // Full-bleed background videos
    gsap.utils.toArray('.full-bleed .full-bleed-video').forEach(video => {
      gsap.to(video, {
        yPercent: 3, ease: 'none', force3D: true,
        scrollTrigger: { trigger: video.closest('.full-bleed'), start: 'top bottom', end: 'bottom top', scrub: SCRUB }
      });
    });

    // Full-bleed content counter-drifts
    gsap.utils.toArray('.full-bleed .full-bleed-content').forEach(content => {
      gsap.fromTo(content, { y: 10 }, {
        y: -10, ease: 'none', force3D: true,
        scrollTrigger: { trigger: content.closest('.full-bleed'), start: 'top bottom', end: 'bottom top', scrub: SCRUB }
      });
    });

    // Hero content lifts as you scroll past
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.to(heroContent, {
        yPercent: -8, opacity: 0.75, ease: 'none', force3D: true,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: SCRUB }
      });
    }

    // Hero background video
    const heroVideoEl = document.querySelector('.hero-video');
    if (heroVideoEl) {
      gsap.to(heroVideoEl, {
        yPercent: 4, scale: 1.02, ease: 'none', force3D: true,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: SCRUB }
      });
    }

    // Removed: case-study media, theory-card, and particle parallax.
    // Each was a separate scrub tween updating every scroll frame.
    // Fewer scrubs = fewer per-frame calculations = smoother.
  }

})();
