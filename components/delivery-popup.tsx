"use client";

import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { RollingText } from "@/components/rolling-text";

type DeliveryPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function DeliveryPopup({ isOpen, onClose }: DeliveryPopupProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="pointer-events-auto fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="brand-font relative w-full max-w-xs rounded-3xl border-2 border-[var(--brand)] bg-[var(--cream)] p-5 text-[var(--brand)] shadow-[6px_6px_0_#772C00]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Fermer la pop-up livraison"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--brand)] bg-white text-lg leading-none text-[var(--brand)] transition-colors duration-250 hover:bg-[var(--brand)] hover:text-[var(--cream)]"
          onClick={onClose}
        >
          X
        </button>

        <p id={titleId} className="text-4xl uppercase leading-none">
          Livraison
        </p>
        <p className="mt-2 text-xl uppercase leading-none text-[var(--brand-dark)]">Choisis ta plateforme</p>

        <div className="mt-4 grid gap-2">
          <a
            href="https://www.ubereats.com/fr"
            target="_blank"
            rel="noreferrer"
            className="rolling-btn brand-font rounded-xl bg-[var(--brand)] px-4 py-3 text-center text-2xl uppercase leading-none text-[var(--cream)] transition-transform duration-300 hover:scale-[1.02]"
          >
            <RollingText text="Uber Eats" />
          </a>
          <a
            href="https://deliveroo.fr"
            target="_blank"
            rel="noreferrer"
            className="rolling-btn brand-font rounded-xl border-2 border-[var(--brand)] bg-white px-4 py-3 text-center text-2xl uppercase leading-none text-[var(--brand)] transition-transform duration-300 hover:scale-[1.02]"
          >
            <RollingText text="Deliveroo" />
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
