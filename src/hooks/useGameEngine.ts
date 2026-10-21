import { useCallback, useEffect, useRef, useState } from "react";
import { QUESTION_BANK } from "../data/questions";
import type { GameStatus, Level, LevelProgress, Question, RoundResult } from "../types/game.types";
import { buildLevels, calculateScore, shuffle } from "../utils/shuffle";
import { play } from "../utils/sound";
import { useTimer } from "./useTimer";

export const MAX_LIVES = 3;
export const QUESTIONS_PER_LEVEL = 3;
export const LEVELS: Level[] = buildLevels(QUESTION_BANK, QUESTIONS_PER_LEVEL);

type Progress = Record<number, LevelProgress>;
const PROGRESS_KEY = "dtb-progress";

function loadProgress(): Progress {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? "{}") as Progress;
  } catch {
    return {};
  }
}

function saveProgress(value: Progress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(value));
  } catch {
    /* abaikan */
  }
}

export function useGameEngine() {
  const [status, setStatus] = useState<GameStatus>("menu");
  const [level, setLevel] = useState<Level | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [streak, setStreak] = useState(0);
  const [result, setResult] = useState<RoundResult | null>(null);
  const [progress, setProgress] = useState<Progress>(loadProgress);

  const resolveRef = useRef<(line: number | null, timeLeft: number) => void>(() => {});
  const timer = useTimer(() => resolveRef.current(null, 0));

  const question: Question | undefined = questions[index];

  const resolve = (line: number | null, timeLeft: number) => {
    if (!question) return;
    const correct = line === question.bugLine;
    const points = correct ? calculateScore(question, timeLeft, streak) : 0;

    setResult({ correct, timedOut: line === null, selectedLine: line, points });
    setScore((s) => s + points);
    setStreak(correct ? streak + 1 : 0);
    if (!correct) setLives((l) => l - 1);
    setStatus("feedback");
    play(correct ? "correct" : "wrong");
  };

  useEffect(() => {
    resolveRef.current = resolve;
  });

  // Bunyi tik pada 5 detik terakhir.
  const secondsLeft = Math.ceil(timer.timeLeft);
  useEffect(() => {
    if (status === "answering" && secondsLeft > 0 && secondsLeft <= 5) play("tick");
  }, [secondsLeft, status]);

  const startLevel = useCallback(
    (lv: Level) => {
      const qs = shuffle(lv.questions);
      setLevel(lv);
      setQuestions(qs);
      setIndex(0);
      setScore(0);
      setLives(MAX_LIVES);
      setStreak(0);
      setResult(null);
      setStatus("answering");
      timer.start(qs[0].seconds);
    },
    [timer.start],
  );

  const answer = (line: number) => {
    if (status !== "answering") return;
    resolve(line, timer.stop());
  };

  const next = () => {
    const isLast = index + 1 >= questions.length;
    if (lives <= 0 || isLast) {
      if (level && lives > 0) {
        const prev = progress[level.id];
        const merged: Progress = {
          ...progress,
          [level.id]: { stars: Math.max(prev?.stars ?? 0, lives), best: Math.max(prev?.best ?? 0, score) },
        };
        setProgress(merged);
        saveProgress(merged);
      }
      setStatus("finished");
      play(lives > 0 ? "correct" : "gameover");
      return;
    }
    setIndex(index + 1);
    setResult(null);
    setStatus("answering");
    timer.start(questions[index + 1].seconds);
  };

  const quit = () => {
    timer.stop();
    setStatus("levels");
  };

  return {
    status,
    level,
    question,
    index,
    total: questions.length,
    score,
    lives,
    maxLives: MAX_LIVES,
    streak,
    result,
    timeLeft: timer.timeLeft,
    duration: timer.duration,
    progress,
    stars: lives > 0 ? lives : 0,
    isLast: index + 1 >= questions.length,
    /** Level terbuka jika level sebelumnya sudah lulus (minimal 1 bintang). */
    isUnlocked: (i: number) => i === 0 || (progress[i - 1]?.stars ?? 0) > 0,
    startLevel,
    answer,
    next,
    quit,
    openLevels: () => setStatus("levels"),
    openMenu: () => setStatus("menu"),
  };
}
