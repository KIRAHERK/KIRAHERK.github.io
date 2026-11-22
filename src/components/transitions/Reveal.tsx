import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/*
  Texts reveal, from Transitions.dev (#18). Children marked .t-stagger-line
  rise in from a blur, staggered by their --i, the first time the block
  scrolls into view. The hidden state only applies under html.js-reveal.
*/
export function Reveal({
  as = "div",
  className,
  style,
  children,
  id,
}: {
  as?: "div" | "section" | "article" | "header" | "ul" | "ol";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return createElement(
    as,
    {
      ref,
      id,
      style,
      className: cn("t-stagger", shown && "is-shown", className),
    },
    children,
  );
}

/** One staggered line inside a <Reveal>. */
export function Line({
  i = 0,
  className,
  children,
  as = "div",
}: {
  i?: number;
  className?: string;
  children: ReactNode;
  as?: "div" | "p" | "h2" | "h3" | "span" | "li";
}) {
  return createElement(
    as,
    {
      className: cn("t-stagger-line", className),
      style: { ["--i" as string]: i } as CSSProperties,
    },
    children,
  );
}
