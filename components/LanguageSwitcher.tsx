"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const other: Locale = locale === "ko" ? "en" : "ko";
  const href = pathname.replace(/^\/(ko|en)(?=\/|$)/, `/${other}`);
  return (
    <Link
      href={href}
      hrefLang={other}
      className="whitespace-nowrap rounded-full border border-gold/40 px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-muted transition hover:border-gold hover:text-ink"
      aria-label={other === "en" ? "Switch to English" : "한국어로 보기"}
    >
      {other === "en" ? "EN" : "한국어"}
    </Link>
  );
}
