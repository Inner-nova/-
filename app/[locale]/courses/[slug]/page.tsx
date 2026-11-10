import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, courses, flatLessons, getCourse, totalMinutes } from "@/lib/content";
import { getDictionary, isLocale, locales, tr } from "@/lib/i18n";
import { CourseActions, LessonCheck, ModuleCard } from "@/components/CourseProgress";
import { LessonIcon } from "@/components/LessonIcon";
import { Stardust, seedOf } from "@/components/Stardust";
import { SectionHead } from "@/components/Shelf";
import { ChevronIcon } from "@/components/Icons";

export function generateStaticParams() {
  return locales.flatMap((locale) => courses.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/courses/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const course = getCourse(slug);
  if (!isLocale(locale) || !course) return {};
  return { title: tr(course.title, locale), description: tr(course.description, locale) };
}

export default async function CoursePage({ params }: PageProps<"/[locale]/courses/[slug]">) {
  const { locale, slug } = await params;
  const course = getCourse(slug);
  if (!isLocale(locale) || !course) notFound();
  const d = getDictionary(locale);
  const lessons = flatLessons(course);
  const base = `/${locale}/courses/${course.slug}`;

  return (
    <>
      <section className="px-4 pt-5 md:px-6 md:pt-8">
        <div className="relative mx-auto max-w-6xl">
          <Link
            href={`/${locale}/courses`}
            className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 text-[13px] text-ink/60 hover:text-ink"
          >
            <ChevronIcon dir="left" size={14} /> {d.nav.courses}
          </Link>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] bg-deep gold-frame sm:aspect-[16/10] md:aspect-[16/7]">
            <div className="md:hidden">
              <Stardust seed={seedOf(course.slug)} density={1.3} />
            </div>
            <div className="hidden md:block">
              <Stardust seed={seedOf(course.slug)} density={2} w={230} h={100} />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-[24%] pb-[4%] text-center md:px-[36%]">
              <p className="font-serif text-[14px] italic text-gold/90">
                {tr(categories[course.category], locale)} · {d.course.level[course.level]}
              </p>
              <h1 className="mt-3 font-serif text-[30px] font-medium leading-tight text-gold-light md:text-[40px]">
                {tr(course.title, locale)}
              </h1>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-7 flex max-w-6xl flex-col items-center gap-4">
          <CourseActions
            courseSlug={course.slug}
            lessonIds={lessons.map((l) => l.id)}
            basePath={base}
            labels={{ start: d.course.start, continue: d.course.continue, progress: d.course.progress }}
          />
          <p className="text-[12.5px] tracking-wide text-muted">
            {course.modules.length}
            {locale === "ko" ? "" : " "}
            {d.course.weeks}
            <span className="mx-1.5 text-gold">·</span>
            {lessons.length} {d.course.lessons}
            <span className="mx-1.5 text-gold">·</span>
            {totalMinutes(course)}
            {d.course.minutes}
            <span className="mx-1.5 text-gold">·</span>
            {d.common.free}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-16 md:px-6">
        <SectionHead title={d.course.curriculum} className="mb-8" />
        <div className="space-y-4">
          {course.modules.map((m, mi) => (
            <ModuleCard
              key={mi}
              index={mi}
              courseSlug={course.slug}
              basePath={base}
              title={tr(m.title, locale)}
              lessonIds={m.lessons.map((l) => l.id)}
              labels={d.my}
            >
              <ul className="border-t border-line/80">
                {m.lessons.map((l) => (
                  <li key={l.id}>
                    <Link href={`${base}/learn/${l.id}`} className="flex items-center gap-3.5 px-5 py-3.5 transition hover:bg-surface/60">
                      <LessonCheck courseSlug={course.slug} lessonId={l.id} />
                      <span className="flex-1 text-[15px]">{tr(l.title, locale)}</span>
                      <span className="flex shrink-0 items-center gap-1.5 text-[12.5px] text-muted">
                        <LessonIcon type={l.type} />
                        {l.minutes}
                        {d.course.minutes}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </ModuleCard>
          ))}
        </div>
      </section>
    </>
  );
}
