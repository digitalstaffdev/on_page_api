import { inngest } from "./inngest-client";
import { runDiscoveryPipeline, runAnalysisPipeline } from "./index";

export const discoveryPipeline = inngest.createFunction(
  {
    id: "discovery-pipeline",
    name: "Discovery Pipeline",
    retries: 1,
  },
  { event: "pipeline/discovery.start" },
  async ({ event }) => {
    const { projectId } = event.data;
    await runDiscoveryPipeline(projectId);
    return { success: true, projectId };
  }
);

export const analysisPipeline = inngest.createFunction(
  {
    id: "analysis-pipeline",
    name: "Analysis Pipeline",
    retries: 1,
  },
  { event: "pipeline/analysis.start" },
  async ({ event }) => {
    const { projectId } = event.data;
    await runAnalysisPipeline(projectId);
    return { success: true, projectId };
  }
);

export const allFunctions = [discoveryPipeline, analysisPipeline];
