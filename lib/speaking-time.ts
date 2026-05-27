const WORDS_PER_MINUTE = 130;

export function wordCount(text: string | undefined): number {
  if (!text) return 0;
  return text
    .replace(/[•·\-\*\[\]\(\)\{\}]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

export function speakingSeconds(text: string | undefined): number {
  const words = wordCount(text);
  return Math.round((words / WORDS_PER_MINUTE) * 60);
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s === 0 ? `${m}m` : `${m}m ${s}s`;
}
