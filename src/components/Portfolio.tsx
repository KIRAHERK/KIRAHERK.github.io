import { Link } from "@tanstack/react-router";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import {
  ArrowDown,
  BrainCircuit,
  Check,
  CircleCheck,
  Copy,
  Download,
  Github,
  Languages,
  Linkedin,
  Mail,
  ScanEye,
  Smartphone,
  Workflow,
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
  VoiceDemo,
} from "@/components/WorkVisuals";
import { Spotlight } from "@/components/aceternity/spotlight";
import { TextGenerateEffect } from "@/components/aceternity/text-generate";
import { GlowingEffect } from "@/components/aceternity/glowing-effect";
import { TracingBeam } from "@/components/aceternity/tracing-beam";
import { Timeline } from "@/components/aceternity/timeline";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { Line, Reveal } from "@/components/transitions/Reveal";
import { Reel } from "@/components/transitions/Reel";
import { LearnMore } from "@/components/transitions/LearnMore";
import {
  content,
  LINKS,
  type Ability,
  type Content,
  type Lang,
  type Project,
} from "@/content";

const SECTIONS = ["abilities", "work", "skills", "about", "contact"] as const;

const ABILITY_ICON: Record<Ability["icon"], typeof ScanEye> = {
  vision: ScanEye,
  llm: BrainCircuit,
  android: Smartphone,
  system: Workflow,
};

/** Glowing border that follows the pointer (Aceternity UI). */
function Glow() {
  return (
    <GlowingEffect
      spread={40}
      glow
      disabled={false}
      proximity={64}
      inactiveZone={0.01}
      borderWidth={1.5}
    />
  );
}

export function Portfolio({ lang }: { lang: Lang }) {
  const t = content[lang];
  const rtl = lang === "ar";
  const active = useActiveSection([...SECTIONS]);

  return (
    <div
      lang={lang}
      dir={rtl ? "rtl" : "ltr"}
      className="relative min-h-screen"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-ink"
      >
        {t.skip}
      </a>

      <Nav t={t} rtl={rtl} active={active} />

      <main id="main">
        <Hero t={t} rtl={rtl} />
        <Abilities t={t} />
        <Work t={t} lang={lang} />
        <Skills t={t} />
        <About t={t} />
        <Contact t={t} />
      </main>
    </div>
  );
}

/* ---------------------------------- Nav ---------------------------------- */

function Nav({
  t,
  rtl,
  active,
}: {
  t: Content;
  rtl: boolean;
  active: string | null;
}) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const links = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  // Sliding indicator under the section in view (Transitions.dev tabs sliding).
  useLayoutEffect(() => {
    const el = active
      ? links.current?.querySelector<HTMLAnchorElement>(`[data-id="${active}"]`)
      : null;
    setPill(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [active]);

  const items = SECTIONS.map((id) => (
    <a
      key={id}
      href={`#${id}`}
      data-id={id}
      aria-current={active === id ? "true" : undefined}
      className={`t-tab inline-flex items-center ${active === id ? "!text-text" : ""}`}
    >
      {t.nav[id]}
    </a>
  ));

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-line bg-bg/70 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.8)] backdrop-blur-xl md:rounded-full">
        <div className="flex h-14 items-center justify-between gap-3 ps-3 pe-2 sm:ps-4">
          <a
            href="#top"
            className="flex min-h-11 items-center gap-2.5"
            lang="en"
            dir="ltr"
          >
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-brand to-cyan text-[12px] font-semibold text-brand-ink">
              HA
            </span>
            <span className="hidden text-[15px] font-medium sm:inline">
              Hussein Al Herk
            </span>
          </a>
          <nav
            aria-label={rtl ? "الأقسام" : "Sections"}
            className="hidden md:block"
          >
            <div
              ref={links}
              className="t-tabs relative !bg-transparent !shadow-none"
            >
              <span
                aria-hidden="true"
                className="t-tabs-pill"
                style={
                  pill
                    ? { width: pill.w, transform: `translateX(${pill.x}px)` }
                    : { opacity: 0 }
                }
              />
              {items}
            </div>
          </nav>
          <div className="flex items-center gap-1.5">
            <Link
              to={t.nav.switchTo}
              lang={rtl ? "en" : "ar"}
              className="btn btn-ghost h-9 min-h-9 px-3 text-[13.5px]"
            >
              <Languages size={15} aria-hidden="true" />
              {t.nav.switchLabel}
            </Link>
            <a
              href={`mailto:${LINKS.email}`}
              className="btn btn-brand h-9 min-h-9 px-4 text-[13.5px]"
            >
              <Mail size={15} aria-hidden="true" />
              <span className="hidden sm:inline">{t.hero.emailMe}</span>
            </a>
          </div>
        </div>
        {/* Phones: the section links sit in a second, scrollable row. */}
        <nav
          aria-label={rtl ? "الأقسام" : "Sections"}
          className="flex gap-1 overflow-x-auto border-t border-line px-2 py-1.5 md:hidden"
        >
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[13px] ${active === id ? "bg-white/10 text-text" : "text-soft"}`}
            >
              {t.nav[id]}
            </a>
          ))}
        </nav>
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress, transformOrigin: rtl ? "right" : "left" }}
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-brand via-cyan to-brand"
        />
      </div>
    </header>
  );
}

/* --------------------------------- Hero ---------------------------------- */

function Hero({ t, rtl }: { t: Content; rtl: boolean }) {
  return (
    <section id="top" className="relative overflow-hidden pt-36 sm:pt-40">
      {/* Grid backdrop fading out, and Aceternity's spotlight beams */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]"
      />
      <Spotlight />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal className="min-w-0">
          <Line i={0}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-brand/25 bg-brand/[0.07] px-3.5 py-1.5 text-[13px] text-brand">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              {t.hero.status}
            </p>
          </Line>
          <Line i={1}>
            <h1
              className="text-sheen mt-6 pb-1 text-[46px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-[64px] lg:text-[76px] rtl:text-right"
              lang="en"
              dir="ltr"
            >
              {t.hero.name}
            </h1>
          </Line>
          <Line i={2}>
            <p className="mt-4 text-[17px] text-soft sm:text-[18px]">
              {t.hero.lead}
            </p>
          </Line>
          <TextGenerateEffect
            words={t.hero.buildsSpoken}
            className="mt-5 max-w-[34rem] text-[22px] font-medium leading-[1.35] tracking-[-0.01em] text-text sm:text-[26px]"
          />
          <Line i={4}>
            <p className="mt-5 max-w-[34rem] text-[16px] leading-[1.7] text-soft">
              {t.hero.intro}
            </p>
          </Line>
          <Line i={5}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${LINKS.email}`} className="btn btn-brand">
                <Mail size={16} aria-hidden="true" />
                {t.hero.emailMe}
              </a>
              <a href="#work" className="btn btn-ghost">
                {t.hero.seeWork}
                <ArrowDown size={16} aria-hidden="true" />
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="btn btn-ghost w-11 justify-center px-0"
              >
                <Github size={18} aria-hidden="true" />
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="btn btn-ghost w-11 justify-center px-0"
              >
                <Linkedin size={18} aria-hidden="true" />
              </a>
            </div>
          </Line>
        </Reveal>

        <Reveal className="min-w-0">
          <Line i={2}>
            <figure>
              <div className="relative rounded-3xl border border-line bg-surface/80 p-1.5 backdrop-blur-sm">
                <Glow />
                <div className="relative overflow-hidden rounded-[20px] bg-bg">
                  <PoseFigure
                    className="h-[340px] sm:h-[420px]"
                    label={t.pose.label}
                    motionLabel={t.pose.motion}
                    alertLabel={t.pose.alert}
                    rtl={rtl}
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-[13.5px] leading-[1.6] text-faint">
                {t.pose.caption}
              </figcaption>
            </figure>
          </Line>
        </Reveal>
      </div>

      {/* Headline numbers: each rolls into place (Transitions.dev spinning counter). */}
      <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
        <Reveal
          as="ul"
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
        >
          {t.stats.map(([v, l], i) => (
            <Line as="li" i={i} key={l} className="bg-bg p-5 sm:p-6">
              <Reel
                value={v}
                className={`block text-[34px] font-semibold leading-none tracking-[-0.03em] sm:text-[40px] rtl:text-right ${i === 0 ? "text-brand" : "text-text"}`}
              />
              <span className="mt-3 block text-[14px] leading-[1.5] text-soft">
                {l}
              </span>
            </Line>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Section -------------------------------- */

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
      className="relative mx-auto max-w-6xl scroll-mt-28 px-5 pt-24 sm:px-8 sm:pt-32"
    >
      <Reveal className="mb-12 max-w-[44rem]">
        <Line i={0} as="h2">
          <span
            id={`${id}-title`}
            className="text-sheen block pb-1 text-[34px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[44px]"
          >
            {title}
          </span>
        </Line>
        {intro && (
          <Line i={1} as="p">
            <span className="mt-4 block text-[17px] leading-[1.65] text-soft">
              {intro}
            </span>
          </Line>
        )}
      </Reveal>
      {children}
    </section>
  );
}

/* ------------------------------ What I do -------------------------------- */

const BENTO = [
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
];

function Abilities({ t }: { t: Content }) {
  const a = t.abilities;
  return (
    <Section id="abilities" title={a.title} intro={a.intro}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {a.items.map((it, i) => {
          const Icon = ABILITY_ICON[it.icon];
          return (
            <Reveal
              as="article"
              key={it.title}
              className={`relative flex flex-col rounded-3xl border border-line bg-surface p-6 sm:p-8 ${BENTO[i] ?? ""}`}
            >
              <Glow />
              <Line i={0}>
                <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/25">
                  <Icon size={20} aria-hidden="true" />
                </span>
              </Line>
              <Line i={1} as="h3">
                <span className="mt-5 block text-[20px] font-semibold leading-[1.3] tracking-[-0.015em]">
                  {it.title}
                </span>
              </Line>
              <Line i={2} as="p">
                <span className="mt-2 block text-[15px] leading-[1.65] text-soft">
                  {it.text}
                </span>
              </Line>
              <Line i={3}>
                <p className="mt-4 flex items-start gap-2 text-[14px] font-medium text-text">
                  <CircleCheck
                    size={16}
                    className="mt-0.5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  {it.proof}
                </p>
              </Line>
              <Line i={4} className="mt-auto">
                <div className="flex flex-wrap items-center justify-between gap-3 pt-5">
                  <ul className="flex flex-wrap gap-1.5" dir="ltr">
                    {it.tools.map((tool) => (
                      <li key={tool} className="chip">
                        {tool}
                      </li>
                    ))}
                  </ul>
                  <LearnMore href={`#p-${it.project}`}>
                    {a.seeProject}
                  </LearnMore>
                </div>
              </Line>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* --------------------------------- Work ---------------------------------- */

function visualsFor(p: Project, t: Content, lang: Lang): ReactNode {
  const v = t.visuals;
  switch (p.id) {
    case "forge":
      return (
        <PhoneShowcase screens={v.forgeScreens} label={v.forgeScreensLabel} />
      );
    case "fight":
      return (
        <div className="space-y-4">
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
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
          <VoiceDemo
            labels={v.voice}
            heard={v.voice.heard}
            demo={v.voice.demo}
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

function Work({ t, lang }: { t: Content; lang: Lang }) {
  return (
    <Section id="work" title={t.work.title} intro={t.work.intro}>
      <TracingBeam>
        <div className="space-y-6">
          {t.work.projects.map((p) => (
            <ProjectCard key={p.id} p={p} t={t} lang={lang} />
          ))}
        </div>
      </TracingBeam>

      <Reveal className="mt-20">
        <Line i={0} as="h3">
          <span className="block text-[20px] font-semibold tracking-[-0.015em]">
            {t.work.moreTitle}
          </span>
        </Line>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {t.work.more.map((m, i) => (
            <Line i={i + 1} key={m.title}>
              <div className="h-full rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-line-strong">
                <span className="font-mono text-[12.5px] text-faint">
                  {m.year}
                </span>
                <p className="mt-3 text-[16px] font-medium">{m.title}</p>
                <p className="mt-1.5 text-[14.5px] leading-[1.6] text-soft">
                  {m.text}
                </p>
              </div>
            </Line>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function Pill({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "brand" | "amber" | "plain";
}) {
  const styles = {
    brand: "border-brand/30 bg-brand/10 text-brand",
    amber: "border-amber/30 bg-amber/10 text-amber",
    plain: "border-line-strong bg-white/[0.04] text-soft",
  }[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12.5px] ${styles}`}
    >
      {tone !== "plain" && (
        <span
          aria-hidden="true"
          className={`size-1.5 rounded-full ${tone === "brand" ? "bg-brand" : "bg-amber"}`}
        />
      )}
      {children}
    </span>
  );
}

function ProjectCard({ p, t, lang }: { p: Project; t: Content; lang: Lang }) {
  const release = useLatestRelease(p.releaseRepo);
  const version = release?.tag ?? p.version;
  const building = p.status === "building";
  const wide = p.id === "shop" || p.id === "todo";
  const visual = visualsFor(p, t, lang);

  return (
    <article
      id={`p-${p.id}`}
      className="relative scroll-mt-32 rounded-3xl border border-line bg-surface p-6 sm:p-10"
    >
      <Glow />
      <Reveal
        className={
          wide
            ? ""
            : "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-12"
        }
      >
        <div className="min-w-0">
          <Line i={0}>
            <div className="flex flex-wrap items-center gap-2">
              {building ? (
                <Pill tone="amber">{t.work.building}</Pill>
              ) : p.releaseRepo ? (
                <Pill tone="brand">{t.work.released}</Pill>
              ) : null}
              {p.flag && (
                <Pill tone={p.flagTone === "amber" ? "amber" : "plain"}>
                  {p.flag}
                </Pill>
              )}
              {version && (
                <span className="font-mono text-[12.5px] text-faint">
                  <span dir="ltr">{version}</span>
                  {release && <> · {timeAgo(release.at, lang)}</>}
                </span>
              )}
              <span className="text-[13px] text-faint">{p.meta}</span>
            </div>
          </Line>
          <Line i={1} as="h3">
            <span className="mt-5 block text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[34px]">
              {p.title}
            </span>
          </Line>
          <Line i={2} as="p">
            <span className="mt-2 block text-[16px] font-medium text-brand/90">
              {p.tagline}
            </span>
          </Line>
          <Line i={3} as="p">
            <span className="mt-4 block text-[15.5px] leading-[1.75] text-soft">
              {p.text}
            </span>
          </Line>
          {p.note && (
            <Line i={4}>
              <p
                className={`mt-4 rounded-xl border px-4 py-3 text-[14px] leading-[1.6] ${
                  building || p.flagTone === "amber"
                    ? "border-amber/20 bg-amber/[0.06] text-amber/90"
                    : "border-line bg-white/[0.03] text-soft"
                }`}
              >
                {p.note}
              </p>
            </Line>
          )}
          {p.stats.length > 0 && (
            <Line i={5}>
              <dl className="mt-6 grid grid-cols-3 gap-4">
                {p.stats.map(([v, l]) => (
                  <div key={l}>
                    <dt className="sr-only">{l}</dt>
                    <dd>
                      <Reel
                        value={v}
                        className="block text-[26px] font-semibold leading-none tracking-[-0.03em] text-text rtl:text-right"
                      />
                      <span
                        className="mt-2 block text-[13px] leading-[1.45] text-soft"
                        aria-hidden="true"
                      >
                        {l}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Line>
          )}
          <Line i={6}>
            <ul className="mt-6 flex flex-wrap gap-1.5" dir="ltr">
              {p.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          </Line>
          {p.links.length > 0 && (
            <Line i={7}>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                {p.links.map((l) =>
                  l.kind === "download" && p.id === "forge" ? (
                    <a key={l.href} href={l.href} className="btn btn-brand">
                      <Download size={16} aria-hidden="true" />
                      {l.label}
                    </a>
                  ) : (
                    <LearnMore key={l.href} href={l.href} external>
                      {l.label}
                    </LearnMore>
                  ),
                )}
              </div>
            </Line>
          )}
        </div>
        <div className={`min-w-0 ${wide ? "mt-10" : ""}`}>
          {p.id === "forge" ? (
            <div className="flex justify-center">{visual}</div>
          ) : (
            visual
          )}
        </div>
      </Reveal>
    </article>
  );
}

/* -------------------------------- Skills --------------------------------- */

function Skills({ t }: { t: Content }) {
  return (
    <Section id="skills" title={t.skills.title} intro={t.skills.intro}>
      <Reveal className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {t.skills.groups.map(([label, items], i) => (
          <Line i={i} key={label}>
            <div className="h-full rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong">
              <h3 className="text-[16px] font-semibold">{label}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5" dir="ltr">
                {items.map((it) => (
                  <li
                    key={it}
                    className="chip transition-colors duration-200 hover:text-text hover:shadow-[inset_0_0_0_1px_rgb(52_211_153/0.4)]"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Line>
        ))}
      </Reveal>
    </Section>
  );
}

/* --------------------------------- About --------------------------------- */

function About({ t }: { t: Content }) {
  const a = t.about;
  return (
    <Section id="about" title={a.title}>
      <Reveal className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Line i={0} as="p">
          <span className="block text-[17px] leading-[1.8] text-soft">
            {a.bio}
          </span>
        </Line>
        <Line i={1}>
          <dl className="space-y-3">
            {a.facts.map(([k, v]) => (
              <div
                key={k}
                className="rounded-2xl border border-line bg-surface px-5 py-4"
              >
                <dt className="text-[12.5px] text-faint">{k}</dt>
                <dd className="mt-1 text-[15px]">{v}</dd>
              </div>
            ))}
          </dl>
        </Line>
      </Reveal>
      <div className="mt-16 max-w-4xl">
        <h3 className="mb-10 text-[20px] font-semibold tracking-[-0.015em]">
          {a.timelineTitle}
        </h3>
        <Timeline
          data={a.timeline.map(([when, title, text]) => ({
            title: when,
            now: when === a.nowLabel,
            content: (
              <div className="pb-2">
                <p className="text-[17px] font-medium">{title}</p>
                <p className="mt-1.5 text-[15px] leading-[1.65] text-soft">
                  {text}
                </p>
              </div>
            ),
          }))}
        />
      </div>
    </Section>
  );
}

/* -------------------------------- Contact -------------------------------- */

function Contact({ t }: { t: Content }) {
  const c = t.contact;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${LINKS.email}`;
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-10 pt-24 sm:px-8 sm:pt-32"
    >
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-20 text-center sm:px-12 sm:py-28">
        <BackgroundBeams />
        <Reveal className="relative">
          <Line i={0} as="h2">
            <span
              id="contact-title"
              className="text-sheen block pb-1 text-[40px] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[60px]"
            >
              {c.title}
            </span>
          </Line>
          <Line i={1} as="p">
            <span className="mx-auto mt-5 block max-w-[34rem] text-[17px] leading-[1.65] text-soft">
              {c.text}
            </span>
          </Line>
          <Line i={2}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${LINKS.email}`}
                dir="ltr"
                className="btn btn-brand h-12 px-6 text-[15.5px]"
              >
                <Mail size={17} aria-hidden="true" />
                {LINKS.email}
              </a>
              {/* Icon swap from Transitions.dev: copy turns into a check. */}
              <button
                type="button"
                onClick={copy}
                aria-live="polite"
                className="btn btn-ghost h-12 cursor-pointer"
              >
                <span className="t-icon-swap" data-state={copied ? "b" : "a"}>
                  <span className="t-icon" data-icon="a">
                    <Copy size={16} aria-hidden="true" />
                  </span>
                  <span className="t-icon text-brand" data-icon="b">
                    <Check size={16} aria-hidden="true" />
                  </span>
                </span>
                {copied ? c.copied : c.copy}
              </button>
            </div>
          </Line>
          <Line i={3}>
            <div className="mt-6 flex justify-center gap-6">
              <LearnMore href={LINKS.github} external>
                <Github size={16} aria-hidden="true" /> GitHub
              </LearnMore>
              <LearnMore href={LINKS.linkedin} external>
                <Linkedin size={16} aria-hidden="true" /> LinkedIn
              </LearnMore>
            </div>
          </Line>
        </Reveal>
      </div>
      <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[13.5px] text-faint">
        <p>{c.footer}</p>
        <a
          href={LINKS.source}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-text"
        >
          {c.built}
        </a>
      </footer>
    </section>
  );
}
