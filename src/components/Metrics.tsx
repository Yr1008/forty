"use client";

import { GlassCard, AnimatedCounter, FadeUp } from "./motion";

const metrics = [
  { target: 40, prefix: "", suffix: "+", label: "Brands Scaled", sub: "Across 6 countries" },
  { target: 36, prefix: "", suffix: "%", label: "Avg. Cost Reduction", sub: "On ad spend" },
  { target: 40, prefix: "", suffix: "%", label: "Brand Awareness Lift", sub: "Proven & measured" },
];

export default function Metrics() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1000px] px-6">
        <GlassCard glowBorder className="px-8 py-16 sm:px-16">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {metrics.map((m, i) => (
              <FadeUp key={m.label} delay={i * 0.12} className="text-center">
                <div className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-tight text-white">
                  <AnimatedCounter target={m.target} prefix={m.prefix} suffix={m.suffix} />
                </div>
                <p className="mt-2 text-[14px] font-medium text-white/50">{m.label}</p>
                <p className="mt-0.5 text-[12px] text-white/20">{m.sub}</p>
              </FadeUp>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
