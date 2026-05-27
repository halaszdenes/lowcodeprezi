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

const INK = "#0a1224";
const MUTED = "#5a6478";
const ACCENT = "#0a6dd6";
const ACCENT_DEEP = "#0850a8";
const BG = "#f4f6fa";
const PAPER = "#ffffff";
const BORDER = "#e1e6ef";

export default function Preview3() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: BG, color: INK }}
    >
      <motion.div
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 20%, rgba(10, 109, 214, 0.15), transparent 55%), radial-gradient(ellipse at 90% 80%, rgba(56, 189, 248, 0.12), transparent 55%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10, 18, 36, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(10, 18, 36, 1) 1px, transparent 1px)",
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
            scale: [0.5, 1.3, 0.5],
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
            background: "rgba(255,255,255,0.8)",
            color: ACCENT_DEEP,
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
              className="font-display font-semibold leading-[1.02] tracking-[-0.02em]"
              style={{
                fontSize: "clamp(2rem, 4.4vw, 4rem)",
                color: INK,
              }}
            >
              Power Platform:{" "}
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${ACCENT_DEEP}, ${ACCENT}, #38bdf8)`,
                  backgroundSize: "200% 200%",
                  animation: "shimmer 6s ease-in-out infinite",
                }}
              >
                five tools, one ecosystem.
              </span>
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
                  className="group relative overflow-hidden rounded-xl border p-4 shadow-sm backdrop-blur-sm transition hover:shadow-md"
                  style={{ borderColor: BORDER, background: PAPER }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-[11px] font-bold text-white"
                      style={{
                        background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div
                        className="font-display text-lg font-semibold leading-tight"
                        style={{ color: INK }}
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
          <span style={{ color: ACCENT_DEEP }}>15 / 20</span>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}
