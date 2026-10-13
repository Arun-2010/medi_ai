/** Shown instead of a meditation when the mood text shows serious distress. */
export function HelplineNote({ onBack }: { onBack: () => void }) {
  return (
    <div role="alert" className="rounded-3xl bg-card px-6 py-7 ring-1 ring-line">
      <h2 className="font-serif text-2xl font-medium text-ink">You don&apos;t have to carry this alone</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">
        It sounds like things are really hard right now. A meditation is not enough for this
        moment. Please talk to someone who can help.
      </p>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">
        Tele-MANAS is a free and confidential helpline from the Government of India.
      </p>
      <a
        href="tel:14416"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-clay px-6 text-base font-semibold text-white transition-colors hover:bg-clay-dark"
      >
        Call Tele-MANAS at 14416
      </a>
      <p className="mt-3 text-center text-sm text-muted">
        If you are in danger right now, call 112.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="mx-auto mt-2 flex min-h-11 items-center text-sm font-semibold text-clay hover:text-clay-dark"
      >
        Go back
      </button>
    </div>
  );
}
