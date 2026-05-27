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
    section: "Act 4 · What to do Monday",
    notes:
      "Land this right after the QA story while the audience is thinking 'great, but my boss won't let me.'\n\nThe pitch to your manager:\n• CHEAPER — no consulting engagement, no IT backlog\n• FASTER — weeks not quarters\n• LESS RISK — built by someone who knows the process, validated in days\n• EASY POC — show the working thing, then decide whether to invest\n\nFrame this as a TOOL the audience can use on Monday: 'here's exactly what to say in the meeting.'",
  },
  Component: CompaniesSlide,
};
