import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, flatLessons, getCourse } from "@/lib/content";
import { getDictionary, isLocale, locales, tr } from "@/lib/i18n";
import { LessonCheck, LessonCompleteBar } from "@/components/LessonControls";
import { LessonIcon } from "@/components/LessonIcon";
import { BreathGuide } from "@/components/BreathGuide";

type P = PageProps<"/[locale]/courses/[slug]/learn/[lesson]">;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    courses.flatMap((c) => flatLessons(c).map((l) => ({ locale, slug: c.slug, lesson: l.id }))),
  );
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug, lesson } = await params;
  const course = getCourse(slug);
  const l = course && flatLessons(course).find((x) => x.id === lesson);
  if (!isLocale(locale) || !course || !l) return {};
  return { title: `${tr(l.title, locale)} | ${tr(course.title, locale)}` };
}

export default async function LessonPage({ params }: P) {
  const { locale, slug, lesson: lessonId } = await params;
  const course = getCourse(slug);
  if (!isLocale(locale) || !course) notFound();
  const all = flatLessons(course);
  const index = all.findIndex((l) => l.id === lessonId);
  if (index < 0) notFound();
  const lesson = all[index];
  const d = getDictionary(locale);
  const base = `/${locale}/courses/${course.slug}`;
  const prev = all[index - 1];
  const next = all[index + 1];

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[18rem_1fr]">
      <aside className="order-2 lg:order-1">
        <div className="sticky top-24 rounded-2xl border border-line bg-paper">
          <Link href={base} className="block border-b border-line px-5 py-4 text-sm text-ink-soft hover:text-ink">
            ← {d.lesson.backToCourse}
            <span className="mt-1 block font-serif text-base font-semibold text-ink">{tr(course.title, locale)}</span>
          </Link>
          <nav className="max-h-[60vh] overflow-y-auto py-2">
            {course.modules.map((m, mi) => (
              <div key={mi} className="py-1">
                <p className="px-5 py-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">{tr(m.title, locale)}</p>
                {m.lessons.map((l) => {
                  const active = l.id === lesson.id;
                  return (
                    <Link
                      key={l.id}
                      href={`${base}/learn/${l.id}`}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 px-5 py-2.5 text-sm transition ${
                        active ? "bg-gold-soft font-medium" : "hover:bg-sand"
                      }`}
                    >
                      <LessonCheck courseSlug={course.slug} lessonId={l.id} />
                      <span className="flex-1">{tr(l.title, locale)}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <article className="order-1 min-w-0 lg:order-2">
        {lesson.type === "video" && (
          <div
            className="cover flex aspect-video items-center justify-center rounded-2xl text-white"
            style={{ ["--hue" as string]: course.hue }}
          >
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-ink/40 px-8 py-6 backdrop-blur-sm">
              <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden>
                <circle cx="24" cy="24" r="23" fill="none" stroke="white" strokeOpacity=".7" />
                <path d="M19 15v18l15-9z" fill="white" />
              </svg>
              <span className="text-sm">{d.lesson.videoSoon}</span>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center gap-2 text-sm text-ink-soft">
          <LessonIcon type={lesson.type} />
          {d.lesson.type[lesson.type]} · {lesson.minutes}
          {d.course.minutes}
          <span className="ml-auto">
            {index + 1} / {all.length}
          </span>
        </div>
        <h1 className="mt-2 font-serif text-3xl font-semibold">{tr(lesson.title, locale)}</h1>

        <div className="mt-6 space-y-5 text-[1.05rem] leading-8 text-ink/90">
          {lesson.body[locale].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {lesson.breathGuide && (
          <div className="mt-10">
            <BreathGuide labels={d.lesson.breath} />
          </div>
        )}

        {lesson.practice && (
          <div className="mt-10 rounded-2xl border border-gold/40 bg-gold-soft/50 p-6">
            <p className="text-sm font-semibold text-gold">{d.lesson.practice}</p>
            <p className="mt-2">{tr(lesson.practice, locale)}</p>
          </div>
        )}

        <LessonCompleteBar
          courseSlug={course.slug}
          lessonId={lesson.id}
          labels={{ mark: d.lesson.markComplete, done: d.lesson.completed }}
        />

        <div className="mt-6 flex justify-between gap-4 border-t border-line pt-6 text-sm">
          {prev ? (
            <Link href={`${base}/learn/${prev.id}`} className="text-ink-soft hover:text-ink">
              ← {d.lesson.prev}
              <span className="block font-medium text-ink">{tr(prev.title, locale)}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`${base}/learn/${next.id}`} className="text-right text-ink-soft hover:text-ink">
              {d.lesson.next} →<span className="block font-medium text-ink">{tr(next.title, locale)}</span>
            </Link>
          ) : (
            <Link href={base} className="text-right text-ink-soft hover:text-ink">
              {d.lesson.backToCourse} →
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
