"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { ListLayout } from "@/components/layouts/list";

const items = [
  {
    name: "Excel → Power Query",
    desc: "You already do this. Just learn the better tool.",
  },
  {
    name: "Power Query → DAX",
    desc: "DAX is just Excel formulas with superpowers.",
  },
  {
    name: "DAX → first dashboard",
    desc: "Migrate one report. Feel the difference.",
  },
  {
    name: "Then: Power Apps",
    desc: "When you need data entry, not just visualization.",
  },
  {
    name: "Then: Power Automate",
    desc: "When you need things to happen automatically.",
  },
];

function WhereToStartSlide(_: SlideProps) {
  return (
    <SlideShell
      eyebrow="Where to start"
    >
      <ListLayout
        title="If you know Excel,"
        titleAccent="start with Power BI."
        body="Copilot lowers the bar at every step. Ask it: 'create a measure that shows month-over-month change.' Done."
        items={items}
      />
    </SlideShell>
  );
}

export const slide29: SlideEntry = {
  meta: {
    id: "16-where-to-start",
    title: "Start with Power BI",
    section: "Act 4 · What to do Monday",
    notes:
      "Practical path. Make it feel achievable.\n\nThe ladder:\n1. Excel → Power Query (you already do this; just learn the better tool)\n2. Power Query → DAX → first dashboard\n3. Dashboard → Power Apps (when you need data entry)\n4. Power Apps → Power Automate (when you need workflow)\n5. Bonus: Copilot lowers the bar at every step — 'create a measure that shows month-over-month change' → done\n\nKey: don't ask permission. Build something useful for yourself first.",
  },
  Component: WhereToStartSlide,
};
