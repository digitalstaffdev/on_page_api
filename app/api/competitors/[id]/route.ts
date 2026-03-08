import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, json, notFound, unauthorized } from "@/lib/api-utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const competitor = await prisma.competitor.findUnique({
    where: { id: params.id },
  });
  if (!competitor) return notFound("Competitor not found");

  return json(competitor);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  await prisma.competitor.delete({ where: { id: params.id } });
  return new Response(null, { status: 204 });
}
