export type Difficulty = "typo" | "syntax" | "logic";

export interface Question {
  id: string;
  difficulty: Difficulty;
  /** Judul netral: jangan membocorkan jenis bug. */
  title: string;
  /** Satu elemen = satu baris kode. */
  code: string[];
  /** Nomor baris yang mengandung bug (mulai dari 1). */
  bugLine: number;
  explanation: string;
  /** Versi perbaikan dari baris bermasalah. */
  fix: string;
  /** Batas waktu menjawab (detik). */
  seconds: number;
}

export type QuestionBank = Record<Difficulty, Question[]>;

/** idle = layar Start, finished = layar Game Over. */
export type GameStatus = "idle" | "answering" | "feedback" | "finished";

export interface RoundResult {
  correct: boolean;
  timedOut: boolean;
  selectedLine: number | null;
  points: number;
}
