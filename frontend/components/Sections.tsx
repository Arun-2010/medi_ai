import type { ComponentType, ReactNode, SVGProps } from "react";
import {
  JournalIcon,
  MoonIcon,
  StarIcon,
  TargetIcon,
  TimerIcon,
  VoiceIcon,
} from "./Icons";
import { Logo } from "./Logo";

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
      {children}
    </p>
  );
}

function SectionTitle({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <h2 className={`mx-auto mt-4 ${wide ? "max-w-3xl" : "max-w-xl"} font-serif text-[32px] font-medium leading-tight tracking-tight text-ink md:text-[42px]`}>
      {children}
    </h2>
  );
}

const STEPS = [
  {
    title: "Share your mood",
    body: "Pick a feeling or type a line, like “anxious about tomorrow, I have 5 minutes.”",
  },
  {
    title: "AI creates your session",
    body: "MediAI writes a meditation that fits your mood and your time. No two sessions are the same.",
  },
  {
    title: "Breathe and listen",
    body: "A gentle voice guides you while the breathing circle sets your pace.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-16 bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Eyebrow>How it works</Eyebrow>
        <SectionTitle>Calm in three simple steps</SectionTitle>

        <ol className="mt-12 grid gap-5 text-left md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-3xl bg-card p-7 shadow-soft ring-1 ring-line/70"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-soft font-serif text-lg text-clay">
                {i + 1}
              </span>
              <h3 className="mt-6 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const FEATURES: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
}[] = [
  {
    icon: StarIcon,
    title: "Made-for-you meditations",
    body: "Every session is written fresh for your mood, not picked from a fixed library.",
  },
  {
    icon: VoiceIcon,
    title: "Calm voice guide",
    body: "Choose a voice and pace you like, in English, Hindi or Telugu.",
  },
  {
    icon: TargetIcon,
    title: "Breathing coach",
    body: "Follow a soft, growing circle for box breathing or 4-7-8 breathing.",
  },
  {
    icon: MoonIcon,
    title: "Sleep mode",
    body: "Bedtime stories and body scans that fade out slowly as you fall asleep.",
  },
  {
    icon: JournalIcon,
    title: "Mood journal",
    body: "Write one line after each session and see how your calm grows over the weeks.",
  },
  {
    icon: TimerIcon,
    title: "60-second calm",
    body: "One tap for a quick reset before a meeting, a call or an exam.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-16 py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Eyebrow>Features</Eyebrow>
        <SectionTitle>Everything you need to slow down</SectionTitle>

        <ul className="mt-12 grid gap-5 text-left md:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="rounded-3xl bg-surface p-7 ring-1 ring-line/60">
              <Icon className="size-6 text-clay" />
              <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto max-w-5xl rounded-[32px] bg-soft px-6 py-16 text-center md:py-20">
        <h2 className="mx-auto max-w-md font-serif text-[32px] font-medium leading-tight tracking-tight text-ink md:text-[42px]">
          Take one calm breath with us today
        </h2>
        <p className="mt-4 text-base text-muted md:text-lg">
          Your first session takes less than a minute to start.
        </p>
        <a
          href="#try"
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-clay px-7 text-[15px] font-semibold text-white shadow-soft transition-colors hover:bg-clay-dark"
        >
          Start a free session →
        </a>
      </div>
    </section>
  );
}

const FOOTER_LINKS = [
  { href: "#how", label: "How it works" },
  // Privacy and Contact pages are not built yet.
  { href: "#top", label: "Privacy" },
  { href: "#top", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <Logo className="text-xl" />
          <p className="mt-3 text-sm leading-relaxed text-muted">
            MediAI is for relaxation and everyday stress. It is not medical advice or
            a replacement for professional care. If you are in distress, call
            Tele-MANAS at <a href="tel:14416" className="font-semibold text-ink underline underline-offset-2">14416</a>.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 text-sm text-link">
          {FOOTER_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="inline-flex min-h-11 items-center hover:text-clay">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
