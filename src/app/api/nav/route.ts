import { NextResponse } from "next/server";
import { getDocsTree } from "@/lib/docs";

export const revalidate = 60;

export async function GET() {
  const tree = getDocsTree();
  return NextResponse.json({ tree });
}


