import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Wordmark } from "./Logo";
import { SearchIcon } from "./Icons";

export function Header({ locale, d }: { locale: Locale; d: Dictionary }) {
  const nav = [
    { href: `/${locale}`, label: d.nav.explore },
    { href: `/${locale}/courses`, label: d.nav.courses },
    { href: `/${locale}/library`, label: d.nav.library },
    { href: `/${locale}/my`, label: d.nav.my },
  ];
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-ivory/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 md:px-6">
        <Link href={`/${locale}`} aria-label={d.brand}>
          <Wordmark brand={d.brand} />
        </Link>
        <nav className="ml-8 hidden items-center gap-7 text-[14px] md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="relative py-2 font-medium text-muted transition after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition hover:text-ink hover:after:scale-x-100"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href={`/${locale}/search`}
            aria-label={d.nav.search}
            className="hidden h-9 w-9 items-center justify-center rounded-full text-muted transition hover:text-ink md:flex"
          >
            <SearchIcon size={19} />
          </Link>
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}
