import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

/**
 * Dev-only: rewrites the `notes` string literal inside a slide's meta.
 * The deployed build (Vercel) has a read-only filesystem, so this route
 * refuses to run outside `next dev`.
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Notes editing is only available in local dev." },
      { status: 403 },
    );
  }

  const body = await request.json().catch(() => null);
  const id = body?.id;
  const notes = body?.notes;
  if (
    typeof id !== "string" ||
    !/^[0-9a-z-]+$/.test(id) ||
    typeof notes !== "string"
  ) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "slides");
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".tsx"));

  for (const file of files) {
    const filePath = path.join(dir, file);
    const src = await fs.readFile(filePath, "utf8");
    if (!src.includes(`id: "${id}"`)) continue;

    const notesLiteral = /notes:\s*\n?\s*"(?:[^"\\]|\\.)*"/;
    if (!notesLiteral.test(src)) {
      return NextResponse.json(
        { error: `No notes string found in ${file}.` },
        { status: 500 },
      );
    }

    const updated = src.replace(
      notesLiteral,
      `notes:\n      ${JSON.stringify(notes)}`,
    );
    await fs.writeFile(filePath, updated, "utf8");
    return NextResponse.json({ ok: true, file });
  }

  return NextResponse.json({ error: "Slide not found." }, { status: 404 });
}
