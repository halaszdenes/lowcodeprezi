"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { StatementLayout } from "@/components/layouts/statement";

function TwoInOneSlide(_: SlideProps) {
  return (
    <SlideShell
      eyebrow="Your 2-in-1 advantage"
    >
      <StatementLayout
        title="Domain expertise + low-code ="
        titleAccent="the thing AI can't be alone."
        body="You already have the half AI doesn't: business context, lived experience, the messy truth of how your work actually works. Add low-code, with or without vibe-coding, and you become the one person in the room who can actually ship the fix."
      />
    </SlideShell>
  );
}

export const slide20: SlideEntry = {
  meta: {
    id: "12-two-in-one",
    title: "The 2-in-1 advantage",
    section: "Act 2 · The AI question",
    notes:
      "Half one: domain expertise. Yours, already paid for in years of doing your job. Half two: low-code skill. A few months to learn, multiplied by Copilot.\n\n• Only domain: you wait for IT, they build the wrong thing, you complain.\n• Only low-code or vibe coding: you build something nobody can actually use.\n• Together you are the unfair advantage your team didn't know it had.\n• Setup for the case study: the QA team in the next story had exactly this combination.",
  },
  Component: TwoInOneSlide,
};
