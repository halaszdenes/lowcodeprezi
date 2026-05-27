"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { QAScene } from "@/components/qa/qa-scene";

function QaFixSlide({ step }: SlideProps) {
  return (
    <SlideShell
      eyebrow="Proof · The fix"
      showAmbient={false}
      showParticles={false}
    >
      <QAScene scenario="fix" step={step} />
    </SlideShell>
  );
}

export const slide24: SlideEntry = {
  meta: {
    id: "14-qa-fix",
    title: "QA story — risk-weighted fix",
    section: "Act 3 · Proof",
    steps: 4,
    notes:
      "Centerpiece slide 2 of 2. Click through 4 steps:\n\n• Step 1 (slide loads): Same world as the previous slide, but now risk badges fade in next to each line — low/low/HIGH on Line C. Subtitle: 'Historical data: Line C's product fails more often. The Power App reorders the queue by risk.'\n• Step 2: Sampling pulse — three samples flow into the queue, but they sort by risk → [3, 1, 2]. Sample 3 jumps to the front.\n• Step 3: Inspector picks sample 3 first → FAILS. Only the handful of units Line C made in the past two seconds flash red and scrap.\n• Step 4: Side-by-side counter at the bottom: 'FIFO: 48 lost → Risk-weighted: 8 lost.' Slide ends on the comparison — narrate the savings here.\n\nKey lines to land:\n— 'We knew Line C made the harder product. We had years of QA data to prove it.'\n— 'A few clicks in Power Apps later, the queue sorted itself.'\n— 'Pro-code team took 16 months. We did the POC in 2.'\n\n(€80k payoff headline now lives on a later, separate slide — to give narrative room before the reveal. Currency is EUR, not USD.)",
  },
  Component: QaFixSlide,
};
