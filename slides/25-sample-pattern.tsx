"use client";

import { Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

type Risk = "low" | "medium" | "high";

type Sample = { num: number; risk: Risk };

const ELLIPSIS = Symbol("ellipsis");
type Slot = Sample | typeof ELLIPSIS;

// Eight visible samples + an ellipsis in the middle to imply "many more between"
const SAMPLES: Sample[] = [
  { num: 1, risk: "low" },
  { num: 2, risk: "low" },
  { num: 3, risk: "medium" },
  { num: 4, risk: "high" }, // high-risk #1
  { num: 5, risk: "low" },
  { num: 48, risk: "medium" },
  { num: 49, risk: "high" }, // high-risk #2
  { num: 50, risk: "low" },
];

const ORIGINAL_ORDER: Slot[] = [
  SAMPLES[0], // 1
  SAMPLES[1], // 2
  SAMPLES[2], // 3
  SAMPLES[3], // 4 ← HIGH
  SAMPLES[4], // 5
  ELLIPSIS,
  SAMPLES[5], // 48
  SAMPLES[6], // 49 ← HIGH
  SAMPLES[7], // 50
];

// Risk-weighted: high-risk samples jumped to front, others maintain FIFO
const NEW_ORDER: Slot[] = [
  SAMPLES[3], // 4 (high)
  SAMPLES[6], // 49 (high)
  SAMPLES[0], // 1
  SAMPLES[1], // 2
  SAMPLES[2], // 3
  ELLIPSIS,
  SAMPLES[4], // 5
  SAMPLES[5], // 48
  SAMPLES[7], // 50
];

const RISK_COLOR: Record<Risk, string> = {
  low: "#10b981", // emerald
  medium: "#f59e0b", // amber
  high: "#ef4444", // red
};

const RISK_BG: Record<Risk, string> = {
  low: "#d1fae5",
  medium: "#fef3c7",
  high: "#fee2e2",
};

function SamplePaperBag({ risk, num }: { risk: Risk; num: number }) {
  const color = RISK_COLOR[risk];
  return (
    <svg width="74" height="90" viewBox="0 0 34 42" fill="none" aria-hidden>
      <ellipse cx="17" cy="40" rx="11" ry="1.2" fill="#000" opacity="0.08" />
      <path
        d="M5 11 L29 11 L28 39 Q28 40 27 40 L7 40 Q6 40 6 39 Z"
        fill="#d4b08c"
        stroke="#7a5a3a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M5 11 L29 11 L26.5 6.5 Q17 4.5 7.5 6.5 Z"
        fill="#a07b48"
        stroke="#7a5a3a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <line
        x1="17"
        y1="11"
        x2="17"
        y2="40"
        stroke="#7a5a3a"
        strokeWidth="0.5"
        opacity="0.45"
      />
      <path
        d="M7 13 L7 38"
        stroke="#e8c9a3"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="17" cy="25" r="8" fill={color} stroke="#ffffff" strokeWidth="1.5" />
      <text
        x="17"
        y="28.5"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
        fontSize="9.5"
        fontWeight="800"
        fill="#ffffff"
      >
        {num}
      </text>
    </svg>
  );
}

function SampleColumn({
  sample,
  position,
  flagged,
}: {
  sample: Sample;
  position: number;
  flagged: boolean;
}) {
  return (
    <motion.div
      layoutId={`sample-${sample.num}`}
      transition={{
        layout: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
      }}
      className="relative flex flex-col items-center gap-2"
      style={{ minWidth: 84 }}
    >
      <div
        className={`flex h-10 w-16 items-center justify-center rounded-md border-2 font-mono text-base font-bold ${
          flagged
            ? "border-red-400 bg-red-50 text-red-700"
            : "border-slate-200 bg-white text-slate-700"
        }`}
      >
        {sample.num}
      </div>
      <SamplePaperBag risk={sample.risk} num={sample.num} />
      <div
        className="h-3 w-3 rounded-full"
        style={{ background: RISK_COLOR[sample.risk] }}
      />
    </motion.div>
  );
}

function EllipsisColumn() {
  return (
    <div className="flex flex-col items-center justify-center" style={{ minWidth: 56 }}>
      <span className="font-mono text-4xl text-slate-300">…</span>
    </div>
  );
}

function SampleRow({
  label,
  slots,
  flaggedNums,
}: {
  label: string;
  slots: Slot[];
  flaggedNums: number[];
}) {
  return (
    <div className="flex items-start gap-5">
      <div className="w-32 shrink-0 pt-2">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
          Order
        </div>
        <div className="text-lg font-semibold text-slate-700">{label}</div>
      </div>
      <div className="flex flex-1 items-end justify-around">
        {slots.map((slot, i) => {
          if (slot === ELLIPSIS) {
            return <EllipsisColumn key={`ellipsis-${i}`} />;
          }
          return (
            <SampleColumn
              key={slot.num}
              sample={slot}
              position={i}
              flagged={flaggedNums.includes(slot.num)}
            />
          );
        })}
      </div>
    </div>
  );
}

function HighRiskLabel({ leftPct }: { leftPct: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.92 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="absolute"
      style={{ left: `${leftPct}%`, top: 0, transform: "translateX(-50%)" }}
    >
      <div className="relative">
        <div className="rounded-lg bg-red-600 px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-white shadow-lg">
          High risk
          <br />
          of non-approval
        </div>
        {/* Tip pointing down */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: -8,
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "8px solid #dc2626",
          }}
        />
      </div>
    </motion.div>
  );
}

function Arrow({
  fromPct,
  toPct,
}: {
  fromPct: number;
  toPct: number;
}) {
  // SVG arrow from top of middle band (at fromPct horizontal position) to bottom (at toPct)
  const SVG_W = 1000; // arbitrary viewport width for path math
  const SVG_H = 120;
  const x1 = (fromPct / 100) * SVG_W;
  const x2 = (toPct / 100) * SVG_W;
  const y1 = 0;
  const y2 = SVG_H - 12;
  // bezier control points for smooth diagonal
  const cp1y = SVG_H * 0.5;
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      width="100%"
      height={SVG_H}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      preserveAspectRatio="none"
      className="absolute inset-x-0 pointer-events-none"
      style={{ top: 0 }}
    >
      <defs>
        <marker
          id={`arrowhead-${fromPct}-${toPct}`}
          markerWidth="10"
          markerHeight="10"
          refX="6"
          refY="5"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#dc2626" />
        </marker>
      </defs>
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        d={`M ${x1} ${y1} C ${x1} ${cp1y}, ${x2} ${cp1y}, ${x2} ${y2}`}
        stroke="#dc2626"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        markerEnd={`url(#arrowhead-${fromPct}-${toPct})`}
      />
    </motion.svg>
  );
}

function SamplePatternScene({ step }: { step: number }) {
  // Step 0: top row visible
  // Step 1: first high-risk label (over sample 4 in top row)
  // Step 2: second high-risk label (over sample 49 in top row)
  // Step 3: arrows draw down to new positions
  // Step 4: bottom row appears

  const showLabel1 = step >= 1;
  const showLabel2 = step >= 2;
  const showArrows = step >= 3;
  const showBottomRow = step >= 4;

  // Each row has 9 slots (8 samples + 1 ellipsis). Each slot's horizontal
  // center (% of the row width) — approximated for arrow positioning.
  // Row uses justify-around so positions are evenly spread.
  // Position N out of 9 → center at (N + 0.5) / 9.
  const slotCenterPct = (idx: number) => ((idx + 0.5) / 9) * 100;

  // Top row positions for high-risk samples (4 is index 3, 49 is index 7)
  const sample4TopX = slotCenterPct(3);
  const sample49TopX = slotCenterPct(7);

  // Bottom row positions (NEW_ORDER): 4 is index 0, 49 is index 1
  const sample4BottomX = slotCenterPct(0);
  const sample49BottomX = slotCenterPct(1);

  const flagged = [4, 49];

  return (
    <div className="flex h-full flex-col gap-3">
      <div>
        <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-slate-900">
          The pattern across many samples
        </h1>
        <p className="mt-2 max-w-[68ch] text-base text-slate-600">
          50 samples come in over time. The original FIFO order is on top; the
          risk-weighted re-order is on the bottom.
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-4 pt-2">
        {/* Top row */}
        <div className="relative pt-24">
          {/* High-risk labels float above this row */}
          <div className="absolute left-32 right-0 top-0 h-24">
            <AnimatePresence>
              {showLabel1 && (
                <HighRiskLabel key="label-4" leftPct={sample4TopX} />
              )}
              {showLabel2 && (
                <HighRiskLabel key="label-49" leftPct={sample49TopX} />
              )}
            </AnimatePresence>
          </div>

          <SampleRow
            label="Original (FIFO)"
            slots={ORIGINAL_ORDER}
            flaggedNums={flagged}
          />
        </div>

        {/* Middle band with arrows */}
        <div className="relative h-28">
          <div className="absolute left-32 right-0 h-full">
            <AnimatePresence>
              {showArrows && (
                <Fragment key="arrows">
                  <Arrow fromPct={sample4TopX} toPct={sample4BottomX} />
                  <Arrow fromPct={sample49TopX} toPct={sample49BottomX} />
                </Fragment>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom row */}
        <div className="relative">
          <AnimatePresence>
            {showBottomRow && (
              <motion.div
                key="bottom-row"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <SampleRow
                  label="New (risk-first)"
                  slots={NEW_ORDER}
                  flaggedNums={flagged}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SamplePatternSlide({ step }: SlideProps) {
  return (
    <SlideShell
      eyebrow="Proof · The reorder pattern"
      showAmbient={false}
      showParticles={false}
    >
      <SamplePatternScene step={step} />
    </SlideShell>
  );
}

export const slide25: SlideEntry = {
  meta: {
    id: "17-sample-pattern",
    title: "Sample pattern — FIFO vs risk-weighted",
    section: "Act 3 · Proof",
    steps: 5,
    notes:
      "Extra visual aid showing the reorder pattern across many sampling rounds (not just one round like slides 14-15). 5 click steps:\n\n• Step 1 (load): Top row only — samples 1, 2, 3, 4, 5, …, 48, 49, 50 in FIFO order. Each shown as: number box + paper bag + small status dot (green/amber/red for low/medium/high risk). Samples 4 and 49 already styled as flagged (red border on the number box).\n• Step 2: First red 'HIGH RISK / OF NON-APPROVAL' label appears above sample 4 with a pointing tip.\n• Step 3: Second 'HIGH RISK' label appears above sample 49.\n• Step 4: Two red curved arrows draw from the labels down to where samples 4 and 49 will land in the new order.\n• Step 5: Bottom row fades up — samples reordered as 4, 49, 1, 2, 3, …, 5, 48, 50. High-risk samples now at the front of the queue.\n\nKey lines to land:\n— 'This is one sampling round multiplied by hundreds. Same pattern.'\n— 'We didn't change WHAT we inspect — only the ORDER.'\n— 'Two lines of Power Apps code. That's it.'",
  },
  Component: SamplePatternSlide,
};
