import { useState } from "react";
import {
  ChevronRight,
  Globe,
  LayoutDashboard,
  Mic,
  Navigation,
  Radio,
} from "lucide-react";

const ic = (size: 16 | 18 = 16) => ({
  size,
  strokeWidth: 1.5,
  "aria-hidden": true as const,
});

/** A diagram's quiet panel: one surface step below the card, no border. */
const PANEL = "rounded-xl bg-bg p-4 sm:p-5";

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="text-[13px] font-medium text-soft">
      {children}
    </figcaption>
  );
}

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
      className={`relative aspect-[9/19.5] rounded-[32px] border border-line-strong bg-deep p-[6px] shadow-[0_24px_48px_-24px_rgb(0_0_0/0.8)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-black">
        {children}
      </div>
    </div>
  );
}

/** Forge screenshots; the visitor picks the screen, nothing changes by itself. */
export function PhoneShowcase({
  screens,
  label,
}: {
  screens: Array<[string, string]>;
  label: string;
}) {
  const [i, setI] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <Phone className="w-[200px] sm:w-[216px]">
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
        className="flex flex-wrap justify-center gap-1 rounded-[10px] bg-bg p-1"
      >
        {screens.map(([file, name], k) => (
          <button
            key={file}
            type="button"
            aria-pressed={k === i}
            onClick={() => setI(k)}
            className={`h-8 cursor-pointer rounded-md px-2.5 text-[13px] transition-colors duration-150 ${
              k === i ? "bg-raised text-text" : "text-soft hover:text-text"
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

/** Accuracy bars: the headline result in the accent, the rest neutral. */
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
    <figure className={PANEL}>
      <Caption>{title}</Caption>
      <ul className="mt-4 space-y-3">
        {rows.map(([label, v], idx) => (
          <li key={label}>
            <div className="flex items-baseline justify-between gap-4 text-[14px]">
              <span className="text-soft">{label}</span>
              <span
                className={`font-mono tnum ${idx === 0 ? "text-signal" : "text-text"}`}
                dir="ltr"
              >
                {v}%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-raised">
              <div
                className={`bar-fill h-full rounded-full ${idx === 0 ? "bg-signal" : "bg-faint"}`}
                style={{ width: `${v}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      {note && (
        <p className="mt-4 text-[13px] leading-[1.6] text-faint">{note}</p>
      )}
    </figure>
  );
}

/** The fight detector's decision steps, joined by chevrons (mirrored in RTL). */
export function Pipeline({ title, steps }: { title: string; steps: string[] }) {
  return (
    <figure className={PANEL}>
      <Caption>{title}</Caption>
      <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span
              className={`rounded-md px-2.5 py-1 text-[13px] leading-[1.4] ${
                i === steps.length - 1
                  ? "bg-raised text-text ring-1 ring-alert/50"
                  : "bg-raised text-soft"
              }`}
            >
              <bdi>{s}</bdi>
            </span>
            {i < steps.length - 1 && (
              <ChevronRight
                {...ic(16)}
                className="text-faint rtl:-scale-x-100"
              />
            )}
          </li>
        ))}
      </ol>
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
      className={`rounded-lg px-3 py-2 text-center ${
        strong ? "bg-raised ring-1 ring-signal/50" : "bg-raised"
      }`}
    >
      <div className="whitespace-nowrap text-[14px] font-medium leading-[1.3]">
        <bdi>{title}</bdi>
      </div>
      <div className="mt-0.5 font-mono text-[12px] leading-[1.3] text-faint">
        <bdi>{sub}</bdi>
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
    <figure className={PANEL}>
      <Caption>{title}</Caption>
      <div className="mt-4">
        <div className="grid grid-cols-2 gap-2">
          <Node title={steps.lexical[0]} sub={steps.lexical[1]} />
          <Node title={steps.dense[0]} sub={steps.dense[1]} />
        </div>
        {/* Two lines merging into one: symmetric, so it reads the same in RTL. */}
        <svg
          viewBox="0 0 200 16"
          className="mx-auto block h-4 w-1/2"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            d="M2 0 V6 Q2 8 6 8 H194 Q198 8 198 6 V0 M100 8 V16"
            fill="none"
            stroke="rgb(238 240 245 / 0.14)"
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
    <div className={PANEL}>
      <div className="flex items-center gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-raised text-soft">
          <Mic {...ic(16)} />
        </span>
        <span className="text-[14px] text-soft">{listening}</span>
        <div
          aria-hidden="true"
          className="ms-auto flex h-6 items-center gap-[3px]"
        >
          {BARS.map((b, i) => (
            <span
              key={i}
              className="block w-[2px] rounded-full bg-faint"
              style={{ height: `${Math.round(b * 24)}px` }}
            />
          ))}
        </div>
      </div>
      <p
        lang="ar"
        dir="rtl"
        className="mt-4 font-arabic text-[17px] leading-[1.8] text-text"
      >
        «{said}»
      </p>
      {meaning && (
        <p className="mt-1 text-[14px] leading-[1.6] text-soft">{meaning}</p>
      )}
    </div>
  );
}

export function TodoPhone() {
  return (
    <Phone className="mx-auto w-[176px]">
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
    const c = round % 2 === 0 ? pos : 2 - pos;
    cols[c]?.push(i);
  }
  return (
    <figure className={PANEL}>
      <div className="grid grid-cols-3 gap-2">
        {cols.map((ranks, c) => (
          <div key={c} className="flex flex-col items-center gap-2 py-1">
            <span className="text-[13px] font-medium text-soft">
              {names[c]}
            </span>
            {ranks.map((r) => (
              <span
                key={r}
                className={`grid size-7 place-items-center rounded-full font-mono text-[12px] tnum ${
                  r < 3 ? "bg-text text-bg" : "bg-raised text-soft"
                }`}
              >
                {r + 1}
              </span>
            ))}
            <span className="mt-1 font-mono text-[12px] text-faint" dir="ltr">
              {(ranks.reduce((a, b) => a + b + 1, 0) / ranks.length).toFixed(1)}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-[13px] leading-[1.5] text-faint">
        {caption} · {avgLabel} <span dir="ltr">6.5</span>
      </figcaption>
    </figure>
  );
}

/* ------------------------- Shop and delivery system ------------------------ */

type JourneyStep = { label: string; title: string; text: string; alt: string };

const STEP_ICONS = [Globe, LayoutDashboard, Navigation, Radio];
const SHOT =
  "block h-auto w-full rounded-xl border border-line shadow-[0_24px_48px_-24px_rgb(0_0_0/0.8)]";

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
      <img
        src="/work/olive-shop.webp"
        alt={alt}
        width={1200}
        height={578}
        loading="lazy"
        decoding="async"
        className={`${SHOT} max-w-[820px]`}
      />
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
        className={`${SHOT} max-w-[820px]`}
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
    <div className="grid w-full max-w-[820px] items-center justify-items-center gap-6 sm:grid-cols-[auto_1fr]">
      <Phone className="w-[120px] sm:w-[152px]">
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
        className="block h-auto w-full rounded-xl border border-line"
      />
    </div>
  );
}

/**
 * One order travelling through the website, the admin dashboard and the
 * driver app. The visitor steps through it; nothing advances by itself.
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
  return (
    <figure className={`${PANEL} sm:p-6`}>
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
                  className={`absolute top-[20px] block h-px ${k < i ? "bg-soft" : "bg-line-strong"}`}
                  style={{
                    insetInlineStart: "calc(50% + 24px)",
                    insetInlineEnd: "calc(-50% + 24px)",
                  }}
                />
              )}
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setI(k)}
                className="relative flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg py-1 text-center"
              >
                <span
                  className={`grid size-10 place-items-center rounded-full border transition-colors duration-150 ${
                    on
                      ? "border-text bg-text text-bg"
                      : k < i
                        ? "border-line-strong bg-raised text-text"
                        : "border-line-strong bg-card text-soft hover:text-text"
                  }`}
                >
                  <Icon {...ic(18)} />
                </span>
                <span
                  className={`text-[13px] leading-[1.3] ${on ? "font-medium text-text" : "text-soft"}`}
                >
                  {s.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Every step sits in the same grid cell, so switching never changes the height. */}
      <div className="mt-6 grid">
        {steps.map((s, k) => (
          <div
            key={s.label}
            aria-hidden={k !== i ? true : undefined}
            className={`flex flex-col transition-opacity duration-300 [grid-area:1/1] ${k === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <div className="flex flex-1 items-center justify-center">
              <JourneyStage k={k} alt={s.alt} lang={lang} />
            </div>
            <p className="mx-auto mt-4 max-w-[46rem] text-center text-[15px] leading-[1.6] text-soft">
              <span className="font-medium text-text">{s.title}.</span> {s.text}
            </p>
          </div>
        ))}
      </div>
    </figure>
  );
}
