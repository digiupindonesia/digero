import * as React from "react";
import type { IconType } from "react-icons";
import { Card, CardContent } from "@/components/ui/card";

// Helper: format number or currency (default IDR, id-ID)
function formatValue(
  value: number | string,
  opts?: { mode?: "currency" | "number"; locale?: string; currency?: string }
) {
  const { mode = "number", locale = "id-ID", currency = "IDR" } = opts || {};
  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return String(value);
  if (mode === "currency") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    })
      .format(num)
      .replace(/\u00A0/g, " "); // keep spaces predictable
  }
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(
    num
  );
}

export type StatsCardProps = {
  title: string;
  value: number | string;
  /** If true, value will be formatted as currency (default IDR). */
  isCurrency?: boolean;
  /** Icon component from react-icons (e.g., LuLayoutGrid from lucide-react is fine too if wrapped) */
  icon: IconType;
  /** Optional overrides */
  locale?: string; // default id-ID
  currency?: string; // default IDR
  className?: string;
};

/**
 * Minimal stats card inspired by the screenshot.
 * - Left: small rounded icon tile
 * - Middle/Right: title and big value
 */
export function CardDashboard({
  title,
  value,
  isCurrency,
  icon: Icon,
  locale,
  currency,
  className,
}: StatsCardProps) {
  const display = formatValue(value, {
    mode: isCurrency ? "currency" : "number",
    locale,
    currency,
  });

  return (
    <Card
      className={
        "rounded-2xl bg-[#F7F7F7] shadow-none outline-none" + (className ?? "")
      }
    >
      <CardContent className="px-5">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded flex bg-white items-center justify-center shrink-0">
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1 py-2">
            <div className="text-base leading-none mb-3">{title}</div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {display}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
