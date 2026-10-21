import { ProgressBar } from "../ui/ProgressBar";

interface Props {
  timeLeft: number;
  duration: number;
}

export function TimerBar({ timeLeft, duration }: Props) {
  const ratio = duration > 0 ? timeLeft / duration : 0;
  const low = ratio <= 0.25;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <ProgressBar value={ratio * 100} className={low ? "animate-pulse" : ""} />
      </div>
      <span className={`w-12 text-right text-sm tabular-nums ${low ? "font-bold" : "text-white/60"}`}>{timeLeft.toFixed(1)}s</span>
    </div>
  );
}
