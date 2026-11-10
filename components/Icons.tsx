import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 24, children, ...rest }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const CompassIcon = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="m15.5 8.5-2 5-5 2 2-5z" />
  </Base>
);

export const CapIcon = (p: P) => (
  <Base {...p}>
    <path d="M2.5 9 12 4.5 21.5 9 12 13.5z" />
    <path d="M6.5 11v5c1.5 1.5 3.5 2.2 5.5 2.2s4-.7 5.5-2.2v-5" />
    <path d="M21.5 9v5" />
  </Base>
);

export const LearnIcon = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="6" r="2.6" />
    <path d="M3.5 11.5c3 0 6 .8 8.5 2.8 2.5-2 5.5-2.8 8.5-2.8V20c-3 0-6 .8-8.5 2.5C9.5 20.8 6.5 20 3.5 20z" />
    <path d="M12 14.3v8" />
  </Base>
);

export const BookIcon = (p: P) => (
  <Base {...p}>
    <path d="M4 5.5A2 2 0 0 1 6 3.5h13v15H6a2 2 0 0 0-2 2z" />
    <path d="M4 20.5a2 2 0 0 0 2 2h13v-4" />
    <path d="M8.5 8h6.5" />
  </Base>
);

export const SearchIcon = (p: P) => (
  <Base {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 5 5" />
  </Base>
);

export const CheckIcon = (p: P) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

export const ChevronIcon = ({ dir = "down", ...p }: P & { dir?: "up" | "down" | "right" | "left" }) => {
  const r = { down: 0, up: 180, right: -90, left: 90 }[dir];
  return (
    <Base {...p} style={{ transform: `rotate(${r}deg)` }}>
      <path d="m6 9 6 6 6-6" />
    </Base>
  );
};

export const PlayIcon = (p: P) => (
  <Base {...p}>
    <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none" />
  </Base>
);

/* 주제(카테고리) 아이콘 */
export const MeditationIcon = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="5" r="2.3" />
    <path d="M12 8.5c-1.8 0-2.8 1.3-3.2 3l-.8 3.5" />
    <path d="M12 8.5c1.8 0 2.8 1.3 3.2 3l.8 3.5" />
    <path d="M3.5 18.5c2.5-1.8 5.5-2.5 8.5-2.5s6 .7 8.5 2.5" />
    <path d="M7 15c-1.5.3-2.5 1-2.5 1.8" />
    <path d="M17 15c1.5.3 2.5 1 2.5 1.8" />
  </Base>
);

export const LeafIcon = (p: P) => (
  <Base {...p}>
    <path d="M5 19c0-8 5-13.5 14.5-14.5C19.5 14 14 19 6 19" />
    <path d="M5 19c3-4 6-6.5 10-8.5" />
  </Base>
);

export const InquiryIcon = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
  </Base>
);

export const ArrowIcon = (p: P) => (
  <Base {...p}>
    <path d="M4.5 12h15" />
    <path d="m13.5 6 6 6-6 6" />
  </Base>
);

/* 감정 훈련: 물결 */
export const WaveIcon = (p: P) => (
  <Base {...p}>
    <path d="M2.5 9c2.4 0 2.4-2.5 4.75-2.5S9.6 9 12 9s2.4-2.5 4.75-2.5S19.1 9 21.5 9" />
    <path d="M2.5 15c2.4 0 2.4-2.5 4.75-2.5S9.6 15 12 15s2.4-2.5 4.75-2.5S19.1 15 21.5 15" />
  </Base>
);

/* 관계 실전: 겹친 두 원 */
export const BondIcon = (p: P) => (
  <Base {...p}>
    <circle cx="9" cy="12" r="6" />
    <circle cx="15" cy="12" r="6" />
  </Base>
);

/* 탐색: 네 갈래 반짝이는 별 */
export const SparkleIcon = (p: P) => (
  <Base {...p}>
    <path d="M12 2.5c.5 4.6 2.4 7 7.5 9.5-5.1 2.5-7 4.9-7.5 9.5-.5-4.6-2.4-7-7.5-9.5 5.1-2.5 7-4.9 7.5-9.5Z" />
    <path d="M19 3v3M17.5 4.5h3" />
  </Base>
);

/* 훈련: 차오르는 초승달 */
export const MoonIcon = (p: P) => (
  <Base {...p}>
    <path d="M19.5 15.2A8.5 8.5 0 0 1 8.8 4.5a8.5 8.5 0 1 0 10.7 10.7Z" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </Base>
);

/* 검색: 밤하늘을 들여다보는 망원경 */
export const TelescopeIcon = (p: P) => (
  <Base {...p}>
    <path d="M5.2 11.4 16.2 5.9l1.9 3.8-11 5.5Z" />
    <path d="m2.3 13 2.5-1.3 1.6 3.2-2.5 1.3Z" />
    <path d="m16.2 5.9 2.6-1.3 1.9 3.8-2.6 1.3" />
    <path d="M11.4 12.3 7.6 21M11.4 12.3l3.8 8.7" />
    <path d="M5.5 3.5v2.2M4.4 4.6h2.2" />
  </Base>
);

/* 마이: 별 하나를 품은 사람 */
export const SelfIcon = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.5 20.5c.8-3.8 3.8-6 7.5-6s6.7 2.2 7.5 6" />
    <path d="M19 2.8v2.4M17.8 4h2.4" />
  </Base>
);
