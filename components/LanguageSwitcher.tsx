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
      className="ml-0.5 whitespace-nowrap rounded-full border border-line px-2 sm:ml-1 sm:px-2.5 py-1 text-xs font-medium text-ink-soft transition hover:border-gold hover:text-ink"
      aria-label={other === "en" ? "Switch to English" : "한국어로 보기"}
    >
      {other === "en" ? "EN" : "한국어"}
    </Link>
  );
}
