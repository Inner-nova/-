import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ebooks } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";
import { EbookCard } from "@/components/EbookCard";

export async function generateMetadata({ params }: PageProps<"/[locale]/library">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getDictionary(locale).library.title } : {};
}

export default async function LibraryPage({ params }: PageProps<"/[locale]/library">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-3xl font-semibold">{d.library.title}</h1>
      <p className="mt-2 text-ink-soft">{d.library.body}</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {ebooks.map((e) => (
          <EbookCard key={e.slug} ebook={e} locale={locale} d={d} />
        ))}
      </div>
    </div>
  );
}
