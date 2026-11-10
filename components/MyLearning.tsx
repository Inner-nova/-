"use client";

import Link from "next/link";
import { useState } from "react";
import { useProgress } from "@/lib/progress";
import { ModuleCard, ProgressRing, useCourseState, type ModuleLabels } from "./CourseProgress";
import { ArrowIcon, ChevronIcon } from "./Icons";

type CourseSummary = {
  slug: string;
  title: string;
  category: string;
  hue: number;
  modules: { title: string; lessonIds: string[] }[];
};
type Labels = ModuleLabels & {
  note: string;
  empty: string;
  emptyBody: string;
  browse: string;
  reset: string;
  collapse: string;
  expand: string;
  resume: string;
  overall: string;
};

export function MyLearning({ locale, courses, labels }: { locale: string; courses: CourseSummary[]; labels: Labels }) {
  const { progress, reset } = useProgress();
  const started = courses.filter((c) => {
    const e = progress[c.slug];
    return e && (e.last || e.done.length > 0);
  });

  if (started.length === 0) {
    return (
      <div className="night mt-10 rounded-[26px] px-6 py-14 text-center">
        <p className="font-serif text-[24px] font-semibold">{labels.empty}</p>
        <p className="mt-2 text-white/65">{labels.emptyBody}</p>
        <Link href={`/${locale}/courses`} className="btn-primary mt-7">
          {labels.browse} <ArrowIcon size={16} />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 space-y-6">
        {started.map((c) => (
          <CourseGroup key={c.slug} locale={locale} course={c} labels={labels} />
        ))}
      </div>
      <p className="mt-8 text-[13px] leading-relaxed text-muted">{labels.note}</p>
      <button type="button" onClick={reset} className="mt-3 text-[13px] text-muted underline decoration-gold/50 underline-offset-4 hover:text-ink">
        {labels.reset}
      </button>
    </>
  );
}

function CourseGroup({ locale, course, labels }: { locale: string; course: CourseSummary; labels: Labels }) {
  const [open, setOpen] = useState(true);
  const base = `/${locale}/courses/${course.slug}`;
  const allIds = course.modules.flatMap((m) => m.lessonIds);
  const { pct, next } = useCourseState(course.slug, allIds);

  return (
    <section className="overflow-hidden rounded-[26px] border border-line bg-white/60">
      <div className="night flex items-center gap-4 px-5 py-5">
        <span className="cover gold-frame h-16 w-14 shrink-0 rounded-xl" style={{ ["--hue" as string]: course.hue }} />
        <div className="min-w-0 flex-1">
          <p className="label-gold !text-gold-light">{course.category}</p>
          <Link href={base} className="mt-1 block font-serif text-[21px] font-semibold leading-snug hover:underline">
            {course.title}
          </Link>
        </div>
        <ProgressRing value={pct} size={52} dark />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5">
        <Link href={`${base}/learn/${next}`} className="btn-primary">
          {labels.resume} <ArrowIcon size={16} />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex items-center gap-1.5 text-[13px] font-semibold tracking-wide text-muted hover:text-ink"
        >
          {open ? labels.collapse : labels.expand}
          <ChevronIcon dir={open ? "up" : "down"} size={16} />
        </button>
      </div>

      {open && (
        <div className="space-y-3 p-5">
          {course.modules.map((m, i) => (
            <ModuleCard key={i} index={i} courseSlug={course.slug} basePath={base} title={m.title} lessonIds={m.lessonIds} labels={labels} />
          ))}
        </div>
      )}
      {!open && <div className="h-5" />}
    </section>
  );
}
