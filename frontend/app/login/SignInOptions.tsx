"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { MailIcon } from "@/components/Icons";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "loading" | "sent";

/** Reads the project's public auth settings to see if Google sign-in is on. */
async function googleEnabled() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/settings`, {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! },
    });
    const settings: { external?: { google?: boolean } } = await res.json();
    return settings.external?.google === true;
  } catch {
    // If the check itself fails, let Supabase handle the sign-in as usual.
    return true;
  }
}

export function SignInOptions() {
  const searchParams = useSearchParams();
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(
    searchParams.get("error")
      ? "We could not sign you in. Please try again."
      : null,
  );

  const callbackUrl = () => `${window.location.origin}/auth/callback`;

  async function signInWithGoogle() {
    setError(null);
    setStatus("loading");
    const unavailable = () => {
      setError("Google sign-in is not available right now. Please continue with email.");
      setStatus("idle");
    };

    // Supabase answers a disabled provider with a raw JSON error page,
    // so check that Google is turned on before leaving the site.
    if (!(await googleEnabled())) return unavailable();

    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl() },
    });
    // On success the browser leaves for Google, so we only handle errors.
    if (error) unavailable();
  }

  async function sendEmailLink(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("loading");
    const { error } = await createClient().auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: callbackUrl() },
    });
    if (error) {
      setError("We could not send the link. Check your email and try again.");
      setStatus("idle");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="mt-10 rounded-3xl bg-card px-6 py-7 text-center ring-1 ring-line"
      >
        <MailIcon className="mx-auto size-7 text-clay" />
        <p className="mt-3 font-serif text-xl font-medium text-ink">Check your inbox</p>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          We sent a sign-in link to <span className="font-semibold text-ink">{email}</span>.
          Open it on this device to continue.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-clay hover:text-clay-dark"
        >
          Use a different email
        </button>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <div className="mt-10 flex flex-col gap-3">
      {error && (
        <p role="alert" className="text-center text-sm font-medium text-clay-dark">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={signInWithGoogle}
        disabled={loading}
        className="inline-flex min-h-14 items-center justify-center rounded-full bg-clay px-6 text-base font-semibold text-white shadow-soft transition-colors hover:bg-clay-dark disabled:opacity-70"
      >
        Continue with Google
      </button>

      {showEmail ? (
        <form onSubmit={sendEmailLink} className="flex flex-col gap-3">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            autoFocus
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-h-14 rounded-full bg-card px-6 text-base text-ink ring-1 ring-line placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-clay"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-card px-6 text-base font-semibold text-ink ring-1 ring-line transition-colors hover:bg-surface disabled:opacity-70"
          >
            <MailIcon className="size-5" />
            {loading ? "Sending…" : "Send me a sign-in link"}
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setShowEmail(true)}
          className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-card px-6 text-base font-semibold text-ink ring-1 ring-line transition-colors hover:bg-surface"
        >
          <MailIcon className="size-5" />
          Continue with email
        </button>
      )}
    </div>
  );
}
