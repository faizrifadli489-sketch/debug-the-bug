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

  const title = result.timedOut ? "✕ Waktu habis" : result.correct ? "✓ Tepat sasaran" : "✕ Bukan baris itu";
  const cta = gameOver ? "Lihat hasil" : isLast ? "Selesai" : "Soal berikutnya";

  return (
    <Modal open={open}>
      <h2 className="text-xl font-black uppercase tracking-tight">{title}</h2>
      {result.correct && <p className="mt-1 text-sm text-white/60">+{result.points} poin</p>}

      <p className="mt-4 text-sm text-white/70">
        Bug ada di <strong className="text-white">baris {question.bugLine}</strong>.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{question.explanation}</p>

      <div className="mt-4">
        <div className="mb-1 text-[10px] uppercase tracking-widest text-white/40">Perbaikan</div>
        <pre className="overflow-x-auto border border-white/20 p-3 text-xs">{question.fix}</pre>
      </div>

      <Button className="mt-5 w-full" onClick={onNext} autoFocus>
        {cta}
      </Button>
    </Modal>
  );
}
