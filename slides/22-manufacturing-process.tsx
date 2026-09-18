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
    accent: "#2d95e6",
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
    sub: "Samples wait their turn: first in, first out.",
    accent: "#34d399",
    mirror: true,
  },
];

// Cinematic timings
const CROSSFADE = 1.4;
const CHYRON_DELAY = 0.45;
const CHYRON_DURATION = 0.9;
const TIMELINE_DURATION = 0.75;

// 5-step state machine. First video auto-starts on slide mount:
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

      {/* Chapter chyron, bottom left: persists across paused/playing within same chapter, subtitle swaps */}
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
                  {isPlaying && (
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
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
      </AnimatePresence>

      {/* (intro overlay removed; first video auto-starts on slide mount) */}
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
    title: "Setting the scene: manufacturing process",
    section: "Act 3 · Proof",
    steps: 5,
    notes:
      "Let me show you what this factory does. Three lines, three different products, all running at the same time.\n\n[when chapter two is ready, click] After each batch, quality control pulls one sample from each line and bags it.\n\n[when chapter three is ready, click] The samples go onto a shelf and wait for inspection. First in, first out. That's the rule. Now watch what happens.",
  },
  Component: ManufacturingProcessSlide,
};
