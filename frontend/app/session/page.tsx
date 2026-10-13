import type { Metadata } from "next";
import { Suspense } from "react";
import { SessionFlow } from "./SessionFlow";

export const metadata: Metadata = {
  title: "Your session · MediAI",
};

export default function SessionPage() {
  return (
    // Reads ?mood= and ?min= from the URL, so it needs its own boundary.
    <Suspense fallback={<div className="flex-1 bg-night" />}>
      <SessionFlow />
    </Suspense>
  );
}
