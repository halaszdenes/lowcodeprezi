"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

function VibeCodingSlide({ step }: SlideProps) {
  const isClimax = step >= 2;

  return (
    <SlideShell eyebrow="A lower bridge">
      <div className="flex h-full flex-col justify-center">
        <AnimatePresence mode="wait">
          {!isClimax ? (
            <motion.div
              key="setup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col items-start gap-10"
            >
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[22ch] font-display font-semibold leading-[1.02] tracking-[-0.02em] text-slate-900"
                style={{ fontSize: "clamp(2.6rem, 5.6vw, 5.4rem)" }}
              >
                Something is even{" "}
                <span className="shimmer-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
                  &ldquo;lower&rdquo;
                </span>{" "}
                than low-code drag-and-drop.
              </motion.h1>

              <AnimatePresence>
                {step >= 1 && (
                  <motion.p
                    key="natural-language"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 22,
                    }}
                    className="font-display font-semibold leading-[1.05] tracking-tight"
                    style={{ fontSize: "clamp(2.2rem, 4.4vw, 4rem)" }}
                  >
                    <span className="shimmer-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
                      Natural language.
                    </span>
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="climax"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex w-full flex-col items-center justify-center"
            >
              <div className="relative">
                <motion.div
                  initial={{
                    clipPath: "inset(0 100% 0 0)",
                    rotate: 0,
                    y: 8,
                  }}
                  animate={{
                    clipPath: "inset(0 0% 0 0)",
                    rotate: -3,
                    y: 0,
                  }}
                  transition={{
                    clipPath: { duration: 1.6, ease: [0.65, 0, 0.35, 1] },
                    rotate: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    y: { duration: 0.8 },
                  }}
                  className="shimmer-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent"
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontWeight: 700,
                    fontSize: "clamp(6rem, 16vw, 14rem)",
                    lineHeight: 1,
                    paddingBottom: "0.18em",
                    paddingRight: "0.05em",
                  }}
                >
                  vibe coding
                </motion.div>

                {/* Hand-drawn underline */}
                <svg
                  viewBox="0 0 600 50"
                  preserveAspectRatio="none"
                  className="absolute left-0 right-0"
                  style={{
                    width: "100%",
                    height: "0.7em",
                    bottom: "-0.15em",
                    transform: "rotate(-3deg)",
                    transformOrigin: "left center",
                  }}
                  fill="none"
                >
                  <defs>
                    <linearGradient id="vc-underline" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="50%" stopColor="#d946ef" />
                      <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 15 28 C 110 12, 220 38, 330 22 C 430 10, 510 32, 585 22"
                    stroke="url(#vc-underline)"
                    strokeWidth="9"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: {
                        delay: 1.5,
                        duration: 1.0,
                        ease: [0.4, 0, 0.6, 1],
                      },
                      opacity: { delay: 1.5, duration: 0.1 },
                    }}
                  />
                </svg>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.7, duration: 0.6 }}
                className="mt-10 text-2xl font-medium italic text-slate-500"
              >
                you&apos;re looking at a vibe-coded slide deck right now.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideShell>
  );
}

export const slide15: SlideEntry = {
  meta: {
    id: "15-vibe-coding",
    title: "The lower bridge: vibe-coding",
    section: "Act 2 · The AI question",
    steps: 3,
    notes:
      "The buzzword reveal. Three steps — a setup statement, a one-word answer, then the buzzword caricature.\n\n• Step 0 (load): 'Something is even \"lower\" than low-code drag-and-drop.' Deadpan. Say: 'Drag-and-drop is already low. But there's something lower.'\n• Step 1: + 'Natural language.' appears below. Say: 'Natural language. You describe what you want — and AI builds it.'\n• Step 2: Everything wipes, the words 'vibe coding' come in big, scrawled, purple gradient, with a hand-drawn underline. Pause. Let the audience react. Then deliver the meta line: 'you're looking at a vibe-coded slide deck right now.' Wait for the laugh / nod.\n\nThis is also a vibe shift — for the next 2-3 slides we're going to scare them a bit before resolving it.",
  },
  Component: VibeCodingSlide,
};
