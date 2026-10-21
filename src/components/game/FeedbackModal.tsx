import type { Question, RoundResult } from "../../types/game.types";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

interface Props {
  open: boolean;
  question: Question;
  result: RoundResult | null;
  isLast: boolean;
  gameOver: boolean;
  onNext: () => void;
}

export function FeedbackModal({ open, question, result, isLast, gameOver, onNext }: Props) {
  if (!result) return null;

  const title = result.timedOut ? "Waktu habis ⏰" : result.correct ? "Tepat sasaran 🎯" : "Bukan baris itu 🐛";
  const titleColor = result.correct ? "text-emerald-400" : "text-red-400";
  const cta = gameOver ? "Lihat hasil" : isLast ? "Selesai" : "Soal berikutnya";

  return (
    <Modal open={open}>
      <h2 className={`text-xl font-bold ${titleColor}`}>{title}</h2>
      {result.correct && <p className="mt-1 text-sm text-amber-300">+{result.points} poin</p>}

      <p className="mt-4 text-sm text-slate-300">
        Bug ada di <strong className="text-white">baris {question.bugLine}</strong>.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{question.explanation}</p>

      <div className="mt-4">
        <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-500">Perbaikan</div>
        <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 font-mono text-xs text-emerald-300">{question.fix}</pre>
      </div>

      <Button className="mt-5 w-full" onClick={onNext} autoFocus>
        {cta}
      </Button>
    </Modal>
  );
}
