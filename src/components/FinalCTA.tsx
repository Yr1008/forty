"use client";

import { motion } from "framer-motion";
import { TextReveal, MagneticButton, FadeUp, EASE_OUT } from "./motion";

export default function FinalCTA() {
  return (
    <section id="cta" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[900px] px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="relative overflow-hidden rounded-[2rem] glass glow-border"
        >
          {/* Animated mesh background */}
          <div className="pointer-events-none absolute inset-0 mesh-gradient" />

          {/* Animated orbs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-[80px] animate-pulse-glow" />
            <div className="absolute left-[20%] top-[30%] h-[180px] w-[180px] rounded-full bg-white/[0.02] blur-[60px] animate-float-2" />
            <div className="absolute right-[20%] bottom-[30%] h-[180px] w-[180px] rounded-full bg-white/[0.02] blur-[60px] animate-float-3" />
          </div>

          <div className="relative px-8 py-20 text-center sm:px-16 sm:py-24">
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
              <TextReveal>Let&apos;s build something</TextReveal>
              <br />
              <span className="text-white/40">
                <TextReveal delay={0.3}>bold together.</TextReveal>
              </span>
            </h2>

            <FadeUp delay={0.5}>
              <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-white/35">
                Whether it&apos;s a brand overhaul, a performance engine, or a
                full creative strategy — we&apos;re ready when you are.
              </p>
            </FadeUp>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6, ease: EASE_OUT }}
              className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <MagneticButton
                href="mailto:reachout2forty@gmail.com"
                className="group inline-flex items-center rounded-full bg-white px-8 py-4 text-[14px] font-medium text-black transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
              >
                Get in Touch
                <motion.svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </motion.svg>
              </MagneticButton>

              <MagneticButton
                href="https://www.instagram.com/create.forty"
                target="_blank"
                className="glass inline-flex items-center rounded-full px-7 py-3.5 text-[14px] font-medium text-white/50 transition-all duration-300 hover:text-white hover:bg-white/[0.08]"
              >
                @create.forty
              </MagneticButton>
            </motion.div>

            <FadeUp delay={0.9}>
              <p className="mt-6 text-[12px] text-white/15">
                reachout2forty@gmail.com &middot; Delhi &middot; New York
              </p>
            </FadeUp>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
