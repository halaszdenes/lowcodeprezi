"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

type Concern = {
  label: string;
  sub: string;
  hue: string;
  icon: ReactNode;
};

const CloudIcon = (
  <svg
    width="56"
    height="56"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.5 19a4.5 4.5 0 1 0-1-8.86A6 6 0 0 0 4.5 12a4 4 0 0 0 .5 7h12.5z" />
  </svg>
);

const LockIcon = (
  <svg
    width="56"
    height="56"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const AgentWarnIcon = (
  <svg
    width="56"
    height="56"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="7" width="16" height="12" rx="2" />
    <path d="M12 7V3" />
    <circle cx="12" cy="3" r="0.8" fill="currentColor" />
    <circle cx="9" cy="13" r="1" fill="currentColor" />
    <circle cx="15" cy="13" r="1" fill="currentColor" />
    <path d="M9 17h6" />
  </svg>
);

const ComplianceIcon = (
  <svg
    width="56"
    height="56"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 3H8a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
    <path d="M9 3v2h6V3" />
    <polyline points="9 13 11 15 15 11" />
  </svg>
);

const CONCERNS: Concern[] = [
  {
    label: "Hosting",
    sub: "Microsoft runs the servers. You don't ops.",
    hue: "from-sky-400 to-cyan-300",
    icon: CloudIcon,
  },
  {
    label: "IT security",
    sub: "Enterprise auth, data isolation, audit logs.",
    hue: "from-emerald-400 to-teal-300",
    icon: LockIcon,
  },
  {
    label: "Agents going rogue",
    sub: "Sandboxed, governed, reversible.",
    hue: "from-amber-400 to-orange-300",
    icon: AgentWarnIcon,
  },
  {
    label: "Compliance",
    sub: "SOC, GDPR, HIPAA — baked in, not bolted on.",
    hue: "from-violet-400 to-fuchsia-300",
    icon: ComplianceIcon,
  },
];

function NotDeadSlide({ step }: SlideProps) {
  const visible = Math.max(0, Math.min(step, CONCERNS.length));

  return (
    <SlideShell eyebrow="Did vibe coding kill low-code?">
      <div className="flex h-full flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5"
        >
          <h1
            className="font-display font-semibold leading-[1.02] tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.6rem)" }}
          >
            <span className="shimmer-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
              I don&apos;t think so.
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="max-w-[58ch] text-xl leading-[1.55] text-slate-600"
          >
            Power Platform isn&apos;t just an app or an automation. It&apos;s a{" "}
            <span className="font-semibold text-slate-800">platform</span> —
            which means companies don&apos;t have to worry about:
          </motion.p>
        </motion.div>

        <div className="grid flex-1 grid-cols-4 items-stretch gap-6">
          {CONCERNS.map((c, i) => {
            const shown = i < visible;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 36, scale: 0.94 }}
                animate={
                  shown
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 36, scale: 0.94 }
                }
                transition={{
                  type: "spring",
                  stiffness: 190,
                  damping: 22,
                  mass: 0.9,
                }}
                className="relative flex flex-col items-center gap-6 rounded-2xl border border-slate-200/80 bg-white/70 p-7 shadow-sm backdrop-blur-sm"
              >
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br ${c.hue} text-slate-900 shadow-sm`}
                >
                  {c.icon}
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-semibold leading-tight text-slate-900">
                    {c.label}
                  </div>
                  <div className="mt-3 text-base leading-snug text-slate-600">
                    {c.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}

export const slide17: SlideEntry = {
  meta: {
    id: "17-not-dead",
    title: "Did vibe coding kill low-code? I don't think so.",
    section: "Act 2 · The AI question",
    steps: 5,
    notes:
      "Direct answer to the question that hung at the end of the previous slide. The argument is that Power Platform is a PLATFORM, not just an app — and that's what companies actually buy. Stepped reveal of the 4 things they don't have to worry about.\n\n• Step 0 (load): Title + body visible, no cards. Say: 'Did vibe coding kill low-code? I don't think so. Here's why — Power Platform isn't just an app you can replace by prompting an AI. It's a platform. And that means companies get a bunch of things for free that they would otherwise have to solve themselves.'\n• Step 1: + Hosting card. 'Microsoft runs the servers. You don't run ops, you don't have a 3am pager.'\n• Step 2: + IT security card. 'Enterprise authentication, data isolation, audit logs — baked in.'\n• Step 3: + Agents going rogue. 'When agents do something weird — and they will — it happens in a sandbox you can audit and undo.'\n• Step 4: + Compliance. 'SOC, GDPR, HIPAA — Microsoft already cleared the legal hurdles your company would have to clear itself.'\n\nClose with: 'You can vibe-code an app in 30 minutes. Getting that app cleared for production at a real company — that's where the platform earns its keep.' → next slide (vibe-code-lowcode) doubles down: low-code platforms got Copilot too.",
  },
  Component: NotDeadSlide,
};
