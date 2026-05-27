"use client";

import { motion } from "framer-motion";

const tools = [
  {
    name: "Power BI",
    desc: "Turn data into dashboards that update themselves.",
    hue: "from-violet-300 to-fuchsia-200",
  },
  {
    name: "Power Apps",
    desc: "Build forms and tools your team actually uses.",
    hue: "from-pink-300 to-rose-200",
  },
  {
    name: "Power Automate",
    desc: "Automate the boring multi-step stuff in the background.",
    hue: "from-sky-300 to-cyan-200",
  },
  {
    name: "Copilot Studio",
    desc: "Build custom AI agents — embedded throughout the platform.",
    hue: "from-emerald-300 to-teal-200",
  },
  {
    name: "Power Pages",
    desc: "External-facing portals without bothering the web team.",
    hue: "from-amber-300 to-orange-200",
  },
];

export default function Preview1() {
  return (
    <div
      className="relative h-full w-full overflow-hidden bg-white"
      style={{ color: "#0a0a0a" }}
    >
      <motion.div
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 20% 25%, rgba(167, 139, 250, 0.32), transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(244, 114, 182, 0.22), transparent 55%), radial-gradient(ellipse at 70% 15%, rgba(125, 211, 252, 0.20), transparent 55%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15, 23, 42, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 70%)",
        }}
      />

      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-violet-500"
          initial={{
            x: `${(i * 53) % 100}%`,
            y: `${(i * 37) % 100}%`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.5, 0],
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
          className="mb-5 inline-flex w-fit items-center gap-3 rounded-full border border-violet-300/60 bg-white/70 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-violet-700 shadow-sm backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-600" />
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
              className="font-display font-semibold leading-[1.02] tracking-[-0.02em] text-slate-900"
              style={{ fontSize: "clamp(2rem, 4.4vw, 4rem)" }}
            >
              Power Platform:{" "}
              <span
                className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent"
                style={{
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
              className="mt-6 max-w-[40ch] text-base leading-[1.6] text-slate-600"
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
                  className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm transition hover:border-violet-400 hover:bg-white"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tool.hue} font-mono text-[11px] font-bold text-slate-900`}
                    >
                      0{i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-lg font-semibold leading-tight text-slate-900">
                        {tool.name}
                      </div>
                      <div className="text-sm leading-snug text-slate-600">
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
          className="mt-auto flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400"
        >
          <span>denes halasz</span>
          <span className="text-violet-600">15 / 20</span>
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
