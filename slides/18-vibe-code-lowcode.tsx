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
      "Resolve the tension. Low-code didn't die — it ATE vibe-coding.\n\nThe options now:\n• Microsoft Copilot built into every Power Platform tool\n• Code Pages / Code Apps (newer, more code-friendly Power Platform surfaces)\n• Dozens of vendor Copilots in adjacent tools\n• MCP servers that take natural-language prompts and produce canvas apps\n\nSo the bridge didn't get torn down. It got an elevator.\n\nBut the bigger argument is on the NEXT slide — coding isn't actually the hard part.",
  },
  Component: VibeCodeLowCodeSlide,
};
