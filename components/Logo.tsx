/** 아루벤 표식: 금빛 원 안에 겹쳐진 고요의 원 */
export function Logo({ size = 26, light = false }: { size?: number; light?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" fill="none" stroke="var(--color-gold)" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="9.5" fill="none" stroke={light ? "var(--color-gold-light)" : "var(--color-gold-light)"} strokeWidth="1.2" />
      <path d="M16 6.5v19M6.5 16h19" stroke="var(--color-gold)" strokeWidth="0.7" opacity="0.6" />
      <circle cx="16" cy="16" r="3" fill="var(--color-gold)" />
    </svg>
  );
}

export function Wordmark({ brand, light = false }: { brand: string; light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Logo light={light} />
      <span className="font-serif text-[25px] font-medium italic tracking-wide text-gold-light">{brand}</span>
    </span>
  );
}
