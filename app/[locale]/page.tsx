import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, ebooks } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";
import { CourseCard } from "@/components/CourseCard";
import { EbookCard } from "@/components/EbookCard";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-gold-soft blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.2fr_1fr] md:py-28">
          <div>
            <p className="mb-4 text-sm font-medium tracking-wide text-gold">{d.tagline}</p>
            <h1 className="whitespace-pre-line font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              {d.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{d.home.heroBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/courses`}
                className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-ink/85"
              >
                {d.home.ctaCourses}
              </Link>
              <Link
                href={`/${locale}/library`}
                className="rounded-full border border-ink/20 bg-paper px-6 py-3 text-sm font-medium transition hover:border-gold"
              >
                {d.home.ctaLibrary}
              </Link>
            </div>
          </div>
          <div className="relative mx-auto hidden aspect-square w-full max-w-sm md:block" aria-hidden>
            <div className="absolute inset-0 rounded-full border border-gold/40" />
            <div className="absolute inset-[12%] rounded-full border border-ink/15" />
            <div
              className="absolute inset-[26%] rounded-full bg-gradient-to-br from-gold-soft to-paper shadow-inner"
              style={{ animation: "breathe 10s ease-in-out infinite" }}
            />
            <div className="absolute inset-[46%] rounded-full bg-gold/80" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead title={d.home.featured} body={d.home.featuredBody} href={`/${locale}/courses`} more={d.home.viewAll} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <CourseCard key={c.slug} course={c} locale={locale} d={d} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <h2 className="mb-8 font-serif text-2xl font-semibold">{d.home.howTitle}</h2>
        <ol className="grid gap-5 md:grid-cols-3">
          {d.home.steps.map((s, i) => (
            <li key={s.t} className="rounded-2xl border border-line bg-paper p-6">
              <span className="font-serif text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-ink-soft">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <SectionHead title={d.home.libraryTitle} body={d.home.libraryBody} href={`/${locale}/library`} more={d.home.viewAll} />
        <div className="grid gap-5 sm:grid-cols-2">
          {ebooks.map((e) => (
            <EbookCard key={e.slug} ebook={e} locale={locale} d={d} />
          ))}
        </div>
      </section>
    </>
  );
}

function SectionHead({ title, body, href, more }: { title: string; body: string; href: string; more: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-serif text-2xl font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-ink-soft">{body}</p>
      </div>
      <Link href={href} className="shrink-0 text-sm font-medium text-gold hover:underline">
        {more} →
      </Link>
    </div>
  );
}
