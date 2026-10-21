interface Props {
  code: string[];
  selectedLine: number | null;
  /** Diisi setelah pemain menjawab, untuk menandai baris yang benar. */
  bugLine?: number;
  locked: boolean;
  onSelect: (line: number) => void;
}

export function CodeViewer({ code, selectedLine, bugLine, locked, onSelect }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 py-2 font-mono text-sm">
      {code.map((text, i) => {
        const n = i + 1;
        const isBug = bugLine === n;
        const isWrongPick = bugLine !== undefined && selectedLine === n && !isBug;

        let cls = "text-slate-200";
        if (isBug) cls = "bg-emerald-500/20 text-emerald-200";
        else if (isWrongPick) cls = "bg-red-500/20 text-red-200";
        else if (!locked) cls += " hover:bg-slate-800 active:bg-slate-700";

        return (
          <button
            key={n}
            type="button"
            disabled={locked}
            onClick={() => onSelect(n)}
            className={`flex w-full min-w-max items-start px-3 py-1.5 text-left ${cls}`}
          >
            <span className="w-7 shrink-0 select-none pr-3 text-right text-slate-500">{n}</span>
            <span className="whitespace-pre">{text === "" ? " " : text}</span>
          </button>
        );
      })}
    </div>
  );
}
