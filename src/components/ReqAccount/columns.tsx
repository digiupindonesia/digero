"use client";

import { Button } from "@/components/ui/button";
import { ListReqAccount } from "@/types/type";
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

// Tambahkan interface untuk callback functions
interface ColumnActions {
  onApprove?: () => void;
}

export const createColumns = (
  actions: ColumnActions
): ColumnDef<ListReqAccount>[] => [
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
    accessorKey: "requestedBy.username",
    header: "Member",
  },
  {
    accessorKey: "accountName",
    header: "Nama Akun",
  },
  {
    accessorKey: "businessCenterId",
    header: "ID Business Center",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  // {
  //   header: "Action",
  //   cell: ({ row }) => {
  //     const rowData = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger>
  //           <div className="flex items-center p-2 rounded bg-black cursor-pointer mx-auto">
  //             <FaLocationArrow className="cursor-pointer text-white" />
  //           </div>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent>
  //           <DropdownMenuItem
  //             className="text-green-500"
  //             onClick={() => actions.onApprove?.()}
  //           >
  //             Move to Approved
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

// Export untuk backward compatibility jika ada yang masih menggunakan
export const columns = createColumns({});
