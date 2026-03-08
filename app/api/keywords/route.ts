import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, json, unauthorized } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const projectId = req.nextUrl.searchParams.get("project_id");
  if (!projectId) return json([]);

  const keywords = await prisma.keyword.findMany({
    where: { projectId },
    orderBy: { rank: "asc" },
  });

  return json(keywords);
}
