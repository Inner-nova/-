import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, courses, type Category } from "@/lib/content";
import { getDictionary, isLocale, tr } from "@/lib/i18n";
import { CourseCard } from "@/components/CourseCard";
import { CategoryFilter } from "@/components/CategoryFilter";

export async function generateMetadata({ params }: PageProps<"/[locale]/courses">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getDictionary(locale).course.catalogTitle } : {};
}

export default async function CoursesPage({ params }: PageProps<"/[locale]/courses">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const cats = (Object.keys(categories) as Category[]).map((key) => ({ key, label: tr(categories[key], locale) }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-3xl font-semibold">{d.course.catalogTitle}</h1>
      <p className="mt-2 text-ink-soft">{d.course.catalogBody}</p>
      <CategoryFilter allLabel={d.course.allCategories} categories={cats}>
        {courses.map((c) => (
          <div key={c.slug} data-category={c.category} className="flex">
            <CourseCard course={c} locale={locale} d={d} />
          </div>
        ))}
      </CategoryFilter>
    </div>
  );
}
