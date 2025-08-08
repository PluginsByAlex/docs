import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type DocMeta = {
  title: string;
  description?: string;
  order?: number;
};

export type DocEntry = {
  slug: string[]; // ["getting-started"] or ["plugin","page"]
  filePath: string; // absolute path
  meta: DocMeta;
};

const DOCS_DIR = path.join(process.cwd(), "docs");

export function ensureDocsDir(): void {
  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }
}

function isMdx(file: string) {
  return file.endsWith(".mdx") || file.endsWith(".md");
}

export function getAllDocEntries(): DocEntry[] {
  ensureDocsDir();
  const entries: DocEntry[] = [];

  function walk(currentDir: string, parts: string[]) {
    const dirents = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const dirent of dirents) {
      if (dirent.name.startsWith(".")) continue;
      const full = path.join(currentDir, dirent.name);
      if (dirent.isDirectory()) {
        walk(full, [...parts, dirent.name]);
      } else if (dirent.isFile() && isMdx(dirent.name)) {
        const raw = fs.readFileSync(full, "utf8");
        const { data } = matter(raw);
        const meta: DocMeta = {
          title: data.title || deriveTitleFromFilename(dirent.name),
          description: data.description || undefined,
          order: typeof data.order === "number" ? data.order : undefined,
        };
        const base = dirent.name.replace(/\.(mdx|md)$/i, "");
        const slug = base.toLowerCase() === "index" && parts.length > 0 ? [...parts] : [...parts, base];
        entries.push({ slug, filePath: full, meta });
      }
    }
  }

  walk(DOCS_DIR, []);
  // Sort by parent path and optional 'order' within siblings, then by slug as fallback
  entries.sort((a, b) => {
    const parentA = a.slug.slice(0, -1).join("/");
    const parentB = b.slug.slice(0, -1).join("/");
    if (parentA === parentB) {
      const orderA = a.meta.order ?? Number.POSITIVE_INFINITY;
      const orderB = b.meta.order ?? Number.POSITIVE_INFINITY;
      if (orderA !== orderB) return orderA - orderB;
    }
    return a.slug.join("/").localeCompare(b.slug.join("/"));
  });
  return entries;
}

function deriveTitleFromFilename(name: string): string {
  return name
    .replace(/\.(mdx|md)$/i, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getDocBySlug(slug: string[]): { content: string; meta: DocMeta } | null {
  const entries = getAllDocEntries();
  const match = entries.find((e) => arrayEquals(e.slug, slug));
  if (!match) return null;
  const raw = fs.readFileSync(match.filePath, "utf8");
  const { content, data } = matter(raw);
  const meta: DocMeta = {
    title: data.title || deriveTitleFromFilename(path.basename(match.filePath)),
    description: data.description || undefined,
  };
  return { content, meta };
}

export function arrayEquals(a: string[], b: string[]) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

export type DocsTreeNode = {
  name: string; // display name
  slug?: string[]; // undefined means folder
  children?: DocsTreeNode[];
};

export function getDocsTree(): DocsTreeNode[] {
  ensureDocsDir();
  // Build a nested tree from entries
  const entries = getAllDocEntries();
  const root: DocsTreeNode[] = [];
  for (const entry of entries) {
    insertNode(root, entry.slug, entry.meta.title);
  }
  return root;
}

function insertNode(root: DocsTreeNode[], slug: string[], title: string) {
  let currentLevel = root;
  for (let i = 0; i < slug.length; i += 1) {
    const isLeaf = i === slug.length - 1;
    const part = slug[i];
    const display = isLeaf ? title : toTitleCase(part);
    let node = currentLevel.find((n) => (n.slug ? n.slug[i] === part : n.name.toLowerCase() === display.toLowerCase()));
    if (!node) {
      node = { name: display, slug: isLeaf ? slug : undefined, children: [] };
      currentLevel.push(node);
    }
    if (!node.children) node.children = [];
    currentLevel = node.children;
  }
}

function toTitleCase(str: string) {
  return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getPlugins(): string[] {
  ensureDocsDir();
  // Plugins are top-level directories under /docs. Root-level MDX belongs to "General".
  const items = fs.readdirSync(DOCS_DIR, { withFileTypes: true });
  const plugins = items.filter((d) => d.isDirectory()).map((d) => d.name);
  return ["General", ...plugins];
}


