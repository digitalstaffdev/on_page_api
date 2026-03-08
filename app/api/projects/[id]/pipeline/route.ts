import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, json, notFound, unauthorized, errorResponse } from "@/lib/api-utils";

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });
  if (!project) return notFound("Project not found");

  if (project.status !== "ready" && project.status !== "failed") {
    return errorResponse("Project is not in a state that can be analyzed");
  }

  await prisma.project.update({
    where: { id: params.id },
    data: { status: "analyzing", progressPct: 0 },
  });

  // TODO: Trigger Inngest pipeline event
  // await inngest.send({ name: "pipeline/analysis.start", data: { projectId: params.id } });

  return json({ message: "Analysis pipeline started" });
}
