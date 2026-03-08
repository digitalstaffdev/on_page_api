import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, json, unauthorized } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const keywordId = req.nextUrl.searchParams.get("keyword_id");
  if (!keywordId) return json({ quantitative: [], semantic: [], rewrites: [] });

  const [quantitative, semantic, rewrites] = await Promise.all([
    prisma.quantitativeReport.findMany({ where: { keywordId } }),
    prisma.semanticReport.findMany({ where: { keywordId } }),
    prisma.rewrite.findMany({ where: { keywordId } }),
  ]);

  return json({ quantitative, semantic, rewrites });
}
