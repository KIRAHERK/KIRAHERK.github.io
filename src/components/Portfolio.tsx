import { Link } from "@tanstack/react-router";
import { useState, type CSSProperties, type ReactNode } from "react";
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
  Menu,
} from "lucide-react";
import { PoseFigure } from "@/components/PoseFigure";
import {
  timeAgo,
  useActiveSection,
  useLatestRelease,
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
  type ProjectId,
} from "@/content";

// How wide each card is on large screens (a six-column grid), so the work
// reads with a rhythm instead of a row of equal boxes.
const LAYOUT: Record<ProjectId, string> = {
  forge: "lg:col-span-6",
  fight: "lg:col-span-3",
  qgen: "lg:col-span-3",
  shop: "lg:col-span-6",
  todo: "lg:col-span-4",
  classes: "lg:col-span-2",
};

const SECTIONS = ["work", "about", "skills", "contact"] as const;

/** lucide icons at one size and one stroke everywhere. */
const ic = (size: 16 | 18 = 16) => ({
  size,
  strokeWidth: 1.5,
  "aria-hidden": true as const,
});

export function Portfolio({ lang }: { lang: Lang }) {
  const t = content[lang];
  const rtl = lang === "ar";
  const active = useActiveSection([...SECTIONS]);

  return (
    <div lang={lang} dir={rtl ? "rtl" : "ltr"} className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-[10px] focus:bg-signal focus:px-4 focus:py-2 focus:text-signal-ink"
      >
        {t.skip}
      </a>

      <Header t={t} rtl={rtl} active={active} />

      <main id="main">
        <Hero t={t} rtl={rtl} />

        {/* Headline numbers: the one that matters carries the accent. */}
        <section
          aria-label={rtl ? "أرقام" : "Highlights"}
          className="mx-auto max-w-6xl px-6 lg:px-8"
        >
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-y border-line py-8 md:grid-cols-4">
            {t.stats.map(([v, l], i) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd
                  className={`text-[32px] font-medium leading-none tnum rtl:text-right ${i === 0 ? "text-signal" : "text-text"}`}
                  dir="ltr"
                >
                  {v}
                </dd>
                <p
                  className="mt-3 text-[14px] leading-[1.5] text-soft"
                  aria-hidden="true"
                >
                  {l}
                </p>
              </div>
            ))}
          </dl>
        </section>

        <Section id="work" title={t.work.title} intro={t.work.intro}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
            {t.work.projects.map((p) => (
              <ProjectCard key={p.id} p={p} t={t} lang={lang} />
            ))}
          </div>

          <h3 className="mt-16 text-[20px] font-medium">{t.work.moreTitle}</h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {t.work.more.map((m) => (
              <li
                key={m.title}
                className="grid gap-x-8 gap-y-1 py-4 md:grid-cols-[64px_240px_1fr] md:items-baseline"
              >
                <span className="font-mono text-[13px] text-faint tnum">
                  {m.year}
                </span>
                <span className="text-[16px] font-medium">{m.title}</span>
                <span className="text-[15px] leading-[1.6] text-soft">
                  {m.text}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="about" title={t.about.title}>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="text-[17px] leading-[1.7] text-soft">
                {t.about.bio}
              </p>
              <dl className="mt-8 divide-y divide-line border-y border-line">
                {t.about.facts.map(([k, v]) => (
                  <div
                    key={k}
                    className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-8"
                  >
                    <dt className="text-[14px] text-faint">{k}</dt>
                    <dd className="text-[15px]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="text-[20px] font-medium">
                {t.about.timelineTitle}
              </h3>
              <ol className="mt-6">
                {t.about.timeline.map(([when, title, text], i, all) => {
                  const now = when === t.about.nowLabel;
                  return (
                    <li
                      key={`${when}-${title}`}
                      className="relative grid grid-cols-[16px_1fr] gap-x-4 pb-6 last:pb-0"
                    >
                      {i < all.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 start-[7px] top-6 w-px bg-line-strong"
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className={`joint mt-[5px] ${now ? "text-amber" : "text-faint"}`}
                      />
                      <div>
                        <p
                          className={`font-mono text-[13px] ${now ? "text-amber" : "text-faint"}`}
                        >
                          {when}
                        </p>
                        <p className="mt-1 text-[16px] font-medium">{title}</p>
                        <p className="mt-1 text-[15px] leading-[1.6] text-soft">
                          {text}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </Section>

        <Section id="skills" title={t.skills.title} intro={t.skills.intro}>
          <dl className="divide-y divide-line border-y border-line">
            {t.skills.groups.map(([label, items]) => (
              <div
                key={label}
                className="grid gap-2 py-4 md:grid-cols-[240px_1fr] md:gap-8"
              >
                <dt className="text-[15px] font-medium">{label}</dt>
                <dd className="text-[15px] leading-[1.6] text-soft">
                  {items.map((it, i) => (
                    <span key={it}>
                      {i > 0 && (
                        <span className="text-faint" aria-hidden="true">
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
  );
}

function Header({
  t,
  rtl,
  active,
}: {
  t: Content;
  rtl: boolean;
  active: string | null;
}) {
  const label = rtl ? "الأقسام" : "Sections";
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 lg:px-8">
        <a
          href="#top"
          className="inline-flex min-h-11 items-center text-[16px] font-medium"
          lang="en"
          dir="ltr"
        >
          Hussein Al Herk
        </a>
        <div className="flex items-center gap-2">
          <nav aria-label={label} className="hidden items-center md:flex">
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`inline-flex h-9 items-center rounded-md px-3 text-[14px] transition-colors duration-150 ${
                  active === id
                    ? "bg-raised text-text"
                    : "text-soft hover:text-text"
                }`}
              >
                {t.nav[id]}
              </a>
            ))}
          </nav>
          <Link
            to={t.nav.switchTo}
            className="btn btn-secondary h-9 min-h-9 px-3 text-[14px]"
            lang={rtl ? "en" : "ar"}
          >
            <Languages {...ic(16)} />
            {t.nav.switchLabel}
          </Link>
          {/* Phones: the section links collapse into one menu button. */}
          <details className="group relative md:hidden">
            <summary
              aria-label={label}
              className="btn btn-secondary h-9 min-h-9 cursor-pointer px-2.5"
            >
              <Menu {...ic(18)} />
            </summary>
            <nav
              aria-label={label}
              className="absolute end-0 top-full mt-2 w-48 rounded-xl border border-line bg-card p-1 shadow-[0_8px_24px_rgb(0_0_0/0.4)]"
            >
              {SECTIONS.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex h-10 items-center rounded-lg px-3 text-[15px] text-soft hover:bg-raised hover:text-text"
                  onClick={(e) =>
                    e.currentTarget.closest("details")?.removeAttribute("open")
                  }
                >
                  {t.nav[id]}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

function Hero({ t, rtl }: { t: Content; rtl: boolean }) {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 pt-16 md:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-32 lg:pt-24"
    >
      <div className="min-w-0">
        <p className="rise flex items-center gap-2 text-[14px] text-soft">
          <span aria-hidden="true" className="joint text-signal" />
          {t.hero.status}
        </p>
        <h1
          className="rise d1 mt-6 text-[40px] font-medium leading-[1.04] tracking-[-0.03em] sm:text-[56px] lg:text-[64px] rtl:text-right"
          lang="en"
          dir="ltr"
        >
          {t.hero.name}
        </h1>
        <p className="rise d1 mt-4 text-[20px] leading-[1.4]">{t.hero.lead}</p>
        <p className="rise d2 mt-4 max-w-[36rem] text-[17px] leading-[1.7] text-soft">
          {t.hero.line}. {t.hero.intro}
        </p>
        <div className="rise d3 mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${LINKS.email}`} className="btn btn-primary">
            <Mail {...ic(16)} />
            {t.hero.emailMe}
          </a>
          <a href="#work" className="btn btn-secondary">
            {t.hero.seeWork}
            <ArrowDown {...ic(16)} />
          </a>
        </div>
      </div>
      <figure className="rise d2 min-w-0">
        <div className="overflow-hidden rounded-2xl border border-line bg-card">
          <PoseFigure
            className="h-[340px] sm:h-[400px]"
            label={t.pose.label}
            motionLabel={t.pose.motion}
            alertLabel={t.pose.alert}
            leftLabel={t.pose.left}
            rightLabel={t.pose.right}
            rtl={rtl}
          />
        </div>
        <figcaption className="mt-3 text-[14px] leading-[1.6] text-faint">
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
      className="mx-auto max-w-6xl px-6 pt-24 lg:px-8 lg:pt-32"
    >
      <h2
        id={`${id}-title`}
        className="text-[32px] font-medium leading-[1.15] tracking-[-0.02em] lg:text-[36px]"
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-4 max-w-[40rem] text-[17px] leading-[1.6] text-soft">
          {intro}
        </p>
      )}
      <div className="mt-12">{children}</div>
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
          <div className="space-y-4">
            <Pipeline title={v.fightStepsTitle} steps={v.fightSteps} />
            <ResultBars
              title={v.fightTitle}
              rows={v.fightRows}
              note={v.fightNote}
            />
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

/** A status marker: the joint ring in a colour that carries the meaning. */
function Status({ text, tone }: { text: string; tone: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-soft">
      <span
        aria-hidden="true"
        className="joint"
        style={{ color: tone } as CSSProperties}
      />
      {text}
    </span>
  );
}

function ProjectCard({ p, t, lang }: { p: Project; t: Content; lang: Lang }) {
  const release = useLatestRelease(p.releaseRepo);
  const version = release?.tag ?? p.version;
  const building = p.status === "building";
  const { side, inline } = visualsFor(p, t, lang);

  return (
    <article
      className={`flex min-w-0 flex-col rounded-2xl border border-line bg-card p-6 sm:p-8 ${LAYOUT[p.id]}`}
    >
      <div
        className={
          side
            ? "grid flex-1 gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-12"
            : "flex flex-1 flex-col"
        }
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
            {building ? (
              <Status text={t.work.building} tone="var(--amber)" />
            ) : p.releaseRepo ? (
              <Status text={t.work.released} tone="var(--signal)" />
            ) : null}
            {p.flag && (
              <Status
                text={p.flag}
                tone={p.flagTone === "amber" ? "var(--amber)" : "var(--faint)"}
              />
            )}
            {version && (
              <span className="font-mono text-faint tnum">
                <span dir="ltr">{version}</span>
                {release && <> · {timeAgo(release.at, lang)}</>}
              </span>
            )}
            <span className="text-faint">{p.meta}</span>
          </div>

          <h3 className="mt-4 text-[24px] font-medium leading-[1.2] tracking-[-0.02em] sm:text-[28px]">
            {p.title}
          </h3>
          <p className="mt-2 text-[16px] text-soft">{p.tagline}</p>
          <p className="mt-4 text-[16px] leading-[1.7] text-soft">{p.text}</p>
          {p.note && (
            <p className="mt-4 text-[14px] leading-[1.6] text-faint">
              {p.note}
            </p>
          )}

          {inline && <div className="mt-6">{inline}</div>}

          {p.stats.length > 0 && (
            <dl className="mt-6 grid grid-cols-3 gap-4">
              {p.stats.map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd
                    className="text-[24px] font-medium leading-none tnum rtl:text-right"
                    dir="ltr"
                  >
                    {v}
                  </dd>
                  <p
                    className="mt-2 text-[13px] leading-[1.5] text-soft"
                    aria-hidden="true"
                  >
                    {l}
                  </p>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-8">
            <p
              className="font-mono text-[13px] leading-[1.6] text-faint"
              aria-label={lang === "ar" ? "التقنيات" : "Technologies"}
            >
              {p.tags.map((tag, i) => (
                <span key={tag}>
                  {i > 0 && <span aria-hidden="true">{" · "}</span>}
                  <bdi>{tag}</bdi>
                </span>
              ))}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {p.links.map((l) =>
                l.kind === "download" && p.id === "forge" ? (
                  <a key={l.href} href={l.href} className="btn btn-secondary">
                    <Download {...ic(16)} />
                    {l.label}
                  </a>
                ) : (
                  <ExtLink key={l.href} href={l.href}>
                    {l.label}
                  </ExtLink>
                ),
              )}
            </div>
          </div>
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
      className="mx-auto max-w-6xl px-6 pb-16 pt-24 lg:px-8 lg:pt-32"
    >
      <h2
        id="contact-title"
        className="text-[40px] font-medium leading-[1.08] tracking-[-0.03em] sm:text-[48px]"
      >
        {c.title}
      </h2>
      <p className="mt-4 max-w-[36rem] text-[18px] leading-[1.6] text-soft">
        {c.text}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={`mailto:${LINKS.email}`} dir="ltr" className="btn btn-primary">
          <Mail {...ic(16)} />
          {LINKS.email}
        </a>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className="btn btn-secondary cursor-pointer"
        >
          {copied ? <Check {...ic(16)} /> : <Copy {...ic(16)} />}
          {copied ? c.copied : c.copy}
        </button>
      </div>
      <div className="mt-6 flex flex-wrap gap-x-8">
        <ExtLink href={LINKS.github} icon={<Github {...ic(16)} />}>
          GitHub
        </ExtLink>
        <ExtLink href={LINKS.linkedin} icon={<Linkedin {...ic(16)} />}>
          LinkedIn
        </ExtLink>
      </div>

      <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[14px] text-faint">
        <p>{c.footer}</p>
        <a
          href={LINKS.source}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center transition-colors duration-150 hover:text-text"
        >
          {c.built}
        </a>
      </footer>
    </section>
  );
}

function ExtLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-text transition-colors duration-150 hover:text-signal"
    >
      {icon && (
        <span className="text-soft group-hover:text-signal">{icon}</span>
      )}
      {children}
      <ArrowUpRight
        {...ic(16)}
        className="text-faint transition-colors duration-150 group-hover:text-signal rtl:-scale-x-100"
      />
    </a>
  );
}
