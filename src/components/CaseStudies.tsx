"use client";

import { motion } from "framer-motion";
import { FadeUp, TextReveal, GlassCard } from "./motion";

const caseStudies = [
  {
    client: "Luxury Eyewear Brand",
    region: "Europe",
    metric: "40%",
    metricLabel: "brand awareness lift",
    description: "Optimized media spends across social platforms — higher conversions, zero additional cost. Pure efficiency.",
    tags: ["Performance", "Social"],
  },
  {
    client: "AI SaaS Startup",
    region: "London",
    metric: "36%",
    metricLabel: "lower acquisition cost",
    description: "Restructured their entire creative and ad strategy. New users kept flowing — at a fraction of the old cost.",
    tags: ["Ads", "Creative"],
  },
  {
    client: "AI Travel Startup",
    region: "India",
    metric: "Funded",
    metricLabel: "after our brand overhaul",
    description: "From pitch deck to website to brand identity — we built the story that convinced investors to write the check.",
    tags: ["Branding", "UI/UX"],
  },
  {
    client: "Pichwai Art Business",
    region: "Global",
    metric: "Global",
    metricLabel: "reach achieved",
    description: "Took an authentic local art business and gave it a global presence. Brand, ads, product listings — everything, reimagined.",
    tags: ["Brand", "Performance"],
  },
  {
    client: "Luxury Real Estate",
    region: "India",
    metric: "HNI",
    metricLabel: "clients acquired",
    description: "Surgical LinkedIn campaigns targeting ultra-high-net-worth individuals for luxury properties across India.",
    tags: ["Lead Gen", "LinkedIn"],
  },
  {
    client: "Health Brand Launch",
    region: "India",
    metric: "Viral",
    metricLabel: "campaign launch",
    description: "Directed an influencer video campaign with a major athlete. Product awareness from zero to everywhere, overnight.",
    tags: ["Influencer", "Video"],
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[15%] top-[30%] h-[500px] w-[500px] rounded-full bg-white/[0.012] blur-[120px] animate-float-1" />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-6">
        <FadeUp className="text-center">
          <p className="mb-5 text-[11px] uppercase tracking-[0.25em] text-white/20">
            Our Work
          </p>
        </FadeUp>

        <div className="text-center">
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            <TextReveal>Every project, a proof point.</TextReveal>
          </h2>
          <FadeUp delay={0.3}>
            <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-white/35">
              From funded startups to global brands — we don&apos;t promise results,
              we show receipts.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <GlassCard key={study.client} delay={0.1 + i * 0.08} className="group p-7 hover:bg-white/[0.05] transition-colors duration-500">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/15">
                  {study.client}
                </span>
                <span className="rounded-full border border-white/[0.05] px-2 py-0.5 text-[9px] tracking-wider text-white/15">
                  {study.region}
                </span>
              </div>

              <motion.div
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="flex items-baseline gap-2"
              >
                <span className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold tracking-tight text-white transition-all duration-500 group-hover:text-white">
                  {study.metric}
                </span>
                <span className="text-[12px] text-white/25 transition-colors duration-500 group-hover:text-white/40">
                  {study.metricLabel}
                </span>
              </motion.div>

              <p className="mt-3 text-[13px] leading-relaxed text-white/30 transition-colors duration-500 group-hover:text-white/50">
                {study.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.04] px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
