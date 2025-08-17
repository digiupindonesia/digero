"use client";

import { Button } from "@/components/ui/button";
import { ListReqTopUp } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import { FaLocationArrow } from "react-icons/fa";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuArrowUpDown } from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox";
import formatCurrency from "@/utils/formatCurrency";

export const columns: ColumnDef<ListReqTopUp>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "datetime",
    // header: "Member",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Order
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Member",
  },
  {
    accessorKey: "accountName",
    header: "Nama Akun",
  },
  {
    accessorKey: "price",
    header: "Nominal + Fee",
    cell: ({ row }) => {
      return (
        <span>
          {formatCurrency(row.getValue("price"))}
        </span>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center p-2 rounded bg-black cursor-pointer mx-auto">
              <FaLocationArrow className="cursor-pointer text-white" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuItem>Pending</DropdownMenuItem> */}
            <DropdownMenuItem className="text-yellow-500">
              Move to Processing
            </DropdownMenuItem>
            <DropdownMenuItem className="text-green-500">
              Move to Completed
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
