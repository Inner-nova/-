/*
 * 미리보기 페이지 진입점.
 * 실제 사이트(app/ 폴더)의 화면을 그대로 불러와 한 페이지 안에서 돌아가게 합니다.
 * 빌드: npm run preview:build -- <출력 파일 경로>
 */
import { useEffect, useState, type ReactNode } from "react";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { NotFoundError, navigate, useUrl } from "next/navigation";

import Explore from "@/app/[locale]/page";
import Courses from "@/app/[locale]/courses/page";
import Course from "@/app/[locale]/courses/[slug]/page";
import Lesson from "@/app/[locale]/courses/[slug]/learn/[lesson]/page";
import Ebook from "@/app/[locale]/library/[slug]/page";
import My from "@/app/[locale]/my/page";

type PageFn = (props: { params: Promise<Record<string, string>> }) => Promise<ReactNode>;

function match(path: string): { page?: PageFn; params?: Record<string, string>; redirect?: string } | null {
  const seg = path.split("/").filter(Boolean);
  const [locale, a, b, c, d] = seg;
  if (!isLocale(locale)) return null;
  const p = (extra: Record<string, string> = {}) => ({ locale, ...extra });
  if (seg.length === 1) return { page: Explore as PageFn, params: p() };
  if (a === "courses" && seg.length === 2) return { page: Courses as PageFn, params: p() };
  if (a === "courses" && seg.length === 3) return { page: Course as PageFn, params: p({ slug: b }) };
  if (a === "courses" && c === "learn" && seg.length === 5) return { page: Lesson as PageFn, params: p({ slug: b, lesson: d }) };
  if (a === "library" && seg.length === 2) return { redirect: `/${locale}/courses?category=ebook` };
  if (a === "library" && seg.length === 3) return { page: Ebook as PageFn, params: p({ slug: b }) };
  if (a === "my" && seg.length === 2) return { page: My as PageFn, params: p() };
  if (a === "search" && seg.length === 2) return { redirect: `/${locale}/courses` };
  return null;
}

function App() {
  const url = useUrl();
  const path = url.split("?")[0];
  const locale = (path.split("/")[1] as Locale) || "ko";
  const d = getDictionary(isLocale(locale) ? locale : "ko");
  const [content, setContent] = useState<ReactNode>(null);

  useEffect(() => {
    let alive = true;
    const m = match(path);
    if (!m || m.redirect || !m.page) {
      navigate(m?.redirect ?? `/${isLocale(locale) ? locale : "ko"}`, { replace: true });
      return;
    }
    m.page({ params: Promise.resolve(m.params ?? {}) })
      .then((node) => alive && setContent(node))
      .catch((e) => {
        if (e instanceof NotFoundError) navigate(`/${locale}`, { replace: true });
        else throw e;
      });
    document.documentElement.lang = locale;
    return () => {
      alive = false;
    };
  }, [path, locale]);

  return (
    <div className="flex min-h-screen flex-col pb-28 font-sans md:pb-0">
      <Header locale={locale} d={d} />
      <main className="flex-1">{content}</main>
      <Footer d={d} />
      <BottomNav locale={locale} d={d} />
    </div>
  );
}

const start = navigator.language?.toLowerCase().startsWith("ko") ? "/ko" : "/en";
navigate(start, { replace: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).ReactDOM.createRoot(document.getElementById("root")).render(<App />);
