import type { Dictionary } from "@/lib/i18n";
import { Logo } from "./Logo";

export function Footer({ d }: { d: Dictionary }) {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-muted md:px-6">
        <div className="mb-1 flex items-center gap-2 text-base font-bold text-ink">
          <Logo size={22} /> {d.brand}
        </div>
        <p>{d.footer.about}</p>
        <p>{d.footer.contact}</p>
        <p className="text-xs">© {new Date().getFullYear()} {d.brand}</p>
      </div>
    </footer>
  );
}
