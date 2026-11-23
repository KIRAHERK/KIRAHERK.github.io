import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ArrowRight } from "lucide-react";
import { prefersReducedMotion } from "@/components/motion";
import { SlidingTabs } from "@/components/transitions/SlidingTabs";
import { Line, Reveal } from "@/components/transitions/Reveal";

const PANEL =
  "rounded-2xl border border-line bg-[linear-gradient(180deg,rgb(255_255_255/0.03),rgb(255_255_255/0.01))] p-4 sm:p-5";

function Caption({ children }: { children: ReactNode }) {
  return <p className="text-[13px] font-medium text-soft">{children}</p>;
}

/* ------------------------------ Phone frame ------------------------------ */

function Phone({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[2.1rem] bg-[#1a1a1a] p-[6px] shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_30px_60px_-30px_rgb(0_0_0/0.9)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] bg-black">
        {children}
      </div>
    </div>
  );
}

/* ---------------------------- App screenshots ---------------------------- */

/** App screenshots in a phone: sliding tabs pick the screen, which cross-blurs in. */
export function PhoneShowcase({
  app,
  screens,
  label,
  height = 933,
}: {
  app: string;
  screens: Array<[string, string]>;
  label: string;
  /** Screenshot height at 420 px wide. */
  height?: number;
}) {
  const [cur, setCur] = useState(screens[0]?.[0] ?? "");
  return (
    <div className="flex flex-col items-center gap-5">
      <Phone className="w-[210px] sm:w-[230px]">
        {screens.map(([file, name]) => (
          <img
            key={file}
            src={`/work/${file}.webp`}
            alt={file === cur ? `${app}: ${name}` : ""}
            aria-hidden={file === cur ? undefined : true}
            width={420}
            height={height}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover object-top transition-[opacity,filter,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              file === cur
                ? "scale-100 opacity-100 blur-0"
                : "scale-[1.02] opacity-0 blur-[3px]"
            }`}
          />
        ))}
      </Phone>
      <SlidingTabs
        label={label}
        tabs={screens.map(([id, l]) => ({ id, label: l }))}
        value={cur}
        onChange={setCur}
      />
    </div>
  );
}

/* ---------------------------- Fight detection ---------------------------- */

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
    <Reveal className={PANEL}>
      <Caption>{title}</Caption>
      <ul className="mt-4 space-y-3.5">
        {rows.map(([label, v], idx) => (
          <li key={label}>
            <div className="flex items-baseline justify-between gap-4 text-[14px]">
              <span className="text-soft">{label}</span>
              <span
                className={`font-mono tnum ${idx === 0 ? "text-brand" : "text-text"}`}
                dir="ltr"
              >
                {v}%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className={`bar-fill h-full rounded-full ${idx === 0 ? "bg-gradient-to-r from-brand to-cyan rtl:bg-gradient-to-l" : "bg-white/25"}`}
                style={{ width: `${v}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      {note && (
        <p className="mt-4 text-[13px] leading-[1.6] text-faint">{note}</p>
      )}
    </Reveal>
  );
}

/** The decision chain, each step rising in turn. */
export function Pipeline({ title, steps }: { title: string; steps: string[] }) {
  return (
    <Reveal className={PANEL}>
      <Caption>{title}</Caption>
      <ol className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {steps.map((s, i) => (
          <Line as="li" i={i} key={s} className="!flex items-center gap-1.5">
            <span
              className={`rounded-lg px-2.5 py-1 text-[13px] ${
                i === steps.length - 1
                  ? "bg-brand/10 text-brand ring-1 ring-brand/30"
                  : "bg-white/[0.05] text-text ring-1 ring-white/10"
              }`}
            >
              <bdi>{s}</bdi>
            </span>
            {i < steps.length - 1 && (
              <ArrowRight
                size={14}
                className="shrink-0 text-faint rtl:-scale-x-100"
                aria-hidden="true"
              />
            )}
          </Line>
        ))}
      </ol>
    </Reveal>
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
      className={`rounded-xl px-3 py-2.5 text-center ring-1 ${
        strong ? "bg-brand/10 ring-brand/30" : "bg-white/[0.04] ring-white/10"
      }`}
    >
      <div
        className={`whitespace-nowrap text-[14px] font-medium ${strong ? "text-brand" : "text-text"}`}
      >
        <bdi>{title}</bdi>
      </div>
      <div className="mt-0.5 font-mono text-[12px] text-faint">
        <bdi>{sub}</bdi>
      </div>
    </div>
  );
}

function Down() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto h-5 w-px bg-gradient-to-b from-white/20 to-white/5"
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
    <Reveal className={PANEL}>
      <Caption>{title}</Caption>
      <div className="mt-4">
        <Line i={0}>
          <div className="grid grid-cols-2 gap-2">
            <Node title={steps.lexical[0]} sub={steps.lexical[1]} />
            <Node title={steps.dense[0]} sub={steps.dense[1]} />
          </div>
        </Line>
        <svg
          viewBox="0 0 200 20"
          className="mx-auto block h-5 w-1/2"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            d="M2 0 V8 Q2 10 6 10 H194 Q198 10 198 8 V0 M100 10 V20"
            fill="none"
            stroke="rgb(255 255 255 / 0.18)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <Line i={1}>
          <Node title={steps.fuse[0]} sub={steps.fuse[1]} />
        </Line>
        <Down />
        <Line i={2}>
          <Node title={steps.llm[0]} sub={steps.llm[1]} />
        </Line>
        <Down />
        <Line i={3}>
          <Node title={steps.out[0]} sub={steps.out[1]} strong />
        </Line>
      </div>
    </Reveal>
  );
}

/* ------------------------- Shop and delivery system ------------------------ */

type JourneyStep = { label: string; title: string; text: string; alt: string };

const STEP_MS = 4500;
const SHOT =
  "block h-auto w-full rounded-xl shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_30px_60px_-30px_rgb(0_0_0/0.9)]";

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
        className={SHOT}
      />
    </div>
  );
}

/**
 * One order travelling through the website, the admin dashboard and the
 * driver app. It plays through once while on screen, then stops on the last
 * step; the sliding tabs let the visitor go back to any step.
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => setVisible(!!e?.isIntersecting),
      { threshold: 0.4 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const auto = visible && !held && i < steps.length - 1;
  useEffect(() => {
    if (!auto || prefersReducedMotion()) return;
    const id = window.setTimeout(() => setI((v) => v + 1), STEP_MS);
    return () => window.clearTimeout(id);
  }, [auto, i]);

  return (
    <div ref={ref} className={`${PANEL} sm:p-6`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Caption>{title}</Caption>
        <SlidingTabs
          label={title}
          tabs={steps.map((s, k) => ({
            id: String(k),
            label: `${k + 1}. ${s.label}`,
          }))}
          value={String(i)}
          onChange={(id) => {
            setI(Number(id));
            setHeld(true);
          }}
        />
      </div>
      {/* Every step sits in the same grid cell, so switching never changes the height. */}
      <div className="mt-6 grid">
        {steps.map((s, k) => (
          <div
            key={s.label}
            aria-hidden={k !== i ? true : undefined}
            className={`flex flex-col transition-[opacity,filter,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [grid-area:1/1] ${
              k === i
                ? "translate-y-0 opacity-100 blur-0"
                : "pointer-events-none translate-y-2 opacity-0 blur-[3px]"
            }`}
          >
            <div className="flex flex-1 items-center justify-center">
              <JourneyStage k={k} alt={s.alt} lang={lang} />
            </div>
            <p className="mx-auto mt-5 max-w-[46rem] text-center text-[15px] leading-[1.6] text-soft">
              <span className="font-medium text-text">{s.title}.</span> {s.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const css = (vars: Record<string, string | number>) =>
  vars as CSSProperties;
