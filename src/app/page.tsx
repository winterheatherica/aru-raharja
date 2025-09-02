import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const LOCALES = new Set(["id", "en"]);
const DEFAULT_LOCALE: "id" | "en" = "id";

export default function RootRedirect() {
  const cookieStore = cookies();
  const c = cookieStore.get("NEXT_LOCALE")?.value;

  let target = (c && LOCALES.has(c) ? (c as "id" | "en") : undefined) ?? undefined;

  if (!target) {
    const accept = headers().get("accept-language")?.toLowerCase() || "";
    target = accept.startsWith("en") ? "en" : DEFAULT_LOCALE;
  }

  redirect(`/${target}`);
}
