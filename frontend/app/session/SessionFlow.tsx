"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { TIME_OPTIONS } from "@/lib/checkin";
import { MOODS } from "@/lib/moods";
import { SessionComplete } from "./SessionComplete";
import { SessionPlayer } from "./SessionPlayer";

export function SessionFlow() {
  const params = useSearchParams();
  const mood = MOODS.find((m) => m.id === params.get("mood")) ?? MOODS[0];
  const asked = Number(params.get("min"));
  const minutes = (TIME_OPTIONS as readonly number[]).includes(asked) ? asked : mood.minutes;

  /** Seconds listened, once the session has ended. */
  const [listened, setListened] = useState<number | null>(null);

  if (listened !== null) {
    return <SessionComplete mood={mood} seconds={listened} />;
  }

  return (
    <SessionPlayer
      mood={mood}
      minutes={minutes}
      onFinish={(seconds) => {
        setListened(seconds);
        window.scrollTo(0, 0);
      }}
    />
  );
}
