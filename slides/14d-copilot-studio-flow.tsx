"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

const TRAITS = [
  "Picks its own tools",
  "Handles intents you didn't predict",
  "Asks follow-ups when unsure",
  "Grounded in your knowledge",
];

// Spoke connectors: agent hub (bottom center of the agent card) to each
// tool card, drawn as dashed paths with arrowheads on BOTH ends: every
// tool call returns its result to the reasoning loop.
const SPOKE_W = 700;
const SPOKE_H = 84;
const SPOKE_XS = [117, 350, 583];

type Tool = {
  title: string;
  sub: string;
  label: string;
  optional?: boolean;
  icon?: string;
};

const TOOLS: Tool[] = [
  {
    title: "Check the knowledge",
    sub: "Policies, manuals, past cases",
    label: "usually first",
    icon: "/icons/sharepoint.svg",
  },
  {
    title: "Open a ServiceNow ticket",
    sub: "Logs the incident, details extracted",
    label: "if it's an incident",
    optional: true,
  },
  {
    title: "Reply to the customer",
    sub: "Sends the drafted answer",
    label: "every email",
    icon: "/icons/outlook.svg",
  },
];

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  return (
    <div className="flex w-52 flex-col items-center">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 + index * 0.12, duration: 0.3 }}
        className="mb-1.5 font-mono text-xs uppercase tracking-[0.18em] text-emerald-600"
      >
        {tool.label}
      </motion.span>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: [1, 1, 1.05, 1],
          boxShadow: [
            "0 2px 10px rgba(15,23,42,0.08)",
            "0 2px 10px rgba(15,23,42,0.08)",
            "0 4px 18px rgba(13,148,136,0.28)",
            "0 2px 10px rgba(15,23,42,0.08)",
          ],
        }}
        transition={{
          opacity: { delay: 1.8 + index * 0.12, duration: 0.4 },
          y: { delay: 1.8 + index * 0.12, duration: 0.4 },
          scale: {
            delay: 2.8 + index * 1.6,
            duration: 1.1,
            repeat: Infinity,
            repeatDelay: 4.8,
            times: [0, 0.2, 0.5, 1],
          },
          boxShadow: {
            delay: 2.8 + index * 1.6,
            duration: 1.1,
            repeat: Infinity,
            repeatDelay: 4.8,
            times: [0, 0.2, 0.5, 1],
          },
        }}
        className={`relative w-full rounded-xl bg-white px-4 py-3 shadow-[0_2px_10px_rgba(15,23,42,0.08)] ${
          tool.optional
            ? "border border-dashed border-slate-300"
            : "border border-slate-200"
        }`}
      >
        <div className="flex items-center gap-3">
          {tool.icon ? (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-50 p-1.5 ring-1 ring-slate-200/70">
              <img
                src={tool.icon}
                alt=""
                className="h-full w-full object-contain"
              />
            </span>
          ) : (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#032d42] font-mono text-sm font-bold text-[#81b5a1]">
              SN
            </span>
          )}
          <div>
            <div className="text-lg font-semibold leading-tight text-slate-900">
              {tool.title}
            </div>
            <div className="mt-0.5 text-sm leading-snug text-slate-500">
              {tool.sub}
            </div>
          </div>
        </div>
        {tool.optional && (
          <span className="absolute -right-2 -top-2.5 rounded-full border border-slate-200 bg-white px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 shadow-sm">
            optional
          </span>
        )}
      </motion.div>
    </div>
  );
}

function CopilotStudioFlowSlide(_: SlideProps) {
  return (
    <SlideShell eyebrow="Tool spotlight · Copilot Studio">
      <div className="grid flex-1 grid-cols-12 items-center gap-10">
        {/* Left: title + traits */}
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
                src="/icons/copilot-studio.svg"
                alt=""
                className="h-14 w-14 shrink-0 object-contain"
              />
              <span>One agent,</span>
            </span>
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-500 bg-clip-text text-transparent">
              many paths.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="max-w-[40ch] text-xl leading-[1.5] text-slate-600"
          >
            You don&apos;t draw the branches. The agent reads each email,
            identifies the intent, and calls its tools: every result comes back
            to the loop, and it decides again.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex flex-col gap-2.5"
          >
            <span className="font-mono text-[13px] uppercase tracking-[0.25em] text-emerald-700">
              What makes it agentic
            </span>
            <div className="flex flex-wrap gap-2">
              {TRAITS.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.75 + i * 0.07, duration: 0.3 }}
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-base font-medium text-emerald-700"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: the agent hub */}
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

          {/* One-way arrow in: the only connector that doesn't return */}
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.3 }}
            width="14"
            height="26"
            viewBox="0 0 14 26"
            fill="none"
            aria-hidden
          >
            <line
              x1="7"
              y1="0"
              x2="7"
              y2="18"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            <path d="M 2 17 L 7 25 L 12 17 z" fill="#94a3b8" />
          </motion.svg>

          {/* Agent hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.95, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex w-[470px] items-center gap-4 rounded-xl border border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-3.5 shadow-[0_2px_14px_rgba(13,148,136,0.18)] ring-2 ring-emerald-200"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white p-2 ring-1 ring-emerald-200">
              <img
                src="/icons/copilot-studio.svg"
                alt=""
                className="h-full w-full object-contain"
              />
            </span>
            <div>
              <div className="text-lg font-semibold leading-tight text-slate-900">
                Agent identifies the intent
              </div>
              <div className="mt-0.5 font-mono text-xs uppercase tracking-[0.2em] text-emerald-600">
                Copilot Studio · question / complaint / incident?
              </div>
            </div>
            <span className="absolute -right-2.5 -top-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.15em] text-white shadow">
              ↻ reasoning
            </span>
          </motion.div>

          {/* Bidirectional spokes: call goes out, result comes back */}
          <svg
            width="100%"
            height={SPOKE_H}
            viewBox={`0 0 ${SPOKE_W} ${SPOKE_H}`}
            className="max-w-[700px]"
            fill="none"
            aria-hidden
          >
            <defs>
              <marker
                id="cs-spoke-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
            </defs>
            {SPOKE_XS.map((x, i) => (
              <motion.path
                key={x}
                d={
                  x === SPOKE_W / 2
                    ? `M ${SPOKE_W / 2} 6 L ${x} ${SPOKE_H - 6}`
                    : `M ${SPOKE_W / 2} 6 C ${SPOKE_W / 2} ${SPOKE_H * 0.55}, ${x} ${SPOKE_H * 0.35}, ${x} ${SPOKE_H - 6}`
                }
                stroke="#34d399"
                strokeWidth="2"
                strokeDasharray="5 5"
                markerStart="url(#cs-spoke-arrow)"
                markerEnd="url(#cs-spoke-arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1.4 + i * 0.15, duration: 0.5 }}
              />
            ))}
          </svg>

          {/* Tools */}
          <div className="flex items-start gap-6">
            {TOOLS.map((tool, i) => (
              <ToolCard key={tool.title} tool={tool} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

export const slide14d: SlideEntry = {
  meta: {
    id: "14d-copilot-studio-flow",
    title: "Copilot Studio: one agent, many paths",
    section: "Act 2 · The AI question",
    notes:
      "The agent version of the same email problem. You don't draw the branches: the agent reads each email, works out the intent and calls its tools; every result comes back to the loop and it decides again. Watch the spokes pulse: knowledge first, a ticket if it's an incident, a reply every time.\n\nTraits on the left: picks its own tools, handles intents you didn't predict, asks follow-ups when unsure, grounded in your own knowledge.\n\nSay: 'Powerful. And every run can be different. That flexibility is exactly what you pay for, in control and in cost.' Keep it to 45 seconds; the next slide makes the comparison explicit.",
  },
  Component: CopilotStudioFlowSlide,
};
