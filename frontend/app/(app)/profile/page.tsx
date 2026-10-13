import type { Metadata } from "next";
import { Suspense } from "react";
import { signOut } from "@/app/auth/actions";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Profile · MediAI",
};

export default function ProfilePage() {
  return (
    <>
      <h1 className="font-serif text-[32px] font-medium tracking-tight text-ink">Profile</h1>

      <div className="mt-6 rounded-3xl bg-card p-6 ring-1 ring-line">
        <Suspense fallback={<p className="min-h-12 text-muted">Loading…</p>}>
          <Account />
        </Suspense>
      </div>

      <form action={signOut} className="mt-6">
        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-soft px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-line"
        >
          Sign out
        </button>
      </form>

    </>
  );
}

async function Account() {
  const user = await getCurrentUser();
  return (
    <>
      <p className="text-xl font-bold text-ink">{user.name}</p>
      {user.email && <p className="mt-1 break-all text-[15px] text-muted">{user.email}</p>}
    </>
  );
}
