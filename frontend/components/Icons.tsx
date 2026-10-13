import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const WavesIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    <path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
  </Icon>
);

export const MoonIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </Icon>
);

export const NotebookIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="4" width="16" height="16" rx="2.5" />
    <path d="M4 9h16M9 4v16" />
  </Icon>
);

export const TargetIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3.5" />
  </Icon>
);

export const HeartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
  </Icon>
);

export const TimerIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="13.5" r="7" />
    <path d="M12 13.5V10M10 3h4M12 3v3.5" />
  </Icon>
);

export const StarIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />
  </Icon>
);

export const VoiceIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" />
  </Icon>
);

export const JournalIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 3.5h9l3.5 3.5v13.5H6z" />
    <path d="M9.5 11h6M9.5 14.5h6M9.5 18h3.5" />
  </Icon>
);

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);
