import { useState } from "react";
import { Button } from "./components/ui/Button";
import { CodeViewer } from "./components/game/CodeViewer";
import { FeedbackModal } from "./components/game/FeedbackModal";
import { LevelBadge } from "./components/game/LevelBadge";
import { ScoreBoard } from "./components/game/ScoreBoard";
import { TimerBar } from "./components/game/TimerBar";
import { useGameEngine } from "./hooks/useGameEngine";
import { isMuted, setMuted } from "./utils/sound";

function MuteToggle() {
  const [muted, setLocal] = useState(isMuted());
  return (
    <button
      type="button"
      aria-label={muted ? "Nyalakan suara" : "Matikan suara"}
      onClick={() => {
        setMuted(!muted);
        setLocal(!muted);
      }}
      className="fixed right-3 top-3 z-40 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm"
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}

export default function App() {
  const g = useGameEngine();

  return (
    <>
      <MuteToggle />

      {g.status === "idle" && (
        <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-6 p-6 text-center">
          <div className="text-6xl">🐛</div>
          <h1 className="text-4xl font-extrabold tracking-tight">Debug the Bug</h1>
          <p className="text-slate-400">
            Ketuk baris kode yang mengandung bug sebelum waktu habis. 3 nyawa, 9 soal, dari Typo sampai Logic.
          </p>
          {g.highScore > 0 && <p className="text-sm text-amber-300">🏆 Rekor: {g.highScore.toLocaleString("id-ID")}</p>}
          <Button className="w-full text-lg" onClick={g.start}>
            Mulai
          </Button>
        </main>
      )}

      {(g.status === "answering" || g.status === "feedback") && g.question && (
        <main className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-4 p-4 pt-14">
          <ScoreBoard
            round={g.index + 1}
            totalRounds={g.total}
            score={g.score}
            lives={g.lives}
            maxLives={g.maxLives}
            streak={g.streak}
          />
          <div className="flex items-center justify-between">
            <LevelBadge difficulty={g.question.difficulty} />
            <span className="text-sm text-slate-400">{g.question.title}</span>
          </div>
          <TimerBar timeLeft={g.timeLeft} duration={g.duration} />
          <p className="text-sm text-slate-400">Ketuk baris yang mengandung bug.</p>
          <CodeViewer
            code={g.question.code}
            selectedLine={g.result?.selectedLine ?? null}
            bugLine={g.status === "feedback" ? g.question.bugLine : undefined}
            locked={g.status !== "answering"}
            onSelect={g.answer}
          />
          <FeedbackModal
            open={g.status === "feedback"}
            question={g.question}
            result={g.result}
            isLast={g.isLast}
            gameOver={g.lives <= 0}
            onNext={g.next}
          />
        </main>
      )}

      {g.status === "finished" && (
        <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-5 p-6 text-center">
          <div className="text-6xl">{g.won ? "🏆" : "💀"}</div>
          <h1 className="text-3xl font-extrabold">{g.won ? "Semua bug terbasmi!" : "Game Over"}</h1>
          <div className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4">
            <div className="text-xs uppercase tracking-wider text-slate-500">Skor akhir</div>
            <div className="text-4xl font-bold tabular-nums">{g.score.toLocaleString("id-ID")}</div>
            {g.newRecord && <div className="mt-1 text-sm font-bold text-amber-300">🎉 Rekor baru!</div>}
            <div className="mt-3 text-sm text-slate-400">
              Streak terbaik: {g.bestStreak} · Rekor: {g.highScore.toLocaleString("id-ID")}
            </div>
          </div>
          <Button className="w-full text-lg" onClick={g.start}>
            Main lagi
          </Button>
        </main>
      )}
    </>
  );
}
