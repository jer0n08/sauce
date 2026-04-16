"use client";

import { useEffect, useState } from "react";
import type { OpeningHours, WeekdayKey } from "@/types/restaurants";

type RestaurantOpenStatusProps = {
  openingHours: OpeningHours;
  timeZone: string;
};

const weekdayKeys: WeekdayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const weekdayFromIntl: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const localTimeFormatterCache = new Map<string, Intl.DateTimeFormat>();

function getLocalTimeParts(timeZone: string, now: Date) {
  let formatter = localTimeFormatterCache.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    localTimeFormatterCache.set(timeZone, formatter);
  }

  const parts = formatter.formatToParts(now);
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  const dayIndex = weekdayFromIntl[weekday] ?? 0;

  return { dayIndex, currentMinutes: hour * 60 + minute };
}

function parseTimeToMinutes(value: string) {
  const [hour, minute] = value.split(":");
  return Number(hour) * 60 + Number(minute);
}

function isOpenNow(openingHours: OpeningHours, timeZone: string, now = new Date()) {
  const { dayIndex, currentMinutes } = getLocalTimeParts(timeZone, now);
  const todayKey = weekdayKeys[dayIndex];
  const previousDayKey = weekdayKeys[(dayIndex + 6) % 7];

  for (const [start, end] of openingHours[todayKey] ?? []) {
    const startMinutes = parseTimeToMinutes(start);
    const endMinutes = parseTimeToMinutes(end);

    if (endMinutes > startMinutes && currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      return true;
    }

    if (endMinutes < startMinutes && currentMinutes >= startMinutes) {
      return true;
    }
  }

  for (const [start, end] of openingHours[previousDayKey] ?? []) {
    const startMinutes = parseTimeToMinutes(start);
    const endMinutes = parseTimeToMinutes(end);

    if (endMinutes < startMinutes && currentMinutes < endMinutes) {
      return true;
    }
  }

  return false;
}

export function RestaurantOpenStatus({ openingHours, timeZone }: RestaurantOpenStatusProps) {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const updateStatus = () => setIsOpen(isOpenNow(openingHours, timeZone));
    updateStatus();

    const intervalId = window.setInterval(updateStatus, 60_000);
    return () => window.clearInterval(intervalId);
  }, [openingHours, timeZone]);

  if (isOpen === null) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--paragraph)]/70">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--paragraph)]/35" aria-hidden="true" />
        Verification...
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${
        isOpen ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
      }`}
      aria-live="polite"
    >
      <span className={`h-2.5 w-2.5 rounded-full ${isOpen ? "bg-emerald-500" : "bg-red-500"}`} aria-hidden="true" />
      {isOpen ? "Ouvert" : "Fermé"}
    </span>
  );
}
