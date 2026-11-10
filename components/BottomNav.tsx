"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "@/lib/i18n";
import { BookIcon, CapIcon, CompassIcon, LearnIcon, SearchIcon } from "./Icons";

/** 모바일 하단 탭바 (데스크톱에서는 숨김) */
export function BottomNav({ locale, d }: { locale: Locale; d: Dictionary }) {
  const pathname = usePathname() ?? "";
  const tabs = [
    { href: `/${locale}`, label: d.nav.explore, Icon: CompassIcon, exact: true },
    { href: `/${locale}/courses`, label: d.nav.courses, Icon: CapIcon },
    { href: `/${locale}/my`, label: d.nav.my, Icon: LearnIcon },
    { href: `/${locale}/library`, label: d.nav.library, Icon: BookIcon },
    { href: `/${locale}/search`, label: d.nav.search, Icon: SearchIcon },
  ];

  return (
    <nav
      className="fixed inset-x-3 bottom-3 z-40 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Main"
    >
      <ul className="flex items-stretch justify-between rounded-[28px] border border-white/70 bg-white/80 p-1.5 shadow-[0_8px_30px_rgba(20,30,60,0.15)] backdrop-blur-xl">
        {tabs.map(({ href, label, Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 rounded-[22px] py-1.5 text-[11px] font-medium transition ${
                  active ? "bg-primary-soft text-primary" : "text-ink"
                }`}
              >
                <Icon size={24} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
