import { useEffect, useRef } from "react";

/*
  Hero illustration of the fight detector's input, set as Damascene inlay:
  the COCO-17 pose skeleton (what YOLO26-pose returns) as brass wire and
  mother-of-pearl joints inside a star-pinned frame. It is drawn, not inferred.
  Idle, one arm waves. Move a mouse over it and the nearest arm reaches for
  the cursor; tap or click and it jabs at that point. The faster the wrists
  move, the more the nacre catches an iridescent sheen, and the strip along
  the bottom fills: the same kind of velocity feature the real model reads.
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

const COL = {
  brass: "#d2a957",
  brassBright: "#e7c477",
  groove: "rgba(12,7,3,0.62)",
  nacre: "#fffaf2",
  nacreDeep: "#cdbfae",
  faint: "#b8a998",
  lemon: "#ead58c",
};

const at = (pts: Pt[], i: number): Pt => pts[i] as Pt;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpPt = (a: Pt, b: Pt, t: number): Pt => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
];

/** Idle pose: gentle sway, image-left arm waving, image-right arm hanging. */
function idlePose(t: number): Pt[] {
  const sway = Math.sin(t * 0.9) * 5;
  const bob = Math.sin(t * 1.8) * 2;
  const s = (k: number, x: number, y: number): Pt => [
    x + sway * k,
    y + bob * Math.min(k, 1),
  ];

  const rShoulder = s(1, 105, 122);
  const upper = ((-150 + 6 * Math.sin(t * 3.1)) * Math.PI) / 180;
  const rElbow: Pt = [
    rShoulder[0] + UPPER * Math.cos(upper),
    rShoulder[1] + UPPER * Math.sin(upper),
  ];
  const fore = ((-100 + 32 * Math.sin(t * 6.2)) * Math.PI) / 180;
  const rWrist: Pt = [
    rElbow[0] + FORE * Math.cos(fore),
    rElbow[1] + FORE * Math.sin(fore),
  ];
  const lSwing = Math.sin(t * 1.8) * 3;

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

/** An eight-pointed star (khatam) centred on x, y. */
function star(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 16; i++) {
    const a = (Math.PI / 8) * i - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.62;
    const px = x + rr * Math.cos(a);
    const py = y + rr * Math.sin(a);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = COL.nacre;
  ctx.fill();
  ctx.strokeStyle = COL.brass;
  ctx.lineWidth = 1;
  ctx.stroke();
}

type Props = {
  className?: string;
  label: string;
  motionLabel: string;
  alertLabel: string;
  rtl?: boolean;
};

export function PoseFigure({
  className = "",
  label,
  motionLabel,
  alertLabel,
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

      const padTop = 22;
      const padBottom = 50;
      const bw = BOUNDS.x1 - BOUNDS.x0;
      const bh = BOUNDS.y1 - BOUNDS.y0;
      k = Math.min((w - 32) / bw, (h - padTop - padBottom) / bh);
      ox = (w - bw * k) / 2 - BOUNDS.x0 * k;
      oy = padTop + (h - padTop - padBottom - bh * k) / 2 - BOUNDS.y0 * k;

      // Pose: idle, with the arm nearest the pointer reaching for it. When the
      // pointer crosses the body the other arm takes over, smoothly.
      const base = idlePose(t);
      const jabbing = now < jabUntil;
      const active = !!pointer && (jabbing || now - lastMove < 2200);
      if (pointer) {
        if (side === 6 && pointer[0] > 190) side = 5;
        else if (side === 5 && pointer[0] < 110) side = 6;
      }
      const pose = base.slice();
      // The waving arm settles to hang while the other arm reaches.
      const rs = at(base, 6);
      pose[8] = lerpPt(at(base, 8), [rs[0] - 16, rs[1] + 74], reachW[5]);
      pose[10] = lerpPt(at(base, 10), [rs[0] - 21, rs[1] + 146], reachW[5]);
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

      // A thin brass frame around the figure, pinned with stars at its corners.
      const xs = P.map((p) => p[0]);
      const ys = P.map((p) => p[1]);
      const bx0 = Math.min(...xs) - 18 * k;
      const by0 = Math.min(...ys) - 18 * k;
      const bx1 = Math.max(...xs) + 18 * k;
      const by1 = Math.max(...ys) + 12 * k;
      for (const [x, y] of [
        [bx0, by0],
        [bx1, by0],
        [bx0, by1],
        [bx1, by1],
      ] as const)
        star(ctx, x, y, 6);

      // Skeleton: brass wire set into a dark groove cut in the wood.
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (const [stroke, width] of [
        [COL.groove, Math.max(6, 8 * k)],
        [hot ? COL.brassBright : COL.brass, Math.max(2.6, 3.4 * k)],
      ] as const) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = width;
        ctx.beginPath();
        for (const [a, b] of EDGES) {
          const pa = at(P, a);
          const pb = at(P, b);
          ctx.moveTo(pa[0], pa[1]);
          ctx.lineTo(pb[0], pb[1]);
        }
        ctx.stroke();
      }

      // Brass arrows showing where fast wrists are heading.
      if (prevPose) {
        ctx.strokeStyle = COL.brassBright;
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

      // Joints: mother-of-pearl that catches an iridescent sheen as speed rises.
      const sheen = 0.18 + meter * 0.82;
      for (let i = 0; i < P.length; i++) {
        const moving = i >= 7 && i <= 10;
        const p = at(P, i);
        const r = (moving ? 7.5 : 6) * Math.max(0.8, Math.min(1.3, k * 1.5));
        const hue = (t * 90 + i * 37) % 360;
        const g = ctx.createRadialGradient(
          p[0] - r * 0.35,
          p[1] - r * 0.4,
          r * 0.1,
          p[0],
          p[1],
          r,
        );
        g.addColorStop(0, COL.nacre);
        g.addColorStop(
          0.55,
          `hsl(${hue} ${Math.round(25 + 55 * sheen)}% ${Math.round(90 - 10 * sheen)}%)`,
        );
        g.addColorStop(1, COL.nacreDeep);
        ctx.beginPath();
        ctx.arc(p[0], p[1], r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.strokeStyle = COL.brass;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Speed strip along the bottom: a groove that fills with nacre in reading direction.
      const mx0 = 16;
      const mx1 = w - 16;
      const my = h - 20;
      ctx.font = "400 13px 'Readex Pro', system-ui, sans-serif";
      ctx.textBaseline = "middle";
      ctx.direction = rtl ? "rtl" : "ltr";
      ctx.fillStyle = COL.faint;
      ctx.textAlign = rtl ? "right" : "left";
      ctx.fillText(motionLabel, rtl ? mx1 : mx0, my - 16);
      if (hot) {
        ctx.fillStyle = COL.lemon;
        ctx.textAlign = rtl ? "left" : "right";
        ctx.fillText(alertLabel, rtl ? mx0 : mx1, my - 16);
      }
      ctx.direction = "ltr";
      ctx.textAlign = "left";
      ctx.fillStyle = COL.groove;
      ctx.fillRect(mx0, my - 3, mx1 - mx0, 6);
      const fw = (mx1 - mx0) * meter;
      const fill = ctx.createLinearGradient(mx0, 0, mx1, 0);
      fill.addColorStop(0, COL.nacreDeep);
      fill.addColorStop(1, COL.nacre);
      ctx.fillStyle = fill;
      ctx.fillRect(rtl ? mx1 - fw : mx0, my - 3, fw, 6);
      const tx = rtl
        ? mx1 - (mx1 - mx0) * THRESHOLD
        : mx0 + (mx1 - mx0) * THRESHOLD;
      ctx.fillStyle = COL.lemon;
      ctx.fillRect(tx - 1, my - 8, 2, 16);
    };

    const loop = (now: number) => {
      if (visible && !document.hidden) draw((now - start) / 1000, now);
      raf = requestAnimationFrame(loop);
    };

    // A still frame (two draws so the arrows show). Used for reduced motion and
    // so the figure is never blank while animation frames are paused.
    const still = () => {
      prevWrists = null;
      lastT = 0.55;
      draw(0.583, 0);
      draw(0.6, 0);
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
    };
    const onDown = (e: PointerEvent) => {
      const now = performance.now();
      const p = toFigure(e.clientX, e.clientY);
      if (reachW[5] < 0.05 && reachW[6] < 0.05) side = p[0] < 150 ? 6 : 5;
      pointer = p;
      lastMove = now;
      jabUntil = now + 450;
    };
    const onLeave = () => {
      lastMove = Math.min(lastMove, performance.now() - 1600);
    };

    resize();
    still();
    const ro = new ResizeObserver(() => {
      resize();
      still();
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => {
      visible = e?.isIntersecting ?? true;
    });
    io.observe(wrap);

    if (!reduce) {
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerdown", onDown);
      wrap.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }
    // Redraw once fonts arrive so the label uses Readex Pro.
    document.fonts?.ready.then(() => reduce && still()).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [alertLabel, motionLabel, rtl]);

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
