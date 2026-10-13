import type { Metadata } from "next";
import { MoonIcon } from "@/components/Icons";
import { ComingSoon } from "../ComingSoon";

export const metadata: Metadata = {
  title: "Sleep · MediAI",
};

export default function SleepPage() {
  return (
    <ComingSoon title="Sleep mode" icon={<MoonIcon className="size-7" />}>
      Bedtime stories and body scans that fade out slowly as you drift off.
    </ComingSoon>
  );
}
