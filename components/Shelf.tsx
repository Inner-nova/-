import Link from "next/link";

export function SectionHead({
  eyebrow,
  title,
  href,
  more,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  more?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-1.5 font-serif text-[28px] font-semibold leading-tight tracking-tight md:text-[32px]">{title}</h2>
      </div>
      {href && more && (
        <Link href={href} className="link-gold shrink-0 pb-1">
          {more} <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}

/** 제목 + 가로 스크롤 카드 목록 (데스크톱에서는 격자) */
export function Shelf({
  eyebrow,
  title,
  href,
  more,
  children,
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  more?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <SectionHead eyebrow={eyebrow} title={title} href={href} more={more} className="mb-6 px-4 md:px-0" />
      <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-3 md:grid md:grid-cols-3 md:gap-7 md:overflow-visible md:px-0 lg:grid-cols-4">
        {children}
      </div>
    </section>
  );
}

export function ShelfItem({ children }: { children: React.ReactNode }) {
  return <div className="w-[62%] min-w-[200px] max-w-[260px] shrink-0 snap-start md:w-auto md:min-w-0 md:max-w-none">{children}</div>;
}
