import React, { useEffect, useRef } from 'react';

// Ambient dot-grid canvas behind the Hero wordmark. Reconstructed from the
// production bundle (_spec/live.js, the minified `_v` component) — a grid of
// dots whose brightness rises near three slow Lissajous-orbiting points, plus
// a pointer-follow highlight that ramps in on move and fades out after
// MOVE_TIMEOUT_S seconds of inactivity. Disabled for prefers-reduced-motion
// and for touch/no-hover devices (no pointer to follow).
const MIN_GRID_PX = 24;
const AREA_PER_DOT = 2400;
const DOT_RADIUS = 1;
const DOT_COLOR = '#161412';
const FALLOFF_PX = 220;
const TARGET_FPS = 30;
const FRAME_MS = 1000 / TARGET_FPS;
const POINTER_PEAK_ALPHA = 0.6;
const POINTER_RAMP_MS = 600;
const POINTER_LERP = 0.08;
const MOVE_TIMEOUT_S = 4;
const FADE_DURATION_S = 3;
const STILL_FRAME_T = 20; // seconds; used for the single static render under reduced-motion

interface Orbit {
  periodSeconds: number;
  phaseX: number;
  phaseY: number;
  yFreqRatio: number;
  ampXFactor: number;
  ampYFactor: number;
}

const ORBITS: Orbit[] = [
  { periodSeconds: 41, phaseX: 0, phaseY: Math.PI / 3, yFreqRatio: 2, ampXFactor: 0.35, ampYFactor: 0.35 },
  { periodSeconds: 53, phaseX: (2 * Math.PI) / 3, phaseY: Math.PI * 1.15, yFreqRatio: 3, ampXFactor: 0.35, ampYFactor: 0.35 },
  { periodSeconds: 67, phaseX: Math.PI * 1.4, phaseY: Math.PI * 0.2, yFreqRatio: 5, ampXFactor: 0.35, ampYFactor: 0.35 },
];

const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const container = canvas.parentElement;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHover = !window.matchMedia('(hover: none)').matches;

    let width = 0;
    let height = 0;
    let gridStep = MIN_GRID_PX;
    let running = false;
    let rafId: number | null = null;
    let lastFrameTime = 0;
    const startTime = performance.now();
    let visible = document.visibilityState === 'visible';
    let inView = false;

    // Smoothed pointer position + its animation target.
    let px = 0, py = 0, targetX = 0, targetY = 0;
    let hasMoved = false;
    let lastMoveTime = 0;
    let firstMoveTime = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      gridStep = Math.max(MIN_GRID_PX, Math.ceil(Math.sqrt((width * height) / AREA_PER_DOT)));
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      if (!hasMoved) {
        px = width / 2;
        py = height / 2;
        targetX = px;
        targetY = py;
      }
    };

    const orbitPosition = (o: Orbit, t: number) => {
      const cx = width / 2;
      const cy = height / 2;
      const ax = o.ampXFactor * width;
      const ay = o.ampYFactor * height;
      const w = (2 * Math.PI) / o.periodSeconds;
      return {
        x: cx + ax * Math.sin(w * t + o.phaseX),
        y: cy + ay * Math.sin(w * o.yFreqRatio * t + o.phaseY),
      };
    };

    // Pointer-highlight alpha: ramps up over POINTER_RAMP_MS after the first
    // move, holds at POINTER_PEAK_ALPHA, then fades out over FADE_DURATION_S
    // once MOVE_TIMEOUT_S has passed since the last move.
    const pointerAlpha = (now: number) => {
      if (!hasHover || !hasMoved) return 0;
      const sinceFirst = now - firstMoveTime;
      const ramped = sinceFirst >= POINTER_RAMP_MS ? POINTER_PEAK_ALPHA : POINTER_PEAK_ALPHA * (sinceFirst / POINTER_RAMP_MS);
      const idleSeconds = (now - lastMoveTime) / 1000;
      if (idleSeconds <= MOVE_TIMEOUT_S) return ramped;
      const fadeProgress = (idleSeconds - MOVE_TIMEOUT_S) / FADE_DURATION_S;
      return fadeProgress >= 1 ? 0 : ramped * (1 - fadeProgress);
    };

    const render = (t: number, now: number) => {
      const points = ORBITS.map((o) => {
        const p = orbitPosition(o, t);
        return { x: p.x, y: p.y, a: 1 };
      });
      const pAlpha = pointerAlpha(now);
      if (pAlpha > 0) points.push({ x: px, y: py, a: pAlpha });

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = DOT_COLOR;
      const cols = Math.floor(width / gridStep) + 1;
      const rows = Math.floor(height / gridStep) + 1;
      for (let row = 0; row < rows; row++) {
        const y = row * gridStep;
        for (let col = 0; col < cols; col++) {
          const x = col * gridStep;
          let influence = 0;
          for (const pt of points) {
            const dx = x - pt.x;
            const dy = y - pt.y;
            const d2 = dx * dx + dy * dy;
            influence += pt.a / (1 + d2 / (FALLOFF_PX * FALLOFF_PX));
          }
          let alpha = 0.06 + 0.7 * influence;
          if (alpha < 0.06) alpha = 0.06;
          if (alpha > 0.4) alpha = 0.4;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      if (!running) return;
      rafId = requestAnimationFrame(tick);
      if (now - lastFrameTime < FRAME_MS) return;
      lastFrameTime = now;
      px += (targetX - px) * POINTER_LERP;
      py += (targetY - py) * POINTER_LERP;
      render((now - startTime) / 1000, now);
    };

    const updateRunning = () => {
      const shouldRun = !reduceMotion && visible && inView;
      if (shouldRun && !running) {
        running = true;
        lastFrameTime = 0;
        rafId = requestAnimationFrame(tick);
      } else if (!shouldRun && running) {
        running = false;
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const onVisibilityChange = () => {
      visible = document.visibilityState === 'visible';
      updateRunning();
    };
    const onResize = () => {
      resize();
      if (reduceMotion) render(STILL_FRAME_T, performance.now());
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (!hasMoved) firstMoveTime = performance.now();
      hasMoved = true;
      lastMoveTime = performance.now();
    };
    const onPointerLeave = () => {
      if (hasMoved) lastMoveTime = performance.now() - MOVE_TIMEOUT_S * 1000;
    };

    resize();
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[entries.length - 1].isIntersecting;
        updateRunning();
      },
      { threshold: 0 }
    );
    io.observe(canvas);
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('resize', onResize);
    if (hasHover && container) {
      container.addEventListener('pointermove', onPointerMove);
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
    }

    if (reduceMotion) {
      render(STILL_FRAME_T, performance.now());
    } else {
      updateRunning();
    }

    return () => {
      running = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', onResize);
      if (hasHover && container) {
        container.removeEventListener('pointermove', onPointerMove);
        document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      }
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 z-0 h-full w-full pointer-events-none" />;
};

export default HeroCanvas;
