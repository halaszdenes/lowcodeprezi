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
      "So is this the end of low-code? Pause. Let it sit.\n\n• Low-code existed because humans can't write code easily. Now AI can.\n• AI doesn't need a drag-and-drop interface; it writes the code directly. Going through a low-code platform is less efficient than going straight to source.\n• Low-code was built for the human bottleneck, and the human bottleneck just got an upgrade.\n• Don't answer yet. Let the room sit with it for a few seconds.",
  },
  Component: IsLowCodeDeadSlide,
};
