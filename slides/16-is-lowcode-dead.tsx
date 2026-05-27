"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { StatementLayout } from "@/components/layouts/statement";

function IsLowCodeDeadSlide(_: SlideProps) {
  return (
    <SlideShell
      eyebrow="The uncomfortable question"
    >
      <StatementLayout
        title="So is this"
        titleAccent="the end of low-code?"
        body="AI isn't dumb like us. It can write code directly. Going through a low-code platform is less efficient than going straight to source. Did vibe-coding just kill the bridge?"
      />
    </SlideShell>
  );
}

export const slide16: SlideEntry = {
  meta: {
    id: "09-is-lowcode-dead",
    title: "Is low-code dead?",
    section: "Act 2 · The AI question",
    notes:
      "PAUSE HERE. Let the question sit.\n\nThe logic:\n• Low-code existed because humans can't write code easily\n• Now AI can write code easily\n• AI doesn't need a drag-and-drop UI — it just writes the code directly\n• So low-code platforms are at a disadvantage. They were designed for the human bottleneck. The human bottleneck just got an upgrade.\n\nDon't answer yet. Let the audience sit with it for a few seconds. Then next slide resolves.",
  },
  Component: IsLowCodeDeadSlide,
};
