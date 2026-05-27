"use client";

import { motion } from "framer-motion";

const tools = [
  {
    name: "Power BI",
    desc: "Turn data into dashboards that update themselves.",
  },
  {
    name: "Power Apps",
    desc: "Build forms and tools your team actually uses.",
  },
  {
    name: "Power Automate",
    desc: "Automate the boring multi-step stuff in the background.",
  },
  {
    name: "Copilot Studio",
    desc: "Build custom AI agents — embedded throughout the platform.",
  },
  {
    name: "Power Pages",
    desc: "External-facing portals without bothering the web team.",
  },
];

const INK = "#1a1612";
const MUTED = "#6b5f4d";
const ACCENT = "#b45309";
const CREAM = "#f7f1e3";
const PAPER = "#fefdf9";
const BORDER = "#e9e1cd";

export default function Preview2() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: CREAM, color: INK }}
    >
      <motion.div
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 18% 30%, rgba(180, 83, 9, 0.18), transparent 55%), radial-gradient(ellipse at 82% 78%, rgba(217, 119, 6, 0.13), transparent 55%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,22,18,1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,22,18,1) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 75%)",
        }}
      />

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full"
          style={{ background: ACCENT }}
          initial={{
            x: `${(i * 53) % 100}%`,
            y: `${(i * 37) % 100}%`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3 + (i % 4),
            delay: (i % 5) * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative flex h-full flex-col px-[6%] py-[5%]">
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5 inline-flex w-fit items-center gap-3 rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] shadow-sm backdrop-blur"
          style={{
            borderColor: `${ACCENT}55`,
            background: PAPER + "cc",
            color: ACCENT,
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: ACCENT }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: ACCENT }}
            />
          </span>
          15 · the toolbox · act 04
        </motion.div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-5">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-medium leading-[1.02] tracking-[-0.02em]"
              style={{
                fontFamily: "ui-serif, Georgia, 'Times New Roman', serif",
                fontSize: "clamp(2rem, 4.4vw, 4rem)",
                color: INK,
              }}
            >
              Power Platform:{" "}
              <em style={{ fontStyle: "italic", color: ACCENT, fontWeight: 500 }}>
                five tools, one ecosystem.
              </em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 max-w-[40ch] text-base leading-[1.6]"
              style={{ color: MUTED }}
            >
              Wired into Microsoft 365, Dataverse, and each other. Copilot is
              now embedded in every one.
            </motion.p>
          </div>

          <div className="col-span-7">
            <ul className="space-y-3">
              {tools.map((tool, i) => (
                <motion.li
                  key={tool.name}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative overflow-hidden rounded-xl border p-4 shadow-sm backdrop-blur-sm transition"
                  style={{
                    borderColor: BORDER,
                    background: PAPER + "cc",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-[11px] font-bold"
                      style={{ background: INK, color: PAPER }}
                    >
                      0{i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div
                        className="text-lg font-medium leading-tight"
                        style={{
                          fontFamily: "ui-serif, Georgia, serif",
                          color: INK,
                        }}
                      >
                        {tool.name}
                      </div>
                      <div
                        className="text-sm leading-snug"
                        style={{ color: MUTED }}
                      >
                        {tool.desc}
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.4 }}
          className="mt-auto flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: MUTED + "99" }}
        >
          <span>denes halasz</span>
          <span style={{ color: ACCENT }}>15 / 20</span>
        </motion.div>
      </div>
    </div>
  );
}
