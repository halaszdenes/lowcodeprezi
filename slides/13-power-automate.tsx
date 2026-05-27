"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

const CONNECTORS = [
  "SharePoint",
  "OneDrive",
  "Outlook / O365",
  "SQL",
  "Teams",
  "Dataverse",
  "1000+ more",
];

function PowerAutomateSlide(_: SlideProps) {
  return (
    <SlideShell eyebrow="Power Platform · Power Automate">
      <div className="grid h-full grid-cols-12 items-center gap-10">
        {/* Left: copy */}
        <div className="col-span-5 flex flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-violet-700">
              The wiring in the walls
            </p>
            <h1
              className="mt-4 font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
              style={{ fontSize: "clamp(2.8rem, 5.8vw, 5rem)" }}
            >
              Power Automate.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-slate-500">
              How it triggers
            </p>
            <p className="mt-2 text-2xl leading-snug text-slate-700">
              Event-based or scheduled — &ldquo;when X happens, do Y.&rdquo;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.65 }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-slate-500">
              Connectors
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CONNECTORS.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.8 + i * 0.06,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1.5 text-base font-medium text-violet-700"
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.4 }}
            className="rounded-xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur"
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
              Example
            </p>
            <p className="mt-2 text-xl leading-snug text-slate-800">
              Email arrives <span className="text-violet-600">→</span> save
              attachment to SharePoint.
            </p>
          </motion.div>
        </div>

        {/* Right: flow screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-7 flex items-center justify-center"
        >
          <div
            className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-slate-200 bg-white"
            style={{ aspectRatio: "2200 / 1239", width: "100%" }}
          >
            <img
              src="/pp-automate.png"
              alt="Power Automate flow editor showing a branching workflow with Copilot panel"
              className="block h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}

export const slide13: SlideEntry = {
  meta: {
    id: "13-power-automate",
    title: "Power Automate — the wiring",
    section: "Act 2 · The AI question",
    notes:
      "Tool 3 of 3. Power Automate is the boring magic — the stuff that runs at 2am while nobody's watching.\n\nSay: 'Third — Power Automate. This is the wiring in the walls. Trigger-action, or on a schedule. When email arrives, save the attachment to SharePoint. When a row gets added to a SQL table, send a Teams message. Thousands of connectors — Microsoft tools, third-party SaaS, custom APIs. This is what saves your colleagues the manual click-click-click work nobody wants to do.'\n\n~40s. End with: 'OK — three tools. That's most of the platform. Now back to the real question — what about AI?'",
  },
  Component: PowerAutomateSlide,
};
