import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, flatLessons, getCourse } from "@/lib/content";
import { getDictionary, isLocale, locales, tr } from "@/lib/i18n";
import { LessonCheck, LessonCompleteBar } from "@/components/LessonControls";
import { LessonIcon } from "@/components/LessonIcon";
import { BreathGuide } from "@/components/BreathGuide";
import { Cover } from "@/components/Cover";
import { seedOf } from "@/components/Stardust";
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
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 md:px-6 lg:grid-cols-[18rem_1fr]">
      <aside className="order-2 lg:order-1">
        <div className="sticky top-24 overflow-hidden rounded-[22px] border border-line bg-deep/70">
          <Link href={base} className="flex items-center gap-1 px-5 pt-5 text-[13px] text-muted hover:text-ink">
            <ChevronIcon dir="left" size={14} />
            {d.lesson.backToCourse}
          </Link>
          <p className="px-5 pb-2 pt-2 font-serif text-[20px] font-medium leading-snug text-gold-light">{tr(course.title, locale)}</p>
          <nav className="max-h-[60vh] overflow-y-auto pb-3">
            {course.modules.map((m, mi) => (
              <div key={mi} className="pt-3">
                <p className="px-5 pb-1.5 text-[10.5px] font-semibold tracking-[0.04em] text-gold">{tr(m.title, locale)}</p>
                {m.lessons.map((l) => {
                  const active = l.id === lesson.id;
                  return (
                    <Link
                      key={l.id}
                      href={`${base}/learn/${l.id}`}
                      aria-current={active ? "page" : undefined}
                      className={`mx-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14.5px] transition ${
                        active ? "bg-surface font-semibold" : "hover:bg-surface/60"
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
          <Cover seed={seedOf(lesson.id)} oval className="gold-frame mb-8 flex aspect-video items-center justify-center rounded-[6px]">
            <div className="relative flex flex-col items-center gap-3">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-light/70 bg-night/40 text-gold-light backdrop-blur">
                <PlayIcon size={26} />
              </span>
              <span className="text-[12px] tracking-[0.16em] text-white/80">{d.lesson.videoSoon}</span>
            </div>
          </Cover>
        )}

        <div className="flex items-center gap-3 text-[12px] font-semibold tracking-[0.06em] text-gold">
          <span className="flex items-center gap-1.5">
            <LessonIcon type={lesson.type} />
            {d.lesson.type[lesson.type].toUpperCase()}
          </span>
          <span className="text-line">|</span>
          <span>
            {lesson.minutes}
            {d.course.minutes.toUpperCase()}
          </span>
          <span className="ml-auto font-serif text-[15px] tracking-normal text-muted">
            {String(index + 1).padStart(2, "0")} / {String(all.length).padStart(2, "0")}
          </span>
        </div>
        <h1 className="mt-3 font-serif text-[32px] font-medium leading-tight text-gold-light md:text-[40px]">{tr(lesson.title, locale)}</h1>
        <div className="mt-5 h-px w-16 bg-gold/60" />

        <div className="mt-7 max-w-[38rem] space-y-6 text-[17px] leading-[1.95] text-ink/85">
          {lesson.body[locale].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {lesson.breathGuide && (
          <div className="mt-12">
            <BreathGuide labels={d.lesson.breath} />
          </div>
        )}

        {lesson.practice && (
          <aside className="mt-12 rounded-[22px] border border-gold/35 bg-deep/60 px-6 py-6 md:px-8">
            <p className="label-gold">{d.lesson.practice}</p>
            <p className="mt-3 font-serif text-[21px] font-medium italic leading-snug">{tr(lesson.practice, locale)}</p>
          </aside>
        )}

        <LessonCompleteBar
          courseSlug={course.slug}
          lessonId={lesson.id}
          labels={{ mark: d.lesson.markComplete, done: d.lesson.completed }}
        />

        <nav className="mt-10 flex justify-between gap-4 border-t border-line pt-6">
          {prev ? (
            <Link href={`${base}/learn/${prev.id}`} className="group max-w-[48%]">
              <span className="flex items-center gap-1 text-[11px] font-semibold tracking-[0.16em] text-gold">
                <ChevronIcon dir="left" size={13} /> {d.lesson.prev.toUpperCase()}
              </span>
              <span className="mt-1 block font-serif text-[17px] font-semibold group-hover:underline">{tr(prev.title, locale)}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`${base}/learn/${next.id}`} className="group max-w-[48%] text-right">
              <span className="flex items-center justify-end gap-1 text-[11px] font-semibold tracking-[0.16em] text-gold">
                {d.lesson.next.toUpperCase()} <ChevronIcon dir="right" size={13} />
              </span>
              <span className="mt-1 block font-serif text-[17px] font-semibold group-hover:underline">{tr(next.title, locale)}</span>
            </Link>
          ) : (
            <Link href={base} className="link-gold">
              {d.lesson.backToCourse} <span aria-hidden>→</span>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
