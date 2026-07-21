import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Ambient audio toggle (visual only per user choice).
 * Kept as a decorative floating control; when "on", we boost the CSS animation
 * speed of the background particles via a data attribute on <html>.
 */
export default function AudioToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.ambient = on ? "on" : "off";
  }, [on]);

  return (
    <button
      type="button"
      data-testid="audio-toggle"
      aria-pressed={on}
      aria-label={on ? "Disable ambient mode" : "Enable ambient mode"}
      onClick={() => setOn((v) => !v)}
      className="fixed bottom-6 right-6 z-40 glass rounded-full w-12 h-12 flex items-center justify-center hover:border-[#39FF14]/60 hover:text-[#39FF14] text-white/70"
      style={{ transition: "color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease", boxShadow: on ? "0 0 24px rgba(57,255,20,0.35)" : "none" }}
    >
      {on ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}
