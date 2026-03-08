import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, json, errorResponse, unauthorized } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const projectId = req.nextUrl.searchParams.get("project_id");
  if (!projectId) return json([]);

  const competitors = await prisma.competitor.findMany({
    where: { projectId },
    orderBy: { rank: "asc" },
  });

  return json(competitors);
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const body = await req.json();
  const { project_id, domain, notes } = body;
  if (!project_id || !domain) return errorResponse("project_id and domain required");

  const maxRank = await prisma.competitor.aggregate({
    where: { projectId: project_id },
    _max: { rank: true },
  });

  const competitor = await prisma.competitor.create({
    data: {
      projectId: project_id,
      domain,
      rank: (maxRank._max.rank ?? 0) + 1,
      competitorType: "user-added",
      isUserAdded: true,
      notes: notes || null,
    },
  });

  return json(competitor, 201);
}
