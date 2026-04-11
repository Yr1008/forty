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
    gsap.set(el, { y: 40, opacity: 0 });
    gsap.to(el, {
      y: 0, opacity: 1, duration: 1.4, ease: 'expo.out',
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


  /* ── Process section: kinetic phrase motion ───────── */
  const processSection = document.querySelector('.process');
  if (processSection) {
    // Method words fade up on enter
    const methodWords = gsap.utils.toArray('.method-word');
    gsap.set(methodWords, { y: 28, opacity: 0, force3D: true });
    ScrollTrigger.batch('.method-word', {
      onEnter: batch => gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        force3D: true
      }),
      start: 'top 90%'
    });

    // Each word gains .is-active sequentially for neon underline reveal
    methodWords.forEach((word, i) => {
      ScrollTrigger.create({
        trigger: '.method-phrase',
        start: `top ${82 - (i * 5)}%`,
        onEnter: () => word.classList.add('is-active'),
        onLeaveBack: () => word.classList.remove('is-active')
      });
    });

    // Floating particles with parallax
    const particles = gsap.utils.toArray('.process-particle');
    particles.forEach((p, i) => {
      const speed = 30 + (i * 20);
      const dir = i % 2 === 0 ? 1 : -1;
      gsap.to(p, {
        y: -speed * dir,
        x: (i % 3 - 1) * 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.process',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
      // Subtle opacity pulse
      gsap.to(p, {
        opacity: 0.3,
        duration: 2 + i * 0.3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.2
      });
    });

    // Generic neon particles across sections (services, story, etc.)
    gsap.utils.toArray('.neon-particle').forEach((p, i) => {
      const section = p.closest('section');
      if (!section) return;
      // Varied drift distances and directions for organic motion
      const ySpeed = 20 + ((i * 13) % 60);
      const xSpeed = ((i * 7) % 18) - 9;
      const dir = i % 2 === 0 ? 1 : -1;
      const minOpacity = 0.25 + ((i * 0.07) % 0.25);

      gsap.to(p, {
        y: -ySpeed * dir,
        x: xSpeed,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
      gsap.to(p, {
        opacity: minOpacity,
        duration: 2.8 + ((i * 0.5) % 2.2),
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: (i * 0.27) % 3
      });
    });

  }

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
        gsap.to(stat, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', force3D: true });
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'expo.out',
          onUpdate: () => { numEl.textContent = Math.round(obj.val); },
          onComplete: () => { numEl.textContent = target; }
        });
      }
    });
  });

  /* ── Performance counters + ring charts (butter-smooth) ─ */
  const circumference = 2 * Math.PI * 25;

  document.querySelectorAll('.perf-item').forEach(item => {
    const numEl = item.querySelector('.perf-num');
    const ringFill = item.querySelector('.perf-ring-fill');
    const target = parseFloat(numEl?.dataset.target);
    if (!numEl || isNaN(target)) return;

    const isDecimal = target % 1 !== 0;
    numEl.style.fontVariantNumeric = 'tabular-nums';
    const obj = { val: 0 };
    const ringPercent = parseFloat(ringFill?.dataset.percent || 50);
    const targetOffset = circumference - (circumference * ringPercent / 100);

    gsap.set(item, { y: 30, opacity: 0, force3D: true });

    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(item, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', force3D: true });
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: 'expo.out',
          onUpdate: () => {
            numEl.textContent = isDecimal ? obj.val.toFixed(1) : Math.round(obj.val);
          },
          onComplete: () => {
            numEl.textContent = isDecimal ? target.toFixed(1) : target;
          }
        });
        if (ringFill) {
          gsap.to(ringFill, {
            attr: { 'stroke-dashoffset': targetOffset },
            duration: 2.2, ease: 'expo.out'
          });
        }
      }
    });
  });

  /* ── Footer CTA: solid entrance only (Forty text is always visible) ── */
  const solidText = document.querySelector('.footer-cta-solid');
  if (solidText) {
    gsap.fromTo(solidText,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.neon-rain-zone',
          start: 'top 75%',
          toggleActions: 'play none none none'
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
     FIREWORKS FROM "FORTY" TEXT
     ═══════════════════════════════════════════════════════ */
  const canvas = document.getElementById('neonRainCanvas');
  const fortyText = document.querySelector('.footer-cta-stroke');
  if (canvas && fortyText) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;
    let isVisible = false;
    let lastBurstTime = 0;

    const COLORS = [
      { r: 0, g: 255, b: 180 },
      { r: 0, g: 255, b: 160 },
      { r: 80, g: 255, b: 200 },
      { r: 0, g: 200, b: 255 },
      { r: 140, g: 255, b: 220 },
    ];

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    function getFortyCenter() {
      const canvasRect = canvas.getBoundingClientRect();
      const textRect = fortyText.getBoundingClientRect();
      return {
        x: textRect.left + textRect.width / 2 - canvasRect.left,
        y: textRect.top + textRect.height / 2 - canvasRect.top
      };
    }

    function spawnBurst() {
      const { x, y } = getFortyCenter();
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const count = 28 + Math.floor(Math.random() * 14);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = 1.8 + Math.random() * 3.2;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.008 + Math.random() * 0.012,
          size: 1.2 + Math.random() * 1.8,
          color,
          trail: []
        });
      }
    }

    function spawnRocket() {
      const { x, y } = getFortyCenter();
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const side = Math.random() < 0.5 ? -1 : 1;
      const count = 18 + Math.floor(Math.random() * 10);
      for (let i = 0; i < count; i++) {
        const spread = (Math.random() - 0.5) * 0.9;
        const speed = 2 + Math.random() * 2.5;
        particles.push({
          x: x + side * (30 + Math.random() * 40),
          y: y + (Math.random() - 0.5) * 30,
          vx: side * speed * (0.3 + Math.random() * 0.4) + spread * 2,
          vy: -speed * (0.9 + Math.random() * 0.4),
          life: 1,
          decay: 0.01 + Math.random() * 0.014,
          size: 1.3 + Math.random() * 1.5,
          color,
          gravity: 0.05,
          trail: []
        });
      }
    }

    function draw(now) {
      const w = canvas.width / devicePixelRatio;
      const h = canvas.height / devicePixelRatio;

      // Trail fade (semi-transparent black overlay)
      ctx.fillStyle = 'rgba(10,10,10,0.18)';
      ctx.fillRect(0, 0, w, h);

      // Periodic bursts
      if (!lastBurstTime || now - lastBurstTime > 1800 + Math.random() * 1200) {
        lastBurstTime = now;
        if (Math.random() < 0.55) {
          spawnBurst();
        } else {
          spawnRocket();
        }
      }

      // Update + draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.gravity) p.vy += p.gravity;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = p.life * 0.9;
        const r = p.color.r, g = p.color.g, b = p.color.b;

        // Glow halo
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core bright dot
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();

    ScrollTrigger.create({
      trigger: '.neon-rain-zone',
      start: 'top 90%',
      end: 'bottom top',
      onEnter: () => {
        if (!isVisible) {
          isVisible = true;
          // Initial burst on entry
          spawnBurst();
          setTimeout(spawnRocket, 300);
          animId = requestAnimationFrame(draw);
        }
      },
      onLeave: () => {
        isVisible = false;
        cancelAnimationFrame(animId);
        particles = [];
      },
      onEnterBack: () => {
        if (!isVisible) {
          isVisible = true;
          spawnBurst();
          animId = requestAnimationFrame(draw);
        }
      },
      onLeaveBack: () => {
        isVisible = false;
        cancelAnimationFrame(animId);
        particles = [];
      }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    });
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

})();
