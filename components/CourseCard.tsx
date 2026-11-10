import Link from "next/link";
import { categories, flatLessons, totalMinutes, type Course } from "@/lib/content";
import { tr, type Dictionary, type Locale } from "@/lib/i18n";
import { Cover } from "./Cover";

export function CourseCard({ course, locale, d }: { course: Course; locale: Locale; d: Dictionary }) {
  const lessons = flatLessons(course).length;
  return (
    <Link href={`/${locale}/courses/${course.slug}`} className="group block">
      <Cover
        hue={course.hue}
        category={course.category}
        className="gold-frame aspect-[4/5] rounded-[20px] transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_-18px_rgba(40,20,80,0.55)]"
      >
        <span className="absolute left-3.5 top-3.5 rounded-full border border-gold-light/50 bg-night/35 px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] text-gold-light backdrop-blur-sm">
          {d.common.free.toUpperCase()}
        </span>
      </Cover>
      <p className="label-gold mt-4">{tr(categories[course.category], locale)}</p>
      <h3 className="mt-1.5 font-serif text-[21px] font-semibold leading-snug">{tr(course.title, locale)}</h3>
      <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-muted">{tr(course.subtitle, locale)}</p>
      <p className="mt-2.5 text-[12.5px] tracking-wide text-muted">
        {d.course.level[course.level]} <span className="mx-1 text-gold">·</span> {lessons} {d.course.lessons}{" "}
        <span className="mx-1 text-gold">·</span> {totalMinutes(course)}
        {d.course.minutes}
      </p>
    </Link>
  );
}
