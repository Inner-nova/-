import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, courses, ebooks, type Category } from "@/lib/content";
import { getDictionary, isLocale, tr } from "@/lib/i18n";
import { CourseCard } from "@/components/CourseCard";
import { EbookCard } from "@/components/EbookCard";
import { Shelf, ShelfItem } from "@/components/Shelf";
import { Stardust } from "@/components/Stardust";
import { BondIcon, InquiryIcon, WaveIcon } from "@/components/Icons";

const topicIcon: Record<Category, typeof InquiryIcon> = {
  embodiment: InquiryIcon,
  emotion: WaveIcon,
  relationship: BondIcon,
};

export default async function Explore({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const first = courses.find((c) => c.level === "beginner") ?? courses[0];

  return (
    <>
      {/* 첫 화면: 초대장 같은 큰 타원 */}
      <section className="px-4 pt-5 md:px-6 md:pt-8">
        <div className="relative mx-auto aspect-[4/5] max-w-6xl overflow-hidden rounded-[6px] bg-deep gold-frame sm:aspect-[16/10] md:aspect-[16/8]">
          <div className="md:hidden">
            <Stardust seed={2026} density={1.4} />
          </div>
          <div className="hidden md:block">
            <Stardust seed={2026} density={2.2} w={200} h={100} />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center pb-[5%] text-center">
            <p className="font-serif text-[15px] italic text-gold/90 md:text-[17px]">Practical Mind Training</p>
            <h1 className="mt-2 font-serif text-[58px] font-medium italic leading-none tracking-tight text-gold-light md:text-[84px]">
              Aruven
            </h1>
            <p className="mt-5 font-serif text-[16px] font-medium tracking-wide text-ink/85 md:text-[19px]">{d.tagline}</p>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <Link href={`/${locale}/courses/${first.slug}`} className="btn-primary">
            {d.home.ctaStart}
          </Link>
          <Link href={`/${locale}/library`} className="btn-ghost-dark">
            {d.home.ctaLibrary}
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-6xl md:px-6">
        {/* 주제 */}
        <nav className="mt-16 flex justify-center gap-8 px-4 md:gap-14" aria-label={d.home.topics}>
          {(Object.keys(categories) as Category[]).map((key) => {
            const Icon = topicIcon[key];
            return (
              <Link key={key} href={`/${locale}/courses?category=${key}`} className="group flex flex-col items-center gap-3">
                <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full border border-gold/40 text-gold-light transition duration-300 group-hover:border-gold group-hover:bg-gold/10">
                  <Icon size={26} strokeWidth={1.2} />
                </span>
                <span className="font-serif text-[15px] font-medium text-ink/90">{tr(categories[key], locale)}</span>
              </Link>
            );
          })}
        </nav>

        <Shelf title={d.home.allCourses}>
          {courses.map((c) => (
            <ShelfItem key={c.slug}>
              <CourseCard course={c} locale={locale} d={d} />
            </ShelfItem>
          ))}
        </Shelf>

        <Shelf title={d.home.ebooks}>
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
