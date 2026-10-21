import { ProgressBar } from "../ui/ProgressBar";

interface Props {
  timeLeft: number;
  duration: number;
}

export function TimerBar({ timeLeft, duration }: Props) {
  const ratio = duration > 0 ? timeLeft / duration : 0;
  const color = ratio > 0.5 ? "bg-emerald-500" : ratio > 0.25 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <ProgressBar value={ratio * 100} color={color} />
      </div>
      <span className={`w-12 text-right font-mono text-sm tabular-nums ${ratio <= 0.25 ? "text-red-400" : "text-slate-300"}`}>
        {timeLeft.toFixed(1)}s
      </span>
    </div>
  );
}
