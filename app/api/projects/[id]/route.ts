import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, json, notFound, unauthorized } from "@/lib/api-utils";

export const maxDuration = 10;

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });
  if (!project) return notFound("Project not found");

  return json(project);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  await prisma.project.delete({ where: { id: params.id } });
  return new Response(null, { status: 204 });
}
