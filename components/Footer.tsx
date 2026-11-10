import type { Dictionary } from "@/lib/i18n";
import { Wordmark } from "./Logo";

export function Footer({ d }: { d: Dictionary }) {
  return (
    <footer className="mt-28 border-t border-line/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-12 text-center md:px-6">
        <Wordmark brand={d.wordmark} light />
        <p className="mt-1 text-[11px] tracking-[0.18em] text-muted/70">© {new Date().getFullYear()} ARUVEN</p>
      </div>
    </footer>
  );
}
