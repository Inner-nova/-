import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, courses, flatLessons, getCourse, totalMinutes } from "@/lib/content";
import { getDictionary, isLocale, locales, tr } from "@/lib/i18n";
import { CourseActions, LessonCheck, ModuleCard } from "@/components/CourseProgress";
import { LessonIcon } from "@/components/LessonIcon";
import { Cover } from "@/components/Cover";
import { Logo } from "@/components/Logo";
import { CheckIcon } from "@/components/Icons";

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
    { k: `${course.modules.length}${locale === "ko" ? "" : " "}${d.course.weeks}`, v: tr(categories[course.category], locale) },
    { k: `${lessons.length} ${d.course.lessons}`, v: `${totalMinutes(course)}${d.course.minutes}` },
    { k: d.course.level[course.level], v: d.common.free },
  ];

  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1fr_22rem] md:px-6 md:py-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white">
                <Logo size={26} />
              </span>
              <span className="text-[16px] font-medium text-muted">{d.common.provider}</span>
            </div>
            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight md:text-4xl">{tr(course.title, locale)}</h1>
            <p className="mt-2 text-lg text-muted">{tr(course.subtitle, locale)}</p>
            <p className="mt-5 max-w-2xl leading-relaxed text-ink/85">{tr(course.description, locale)}</p>
            <div className="mt-8">
              <CourseActions
                courseSlug={course.slug}
                lessonIds={lessons.map((l) => l.id)}
                basePath={base}
                labels={{ start: d.course.start, continue: d.course.continue, progress: d.course.progress }}
              />
            </div>
          </div>
          <Cover hue={course.hue} category={course.category} className="hidden aspect-[7/5] rounded-2xl md:block" />
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-8 md:px-6">
          <dl className="grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-white py-4 text-center">
            {facts.map((f) => (
              <div key={f.k} className="px-2">
                <dt className="text-[15px] font-bold">{f.k}</dt>
                <dd className="mt-0.5 text-sm text-muted">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:px-6 lg:grid-cols-[1fr_20rem]">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">{d.course.curriculum}</h2>
          <div className="mt-5 space-y-4">
            {course.modules.map((m, mi) => (
              <ModuleCard
                key={mi}
                courseSlug={course.slug}
                basePath={base}
                title={tr(m.title, locale)}
                lessonIds={m.lessons.map((l) => l.id)}
                labels={d.my}
              >
                <ul className="border-t border-line">
                  {m.lessons.map((l) => (
                    <li key={l.id} className="border-b border-line last:border-0">
                      <Link href={`${base}/learn/${l.id}`} className="flex items-center gap-3 px-5 py-3.5 transition hover:bg-surface">
                        <LessonCheck courseSlug={course.slug} lessonId={l.id} />
                        <span className="flex-1 text-[15px]">{tr(l.title, locale)}</span>
                        <span className="flex shrink-0 items-center gap-1.5 text-sm text-muted">
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

        <aside className="space-y-4">
          <div className="rounded-2xl border border-line p-6">
            <h2 className="text-lg font-bold">{d.course.outcomes}</h2>
            <ul className="mt-4 space-y-3 text-[15px]">
              {course.outcomes.map((o, i) => (
                <li key={i} className="flex gap-2.5">
                  <CheckIcon size={18} className="mt-0.5 shrink-0 text-primary" strokeWidth={2.5} />
                  {tr(o, locale)}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line p-6">
            <h2 className="text-lg font-bold">{d.course.instructor}</h2>
            <p className="mt-3 text-[15px] text-muted">{d.course.instructorBody}</p>
          </div>
        </aside>
      </div>
    </>
  );
}
