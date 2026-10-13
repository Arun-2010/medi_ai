/** The safety note every page footer must show (see CLAUDE.md). */
export function WellnessNote({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <p
      className={`text-center text-xs leading-relaxed ${
        dark ? "text-cream/70" : "text-muted"
      } ${className}`}
    >
      MediAI is for relaxation and everyday stress. It is not medical advice or a replacement for
      professional care. If you are in distress, call Tele-MANAS at{" "}
      <a
        href="tel:14416"
        className={`font-semibold underline underline-offset-2 ${
          dark ? "hover:text-cream" : "hover:text-ink"
        }`}
      >
        14416
      </a>
      .
    </p>
  );
}
