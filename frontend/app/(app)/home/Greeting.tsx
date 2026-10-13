"use client";

import { useSyncExternalStore } from "react";

function partOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const noop = () => () => {};

/** Uses the browser's clock, so the greeting matches the user's time zone. */
export function Greeting({ name }: { name: string | null }) {
  const hello = useSyncExternalStore(noop, partOfDay, () => "Hello");

  return (
    <div>
      <p className="text-[15px] text-muted">{hello},</p>
      <p className="mt-0.5 min-h-7 text-xl font-bold text-ink">{name}</p>
    </div>
  );
}
