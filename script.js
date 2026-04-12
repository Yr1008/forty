(() => {
  'use strict';

  /* ── Device + connection awareness ──────────────── */
  const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
  const isTouchOnly = window.matchMedia('(hover: none)').matches;
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveData = !!(conn && conn.saveData);
  const slowNetwork = !!(conn && /(^|\b)(2g|slow-2g)($|\b)/i.test(conn.effectiveType || ''));
  // Only treat genuinely constrained conditions as "low-end" — NOT plain
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
  document.querySelectorAll('video').forEach(v => {
    v.addEventListener('loadedmetadata', () => ScrollTrigger.refresh(), { once: true });
  });
  window.addEventListener('load', () => ScrollTrigger.refresh());

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

  /* ── Reveal animations (unified fade-up, Apple-grade cubic-bezier) ─ */
  const REVEAL_EASE = 'cubic-bezier(.22,.61,.36,1)';
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.set(el, { y: 40, opacity: 0 });
    gsap.to(el, {
      y: 0, opacity: 1,
      duration: 1.2, ease: REVEAL_EASE,
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

  /* ── Ambient particles: in-place opacity pulse only ──
     All scroll-coupled movement for particles is now handled once in the
     site-wide parallax block below (with low amplitude). No double tweens. */
  gsap.utils.toArray('.process-particle, .neon-particle').forEach((p, i) => {
    const minOpacity = 0.3 + ((i * 0.06) % 0.2);
    gsap.to(p, {
      opacity: minOpacity,
      duration: 3 + ((i * 0.4) % 2),
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      delay: (i * 0.25) % 2.5
    });
  });

  /* ── About stat count-up (butter-smooth) ─────────── */
  document.querySelectorAll('.about-stat').forEach(stat => {
    const numEl = stat.querySelector('.about-stat-num');
    if (!numEl) return;
    const target = parseInt(numEl.dataset.count);
    if (isNaN(target)) return;

    numEl.style.fontVariantNumeric = 'tabular-nums';
    const obj = { val: 0 };
    gsap.set(stat, { y: 20, opacity: 0, force3D: true });

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(stat, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', force3D: true });
        gsap.to(obj, {
          val: target,
          duration: 1.4,
          ease: 'power2.out',
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

    // Idempotent initial state — don't rely on inline HTML alone
    if (ringFill) ringFill.setAttribute('stroke-dashoffset', circumference);

    gsap.set(item, { y: 30, opacity: 0, force3D: true });

    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        // Card rise
        gsap.to(item, {
          y: 0, opacity: 1,
          duration: 0.9, ease: 'power3.out', force3D: true
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

        // Ring fill — plugin-free: animate a plain object and write the
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

  /* ── Reel + brands carousels with smooth scroll-velocity boost ─ */
  const allCarouselTracks = [];

  // Reel tracks
  gsap.utils.toArray('.reel-track').forEach(track => {
    const isReverse = track.classList.contains('reel-track--reverse');
    const isMobile = window.innerWidth <= 768;
    const baseDuration = isMobile ? 24 : 40;
    const tween = gsap.to(track, {
      xPercent: isReverse ? 0 : -50,
      duration: baseDuration,
      ease: 'none',
      repeat: -1,
      force3D: true
    });
    if (isReverse) {
      gsap.set(track, { xPercent: -50 });
      tween.vars.xPercent = 0;
      tween.invalidate();
    }
    allCarouselTracks.push({ tween, currentScale: 1, targetScale: 1 });
  });

  // Brands track
  const brandsTrack = document.querySelector('.brands-track');
  if (brandsTrack) {
    brandsTrack.style.animation = 'none';
    brandsTrack.style.willChange = 'transform';
    const isMobileBrands = window.innerWidth <= 768;
    const brandsDuration = isMobileBrands ? 22 : 50;
    const tween = gsap.to(brandsTrack, {
      xPercent: -50,
      duration: brandsDuration,
      ease: 'none',
      repeat: -1,
      force3D: true
    });
    allCarouselTracks.push({ tween, currentScale: 1, targetScale: 1 });
  }

  // Single rAF loop that smoothly lerps timeScale towards target — no per-tick tweens
  let carouselLoopRunning = false;
  function carouselLoop() {
    let stillAnimating = false;
    allCarouselTracks.forEach(t => {
      const diff = t.targetScale - t.currentScale;
      if (Math.abs(diff) > 0.005) {
        t.currentScale += diff * 0.08; // smooth lerp
        t.tween.timeScale(t.currentScale);
        stillAnimating = true;
      } else if (t.currentScale !== t.targetScale) {
        t.currentScale = t.targetScale;
        t.tween.timeScale(t.currentScale);
      }
    });
    if (stillAnimating) {
      requestAnimationFrame(carouselLoop);
    } else {
      carouselLoopRunning = false;
    }
  }

  // One ScrollTrigger that just updates target values — no tween creation
  let scrollIdleTimer;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const velocity = Math.abs(self.getVelocity());
      const boost = Math.min(4, 1 + velocity / 1000);
      allCarouselTracks.forEach(t => { t.targetScale = boost; });
      if (!carouselLoopRunning) {
        carouselLoopRunning = true;
        requestAnimationFrame(carouselLoop);
      }
      clearTimeout(scrollIdleTimer);
      scrollIdleTimer = setTimeout(() => {
        allCarouselTracks.forEach(t => { t.targetScale = 1; });
        if (!carouselLoopRunning) {
          carouselLoopRunning = true;
          requestAnimationFrame(carouselLoop);
        }
      }, 200);
    }
  });

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
     SUBTLE PARALLAX — site-wide
     Small, scrub-linked translations on full-bleed videos,
     case study images, theory cards, and section headings.
     Skipped entirely on touch devices or reduced-motion.
     ═══════════════════════════════════════════════════════ */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && !isTouchOnly && !lowEndDevice) {
    // Unified, gentle scrub for all parallax so everything drifts in
    // concert. Higher scrub = more lag = smoother glide behind the page.
    const SCRUB = 1.4;

    // Full-bleed background videos drift slightly as the section scrolls.
    gsap.utils.toArray('.full-bleed .full-bleed-video').forEach(video => {
      gsap.to(video, {
        yPercent: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: video.closest('.full-bleed'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: SCRUB
        }
      });
    });

    // Full-bleed content rises gently against the video drift
    gsap.utils.toArray('.full-bleed .full-bleed-content').forEach(content => {
      gsap.fromTo(content,
        { y: 12 },
        {
          y: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: content.closest('.full-bleed'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: SCRUB
          }
        }
      );
    });

    // Case study hero image — a whisper of drift
    gsap.utils.toArray('.case-study-img .case-study-media').forEach(img => {
      gsap.fromTo(img,
        { y: -5 },
        {
          y: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.case-study'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: SCRUB
          }
        }
      );
    });

    // Theory cards — very subtle staggered drift
    gsap.utils.toArray('.theory-card').forEach((card, i) => {
      const depth = 5 + (i % 3) * 2; // stagger depths: 5, 7, 9
      gsap.fromTo(card,
        { y: depth },
        {
          y: -depth,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: SCRUB
          }
        }
      );
    });

    // Hero content lifts slightly as you scroll away from the hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.to(heroContent, {
        yPercent: -10,
        opacity: 0.7,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.0
        }
      });
    }

    // Hero background video parallax — small and smooth
    const heroVideoEl = document.querySelector('.hero-video');
    if (heroVideoEl) {
      gsap.to(heroVideoEl, {
        yPercent: 5,
        scale: 1.03,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }

    // Ambient neon particles: a faint drift, with very low amplitude.
    // This is the ONLY scroll-coupled motion particles have now.
    gsap.utils.toArray('.neon-particle, .process-particle').forEach((p, i) => {
      const depth = 8 + (i % 4) * 3; // 8, 11, 14, 17
      gsap.fromTo(p,
        { y: depth },
        {
          y: -depth,
          ease: 'none',
          scrollTrigger: {
            trigger: p.closest('section') || p,
            start: 'top bottom',
            end: 'bottom top',
            scrub: SCRUB
          }
        }
      );
    });
  }

})();
