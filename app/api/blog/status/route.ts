import { NextRequest } from "next/server";
import { getAuthSession, json, unauthorized } from "@/lib/api-utils";

export const maxDuration = 10;

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const jobId = req.nextUrl.searchParams.get("job_id");

  // TODO: Check blog generation status from DB
  return json({ status: "pending", job_id: jobId });
}
