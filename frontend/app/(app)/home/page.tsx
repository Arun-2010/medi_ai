import type { Metadata } from "next";
import { Suspense } from "react";
import { FlameIcon } from "@/components/Icons";
import { getCurrentUser } from "@/lib/auth";
import { getJournal } from "@/lib/journal";
import { Greeting } from "./Greeting";
import { MoodCheckIn } from "./MoodCheckIn";

export const metadata: Metadata = {
  title: "Home · MediAI",
};

export default function HomePage() {
  return (
    <>
      <header className="flex items-start justify-between gap-4">
        {/* These read the session, so they stream in behind their own boundaries. */}
        <Suspense fallback={<Greeting name={null} />}>
          <UserGreeting />
        </Suspense>
        <Suspense fallback={<StreakBadge streak={0} />}>
          <UserStreak />
        </Suspense>
      </header>

      <h1 className="mt-8 font-serif text-[32px] font-medium leading-[1.12] tracking-tight text-ink">
        How are you feeling right now?
      </h1>

      <MoodCheckIn />
    </>
  );
}

async function UserGreeting() {
  const user = await getCurrentUser();
  return <Greeting name={user.name} />;
}

async function UserStreak() {
  const { streak } = await getJournal();
  return <StreakBadge streak={streak} />;
}

function StreakBadge({ streak }: { streak: number }) {
  return (
    <p className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full bg-card px-4 text-sm font-semibold text-ink ring-1 ring-line">
      <FlameIcon className="size-4 text-clay" />
      {streak > 0 ? `${streak}-day streak` : "Start a streak"}
    </p>
  );
}
