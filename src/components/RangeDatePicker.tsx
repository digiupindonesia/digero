import * as React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";

type RangeDatePickerProps = {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
};

export default function RangeDatePicker({ date, setDate }: RangeDatePickerProps) {
  // ⬇️ penting: pakai DateRange | undefined
  // const [date, setDate] = React.useState<DateRange | undefined>({
  //   from: undefined,
  //   to: undefined,
  // });

  const label = date?.from
    ? date?.to
      ? `${format(date.from, "dd MMMM yyyy", { locale: id })} – ${format(
          date.to,
          "dd MMMM yyyy",
          { locale: id }
        )}`
      : format(date.from, "dd MMMM yyyy", { locale: id })
    : "Pilih tanggal";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[300px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={date} // ✅ sekarang cocok
          onSelect={setDate} // (range: DateRange | undefined) => void
          defaultMonth={date?.from ?? new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
