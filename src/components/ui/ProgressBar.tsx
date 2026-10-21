interface Props {
  /** 0 sampai 100 */
  value: number;
  /** Kelas warna Tailwind, mis. "bg-emerald-500" */
  color?: string;
}

export function ProgressBar({ value, color = "bg-emerald-500" }: Props) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div
      className="h-3 w-full overflow-hidden rounded-full bg-slate-800"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={`h-full rounded-full transition-[width] duration-100 ease-linear ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
