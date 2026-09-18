"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

// Chart geometry (viewBox units). Wide ratio so the chart fills the stage
// below the title instead of floating in the middle with side margins.
const W = 1000;
const H = 460;
const X0 = 70; // y-axis
const Y0 = 400; // x-axis
const XMAX = 960;
const YTOP = 40;
const LINE1 = 270; // line of manageability
const LINE2 = 520; // where citizen development ends
// Curve crosses LINE1 at y≈346 and LINE2 at y≈380; tail floor ≈ 368..404.
const CURVE =
  "M 80 60 C 105 190, 125 250, 155 285 C 190 330, 260 350, 380 365 C 560 388, 760 398, 960 404";

const HEAD = { zone: "#6ee7b7", chip: "#059669" }; // emerald
const TAIL = { zone: "#fcd34d", chip: "#d97706" }; // amber
const CITIZEN = { zone: "#7dd3fc", ink: "#0984e3", deep: "#0642b4" }; // brand

const EASE = [0.22, 1, 0.36, 1] as const;
const FONT = "var(--font-display), system-ui, sans-serif";

// Load choreography (seconds)
const T = {
  axes: 0,
  curve: 0.3,
  head: 1.0,
  headChips: 1.3,
  line1: 1.6,
  tail: 1.9,
  tailChips: 2.0,
};

function Chip({
  x,
  y,
  w,
  h = 34,
  fill,
  children,
  delay = 0,
  fontSize = 17,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  fill: string;
  children: React.ReactNode;
  delay?: number;
  fontSize?: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      <rect x={x} y={y} width={w} height={h} rx={7} fill={fill} />
      <text
        x={x + w / 2}
        y={y + h / 2}
        dominantBaseline="central"
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={fontSize}
        fontWeight={600}
        fill="#ffffff"
      >
        {children}
      </text>
    </motion.g>
  );
}

function DashedLine({ x, delay }: { x: number; delay: number }) {
  return (
    <motion.line
      x1={x}
      x2={x}
      y1={YTOP - 10}
      y2={Y0 + 34}
      stroke="#475569"
      strokeWidth={2}
      strokeDasharray="8 8"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    />
  );
}

function LongTailChart({ step }: { step: number }) {
  const citizen = step >= 1;
  const tailStart = citizen ? LINE2 : LINE1;
  const tailTop = citizen ? 330 : 300;
  const move = { duration: 0.8, ease: EASE };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* zones */}
      <motion.rect
        x={X0 + 6}
        y={YTOP + 10}
        width={LINE1 - X0 - 6}
        height={Y0 - YTOP - 10}
        fill={HEAD.zone}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.32 }}
        transition={{ duration: 0.5, delay: T.head }}
      />
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.32 }}
        transition={{ duration: 0.5, delay: T.tail }}
      >
        <motion.rect
          initial={false}
          animate={{
            x: tailStart,
            y: tailTop,
            width: XMAX - tailStart,
            height: Y0 - tailTop,
          }}
          transition={move}
          fill={TAIL.zone}
        />
      </motion.g>
      <AnimatePresence>
        {citizen && (
          <motion.rect
            key="citizen-zone"
            x={LINE1}
            y={268}
            height={Y0 - 268}
            fill={CITIZEN.zone}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 0.38, width: LINE2 - LINE1 }}
            exit={{ opacity: 0, width: 0 }}
            transition={move}
          />
        )}
      </AnimatePresence>

      {/* axes */}
      <motion.path
        d={`M ${X0} ${YTOP} L ${X0} ${Y0} L ${XMAX + 10} ${Y0}`}
        fill="none"
        stroke="#94a3b8"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: T.axes, ease: EASE }}
      />
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <path
          d={`M ${X0 - 5} ${YTOP + 8} L ${X0} ${YTOP} L ${X0 + 5} ${YTOP + 8}`}
          fill="none"
          stroke="#94a3b8"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          d={`M ${XMAX + 2} ${Y0 - 5} L ${XMAX + 10} ${Y0} L ${XMAX + 2} ${Y0 + 5}`}
          fill="none"
          stroke="#94a3b8"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <text
          transform={`translate(${X0 - 24} ${(Y0 + YTOP) / 2}) rotate(-90)`}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={15}
          fontStyle="italic"
          fill="#64748b"
        >
          Surplus of BPM
        </text>
        <text
          x={XMAX + 10}
          y={Y0 + 28}
          textAnchor="end"
          fontFamily={FONT}
          fontSize={15}
          fontStyle="italic"
          fill="#64748b"
        >
          Processes
        </text>
      </motion.g>

      {/* the curve */}
      <motion.path
        d={CURVE}
        fill="none"
        stroke="#ef4444"
        strokeWidth={5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.3, delay: T.curve, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* line of manageability */}
      <DashedLine x={LINE1} delay={T.line1} />
      <motion.text
        fontFamily={FONT}
        fontSize={14}
        fill="#334155"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: T.line1 + 0.3 }}
      >
        <tspan x={LINE1 + 10} y={YTOP + 4}>
          Line of
        </tspan>
        <tspan x={LINE1 + 10} dy={17}>
          manageability
        </tspan>
      </motion.text>

      {/* head of the curve: the big systems */}
      <Chip x={135} y={130} w={96} fill={HEAD.chip} delay={T.headChips}>
        ERP
      </Chip>
      <Chip x={160} y={175} w={96} fill={HEAD.chip} delay={T.headChips + 0.1}>
        MRP
      </Chip>
      <Chip x={185} y={220} w={96} fill={HEAD.chip} delay={T.headChips + 0.2}>
        CRM
      </Chip>

      {/* the tail: chips sit above the curve in both steps */}
      <motion.g
        initial={false}
        animate={{ x: citizen ? 160 : 0, y: citizen ? 30 : 0 }}
        transition={move}
      >
        <Chip x={400} y={312} w={110} fill={TAIL.chip} delay={T.tailChips}>
          Excel
        </Chip>
        <Chip
          x={545}
          y={306}
          w={130}
          h={46}
          fill={TAIL.chip}
          delay={T.tailChips + 0.1}
          fontSize={15}
        >
          <tspan x={610} dy={-8}>
            Manual
          </tspan>
          <tspan x={610} dy={18}>
            workflows
          </tspan>
        </Chip>
      </motion.g>
      <AnimatePresence>
        {!citizen && (
          <Chip
            key="paper"
            x={720}
            y={312}
            w={120}
            fill={TAIL.chip}
            delay={T.tailChips + 0.2}
          >
            Paper ☺
          </Chip>
        )}
      </AnimatePresence>

      {/* citizen development: step 2 */}
      <AnimatePresence>
        {citizen && (
          <motion.g
            key="citizen"
            initial="hidden"
            animate="shown"
            exit="hidden"
          >
            <DashedLine x={LINE2} delay={0.2} />
            <motion.g
              variants={{
                hidden: { opacity: 0 },
                shown: { opacity: 1, transition: { delay: 0.4, duration: 0.4 } },
              }}
            >
              <line
                x1={LINE1 + 8}
                x2={LINE2 - 8}
                y1={252}
                y2={252}
                stroke={CITIZEN.ink}
                strokeWidth={2}
              />
              <path
                d={`M ${LINE1 + 16} 246 L ${LINE1 + 8} 252 L ${LINE1 + 16} 258`}
                fill="none"
                stroke={CITIZEN.ink}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={`M ${LINE2 - 16} 246 L ${LINE2 - 8} 252 L ${LINE2 - 16} 258`}
                fill="none"
                stroke={CITIZEN.ink}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x={(LINE1 + LINE2) / 2}
                y={238}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={17}
                fontWeight={700}
                fill={CITIZEN.ink}
              >
                Citizen development
              </text>
            </motion.g>
            <motion.g
              variants={{
                hidden: { opacity: 0, scale: 0.6 },
                shown: {
                  opacity: 1,
                  scale: 1,
                  transition: { type: "spring", stiffness: 220, damping: 18, delay: 0.7 },
                },
              }}
              style={{ transformOrigin: `${(LINE1 + LINE2) / 2}px 304px` }}
            >
              <rect
                x={(LINE1 + LINE2) / 2 - 80}
                y={282}
                width={160}
                height={44}
                rx={22}
                fill="#ffffff"
                stroke={CITIZEN.ink}
                strokeWidth={2}
              />
              <text
                x={(LINE1 + LINE2) / 2}
                y={304}
                dominantBaseline="central"
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={16}
                fontWeight={700}
                fill={CITIZEN.deep}
              >
                Power Platform
              </text>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* source */}
      <text
        x={X0}
        y={H - 10}
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize={11}
        fill="#94a3b8"
        letterSpacing={1.5}
      >
        * IMGRUND ET AL., 2017
      </text>
    </svg>
  );
}

function LongTailSlide({ step }: SlideProps) {
  const citizen = step >= 1;
  return (
    <SlideShell eyebrow="Act 2 · The long tail" showParticles={false}>
      <div className="flex h-full flex-col">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-brand-700">
            Where the money actually is
          </p>
          <h1
            className="mt-3 font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
            style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}
          >
            The long tail of{" "}
            <span className="shimmer-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent">
              business processes.
            </span>
          </h1>
        </motion.div>
        <div className="mt-3 h-7">
          <AnimatePresence mode="wait">
            <motion.p
              key={citizen ? "after" : "before"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="max-w-[70ch] text-lg leading-snug text-slate-600"
            >
              {citizen
                ? "Low-code moves the line: a whole band of the tail becomes worth automating. That band is citizen development."
                : "A few processes are worth a big system. Everything right of the line runs on Excel, email and paper."}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="min-h-0 flex-1 pt-3">
          <LongTailChart step={step} />
        </div>
      </div>
    </SlideShell>
  );
}

export const slide08b: SlideEntry = {
  meta: {
    id: "08b-long-tail",
    title: "The long tail of business processes",
    section: "Act 2 · The AI question",
    steps: 2,
    notes:
      "Here is the economics in one picture. The vertical axis is the value a company gets from properly managing a process. The horizontal axis is all of its processes, ranked.\n\nEvery company has a handful of processes worth an ERP, an MRP, a CRM. Big budget, big project, worth it. Then comes the line of manageability. Right of it, a process isn't worth a developer, so it runs on Excel, on email, on paper. That's the long tail, and it is most of the processes in your company.\n\n[click] Low-code moves the line. When the person who owns a process can automate it in days, a whole band of that tail becomes worth doing. That band is citizen development. That is the job.\n\n• Source: Imgrund et al., 2017.",
  },
  Component: LongTailSlide,
};
