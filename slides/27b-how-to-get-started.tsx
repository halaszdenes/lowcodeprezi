"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

function HowToGetStartedSlide(_: SlideProps) {
  return (
    <SlideShell eyebrow="Act 4 · What to do Monday">
      <div className="flex h-full flex-col items-center justify-center gap-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-display font-semibold leading-[1.02] tracking-[-0.02em] text-slate-900"
          style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
        >
          How to{" "}
          <span className="shimmer-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent">
            get started.
          </span>
        </motion.h1>

        <svg
          viewBox="0 0 600 30"
          preserveAspectRatio="none"
          fill="none"
          style={{ width: "min(60vw, 720px)", height: "1.6rem" }}
        >
          <defs>
            <linearGradient id="gs-line" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#0984e3" stopOpacity="0" />
              <stop offset="50%" stopColor="#2d95e6" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 20 15 L 580 15"
            stroke="url(#gs-line)"
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

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-2xl font-medium text-slate-600"
        >
          What to do on Monday, whether or not you already have an office job.
        </motion.p>
      </div>
    </SlideShell>
  );
}

export const slide27b: SlideEntry = {
  meta: {
    id: "27b-how-to-get-started",
    title: "How to get started",
    section: "Act 4 · What to do Monday",
    notes:
      "That was the proof. Now the practical part: how you get started, whether you already sit in an office job or not.\n\n• Ten seconds. A breath between the case study and the advice.",
  },
  Component: HowToGetStartedSlide,
};
