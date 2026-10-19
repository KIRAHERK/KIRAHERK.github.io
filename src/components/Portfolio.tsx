import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Copy, Languages } from "lucide-react";
import { PoseFigure } from "@/components/PoseFigure";
import { content, LINKS, type Lang } from "@/content";

export function Portfolio({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <div lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-rule bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#top" className="text-[17px] font-semibold tracking-tight">
            Hussein Al Herk
          </a>
          <nav aria-label="Sections" className="flex items-center gap-1">
            {[
              [t.nav.work, "#work"],
              [t.nav.skills, "#skills"],
              [t.nav.about, "#about"],
              [t.nav.contact, "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="hidden rounded-md px-3 py-2 text-[15px] text-ink-soft hover:text-ink sm:inline-block">
                {label}
              </a>
            ))}
            <Link
              to={t.nav.switchTo}
              className="ms-1 inline-flex min-h-10 items-center gap-2 rounded-full border border-rule bg-white px-4 text-[15px] font-medium text-ink hover:border-ultra hover:text-ultra"
              lang={lang === "ar" ? "en" : "ar"}
            >
              <Languages className="size-4" aria-hidden="true" />
              {t.nav.switchLabel}
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="top" className="mx-auto grid max-w-5xl items-center gap-10 px-5 pb-16 pt-12 sm:px-8 md:grid-cols-[1.15fr_1fr] md:pt-20">
          <div className="min-w-0">
            <p className="rise text-[16px] font-medium text-ultra">{t.hero.role}</p>
            <h1 className="rise d1 mt-3 text-[clamp(2.6rem,6vw,4.25rem)] font-bold leading-[1.05] tracking-tight" lang="en" dir="ltr">
              {t.hero.name}
            </h1>
            <p className="rise d2 mt-5 max-w-[34rem] text-[19px] leading-[1.7] text-ink-soft">{t.hero.intro}</p>
            <div className="rise d3 mt-8 flex flex-wrap items-center gap-3">
              <a href="#work" className="inline-flex min-h-12 items-center rounded-lg bg-ultra px-6 text-[16px] font-semibold text-white hover:brightness-110">
                {t.hero.seeWork}
              </a>
              <a href={`mailto:${LINKS.email}`} className="inline-flex min-h-12 items-center rounded-lg border border-ink/20 bg-white px-6 text-[16px] font-semibold hover:border-ultra hover:text-ultra">
                {t.hero.emailMe}
              </a>
            </div>
            <div className="rise d3 mt-6 flex gap-5">
              <ExtLink href={LINKS.github}>GitHub</ExtLink>
              <ExtLink href={LINKS.linkedin}>LinkedIn</ExtLink>
            </div>
          </div>
          <figure className="rise d4 min-w-0">
            <div className="overflow-hidden rounded-2xl border border-rule bg-white">
              <PoseFigure className="h-[320px] sm:h-[380px]" />
            </div>
            <figcaption className="mt-3 text-[15px] leading-relaxed text-ink-faint">{t.hero.caption}</figcaption>
          </figure>
        </section>

        {/* Work */}
        <Section id="work" title={t.work.title}>
          <div className="space-y-6">
            {t.work.projects.map((p) => (
              <article key={p.title} className="rounded-2xl border border-rule bg-white p-6 sm:p-8">
                <p className="text-[15px] text-ink-faint">{p.meta}</p>
                <h3 className="mt-1 text-[24px] font-semibold leading-snug">{p.title}</h3>
                <p className="mt-3 max-w-[46rem] text-[17px] leading-[1.75] text-ink-soft">{p.text}</p>
                <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                  {p.stats.map(([v, l]) => (
                    <div key={l} className="rounded-xl bg-paper-deep px-4 py-4">
                      <dt className="text-[30px] font-bold leading-none text-ultra tnum" dir="ltr">{v}</dt>
                      <dd className="mt-2 text-[15px] leading-snug text-ink-soft">{l}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                    {p.tags.map((tag) => (
                      <li key={tag} className="rounded-full bg-paper-deep px-3 py-1 text-[14px] text-ink-soft" dir="ltr">{tag}</li>
                    ))}
                  </ul>
                  <ExtLink href={p.repo}>{t.work.viewCode}</ExtLink>
                </div>
              </article>
            ))}
          </div>

          <h3 className="mt-12 text-[20px] font-semibold">{t.work.moreTitle}</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {t.work.more.map((m) => (
              <div key={m.title} className="rounded-2xl border border-rule bg-white p-5">
                <p className="text-[15px] text-ink-faint tnum">{m.year}</p>
                <h4 className="mt-1 text-[18px] font-semibold leading-snug">{m.title}</h4>
                <p className="mt-2 text-[16px] leading-[1.65] text-ink-soft">{m.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" title={t.skills.title}>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.skills.groups.map(([label, items]) => (
              <div key={label} className="rounded-2xl border border-rule bg-white p-5">
                <h3 className="text-[17px] font-semibold">{label}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {items.map((it) => (
                    <li key={it} className="rounded-full bg-paper-deep px-3 py-1 text-[15px]" dir="ltr">{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* About */}
        <Section id="about" title={t.about.title}>
          <dl className="grid gap-4 md:grid-cols-3">
            {t.about.items.map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-rule bg-white p-5">
                <dt className="text-[15px] font-medium text-ultra">{k}</dt>
                <dd className="mt-2 text-[17px] leading-[1.65]">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </main>

      <Contact lang={lang} />
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <h2 className="mb-6 text-[30px] font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const t = content[lang].contact;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${LINKS.email}`;
    }
  };

  return (
    <footer id="contact" className="mt-10 bg-ink text-white">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <h2 className="text-[34px] font-bold tracking-tight">{t.title}</h2>
        <p className="mt-3 max-w-[36rem] text-[18px] leading-[1.7] text-white/80">{t.text}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={`mailto:${LINKS.email}`} dir="ltr" className="inline-flex min-h-12 items-center rounded-lg bg-white px-5 text-[17px] font-semibold text-ink hover:bg-white/90">
            {LINKS.email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-lg border border-white/30 px-4 text-[16px] hover:border-white"
          >
            {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
            {copied ? t.copied : t.copy}
          </button>
        </div>
        <div className="mt-6 flex gap-6">
          <ExtLink href={LINKS.github} dark>GitHub</ExtLink>
          <ExtLink href={LINKS.linkedin} dark>LinkedIn</ExtLink>
        </div>
        <p className="mt-12 border-t border-white/15 pt-6 text-[15px] text-white/60">{t.footer}</p>
      </div>
    </footer>
  );
}

function ExtLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-1 text-[16px] font-semibold underline decoration-2 underline-offset-4 ${
        dark ? "text-white decoration-white/40 hover:decoration-white" : "text-ink decoration-ultra/40 hover:text-ultra hover:decoration-ultra"
      }`}
    >
      {children}
      <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
    </a>
  );
}
