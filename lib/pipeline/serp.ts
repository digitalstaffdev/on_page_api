import prisma from "@/lib/prisma";

export async function runSerpRetrieval(projectId: string) {
  const keywords = await prisma.keyword.findMany({
    where: { projectId },
  });

  const serpApiKey = process.env.SERPAPI_KEY;
  const concurrency = parseInt(process.env.SERP_CONCURRENCY || "5");

  // TODO: Implement SERP retrieval
  // 1. For each keyword, fetch top 10 results from SerpAPI
  // 2. Create SerpResult records
  // 3. Respect concurrency limits and rate limiting
  // 4. Cache results to avoid duplicate API calls

  await prisma.project.update({
    where: { id: projectId },
    data: { progressPct: 60 },
  });

  return { keywords_processed: keywords.length };
}
