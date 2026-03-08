import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, json, errorResponse, unauthorized } from "@/lib/api-utils";

export const maxDuration = 10;

export async function GET() {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      targetUrl: true,
      targetDomain: true,
      status: true,
      progressPct: true,
      createdAt: true,
    },
  });

  return json(projects);
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const body = await req.json();
  const { target_url, locale } = body;
  if (!target_url) return errorResponse("target_url is required");

  const domain = new URL(target_url).hostname;

  const project = await prisma.project.create({
    data: {
      userId: session.user.id,
      targetUrl: target_url,
      targetDomain: domain,
      status: "profiling",
      progressPct: 0,
    },
  });

  return json(project, 201);
}
