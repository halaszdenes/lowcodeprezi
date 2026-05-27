"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { StatementLayout } from "@/components/layouts/statement";

function WhyLowCodeExistsSlide(_: SlideProps) {
  return (
    <SlideShell
      eyebrow="What low-code is for"
    >
      <StatementLayout
        title="What is low-code, really —"
        titleAccent="and what's the point?"
        body="Corporations don't really care about the code being &lsquo;low&rsquo; — they care about the cost of code being low. And not just the code: maintenance, infrastructure, the whole bill. The real driver is money."
      />
    </SlideShell>
  );
}

export const slide08: SlideEntry = {
  meta: {
    id: "06-why-lowcode-exists",
    title: "Why low-code exists at all",
    section: "Act 2 · The AI question",
    notes:
      "Reset the audience's framing. They probably think low-code exists 'so non-developers can build apps.' That's the marketing.\n\nThe real reason is economics:\n• Code is expensive — developer time, maintenance, bug-fixing\n• Companies adopted low-code because it shipped business solutions faster and cheaper\n• You don't need a six-figure dev to build a leave-request form\n\nThis primes the next slide: if cost is what drives low-code, what happens when AI changes the cost of code?",
  },
  Component: WhyLowCodeExistsSlide,
};
