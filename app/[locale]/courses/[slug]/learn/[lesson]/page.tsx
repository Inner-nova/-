import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, flatLessons, getCourse } from "@/lib/content";
import { getDictionary, isLocale, locales, tr } from "@/lib/i18n";
import { LessonCheck, LessonCompleteBar } from "@/components/LessonControls";
import { LessonIcon } from "@/components/LessonIcon";
import { BreathGuide } from "@/components/BreathGuide";
import { Cover } from "@/components/Cover";
import { ChevronIcon, PlayIcon } from "@/components/Icons";

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
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-6 md:px-6 md:py-8 lg:grid-cols-[19rem_1fr]">
      <aside className="order-2 lg:order-1">
        <div className="sticky top-24 overflow-hidden rounded-2xl border border-line">
          <Link href={base} className="flex items-center gap-1 border-b border-line px-5 py-4 text-sm text-muted hover:text-ink">
            <ChevronIcon dir="left" size={16} />
            {d.lesson.backToCourse}
          </Link>
          <p className="px-5 pt-4 text-lg font-bold">{tr(course.title, locale)}</p>
          <nav className="max-h-[60vh] overflow-y-auto pb-2">
            {course.modules.map((m, mi) => (
              <div key={mi} className="pt-3">
                <p className="px-5 pb-1.5 text-[13px] font-semibold text-muted">{tr(m.title, locale)}</p>
                {m.lessons.map((l) => {
                  const active = l.id === lesson.id;
                  return (
                    <Link
                      key={l.id}
                      href={`${base}/learn/${l.id}`}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 border-l-4 px-4 py-2.5 text-[15px] transition ${
                        active ? "border-primary bg-primary-soft font-semibold" : "border-transparent hover:bg-surface"
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
          <Cover hue={course.hue} className="flex aspect-video items-center justify-center rounded-2xl text-white">
            <div className="relative flex flex-col items-center gap-3">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg">
                <PlayIcon size={30} />
              </span>
              <span className="rounded-full bg-black/35 px-3 py-1 text-sm">{d.lesson.videoSoon}</span>
            </div>
          </Cover>
        )}

        <div className="mt-6 flex items-center gap-2 text-sm text-muted">
          <LessonIcon type={lesson.type} />
          {d.lesson.type[lesson.type]} · {lesson.minutes}
          {d.course.minutes}
          <span className="ml-auto rounded-full bg-surface px-2.5 py-0.5 font-medium">
            {index + 1} / {all.length}
          </span>
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{tr(lesson.title, locale)}</h1>

        <div className="mt-6 space-y-5 text-[17px] leading-8 text-ink/90">
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
          <div className="mt-10 rounded-2xl border border-primary/25 bg-primary-soft p-6">
            <p className="text-sm font-bold text-primary">{d.lesson.practice}</p>
            <p className="mt-2 text-[16px]">{tr(lesson.practice, locale)}</p>
          </div>
        )}

        <LessonCompleteBar
          courseSlug={course.slug}
          lessonId={lesson.id}
          labels={{ mark: d.lesson.markComplete, done: d.lesson.completed }}
        />

        <div className="mt-6 grid grid-cols-2 gap-3">
          {prev ? (
            <Link href={`${base}/learn/${prev.id}`} className="rounded-xl border border-line px-4 py-3 text-sm hover:border-primary">
              <span className="flex items-center gap-1 text-muted">
                <ChevronIcon dir="left" size={14} /> {d.lesson.prev}
              </span>
              <span className="mt-0.5 block font-semibold">{tr(prev.title, locale)}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`${base}/learn/${next.id}`} className="rounded-xl border border-line px-4 py-3 text-right text-sm hover:border-primary">
              <span className="flex items-center justify-end gap-1 text-muted">
                {d.lesson.next} <ChevronIcon dir="right" size={14} />
              </span>
              <span className="mt-0.5 block font-semibold">{tr(next.title, locale)}</span>
            </Link>
          ) : (
            <Link href={base} className="flex items-center justify-end rounded-xl border border-line px-4 py-3 text-sm font-semibold hover:border-primary">
              {d.lesson.backToCourse}
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
