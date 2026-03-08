import { runSiteProfiler } from "./site-profiler";
import { runCompetitorDiscovery } from "./competitor-discovery";
import { runKeywordExtractor } from "./keyword-extractor";
import { runSerpRetrieval } from "./serp";
import { runPageScraper } from "./scraper";
import { runQuantitativeAnalysis } from "./quantitative";
import { runSemanticAnalysis } from "./semantic-analyzer";
import { runRewriter } from "./rewriter";
import prisma from "@/lib/prisma";

export async function runDiscoveryPipeline(projectId: string) {
  try {
    await runSiteProfiler(projectId);
    await runCompetitorDiscovery(projectId);
    await runKeywordExtractor(projectId);
  } catch (error) {
    await prisma.project.update({
      where: { id: projectId },
      data: { status: "failed" },
    });
    throw error;
  }
}

export async function runAnalysisPipeline(projectId: string) {
  try {
    await runSerpRetrieval(projectId);
    await runPageScraper(projectId);
    await runQuantitativeAnalysis(projectId);
    await runSemanticAnalysis(projectId);
    await runRewriter(projectId);
  } catch (error) {
    await prisma.project.update({
      where: { id: projectId },
      data: { status: "failed" },
    });
    throw error;
  }
}
