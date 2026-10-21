interface Props {
  round: number;
  totalRounds: number;
  score: number;
  lives: number;
  maxLives: number;
  streak: number;
}

export function ScoreBoard({ round, totalRounds, score, lives, maxLives, streak }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-xl border border-slate-800 bg-slate-900 p-3 text-center">
      <Stat label="Soal" value={`${round}/${totalRounds}`} />
      <Stat label="Skor" value={score.toLocaleString("id-ID")} />
      <div>
        <div className="text-[10px] uppercase tracking-wider text-slate-500">Nyawa</div>
        <div className="text-lg leading-7" aria-label={`${lives} nyawa tersisa`}>
          {Array.from({ length: maxLives }, (_, i) => (i < lives ? "❤️" : "🖤")).join("")}
        </div>
        {streak >= 2 && <div className="text-[10px] font-bold text-amber-400">🔥 x{streak} streak</div>}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className="text-lg font-bold tabular-nums">{value}</div>
    </div>
  );
}
