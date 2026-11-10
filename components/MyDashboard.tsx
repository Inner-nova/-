"use client";

import Link from "next/link";
import { dayKey, streakOf, useProgress, useTrainingDays } from "@/lib/progress";
import { ContinueStrip } from "./ContinueStrip";
import { SectionHead } from "./Shelf";

type CourseItem = { slug: string; title: string; lessonIds: string[] };
type Labels = {
  streak: string;
  dayUnit: string;
  lessonsDone: string;
  activeCourses: string;
  recent: string;
  settings: string;
  language: string;
  reset: string;
  inProgress: string;
  resume: string;
  empty: string;
  browse: string;
};

/** 네 갈래 별 (훈련한 날은 금빛) */
function DayStar({ lit, today }: { lit: boolean; today: boolean }) {
  return (
    <span className={`flex aspect-square items-center justify-center rounded-full ${today ? "ring-1 ring-gold/50" : ""}`}>
      {lit ? (
        <svg viewBox="0 0 24 24" className="h-[70%] w-[70%] drop-shadow-[0_0_6px_rgba(230,213,174,0.7)]" aria-hidden>
          <path d="M12 2c.6 5 2.6 7.4 8 10-5.4 2.6-7.4 5-8 10-.6-5-2.6-7.4-8-10 5.4-2.6 7.4-5 8-10Z" fill="#e6d5ae" />
        </svg>
      ) : (
        <span className="h-1 w-1 rounded-full bg-ink/25" aria-hidden />
      )}
    </span>
  );
}

export function MyDashboard({
  locale,
  otherLocale,
  courses,
  labels,
}: {
  locale: string;
  otherLocale: { href: string; label: string };
  courses: CourseItem[];
  labels: Labels;
}) {
  const { progress, reset } = useProgress();
  const days = useTrainingDays();

  const lessonsDone = courses.reduce((n, c) => n + (progress[c.slug]?.done.filter((id) => c.lessonIds.includes(id)).length ?? 0), 0);
  const active = courses.filter((c) => {
    const e = progress[c.slug];
    if (!e) return false;
    const done = e.done.filter((id) => c.lessonIds.includes(id)).length;
    return (done > 0 || !!e.last) && done < c.lessonIds.length;
  }).length;
  const streak = streakOf(days);

  // 최근 28일: 4주 x 7일, 오늘이 마지막 칸
  const set = new Set(days);
  const today = new Date();
  const cells = Array.from({ length: 28 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (27 - i));
    const key = dayKey(d);
    return { key, lit: set.has(key), today: i === 27 };
  });

  const stats = [
    { value: streak, unit: labels.dayUnit, label: labels.streak },
    { value: lessonsDone, unit: "", label: labels.lessonsDone },
    { value: active, unit: "", label: labels.activeCourses },
  ];

  return (
    <div className="grid gap-12 md:grid-cols-[22rem_1fr] md:gap-14">
      <div className="space-y-10">
        <dl className="grid grid-cols-3 overflow-hidden rounded-[10px] border border-line bg-deep/60">
          {stats.map((s, i) => (
            <div key={s.label} className={`px-2 py-5 text-center ${i > 0 ? "border-l border-line" : ""}`}>
              <dd className="font-serif text-[34px] font-medium leading-none text-gold-light tabular-nums">
                {s.value}
                {s.unit && <span className="ml-0.5 text-[15px] text-gold">{s.unit}</span>}
              </dd>
              <dt className="mt-2 text-[11.5px] tracking-wide text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>

        <section>
          <SectionHead title={labels.recent} className="mb-5 !text-[17px]" />
          <div className="grid grid-cols-7 gap-1.5 rounded-[10px] border border-line bg-deep/60 p-4" role="img" aria-label={`${labels.recent}: ${days.length}`}>
            {cells.map((c) => (
              <DayStar key={c.key} lit={c.lit} today={c.today} />
            ))}
          </div>
        </section>

        <section className="hidden md:block">
          <Settings locale={locale} otherLocale={otherLocale} labels={labels} onReset={reset} />
        </section>
      </div>

      <div>
        {active > 0 || lessonsDone > 0 ? (
          <ContinueStrip locale={locale} courses={courses} labels={{ title: labels.inProgress, resume: labels.resume }} />
        ) : (
          <div className="flex flex-col items-center gap-5 rounded-[10px] border border-dashed border-line py-14 text-center">
            <p className="font-serif text-[18px] text-ink/80">{labels.empty}</p>
            <Link href={`/${locale}/courses`} className="btn-primary">
              {labels.browse}
            </Link>
          </div>
        )}
        <section className="mt-12 md:hidden">
          <Settings locale={locale} otherLocale={otherLocale} labels={labels} onReset={reset} />
        </section>
      </div>
    </div>
  );
}

function Settings({
  otherLocale,
  labels,
  onReset,
}: {
  locale: string;
  otherLocale: { href: string; label: string };
  labels: Labels;
  onReset: () => void;
}) {
  return (
    <>
      <SectionHead title={labels.settings} className="mb-5 !text-[17px]" />
      <ul className="divide-y divide-line overflow-hidden rounded-[10px] border border-line bg-deep/60 text-[14.5px]">
        <li className="flex items-center justify-between px-5 py-4">
          <span className="text-ink/80">{labels.language}</span>
          <Link href={otherLocale.href} className="btn-ghost !py-1.5 !text-[13px]">
            {otherLocale.label}
          </Link>
        </li>
        <li className="flex items-center justify-between px-5 py-4">
          <span className="text-ink/80">{labels.reset}</span>
          <button type="button" onClick={onReset} className="btn-ghost !py-1.5 !text-[13px]">
            ↺
          </button>
        </li>
      </ul>
    </>
  );
}
