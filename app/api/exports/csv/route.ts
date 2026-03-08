import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, errorResponse, unauthorized } from "@/lib/api-utils";

export const maxDuration = 30;

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const projectId = req.nextUrl.searchParams.get("project_id");
  if (!projectId) return errorResponse("project_id required");

  const keywords = await prisma.keyword.findMany({
    where: { projectId },
    orderBy: { rank: "asc" },
  });

  const header = "rank,keyword,cluster,intent,volume,difficulty,score\n";
  const rows = keywords
    .map((k) =>
      [k.rank, k.keyword, k.cluster, k.searchIntent, k.searchVolume, k.difficulty, k.opportunityScore].join(",")
    )
    .join("\n");

  return new NextResponse(header + rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="keywords-${projectId}.csv"`,
    },
  });
}
