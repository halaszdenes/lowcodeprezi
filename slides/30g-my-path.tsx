"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

const EASE = [0.22, 1, 0.36, 1] as const;

const MIX = {
  job: { label: "Day job", color: "#94a3b8" },
  side: { label: "Training on the side", color: "#0984e3" },
  consult: { label: "Consulting", color: "#0642b4" },
  train: { label: "Training", color: "#0984e3" },
  content: { label: "Content", color: "#2d95e6" },
};

type Chapter = {
  when: string;
  title: string;
  sub: string;
  mix: { key: keyof typeof MIX; share: number }[];
};

const CHAPTERS: Chapter[] = [
  {
    when: "Then",
    title: "Employed, building on the side",
    sub: "Finance role, citizen developer. I built the reports and apps my own team needed.",
    mix: [{ key: "job", share: 100 }],
  },
  {
    when: "Next",
    title: "Teaching before leaving",
    sub: "Trainings and courses in the evenings. Became a Microsoft Certified Trainer. Income and visibility grew together.",
    mix: [
      { key: "job", share: 70 },
      { key: "side", share: 30 },
    ],
  },
  {
    when: "Now",
    title: "Full-time freelance",
    sub: "Consulting, training and content. Long-term contracts, not gig hunting.",
    mix: [
      { key: "consult", share: 50 },
      { key: "train", share: 30 },
      { key: "content", share: 20 },
    ],
  },
];

const TOTAL_STEPS = CHAPTERS.length + 1;

function ChapterCard({ c, index }: { c: Chapter; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white/75 p-7 shadow-sm backdrop-blur-sm"
    >
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-4xl font-semibold text-slate-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-700">
          {c.when}
        </span>
      </div>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-slate-900">
        {c.title}
      </h2>
      <p className="mt-3 text-lg leading-snug text-slate-600">{c.sub}</p>

      {/* work mix */}
      <div className="mt-auto pt-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-400">
          How the week was split
        </div>
        <div className="mt-2 flex h-5 w-full overflow-hidden rounded-full bg-slate-100">
          {c.mix.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ width: 0 }}
              animate={{ width: `${m.share}%` }}
              transition={{ duration: 0.8, delay: 0.25 + i * 0.12, ease: EASE }}
              style={{ background: MIX[m.key].color }}
            />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {c.mix.map((m) => (
            <span key={m.key} className="flex items-center gap-1.5 text-sm text-slate-600">
              <span className="h-2 w-2 rounded-full" style={{ background: MIX[m.key].color }} />
              {MIX[m.key].label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MyPathSlide({ step }: SlideProps) {
  const shown = Math.max(0, Math.min(step, CHAPTERS.length));
  return (
    <SlideShell eyebrow="Act 4 · My path" showParticles={false}>
      <div className="flex h-full flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-brand-700">
            One path, not the path
          </p>
          <h1
            className="mt-3 font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
            style={{ fontSize: "clamp(2.4rem, 4.8vw, 4.4rem)" }}
          >
            How I went freelance{" "}
            <span className="shimmer-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent">
              without jumping.
            </span>
          </h1>
        </motion.div>

        <div className="grid min-h-0 flex-1 grid-cols-3 gap-6">
          <AnimatePresence initial={false}>
            {CHAPTERS.slice(0, shown).map((c, i) => (
              <ChapterCard key={c.title} c={c} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Reserved line so the grid never resizes when the lesson appears */}
        <div className="h-8 shrink-0">
          <motion.p
            initial={false}
            animate={{
              opacity: shown === CHAPTERS.length ? 1 : 0,
              y: shown === CHAPTERS.length ? 0 : 8,
            }}
            transition={{ delay: shown === CHAPTERS.length ? 0.5 : 0, duration: 0.5 }}
            className="text-xl text-slate-600"
          >
            The bridge was teaching. It paid, it built proof, and it never
            required quitting.
          </motion.p>
        </div>
      </div>
    </SlideShell>
  );
}

export const slide30g: SlideEntry = {
  meta: {
    id: "30g-my-path",
    title: "How I went freelance without jumping",
    section: "Act 4 · What to do Monday",
    steps: TOTAL_STEPS,
    notes:
      "Personal story, framed as one path, not the path. Three chapter cards, one click each; each card ends with a bar showing how the week was split in that phase. The bars are qualitative (no real percentages on screen), so don't quote numbers off them.\n\n• Step 1 (load): Title only. Say: 'I get asked about freelancing a lot. Here's how I did it, and the honest version is: I never jumped.'\n• Step 2: Chapter 01, employed. Say: 'I was in a finance role, building the reports and apps my own team needed. Citizen developer, exactly the road from a few slides ago.'\n• Step 3: Chapter 02, teaching before leaving. Say: 'Then I started teaching in the evenings. Trainings, then courses, then the MCT. Two things grew at the same time: a second income and visibility. Every training room is a room full of potential clients.'\n• Step 4: Chapter 03, full-time freelance. Say: 'By the time I went full-time it wasn't a leap. Consulting, training, content. Long-term contracts, not gig hunting.' Then the lesson line: 'The bridge was teaching. It paid, it built proof, and it never required quitting.'\n\nFill in real years and the actual split if you want to say them out loud; the slide deliberately shows none. Then the CTA.",
  },
  Component: MyPathSlide,
};
