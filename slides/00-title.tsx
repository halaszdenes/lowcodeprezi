"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { HeroLayout } from "@/components/layouts/hero";

function TitleSlide(_: SlideProps) {
  return (
    <SlideShell
      footerLeft="A talk by Denes Halasz"
      footerRight="↳ start"
    >
      <HeroLayout
        eyebrow="A talk by Denes Halasz"
        title={<>Low&#8209;Code,</>}
        titleAccent="Big Impact."
        subtitle="Transforming careers with Power Platform."
        footnote="→ to begin · esc for overview · n for presenter notes"
      />
    </SlideShell>
  );
}

export const slide00: SlideEntry = {
  meta: {
    id: "00-title",
    title: "Low-Code, Big Impact",
    section: "Title",
    notes:
      "Opening line: 'How many of you have ever waited 6 months for IT to build something you needed in your job?'\n\nWait for hands. This is the hook.",
  },
  Component: TitleSlide,
};
