export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      className={`font-serif text-2xl font-semibold tracking-tight text-ink ${className}`}
    >
      Medi<span className="text-clay">AI</span>
    </a>
  );
}
