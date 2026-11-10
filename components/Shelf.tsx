import Link from "next/link";

/** 제목 + "모두 보기" + 가로 스크롤 카드 목록 */
export function Shelf({
  title,
  href,
  more,
  children,
}: {
  title: string;
  href?: string;
  more?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-center justify-between gap-4 px-4 md:px-0">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {href && more && (
          <Link href={href} className="shrink-0 text-[15px] font-medium text-muted hover:text-primary">
            {more}
          </Link>
        )}
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-4">
        {children}
      </div>
    </section>
  );
}

export function ShelfItem({ children }: { children: React.ReactNode }) {
  return <div className="w-[44%] min-w-[150px] shrink-0 snap-start md:w-auto md:min-w-0">{children}</div>;
}
