"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

type Point = {
  label: string;
  sub: string;
  hue: string;
  icon: ReactNode;
};

const LinkedInIcon = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TrustIcon = (
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
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const LongFormIcon = (
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
    <rect x="2" y="4" width="20" height="14" rx="2.5" />
    <path d="m10 8.5 5 3-5 3z" fill="currentColor" stroke="none" />
    <path d="M7 22h10" />
  </svg>
);

const POINTS: Point[] = [
  {
    label: "Credibility & visibility",
    sub: "Especially on LinkedIn, where the people who hire for this already scroll.",
    hue: "from-brand-400 to-sky-300",
    icon: LinkedInIcon,
  },
  {
    label: "Trust & true interest",
    sub: "Showing up consistently proves you care about the craft, not just the job title.",
    hue: "from-emerald-400 to-teal-300",
    icon: TrustIcon,
  },
  {
    label: "Long-form content",
    sub: "Blogs and YouTube videos that showcase expertise in depth.",
    hue: "from-amber-400 to-orange-300",
    icon: LongFormIcon,
  },
];

const TOTAL_STEPS = POINTS.length + 1;

function OnlinePresenceSlide({ step }: SlideProps) {
  const visible = Math.max(0, Math.min(step, POINTS.length));

  return (
    <SlideShell eyebrow="Act 4 · Online presence">
      <div className="flex h-full flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-brand-700">
            And then, the outside
          </p>
          <h1
            className="mt-4 max-w-[22ch] font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
            style={{ fontSize: "clamp(2.6rem, 5.4vw, 5rem)" }}
          >
            But online presence{" "}
            <span className="shimmer-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent">
              matters too.
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="mt-5 max-w-[56ch] text-xl leading-[1.5] text-slate-600"
          >
            Internal visibility gets you into the room. An online presence gets
            you into the next one.
          </motion.p>
        </motion.div>

        <div className="grid flex-1 grid-cols-3 items-stretch gap-6">
          {POINTS.map((p, i) => {
            const shown = i < visible;
            return (
              <motion.div
                key={p.label}
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
                className="relative flex flex-col items-center gap-6 rounded-2xl border border-slate-200/80 bg-white/70 p-8 shadow-sm backdrop-blur-sm"
              >
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br ${p.hue} text-slate-900 shadow-sm`}
                >
                  {p.icon}
                </div>
                <div className="text-center">
                  <div className="font-display text-3xl font-semibold leading-tight text-slate-900">
                    {p.label}
                  </div>
                  <div className="mt-3 text-lg leading-snug text-slate-600">
                    {p.sub}
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

export const slide30b: SlideEntry = {
  meta: {
    id: "30b-online-presence",
    title: "But online presence matters too",
    section: "Act 4 · What to do Monday",
    steps: TOTAL_STEPS,
    notes:
      "Counterpoint to the previous slide (internal visibility beats LinkedIn followers). Not a reversal: internal first, then outside. Three cards, one click each.\n\n• Step 1 (load): Title + bridge line. Say: 'Now, I just told you internal visibility beats followers. Still true. But once you have wins to show, the outside matters too. Internal visibility gets you into the room. Online presence gets you into the next one.'\n• Step 2: Credibility & visibility. Say: 'Especially LinkedIn. That's where the people hiring for these roles already scroll. A profile that shows what you built is a CV that works while you sleep.'\n• Step 3: Trust & true interest. Say: 'Posting about what you learned, what broke, what you fixed: that builds trust. It shows you're interested in the craft, not just in the title.'\n• Step 4: Long-form content. Say: 'And if you want to go further: a blog, a YouTube video walking through something you built. Long-form is how you showcase depth. It's exactly how I ended up here.'\n\nKeep it light; this is optional advice, not homework. Then the CTA slide.",
  },
  Component: OnlinePresenceSlide,
};
