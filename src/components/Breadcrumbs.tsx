import Link from "next/link";

export function Breadcrumbs({ slug }: { slug: string[] }) {
  const segments = ["docs", ...slug];
  const crumbs = segments.map((seg, i) => ({
    name: toTitle(seg),
    href: "/" + segments.slice(0, i + 1).join("/"),
  }));

  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
      <ol className="flex items-center gap-1">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
          <span className="px-1">/</span>
        </li>
        {crumbs.map((c, idx) => (
          <li key={c.href} className="flex items-center gap-1">
            {idx < crumbs.length - 1 ? (
              <>
                <Link href={c.href} className="hover:underline">{c.name}</Link>
                <span className="px-1">/</span>
              </>
            ) : (
              <span className="text-foreground">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function toTitle(s: string) {
  return s.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}


