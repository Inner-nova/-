import type { LessonType } from "@/lib/content";

export function LessonIcon({ type }: { type: LessonType }) {
  const common = { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": true };
  if (type === "video")
    return (
      <svg {...common}>
        <rect x="1.5" y="3" width="13" height="10" rx="2" />
        <path d="M6.5 6v4l3.5-2z" fill="currentColor" stroke="none" />
      </svg>
    );
  if (type === "practice")
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="6" />
        <circle cx="8" cy="8" r="2.5" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M2 3.5h5a1 1 0 0 1 1 1V13a1.5 1.5 0 0 0-1.5-1.5H2zM14 3.5H9a1 1 0 0 0-1 1V13a1.5 1.5 0 0 1 1.5-1.5H14z" />
    </svg>
  );
}
