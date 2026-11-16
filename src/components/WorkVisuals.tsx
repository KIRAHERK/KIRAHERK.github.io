import { useEffect, useRef, useState } from "react";
import {
  ChevronRight,
  Globe,
  LayoutDashboard,
  Mic,
  Navigation,
  Radio,
} from "lucide-react";
import { prefersReducedMotion } from "@/components/motion";

/* ------------------------------ Phone frame ------------------------------ */

function Phone({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[2.1rem] border border-line-strong bg-[#0a0e1a] p-[7px] shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.65rem] bg-black">
        {children}
      </div>
      <div
        aria-hidden="true"
        className="absolute start-1/2 top-[13px] h-[5px] w-[54px] -translate-x-1/2 rounded-full bg-black/70 rtl:translate-x-1/2"
      />
    </div>
  );
}

/** Forge screenshots that change by themselves, with tabs to pick one. */
export function PhoneShowcase({
  screens,
  label,
}: {
  screens: Array<[string, string]>;
  label: string;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const el = ref.current;
    let visible = false;
    const io = new IntersectionObserver(
      ([e]) => (visible = !!e?.isIntersecting),
      { threshold: 0.3 },
    );
    if (el) io.observe(el);
    const id = window.setInterval(() => {
      if (visible && !document.hidden) setI((v) => (v + 1) % screens.length);
    }, 3200);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, [paused, screens.length]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-4"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative">
        <div
          aria-hidden="true"
          className="glow -inset-8 bg-[radial-gradient(closest-side,rgb(204_255_77/0.22),transparent)]"
        />
        <Phone className="w-[200px] sm:w-[214px]">
          {screens.map(([file, name], k) => (
            <img
              key={file}
              src={`/work/${file}.webp`}
              alt={k === i ? `Forge: ${name}` : ""}
              aria-hidden={k === i ? undefined : true}
              width={420}
              height={933}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${k === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </Phone>
      </div>
      <div
        role="group"
        aria-label={label}
        className="flex flex-wrap justify-center gap-1.5"
      >
        {screens.map(([file, name], k) => (
          <button
            key={file}
            type="button"
            aria-pressed={k === i}
            onClick={() => {
              setI(k);
              setPaused(true);
            }}
            className={`min-h-9 cursor-pointer rounded-full border px-3 text-[13px] transition-colors duration-200 ${
              k === i
                ? "border-lime/60 bg-lime/10 text-lime"
                : "border-line text-soft hover:border-line-strong hover:text-text"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Fight detection ---------------------------- */

export function ResultBars({
  title,
  rows,
}: {
  title: string;
  rows: Array<[string, number]>;
}) {
  return (
    <figure className="rounded-xl border border-line bg-bg/60 p-4">
      <figcaption className="font-mono text-[12px] uppercase tracking-wider text-faint">
        {title}
      </figcaption>
      <ul className="mt-3 space-y-3">
        {rows.map(([label, v], idx) => (
          <li key={label}>
            <div className="flex items-baseline justify-between gap-3 text-[14px]">
              <span className="text-soft">{label}</span>
              <span
                className={`font-mono font-semibold tnum ${idx === 0 ? "text-rose" : "text-text"}`}
                dir="ltr"
              >
                {v}%
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2">
              <div
                className="bar-fill h-full rounded-full"
                style={{
                  width: `${v}%`,
                  background:
                    idx === 0
                      ? "var(--rose)"
                      : "color-mix(in oklab, var(--rose) 45%, var(--surface-2))",
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/* ---------------------------- Exam generator ----------------------------- */

function Node({
  title,
  sub,
  strong = false,
}: {
  title: string;
  sub: string;
  strong?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 text-center ${
        strong ? "border-sky/50 bg-sky/10" : "border-line bg-surface"
      }`}
    >
      <div className="text-[14px] font-semibold leading-tight" dir="auto">
        {title}
      </div>
      <div
        className="mt-0.5 font-mono text-[11.5px] leading-tight text-faint"
        dir="auto"
      >
        {sub}
      </div>
    </div>
  );
}

function Down() {
  return (
    <div
      aria-hidden="true"
      className="flow-y mx-auto h-5 w-[2px]"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, var(--sky) 50%, transparent 50%)",
        backgroundSize: "2px 8px",
      }}
    />
  );
}

export function RetrievalFlow({
  title,
  steps,
}: {
  title: string;
  steps: {
    lexical: [string, string];
    dense: [string, string];
    fuse: [string, string];
    llm: [string, string];
    out: [string, string];
  };
}) {
  return (
    <figure className="rounded-xl border border-line bg-bg/60 p-4">
      <figcaption className="font-mono text-[12px] uppercase tracking-wider text-faint">
        {title}
      </figcaption>
      <div className="mt-3">
        <div className="grid grid-cols-2 gap-2">
          <Node title={steps.lexical[0]} sub={steps.lexical[1]} />
          <Node title={steps.dense[0]} sub={steps.dense[1]} />
        </div>
        {/* Two lines merging into one: symmetric, so it reads the same in RTL. */}
        <svg
          viewBox="0 0 200 24"
          className="mx-auto block h-6 w-1/2"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            d="M2 0 V8 Q2 12 6 12 H194 Q198 12 198 8 V0 M100 12 V24"
            fill="none"
            stroke="var(--sky)"
            strokeWidth="2"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
            className="flow-line"
          />
        </svg>
        <Node title={steps.fuse[0]} sub={steps.fuse[1]} />
        <Down />
        <Node title={steps.llm[0]} sub={steps.llm[1]} />
        <Down />
        <Node title={steps.out[0]} sub={steps.out[1]} strong />
      </div>
    </figure>
  );
}

/* ------------------------------ Smart To-Do ------------------------------ */

const BARS = [
  0.35, 0.6, 0.9, 0.5, 0.75, 1, 0.65, 0.4, 0.8, 0.55, 0.95, 0.45, 0.7, 0.3,
  0.85, 0.5, 0.65, 0.4,
];

export function VoiceNote({
  listening,
  said,
  meaning,
}: {
  listening: string;
  said: string;
  meaning?: string | undefined;
}) {
  return (
    <div className="rounded-xl border border-teal/30 bg-teal/[0.06] p-4">
      <div className="flex items-center gap-3">
        <span className="pulse-dot grid size-9 shrink-0 place-items-center rounded-full bg-teal text-teal">
          <Mic
            className="relative z-10 size-[18px] text-[#03201b]"
            aria-hidden="true"
          />
        </span>
        <span className="text-[14px] font-medium text-teal">{listening}</span>
        <div
          aria-hidden="true"
          className="ms-auto flex h-8 items-center gap-[3px]"
        >
          {BARS.map((b, i) => (
            <span
              key={i}
              className="voice-bar block w-[3px] rounded-full bg-teal/80"
              style={{
                height: `${Math.round(b * 30)}px`,
                ["--d" as string]: `${(i % 6) * -0.17}s`,
                ["--t" as string]: `${0.8 + (i % 4) * 0.18}s`,
              }}
            />
          ))}
        </div>
      </div>
      <p
        lang="ar"
        dir="rtl"
        className="mt-3 font-arabic text-[17px] leading-relaxed text-text"
      >
        «{said}»
      </p>
      {meaning && (
        <p className="mt-1 text-[14px] leading-relaxed text-soft">{meaning}</p>
      )}
    </div>
  );
}

export function TodoPhone() {
  return (
    <div className="relative mx-auto w-fit">
      <div
        aria-hidden="true"
        className="glow -inset-8 bg-[radial-gradient(closest-side,rgb(45_212_191/0.18),transparent)]"
      />
      <Phone className="w-[176px]">
        <img
          src="/work/todo-today.webp"
          alt="Smart To-Do: today's tasks, in Arabic"
          width={420}
          height={903}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </Phone>
    </div>
  );
}

/* ---------------------------- Class distributor --------------------------- */

/** 12 ranked students dealt into 3 classes in zigzag (snake) order. */
export function SnakeDraft({
  caption,
  names,
  avgLabel,
}: {
  caption: string;
  names: [string, string, string];
  avgLabel: string;
}) {
  const cols: number[][] = [[], [], []];
  for (let i = 0; i < 12; i++) {
    const round = Math.floor(i / 3);
    const pos = i % 3;
    const c = round % 2 === 0 ? pos : 2 - pos;
    cols[c]?.push(i);
  }
  return (
    <figure className="rounded-xl border border-line bg-bg/60 p-4">
      <div className="grid grid-cols-3 gap-2">
        {cols.map((ranks, c) => (
          <div
            key={c}
            className="flex flex-col items-center gap-1.5 rounded-lg bg-surface-2/60 py-2.5"
          >
            <span className="font-mono text-[12px] text-faint">{names[c]}</span>
            {ranks.map((r) => (
              <span
                key={r}
                className={`draft-dot grid size-7 place-items-center rounded-full font-mono text-[11px] font-semibold ${r < 6 ? "text-signal-ink" : "text-white"}`}
                style={{
                  background: `color-mix(in oklab, var(--signal) ${100 - r * 5}%, var(--surface-2))`,
                  ["--i" as string]: r,
                }}
              >
                {r + 1}
              </span>
            ))}
            <span className="mt-1 font-mono text-[11px] text-soft" dir="ltr">
              {(ranks.reduce((a, b) => a + b + 1, 0) / ranks.length).toFixed(1)}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-[13px] leading-snug text-faint">
        {caption} · {avgLabel} <span dir="ltr">6.5</span>
      </figcaption>
    </figure>
  );
}

/** Fight detector's decision steps as chips joined by arrows (mirrored in RTL). */
export function Pipeline({ title, steps }: { title: string; steps: string[] }) {
  return (
    <figure className="rounded-xl border border-line bg-bg/60 p-4">
      <figcaption className="font-mono text-[12px] uppercase tracking-wider text-faint">
        {title}
      </figcaption>
      <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-1.5">
            <span
              className={`rounded-md border px-2.5 py-1 text-[13px] leading-tight ${
                i === steps.length - 1
                  ? "border-rose/45 bg-rose/10 text-rose"
                  : "border-line bg-surface text-text"
              }`}
              dir="auto"
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <ChevronRight
                className="size-3.5 shrink-0 text-faint rtl:-scale-x-100"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}

/* ------------------------- Shop and delivery system ------------------------ */

type JourneyStep = { label: string; title: string; text: string; alt: string };

const STEP_MS = 5200;
const STEP_ICONS = [Globe, LayoutDashboard, Navigation, Radio];

function Browser({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[820px] overflow-hidden rounded-lg border border-line-strong bg-[#141510] shadow-[0_30px_80px_-40px_rgb(0_0_0/0.9)]">
      <div
        aria-hidden="true"
        className="flex h-7 items-center gap-1.5 border-b border-white/5 bg-[#1d1f19] px-3"
      >
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
      </div>
      {children}
    </div>
  );
}

function JourneyStage({
  k,
  alt,
  lang,
}: {
  k: number;
  alt: string;
  lang: "en" | "ar";
}) {
  const img = "block h-auto w-full";
  if (k === 0)
    return (
      <Browser>
        <img
          src="/work/olive-shop.webp"
          alt={alt}
          width={1200}
          height={578}
          loading="lazy"
          decoding="async"
          className={img}
        />
      </Browser>
    );
  if (k === 1)
    return (
      <img
        src={`/work/olive-admin-${lang}.webp`}
        alt={alt}
        width={1200}
        height={lang === "ar" ? 700 : 686}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full max-w-[820px] rounded-lg border border-line-strong shadow-[0_30px_80px_-40px_rgb(0_0_0/0.9)]"
      />
    );
  if (k === 2)
    return (
      <div className="flex items-end justify-center gap-4 sm:gap-6">
        {[
          ["olive-driver-nav", alt],
          ["olive-driver-area", ""],
        ].map(([file, a]) => (
          <Phone key={file} className="w-[136px] sm:w-[178px]">
            <img
              src={`/work/${file}.webp`}
              alt={a}
              width={390}
              height={844}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </Phone>
        ))}
      </div>
    );
  return (
    <div className="grid w-full max-w-[820px] items-center justify-items-center gap-5 sm:grid-cols-[auto_1fr]">
      <Phone className="w-[120px] sm:w-[150px]">
        <img
          src="/work/olive-driver-nav.webp"
          alt=""
          width={390}
          height={844}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </Phone>
      <img
        src={`/work/olive-alerts-${lang}.webp`}
        alt={alt}
        width={1000}
        height={lang === "ar" ? 195 : 189}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full rounded-lg border border-line-strong"
      />
    </div>
  );
}

/**
 * One order travelling through the website, the admin dashboard and the
 * driver app. Steps advance by themselves while the figure is on screen
 * (not with reduced motion); clicking a step stops on it.
 */
export function OrderJourney({
  title,
  steps,
  lang,
}: {
  title: string;
  steps: JourneyStep[];
  lang: "en" | "ar";
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const io = new IntersectionObserver(
      ([e]) => setVisible(!!e?.isIntersecting),
      { threshold: 0.35 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const auto = visible && !paused && !reduced;
  useEffect(() => {
    if (!auto) return;
    const id = window.setTimeout(
      () => setI((v) => (v + 1) % steps.length),
      STEP_MS,
    );
    return () => window.clearTimeout(id);
  }, [auto, i, steps.length]);

  return (
    <figure
      ref={ref}
      className="rounded-xl border border-line bg-bg/60 p-4 sm:p-6"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <figcaption className="font-mono text-[12px] uppercase tracking-wider text-faint">
        {title}
      </figcaption>
      <ol className="mt-4 grid grid-cols-4 gap-2">
        {steps.map((s, k) => {
          const Icon = STEP_ICONS[k] ?? Globe;
          const state = k === i ? "on" : k < i ? "done" : "todo";
          return (
            <li key={s.label} className="relative">
              {k < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-[25px] block h-0.5 overflow-hidden rounded-full bg-line-strong"
                  style={{
                    insetInlineStart: "calc(50% + 26px)",
                    insetInlineEnd: "calc(-50% + 18px)",
                  }}
                >
                  <span
                    key={`${i}-${auto}`}
                    className={`block h-full bg-gold ${k < i ? "" : k === i && auto ? "journey-fill" : "scale-x-0"}`}
                    style={{
                      transformOrigin: lang === "ar" ? "right" : "left",
                      ["--dur" as string]: `${STEP_MS}ms`,
                    }}
                  />
                </span>
              )}
              <button
                type="button"
                aria-pressed={k === i}
                onClick={() => {
                  setI(k);
                  setPaused(true);
                }}
                className="relative flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg py-1 text-center"
              >
                <span
                  className={`grid size-10 place-items-center rounded-full border transition-colors duration-300 ${
                    state === "on"
                      ? "border-gold bg-gold text-[#1a1405]"
                      : state === "done"
                        ? "border-gold/50 bg-gold/15 text-gold"
                        : "border-line-strong bg-surface text-soft"
                  }`}
                >
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <span
                  className={`text-[13px] leading-tight sm:text-[14px] ${state === "on" ? "font-semibold text-text" : "text-soft"}`}
                >
                  {s.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Every step sits in the same grid cell, so switching never changes the height. */}
      <div className="mt-5 grid">
        {steps.map((s, k) => (
          <div
            key={s.label}
            aria-hidden={k !== i ? true : undefined}
            className={`flex flex-col transition-opacity duration-500 [grid-area:1/1] ${k === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <div className="flex flex-1 items-center justify-center">
              <JourneyStage k={k} alt={s.alt} lang={lang} />
            </div>
            <p className="mx-auto mt-4 max-w-[46rem] text-center text-[15px] leading-relaxed text-soft">
              <span className="font-semibold text-text">{s.title}.</span>{" "}
              {s.text}
            </p>
          </div>
        ))}
      </div>
    </figure>
  );
}
