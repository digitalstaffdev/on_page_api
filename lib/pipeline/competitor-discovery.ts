import prisma from "@/lib/prisma";

export async function runCompetitorDiscovery(projectId: string) {
  await prisma.project.update({
    where: { id: projectId },
    data: { status: "discovering", progressPct: 20 },
  });

  const project = await prisma.project.findUniqueOrThrow({
    where: { id: projectId },
  });

  // TODO: Implement competitor discovery
  // 1. Use SerpAPI to search for site's main topics
  // 2. Extract domains from SERP results
  // 3. Score by keyword overlap
  // 4. Use Anthropic to classify competitor types

  await prisma.project.update({
    where: { id: projectId },
    data: { status: "extracting", progressPct: 35 },
  });

  return { competitors_found: 0 };
}
