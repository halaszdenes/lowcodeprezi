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
    title: "QA story — FIFO disaster",
    section: "Act 3 · Proof",
    steps: 9,
    notes:
      "Centerpiece slide 1 of 2. Click through 9 steps:\n\n• Step 1 (slide loads): 3 production lines running. Queue empty.\n• Step 2: Sampling — three samples flow into the QA queue as [#1 A, #2 B, #3 C]. A 'sample' marker drops onto each line at unit 4.\n• Step 3: Production continues — lines hit 5 units. Queue still waiting. (Say: 'See how production doesn't stop? The clock is running on every line.')\n• Step 4: Inspector picks sample 1 (Line A) → passes. Lines hit 6.\n• Step 5: Production continues. Lines hit 7. (Say: 'And it keeps going.')\n• Step 6: Inspector picks sample 2 (Line B) → passes. Lines hit 8.\n• Step 7: Production continues. Lines hit 9. (Say: 'And still going.')\n• Step 8: Inspector picks sample 3 (Line C) → FAILS. Units 4–10 of Line C flash red and slide into the scrap zone. Red SCRAP badge appears next to Line C.\n• Step 9: Scrap stat ticks up to 48 units in the QA panel.\n\nKey lines to land:\n— 'Samples queue up FIFO. While the inspector works, production keeps going.'\n— 'The sample that fails is from the most complex product. We've been making more of it the whole time.'\n— 'Every unit between the sampling moment and the verdict — gone.'\n\nThen click to slide 14 for the fix.",
  },
  Component: QaDisasterSlide,
};
