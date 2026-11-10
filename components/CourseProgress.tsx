"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";

export function ProgressBar({ value, light = false }: { value: number; light?: boolean }) {
  return (
    <div
      className={`h-1.5 w-full overflow-hidden rounded-full ${light ? "bg-white/25" : "bg-line"}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={`h-full rounded-full ${light ? "bg-white" : "bg-gold"} transition-all`} style={{ width: `${value}%` }} />
    </div>
  );
}

export function CourseActions({
  courseSlug,
  lessonIds,
  basePath,
  labels,
}: {
  courseSlug: string;
  lessonIds: string[];
  basePath: string;
  labels: { start: string; continue: string; progress: string };
}) {
  const { progress } = useProgress();
  const entry = progress[courseSlug];
  const done = entry?.done.filter((id) => lessonIds.includes(id)).length ?? 0;
  const pct = Math.round((done / lessonIds.length) * 100);
  const started = !!entry && (done > 0 || !!entry.last);
  const target = entry?.last && lessonIds.includes(entry.last) ? entry.last : lessonIds.find((id) => !entry?.done.includes(id)) ?? lessonIds[0];

  return (
    <div className="flex flex-wrap items-center gap-6">
      <Link
        href={`${basePath}/learn/${started ? target : lessonIds[0]}`}
        className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-soft"
      >
        {started ? labels.continue : labels.start}
      </Link>
      {started && (
        <div className="w-48 text-sm text-white/90">
          <div className="mb-1.5 flex justify-between">
            <span>{labels.progress}</span>
            <span>{pct}%</span>
          </div>
          <ProgressBar value={pct} light />
        </div>
      )}
    </div>
  );
}

export function LessonCheck({ courseSlug, lessonId }: { courseSlug: string; lessonId: string }) {
  const { progress } = useProgress();
  const done = progress[courseSlug]?.done.includes(lessonId);
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${
        done ? "border-sage bg-sage text-white" : "border-line"
      }`}
      aria-label={done ? "done" : undefined}
    >
      {done ? "✓" : ""}
    </span>
  );
}
