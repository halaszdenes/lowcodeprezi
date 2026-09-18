"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { QAScene } from "@/components/qa/qa-scene";

function QaDisasterSlide({ step }: SlideProps) {
  return (
    <SlideShell
      eyebrow="Proof · FIFO disaster"
      showAmbient={false}
      showParticles={false}
    >
      <QAScene scenario="disaster" step={step} />
    </SlideShell>
  );
}

export const slide23: SlideEntry = {
  meta: {
    id: "13-qa-disaster",
    title: "QA story: FIFO disaster",
    section: "Act 3 · Proof",
    steps: 9,
    notes:
      "Three lines are running. [click] Sampling: one bag from each line goes into the queue, in order: A, B, C. Look at the production lines: they don't stop. The clock is running on every one of them. [click, click] The inspector takes sample one. Pass. And production keeps going. [click, click] Sample two. Pass. Still going. [click, click] Sample three, Line C. Fail.\n\nEverything Line C made between the moment the sample was taken and the moment of the verdict is now scrap. [click] Forty-eight units.\n\n• The sample that fails is from the most complex product, and we kept making more of it the whole time we were inspecting the easy ones.",
  },
  Component: QaDisasterSlide,
};
