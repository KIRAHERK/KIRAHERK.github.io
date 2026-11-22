import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/*
  Timeline, adapted from Aceternity UI. Each entry's date stays pinned while
  you read it, and a green beam fills the line as you scroll through the
  years. Uses logical sides so it mirrors on the Arabic page.
*/
export type TimelineEntry = {
  title: string;
  now?: boolean;
  content: ReactNode;
};

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setHeight(el.getBoundingClientRect().height),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 60%"],
  });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="w-full">
      <div ref={ref} className="relative pb-4">
        {data.map((item, i) => (
          <div
            key={`${item.title}-${i}`}
            className="flex justify-start pt-8 first:pt-0 md:gap-8 md:pt-12"
          >
            <div className="sticky top-32 z-10 flex flex-col items-center self-start md:w-full md:max-w-[12rem] md:flex-row">
              <div className="absolute start-0 flex size-10 items-center justify-center rounded-full bg-bg">
                <div
                  className={`size-3.5 rounded-full border ${item.now ? "border-amber/60 bg-amber/30" : "border-line-strong bg-surface-2"}`}
                />
              </div>
              <h3
                className={`hidden ps-16 font-mono text-[20px] font-medium md:block ${item.now ? "text-amber" : "text-faint"}`}
              >
                {item.title}
              </h3>
            </div>
            <div className="relative w-full ps-16 md:ps-0">
              <h3
                className={`mb-2 block font-mono text-[14px] md:hidden ${item.now ? "text-amber" : "text-faint"}`}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          aria-hidden="true"
          style={{ height }}
          className="absolute start-5 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,transparent_0%,rgb(255_255_255/0.12)_10%,rgb(255_255_255/0.12)_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-brand via-cyan to-transparent from-[0%] via-[10%]"
          />
        </div>
      </div>
    </div>
  );
}
