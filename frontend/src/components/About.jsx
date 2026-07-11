import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Code2, Brain, Compass } from "lucide-react";

const cards = [
  {
    icon: Brain,
    title: "AI Agents & LLM Systems",
    body: "Behind VidyaGuide (personalized AI tutor) and Cognitive Chatbot — I build context-aware conversational agents with layered memory, retrieval pipelines, and intent modeling.",
    color: "#39FF14",
    span: "md:col-span-7",
    testId: "about-card-ai",
  },
  {
    icon: Code2,
    title: "Full-Stack Craft",
    body: "FlowCell (visual pipeline orchestration) and MoneyMap (personal finance viz) shipped end-to-end. TypeScript, React, FastAPI, Node — obsessed with interaction detail and clean data flow.",
    color: "#FF00FF",
    span: "md:col-span-5",
    testId: "about-card-fullstack",
  },
  {
    icon: Compass,
    title: "Adaptive & Accessible UX",
    body: "Neuro-Diverse Adaptive AI reshapes web interfaces for dyslexia, ADHD, and cognitive load — proving accessibility isn't a compromise, it's the sharpest design constraint.",
    color: "#7B2CBF",
    span: "md:col-span-5",
    testId: "about-card-human",
  },
  {
    icon: Sparkles,
    title: "Computer Vision & Research",
    body: "Fake Image Detection (forensic pixel analysis) and Visual Fatigue Analyzer (blink + gaze telemetry) — I love turning raw signal into decisions humans can trust.",
    color: "#39FF14",
    span: "md:col-span-7",
    testId: "about-card-play",
  },
];

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative min-h-screen w-full px-6 md:px-16 py-32"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#39FF14] mb-4">
            /01 — About
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter max-w-4xl">
            I engineer<br />
            <span className="text-white/40">interfaces that</span>{" "}
            <span className="text-[#FF00FF]">think back.</span>
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl">
            <p
              className="md:col-span-8 text-white/70 text-base md:text-lg leading-relaxed"
              data-testid="about-bio"
            >
              I&apos;m Suhas — an engineer working at the intersection of{" "}
              <span className="text-[#39FF14]">AI systems</span>,{" "}
              <span className="text-[#FF00FF]">adaptive UX</span>, and honest,
              well-crafted product engineering. I&apos;ve shipped AI tutors,
              cognitive chatbots, computer-vision research prototypes, and full
              production web apps — always with the same question in mind: how
              does this feel in a real human&apos;s hands?
            </p>
            <p className="md:col-span-4 text-white/50 text-sm leading-relaxed font-mono">
              Based in India · Available for freelance & full-time roles ·
              Currently exploring agentic systems, on-device inference, and
              accessibility-first design.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`glass rounded-2xl p-8 ${c.span} relative overflow-hidden group`}
              data-testid={c.testId}
            >
              <div
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                style={{ background: c.color }}
              />
              <c.icon
                size={28}
                style={{ color: c.color }}
                className="mb-6 relative z-10"
              />
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 relative z-10">
                {c.title}
              </h3>
              <p className="text-white/60 text-base leading-relaxed relative z-10">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bio stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { k: "12+", v: "Shipped Projects" },
            { k: "5+", v: "Years Building" },
            { k: "∞", v: "Curiosity Loops" },
            { k: "24/7", v: "Ideation Mode" },
          ].map((s) => (
            <div
              key={s.v}
              className="glass rounded-xl p-5"
              data-testid={`stat-${s.v.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="font-display text-4xl md:text-5xl font-black text-[#39FF14]">
                {s.k}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-white/50 mt-2">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
