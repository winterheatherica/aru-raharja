"use server";

import { revalidatePath } from "next/cache";

/**
 * Invalidate the ISR cache for all public pages.
 * Call this from admin save/delete handlers after a successful mutation
 * so the change is reflected on the next public-page visit instead of
 * waiting for the time-based revalidate window to elapse.
 */
export async function revalidatePublic() {
  revalidatePath("/", "layout");
}
