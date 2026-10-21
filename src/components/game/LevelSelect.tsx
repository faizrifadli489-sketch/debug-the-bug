import { Fragment } from "react";
import type { Level, LevelProgress } from "../../types/game.types";
import { DIFFICULTY_LABEL } from "../../utils/shuffle";

export const starsText = (n: number) => "★".repeat(n) + "☆".repeat(3 - n);

interface Props {
  levels: Level[];
  progress: Record<number, LevelProgress>;
  isUnlocked: (index: number) => boolean;
  onPick: (level: Level) => void;
  onBack: () => void;
}

export function LevelSelect({ levels, progress, isUnlocked, onPick, onBack }: Props) {
  return (
    <main className="mx-auto min-h-dvh max-w-md p-4 pt-14">
      <button
        type="button"
        onClick={onBack}
        className="fixed left-3 top-3 z-40 border border-white/30 bg-black px-3 py-1.5 text-xs uppercase tracking-wider"
      >
        ‹ Menu
      </button>
      <h1 className="mb-4 text-2xl font-black uppercase tracking-tight">Pilih level</h1>
      <div className="grid grid-cols-2 gap-3">
        {levels.map((l, i) => {
          const open = isUnlocked(i);
          const p = progress[l.id];
          const newGroup = i === 0 || levels[i - 1].difficulty !== l.difficulty;
          return (
            <Fragment key={l.id}>
              {newGroup && (
                <h2 className="col-span-2 mt-3 text-xs uppercase tracking-widest text-white/40">{DIFFICULTY_LABEL[l.difficulty]}</h2>
              )}
              <button
                type="button"
                disabled={!open}
                onClick={() => onPick(l)}
                className={`flex flex-col gap-1.5 border p-4 text-left transition active:scale-95 ${
                  open ? "border-white/40 hover:bg-white hover:text-black" : "border-white/10 text-white/25"
                }`}
              >
                <span className="text-3xl font-black tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xs uppercase tracking-wider">{l.name}</span>
                <span className="text-sm">{open ? starsText(p?.stars ?? 0) : "TERKUNCI"}</span>
                {open && p && <span className="text-xs tabular-nums opacity-60">Terbaik {p.best.toLocaleString("id-ID")}</span>}
              </button>
            </Fragment>
          );
        })}
      </div>
    </main>
  );
}
