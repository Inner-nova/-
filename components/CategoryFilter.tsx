"use client";

import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  allLabel: string;
  categories: { key: string; label: string }[];
  children: ReactNode;
};

/** 주제 칩으로 강의 목록을 걸러냅니다. 선택값은 주소(?category=)에 남아 공유할 수 있어요. */
export function CategoryFilter({ allLabel, categories, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const requested = params.get("category") ?? "all";
  const active = categories.some((c) => c.key === requested) ? requested : "all";

  const items = Children.toArray(children).filter(isValidElement) as ReactElement<{ "data-category"?: string }>[];
  const visible = items.filter((el) => active === "all" || el.props["data-category"] === active);
  const options = [{ key: "all", label: allLabel }, ...categories];

  const select = (key: string) => {
    const url = key === "all" ? pathname : `${pathname}?category=${key}`;
    router.replace(url, { scroll: false });
  };

  return (
    <>
      <div className="no-scrollbar -mx-4 mb-8 mt-6 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0" role="group">
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            onClick={() => select(o.key)}
            aria-pressed={active === o.key}
            className={`shrink-0 rounded-full border px-4 py-2 text-[15px] font-semibold transition ${
              active === o.key ? "border-primary bg-primary text-white" : "border-line text-ink hover:border-primary hover:text-primary"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-6 lg:grid-cols-4">{visible}</div>
    </>
  );
}
