import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, courses, flatLessons, getCourse, totalMinutes } from "@/lib/content";
import { getDictionary, isLocale, locales, tr } from "@/lib/i18n";
import { CourseActions, LessonCheck, ModuleCard } from "@/components/CourseProgress";
import { LessonIcon } from "@/components/LessonIcon";
import { Cover } from "@/components/Cover";
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

  const facts = [
    { k: `${course.modules.length}${locale === "ko" ? "" : " "}${d.course.weeks}`, v: d.course.level[course.level] },
    { k: `${lessons.length} ${d.course.lessons}`, v: `${totalMinutes(course)}${d.course.minutes}` },
    { k: d.common.free, v: tr(categories[course.category], locale) },
  ];

  return (
    <>
      <section className="px-4 pt-5 md:px-6 md:pt-8">
        <div className="night relative mx-auto max-w-6xl overflow-hidden rounded-[28px]">
          <div className="grid gap-10 px-6 py-10 md:grid-cols-[1fr_17rem] md:px-12 md:py-14">
            <div>
              <Link href={`/${locale}/courses`} className="inline-flex items-center gap-1 text-[13px] text-white/50 hover:text-white/80">
                <ChevronIcon dir="left" size={14} /> {d.nav.courses}
              </Link>
              <p className="label-gold mt-6 !text-gold-light">
                {tr(categories[course.category], locale)} · {d.course.level[course.level]}
              </p>
              <h1 className="mt-3 font-serif text-[36px] font-semibold leading-tight tracking-tight md:text-[48px]">
                {tr(course.title, locale)}
              </h1>
              <p className="mt-2 font-serif text-[19px] italic text-gold-light/90">{tr(course.subtitle, locale)}</p>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/70">{tr(course.description, locale)}</p>
              <div className="mt-8">
                <CourseActions
                  courseSlug={course.slug}
                  lessonIds={lessons.map((l) => l.id)}
                  basePath={base}
                  labels={{ start: d.course.start, continue: d.course.continue, progress: d.course.progress }}
                />
              </div>
            </div>
            <Cover hue={course.hue} category={course.category} className="gold-frame hidden aspect-[4/5] rounded-[20px] md:block" />
          </div>
          <dl className="grid grid-cols-3 border-t border-white/10">
            {facts.map((f, i) => (
              <div key={f.k} className={`px-3 py-5 text-center ${i > 0 ? "border-l border-white/10" : ""}`}>
                <dt className="font-serif text-[18px] font-semibold text-gold-light">{f.k}</dt>
                <dd className="mt-0.5 text-[12px] tracking-wide text-white/55">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 md:px-6 lg:grid-cols-[1fr_20rem]">
        <section>
          <p className="eyebrow">CURRICULUM</p>
          <h2 className="mt-1.5 font-serif text-[30px] font-semibold">{d.course.curriculum}</h2>
          <div className="mt-6 space-y-4">
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
                      <Link href={`${base}/learn/${l.id}`} className="flex items-center gap-3.5 px-5 py-3.5 transition hover:bg-surface/70">
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

        <aside className="space-y-8 lg:pt-12">
          <div>
            <h2 className="label-gold">{d.course.outcomes}</h2>
            <ul className="mt-4 space-y-3.5 text-[15px]">
              {course.outcomes.map((o, i) => (
                <li key={i} className="flex gap-3 border-b border-line/80 pb-3.5">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden />
                  {tr(o, locale)}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[22px] border border-gold/30 bg-white/70 p-6">
            <h2 className="label-gold">{d.course.instructor}</h2>
            <p className="mt-3 font-serif text-[18px] italic leading-snug">{d.course.instructorBody}</p>
          </div>
        </aside>
      </div>
    </>
  );
}
