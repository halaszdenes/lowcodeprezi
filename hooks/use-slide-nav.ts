"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  PRESENTER_CHANNEL,
  type PresenterMessage,
  type SlideEntry,
} from "@/lib/slide-types";

type Options = {
  slides: SlideEntry[];
};

function clampStep(slide: SlideEntry, raw: number) {
  const max = (slide.meta.steps ?? 1) - 1;
  return Math.max(0, Math.min(max, raw));
}

function parseIndex(raw: string | null, total: number) {
  if (!raw) return 0;
  const parsed = parseInt(raw, 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.max(0, Math.min(total - 1, parsed - 1));
}

export function useSlideNav({ slides }: Options) {
  const total = slides.length;
  const searchParams = useSearchParams();

  // Compute initial state from URL — runs on both server and client so hydration matches.
  const initialIndex = parseIndex(searchParams?.get("slide") ?? null, total);
  const initialStep = (() => {
    const raw = searchParams?.get("step") ?? null;
    if (!raw) return 0;
    const parsed = parseInt(raw, 10);
    if (Number.isNaN(parsed)) return 0;
    return clampStep(slides[initialIndex], parsed);
  })();

  const [index, setIndex] = useState(initialIndex);
  const [step, setStep] = useState(initialStep);
  const [overview, setOverview] = useState(false);

  const goTo = useCallback(
    (nextIndex: number, atStep: "first" | "last" = "first") => {
      const clampedIndex = Math.max(0, Math.min(total - 1, nextIndex));
      const slide = slides[clampedIndex];
      const max = (slide.meta.steps ?? 1) - 1;
      setIndex(clampedIndex);
      setStep(atStep === "last" ? max : 0);
      setOverview(false);
    },
    [total, slides],
  );

  const next = useCallback(() => {
    const slide = slides[index];
    const max = (slide.meta.steps ?? 1) - 1;
    if (step < max) {
      setStep(step + 1);
    } else if (index < total - 1) {
      setIndex(index + 1);
      setStep(0);
    }
  }, [index, step, slides, total]);

  const prev = useCallback(() => {
    if (step > 0) {
      setStep(step - 1);
    } else if (index > 0) {
      const prevSlide = slides[index - 1];
      const max = (prevSlide.meta.steps ?? 1) - 1;
      setIndex(index - 1);
      setStep(max);
    }
  }, [index, step, slides]);

  // URL sync
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.set("slide", String(index + 1));
    const slide = slides[index];
    const max = (slide.meta.steps ?? 1) - 1;
    if (max > 0) {
      params.set("step", String(step));
    } else {
      params.delete("step");
    }
    const url = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", url);
  }, [index, step, slides]);

  // Broadcast changes to other windows (notes)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const channel = new BroadcastChannel(PRESENTER_CHANNEL);
    const msg: PresenterMessage = { type: "slide-change", index, step };
    channel.postMessage(msg);
    channel.close();
  }, [index, step]);

  // Respond to "request-state" pings from notes window
  useEffect(() => {
    if (typeof window === "undefined") return;
    const channel = new BroadcastChannel(PRESENTER_CHANNEL);
    channel.onmessage = (event) => {
      const msg = event.data as PresenterMessage;
      if (msg.type === "request-state") {
        const reply: PresenterMessage = {
          type: "slide-change",
          index,
          step,
        };
        channel.postMessage(reply);
      }
    };
    return () => channel.close();
  }, [index, step]);

  // Keyboard nav
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      if (event.target instanceof HTMLTextAreaElement) return;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ":
        case "PageDown":
          event.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          event.preventDefault();
          prev();
          break;
        case "Home":
          event.preventDefault();
          goTo(0);
          break;
        case "End":
          event.preventDefault();
          goTo(total - 1, "last");
          break;
        case "Escape":
          event.preventDefault();
          setOverview((o) => !o);
          break;
        case "f":
        case "F":
          event.preventDefault();
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.();
          } else {
            document.exitFullscreen?.();
          }
          break;
        case "n":
        case "N":
          event.preventDefault();
          window.open(
            `/notes?slide=${index + 1}`,
            "presenter-notes",
            "width=720,height=560",
          );
          break;
        case "o":
        case "O":
          event.preventDefault();
          window.open("/outline", "outline");
          break;
        default:
          if (/^[0-9]$/.test(event.key)) {
            event.preventDefault();
            const num = parseInt(event.key, 10);
            if (num === 0) goTo(9);
            else goTo(num - 1);
          }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, goTo, total, index]);

  const currentSlide = slides[index];
  const stepCount = currentSlide.meta.steps ?? 1;

  return {
    index,
    step,
    stepCount,
    total,
    goTo,
    next,
    prev,
    overview,
    setOverview,
  };
}
