"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const SECTION_VH = 4; // scroll travel = 4× viewport height

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(v: number, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, v)); }
function smoothstep(x: number) { const t = clamp(x); return t * t * (3 - 2 * t); }

/** 0→1→0 bell across [in, peak, out] */
function bell(p: number, i: number, pk: number, o: number) {
  if (p <= i)  return 0;
  if (p <= pk) return (p - i)  / (pk - i);
  if (p <= o)  return (o - p)  / (o  - pk);
  return 0;
}

export default function VideoHeroClient() {
  // ── Refs ──────────────────────────────────────────────────────
  const wrapRef = useRef<HTMLDivElement>(null);
  const vidRef  = useRef<HTMLVideoElement>(null);
  const barRef  = useRef<HTMLDivElement>(null);
  const dbgRef  = useRef<HTMLDivElement>(null); // debug overlay

  // 5 text phases — individually named to avoid re-creating the array each render
  const ph0 = useRef<HTMLDivElement>(null);
  const ph1 = useRef<HTMLDivElement>(null);
  const ph2 = useRef<HTMLDivElement>(null);
  const ph3 = useRef<HTMLDivElement>(null);
  const ph4 = useRef<HTMLDivElement>(null);

  const targetP = useRef(0);
  const curP    = useRef(0);
  const rafId   = useRef(0);
  const dur     = useRef(0);
  const ready   = useRef(false);

  useEffect(() => {
    // ── Guard ─────────────────────────────────────────────────
    const wrap  = wrapRef.current;
    const video = vidRef.current;
    if (!wrap || !video) { console.error("[VideoHero] refs not ready"); return; }

    console.log("[VideoHero] mounted. section height:", wrap.offsetHeight, "vh:", SECTION_VH);

    // ── Scroll → targetP ──────────────────────────────────────
    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const scrollH = wrap.offsetHeight - window.innerHeight;
      if (scrollH <= 0) return;
      targetP.current = clamp(-rect.top / scrollH);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Apply phase div ───────────────────────────────────────
    const applyPhase = (el: HTMLDivElement | null, op: number, ty: number) => {
      if (!el) return;
      el.style.opacity       = op.toFixed(4);
      el.style.transform     = `translateY(${ty.toFixed(1)}px)`;
      el.style.pointerEvents = op > 0.05 ? "auto" : "none";
    };

    // ── rAF loop ──────────────────────────────────────────────
    const tick = () => {
      curP.current = lerp(curP.current, targetP.current, 0.075);
      const p = curP.current;

      // Video scrub
      if (ready.current && dur.current > 0) {
        const t = p * dur.current;
        try {
          if (typeof (video as { fastSeek?: (n: number) => void }).fastSeek === "function") {
            (video as { fastSeek: (n: number) => void }).fastSeek(t);
          } else {
            video.currentTime = t;
          }
        } catch { /* non-fatal */ }
      }

      // Progress bar
      if (barRef.current) barRef.current.style.width = `${(p * 100).toFixed(1)}%`;

      // Debug overlay
      if (dbgRef.current) {
        dbgRef.current.textContent =
          `scroll ${(p * 100).toFixed(1)}% | t=${(p * dur.current).toFixed(2)}s / ${dur.current.toFixed(2)}s | ready:${ready.current}`;
      }

      // Phase 0 — hero title
      const op0 = smoothstep(p < 0.10 ? 1 - p / 0.10 : 0);
      applyPhase(ph0.current, op0, (1 - op0) * -20);

      // Phase 1: 0.08 → 0.18 → 0.30
      const op1 = smoothstep(bell(p, 0.08, 0.18, 0.30));
      applyPhase(ph1.current, op1, (1 - op1) * 30);

      // Phase 2: 0.28 → 0.40 → 0.54
      const op2 = smoothstep(bell(p, 0.28, 0.40, 0.54));
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

    // ── Video readiness — enable as soon as metadata is known ─
    const enable = () => {
      if (video.duration && isFinite(video.duration) && !ready.current) {
        dur.current   = video.duration;
        ready.current = true;
        video.pause();
        video.currentTime = 0;
        console.log("[VideoHero] video ready. duration:", video.duration);
      }
    };

    if (video.readyState >= 1) enable(); // already has metadata (cached)
    video.addEventListener("loadedmetadata", enable);
    video.addEventListener("loadeddata",     enable);
    video.addEventListener("canplay",        enable);

    // Prevent autoplay (browser may start it)
    const keepPaused = () => { video.pause(); };
    video.addEventListener("play", keepPaused);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("loadedmetadata", enable);
      video.removeEventListener("loadeddata",     enable);
      video.removeEventListener("canplay",        enable);
      video.removeEventListener("play",           keepPaused);
    };
  }, []); // ← empty deps: run once on mount

  return (
    /*
     * CRITICAL: This outer div must NOT have overflow:hidden/auto/scroll.
     * Those values create a scroll container which BREAKS position:sticky.
     * overflow:clip is safe — it clips without creating a scroll container.
     * (Set on body/main via globals.css and layout.tsx.)
     */
    <div ref={wrapRef} style={{ height: `${SECTION_VH * 100}vh` }}>

      {/* Sticky viewport — overflow:hidden here is safe (on the sticky el itself) */}
      <div className="sticky top-0 h-screen w-full" style={{ overflow: "hidden" }}>

        {/* ── Video background ──────────────────────────────────── */}
        <video
          ref={vidRef}
          src="/water-meter-disassembly.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        />

        {/* ── Dark gradient overlay — keep it LIGHT so video shows ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background: [
              // gentle top fade for text readability
              "linear-gradient(to bottom, rgba(2,6,23,0.5) 0%, rgba(2,6,23,0.0) 30%)",
              // bottom fade to blend into next section
              "linear-gradient(to top, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.0) 30%)",
              // very light center tint — VIDEO MUST BE CLEARLY VISIBLE
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(2,6,23,0.1) 0%, rgba(2,6,23,0.45) 100%)",
            ].join(", "),
          }}
        />

        {/* ── Text phases ───────────────────────────────────────── */}
        <div className="absolute inset-0" style={{ zIndex: 2 }}>

          {/* Phase 0 — Initial hero */}
          <div
            ref={ph0}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 select-none"
            style={{ willChange: "opacity, transform" }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill text-[#38bdf8] text-xs font-semibold uppercase tracking-widest mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-[#38bdf8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0ea5e9]" />
              </span>
              Authorised Channel Partner · ADM Meters Italy
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-extrabold text-white tracking-[-0.02em] leading-[1.04] drop-shadow-[0_2px_30px_rgba(0,0,0,0.9)]">
              Smart Water<br />
              <span className="text-gradient-cyan">Metering</span>
            </h1>
            <p className="mt-7 text-lg md:text-xl text-slate-200 max-w-lg mx-auto leading-relaxed font-light drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]">
              Scroll to explore the engineering inside every meter.
            </p>
            <div className="mt-12 flex flex-col items-center gap-1 text-slate-400 text-xs tracking-widest uppercase animate-bounce">
              <ChevronDown aria-hidden="true" className="w-5 h-5" />
              <span>Scroll</span>
            </div>
          </div>

          {/* Phase 1 — Precision Engineering */}
          <div
            ref={ph1}
            className="absolute inset-0 flex flex-col items-start justify-end pb-20 px-8 md:px-24 select-none"
            style={{ opacity: 0, pointerEvents: "none", willChange: "opacity, transform" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#0ea5e9] mb-3">
              01 — Assembly
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight max-w-2xl drop-shadow-[0_2px_30px_rgba(0,0,0,0.9)]">
              Precision<br />Engineering
            </h2>
            <p className="mt-5 text-slate-200 text-base md:text-lg max-w-md leading-relaxed font-light drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]">
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
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#38bdf8] mb-5">
              02 — Calibration
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight max-w-3xl text-center drop-shadow-[0_2px_30px_rgba(0,0,0,0.9)]">
              Every Component,<br />
              <span className="text-gradient-cyan">Perfectly Calibrated</span>
            </h2>
            <p className="mt-7 text-slate-200 text-base md:text-lg max-w-xl text-center leading-relaxed font-light drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]">
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
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#38bdf8] mb-12">
              03 — Scale
            </p>
            <div className="grid grid-cols-3 gap-12 md:gap-24">
              {[
                { v: "3 Lakh+", l: "Meters Installed"  },
                { v: "15+",     l: "Years Expertise"    },
                { v: "33,000+", l: "EPC Contracts"      },
              ].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <div className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none drop-shadow-[0_2px_30px_rgba(0,0,0,0.9)]">{v}</div>
                  <div className="mt-3 text-slate-300 text-[10px] md:text-xs uppercase tracking-[0.25em] font-semibold">{l}</div>
                </div>
              ))}
            </div>
            <p className="mt-12 text-slate-200 text-base max-w-lg text-center leading-relaxed font-light drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]">
              Trusted by municipal boards, EPC contractors, and industrial plants across Pan-India.
            </p>
          </div>

          {/* Phase 4 — CTA */}
          <div
            ref={ph4}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 select-none"
            style={{ opacity: 0, pointerEvents: "none", willChange: "opacity, transform" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#38bdf8] mb-5">
              Trusted · Certified · Reliable
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight max-w-3xl text-center mb-6 drop-shadow-[0_2px_30px_rgba(0,0,0,0.9)]">
              Built to Last.<br />
              <span className="text-gradient-cyan">Measured to Matter.</span>
            </h2>
            <p className="text-slate-200 text-base md:text-lg max-w-xl text-center leading-relaxed font-light mb-12 drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]">
              Upgrade your water infrastructure with India&apos;s most reliable
              ADM metering solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalog" className="btn btn-primary text-base px-9 py-4 shadow-[0_0_30px_rgba(14,165,233,0.45)] group">
                <span>Explore Products</span>
                <ArrowRight aria-hidden="true" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="btn btn-glass bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-base px-9 py-4">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>

        {/* ── Progress bar ─────────────────────────────────────── */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/[0.06]" style={{ zIndex: 3 }}>
          <div ref={barRef} className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8]" style={{ width: "0%", willChange: "width" }} />
        </div>

        {/* ── DEBUG overlay (bottom-right corner) ──────────────── */}
        <div
          ref={dbgRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/60 bg-black/40 px-3 py-1 rounded-full"
          style={{ zIndex: 10 }}
        >
          loading…
        </div>
      </div>
    </div>
  );
}
