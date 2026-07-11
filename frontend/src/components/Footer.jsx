import React from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const marqueeItems = [
  "AI SYSTEMS",
  "FULL-STACK",
  "REACT",
  "FASTAPI",
  "TYPESCRIPT",
  "3D INTERFACES",
  "ACCESSIBILITY",
  "DESIGN ENGINEERING",
];

export default function Footer() {
  return (
    <footer
      className="relative w-full border-t border-white/10 mt-10 overflow-hidden"
      data-testid="site-footer"
    >
      <div className="whitespace-nowrap py-6 overflow-hidden">
        <div className="inline-flex gap-16 marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="font-display text-3xl md:text-5xl font-black tracking-tighter text-white/10 hover:text-[#39FF14] transition-colors"
            >
              {item} <span className="text-[#7B2CBF]">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-16 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/5">
        <div>
          <p className="font-display text-xl font-bold">
            SUHAS<span className="text-[#39FF14]">.</span>SK
          </p>
          <p className="font-mono text-xs text-white/40 mt-1">
            © {new Date().getFullYear()} — Built with obsession & caffeine
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="mailto:suhaskattimanisk@gmail.com"
            className="text-white/50 hover:text-[#39FF14] transition-colors"
            data-testid="footer-email"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://github.com/SuhasReturn"
            target="_blank"
            rel="noreferrer noopener"
            className="text-white/50 hover:text-[#39FF14] transition-colors"
            data-testid="footer-github"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/suhas-sk/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-white/50 hover:text-[#39FF14] transition-colors"
            data-testid="footer-linkedin"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://x.com/SuhasSk256993"
            target="_blank"
            rel="noreferrer noopener"
            className="text-white/50 hover:text-[#39FF14] transition-colors"
            data-testid="footer-twitter"
          >
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
