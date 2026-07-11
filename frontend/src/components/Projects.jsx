import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND_URL;

const accentMap = {
  primary: { color: "#39FF14", shadow: "rgba(57,255,20,0.45)" },
  accent: { color: "#FF00FF", shadow: "rgba(255,0,255,0.45)" },
  secondary: { color: "#7B2CBF", shadow: "rgba(123,44,191,0.55)" },
};

const projectImages = [
  "https://images.unsplash.com/photo-1580529352988-5236c86b9439",
  "https://images.unsplash.com/photo-1659040456574-8c10cadc1dd8",
  "https://images.pexels.com/photos/15680091/pexels-photo-15680091.jpeg",
  "https://images.pexels.com/photos/13594333/pexels-photo-13594333.jpeg",
  "https://images.unsplash.com/photo-1614851099511-773084f6911d",
  "https://images.unsplash.com/photo-1633493702341-4d04841df53b",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [maxTranslate, setMaxTranslate] = useState(0);

  useEffect(() => {
    axios
      .get(`${BACKEND}/api/projects`)
      .then((res) => setProjects(res.data || []))
      .catch(() => setProjects([]));
  }, []);

  useEffect(() => {
    const compute = () => {
      if (!trackRef.current) return;
      const cards = trackRef.current.querySelectorAll(
        "[data-testid^=project-card-]"
      );
      if (cards.length === 0) return;
      // Sum card widths + gaps by measuring first/last card positions
      const first = cards[0].getBoundingClientRect();
      const last = cards[cards.length - 1].getBoundingClientRect();
      // Current on-screen span (before any translation)
      const currentTx = new DOMMatrixReadOnly(
        getComputedStyle(trackRef.current).transform
      ).m41;
      // Un-translated left of first card:
      const firstLeft = first.left - currentTx;
      const lastRight = last.right - currentTx;
      const contentSpan = lastRight - firstLeft;
      const viewport = window.innerWidth;
      // Leave one card-width of trailing breathing room so the last card
      // finishes comfortably inside the viewport, not glued to the edge.
      const trailing = Math.min(200, viewport * 0.15);
      const overflow = contentSpan - viewport + firstLeft + trailing;
      setMaxTranslate(Math.max(0, overflow));
    };
    compute();
    const t1 = setTimeout(compute, 200);
    const t2 = setTimeout(compute, 600);
    window.addEventListener("resize", compute);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", compute);
    };
  }, [projects]);

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);
  // No spring — direct 1:1 scroll → translate so cards finish translating
  // exactly when the section un-pins. Otherwise the last cards get skipped.
  const x = rawX;

  // Section height: viewport + maxTranslate → each pixel of vertical scroll
  // becomes exactly one pixel of horizontal translation while the section is
  // pinned. Once maxTranslate has been consumed, the page continues scrolling
  // downward into the next section.
  const sectionHeight =
    maxTranslate > 0 ? `calc(100vh + ${maxTranslate}px)` : "100vh";

  return (
    <section
      ref={containerRef}
      id="projects"
      data-testid="projects-section"
      className="relative w-full"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <div className="px-6 md:px-16 mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#FF00FF] mb-4">
            /02 — Selected Works
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter">
              Things I&apos;ve <span className="text-[#39FF14]">shipped.</span>
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-white/50 max-w-xs">
              Curated to only ⭑ starred repositories · {projects.length} of many
            </p>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 md:gap-8 px-6 md:px-16 will-change-transform"
        >
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              image={projectImages[i % projectImages.length]}
              index={i}
            />
          ))}
          {projects.length === 0 && (
            <div className="text-white/40 font-mono text-sm">
              Loading projects...
            </div>
          )}
        </motion.div>

        <div className="px-6 md:px-16 mt-8 flex items-center gap-2 text-white/40 font-mono text-xs uppercase tracking-widest">
          <span>{maxTranslate > 0 ? "scroll" : "hover"}</span>
          <span className="w-8 h-px bg-white/20" />
          <span>{maxTranslate > 0 ? "to reveal" : "to explore"}</span>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, image, index }) {
  const accent = accentMap[project.accent] || accentMap.primary;
  const [hover, setHover] = useState(false);

  return (
    <motion.a
      href={project.homepage || project.html_url}
      target="_blank"
      rel="noreferrer noopener"
      data-testid={`project-card-${project.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative shrink-0 w-[320px] md:w-[560px] aspect-[3/4] rounded-2xl overflow-hidden glass group cursor-pointer"
      style={{
        transition:
          "border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease",
        borderColor: hover ? accent.color : "rgba(255,255,255,0.1)",
        boxShadow: hover ? `0 0 60px ${accent.shadow}` : "none",
        transform: hover ? "translateY(-8px)" : "translateY(0)",
      }}
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={project.name}
          loading="lazy"
          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
          style={{
            filter: hover
              ? "saturate(1.6) hue-rotate(0deg)"
              : "saturate(0.4) hue-rotate(-20deg)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 30%, ${
              hover ? accent.color + "22" : "rgba(13,13,17,0.85)"
            } 100%)`,
            transition: "background 0.4s ease",
          }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
        <div className="flex items-start justify-between">
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: accent.color }}
          >
            /0{index + 1}
          </span>
          <ArrowUpRight
            size={20}
            style={{
              color: hover ? accent.color : "#fff",
              transform: hover ? "translate(4px,-4px)" : "translate(0,0)",
              transition: "transform 0.3s ease, color 0.3s ease",
            }}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            {project.language && (
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 border border-white/20 rounded-full px-2 py-0.5">
                {project.language}
              </span>
            )}
            {project.stars > 0 && (
              <span className="flex items-center gap-1 font-mono text-[10px] text-white/60">
                <Star size={10} fill="#39FF14" stroke="#39FF14" /> {project.stars}
              </span>
            )}
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 tracking-tight">
            {project.name}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed line-clamp-4">
            {project.description}
          </p>
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] uppercase tracking-widest text-white/50"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  );
}
