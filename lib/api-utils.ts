import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export type AuthSession = {
  user: {
    id: string;
    email: string;
    name?: string | null;
    tier: string;
    isAdmin: boolean;
  };
};

export async function getAuthSession(): Promise<AuthSession | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  return session as unknown as AuthSession;
}

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ detail: message }, { status });
}

export function notFound(message = "Not found") {
  return NextResponse.json({ detail: message }, { status: 404 });
}

export function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ detail: message }, { status: 401 });
}
