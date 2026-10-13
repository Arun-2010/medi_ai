import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/Logo";
import { WellnessNote } from "@/components/WellnessNote";
import { SignInOptions } from "./SignInOptions";

export const metadata: Metadata = {
  title: "Sign in · MediAI",
};

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-8 pt-12 sm:pt-16">
      <div className="text-center">
        <Logo href="/" />
      </div>

      <div className="mx-auto mt-10 rounded-[36px] bg-card p-3 shadow-[0_22px_50px_rgba(120,70,30,0.14)] ring-1 ring-line/70">
        <Image
          src="/mascot.png"
          alt="A calm cartoon sage meditating cross-legged"
          width={356}
          height={368}
          priority
          className="h-auto w-40 rounded-[28px] sm:w-44"
        />
      </div>

      <h1 className="mt-8 text-center font-serif text-[34px] font-medium leading-tight tracking-tight text-ink sm:text-[38px]">
        Welcome to MediAI
      </h1>
      <p className="mx-auto mt-3 max-w-xs text-center text-base leading-relaxed text-muted">
        Sign in to save your sessions, your journal and your streak.
      </p>

      {/* Reads ?error= from the URL, so it needs its own boundary. */}
      <Suspense>
        <SignInOptions />
      </Suspense>

      <Link
        href="/#try"
        className="mx-auto mt-8 inline-flex min-h-11 items-center text-[15px] font-semibold text-clay underline underline-offset-4 hover:text-clay-dark"
      >
        Try one session without signing in
      </Link>

      <p className="mt-auto pt-12 text-center text-xs leading-relaxed text-muted">
        By continuing, you agree to our{" "}
        {/* Terms and Privacy pages are not built yet. */}
        <Link href="/" className="underline underline-offset-2 hover:text-ink">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/" className="underline underline-offset-2 hover:text-ink">
          Privacy Policy
        </Link>
        .
      </p>
      <WellnessNote className="mt-3" />
    </main>
  );
}
