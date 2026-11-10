import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses, flatLessons } from "@/lib/content";
import { getDictionary, isLocale, tr } from "@/lib/i18n";
import { MyLearning } from "@/components/MyLearning";

export async function generateMetadata({ params }: PageProps<"/[locale]/my">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getDictionary(locale).my.title, robots: { index: false } } : {};
}

export default async function MyPage({ params }: PageProps<"/[locale]/my">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const summary = courses.map((c) => ({
    slug: c.slug,
    title: tr(c.title, locale),
    hue: c.hue,
    lessons: flatLessons(c).map((l) => ({ id: l.id, title: tr(l.title, locale) })),
  }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-3xl font-semibold">{d.my.title}</h1>
      <p className="mt-3 rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink-soft">{d.my.note}</p>
      <MyLearning
        locale={locale}
        courses={summary}
        labels={{
          empty: d.my.empty,
          browse: d.my.browse,
          reset: d.my.reset,
          done: d.my.done,
          continue: d.course.continue,
          lessons: d.course.lessons,
        }}
      />
    </div>
  );
}
