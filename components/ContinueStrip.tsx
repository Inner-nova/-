"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { ProgressRing, useCourseState } from "./CourseProgress";
import { ArrowIcon } from "./Icons";
import { Stardust, seedOf } from "./Stardust";
import { SectionHead } from "./Shelf";

type Item = { slug: string; title: string; lessonIds: string[] };

/** 시작한 코스가 있을 때만 보이는 "이어하기" 줄 */
export function ContinueStrip({
  locale,
  courses,
  labels,
}: {
  locale: string;
  courses: Item[];
  labels: { title: string; resume: string };
}) {
  const { progress } = useProgress();
  const started = courses.filter((c) => {
    const e = progress[c.slug];
    return e && (e.done.length > 0 || (e.last && c.lessonIds.includes(e.last)));
  });
  if (started.length === 0) return null;

  return (
    <section className="mb-14">
      <SectionHead title={labels.title} className="mb-6" />
      <ul className="space-y-3">
        {started.map((c) => (
          <Row key={c.slug} locale={locale} item={c} resume={labels.resume} />
        ))}
      </ul>
    </section>
  );
}

function Row({ locale, item, resume }: { locale: string; item: Item; resume: string }) {
  const { pct, next } = useCourseState(item.slug, item.lessonIds);
  return (
    <li className="flex items-center gap-4 rounded-[10px] border border-line bg-deep/60 p-3 pr-4">
      <Link href={`/${locale}/courses/${item.slug}`} className="gold-frame relative h-16 w-14 shrink-0 overflow-hidden rounded-[4px] bg-deep">
        <Stardust seed={seedOf(item.slug)} density={0.45} />
      </Link>
      <Link href={`/${locale}/courses/${item.slug}`} className="min-w-0 flex-1 font-serif text-[17px] font-medium leading-snug text-gold-light hover:underline">
        {item.title}
      </Link>
      <ProgressRing value={pct} size={42} />
      <Link href={`/${locale}/courses/${item.slug}/learn/${next}`} className="btn-primary !hidden !px-4 !py-2 !text-[13px] sm:!inline-flex">
        {resume} <ArrowIcon size={14} />
      </Link>
      <Link
        href={`/${locale}/courses/${item.slug}/learn/${next}`}
        aria-label={resume}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#eadbb6] to-[#c7ad80] text-night sm:hidden"
      >
        <ArrowIcon size={17} />
      </Link>
    </li>
  );
}
