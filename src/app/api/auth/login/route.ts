import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");

export async function POST(req: Request) {
  const body = await req.text();

  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  const token = data.access_token || data.token || data.AccessToken;

  const response = NextResponse.json(data);
  response.cookies.set({
    name: "session",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
