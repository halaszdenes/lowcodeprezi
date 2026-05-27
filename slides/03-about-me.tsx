"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

const TAGS = [
  "Power Platform Consultant",
  "Microsoft Certified Trainer",
  "Finance & Accounting background",
  "User Group Leader",
  "Low-code advocate",
  "Content creator",
];

const SOCIALS = [
  {
    label: "LinkedIn",
    handle: "/in/deneshalasz",
    href: "https://www.linkedin.com/in/deneshalasz",
    icon: LinkedInIcon,
  },
  {
    label: "YouTube",
    handle: "@deneshalasz",
    href: "https://www.youtube.com/@deneshalasz",
    icon: YouTubeIcon,
  },
  {
    label: "Instagram",
    handle: "@denes.halasz",
    href: "https://www.instagram.com/denes.halasz/",
    icon: InstagramIcon,
  },
];

function LinkedInIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function AboutMeSlide(_: SlideProps) {
  return (
    <SlideShell
      eyebrow="Who's talking"
      showAmbient={false}
      showParticles={false}
    >
      <div className="grid h-full grid-cols-12 items-center gap-12">
        {/* Left: portrait + badges */}
        <div className="col-span-5 flex h-full flex-col items-center justify-center gap-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200"
            style={{ aspectRatio: "1 / 1", width: "100%", maxWidth: "420px" }}
          >
            <img
              src="/portrait2.jpg"
              alt="Denes Halasz"
              className="block h-full w-full object-cover"
            />
          </motion.div>

          {/* Credentials row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center gap-8"
          >
            <div className="flex flex-col items-center gap-2">
              <img
                src="/halasz-denes-microsoft-certified-trainer.png"
                alt="Microsoft Certified Trainer"
                className="h-28 w-28 object-contain"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                MCT
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="/DenesHalaszEloado.svg"
                alt="Sessionize speaker"
                className="h-28"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Sessionize
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right: name + tags + socials */}
        <div className="col-span-7 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-violet-700">
              Hi, I&apos;m
            </p>
            <h1
              className="mt-3 font-display font-semibold leading-[1.05] tracking-tight text-slate-900"
              style={{ fontSize: "clamp(3.2rem, 6.5vw, 6rem)" }}
            >
              Denes Halasz
            </h1>
          </motion.div>

          {/* Tags */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {TAGS.map((tag, i) => (
              <motion.li
                key={tag}
                initial={{ opacity: 0, y: 14, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.4 + i * 0.08,
                  type: "spring",
                  stiffness: 200,
                  damping: 22,
                }}
                className="rounded-full border border-violet-200 bg-violet-50 px-5 py-2.5 text-lg font-medium text-violet-700"
              >
                {tag}
              </motion.li>
            ))}
          </motion.ul>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-2 flex flex-col gap-4 border-t border-slate-200 pt-6"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
              Find me online
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-slate-700 transition-colors hover:text-violet-700"
                  >
                    <Icon />
                    <span className="text-xl font-medium">{s.handle}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  );
}

export const slide03: SlideEntry = {
  meta: {
    id: "03-about-me",
    title: "About me — Denes Halasz",
    section: "Act 1 · Setup",
    notes:
      "Quick credibility moment. Portrait on the left + MCT and Sessionize badges below it. Right side: name + 6 self-tags + social links. No step-based reveal — everything enters with a coordinated stagger over ~1.5s.\n\nSay (the introduction): 'I'm Denes — Power Platform consultant from Hungary. Started out in finance and accounting, ended up in low-code. I'm a Microsoft Certified Trainer, I co-lead the Hungary Power Platform User Group, and I make content about this stuff on YouTube and LinkedIn.'\n\nKeep this slide brief — 30 seconds tops. The room cares about the TALK, not your full CV. The visual exists so people who want to reach out can grab your handles from the screen.",
  },
  Component: AboutMeSlide,
};
