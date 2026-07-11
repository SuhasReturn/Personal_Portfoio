import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import AvatarScene from "@/components/AvatarScene";

export default function Hero() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const wrapRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // normalize -1..1
      mouseRef.current.x = (e.clientX / w) * 2 - 1;
      mouseRef.current.y = -((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={wrapRef}
      data-testid="hero-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* faint grid */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* status pill */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="glass rounded-full px-4 py-1.5 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/80"
        data-testid="hero-status-pill"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]" />
        </span>
        Available for freelance & full-time
      </motion.div>

      {/* 3D avatar container */}
      <div
        className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] mt-10 mb-8"
        data-testid="hero-avatar"
      >
        <div className="absolute inset-0 rounded-full blur-3xl bg-[#7B2CBF]/30" />
        <div className="absolute inset-0">
          <AvatarScene mouseRef={mouseRef} />
        </div>
      </div>

      {/* Name + title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-center leading-[0.95] tracking-tighter"
        data-testid="hero-name"
      >
        SUHAS <span className="text-[#39FF14]">SK</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-6 text-white/70 text-center max-w-2xl text-base md:text-lg font-mono"
        data-testid="hero-tagline"
      >
        Full-stack engineer & AI systems builder — crafting adaptive interfaces,
        <span className="text-[#FF00FF]"> cognitive agents</span>, and
        <span className="text-[#39FF14]"> immersive product experiences</span>.
      </motion.p>

      {/* Social row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.6 }}
        className="mt-10 flex items-center gap-3"
      >
        <SocialLink
          href="https://github.com/SuhasReturn"
          label="GitHub"
          testId="social-github"
        >
          <Github size={16} />
        </SocialLink>
        <SocialLink
          href="https://www.linkedin.com/in/suhas-sk/"
          label="LinkedIn"
          testId="social-linkedin"
        >
          <Linkedin size={16} />
        </SocialLink>
        <SocialLink
          href="https://x.com/SuhasSk256993"
          label="Twitter"
          testId="social-twitter"
        >
          <Twitter size={16} />
        </SocialLink>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 flex flex-col items-center gap-2 text-white/40 text-xs font-mono uppercase tracking-widest"
      >
        <span>scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function SocialLink({ href, label, children, testId }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      data-testid={testId}
      aria-label={label}
      className="glass rounded-full px-4 py-2 flex items-center gap-2 text-sm text-white/80 hover:text-[#39FF14] hover:border-[#39FF14]/50 transition-colors duration-300"
      style={{ transitionProperty: "color, border-color, box-shadow" }}
    >
      {children}
      <span className="font-mono text-xs">{label}</span>
    </a>
  );
}
