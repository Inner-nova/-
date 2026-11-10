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
    <div className="mx-auto max-w-6xl px-4 pt-10 md:px-6 md:pt-14">
      <h1 className="text-center font-serif text-[34px] font-medium italic text-gold-light">{d.library.title}</h1>
      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-5 gap-y-10 md:gap-x-10">
        {ebooks.map((e) => (
          <EbookCard key={e.slug} ebook={e} locale={locale} d={d} />
        ))}
      </div>
    </div>
  );
}
