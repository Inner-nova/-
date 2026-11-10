import type { Category } from "@/lib/content";
import { InquiryIcon, LeafIcon, MeditationIcon } from "./Icons";

export const categoryIcon: Record<Category, typeof MeditationIcon> = {
  meditation: MeditationIcon,
  "letting-go": LeafIcon,
  inquiry: InquiryIcon,
};

/** 강의·전자책 표지 이미지 대신 쓰는 그라디언트 + 원 문양 */
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
      <svg className="absolute -right-6 -top-6 h-[85%] opacity-40" viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r="46" fill="none" stroke="white" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="white" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="18" fill="none" stroke="white" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="5" fill="white" fillOpacity="0.8" />
      </svg>
      {Icon && <Icon className="absolute bottom-3 left-3 text-white/90" size={26} />}
      {children}
    </div>
  );
}
