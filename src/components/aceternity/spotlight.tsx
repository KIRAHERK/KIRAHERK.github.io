import { motion, useReducedMotion } from "motion/react";

/*
  Spotlight, adapted from Aceternity UI (ui.aceternity.com, "Spotlight New").
  Two soft beams of light sweep in from the top corners. Tinted to the site's
  green, and still when the visitor prefers reduced motion.
*/
type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

export function Spotlight({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(160, 80%, 85%, .09) 0, hsla(160, 80%, 55%, .025) 50%, hsla(160, 80%, 45%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(160, 80%, 85%, .06) 0, hsla(160, 80%, 55%, .02) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(160, 80%, 85%, .04) 0, hsla(160, 80%, 45%, .02) 80%, transparent 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
}: SpotlightProps) {
  const reduce = useReducedMotion();
  const sweep = (dir: 1 | -1) =>
    reduce
      ? {}
      : {
          animate: { x: [0, dir * xOffset, 0] },
          transition: {
            duration,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut" as const,
          },
        };
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
    >
      <motion.div
        {...sweep(1)}
        className="pointer-events-none absolute left-0 top-0 h-screen w-screen"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width,
            height,
          }}
          className="absolute left-0 top-0"
        />
        <div
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            background: gradientSecond,
            width: smallWidth,
            height,
          }}
          className="absolute left-0 top-0 origin-top-left"
        />
        <div
          style={{
            transform: "rotate(-45deg) translate(-180%, -70%)",
            background: gradientThird,
            width: smallWidth,
            height,
          }}
          className="absolute left-0 top-0 origin-top-left"
        />
      </motion.div>
      <motion.div
        {...sweep(-1)}
        className="pointer-events-none absolute right-0 top-0 h-screen w-screen"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradientFirst,
            width,
            height,
          }}
          className="absolute right-0 top-0"
        />
        <div
          style={{
            transform: "rotate(45deg) translate(-5%, -50%)",
            background: gradientSecond,
            width: smallWidth,
            height,
          }}
          className="absolute right-0 top-0 origin-top-right"
        />
        <div
          style={{
            transform: "rotate(45deg) translate(180%, -70%)",
            background: gradientThird,
            width: smallWidth,
            height,
          }}
          className="absolute right-0 top-0 origin-top-right"
        />
      </motion.div>
    </motion.div>
  );
}
