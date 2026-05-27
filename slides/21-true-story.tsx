"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

function TrueStorySlide(_: SlideProps) {
  return (
    <SlideShell eyebrow="Act 3 · Proof">
      <div className="flex h-full flex-col items-center justify-center gap-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-display font-semibold leading-[1.02] tracking-[-0.02em] text-slate-900"
          style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
        >
          Let me tell you{" "}
          <span className="shimmer-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
            a true story.
          </span>
        </motion.h1>

        {/* A simple animated underline that draws beneath the title */}
        <svg
          viewBox="0 0 600 30"
          preserveAspectRatio="none"
          fill="none"
          style={{ width: "min(60vw, 720px)", height: "1.6rem" }}
        >
          <defs>
            <linearGradient id="ts-line" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 20 15 L 580 15"
            stroke="url(#ts-line)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { delay: 1.0, duration: 1.1, ease: [0.4, 0, 0.6, 1] },
              opacity: { delay: 1.0, duration: 0.15 },
            }}
          />
        </svg>
      </div>
    </SlideShell>
  );
}

export const slide21: SlideEntry = {
  meta: {
    id: "21-true-story",
    title: "Let me tell you a true story",
    section: "Act 3 · Proof",
    notes:
      "Cover slide for the FIFO case study. One line, dramatic pause. The audience just got the abstract argument — now we earn it with a real example.\n\nSay: 'OK, theory done. Let me tell you a true story. Real company, real problem, real numbers.' Pause. Then click → manufacturing video starts.\n\nKeep it under 10 seconds. The slide is a breath, not a beat.",
  },
  Component: TrueStorySlide,
};
