import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

export function Header({ locale, d }: { locale: Locale; d: Dictionary }) {
  const nav = [
    { href: `/${locale}/courses`, label: d.nav.courses },
    { href: `/${locale}/library`, label: d.nav.library },
    { href: `/${locale}/my`, label: d.nav.my },
  ];
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-sand/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-3 sm:gap-4 sm:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-serif text-lg font-semibold tracking-tight">
          <Logo />
          <span className="hidden sm:inline">{d.brand}</span>
          <span className="sr-only sm:hidden">{d.brand}</span>
        </Link>
        <nav className="ml-auto flex items-center gap-0.5 text-[13px] sm:gap-2 sm:text-sm">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="whitespace-nowrap rounded-full px-1.5 py-1.5 text-ink-soft transition hover:bg-gold-soft hover:text-ink sm:px-3"
            >
              {n.label}
            </Link>
          ))}
          <LanguageSwitcher locale={locale} />
        </nav>
      </div>
    </header>
  );
}
