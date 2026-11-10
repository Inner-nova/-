import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { categories, courses, type Category } from "@/lib/content";
import { getDictionary, isLocale, tr } from "@/lib/i18n";
import { CourseCard } from "@/components/CourseCard";
import { CategoryFilter } from "@/components/CategoryFilter";

export async function generateMetadata({ params }: PageProps<"/[locale]/courses">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getDictionary(locale).course.catalogTitle } : {};
}

const GRID = "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4";

export default async function CoursesPage({ params }: PageProps<"/[locale]/courses">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const cats = (Object.keys(categories) as Category[]).map((key) => ({ key, label: tr(categories[key], locale) }));
  const cards = courses.map((c) => ({
    category: c.category,
    node: <CourseCard key={c.slug} course={c} locale={locale} d={d} />,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 md:px-6 md:pt-14">
      <h1 className="text-center font-serif text-[34px] font-medium italic text-gold-light">{d.course.catalogTitle}</h1>
      <Suspense
        fallback={
          <div className={`mt-[84px] ${GRID}`}>
            {cards.map(({ node }) => (
              <div key={node.key}>{node}</div>
            ))}
          </div>
        }
      >
        <CategoryFilter allLabel={d.course.allCategories} categories={cats} gridClass={GRID}>
          {cards.map(({ category, node }) => (
            <div key={node.key} data-category={category}>
              {node}
            </div>
          ))}
        </CategoryFilter>
      </Suspense>
    </div>
  );
}
