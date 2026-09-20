"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const TOTAL_FRAMES = 120;
const SECTION_VH = 4; // scroll height = 4× viewport height

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, lo = 0, hi = 1) {
  return Math.max(lo, Math.min(hi, v));
}

function smoothstep(x: number) {
  const t = clamp(x);
  return t * t * (3 - 2 * t);
}

/** 0→1→0 bell curve across [in, peak, out] */
function bell(p: number, i: number, pk: number, o: number) {
  if (p <= i) return 0;
  if (p <= pk) return (p - i) / (pk - i);
  if (p <= o) return (o - p) / (o - pk);
  return 0;
}

export default function VideoHeroClient() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // 5 text phases
  const ph0 = useRef<HTMLDivElement>(null);
  const ph1 = useRef<HTMLDivElement>(null);
  const ph2 = useRef<HTMLDivElement>(null);
  const ph3 = useRef<HTMLDivElement>(null);
  const ph4 = useRef<HTMLDivElement>(null);

  const targetP = useRef(0);
  const curP = useRef(0);
  const rafId = useRef(0);

  // Preloaded image element storage & progress
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Frame preloader
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(4, "0");
      img.src = `/frames/frame_${numStr}.webp`;

      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      imgs[i - 1] = img;
    }

    imagesRef.current = imgs;
  }, []);

  // Main canvas animation loop & scroll listener
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const scrollH = wrap.offsetHeight - window.innerHeight;
      if (scrollH <= 0) return;
      targetP.current = clamp(-rect.top / scrollH);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const applyPhase = (el: HTMLDivElement | null, op: number, ty: number) => {
      if (!el) return;
      el.style.opacity = op.toFixed(4);
      el.style.transform = `translateY(${ty.toFixed(1)}px)`;
      el.style.pointerEvents = op > 0.05 ? "auto" : "none";
    };

    let lastDrawnIndex = -1;

    const drawFrame = (frameIdx: number) => {
      const img = imagesRef.current[frameIdx];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover math
      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const nx = (cw - nw) / 2;
      const ny = (ch - nh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, nx, ny, nw, nh);
      lastDrawnIndex = frameIdx;
    };

    const tick = () => {
      curP.current = lerp(curP.current, targetP.current, 0.1);
      const p = curP.current;

      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(p * TOTAL_FRAMES))
      );

      if (frameIdx !== lastDrawnIndex || canvas.width !== window.innerWidth) {
        drawFrame(frameIdx);
      }

      if (barRef.current) {
        barRef.current.style.width = `${(p * 100).toFixed(1)}%`;
      }

      // Phase 0 — hero title
      const op0 = smoothstep(p < 0.1 ? 1 - p / 0.1 : 0);
      applyPhase(ph0.current, op0, (1 - op0) * -20);

      // Phase 1: 0.08 → 0.18 → 0.30
      const op1 = smoothstep(bell(p, 0.08, 0.18, 0.3));
      applyPhase(ph1.current, op1, (1 - op1) * 30);

      // Phase 2: 0.28 → 0.40 → 0.54
      const op2 = smoothstep(bell(p, 0.28, 0.4, 0.54));
      applyPhase(ph2.current, op2, (1 - op2) * 30);

      // Phase 3: 0.54 → 0.65 → 0.76
      const op3 = smoothstep(bell(p, 0.54, 0.65, 0.76));
      applyPhase(ph3.current, op3, (1 - op3) * 30);

      // Phase 4: 0.76 → 0.87 → stays
      const op4 = smoothstep(bell(p, 0.76, 0.87, 1.05));
      applyPhase(ph4.current, op4, (1 - op4) * 30);

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ height: `${SECTION_VH * 100}vh` }}>
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#020617]">
        {/* Canvas background for smooth frame sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />

        {/* Loading Indicator before frames are ready */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617] text-slate-300 z-10">
            <div className="w-12 h-12 border-2 border-[#0ea5e9] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xs uppercase tracking-widest font-semibold text-slate-400">
              Loading Experience ({loadProgress}%)
            </p>
          </div>
        )}

        {/* Gradient overlays for high text contrast */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background: [
              "linear-gradient(to bottom, rgba(2,6,23,0.7) 0%, rgba(2,6,23,0.2) 40%, rgba(2,6,23,0.7) 100%)",
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(2,6,23,0.3) 0%, rgba(2,6,23,0.75) 100%)",
            ].join(", "),
          }}
        />

        {/* Text phases */}
        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          {/* Phase 0 — Initial hero */}
          <div
            ref={ph0}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 select-none"
            style={{ willChange: "opacity, transform" }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill text-[#38bdf8] text-xs font-bold uppercase tracking-widest mb-8 border border-sky-400/40 bg-slate-900/60 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
              </span>
              Authorised Channel Partner · ADM Meters Italy
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-extrabold text-white tracking-[-0.02em] leading-[1.04] drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]">
              Smart Water<br />
              <span className="text-gradient-cyan">Metering</span>
            </h1>
            <p className="mt-7 text-lg md:text-xl text-slate-100 max-w-lg mx-auto leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Scroll to explore the high-precision engineering inside every meter.
            </p>
            <div className="mt-12 flex flex-col items-center gap-1 text-slate-300 text-xs font-bold tracking-widest uppercase animate-bounce drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              <ChevronDown aria-hidden="true" className="w-5 h-5 text-sky-400" />
              <span>Scroll to Explore</span>
            </div>
          </div>

          {/* Phase 1 — Precision Engineering */}
          <div
            ref={ph1}
            className="absolute inset-0 flex flex-col items-start justify-end pb-20 px-8 md:px-24 select-none"
            style={{ opacity: 0, pointerEvents: "none", willChange: "opacity, transform" }}
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.4em] text-sky-400 mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              01 — Assembly &amp; Tolerances
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight max-w-2xl drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]">
              Precision<br />Engineering
            </h2>
            <p className="mt-5 text-slate-100 text-base md:text-lg max-w-md leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Each ADM meter is machined from aerospace-grade alloys with
              sub-micron tolerances — built for 15+ years of maintenance-free operation.
            </p>
          </div>

          {/* Phase 2 — Calibration */}
          <div
            ref={ph2}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 select-none"
            style={{ opacity: 0, pointerEvents: "none", willChange: "opacity, transform" }}
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.4em] text-sky-400 mb-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              02 — Calibration Standard
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight max-w-3xl text-center drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]">
              Every Component,<br />
              <span className="text-gradient-cyan">Perfectly Calibrated</span>
            </h2>
            <p className="mt-7 text-slate-100 text-base md:text-lg max-w-xl text-center leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              ±1% accuracy across the full dynamic flow range.
              Certified to ISO 4064 Class C and IS 778 standards.
            </p>
          </div>

          {/* Phase 3 — Stats */}
          <div
            ref={ph3}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 select-none"
            style={{ opacity: 0, pointerEvents: "none", willChange: "opacity, transform" }}
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.4em] text-sky-400 mb-12 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              03 — Scale &amp; Proven Track Record
            </p>
            <div className="grid grid-cols-3 gap-8 md:gap-20">
              {[
                { v: "3 Lakh+", l: "Meters Installed" },
                { v: "15+", l: "Years Expertise" },
                { v: "33,000+", l: "EPC Contracts" },
              ].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <div className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">{v}</div>
                  <div className="mt-3 text-sky-300 text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">{l}</div>
                </div>
              ))}
            </div>
            <p className="mt-12 text-slate-100 text-base max-w-lg text-center leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Trusted by municipal boards, EPC contractors, and industrial plants across Pan-India.
            </p>
          </div>

          {/* Phase 4 — CTA */}
          <div
            ref={ph4}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 select-none"
            style={{ opacity: 0, pointerEvents: "none", willChange: "opacity, transform" }}
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.4em] text-sky-400 mb-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Trusted · Certified · Reliable
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight max-w-3xl text-center mb-6 drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]">
              Built to Last.<br />
              <span className="text-gradient-cyan">Measured to Matter.</span>
            </h2>
            <p className="text-slate-100 text-base md:text-lg max-w-xl text-center leading-relaxed font-normal mb-12 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Upgrade your water infrastructure with India&apos;s most reliable
              ADM metering solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalog" className="btn btn-primary text-base px-9 py-4 shadow-[0_0_30px_rgba(14,165,233,0.45)] group font-bold">
                <span>Explore Products</span>
                <ArrowRight aria-hidden="true" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="btn btn-glass bg-slate-900/80 backdrop-blur-md border border-white/30 hover:bg-slate-900 text-white text-base px-9 py-4 font-bold">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10" style={{ zIndex: 3 }}>
          <div ref={barRef} className="h-full bg-gradient-to-r from-sky-400 to-teal-400" style={{ width: "0%", willChange: "width" }} />
        </div>
      </div>
    </div>
  );
}
