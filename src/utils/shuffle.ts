import type { Difficulty, Question, QuestionBank } from "../types/game.types";

export const DIFFICULTY_ORDER: Difficulty[] = ["typo", "syntax", "logic"];

export const BASE_POINTS: Record<Difficulty, number> = {
  typo: 100,
  syntax: 150,
  logic: 200,
};

/** Fisher-Yates, tidak mengubah array asli. */
export function shuffle<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Susun satu sesi: acak di dalam tiap level, urut dari mudah ke sulit. */
export function buildRound(bank: QuestionBank, perLevel: number): Question[] {
  return DIFFICULTY_ORDER.flatMap((d) => shuffle(bank[d]).slice(0, perLevel));
}

/**
 * Skor = (poin dasar + bonus kecepatan sampai 50%) x pengganda streak (+10% per streak, maks +50%).
 * `streak` = jumlah jawaban benar beruntun SEBELUM soal ini.
 */
export function calculateScore(q: Question, timeLeft: number, streak: number): number {
  const base = BASE_POINTS[q.difficulty];
  const ratio = Math.min(1, Math.max(0, timeLeft / q.seconds));
  const speedBonus = base * 0.5 * ratio;
  const multiplier = 1 + Math.min(streak, 5) * 0.1;
  return Math.round((base + speedBonus) * multiplier);
}
