import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#fbf9fc", viewportFit: "cover" };

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return {
    title: { default: `${d.wordmark} · ${d.tagline}`, template: `%s · ${d.wordmark}` },
    description: d.description,
    alternates: { languages: { ko: "/ko", en: "/en" } },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <html lang={locale}>
      <body className="flex min-h-screen flex-col pb-28 font-sans md:pb-0">
        <Header locale={locale} d={d} />
        <main className="flex-1">{children}</main>
        <Footer d={d} />
        <BottomNav locale={locale} d={d} />
      </body>
    </html>
  );
}
