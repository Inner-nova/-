"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { fill } from "@/lib/i18n";
import { SearchIcon } from "./Icons";
import { Stardust } from "./Stardust";

export type SearchItem = { href: string; title: string; sub: string; hue: number; text: string };

type Labels = { placeholder: string; suggestions: string; empty: string; results: string };

export function SearchClient({
  items,
  labels,
  suggestionList,
}: {
  items: SearchItem[];
  labels: Labels;
  suggestionList: string[];
}) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const results = useMemo(
    () => (query ? items.filter((i) => i.text.toLowerCase().includes(query)) : []),
    [items, query],
  );

  return (
    <div className="mt-6">
      <label className="flex items-center gap-3 rounded-full border border-gold/40 bg-deep/70 px-5 py-3.5 shadow-[0_10px_30px_-20px_rgba(60,30,110,0.5)] focus-within:border-gold">
        <SearchIcon size={20} className="text-gold" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={labels.placeholder}
          maxLength={60}
          className="w-full bg-transparent text-[17px] outline-none placeholder:text-muted focus-visible:outline-none"
          autoComplete="off"
        />
      </label>

      {!query && (
        <div className="mt-8">
          <h2 className="label-gold">{labels.suggestions}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestionList.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQ(s)}
                className="btn-ghost font-serif !text-[16px]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {query && (
        <div className="mt-6">
          <p className="text-sm text-muted" aria-live="polite">
            {results.length ? fill(labels.results, { n: results.length }) : labels.empty}
          </p>
          <ul className="mt-3 divide-y divide-line">
            {results.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="flex items-center gap-4 py-4 hover:opacity-80">
                  <span className="gold-frame relative h-16 w-14 shrink-0 overflow-hidden rounded-[4px] bg-deep">
                    <Stardust seed={r.hue} density={0.4} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-serif text-[18px] font-medium text-gold-light">{r.title}</span>
                    <span className="mt-0.5 block truncate text-sm text-muted">{r.sub}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
