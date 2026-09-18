"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { StatementLayout } from "@/components/layouts/statement";

function NotEnoughSlide(_: SlideProps) {
  return (
    <SlideShell
      eyebrow="The bigger truth"
    >
      <StatementLayout
        title="Vibe-coding solves writing code."
        titleAccent="Writing code was never the hard part."
        body={
          <>
            The hard part is knowing <em>what</em> to build. For whom. With
            which constraints. Around which broken process. AI doesn&apos;t know
            any of that. <span className="font-medium text-slate-900">You do.</span>
          </>
        }
      />
    </SlideShell>
  );
}

export const slide19: SlideEntry = {
  meta: {
    id: "11-not-enough",
    title: "Vibe-coding alone isn't enough",
    section: "Act 2 · The AI question",
    notes:
      "This is the most important slide of the act. Slow down.\n\nVibe coding solves writing code. Writing code was never the hard part. The hard part is knowing what to build, for whom, with which constraints, around which broken process. AI knows none of that from a prompt. You do.\n\n• Concrete example: AI can write a leave-request app in thirty seconds. It cannot tell you that compliance requires manager approval after five days but not before, or which SharePoint list HR actually trusts.\n• Without that context you ship a beautiful demo nobody can use.",
  },
  Component: NotEnoughSlide,
};
