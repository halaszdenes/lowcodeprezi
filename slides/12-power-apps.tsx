"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

const USE_CASES = [
  "Data entry & approvals",
  "Booking systems: desks, parking, meeting rooms",
  "Employee requests: expenses, home office, holiday",
];

function PowerAppsSlide(_: SlideProps) {
  return (
    <SlideShell eyebrow="Power Platform · Power Apps">
      <div className="grid h-full grid-cols-12 items-center gap-10">
        {/* Left: copy */}
        <div className="col-span-5 flex flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-brand-700">
              Build the actual tool
            </p>
            <h1
              className="mt-4 font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
              style={{ fontSize: "clamp(2.8rem, 5.8vw, 5rem)" }}
            >
              Power Apps.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-slate-500">
              Canvas Apps
            </p>
            <p className="mt-2 text-2xl leading-snug text-slate-700">
              Drag-and-drop UI · forms, buttons, galleries.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.65 }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-slate-500">
              Typical use cases
            </p>
            <ul className="mt-3 flex flex-col gap-3">
              {USE_CASES.map((u, i) => (
                <motion.li
                  key={u}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.8 + i * 0.1,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-3 text-xl text-slate-800"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                  {u}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Right: studio screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-7 flex items-center justify-center"
        >
          <div
            className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-slate-200 bg-white"
            style={{ aspectRatio: "1664 / 928", width: "100%" }}
          >
            <img
              src="/pp-apps.png"
              alt="Power Apps Studio canvas showing a Power Apps app with Copilot side panel"
              className="block h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}

export const slide12: SlideEntry = {
  meta: {
    id: "12-power-apps",
    title: "Power Apps: build the tool",
    section: "Act 2 · The AI question",
    notes:
      "Second: Power Apps. This is where you build the actual tools your team uses. Canvas apps means you drag and drop the interface: forms, buttons, galleries.\n\n• Typical use cases: data entry and approvals, booking desks and parking, requesting holiday or expenses.\n• These are the unsexy line-of-business apps every company has fifty of, and they pay your salary.",
  },
  Component: PowerAppsSlide,
};
