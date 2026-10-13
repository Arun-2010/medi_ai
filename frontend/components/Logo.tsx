export function Logo({ className = "", href = "#top" }: { className?: string; href?: string }) {
  return (
    <a
      href={href}
      className={`font-serif text-2xl font-semibold tracking-tight text-ink ${className}`}
    >
      Medi<span className="text-clay">AI</span>
    </a>
  );
}
