"use client";

import type { SlideEntry, SlideProps } from "@/lib/slide-types";
import { SlideShell } from "@/components/slide-shell";
import { StatementLayout } from "@/components/layouts/statement";

function ShowYourWorkSlide(_: SlideProps) {
  return (
    <SlideShell
      eyebrow="Show your work"
    >
      <StatementLayout
        title={
          <>
            Internal visibility beats
          </>
        }
        titleAccent="LinkedIn followers."
        body={
          <>
            &ldquo;I saved this team 10 hours a week&rdquo;, said in front of
            the right manager, in the right room, is worth more than a
            thousand likes.
          </>
        }
      />
    </SlideShell>
  );
}

export const slide30: SlideEntry = {
  meta: {
    id: "17-show-your-work",
    title: "Show your work: internally",
    section: "Act 4 · What to do Monday",
    notes:
      "For people in business roles, internal visibility is the career lever. Not blogs, not YouTube; that's for influencers.\n\n• 'I saved this team ten hours a week', said in front of the right manager in the right room, is worth more than a thousand likes.\n• Ways to do it: demo days and lunch-and-learns, a Teams channel for your wins, a dashboard on a hallway screen, a monthly note to your manager on what you shipped and what it saved, helping the neighbouring team once you have wins.\n• It also protects you: when leadership knows what you built, you're not the one hit in the next reorg.",
  },
  Component: ShowYourWorkSlide,
};
