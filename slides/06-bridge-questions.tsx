"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { ListLayout } from "@/components/layouts/list";

const QUESTIONS = [
  {
    name: "What about AI?",
    desc: "If tech jobs are already disrupted, why pivot into anything tech?",
  },
  {
    name: "What about vibe coding?",
    desc: "If I can just describe what I want, why drag buttons around?",
  },
  {
    name: "Is low-code dead?",
    desc: "Was this whole answer obsolete the day GPT-4 came out?",
  },
];

function BridgeQuestionsSlide({ step }: SlideProps) {
  return (
    <SlideShell eyebrow="The room is thinking">
      <ListLayout
        title="But wait —"
        titleAccent="what about?"
        body="Three questions I can hear from here. Let me take them one at a time."
        items={QUESTIONS}
        revealedCount={step}
      />
    </SlideShell>
  );
}

export const slide06: SlideEntry = {
  meta: {
    id: "06-bridge-questions",
    title: "Three questions in the room",
    section: "Act 2 · The AI question",
    steps: 4,
    notes:
      "After the code-vs-low-code button comparison, the audience has three follow-up questions queued. Surface them explicitly so they know you're going to address each one.\n\nSteps:\n• Step 1 (load): Title + body. No questions yet. Say: 'Before we go further — let me read the room. There are three questions you're probably thinking.'\n• Step 2: + 'What about AI?' — 'AI is everywhere. If tech jobs are being disrupted, why pivot into anything tech-adjacent at all?'\n• Step 3: + 'What about vibe coding?' — 'And if I can just describe what I want and AI builds it, why am I dragging buttons?'\n• Step 4: + 'Is low-code dead?' — 'Or worse — was this whole answer obsolete the day GPT-4 came out?'\n\nThen: 'Let me take them in order. First — what IS low-code, actually, and why does it exist?' → flows into ai-augmenting + low-code definition arc.",
  },
  Component: BridgeQuestionsSlide,
};
