"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

type Benefit = {
  label: string;
  sub: string;
  hue: string;
  icon: ReactNode;
};

const TagIcon = (
  <svg
    width="56"
    height="56"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" />
    <circle cx="7" cy="7" r="1.5" />
  </svg>
);

const ZapIcon = (
  <svg
    width="56"
    height="56"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ShieldCheckIcon = (
  <svg
    width="56"
    height="56"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const SparkIcon = (
  <svg
    width="56"
    height="56"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8a6 6 0 0 0-12 0c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);

const BENEFITS: Benefit[] = [
  {
    label: "Cheaper",
    sub: "Less dev time. Less licensing. Less infrastructure.",
    hue: "from-emerald-400 to-teal-300",
    icon: TagIcon,
  },
  {
    label: "Faster",
    sub: "Ship in days, not quarters.",
    hue: "from-amber-400 to-orange-300",
    icon: ZapIcon,
  },
  {
    label: "Less risk",
    sub: "Small bets — easy to kill, easy to change course.",
    hue: "from-sky-400 to-cyan-300",
    icon: ShieldCheckIcon,
  },
  {
    label: "Easy to PoC",
    sub: "Test the idea Monday, demo by Friday.",
    hue: "from-violet-400 to-fuchsia-300",
    icon: SparkIcon,
  },
];

function WhatsInItForCompaniesSlide({ step }: SlideProps) {
  const visible = Math.max(0, Math.min(step, BENEFITS.length));

  return (
    <SlideShell eyebrow="Why companies bought in">
      <div className="flex h-full flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-violet-700">
            The real reason it sells
          </p>
          <h1
            className="mt-4 max-w-[22ch] font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
            style={{ fontSize: "clamp(2.8rem, 5.8vw, 5.4rem)" }}
          >
            What&apos;s in it{" "}
            <span className="shimmer-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
              for companies?
            </span>
          </h1>
        </motion.div>

        <div className="grid flex-1 grid-cols-4 items-stretch gap-6">
          {BENEFITS.map((b, i) => {
            const shown = i < visible;
            return (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 36, scale: 0.94 }}
                animate={
                  shown
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 36, scale: 0.94 }
                }
                transition={{
                  type: "spring",
                  stiffness: 190,
                  damping: 22,
                  mass: 0.9,
                }}
                className="relative flex flex-col items-center gap-6 rounded-2xl border border-slate-200/80 bg-white/70 p-7 shadow-sm backdrop-blur-sm"
              >
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br ${b.hue} text-slate-900 shadow-sm`}
                >
                  {b.icon}
                </div>
                <div className="text-center">
                  <div className="font-display text-3xl font-semibold leading-tight text-slate-900">
                    {b.label}
                  </div>
                  <div className="mt-3 text-base leading-snug text-slate-600">
                    {b.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}

export const slide14: SlideEntry = {
  meta: {
    id: "14-whats-in-it-for-companies",
    title: "What's in it for companies",
    section: "Act 2 · The AI question",
    steps: 5,
    notes:
      "Punchline of the Power Platform tour. The audience just saw the tools — now make the case for why companies actually bought them. Four word labels. Stepped reveal.\n\n• Step 1 (load): Title only. Say: 'OK so you've seen the toolbox. Here's why companies are actually obsessed with it. Four words.'\n• Step 2: + 'Cheaper'. Say: 'Cheaper. Fewer six-figure devs, lower licensing, less infrastructure to maintain.'\n• Step 3: + 'Faster'. Say: 'Faster. What pro-code teams ship in quarters, you ship in days.'\n• Step 4: + 'Less risk'. Say: 'Less risk. Small bets — if it doesn't work, you killed three days of work, not three months.'\n• Step 5: + 'Easy to PoC'. Say: 'And easy to prototype. Test the idea Monday, demo it Friday. If the demo lands, you turn it into the real thing. If it doesn't, you move on.'\n\nClose with: 'That's the company side. Now — what about the elephant — AI?' → leads into vibe-coding section.",
  },
  Component: WhatsInItForCompaniesSlide,
};
