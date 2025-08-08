"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Heading = { id: string; text: string; level: number };

export default function TableOfContents() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const headings: Heading[] = useMemo(() => {
    if (typeof document === "undefined") return [];
    const nodes = Array.from(
      document.querySelectorAll("main h1, main h2, main h3, main h4")
    ) as HTMLHeadingElement[];
    return nodes.map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: Number(el.tagName.slice(1)),
    }));
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);
        if (visible[0]) {
          setActiveId((visible[0].target as HTMLElement).id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: [0, 1] }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="text-sm">
      <div className="mb-2 font-semibold">On this page</div>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} className="truncate">
            <Link
              href={`#${h.id}`}
              className={
                "block truncate py-1 " + (activeId === h.id ? "text-blue-600" : "text-muted-foreground")
              }
              style={{ paddingLeft: (h.level - 1) * 12 }}
            >
              {h.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


