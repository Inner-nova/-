import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, courses, flatLessons, getCourse, totalMinutes } from "@/lib/content";
import { getDictionary, isLocale, locales, tr } from "@/lib/i18n";
import { CourseActions, LessonCheck } from "@/components/CourseProgress";
import { LessonIcon } from "@/components/LessonIcon";

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
      <section className="cover text-white" style={{ ["--hue" as string]: course.hue }}>
        <div className="bg-ink/45">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <p className="text-sm text-white/80">
              {tr(categories[course.category], locale)} · {d.course.level[course.level]}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold">{tr(course.title, locale)}</h1>
            <p className="mt-2 text-lg text-white/90">{tr(course.subtitle, locale)}</p>
            <p className="mt-6 max-w-2xl leading-relaxed text-white/85">{tr(course.description, locale)}</p>
            <p className="mt-6 text-sm text-white/80">
              {course.modules.length} {locale === "ko" ? "주 과정" : "weeks"} · {lessons.length} {d.course.lessons} ·{" "}
              {totalMinutes(course)}
              {d.course.minutes} · {d.course.free}
            </p>
            <div className="mt-8">
              <CourseActions
                courseSlug={course.slug}
                lessonIds={lessons.map((l) => l.id)}
                basePath={base}
                labels={{ start: d.course.start, continue: d.course.continue, progress: d.course.progress }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_20rem]">
        <section>
          <h2 className="font-serif text-2xl font-semibold">{d.course.curriculum}</h2>
          <div className="mt-6 space-y-5">
            {course.modules.map((m, mi) => (
              <div key={mi} className="overflow-hidden rounded-2xl border border-line bg-paper">
                <h3 className="border-b border-line bg-sand/60 px-5 py-3 font-semibold">{tr(m.title, locale)}</h3>
                <ul>
                  {m.lessons.map((l) => (
                    <li key={l.id} className="border-b border-line last:border-0">
                      <Link
                        href={`${base}/learn/${l.id}`}
                        className="flex items-center gap-3 px-5 py-3.5 transition hover:bg-gold-soft/40"
                      >
                        <LessonCheck courseSlug={course.slug} lessonId={l.id} />
                        <span className="flex-1">{tr(l.title, locale)}</span>
                        <span className="flex items-center gap-1.5 text-xs text-ink-soft">
                          <LessonIcon type={l.type} />
                          {d.lesson.type[l.type]} · {l.minutes}
                          {d.course.minutes}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-line bg-paper p-6">
            <h2 className="font-semibold">{d.course.outcomes}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {course.outcomes.map((o, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-0.5 text-sage" aria-hidden>
                    ✓
                  </span>
                  {tr(o, locale)}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-6">
            <h2 className="font-semibold">{d.course.instructor}</h2>
            <p className="mt-3 text-sm text-ink-soft">
              {locale === "ko"
                ? "아루벤 안내자 · 명상과 비움을 함께 걷는 동반자"
                : "Aruben Guide · a companion on the path of stillness"}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
