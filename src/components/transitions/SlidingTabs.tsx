import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/*
  Tabs sliding, from Transitions.dev (#16): a pill glides between the tabs of
  a segmented control. Positions are measured from the buttons themselves, so
  it works in either reading direction.
*/
export function SlidingTabs({
  tabs,
  value,
  onChange,
  label,
  className,
}: {
  tabs: Array<{ id: string; label: string }>;
  value: string;
  onChange: (id: string) => void;
  label: string;
  className?: string;
}) {
  const bar = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  useLayoutEffect(() => {
    const measure = () => {
      const el = bar.current?.querySelector<HTMLButtonElement>(
        `[data-tab="${CSS.escape(value)}"]`,
      );
      if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (bar.current) ro.observe(bar.current);
    return () => ro.disconnect();
  }, [value]);
  return (
    <div
      ref={bar}
      role="tablist"
      aria-label={label}
      className={cn("t-tabs max-w-full overflow-x-auto", className)}
    >
      <span
        aria-hidden="true"
        className="t-tabs-pill"
        style={
          pill
            ? { width: pill.w, transform: `translateX(${pill.x}px)` }
            : undefined
        }
      />
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          data-tab={t.id}
          aria-selected={t.id === value}
          className="t-tab"
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
