type IconProps = { className?: string };

const AppleIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

const WindowsIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3h8.5v8.5H3zM12.5 3H21v8.5h-8.5zM3 12.5h8.5V21H3zM12.5 12.5H21V21h-8.5z" />
  </svg>
);

// Simplified Tux silhouette; belly, eyes and beak are evenodd cutouts so it stays single-color.
const LinuxIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      d="M12 2C9.6 2 8.2 3.9 8.2 6.4c0 1.5-.5 2.5-1.4 3.8l-2.6 4c-.6.9-.3 1.6.6 1.2l.8-.4c-.1.6-.1 1.2-.1 1.8 0 3 2.8 4.4 6.5 4.4s6.5-1.4 6.5-4.4c0-.6 0-1.2-.1-1.8l.8.4c.9.4 1.2-.3.6-1.2l-2.6-4c-.9-1.3-1.4-2.3-1.4-3.8C15.8 3.9 14.4 2 12 2zm0 7.6c-2.1 0-3.6 2.8-3.6 6 0 2.6 1.6 4 3.6 4s3.6-1.4 3.6-4c0-3.2-1.5-6-3.6-6zM11.7 6.2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zm2.8 0a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM10.7 8h2.6L12 9.3z"
    />
    <ellipse cx="8.6" cy="21.4" rx="3.2" ry="1.4" />
    <ellipse cx="15.4" cy="21.4" rx="3.2" ry="1.4" />
  </svg>
);

const platforms = [
  { name: "macOS", Icon: AppleIcon },
  { name: "Windows", Icon: WindowsIcon },
  { name: "Linux", Icon: LinuxIcon },
];

type Variant = "inline" | "pill" | "icons";

/**
 * Shows the supported desktop platforms.
 * - inline: "Available for" label + icon/name pairs (hero download box)
 * - pill:   compact bordered tag matching the StepsSection tags
 * - icons:  icons only with accessible labels (footer)
 */
const PlatformBadges = ({ variant = "inline", className = "" }: { variant?: Variant; className?: string }) => {
  if (variant === "pill") {
    return (
      <span
        className={`inline-flex items-center gap-2.5 rounded-full border border-[color:var(--border)] bg-[#14141466] px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-[color:var(--mid)] ${className}`}
        aria-label="Available for macOS, Windows and Linux"
      >
        {platforms.map(({ name, Icon }) => (
          <span key={name} className="inline-flex items-center gap-1">
            <Icon className="h-3 w-3" />
            {name}
          </span>
        ))}
      </span>
    );
  }

  if (variant === "icons") {
    return (
      <ul className={`flex items-center gap-4 text-[color:var(--mid)] ${className}`} aria-label="Supported platforms">
        {platforms.map(({ name, Icon }) => (
          <li key={name} title={name} className="transition-colors hover:text-[color:var(--custodi-gold)]">
            <Icon className="h-4 w-4" />
            <span className="sr-only">{name}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.20em] text-[color:var(--mid)]">Available for</span>
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="Supported platforms">
        {platforms.map(({ name, Icon }) => (
          <li
            key={name}
            className="inline-flex items-center gap-1.5 text-xs text-[color:var(--off-white)] transition-colors hover:text-[color:var(--custodi-gold)]"
          >
            <Icon className="h-3.5 w-3.5" />
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlatformBadges;
