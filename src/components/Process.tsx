"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeUp, TextReveal, EASE_OUT } from "./motion";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Deep dive into your business, audience, and competitive landscape. No assumptions — just understanding.",
  },
  {
    number: "02",
    title: "Strategize",
    description: "A custom roadmap with clear priorities, timelines, and KPIs tied to real business outcomes.",
  },
  {
    number: "03",
    title: "Execute",
    description: "We build, launch, and manage — creative, campaigns, technology. All moving in parallel, all integrated.",
  },
  {
    number: "04",
    title: "Scale",
    description: "Continuous optimization. Weekly insights. Monthly strategy reviews. We amplify what works and refine what doesn't.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });

  return (
    <section id="process" className="relative py-28 sm:py-36">
      <div className="relative mx-auto max-w-[1000px] px-6">
        <FadeUp className="text-center">
          <p className="mb-5 text-[11px] uppercase tracking-[0.25em] text-white/20">
            Process
          </p>
        </FadeUp>

        <div className="text-center">
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            <TextReveal>Four phases. Zero guesswork.</TextReveal>
          </h2>
          <FadeUp delay={0.3}>
            <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-white/35">
              You&apos;ll know exactly what happens after you say yes.
            </p>
          </FadeUp>
        </div>

        <div ref={ref} className="relative mt-16">
          {/* Animated progress line */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-white/[0.04] md:block">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="h-full w-full origin-top bg-gradient-to-b from-white/30 to-white/5"
            />
          </div>

          <div className="space-y-4 md:space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_OUT }}
                className="group relative"
              >
                <div className="glass rounded-2xl p-7 transition-all duration-500 hover:bg-white/[0.05] md:ml-20">
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute left-[26px] top-9 hidden h-3 w-3 rounded-full border-2 border-white/20 bg-black md:block"
                  >
                    <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.div>

                  <div className="flex items-start gap-5">
                    <span className="text-[clamp(1.2rem,2vw,1.5rem)] font-semibold text-white/[0.06] transition-colors duration-500 group-hover:text-white/[0.12]">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-[17px] font-semibold text-white/80 transition-colors duration-300 group-hover:text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-white/30 transition-colors duration-300 group-hover:text-white/45">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
