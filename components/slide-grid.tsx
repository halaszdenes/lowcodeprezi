"use client";

import { motion } from "framer-motion";
import type { SlideEntry } from "@/lib/slide-types";

type Props = {
  slides: SlideEntry[];
  current: number;
  onPick: (index: number) => void;
  onClose: () => void;
};

export function SlideGrid({ slides, current, onPick, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-md"
    >
      <header className="flex items-center justify-between px-8 py-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Overview
          </p>
          <h2 className="font-display text-2xl text-slate-900">
            {slides.length} slides
          </h2>
        </div>
        <button
          onClick={onClose}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-violet-500 hover:text-violet-600"
        >
          Close (Esc)
        </button>
      </header>
      <div className="flex-1 overflow-auto px-8 pb-12">
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {slides.map((slide, i) => {
            const active = i === current;
            return (
              <li key={slide.meta.id}>
                <button
                  onClick={() => onPick(i)}
                  className={`group relative aspect-video w-full overflow-hidden rounded-xl border text-left transition ${
                    active
                      ? "border-violet-500 shadow-[0_0_0_2px_rgba(139,92,246,0.25)]"
                      : "border-slate-200 hover:border-violet-400"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50" />
                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    <span className="font-mono text-xs text-slate-500">
                      {String(i + 1).padStart(2, "0")} · {slide.meta.section}
                    </span>
                    <span className="font-display text-sm leading-tight text-slate-900">
                      {slide.meta.title}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}
