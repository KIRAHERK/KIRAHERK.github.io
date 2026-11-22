import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/*
  Text generate effect, adapted from Aceternity UI. Each word resolves from a
  blur, one after another. Driven by CSS (see .tge in styles.css) so the
  words are in the prerendered HTML and readable without JavaScript.
*/
export function TextGenerateEffect({
  words,
  className,
}: {
  words: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <p ref={ref} className={cn("tge", shown && "is-shown", className)}>
      {words.split(" ").map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="tge-word inline-block"
          style={{ ["--i" as string]: i }}
        >
          {w}
          {" "}
        </span>
      ))}
    </p>
  );
}
