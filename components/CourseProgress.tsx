"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { fill } from "@/lib/i18n";
import { ArrowIcon, CheckIcon } from "./Icons";

/** 원형 진도 링: 금빛 호가 차오르고, 다 차면 체크 표시 */
export function ProgressRing({ value, size = 48, dark = false }: { value: number; size?: number; dark?: boolean }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  const done = value >= 100;
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${value}%`}
    >
      <svg viewBox="0 0 48 48" width={size} height={size} className="-rotate-90">
        <circle cx="24" cy="24" r={r} fill="none" stroke={dark ? "rgba(255,255,255,0.15)" : "var(--color-line)"} strokeWidth="2.5" />
        <circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center text-[11px] font-semibold tabular-nums ${
          dark ? "text-gold-light" : "text-ink"
        }`}
      >
        {done ? <CheckIcon size={size * 0.38} strokeWidth={2.4} className="text-gold" /> : `${value}%`}
      </span>
    </span>
  );
}

function nextLesson(lessonIds: string[], done: string[], last?: string) {
  if (last && lessonIds.includes(last) && !done.includes(last)) return last;
  return lessonIds.find((id) => !done.includes(id)) ?? lessonIds[0];
}

export function useCourseState(courseSlug: string, lessonIds: string[]) {
  const { progress } = useProgress();
  const entry = progress[courseSlug];
  const done = entry?.done.filter((id) => lessonIds.includes(id)) ?? [];
  const pct = Math.round((done.length / lessonIds.length) * 100);
  const started = !!entry && (done.length > 0 || (!!entry.last && lessonIds.includes(entry.last)));
  return { done, pct, started, next: nextLesson(lessonIds, done, entry?.last) };
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
  const { pct, started, next } = useCourseState(courseSlug, lessonIds);
  return (
    <div className="flex flex-wrap items-center gap-5">
      <Link href={`${basePath}/learn/${started ? next : lessonIds[0]}`} className="btn-primary">
        {started ? labels.continue : labels.start} <ArrowIcon size={17} />
      </Link>
      {started && (
        <span className="flex items-center gap-3 text-sm text-white/70">
          <ProgressRing value={pct} size={44} dark />
          {labels.progress}
        </span>
      )}
    </div>
  );
}

export function LessonCheck({ courseSlug, lessonId }: { courseSlug: string; lessonId: string }) {
  const { progress } = useProgress();
  const done = progress[courseSlug]?.done.includes(lessonId);
  return (
    <span
      className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border ${
        done ? "border-gold bg-gold text-white" : "border-gold/40"
      }`}
    >
      {done && <CheckIcon size={13} strokeWidth={2.8} />}
      <span className="sr-only">{done ? "✓" : ""}</span>
    </span>
  );
}

export type ModuleLabels = {
  remaining: string;
  notStarted: string;
  completed: string;
  percent: string;
  start: string;
  continue: string;
};

/** 주차(모듈) 행: 진도 링, 제목, 남은 레슨, 오른쪽에 작은 이어가기 링크 */
export function ModuleCard({
  courseSlug,
  basePath,
  index,
  title,
  lessonIds,
  labels,
  children,
}: {
  courseSlug: string;
  basePath: string;
  index: number;
  title: string;
  lessonIds: string[];
  labels: ModuleLabels;
  children?: React.ReactNode;
}) {
  const { progress } = useProgress();
  const entry = progress[courseSlug];
  const done = entry?.done.filter((id) => lessonIds.includes(id)) ?? [];
  const left = lessonIds.length - done.length;
  const pct = Math.round((done.length / lessonIds.length) * 100);
  const complete = left === 0;
  const visited = !!entry?.last && lessonIds.includes(entry.last);
  const inProgress = !complete && (done.length > 0 || visited);
  const status = complete ? labels.completed : inProgress ? fill(labels.percent, { n: pct }) : labels.notStarted;
  const href = `${basePath}/learn/${nextLesson(lessonIds, done, entry?.last)}`;

  return (
    <div className="overflow-hidden rounded-[22px] border border-line bg-deep/70">
      <div className="flex items-center gap-4 px-5 py-5">
        <ProgressRing value={pct} />
        <div className="min-w-0 flex-1">
          <p className="text-[10.5px] font-semibold tracking-[0.2em] text-gold">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="font-serif text-[19px] font-semibold leading-snug">{title}</h3>
          <p className="mt-0.5 text-[13px] text-muted">
            {fill(labels.remaining, { total: lessonIds.length, left })} <span className="mx-0.5 text-gold">·</span> {status}
          </p>
        </div>
        {!complete && (
          <Link href={href} className={inProgress ? "btn-primary !px-4 !py-2 !text-[13px]" : "btn-ghost !text-[13px]"}>
            {inProgress ? labels.continue : labels.start}
            <ArrowIcon size={14} />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
