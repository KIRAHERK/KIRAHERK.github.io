import { useEffect, useRef, useState, type PointerEvent } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scroll reveal for every [data-reveal] element on the page. Elements already
 * on screen are marked shown first, then html.js-reveal switches on the hidden
 * state for the rest, so nothing that is visible ever flickers.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const vh = window.innerHeight;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add("is-in");
    }
    document.documentElement.classList.add("js-reveal");

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => !el.classList.contains("is-in") && io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Counts a stat such as "81%", "23+" or "15,596" up from zero when it scrolls into view. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
    if (!el || !m || prefersReducedMotion()) return;
    const [, pre = "", num = "0", post = ""] = m;
    const target = Number(num.replace(/,/g, ""));
    if (!Number.isFinite(target) || target === 0) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // already seen: leave it

    const fmt = (n: number) =>
      num.includes(",")
        ? Math.round(n).toLocaleString("en-US")
        : String(Math.round(n));
    el.textContent = pre + fmt(0) + post;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1100 + Math.min(target, 400) * 2;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = pre + fmt(target * eased) + post;
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className="tnum">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}

/** Cycles through phrases. Screen readers get one full sentence instead. */
export function Rotator({
  items,
  spoken,
  className = "",
}: {
  items: string[];
  spoken: string;
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion() || items.length < 2) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setI((v) => (v + 1) % items.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [items.length]);

  return (
    <>
      <span className="sr-only">{spoken}</span>
      <span className={`rotor ${className}`} aria-hidden="true">
        {items.map((it, k) => (
          <span key={it} data-on={k === i ? "true" : "false"}>
            {it}
          </span>
        ))}
      </span>
    </>
  );
}

export type Release = { tag: string; at: string };

/**
 * Latest GitHub release of a repo (tag and date), cached for the visit.
 * Returns null until it arrives, or if GitHub can't be reached.
 */
export function useLatestRelease(repo?: string): Release | null {
  const [rel, setRel] = useState<Release | null>(null);
  useEffect(() => {
    if (!repo) return;
    const key = `release:${repo}`;
    try {
      const cached = sessionStorage.getItem(key);
      if (cached) {
        setRel(JSON.parse(cached) as Release);
        return;
      }
    } catch {
      /* storage blocked: just fetch */
    }
    const ctl = new AbortController();
    fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      signal: ctl.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { tag_name?: unknown; published_at?: unknown } | null) => {
        const tag = typeof j?.tag_name === "string" ? j.tag_name : "";
        const at = typeof j?.published_at === "string" ? j.published_at : "";
        if (!/^v?\d[\w.-]{0,20}$/.test(tag) || Number.isNaN(Date.parse(at)))
          return;
        const value = { tag: tag.startsWith("v") ? tag : `v${tag}`, at };
        setRel(value);
        try {
          sessionStorage.setItem(key, JSON.stringify(value));
        } catch {
          /* ignore */
        }
      })
      .catch(() => {});
    return () => ctl.abort();
  }, [repo]);
  return rel;
}

/** "3 days ago" / "منذ 3 أيام" */
export function timeAgo(iso: string, lang: string) {
  const diff = (Date.parse(iso) - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  const steps: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, s] of steps) {
    if (Math.abs(diff) >= s) return rtf.format(Math.round(diff / s), unit);
  }
  return rtf.format(0, "minute");
}

/** Pointer position for the .spot hover light. */
export function spotlight(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/** Thin bar under the header that fills as you scroll down the page. */
export function ScrollProgress({ rtl }: { rtl: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-px bg-signal"
      style={{
        transform: "scaleX(0)",
        transformOrigin: rtl ? "right" : "left",
      }}
    />
  );
}

/** Which section is in the middle of the screen, for the nav highlight. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");
  useEffect(() => {
    const els = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
  return active;
}
