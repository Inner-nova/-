import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ebooks, getEbook } from "@/lib/content";
import { getDictionary, isLocale, locales, tr } from "@/lib/i18n";

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
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link href={`/${locale}/library`} className="text-sm text-ink-soft hover:text-ink">
        ← {d.library.back}
      </Link>

      <header className="mt-8 flex flex-col items-center text-center">
        <div
          className="cover flex h-56 w-40 items-end rounded-md p-4 text-left shadow-xl shadow-ink/25"
          style={{ ["--hue" as string]: book.hue }}
        >
          <span className="font-serif text-xl font-semibold leading-tight text-white">{tr(book.title, locale)}</span>
        </div>
        <h1 className="mt-8 font-serif text-3xl font-semibold">{tr(book.title, locale)}</h1>
        <p className="mt-2 text-ink-soft">{tr(book.subtitle, locale)}</p>
      </header>

      <nav className="mt-12 rounded-2xl border border-line bg-paper p-6" aria-label={d.library.toc}>
        <h2 className="text-sm font-semibold text-gold">{d.library.toc}</h2>
        <ol className="mt-3 space-y-2">
          {book.chapters.map((c, i) => (
            <li key={i}>
              <a href={`#ch-${i + 1}`} className="hover:text-gold">
                {i + 1}. {tr(c.title, locale)}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-14 space-y-16">
        {book.chapters.map((c, i) => (
          <section key={i} id={`ch-${i + 1}`} className="scroll-mt-24">
            <p className="font-serif text-sm text-gold">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="mt-1 font-serif text-2xl font-semibold">{tr(c.title, locale)}</h2>
            <div className="mt-6 space-y-5 font-serif text-[1.1rem] leading-9 text-ink/90">
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
