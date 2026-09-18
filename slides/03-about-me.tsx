"use client";

import { motion } from "framer-motion";
import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";

const EASE = [0.22, 1, 0.36, 1] as const;

// Credentials, mirrored from the powerkurzus.hu about section.
const TAGS = [
  "Microsoft Certified Trainer",
  "10+ yrs enterprise · 5+ yrs digitalization lead",
  "HUPPUG user group leader",
  "MGCI regional leader",
  "Shift+Enter co-founder",
  "Content creator",
];

const CLIENTS = ["The LEGO Group", "Diageo", "Audi", "DSV", "Nokia"];

// Bottom strip: exam certifications first, then MCT and the speaker profile.
const BADGES = [
  { src: "/badges/PL300badge.png", code: "PL-300", label: "Power BI Data Analyst", h: 84 },
  { src: "/badges/AB-410.webp", code: "AB-410", label: "Intelligent Apps Builder", h: 76 },
  { src: "/badges/ab-620.png", code: "AB-620", label: "AI Agent Builder", h: 84 },
  { src: "/badges/ai-business-professional.svg", code: "AB-730", label: "AI Business Professional", h: 84 },
  { src: "/badges/ai-transformation-leader.svg", code: "AB-731", label: "AI Transformation Leader", h: 84 },
  { src: "/halasz-denes-microsoft-certified-trainer.png", code: "MCT", label: "Certified Trainer", h: 84 },
  { src: "/DenesHalaszEloado.svg", code: "Sessionize", label: "Top speaker 2025", h: 84 },
];

const SOCIALS = [
  { handle: "/in/deneshalasz", href: "https://www.linkedin.com/in/deneshalasz", icon: LinkedInIcon },
  { handle: "@deneshalasz", href: "https://www.youtube.com/@deneshalasz", icon: YouTubeIcon },
  { handle: "@denes.halasz", href: "https://www.instagram.com/denes.halasz/", icon: InstagramIcon },
];

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function AboutMeSlide(_: SlideProps) {
  return (
    <SlideShell eyebrow="Who's talking" showParticles={false}>
      <div className="flex h-full flex-col gap-6">
        <div className="grid min-h-0 flex-1 grid-cols-12 items-center gap-10">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="col-span-4 flex h-full items-center justify-center"
          >
            <div
              className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200"
              style={{ aspectRatio: "1 / 1", width: "100%", maxWidth: "360px" }}
            >
              <img src="/portrait2.jpg" alt="Denes Halasz" className="block h-full w-full object-cover" />
            </div>
          </motion.div>

          {/* Name, role, credentials */}
          <div className="col-span-8 flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              <p className="font-mono text-sm uppercase tracking-[0.3em] text-brand-700">
                Hi, I&apos;m
              </p>
              <h1
                className="mt-2 font-display font-semibold leading-[1.02] tracking-tight text-slate-900"
                style={{ fontSize: "clamp(2.8rem, 5.6vw, 5rem)" }}
              >
                Denes Halasz
              </h1>
              <p className="mt-3 max-w-[52ch] text-xl leading-snug text-slate-600">
                Power Platform consultant, trainer and speaker. Finance and
                accounting background, citizen developer turned pro.
              </p>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="flex flex-wrap gap-2.5"
            >
              {TAGS.map((tag, i) => (
                <motion.li
                  key={tag}
                  initial={{ opacity: 0, y: 12, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.06, type: "spring", stiffness: 220, damping: 22 }}
                  className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-base font-medium text-brand-700"
                >
                  {tag}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="flex flex-col gap-3 border-t border-slate-200 pt-4"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  Worked with
                </p>
                <p className="mt-1.5 text-lg font-medium leading-snug text-slate-800">
                  {CLIENTS.join(" · ")}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-2 pt-1">
                {SOCIALS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.handle}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-600 transition-colors hover:text-brand-700"
                    >
                      <Icon />
                      <span className="text-base font-medium">{s.handle}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Credential strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="flex w-fit items-end gap-9 self-center rounded-2xl border border-slate-200/80 bg-white/70 px-8 py-4 shadow-sm backdrop-blur-sm"
        >
          {BADGES.map((b, i) => (
            <motion.div
              key={b.code}
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.15 + i * 0.08, type: "spring", stiffness: 220, damping: 20 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex h-[84px] items-center justify-center">
                <img src={b.src} alt={`${b.label} (${b.code})`} style={{ height: b.h }} className="w-auto" />
              </div>
              <div className="text-center">
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
                  {b.code}
                </div>
                <div className="text-[11px] leading-tight text-slate-500">{b.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideShell>
  );
}

export const slide03: SlideEntry = {
  meta: {
    id: "03-about-me",
    title: "About me: Denes Halasz",
    section: "Act 1 · Setup",
    notes:
      "Slide 3, right after the sponsor thank-you. Quick credibility moment, 30 to 40 seconds. Portrait left; name, one-line role, credential chips and clients on the right; a strip of seven verified badges along the bottom (PL-300, AB-410, AB-620, AB-730, AB-731, MCT, Sessionize top speaker).\n\nSay: 'I'm Denes, Power Platform consultant, trainer and speaker from Hungary. I started in finance and accounting, became a citizen developer when Power Platform launched in 2018, and never went back. Today I'm a Microsoft Certified Trainer with six Microsoft certifications, I lead the Hungary Power Platform User Group, I'm a regional leader in Microsoft's Global Community Initiative, and I co-founded Shift+Enter, Hungary's biggest Microsoft community conference. Ten-plus years in enterprise, with companies like LEGO, Diageo, Audi, DSV and Nokia.'\n\nWhy this matters for THIS talk: the finance-to-low-code path is the exact path the talk recommends. Say it once, then move on. The handles are on screen for people who want to follow up later.",
  },
  Component: AboutMeSlide,
};
