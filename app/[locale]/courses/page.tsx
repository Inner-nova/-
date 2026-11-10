import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { categories, courses, ebooks, flatLessons, type Category } from "@/lib/content";
import { getDictionary, isLocale, tr } from "@/lib/i18n";
import { CourseCard } from "@/components/CourseCard";
import { EbookCard } from "@/components/EbookCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ContinueStrip } from "@/components/ContinueStrip";

export async function generateMetadata({ params }: PageProps<"/[locale]/courses">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getDictionary(locale).course.catalogTitle } : {};
}

const GRID = "grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-8 md:gap-y-10 lg:grid-cols-4";

/** 훈련: 이어하기 + 강의 + 전자책을 한 곳에 */
export default async function TrainingPage({ params }: PageProps<"/[locale]/courses">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  const filters = [
    ...(Object.keys(categories) as Category[]).map((key) => ({ key, label: tr(categories[key], locale) })),
    { key: "ebook", label: d.common.ebook },
  ];
  const cards = [
    ...courses.map((c) => ({ key: c.slug, category: c.category, node: <CourseCard course={c} locale={locale} d={d} /> })),
    ...ebooks.map((e) => ({ key: e.slug, category: "ebook", node: <EbookCard ebook={e} locale={locale} /> })),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 md:px-6 md:pt-14">
      <h1 className="sr-only">{d.course.catalogTitle}</h1>
      <ContinueStrip
        locale={locale}
        courses={courses.map((c) => ({ slug: c.slug, title: tr(c.title, locale), lessonIds: flatLessons(c).map((l) => l.id) }))}
        labels={{ title: d.course.inProgress, resume: d.my.resume }}
      />
      <Suspense
        fallback={
          <div className={`mt-[66px] ${GRID}`}>
            {cards.map((c) => (
              <div key={c.key}>{c.node}</div>
            ))}
          </div>
        }
      >
        <CategoryFilter allLabel={d.course.allCategories} categories={filters} gridClass={GRID}>
          {cards.map((c) => (
            <div key={c.key} data-category={c.category}>
              {c.node}
            </div>
          ))}
        </CategoryFilter>
      </Suspense>
    </div>
  );
}
