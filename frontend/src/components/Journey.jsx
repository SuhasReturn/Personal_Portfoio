import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const experience = [
  {
    role: "Frontend Web Developer",
    org: "CodeVertex",
    place: "Pune, Maharashtra",
    period: "Jul 2024 — Sep 2024",
    body: "Built responsive user-centric web interfaces and shipped production frontend features. Sharpened HTML, CSS, and JavaScript craft under real product constraints.",
  },
];

const education = [
  {
    role: "B.Tech, Information Science & Engineering",
    org: "Presidency University",
    place: "Bengaluru",
    period: "Sep 2023 — Jul 2027",
    body: "Core focus: Java, Data Structures & Algorithms, and modern web engineering. Currently in final year — Class of 2027.",
  },
  {
    role: "Pre-University (12th)",
    org: "Vignaan Integrated PU College",
    place: "Davangere",
    period: "Jun 2021 — Jul 2023",
    body: "Science stream foundation — Physics, Chemistry, Mathematics.",
  },
  {
    role: "SSLC (10th)",
    org: "Morarji Desai Model Residential School",
    place: "Kariganuru",
    period: "Jun 2017 — Jul 2021",
    body: "Early schooling with strong academic and problem-solving focus.",
  },
];

const certs = [
  {
    role: "Deloitte Australia — Technology Job Simulation",
    org: "Forage",
    place: "Online",
    period: "Jul 2025",
    body: "Hands-on virtual experience simulating real Deloitte technology consulting workflows.",
  },
];

export default function Journey() {
  return (
    <section
      id="journey"
      data-testid="journey-section"
      className="relative w-full px-6 md:px-16 py-32"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#7B2CBF] mb-4">
            /03 — Journey
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter max-w-4xl">
            The path so <span className="text-[#39FF14]">far.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Column
            title="Experience"
            icon={Briefcase}
            color="#39FF14"
            items={experience}
            span="lg:col-span-4"
            testId="journey-experience"
          />
          <Column
            title="Education"
            icon={GraduationCap}
            color="#FF00FF"
            items={education}
            span="lg:col-span-5"
            testId="journey-education"
          />
          <Column
            title="Certifications"
            icon={Award}
            color="#7B2CBF"
            items={certs}
            span="lg:col-span-3"
            testId="journey-certifications"
          />
        </div>
      </div>
    </section>
  );
}

function Column({ title, icon: Icon, color, items, span, testId }) {
  return (
    <div className={`${span}`} data-testid={testId}>
      <div className="flex items-center gap-3 mb-6">
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center border"
          style={{ borderColor: color + "80", color }}
        >
          <Icon size={16} />
        </span>
        <h3 className="font-display text-xl font-bold tracking-tight">{title}</h3>
      </div>
      <div className="space-y-4">
        {items.map((it, i) => (
          <motion.div
            key={`${it.role}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass rounded-xl p-5 relative overflow-hidden group"
            data-testid={`journey-item-${testId}-${i}`}
          >
            <div
              className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
              style={{ background: color }}
            />
            <p
              className="font-mono text-[10px] uppercase tracking-widest mb-1"
              style={{ color }}
            >
              {it.period}
            </p>
            <p className="font-display text-lg font-bold leading-snug mb-1">
              {it.role}
            </p>
            <p className="text-white/60 text-sm mb-2">
              {it.org} · <span className="text-white/40">{it.place}</span>
            </p>
            <p className="text-white/60 text-sm leading-relaxed">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
