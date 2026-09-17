"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { CriteriaList } from "@/components/criteria-list";

const STEPS = [
  {
    kind: "Trigger",
    title: "When a new email arrives",
    app: "Office 365 Outlook",
    icon: "/icons/outlook.svg",
  },
  {
    kind: "Action",
    title: "Save attachments to SharePoint",
    app: "SharePoint",
    icon: "/icons/sharepoint.svg",
  },
  {
    kind: "Action",
    title: "Refresh a dataset",
    app: "Power BI",
    icon: "/icons/power-bi.svg",
  },
];

const POINTS = [
  "Same input, same result, every run",
  "Every step visible in run history",
  "Scales to thousands of runs a day",
];

function FlowCard({
  step,
  delay,
}: {
  step: (typeof STEPS)[number];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-[520px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-[0_2px_10px_rgba(15,23,42,0.08)]"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-50 p-2 ring-1 ring-slate-200/70">
        <img src={step.icon} alt="" className="h-full w-full object-contain" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-xl font-semibold leading-tight text-slate-900">
          {step.title}
        </div>
        <div className="mt-0.5 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
          {step.app} · {step.kind}
        </div>
      </div>
    </motion.div>
  );
}

function Connector({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="flex origin-top flex-col items-center"
    >
      <div className="h-3 w-px bg-slate-300" />
      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 bg-white font-mono text-[13px] leading-none text-slate-400">
        +
      </span>
      <div className="h-3 w-px bg-slate-300" />
    </motion.div>
  );
}

function PowerAutomateFlowSlide(_: SlideProps) {
  return (
    <SlideShell eyebrow="Tool spotlight · Power Automate">
      <div className="grid flex-1 grid-cols-12 items-center gap-10">
        {/* Left: title + points */}
        <div className="col-span-5 flex flex-col gap-7">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-semibold leading-[1.05] tracking-[-0.02em] text-slate-900"
              style={{ fontSize: "clamp(2.4rem, 4.8vw, 4.2rem)" }}
            >
              <span className="flex items-center gap-4">
                <img
                  src="/icons/power-automate.svg"
                  alt=""
                  className="h-14 w-14 shrink-0 object-contain"
                />
                <span>Power Automate,</span>
              </span>
              <span className="shimmer-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent">
                step by step.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-4 max-w-[40ch] text-xl leading-[1.5] text-slate-600"
            >
              You draw the path once. Every run follows it exactly, with no
              improvisation.
            </motion.p>
          </div>
          <CriteriaList
            size="lg"
            items={POINTS}
            accent="brand"
            marker="check"
            startDelay={0.6}
          />
        </div>

        {/* Right: the flow, Power Automate designer style */}
        <div className="col-span-7 flex flex-col items-center justify-center">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center">
              {i > 0 && <Connector delay={0.75 + i * 0.35} />}
              <FlowCard step={step} delay={0.6 + i * 0.35} />
            </div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.5 }}
            className="mt-6 flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-base font-medium text-emerald-800"
          >
            <span aria-hidden>✓</span>
            <span>Run succeeded: identical path, every single time</span>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  );
}

export const slide14b: SlideEntry = {
  meta: {
    id: "14b-power-automate-flow",
    title: "Power Automate, step by step",
    section: "Act 2 · The AI question",
    notes:
      "Recap beat, ten seconds, before AI enters the flow. A real flow drawn the way the Power Automate designer shows it: an email arrives, its attachments land in SharePoint, a Power BI dataset refreshes so the report is current. Three connectors, zero AI, real business value.\n\nGlide over the three points: deterministic (same input, same result, every run), auditable (run history shows every step), cheap at scale (thousands of runs a day, no reasoning cost).\n\nSay: 'This is what most business automation actually looks like. Nobody posts about it on LinkedIn, and nothing beats it for this kind of work. Now let's put AI into it.'",
  },
  Component: PowerAutomateFlowSlide,
};
