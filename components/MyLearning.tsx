"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { ProgressBar } from "./CourseProgress";

type CourseSummary = { slug: string; title: string; hue: number; lessons: { id: string; title: string }[] };
type Labels = { empty: string; browse: string; reset: string; done: string; continue: string; lessons: string };

export function MyLearning({ locale, courses, labels }: { locale: string; courses: CourseSummary[]; labels: Labels }) {
  const { progress, reset } = useProgress();

  const started = courses
    .map((c) => {
      const entry = progress[c.slug];
      if (!entry || (!entry.last && entry.done.length === 0)) return null;
      const ids = c.lessons.map((l) => l.id);
      const done = entry.done.filter((id) => ids.includes(id)).length;
      const nextId =
        entry.last && ids.includes(entry.last) && !entry.done.includes(entry.last)
          ? entry.last
          : ids.find((id) => !entry.done.includes(id)) ?? ids[0];
      return { ...c, done, pct: Math.round((done / ids.length) * 100), next: c.lessons.find((l) => l.id === nextId)! };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  if (started.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-line px-6 py-16 text-center">
        <p className="text-ink-soft">{labels.empty}</p>
        <Link
          href={`/${locale}/courses`}
          className="mt-5 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-ink/85"
        >
          {labels.browse}
        </Link>
      </div>
    );
  }

  return (
    <>
      <ul className="mt-10 space-y-4">
        {started.map((c) => (
          <li key={c.slug} className="flex flex-col gap-4 rounded-2xl border border-line bg-paper p-5 sm:flex-row sm:items-center">
            <div className="cover h-16 w-24 shrink-0 rounded-lg" style={{ ["--hue" as string]: c.hue }} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-semibold">{c.title}</h2>
                {c.pct === 100 && (
                  <span className="rounded-full bg-sage px-2 py-0.5 text-xs font-medium text-white">{labels.done}</span>
                )}
              </div>
              <div className="mt-2 flex items-center gap-3 text-sm text-ink-soft">
                <ProgressBar value={c.pct} />
                <span className="shrink-0">
                  {c.done}/{c.lessons.length} · {c.pct}%
                </span>
              </div>
            </div>
            <Link
              href={`/${locale}/courses/${c.slug}/learn/${c.next.id}`}
              className="shrink-0 rounded-full border border-ink/20 px-4 py-2 text-center text-sm font-medium hover:border-gold"
            >
              {labels.continue} →
            </Link>
          </li>
        ))}
      </ul>
      <button type="button" onClick={reset} className="mt-8 text-xs text-ink-soft underline hover:text-ink">
        {labels.reset}
      </button>
    </>
  );
}
