import type { Dictionary } from "@/lib/i18n";
import { Wordmark } from "./Logo";

export function Footer({ d }: { d: Dictionary }) {
  return (
    <footer className="night mt-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-12 text-sm text-white/60 md:px-6">
        <Wordmark brand={d.wordmark} light />
        <p className="mt-2 font-serif text-lg italic text-gold-light/90">{d.tagline}</p>
        <p>{d.footer.about}</p>
        <p>{d.footer.contact}</p>
        <p className="mt-4 border-t border-white/10 pt-4 text-xs tracking-wide text-white/40">
          © {new Date().getFullYear()} {d.wordmark}
        </p>
      </div>
    </footer>
  );
}
