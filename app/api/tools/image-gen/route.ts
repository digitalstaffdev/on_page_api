import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, json, errorResponse, unauthorized } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const projectId = req.nextUrl.searchParams.get("project_id");
  if (!projectId) return errorResponse("project_id required");

  // TODO: Return generated images
  return json([]);
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const body = await req.json();
  const { project_id } = body;
  if (!project_id) return errorResponse("project_id required");

  // TODO: Run AI image generation
  return json({ message: "Image generation started", status: "pending" });
}
