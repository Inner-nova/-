import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ebookMinutes, ebooks, getEbook } from "@/lib/content";
import { fill, getDictionary, isLocale, locales, tr } from "@/lib/i18n";
import { BookCover } from "@/components/EbookCard";
import { ChevronIcon } from "@/components/Icons";

export function generateStaticParams() {
  return locales.flatMap((locale) => ebooks.map((e) => ({ locale, slug: e.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/library/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const book = getEbook(slug);
  if (!isLocale(locale) || !book) return {};
  return { title: tr(book.title, locale), description: tr(book.subtitle, locale) };
}

export default async function EbookPage({ params }: PageProps<"/[locale]/library/[slug]">) {
  const { locale, slug } = await params;
  const book = getEbook(slug);
  if (!isLocale(locale) || !book) notFound();
  const d = getDictionary(locale);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:px-6">
      <Link href={`/${locale}/courses?category=ebook`} className="inline-flex items-center gap-1 text-[13px] text-muted hover:text-ink">
        <ChevronIcon dir="left" size={14} /> {d.nav.courses}
      </Link>

      <header className="mt-10 flex flex-col items-center text-center">
        <BookCover ebook={book} locale={locale} className="h-72 w-56 shadow-[0_28px_50px_-22px_rgba(0,0,0,0.8)]" />
        <p className="mt-6 text-[12.5px] tracking-wide text-muted">
          {d.common.ebook} · {fill(d.library.readTime, { n: ebookMinutes(book) })}
        </p>
        <h1 className="sr-only">{tr(book.title, locale)}</h1>
      </header>

      <nav className="mt-12 border-y border-gold/30 py-6" aria-label={d.library.toc}>
        <h2 className="label-gold text-center">{d.library.toc}</h2>
        <ol className="mx-auto mt-4 max-w-sm space-y-2.5">
          {book.chapters.map((c, i) => (
            <li key={i}>
              <a href={`#ch-${i + 1}`} className="flex items-baseline gap-3 hover:text-primary">
                <span className="font-serif text-[15px] text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-[18px] font-medium">{tr(c.title, locale)}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-16 space-y-20">
        {book.chapters.map((c, i) => (
          <section key={i} id={`ch-${i + 1}`} className="scroll-mt-24">
            <p className="text-center font-serif text-[15px] italic text-gold">
              {locale === "ko" ? `제${i + 1}장` : `Chapter ${i + 1}`}
            </p>
            <h2 className="mt-2 text-center font-serif text-[28px] font-medium leading-tight text-gold-light">{tr(c.title, locale)}</h2>
            <div className="mx-auto mt-5 h-px w-12 bg-gold/60" />
            <div className="mt-8 space-y-6 font-serif text-[18px] leading-[2] text-ink/85">
              {c.body[locale].map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
