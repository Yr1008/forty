"use client";

import { motion } from "framer-motion";
import { FadeUp, EASE_OUT } from "./motion";

const partners = [
  "Google", "Pichwai Art", "GenX Estate", "AI Travel", "Luxury Eyewear",
  "Health Brand", "AI SaaS", "Real Estate",
];

export default function SocialProof() {
  return (
    <section className="relative py-20">
      <FadeUp>
        <div className="gradient-line mx-auto max-w-[600px]" />
      </FadeUp>

      <div className="mt-14">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="text-center text-[11px] uppercase tracking-[0.25em] text-white/20"
        >
          Trusted by brands across industries
        </motion.p>

        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-black to-transparent" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="flex animate-scroll-left"
          >
            {[...partners, ...partners, ...partners].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="group flex shrink-0 items-center px-12"
              >
                <span className="whitespace-nowrap text-[16px] font-medium tracking-[0.1em] text-white/[0.08] transition-all duration-700 group-hover:text-white/20">
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
