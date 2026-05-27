"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  titleAccent?: ReactNode;
  subtitle?: ReactNode;
  footnote?: ReactNode;
};

export function HeroLayout({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  footnote,
}: Props) {
  return (
    <div className="flex flex-1 flex-col justify-center">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 font-mono text-xs uppercase tracking-[0.35em] text-violet-700"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[16ch] font-display font-semibold leading-[0.98] tracking-[-0.03em] text-slate-900"
        style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
      >
        {title}
        {titleAccent && (
          <>
            <br />
            <span className="shimmer-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
              {titleAccent}
            </span>
          </>
        )}
      </motion.h1>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 max-w-[50ch] text-xl leading-[1.5] text-slate-600"
        >
          {subtitle}
        </motion.p>
      )}

      {footnote && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-slate-400"
        >
          {footnote}
        </motion.p>
      )}
    </div>
  );
}
