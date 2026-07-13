import React from "react";
import { motion } from "framer-motion";

const groups = [
  {
    label: "Languages",
    color: "#39FF14",
    items: ["Java", "JavaScript", "TypeScript", "Python", "MATLAB"],
    span: "md:col-span-5",
    testId: "toolkit-languages",
  },
  {
    label: "Frontend",
    color: "#FF00FF",
    items: ["React", "HTML5", "CSS3", "Tailwind", "Framer Motion"],
    span: "md:col-span-4",
    testId: "toolkit-frontend",
  },
  {
    label: "Foundations",
    color: "#7B2CBF",
    items: ["DSA", "OOP", "System Design", "Git", "REST"],
    span: "md:col-span-3",
    testId: "toolkit-foundations",
  },
  {
    label: "Exploring",
    color: "#39FF14",
    items: ["AI Agents", "LLM Tooling", "R3F", "FastAPI", "MongoDB"],
    span: "md:col-span-6",
    testId: "toolkit-exploring",
  },
  {
    label: "Tools",
    color: "#FF00FF",
    items: ["VS Code", "Vercel", "GitHub", "Figma", "Postman"],
    span: "md:col-span-6",
    testId: "toolkit-tools",
  },
];

export default function Toolkit() {
  return (
    <section
      id="toolkit"
      data-testid="toolkit-section"
      className="relative w-full px-6 md:px-16 py-24"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-3"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#39FF14] mb-3">
              /01.5 — Toolkit
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tighter">
              The stack I <span className="text-[#FF00FF]">reach for.</span>
            </h3>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-white/40 max-w-xs">
            Sharpened through DSA reps, side projects, and one very
            good internship
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {groups.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`glass rounded-xl p-5 ${g.span} relative overflow-hidden group`}
              data-testid={g.testId}
            >
              <div
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-15 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: g.color }}
              />
              <p
                className="font-mono text-[10px] uppercase tracking-[0.3em] mb-3 relative z-10"
                style={{ color: g.color }}
              >
                {g.label}
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {g.items.map((it) => (
                  <span
                    key={it}
                    data-testid={`${g.testId}-chip-${it.toLowerCase().replace(/\s+/g, "-")}`}
                    className="font-mono text-xs px-3 py-1 rounded-full border border-white/15 text-white/80 hover:border-white/50 hover:text-white transition-colors cursor-default"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
