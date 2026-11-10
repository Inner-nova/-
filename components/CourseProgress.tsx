"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { fill } from "@/lib/i18n";
import { CheckIcon } from "./Icons";

export function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-line"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}

function nextLesson(lessonIds: string[], done: string[], last?: string) {
  if (last && lessonIds.includes(last) && !done.includes(last)) return last;
  return lessonIds.find((id) => !done.includes(id)) ?? lessonIds[0];
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
  const done = entry?.done.filter((id) => lessonIds.includes(id)) ?? [];
  const pct = Math.round((done.length / lessonIds.length) * 100);
  const started = !!entry && (done.length > 0 || !!entry.last);
  const target = started ? nextLesson(lessonIds, done, entry?.last) : lessonIds[0];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
      <Link
        href={`${basePath}/learn/${target}`}
        className="rounded-xl bg-primary px-8 py-3.5 text-center text-[16px] font-bold text-white transition hover:bg-primary-dark"
      >
        {started ? labels.continue : labels.start}
      </Link>
      {started && (
        <div className="w-full text-sm text-muted sm:w-56">
          <div className="mb-1.5 flex justify-between">
            <span>{labels.progress}</span>
            <span className="font-semibold text-ink">{pct}%</span>
          </div>
          <ProgressBar value={pct} />
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
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
        done ? "border-primary bg-primary text-white" : "border-line"
      }`}
    >
      {done && <CheckIcon size={14} strokeWidth={3} />}
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

/** 주차(모듈) 카드: 남은 레슨 수, 상태, 계속 학습/시작 버튼 */
export function ModuleCard({
  courseSlug,
  basePath,
  title,
  lessonIds,
  labels,
  highlight,
  children,
}: {
  courseSlug: string;
  basePath: string;
  title: string;
  lessonIds: string[];
  labels: ModuleLabels;
  /** true면 진행 중일 때 큰 "계속 학습" 버튼을 보여줍니다 */
  highlight?: boolean;
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
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_3px_rgba(20,30,60,0.06)]">
      <div className="flex items-center gap-4 px-5 py-5">
        {complete && (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <CheckIcon size={18} strokeWidth={3} />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-[17px] font-bold">{title}</h3>
          <p className="mt-1 text-[15px] text-muted">
            {fill(labels.remaining, { total: lessonIds.length, left })} <span aria-hidden>•</span> {status}
          </p>
        </div>
        {!complete && !(inProgress && highlight) && (
          <Link
            href={href}
            className="shrink-0 rounded-xl border-2 border-primary/40 px-5 py-2 text-[15px] font-bold text-primary transition hover:bg-primary-soft"
          >
            {inProgress ? labels.continue : labels.start}
          </Link>
        )}
      </div>
      {inProgress && highlight && (
        <div className="px-5 pb-5">
          <ProgressBar value={pct} />
          <Link
            href={href}
            className="mt-4 block rounded-xl bg-primary py-3.5 text-center text-[16px] font-bold text-white transition hover:bg-primary-dark"
          >
            {labels.continue}
          </Link>
        </div>
      )}
      {children}
    </div>
  );
}
