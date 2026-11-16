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
  Radar,
  Receipt,
  Wifi,
} from "lucide-react";
import { PoseFigure } from "@/components/PoseFigure";
import {
  CountUp,
  Rotator,
  ScrollProgress,
  spotlight,
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
  type ProjectId,
} from "@/content";

const ACCENT: Record<ProjectId, string> = {
  forge: "var(--lime)",
  fight: "var(--rose)",
  qgen: "var(--sky)",
  shop: "var(--gold)",
  todo: "var(--teal)",
  classes: "var(--signal)",
};

// Bento layout: how wide each card is on large screens, and whether its
// picture sits beside the text ("side") or inside it ("inline").
const LAYOUT: Record<ProjectId, string> = {
  forge: "lg:col-span-6",
  fight: "lg:col-span-3",
  qgen: "lg:col-span-3",
  shop: "lg:col-span-6",
  todo: "lg:col-span-4",
  classes: "lg:col-span-2",
};

const SECTIONS = ["work", "about", "skills", "contact"] as const;

const css = (vars: Record<string, string | number>) => vars as CSSProperties;

export function Portfolio({ lang }: { lang: Lang }) {
  const t = content[lang];
  const rtl = lang === "ar";
  useReveal();
  const active = useActiveSection(["top", ...SECTIONS]);

  return (
    <div
      lang={lang}
      dir={rtl ? "rtl" : "ltr"}
      className="relative isolate min-h-screen text-text"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-signal focus:px-4 focus:py-2 focus:text-signal-ink"
      >
        {t.skip}
      </a>

      {/* Background: dot grid and two slow glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="backdrop-grid absolute inset-0" />
        <div className="glow glow-a -top-48 start-[-12%] h-[560px] w-[560px] bg-[radial-gradient(closest-side,rgb(34_197_94/0.15),transparent)]" />
        <div className="glow glow-b end-[-18%] top-[28%] h-[640px] w-[640px] bg-[radial-gradient(closest-side,rgb(96_165_250/0.09),transparent)]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <a
            href="#top"
            className="flex min-h-10 items-center gap-2.5"
            lang="en"
            dir="ltr"
          >
            <span className="grid size-8 place-items-center rounded-lg border border-signal/40 bg-signal/10 font-mono text-[13px] font-semibold text-signal">
              HA
            </span>
            <span className="text-[16px] font-semibold tracking-tight">
              Hussein Al Herk
            </span>
          </a>
          <nav
            aria-label={rtl ? "الأقسام" : "Sections"}
            className="flex items-center gap-1"
          >
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`relative hidden rounded-md px-3 py-2 text-[15px] transition-colors duration-200 md:inline-block ${
                  active === id ? "text-text" : "text-soft hover:text-text"
                }`}
              >
                {t.nav[id]}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-signal transition-opacity duration-300 ${active === id ? "opacity-100" : "opacity-0"}`}
                />
              </a>
            ))}
            <Link
              to={t.nav.switchTo}
              className="ms-2 inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong bg-surface px-4 text-[15px] font-medium transition-colors duration-200 hover:border-signal hover:text-signal"
              lang={rtl ? "en" : "ar"}
            >
              <Languages className="size-4" aria-hidden="true" />
              {t.nav.switchLabel}
            </Link>
          </nav>
        </div>
        <ScrollProgress rtl={rtl} />
      </header>

      <main id="main">
        <Hero t={t} rtl={rtl} />

        {/* Headline numbers */}
        <section
          aria-label={rtl ? "أرقام" : "Highlights"}
          className="mx-auto max-w-6xl px-4 sm:px-8"
        >
          <ul className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface/60 backdrop-blur-sm md:grid-cols-4">
            {t.stats.map(([v, l], i) => (
              <li
                key={l}
                data-reveal
                style={css({ "--d": i })}
                className={`border-line p-5 sm:p-6 ${i % 2 === 0 ? "border-e" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} ${i === 1 ? "md:border-e" : ""}`}
              >
                <div
                  className="font-mono text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-none text-text rtl:text-right"
                  dir="ltr"
                >
                  <CountUp value={v} />
                </div>
                <p className="mt-3 text-[14.5px] leading-snug text-soft">{l}</p>
              </li>
            ))}
          </ul>
        </section>

        <Section
          id="work"
          eyebrow={t.work.eyebrow}
          title={t.work.title}
          intro={t.work.intro}
        >
          <div className="grid gap-5 lg:grid-cols-6">
            {t.work.projects.map((p, i) => (
              <ProjectCard key={p.id} p={p} t={t} lang={lang} index={i} />
            ))}
          </div>

          <h3 className="mt-14 font-mono text-[13px] uppercase tracking-[0.14em] text-faint">
            {t.work.moreTitle}
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {t.work.more.map((m, i) => {
              const Icon = { wifi: Wifi, radar: Radar, receipt: Receipt }[
                m.icon
              ];
              return (
                <article
                  key={m.title}
                  data-reveal
                  style={css({ "--d": i })}
                  onPointerMove={spotlight}
                  className="spot rounded-2xl border border-line bg-surface/70 p-5 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-9 place-items-center rounded-lg border border-line bg-surface-2 text-signal">
                      <Icon className="size-[18px]" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[13px] text-faint">
                      {m.year}
                    </span>
                  </div>
                  <h4 className="mt-4 text-[18px] font-semibold leading-snug">
                    {m.title}
                  </h4>
                  <p className="mt-2 text-[15.5px] leading-[1.65] text-soft">
                    {m.text}
                  </p>
                </article>
              );
            })}
          </div>
        </Section>

        <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title}>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div data-reveal>
              <p className="text-[18px] leading-[1.8] text-soft">
                {t.about.bio}
              </p>
              <dl className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {t.about.facts.map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-xl border border-line bg-surface/70 p-4"
                  >
                    <dt className="font-mono text-[12.5px] uppercase tracking-wider text-signal">
                      {k}
                    </dt>
                    <dd className="mt-1.5 text-[15.5px] leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="font-mono text-[13px] uppercase tracking-[0.14em] text-faint">
                {t.about.timelineTitle}
              </h3>
              <ol className="relative mt-5 border-s border-line ps-6">
                {t.about.timeline.map(([when, title, text], i) => {
                  const now = when === t.about.nowLabel;
                  return (
                    <li
                      key={`${when}-${title}`}
                      data-reveal
                      className="relative pb-7 last:pb-0"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute -start-[31px] top-1.5 size-3 rounded-full border-2 border-bg ${now ? "pulse-dot bg-amber text-amber" : "tl-dot bg-line-strong"}`}
                      />
                      <p
                        className={`font-mono text-[13px] ${now ? "text-amber" : "text-faint"}`}
                      >
                        {when}
                      </p>
                      <p className="mt-0.5 text-[17px] font-semibold">
                        {title}
                      </p>
                      <p className="mt-1 text-[15.5px] leading-relaxed text-soft">
                        {text}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </Section>

        <Section
          id="skills"
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          intro={t.skills.intro}
        >
          <Marquee items={t.skills.groups.flatMap(([, items]) => items)} />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {t.skills.groups.map(([label, items], i, all) => (
              <div
                key={label}
                data-reveal
                style={css({ "--d": i % 3 })}
                onPointerMove={spotlight}
                className={`spot rounded-2xl border border-line bg-surface/70 p-5 transition-colors duration-300 ${
                  i < 3 ? "lg:col-span-2" : "lg:col-span-3"
                } ${i === all.length - 1 && all.length % 2 === 1 ? "md:col-span-2 lg:col-span-3" : ""}`}
              >
                <h3 className="text-[17px] font-semibold">{label}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {items.map((it) => (
                    <li
                      key={it}
                      className="rounded-md border border-line bg-surface-2/70 px-2.5 py-1 font-mono text-[13px] text-soft"
                      dir="ltr"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
      className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-14 pt-10 sm:px-8 md:grid-cols-[1.1fr_1fr] md:pb-20 md:pt-20"
    >
      <div className="min-w-0">
        <p className="rise inline-flex items-center gap-2.5 rounded-full border border-signal/30 bg-signal/[0.07] px-3.5 py-1.5 text-[14px] text-signal">
          <span
            aria-hidden="true"
            className="pulse-dot size-2 shrink-0 rounded-full bg-signal text-signal"
          />
          {t.hero.status}
        </p>
        <h1
          className="rise d1 mt-6 text-[clamp(2.75rem,7vw,5rem)] font-bold leading-[1.02] tracking-[-0.03em] rtl:text-right"
          lang="en"
          dir="ltr"
        >
          {t.hero.name}
        </h1>
        <p className="rise d2 mt-5 text-[19px] text-soft">{t.hero.lead}</p>
        <p className="rise d2 mt-1 text-[clamp(1.45rem,3vw,2rem)] font-semibold leading-snug">
          <span>{t.hero.buildPrefix} </span>
          <Rotator
            items={t.hero.builds}
            spoken={t.hero.buildsSpoken}
            className="text-signal"
          />
        </p>
        <p className="rise d3 mt-5 max-w-[36rem] text-[17.5px] leading-[1.75] text-soft">
          {t.hero.intro}
        </p>
        <div className="rise d3 mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-signal px-6 text-[16px] font-semibold text-signal-ink transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            {t.hero.seeWork}
            <ArrowDown
              className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
          <a
            href={`mailto:${LINKS.email}`}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-line-strong bg-surface/80 px-6 text-[16px] font-semibold transition-colors duration-200 hover:border-signal hover:text-signal"
          >
            <Mail className="size-4" aria-hidden="true" />
            {t.hero.emailMe}
          </a>
        </div>
        <div className="rise d4 mt-6 flex gap-2">
          <IconLink
            href={LINKS.github}
            label="GitHub"
            icon={<Github className="size-[18px]" aria-hidden="true" />}
          />
          <IconLink
            href={LINKS.linkedin}
            label="LinkedIn"
            icon={<Linkedin className="size-[18px]" aria-hidden="true" />}
          />
        </div>
      </div>
      <figure className="rise d4 min-w-0">
        <div className="overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-[0_40px_120px_-50px_rgb(34_197_94/0.35)]">
          <PoseFigure
            className="h-[360px] sm:h-[430px]"
            label={t.pose.label}
            motionLabel={t.pose.motion}
            alertLabel={t.pose.alert}
            rtl={rtl}
          />
        </div>
        <figcaption className="mt-3 text-[14.5px] leading-relaxed text-faint">
          {t.pose.caption}
        </figcaption>
      </figure>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24"
    >
      <div data-reveal className="mb-10 max-w-[46rem]">
        <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-signal">
          {eyebrow}
        </p>
        <h2
          id={`${id}-title`}
          className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.08] tracking-tight"
        >
          {title}
        </h2>
        {intro && (
          <p className="mt-4 text-[17.5px] leading-[1.7] text-soft">{intro}</p>
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
          <div className="space-y-4">
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

function ProjectCard({
  p,
  t,
  lang,
  index,
}: {
  p: Project;
  t: Content;
  lang: Lang;
  index: number;
}) {
  const release = useLatestRelease(p.releaseRepo);
  const version = release?.tag ?? p.version;
  const building = p.status === "building";
  const accent = ACCENT[p.id];
  const { side, inline } = visualsFor(p, t, lang);

  return (
    <article
      data-reveal
      style={css({ "--card-accent": accent, "--d": index % 2 })}
      onPointerMove={spotlight}
      className={`spot flex flex-col rounded-2xl border border-line bg-surface/80 p-5 transition-colors duration-300 sm:p-7 ${LAYOUT[p.id]}`}
    >
      <div
        className={
          side
            ? "grid flex-1 gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10"
            : "flex flex-1 flex-col"
        }
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            {(building || p.releaseRepo) && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[12px] ${
                  building
                    ? "border-amber/35 bg-amber/10 text-amber"
                    : "border-signal/30 bg-signal/10 text-signal"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pulse-dot size-1.5 rounded-full ${building ? "bg-amber text-amber" : "bg-signal text-signal"}`}
                />
                {building ? t.work.building : t.work.released}
              </span>
            )}
            {version && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[12px] text-soft">
                <span dir="ltr">{version}</span>
                {release && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{timeAgo(release.at, lang)}</span>
                  </>
                )}
              </span>
            )}
            {p.flag && (
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[12px] ${
                  p.flagTone === "amber"
                    ? "border-amber/35 bg-amber/10 text-amber"
                    : "border-line-strong bg-surface-2 text-soft"
                }`}
              >
                {p.flag}
              </span>
            )}
            <span className="font-mono text-[12.5px] text-faint">{p.meta}</span>
          </div>

          <h3 className="mt-4 text-[clamp(1.6rem,3vw,2.15rem)] font-bold leading-tight tracking-tight">
            {p.title}
          </h3>
          <p className="mt-1 text-[17px] font-medium" style={{ color: accent }}>
            {p.tagline}
          </p>
          <p className="mt-4 text-[16.5px] leading-[1.75] text-soft">
            {p.text}
          </p>
          {p.note && (
            <p
              className={`mt-4 self-start rounded-lg border px-3 py-2 text-[14.5px] leading-snug ${
                building || p.flagTone === "amber"
                  ? "border-amber/30 bg-amber/[0.07] text-amber"
                  : "border-line-strong bg-surface-2/70 text-soft"
              }`}
            >
              {p.note}
            </p>
          )}

          {inline && <div className="mt-6">{inline}</div>}

          {p.stats.length > 0 && (
            <ul className="mt-6 grid gap-2 sm:grid-cols-3 sm:gap-3">
              {p.stats.map(([v, l]) => (
                <li
                  key={l}
                  className="flex items-center gap-4 rounded-xl border border-line bg-bg/50 px-4 py-3 sm:block sm:p-4"
                >
                  <div
                    className="min-w-[4.5rem] shrink-0 font-mono text-[clamp(1.35rem,2.6vw,1.75rem)] font-semibold leading-none rtl:text-right sm:min-w-0"
                    style={{ color: accent }}
                    dir="ltr"
                  >
                    <CountUp value={v} />
                  </div>
                  <p className="text-[14px] leading-snug text-soft sm:mt-2 sm:text-[13.5px]">
                    {l}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-4 pt-6">
            <ul
              className="flex flex-wrap gap-1.5"
              aria-label={lang === "ar" ? "التقنيات" : "Technologies"}
            >
              {p.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-line bg-surface-2/60 px-2 py-0.5 font-mono text-[12.5px] text-soft"
                  dir="ltr"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              {p.links.map((l) =>
                l.kind === "download" && p.id === "forge" ? (
                  <a
                    key={l.href}
                    href={l.href}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-[15px] font-semibold text-[#0a0f02] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
                    style={{ background: accent }}
                  >
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
          </div>
        </div>
        {side && <div className="flex justify-center">{side}</div>}
      </div>
    </article>
  );
}

function Marquee({ items }: { items: string[] }) {
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];
  return (
    <div
      aria-hidden="true"
      className="marquee space-y-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
    >
      {rows.map((row, r) => (
        <div
          key={r}
          className={`marquee-track gap-3 ${r === 1 ? "reverse" : ""}`}
        >
          {[...row, ...row].map((it, i) => (
            <span
              key={`${it}-${i}`}
              className="shrink-0 whitespace-nowrap rounded-full border border-line bg-surface/70 px-4 py-2 font-mono text-[14px] text-soft"
              dir="ltr"
            >
              {it}
            </span>
          ))}
        </div>
      ))}
    </div>
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
      className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-8 sm:pt-12"
    >
      <div
        data-reveal
        className="relative overflow-hidden rounded-3xl border border-line bg-surface p-7 sm:p-12"
      >
        <div
          aria-hidden="true"
          className="glow -end-32 -top-32 h-[420px] w-[420px] bg-[radial-gradient(closest-side,rgb(34_197_94/0.22),transparent)]"
        />
        <p className="relative font-mono text-[13px] uppercase tracking-[0.14em] text-signal">
          {c.eyebrow}
        </p>
        <h2
          id="contact-title"
          className="relative mt-3 text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1.02] tracking-tight"
        >
          {c.title}
        </h2>
        <p className="relative mt-4 max-w-[38rem] text-[18px] leading-[1.7] text-soft">
          {c.text}
        </p>
        <div className="relative mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${LINKS.email}`}
            dir="ltr"
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-signal px-5 text-[16px] font-semibold text-signal-ink transition-[filter] duration-200 hover:brightness-110"
          >
            <Mail className="size-4" aria-hidden="true" />
            {LINKS.email}
          </a>
          <button
            type="button"
            onClick={copy}
            aria-live="polite"
            className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-line-strong px-4 text-[16px] transition-colors duration-200 hover:border-signal hover:text-signal"
          >
            {copied ? (
              <Check className="size-4" aria-hidden="true" />
            ) : (
              <Copy className="size-4" aria-hidden="true" />
            )}
            {copied ? c.copied : c.copy}
          </button>
        </div>
        <div className="relative mt-6 flex gap-2">
          <IconLink
            href={LINKS.github}
            label="GitHub"
            icon={<Github className="size-[18px]" aria-hidden="true" />}
          />
          <IconLink
            href={LINKS.linkedin}
            label="LinkedIn"
            icon={<Linkedin className="size-[18px]" aria-hidden="true" />}
          />
        </div>
      </div>
      <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[14px] text-faint">
        <p>{c.footer}</p>
        <a
          href={LINKS.source}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-line-strong underline-offset-4 hover:text-text"
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
      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-surface/70 px-4 text-[15px] font-medium text-soft transition-colors duration-200 hover:border-line-strong hover:text-text"
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
      className="group inline-flex min-h-11 items-center gap-1 text-[15px] font-semibold underline decoration-line-strong decoration-2 underline-offset-[5px] transition-colors duration-200 hover:decoration-[var(--card-accent,var(--signal))]"
    >
      {children}
      <ArrowUpRight
        className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
        aria-hidden="true"
      />
    </a>
  );
}
