import { useEffect, useRef } from "react";

/*
  Hero illustration of the fight-detection input: a COCO-17 pose skeleton
  (what YOLO26-pose returns), per-joint velocity vectors, and the 30-frame
  window the mLSTM classifies. It is drawn, not inferred.
*/

type Pt = [number, number];

// COCO-17 order. The person faces the viewer, so r_* joints sit on the image's left.
const EDGES: Array<[number, number]> = [
  [15, 13], [13, 11], [16, 14], [14, 12], [11, 12], [5, 11], [6, 12], [5, 6],
  [5, 7], [6, 8], [7, 9], [8, 10], [1, 2], [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6],
];

// Figure space bounds used to fit the drawing into the canvas.
const BOUNDS = { x0: -40, y0: -30, x1: 330, y1: 500 };
const WINDOW = 30;
const FPS = 15;

const INK = "#1d2236";
const ULTRA = "#2b3fcf";
const PAPER = "#f6f7fc";
const RULE = "#cfd4e6";

function pose(t: number): Pt[] {
  const sway = Math.sin(t * 0.9) * 5;
  const bob = Math.sin(t * 1.8) * 2;
  const s = (k: number, x: number, y: number): Pt => [x + sway * k, y + bob * Math.min(k, 1)];

  // Right arm waves: upper arm raised, forearm swings around the elbow.
  const rShoulder = s(1, 105, 122);
  const upper = ((-150 + 6 * Math.sin(t * 3.1)) * Math.PI) / 180;
  const rElbow: Pt = [rShoulder[0] + 78 * Math.cos(upper), rShoulder[1] + 78 * Math.sin(upper)];
  const fore = ((-100 + 32 * Math.sin(t * 6.2)) * Math.PI) / 180;
  const rWrist: Pt = [rElbow[0] + 70 * Math.cos(fore), rElbow[1] + 70 * Math.sin(fore)];
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

// Indexes are fixed COCO ids, always in range.
const at = (pts: Pt[], i: number): Pt => pts[i] as Pt;

function arrow(ctx: CanvasRenderingContext2D, from: Pt, to: Pt) {
  const [x0, y0] = from;
  const [x1, y1] = to;
  const a = Math.atan2(y1 - y0, x1 - x0);
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1 - 7 * Math.cos(a - 0.45), y1 - 7 * Math.sin(a - 0.45));
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1 - 7 * Math.cos(a + 0.45), y1 - 7 * Math.sin(a + 0.45));
  ctx.stroke();
}

export function PoseFigure({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let prev: Pt[] | null = null;
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

    const draw = (t: number) => {
      const frame = Math.floor(t * FPS);
      const pts = pose(t);
      ctx.clearRect(0, 0, w, h);

      // Fit figure space into the canvas, leaving room for the window strip.
      const stripH = 46;
      const pad = 20;
      const bw = BOUNDS.x1 - BOUNDS.x0;
      const bh = BOUNDS.y1 - BOUNDS.y0;
      const k = Math.min((w - pad * 2) / bw, (h - stripH - pad * 2) / bh);
      const ox = (w - bw * k) / 2 - BOUNDS.x0 * k;
      const oy = pad - BOUNDS.y0 * k;
      const P = pts.map(([x, y]) => [ox + x * k, oy + y * k] as Pt);

      // Bounding box from keypoints
      const xs = P.map((p) => p[0]);
      const ys = P.map((p) => p[1]);
      const bx0 = Math.min(...xs) - 14 * k;
      const by0 = Math.min(...ys) - 22 * k;
      const bx1 = Math.max(...xs) + 14 * k;
      const by1 = Math.max(...ys) + 12 * k;
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = ULTRA;
      ctx.strokeRect(bx0, by0, bx1 - bx0, by1 - by0);
      ctx.font = "500 11px 'JetBrains Mono', ui-monospace, monospace";
      const tag = "person 0.97";
      const tw = ctx.measureText(tag).width + 12;
      ctx.fillStyle = ULTRA;
      ctx.fillRect(bx0 - 0.75, by0 - 19, tw, 19);
      ctx.fillStyle = PAPER;
      ctx.fillText(tag, bx0 + 5.25, by0 - 5.5);

      // Skeleton
      ctx.strokeStyle = INK;
      ctx.lineWidth = Math.max(1.6, 2.4 * k);
      ctx.lineCap = "round";
      ctx.beginPath();
      for (const [a, b] of EDGES) {
        const pa = at(P, a);
        const pb = at(P, b);
        ctx.moveTo(pa[0], pa[1]);
        ctx.lineTo(pb[0], pb[1]);
      }
      ctx.stroke();

      // Velocity vectors on the joints that move most
      if (prev) {
        ctx.strokeStyle = ULTRA;
        ctx.lineWidth = 1.4;
        for (const i of [8, 10, 9]) {
          const p = at(P, i);
          const q = at(prev, i);
          const dx = p[0] - q[0];
          const dy = p[1] - q[1];
          if (Math.hypot(dx, dy) * FPS > 4) arrow(ctx, p, [p[0] + dx * 9, p[1] + dy * 9]);
        }
      }

      // Keypoints
      for (let i = 0; i < P.length; i++) {
        const moving = i === 8 || i === 10;
        const p = at(P, i);
        ctx.beginPath();
        ctx.arc(p[0], p[1], moving ? 4.5 : 3.4, 0, Math.PI * 2);
        ctx.fillStyle = moving ? ULTRA : PAPER;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = moving ? ULTRA : INK;
        ctx.stroke();
      }

      // Callout for the waving wrist
      const wr = at(P, 10);
      const dxw = prev ? (wr[0] - at(prev, 10)[0]) / k : 0;
      const dyw = prev ? (wr[1] - at(prev, 10)[1]) / k : 0;
      // Callout sits in the empty top-right corner, with a leader line to the wrist.
      ctx.font = "500 10.5px 'JetBrains Mono', ui-monospace, monospace";
      const l1 = "kp10 r_wrist";
      const l2 = `v=(${dxw >= 0 ? "+" : ""}${dxw.toFixed(1)}, ${dyw >= 0 ? "+" : ""}${dyw.toFixed(1)})`;
      const lw = Math.max(ctx.measureText(l1).width, ctx.measureText(l2).width);
      const lx = w - pad - lw;
      const ly = pad + 8;
      ctx.strokeStyle = ULTRA;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(lx - 6, ly + 3);
      ctx.lineTo(wr[0] + 7, wr[1] - 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      ctx.fillStyle = INK;
      ctx.fillText(l1, lx, ly);
      ctx.fillStyle = ULTRA;
      ctx.fillText(l2, lx, ly + 13);

      // 30-frame window strip
      const idx = frame % WINDOW;
      const sx = pad;
      const sy = h - stripH + 14;
      const cw = (w - pad * 2 - 112) / WINDOW;
      ctx.fillStyle = INK;
      ctx.font = "500 10.5px 'JetBrains Mono', ui-monospace, monospace";
      ctx.fillText(`window ${String(idx + 1).padStart(2, "0")}/${WINDOW}`, sx, sy + 12);
      for (let i = 0; i < WINDOW; i++) {
        ctx.fillStyle = i < idx ? ULTRA : i === idx ? INK : RULE;
        ctx.globalAlpha = i < idx ? 0.35 + (0.65 * i) / WINDOW : 1;
        ctx.fillRect(sx + 108 + i * cw, sy, Math.max(1, cw - 2), 16);
      }
      ctx.globalAlpha = 1;

      prev = P;
    };

    const loop = (now: number) => {
      if (visible) draw((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    resize();
    // A still frame, drawn synchronously, with a frame just before it so velocity
    // arrows show. Used for reduced motion, and so the figure is never blank while
    // animation frames are paused (background tabs, link-preview screenshots).
    const still = () => {
      prev = null;
      draw(0.583);
      draw(0.6);
    };
    const ro = new ResizeObserver(() => {
      resize();
      still();
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => {
      visible = e?.isIntersecting ?? true;
    });
    io.observe(wrap);

    still();
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Animated stick figure made of 17 pose keypoints, waving, with a bounding box, velocity arrows on the moving arm, and a 30-frame window counter."
        className="absolute inset-0"
      />
    </div>
  );
}
