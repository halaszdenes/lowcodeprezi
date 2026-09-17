"use client";

import { motion } from "framer-motion";

type Accent = "brand" | "emerald";
type Marker = "check" | "arrow" | "dot";

const ACCENT: Record<
  Accent,
  { text: string; border: string; bg: string; marker: string }
> = {
  brand: {
    text: "text-brand-700",
    border: "border-brand-200",
    bg: "bg-brand-50/60",
    marker: "text-brand-600",
  },
  emerald: {
    text: "text-emerald-700",
    border: "border-emerald-200",
    bg: "bg-emerald-50/60",
    marker: "text-emerald-600",
  },
};

const SYMBOL: Record<Marker, string> = { check: "✓", arrow: "→", dot: "●" };

export function CriteriaList({
  heading,
  items,
  accent,
  marker = "check",
  startDelay = 0.4,
  size = "md",
}: {
  heading?: string;
  items: string[];
  accent: Accent;
  marker?: Marker;
  startDelay?: number;
  size?: "md" | "lg";
}) {
  const a = ACCENT[accent];
  const lg = size === "lg";
  return (
    <div className="flex flex-col gap-3">
      {heading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: Math.max(0, startDelay - 0.1) }}
          className={`font-mono uppercase tracking-[0.25em] ${a.text} ${
            lg ? "text-[13px]" : "text-[11px]"
          }`}
        >
          {heading}
        </motion.p>
      )}
      <ul className={`flex flex-col ${lg ? "gap-3" : "gap-2.5"}`}>
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: startDelay + i * 0.07, duration: 0.4 }}
            className={`flex items-start gap-3 rounded-lg border ${a.border} ${
              a.bg
            } ${lg ? "px-5 py-3" : "px-4 py-2.5"}`}
          >
            <span
              className={`mt-0.5 font-mono font-bold ${a.marker} ${
                lg ? "text-base" : "text-sm"
              }`}
              aria-hidden
            >
              {SYMBOL[marker]}
            </span>
            <span
              className={`leading-snug text-slate-800 ${
                lg ? "text-[19px]" : "text-[15px]"
              }`}
            >
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
