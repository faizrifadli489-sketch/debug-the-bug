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
    <div className="overflow-x-auto border border-white/20 py-2 text-sm">
      {code.map((text, i) => {
        const n = i + 1;
        const isBug = bugLine === n;
        const isWrongPick = bugLine !== undefined && selectedLine === n && !isBug;

        let cls = "text-white/90";
        if (isBug) cls = "bg-white text-black";
        else if (isWrongPick) cls = "text-white/40 line-through";
        else if (!locked) cls += " hover:bg-white/10 active:bg-white/20";

        return (
          <button
            key={n}
            type="button"
            disabled={locked}
            onClick={() => onSelect(n)}
            className={`flex w-full min-w-max items-start px-3 py-1.5 text-left ${cls}`}
          >
            <span className="w-7 shrink-0 select-none pr-3 text-right opacity-40">{n}</span>
            <span className="whitespace-pre">{text === "" ? " " : text}</span>
          </button>
        );
      })}
    </div>
  );
}
