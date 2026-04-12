"use client";

import Link from "next/link";
import { useState } from "react";
import { DeliveryPopup } from "@/components/delivery-popup";
import { RollingText } from "@/components/rolling-text";

export function HorairesActions() {
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  return (
    <>
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          className="commander-btn rolling-btn brand-font inline-flex items-center justify-center rounded-xl border-2 border-[#A74C17] bg-white px-4 py-2 text-3xl uppercase leading-none text-[var(--brand)] shadow-[4px_4px_0_#A74C17] md:text-4xl"
          onClick={() => setIsDeliveryOpen(true)}
        >
          <RollingText text="Livraison" />
        </button>

        <Link
          href="/menu"
          className="commander-btn rolling-btn brand-font inline-flex items-center justify-center rounded-xl border-2 border-[#A74C17] bg-white px-4 py-2 text-3xl uppercase leading-none text-[var(--brand)] shadow-[4px_4px_0_#A74C17] md:text-4xl"
        >
          <RollingText text="Menu" />
        </Link>
      </div>

      <DeliveryPopup isOpen={isDeliveryOpen} onClose={() => setIsDeliveryOpen(false)} />
    </>
  );
}
