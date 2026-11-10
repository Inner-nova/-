import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return {
    title: { default: `${d.brand} · ${d.tagline}`, template: `%s · ${d.brand}` },
    description: d.home.heroBody,
    alternates: { languages: { ko: "/ko", en: "/en" } },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col font-sans">
        <Header locale={locale} d={d} />
        <main className="flex-1">{children}</main>
        <Footer d={d} />
      </body>
    </html>
  );
}
