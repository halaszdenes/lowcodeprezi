"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

const SKILLS = ["Classify", "Extract", "Summarize", "Sentiment", "Translate"];

const BRANCHES = [
  { dept: "Support", action: "Forward + create ticket", dot: "bg-brand-500" },
  { dept: "Sales", action: "Forward + notify owner", dot: "bg-sky-500" },
  { dept: "Billing", action: "Forward + log invoice", dot: "bg-amber-500" },
];

function AiBuilderFlowSlide(_: SlideProps) {
  return (
    <SlideShell eyebrow="Tool spotlight · AI Builder">
      <div className="grid flex-1 grid-cols-12 items-center gap-10">
        {/* Left: title + skills */}
        <div className="col-span-5 flex flex-col gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-semibold leading-[1.05] tracking-[-0.02em] text-slate-900"
            style={{ fontSize: "clamp(2.4rem, 4.8vw, 4.2rem)" }}
          >
            <span className="flex items-center gap-4">
              <img
                src="/icons/ai-builder.svg"
                alt=""
                className="h-14 w-14 shrink-0 object-contain"
              />
              <span>One smart step,</span>
            </span>
            <span className="shimmer-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent">
              inside the flow.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="max-w-[40ch] text-xl leading-[1.5] text-slate-600"
          >
            AI Builder answers one question (<em>which department?</em>) and
            hands control straight back. The flow still owns the process.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex flex-col gap-2.5"
          >
            <span className="font-mono text-[13px] uppercase tracking-[0.25em] text-brand-700">
              Other one-step jobs
            </span>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.75 + i * 0.07, duration: 0.3 }}
                  className="rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-base font-medium text-brand-700"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: the branching flow */}
        <div className="col-span-7 flex flex-col items-center justify-center">
          {/* Trigger */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-[470px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.08)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-50 p-2 ring-1 ring-slate-200/70">
              <img
                src="/icons/outlook.svg"
                alt=""
                className="h-full w-full object-contain"
              />
            </span>
            <div>
              <div className="text-lg font-semibold leading-tight text-slate-900">
                When a new email arrives
              </div>
              <div className="mt-0.5 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                Office 365 Outlook · Trigger
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.85, duration: 0.3 }}
            className="h-5 w-px origin-top bg-slate-300"
          />

          {/* AI step */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.95, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-[470px] items-center gap-4 rounded-xl border border-brand-300 bg-gradient-to-r from-brand-50 to-sky-50 px-5 py-3.5 shadow-[0_2px_14px_rgba(9,132,227,0.18)] ring-2 ring-brand-200"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white p-2 ring-1 ring-brand-200">
              <img
                src="/icons/ai-builder.svg"
                alt=""
                className="h-full w-full object-contain"
              />
            </span>
            <div>
              <div className="text-lg font-semibold leading-tight text-slate-900">
                Categorize the email
              </div>
              <div className="mt-0.5 font-mono text-xs uppercase tracking-[0.2em] text-brand-500">
                AI Builder · Support / Sales / Billing?
              </div>
            </div>
            <span className="absolute -right-2.5 -top-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.15em] text-white shadow">
              ✨ AI step
            </span>
          </motion.div>

          {/* Branch connectors */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="h-4 w-px bg-slate-300" />
            <div className="h-px w-[464px] bg-slate-300" />
          </motion.div>

          {/* Branches */}
          <div className="flex items-start gap-6">
            {BRANCHES.map((b, i) => (
              <div key={b.dept} className="flex w-52 flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: 1.45 + i * 0.12, duration: 0.25 }}
                  className="h-4 w-px origin-top bg-slate-300"
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: [1, 1, 1.05, 1],
                    boxShadow: [
                      "0 2px 10px rgba(15,23,42,0.08)",
                      "0 2px 10px rgba(15,23,42,0.08)",
                      "0 4px 18px rgba(9,132,227,0.28)",
                      "0 2px 10px rgba(15,23,42,0.08)",
                    ],
                  }}
                  transition={{
                    opacity: { delay: 1.55 + i * 0.12, duration: 0.4 },
                    y: { delay: 1.55 + i * 0.12, duration: 0.4 },
                    scale: {
                      delay: 2.4 + i * 2,
                      duration: 1.2,
                      repeat: Infinity,
                      repeatDelay: 4.8,
                      times: [0, 0.2, 0.5, 1],
                    },
                    boxShadow: {
                      delay: 2.4 + i * 2,
                      duration: 1.2,
                      repeat: Infinity,
                      repeatDelay: 4.8,
                      times: [0, 0.2, 0.5, 1],
                    },
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_2px_10px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${b.dot}`} />
                    <span className="text-lg font-semibold text-slate-900">
                      {b.dept}
                    </span>
                  </div>
                  <div className="mt-1 text-base leading-snug text-slate-500">
                    {b.action}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

export const slide14c: SlideEntry = {
  meta: {
    id: "14c-ai-builder-flow",
    title: "AI Builder: one smart step inside the flow",
    section: "Act 2 · The AI question",
    notes:
      "Same machine as the previous slide, with ONE smart step dropped into the pipeline.\n\nWalk it through: an email arrives, AI Builder reads it and answers a single question (support, sales or billing?), and the flow routes on the answer. Watch the branches light up: every email travels one of three known paths. The AI never decides WHAT happens next; it answers the question, the flow does the routing.\n\nThe mental model: predictable frame, smart filling. Because the output is structured (one category), the rest of the flow can safely build on it.\n\nLeft side, the other one-step jobs: classify, extract (invoice fields from a PDF), summarize, sentiment, translate. All well bounded, all return structure.\n\nSay: 'For most real automations, this is the sweet spot. You get the benefit of AI without giving up the deterministic backbone.' Next: what happens when you DO hand over the backbone.",
  },
  Component: AiBuilderFlowSlide,
};
