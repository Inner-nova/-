/** 양옆 금빛 선이 있는 가운데 정렬 제목 */
export function SectionHead({ title, className = "" }: { title: string; className?: string }) {
  return (
    <h2 className={`lined font-serif text-[22px] font-medium tracking-wide text-gold-light md:text-[26px] ${className}`}>
      <span className="shrink-0">{title}</span>
    </h2>
  );
}

/** 제목 + 가로 스크롤 카드 목록 (데스크톱에서는 격자) */
export function Shelf({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-20">
      <SectionHead title={title} className="mb-8 px-4 md:px-0" />
      <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-3 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 lg:grid-cols-4">
        {children}
      </div>
    </section>
  );
}

export function ShelfItem({ children }: { children: React.ReactNode }) {
  return <div className="w-[58%] min-w-[180px] max-w-[240px] shrink-0 snap-start md:w-auto md:min-w-0 md:max-w-none">{children}</div>;
}
