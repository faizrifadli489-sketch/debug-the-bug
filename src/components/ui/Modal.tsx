import type { ReactNode } from "react";

interface Props {
  open: boolean;
  children: ReactNode;
}

/** Bottom sheet di HP, dialog di tengah di layar besar. */
export function Modal({ open, children }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 sm:items-center sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        className="max-h-[90dvh] w-full max-w-lg overflow-y-auto border border-white bg-black p-5"
      >
        {children}
      </div>
    </div>
  );
}
