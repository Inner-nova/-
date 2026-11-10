import Link from "next/link";
import { ebookMinutes, type Ebook } from "@/lib/content";
import { fill, tr, type Dictionary, type Locale } from "@/lib/i18n";
import { Cover } from "./Cover";

/** 세로형 전자책 카드 (가로 스크롤 목록용) */
export function EbookCard({ ebook, locale, d }: { ebook: Ebook; locale: Locale; d: Dictionary }) {
  return (
    <Link href={`/${locale}/library/${ebook.slug}`} className="group block">
      <Cover hue={ebook.hue} className="flex aspect-[7/5] items-end rounded-xl p-4">
        <span className="relative text-lg font-bold leading-tight text-white drop-shadow">{tr(ebook.title, locale)}</span>
      </Cover>
      <h3 className="mt-3 text-[17px] font-semibold leading-snug group-hover:underline">{tr(ebook.title, locale)}</h3>
      <p className="mt-1.5 text-[15px] text-muted">{tr(ebook.subtitle, locale)}</p>
      <p className="mt-0.5 text-[15px] text-muted">{d.common.ebook}</p>
      <p className="mt-1.5 text-sm">
        {ebook.chapters.length} {d.library.chapters} · {fill(d.library.readTime, { n: ebookMinutes(ebook) })}
      </p>
    </Link>
  );
}

/** 가로형 전자책 행 (서재 목록용) */
export function EbookRow({ ebook, locale, d }: { ebook: Ebook; locale: Locale; d: Dictionary }) {
  return (
    <Link
      href={`/${locale}/library/${ebook.slug}`}
      className="group flex gap-4 rounded-2xl border border-line p-4 transition hover:border-primary/40 hover:shadow-sm"
    >
      <Cover hue={ebook.hue} className="flex h-32 w-24 shrink-0 items-end rounded-lg p-2.5 shadow-md">
        <span className="relative text-sm font-bold leading-tight text-white">{tr(ebook.title, locale)}</span>
      </Cover>
      <div className="flex min-w-0 flex-col">
        <p className="text-sm text-muted">{d.common.provider}</p>
        <h3 className="mt-0.5 text-lg font-semibold group-hover:underline">{tr(ebook.title, locale)}</h3>
        <p className="mt-1 text-[15px] text-muted">{tr(ebook.subtitle, locale)}</p>
        <p className="mt-auto pt-2 text-sm">
          {ebook.chapters.length} {d.library.chapters} · {fill(d.library.readTime, { n: ebookMinutes(ebook) })}
        </p>
      </div>
    </Link>
  );
}
