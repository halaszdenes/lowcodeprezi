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
      "This is the most important slide in Act 2. Slow down.\n\nThe argument:\n• Vibe-coding removes the technical barrier — anyone can produce code now\n• But shipping a USEFUL solution requires more than code\n  - Business context: what does this process actually do?\n  - Stakeholder context: who breaks if it breaks?\n  - Data context: where does the truth live?\n  - Constraint context: what's the regulation, the SLA, the political reality?\n• AI doesn't know any of this from a prompt\n• Without that context, you ship a beautiful demo that nobody can use\n\nExpand with a concrete example: 'AI can write a leave-request app in 30 seconds. It cannot tell you that your company's compliance team requires manager approval after 5 days but not before, and it cannot tell you which SharePoint list HR actually trusts.'\n\nThis sets up the punchline on the next slide.",
  },
  Component: NotEnoughSlide,
};
