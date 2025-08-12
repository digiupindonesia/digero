import * as React from "react";
import { Input as InputShadCn } from "@/components/ui/input";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils"; // shadcn helper untuk merge className (opsional)

type ShadInputProps = React.ComponentProps<typeof InputShadCn>;

interface InputProps extends ShadInputProps {
  Icon?: IconType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ Icon, className, type = "text", ...props }, ref) => {
    return (
      <div className="w-full flex items-center gap-2 border px-4 py-2 bg-white rounded-lg">
        {Icon && <Icon className="text-xl shrink-0" />}
        <InputShadCn
          ref={ref}
          type={type}
          className={cn(
            "focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none border-0 shadow-none",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
