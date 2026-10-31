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
