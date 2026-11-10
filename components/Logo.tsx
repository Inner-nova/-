export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="none" stroke="var(--color-gold)" strokeWidth="1.6" />
      <circle cx="16" cy="16" r="8" fill="none" stroke="var(--color-ink)" strokeWidth="1.6" />
      <circle cx="16" cy="16" r="2.4" fill="var(--color-gold)" />
    </svg>
  );
}
