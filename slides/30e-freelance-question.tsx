"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { StatementLayout } from "@/components/layouts/statement";

function FreelanceQuestionSlide(_: SlideProps) {
  return (
    <SlideShell eyebrow="Act 4 · What's next">
      <StatementLayout
        title="Ever thought about"
        titleAccent="going freelance?"
        body="Sooner or later every low-coder gets the question, from a recruiter or from themselves. Here's the honest version: what you gain, what you give up, and how I did it."
      />
    </SlideShell>
  );
}

export const slide30e: SlideEntry = {
  meta: {
    id: "30e-freelance-question",
    title: "Ever thought about going freelance?",
    section: "Act 4 · What to do Monday",
    notes:
      "Beat slide that opens the freelancing coda. Ask it to the room and take a show of hands: 'Ever thought about going freelance?' Then: 'Keep your hand up if you know what you'd actually be trading.' Most hands drop. That's the next two slides.\n\nKeep it under 30 seconds. Next: the pros and cons, and the sweet spot in the middle.",
  },
  Component: FreelanceQuestionSlide,
};
