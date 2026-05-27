"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  titleAccent?: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
};

export function StatementLayout({
  title,
  titleAccent,
  body,
  align = "left",
}: Props) {
  const alignClass = align === "center" ? "items-center text-center" : "";

  return (
    <div className={`flex flex-1 flex-col justify-center ${alignClass}`}>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[22ch] font-display font-semibold leading-[1.02] tracking-[-0.02em] text-slate-900"
        style={{ fontSize: "clamp(2.6rem, 5.6vw, 5.4rem)" }}
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
          transition={{ delay: 0.55, duration: 0.5 }}
          className={`mt-8 max-w-[52ch] text-2xl leading-[1.5] text-slate-600 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {body}
        </motion.p>
      )}
    </div>
  );
}
