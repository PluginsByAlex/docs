import { NextResponse } from "next/server";
import { getAllDocEntries } from "@/lib/docs";
import fs from "fs";
import matter from "gray-matter";

export const revalidate = 60; // cache for a minute

export async function GET() {
  const entries = getAllDocEntries();
  const items = entries.map((e) => {
    const raw = fs.readFileSync(e.filePath, "utf8");
    const { content, data } = matter(raw);
    const title = data.title || e.meta.title;
    const headings = Array.from(content.matchAll(/^#{1,4}\s+(.*)$/gm)).map((m) => m[1]);
    return {
      path: `/docs/${e.slug.join("/")}`,
      title,
      headings,
    };
  });
  return NextResponse.json({ items });
}


