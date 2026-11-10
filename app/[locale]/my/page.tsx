import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, courses } from "@/lib/content";
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
    category: tr(categories[c.category], locale),
    hue: c.hue,
    modules: c.modules.map((m) => ({ title: tr(m.title, locale), lessonIds: m.lessons.map((l) => l.id) })),
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 md:px-6 md:pt-14">
      <p className="eyebrow">{d.my.eyebrow}</p>
      <h1 className="mt-2 font-serif text-[40px] font-semibold leading-tight tracking-tight">{d.my.title}</h1>
      <MyLearning locale={locale} courses={summary} labels={{ ...d.my }} />
    </div>
  );
}
