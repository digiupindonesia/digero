import * as React from "react";
import { Textarea as TextareaShadCn } from "@/components/ui/textarea";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

type ShadTextareaProps = React.ComponentProps<typeof TextareaShadCn>;

interface TextareaProps extends ShadTextareaProps {
  Icon?: IconType;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ Icon, className, ...props }, ref) => {
    return (
      <div className="w-full flex items-start gap-2 border px-4 py-2 bg-white rounded-lg">
        {Icon && <Icon className="text-xl shrink-0 mt-1" />}
        <TextareaShadCn
          ref={ref}
          className={cn(
            "focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none border-0 shadow-none resize-y p-0",
            "min-h-[96px]", // biar textarea ada tinggi minimal
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
