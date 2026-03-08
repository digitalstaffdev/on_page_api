import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, json, errorResponse, unauthorized } from "@/lib/api-utils";

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const projectId = req.nextUrl.searchParams.get("project_id");
  if (!projectId) return errorResponse("project_id required");

  // TODO: Return Google Ads reports
  return json([]);
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const body = await req.json();
  const { project_id } = body;
  if (!project_id) return errorResponse("project_id required");

  // TODO: Run Google Ads analysis
  return json({ message: "Google Ads analysis started", status: "pending" });
}
