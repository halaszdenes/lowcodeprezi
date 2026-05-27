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
        body="Eventually almost every job will feel it. For now — and for the next few years at least — AI stays in an augmentation role. You'll do more, faster. It won't replace you."
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
      "Address the elephant directly. The audience is thinking it.\n\nKey beats:\n• Yes, AI will eventually affect almost every job\n• But right now and for the next several years, it's augmentation\n• Augmentation = you do more, you do it faster, you do things you couldn't do alone\n• It does NOT mean 'sit back, AI handles it'\n\nThis sets up the rest of Act 2: AI is a force we work WITH, not against. Now let's understand what low-code even is in this new world.",
  },
  Component: AiAugmentingSlide,
};
