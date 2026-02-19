/*
 * ============================================
 * MERGEFUND LOGO (PLACEHOLDER)
 * ============================================
 *
 * HACKATHON NOTE:
 * This is a simple placeholder logo.
 * You can:
 * - Keep it as is
 * - Create your own variation
 * - The actual MergeFund logo is proprietary, so we use this placeholder
 */

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Simple merge/branch icon representing MergeFund */}
      <rect width="32" height="32" rx="8" fill="hsl(262, 83%, 58%)" />
      <path
        d="M10 8v6a4 4 0 004 4h4a4 4 0 014-4V8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 18v6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="10" cy="8" r="2" fill="white" />
      <circle cx="22" cy="8" r="2" fill="white" />
      <circle cx="16" cy="24" r="2" fill="white" />
    </svg>
  );
}

export function LogoMark({ className = "h-6 w-6" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 4v5a4 4 0 004 4h2a4 4 0 004-4V4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="7" cy="4" r="2" fill="currentColor" />
      <circle cx="17" cy="4" r="2" fill="currentColor" />
      <circle cx="12" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}
