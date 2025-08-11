import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllDocEntries, getDocBySlug } from "@/lib/docs";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

export async function generateStaticParams() {
  const entries = getAllDocEntries();
  return entries.map((e) => ({ slug: e.slug }));
}

export default async function DocsPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const data = getDocBySlug(slug);
  if (!data) return notFound();

  const pluginLabel = slug && slug.length > 0 ? slug[0] : "General";

  return (
    <div>
      <Breadcrumbs slug={slug} />
      {/* Page header (not affected by prose) */}
      <div className="not-prose mb-6 border-b border-border pb-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{pluginLabel}</div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{data.meta.title}</h1>
        {data.meta.description && (
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{data.meta.description}</p>
        )}
      </div>

      {/* MDX content */}
      <MDXRemote
        source={data.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap", properties: { class: "subtle-anchor" } }],
              [rehypePrettyCode, { theme: { dark: "github-dark", light: "github-light" } }],
            ],
          },
        }}
      />
    </div>
  );
}


