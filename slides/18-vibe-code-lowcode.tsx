"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { ListLayout } from "@/components/layouts/list";

const items = [
  {
    name: "Copilot in Power Apps",
    desc: "Describe the app in plain English. Get a working canvas app.",
  },
  {
    name: "Copilot in Power Automate",
    desc: "Describe the workflow. The flow builds itself.",
  },
  {
    name: "Code Pages / Code Apps",
    desc: "Newer Power Platform surfaces that lean into code-first workflows.",
  },
  {
    name: "MCP servers",
    desc: "Natural-language prompts that produce canvas apps via Model Context Protocol.",
  },
];

function VibeCodeLowCodeSlide(_: SlideProps) {
  return (
    <SlideShell
      eyebrow="The plot twist"
    >
      <ListLayout
        title="Relax."
        titleAccent="Low-coders get to vibe-code too…"
        items={items}
      />
    </SlideShell>
  );
}

export const slide18: SlideEntry = {
  meta: {
    id: "10-vibe-code-lowcode",
    title: "Relax. Low-coders get to vibe-code too",
    section: "Act 2 · The AI question",
    notes:
      "And here's the plot twist: low-code didn't die, it ate vibe coding.\n\n• Copilot is built into Power Apps and Power Automate: describe the app or the flow, get a working draft.\n• Code Pages and Code Apps are newer surfaces that lean into code-first work.\n• MCP servers turn natural-language prompts into canvas apps.\n• The bridge didn't get torn down. It got an elevator.\n• Keep this quick; the bigger argument is next.",
  },
  Component: VibeCodeLowCodeSlide,
};
