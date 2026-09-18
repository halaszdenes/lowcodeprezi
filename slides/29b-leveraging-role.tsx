"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

// Road geometry lives in its own viewBox. The SVG stretches to the stage box
// and every overlay is positioned in % of that same box, so pins, cards and
// road stay aligned at any stage size. All strokes stay in user units on
// purpose: Framer's pathLength dashing and the pins' getPointAtLength must
// share one coordinate space, so no vector-effect=non-scaling-stroke here.
const VB_W = 1000;
const VB_H = 440;
// Three legs, like a real route: a drop on the left, a valley, a climb to a
// peak, then a descent to the finish. Shaped so that each label has an open
// pocket that the asphalt never crosses.
const ROAD_D =
  "M 60 30 C 60 130, 150 150, 150 250 C 150 350, 250 395, 350 395 C 450 395, 520 215, 640 215 C 760 215, 830 410, 960 410";

type Milestone = {
  /** Position along the road, 0..1 */
  at: number;
  color: string;
  heading: string;
  bullets: string[];
  /** Fixed card slot, in % of the stage box */
  slot: { left: number; top: number; width: number };
};

const MILESTONES: Milestone[] = [
  {
    at: 0.1,
    color: "#0984e3", // brand-500
    heading: "Identify use cases in your job",
    bullets: ["Finance dashboards, HR workflows, etc."],
    slot: { left: 17, top: 6, width: 31 },
  },
  {
    at: 0.42,
    color: "#14b8a6", // teal-500
    heading: "Showcase small wins",
    bullets: [
      "Automate manual Excel reports",
      "Build a simple request/tracking app",
    ],
    slot: { left: 28, top: 40, width: 20 },
  },
  {
    at: 0.72,
    color: "#10b981", // emerald-500
    heading: "Gain visibility",
    bullets: ["Demonstrate solutions to your team/manager"],
    slot: { left: 73, top: 8, width: 26 },
  },
];

const TOTAL_STEPS = MILESTONES.length + 1;
const ROAD_DRAW = 1.6;
const EASE = [0.22, 1, 0.36, 1] as const;

function Pin({
  color,
  index,
  x,
  y,
  active,
}: {
  color: string;
  index: number;
  x: number;
  y: number;
  active: boolean;
}) {
  // Outer div owns the anchoring transform (pin tip on the road); the inner
  // motion.div animates, so framer never overwrites the anchor.
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <motion.div
        initial={{ opacity: 0, y: -56, scale: 0.6 }}
        animate={{ opacity: 1, y: 0, scale: active ? 1.08 : 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ type: "spring", stiffness: 260, damping: 17 }}
        className="relative"
      >
        <svg width="50" height="62" viewBox="0 0 44 56" fill="none" aria-hidden>
          <defs>
            <linearGradient id={`pin-${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <ellipse cx="22" cy="54" rx="10" ry="2.2" fill="#0f172a" opacity="0.28" />
          <path
            d="M22 1C11.5 1 3 9.6 3 20.2 3 33.4 22 53 22 53s19-19.6 19-32.8C41 9.6 32.5 1 22 1z"
            fill={color}
            stroke="#ffffff"
            strokeWidth="2.2"
          />
          <path
            d="M22 1C11.5 1 3 9.6 3 20.2 3 33.4 22 53 22 53s19-19.6 19-32.8C41 9.6 32.5 1 22 1z"
            fill={`url(#pin-${index})`}
          />
          <circle cx="22" cy="20" r="10.5" fill="#ffffff" />
          <text
            x="22"
            y="24.5"
            textAnchor="middle"
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize="12"
            fontWeight="800"
            fill={color}
          >
            {String(index + 1).padStart(2, "0")}
          </text>
        </svg>
        {active && (
          <motion.span
            className="absolute left-1/2 top-full h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: color }}
            animate={{ scale: [1, 3, 1], opacity: [0.45, 0, 0.45] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.div>
    </div>
  );
}

function Card({ m, index }: { m: Milestone; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.12 }}
      className="absolute rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-lg shadow-slate-900/5 backdrop-blur-sm"
      style={{
        left: `${m.slot.left}%`,
        top: `${m.slot.top}%`,
        width: `${m.slot.width}%`,
        borderTop: `3px solid ${m.color}`,
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[11px] font-bold text-white shadow-sm"
          style={{ background: m.color }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-display text-xl font-semibold leading-tight text-slate-900">
          {m.heading}
        </span>
      </div>
      <ul className="mt-2.5 flex flex-col gap-1.5 pl-11">
        {m.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2.5 text-[15px] leading-snug text-slate-600"
          >
            <span
              className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: m.color }}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function RoadmapScene({ step }: { step: number }) {
  const measureRef = useRef<SVGPathElement>(null);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [ends, setEnds] = useState<{ start: { x: number; y: number }; end: { x: number; y: number } } | null>(null);

  // Resolve pin positions and the two road ends from the real path geometry.
  useLayoutEffect(() => {
    const path = measureRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const pct = (p: DOMPoint) => ({ x: (p.x / VB_W) * 100, y: (p.y / VB_H) * 100 });
    setPoints(MILESTONES.map((m) => pct(path.getPointAtLength(total * m.at))));
    setEnds({
      start: pct(path.getPointAtLength(0)),
      end: pct(path.getPointAtLength(total)),
    });
  }, []);

  const reached = step > 0 ? MILESTONES[Math.min(step, MILESTONES.length) - 1].at : 0;
  const finished = step >= MILESTONES.length;

  return (
    <div className="flex h-full flex-col">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      >
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-brand-700">
          Already in an office job?
        </p>
        <h1
          className="mt-3 font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
          style={{ fontSize: "clamp(2.2rem, 4.4vw, 4rem)" }}
        >
          Leveraging your{" "}
          <span className="shimmer-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent">
            current role.
          </span>
        </h1>
      </motion.div>

      {/* Stage: keeps the viewBox ratio, height-bound inside the remaining space */}
      <div className="flex min-h-0 flex-1 items-center justify-center pt-3">
        <div
          className="relative h-full"
          style={{ aspectRatio: `${VB_W} / ${VB_H}`, maxWidth: "100%" }}
        >
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <defs>
              <linearGradient id="asphalt" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="route" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2d95e6" />
                <stop offset="55%" stopColor="#0984e3" />
                <stop offset="100%" stopColor="#0642b4" />
              </linearGradient>
            </defs>

            {/* hidden twin used only for measurement */}
            <path ref={measureRef} d={ROAD_D} fill="none" stroke="none" />

            {/* soft ground shadow */}
            <motion.path
              d={ROAD_D}
              fill="none"
              stroke="#0f172a"
              strokeWidth={34}
              strokeLinecap="round"
              style={{ filter: "blur(10px)", transform: "translateY(10px)" }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.22 }}
              transition={{
                pathLength: { duration: ROAD_DRAW, ease: [0.45, 0, 0.35, 1], delay: 0.3 },
                opacity: { duration: 0.3, delay: 0.3 },
              }}
            />
            {/* light shoulders */}
            <motion.path
              d={ROAD_D}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth={32}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: ROAD_DRAW, ease: [0.45, 0, 0.35, 1], delay: 0.3 },
                opacity: { duration: 0.2, delay: 0.3 },
              }}
            />
            {/* asphalt */}
            <motion.path
              d={ROAD_D}
              fill="none"
              stroke="url(#asphalt)"
              strokeWidth={26}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: ROAD_DRAW, ease: [0.45, 0, 0.35, 1], delay: 0.3 },
                opacity: { duration: 0.2, delay: 0.3 },
              }}
            />
            {/* dashed centre line */}
            <motion.path
              d={ROAD_D}
              fill="none"
              stroke="#f8fafc"
              strokeWidth={2.5}
              strokeDasharray="14 12"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.6, delay: ROAD_DRAW + 0.2 }}
            />
            {/* travelled route: grows to the latest milestone */}
            <motion.path
              d={ROAD_D}
              fill="none"
              stroke="url(#route)"
              strokeWidth={14}
              strokeLinecap="butt"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: reached, opacity: reached > 0 ? 0.35 : 0 }}
              transition={{ pathLength: { duration: 0.9, ease: EASE }, opacity: { duration: 0.3 } }}
            />
            <motion.path
              d={ROAD_D}
              fill="none"
              stroke="url(#route)"
              strokeWidth={6}
              strokeLinecap="butt"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: reached, opacity: reached > 0 ? 1 : 0 }}
              transition={{ pathLength: { duration: 0.9, ease: EASE }, opacity: { duration: 0.3 } }}
            />
          </svg>

          {/* start marker */}
          {ends && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 240, damping: 20 }}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
              style={{ left: `${ends.start.x}%`, top: `${ends.start.y}%` }}
            >
              <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-brand-500">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              </span>
              <span className="whitespace-nowrap rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600 shadow-sm">
                You, today
              </span>
            </motion.div>
          )}

          {/* finish flag */}
          {ends && (
            <motion.div
              initial={false}
              animate={{ opacity: finished ? 1 : 0.35, filter: finished ? "grayscale(0)" : "grayscale(1)" }}
              transition={{ duration: 0.5 }}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${ends.end.x}%`, top: `${ends.end.y}%` }}
            >
              <motion.div
                animate={finished ? { y: [0, -6, 0] } : { y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex flex-col items-center"
              >
                <span className="mb-1 whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
                  Your new role
                </span>
                <svg width="30" height="44" viewBox="0 0 30 44" fill="none" aria-hidden>
                  <line x1="6" y1="2" x2="6" y2="42" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M7 3h20l-5 7 5 7H7z" fill="#10b981" />
                  <path d="M7 3h5v4H7zM17 3h5v4h-5zM12 7h5v3.5h-5zM22 7h3.6l-2 3.5h-1.6zM7 10.5h5v3.5H7zM17 10.5h5v3.5h-5z" fill="#065f46" opacity="0.6" />
                </svg>
              </motion.div>
            </motion.div>
          )}

          <AnimatePresence>
            {MILESTONES.map((m, i) =>
              step >= i + 1 && points[i] ? (
                <Pin
                  key={`pin-${i}`}
                  color={m.color}
                  index={i}
                  x={points[i].x}
                  y={points[i].y}
                  active={step === i + 1}
                />
              ) : null,
            )}
            {MILESTONES.map((m, i) =>
              step >= i + 1 ? <Card key={`card-${i}`} m={m} index={i} /> : null,
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function LeveragingRoleSlide({ step }: SlideProps) {
  return (
    <SlideShell
      eyebrow="Act 4 · Leveraging your current role"
      showParticles={false}
    >
      <RoadmapScene step={step} />
    </SlideShell>
  );
}

export const slide29b: SlideEntry = {
  meta: {
    id: "29b-leveraging-role",
    title: "Leveraging your current role",
    section: "Act 4 · What to do Monday",
    steps: TOTAL_STEPS,
    notes:
      "If you already sit in an office job, you don't have to quit anything. You're standing on the on-ramp right now. [click] Look at your own week: the finance dashboard you rebuild by hand every month, the HR workflow that runs on email and an Excel file. Those are your use cases, and nobody knows them better than you. [click] Pick one. Automate one manual report. Build one simple request or tracking app. Small enough to finish in a week, visible enough that someone notices. [click] Then show it: your team, your manager, the meeting where that pain usually gets complained about. Visibility is what turns a side project into a new role.\n\n• Bridge to the next slide: 'Which brings me to the part most people skip.'",
  },
  Component: LeveragingRoleSlide,
};
