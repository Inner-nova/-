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

const GRID = "grid grid-cols-1 gap-x-6 gap-y-12 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

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
      <p className="eyebrow">ALL COURSES</p>
      <h1 className="mt-2 font-serif text-[40px] font-semibold leading-tight tracking-tight">{d.course.catalogTitle}</h1>
      <p className="mt-2 text-muted">{d.course.catalogBody}</p>
      <Suspense
        fallback={
          <div className={`mt-[92px] ${GRID}`}>
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
