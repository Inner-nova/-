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
  const scale = !running ? 0.6 : current === "exhale" ? 0.55 : 1;

  return (
    <div className="flex flex-col items-center rounded-2xl border border-line bg-paper px-6 py-10">
      <div className="relative flex h-56 w-56 items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-gold/30" />
        <div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-gold-soft via-paper to-sage/30 shadow-inner"
          style={{
            transform: `scale(${scale})`,
            transition: `transform ${running ? PHASES[phase].ms : 600}ms ease-in-out`,
          }}
        />
        <span className="relative font-serif text-lg" aria-live="polite">
          {running ? labels[current] : ""}
        </span>
      </div>
      <button
        type="button"
        onClick={() => {
          setPhase(0);
          setRunning((r) => !r);
        }}
        className="mt-6 rounded-full border border-ink/20 px-5 py-2 text-sm font-medium transition hover:border-gold"
      >
        {running ? labels.stop : labels.start}
      </button>
    </div>
  );
}
