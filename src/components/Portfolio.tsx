import { Link } from "@tanstack/react-router";
import { useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Download,
  Github,
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
  Pipeline,
  PhoneShowcase,
  ResultBars,
  RetrievalFlow,
  SnakeDraft,
  TodoPhone,
  VoiceNote,
} from "@/components/WorkVisuals";
import {
  content,
  LINKS,
  type Content,
  type Lang,
  type Project,
} from "@/content";

const SECTIONS = ["work", "about", "skills", "contact"] as const;

/** Text in the other language: tagged so it is read, and shaped, correctly. */
function Other({
  lang,
  className = "",
  children,
}: {
  lang: Lang;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={className}>
      {children}
    </span>
  );
}

const noStop = (s: string) => s.replace(/[.。]\s*$/, "");

export function Portfolio({ lang }: { lang: Lang }) {
  const t = content[lang];
  const otherLang: Lang = lang === "ar" ? "en" : "ar";
  const o = content[otherLang];
  const rtl = lang === "ar";
  useReveal();
  const active = useActiveSection(["top", ...SECTIONS]);

  return (
    <div lang={lang} dir={rtl ? "rtl" : "ltr"} className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-50 focus:rounded-[6px] focus:bg-cobalt focus:px-4 focus:py-2 focus:text-enamel"
      >
        {t.skip}
      </a>

      <header className="sticky top-0 z-40 border-b border-ink/15 bg-wall [background-image:var(--plaster)]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
          <a
            href="#top"
            className="sign-type hidden min-h-11 items-center text-[21px] text-ink sm:inline-flex"
            lang="en"
            dir="ltr"
          >
            Hussein Al Herk
          </a>
          <nav
            aria-label={rtl ? "الأقسام" : "Sections"}
            className="flex w-full items-center justify-between gap-1 sm:w-auto sm:justify-end"
          >
            <span className="flex items-center">
              {SECTIONS.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`label-type min-h-11 items-center px-2.5 text-[17px] underline-offset-[8px] transition-colors duration-200 sm:px-3 ${
                    id === "skills" ? "hidden sm:inline-flex" : "inline-flex"
                  } ${active === id ? "text-ink underline decoration-cobalt decoration-2" : "text-ink-2 hover:text-ink"}`}
                >
                  {t.nav[id]}
                </a>
              ))}
            </span>
            <Link
              to={t.nav.switchTo}
              className="group ms-2 inline-flex min-h-11 items-center"
              lang={otherLang}
            >
              <span className="plate plate-sm sign-type px-3.5 py-1 text-[17px] font-semibold transition-colors duration-200 group-hover:[--plate:var(--cobalt-deep)]">
                {t.nav.switchLabel}
              </span>
            </Link>
          </nav>
        </div>
        <ScrollProgress rtl={rtl} />
      </header>

      <main id="main">
        <Hero t={t} o={o} otherLang={otherLang} rtl={rtl} />

        <Section
          id="work"
          title={t.work.title}
          otherTitle={o.work.title}
          otherLang={otherLang}
          intro={t.work.intro}
        >
          <div className="space-y-24 sm:space-y-32">
            {t.work.projects.map((p) => (
              <Shop
                key={p.id}
                p={p}
                t={t}
                o={o}
                lang={lang}
                otherLang={otherLang}
              />
            ))}
          </div>
          <Directory t={t} />
        </Section>

        <Section
          id="about"
          title={t.about.title}
          otherTitle={o.about.title}
          otherLang={otherLang}
        >
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-16">
            <div>
              <p className="max-w-[60ch] text-[18.5px] leading-[1.7] text-ink">
                {t.about.bio}
              </p>
              <dl className="mt-9 border-t border-ink/15">
                {t.about.facts.map(([k, v]) => (
                  <div
                    key={k}
                    className="grid gap-1 border-b border-ink/15 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                  >
                    <dt className="label-type text-[17px] text-cobalt">{k}</dt>
                    <dd className="text-[16.5px] text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <aside className="plate plate-taxi screws px-9 pb-8 pt-7 sm:px-11">
              <h3 className="sign-type text-[2rem] leading-none text-ink">
                {t.about.nowTitle}
              </h3>
              <div
                aria-hidden="true"
                className="mt-3 h-[2px] rounded-full bg-ink/80"
              />
              <ul className="mt-5 space-y-4">
                {t.about.now.map(([what, detail]) => (
                  <li key={what}>
                    <p className="text-[16.5px] leading-relaxed text-ink">
                      <span className="label-type me-2 text-[18px] font-bold">
                        {what}
                      </span>
                      {detail}
                    </p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Section>

        <Section
          id="skills"
          title={t.skills.title}
          otherTitle={o.skills.title}
          otherLang={otherLang}
          intro={t.skills.intro}
        >
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {t.skills.groups.map(([label, items]) => (
              <div key={label} className="border-t-2 border-ink pt-4">
                <h3 className="label-type text-[19px] font-bold leading-snug text-cobalt">
                  {label}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {items.map((it) => (
                    <li key={it} className="text-[16px] text-ink-2" dir="auto">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Contact t={t} o={o} otherLang={otherLang} />
      </main>
    </div>
  );
}

function Hero({
  t,
  o,
  otherLang,
  rtl,
}: {
  t: Content;
  o: Content;
  otherLang: Lang;
  rtl: boolean;
}) {
  return (
    <section
      id="top"
      aria-label={t.hero.name}
      className="mx-auto max-w-6xl px-4 pt-6 sm:px-8 sm:pt-10"
    >
      {/* The street sign: the name, then the role in both scripts. */}
      <div className="plate screws hang px-8 pb-6 pt-6 sm:px-12 sm:pb-8 sm:pt-8">
        <h1
          className="sign-type text-[clamp(3.3rem,10.5vw,6rem)] leading-[0.9] text-enamel rtl:text-right"
          lang="en"
          dir="ltr"
        >
          Hussein Al Herk
        </h1>
        <div
          aria-hidden="true"
          className="mt-4 h-[2px] rounded-full bg-enamel/90 sm:mt-5"
        />
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
          <p className="sign-type text-[clamp(1.2rem,2.4vw,1.75rem)] font-semibold leading-tight text-enamel">
            {noStop(t.hero.lead)}
          </p>
          <Other
            lang={otherLang}
            className="sign-type block text-[clamp(1.05rem,1.9vw,1.4rem)] font-semibold leading-tight text-cobalt-ink"
          >
            {noStop(o.hero.lead)}
          </Other>
        </div>
      </div>

      {/* The shop window: the claim painted on the glass, the detector behind it. */}
      <div className="window on-dark rise mt-5 grid px-6 pb-6 pt-7 [grid-template-areas:'line'_'cta'_'fig'_'intro'] sm:mt-6 sm:px-9 sm:pb-8 sm:pt-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:grid-rows-[1fr_auto_auto_auto_1fr] lg:gap-x-12 lg:px-11 lg:py-8 lg:[grid-template-areas:'._fig'_'line_fig'_'intro_fig'_'cta_fig'_'._fig']">
        <p className="sign-type text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.04] text-enamel [grid-area:line]">
          {t.hero.line}
        </p>
        <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.65] text-glass-ink [grid-area:intro] lg:mt-5">
          {t.hero.intro}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 [grid-area:cta] lg:mt-8">
          <a
            href={`mailto:${LINKS.email}`}
            className="enamel-btn enamel-btn-red"
          >
            <Mail className="size-[18px]" aria-hidden="true" />
            {t.hero.emailMe}
          </a>
          <a
            href="#work"
            className="inline-flex min-h-11 items-center gap-1.5 text-[16.5px] font-medium text-enamel underline decoration-enamel/50 transition-colors duration-200 hover:decoration-enamel"
          >
            {t.hero.seeWork}
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </div>
        <figure className="mt-7 min-w-0 [grid-area:fig] lg:mt-0">
          <PoseFigure
            className="h-[290px] sm:h-[360px] lg:h-[390px]"
            label={t.pose.label}
            motionLabel={t.pose.motion}
            alertLabel={t.pose.alert}
            rtl={rtl}
          />
          <figcaption className="mt-2 text-[14px] leading-relaxed text-glass-ink">
            {t.pose.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Section({
  id,
  title,
  otherTitle,
  otherLang,
  intro,
  children,
}: {
  id: string;
  title: string;
  otherTitle: string;
  otherLang: Lang;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mx-auto max-w-6xl px-4 pt-24 sm:px-8 sm:pt-32"
    >
      <div className="mb-12 flex flex-wrap items-end gap-x-10 gap-y-5 sm:mb-14">
        <div className="plate screws px-10 pb-3.5 pt-4 sm:px-12">
          <h2
            id={`${id}-title`}
            className="sign-type text-[clamp(2.1rem,4.6vw,3.2rem)] leading-none text-enamel"
          >
            {title}
          </h2>
          <Other
            lang={otherLang}
            className="sign-type mt-2.5 block border-t-2 border-enamel/90 pt-1.5 text-[clamp(1.05rem,1.8vw,1.3rem)] font-semibold text-cobalt-ink"
          >
            {otherTitle}
          </Other>
        </div>
        {intro && (
          <p className="max-w-[46ch] pb-1 text-[17px] leading-[1.65] text-ink-2">
            {intro}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

type Visuals = { aside?: ReactNode; lead?: ReactNode; wide?: ReactNode };

function visualsFor(p: Project, t: Content, lang: Lang): Visuals {
  const v = t.visuals;
  switch (p.id) {
    case "forge":
      return {
        aside: (
          <PhoneShowcase screens={v.forgeScreens} label={v.forgeScreensLabel} />
        ),
      };
    case "fight":
      return {
        aside: (
          <div className="space-y-9">
            <Pipeline title={v.fightStepsTitle} steps={v.fightSteps} />
            <ResultBars title={v.fightTitle} rows={v.fightRows} />
          </div>
        ),
      };
    case "qgen":
      return {
        aside: <RetrievalFlow title={v.qgenTitle} steps={v.qgenSteps} />,
      };
    case "shop":
      return {
        wide: (
          <OrderJourney
            title={v.journey.title}
            steps={v.journey.steps}
            lang={lang}
          />
        ),
      };
    case "todo":
      return {
        lead: (
          <VoiceNote
            listening={v.todoListening}
            said={v.todoSaid}
            meaning={v.todoMeaning}
          />
        ),
        aside: <TodoPhone />,
      };
    case "classes":
      return {
        aside: (
          <SnakeDraft
            caption={v.classesCaption}
            names={v.classesNames}
            avgLabel={v.classesAvg}
          />
        ),
      };
  }
}

/** One project as a shop: its sign, its status tags, and its window. */
function Shop({
  p,
  t,
  o,
  lang,
  otherLang,
}: {
  p: Project;
  t: Content;
  o: Content;
  lang: Lang;
  otherLang: Lang;
}) {
  const release = useLatestRelease(p.releaseRepo);
  const version = release?.tag ?? p.version;
  const building = p.status === "building";
  const otherTitle = o.work.projects.find((q) => q.id === p.id)?.title;
  const { aside, lead, wide } = visualsFor(p, t, lang);
  const phoneAside = p.id === "forge" || p.id === "todo";

  const tags: Array<{ text: string; taxi: boolean }> = [];
  if (building) tags.push({ text: t.work.building, taxi: true });
  else if (p.releaseRepo) tags.push({ text: t.work.released, taxi: false });
  if (p.flag) tags.push({ text: p.flag, taxi: p.flagTone === "amber" });

  return (
    <article data-reveal aria-labelledby={`p-${p.id}`}>
      <div className="plate screws flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 px-9 py-4 sm:px-12 sm:py-5">
        <h3
          id={`p-${p.id}`}
          className="sign-type text-[clamp(1.75rem,3.6vw,2.6rem)] leading-[1.02] text-enamel"
        >
          {p.title}
        </h3>
        {otherTitle && otherTitle !== p.title && (
          <Other
            lang={otherLang}
            className="sign-type block text-[clamp(1.05rem,2vw,1.45rem)] font-semibold leading-tight text-cobalt-ink"
          >
            {otherTitle}
          </Other>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3 ps-6 sm:ps-9">
        {tags.map((g, k) => (
          <span
            key={g.text}
            className={`tag ${g.taxi ? "tag-taxi" : ""}`}
            style={{ "--k": k } as CSSProperties}
          >
            {g.text}
          </span>
        ))}
        <span className="text-[15px] text-ink-2">
          {version && (
            <>
              <span dir="ltr" className="tnum font-medium text-ink">
                {version}
              </span>
              {release && <> · {timeAgo(release.at, lang)}</>}
              {" · "}
            </>
          )}
          {p.meta}
        </span>
      </div>

      <div
        className={`mt-9 grid gap-12 ${
          aside
            ? phoneAside
              ? "md:grid-cols-[minmax(0,1fr)_auto] md:items-start lg:gap-20"
              : "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16"
            : ""
        }`}
      >
        <div className="min-w-0">
          <p className="max-w-[54ch] text-[19px] leading-[1.6] text-ink">
            {p.summary}
          </p>
          {p.note && (
            <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-ink-2">
              {p.note}
            </p>
          )}
          {lead && <div className="mt-7 max-w-[34rem]">{lead}</div>}

          {p.stats.length > 0 && (
            <dl className="mt-8 grid max-w-[38rem] border-y border-ink/15 sm:grid-cols-3 [&>div+div]:border-t [&>div+div]:border-ink/15 sm:[&>div+div]:border-s sm:[&>div+div]:border-t-0">
              {p.stats.map(([v, l]) => (
                <div key={l} className="py-3.5 sm:px-5 sm:first:ps-0">
                  <dt className="sr-only">{l}</dt>
                  <dd className="flex items-baseline gap-4 sm:block">
                    <span
                      className="block min-w-[4.5rem] shrink-0 font-sign text-[clamp(1.75rem,3.2vw,2.3rem)] font-bold leading-none text-cobalt"
                      dir="ltr"
                    >
                      <CountUp value={v} />
                    </span>
                    <span
                      className="block text-[14.5px] leading-snug text-ink-2 sm:mt-1.5"
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
            <summary className="label-type inline-flex min-h-11 cursor-pointer items-center gap-2 text-[17px] text-cobalt hover:text-cobalt-deep">
              {t.work.details}
              <ChevronDown
                className="size-4 transition-transform duration-300 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="mt-2 max-w-[62ch] space-y-3 pb-1">
              <p className="text-[16.5px] leading-[1.7] text-ink-2">{p.text}</p>
              <p className="text-[15px] leading-relaxed text-ink-3">
                {t.work.builtWith}:{" "}
                <span dir="ltr" className="text-ink-2">
                  {p.tags.join(" · ")}
                </span>
              </p>
            </div>
          </details>

          {p.links.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
              {p.links.map((l) =>
                l.kind === "download" && p.id === "forge" ? (
                  <a key={l.href} href={l.href} className="enamel-btn">
                    <Download className="size-[18px]" aria-hidden="true" />
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
        {aside && (
          <div className={phoneAside ? "flex justify-center" : "min-w-0"}>
            {aside}
          </div>
        )}
      </div>
      {wide && <div className="mt-12">{wide}</div>}
    </article>
  );
}

/** Smaller projects, as the name plates by a building's door. */
function Directory({ t }: { t: Content }) {
  return (
    <div className="mt-28 sm:mt-36">
      <h3 className="sign-type text-[clamp(1.6rem,3vw,2.1rem)] text-ink">
        {t.work.moreTitle}
      </h3>
      <ul className="mt-6 max-w-4xl space-y-4">
        {t.work.more.map((m) => (
          <li
            key={m.title}
            className="grid gap-x-6 gap-y-1.5 rounded-[9px] bg-enamel px-6 py-4 shadow-[inset_0_0_0_5px_var(--enamel),inset_0_0_0_6.5px_rgb(31_65_153/0.8),0_12px_18px_-14px_rgb(21_24_30/0.55),0_1px_2px_rgb(21_24_30/0.12)] sm:grid-cols-[3.4rem_minmax(0,15rem)_1fr] sm:items-baseline sm:px-7"
          >
            <span className="font-sign text-[17px] font-semibold text-ink-3 tnum">
              {m.year}
            </span>
            <span className="label-type text-[19px] font-bold leading-snug text-cobalt">
              {m.title}
            </span>
            <span className="text-[15.5px] leading-relaxed text-ink-2">
              {m.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Contact({
  t,
  o,
  otherLang,
}: {
  t: Content;
  o: Content;
  otherLang: Lang;
}) {
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
      className="mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-8 sm:pt-32"
    >
      <div className="plate plate-red screws on-dark px-9 py-10 sm:px-14 sm:py-14">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h2
            id="contact-title"
            className="sign-type text-[clamp(2.8rem,7vw,5.4rem)] leading-[0.92] text-enamel"
          >
            {c.title}
          </h2>
          <Other
            lang={otherLang}
            className="sign-type block text-[clamp(1.5rem,3vw,2.4rem)] font-semibold text-[#fbe3e0]"
          >
            {o.contact.title}
          </Other>
        </div>
        <div
          aria-hidden="true"
          className="mt-6 h-[2px] rounded-full bg-enamel/90"
        />
        <p className="mt-6 max-w-[44ch] text-[18px] leading-[1.65] text-[#fdecea]">
          {c.text}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={`mailto:${LINKS.email}`}
            dir="ltr"
            className="enamel-btn enamel-btn-white normal-case"
          >
            <Mail className="size-[18px]" aria-hidden="true" />
            {LINKS.email}
          </a>
          <button
            type="button"
            onClick={copy}
            aria-live="polite"
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-[16.5px] font-medium text-enamel underline decoration-enamel/50 underline-offset-[6px] hover:decoration-enamel"
          >
            {copied ? (
              <Check className="size-4" aria-hidden="true" />
            ) : (
              <Copy className="size-4" aria-hidden="true" />
            )}
            {copied ? c.copied : c.copy}
          </button>
        </div>
        <div className="mt-5 flex gap-6">
          <IconLink
            href={LINKS.github}
            label="GitHub"
            className="text-[#fdecea] hover:text-enamel"
            icon={<Github className="size-[18px]" aria-hidden="true" />}
          />
          <IconLink
            href={LINKS.linkedin}
            label="LinkedIn"
            className="text-[#fdecea] hover:text-enamel"
            icon={<Linkedin className="size-[18px]" aria-hidden="true" />}
          />
        </div>
      </div>
      <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6 text-[15px] text-ink-2">
        <p>{c.footer}</p>
        <a
          href={LINKS.source}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center underline decoration-ink/30 hover:text-ink hover:decoration-cobalt"
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
  className = "text-ink-2 hover:text-ink",
}: {
  href: string;
  label: string;
  icon: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-11 items-center gap-2 text-[16px] font-medium transition-colors duration-200 ${className}`}
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
      className="group inline-flex min-h-11 items-center gap-1 text-[16.5px] font-medium text-ink underline decoration-cobalt decoration-2 underline-offset-[6px] transition-colors duration-200 hover:text-cobalt"
    >
      {children}
      <ArrowUpRight
        className="size-4 text-cobalt transition-transform duration-200 group-hover:-translate-y-0.5 rtl:-scale-x-100"
        aria-hidden="true"
      />
    </a>
  );
}
