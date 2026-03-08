import prisma from "@/lib/prisma";

export async function runRewriter(projectId: string) {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514";

  const keywords = await prisma.keyword.findMany({
    where: { projectId },
    include: { semanticReports: true },
  });

  // TODO: Implement AI rewriting with Anthropic
  // 1. For each keyword with a semantic report, generate optimization suggestions
  // 2. Support modes: meta, sections, full_restructure, new_page
  // 3. Create Rewrite records

  await prisma.project.update({
    where: { id: projectId },
    data: { status: "complete", progressPct: 100 },
  });

  return { rewrites_generated: 0 };
}
