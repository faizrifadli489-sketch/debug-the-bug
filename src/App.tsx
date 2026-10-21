import { useState } from "react";
import { Button } from "./components/ui/Button";
import { CodeViewer } from "./components/game/CodeViewer";
import { FeedbackModal } from "./components/game/FeedbackModal";
import { LevelSelect, starsText } from "./components/game/LevelSelect";
import { ScoreBoard } from "./components/game/ScoreBoard";
import { TimerBar } from "./components/game/TimerBar";
import { LEVELS, useGameEngine } from "./hooks/useGameEngine";
import { isMuted, setMuted } from "./utils/sound";

const cornerBtn = "fixed top-3 z-40 border border-white/30 bg-black px-3 py-1.5 text-xs uppercase tracking-wider";

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
      className={`${cornerBtn} right-3`}
    >
      SFX {muted ? "off" : "on"}
    </button>
  );
}

export default function App() {
  const g = useGameEngine();
  const lv = g.level;
  const totalStars = Object.values(g.progress).reduce((sum, p) => sum + p.stars, 0);
  const nextLevel = lv ? LEVELS[lv.id + 1] : undefined;
  const won = g.lives > 0;

  return (
    <>
      <MuteToggle />

      {g.status === "menu" && (
        <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-8 p-6">
          <div>
            <p className="text-sm text-white/50">{"// game cari bug"}</p>
            <h1 className="mt-2 text-5xl font-black leading-none tracking-tight">
              DEBUG
              <br />
              THE BUG
            </h1>
          </div>
          <p className="text-white/60">Ketuk baris kode yang salah sebelum waktu habis. 3 nyawa tiap level.</p>
          <Button onClick={g.openLevels}>Main</Button>
          <p className="text-sm text-white/50">
            ★ {totalStars}/{LEVELS.length * 3}
          </p>
        </main>
      )}

      {g.status === "levels" && (
        <LevelSelect levels={LEVELS} progress={g.progress} isUnlocked={g.isUnlocked} onPick={g.startLevel} onBack={g.openMenu} />
      )}

      {(g.status === "answering" || g.status === "feedback") && g.question && lv && (
        <main className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-4 p-4 pt-14">
          <button type="button" onClick={g.quit} className={`${cornerBtn} left-3`}>
            ‹ Level
          </button>
          <ScoreBoard
            round={g.index + 1}
            totalRounds={g.total}
            score={g.score}
            lives={g.lives}
            maxLives={g.maxLives}
            streak={g.streak}
          />
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-bold uppercase tracking-wider">{lv.name}</span>
            <span className="text-white/50">{g.question.title}</span>
          </div>
          <TimerBar timeLeft={g.timeLeft} duration={g.duration} />
          <p className="text-sm text-white/50">Ketuk baris yang mengandung bug.</p>
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

      {g.status === "finished" && lv && (
        <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 p-6 text-center">
          <p className="text-sm uppercase tracking-widest text-white/50">{lv.name}</p>
          <h1 className="text-4xl font-black">{won ? "LEVEL SELESAI" : "GAME OVER"}</h1>
          <div className="text-3xl tracking-widest">{starsText(g.stars)}</div>
          <div className="border border-white/20 p-4">
            <div className="text-xs uppercase tracking-widest text-white/40">Skor</div>
            <div className="text-4xl font-bold tabular-nums">{g.score.toLocaleString("id-ID")}</div>
          </div>
          <div className="flex flex-col gap-3">
            {won && nextLevel && <Button onClick={() => g.startLevel(nextLevel)}>Level berikutnya</Button>}
            <Button variant={won && nextLevel ? "ghost" : "primary"} onClick={() => g.startLevel(lv)}>
              Ulangi
            </Button>
            <Button variant="ghost" onClick={g.openLevels}>
              Pilih level
            </Button>
          </div>
        </main>
      )}
    </>
  );
}
