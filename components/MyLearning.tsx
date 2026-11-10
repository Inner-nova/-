"use client";

import Link from "next/link";
import { useState } from "react";
import { useProgress } from "@/lib/progress";
import { ModuleCard, type ModuleLabels } from "./CourseProgress";
import { ChevronIcon } from "./Icons";
import { Logo } from "./Logo";

type CourseSummary = { slug: string; title: string; modules: { title: string; lessonIds: string[] }[] };
type Labels = ModuleLabels & {
  note: string;
  empty: string;
  emptyBody: string;
  browse: string;
  reset: string;
  collapse: string;
  expand: string;
  provider: string;
  course: string;
};

export function MyLearning({ locale, courses, labels }: { locale: string; courses: CourseSummary[]; labels: Labels }) {
  const { progress, reset } = useProgress();
  const started = courses.filter((c) => {
    const e = progress[c.slug];
    return e && (e.last || e.done.length > 0);
  });

  if (started.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-line bg-surface px-6 py-14 text-center">
        <p className="text-lg font-bold">{labels.empty}</p>
        <p className="mt-2 text-muted">{labels.emptyBody}</p>
        <Link
          href={`/${locale}/courses`}
          className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-[15px] font-bold text-white hover:bg-primary-dark"
        >
          {labels.browse}
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 divide-y divide-line">
        {started.map((c) => (
          <CourseGroup key={c.slug} locale={locale} course={c} labels={labels} />
        ))}
      </div>
      <p className="mt-6 rounded-xl bg-surface px-4 py-3 text-sm text-muted">{labels.note}</p>
      <button type="button" onClick={reset} className="mt-4 text-sm text-muted underline hover:text-ink">
        {labels.reset}
      </button>
    </>
  );
}

function CourseGroup({ locale, course, labels }: { locale: string; course: CourseSummary; labels: Labels }) {
  const [open, setOpen] = useState(true);
  const base = `/${locale}/courses/${course.slug}`;
  return (
    <section className="py-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line">
          <Logo size={26} />
        </span>
        <span className="text-[16px] text-muted">{labels.provider}</span>
      </div>
      <Link href={base} className="mt-3 block text-xl font-bold hover:underline">
        {course.title}
      </Link>
      <p className="mt-1 text-[15px] text-muted">{labels.course}</p>

      {open && (
        <div className="mt-5 space-y-4">
          {course.modules.map((m, i) => (
            <ModuleCard
              key={i}
              courseSlug={course.slug}
              basePath={base}
              title={m.title}
              lessonIds={m.lessonIds}
              labels={labels}
              highlight
            />
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mx-auto mt-5 flex items-center gap-2 text-[16px] font-medium"
      >
        <ChevronIcon dir={open ? "up" : "down"} size={20} strokeWidth={2.2} />
        {open ? labels.collapse : labels.expand}
      </button>
    </section>
  );
}
