import Link from "next/link";
import { ebookMinutes, type Ebook } from "@/lib/content";
import { tr, type Dictionary, type Locale } from "@/lib/i18n";

export function EbookCard({ ebook, locale, d }: { ebook: Ebook; locale: Locale; d: Dictionary }) {
  return (
    <Link
      href={`/${locale}/library/${ebook.slug}`}
      className="group flex gap-5 rounded-2xl border border-line bg-paper p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/5"
    >
      <div
        className="cover flex h-36 w-24 shrink-0 items-end rounded-md p-2.5 shadow-md shadow-ink/20"
        style={{ ["--hue" as string]: ebook.hue }}
      >
        <span className="font-serif text-sm font-semibold leading-tight text-white">{tr(ebook.title, locale)}</span>
      </div>
      <div className="flex flex-col">
        <h3 className="font-serif text-lg font-semibold group-hover:text-gold">{tr(ebook.title, locale)}</h3>
        <p className="mt-1 text-sm text-ink-soft">{tr(ebook.subtitle, locale)}</p>
        <p className="mt-auto pt-3 text-xs text-ink-soft">
          {ebook.chapters.length} {d.library.chapters} · {ebookMinutes(ebook)}
          {locale === "ko" ? "" : " "}
          {d.library.pages}
        </p>
        <span className="mt-2 text-sm font-medium text-gold">{d.library.read} →</span>
      </div>
    </Link>
  );
}
