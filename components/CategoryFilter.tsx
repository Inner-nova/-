"use client";

import { Children, isValidElement, useState, type ReactElement, type ReactNode } from "react";

type Props = {
  allLabel: string;
  categories: { key: string; label: string }[];
  children: ReactNode;
};

export function CategoryFilter({ allLabel, categories, children }: Props) {
  const [active, setActive] = useState<string>("all");
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<{ "data-category"?: string }>[];
  const visible = items.filter((el) => active === "all" || el.props["data-category"] === active);
  const options = [{ key: "all", label: allLabel }, ...categories];

  return (
    <>
      <div className="mt-8 mb-8 flex flex-wrap gap-2" role="group">
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            onClick={() => setActive(o.key)}
            aria-pressed={active === o.key}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              active === o.key ? "border-ink bg-ink text-white" : "border-line bg-paper text-ink-soft hover:border-gold"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>div>a]:w-full">{visible}</div>
    </>
  );
}
