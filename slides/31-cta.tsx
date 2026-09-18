"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { StatementLayout } from "@/components/layouts/statement";

function CtaSlide(_: SlideProps) {
  return (
    <SlideShell
      eyebrow="Your move"
    >
      <StatementLayout
        title="Pick one Excel file you hate."
        titleAccent="Migrate it to Power BI this week."
        body="That's it. One file. Seven days. The rest builds itself."
      />
    </SlideShell>
  );
}

export const slide31: SlideEntry = {
  meta: {
    id: "18-cta",
    title: "Your move this week",
    section: "Act 4 · What to do Monday",
    notes:
      "Not 'start a YouTube channel'. Not 'learn the whole platform'. Pick one Excel file you hate and migrate it to Power BI this week. One file. Seven days. The rest builds itself.\n\n• Make it small enough that nobody in the room can say they don't have time.\n• The people who do it will be back next year telling a different story.",
  },
  Component: CtaSlide,
};
