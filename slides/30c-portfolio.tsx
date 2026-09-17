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
      "Optional step after online presence. The hook is the first bullet of the original slide, promoted to the headline: do it right or don't do it at all. Four rules as cards, one click each.\n\n• Step 1 (load): Title + body. Say: 'A portfolio is optional. Plenty of people get hired without one. But if you build one, do it right, because a weak portfolio costs you more than no portfolio.'\n• Step 2: Meaningful projects. Say: 'Use real data, or publicly available data. Solve an actual question, don't just demo features.'\n• Step 3: Quality over quantity. Say: 'Depth beats count. Two projects you can talk about for twenty minutes beat ten you can't.'\n• Step 4: Avoid overused examples. Say: 'Every recruiter has seen the Spotify dashboard. And the Titanic dataset. Skip them.'\n• Step 5: Tie it to your domain or passion. Say: 'Pick your industry, or something you genuinely care about. That's where your domain knowledge shows, and that's the 2-in-1 again.'\n\nThen the CTA.",
  },
  Component: PortfolioSlide,
};
