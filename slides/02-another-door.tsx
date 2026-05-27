"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { ListLayout } from "@/components/layouts/list";

const REASONS = [
  {
    name: "Lower Barrier to Entry",
    desc: "Drag-and-drop and Excel-like formulas — no years of CS fundamentals.",
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
      "Pivot slide. After the darker-side reveal, this is the answer. Direct port of OG slide 8 content — four reasons as cards via ListLayout. Cards float in from below one click at a time. No image / video — the typography and reveal IS the visual.\n\n• Step 1 (load): Title 'Why low-code is the answer.' visible. No cards yet. Say: 'OK so tech is hard. Here's what to do about it. Four reasons.'\n• Step 2: + Card 1 — 'Lower Barrier to Entry'. Say: 'You don't need four years of computer science. You drag, drop, write some Excel-like formulas, and you've got something working.'\n• Step 3: + Card 2 — 'Faster Prototyping & Implementation'. Say: 'What pro-code teams build in months, you ship in days. I'll show you a real example in a bit.'\n• Step 4: + Card 3 — 'Comparable Salaries to Traditional Dev'. Say: 'And no — going low-code doesn't mean making less. We'll look at numbers later.'\n• Step 5: + Card 4 — 'Leverage Existing Industry Knowledge'. Say: 'Whatever you already know — finance, logistics, manufacturing, ops — becomes your unfair advantage. A pro developer has to learn your domain from scratch. You don't.'",
  },
  Component: AnotherDoorSlide,
};
