import Link from "next/link";
import { getDocsTree, type DocsTreeNode } from "@/lib/docs";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

function renderNodes(nodes: DocsTreeNode[], basePath = "/docs") {
  return (
    <ul className="space-y-1">
      {nodes.map((node, idx) => (
        <li key={idx}>
          {node.slug ? (
            <Link
              href={`${basePath}/${node.slug.join("/")}`}
              className={cn(
                "block rounded px-2 py-1 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              {node.name}
            </Link>
          ) : (
            <div className="mt-3 mb-1 text-xs font-semibold uppercase text-muted-foreground">
              {node.name}
            </div>
          )}
          {node.children && node.children.length > 0 && (
            <div className="ml-2 border-l border-border pl-3">
              {renderNodes(node.children, basePath)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Sidebar() {
  const tree = getDocsTree();
  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="mb-6 flex items-center gap-2 px-2">
        <BookOpen className="h-5 w-5" />
        <span className="text-sm font-semibold">Plugin Docs</span>
      </div>
      {renderNodes(tree)}
      <div className="h-6" />
    </div>
  );
}


