import { serve } from "inngest/next";
import { inngest } from "@/lib/pipeline/inngest-client";
import { allFunctions } from "@/lib/pipeline/inngest-functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: allFunctions,
});
