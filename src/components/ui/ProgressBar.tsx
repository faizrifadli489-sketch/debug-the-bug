interface Props {
  /** 0 sampai 100 */
  value: number;
  /** Kelas Tailwind tambahan untuk isi bar, mis. "animate-pulse" */
  className?: string;
}

export function ProgressBar({ value, className = "" }: Props) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div
      className="h-2 w-full bg-white/15"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={`h-full bg-white transition-[width] duration-100 ease-linear ${className}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
