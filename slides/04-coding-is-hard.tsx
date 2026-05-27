"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

// VS Code Dark+ inspired palette
const C = {
  bg: "#1e1e1e",
  chrome: "#252526",
  tabActive: "#1e1e1e",
  border: "#3c3c3c",
  text: "#d4d4d4",
  comment: "#6a9955",
  keyword: "#c586c0",
  control: "#569cd6",
  type: "#4ec9b0",
  string: "#ce9178",
  func: "#dcdcaa",
  variable: "#9cdcfe",
  tag: "#569cd6",
  number: "#b5cea8",
  lineNum: "#858585",
};

type Tok = { c: string; t: string };

// Hand-tokenized React code: a button that increments a counter.
// The point is to feel verbose, not to be the smallest possible example.
const CODE: Tok[][] = [
  [
    { c: C.keyword, t: "import" },
    { c: C.text, t: " { " },
    { c: C.variable, t: "useState" },
    { c: C.text, t: " } " },
    { c: C.keyword, t: "from" },
    { c: C.text, t: " " },
    { c: C.string, t: '"react"' },
    { c: C.text, t: ";" },
  ],
  [],
  [
    { c: C.keyword, t: "export function" },
    { c: C.text, t: " " },
    { c: C.func, t: "MyApp" },
    { c: C.text, t: "() {" },
  ],
  [
    { c: C.text, t: "  " },
    { c: C.keyword, t: "const" },
    { c: C.text, t: " [" },
    { c: C.variable, t: "count" },
    { c: C.text, t: ", " },
    { c: C.variable, t: "setCount" },
    { c: C.text, t: "] = " },
    { c: C.func, t: "useState" },
    { c: C.text, t: "(" },
    { c: C.number, t: "0" },
    { c: C.text, t: ");" },
  ],
  [],
  [
    { c: C.text, t: "  " },
    { c: C.keyword, t: "const" },
    { c: C.text, t: " " },
    { c: C.func, t: "handleClick" },
    { c: C.text, t: " = () => {" },
  ],
  [
    { c: C.text, t: "    " },
    { c: C.func, t: "setCount" },
    { c: C.text, t: "((" },
    { c: C.variable, t: "prev" },
    { c: C.text, t: ") => " },
    { c: C.variable, t: "prev" },
    { c: C.text, t: " + " },
    { c: C.number, t: "1" },
    { c: C.text, t: ");" },
  ],
  [{ c: C.text, t: "  };" }],
  [],
  [
    { c: C.text, t: "  " },
    { c: C.keyword, t: "return" },
    { c: C.text, t: " (" },
  ],
  [
    { c: C.text, t: "    <" },
    { c: C.tag, t: "div" },
    { c: C.text, t: " " },
    { c: C.variable, t: "className" },
    { c: C.text, t: "=" },
    { c: C.string, t: '"app"' },
    { c: C.text, t: ">" },
  ],
  [
    { c: C.text, t: "      <" },
    { c: C.tag, t: "button" },
  ],
  [
    { c: C.text, t: "        " },
    { c: C.variable, t: "onClick" },
    { c: C.text, t: "={" },
    { c: C.func, t: "handleClick" },
    { c: C.text, t: "}" },
  ],
  [
    { c: C.text, t: "        " },
    { c: C.variable, t: "className" },
    { c: C.text, t: "=" },
    { c: C.string, t: '"primary"' },
  ],
  [{ c: C.text, t: "      >" }],
  [
    { c: C.text, t: "        Click me ({" },
    { c: C.variable, t: "count" },
    { c: C.text, t: "})" },
  ],
  [
    { c: C.text, t: "      </" },
    { c: C.tag, t: "button" },
    { c: C.text, t: ">" },
  ],
  [
    { c: C.text, t: "    </" },
    { c: C.tag, t: "div" },
    { c: C.text, t: ">" },
  ],
  [{ c: C.text, t: "  );" }],
  [{ c: C.text, t: "}" }],
];

const LINE_BASE_DELAY = 0.6;
const LINE_STEP = 0.045;

function CodeWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/30"
      style={{ background: C.bg }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: C.chrome, borderBottom: `1px solid ${C.border}` }}
      >
        <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f56" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#ffbd2e" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#27c93f" }} />
        <div
          className="ml-5 flex items-center gap-2 rounded-t-md px-3 py-1.5 font-mono text-[11px]"
          style={{ background: C.tabActive, color: C.text }}
        >
          <span style={{ color: C.tag }}>{"<>"}</span>
          App.tsx
          <span style={{ color: "#e8b339" }}>●</span>
        </div>
      </div>

      {/* Code area */}
      <div className="flex font-mono" style={{ fontSize: "0.95rem", lineHeight: "1.55rem" }}>
        {/* Line numbers */}
        <div
          className="select-none py-5 pl-5 pr-3 text-right"
          style={{ color: C.lineNum, minWidth: "2.5rem" }}
        >
          {CODE.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code */}
        <div className="flex-1 py-5 pr-6">
          {CODE.map((tokens, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: LINE_BASE_DELAY + i * LINE_STEP,
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ minHeight: "1.55rem", whiteSpace: "pre" }}
            >
              {tokens.length === 0 ? (
                <span>&nbsp;</span>
              ) : (
                tokens.map((tok, j) => (
                  <span key={j} style={{ color: tok.c }}>
                    {tok.t}
                  </span>
                ))
              )}
              {i === CODE.length - 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    delay: LINE_BASE_DELAY + CODE.length * LINE_STEP + 0.3,
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="ml-1 inline-block"
                  style={{
                    width: "0.55rem",
                    height: "1.05rem",
                    background: C.text,
                    verticalAlign: "-2px",
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 py-1.5 font-mono text-[10px]"
        style={{ background: "#007acc", color: "#ffffff" }}
      >
        <span>TypeScript React · UTF-8</span>
        <span>{CODE.length} lines · Ln 20, Col 2</span>
      </div>
    </motion.div>
  );
}

function CodingIsHardSlide(_: SlideProps) {
  return (
    <SlideShell eyebrow="Pro-code" showAmbient={false} showParticles={false}>
      <div className="grid h-full grid-cols-12 items-center gap-12">
        <div className="col-span-5 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-violet-700">
              Adding a button
            </p>
            <h1
              className="mt-4 font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
              style={{ fontSize: "clamp(2.6rem, 5.4vw, 4.8rem)" }}
            >
              In code,{" "}
              <span className="shimmer-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
                this is what it takes.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="max-w-[38ch] text-lg leading-[1.6] text-slate-600"
          >
            Imports. State. A handler. JSX. Twenty lines, four concepts you
            already had to know — just to put one button on the screen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.6 }}
            className="mt-2 flex items-center gap-4"
          >
            <div className="flex items-baseline gap-2 rounded-full border border-slate-200 bg-white/70 px-5 py-2 shadow-sm backdrop-blur">
              <span className="font-display text-3xl font-semibold text-slate-900">
                20
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                lines
              </span>
            </div>
            <div className="flex items-baseline gap-2 rounded-full border border-slate-200 bg-white/70 px-5 py-2 shadow-sm backdrop-blur">
              <span className="font-display text-3xl font-semibold text-slate-900">
                4
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                concepts
              </span>
            </div>
          </motion.div>
        </div>

        <div className="col-span-7">
          <CodeWindow />
        </div>
      </div>
    </SlideShell>
  );
}

export const slide04: SlideEntry = {
  meta: {
    id: "04-coding-is-hard",
    title: "Adding a button — in code",
    section: "Act 1 · Setup",
    notes:
      "Setup for the side-by-side. Show what it takes to add a button in real code: imports, useState, a handler, JSX. The IDE-style window appears with line-by-line reveal so the audience watches the verbosity accumulate.\n\nSay: 'Quick gut check. Say you want to add a button to your app. Just a button — clicks, counts, that's it. In code, you need to know: how to import things, how to do state, how to write a handler, how JSX works. Twenty lines for one button. Multiply this by every screen, every field, every interaction.'\n\nNo step-based reveal — everything enters in one ~2s sequence. Next slide pays this off with the same task in a canvas app.",
  },
  Component: CodingIsHardSlide,
};
