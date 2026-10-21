import { useCallback, useEffect, useRef, useState } from "react";
import { QUESTION_BANK } from "../data/questions";
import type { GameStatus, Question, RoundResult } from "../types/game.types";
import { buildRound, calculateScore } from "../utils/shuffle";
import { play } from "../utils/sound";
import { useTimer } from "./useTimer";

export const MAX_LIVES = 3;
export const QUESTIONS_PER_LEVEL = 3;
const HIGH_SCORE_KEY = "dtb-high-score";

function loadHighScore(): number {
  try {
    return Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveHighScore(value: number) {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, String(value));
  } catch {
    /* abaikan */
  }
}

export function useGameEngine() {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [result, setResult] = useState<RoundResult | null>(null);
  const [highScore, setHighScore] = useState(loadHighScore);
  const [newRecord, setNewRecord] = useState(false);

  const resolveRef = useRef<(line: number | null, timeLeft: number) => void>(() => {});
  const timer = useTimer(() => resolveRef.current(null, 0));

  const question: Question | undefined = questions[index];

  const resolve = (line: number | null, timeLeft: number) => {
    if (!question) return;
    const correct = line === question.bugLine;
    const points = correct ? calculateScore(question, timeLeft, streak) : 0;
    const nextStreak = correct ? streak + 1 : 0;

    setResult({ correct, timedOut: line === null, selectedLine: line, points });
    setScore((s) => s + points);
    setStreak(nextStreak);
    setBestStreak((b) => Math.max(b, nextStreak));
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

  const start = useCallback(() => {
    const round = buildRound(QUESTION_BANK, QUESTIONS_PER_LEVEL);
    setQuestions(round);
    setIndex(0);
    setScore(0);
    setLives(MAX_LIVES);
    setStreak(0);
    setBestStreak(0);
    setResult(null);
    setNewRecord(false);
    setStatus("answering");
    timer.start(round[0].seconds);
  }, [timer.start]);

  const answer = (line: number) => {
    if (status !== "answering") return;
    resolve(line, timer.stop());
  };

  const next = () => {
    const isLast = index + 1 >= questions.length;
    if (lives <= 0 || isLast) {
      if (score > highScore) {
        saveHighScore(score);
        setHighScore(score);
        setNewRecord(true);
      }
      setStatus("finished");
      play("gameover");
      return;
    }
    setIndex(index + 1);
    setResult(null);
    setStatus("answering");
    timer.start(questions[index + 1].seconds);
  };

  return {
    status,
    question,
    index,
    total: questions.length,
    score,
    lives,
    maxLives: MAX_LIVES,
    streak,
    bestStreak,
    result,
    timeLeft: timer.timeLeft,
    duration: timer.duration,
    highScore,
    newRecord,
    won: lives > 0,
    isLast: index + 1 >= questions.length,
    start,
    answer,
    next,
  };
}
