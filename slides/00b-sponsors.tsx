"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

const EASE = [0.22, 1, 0.36, 1] as const;

const SPONSORS = [
  { name: "High Monkey", src: "/sponsors/high-monkey.png" },
  { name: "Secure ITnet", src: "/sponsors/secure-itnet.png" },
  { name: "sdg", src: "/sponsors/sdg.png" },
  { name: "RBA", src: "/sponsors/rba.png" },
  { name: "ShareGate", src: "/sponsors/sharegate.png" },
  { name: "Atomic Data", src: "/sponsors/atomic-data.png" },
  { name: "SkyNorth Software", src: "/sponsors/skynorth-software.png" },
  { name: "Planet Technologies", src: "/sponsors/planet-technologies.png" },
];

function SponsorsSlide(_: SlideProps) {
  return (
    <SlideShell eyebrow="Sponsors" footerLeft="M365 Twin Cities 2026" showParticles={false}>
      <div className="flex h-full flex-col">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="flex items-center justify-between gap-8"
        >
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-brand-700">
              M365 Twin Cities 2026
            </p>
            <h1
              className="mt-3 font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
              style={{ fontSize: "clamp(2.4rem, 4.8vw, 4.4rem)" }}
            >
              Thank you to{" "}
              <span className="shimmer-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent">
                our sponsors.
              </span>
            </h1>
          </div>
          <img
            src="/sponsors/m365-twin-cities.jpg"
            alt="M365 Twin Cities"
            className="h-24 w-auto shrink-0 rounded-xl"
          />
        </motion.div>

        <div className="grid flex-1 grid-cols-4 items-center gap-6 pt-8">
          {SPONSORS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 220, damping: 22 }}
              className="flex h-40 items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
            >
              <img
                src={s.src}
                alt={s.name}
                className="max-h-full max-w-full object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

export const slide00b: SlideEntry = {
  meta: {
    id: "00b-sponsors",
    title: "Thank you to our sponsors",
    section: "Title",
    notes:
      "Before anything else: thank you to the sponsors who make M365 Twin Cities possible.\n\n• Call out any sponsor the organisers asked you to mention by name.\n• Fifteen seconds, then move on.",
  },
  Component: SponsorsSlide,
};
