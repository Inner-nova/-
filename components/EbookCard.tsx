import Link from "next/link";
import type { Ebook } from "@/lib/content";
import { tr, type Dictionary, type Locale } from "@/lib/i18n";
import { InviteCover, seedOf } from "./Stardust";

/** 책 표지: 초대장 모양 + 왼쪽 책등 선 */
export function BookCover({ ebook, locale, className = "", small = false }: { ebook: Ebook; locale: Locale; className?: string; small?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      <InviteCover
        title={tr(ebook.title, locale)}
        seed={seedOf(ebook.slug)}
        kicker="Aruven"
        small={small}
        className="gold-frame h-full w-full rounded-r-[6px] rounded-l-[2px]"
      />
      <span aria-hidden className="absolute inset-y-0 left-2 w-px bg-gold/25" />
    </div>
  );
}

export function EbookCard({ ebook, locale }: { ebook: Ebook; locale: Locale; d?: Dictionary }) {
  return (
    <Link href={`/${locale}/library/${ebook.slug}`} className="group block">
      <BookCover
        ebook={ebook}
        locale={locale}
        className="aspect-[4/5] shadow-[0_18px_34px_-18px_rgba(0,0,0,0.75)] transition duration-500 group-hover:-translate-y-1"
      />
    </Link>
  );
}
