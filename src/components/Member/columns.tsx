"use client";

import { Button } from "@/components/ui/button";
import { Member } from "@/type";
import { ColumnDef, Row } from "@tanstack/react-table";
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

// ✅ import store zustand
import { useChangePasswordModal } from "@/stores/changePasswordModal"; // sesuaikan path

// ✅ Komponen sel terpisah agar aman pakai hook
function ActionCell({ row }: { row: Row<Member> }) {
  const open = useChangePasswordModal((s) => s.toggle);

  const openModalSafely = () => {
    // pastikan dropdown close dulu, baru open dialog
    requestAnimationFrame(() => {
      useChangePasswordModal.getState().open();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center p-2 rounded bg-black cursor-pointer mx-auto">
          <FaLocationArrow className="cursor-pointer text-white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="text-red-500">Suspend</DropdownMenuItem>

        {/* 🔗 klik ini akan buka modal via Zustand */}
        <DropdownMenuItem onClick={openModalSafely}>
          Ganti Password
        </DropdownMenuItem>

        <DropdownMenuItem>Ubah Fee</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<Member>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Member
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Nomor WhatsApp" },
  {
    accessorKey: "accountLinked",
    header: "Akun Tertaut",
    cell: ({ row }) => {
      const accountLinked = row.getValue("accountLinked") as string[];

      if (accountLinked.length <= 1) {
        return <p>{accountLinked[0] || "No account"}</p>;
      }

      return (
        <div className="flex items-center gap-2">
          <p>{accountLinked[0]}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1">
                <HiOutlineDotsCircleHorizontal className="h-4 w-4 cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>All Linked Accounts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {accountLinked.map((account, index) => (
                <DropdownMenuItem key={index}>{account}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
  {
    accessorKey: "fee",
    header: "Fee %",
    cell: ({ row }) => {
      const fee = row.getValue("fee") as number;
      return <p>{fee}%</p>;
    },
  },
  {
    header: "Action",
    // ✅ pakai komponen khusus supaya aman pakai hook
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
