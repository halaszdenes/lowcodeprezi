"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

function CanvasWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f56" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#ffbd2e" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#27c93f" }} />
        <div className="ml-5 flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 font-mono text-[11px] text-slate-600">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 2L4.09 12.97a1 1 0 0 0 .77 1.64H11l-1 7.39a1 1 0 0 0 1.78.62l8.91-10.97a1 1 0 0 0-.77-1.64H13l1-7.39a1 1 0 0 0-1-1.62Z"
              fill="#0984e3"
            />
          </svg>
          Power Apps Studio
        </div>
      </div>

      {/* Recording area: scaled up + anchored to the upper-left so the
          action (Insert button, sidebar, canvas drop zone) reads at glance.
          The original recording leaves the right ~30% as empty canvas. */}
      <div
        className="relative w-full overflow-hidden bg-slate-100"
        style={{ aspectRatio: "16 / 9" }}
      >
        <video
          src="/canvas-button.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 block h-full w-full object-cover"
          style={{
            transform: "scale(1.28)",
            transformOrigin: "28% 38%",
          }}
        />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between bg-brand-600 px-4 py-1.5 font-mono text-[10px] text-white">
        <span>Canvas app · Saved</span>
        <span>drag · drop · done</span>
      </div>
    </motion.div>
  );
}

function CodingIsEasySlide(_: SlideProps) {
  return (
    <SlideShell eyebrow="Low-code" showAmbient={false} showParticles={false}>
      <div className="grid h-full grid-cols-12 items-center gap-12">
        <div className="col-span-5 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-brand-700">
              Same task, low-code
            </p>
            <h1
              className="mt-4 font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
              style={{ fontSize: "clamp(2.6rem, 5.4vw, 4.8rem)" }}
            >
              In low-code,{" "}
              <span className="shimmer-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent">
                this is what it takes.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="max-w-[38ch] text-lg leading-[1.6] text-slate-600"
          >
            Drag a button onto the canvas. Done. Same outcome, same screen,
            none of the imports, none of the syntax.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.0 }}
            className="mt-2 flex items-center gap-4"
          >
            <div className="flex items-baseline gap-2 rounded-full border border-brand-200 bg-brand-50 px-5 py-2 shadow-sm">
              <span className="font-display text-3xl font-semibold text-brand-700">
                0
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">
                lines
              </span>
            </div>
            <div className="flex items-baseline gap-2 rounded-full border border-brand-200 bg-brand-50 px-5 py-2 shadow-sm">
              <span className="font-display text-3xl font-semibold text-brand-700">
                0
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">
                concepts
              </span>
            </div>
          </motion.div>
        </div>

        <div className="col-span-7">
          <CanvasWindow />
        </div>
      </div>
    </SlideShell>
  );
}

export const slide05: SlideEntry = {
  meta: {
    id: "05-coding-is-easy",
    title: "Adding a button: in low-code",
    section: "Act 1 · Setup",
    notes:
      "Same task in low-code. You drag a button onto the canvas. That's it. No imports, no state, no syntax.\n\n• Same outcome, actually a better one: that button already works on web, mobile and tablet without extra work.\n• Pause and let the contrast land before moving on.",
  },
  Component: CodingIsEasySlide,
};
