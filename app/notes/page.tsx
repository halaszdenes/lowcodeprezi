"use client";

import { useEffect, useState } from "react";
import { slides } from "@/slides";
import {
  PRESENTER_CHANNEL,
  type PresenterMessage,
} from "@/lib/slide-types";

const CAN_EDIT = process.env.NODE_ENV === "development";

export default function NotesPage() {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [override, setOverride] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("slide");
    if (raw) {
      const parsed = parseInt(raw, 10);
      if (!Number.isNaN(parsed)) setIndex(Math.max(0, parsed - 1));
    }
  }, []);

  useEffect(() => {
    const channel = new BroadcastChannel(PRESENTER_CHANNEL);
    channel.onmessage = (event) => {
      const msg = event.data as PresenterMessage;
      if (msg.type === "slide-change") {
        setIndex(msg.index);
        setStep(msg.step);
      }
    };
    const requestState: PresenterMessage = { type: "request-state" };
    channel.postMessage(requestState);
    return () => channel.close();
  }, []);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  // Leaving the slide discards any unsaved draft and stale override.
  useEffect(() => {
    setEditing(false);
    setOverride(null);
    setSaveState("idle");
  }, [index]);

  const current = slides[index];
  const upcoming = slides[index + 1];
  const displayedNotes = override ?? current?.meta.notes;

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  const startEdit = () => {
    setDraft(displayedNotes ?? "");
    setEditing(true);
    setSaveState("idle");
  };

  const save = async () => {
    if (!current) return;
    setSaveState("saving");
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: current.meta.id, notes: draft }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed.");
      // Show the draft until fast refresh delivers the rewritten module.
      setOverride(draft);
      setEditing(false);
      setSaveState("saved");
    } catch (err) {
      setSaveState("error");
      setSaveError(err instanceof Error ? err.message : "Save failed.");
    }
  };

  return (
    <div className="flex h-screen flex-col gap-6 bg-white p-8 text-slate-900">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Presenter notes
          </p>
          <h1 className="font-display text-2xl">{current?.meta.title}</h1>
          <p className="text-sm text-slate-500">
            Slide {index + 1} / {slides.length} · {current?.meta.section}
            {(current?.meta.steps ?? 1) > 1 && (
              <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 font-mono text-xs text-brand-700">
                step {step + 1} / {current?.meta.steps}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {saveState === "saved" && (
            <span className="text-sm text-emerald-600">Saved to source ✓</span>
          )}
          {saveState === "error" && (
            <span className="max-w-[24ch] text-sm text-red-600">
              {saveError}
            </span>
          )}
          {CAN_EDIT && !editing && (
            <button
              onClick={startEdit}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm transition hover:border-brand-500 hover:text-brand-600"
            >
              Edit
            </button>
          )}
          {editing && (
            <>
              <button
                onClick={save}
                disabled={saveState === "saving"}
                className="rounded-full border border-brand-500 bg-brand-500 px-4 py-2 text-sm text-white transition hover:bg-brand-600 disabled:opacity-50"
              >
                {saveState === "saving" ? "Saving…" : "Save"}
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setSaveState("idle");
                }}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
              >
                Cancel
              </button>
            </>
          )}
          <div className="rounded-lg border border-slate-200 px-4 py-2 font-mono text-2xl">
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>
          <button
            onClick={() => setRunning((r) => !r)}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm transition hover:border-brand-500 hover:text-brand-600"
          >
            {running ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => {
              setElapsed(0);
              setRunning(false);
            }}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
          >
            Reset
          </button>
        </div>
      </header>

      <section className="flex-1 overflow-auto rounded-xl border border-slate-200 bg-slate-50/60 p-6">
        {editing ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
            spellCheck={false}
            className="h-full w-full resize-none rounded-lg border border-brand-200 bg-white p-4 font-mono text-[15px] leading-relaxed text-slate-800 outline-none focus:border-brand-400"
          />
        ) : displayedNotes ? (
          <div className="prose max-w-none whitespace-pre-wrap text-base leading-relaxed text-slate-800">
            {displayedNotes}
          </div>
        ) : (
          <p className="text-slate-500">
            No notes yet for this slide.
            {CAN_EDIT ? " Hit Edit to write some." : ""}
          </p>
        )}
      </section>

      {upcoming && (
        <footer className="rounded-xl border border-slate-200 bg-slate-50/40 p-4 text-sm text-slate-500">
          Next ▸ {upcoming.meta.title}
        </footer>
      )}
    </div>
  );
}
