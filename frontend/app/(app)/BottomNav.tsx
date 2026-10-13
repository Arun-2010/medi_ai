"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, JournalIcon, MoonIcon, UserIcon } from "@/components/Icons";

const TABS = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/journal", label: "Journal", icon: JournalIcon },
  { href: "/sleep", label: "Sleep", icon: MoonIcon },
  { href: "/profile", label: "Profile", icon: UserIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="App"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-semibold transition-colors ${
                  active ? "text-clay" : "text-link hover:text-ink"
                }`}
              >
                <Icon className="size-6" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
