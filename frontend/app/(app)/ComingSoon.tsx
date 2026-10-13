import Link from "next/link";
import type { ReactNode } from "react";

export function ComingSoon({
  title,
  children,
  icon,
}: {
  title: string;
  children: ReactNode;
  icon: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center pt-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-soft text-clay">
        {icon}
      </span>
      <h1 className="mt-6 font-serif text-[32px] font-medium tracking-tight text-ink">{title}</h1>
      <p className="mt-3 max-w-xs text-base leading-relaxed text-muted">{children}</p>
      <p className="mt-6 rounded-full bg-card px-4 py-2 text-sm font-semibold text-link ring-1 ring-line">
        Coming soon
      </p>
      <Link
        href="/home"
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-clay px-6 text-[15px] font-semibold text-white transition-colors hover:bg-clay-dark"
      >
        Start a session
      </Link>
    </div>
  );
}
