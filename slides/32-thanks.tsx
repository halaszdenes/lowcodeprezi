"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

const EASE = [0.22, 1, 0.36, 1] as const;
const FEEDBACK_QR =
  "/low-code-big-impact-transforming-careers-with-po_halasz_1250562_feedback-code.png";

function ThanksSlide(_: SlideProps) {
  return (
    <SlideShell footerLeft="Thanks for being here">
      <div className="grid h-full grid-cols-12 items-center gap-12">
        {/* Left: thanks + contact */}
        <div className="col-span-7 flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 font-mono text-xs uppercase tracking-[0.35em] text-brand-700"
          >
            Thank you
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
            className="font-display font-semibold leading-[0.98] tracking-[-0.03em] text-slate-900"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
          >
            Questions?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 text-2xl leading-[1.5] text-slate-600"
          >
            hello@deneshalasz.com
            <br />
            <span className="text-slate-500">/in/deneshalasz</span>
          </motion.p>
        </div>

        {/* Right: session feedback QR */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 180, damping: 22 }}
          className="col-span-5 flex justify-center"
        >
          <div className="flex w-full max-w-[400px] flex-col items-center rounded-3xl border border-brand-200 bg-white/90 p-7 shadow-lg backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-700">
              Rate this session
            </p>
            <img
              src={FEEDBACK_QR}
              alt="QR code for session feedback"
              className="mt-4 block w-full rounded-xl"
            />
            <p className="mt-3 text-center text-lg font-medium text-slate-700">
              Scan to leave feedback
            </p>
            <p className="mt-1 text-center text-sm text-slate-500">
              Two minutes, and it helps the next talk.
            </p>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}

export const slide32: SlideEntry = {
  meta: {
    id: "19-thanks",
    title: "Thanks + Q&A",
    section: "Act 4 · What to do Monday",
    notes:
      "While you think of questions, scan this and rate the session. Two minutes, and it decides whether I get to do this again.\n\n• Leave this slide up for the whole Q&A so people can grab the email, the LinkedIn handle and the code.",
  },
  Component: ThanksSlide,
};
