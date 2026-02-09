export async function resolveArticleId(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/article/resolve?slug=${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data?.id ?? null;
}

export async function resolveRoomId(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/room/resolve?slug=${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data?.id ?? null;
}