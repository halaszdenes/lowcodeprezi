import type { ComponentType } from "react";

export type SlideMeta = {
  id: string;
  title: string;
  section: string;
  notes?: string;
  /** Number of click-advanced sub-steps within this slide (default 1 = no intra-slide steps) */
  steps?: number;
};

export type SlideComponent = ComponentType<SlideProps>;

export type SlideProps = {
  isActive: boolean;
  index: number;
  total: number;
  /** 0-indexed sub-step within this slide. Slides without `steps` always receive 0. */
  step: number;
  /** Advance to the next step (or next slide if at last step). Slides can call this from internal events (video onEnded, timers, etc). */
  next: () => void;
  /** Go back one step (or to previous slide's last step). */
  prev: () => void;
};

export type SlideEntry = {
  meta: SlideMeta;
  Component: SlideComponent;
};

export const PRESENTER_CHANNEL = "lowcodeprezi-presenter";

export type PresenterMessage =
  | { type: "slide-change"; index: number; step: number }
  | { type: "ping"; from: "deck" | "notes" }
  | { type: "request-state" };
