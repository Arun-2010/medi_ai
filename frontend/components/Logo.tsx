/**
 * The MediAI mark: a serif "M" and a lowercase "a" in a clay circle.
 * Drawn as inline SVG so it uses the page's Fraunces font and stays sharp.
 */
export function LogoMark({
  className = "",
  title,
  tone = "light",
}: {
  className?: string;
  /** Accessible name; leave empty when text next to it already says "MediAI". */
  title?: string;
  /** "light" for cream backgrounds, "dark" for the dark app icon and dark sections. */
  tone?: "light" | "dark";
}) {
  const ink = tone === "light" ? "var(--color-ink)" : "var(--color-cream)";
  const accent = tone === "light" ? "var(--color-clay)" : "var(--color-clay-light)";

  return (
    <svg
      viewBox="0 0 110 64"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ fontFamily: "var(--font-serif)" }}
    >
      <text x="0" y="52" fontSize="66" fontWeight="500" fill={ink}>
        M
      </text>
      <circle cx="85" cy="36" r="21.5" fill="none" stroke={accent} strokeWidth="2.8" />
      <text x="85" y="47" fontSize="40" fontWeight="500" fill={accent} textAnchor="middle">
        a
      </text>
    </svg>
  );
}

export function Logo({ className = "", href = "#top" }: { className?: string; href?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 font-serif text-2xl font-semibold tracking-tight text-ink ${className}`}
    >
      <LogoMark className="h-[1.15em] w-auto" />
      <span>
        Medi<span className="text-clay">AI</span>
      </span>
    </a>
  );
}
