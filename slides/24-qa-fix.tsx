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
    title: "QA story: risk-weighted fix",
    section: "Act 3 · Proof",
    steps: 4,
    notes:
      "Same factory, one change. We knew Line C made the harder product. We had years of QA data proving it fails more often. So the Power App reorders the queue by risk. [click] The Line C sample jumps to the front. [click] The inspector opens it first. Fail. But this time only the handful of units made in the last two seconds are lost. [click] Forty-eight units versus eight.\n\n• A few clicks in Power Apps, and the queue sorted itself.\n• The pro-code team took sixteen months for their version. Our proof of concept took two.",
  },
  Component: QaFixSlide,
};
