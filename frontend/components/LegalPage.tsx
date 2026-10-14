import type { ReactNode } from "react";
import { Logo } from "./Logo";
import { WellnessNote } from "./WellnessNote";

const PAGE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

/** Shared layout for the Privacy, Terms and Contact pages. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
      <Logo href="/" />

      <h1 className="mt-10 font-serif text-[34px] font-medium leading-tight tracking-tight text-ink sm:text-[42px]">
        {title}
      </h1>
      {updated && <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>}

      <div className="mt-8">{children}</div>

      <nav
        aria-label="More pages"
        className="mt-12 flex flex-wrap gap-x-6 border-t border-line pt-6 text-sm text-link"
      >
        {PAGE_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="inline-flex min-h-11 items-center hover:text-clay">
            {link.label}
          </a>
        ))}
      </nav>
      <WellnessNote className="mt-6" />
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-9 first:mt-0">
      <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-ink [&_a]:font-semibold [&_a]:text-clay [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-clay-dark [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}
