"use client";

import { motion } from "framer-motion";
import { createContext, useContext, type ReactNode } from "react";

type DeckContextValue = {
  slideIndex: number;
  slideTotal: number;
  section?: string;
};

const DeckContext = createContext<DeckContextValue | null>(null);

export function DeckContextProvider({
  value,
  children,
}: {
  value: DeckContextValue;
  children: ReactNode;
}) {
  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
}

type Props = {
  /** Slide-specific eyebrow text. Combined automatically with slide number + section. */
  eyebrow?: string;
  /** Override the auto-composed chip text entirely. */
  chip?: string;
  footerLeft?: string;
  /** Override the auto-computed "NN / TT" footer. */
  footerRight?: string;
  showAmbient?: boolean;
  showGrid?: boolean;
  showParticles?: boolean;
  /** Full-bleed mode: no padding, no chip, no footer. For full-stage video / hero scenes. */
  fullBleed?: boolean;
  /** Optional animated background color (hex string). When provided, the outer container animates to this color. */
  bgColor?: string;
  /** Transition duration for bgColor changes in seconds. Default 1.4s. */
  bgTransitionDuration?: number;
  children: ReactNode;
};

export function SlideShell({
  eyebrow,
  chip,
  footerLeft = "denes halasz",
  footerRight,
  showAmbient,
  showGrid,
  showParticles,
  fullBleed = false,
  bgColor,
  bgTransitionDuration = 1.4,
  children,
}: Props) {
  // When fullBleed, default chrome off unless explicitly enabled
  const ambient = showAmbient ?? !fullBleed;
  const grid = showGrid ?? !fullBleed;
  const particles = showParticles ?? !fullBleed;
  const ctx = useContext(DeckContext);
  const slideNum = ctx ? String(ctx.slideIndex + 1).padStart(2, "0") : null;
  const total = ctx ? String(ctx.slideTotal).padStart(2, "0") : null;

  const resolvedChip =
    chip ?? (slideNum ? [slideNum, eyebrow].filter(Boolean).join(" · ") : eyebrow);

  const resolvedFooterRight =
    footerRight ?? (slideNum && total ? `${slideNum} / ${total}` : undefined);

  const animateBg = bgColor !== undefined;

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden text-slate-900"
      style={animateBg ? undefined : { backgroundColor: "#ffffff" }}
      animate={animateBg ? { backgroundColor: bgColor } : undefined}
      transition={
        animateBg
          ? {
              backgroundColor: {
                duration: bgTransitionDuration,
                ease: [0.22, 1, 0.36, 1],
              },
            }
          : undefined
      }
      initial={false}
    >
      {ambient && (
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
              "radial-gradient(ellipse at 20% 25%, rgba(45, 149, 230, 0.30), transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(6, 66, 180, 0.16), transparent 55%), radial-gradient(ellipse at 70% 15%, rgba(125, 211, 252, 0.20), transparent 55%)",
            backgroundSize: "200% 200%",
          }}
        />
      )}

      {grid && (
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
      )}

      {particles &&
        [...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-brand-500"
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

      {fullBleed ? (
        <div className="relative flex h-full w-full flex-col">{children}</div>
      ) : (
        <div className="relative flex h-full flex-col px-[6%] py-[5%]">
          {/* Eyebrow chip removed for a cleaner look; slides still pass
              `eyebrow`/`chip` props, so restoring it is a one-block revert. */}
          <div className="relative flex flex-1 flex-col">{children}</div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.4 }}
            className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400"
          >
            <span>{footerLeft}</span>
            {resolvedFooterRight && (
              <span className="text-brand-600">{resolvedFooterRight}</span>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
