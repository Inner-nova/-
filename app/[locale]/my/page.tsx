import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses, flatLessons } from "@/lib/content";
import { getDictionary, isLocale, tr } from "@/lib/i18n";
import { MyDashboard } from "@/components/MyDashboard";

export async function generateMetadata({ params }: PageProps<"/[locale]/my">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getDictionary(locale).my.title, robots: { index: false } } : {};
}

/** 마이: 훈련 기록(연속 일수, 별자리 달력), 이어하기, 설정 */
export default async function MyPage({ params }: PageProps<"/[locale]/my">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const other = locale === "ko" ? "en" : "ko";

  return (
    <div className="mx-auto max-w-5xl px-4 pt-10 md:px-6 md:pt-14">
      <h1 className="sr-only">{d.my.title}</h1>
      <MyDashboard
        locale={locale}
        otherLocale={{ href: `/${other}/my`, label: other === "en" ? "English" : "한국어" }}
        courses={courses.map((c) => ({ slug: c.slug, title: tr(c.title, locale), lessonIds: flatLessons(c).map((l) => l.id) }))}
        labels={{
          streak: d.my.streak,
          dayUnit: d.my.dayUnit,
          lessonsDone: d.my.lessonsDone,
          activeCourses: d.my.activeCourses,
          recent: d.my.recent,
          settings: d.my.settings,
          language: d.my.language,
          reset: d.my.reset,
          inProgress: d.course.inProgress,
          resume: d.my.resume,
          empty: d.my.empty,
          browse: d.my.browse,
        }}
      />
    </div>
  );
}
