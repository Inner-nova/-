import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, courses, ebooks, type Category } from "@/lib/content";
import { getDictionary, isLocale, tr } from "@/lib/i18n";
import { CourseCard } from "@/components/CourseCard";
import { EbookCard } from "@/components/EbookCard";
import { Shelf, ShelfItem } from "@/components/Shelf";
import { categoryIcon } from "@/components/Cover";

export default async function Explore({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const beginner = courses.filter((c) => c.level === "beginner");

  return (
    <div className="mx-auto max-w-6xl pt-8 md:px-6 md:pt-12">
      <h1 className="px-4 text-4xl font-bold tracking-tight md:px-0">{d.home.title}</h1>

      {/* 주제 */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between px-4 md:px-0">
          <h2 className="text-2xl font-bold tracking-tight">{d.home.topics}</h2>
          <Link href={`/${locale}/courses`} className="text-[15px] font-medium text-muted hover:text-primary">
            {d.common.viewAll}
          </Link>
        </div>
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1 md:px-0">
          {(Object.keys(categories) as Category[]).map((key) => {
            const Icon = categoryIcon[key];
            return (
              <Link
                key={key}
                href={`/${locale}/courses?category=${key}`}
                className="flex shrink-0 items-center gap-2.5 rounded-xl border border-line bg-white/70 px-5 py-3.5 text-[16px] font-semibold transition hover:border-primary hover:text-primary"
              >
                <Icon size={24} />
                {tr(categories[key], locale)}
              </Link>
            );
          })}
        </div>
      </section>

      {/* 배너 */}
      <div className="mx-4 mt-8 flex flex-col gap-4 mystic rounded-2xl border border-primary/25 px-5 py-5 shadow-[0_6px_24px_rgba(123,92,224,0.12)] sm:flex-row sm:items-center sm:justify-between md:mx-0 md:px-8 md:py-6">
        <div>
          <p className="text-2xl font-extrabold tracking-tight text-primary">
            {d.home.bannerBrand.split(" ")[0]}{" "}
            <span className="ml-0.5 rounded bg-gradient-to-r from-primary to-[#b46fe0] px-1.5 py-0.5 align-middle text-sm font-bold text-white">
              {d.home.bannerBrand.split(" ")[1]}
            </span>
          </p>
          <p className="mt-1.5 text-lg font-semibold">{d.home.bannerBody}</p>
        </div>
        <Link
          href={`/${locale}/courses`}
          className="shrink-0 self-start rounded-xl border-2 border-primary/40 bg-white px-5 py-2.5 text-center text-[16px] font-bold text-primary transition hover:bg-primary hover:text-white sm:self-auto"
        >
          {d.home.bannerCta}
        </Link>
      </div>

      <Shelf title={d.home.startHere} href={`/${locale}/courses`} more={d.common.viewAll}>
        {beginner.map((c) => (
          <ShelfItem key={c.slug}>
            <CourseCard course={c} locale={locale} d={d} />
          </ShelfItem>
        ))}
      </Shelf>

      <Shelf title={d.home.allCourses} href={`/${locale}/courses`} more={d.common.viewAll}>
        {courses.map((c) => (
          <ShelfItem key={c.slug}>
            <CourseCard course={c} locale={locale} d={d} />
          </ShelfItem>
        ))}
      </Shelf>

      <Shelf title={d.home.ebooks} href={`/${locale}/library`} more={d.common.viewAll}>
        {ebooks.map((e) => (
          <ShelfItem key={e.slug}>
            <EbookCard ebook={e} locale={locale} d={d} />
          </ShelfItem>
        ))}
      </Shelf>
    </div>
  );
}
