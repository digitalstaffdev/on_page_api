import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, json, notFound, unauthorized } from "@/lib/api-utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const keyword = await prisma.keyword.findUnique({
    where: { id: params.id },
    include: {
      serpResults: true,
      quantitativeReports: true,
      semanticReports: true,
      rewrites: true,
    },
  });
  if (!keyword) return notFound("Keyword not found");

  return json(keyword);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  await prisma.keyword.delete({ where: { id: params.id } });
  return new Response(null, { status: 204 });
}
