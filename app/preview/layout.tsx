import Link from "next/link";

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex flex-col bg-black">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-3 text-sm">
        <div className="flex items-center gap-6 text-white/60">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.25em] transition hover:text-white"
          >
            ← back to deck
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/30">
            design preview
          </span>
        </div>
        <nav className="flex items-center gap-1 font-mono text-xs">
          {[1, 2, 3].map((n) => (
            <Link
              key={n}
              href={`/preview/${n}`}
              className="rounded-full border border-white/15 px-4 py-1.5 text-white/70 transition hover:border-white hover:text-white"
            >
              0{n}
            </Link>
          ))}
        </nav>
      </header>
      <div className="flex flex-1 items-center justify-center overflow-hidden p-6">
        <div className="slide-stage relative overflow-hidden rounded-md shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}
