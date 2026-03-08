import { NextResponse } from "next/server";

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") ?? [];

export function corsHeaders(origin: string | null) {
  const headers = new Headers();
  if (origin && allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  }
  headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
  headers.set("Access-Control-Allow-Credentials", "true");
  return headers;
}

export function withCors(response: NextResponse, origin: string | null) {
  const headers = corsHeaders(origin);
  headers.forEach((value, key) => response.headers.set(key, value));
  return response;
}

export function corsPreflightResponse(origin: string | null) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}
