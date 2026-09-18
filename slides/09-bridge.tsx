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
        body="Drag-and-drop blocks. Excel-like formulas. Underneath, it's still pro code, just translated into something most of us can actually use."
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
      "Pull back the curtain. Computers only run code. Most humans can't write code. Low-code is the bridge: you drag a button, you write a formula like in Excel, and the platform generates the code underneath.\n\n• It's not magic, it's translation.\n• Tease: but what if the bridge could be even lower? What if you could just talk to it? Hold that for later.",
  },
  Component: BridgeSlide,
};
