"use client";

import { Button } from "@/components/ui/button";
import { TopUp } from "@/types/type";
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

interface ColumnActions {
  onPaid?: (id: string) => void;
}

export const createColumns = (actions: ColumnActions): ColumnDef<TopUp>[] => {
  function moveToPaid(id: string) {
    actions.onPaid?.(id);
  }

  return [
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
      accessorKey: "createdAt",
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
      accessorKey: "user.username",
      id: "user.username", // Tambahkan id yang eksplisit
      header: "Member",
    },
    {
      accessorKey: "accountRequest.accountName",
      header: "Nama Akun",
    },
    {
      accessorKey: "total",
      header: "Nominal + Fee",
      cell: ({ row }) => {
        return <span>{formatCurrency(row.getValue("total"))}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center p-2 rounded bg-black cursor-pointer mx-auto">
                <FaLocationArrow className="cursor-pointer text-white" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="text-green-500"
                onClick={() => moveToPaid(rowData.id)}
              >
                Move to Paid
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

// Export untuk backward compatibility
export const columns = createColumns({});
