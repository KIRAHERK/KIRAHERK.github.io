import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
  Learn more hover, from Transitions.dev (#24): the chevron slides forward and
  its two arms spread into an arrow.
*/
export function LearnMore({
  href,
  children,
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "t-learn inline-flex min-h-11 items-center gap-1.5 text-[14.5px] font-medium text-text transition-colors duration-200 hover:text-brand",
        className,
      )}
    >
      {children}
      <span className="t-learn-chevron">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path className="t-learn-arm t-learn-arm-top" d="M6 4L10 8" />
          <path className="t-learn-arm t-learn-arm-bot" d="M10 8L6 12" />
        </svg>
      </span>
    </a>
  );
}
