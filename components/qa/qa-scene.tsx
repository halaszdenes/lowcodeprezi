"use client";

import { animate, AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export type Scenario = "disaster" | "fix";

type ProductShapeKind = "brick" | "capsule" | "hex";

const LINE_CONFIG = [
  {
    name: "Line A",
    risk: "low" as const,
    color: "#3b82f6",
    colorLight: "#dbeafe",
    riskLabel: "low",
    shape: "brick" as ProductShapeKind,
  },
  {
    name: "Line B",
    risk: "low" as const,
    color: "#10b981",
    colorLight: "#d1fae5",
    riskLabel: "low",
    shape: "capsule" as ProductShapeKind,
  },
  {
    name: "Line C",
    risk: "high" as const,
    color: "#f59e0b",
    colorLight: "#fef3c7",
    riskLabel: "high",
    shape: "hex" as ProductShapeKind,
  },
];

const SCRAP_COLOR = "#ef4444";

type RiskBadgeMode = "none" | "all" | "high-only";

type State = {
  lineUnits: [number, number, number];
  sampledAtUnit: number | null;
  queue: number[];
  verdicts: { line: number; passed: boolean }[];
  scrapped: { line: number; from: number; to: number } | null;
  scrapStat: number | null;
  riskBadges: RiskBadgeMode;
  showSubtitle: boolean;
  showComparison: boolean;
};

function compute(scenario: Scenario, step: number): State {
  const base: State = {
    lineUnits: [3, 3, 3],
    sampledAtUnit: null,
    queue: [],
    verdicts: [],
    scrapped: null,
    scrapStat: null,
    riskBadges: scenario === "fix" ? "all" : "none",
    showSubtitle: scenario === "fix",
    showComparison: false,
  };

  if (scenario === "disaster") {
    // 9 steps total (0..8) — each inspection gets a "production continues" beat before it
    if (step === 0) return base;
    if (step === 1)
      // sample taken — bags fly into queue
      return {
        ...base,
        lineUnits: [4, 4, 4],
        sampledAtUnit: 4,
        queue: [0, 1, 2],
      };
    if (step === 2)
      // production continues, no QA action yet
      return {
        ...base,
        lineUnits: [5, 5, 5],
        sampledAtUnit: 4,
        queue: [0, 1, 2],
      };
    if (step === 3)
      // inspect sample 1 — pass
      return {
        ...base,
        lineUnits: [6, 6, 6],
        sampledAtUnit: 4,
        queue: [1, 2],
        verdicts: [{ line: 0, passed: true }],
      };
    if (step === 4)
      // production continues before sample 2
      return {
        ...base,
        lineUnits: [7, 7, 7],
        sampledAtUnit: 4,
        queue: [1, 2],
        verdicts: [{ line: 0, passed: true }],
      };
    if (step === 5)
      // inspect sample 2 — pass
      return {
        ...base,
        lineUnits: [8, 8, 8],
        sampledAtUnit: 4,
        queue: [2],
        verdicts: [
          { line: 0, passed: true },
          { line: 1, passed: true },
        ],
      };
    if (step === 6)
      // production continues before sample 3
      return {
        ...base,
        lineUnits: [9, 9, 9],
        sampledAtUnit: 4,
        queue: [2],
        verdicts: [
          { line: 0, passed: true },
          { line: 1, passed: true },
        ],
      };
    if (step === 7)
      // inspect sample 3 — FAIL, scrap fires
      return {
        ...base,
        lineUnits: [10, 10, 10],
        sampledAtUnit: 4,
        queue: [],
        verdicts: [
          { line: 0, passed: true },
          { line: 1, passed: true },
          { line: 2, passed: false },
        ],
        scrapped: { line: 2, from: 4, to: 10 },
      };
    // step >= 8 — stat reveal + high-risk reveal on Line C
    return {
      ...base,
      lineUnits: [10, 10, 10],
      sampledAtUnit: 4,
      queue: [],
      verdicts: [
        { line: 0, passed: true },
        { line: 1, passed: true },
        { line: 2, passed: false },
      ],
      scrapped: { line: 2, from: 4, to: 10 },
      scrapStat: 48,
      riskBadges: "high-only",
    };
  }

  // scenario === "fix" — 5 steps total (0..4)
  if (step === 0) return base;
  if (step === 1)
    return {
      ...base,
      lineUnits: [4, 4, 4],
      sampledAtUnit: 4,
      queue: [2, 0, 1],
    };
  if (step === 2)
    return {
      ...base,
      lineUnits: [5, 5, 5],
      sampledAtUnit: 4,
      queue: [0, 1],
      verdicts: [{ line: 2, passed: false }],
      scrapped: { line: 2, from: 4, to: 5 },
      scrapStat: 8,
    };
  // step >= 3 — comparison stat appears, slide ends here.
  // (Big "€X saved" payoff was removed — will land on a later slide
  // after more narrative explanation.)
  return {
    ...base,
    lineUnits: [5, 5, 5],
    sampledAtUnit: 4,
    queue: [0, 1],
    verdicts: [{ line: 2, passed: false }],
    scrapped: { line: 2, from: 4, to: 5 },
    scrapStat: 8,
    showComparison: true,
  };
}

function useTickUp(target: number | null, duration = 1.1) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (target === null) {
      setDisplay(0);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [target, duration]);
  return display;
}

export function QAScene({
  scenario,
  step,
}: {
  scenario: Scenario;
  step: number;
}) {
  const state = compute(scenario, step);

  return (
    <div className="relative flex h-full flex-col">
      <AnimatePresence>
        {state.showSubtitle && (
          <motion.p
            key="subtitle"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-2 max-w-[68ch] text-sm leading-snug text-slate-600"
          >
            Historical data: Line C makes the complex product — it fails more
            often. The Power App reorders the QA queue so the riskiest sample
            is inspected first.
          </motion.p>
        )}
      </AnimatePresence>

      <div className="grid flex-1 grid-cols-12 items-center gap-6">
        <div className="col-span-7 flex flex-col gap-4">
          {LINE_CONFIG.map((config, lineIndex) => {
            const showRiskBadge =
              state.riskBadges === "all" ||
              (state.riskBadges === "high-only" && config.risk === "high");
            return (
              <ProductionLine
                key={lineIndex}
                config={config}
                units={state.lineUnits[lineIndex]}
                sampledAtUnit={state.sampledAtUnit}
                scrapped={
                  state.scrapped?.line === lineIndex ? state.scrapped : null
                }
                showRiskBadge={showRiskBadge}
              />
            );
          })}
        </div>

        <div className="col-span-5 h-full">
          <QAPanel
            queue={state.queue}
            verdicts={state.verdicts}
            scrapStat={state.scrapStat}
          />
        </div>
      </div>

      <AnimatePresence>
        {state.showComparison && (
          <motion.div
            key="comparison"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-5"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50/85 px-5 py-3 shadow-sm backdrop-blur">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-red-700">
                FIFO
              </span>
              <span className="font-display text-2xl font-bold text-red-700">
                48 lost
              </span>
            </div>
            <motion.span
              initial={{ x: -6, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-slate-400"
            >
              →
            </motion.span>
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/85 px-5 py-3 shadow-sm backdrop-blur">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-700">
                Risk-weighted
              </span>
              <span className="font-display text-2xl font-bold text-emerald-700">
                8 lost
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Big "€X saved" payoff removed — will land on a dedicated later slide. */}
    </div>
  );
}

function ProductionLine({
  config,
  units,
  sampledAtUnit,
  scrapped,
  showRiskBadge,
}: {
  config: (typeof LINE_CONFIG)[number];
  units: number;
  sampledAtUnit: number | null;
  scrapped: { line: number; from: number; to: number } | null;
  showRiskBadge: boolean;
}) {
  const isHigh = config.risk === "high";
  const UNIT_W = 20; // tailwind w-5
  const UNIT_GAP = 8; // tailwind gap-2
  const TRACK_PAD = 12; // tailwind px-3

  return (
    <div className="flex items-center gap-3">
      {/* Machine — stamping press with animated piston + status LED */}
      <div
        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border shadow-sm"
        style={{
          background: config.colorLight,
          borderColor: config.color + "55",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
          {/* Top crossbar — press head support */}
          <rect
            x="4"
            y="3"
            width="24"
            height="4.5"
            rx="1"
            fill={config.color}
            fillOpacity="0.18"
            stroke={config.color}
            strokeWidth="1.5"
          />
          {/* Uprights / guide rails */}
          <line
            x1="6.5"
            y1="7.5"
            x2="6.5"
            y2="24"
            stroke={config.color}
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.65"
          />
          <line
            x1="25.5"
            y1="7.5"
            x2="25.5"
            y2="24"
            stroke={config.color}
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.65"
          />
          {/* Animated press assembly: rod + head */}
          <motion.g
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
            }}
          >
            <line
              x1="16"
              y1="7.5"
              x2="16"
              y2="14"
              stroke={config.color}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <rect
              x="10"
              y="13"
              width="12"
              height="3.5"
              rx="0.8"
              fill={config.color}
            />
          </motion.g>
          {/* Base / workpiece platform */}
          <rect
            x="2.5"
            y="24"
            width="27"
            height="4.5"
            rx="1"
            fill={config.colorLight}
            stroke={config.color}
            strokeWidth="1.5"
          />
          {/* Status LED — blinking green to show "running" */}
          <motion.circle
            cx="28"
            cy="5.25"
            r="1"
            fill="#22c55e"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      {/* Label + risk badge */}
      <div className="w-24 shrink-0">
        <div className="text-base font-semibold text-slate-800">
          {config.name}
        </div>
        <AnimatePresence>
          {showRiskBadge && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className={`mt-1 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                isHigh
                  ? "bg-red-100 text-red-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              <span
                className={`h-1 w-1 rounded-full ${
                  isHigh ? "bg-red-500" : "bg-emerald-500"
                }`}
              />
              {config.riskLabel} risk
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Track of units */}
      <div className="relative flex h-16 flex-1 items-center gap-2 rounded-lg border border-slate-200/70 bg-slate-50/50 px-3">
        <AnimatePresence initial={false}>
          {Array.from({ length: units }).map((_, unitIdx) => {
            const isScrapped =
              scrapped !== null &&
              unitIdx >= scrapped.from - 1 &&
              unitIdx < scrapped.to;
            const isSample =
              sampledAtUnit !== null && unitIdx === sampledAtUnit - 1;

            return (
              <motion.div
                key={unitIdx}
                initial={{ scale: 0, opacity: 0, y: -8 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: isScrapped ? [0, -4, 36] : 0,
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  scale: { type: "spring", stiffness: 280, damping: 20 },
                  y: isScrapped
                    ? { duration: 0.7, delay: unitIdx * 0.06 }
                    : { type: "spring", stiffness: 280, damping: 18 },
                }}
                className="shrink-0"
              >
                <ProductShape
                  kind={config.shape}
                  fill={
                    isScrapped
                      ? SCRAP_COLOR
                      : isSample
                        ? "#ffffff"
                        : config.color
                  }
                  stroke={isSample ? config.color : "transparent"}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Sample-taken indicator */}
        <AnimatePresence>
          {sampledAtUnit !== null && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute bottom-1 top-1 w-0.5 origin-bottom bg-slate-400/70"
              style={{
                left: `${TRACK_PAD + (sampledAtUnit - 1) * (UNIT_W + UNIT_GAP) - 1}px`,
              }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-wider text-slate-500">
                sample
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrap callout next to line */}
        <AnimatePresence>
          {scrapped !== null && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="absolute -right-2 top-1/2 flex -translate-y-1/2 translate-x-full items-center gap-1.5 rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white shadow-sm"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
              SCRAP
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function QAPanel({
  queue,
  verdicts,
  scrapStat,
}: {
  queue: number[];
  verdicts: { line: number; passed: boolean }[];
  scrapStat: number | null;
}) {
  const animatedStat = useTickUp(scrapStat);
  const isInspecting = verdicts.length > 0;

  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-base font-semibold text-slate-900">
          QA Inspection
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
          FIFO queue
        </span>
      </div>

      {/* Queue */}
      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
          Queue
        </p>
        <div className="flex min-h-[82px] flex-wrap items-center justify-start gap-4 rounded-lg border border-dashed border-slate-200 p-3">
          <AnimatePresence mode="popLayout">
            {queue.length === 0 && (
              <motion.span
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono text-[10px] uppercase tracking-wider text-slate-300"
              >
                empty
              </motion.span>
            )}
            {queue.map((lineIdx, position) => {
              const yFrom = lineIdx === 0 ? -60 : lineIdx === 1 ? 0 : 60;
              return (
                <motion.div
                  key={`sample-${lineIdx}`}
                  layout
                  initial={{
                    opacity: 0,
                    x: -140,
                    y: yFrom,
                    scale: 0.5,
                    rotate: -8,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                  }}
                  exit={{ opacity: 0, scale: 0.7, x: 30 }}
                  transition={{
                    layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                    default: {
                      type: "spring",
                      stiffness: 230,
                      damping: 22,
                      delay: position * 0.1,
                    },
                  }}
                  className="flex flex-col items-center gap-1"
                >
                  <PaperBag
                    lineColor={LINE_CONFIG[lineIdx].color}
                    position={position + 1}
                    width={40}
                    height={50}
                  />
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: LINE_CONFIG[lineIdx].color }}
                  >
                    {LINE_CONFIG[lineIdx].name.replace("Line ", "")}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Inspector + verdicts */}
      <div className="flex-1">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
          Inspector
        </p>
        <div className="flex flex-col gap-2.5 rounded-lg border border-slate-200/70 bg-slate-50/50 p-3.5">
          <div className="flex items-center gap-2.5">
            <motion.svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
              strokeLinecap="round"
              animate={isInspecting ? { x: [0, 3, 0], rotate: [0, 6, 0] } : {}}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </motion.svg>
            <span className="text-sm text-slate-600">
              {verdicts.length === 0
                ? "Ready."
                : `${verdicts.length} inspected.`}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {verdicts.map((v, i) => (
                <motion.div
                  key={`v-${i}-${v.line}`}
                  initial={{ opacity: 0, x: -8, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center justify-between gap-2 rounded-md px-3 py-2"
                  style={{
                    background: v.passed ? "#ecfdf5" : "#fef2f2",
                    border: `1px solid ${v.passed ? "#86efac" : "#fca5a5"}`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-sm"
                      style={{ background: LINE_CONFIG[v.line].color }}
                    />
                    <span className="text-sm text-slate-700">
                      Sample from {LINE_CONFIG[v.line].name}
                    </span>
                  </div>
                  {v.passed ? (
                    <span className="flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">
                      ✓ pass
                    </span>
                  ) : (
                    <motion.span
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.18, 1] }}
                      transition={{ duration: 0.45, repeat: 1 }}
                      className="flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider text-red-700"
                    >
                      ✗ fail
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scrap stat with tick-up */}
      <AnimatePresence>
        {scrapStat !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 shadow-sm"
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-red-700">
              Production lost
            </p>
            <p className="font-display text-3xl font-bold tabular-nums text-red-700">
              {animatedStat} units
            </p>
            <p className="text-xs leading-snug text-red-700/80">
              Everything Line C made since the sample was taken.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductShape({
  kind,
  fill,
  stroke,
}: {
  kind: ProductShapeKind;
  fill: string;
  stroke: string;
}) {
  const W = 20;
  const H = 40;
  const transition = { duration: 0.25 };

  if (kind === "brick") {
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
        <motion.rect
          x="1"
          y="1"
          width="18"
          height="38"
          rx="2"
          strokeWidth="2"
          initial={false}
          animate={{ fill, stroke }}
          transition={transition}
        />
      </svg>
    );
  }

  if (kind === "capsule") {
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
        <motion.rect
          x="1"
          y="1"
          width="18"
          height="38"
          rx="9"
          strokeWidth="2"
          initial={false}
          animate={{ fill, stroke }}
          transition={transition}
        />
      </svg>
    );
  }

  // hex (vertical hexagon)
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      <motion.polygon
        points="10,1.5 18.5,11 18.5,29 10,38.5 1.5,29 1.5,11"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={false}
        animate={{ fill, stroke }}
        transition={transition}
      />
    </svg>
  );
}

function PaperBag({
  lineColor,
  position,
  width = 34,
  height = 42,
}: {
  lineColor: string;
  position: number;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 34 42"
      fill="none"
      aria-hidden
    >
      {/* drop shadow under the bag */}
      <ellipse cx="17" cy="40" rx="11" ry="1.2" fill="#000" opacity="0.08" />
      {/* bag body — slightly trapezoidal */}
      <path
        d="M5 11 L29 11 L28 39 Q28 40 27 40 L7 40 Q6 40 6 39 Z"
        fill="#d4b08c"
        stroke="#7a5a3a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* folded top — darker */}
      <path
        d="M5 11 L29 11 L26.5 6.5 Q17 4.5 7.5 6.5 Z"
        fill="#a07b48"
        stroke="#7a5a3a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* center crease */}
      <line
        x1="17"
        y1="11"
        x2="17"
        y2="40"
        stroke="#7a5a3a"
        strokeWidth="0.5"
        opacity="0.45"
      />
      {/* highlight on the bag's left side */}
      <path
        d="M7 13 L7 38"
        stroke="#e8c9a3"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* position badge */}
      <circle
        cx="17"
        cy="25"
        r="8"
        fill={lineColor}
        stroke="#ffffff"
        strokeWidth="1.5"
      />
      <text
        x="17"
        y="28.5"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
        fontSize="10.5"
        fontWeight="800"
        fill="#ffffff"
      >
        {position}
      </text>
    </svg>
  );
}
