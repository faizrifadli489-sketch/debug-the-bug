import type { Difficulty } from "../../types/game.types";

const META: Record<Difficulty, { label: string; cls: string }> = {
  typo: { label: "Typo", cls: "bg-sky-500/15 text-sky-300 ring-sky-500/40" },
  syntax: { label: "Syntax", cls: "bg-violet-500/15 text-violet-300 ring-violet-500/40" },
  logic: { label: "Logic", cls: "bg-rose-500/15 text-rose-300 ring-rose-500/40" },
};

export function LevelBadge({ difficulty }: { difficulty: Difficulty }) {
  const { label, cls } = META[difficulty];
  return <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ring-1 ${cls}`}>{label}</span>;
}
