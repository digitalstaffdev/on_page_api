import prisma from "@/lib/prisma";

export interface SiteProfile {
  niche: string;
  topics: string[];
  pages_crawled: number;
  domain_info: Record<string, unknown>;
}

export async function runSiteProfiler(projectId: string): Promise<SiteProfile> {
  const project = await prisma.project.findUniqueOrThrow({
    where: { id: projectId },
  });

  await prisma.project.update({
    where: { id: projectId },
    data: { status: "profiling", progressPct: 5 },
  });

  const maxPages = parseInt(process.env.MAX_CRAWL_PAGES || "50");
  const crawlDelay = parseInt(process.env.CRAWL_DELAY_MS || "500");

  // TODO: Implement crawling with fetch + cheerio
  // 1. Fetch robots.txt
  // 2. Crawl homepage and internal links up to maxPages
  // 3. Extract page titles, headings, meta descriptions
  // 4. Use Anthropic to identify niche and topics from content

  const profile: SiteProfile = {
    niche: "general",
    topics: [],
    pages_crawled: 0,
    domain_info: { url: project.targetUrl, domain: project.targetDomain },
  };

  await prisma.project.update({
    where: { id: projectId },
    data: {
      siteProfile: profile as any,
      status: "discovering",
      progressPct: 15,
    },
  });

  return profile;
}
