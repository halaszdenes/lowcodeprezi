"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

const DOMAIN = "#0773cb"; // brand-600
const SKILLS = "#10b981"; // emerald-500
const VALUE = "#2d95e6"; // brand-400

type Bullet = { main: React.ReactNode; sub?: string };

const BULLETS: Bullet[] = [
  {
    main: (
      <>
        Domain expertise + low-code skills ={" "}
        <span className="font-semibold text-slate-900">high value</span>
      </>
    ),
  },
  {
    main: (
      <>
        Business understanding <span className="text-brand-600">→</span> better
        solutions
      </>
    ),
  },
  {
    main: "The citizen developer",
    sub: "Empowered employees who build solutions for their own department.",
  },
];

const TOTAL_STEPS = BULLETS.length + 1;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Pointy-top hexagon as an SVG points string. */
function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (-90 + i * 60);
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

function Venn({ step }: { step: number }) {
  const R = 105;
  const CY = 120;
  const AX = 150;
  const BX = 290;
  const MX = (AX + BX) / 2;
  const highlight = step >= 1;

  return (
    <svg viewBox="0 0 440 310" className="h-auto w-full" style={{ maxHeight: "100%" }}>
      <defs>
        <filter id="venn-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#0f172a" floodOpacity="0.18" />
        </filter>
        <linearGradient id="venn-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2d95e6" />
          <stop offset="100%" stopColor={DOMAIN} />
        </linearGradient>
        <linearGradient id="venn-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor={SKILLS} />
        </linearGradient>
        <linearGradient id="venn-c" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor={VALUE} />
        </linearGradient>
      </defs>

      {/* Domain expertise */}
      <motion.g
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        filter="url(#venn-shadow)"
      >
        <polygon points={hexPoints(AX, CY, R)} fill="url(#venn-a)" />
        {/* document + magnifier */}
        <g transform={`translate(${AX - 62} ${CY - 20})`} fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 0h16l8 8v22a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
          <path d="M22 0v8h8" />
          <path d="M10 14h10M10 20h6" />
          <circle cx="24" cy="26" r="6" fill="rgba(255,255,255,0.15)" />
          <path d="m28.5 30.5 5 5" />
        </g>
      </motion.g>

      {/* Low-code skills */}
      <motion.g
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
        filter="url(#venn-shadow)"
      >
        <polygon points={hexPoints(BX, CY, R)} fill="url(#venn-b)" />
        {/* flame */}
        <g transform={`translate(${BX + 20} ${CY - 22}) scale(1.7)`} fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </g>
      </motion.g>

      {/* High value: the overlap */}
      <motion.g
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{
          opacity: 1,
          scale: highlight ? [1, 1.08, 1] : 1,
        }}
        transition={{
          opacity: { duration: 0.5, delay: 1.0 },
          scale: highlight
            ? { duration: 0.9, ease: EASE }
            : { type: "spring", stiffness: 220, damping: 18, delay: 1.0 },
        }}
        style={{ transformOrigin: `${MX}px ${CY}px` }}
      >
        <polygon
          points={hexPoints(MX, CY, 62)}
          fill="url(#venn-c)"
          stroke="#ffffff"
          strokeWidth="3.5"
          filter="url(#venn-shadow)"
        />
        {/* person */}
        <g transform={`translate(${MX - 15} ${CY - 18})`} fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="15" cy="9" r="7" />
          <path d="M2 34a13 13 0 0 1 26 0" />
          <path d="M15 16v4M11 19l4 4 4-4" opacity="0.9" />
        </g>
      </motion.g>

      {/* labels */}
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        fontFamily="var(--font-display)"
        fontWeight="700"
        textAnchor="middle"
      >
        <text x={MX} y={CY + R + 34} fontSize="17" fill={VALUE}>
          High value
        </text>
        <text x={AX - 10} y={CY + R + 64} fontSize="16" fill={DOMAIN}>
          Domain expertise
        </text>
        <text x={BX + 10} y={CY + R + 64} fontSize="16" fill={SKILLS}>
          Low-code skills
        </text>
      </motion.g>
    </svg>
  );
}

function TwoInOneAdvantageSlide({ step }: SlideProps) {
  const shown = Math.max(0, Math.min(step, BULLETS.length));

  return (
    <SlideShell eyebrow="Act 4 · The 2-in-1 advantage" showParticles={false}>
      <div className="grid h-full grid-cols-12 items-center gap-10">
        <div className="col-span-7 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-brand-700">
              Why you, specifically
            </p>
            <h1
              className="mt-3 font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
              style={{ fontSize: "clamp(2.4rem, 4.8vw, 4.4rem)" }}
            >
              The 2&#8209;in&#8209;1{" "}
              <span className="shimmer-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent">
                advantage.
              </span>
            </h1>
          </motion.div>

          <ul className="mt-10 flex flex-col gap-6">
            <AnimatePresence initial={false}>
              {BULLETS.slice(0, shown).map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                >
                  <div className="flex items-center gap-4 text-2xl font-medium text-slate-700">
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{
                        background: [DOMAIN, VALUE, SKILLS][i % 3],
                      }}
                    />
                    <span>{b.main}</span>
                  </div>
                  {b.sub && (
                    <p className="mt-2 flex items-start gap-3 pl-7 text-lg leading-snug text-slate-500">
                      <span className="mt-3 h-px w-3.5 shrink-0 bg-current" />
                      <span>{b.sub}</span>
                    </p>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        <div className="col-span-5 flex h-full items-center justify-center">
          <Venn step={step} />
        </div>
      </div>
    </SlideShell>
  );
}

export const slide29c: SlideEntry = {
  meta: {
    id: "29c-two-in-one-advantage",
    title: "The 2-in-1 advantage (visual)",
    section: "Act 4 · What to do Monday",
    steps: TOTAL_STEPS,
    notes:
      "Remember the two-in-one from earlier? Here's what it looks like for you. [click] You already own the blue half; it took you years. The green half takes months. [click] A developer from outside has to be told what the process is. You already know where it breaks. [click] That's the citizen developer: an employee who builds the fix for their own department, because they're the one who understands the problem.\n\n• Callback, not repetition: keep it to a minute.",
  },
  Component: TwoInOneAdvantageSlide,
};
