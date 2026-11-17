import { useEffect, useState } from "react";

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
