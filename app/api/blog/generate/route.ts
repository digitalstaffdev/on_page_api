import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, json, errorResponse, unauthorized } from "@/lib/api-utils";

const BLOG_DSN = process.env.BLOG_COMMANDER_DSN;
const AUTHOR_ID = process.env.BLOG_COMMANDER_AUTHOR_ID;

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const body = await req.json();
  const { keyword, project_id, template_style } = body;

  if (!keyword || !project_id) {
    return errorResponse("keyword and project_id required");
  }

  // TODO: Implement blog generation with Anthropic
  // Use BLOG_DSN and AUTHOR_ID from env vars

  return json({
    message: "Blog generation queued",
    keyword,
    status: "pending",
  });
}
