import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${API_BASE}/api/me`, {
    headers: { Cookie: `session=${session}` },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
