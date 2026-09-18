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
      "How many of you have waited six months for IT to build something you needed for your job? Keep your hand up if it was longer than a year.\n\nThat gap is what this talk is about. You are going to close it yourself.",
  },
  Component: TitleSlide,
};
