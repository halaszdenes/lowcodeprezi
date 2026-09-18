"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { ListLayout } from "@/components/layouts/list";

const RULES = [
  {
    name: "Meaningful projects",
    desc: "Real or publicly available data. Solve something, don't demo something.",
  },
  {
    name: "Quality over quantity",
    desc: "Depth beats the number of examples. Two deep pieces outrank ten shallow ones.",
  },
  {
    name: "Avoid overused examples",
    desc: "Everyone has seen the basic Spotify dashboard. Skip it.",
  },
  {
    name: "Tie it to your domain or passion",
    desc: "Industry-relevant or personally interesting topics. That's where your edge shows.",
  },
];

function PortfolioSlide({ step }: SlideProps) {
  return (
    <SlideShell eyebrow="Act 4 · Portfolio (optional)">
      <ListLayout
        title="A portfolio is optional."
        titleAccent="Doing it right isn't."
        body="Do it right or don't do it at all. A weak portfolio costs you more than no portfolio. If you build one, four rules."
        items={RULES}
        revealedCount={step}
      />
    </SlideShell>
  );
}

export const slide30c: SlideEntry = {
  meta: {
    id: "30c-portfolio",
    title: "Building a portfolio (optional)",
    section: "Act 4 · What to do Monday",
    steps: RULES.length + 1,
    notes:
      "A portfolio is optional. Plenty of people get hired without one. But if you build one, do it right, because a weak portfolio costs you more than no portfolio. [one click each]\n\n• Meaningful projects: real or public data, solving an actual question, not demoing features.\n• Quality over quantity: two projects you can talk about for twenty minutes beat ten you can't.\n• Avoid overused examples: every recruiter has seen the Spotify dashboard and the Titanic dataset.\n• Tie it to your domain or a genuine passion. That's where your edge shows, and that's the two-in-one again.",
  },
  Component: PortfolioSlide,
};
