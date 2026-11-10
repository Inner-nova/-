import type { Dictionary } from "@/lib/i18n";
import { Logo } from "./Logo";

export function Footer({ d }: { d: Dictionary }) {
  return (
    <footer className="mt-24 border-t border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-ink-soft sm:px-6">
        <div className="flex items-center gap-2 font-serif text-base font-semibold text-ink">
          <Logo size={22} /> {d.brand}
        </div>
        <p>{d.footer.about}</p>
        <p>{d.footer.contact}</p>
        <p className="text-xs">© {new Date().getFullYear()} {d.brand}</p>
      </div>
    </footer>
  );
}
