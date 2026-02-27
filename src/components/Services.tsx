"use client";

import { motion } from "framer-motion";
import { FadeUp, TextReveal, GlassCard } from "./motion";

const services = [
  {
    title: "Content Creation",
    description: "Social assets, short-form video, and podcasts engineered to stop the scroll and start conversations.",
    icon: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z",
    category: "creative",
  },
  {
    title: "Brand Strategy",
    description: "Identities and narratives that resonate — not just look good. We build brands people remember and trust.",
    icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
    category: "creative",
  },
  {
    title: "Website & UI/UX",
    description: "Interfaces that feel effortless. Optimized for conversion, designed for delight, built to scale.",
    icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
    category: "creative",
  },
  {
    title: "Ad Campaigns",
    description: "Data-driven campaigns across Google, Meta, and LinkedIn. Every dollar tracked, every result measured.",
    icon: "M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
    category: "performance",
  },
  {
    title: "Lead Gen & CRO",
    description: "High-quality leads, high-converting pages, and relentless A/B testing. We optimize until the math works.",
    icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
    category: "performance",
  },
  {
    title: "SEO & Analytics",
    description: "Rankings that climb, insights that clarify, and reports that actually help you make decisions.",
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    category: "performance",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 mesh-gradient opacity-50" />

      <div className="relative mx-auto max-w-[1100px] px-6">
        <FadeUp className="text-center">
          <p className="mb-5 text-[11px] uppercase tracking-[0.25em] text-white/20">
            What We Do
          </p>
        </FadeUp>

        <div className="text-center">
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            <TextReveal>Creative meets performance.</TextReveal>
          </h2>
          <FadeUp delay={0.3}>
            <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-white/35">
              Two disciplines. One team. Every solution crafted so your business
              isn&apos;t just seen — it&apos;s remembered.
            </p>
          </FadeUp>
        </div>

        {/* Creative Services */}
        <FadeUp delay={0.2} className="mt-16">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.04]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/15">Creative</span>
            <div className="h-px flex-1 bg-white/[0.04]" />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {services.filter(s => s.category === "creative").map((s, i) => (
            <GlassCard key={s.title} delay={0.15 + i * 0.1} className="group p-7">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-white/40 transition-colors duration-500 group-hover:text-white/80 group-hover:border-white/[0.12] group-hover:bg-white/[0.06]"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </motion.div>
              <h3 className="text-[16px] font-semibold text-white/90 transition-colors duration-300 group-hover:text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/30 transition-colors duration-300 group-hover:text-white/45">
                {s.description}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Performance Marketing */}
        <FadeUp delay={0.2} className="mt-10">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.04]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/15">Performance</span>
            <div className="h-px flex-1 bg-white/[0.04]" />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {services.filter(s => s.category === "performance").map((s, i) => (
            <GlassCard key={s.title} delay={0.15 + i * 0.1} className="group p-7">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-white/40 transition-colors duration-500 group-hover:text-white/80 group-hover:border-white/[0.12] group-hover:bg-white/[0.06]"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </motion.div>
              <h3 className="text-[16px] font-semibold text-white/90 transition-colors duration-300 group-hover:text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/30 transition-colors duration-300 group-hover:text-white/45">
                {s.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
