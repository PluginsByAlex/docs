import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import TableOfContents from "@/components/TableOfContents";
import { TopNav } from "@/components/TopNav";
import { getPlugins } from "@/lib/docs";

export default function DocsLayout({ children }: { children: ReactNode }) {
  const plugins = getPlugins();
  return (
    <div className="grid min-h-screen md:grid-cols-[280px_1fr]">
      <aside className="hidden md:block border-r border-border bg-card">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </aside>
      <div className="flex min-w-0 flex-col">
        <TopNav plugins={plugins} />
        <div className="relative mx-auto flex w-full max-w-6xl gap-10 px-4 py-6">
          <main className="min-w-0 flex-1 prose prose-stone dark:prose-invert">
            {children}
          </main>
          <div className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto xl:block">
            <TableOfContents />
          </div>
        </div>
      </div>
    </div>
  );
}


