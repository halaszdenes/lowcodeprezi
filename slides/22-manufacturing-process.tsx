"use client";

import { Fragment, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

const VIDEOS = [
  {
    src: "/videos/1-tyresmanufacturingdroppingbasket.mp4",
    label: "Production",
    sub: "Three lines, three products, all running in parallel.",
    accent: "#a78bfa",
  },
  {
    src: "/videos/2-handputtingsampleinbag.mp4",
    label: "Sampling",
    sub: "QA pulls one sample from each line.",
    accent: "#fbbf24",
  },
  {
    src: "/videos/3-paperbagsputonshelf.mp4",
    label: "Queueing",
    sub: "Samples wait their turn — first in, first out.",
    accent: "#34d399",
    mirror: true,
  },
];

// Cinematic timings
const CROSSFADE = 1.4;
const CHYRON_DELAY = 0.45;
const CHYRON_DURATION = 0.9;
const TIMELINE_DURATION = 0.75;

// 5-step state machine — first video auto-starts on slide mount:
// step 0: video 0 playing (autostart) → onEnded auto-advances to step 1
// step 1: video 1 ready (paused, first frame)
// step 2: video 1 playing → auto-advances to step 3
// step 3: video 2 ready
// step 4: video 2 playing → STOPS (no advance)
function VideoSequence({ step, onNext }: { step: number; onNext: () => void }) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const visibleIndex = Math.min(
    Math.floor((step + 1) / 2),
    VIDEOS.length - 1,
  );
  const isPlaying = step % 2 === 0;
  const isLastVideo = visibleIndex === VIDEOS.length - 1;
  const current = VIDEOS[visibleIndex];

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === visibleIndex) {
        if (isPlaying) {
          video.currentTime = 0;
          const p = video.play();
          if (p) p.catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      } else {
        // For non-visible videos, just pause (keep current frame so the
        // outgoing video's last frame is shown during the crossfade).
        video.pause();
      }
    });
  }, [visibleIndex, isPlaying]);

  const handleEnded = () => {
    // Only auto-advance if we're not on the final video.
    // The last video stops at its end (no advance to next slide).
    if (isLastVideo) return;
    onNext();
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {VIDEOS.map((video, i) => (
        <motion.video
          key={i}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          src={video.src}
          className={`absolute inset-0 h-full w-full object-cover ${
            video.mirror ? "-scale-x-100" : ""
          }`}
          initial={false}
          animate={{ opacity: i === visibleIndex ? 1 : 0 }}
          transition={{ duration: CROSSFADE, ease: [0.22, 1, 0.36, 1] }}
          muted
          playsInline
          preload="auto"
          onEnded={handleEnded}
        />
      ))}

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Cinematic letterbox bars */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[5%] bg-black" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[5%] bg-black" />

      {/* Chapter timeline overlay, top center */}
      <div className="absolute left-1/2 top-[8%] z-10 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 rounded-full bg-black/55 px-4 py-2 backdrop-blur-md"
        >
          {VIDEOS.map((video, i) => {
            const isActiveChapter = i === visibleIndex;
            const isComplete = i < visibleIndex;
            return (
              <Fragment key={i}>
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{
                      scale: isActiveChapter ? 1.25 : 1,
                      backgroundColor: isActiveChapter
                        ? video.accent
                        : isComplete
                          ? "#ffffff80"
                          : "#ffffff30",
                    }}
                    transition={{ duration: TIMELINE_DURATION }}
                    className="h-1.5 w-1.5 rounded-full"
                  />
                  <motion.span
                    animate={{
                      color: isActiveChapter ? video.accent : "#ffffff80",
                    }}
                    transition={{ duration: TIMELINE_DURATION }}
                    className="font-mono text-[10px] uppercase tracking-[0.25em]"
                  >
                    {String(i + 1).padStart(2, "0")} {video.label}
                  </motion.span>
                </div>
                {i < VIDEOS.length - 1 && (
                  <span className="h-px w-6 bg-white/25" />
                )}
              </Fragment>
            );
          })}
        </motion.div>
      </div>

      {/* Status badge, top right — switches between PLAYING and READY */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`status-${isPlaying ? "playing" : "ready"}-${visibleIndex}`}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute right-[6%] top-[8%] z-10 flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 backdrop-blur-md"
        >
          <motion.span
            animate={{ opacity: isPlaying ? [0.35, 1, 0.35] : 1 }}
            transition={{
              duration: 1.8,
              repeat: isPlaying ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="h-2 w-2 rounded-full"
            style={{ background: current.accent }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/85">
            {isPlaying
              ? `Playing · ${visibleIndex + 1}/${VIDEOS.length}`
              : isLastVideo
                ? `End · ${visibleIndex + 1}/${VIDEOS.length}`
                : `Ready · ${visibleIndex + 1}/${VIDEOS.length}`}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Chapter chyron, bottom left — persists across paused/playing within same chapter, subtitle swaps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`chyron-${visibleIndex}`}
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{
              duration: CHYRON_DURATION,
              ease: [0.22, 1, 0.36, 1],
              delay: CHYRON_DELAY,
            }}
            className="absolute bottom-[10%] left-[6%] z-10 flex items-end gap-5"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 96 }}
              transition={{
                duration: CHYRON_DURATION,
                delay: CHYRON_DELAY,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-[3px] rounded-full"
              style={{ background: current.accent }}
            />
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: CHYRON_DELAY + 0.15 }}
                className="font-mono text-xs uppercase tracking-[0.35em] text-white/70"
              >
                Chapter {String(visibleIndex + 1).padStart(2, "0")}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: CHYRON_DELAY + 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-1 font-display text-5xl font-bold leading-[1.05] text-white"
              >
                {current.label}
              </motion.div>
              <div className="mt-2 h-7 max-w-[40ch] overflow-hidden">
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div
                      key={`sub-${visibleIndex}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.45 }}
                      className="text-base text-white/80"
                    >
                      {current.sub}
                    </motion.div>
                  ) : isLastVideo ? null : (
                    <motion.div
                      key={`hint-${visibleIndex}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.45 }}
                      className="flex items-center gap-2 text-sm text-white/70"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        ▶
                      </motion.span>
                      <span className="font-mono text-xs uppercase tracking-[0.25em]">
                        Press → to play
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
      </AnimatePresence>

      {/* (intro overlay removed — first video auto-starts on slide mount) */}
    </div>
  );
}

function ManufacturingProcessSlide({ step, next }: SlideProps) {
  return (
    <SlideShell fullBleed>
      <VideoSequence step={step} onNext={next} />
    </SlideShell>
  );
}

export const slide22: SlideEntry = {
  meta: {
    id: "13-manufacturing-process",
    title: "Setting the scene — manufacturing process",
    section: "Act 3 · Proof",
    steps: 5,
    notes:
      "Cinematic 3-chapter video sequence. First video auto-starts on slide mount. Subsequent videos require a click to start (after the previous one ends + auto-advances to a ready state). 5 click steps total:\n\n• Step 1 (slide loads): Video 1 — Production — auto-starts immediately. Chyron unfolds: 'CHAPTER 01 / PRODUCTION / Three lines, three products, all running in parallel.' Say: 'Let me show you what this factory does.' Video plays through once.\n• Step 2 (auto): Video 1 ends → auto-advances. Video 2 paused at first frame. Chyron updates to 'CHAPTER 02 / SAMPLING / ▶ Press → to play'. Say: 'After each batch, QA pulls one sample from each line.'\n• Step 3 (click 1): Video 2 plays. Subtitle replaces hint with 'QA pulls one sample from each line.' Let it play.\n• Step 4 (auto): Video 2 ends → auto-advances. Video 3 paused. Chyron updates to 'CHAPTER 03 / QUEUEING / ▶ Press → to play'. Say: 'The samples go on a shelf. First in, first out — that's the rule.'\n• Step 5 (click 2): Video 3 plays. Plays through and STOPS (no auto-advance). Status badge: 'End · 3/3'. Say: 'Now watch what happens.'\n• Step 6 (click 3): Advances to slide 14 (FIFO disaster).\n\nThe 1.4s crossfade between videos gives a cinematic beat. Total clicks within this slide: 3 (start video 2, start video 3, leave slide).",
  },
  Component: ManufacturingProcessSlide,
};
