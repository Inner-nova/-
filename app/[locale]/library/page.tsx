import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ebooks } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";
import { EbookRow } from "@/components/EbookCard";

export async function generateMetadata({ params }: PageProps<"/[locale]/library">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getDictionary(locale).library.title } : {};
}

export default async function LibraryPage({ params }: PageProps<"/[locale]/library">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 md:px-6 md:pt-14">
      <p className="eyebrow">FREE LIBRARY</p>
      <h1 className="mt-2 font-serif text-[40px] font-semibold leading-tight tracking-tight">{d.library.title}</h1>
      <p className="mt-2 text-muted">{d.library.body}</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {ebooks.map((e) => (
          <EbookRow key={e.slug} ebook={e} locale={locale} d={d} />
        ))}
      </div>
    </div>
  );
}
