"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { EASE_OUT } from "./motion";

const footerLinks = {
  Services: [
    { label: "Content Creation", href: "#services" },
    { label: "Brand Strategy", href: "#services" },
    { label: "Website & UI/UX", href: "#services" },
    { label: "Ad Campaigns", href: "#services" },
    { label: "Lead Gen & CRO", href: "#services" },
    { label: "SEO & Analytics", href: "#services" },
  ],
  Company: [
    { label: "About", href: "#founders" },
    { label: "Our Work", href: "#case-studies" },
    { label: "Process", href: "#process" },
  ],
  Connect: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/create.forty/" },
    { label: "Instagram", href: "https://www.instagram.com/create.forty" },
    { label: "reachout2forty@gmail.com", href: "mailto:reachout2forty@gmail.com" },
  ],
};

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: EASE_OUT }}
      className="border-t border-white/[0.04]"
    >
      <div className="mx-auto max-w-[1100px] px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2.5"
            >
              <Image
                src="/logo-white.png"
                alt="Forty"
                width={24}
                height={24}
                className="h-6 w-6 opacity-70"
              />
              <span className="text-[14px] font-semibold tracking-tight text-white/70">
                Forty
              </span>
            </motion.div>
            <p className="mt-4 max-w-[200px] text-[12px] leading-relaxed text-white/20">
              Creative + Growth Hacking by two ex-Googlers. Bold ideas. Real growth.
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="text-[10px] tracking-wider text-white/15">Delhi</span>
              <span className="text-white/[0.06]">&middot;</span>
              <span className="text-[10px] tracking-wider text-white/15">New York</span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links], gi) => (
            <div key={group}>
              <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/15">
                {group}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((link, li) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.1 + li * 0.04, duration: 0.5 }}
                  >
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[12px] text-white/25 transition-colors duration-300 hover:text-white/60"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="gradient-line mt-12" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[10px] text-white/10">
            &copy; {new Date().getFullYear()} Forty. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] text-white/10 transition-colors duration-300 hover:text-white/25">
              Privacy
            </a>
            <a href="#" className="text-[10px] text-white/10 transition-colors duration-300 hover:text-white/25">
              Terms
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
