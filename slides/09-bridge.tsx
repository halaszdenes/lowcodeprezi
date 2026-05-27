"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { StatementLayout } from "@/components/layouts/statement";

function BridgeSlide(_: SlideProps) {
  return (
    <SlideShell
      eyebrow="Under the hood"
    >
      <StatementLayout
        title="Low-code is just a bridge between you and"
        titleAccent="computer code."
        body="Drag-and-drop blocks. Excel-like formulas. Underneath, it's still pro code — just translated into something most of us can actually use."
      />
    </SlideShell>
  );
}

export const slide09: SlideEntry = {
  meta: {
    id: "07-bridge",
    title: "Low-code is a bridge",
    section: "Act 2 · The AI question",
    notes:
      "Pull back the curtain. The audience needs this mental model to follow the rest of Act 2.\n\nThe argument:\n• Computers only run code\n• Most humans can't write code\n• Low-code is the bridge: drag a button, write a formula like Excel, the platform generates the code underneath\n• It's not magic — it's translation\n\nNow set up the punchline for the next slide: 'But what if the bridge could be even lower? What if you could just... talk to it?'",
  },
  Component: BridgeSlide,
};
