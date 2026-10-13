"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { findMeditation, MEDITATIONS } from "@/lib/meditations";
import { SessionComplete } from "./SessionComplete";
import { SessionPlayer } from "./SessionPlayer";

export function SessionFlow() {
  const params = useSearchParams();
  const meditation = findMeditation(params.get("id")) ?? MEDITATIONS[0];
  const asked = Number(params.get("min"));
  const minutes = meditation.minuteOptions.includes(asked) ? asked : meditation.minutes;
  const variant = Math.max(0, Math.floor(Number(params.get("v")) || 0));

  /** Seconds listened, once the session has ended. */
  const [listened, setListened] = useState<number | null>(null);

  if (listened !== null) {
    return <SessionComplete meditation={meditation} seconds={listened} />;
  }

  return (
    <SessionPlayer
      meditation={meditation}
      minutes={minutes}
      variant={variant}
      onFinish={(seconds) => {
        setListened(seconds);
        window.scrollTo(0, 0);
      }}
    />
  );
}
