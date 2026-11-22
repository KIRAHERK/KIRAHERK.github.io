import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/*
  Tracing beam, adapted from Aceternity UI. A thin line runs beside the work
  and a gradient travels down it as you scroll, so you always know how far
  through the projects you are. Re-measures when images load, sits on the
  start side (right on the Arabic page), and hides on narrow screens.
*/
export function TracingBeam({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSvgHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    { stiffness: 500, damping: 90 },
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    { stiffness: 500, damping: 90 },
  );

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <div
        aria-hidden="true"
        className="absolute -start-14 top-3 hidden xl:block rtl:-scale-x-100"
      >
        <div className="ms-[27px] flex size-4 items-center justify-center rounded-full border border-line-strong bg-bg">
          <div className="size-2 rounded-full bg-brand" />
        </div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ms-4 block"
        >
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.12"
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#tracing-gradient)"
            strokeWidth="1.5"
            className="motion-reduce:hidden"
          />
          <defs>
            <motion.linearGradient
              id="tracing-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#34d399" stopOpacity="0" />
              <stop stopColor="#34d399" />
              <stop offset="0.325" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#0ea5e9" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
