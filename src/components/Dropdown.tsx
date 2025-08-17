import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IconType } from "react-icons"
import { cn } from "@/lib/utils"

interface DropdownProps {
  Icon?: IconType
  label: string
  items: { label: string | number; onClick?: () => void }[]
  className?: string
}

const Dropdown = ({ Icon, label, items, className }: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("flex items-center gap-2", className)}
        >
          {Icon && <Icon className="text-lg shrink-0" />}
          {label}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {items.map((item, idx) => (
          <DropdownMenuItem key={idx} onClick={item.onClick}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown
