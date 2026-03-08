import { NextRequest } from "next/server";
import { getAuthSession, json, unauthorized } from "@/lib/api-utils";

export const maxDuration = 10;

export async function GET() {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  // TODO: Fetch billing info from Stripe
  return json({
    tier: (session.user as any).tier || "free",
    subscription: null,
  });
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (!session) return unauthorized();

  // TODO: Create Stripe checkout session
  return json({ url: "https://checkout.stripe.com/placeholder" });
}
