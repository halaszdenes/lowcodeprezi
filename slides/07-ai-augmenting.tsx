"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { StatementLayout } from "@/components/layouts/statement";

function AiAugmentingSlide(_: SlideProps) {
  return (
    <SlideShell
      eyebrow="The elephant"
    >
      <StatementLayout
        title="AI won't take your job."
        titleAccent="Not yet."
        body="Eventually almost every job will feel it. For now, and for the next few years at least, AI stays in an augmentation role. You'll do more, faster. It won't replace you."
      />
    </SlideShell>
  );
}

export const slide07: SlideEntry = {
  meta: {
    id: "05-ai-augmenting",
    title: "AI is augmenting, not replacing",
    section: "Act 2 · The AI question",
    notes:
      "Let's address the elephant. Yes, AI will eventually touch almost every job. For now, and for the next several years, it is augmentation: you do more, you do it faster, you do things you couldn't do alone.\n\n• It does not mean 'sit back, AI handles it'.\n• AI is a force we work with, not against. Hold that thought for the rest of this act.",
  },
  Component: AiAugmentingSlide,
};
