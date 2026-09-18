"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

// US annual base pay, 2026. Typical band = 25th to 75th percentile.
// Glassdoor's $175k Power Platform figure (104 samples) is left out as an outlier.
const SCALE = { min: 80, max: 170 }; // $k
const TICKS = [80, 100, 120, 140, 160];

type Row = {
  role: string;
  band: [number, number];
  sources: string;
  color: string;
  soft: string;
};

const ROWS: Row[] = [
  {
    role: "Software developer",
    band: [97, 158],
    sources: "Glassdoor, typical range",
    color: "#475569",
    soft: "#94a3b8",
  },
  {
    role: "Power Platform developer",
    band: [98, 136],
    sources: "Salary.com and ZipRecruiter, typical range",
    color: "#0984e3",
    soft: "#2d95e6",
  },
];

const pct = (v: number) => ((v - SCALE.min) / (SCALE.max - SCALE.min)) * 100;
const EASE = [0.22, 1, 0.36, 1] as const;

function SalaryRow({ row }: { row: Row }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="grid grid-cols-12 items-center gap-8"
    >
      <div className="col-span-4">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
          {row.role}
        </div>
        <div
          className="mt-1 font-display font-semibold leading-none tracking-tight"
          style={{ fontSize: "clamp(2.2rem, 4.2vw, 3.6rem)", color: row.color }}
        >
          ${row.band[0]}k to ${row.band[1]}k
        </div>
        <div className="mt-2 text-base text-slate-600">{row.sources}</div>
      </div>

      <div className="col-span-8">
        <div className="relative h-20">
          {/* ticks */}
          {TICKS.map((t) => (
            <div
              key={t}
              className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${pct(t)}%` }}
            >
              <span className="font-mono text-sm font-semibold uppercase tracking-[0.15em] text-slate-700">
                ${t}k
              </span>
              <span className="mt-1 h-2.5 w-px bg-slate-500" />
            </div>
          ))}
          {/* track */}
          <div className="absolute inset-x-0 top-[38px] h-1.5 rounded-full bg-slate-200" />
          {/* band */}
          <div
            className="absolute top-[30px] h-[22px]"
            style={{
              left: `${pct(row.band[0])}%`,
              width: `${pct(row.band[1]) - pct(row.band[0])}%`,
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="h-full w-full origin-left rounded-full shadow-sm"
              style={{ background: row.soft }}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="absolute left-0 top-full mt-2 -translate-x-1/2 font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: row.color }}
            >
              ${row.band[0]}k
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="absolute right-0 top-full mt-2 translate-x-1/2 font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: row.color }}
            >
              ${row.band[1]}k
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SalariesSlide({ step }: SlideProps) {
  const shown = Math.min(step, ROWS.length);
  return (
    <SlideShell eyebrow="Act 1 · Salaries" showParticles={false}>
      <div className="flex h-full flex-col">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-brand-700">
            The numbers
          </p>
          <h1
            className="mt-3 font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
            style={{ fontSize: "clamp(2.4rem, 4.8vw, 4.4rem)" }}
          >
            Same ballpark.{" "}
            <span className="shimmer-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent">
              None of the grind.
            </span>
          </h1>
        </motion.div>

        <div className="flex flex-1 flex-col justify-center gap-12">
          <AnimatePresence initial={false}>
            {ROWS.slice(0, shown).map((row) => (
              <SalaryRow key={row.role} row={row} />
            ))}
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400"
        >
          US annual base pay, 2026 · Glassdoor, ZipRecruiter, Salary.com · self-reported
        </motion.p>
      </div>
    </SlideShell>
  );
}

export const slide02b: SlideEntry = {
  meta: {
    id: "02b-salaries",
    title: "Salaries: same ballpark",
    section: "Act 1 · Setup",
    steps: 3,
    notes:
      "Pays off the 'comparable salaries' card from the previous slide with real 2026 numbers. Two rows on one shared scale, one click each; the scale alone is on screen at load.\n\n• Step 1 (load): Title + the $80k to $160k scale. Say: 'I promised numbers. US base pay, 2026, three big salary sites.'\n• Step 2: Software developer row. Say: 'A software developer: typically $97k to $158k.'\n• Step 3: Power Platform developer row. Say: 'A Power Platform developer: typically $98k to $136k. Same ballpark. And you got there without four years of computer science and a decade of grinding.'\n\nIf someone asks about entry level: be straight. Junior software developers currently report around $90k to $100k, junior Power Platform developers around $70k to $87k. The low-code advantage at entry is speed, not pay: you get in within months, and mid-career the gap closes. Glassdoor also lists Power Platform developers at $175k, but on 104 samples, so it's left off the slide on purpose.\n\nSources: Glassdoor (software developer $123,244; typical range $96,952 to $158,343), Salary.com (Power Platform developer $108,151; $98,167 to $116,903), ZipRecruiter (Microsoft Power Platform developer $123,611; $113k to $136k). All 2026.",
  },
  Component: SalariesSlide,
};
