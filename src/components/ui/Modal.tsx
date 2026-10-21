import type { ReactNode } from "react";

interface Props {
  open: boolean;
  children: ReactNode;
}

/** Bottom sheet di HP, dialog di tengah di layar besar. */
export function Modal({ open, children }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl sm:rounded-2xl"
      >
        {children}
      </div>
    </div>
  );
}
