import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ebookMinutes, ebooks, getEbook } from "@/lib/content";
import { fill, getDictionary, isLocale, locales, tr } from "@/lib/i18n";
import { Cover } from "@/components/Cover";
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
    <div className="mx-auto max-w-2xl px-4 py-8 md:px-6">
      <Link href={`/${locale}/library`} className="flex items-center gap-1 text-sm text-muted hover:text-ink">
        <ChevronIcon dir="left" size={16} /> {d.library.back}
      </Link>

      <header className="mt-8 flex flex-col items-center text-center">
        <Cover hue={book.hue} className="flex h-56 w-40 items-end rounded-lg p-4 text-left shadow-xl shadow-ink/20">
          <span className="relative text-xl font-bold leading-tight text-white">{tr(book.title, locale)}</span>
        </Cover>
        <p className="mt-8 text-sm text-muted">
          {d.common.provider} · {d.common.ebook} · {fill(d.library.readTime, { n: ebookMinutes(book) })}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{tr(book.title, locale)}</h1>
        <p className="mt-2 text-muted">{tr(book.subtitle, locale)}</p>
      </header>

      <nav className="mt-10 rounded-2xl border border-line" aria-label={d.library.toc}>
        <h2 className="border-b border-line px-5 py-3.5 font-bold">{d.library.toc}</h2>
        <ol>
          {book.chapters.map((c, i) => (
            <li key={i} className="border-b border-line last:border-0">
              <a href={`#ch-${i + 1}`} className="flex items-center gap-3 px-5 py-3.5 text-[15px] hover:bg-surface">
                <span className="w-6 font-semibold text-primary">{i + 1}</span>
                {tr(c.title, locale)}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-14 space-y-16">
        {book.chapters.map((c, i) => (
          <section key={i} id={`ch-${i + 1}`} className="scroll-mt-24">
            <p className="text-sm font-bold text-primary">
              {locale === "ko" ? `${i + 1}장` : `Chapter ${i + 1}`}
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">{tr(c.title, locale)}</h2>
            <div className="mt-6 space-y-5 text-[17px] leading-9 text-ink/90">
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
