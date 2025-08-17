import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string | number;
  label: string ;
  disabled?: boolean;
};

export interface SelectWithIconProps {
  /** Optional icon rendered inside the Trigger (left of the label) */
  Icon?: IconType;
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Uncontrolled initial value */
  defaultValue?: string;
  /** onValueChange callback from shadcn Select */
  onValueChange?: (value: string) => void;
  /** Dropdown options (text only in items) */
  options: SelectOption[];
  /** Disable the whole Select */
  disabled?: boolean;
  /** Outer wrapper className (rarely needed) */
  className?: string;
  /** ClassName for the Trigger button */
  triggerClassName?: string;
  /** ClassName for the Content dropdown */
  contentClassName?: string;
}

/**
 * SelectWithIcon
 * - Icon appears ONLY in the Trigger (left side)
 * - Items are text-only (no icons)
 */
const SelectWithIcon: React.FC<SelectWithIconProps> = ({
  Icon,
  placeholder = "Select...",
  value,
  defaultValue,
  onValueChange,
  options,
  disabled,
  className,
  triggerClassName,
  contentClassName,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn("flex items-center w-full gap-2", triggerClassName)}
        >
          {Icon && <Icon className="text-lg shrink-0" />}
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={contentClassName}>
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={String(opt.value)}
              disabled={opt.disabled}
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectWithIcon;

// -----------------------------
// Example usage
// -----------------------------
// import { MdOutlineFilterList } from "react-icons/md";
//
// const statusOptions: SelectOption[] = [
//   { value: "all", label: "All" },
//   { value: "pending", label: "Pending" },
//   { value: "processing", label: "Processing" },
//   { value: "added", label: "Added" },
// ];
//
// function Demo() {
//   const [value, setValue] = React.useState<string>("");
//   return (
//     <SelectWithIcon
//       Icon={MdOutlineFilterList}
//       placeholder="Filter Status"
//       value={value}
//       onValueChange={setValue}
//       options={statusOptions}
//     />
//   );
// }
