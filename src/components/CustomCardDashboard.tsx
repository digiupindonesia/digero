import * as React from "react";
import type { IconType } from "react-icons";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type StatsCardProps = {
  title: string;
  icon: IconType;
  className?: string;
  children?: ReactNode;
};

export function CustomCardDashboard({
  title,
  icon: Icon,
  className,
  children,
}: StatsCardProps) {
  return (
    <Card
      className={cn(
        "rounded-2xl bg-[#F7F7F7] shadow-none outline-none",
        className
      )}
    >
      <CardContent className="px-5">
        <div className="flex flex-col items-start gap-5 w-full h-full">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded flex bg-white items-center justify-center shrink-0">
              <Icon className="h-6 w-6" />
            </div>
            <p className="text-sm leading-none">{title}</p>
          </div>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
