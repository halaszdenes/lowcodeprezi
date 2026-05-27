"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { HeroLayout } from "@/components/layouts/hero";

function ThanksSlide(_: SlideProps) {
  return (
    <SlideShell footerLeft="Thanks for being here" footerRight="19 / 20">
      <HeroLayout
        eyebrow="Thank you"
        title="Questions?"
        subtitle={
          <>
            hello@deneshalasz.com
            <br />
            <span className="text-slate-500">/in/deneshalasz</span>
          </>
        }
      />
    </SlideShell>
  );
}

export const slide32: SlideEntry = {
  meta: {
    id: "19-thanks",
    title: "Thanks + Q&A",
    section: "Act 4 · What to do Monday",
    notes:
      "Q&A slide. Show contact details prominently.\n\nLeave this on screen for the entire Q&A so people can write down your email / LinkedIn.\n\nIf the event has a feedback / rating mechanism, mention it here.",
  },
  Component: ThanksSlide,
};
