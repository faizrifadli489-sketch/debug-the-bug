import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  primary: "bg-white text-black hover:bg-neutral-300",
  ghost: "border border-white/40 text-white hover:bg-white hover:text-black",
};

export function Button({ variant = "primary", className = "", ...rest }: Props) {
  return (
    <button
      type="button"
      className={`px-5 py-3 font-bold uppercase tracking-wider transition active:scale-95 disabled:opacity-40 ${styles[variant]} ${className}`}
      {...rest}
    />
  );
}
