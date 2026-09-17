"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

const PIPELINE = ["Trigger", "Action", "Action", "Result"];

// Three stations on the ring; the return edge itself is the "replan".
// Plan at 12 o'clock, Act at 3, Observe at 6 (clockwise flow),
// so the exit to "Task done" hangs directly off Observe.
const LOOP = [
  { label: "Plan", x: "50%", y: "0%" },
  { label: "Act", x: "100%", y: "50%" },
  { label: "Observe", x: "50%", y: "100%" },
];

function PanelHeader({
  label,
  tool,
  icon,
  chipClass,
  delay,
}: {
  label: string;
  tool: string;
  icon: string;
  chipClass: string;
  delay: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-display text-4xl font-semibold tracking-tight text-slate-900">
        {label}
      </h3>
      <motion.span
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay + 0.25, duration: 0.4 }}
        className={`flex items-center gap-2 rounded-full border bg-white/90 py-1.5 pl-2 pr-3.5 font-mono text-[13px] uppercase tracking-[0.18em] shadow-sm ${chipClass}`}
      >
        <img src={icon} alt="" className="h-5 w-5 object-contain" />
        {tool}
      </motion.span>
    </div>
  );
}

function DeterministicMachine() {
  return (
    <div className="relative mx-auto flex h-full w-60 flex-col items-center justify-center gap-5 py-2">
      {/* rail */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.95, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-3 left-1/2 w-[2px] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-200 via-brand-400 to-brand-200"
      />
      {/* the signal: same path, every run */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          top: ["4%", "34%", "34%", "63%", "63%", "94%"],
          opacity: [0, 1, 1, 1, 1, 0],
        }}
        transition={{
          delay: 1.8,
          duration: 4.6,
          times: [0, 0.24, 0.34, 0.58, 0.68, 1],
          repeat: Infinity,
          repeatDelay: 0.6,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 z-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-500 shadow-[0_0_14px_rgba(9,132,227,0.85)]"
      />
      {PIPELINE.map((node, i) => (
        <motion.div
          key={`${node}-${i}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 + i * 0.14, duration: 0.45 }}
          className={`relative z-10 w-52 rounded-xl border px-4 py-2.5 text-center font-medium shadow-sm ${
            i === PIPELINE.length - 1
              ? "border-brand-600 bg-brand-600 text-white"
              : "border-brand-200 bg-white text-brand-900"
          }`}
        >
          {node}
        </motion.div>
      ))}
    </div>
  );
}

function AgenticMachine() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1.5">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.45 }}
        className="z-10 rounded-xl border border-emerald-200 bg-white px-5 py-2 text-center font-medium text-emerald-900 shadow-sm"
      >
        Task
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15 }}
        className="text-emerald-400"
        aria-hidden
      >
        ↓
      </motion.span>

      {/* the loop: it circles until it's done */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative my-4 h-[200px] w-[200px]"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-300"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
        </motion.div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="block font-mono text-xs uppercase tracking-[0.2em] text-emerald-700">
            reasoning
          </span>
          <span className="block font-mono text-xs uppercase tracking-[0.2em] text-emerald-700">
            loop{" "}
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              ↻
            </motion.span>
          </span>
        </div>

        {LOOP.map((node, i) => (
          <div
            key={node.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: node.x, top: node.y }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.35 + i * 0.12,
                type: "spring",
                stiffness: 220,
                damping: 20,
              }}
              className="block whitespace-nowrap rounded-full border border-emerald-200 bg-white px-3.5 py-1.5 text-base font-medium text-emerald-900 shadow-sm"
            >
              {node.label}
            </motion.span>
          </div>
        ))}

        {/* the return edge is the replan */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: "0%", top: "50%" }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.75, duration: 0.4 }}
            className="block whitespace-nowrap rounded-full border border-dashed border-emerald-300 bg-emerald-50/90 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.15em] text-emerald-700"
          >
            replan ↺
          </motion.span>
        </div>
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.75 }}
        className="text-emerald-400"
        aria-hidden
      >
        ↓
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.85, duration: 0.45 }}
        className="z-10 rounded-xl border border-emerald-600 bg-emerald-600 px-5 py-2 text-center font-medium text-white shadow-sm"
      >
        Task done
      </motion.div>
    </div>
  );
}

function DeterministicVsAgenticSlide(_: SlideProps) {
  return (
    <SlideShell eyebrow="The core difference">
      <div className="flex flex-1 flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-semibold leading-[1.05] tracking-[-0.02em] text-slate-900"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.2rem)" }}
        >
          Two different{" "}
          <span className="shimmer-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent">
            machines.
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-3 max-w-[60ch] text-xl text-slate-600"
        >
          Pick based on how the work behaves, not on which one is newer.
        </motion.p>

        <div className="relative mt-6 grid flex-1 grid-cols-2 gap-8">
          {/* Deterministic panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col overflow-hidden rounded-3xl border border-brand-200/70 p-6 shadow-sm backdrop-blur-sm"
            style={{
              background:
                "linear-gradient(165deg, rgba(9, 132, 227, 0.07) 0%, rgba(255, 255, 255, 0.85) 55%)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-400 to-brand-600" />
            <PanelHeader
              label="Deterministic"
              tool="Power Automate"
              icon="/icons/power-automate.svg"
              chipClass="border-brand-200 text-brand-700"
              delay={0.5}
            />
            <div className="min-h-0 flex-1 py-3">
              <DeterministicMachine />
            </div>
            <p className="text-lg leading-snug text-slate-600">
              You design every step. It never improvises, and that&apos;s the
              point.
            </p>
          </motion.div>

          {/* Agentic panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col overflow-hidden rounded-3xl border border-teal-200/70 p-6 shadow-sm backdrop-blur-sm"
            style={{
              background:
                "linear-gradient(195deg, rgba(13, 148, 136, 0.07) 0%, rgba(255, 255, 255, 0.85) 55%)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald-500 to-teal-500" />
            <PanelHeader
              label="Agentic"
              tool="Copilot Studio"
              icon="/icons/copilot-studio.svg"
              chipClass="border-teal-200 text-teal-700"
              delay={0.65}
            />
            <div className="min-h-0 flex-1 py-3">
              <AgenticMachine />
            </div>
            <p className="text-lg leading-snug text-slate-600">
              You hand it a task. It works out the steps and loops until
              it&apos;s done.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.4 }}
              className="mt-3 flex items-center gap-1.5 border-t border-teal-100 pt-3 text-sm font-medium leading-snug text-emerald-700"
            >
              <span aria-hidden>↳</span>
              <span>Can be made more deterministic, too</span>
            </motion.div>
          </motion.div>

          {/* center seam badge */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.1,
                type: "spring",
                stiffness: 240,
                damping: 18,
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white font-mono text-[13px] font-semibold uppercase tracking-wide text-slate-500 shadow-md"
            >
              vs
            </motion.div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

export const slide14e: SlideEntry = {
  meta: {
    id: "14e-deterministic-vs-agentic",
    title: "Deterministic vs. agentic",
    section: "Act 2 · The AI question",
    notes:
      "The conceptual core of this block. Slow down here.\n\nLeft: Power Automate is a PIPELINE. You laid the rails; the train only goes where the rails go. Predictable, auditable, cheap at volume. Boring, in the best sense of the word.\n\nRight: a Copilot Studio agent runs a reasoning loop: plan, act, observe, replan, calling tools and knowledge until it can answer. Flexible, but every run can differ, and you pay for that in control and in cost.\n\nIf someone asks: Copilot Studio is not only the loop. It also supports classic topic-based authoring, and Microsoft itself recommends mixing deterministic steps, human approval points and fully AI-driven parts inside one agent. You decide how much you hand to the AI.\n\nThe takeaway for THIS talk: neither machine is better; they fit different problems. AI is already inside the platform, in both shapes. Then the turn: 'So AI runs inside your solutions now. But there's something more radical coming: AI doesn't just run inside what you build. It can build it.' Click to 'Something is even lower than low-code'.",
  },
  Component: DeterministicVsAgenticSlide,
};
