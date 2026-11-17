import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Globe, LayoutDashboard, Mic, Navigation, Radio } from "lucide-react";
import { prefersReducedMotion } from "@/components/motion";

const css = (vars: Record<string, string | number>) => vars as CSSProperties;

/* ------------------------------- Shared parts ------------------------------ */

/** A phone with a thin dark bezel. */
function Phone({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[1.9rem] bg-[#161618] p-[5px] shadow-[0_0_0_1px_rgb(0_0_0/0.08),0_22px_40px_-24px_rgb(0_0_0/0.45)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.55rem] bg-black">
        {children}
      </div>
    </div>
  );
}

/** A small figure caption. */
function Caption({ children }: { children: ReactNode }) {
  return (
    <figcaption className="text-[13px] font-medium text-text-2">
      {children}
    </figcaption>
  );
}

/* ------------------------------ Forge screens ----------------------------- */

/** Forge screenshots; the visitor picks the screen (nothing moves on its own). */
export function PhoneShowcase({
  screens,
  label,
}: {
  screens: Array<[string, string]>;
  label: string;
}) {
  const [i, setI] = useState(0);
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <Phone className="w-[176px] shrink-0 sm:w-[206px]">
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
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${k === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </Phone>
      <div
        role="group"
        aria-label={label}
        className="flex flex-col items-start"
      >
        {screens.map(([file, name], k) => (
          <button
            key={file}
            type="button"
            aria-pressed={k === i}
            onClick={() => setI(k)}
            className={`flex min-h-10 cursor-pointer items-center gap-2 px-1 text-start text-[14px] transition-colors duration-200 ${
              k === i
                ? "font-medium text-text before:size-1.5 before:rounded-full before:bg-accent"
                : "text-text-3 before:size-1.5 before:rounded-full before:bg-transparent hover:text-text"
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

/** The decision chain, one numbered step per stage. */
export function Pipeline({ title, steps }: { title: string; steps: string[] }) {
  return (
    <figure>
      <Caption>{title}</Caption>
      <ol className="relative mt-3 space-y-2.5">
        <span
          aria-hidden="true"
          className="absolute bottom-3 start-[0.7rem] top-3 w-px bg-line-strong"
        />
        {steps.map((s, i) => (
          <li
            key={s}
            className="relative flex items-center gap-3 text-[15px] text-text"
          >
            <span
              className="grid size-[1.45rem] shrink-0 place-items-center rounded-full border border-line-strong bg-surface font-mono text-[11.5px] text-text-2"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <bdi
              className={
                i === steps.length - 1 ? "font-medium text-accent" : ""
              }
            >
              {s}
            </bdi>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** Accuracy as simple bars. */
export function ResultBars({
  title,
  rows,
  note,
}: {
  title: string;
  rows: Array<[string, number]>;
  note?: string;
}) {
  return (
    <figure>
      <Caption>{title}</Caption>
      <ul className="mt-3 space-y-3">
        {rows.map(([label, v], idx) => (
          <li key={label}>
            <div className="flex items-baseline justify-between gap-3 text-[15.5px]">
              <span className="text-text-2">{label}</span>
              <span
                className={`font-mono text-[15px] font-medium leading-none tnum ${idx === 0 ? "text-accent" : "text-text"}`}
                dir="ltr"
              >
                {v}%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
              <div
                className={`bar-fill h-full rounded-full ${idx === 0 ? "bg-accent" : "bg-text-3"}`}
                style={{ width: `${v}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      {note && (
        <p className="mt-3 max-w-[52ch] text-[13.5px] leading-relaxed text-text-2">
          {note}
        </p>
      )}
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
      className={`mx-auto w-full max-w-[13.5rem] rounded-[7px] px-3 py-2 text-center ${
        strong ? "bg-text" : "border border-line-strong"
      }`}
    >
      <div
        className={`whitespace-nowrap text-[14px] font-medium leading-tight ${strong ? "text-bg" : "text-text"}`}
        dir="auto"
      >
        {title}
      </div>
      <div
        className={`mt-0.5 text-[12.5px] leading-tight ${strong ? "text-bg/75" : "text-text-2"}`}
        dir="auto"
      >
        {sub}
      </div>
    </div>
  );
}

function Down() {
  return <div aria-hidden="true" className="mx-auto h-4 w-px bg-line-strong" />;
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
    <figure>
      <Caption>{title}</Caption>
      <div className="mt-4">
        <div className="grid grid-cols-2 gap-3">
          <Node title={steps.lexical[0]} sub={steps.lexical[1]} />
          <Node title={steps.dense[0]} sub={steps.dense[1]} />
        </div>
        {/* Two lines meeting in one: symmetric, so it reads the same in RTL. */}
        <svg
          viewBox="0 0 200 26"
          className="mx-auto block h-5 w-1/2"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            d="M2 0 V9 Q2 13 6 13 H194 Q198 13 198 9 V0 M100 13 V26"
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
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
  0.85, 0.5,
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
    <div>
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-bg">
          <Mic className="size-[17px]" aria-hidden="true" />
        </span>
        <span className="text-[14.5px] text-text-2">{listening}</span>
        <div
          aria-hidden="true"
          className="ms-auto flex h-7 items-center gap-[3px]"
        >
          {BARS.map((b, i) => (
            <span
              key={i}
              className="voice-bar block w-[3px] rounded-full bg-accent"
              style={css({
                height: `${Math.round(b * 26)}px`,
                "--d": `${(i % 6) * -0.17}s`,
                "--t": `${0.8 + (i % 4) * 0.18}s`,
              })}
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
        <p className="mt-1 text-[14.5px] leading-relaxed text-text-2">
          {meaning}
        </p>
      )}
    </div>
  );
}

export function TodoPhone() {
  return (
    <Phone className="mx-auto w-[172px]">
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
    cols[round % 2 === 0 ? pos : 2 - pos]?.push(i);
  }
  // Ranks 1–3 solid, fading through lighter tones to an outline.
  const tone = (r: number) =>
    r < 3
      ? ["var(--text)", "var(--bg)"]
      : r < 6
        ? ["var(--text-2)", "var(--bg)"]
        : r < 9
          ? ["var(--line-strong)", "var(--text)"]
          : ["var(--surface)", "var(--text)"];
  return (
    <figure>
      <div className="grid grid-cols-3 gap-3">
        {cols.map((ranks, c) => (
          <div key={c} className="flex flex-col items-center gap-2">
            <span className="text-[14px] font-medium text-text">
              {names[c]}
            </span>
            {ranks.map((r) => {
              const [bg, fg] = tone(r);
              return (
                <span
                  key={r}
                  className="draft-dot grid size-8 place-items-center rounded-full border border-line-strong font-mono text-[12.5px] font-medium tnum"
                  style={css({
                    background: bg ?? "",
                    color: fg ?? "",
                    "--i": r,
                  })}
                >
                  {r + 1}
                </span>
              );
            })}
            <span
              className="mt-1 font-mono text-[12.5px] text-text-2 tnum"
              dir="ltr"
            >
              {(ranks.reduce((a, b) => a + b + 1, 0) / ranks.length).toFixed(1)}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-[13.5px] leading-snug text-text-2">
        {caption} · {avgLabel} <span dir="ltr">6.5</span>
      </figcaption>
    </figure>
  );
}

/* ------------------------- Shop and delivery system ------------------------ */

type JourneyStep = { label: string; title: string; text: string; alt: string };

const STEP_MS = 5200;
const STEP_ICONS = [Globe, LayoutDashboard, Navigation, Radio];

function Browser({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[820px] overflow-hidden rounded-[10px] border border-line bg-surface shadow-[0_18px_40px_-28px_rgb(0_0_0/0.35)]">
      <div aria-hidden="true" className="flex h-6 items-center gap-1.5 px-3">
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
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
          className="block h-auto w-full"
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
        className="block h-auto w-full max-w-[820px] rounded-[10px] border border-line shadow-[0_18px_40px_-28px_rgb(0_0_0/0.35)]"
      />
    );
  if (k === 2)
    return (
      <div className="flex items-end justify-center gap-4 sm:gap-6">
        {[
          ["olive-driver-nav", alt],
          ["olive-driver-area", ""],
        ].map(([file, a]) => (
          <Phone key={file} className="w-[136px] sm:w-[176px]">
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
        className="block h-auto w-full rounded-[10px] border border-line"
      />
    </div>
  );
}

/**
 * One order travelling through the website, the admin dashboard and the
 * driver app. It plays through once while on screen (not with reduced
 * motion) and stops on the last step; tapping a step stops on that step.
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
  const [held, setHeld] = useState(false);
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

  const auto = visible && !held && !reduced && i < steps.length - 1;
  useEffect(() => {
    if (!auto) return;
    const id = window.setTimeout(
      () => setI((v) => Math.min(v + 1, steps.length - 1)),
      STEP_MS,
    );
    return () => window.clearTimeout(id);
  }, [auto, i, steps.length]);

  return (
    <figure ref={ref}>
      <Caption>{title}</Caption>
      <ol className="mt-4 grid grid-cols-4 gap-2">
        {steps.map((s, k) => {
          const Icon = STEP_ICONS[k] ?? Globe;
          const on = k === i;
          return (
            <li key={s.label} className="relative">
              {k < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-[18px] block h-px overflow-hidden bg-line-strong"
                  style={{
                    insetInlineStart: "calc(50% + 22px)",
                    insetInlineEnd: "calc(-50% + 18px)",
                  }}
                >
                  <span
                    key={`${i}-${auto}`}
                    className={`block h-full bg-text ${k < i ? "" : k === i && auto ? "journey-fill" : "scale-x-0"}`}
                    style={css({
                      transformOrigin: lang === "ar" ? "right" : "left",
                      "--dur": `${STEP_MS}ms`,
                    })}
                  />
                </span>
              )}
              <button
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setI(k);
                  setHeld(true);
                }}
                className="relative flex w-full cursor-pointer flex-col items-center gap-2 rounded-[4px] py-1 text-center"
              >
                <span
                  className={`grid size-9 place-items-center rounded-full border transition-colors duration-300 ${
                    on
                      ? "border-text bg-text text-bg"
                      : k < i
                        ? "border-text bg-surface text-text"
                        : "border-line-strong bg-surface text-text-3"
                  }`}
                >
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <span
                  className={`text-[13px] font-medium leading-tight ${on ? "text-text" : "text-text-3"}`}
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
            <p className="mx-auto mt-4 max-w-[60ch] text-center text-[14.5px] leading-relaxed text-text-2">
              <span className="font-medium text-text">{s.title}.</span> {s.text}
            </p>
          </div>
        ))}
      </div>
    </figure>
  );
}
