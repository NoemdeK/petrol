"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {  MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import pdf from "@/assets/pdf.png"
import excel from "@/assets/excel.png"
import xls from "@/assets/xls.png"
import Image from "next/image"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    category: 'Pricing',
    dataset: "Jan 1 – 7 Petroleum Motor Spirit Prices by State: Daily",
    period: "Weekly",
    product: "PMS",
    source: "Nigerian Bureau of Statistics",
    year: "2019"
  },
  {
    id: "m5e84i9",
    category: 'Pricing',
    dataset: "Jan 1 – 7 Petroleum Motor Spirit Prices by State: Daily",
    period: "Weekly",
    product: "PMS",
    source: "Nigerian Bureau of Statistics",
    year: "2019"
  },
  {
    id: "m5grsi9",
    category: 'Pricing',
    dataset: "Jan 1 – 7 Petroleum Motor Spirit Prices by State: Daily",
    period: "Weekly",
    product: "Gas",
    source: "Nigerian Bureau of Statistics",
    year: "2019"
  },
]

export type Payment = {
  id: string
  category: string
  product: string
  year: string
  source: string
  period: string
  dataset: string
}

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "category",
    header: "category",
    cell: ({ row }) => <div className="">{row.getValue("category")}</div>,
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <div className="capitalize">{row.getValue("product")}</div>,
  },
  
  {
    accessorKey: "dataset",
    header: "dataset",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("dataset")}</div>
    ),
  },
  {
    accessorKey: "period",
    header: "period",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("period")}</div>
    ),
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => <div className="lowercase text-cenjter">{row.getValue("year")}</div>,
  },
  {
    accessorKey: "source",
    header: "source",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("source")}</div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({  }) => {

      return (
       <div className="flex items-center gap-2">
        <div className="cursor-pointer hover:scale-95 transition-all">
          <Image src={xls} alt="xls" width={20} height={20} />
        </div>
        <div className="cursor-pointer hover:scale-95 transition-all">
          <Image src={pdf} alt="pdf" width={20} height={20} />
        </div>
        <div className="cursor-pointer hover:scale-95 transition-all">
          <Image src={excel} alt="excel" width={20} height={20} />
        </div>
       </div>
      )
    },
  },
]

export function RawDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full m-4">
      <div className="flex items-center py-4 justify-between">
        <div>

        </div>
      <Button className="text-green-600 font-bold bg-transparent">
        Export
      </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-sky-300 text-black  capitalize">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-black font-medium capitalize">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
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
              ))
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
    </div>
  )
}
