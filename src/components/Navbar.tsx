"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { useScrollProgress, EASE_OUT } from "./motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#case-studies" },
  { label: "About", href: "#founders" },
  { label: "Process", href: "#process" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = useScrollProgress();

  useMotionValueEvent(progress, "change", (v) => {
    setScrolled(v > 0.01);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "glass-strong shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <motion.a
          href="#"
          className="flex items-center gap-2.5"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Image
            src="/logo-white.png"
            alt="Forty"
            width={30}
            height={30}
            className="h-[30px] w-[30px] opacity-90"
          />
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Forty
          </span>
        </motion.a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.08, duration: 0.5, ease: EASE_OUT }}
              className="group relative px-4 py-2 text-[13px] tracking-wide text-white/50 transition-colors duration-300 hover:text-white"
            >
              {link.label}
              <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-white/40 transition-all duration-300 group-hover:w-4" />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5, ease: EASE_OUT }}
          className="hidden md:block"
        >
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.96 }}
            className="glass inline-flex items-center rounded-full px-5 py-2 text-[13px] font-medium text-white/90 transition-colors duration-300"
          >
            Let&apos;s Talk
          </motion.a>
        </motion.div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative flex h-8 w-8 items-center justify-center md:hidden"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
            className="absolute block h-px w-5 bg-white"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="absolute block h-px w-5 bg-white"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
            className="absolute block h-px w-5 bg-white"
          />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
            exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="glass-strong overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="rounded-lg px-4 py-3 text-[15px] text-white/60 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
