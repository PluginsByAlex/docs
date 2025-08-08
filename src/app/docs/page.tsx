import { redirect } from "next/navigation";
import { getAllDocEntries } from "@/lib/docs";

export default function DocsIndexPage() {
  const entries = getAllDocEntries();
  const first = entries[0];
  if (first) {
    redirect(`/docs/${first.slug.join("/")}`);
  }
  redirect("/");
}


