import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

export type CurrentUser = {
  id: string;
  name: string;
  email: string | null;
};

/**
 * Returns the signed-in user, or sends them to /login.
 * Reads cookies, so call it from a component inside a <Suspense> boundary.
 * Wrapped in cache() so several components on one page share one lookup.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser> => {
  // Supabase checks token expiry against the current time, which Next.js
  // only allows once rendering is tied to a real request.
  await connection();
  const supabase = await createClient();
  // getUser() checks the token with Supabase, so it can be trusted.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const meta = user.user_metadata ?? {};
  const fullName: string | undefined = meta.full_name ?? meta.name;
  const name = fullName?.split(" ")[0] || user.email?.split("@")[0] || "friend";

  return { id: user.id, name, email: user.email ?? null };
});
