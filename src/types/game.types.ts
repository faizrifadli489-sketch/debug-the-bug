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

export type GameStatus = "menu" | "levels" | "answering" | "feedback" | "finished";

export interface Level {
  id: number;
  name: string;
  difficulty: Difficulty;
  questions: Question[];
}

export interface LevelProgress {
  stars: number;
  best: number;
}

export interface RoundResult {
  correct: boolean;
  timedOut: boolean;
  selectedLine: number | null;
  points: number;
}
