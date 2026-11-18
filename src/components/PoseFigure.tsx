import { useEffect, useRef } from "react";

/*
  Hero illustration of the fight detector's input: a COCO-17 pose skeleton
  (what YOLO26-pose returns) inside a hairline detection box. It is drawn, not
  inferred. The body's left side and right side each have their own colour,
  as pose models draw them, and every keypoint is a hollow joint ring. It
  waves once, then rests. Move a mouse over it and the nearest arm reaches for
  the cursor; tap or click and it jabs at that point. The meter shows how
  fast the wrists move, the same kind of velocity feature the real model
  reads, and past the threshold the whole figure turns to the alert colour.
*/

type Pt = [number, number];

// COCO-17 order. The person faces the viewer, so r_* joints sit on the image's left.
const EDGES: Array<[number, number]> = [
  [15, 13],
  [13, 11],
  [16, 14],
  [14, 12],
  [11, 12],
  [5, 11],
  [6, 12],
  [5, 6],
  [5, 7],
  [6, 8],
  [7, 9],
  [8, 10],
  [1, 2],
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 6],
];

// Figure space bounds used to fit the drawing into the canvas (room for reaching arms).
const BOUNDS = { x0: -70, y0: -60, x1: 370, y1: 490 };
const UPPER = 78;
const FORE = 70;
const THRESHOLD = 0.6;

// Matches the page tokens in styles.css (ink ramp, left/right, alert).
const COL = {
  centre: "#a3a9b8",
  left: "#7cb0ff",
  right: "#f2a65a",
  alert: "#e5484d",
  card: "#11141c",
  faint: "#7a8296",
  box: "rgba(238,240,245,0.14)",
  track: "rgba(238,240,245,0.08)",
};

// The person's left side in COCO-17 order (l_* joints), and their right.
const LEFT = new Set([1, 3, 5, 7, 9, 11, 13, 15]);
const RIGHT = new Set([2, 4, 6, 8, 10, 12, 14, 16]);
const sideOf = (a: number, b: number) =>
  LEFT.has(a) && LEFT.has(b)
    ? COL.left
    : RIGHT.has(a) && RIGHT.has(b)
      ? COL.right
      : COL.centre;

// The figure waves once on arrival, then lowers its arm and rests.
const WAVE_END = 2.4;
const SETTLE = 0.9;
const smooth = (a: number, b: number, x: number) => {
  const u = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return u * u * (3 - 2 * u);
};
// Below this meter level the direction arrows stay hidden.
const ARROW_MIN = 0.35;

const at = (pts: Pt[], i: number): Pt => pts[i] as Pt;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpPt = (a: Pt, b: Pt, t: number): Pt => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
];

/** Idle pose: gentle sway, image-left arm waving, image-right arm hanging.
 *  `amp` scales every idle movement; at 0 the figure stands still. */
function idlePose(t: number, amp = 1): Pt[] {
  const sway = Math.sin(t * 0.9) * 5 * amp;
  const bob = Math.sin(t * 1.8) * 2 * amp;
  const s = (k: number, x: number, y: number): Pt => [
    x + sway * k,
    y + bob * Math.min(k, 1),
  ];

  const rShoulder = s(1, 105, 122);
  const upper = ((-150 + 6 * amp * Math.sin(t * 3.1)) * Math.PI) / 180;
  const rElbow: Pt = [
    rShoulder[0] + UPPER * Math.cos(upper),
    rShoulder[1] + UPPER * Math.sin(upper),
  ];
  const fore = ((-100 + 32 * amp * Math.sin(t * 6.2)) * Math.PI) / 180;
  const rWrist: Pt = [
    rElbow[0] + FORE * Math.cos(fore),
    rElbow[1] + FORE * Math.sin(fore),
  ];
  const lSwing = Math.sin(t * 1.8) * 3 * amp;

  return [
    s(1.1, 150, 66), // nose
    s(1.1, 160, 58), // l_eye
    s(1.1, 140, 58), // r_eye
    s(1.1, 173, 64), // l_ear
    s(1.1, 127, 64), // r_ear
    s(1, 195, 122), // l_shoulder
    rShoulder, // r_shoulder
    s(1, 211 + lSwing * 0.4, 196), // l_elbow
    rElbow, // r_elbow
    s(1, 216 + lSwing, 268), // l_wrist
    rWrist, // r_wrist
    s(0.8, 178, 262), // l_hip
    s(0.8, 122, 262), // r_hip
    s(0.4, 182, 360), // l_knee
    s(0.4, 118, 360), // r_knee
    s(0, 184, 455), // l_ankle
    s(0, 116, 455), // r_ankle
  ];
}

/** Two-bone arm reaching for a target. bend picks which way the elbow folds. */
function reach(shoulder: Pt, target: Pt, bend: 1 | -1): [Pt, Pt] {
  const dx = target[0] - shoulder[0];
  const dy = target[1] - shoulder[1];
  const a = Math.atan2(dy, dx);
  const d = Math.min(
    UPPER + FORE - 0.5,
    Math.max(Math.abs(UPPER - FORE) + 6, Math.hypot(dx, dy)),
  );
  const cos = (UPPER * UPPER + d * d - FORE * FORE) / (2 * UPPER * d);
  const alpha = Math.acos(Math.max(-1, Math.min(1, cos)));
  const ea = a + bend * alpha;
  return [
    [shoulder[0] + UPPER * Math.cos(ea), shoulder[1] + UPPER * Math.sin(ea)],
    [shoulder[0] + d * Math.cos(a), shoulder[1] + d * Math.sin(a)],
  ];
}

function arrow(ctx: CanvasRenderingContext2D, from: Pt, to: Pt) {
  const [x0, y0] = from;
  const [x1, y1] = to;
  const a = Math.atan2(y1 - y0, x1 - x0);
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1 - 8 * Math.cos(a - 0.45), y1 - 8 * Math.sin(a - 0.45));
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1 - 8 * Math.cos(a + 0.45), y1 - 8 * Math.sin(a + 0.45));
  ctx.stroke();
}

type Props = {
  className?: string;
  label: string;
  motionLabel: string;
  alertLabel: string;
  leftLabel: string;
  rightLabel: string;
  rtl?: boolean;
};

export function PoseFigure({
  className = "",
  label,
  motionLabel,
  alertLabel,
  leftLabel,
  rightLabel,
  rtl = false,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    // Figure-space transform, refreshed every frame.
    let k = 1;
    let ox = 0;
    let oy = 0;

    // Interaction state (figure space).
    let pointer: Pt | null = null;
    let lastMove = -1e9;
    let jabUntil = -1e9;
    // Per arm (5 = image-right shoulder, 6 = image-left): how far it is
    // reaching (0 rest → 1 reaching) and where its hand is heading.
    const reachW: Record<5 | 6, number> = { 5: 0, 6: 0 };
    const hands: Record<5 | 6, Pt> = { 5: [0, 0], 6: [0, 0] };
    let side: 5 | 6 = 6;
    let prevWrists: [Pt, Pt] | null = null;
    let meter = 0;
    let lastT = 0;
    const start = performance.now();

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const toFigure = (cx: number, cy: number): Pt => {
      const r = canvas.getBoundingClientRect();
      return [(cx - r.left - ox) / k, (cy - r.top - oy) / k];
    };

    const draw = (t: number, now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, t - lastT));
      lastT = t;
      ctx.clearRect(0, 0, w, h);

      const padTop = 44;
      const padBottom = 56;
      const bw = BOUNDS.x1 - BOUNDS.x0;
      const bh = BOUNDS.y1 - BOUNDS.y0;
      k = Math.min((w - 32) / bw, (h - padTop - padBottom) / bh);
      ox = (w - bw * k) / 2 - BOUNDS.x0 * k;
      oy = padTop + (h - padTop - padBottom - bh * k) / 2 - BOUNDS.y0 * k;

      // Pose: idle, with the arm nearest the pointer reaching for it. When the
      // pointer crosses the body the other arm takes over, smoothly.
      const rest = smooth(WAVE_END, WAVE_END + SETTLE, t);
      const base = idlePose(t, 1 - rest);
      const jabbing = now < jabUntil;
      const active = !!pointer && (jabbing || now - lastMove < 2200);
      if (pointer) {
        if (side === 6 && pointer[0] > 190) side = 5;
        else if (side === 5 && pointer[0] < 110) side = 6;
      }
      const pose = base.slice();
      // The waving arm lowers to hang once the wave is over, or while the
      // other arm reaches.
      const rs = at(base, 6);
      const hang = Math.max(rest, reachW[5]);
      pose[8] = lerpPt(at(base, 8), [rs[0] - 16, rs[1] + 74], hang);
      pose[10] = lerpPt(at(base, 10), [rs[0] - 21, rs[1] + 146], hang);
      for (const s of [5, 6] as const) {
        const want = active && side === s ? 1 : 0;
        if (want && reachW[s] < 0.02) hands[s] = at(pose, s + 4);
        reachW[s] = lerp(reachW[s], want, 1 - Math.exp(-dt * (want ? 9 : 4)));
        if (reachW[s] < 0.001) continue;
        if (want && pointer) {
          hands[s] = lerpPt(
            hands[s],
            pointer,
            1 - Math.exp(-dt * (jabbing ? 30 : 11)),
          );
        }
        const [elbow, wrist] = reach(at(base, s), hands[s], s === 6 ? -1 : 1);
        pose[s + 2] = lerpPt(at(pose, s + 2), elbow, reachW[s]);
        pose[s + 4] = lerpPt(at(pose, s + 4), wrist, reachW[s]);
      }

      // Wrist speed → motion meter (attack fast, release slow).
      const wrists: [Pt, Pt] = [at(pose, 9), at(pose, 10)];
      if (prevWrists) {
        const v =
          Math.max(
            Math.hypot(
              wrists[0][0] - prevWrists[0][0],
              wrists[0][1] - prevWrists[0][1],
            ),
            Math.hypot(
              wrists[1][0] - prevWrists[1][0],
              wrists[1][1] - prevWrists[1][1],
            ),
          ) / dt;
        const m = Math.min(1, v / 900);
        meter = lerp(meter, m, m > meter ? 0.35 : 0.04);
      }
      const prevPose = prevWrists;
      prevWrists = wrists;
      const hot = meter >= THRESHOLD;

      const P = pose.map(([x, y]) => [ox + x * k, oy + y * k] as Pt);

      // Detection box: one quiet dashed hairline around the person.
      const xs = P.map((p) => p[0]);
      const ys = P.map((p) => p[1]);
      const bx0 = Math.min(...xs) - 16 * k;
      const by0 = Math.min(...ys) - 20 * k;
      const bx1 = Math.max(...xs) + 16 * k;
      const by1 = Math.max(...ys) + 12 * k;
      ctx.strokeStyle = hot ? COL.alert : COL.box;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.strokeRect(bx0, by0, bx1 - bx0, by1 - by0);
      ctx.setLineDash([]);

      // Bones, coloured by the side of the body they belong to.
      ctx.lineWidth = Math.max(2, 2.6 * k);
      ctx.lineCap = "round";
      for (const [a, b] of EDGES) {
        const pa = at(P, a);
        const pb = at(P, b);
        ctx.strokeStyle = hot ? COL.alert : sideOf(a, b);
        ctx.beginPath();
        ctx.moveTo(pa[0], pa[1]);
        ctx.lineTo(pb[0], pb[1]);
        ctx.stroke();
      }

      // Arrows where the wrists are heading, only once they move fast.
      if (prevPose && meter > ARROW_MIN) {
        ctx.strokeStyle = COL.alert;
        ctx.lineWidth = 1.5;
        for (const [i, q] of [
          [9, prevPose[0]],
          [10, prevPose[1]],
        ] as const) {
          const p = at(P, i);
          const dx = p[0] - (ox + q[0] * k);
          const dy = p[1] - (oy + q[1] * k);
          const len = Math.hypot(dx, dy);
          if (len > 0.8) {
            const s = Math.min(9, 60 / len);
            arrow(ctx, p, [p[0] + dx * s, p[1] + dy * s]);
          }
        }
      }

      // Keypoints: hollow joint rings for the body, small dots for the face.
      for (let i = 0; i < P.length; i++) {
        const p = at(P, i);
        const tone = hot
          ? COL.alert
          : LEFT.has(i)
            ? COL.left
            : RIGHT.has(i)
              ? COL.right
              : COL.centre;
        ctx.beginPath();
        if (i <= 4) {
          ctx.arc(p[0], p[1], 2, 0, Math.PI * 2);
          ctx.fillStyle = tone;
          ctx.fill();
          continue;
        }
        const moving = i >= 7 && i <= 10;
        ctx.arc(p[0], p[1], moving ? 5 : 4, 0, Math.PI * 2);
        ctx.fillStyle = COL.card;
        ctx.fill();
        ctx.strokeStyle = tone;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.textBaseline = "middle";
      ctx.direction = rtl ? "rtl" : "ltr";

      // Legend: what the two colours mean.
      ctx.font = "400 12px 'IBM Plex Sans', 'IBM Plex Sans Arabic', sans-serif";
      let lx = rtl ? w - 16 : 16;
      for (const [txt, tone] of [
        [leftLabel, COL.left],
        [rightLabel, COL.right],
      ] as const) {
        const cx = rtl ? lx - 5 : lx + 5;
        ctx.beginPath();
        ctx.arc(cx, 22, 4, 0, Math.PI * 2);
        ctx.strokeStyle = tone;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = COL.faint;
        ctx.textAlign = rtl ? "right" : "left";
        const tx = rtl ? lx - 16 : lx + 16;
        ctx.fillText(txt, tx, 22);
        const tw = ctx.measureText(txt).width;
        lx = rtl ? tx - tw - 20 : tx + tw + 20;
      }

      // Motion meter along the bottom (fills in reading direction).
      const mx0 = 16;
      const mx1 = w - 16;
      const my = h - 20;
      ctx.font = "400 12px 'IBM Plex Mono', 'IBM Plex Sans Arabic', monospace";
      ctx.fillStyle = COL.faint;
      ctx.textAlign = rtl ? "right" : "left";
      ctx.fillText(motionLabel, rtl ? mx1 : mx0, my - 16);
      ctx.textAlign = rtl ? "left" : "right";
      ctx.fillStyle = hot ? COL.alert : COL.faint;
      const val = meter.toFixed(2);
      ctx.fillText(
        hot ? `${alertLabel} · ${val}` : val,
        rtl ? mx0 : mx1,
        my - 16,
      );
      ctx.direction = "ltr";
      ctx.textAlign = "left";

      ctx.fillStyle = COL.track;
      ctx.fillRect(mx0, my - 2, mx1 - mx0, 4);
      const fw = (mx1 - mx0) * meter;
      ctx.fillStyle = hot ? COL.alert : COL.centre;
      ctx.fillRect(rtl ? mx1 - fw : mx0, my - 2, fw, 4);
      const tx = rtl
        ? mx1 - (mx1 - mx0) * THRESHOLD
        : mx0 + (mx1 - mx0) * THRESHOLD;
      ctx.fillStyle = COL.faint;
      ctx.fillRect(tx - 0.5, my - 6, 1, 12);
    };

    // Frames run only while something moves: the opening wave, a pointer,
    // an arm returning to rest, or the meter draining. Then it stops.
    let running = false;
    const needsFrame = (now: number) =>
      (now - start) / 1000 < WAVE_END + SETTLE + 0.3 ||
      (!!pointer && now - lastMove < 2200) ||
      now < jabUntil ||
      reachW[5] > 0.002 ||
      reachW[6] > 0.002 ||
      meter > 0.004;
    const loop = (now: number) => {
      if (!visible || document.hidden) {
        running = false;
        return;
      }
      draw((now - start) / 1000, now);
      if (needsFrame(now)) raf = requestAnimationFrame(loop);
      else running = false;
    };
    const kick = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const onVisibility = () => {
      if (!document.hidden) kick();
    };

    // A still frame at the top of the wave. Used for reduced motion and
    // so the figure is never blank while animation frames are paused.
    const still = () => {
      prevWrists = null;
      lastT = 0.55;
      draw(0.583, 0);
      meter = 0;
      draw(0.6, 0);
      meter = 0;
      // Don't let the jump back to live time read as a fast movement.
      prevWrists = null;
      meter = 0;
      lastT = (performance.now() - start) / 1000;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointer = toFigure(e.clientX, e.clientY);
      lastMove = performance.now();
      if (reachW[5] < 0.05 && reachW[6] < 0.05) side = pointer[0] < 150 ? 6 : 5;
      kick();
    };
    const onDown = (e: PointerEvent) => {
      const now = performance.now();
      const p = toFigure(e.clientX, e.clientY);
      if (reachW[5] < 0.05 && reachW[6] < 0.05) side = p[0] < 150 ? 6 : 5;
      pointer = p;
      lastMove = now;
      jabUntil = now + 450;
      kick();
    };
    const onLeave = () => {
      lastMove = Math.min(lastMove, performance.now() - 1600);
    };

    resize();
    still();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) still();
      else {
        const now = performance.now();
        draw((now - start) / 1000, now);
        kick();
      }
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => {
      visible = e?.isIntersecting ?? true;
      if (visible) kick();
    });
    io.observe(wrap);

    if (!reduce) {
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerdown", onDown);
      wrap.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
      kick();
    }
    // Redraw once fonts arrive so the labels use IBM Plex.
    document.fonts?.ready
      .then(() => {
        if (reduce) still();
        else {
          const now = performance.now();
          draw((now - start) / 1000, now);
        }
      })
      .catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [alertLabel, leftLabel, motionLabel, rightLabel, rtl]);

  return (
    <div
      ref={wrapRef}
      className={`relative cursor-crosshair select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        className="absolute inset-0"
      />
    </div>
  );
}
