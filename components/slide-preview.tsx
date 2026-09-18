"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { SlideEntry } from "@/lib/slide-types";
import { DeckContextProvider } from "@/components/slide-shell";

// Slides are laid out at this size, then scaled to the preview's width.
const BASE_W = 1280;
const BASE_H = 720;
const noop = () => {};

/**
 * Live, non-interactive rendering of a slide, scaled to fit its container.
 * Used by the presenter window for the "now" and "next" panels.
 */
export function SlidePreview({
  entry,
  index,
  total,
  step,
}: {
  entry: SlideEntry;
  index: number;
  total: number;
  step: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / BASE_W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const Slide = entry.Component;

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200"
      style={{ aspectRatio: `${BASE_W} / ${BASE_H}` }}
    >
      {scale > 0 && (
        <div
          className="pointer-events-none absolute left-0 top-0 origin-top-left select-none"
          style={{ width: BASE_W, height: BASE_H, transform: `scale(${scale})` }}
        >
          <DeckContextProvider
            value={{ slideIndex: index, slideTotal: total, section: entry.meta.section }}
          >
            <Slide
              key={entry.meta.id}
              index={index}
              total={total}
              step={step}
              next={noop}
              prev={noop}
              isActive={false}
            />
          </DeckContextProvider>
        </div>
      )}
    </div>
  );
}
