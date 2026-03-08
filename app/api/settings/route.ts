import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, json, errorResponse, unauthorized } from "@/lib/api-utils";

export const maxDuration = 10;

export async function GET() {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const settings = await prisma.appSetting.findMany({
    select: { id: true, key: true, isSecret: true, description: true, updatedAt: true },
  });

  return json(settings);
}

export async function PUT(req: NextRequest) {
  const session = await getAuthSession();
  if (!session || !(session.user as any).isAdmin) return unauthorized();

  const body = await req.json();
  const { key, value } = body;
  if (!key) return errorResponse("key is required");

  await prisma.appSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value, isSecret: true },
  });

  return json({ message: "Setting updated" });
}
