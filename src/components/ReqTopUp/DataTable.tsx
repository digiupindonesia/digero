"use client";
import { useState, useMemo, useCallback } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import InputComponent from "@/components/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaLocationArrow, FaSearch } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListReqTopUp } from "@/type";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { MdAccessTime } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa6";
import { MdOutlineFilterList } from "react-icons/md";

interface DataTableProps {
  columns: ColumnDef<ListReqTopUp>[];
  data: ListReqTopUp[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter data berdasarkan status dengan useMemo untuk optimasi
  const filteredData = useMemo(() => {
    return statusFilter === "all"
      ? data
      : data.filter((item) => item.status === statusFilter);
  }, [data, statusFilter]);

  // Hitung jumlah data untuk setiap status dengan useMemo untuk optimasi
  const statusCounts = useMemo(() => {
    return {
      all: data.length,
      pending: data.filter((item) => item.status === "pending").length,
      processing: data.filter((item) => item.status === "processing").length,
      complete: data.filter((item) => item.status === "complete").length,
    };
  }, [data]);

  // Create memoized handlers untuk mencegah re-render
  const handleStatusFilter = useCallback((status: string) => {
    setStatusFilter(status);
  }, []);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <>
      <div className="w-full flex gap-2 items-center justify-end pb-4">
        <Menubar className="hidden lg:flex">
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => handleStatusFilter("all")}
              className={`${
                statusFilter === "all" ? "text-yellow-500" : ""
              } flex items-center gap-1`}
            >
              <MdOutlineFilterList className="text-lg" />
              All ({statusCounts.all})
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => handleStatusFilter("pending")}
              className={`${
                statusFilter === "pending" ? "text-yellow-500" : ""
              } flex items-center gap-1`}
            >
              <MdAccessTime className="text-lg" />
              Pending ({statusCounts.pending})
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => handleStatusFilter("processing")}
              className={`${
                statusFilter === "processing" ? "text-yellow-500" : ""
              } flex items-center gap-1`}
            >
              <FaCheck className="text-lg" />
              Processing ({statusCounts.processing})
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => handleStatusFilter("complete")}
              className={`${
                statusFilter === "complete" ? "text-yellow-500" : ""
              } flex items-center gap-1`}
            >
              <FaCheckDouble className="text-lg" />
              Complete ({statusCounts.complete})
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <MdOutlineFilterList className="text-lg" />
                Filter Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem
                onClick={() => handleStatusFilter("all")}
                className={statusFilter === "all" ? "text-yellow-500" : ""}
              >
                <MdOutlineFilterList className="mr-2 text-lg" />
                <span className="flex-1">All</span>
                <span className="text-muted-foreground">
                  ({statusCounts.all})
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleStatusFilter("pending")}
                className={statusFilter === "pending" ? "text-yellow-500" : ""}
              >
                <MdAccessTime className="mr-2 text-lg" />
                <span className="flex-1">Pending</span>
                <span className="text-muted-foreground">
                  ({statusCounts.pending})
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleStatusFilter("processing")}
                className={
                  statusFilter === "processing" ? "text-yellow-500" : ""
                }
              >
                <FaCheck className="mr-2 text-lg" />
                <span className="flex-1">Processing</span>
                <span className="text-muted-foreground">
                  ({statusCounts.processing})
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleStatusFilter("complete")}
                className={statusFilter === "complete" ? "text-yellow-500" : ""}
              >
                <FaCheckDouble className="mr-2 text-lg" />
                <span className="flex-1">Complete</span>
                <span className="text-muted-foreground">
                  ({statusCounts.complete})
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Views
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="max-w-sm">
          <InputComponent
            Icon={FaSearch}
            className="w-full py-0"
            placeholder="Filter Nama..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center p-2 rounded bg-black cursor-pointer mx-auto">
              <FaLocationArrow className="cursor-pointer text-white" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setStatusFilter("all")}
              className={statusFilter === "all" ? "bg-gray-100" : ""}
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setStatusFilter("pending")}
              className={statusFilter === "pending" ? "bg-gray-100" : ""}
            >
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setStatusFilter("processing")}
              className={statusFilter === "processing" ? "bg-gray-100" : ""}
            >
              Processing
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setStatusFilter("added")}
              className={statusFilter === "added" ? "bg-gray-100" : ""}
            >
              Added
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
