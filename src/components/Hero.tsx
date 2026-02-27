"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { CharReveal, TextReveal, MagneticButton, EASE_OUT } from "./motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Animated mesh background */}
      <div className="pointer-events-none absolute inset-0 mesh-gradient" />

      {/* Moving orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[20%] top-[15%] h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[100px] animate-float-1" />
        <div className="absolute right-[10%] top-[40%] h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[120px] animate-float-2" />
        <div className="absolute left-[50%] bottom-[10%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-[140px] animate-float-3" />
      </div>

      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative flex min-h-screen items-center justify-center px-6"
      >
        <div className="mx-auto max-w-[1000px] text-center">
          {/* Logo with animated halo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-white/[0.04] blur-[40px] animate-pulse-glow" />
              <div className="absolute -inset-12 rounded-full bg-white/[0.02] blur-[60px] animate-pulse-glow [animation-delay:1s]" />
              <Image
                src="/logo-white.png"
                alt="Forty"
                width={72}
                height={72}
                className="relative h-[72px] w-[72px]"
                priority
              />
            </div>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-5 py-2 backdrop-blur-xl"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            />
            <span className="text-[13px] tracking-wide text-white/50">
              Founded by two ex-Googlers
            </span>
            <svg className="h-3 w-3 opacity-40" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </motion.div>

          {/* Headline with character reveal */}
          <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
            <CharReveal delay={0.5}>Bold Ideas.</CharReveal>
            <br />
            <span className="text-white/30">
              <CharReveal delay={0.9}>Real Growth.</CharReveal>
            </span>
          </h1>

          {/* Subline with word reveal */}
          <div className="mx-auto mt-7 max-w-lg">
            <p className="text-[18px] leading-relaxed text-white/40">
              <TextReveal delay={1.3}>
                We craft strategies, build brands, and run campaigns that transform businesses. Creative and performance marketing, fused.
              </TextReveal>
            </p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6, ease: EASE_OUT }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticButton
              href="#cta"
              className="group relative inline-flex items-center overflow-hidden rounded-full bg-white px-8 py-3.5 text-[14px] font-medium text-black transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 flex items-center">
                Start a Project
                <motion.svg
                  className="ml-2 h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </motion.svg>
              </span>
            </MagneticButton>

            <MagneticButton
              href="#case-studies"
              className="glass inline-flex items-center rounded-full px-8 py-3.5 text-[14px] font-medium text-white/60 transition-all duration-300 hover:text-white hover:bg-white/[0.08]"
            >
              See Our Work
            </MagneticButton>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="mt-24 flex flex-col items-center gap-3"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/20">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-8 w-4 items-start justify-center rounded-full border border-white/[0.1] pt-1.5"
            >
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-0.5 rounded-full bg-white/50"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
