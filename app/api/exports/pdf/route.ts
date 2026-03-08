import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession, errorResponse, unauthorized } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  const reportId = req.nextUrl.searchParams.get("report_id");
  if (!reportId) return errorResponse("report_id required");

  const report = await prisma.projectReport.findUnique({
    where: { id: reportId },
  });

  if (!report) return errorResponse("Report not found", 404);

  return new NextResponse(report.pdfData, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${report.fileName}"`,
    },
  });
}
