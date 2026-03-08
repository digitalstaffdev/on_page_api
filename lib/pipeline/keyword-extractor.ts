import prisma from "@/lib/prisma";

export async function runKeywordExtractor(projectId: string) {
  await prisma.project.update({
    where: { id: projectId },
    data: { status: "extracting", progressPct: 40 },
  });

  // TODO: Implement keyword extraction
  // 1. Analyze competitor content for common keywords
  // 2. Use Google Autocomplete for keyword suggestions
  // 3. Optionally use DataForSEO for volume/difficulty data
  // 4. Use Anthropic to rank and cluster keywords
  // 5. Create Keyword records in the database

  await prisma.project.update({
    where: { id: projectId },
    data: { status: "ready", progressPct: 50 },
  });

  return { keywords_extracted: 0 };
}
