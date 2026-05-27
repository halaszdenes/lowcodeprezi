"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

const TOOLS = [
  { name: "Power BI", desc: "Data analysis & visualization" },
  { name: "Power Apps", desc: "Build custom business apps · drag-and-drop UI" },
  { name: "Power Automate", desc: "Automate workflows · triggered or scheduled" },
  { name: "Power Pages", desc: "External-facing portals without bothering the web team" },
  { name: "Copilot Studio", desc: "Build custom AI agents — wired into the rest" },
];

function PowerPlatformGlanceSlide(_: SlideProps) {
  return (
    <SlideShell eyebrow="Power Platform — at a glance">
      <div className="grid h-full grid-cols-12 items-center gap-10">
        {/* Left: title + tool list */}
        <div className="col-span-7 flex flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-violet-700">
              Microsoft&apos;s low-code family
            </p>
            <h1
              className="mt-4 font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
              style={{ fontSize: "clamp(2.6rem, 5.4vw, 4.8rem)" }}
            >
              <span className="shimmer-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
                Power Platform.
              </span>
            </h1>
          </motion.div>

          <ul className="flex flex-col gap-4">
            {TOOLS.map((tool, i) => (
              <motion.li
                key={tool.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.5 + i * 0.12,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-baseline gap-4"
              >
                <span className="font-display text-xl font-semibold text-slate-900 sm:text-2xl">
                  {tool.name}
                </span>
                <span className="text-base text-slate-600 sm:text-lg">
                  — {tool.desc}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right: circular diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-5 flex items-center justify-center"
        >
          <img
            src="/pp-glance.png"
            alt="Power Platform — Power BI, Power Apps, Power Automate, Power Pages, Copilot Studio arranged around the Power Platform logo"
            className="block h-auto w-full"
            style={{ maxWidth: "520px" }}
          />
        </motion.div>
      </div>
    </SlideShell>
  );
}

export const slide10: SlideEntry = {
  meta: {
    id: "10-power-platform-glance",
    title: "Power Platform at a glance",
    section: "Act 2 · The AI question",
    notes:
      "The overview. Audience now has a face for the words. Five logos, one family, all wired into Microsoft 365 and each other.\n\nSay: 'Power Platform is the umbrella. Power BI for data and dashboards. Power Apps to build the actual tools your team uses. Power Automate for workflows that run in the background. Plus Power Pages for portals and Copilot Studio for AI agents — those are newer but same family.'\n\nDon't deep-dive here. Each tool gets its own slide next. ~30s.",
  },
  Component: PowerPlatformGlanceSlide,
};
