import prisma from "@/lib/prisma";

export async function runPageScraper(projectId: string) {
  const concurrency = parseInt(process.env.SCRAPE_CONCURRENCY || "10");
  const timeout = parseInt(process.env.SCRAPE_TIMEOUT_SECONDS || "15") * 1000;

  // TODO: Implement page scraping
  // 1. Get all unique URLs from SERP results for this project
  // 2. Fetch each page (deduplicated)
  // 3. Extract: title, meta desc, body text, headings, links, images, schema
  // 4. Store as PageContent records
  // 5. Create PageKeywordMap entries

  await prisma.project.update({
    where: { id: projectId },
    data: { progressPct: 70 },
  });

  return { pages_scraped: 0 };
}
