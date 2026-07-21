import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const experience = [
  {
    date: "Jul 2024 — Sep 2024",
    title: "Frontend Web Developer",
    details: "CodeVertex · Pune, Maharashtra",
    description:
      "Built responsive user-centric web interfaces and shipped production frontend features. Sharpened HTML, CSS, and JavaScript craft under real product constraints.",
  },
];

const education = [
  {
    date: "Sep 2023 — Jul 2027",
    title: "B.Tech, Information Science & Engineering",
    details: "Presidency University · Bengaluru",
    description:
      "Core focus: Java, Data Structures & Algorithms, and modern web engineering. Currently in final year — Class of 2027.",
  },
  {
    date: "Jun 2021 — Jul 2023",
    title: "Pre-University (12th)",
    details: "Davangere",
    description:
      "Science stream foundation — Physics, Chemistry, Mathematics.",
  },
  {
    date: "Jun 2017 — Jul 2021",
    title: "SSLC (10th)",
    details: "Kariganuru",
    description:
      "Early schooling with strong academic and problem-solving focus.",
  },
];

const certifications = [
  {
    date: "Jul 2025",
    title: "Deloitte Australia — Technology Job Simulation",
    details: "Forage · Online",
    description:
      "Hands-on virtual experience simulating real Deloitte technology consulting workflows.",
  },
];

function TimelineCard({ item, accentColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6 mb-4"
    >
      <span
        className="font-mono text-[11px] uppercase tracking-widest"
        style={{ color: accentColor }}
      >
        {item.date}
      </span>
      <h4 className="font-display text-lg font-bold mt-2 mb-1">
        {item.title}
      </h4>
      <p className="font-mono text-xs text-white/50 mb-3">{item.details}</p>
      <p className="text-white/60 text-sm leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  );
}

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
          className="mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#39FF14] mb-4">
            /03 — Journey
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter max-w-4xl">
            The path{" "}
            <span className="text-[#39FF14]">so far.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Experience Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="glass w-10 h-10 rounded-full flex items-center justify-center">
                <Briefcase size={18} className="text-[#39FF14]" />
              </span>
              <span className="font-display text-lg font-bold">Experience</span>
            </motion.div>
            {experience.map((item, i) => (
              <TimelineCard
                key={i}
                item={item}
                accentColor="#39FF14"
              />
            ))}
          </div>

          {/* Education Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="glass w-10 h-10 rounded-full flex items-center justify-center">
                <GraduationCap size={18} className="text-[#7B2CBF]" />
              </span>
              <span className="font-display text-lg font-bold">Education</span>
            </motion.div>
            {education.map((item, i) => (
              <TimelineCard
                key={i}
                item={item}
                accentColor="#7B2CBF"
              />
            ))}
          </div>

          {/* Certifications Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="glass w-10 h-10 rounded-full flex items-center justify-center">
                <Award size={18} className="text-[#7B2CBF]" />
              </span>
              <span className="font-display text-lg font-bold">Certifications</span>
            </motion.div>
            {certifications.map((item, i) => (
              <TimelineCard
                key={i}
                item={item}
                accentColor="#7B2CBF"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
