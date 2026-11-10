import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, courses, ebooks, type Category } from "@/lib/content";
import { getDictionary, isLocale, tr } from "@/lib/i18n";
import { CourseCard } from "@/components/CourseCard";
import { EbookCard } from "@/components/EbookCard";
import { SectionHead, Shelf, ShelfItem } from "@/components/Shelf";
import { categoryIcon } from "@/components/Cover";
import { ArrowIcon } from "@/components/Icons";

export default async function Explore({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const beginner = courses.filter((c) => c.level === "beginner");
  const first = beginner[0] ?? courses[0];

  return (
    <>
      {/* 첫 화면 */}
      <section className="px-4 pt-5 md:px-6 md:pt-8">
        <div className="night relative mx-auto max-w-6xl overflow-hidden rounded-[28px] px-6 py-12 md:px-14 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(220,196,149,0.35),transparent_65%)]"
            style={{ animation: "glow 9s ease-in-out infinite" }}
          />
          <svg aria-hidden className="pointer-events-none absolute -right-16 top-1/2 hidden h-[130%] -translate-y-1/2 opacity-40 md:block" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#dcc495" strokeWidth="0.25" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="#dcc495" strokeWidth="0.25" />
            <circle cx="50" cy="50" r="24" fill="none" stroke="#fff" strokeWidth="0.2" />
            <circle cx="50" cy="50" r="2.5" fill="#dcc495" />
          </svg>
          <div className="relative max-w-xl">
            <p className="eyebrow text-gold-light">{d.home.heroEyebrow}</p>
            <h1 className="mt-5 whitespace-pre-line font-serif text-[38px] font-semibold leading-[1.15] tracking-tight md:text-[56px]">
              {d.home.heroTitle}
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70 md:text-base">{d.home.heroBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/courses/${first.slug}`} className="btn-primary">
                {d.home.ctaStart} <ArrowIcon size={17} />
              </Link>
              <Link href={`/${locale}/library`} className="btn-ghost-dark">
                {d.home.ctaLibrary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl md:px-6">
        {/* 주제 */}
        <section className="mt-14">
          <SectionHead
            eyebrow={d.home.eyebrows.topics}
            title={d.home.topics}
            href={`/${locale}/courses`}
            more={d.common.viewAll}
            className="mb-6 px-4 md:px-0"
          />
          <div className="grid grid-cols-3 gap-3 px-4 md:max-w-xl md:px-0">
            {(Object.keys(categories) as Category[]).map((key) => {
              const Icon = categoryIcon[key];
              return (
                <Link key={key} href={`/${locale}/courses?category=${key}`} className="group flex flex-col items-center gap-3 text-center">
                  <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-gradient-to-br from-white to-surface text-primary shadow-[inset_0_0_0_1px_rgba(176,141,85,0.45),0_10px_24px_-14px_rgba(60,30,110,0.5)] transition duration-300 group-hover:-translate-y-0.5 group-hover:text-plum">
                    <Icon size={30} strokeWidth={1.4} />
                  </span>
                  <span className="font-serif text-[17px] font-semibold">{tr(categories[key], locale)}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <Shelf eyebrow={d.home.eyebrows.start} title={d.home.startHere} href={`/${locale}/courses`} more={d.common.viewAll}>
          {beginner.map((c) => (
            <ShelfItem key={c.slug}>
              <CourseCard course={c} locale={locale} d={d} />
            </ShelfItem>
          ))}
        </Shelf>

        {/* 오늘의 문장 */}
        <figure className="mx-4 mt-16 border-y border-gold/30 py-10 text-center md:mx-0">
          <p className="label-gold">{d.home.quoteLabel}</p>
          <blockquote className="mx-auto mt-4 max-w-xl font-serif text-[26px] font-medium italic leading-snug md:text-[32px]">
            “{d.home.quote}”
          </blockquote>
          <figcaption className="mt-4 text-[13px] tracking-wide text-muted">{d.home.quoteSource}</figcaption>
        </figure>

        <Shelf eyebrow={d.home.eyebrows.all} title={d.home.allCourses} href={`/${locale}/courses`} more={d.common.viewAll}>
          {courses.map((c) => (
            <ShelfItem key={c.slug}>
              <CourseCard course={c} locale={locale} d={d} />
            </ShelfItem>
          ))}
        </Shelf>

        <Shelf eyebrow={d.home.eyebrows.ebooks} title={d.home.ebooks} href={`/${locale}/library`} more={d.common.viewAll}>
          {ebooks.map((e) => (
            <ShelfItem key={e.slug}>
              <EbookCard ebook={e} locale={locale} d={d} />
            </ShelfItem>
          ))}
        </Shelf>
      </div>
    </>
  );
}
