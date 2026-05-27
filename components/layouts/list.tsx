"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

const HUES = [
  "from-violet-300 to-fuchsia-200",
  "from-pink-300 to-rose-200",
  "from-sky-300 to-cyan-200",
  "from-emerald-300 to-teal-200",
  "from-amber-300 to-orange-200",
  "from-indigo-300 to-violet-200",
];

export type ListItem = {
  name: string;
  desc: string;
};

type Props = {
  title: ReactNode;
  titleAccent?: ReactNode;
  body?: ReactNode;
  items: ListItem[];
  /**
   * Optional step-based reveal. When provided, only show the first N items.
   * Each newly revealed item animates in with a spring float-from-below.
   * When omitted, all items render together with a staggered entry.
   */
  revealedCount?: number;
};

export function ListLayout({
  title,
  titleAccent,
  body,
  items,
  revealedCount,
}: Props) {
  const isStepped = revealedCount !== undefined;
  const visibleItems = isStepped
    ? items.slice(0, Math.max(0, Math.min(revealedCount, items.length)))
    : items;

  return (
    <div className="grid flex-1 grid-cols-12 items-center gap-8">
      <div className="col-span-5">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-semibold leading-[1.02] tracking-[-0.02em] text-slate-900"
          style={{ fontSize: "clamp(1.9rem, 4vw, 3.6rem)" }}
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
        {body && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 max-w-[40ch] text-base leading-[1.6] text-slate-600"
          >
            {body}
          </motion.p>
        )}
      </div>

      <div className="col-span-7">
        <ul className="space-y-4">
          <AnimatePresence initial={!isStepped}>
            {visibleItems.map((item, i) => (
              <motion.li
                key={item.name}
                initial={
                  isStepped
                    ? { opacity: 0, y: 36, scale: 0.94 }
                    : { opacity: 0, x: 24 }
                }
                animate={
                  isStepped
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 1, x: 0 }
                }
                exit={
                  isStepped
                    ? { opacity: 0, y: 16, scale: 0.96 }
                    : { opacity: 0 }
                }
                transition={
                  isStepped
                    ? {
                        type: "spring",
                        stiffness: 180,
                        damping: 22,
                        mass: 0.9,
                      }
                    : {
                        delay: 0.5 + i * 0.08,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
                className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-colors duration-200 hover:border-violet-400 hover:bg-white"
              >
                <div className="flex items-center gap-5">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${
                      HUES[i % HUES.length]
                    } font-mono text-sm font-bold text-slate-900`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-2xl font-semibold leading-tight text-slate-900">
                      {item.name}
                    </div>
                    <div className="mt-0.5 text-base leading-snug text-slate-600">
                      {item.desc}
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
