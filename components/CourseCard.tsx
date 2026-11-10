import Link from "next/link";
import { categories, flatLessons, totalMinutes, type Course } from "@/lib/content";
import { tr, type Dictionary, type Locale } from "@/lib/i18n";

export function CourseCard({ course, locale, d }: { course: Course; locale: Locale; d: Dictionary }) {
  const lessons = flatLessons(course).length;
  return (
    <Link
      href={`/${locale}/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/5"
    >
      <div className="cover relative h-36" style={{ ["--hue" as string]: course.hue }}>
        <span className="absolute left-4 top-4 rounded-full bg-white/85 px-2.5 py-1 text-xs font-medium text-ink">
          {tr(categories[course.category], locale)}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-medium text-white">
          {d.course.free}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-gold">{tr(course.title, locale)}</h3>
        <p className="text-sm text-ink-soft">{tr(course.subtitle, locale)}</p>
        <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-3 text-xs text-ink-soft">
          <span>{d.course.level[course.level]}</span>
          <span aria-hidden>·</span>
          <span>
            {lessons} {d.course.lessons}
          </span>
          <span aria-hidden>·</span>
          <span>
            {totalMinutes(course)}
            {d.course.minutes}
          </span>
        </div>
      </div>
    </Link>
  );
}
