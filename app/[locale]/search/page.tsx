import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, courses, ebooks, flatLessons } from "@/lib/content";
import { getDictionary, isLocale, tr } from "@/lib/i18n";
import { SearchClient, type SearchItem } from "@/components/SearchClient";

export async function generateMetadata({ params }: PageProps<"/[locale]/search">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getDictionary(locale).search.title } : {};
}

export default async function SearchPage({ params }: PageProps<"/[locale]/search">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  const items: SearchItem[] = [
    ...courses.map((c) => ({
      href: `/${locale}/courses/${c.slug}`,
      title: tr(c.title, locale),
      sub: `${d.common.course} · ${tr(categories[c.category], locale)}`,
      hue: c.hue,
      text: [
        tr(c.title, locale),
        tr(c.subtitle, locale),
        tr(c.description, locale),
        tr(categories[c.category], locale),
        ...flatLessons(c).map((l) => tr(l.title, locale)),
      ].join(" "),
    })),
    ...ebooks.map((e) => ({
      href: `/${locale}/library/${e.slug}`,
      title: tr(e.title, locale),
      sub: `${d.common.ebook} · ${tr(e.subtitle, locale)}`,
      hue: e.hue,
      text: [tr(e.title, locale), tr(e.subtitle, locale), ...e.chapters.map((c) => tr(c.title, locale))].join(" "),
    })),
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 md:px-6 md:pt-14">
      <p className="eyebrow">SEARCH</p>
      <h1 className="mt-2 font-serif text-[40px] font-semibold leading-tight tracking-tight">{d.search.title}</h1>
      <SearchClient
        items={items}
        labels={{
          placeholder: d.search.placeholder,
          suggestions: d.search.suggestions,
          empty: d.search.empty,
          results: d.search.results,
        }}
        suggestionList={[...d.search.suggestionList]}
      />
    </div>
  );
}
