"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

type SearchItem = {
  path: string;
  title: string;
  headings: string[];
};

const plugins = [
  {
    name: "MessageCore",
    description: "Custom messages, anywhere",
    image: "https://i.imgur.com/DVB2XaA.png",
    href: "/docs/MessageCore",
  },
  {
    name: "GlobalQuests",
    description: "Quests to be completed by everyone.",
    image: "https://i.imgur.com/zar2ez4.png",
    href: "/docs/GlobalQuests",
  },
  {
    name: "PotionPal",
    description: "Hold an item in your offhand to gain potion effects.",
    image: "https://i.imgur.com/fLK1uzf.png",
    href: "/docs/PotionPal",
  },
];

export default function DocsIndexPage() {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchItem[]>([]);

  useEffect(() => {
    fetch("/api/search")
      .then((r) => r.json())
      .then((data) => setIndex(data.items as SearchItem[]))
      .catch(() => {});
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(index, { threshold: 0.3, keys: ["title", "headings"] });
  }, [index]);

  const results = query ? fuse.search(query).slice(0, 8) : [];

  return (
    <div className="relative">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-20%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.12),transparent)] blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.1),transparent)] blur-2xl" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-2 sm:px-4 pt-4 sm:pt-8 pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Documentation</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Browse plugin guides, commands, configuration, and examples. Use search to jump straight where you need to go.
        </p>

        {/* Search */}
        <div className="relative mt-5 w-full max-w-xl">
          <SearchIcon className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search docs..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {results.length > 0 && (
            <div className="absolute z-20 mt-2 w-full rounded-md border border-border bg-card p-1 shadow">
              {results.map((r) => (
                <Link
                  key={r.item.path}
                  href={r.item.path}
                  className="block rounded px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => setQuery("")}
                >
                  {r.item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Plugins grid */}
      <section className="mx-auto max-w-6xl px-2 sm:px-4 pb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-muted-foreground">Plugins</h2>
          <Link href="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Back to home
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {plugins.map((p) => (
            <article key={p.name} className="group relative overflow-hidden rounded-2xl border border-border bg-card">
              <div aria-hidden className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
              <div aria-hidden className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 [background:radial-gradient(40rem_40rem_at_100%_100%,rgba(59,130,246,0.12),transparent)] transition-opacity duration-700 group-hover:opacity-100" />
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  priority
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>
              <div className="relative z-10 -mt-8 px-4 pb-4">
                <div className="rounded-xl border border-white/5 bg-black/20 p-3 backdrop-blur">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold">{p.name}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{p.description}</p>
                    </div>
                    <Link href={p.href} className="shrink-0">
                      <Button size="sm" variant="secondary" className="gap-1">
                        View docs
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}


