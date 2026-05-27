"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { slides } from "@/slides";
import { useSlideNav } from "@/hooks/use-slide-nav";
import { SlideGrid } from "./slide-grid";
import { DeckContextProvider } from "./slide-shell";

export function SlideDeck() {
  const {
    index,
    step,
    stepCount,
    total,
    goTo,
    overview,
    setOverview,
    next,
    prev,
  } = useSlideNav({ slides });

  const entry = slides[index];
  const Slide = entry.Component;

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      document.documentElement.requestFullscreen?.().catch(() => {});
    }
  }, []);

  return (
    <main className="fixed inset-0 flex items-center justify-center bg-[#f3f3f1]">
      <div className="slide-stage relative overflow-hidden rounded-md bg-white shadow-[0_8px_40px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/60">
        <DeckContextProvider
          value={{
            slideIndex: index,
            slideTotal: total,
            section: entry.meta.section,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <Slide
              key={entry.meta.id}
              index={index}
              total={total}
              step={step}
              next={next}
              prev={prev}
              isActive
            />
          </AnimatePresence>
        </DeckContextProvider>
      </div>

      <div
        className={`pointer-events-none fixed bottom-4 left-1/2 z-30 -translate-x-1/2 transition-opacity duration-200 ${
          isFullscreen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-hidden={isFullscreen}
      >
        <div className="pointer-events-auto flex flex-col items-center gap-2">
          {stepCount > 1 && (
            <div className="flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 shadow-sm ring-1 ring-slate-200/80">
              {Array.from({ length: stepCount }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === step
                      ? "w-5 bg-violet-600"
                      : i < step
                        ? "w-1.5 bg-violet-300"
                        : "w-1.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-xs text-slate-700 shadow-sm backdrop-blur">
            <button
              onClick={prev}
              disabled={index === 0 && step === 0}
              aria-label="Previous"
              className="rounded-full px-2 py-1 transition hover:text-violet-600 disabled:opacity-30"
            >
              ←
            </button>
            <span className="font-mono">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              disabled={index === total - 1 && step === stepCount - 1}
              aria-label="Next"
              className="rounded-full px-2 py-1 transition hover:text-violet-600 disabled:opacity-30"
            >
              →
            </button>
            <span className="mx-2 h-3 w-px bg-slate-300" />
            <button
              onClick={() => setOverview(true)}
              className="rounded-full px-2 py-1 transition hover:text-violet-600"
              title="Overview (Esc)"
            >
              grid
            </button>
            <a
              href="/outline"
              target="outline"
              className="rounded-full px-2 py-1 transition hover:text-violet-600"
              title="Outline (O)"
            >
              outline
            </a>
            <button
              onClick={toggleFullscreen}
              className="rounded-full px-2 py-1 transition hover:text-violet-600"
              title="Fullscreen (F)"
            >
              {isFullscreen ? "exit" : "full"}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {overview && (
          <SlideGrid
            slides={slides}
            current={index}
            onPick={goTo}
            onClose={() => setOverview(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
