import { Link } from "@tanstack/react-router";
import { useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Download,
  Github,
  Languages,
  Linkedin,
  Mail,
} from "lucide-react";
import { PoseFigure } from "@/components/PoseFigure";
import {
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

const noStop = (s: string) => s.replace(/[.。]\s*$/, "");

export function Portfolio({ lang }: { lang: Lang }) {
  const t = content[lang];
  const rtl = lang === "ar";
  useReveal();
  const active = useActiveSection([...SECTIONS]);

  return (
    <div lang={lang} dir={rtl ? "rtl" : "ltr"} className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-text focus:px-4 focus:py-2 focus:text-bg"
      >
        {t.skip}
      </a>

      <div className="mx-auto max-w-[76rem] px-6 sm:px-10 lg:flex lg:justify-between lg:gap-16 lg:px-16">
        <Identity t={t} active={active} rtl={rtl} />

        <main id="main" className="pb-10 lg:w-[52%] lg:py-20">
          <Opening t={t} rtl={rtl} />

          <Section id="work" title={t.work.title} emailLabel={t.hero.emailMe}>
            <div className="space-y-16">
              {t.work.projects.map((p) => (
                <ProjectEntry key={p.id} p={p} t={t} lang={lang} />
              ))}
            </div>

            <h3 className="mt-20 text-[1.05rem] font-semibold tracking-[-0.01em] text-text">
              {t.work.moreTitle}
            </h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {t.work.more.map((m) => (
                <li
                  key={m.title}
                  className="grid gap-x-5 gap-y-1 py-4 sm:grid-cols-[3.5rem_1fr]"
                >
                  <span className="font-mono text-[13px] text-text-3 tnum sm:pt-0.5">
                    {m.year}
                  </span>
                  <div>
                    <p className="text-[15px] font-medium text-text">
                      {m.title}
                    </p>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-text-2">
                      {m.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="about" title={t.about.title} emailLabel={t.hero.emailMe}>
            <p className="text-[16.5px] leading-[1.75] text-text-2">
              {t.about.bio}
            </p>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {t.about.facts.map(([k, v]) => (
                <div
                  key={k}
                  className="grid gap-1 py-3.5 sm:grid-cols-[9.5rem_1fr] sm:gap-5"
                >
                  <dt className="text-[14px] text-text-3">{k}</dt>
                  <dd className="text-[15px] text-text">{v}</dd>
                </div>
              ))}
            </dl>
            <h3 className="mt-10 text-[1.05rem] font-semibold tracking-[-0.01em] text-text">
              {t.about.nowTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              {t.about.now.map(([what, detail]) => (
                <li
                  key={what}
                  className="flex gap-3 text-[15px] leading-relaxed text-text-2"
                >
                  <span
                    className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-wip"
                    aria-hidden="true"
                  />
                  <p>
                    <span className="font-medium text-text">{what}</span> ·{" "}
                    {detail}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            id="skills"
            title={t.skills.title}
            intro={t.skills.intro}
            emailLabel={t.hero.emailMe}
          >
            <dl className="divide-y divide-line border-y border-line">
              {t.skills.groups.map(([label, items]) => (
                <div
                  key={label}
                  className="grid gap-1.5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-5"
                >
                  <dt className="text-[14.5px] font-medium text-text">
                    {label}
                  </dt>
                  <dd className="text-[14.5px] leading-relaxed text-text-2">
                    {items.map((it, i) => (
                      <span key={it}>
                        {i > 0 && (
                          <span className="text-text-3" aria-hidden="true">
                            {" · "}
                          </span>
                        )}
                        <bdi>{it}</bdi>
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Contact t={t} />
        </main>
      </div>
    </div>
  );
}

/** The sticky left column: who, what, how to reach, and where things are. */
function Identity({
  t,
  active,
  rtl,
}: {
  t: Content;
  active: string | null;
  rtl: boolean;
}) {
  return (
    <header className="pt-8 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-20">
      <div>
        <div className="flex justify-end lg:justify-start">
          <Link
            to={t.nav.switchTo}
            lang={rtl ? "en" : "ar"}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-[14px] font-medium text-text-2 transition-colors duration-200 hover:text-text"
          >
            <Languages className="size-4" aria-hidden="true" />
            {t.nav.switchLabel}
          </Link>
        </div>

        <h1
          className="rise mt-6 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.04em] text-text sm:text-[3.2rem] lg:mt-8 rtl:text-right"
          lang="en"
          dir="ltr"
        >
          Hussein Al Herk
        </h1>
        <p className="rise d1 mt-3 text-[1.12rem] font-medium tracking-[-0.01em] text-text">
          {noStop(t.hero.lead)}
        </p>
        <p className="rise d2 mt-4 max-w-[32ch] text-[16px] leading-relaxed text-text-2">
          {t.hero.line}
        </p>

        <div className="rise d3 mt-7 flex flex-wrap items-center gap-2.5">
          <a href={`mailto:${LINKS.email}`} className="btn-primary">
            <Mail className="size-4" aria-hidden="true" />
            {t.hero.emailMe}
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="btn-quiet px-0"
          >
            <Github className="size-[18px]" aria-hidden="true" />
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="btn-quiet px-0"
          >
            <Linkedin className="size-[18px]" aria-hidden="true" />
          </a>
        </div>

        <nav
          aria-label={rtl ? "الأقسام" : "Sections"}
          className="mt-16 hidden lg:block"
        >
          <ul className="space-y-1">
            {SECTIONS.map((id) => {
              const on = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={on ? "true" : undefined}
                    className="group inline-flex min-h-10 items-center gap-4"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-px transition-all duration-300 ease-out ${
                        on
                          ? "w-16 bg-text"
                          : "w-8 bg-text-3 group-hover:w-16 group-hover:bg-text"
                      }`}
                    />
                    <span
                      className={`text-[12.5px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${
                        on ? "text-text" : "text-text-3 group-hover:text-text"
                      }`}
                    >
                      {t.nav[id]}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

/** The live figure, then the short introduction. */
function Opening({ t, rtl }: { t: Content; rtl: boolean }) {
  return (
    <section aria-label={t.pose.caption} className="pt-10 lg:pt-0">
      <figure className="panel rise d2 overflow-hidden">
        <PoseFigure
          className="h-[250px] sm:h-[300px]"
          label={t.pose.label}
          motionLabel={t.pose.motion}
          alertLabel={t.pose.alert}
          rtl={rtl}
        />
        <figcaption className="border-t border-line bg-surface px-4 py-3 text-[13px] leading-relaxed text-text-2">
          {t.pose.caption}
        </figcaption>
      </figure>
      <p className="mt-8 text-[16.5px] leading-[1.75] text-text-2">
        {t.hero.intro}
      </p>
    </section>
  );
}

function Section({
  id,
  title,
  intro,
  emailLabel,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  emailLabel: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-4 pt-20 lg:pt-28"
    >
      <div className="sticky top-0 z-20 -mx-6 flex items-center justify-between gap-4 bg-bg px-6 py-3 sm:-mx-10 sm:px-10 lg:static lg:mx-0 lg:px-0 lg:py-0">
        <h2
          id={`${id}-title`}
          className="text-[1.75rem] font-semibold tracking-[-0.03em] text-text"
        >
          {title}
        </h2>
        <a
          href={`mailto:${LINKS.email}`}
          aria-label={emailLabel}
          className="btn-quiet px-0 lg:hidden"
        >
          <Mail className="size-[18px]" aria-hidden="true" />
        </a>
      </div>
      {intro && (
        <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-text-2 lg:mt-3">
          {intro}
        </p>
      )}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function visualFor(p: Project, t: Content, lang: Lang): ReactNode {
  const v = t.visuals;
  switch (p.id) {
    case "forge":
      return (
        <div className="flex justify-center py-2">
          <PhoneShowcase screens={v.forgeScreens} label={v.forgeScreensLabel} />
        </div>
      );
    case "fight":
      return (
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
          <Pipeline title={v.fightStepsTitle} steps={v.fightSteps} />
          <ResultBars
            title={v.fightTitle}
            rows={v.fightRows}
            note={v.fightNote}
          />
        </div>
      );
    case "qgen":
      return <RetrievalFlow title={v.qgenTitle} steps={v.qgenSteps} />;
    case "shop":
      return (
        <OrderJourney
          title={v.journey.title}
          steps={v.journey.steps}
          lang={lang}
        />
      );
    case "todo":
      return (
        <div className="grid items-center gap-8 sm:grid-cols-[1fr_auto]">
          <VoiceNote
            listening={v.todoListening}
            said={v.todoSaid}
            meaning={v.todoMeaning}
          />
          <TodoPhone />
        </div>
      );
    case "classes":
      return (
        <SnakeDraft
          caption={v.classesCaption}
          names={v.classesNames}
          avgLabel={v.classesAvg}
        />
      );
  }
}

function ProjectEntry({ p, t, lang }: { p: Project; t: Content; lang: Lang }) {
  const release = useLatestRelease(p.releaseRepo);
  const version = release?.tag ?? p.version;
  const building = p.status === "building";

  const pills: Array<{ text: string; dot: string }> = [];
  if (building) pills.push({ text: t.work.building, dot: "var(--wip)" });
  else if (p.releaseRepo)
    pills.push({ text: t.work.released, dot: "var(--ok)" });
  if (p.flag)
    pills.push({
      text: p.flag,
      dot: p.flagTone === "amber" ? "var(--wip)" : "var(--text-3)",
    });

  return (
    <article
      data-reveal
      aria-labelledby={`p-${p.id}`}
      className="border-t border-line pt-10 first:border-t-0 first:pt-0"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h3
          id={`p-${p.id}`}
          className="text-[1.2rem] font-semibold leading-snug tracking-[-0.02em] text-text"
        >
          {p.title}
        </h3>
        {pills.length > 0 && (
          <span className="flex flex-wrap gap-2">
            {pills.map((g) => (
              <span
                key={g.text}
                className="pill"
                style={{ "--dot": g.dot } as CSSProperties}
              >
                {g.text}
              </span>
            ))}
          </span>
        )}
      </div>
      <p className="mt-1.5 text-[13.5px] text-text-3">
        {version && (
          <>
            <span dir="ltr" className="font-mono text-[12.5px] text-text-2">
              {version}
            </span>
            {release && <> · {timeAgo(release.at, lang)}</>}
            {" · "}
          </>
        )}
        {p.meta}
      </p>

      <p className="mt-4 text-[16px] leading-[1.7] text-text-2">{p.summary}</p>
      {p.note && (
        <p className="mt-3 text-[14.5px] leading-relaxed text-text-3">
          {p.note}
        </p>
      )}

      <div className="panel mt-6 px-5 py-6 sm:px-7">
        {visualFor(p, t, lang)}
      </div>

      {p.stats.length > 0 && (
        <dl className="mt-6 grid gap-2 sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-2">
          {p.stats.map(([v, l]) => (
            <div key={l} className="flex items-baseline gap-2">
              <dt className="text-[13.5px] text-text-2">{l}</dt>
              <dd
                className="order-first font-mono text-[15px] font-medium text-text"
                dir="ltr"
              >
                {v}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t.work.builtWith}>
        {p.tags.map((tag) => (
          <li
            key={tag}
            dir="ltr"
            className="rounded-full border border-line bg-surface px-2.5 py-1 text-[12px] font-medium text-text-2"
          >
            {tag}
          </li>
        ))}
      </ul>

      <details className="group mt-4">
        <summary className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[14.5px] font-medium text-text transition-colors duration-200 hover:text-accent">
          {t.work.details}
          <ChevronDown
            className="size-4 transition-transform duration-300 group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <p className="mt-1 pb-1 text-[15px] leading-[1.75] text-text-2">
          {p.text}
        </p>
      </details>

      {p.links.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
          {p.links.map((l) =>
            l.kind === "download" && p.id === "forge" ? (
              <a key={l.href} href={l.href} className="btn-primary">
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
      className="scroll-mt-4 pt-20 lg:pt-28"
    >
      <h2
        id="contact-title"
        className="text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] text-text"
      >
        {c.title}
      </h2>
      <p className="mt-3 max-w-[46ch] text-[16.5px] leading-[1.7] text-text-2">
        {c.text}
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-2.5">
        <a href={`mailto:${LINKS.email}`} dir="ltr" className="btn-primary">
          <Mail className="size-4" aria-hidden="true" />
          {LINKS.email}
        </a>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className="btn-quiet cursor-pointer"
        >
          {copied ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
          {copied ? c.copied : c.copy}
        </button>
      </div>
      <div className="mt-5 flex flex-wrap gap-x-6">
        <ExtLink href={LINKS.github}>GitHub</ExtLink>
        <ExtLink href={LINKS.linkedin}>LinkedIn</ExtLink>
      </div>

      <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-[13px] text-text-3">
        <p>{c.footer}</p>
        <a
          href={LINKS.source}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center underline decoration-line-strong hover:text-text hover:decoration-text"
        >
          {c.built}
        </a>
      </footer>
    </section>
  );
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex min-h-11 items-center gap-1 text-[14.5px] font-medium text-text transition-colors duration-200 hover:text-accent"
    >
      {children}
      <ArrowUpRight
        className="size-4 text-text-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-accent rtl:-scale-x-100"
        aria-hidden="true"
      />
    </a>
  );
}
