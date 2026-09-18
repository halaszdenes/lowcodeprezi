"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { ListLayout } from "@/components/layouts/list";

const items = [
  {
    name: "Cheaper",
    desc: "No consulting engagement. No IT backlog. No six-figure dev for a leave-request form.",
  },
  {
    name: "Faster",
    desc: "Weeks not quarters. Working prototype on Friday, not next fiscal year.",
  },
  {
    name: "Less risk",
    desc: "Built by someone who actually knows the process. Validated by the team that uses it.",
  },
  {
    name: "Easy proof of concept",
    desc: "Ship the thing, see if it sticks, then decide whether to invest more.",
  },
];

function CompaniesSlide(_: SlideProps) {
  return (
    <SlideShell
      eyebrow="How to sell it to your boss"
    >
      <ListLayout
        title="Cheaper. Faster."
        titleAccent="Less risk. Easy POC."
        body="The same economics that made low-code exist make it easy for your manager to say yes."
        items={items}
      />
    </SlideShell>
  );
}

export const slide28: SlideEntry = {
  meta: {
    id: "14-companies",
    title: "What's in it for companies",
    section: "Act 3 · Proof",
    notes:
      "Right now you're thinking: great, but my boss won't let me. Here's exactly what to say in that meeting.\n\n• Cheaper: no consulting engagement, no IT backlog, no six-figure developer for a leave-request form.\n• Faster: weeks, not quarters. A working prototype on Friday, not next fiscal year.\n• Less risk: built by someone who actually knows the process, validated by the team that uses it.\n• Easy proof of concept: ship the thing, see if it sticks, then decide whether to invest more.\n• Frame it as a tool they can use on Monday.\n\nHOW TO GET STARTED",
  },
  Component: CompaniesSlide,
};
