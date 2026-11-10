export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="none" stroke="var(--color-primary)" strokeWidth="2" />
      <circle cx="16" cy="16" r="8" fill="none" stroke="var(--color-ink)" strokeWidth="1.8" />
      <circle cx="16" cy="16" r="2.6" fill="var(--color-gold)" />
    </svg>
  );
}
