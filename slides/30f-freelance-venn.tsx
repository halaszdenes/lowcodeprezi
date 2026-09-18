"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

const EASE = [0.22, 1, 0.36, 1] as const;

const EMPLOYMENT = {
  color: "#0642b4",
  fill: "#2d95e6",
  items: ["Steady income & benefits", "Structured career path", "No client hunting", "Paid vacation & sick leave"],
};
const FREELANCE = {
  color: "#047857",
  fill: "#34d399",
  items: ["Higher earning ceiling", "Flexible schedule", "You pick the projects", "Your own brand grows"],
};

// Venn geometry (viewBox units)
const W = 900;
const H = 500;
const R = 200;
const CY = 262;
const AX = 320;
const BX = 580;
const MX = (AX + BX) / 2;

function VennSlide({ step }: SlideProps) {
  const showLeft = step >= 1;
  const showRight = step >= 2;
  const showSweet = step >= 3;

  return (
    <SlideShell eyebrow="Act 4 · Freelancing: pros and cons" showParticles={false}>
      <div className="absolute inset-0 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="flex items-end justify-between gap-8"
        >
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-brand-700">
              Freelancing vs employment
            </p>
            <h1
              className="mt-3 font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
              style={{ fontSize: "clamp(2.2rem, 4.4vw, 4rem)" }}
            >
              Aim for{" "}
              <span className="shimmer-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent">
                the middle.
              </span>
            </h1>
          </div>
        </motion.div>

        <div className="relative mt-4 min-h-0 flex-1">
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
            <defs>
              <clipPath id="venn-a">
                <circle cx={AX} cy={CY} r={R} />
              </clipPath>
              <filter id="venn-drop" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0f172a" floodOpacity="0.14" />
              </filter>
            </defs>

            {/* circles */}
            <motion.circle
              cx={AX} cy={CY} r={R} fill={EMPLOYMENT.fill} fillOpacity={0.55} filter="url(#venn-drop)"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              style={{ transformOrigin: `${AX}px ${CY}px` }}
            />
            <motion.circle
              cx={BX} cy={CY} r={R} fill={FREELANCE.fill} fillOpacity={0.55} filter="url(#venn-drop)"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
              style={{ transformOrigin: `${BX}px ${CY}px` }}
            />
            {/* lens */}
            <motion.circle
              cx={BX} cy={CY} r={R} clipPath="url(#venn-a)"
              fill="#0984e3"
              initial={{ opacity: 0.35 }}
              animate={{ opacity: showSweet ? 1 : 0.35 }}
              transition={{ duration: 0.6 }}
            />
            <circle cx={AX} cy={CY} r={R} fill="none" stroke="#ffffff" strokeWidth={3} />
            <circle cx={BX} cy={CY} r={R} fill="none" stroke="#ffffff" strokeWidth={3} />

            {/* headings */}
            <motion.text
              x={AX - 70} y={CY - R - 22} textAnchor="middle"
              fontFamily="var(--font-display), system-ui, sans-serif" fontSize={26} fontWeight={700} fill={EMPLOYMENT.color}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            >
              Employment
            </motion.text>
            <motion.text
              x={BX + 70} y={CY - R - 22} textAnchor="middle"
              fontFamily="var(--font-display), system-ui, sans-serif" fontSize={26} fontWeight={700} fill={FREELANCE.color}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
            >
              Freelancing
            </motion.text>

            {/* items */}
            <AnimatePresence>
              {showLeft && EMPLOYMENT.items.map((t, i) => (
                <motion.text
                  key={t}
                  x={AX - 60} y={CY - 60 + i * 42} textAnchor="middle"
                  fontFamily="var(--font-display), system-ui, sans-serif" fontSize={19} fontWeight={600} fill="#ffffff"
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  {t}
                </motion.text>
              ))}
              {showRight && FREELANCE.items.map((t, i) => (
                <motion.text
                  key={t}
                  x={BX + 60} y={CY - 60 + i * 42} textAnchor="middle"
                  fontFamily="var(--font-display), system-ui, sans-serif" fontSize={19} fontWeight={600} fill="#ffffff"
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  {t}
                </motion.text>
              ))}
            </AnimatePresence>

            {/* sweet spot */}
            <AnimatePresence>
              {showSweet && (
                <motion.g
                  key="sweet"
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  style={{ transformOrigin: `${MX}px ${CY}px` }}
                >
                  <text x={MX} y={CY - 34} textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize={12} letterSpacing={3} fill="#ffffff" fillOpacity={0.85}>
                    SWEET SPOT
                  </text>
                  {["Long-term,", "part-time", "contractor"].map((w, i) => (
                    <text key={w} x={MX} y={CY + i * 30} textAnchor="middle" fontFamily="var(--font-display), system-ui, sans-serif" fontSize={24} fontWeight={800} fill="#ffffff">
                      {w}
                    </text>
                  ))}
                </motion.g>
              )}
            </AnimatePresence>
          </svg>

          {/* the LEGO line */}
          <AnimatePresence>
            {showSweet && (
              <motion.div
                key="lego"
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 22 }}
                className="absolute bottom-2 right-0 max-w-[34ch] rounded-2xl border border-brand-200 bg-white/90 p-5 shadow-lg backdrop-blur-sm"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-700">
                  Best of both worlds
                </p>
                <p className="mt-2 text-xl font-medium leading-snug text-slate-800">
                  &ldquo;Back to office doesn&apos;t apply to me. The employee
                  discount does.&rdquo;
                </p>
                <p className="mt-1 text-sm text-slate-500">on being a long-term contractor at The LEGO Group</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideShell>
  );
}

export const slide30f: SlideEntry = {
  meta: {
    id: "30f-freelance-venn",
    title: "Freelancing vs employment: aim for the middle",
    section: "Act 4 · What to do Monday",
    steps: 4,
    notes:
      "People frame this as a choice: employment or freelancing. It isn't. [click] Employment gives you steady income and benefits, a structured career path, no client hunting, paid vacation and sick leave. None of that is trivial. [click] Freelancing gives you a higher earning ceiling, a flexible schedule, you pick your projects, and your own brand grows. Also not trivial. [click] The middle exists, and it's the best deal in this industry: a long-term, part-time contract with one or two clients. Steady base, freedom on top.\n\nAt LEGO, back to office doesn't apply to me. The employee discount does. [let the laugh land]\n\n• Then: 'And here's how I got there.'",
  },
  Component: VennSlide,
};
