"use client";

import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  allLabel: string;
  categories: { key: string; label: string }[];
  gridClass: string;
  children: ReactNode;
};

/** 주제 탭으로 강의 목록을 걸러냅니다. 선택값은 주소(?category=)에 남아 공유할 수 있어요. */
export function CategoryFilter({ allLabel, categories, gridClass, children }: Props) {
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
      <div className="no-scrollbar -mx-4 mb-10 flex justify-start gap-6 overflow-x-auto border-b border-line px-4 sm:justify-center md:mx-0 md:px-0" role="group">
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            onClick={() => select(o.key)}
            aria-pressed={active === o.key}
            className={`-mb-px shrink-0 border-b pb-3 font-serif text-[16px] font-medium transition ${
              active === o.key ? "border-gold text-gold-light" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className={gridClass}>{visible}</div>
    </>
  );
}
