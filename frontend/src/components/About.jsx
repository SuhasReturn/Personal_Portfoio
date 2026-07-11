import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Code2, Brain, Compass } from "lucide-react";

const cards = [
  {
    icon: Brain,
    title: "AI Systems",
    body: "Building conversational agents, retrieval pipelines, and adaptive cognitive interfaces that respond to context — not just prompts.",
    color: "#39FF14",
    span: "md:col-span-7",
    testId: "about-card-ai",
  },
  {
    icon: Code2,
    title: "Full-Stack Craft",
    body: "TypeScript, React, FastAPI, Node. I ship end-to-end products with obsessive attention to interaction detail.",
    color: "#FF00FF",
    span: "md:col-span-5",
    testId: "about-card-fullstack",
  },
  {
    icon: Compass,
    title: "Human-Centered",
    body: "Neuro-diverse UX research, accessibility engineering, and interfaces that flex around real cognitive load.",
    color: "#7B2CBF",
    span: "md:col-span-5",
    testId: "about-card-human",
  },
  {
    icon: Sparkles,
    title: "Playful Systems",
    body: "I treat every product like a small universe — with physics, mood, and moments that reward curiosity.",
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
