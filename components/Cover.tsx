import type { Category } from "@/lib/content";
import { InquiryIcon, LeafIcon, MeditationIcon } from "./Icons";

export const categoryIcon: Record<Category, typeof MeditationIcon> = {
  meditation: MeditationIcon,
  "letting-go": LeafIcon,
  inquiry: InquiryIcon,
};

/** 강의·전자책 표지: 그라디언트 위에 금빛 동심원 문양 */
export function Cover({
  hue,
  category,
  className = "",
  children,
}: {
  hue: number;
  category?: Category;
  className?: string;
  children?: React.ReactNode;
}) {
  const Icon = category ? categoryIcon[category] : null;
  return (
    <div className={`cover relative overflow-hidden ${className}`} style={{ ["--hue" as string]: hue }}>
      <svg className="absolute left-1/2 top-[42%] h-[78%] -translate-x-1/2 -translate-y-1/2 opacity-60" viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r="47" fill="none" stroke="#dcc495" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="#dcc495" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="21" fill="none" stroke="#fff" strokeWidth="0.35" strokeOpacity="0.7" />
        <path d="M50 0v100M0 50h100" stroke="#dcc495" strokeWidth="0.25" strokeOpacity="0.6" />
        <circle cx="50" cy="50" r="4" fill="#dcc495" />
      </svg>
      {Icon && <Icon className="absolute bottom-4 right-4 text-gold-light" size={22} strokeWidth={1.4} />}
      {children}
    </div>
  );
}
