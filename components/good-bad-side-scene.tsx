"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  /** The headline shown above the bullets. */
  title: string;
  /** Optional accent fragment, rendered with a shimmering gradient after the title. */
  titleAccent?: string;
  /** Bullet points revealed one-by-one as `step` increases (step 1 reveals first bullet, etc). */
  bullets: string[];
  /** 0-indexed step. step 0 = no bullets; step N reveals bullet (N-1) and earlier. */
  step: number;
  /**
   * Video behavior on slide mount:
   * - "paused": video held on its first frame (no autoplay, no play overlay)
   * - "playing": video starts from t=0 and plays through. Stops at end (no loop, no advance).
   */
  mode: "paused" | "playing";
  /** Accent color for bullet dots. Hex string. */
  accent: string;
};

const VIDEO_SRC = "/good-side-bad-side.mp4";
const VIDEO_ASPECT = "1248 / 1656"; // portrait, matches OG slide 6 image

export function GoodBadSideScene({
  title,
  titleAccent,
  bullets,
  step,
  mode,
  accent,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Drive the video based on the mode prop. Each slide mounts its own
  // <video> element, so this runs once on slide entry.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (mode === "playing") {
      video.currentTime = 0;
      const p = video.play();
      if (p) p.catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [mode]);

  return (
    <div className="grid h-full grid-cols-12 items-center gap-10">
      {/* Left: title + bullets */}
      <div className="col-span-7 flex h-full flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[18ch] font-display font-semibold leading-[1.05] tracking-tight text-slate-900"
          style={{ fontSize: "clamp(2.2rem, 4.4vw, 4.4rem)" }}
        >
          {title}
          {titleAccent && (
            <>
              {" "}
              <span className="shimmer-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
                {titleAccent}
              </span>
            </>
          )}
        </motion.h1>

        <ul className="mt-10 flex flex-col gap-5">
          {bullets.map((item, i) => {
            const visible = step > i;
            return (
              <AnimatePresence key={i} mode="popLayout">
                {visible && (
                  <motion.li
                    layout
                    initial={{ opacity: 0, x: -20, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 24,
                      delay: 0.05,
                    }}
                    className="flex items-center gap-4 text-2xl font-medium text-slate-700"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: accent }}
                    />
                    <span>{item}</span>
                  </motion.li>
                )}
              </AnimatePresence>
            );
          })}
        </ul>
      </div>

      {/* Right: video panel — portrait aspect, fits within column height */}
      <div className="col-span-5 flex h-full items-center justify-center">
        <div
          className="relative h-full overflow-hidden rounded-2xl border border-slate-200 shadow-md"
          style={{
            aspectRatio: VIDEO_ASPECT,
            maxWidth: "100%",
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
    </div>
  );
}
