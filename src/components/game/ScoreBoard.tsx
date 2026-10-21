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
    <div className="grid grid-cols-3 divide-x divide-white/20 border border-white/20 py-3 text-center">
      <Stat label="Soal" value={`${round}/${totalRounds}`} />
      <Stat label="Skor" value={score.toLocaleString("id-ID")} />
      <Stat label="Nyawa" value={"♥".repeat(lives) + "♡".repeat(maxLives - lives)} hint={streak >= 2 ? `x${streak} streak` : undefined} />
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-white/40">{label}</div>
      <div className="text-lg font-bold tabular-nums">{value}</div>
      {hint && <div className="text-[10px] font-bold">{hint}</div>}
    </div>
  );
}
