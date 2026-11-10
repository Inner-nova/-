"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "@/lib/i18n";
import { MoonIcon, SparkleIcon, TelescopeIcon } from "./Icons";

/** 모바일 하단 탭바: 밤하늘색 바, 선택된 탭은 금빛 아이콘과 점으로 표시 (데스크톱에서는 숨김) */
export function BottomNav({ locale, d }: { locale: Locale; d: Dictionary }) {
  const pathname = usePathname() ?? "";
  const tabs: { href: string; label: string; Icon: typeof MoonIcon; exact?: boolean; also?: string[] }[] = [
    { href: `/${locale}`, label: d.nav.explore, Icon: SparkleIcon, exact: true },
    { href: `/${locale}/courses`, label: d.nav.courses, Icon: MoonIcon, also: [`/${locale}/library`] },
    { href: `/${locale}/search`, label: d.nav.search, Icon: TelescopeIcon },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 px-4 md:hidden"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
      aria-label="Main"
    >
      <ul className="mx-auto flex max-w-sm items-stretch justify-between rounded-[26px] bg-night/95 px-2 py-2 shadow-[0_12px_36px_-8px_rgba(27,19,49,0.55)] ring-1 ring-gold/25 backdrop-blur-xl">
        {tabs.map(({ href, label, Icon, exact, also }) => {
          const active = exact ? pathname === href : [href, ...(also ?? [])].some((p) => pathname.startsWith(p));
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 py-1 text-[10.5px] font-medium tracking-wide transition ${
                  active ? "text-gold-light" : "text-white/55 hover:text-white/80"
                }`}
              >
                <Icon size={22} strokeWidth={active ? 1.9 : 1.5} />
                {label}
                <span className={`h-1 w-1 rounded-full ${active ? "bg-gold-light" : "bg-transparent"}`} aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
