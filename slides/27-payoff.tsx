"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

function PayoffScene({ step }: { step: number }) {
  const showComparison = step >= 1;
  const showImplication = step >= 2;

  // Shared spring used for layout shifts when new elements appear/leave
  const layoutSpring = {
    type: "spring" as const,
    stiffness: 180,
    damping: 28,
    mass: 0.8,
  };

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      {/* Headline group — `layout` makes it smoothly slide up
          when comparison/implication appear below. */}
      <motion.div
        layout
        transition={layoutSpring}
        className="flex flex-col items-center"
      >
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-violet-700"
        >
          The payoff
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display font-semibold leading-[1.02] tracking-[-0.03em] text-slate-900"
          style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
        >
          <span className="shimmer-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
            €80k saved
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-4 font-display text-3xl font-medium text-slate-700"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}
        >
          per site, per year.
        </motion.p>
      </motion.div>

      {/* Time comparison — step 1.
          `layout` propagates layout changes; AnimatePresence with
          popLayout coordinates entry / exit with sibling repositioning. */}
      <AnimatePresence mode="popLayout">
        {showComparison && (
          <motion.div
            key="time-comparison"
            layout
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={layoutSpring}
            className="mt-16 flex items-center gap-6"
          >
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 22,
                delay: 0.15,
              }}
              className="rounded-2xl border border-violet-200 bg-violet-50/80 px-6 py-4 shadow-sm"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet-700">
                Our low-code POC
              </div>
              <div className="mt-1 font-display text-4xl font-bold text-violet-700">
                2 months
              </div>
            </motion.div>

            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 18,
                delay: 0.4,
              }}
              className="font-mono text-sm uppercase tracking-[0.3em] text-slate-400"
            >
              vs
            </motion.span>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 22,
                delay: 0.55,
              }}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
                Their pro-code build
              </div>
              <div className="mt-1 font-display text-4xl font-bold text-slate-500">
                16 months
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Implication — step 2 */}
      <AnimatePresence mode="popLayout">
        {showImplication && (
          <motion.p
            key="implication"
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={layoutSpring}
            className="mt-10 max-w-[60ch] text-lg text-slate-600"
          >
            And this was a{" "}
            <span className="font-semibold text-slate-900">global project</span>
            . The savings multiply across every site that runs it.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function PayoffSlide({ step }: SlideProps) {
  return (
    <SlideShell eyebrow="Proof · The payoff">
      <PayoffScene step={step} />
    </SlideShell>
  );
}

export const slide27: SlideEntry = {
  meta: {
    id: "17-payoff",
    title: "The payoff — €80k saved per site",
    section: "Act 3 · Proof",
    steps: 3,
    notes:
      "Climactic payoff slide for the QA story. 3 click steps:\n\n• Step 1 (load): 'The payoff' eyebrow + 'EUR 80K SAVED / per site, per year.' (huge shimmering headline, gradient text). Say: 'Across all the changeovers, all the lines, all the years — this is what the reorder buys.'\n• Step 2: Time comparison appears — '2 MONTHS / our low-code POC' vs '16 MONTHS / their pro-code build'. Say: 'The pro-code team took eight times longer to build a worse solution. Eight times.'\n• Step 3: Implication appears — 'And this was a global project. The savings multiply across every site that runs it.' Say: 'Now multiply that by every plant in the company.'\n\nThen pause. Let the number land. Click to slide 18 (companies).\n\n(Currency confirmed EUR, not USD.)",
  },
  Component: PayoffSlide,
};
