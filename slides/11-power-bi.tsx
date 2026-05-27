"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

const ADVANTAGES = [
  "Handles large datasets",
  "Built-in security",
  "Automated data refresh",
  "Excel-like syntax (DAX)",
];

function PowerBiSlide(_: SlideProps) {
  return (
    <SlideShell eyebrow="Power Platform · Power BI">
      <div className="grid h-full grid-cols-12 items-center gap-12">
        {/* Left: Hulk visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-5 flex h-full items-center justify-center"
        >
          <div
            className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200"
            style={{ aspectRatio: "928 / 1232", width: "100%", maxWidth: "420px" }}
          >
            <img
              src="/pp-bi.png"
              alt="Power BI represented as the Hulk — strong, heavy-lifting data muscle"
              className="block h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Right: copy */}
        <div className="col-span-7 flex flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-violet-700">
              The data muscle
            </p>
            <h1
              className="mt-4 font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
              style={{ fontSize: "clamp(2.8rem, 5.8vw, 5rem)" }}
            >
              Power BI.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-slate-500">
              Core
            </p>
            <p className="mt-2 text-2xl leading-snug text-slate-700">
              Power Query · DAX · Interactive Dashboards
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.65 }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-slate-500">
              Why it wins
            </p>
            <ul className="mt-3 flex flex-col gap-3">
              {ADVANTAGES.map((a, i) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.8 + i * 0.1,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-3 text-xl text-slate-800"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                  {a}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  );
}

export const slide11: SlideEntry = {
  meta: {
    id: "11-power-bi",
    title: "Power BI — the data muscle",
    section: "Act 2 · The AI question",
    notes:
      "Tool 1 of 3. The Hulk metaphor is the joke — Power BI handles the heavy lifting on data.\n\nSay: 'First tool — Power BI. This is your data muscle. Power Query pulls and reshapes the data, DAX is the formula language, and dashboards are the output. The reason people fall in love with it: it handles large datasets, has enterprise security baked in, refreshes itself on schedule, and if you know Excel, DAX is going to feel familiar.'\n\nKeep it tight — ~40s. Don't teach DAX, just establish the tool.",
  },
  Component: PowerBiSlide,
};
