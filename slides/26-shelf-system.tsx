"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

// Compartment grid positions on the 1672x941 photo.
// 7 columns × 3 rows, with frame on the edges.
const COL_CENTERS_PCT = [4, 17.5, 31, 44.5, 58, 71.5, 85];
const ROW_CENTERS_PCT = [1, 33, 65];
const CELL_W_PCT = 12;
const CELL_H_PCT = 28;
const IMAGE_ASPECT = 1672 / 941;
// What fraction of the stage width to allocate to the image (rest = cards column).
const IMAGE_AREA_RATIO = 0.66;

type CellCoord = `${"A" | "B" | "C"}${1 | 2 | 3 | 4 | 5 | 6 | 7}`;

function cellPos(id: CellCoord) {
  const row = id[0] === "A" ? 0 : id[0] === "B" ? 1 : 2;
  const col = parseInt(id.slice(1), 10) - 1;
  return { x: COL_CENTERS_PCT[col], y: ROW_CENTERS_PCT[row] };
}

function CompartmentHighlight({
  id,
  accent,
  label,
  pulse = true,
}: {
  id: CellCoord;
  accent: string;
  label?: string;
  pulse?: boolean;
}) {
  const { x, y } = cellPos(id);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 22,
        mass: 0.8,
      }}
      className="pointer-events-none absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${CELL_W_PCT}%`,
        height: `${CELL_H_PCT}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        animate={
          pulse
            ? {
                boxShadow: [
                  `0 0 0 3px ${accent}, 0 0 24px ${accent}cc`,
                  `0 0 0 3px ${accent}, 0 0 44px ${accent}`,
                  `0 0 0 3px ${accent}, 0 0 24px ${accent}cc`,
                ],
              }
            : { boxShadow: `0 0 0 3px ${accent}, 0 0 24px ${accent}cc` }
        }
        transition={
          pulse
            ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.4 }
        }
        className="absolute inset-0 rounded-md"
        style={{ background: `${accent}1a` }}
      />
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="absolute left-1/2 top-[105%] -translate-x-1/2 rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg"
          style={{ background: accent, whiteSpace: "nowrap" }}
        >
          {label}
        </motion.div>
      )}
    </motion.div>
  );
}

function CanvasAppCard({
  label,
  message,
  cell,
  accent,
  delay = 0,
}: {
  label: string;
  message: string;
  cell: string;
  accent: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 24,
        delay,
      }}
      className="rounded-2xl border bg-white p-5 shadow-md"
      style={{ borderColor: `${accent}55` }}
    >
      <div className="flex items-center gap-2">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white"
          style={{ background: accent }}
        >
          ⚡
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
          Canvas App
        </span>
      </div>
      <div className="mt-3 text-sm uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div
        className="mt-1 font-display text-3xl font-bold leading-tight"
        style={{ color: accent }}
      >
        {message}{" "}
        <span className="font-mono">{cell}</span>
      </div>
    </motion.div>
  );
}

function ShelfScene({ step }: { step: number }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);

  // Measure the available stage area and compute the largest image size
  // that (a) fits within IMAGE_AREA_RATIO of the stage width and (b) fits
  // within the stage height. Always maintains aspect ratio — never crops.
  useEffect(() => {
    const compute = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const maxW = rect.width * IMAGE_AREA_RATIO;
      const maxH = rect.height;
      // Try width-constrained first; if too tall, fall back to height-constrained.
      let w = maxW;
      let h = w / IMAGE_ASPECT;
      if (h > maxH) {
        h = maxH;
        w = h * IMAGE_ASPECT;
      }
      setImgSize({ w, h });
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  const showPlacement = step >= 1;
  const showRetrieval = step >= 2;

  const PLACE_ACCENT = "#7c3aed"; // violet
  const PICK_ACCENT = "#ef4444"; // red

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Title */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 180, damping: 26 }}
      >
        <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-slate-900">
          The new shelf system
        </h1>
      </motion.div>

      {/* Stage: image on left, cards on right */}
      <div
        ref={stageRef}
        className="flex flex-1 items-center justify-center gap-8"
      >
        {/* Image container — exact pixel size, so % overlays line up perfectly */}
        <div
          className="relative shrink-0 overflow-hidden rounded-2xl border border-slate-200 shadow-md"
          style={{
            width: imgSize ? `${imgSize.w}px` : "0px",
            height: imgSize ? `${imgSize.h}px` : "0px",
          }}
        >
          {imgSize && (
            <>
              <img
                src="/newshelfsystem.png"
                alt="QA sample shelf with labeled compartments A1 through C7"
                className="block h-full w-full"
              />

              {/* Subtle vignette */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.25) 100%)",
                }}
              />

              {/* Highlights */}
              <AnimatePresence>
                {showPlacement && (
                  <CompartmentHighlight
                    key="place-B3"
                    id="B3"
                    accent={PLACE_ACCENT}
                    label="Place here"
                  />
                )}
                {showRetrieval && (
                  <CompartmentHighlight
                    key="pick-A3"
                    id="A3"
                    accent={PICK_ACCENT}
                    label="Pick next"
                  />
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        {/* Workflow cards column — stacked, full available height */}
        <div className="flex flex-1 flex-col justify-center gap-4">
          <AnimatePresence>
            {showPlacement && (
              <CanvasAppCard
                key="card-place"
                label="New sample arrives"
                message="Place in"
                cell="B3"
                accent={PLACE_ACCENT}
                delay={0.1}
              />
            )}
            {showRetrieval && (
              <CanvasAppCard
                key="card-pick"
                label="Inspector ready · high risk"
                message="Pick from"
                cell="A3"
                accent={PICK_ACCENT}
                delay={0.1}
              />
            )}
          </AnimatePresence>

          {/* Placeholder hint when no cards yet, so the right column doesn't look empty */}
          {!showPlacement && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="rounded-2xl border border-dashed border-slate-200 p-5 text-center text-sm text-slate-400"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.25em]">
                Canvas App
              </div>
              <div className="mt-2">
                Press → to see the placement workflow
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function ShelfSystemSlide({ step }: SlideProps) {
  return (
    <SlideShell
      eyebrow="Proof · The shelf system"
      showAmbient={false}
      showParticles={false}
    >
      <ShelfScene step={step} />
    </SlideShell>
  );
}

export const slide26: SlideEntry = {
  meta: {
    id: "17-shelf-system",
    title: "The new shelf system — labeled compartments, app-directed",
    section: "Act 3 · Proof",
    steps: 3,
    notes:
      "Shows the actual physical implementation of the QA fix — a real photo of the shelf we built, with the Canvas App workflow cards beside it. 3 click steps:\n\n• Step 1 (load): Title + photo of the full shelf (all 3 rows A/B/C, 21 compartments visible). Empty-state hint card on the right says 'Press → to see the placement workflow.' Say: 'Here's what we actually built. 21 labeled compartments. Each one has a place on the shelf and a place in the database.'\n• Step 2: Violet highlight pulses on compartment B3. The first Canvas App card slides in from the right: ⚡ Canvas App · New sample arrives · Place in B3. Say: 'When QA collects a sample, the app tells the operator exactly which compartment.'\n• Step 3: Red highlight on A3 (high-risk). Second Canvas App card slides in below the first. Both highlights visible. Say: 'When it's time to inspect, the app picks the next sample — high-risk first, every time.'\n\nKey beats:\n— 'It's not a FIFO shelf anymore. It's an addressable, app-driven queue.'\n— 'No more guessing which sample is next. The algorithm makes the call.'",
  },
  Component: ShelfSystemSlide,
};
