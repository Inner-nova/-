import Link from "next/link";
import { flatLessons, type Course } from "@/lib/content";
import { tr, type Dictionary, type Locale } from "@/lib/i18n";
import { Cover } from "./Cover";

export function CourseCard({ course, locale, d }: { course: Course; locale: Locale; d: Dictionary }) {
  const lessons = flatLessons(course).length;
  return (
    <Link href={`/${locale}/courses/${course.slug}`} className="group block">
      <Cover hue={course.hue} category={course.category} className="aspect-[7/5] rounded-xl" />
      <h3 className="mt-3 text-[17px] font-semibold leading-snug group-hover:underline">{tr(course.title, locale)}</h3>
      <p className="mt-1.5 text-[15px] text-muted">{d.common.provider}</p>
      <p className="mt-0.5 text-[15px] text-muted">{d.common.course}</p>
      <p className="mt-1.5 text-sm text-ink">
        {d.course.level[course.level]} · {lessons} {d.course.lessons} ·{" "}
        <span className="font-semibold text-primary">{d.common.free}</span>
      </p>
    </Link>
  );
}
