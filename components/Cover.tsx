import { Stardust } from "./Stardust";

/** 남색 + 금빛 별가루 배경 판 (영상 자리, 큰 표지 등) */
export function Cover({
  seed,
  oval = false,
  className = "",
  children,
}: {
  seed: number;
  oval?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden bg-deep ${className}`}>
      <Stardust seed={seed} oval={oval} />
      {children}
    </div>
  );
}
