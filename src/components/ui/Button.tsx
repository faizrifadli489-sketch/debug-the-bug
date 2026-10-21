import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  primary: "bg-emerald-500 text-slate-950 hover:bg-emerald-400",
  ghost: "border border-slate-700 text-slate-200 hover:bg-slate-800",
};

export function Button({ variant = "primary", className = "", ...rest }: Props) {
  return (
    <button
      type="button"
      className={`rounded-xl px-5 py-3 font-semibold transition active:scale-95 disabled:opacity-50 ${styles[variant]} ${className}`}
      {...rest}
    />
  );
}
