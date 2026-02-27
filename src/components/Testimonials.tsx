"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FadeUp, EASE_OUT } from "./motion";

const testimonials = [
  {
    quote: "Forty redefined our brand and transformed our entire online presence. They took our local art business and made it global. The creative vision combined with performance expertise — it's unmatched.",
    name: "Founder",
    company: "Pichwai Art Brand",
  },
  {
    quote: "They didn't just build us a website — they crafted our entire story, our pitch, our identity. That work directly helped us secure funding. Forty operates like a true extension of your team.",
    name: "CEO",
    company: "AI Travel Startup",
  },
  {
    quote: "The LinkedIn campaigns Forty ran for our luxury projects were surgical. They understood our HNI audience and delivered leads we couldn't reach before. Precision marketing at its finest.",
    name: "Director of Marketing",
    company: "Luxury Real Estate Firm",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.01] blur-[140px] animate-float-3" />
      </div>

      <div className="relative mx-auto max-w-[800px] px-6">
        <FadeUp className="text-center">
          <p className="mb-5 text-[11px] uppercase tracking-[0.25em] text-white/20">
            In Their Words
          </p>
        </FadeUp>

        <div className="relative min-h-[280px] sm:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="text-center"
            >
              <svg className="mx-auto mb-8 h-8 w-8 text-white/[0.06]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>

              <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] leading-[1.6] text-white/50 font-light">
                &ldquo;{testimonials[active].quote}&rdquo;
              </p>

              <div className="mt-8">
                <p className="text-[14px] font-medium text-white/60">
                  {testimonials[active].name}
                </p>
                <p className="mt-0.5 text-[12px] text-white/20">
                  {testimonials[active].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="group relative h-1 w-8 overflow-hidden rounded-full bg-white/[0.06]"
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-white/40"
                initial={{ width: "0%" }}
                animate={{ width: active === i ? "100%" : "0%" }}
                transition={{ duration: active === i ? 6 : 0.3, ease: "linear" }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
