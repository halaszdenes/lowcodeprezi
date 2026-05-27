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
        body="You already have the half AI doesn't: business context, lived experience, the messy truth of how your work actually works. Add low-code — with or without vibe-coding — and you become the one person in the room who can actually ship the fix."
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
      "Punchline of Act 2. Land it.\n\nThe 2-in-1:\n• Half 1: Domain expertise — yours, already paid for in years of doing your job\n• Half 2: Low-code skill — a few months to learn, force-multiplied by Copilot\n\nNeither half is enough alone:\n• Just domain → you wait for IT, get something wrong, complain\n• Just low-code (or vibe-coding) → you build something nobody can actually use\n\nTogether → you're the unfair advantage your team didn't know it had.\n\nThis is also the SETUP for the QA story on the next slide — the QA team had exactly this combination.",
  },
  Component: TwoInOneSlide,
};
