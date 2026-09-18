"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

type Row = {
  label: string;
  sub: string;
  hue: string;
  icon: ReactNode;
  badge?: string;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const MeetupIcon = (
  <svg width="34" height="34" viewBox="0 0 24 24" {...stroke}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const LinkedInIcon = (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const HandshakeIcon = (
  <svg width="34" height="34" viewBox="0 0 24 24" {...stroke}>
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </svg>
);

const ROWS: Row[] = [
  {
    label: "Attend local meetups & conferences",
    sub: "Face-to-face makes stronger connections than any comment thread.",
    hue: "from-brand-400 to-sky-300",
    icon: MeetupIcon,
    badge: "You're doing it right now",
  },
  {
    label: "Engage on LinkedIn",
    sub: "Connect with the people you met, share what you're building.",
    hue: "from-emerald-400 to-teal-300",
    icon: LinkedInIcon,
  },
  {
    label: "Build relationships",
    sub: "That's where job referrals and collaboration come from. Not from applications.",
    hue: "from-amber-400 to-orange-300",
    icon: HandshakeIcon,
  },
];

const TOTAL_STEPS = ROWS.length + 1;
const EASE = [0.22, 1, 0.36, 1] as const;

function NetworkingSlide({ step }: SlideProps) {
  const visible = Math.max(0, Math.min(step, ROWS.length));

  return (
    <SlideShell eyebrow="Act 4 · Networking & community">
      <div className="grid h-full grid-cols-12 items-center gap-10">
        <div className="col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-brand-700">
              Networking & community
            </p>
            <h1
              className="mt-4 font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
              style={{ fontSize: "clamp(2.4rem, 4.8vw, 4.4rem)" }}
            >
              You don&apos;t have to{" "}
              <span className="shimmer-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent">
                do this alone.
              </span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="mt-6 max-w-[38ch] text-lg leading-[1.6] text-slate-600"
          >
            The Power Platform community is unusually open. Most people in this
            room got their first break through someone they met, not something
            they applied to.
          </motion.p>
        </div>

        <div className="col-span-7">
          <ul className="flex flex-col gap-5">
            <AnimatePresence initial={false}>
              {ROWS.slice(0, visible).map((r, i) => (
                <motion.li
                  key={r.label}
                  initial={{ opacity: 0, x: 32, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ type: "spring", stiffness: 190, damping: 22 }}
                  className="relative flex items-center gap-6 rounded-2xl border border-slate-200/80 bg-white/75 p-5 pr-7 shadow-sm backdrop-blur-sm"
                >
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${r.hue} text-slate-900 shadow-sm`}
                  >
                    {r.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-display text-2xl font-semibold leading-tight text-slate-900">
                        {r.label}
                      </span>
                      {r.badge && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 18 }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-700"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {r.badge}
                        </motion.span>
                      )}
                    </div>
                    <div className="mt-1.5 text-lg leading-snug text-slate-600">
                      {r.sub}
                    </div>
                  </div>
                  <span className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.25em] text-slate-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </SlideShell>
  );
}

export const slide30d: SlideEntry = {
  meta: {
    id: "30d-networking",
    title: "Networking & community",
    section: "Act 4 · What to do Monday",
    steps: TOTAL_STEPS,
    notes:
      "You don't have to do this alone. The Power Platform community is unusually open, and most people I know got their first break through a person, not a job board. [one click each]\n\n• Meetups and conferences: you're doing it right now. Face to face beats any comment thread. Talk to three people today you don't know yet.\n• Then connect with them on LinkedIn while they still remember your face. Share what you build, comment on what they build.\n• That's where referrals and collaborations come from. Adjust to your own story: how did your own first low-code job come about?",
  },
  Component: NetworkingSlide,
};
