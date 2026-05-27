"use client";

import Link from "next/link";
import { useMemo } from "react";
import { slides } from "@/slides";
import {
  formatDuration,
  speakingSeconds,
  wordCount,
} from "@/lib/speaking-time";

type Group = {
  section: string;
  entries: { index: number; entry: (typeof slides)[number] }[];
};

function groupBySection() {
  const groups: Group[] = [];
  slides.forEach((entry, index) => {
    const last = groups[groups.length - 1];
    if (last && last.section === entry.meta.section) {
      last.entries.push({ index, entry });
    } else {
      groups.push({ section: entry.meta.section, entries: [{ index, entry }] });
    }
  });
  return groups;
}

export default function OutlinePage() {
  const groups = useMemo(groupBySection, []);

  const totals = useMemo(() => {
    const words = slides.reduce(
      (acc, s) => acc + wordCount(s.meta.notes),
      0,
    );
    const seconds = slides.reduce(
      (acc, s) => acc + speakingSeconds(s.meta.notes),
      0,
    );
    return { words, seconds };
  }, []);

  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#f3f3f1] text-slate-900">
      <div className="mx-auto max-w-5xl px-8 py-12">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-violet-700">
              Outline
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
              Low-Code, Big Impact
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              All {slides.length} slides on one page. Use this to draft your
              talk track, spot gaps, and feel the arc end-to-end.
            </p>
          </div>
          <div className="flex items-center gap-6 rounded-2xl border border-slate-200 bg-white/70 px-6 py-4 text-sm shadow-sm backdrop-blur">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                Slides
              </div>
              <div className="text-xl font-semibold">{slides.length}</div>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                Notes words
              </div>
              <div className="text-xl font-semibold">{totals.words}</div>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                Est. talk time
              </div>
              <div className="text-xl font-semibold text-violet-700">
                {formatDuration(totals.seconds)}
              </div>
            </div>
            <Link
              href="/"
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium uppercase tracking-wider text-slate-700 transition hover:border-violet-500 hover:text-violet-700"
            >
              ← Deck
            </Link>
          </div>
        </header>

        <p className="mb-12 max-w-2xl rounded-xl border border-violet-200 bg-violet-50/60 px-5 py-3 text-sm text-violet-900">
          Talk-time estimate assumes ~130 wpm. Conservative — real conference
          pace adds 10–25% with pauses, audience interaction, and asides.
        </p>

        <div className="space-y-16">
          {groups.map((group) => {
            const groupSeconds = group.entries.reduce(
              (acc, { entry }) => acc + speakingSeconds(entry.meta.notes),
              0,
            );
            return (
              <section key={group.section}>
                <div className="mb-6 flex items-baseline justify-between border-b border-slate-200 pb-3">
                  <h2 className="font-display text-2xl font-semibold tracking-tight">
                    {group.section}
                  </h2>
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                    {group.entries.length} slide
                    {group.entries.length === 1 ? "" : "s"} ·{" "}
                    {formatDuration(groupSeconds)}
                  </div>
                </div>

                <ul className="space-y-6">
                  {group.entries.map(({ index, entry }) => {
                    const notes = entry.meta.notes ?? "";
                    const words = wordCount(notes);
                    const seconds = speakingSeconds(notes);
                    const isStub = words === 0;

                    return (
                      <li
                        key={entry.meta.id}
                        className="grid grid-cols-12 gap-6 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur"
                      >
                        <div className="col-span-3 flex flex-col gap-3">
                          <div className="flex items-baseline gap-3">
                            <span className="font-mono text-2xl font-semibold tabular-nums text-slate-400">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <Link
                              href={`/?slide=${index + 1}`}
                              className="text-base font-semibold leading-tight text-slate-900 transition hover:text-violet-700"
                            >
                              {entry.meta.title}
                            </Link>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono uppercase tracking-wider text-slate-500">
                              {entry.meta.section}
                            </span>
                            {isStub ? (
                              <span className="rounded-full bg-amber-100 px-2 py-0.5 font-mono uppercase tracking-wider text-amber-700">
                                no notes
                              </span>
                            ) : (
                              <span className="rounded-full bg-violet-50 px-2 py-0.5 font-mono uppercase tracking-wider text-violet-700">
                                {words}w · {formatDuration(seconds)}
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/?slide=${index + 1}`}
                            className="mt-auto inline-flex w-fit items-center gap-1 text-xs text-slate-500 transition hover:text-violet-700"
                          >
                            Open slide →
                          </Link>
                        </div>

                        <div className="col-span-9">
                          {isStub ? (
                            <p className="italic text-amber-700">
                              No notes drafted yet. Tell me what to write.
                            </p>
                          ) : (
                            <div className="whitespace-pre-wrap text-[15px] leading-[1.65] text-slate-700">
                              {notes}
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        <footer className="mt-16 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          Edit notes by dictating changes in chat — &ldquo;slide N, add bullet
          about X&rdquo; — and they&apos;ll update in the source.
        </footer>
      </div>
    </div>
  );
}
