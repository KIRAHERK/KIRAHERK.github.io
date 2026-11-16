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

/* ------------------------------ Inlay parts ------------------------------ */

/** An eight-pointed star (khatam), the inlay's corner pin and bullet. */
export function Star({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        d="M10 0.8 12.6 4.6 17 3 15.4 7.4 19.2 10 15.4 12.6 17 17 12.6 15.4 10 19.2 7.4 15.4 3 17 4.6 12.6 0.8 10 4.6 7.4 3 3 7.4 4.6Z"
        fill="var(--nacre)"
        stroke="var(--brass)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Star pins on the four corners of an .inlay panel. */
export function Pins() {
  return (
    <>
      {(["tl", "tr", "bl", "br"] as const).map((c, k) => (
        <Star key={c} className={`pin pin-${c}`} style={css({ "--k": k })} />
      ))}
    </>
  );
}

/** A phone set into the panel with a brass bezel. */
function Phone({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[1.9rem] border border-brass bg-grain p-[6px] shadow-[0_24px_40px_-24px_rgb(0_0_0/0.9)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.55rem] bg-black">
        {children}
      </div>
    </div>
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
            className={`min-h-11 cursor-pointer px-2 text-[14px] underline-offset-[6px] transition-colors duration-200 ${
              k === i
                ? "text-brass-bright underline decoration-brass"
                : "text-nacre-faint hover:text-nacre"
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

/** The decision chain: nacre nodes joined by brass. */
export function Pipeline({ title, steps }: { title: string; steps: string[] }) {
  return (
    <figure>
      <figcaption className="text-[14px] text-nacre-faint">{title}</figcaption>
      <ol className="relative mt-3 space-y-2.5">
        <span
          aria-hidden="true"
          className="absolute bottom-2 start-[6px] top-2 w-px bg-brass/70"
        />
        {steps.map((s, i) => (
          <li
            key={s}
            className="relative flex items-center gap-3 text-[15px] text-nacre"
            dir="auto"
          >
            <Star className="relative size-[13px] shrink-0" />
            <span className={i === steps.length - 1 ? "text-brass-bright" : ""}>
              {s}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** Accuracy as inlaid strips: a groove in the wood, filled with nacre. */
export function ResultBars({
  title,
  rows,
}: {
  title: string;
  rows: Array<[string, number]>;
}) {
  return (
    <figure>
      <figcaption className="text-[14px] text-nacre-faint">{title}</figcaption>
      <ul className="mt-3 space-y-3">
        {rows.map(([label, v], idx) => (
          <li key={label}>
            <div className="flex items-baseline justify-between gap-3 text-[15px]">
              <span className="text-nacre-soft">{label}</span>
              <span
                className={`font-display text-[18px] tnum ${idx === 0 ? "text-brass-bright" : "text-nacre"}`}
                dir="ltr"
              >
                {v}%
              </span>
            </div>
            <div className="mt-1.5 h-[7px] overflow-hidden rounded-[1px] bg-grain shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)]">
              <div
                className="bar-fill h-full"
                style={{
                  width: `${v}%`,
                  background:
                    idx === 0
                      ? "linear-gradient(90deg, var(--nacre-soft), var(--nacre))"
                      : "var(--nacre-faint)",
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
    <div className="flex flex-col items-center px-2 text-center">
      <Star className={strong ? "size-4" : "size-3"} />
      <div
        className={`mt-1.5 text-[15px] leading-tight ${strong ? "text-brass-bright" : "text-nacre"}`}
        dir="auto"
      >
        {title}
      </div>
      <div
        className="mt-0.5 text-[13px] leading-tight text-nacre-faint"
        dir="auto"
      >
        {sub}
      </div>
    </div>
  );
}

function Down() {
  return <div aria-hidden="true" className="mx-auto my-2 h-5 w-px bg-brass" />;
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
      <figcaption className="text-[14px] text-nacre-faint">{title}</figcaption>
      <div className="mt-4">
        <div className="grid grid-cols-2">
          <Node title={steps.lexical[0]} sub={steps.lexical[1]} />
          <Node title={steps.dense[0]} sub={steps.dense[1]} />
        </div>
        {/* Two brass lines meeting in one: symmetric, so it reads the same in RTL. */}
        <svg
          viewBox="0 0 200 26"
          className="mx-auto block h-6 w-1/2"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            d="M2 0 V9 Q2 13 6 13 H194 Q198 13 198 9 V0 M100 13 V26"
            fill="none"
            stroke="var(--brass)"
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
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-brass bg-raised text-brass-bright">
          <Mic className="size-[17px]" aria-hidden="true" />
        </span>
        <span className="text-[15px] text-nacre-soft">{listening}</span>
        <div
          aria-hidden="true"
          className="ms-auto flex h-7 items-center gap-[3px]"
        >
          {BARS.map((b, i) => (
            <span
              key={i}
              className="voice-bar block w-[3px] rounded-full bg-brass"
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
        className="mt-3 font-arabic text-[18px] leading-relaxed text-nacre"
      >
        «{said}»
      </p>
      {meaning && (
        <p className="mt-1 text-[15px] leading-relaxed text-nacre-soft">
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

/** 12 ranked students dealt into 3 classes in zigzag (snake) order, as inlaid pieces. */
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
  // Rank 1 is pure nacre; lower ranks move through lemonwood into darker woods.
  const wood = (r: number) =>
    r < 3
      ? ["var(--nacre)", "var(--walnut)"]
      : r < 6
        ? ["var(--lemonwood)", "var(--walnut)"]
        : r < 9
          ? ["#845530", "var(--nacre)"]
          : ["#5e3a22", "var(--nacre)"];
  return (
    <figure>
      <div className="grid grid-cols-3 gap-3">
        {cols.map((ranks, c) => (
          <div key={c} className="flex flex-col items-center gap-2">
            <span className="font-display text-[16px] text-brass-bright">
              {names[c]}
            </span>
            {ranks.map((r) => {
              const [bg, fg] = wood(r);
              return (
                <span
                  key={r}
                  className="draft-dot grid size-8 place-items-center rounded-full border border-brass/70 text-[13px] font-semibold tnum"
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
            <span className="mt-1 text-[13px] text-nacre-soft tnum" dir="ltr">
              {(ranks.reduce((a, b) => a + b + 1, 0) / ranks.length).toFixed(1)}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-[14px] leading-snug text-nacre-faint">
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
    <div className="w-full max-w-[820px] overflow-hidden rounded-[3px] border border-brass bg-grain shadow-[0_24px_48px_-28px_rgb(0_0_0/0.9)]">
      <div
        aria-hidden="true"
        className="flex h-6 items-center gap-1.5 border-b border-brass/40 px-3"
      >
        <span className="size-2 rounded-full bg-brass/50" />
        <span className="size-2 rounded-full bg-brass/50" />
        <span className="size-2 rounded-full bg-brass/50" />
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
        className="block h-auto w-full max-w-[820px] rounded-[3px] border border-brass shadow-[0_24px_48px_-28px_rgb(0_0_0/0.9)]"
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
        className="block h-auto w-full rounded-[3px] border border-brass"
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
      <figcaption className="text-[14px] text-nacre-faint">{title}</figcaption>
      <ol className="mt-4 grid grid-cols-4 gap-2">
        {steps.map((s, k) => {
          const Icon = STEP_ICONS[k] ?? Globe;
          const on = k === i;
          return (
            <li key={s.label} className="relative">
              {k < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-[25px] block h-px overflow-hidden bg-brass/35"
                  style={{
                    insetInlineStart: "calc(50% + 26px)",
                    insetInlineEnd: "calc(-50% + 18px)",
                  }}
                >
                  <span
                    key={`${i}-${auto}`}
                    className={`block h-full bg-brass-bright ${k < i ? "" : k === i && auto ? "journey-fill" : "scale-x-0"}`}
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
                className="relative flex w-full cursor-pointer flex-col items-center gap-2 rounded-[2px] py-1 text-center"
              >
                <span
                  className={`grid size-10 place-items-center rounded-full border transition-colors duration-300 ${
                    on
                      ? "border-brass-bright bg-brass text-walnut"
                      : k < i
                        ? "border-brass bg-raised text-brass-bright"
                        : "border-brass/50 bg-panel text-nacre-faint"
                  }`}
                >
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <span
                  className={`text-[14px] leading-tight ${on ? "text-nacre" : "text-nacre-faint"}`}
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
            <p className="mx-auto mt-4 max-w-[60ch] text-center text-[15px] leading-relaxed text-nacre-soft">
              <span className="text-nacre">{s.title}.</span> {s.text}
            </p>
          </div>
        ))}
      </div>
    </figure>
  );
}
