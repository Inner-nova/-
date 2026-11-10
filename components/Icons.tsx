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
