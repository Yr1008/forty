"use client";

import { motion } from "framer-motion";
import { FadeUp, TextReveal, GlassCard, EASE_OUT } from "./motion";

const pillars = [
  {
    title: "An Extension of You",
    description: "We don't work for you — we work with you. Every project is a partnership built on trust, transparency, and relentless communication.",
  },
  {
    title: "Strategic Precision",
    description: "Every initiative is targeted and efficient. We don't spray and pray — we analyze, strategize, and execute with surgical focus.",
  },
  {
    title: "Measurable Impact",
    description: "No vanity metrics. Clear reporting, actionable insights, and outcomes tied directly to business growth you can see in your P&L.",
  },
];

export default function Founders() {
  return (
    <section id="founders" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-white/[0.015] blur-[120px] animate-float-2" />
      </div>

      <div className="relative mx-auto max-w-[900px] px-6">
        <FadeUp className="text-center">
          <p className="mb-5 text-[11px] uppercase tracking-[0.25em] text-white/20">
            Why Forty
          </p>
        </FadeUp>

        <div className="text-center">
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            <TextReveal>Built at Google.</TextReveal>
            <br />
            <span className="text-white/30">
              <TextReveal delay={0.3}>Refined for you.</TextReveal>
            </span>
          </h2>
        </div>

        <GlassCard glowBorder delay={0.3} className="mt-14 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-7">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </motion.div>
            <span className="text-[13px] font-medium text-white/40">
              Founded by two ex-Googlers
            </span>
          </div>

          <p className="text-[18px] leading-[1.7] text-white/60">
            We spent years at Google working with brands of every size —
            learning what actually moves the needle. Then we built Forty
            to bring that same rigor, creativity, and data-driven thinking
            to businesses that deserve world-class marketing but can&apos;t
            hire a 200-person team.
          </p>

          <div className="gradient-line my-10" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <FadeUp key={p.title} delay={0.4 + i * 0.12}>
                <h3 className="text-[15px] font-semibold text-white/90">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/35">
                  {p.description}
                </p>
              </FadeUp>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
