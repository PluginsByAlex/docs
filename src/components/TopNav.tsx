"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github, Search as SearchIcon, Menu } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";

type SearchItem = {
  path: string;
  title: string;
  headings: string[];
};

export function TopNav({ plugins }: { plugins: string[] }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/search")
      .then((r) => r.json())
      .then((data) => setIndex(data.items as SearchItem[]))
      .catch(() => {});
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(index, {
      threshold: 0.3,
      keys: ["title", "headings"],
    });
  }, [index]);

  const results = query ? fuse.search(query).slice(0, 8) : [];

  return (
    <div className="relative flex h-14 items-center gap-3 border-b border-border px-4">
      <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle navigation">
        <Menu className="h-5 w-5" />
      </button>

      <select
        className="hidden md:block h-9 rounded-md border border-border bg-transparent px-3 text-sm"
        onChange={(e) => {
          const plugin = e.target.value;
          if (plugin === "General") router.push("/docs/getting-started");
          else router.push(`/docs/${plugin}`);
        }}
      >
        {plugins.map((p) => (
          <option key={p} value={p} className="bg-background">
            {p}
          </option>
        ))}
      </select>

      <div className="relative ml-auto w-full max-w-md">
        <SearchIcon className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search docs..."
          className="pl-8"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {results.length > 0 && (
          <div className="absolute z-20 mt-1 w-full rounded-md border border-border bg-card p-1 shadow">
            {results.map((r) => (
              <button
                key={r.item.path}
                className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => {
                  setQuery("");
                  router.push(r.item.path);
                }}
              >
                {r.item.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <Link href="https://github.com/your/repo" aria-label="GitHub" className="ml-2">
        <Button variant="ghost" size="icon">
          <Github className="h-5 w-5" />
        </Button>
      </Link>

      <ThemeToggle />

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside className="fixed left-0 top-0 z-50 h-full w-80 border-r border-border bg-card p-4 shadow md:hidden">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold">Navigation</span>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
            {/* Sidebar tree */}
            {/* Rendered dynamically on server normally; import the component directly here */}
            {/* @ts-expect-error Server Component inside client via separate route is not allowed; replicate with iframe-like link list */}
            {/* As a simple approach, fetch the nav HTML via /docs and show links from index. For now, route to docs index. */}
            <div className="text-sm text-muted-foreground">
              Open the full docs to browse navigation.
            </div>
            <div className="mt-3">
              <Button asChild className="w-full" onClick={() => setOpen(false)}>
                <a href="/docs">Go to Docs</a>
              </Button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}


