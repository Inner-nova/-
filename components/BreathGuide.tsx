"use client";

import { useEffect, useState } from "react";

// 4초 들이쉬기 · 2초 머물기 · 4초 내쉬기 (총 10초 주기)
const PHASES = [
  { key: "inhale", ms: 4000 },
  { key: "hold", ms: 2000 },
  { key: "exhale", ms: 4000 },
] as const;

type Labels = { inhale: string; hold: string; exhale: string; start: string; stop: string };

export function BreathGuide({ labels }: { labels: Labels }) {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setPhase((p) => (p + 1) % PHASES.length), PHASES[phase].ms);
    return () => clearTimeout(t);
  }, [running, phase]);

  const current = PHASES[phase].key;
  const scale = !running ? 0.62 : current === "exhale" ? 0.55 : 1;

  return (
    <div className="night flex flex-col items-center overflow-hidden rounded-[26px] px-6 py-12">
      <div className="relative flex h-60 w-60 items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-gold-light/30" />
        <div className="absolute inset-6 rounded-full border border-white/10" />
        <div
          className="absolute inset-5 rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(255,240,215,0.95),rgba(190,160,235,0.55)_45%,rgba(120,80,190,0.15)_75%)] shadow-[0_0_60px_rgba(200,170,255,0.35)]"
          style={{
            transform: `scale(${scale})`,
            transition: `transform ${running ? PHASES[phase].ms : 600}ms ease-in-out`,
          }}
        />
        <span className="relative font-serif text-[22px] font-semibold text-night" aria-live="polite">
          {running ? labels[current] : ""}
        </span>
      </div>
      <button
        type="button"
        onClick={() => {
          setPhase(0);
          setRunning((r) => !r);
        }}
        className="btn-ghost-dark mt-8"
      >
        {running ? labels.stop : labels.start}
      </button>
    </div>
  );
}
