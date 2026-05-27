"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

type Bullet = string | { main: string; subs: string[] };

const POSITIVES: Bullet[] = [
  "Silicon Valley Glamour: Big Tech perks",
  "High Salaries & Stock Options",
  "Flexibility & Remote Work",
  'Opportunities for "Digital Nomad" lifestyle',
];

const NEGATIVES: Bullet[] = [
  "Coding is difficult!",
  {
    main: "Market Shifts & High Competition",
    subs: [
      "High interest rates → fewer projects",
      "Juniors competing with seniors",
    ],
  },
  {
    main: "AI Disruption",
    subs: ["Automation of entry-level coding tasks"],
  },
];

const VIDEO_SRC = "/good-side-bad-side.mp4";
const VIDEO_ASPECT = "1248 / 1656"; // portrait, matches OG slide 6 image

// Step layout:
// 0: title (good), video paused, no bullets
// 1..4: reveal 4 positives
// 5: TRANSITION — positives fade out, title swaps, theme darkens, video plays. NO negatives yet.
// 6..8: reveal 3 negatives (each main bullet appears with its sub-items)
const TRANSITION_STEP = POSITIVES.length + 1; // 5
const TOTAL_STEPS = TRANSITION_STEP + NEGATIVES.length + 1; // 9

// Phase-driven theme colors — dark theme is near-black (neutral, not slate-blue)
const COLORS = {
  light: {
    bg: "#ffffff",
    title: "#0f172a",
    bullet: "#475569",
    border: "#e2e8f0",
  },
  dark: {
    bg: "#0a0a0a", // near-black (neutral-950) instead of slate-blue
    title: "#ffffff",
    bullet: "#d4d4d4", // neutral-300
    border: "#262626", // neutral-800
  },
};

// Matches the 5.04s video runtime so the slide theme transitions in lockstep
// with the on-screen video going from sunny to dark.
const THEME_TRANSITION = 5;

function BulletItem({
  bullet,
  dotClass,
}: {
  bullet: Bullet;
  dotClass: string;
}) {
  const isComplex = typeof bullet !== "string";
  const main = isComplex ? bullet.main : bullet;
  const subs = isComplex ? bullet.subs : [];

  return (
    <motion.li
      initial={{ opacity: 0, x: -20, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      style={{ color: "var(--bullet-text)" }}
    >
      <div className="flex items-center gap-4 text-3xl font-medium">
        <span className={`h-3 w-3 shrink-0 rounded-full ${dotClass}`} />
        <span>{main}</span>
      </div>
      {subs.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2 pl-[1.75rem]">
          {subs.map((sub, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-xl leading-snug opacity-80"
            >
              <span className="mt-3 h-px w-3.5 shrink-0 bg-current" />
              <span>{sub}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.li>
  );
}

function TechGoodAndBadScene({ step }: { step: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isBadPhase = step >= TRANSITION_STEP;
  const theme = isBadPhase ? COLORS.dark : COLORS.light;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isBadPhase) {
      if (video.paused) {
        video.currentTime = 0;
        const p = video.play();
        if (p) p.catch(() => {});
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isBadPhase]);

  const positivesShownCount = isBadPhase
    ? 0
    : Math.min(step, POSITIVES.length);
  // Negatives start appearing ONE STEP AFTER the transition step,
  // so the transition itself lands cleanly without a competing bullet.
  const negativesShownCount = isBadPhase
    ? Math.max(0, Math.min(step - TRANSITION_STEP, NEGATIVES.length))
    : 0;

  return (
    <motion.div
      className="grid h-full grid-cols-12 items-center gap-10"
      initial={false}
      animate={{
        // Animate CSS variables so all descendant text colors transition smoothly
        // with the same timing as the background fade.
        ["--title-text" as string]: theme.title,
        ["--bullet-text" as string]: theme.bullet,
        ["--panel-border" as string]: theme.border,
      }}
      transition={{ duration: THEME_TRANSITION, ease: [0.22, 1, 0.36, 1] }}
      style={
        {
          ["--title-text" as string]: theme.title,
          ["--bullet-text" as string]: theme.bullet,
          ["--panel-border" as string]: theme.border,
        } as React.CSSProperties
      }
    >
      {/* Left column: title fixed at top, bullets below */}
      <div className="col-span-7 flex h-full flex-col pt-2">
        {/* Title container has a fixed min-height; titles inside are absolute
            so swapping doesn't shift the layout. Sized to fit the longer
            (dark) title's likely 3-line wrap. */}
        <div className="relative" style={{ minHeight: "13rem" }}>
          <AnimatePresence mode="wait">
            {!isBadPhase ? (
              <motion.h1
                key="good-title"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 max-w-[18ch] font-display font-semibold leading-[1.05] tracking-tight"
                style={{
                  color: "var(--title-text)",
                  fontSize: "clamp(2.2rem, 4.4vw, 4.4rem)",
                }}
              >
                Why tech is still{" "}
                <span className="shimmer-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
                  attractive.
                </span>
              </motion.h1>
            ) : (
              <motion.h1
                key="bad-title"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 max-w-[20ch] font-display font-semibold leading-[1.05] tracking-tight"
                style={{
                  color: "var(--title-text)",
                  fontSize: "clamp(2rem, 3.8vw, 3.8rem)",
                }}
              >
                The{" "}
                <span className="text-red-400">Darker Side</span>{" "}
                of Software Development
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        {/* Bullets */}
        <div className="relative mt-6">
          <AnimatePresence mode="wait">
            {!isBadPhase ? (
              <motion.ul
                key="positives"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-5"
              >
                {POSITIVES.slice(0, positivesShownCount).map((item, i) => (
                  <BulletItem key={i} bullet={item} dotClass="bg-violet-500" />
                ))}
              </motion.ul>
            ) : (
              <motion.ul
                key="negatives"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-5"
              >
                {NEGATIVES.slice(0, negativesShownCount).map((item, i) => (
                  <BulletItem key={i} bullet={item} dotClass="bg-red-500" />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right column: video — single persistent element, border animates with theme */}
      <div className="col-span-5 flex h-full items-center justify-center">
        <div
          className="relative h-full overflow-hidden rounded-2xl border shadow-md"
          style={{
            aspectRatio: VIDEO_ASPECT,
            maxWidth: "100%",
            borderColor: "var(--panel-border)",
          }}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            className="block h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </motion.div>
  );
}

function TechGoodAndBadSlide({ step }: SlideProps) {
  const isBadPhase = step >= TRANSITION_STEP;
  return (
    <SlideShell
      eyebrow="Tech: the upside and the catch"
      showAmbient={false}
      showParticles={false}
      bgColor={isBadPhase ? COLORS.dark.bg : COLORS.light.bg}
      bgTransitionDuration={THEME_TRANSITION}
    >
      <TechGoodAndBadScene step={step} />
    </SlideShell>
  );
}

export const slide01: SlideEntry = {
  meta: {
    id: "01-tech-good-and-bad",
    title: "Tech is attractive — but the default path is harder",
    section: "Act 1 · Setup",
    steps: TOTAL_STEPS,
    notes:
      "Two-faced setup with OG-style bullets. Same video + same title position across both phases — only theme + content change. 9 steps total:\n\n• Step 1 (load): Light theme. Title 'Why tech is still attractive.' Paused sunny video. No bullets.\n• Step 2: + 'Silicon Valley Glamour: Big Tech perks'\n• Step 3: + 'High Salaries & Stock Options'\n• Step 4: + 'Flexibility & Remote Work'\n• Step 5: + 'Opportunities for \"Digital Nomad\" lifestyle'\n• Step 6 (TRANSITION): Title swaps in place to 'The Darker Side of Software Development.' Theme animates from white → near-black over 5s (synced with video). Video starts playing (sunny → dark). Positives clear, NO negative bullets yet — just the empty area + the dramatic theme shift. Say: 'But it's not all sunshine. When people hear tech career, they default to becoming a software developer. And that path is harder than the brochure says.'\n• Step 7: + 'Coding is difficult!'\n• Step 8: + 'Market Shifts & High Competition' (with sub-bullets: 'High interest rates → fewer projects', 'Juniors competing with seniors')\n• Step 9: + 'AI Disruption' (with sub-bullet: 'Automation of entry-level coding tasks')\n\nNext: click to slide 3 ('There's another door') — the low-code pivot.",
  },
  Component: TechGoodAndBadSlide,
};
