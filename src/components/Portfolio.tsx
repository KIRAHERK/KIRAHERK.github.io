import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Github,
  Languages,
  Linkedin,
  Mail,
} from "lucide-react";
import { PoseFigure } from "@/components/PoseFigure";
import {
  CountUp,
  ScrollProgress,
  timeAgo,
  useActiveSection,
  useLatestRelease,
  useReveal,
} from "@/components/motion";
import {
  OrderJourney,
  Pins,
  Pipeline,
  PhoneShowcase,
  ResultBars,
  RetrievalFlow,
  SnakeDraft,
  Star,
  TodoPhone,
  VoiceNote,
} from "@/components/WorkVisuals";
import {
  content,
  LINKS,
  type Content,
  type Lang,
  type Project,
  type ProjectId,
} from "@/content";

// How wide each panel is on large screens (a six-column grid).
const LAYOUT: Record<ProjectId, string> = {
  forge: "lg:col-span-6",
  fight: "lg:col-span-3",
  qgen: "lg:col-span-3",
  shop: "lg:col-span-6",
  todo: "lg:col-span-4",
  classes: "lg:col-span-2",
};

const SECTIONS = ["work", "about", "skills", "contact"] as const;

export function Portfolio({ lang }: { lang: Lang }) {
  const t = content[lang];
  const rtl = lang === "ar";
  useReveal();
  const active = useActiveSection(["top", ...SECTIONS]);

  return (
    <div
      lang={lang}
      dir={rtl ? "rtl" : "ltr"}
      className="min-h-screen text-nacre"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-50 focus:bg-brass focus:px-4 focus:py-2 focus:text-walnut"
      >
        {t.skip}
      </a>

      <header className="sticky top-0 z-40 bg-walnut [background-image:var(--grain-h)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-8">
          <a
            href="#top"
            className="flex min-h-11 items-center gap-2.5"
            lang="en"
            dir="ltr"
          >
            <Star className="size-6" />
            <span className="font-display text-[19px] text-nacre">
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Hussein Al Herk
              </span>
            </span>
          </a>
          <nav
            aria-label={rtl ? "الأقسام" : "Sections"}
            className="flex items-center"
          >
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`min-h-11 items-center px-2 text-[15px] underline-offset-[7px] transition-colors duration-200 sm:px-3 ${
                  id === "skills" ? "hidden sm:inline-flex" : "inline-flex"
                } ${active === id ? "text-nacre underline decoration-brass" : "text-nacre-faint hover:text-nacre"}`}
              >
                {t.nav[id]}
              </a>
            ))}
            <Link
              to={t.nav.switchTo}
              className="ms-1 inline-flex min-h-11 items-center gap-1.5 px-2 text-[15px] text-brass-bright hover:text-nacre"
              lang={rtl ? "en" : "ar"}
            >
              <Languages className="size-4" aria-hidden="true" />
              {t.nav.switchLabel}
            </Link>
          </nav>
        </div>
        <span aria-hidden="true" className="band" />
        <ScrollProgress rtl={rtl} />
      </header>

      <main id="main">
        <Hero t={t} rtl={rtl} />

        <Section id="work" title={t.work.title} intro={t.work.intro}>
          <div className="grid gap-7 lg:grid-cols-6">
            {t.work.projects.map((p) => (
              <ProjectPanel key={p.id} p={p} t={t} lang={lang} />
            ))}
          </div>

          <h3 className="mt-16 text-[24px] text-nacre">{t.work.moreTitle}</h3>
          <ul className="mt-4 border-t border-brass/40">
            {t.work.more.map((m) => (
              <li
                key={m.title}
                data-reveal
                className="grid gap-x-6 gap-y-1 border-b border-brass/40 py-4 sm:grid-cols-[4rem_minmax(0,16rem)_1fr] sm:items-baseline"
              >
                <span className="text-[14px] text-nacre-faint tnum">
                  {m.year}
                </span>
                <span className="text-[17px] text-nacre">{m.title}</span>
                <span className="text-[15.5px] leading-relaxed text-nacre-soft">
                  {m.text}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="about" title={t.about.title}>
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-start">
            <div data-reveal>
              <p className="max-w-[60ch] text-[18px] leading-[1.75] text-nacre-soft">
                {t.about.bio}
              </p>
              <dl className="mt-8 border-t border-brass/40">
                {t.about.facts.map(([k, v]) => (
                  <div
                    key={k}
                    className="grid gap-1 border-b border-brass/40 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                  >
                    <dt className="text-[15px] text-brass-bright">{k}</dt>
                    <dd className="text-[16px] text-nacre">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <aside data-reveal className="inlay p-7 sm:p-8">
              <Pins />
              <h3 className="text-[24px] text-nacre">{t.about.nowTitle}</h3>
              <ul className="mt-5 space-y-5">
                {t.about.now.map(([what, detail]) => (
                  <li key={what} className="flex gap-3">
                    <span
                      className="mark mt-[9px] bg-lemonwood"
                      aria-hidden="true"
                    />
                    <p className="text-[16.5px] leading-relaxed text-nacre-soft">
                      <span className="text-lemonwood">{what}</span> · {detail}
                    </p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Section>

        <Section id="skills" title={t.skills.title} intro={t.skills.intro}>
          <div data-reveal className="inlay p-7 sm:p-9">
            <Pins />
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
              {t.skills.groups.map(([label, items]) => (
                <div key={label}>
                  <h3 className="text-[18px] leading-snug text-brass-bright">
                    {label}
                  </h3>
                  <ul className="mt-3 space-y-1.5">
                    {items.map((it) => (
                      <li
                        key={it}
                        className="text-[15.5px] text-nacre-soft"
                        dir="auto"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Contact t={t} />
      </main>
    </div>
  );
}

function Hero({ t, rtl }: { t: Content; rtl: boolean }) {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-6xl gap-x-12 gap-y-6 px-4 pb-4 pt-7 [grid-template-areas:'name'_'fig'_'cta'_'intro'] sm:px-8 md:grid-cols-[1.05fr_1fr] md:items-center md:pb-8 md:pt-16 md:[grid-template-areas:'name_fig'_'intro_fig'_'cta_fig']"
    >
      <div className="[grid-area:name] md:self-end">
        <h1
          className="rise text-[clamp(2.9rem,8.4vw,5.6rem)] leading-[0.98] tracking-[-0.015em] text-nacre rtl:text-right"
          lang="en"
          dir="ltr"
        >
          Hussein Al Herk
        </h1>
        <p className="rise d1 mt-4 text-[17px] text-nacre-faint">
          {t.hero.lead}
        </p>
        <p className="rise d1 mt-2 max-w-[22ch] font-display text-[clamp(1.4rem,2.6vw,1.95rem)] leading-snug text-brass-bright md:max-w-[26ch]">
          {t.hero.line}
        </p>
      </div>

      <p className="rise d2 max-w-[34rem] text-[17px] leading-[1.7] text-nacre-soft [grid-area:intro]">
        {t.hero.intro}
      </p>

      <div className="rise d2 flex flex-wrap items-center gap-x-6 gap-y-3 [grid-area:cta] md:self-start">
        <a href={`mailto:${LINKS.email}`} className="plaque text-[16px]">
          <Mail className="size-[18px]" aria-hidden="true" />
          {t.hero.emailMe}
        </a>
        <a
          href="#work"
          className="inline-flex min-h-11 items-center gap-1.5 text-[16px] text-nacre underline decoration-brass"
        >
          {t.hero.seeWork}
          <ArrowDown className="size-4" aria-hidden="true" />
        </a>
        <span className="flex gap-4">
          <IconLink
            href={LINKS.github}
            label="GitHub"
            icon={<Github className="size-[17px]" aria-hidden="true" />}
          />
          <IconLink
            href={LINKS.linkedin}
            label="LinkedIn"
            icon={<Linkedin className="size-[17px]" aria-hidden="true" />}
          />
        </span>
      </div>

      <figure className="rise d3 min-w-0 [grid-area:fig]">
        <div className="inlay">
          <Pins />
          <PoseFigure
            className="h-[280px] sm:h-[380px] md:h-[470px]"
            label={t.pose.label}
            motionLabel={t.pose.motion}
            alertLabel={t.pose.alert}
            rtl={rtl}
          />
        </div>
        <figcaption className="mt-3 text-[14px] leading-relaxed text-nacre-faint">
          {t.pose.caption}
        </figcaption>
      </figure>
    </section>
  );
}

function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-8 sm:pt-24"
    >
      <div data-reveal className="mb-9 max-w-[46rem]">
        <h2
          id={`${id}-title`}
          className="text-[clamp(2.1rem,4.6vw,3.2rem)] leading-[1.05] text-nacre"
        >
          {title}
        </h2>
        <span aria-hidden="true" className="rule band mt-4 w-40" />
        {intro && (
          <p className="mt-4 text-[17px] leading-[1.7] text-nacre-soft">
            {intro}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function visualsFor(
  p: Project,
  t: Content,
  lang: Lang,
): { side?: ReactNode; inline?: ReactNode } {
  const v = t.visuals;
  switch (p.id) {
    case "forge":
      return {
        side: (
          <PhoneShowcase screens={v.forgeScreens} label={v.forgeScreensLabel} />
        ),
      };
    case "fight":
      return {
        inline: (
          <div className="space-y-6">
            <Pipeline title={v.fightStepsTitle} steps={v.fightSteps} />
            <ResultBars title={v.fightTitle} rows={v.fightRows} />
          </div>
        ),
      };
    case "qgen":
      return {
        inline: <RetrievalFlow title={v.qgenTitle} steps={v.qgenSteps} />,
      };
    case "shop":
      return {
        inline: (
          <OrderJourney
            title={v.journey.title}
            steps={v.journey.steps}
            lang={lang}
          />
        ),
      };
    case "todo":
      return {
        side: <TodoPhone />,
        inline: (
          <VoiceNote
            listening={v.todoListening}
            said={v.todoSaid}
            meaning={v.todoMeaning}
          />
        ),
      };
    case "classes":
      return {
        inline: (
          <SnakeDraft
            caption={v.classesCaption}
            names={v.classesNames}
            avgLabel={v.classesAvg}
          />
        ),
      };
  }
}

function ProjectPanel({ p, t, lang }: { p: Project; t: Content; lang: Lang }) {
  const release = useLatestRelease(p.releaseRepo);
  const version = release?.tag ?? p.version;
  const building = p.status === "building";
  const { side, inline } = visualsFor(p, t, lang);
  const statusWord = building
    ? t.work.building
    : p.releaseRepo
      ? t.work.released
      : null;
  const amberNote = building || p.flagTone === "amber";

  return (
    <article
      data-reveal
      className={`inlay flex flex-col p-6 sm:p-9 ${LAYOUT[p.id]}`}
    >
      <Pins />
      <div
        className={
          side
            ? "grid flex-1 gap-9 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-12"
            : "flex flex-1 flex-col"
        }
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="text-[clamp(1.75rem,3.2vw,2.4rem)] leading-[1.1] text-nacre">
            {p.title}
          </h3>
          <p className="mt-3 max-w-[58ch] text-[17px] leading-[1.6] text-nacre-soft">
            {p.summary}
          </p>

          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[14px] text-nacre-faint">
            {statusWord && (
              <span
                className={`inline-flex items-center gap-2 ${building ? "text-lemonwood" : "text-brass-bright"}`}
              >
                <span
                  className={`mark ${building ? "bg-lemonwood" : "bg-brass"}`}
                  aria-hidden="true"
                />
                {statusWord}
              </span>
            )}
            {version && (
              <span className="tnum">
                <span dir="ltr">{version}</span>
                {release && <> · {timeAgo(release.at, lang)}</>}
              </span>
            )}
            {p.flag && (
              <span
                className={`inline-flex items-center gap-2 ${p.flagTone === "amber" ? "text-lemonwood" : "text-rosewood"}`}
              >
                <span
                  className={`mark ${p.flagTone === "amber" ? "bg-lemonwood" : "bg-rosewood"}`}
                  aria-hidden="true"
                />
                {p.flag}
              </span>
            )}
            <span>{p.meta}</span>
          </p>

          {p.note && (
            <p
              className={`mt-3 max-w-[62ch] text-[15px] leading-relaxed ${amberNote ? "text-lemonwood" : "text-nacre-soft"}`}
            >
              {p.note}
            </p>
          )}

          {inline && <div className="mt-7">{inline}</div>}

          {p.stats.length > 0 && (
            <dl className="mt-7 grid border-y border-brass/40 sm:grid-cols-3 [&>div+div]:border-t [&>div+div]:border-brass/40 sm:[&>div+div]:border-s sm:[&>div+div]:border-t-0">
              {p.stats.map(([v, l]) => (
                <div key={l} className="py-3 sm:px-4 sm:first:ps-0">
                  <dt className="sr-only">{l}</dt>
                  <dd className="flex items-baseline gap-4 sm:block">
                    <span
                      className="block min-w-[4.5rem] shrink-0 font-display text-[clamp(1.5rem,3vw,2.1rem)] leading-none text-brass-bright"
                      dir="ltr"
                    >
                      <CountUp value={v} />
                    </span>
                    <span
                      className="block text-[14px] leading-snug text-nacre-soft sm:mt-1.5 sm:text-[13.5px]"
                      aria-hidden="true"
                    >
                      {l}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <details className="group mt-6">
            <summary className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-[15px] text-brass-bright">
              <Star className="size-3 transition-transform duration-300 group-open:rotate-45" />
              {t.work.details}
            </summary>
            <div className="mt-2 max-w-[62ch] space-y-3 pb-1">
              <p className="text-[15.5px] leading-[1.7] text-nacre-soft">
                {p.text}
              </p>
              <p className="text-[14px] leading-relaxed text-nacre-faint">
                {t.work.builtWith}:{" "}
                <span dir="ltr" className="text-nacre-soft">
                  {p.tags.join(" · ")}
                </span>
              </p>
            </div>
          </details>

          {p.links.length > 0 && (
            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-5">
              {p.links.map((l) =>
                l.kind === "download" && p.id === "forge" ? (
                  <a key={l.href} href={l.href} className="plaque text-[15px]">
                    <Download className="size-4" aria-hidden="true" />
                    {l.label}
                  </a>
                ) : (
                  <ExtLink key={l.href} href={l.href}>
                    {l.label}
                  </ExtLink>
                ),
              )}
            </div>
          )}
        </div>
        {side && <div className="flex justify-center">{side}</div>}
      </div>
    </article>
  );
}

function Contact({ t }: { t: Content }) {
  const c = t.contact;
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
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-8 sm:pt-24"
    >
      <div data-reveal className="inlay px-7 py-10 sm:px-12 sm:py-14">
        <Pins />
        <h2
          id="contact-title"
          className="text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.02] text-nacre"
        >
          {c.title}
        </h2>
        <span aria-hidden="true" className="rule band mt-5 w-40" />
        <p className="mt-5 max-w-[40ch] text-[18px] leading-[1.7] text-nacre-soft">
          {c.text}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={`mailto:${LINKS.email}`}
            dir="ltr"
            className="plaque text-[16px]"
          >
            <Mail className="size-[18px]" aria-hidden="true" />
            {LINKS.email}
          </a>
          <button
            type="button"
            onClick={copy}
            aria-live="polite"
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-[16px] text-brass-bright hover:text-nacre"
          >
            {copied ? (
              <Check className="size-4" aria-hidden="true" />
            ) : (
              <Copy className="size-4" aria-hidden="true" />
            )}
            {copied ? c.copied : c.copy}
          </button>
        </div>
        <div className="mt-6 flex gap-6">
          <IconLink
            href={LINKS.github}
            label="GitHub"
            icon={<Github className="size-[17px]" aria-hidden="true" />}
          />
          <IconLink
            href={LINKS.linkedin}
            label="LinkedIn"
            icon={<Linkedin className="size-[17px]" aria-hidden="true" />}
          />
        </div>
      </div>
      <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-brass/40 pt-6 text-[14px] text-nacre-faint">
        <p>{c.footer}</p>
        <a
          href={LINKS.source}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center underline decoration-brass/60 hover:text-nacre"
        >
          {c.built}
        </a>
      </footer>
    </section>
  );
}

function IconLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 items-center gap-2 text-[15px] text-nacre-soft transition-colors duration-200 hover:text-nacre"
    >
      {icon}
      {label}
    </a>
  );
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex min-h-11 items-center gap-1 text-[15px] text-nacre underline decoration-brass underline-offset-[6px] transition-colors duration-200 hover:text-brass-bright"
    >
      {children}
      <ArrowUpRight
        className="size-4 text-brass transition-transform duration-200 group-hover:-translate-y-0.5 rtl:-scale-x-100"
        aria-hidden="true"
      />
    </a>
  );
}
