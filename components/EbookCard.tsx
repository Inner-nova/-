import Link from "next/link";
import { ebookMinutes, type Ebook } from "@/lib/content";
import { fill, tr, type Dictionary, type Locale } from "@/lib/i18n";
import { Cover } from "./Cover";

/** 책 표지 */
export function BookCover({ ebook, locale, className = "" }: { ebook: Ebook; locale: Locale; className?: string }) {
  return (
    <Cover hue={ebook.hue} className={`gold-frame flex flex-col justify-end rounded-r-[14px] rounded-l-[4px] p-4 ${className}`}>
      <span aria-hidden className="absolute inset-y-0 left-2 w-px bg-white/25" />
      <span className="relative font-serif text-[19px] font-semibold leading-tight text-white">{tr(ebook.title, locale)}</span>
      <span className="relative mt-1 text-[9px] font-semibold tracking-[0.22em] text-gold-light">ARUVEN</span>
    </Cover>
  );
}

/** 가로 스크롤 목록용 */
export function EbookCard({ ebook, locale, d }: { ebook: Ebook; locale: Locale; d: Dictionary }) {
  return (
    <Link href={`/${locale}/library/${ebook.slug}`} className="group block">
      <BookCover
        ebook={ebook}
        locale={locale}
        className="aspect-[4/5] shadow-[0_14px_30px_-16px_rgba(40,20,80,0.6)] transition duration-500 group-hover:-translate-y-1"
      />
      <p className="label-gold mt-4">{d.common.ebook}</p>
      <h3 className="mt-1.5 font-serif text-[21px] font-semibold leading-snug">{tr(ebook.title, locale)}</h3>
      <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-muted">{tr(ebook.subtitle, locale)}</p>
      <p className="mt-2.5 text-[12.5px] tracking-wide text-muted">
        {ebook.chapters.length} {d.library.chapters} <span className="mx-1 text-gold">·</span>{" "}
        {fill(d.library.readTime, { n: ebookMinutes(ebook) })}
      </p>
    </Link>
  );
}

/** 서재 목록용 가로형 */
export function EbookRow({ ebook, locale, d }: { ebook: Ebook; locale: Locale; d: Dictionary }) {
  return (
    <Link
      href={`/${locale}/library/${ebook.slug}`}
      className="group flex gap-5 rounded-[22px] border border-line bg-white/70 p-5 transition hover:border-gold/50 hover:bg-white"
    >
      <BookCover ebook={ebook} locale={locale} className="h-36 w-28 shrink-0 shadow-[0_12px_24px_-12px_rgba(40,20,80,0.6)]" />
      <div className="flex min-w-0 flex-col">
        <p className="label-gold">{d.common.ebook}</p>
        <h3 className="mt-1.5 font-serif text-[22px] font-semibold leading-snug">{tr(ebook.title, locale)}</h3>
        <p className="mt-1 text-[14px] leading-relaxed text-muted">{tr(ebook.subtitle, locale)}</p>
        <span className="link-gold mt-auto pt-3">
          {d.library.read} <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
