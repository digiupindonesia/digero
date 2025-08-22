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
  label: string;
  disabled?: boolean;
};

export interface SelectWithIconProps<T = SelectOption> {
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
  /** Dropdown options with custom type */
  options: T[];
  /** Function to extract value from custom option type */
  getOptionValue: (option: T) => string | number;
  /** Function to extract label from custom option type */
  getOptionLabel: (option: T) => string;
  /** Function to check if option is disabled (optional) */
  getOptionDisabled?: (option: T) => boolean;
  /** Disable the whole Select */
  disabled?: boolean;
  /** Outer wrapper className (rarely needed) */
  className?: string;
  /** ClassName for the Trigger button */
  triggerClassName?: string;
  /** ClassName for the Content dropdown */
  contentClassName?: string;
  /** Custom text when no options available */
  emptyText?: string;
}

/**
 * SelectWithIcon
 * - Icon appears ONLY in the Trigger (left side)
 * - Items are text-only (no icons)
 * - Supports custom option types through generics
 */
function SelectWithIcon<T = SelectOption>({
  Icon,
  placeholder = "Select...",
  value,
  defaultValue,
  onValueChange,
  options,
  getOptionValue,
  getOptionLabel,
  getOptionDisabled,
  disabled,
  className,
  triggerClassName,
  contentClassName,
  emptyText = "Belum ada data",
}: SelectWithIconProps<T>) {
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
          {options.length === 0 ? (
            <div className="px-2 py-1.5 text-sm text-gray-500 italic">
              {emptyText}
            </div>
          ) : (
            options.map((option, index) => (
              <SelectItem
                key={`${getOptionValue(option)}-${index}`}
                value={String(getOptionValue(option))}
                disabled={getOptionDisabled ? getOptionDisabled(option) : false}
              >
                {getOptionLabel(option)}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectWithIcon;

// -----------------------------
// Example usage with default SelectOption type
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
// function DemoDefault() {
//   const [value, setValue] = React.useState<string>("");
//   return (
//     <SelectWithIcon
//       Icon={MdOutlineFilterList}
//       placeholder="Filter Status"
//       value={value}
//       onValueChange={setValue}
//       options={statusOptions}
//       getOptionValue={(opt) => opt.value}
//       getOptionLabel={(opt) => opt.label}
//       getOptionDisabled={(opt) => opt.disabled}
//     />
//   );
// }

// -----------------------------
// Example usage with custom type
// -----------------------------
// type User = {
//   id: number;
//   name: string;
//   email: string;
//   isActive: boolean;
// };
//
// const users: User[] = [
//   { id: 1, name: "John Doe", email: "john@example.com", isActive: true },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", isActive: false },
// ];
//
// function DemoCustom() {
//   const [selectedUser, setSelectedUser] = React.useState<string>("");
//   return (
//     <SelectWithIcon<User>
//       Icon={MdOutlineFilterList}
//       placeholder="Select User"
//       value={selectedUser}
//       onValueChange={setSelectedUser}
//       options={users}
//       getOptionValue={(user) => user.id}
//       getOptionLabel={(user) => `${user.name} (${user.email})`}
//       getOptionDisabled={(user) => !user.isActive}
//     />
//   );
// }
