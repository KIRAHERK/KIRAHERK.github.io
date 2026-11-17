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

/** A phone with a painted-black bezel, standing in the shop window. */
function Phone({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[1.9rem] bg-ink p-[6px] shadow-[0_26px_40px_-24px_rgb(21_24_30/0.75)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.55rem] bg-black">
        {children}
      </div>
    </div>
  );
}

/** A small caption lettered like a sign. */
function Caption({ children }: { children: ReactNode }) {
  return (
    <figcaption className="label-type text-[15px] text-ink-2">
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
    <div className="flex flex-col items-center gap-4">
      <Phone className="w-[188px] sm:w-[206px]">
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
        className="flex max-w-[260px] flex-wrap justify-center gap-x-1"
      >
        {screens.map(([file, name], k) => (
          <button
            key={file}
            type="button"
            aria-pressed={k === i}
            onClick={() => setI(k)}
            className={`label-type min-h-11 cursor-pointer px-2 text-[16px] underline-offset-[7px] transition-colors duration-200 ${
              k === i
                ? "text-cobalt underline decoration-2 decoration-cobalt"
                : "text-ink-3 hover:text-ink"
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

/** The decision chain, numbered with house-number plates. */
export function Pipeline({ title, steps }: { title: string; steps: string[] }) {
  return (
    <figure>
      <Caption>{title}</Caption>
      <ol className="relative mt-3 space-y-2.5">
        <span
          aria-hidden="true"
          className="absolute bottom-3 start-[0.9rem] top-3 w-px bg-ink/25"
        />
        {steps.map((s, i) => (
          <li
            key={s}
            className="relative flex items-center gap-3 text-[16px] text-ink"
            dir="auto"
          >
            <span className="house-no tnum" aria-hidden="true">
              {i + 1}
            </span>
            <span
              className={
                i === steps.length - 1 ? "font-semibold text-cobalt" : ""
              }
            >
              {s}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** Accuracy as enamel strips in a groove. */
export function ResultBars({
  title,
  rows,
}: {
  title: string;
  rows: Array<[string, number]>;
}) {
  return (
    <figure>
      <Caption>{title}</Caption>
      <ul className="mt-3 space-y-3">
        {rows.map(([label, v], idx) => (
          <li key={label}>
            <div className="flex items-baseline justify-between gap-3 text-[15.5px]">
              <span className="text-ink-2">{label}</span>
              <span
                className={`font-sign text-[22px] font-bold leading-none tnum ${idx === 0 ? "text-cobalt" : "text-ink"}`}
                dir="ltr"
              >
                {v}%
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-wall-deep shadow-[inset_0_1px_2px_rgb(21_24_30/0.22)]">
              <div
                className={`bar-fill h-full rounded-full ${idx === 0 ? "bg-cobalt" : "bg-ink-3"}`}
                style={{ width: `${v}%` }}
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
      className={`mx-auto w-full max-w-[13.5rem] rounded-[7px] px-3 py-2 text-center ${
        strong
          ? "plate plate-sm"
          : "bg-enamel shadow-[inset_0_0_0_1px_rgb(21_24_30/0.16),0_6px_12px_-10px_rgb(21_24_30/0.5)]"
      }`}
    >
      <div
        className={`text-[15.5px] font-semibold leading-tight ${strong ? "text-enamel" : "text-ink"}`}
        dir="auto"
      >
        {title}
      </div>
      <div
        className={`mt-0.5 text-[13.5px] leading-tight ${strong ? "text-cobalt-ink" : "text-ink-2"}`}
        dir="auto"
      >
        {sub}
      </div>
    </div>
  );
}

function Down() {
  return <div aria-hidden="true" className="mx-auto h-4 w-px bg-ink/40" />;
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
            stroke="rgb(21 24 30 / 0.4)"
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
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cobalt text-enamel shadow-[inset_0_0_0_2px_var(--cobalt),inset_0_0_0_3px_rgb(248_248_244/0.85)]">
          <Mic className="size-[17px]" aria-hidden="true" />
        </span>
        <span className="text-[15.5px] text-ink-2">{listening}</span>
        <div
          aria-hidden="true"
          className="ms-auto flex h-7 items-center gap-[3px]"
        >
          {BARS.map((b, i) => (
            <span
              key={i}
              className="voice-bar block w-[3px] rounded-full bg-cobalt"
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
        className="mt-3 font-arabic text-[18px] leading-relaxed text-ink"
      >
        «{said}»
      </p>
      {meaning && (
        <p className="mt-1 text-[15.5px] leading-relaxed text-ink-2">
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

/** 12 ranked students dealt into 3 classes in zigzag (snake) order, as house-number plates. */
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
  // Ranks 1–3 in full cobalt, fading through lighter enamels to white.
  const tone = (r: number) =>
    r < 3
      ? ["var(--cobalt)", "var(--enamel)"]
      : r < 6
        ? ["#4a68b8", "var(--enamel)"]
        : r < 9
          ? ["#bccae9", "var(--ink)"]
          : ["var(--enamel)", "var(--ink)"];
  return (
    <figure>
      <div className="grid grid-cols-3 gap-3">
        {cols.map((ranks, c) => (
          <div key={c} className="flex flex-col items-center gap-2">
            <span className="sign-type text-[18px] text-cobalt">
              {names[c]}
            </span>
            {ranks.map((r) => {
              const [bg, fg] = tone(r);
              return (
                <span
                  key={r}
                  className="draft-dot grid h-7 w-10 place-items-center rounded-[5px] font-sign text-[15px] font-semibold tnum shadow-[inset_0_0_0_1px_rgb(21_24_30/0.14),0_4px_8px_-6px_rgb(21_24_30/0.5)]"
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
            <span className="mt-1 text-[14px] text-ink-2 tnum" dir="ltr">
              {(ranks.reduce((a, b) => a + b + 1, 0) / ranks.length).toFixed(1)}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-[14.5px] leading-snug text-ink-2">
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
    <div className="w-full max-w-[820px] overflow-hidden rounded-[6px] bg-steel shadow-[0_26px_44px_-28px_rgb(21_24_30/0.75)]">
      <div aria-hidden="true" className="flex h-6 items-center gap-1.5 px-3">
        <span className="size-2 rounded-full bg-enamel/35" />
        <span className="size-2 rounded-full bg-enamel/35" />
        <span className="size-2 rounded-full bg-enamel/35" />
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
        className="block h-auto w-full max-w-[820px] rounded-[6px] shadow-[0_0_0_1px_rgb(21_24_30/0.12),0_26px_44px_-28px_rgb(21_24_30/0.75)]"
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
        className="block h-auto w-full rounded-[6px] shadow-[0_0_0_1px_rgb(21_24_30/0.12),0_18px_30px_-22px_rgb(21_24_30/0.6)]"
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
                  className="absolute top-[24px] block h-[2px] overflow-hidden rounded-full bg-ink/15"
                  style={{
                    insetInlineStart: "calc(50% + 26px)",
                    insetInlineEnd: "calc(-50% + 18px)",
                  }}
                >
                  <span
                    key={`${i}-${auto}`}
                    className={`block h-full bg-cobalt ${k < i ? "" : k === i && auto ? "journey-fill" : "scale-x-0"}`}
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
                  className={`grid size-10 place-items-center rounded-full transition-colors duration-300 ${
                    on
                      ? "bg-cobalt text-enamel shadow-[inset_0_0_0_2px_var(--cobalt),inset_0_0_0_3.5px_rgb(248_248_244/0.9),0_6px_12px_-8px_rgb(21_24_30/0.6)]"
                      : k < i
                        ? "bg-enamel text-cobalt shadow-[inset_0_0_0_2px_var(--cobalt)]"
                        : "bg-enamel text-ink-3 shadow-[inset_0_0_0_1px_rgb(21_24_30/0.2)]"
                  }`}
                >
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <span
                  className={`label-type text-[15px] leading-tight ${on ? "text-cobalt" : "text-ink-2"}`}
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
            <p className="mx-auto mt-4 max-w-[60ch] text-center text-[15.5px] leading-relaxed text-ink-2">
              <span className="font-semibold text-ink">{s.title}.</span>{" "}
              {s.text}
            </p>
          </div>
        ))}
      </div>
    </figure>
  );
}
