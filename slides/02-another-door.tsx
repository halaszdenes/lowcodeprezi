"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { ListLayout } from "@/components/layouts/list";

const REASONS = [
  {
    name: "Lower Barrier to Entry",
    desc: "Drag-and-drop and Excel-like formulas. No years of CS fundamentals.",
  },
  {
    name: "Faster Prototyping & Implementation",
    desc: "Days to ship something usable, not quarters.",
  },
  {
    name: "Comparable Salaries to Traditional Dev",
    desc: "Same paycheck. None of the grind to get there.",
  },
  {
    name: "Leverage Existing Industry Knowledge",
    desc: "Your domain becomes the unfair advantage a dev can't match.",
  },
];

function AnotherDoorSlide({ step }: SlideProps) {
  return (
    <SlideShell eyebrow="There's another door">
      <ListLayout
        title="Why low-code"
        titleAccent="is the answer."
        items={REASONS}
        revealedCount={step}
      />
    </SlideShell>
  );
}

export const slide02: SlideEntry = {
  meta: {
    id: "02-another-door",
    title: "Why low-code is the answer",
    section: "Act 1 · Setup",
    steps: 5,
    notes:
      "There is another door. Four reasons low-code is the answer. [one click per card]\n\n• Lower barrier: no four years of computer science; you drag, drop, and write Excel-like formulas.\n• Faster: what pro-code teams ship in months, you ship in days. There is a real example coming later in the talk.\n• Comparable salaries: going low-code does not mean earning less. The numbers are on the next slide.\n• Domain knowledge: whatever you already know, finance, logistics, manufacturing, HR, becomes your unfair advantage. A developer has to learn your domain from scratch. You don't.",
  },
  Component: AnotherDoorSlide,
};
