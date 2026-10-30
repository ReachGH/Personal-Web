export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`brand ${compact ? "brand-compact" : ""}`}
      aria-label="Reach, home"
    >
      reach<span className="brand-dot">.</span>
    </span>
  );
}

export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M50 5v90M5 50h90M18 18l64 64M18 82l64-64"
        stroke="currentColor"
        strokeWidth="12"
      />
    </svg>
  );
}
