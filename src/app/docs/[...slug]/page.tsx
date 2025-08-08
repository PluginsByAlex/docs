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

  return (
    <div>
      <Breadcrumbs slug={slug} />
      <h1 className="mb-4 text-3xl font-bold">{data.meta.title}</h1>
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


