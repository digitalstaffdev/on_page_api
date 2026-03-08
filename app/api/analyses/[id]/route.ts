import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, json, notFound, unauthorized } from "@/lib/api-utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const report = await prisma.quantitativeReport.findUnique({
    where: { id: params.id },
  });
  if (!report) return notFound("Report not found");

  return json(report);
}
