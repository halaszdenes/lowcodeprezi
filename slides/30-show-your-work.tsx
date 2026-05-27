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
            &ldquo;I saved this team 10 hours a week&rdquo; — said in front of
            the right manager, in the right room — is worth more than a
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
    title: "Show your work — internally",
    section: "Act 4 · What to do Monday",
    notes:
      "For business / citizen-dev folks, internal visibility is the career lever. Not blogs, not YouTube — that's for influencers.\n\nIdeas:\n• Demo days / lunch & learns\n• A Teams channel for your wins\n• A dashboard pinned to a hallway TV\n• Monthly update to your manager: 'here's what I shipped and what it saved'\n• Volunteer to help adjacent teams once you have wins\n\nThis is also how you protect yourself: if leadership knows what you've built, you don't get hit when the next reorg comes.",
  },
  Component: ShowYourWorkSlide,
};
