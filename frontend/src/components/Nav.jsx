import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About", testId: "nav-about" },
  { href: "#projects", label: "Work", testId: "nav-projects" },
  { href: "#contact", label: "Contact", testId: "nav-contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-10 py-4 flex items-center justify-between ${
          scrolled ? "glass" : ""
        }`}
        data-testid="main-nav"
      >
        <a
          href="#top"
          className="font-display font-black text-lg tracking-tighter"
          data-testid="nav-logo"
        >
          SUHAS<span className="text-[#39FF14]">.</span>SK
          <span className="blink text-[#39FF14]">_</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={l.testId}
              className="font-mono text-xs uppercase tracking-[0.3em] text-white/70 hover:text-[#39FF14] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            data-testid="nav-cta"
            className="font-mono text-xs uppercase tracking-[0.3em] px-4 py-2 rounded-full border border-white/20 hover:border-[#39FF14] hover:text-[#39FF14] transition-colors"
          >
            Hire Me
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-white/80"
          onClick={() => setOpen(true)}
          data-testid="nav-menu-open"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0d0d11]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
            data-testid="mobile-menu"
          >
            <button
              type="button"
              className="absolute top-6 right-6 text-white/80"
              onClick={() => setOpen(false)}
              data-testid="nav-menu-close"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-bold hover:text-[#39FF14] transition-colors"
                data-testid={`mobile-${l.testId}`}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
