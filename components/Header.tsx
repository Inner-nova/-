import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { SearchIcon } from "./Icons";

export function Header({ locale, d }: { locale: Locale; d: Dictionary }) {
  const nav = [
    { href: `/${locale}`, label: d.nav.explore },
    { href: `/${locale}/courses`, label: d.nav.courses },
    { href: `/${locale}/library`, label: d.nav.library },
    { href: `/${locale}/my`, label: d.nav.my },
  ];
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 md:h-16 md:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <Logo />
          {d.brand}
        </Link>
        <nav className="ml-6 hidden items-center gap-1 text-[15px] md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-lg px-3 py-2 font-medium text-muted transition hover:bg-surface hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href={`/${locale}/search`}
            aria-label={d.nav.search}
            className="hidden h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-surface hover:text-ink md:flex"
          >
            <SearchIcon size={20} />
          </Link>
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}
