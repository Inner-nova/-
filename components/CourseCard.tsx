import Link from "next/link";
import { flatLessons, type Course } from "@/lib/content";
import { tr, type Dictionary, type Locale } from "@/lib/i18n";
import { InviteCover, seedOf } from "./Stardust";

export function CourseCard({ course, locale, d }: { course: Course; locale: Locale; d: Dictionary }) {
  return (
    <Link href={`/${locale}/courses/${course.slug}`} className="group block">
      <InviteCover
        title={tr(course.title, locale)}
        seed={seedOf(course.slug)}
        kicker={d.course.level[course.level]}
        className="gold-frame aspect-[4/5] rounded-[6px] transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_22px_40px_-20px_rgba(0,0,0,0.7)]"
      />
      <p className="mt-3 text-center text-[12.5px] tracking-wide text-muted">
        {flatLessons(course).length} {d.course.lessons}
        <span className="mx-1.5 text-gold">·</span>
        {d.common.free}
      </p>
    </Link>
  );
}
