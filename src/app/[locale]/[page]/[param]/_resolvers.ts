export async function resolveArticleId(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/article/resolve?slug=${slug}`,
    { cache: "force-cache", next: { revalidate: 3600 } }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data?.id ?? null;
}

export async function resolveRoomId(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/room/resolve?slug=${slug}`,
    { cache: "force-cache", next: { revalidate: 360 } }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data?.id ?? null;
}