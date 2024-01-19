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




import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { useToast } from "@/components/ui/use-toast";




import { Input } from "@/components/ui/input"
import { format } from "date-fns";
import useDocumentView from "@/lib/useDocumentView";

import { PageContainer } from "@/components/PageContainer"
import Filter from "@/components/Filter"
import DatePeriod from "@/components/DatePeriod"
import SelectUsers from "@/components/SelectUsers"



export type Payment = {
  id: string
  amount: number
  fname: string
  lname: string
  email: string
  phoneNumber: number
  clientAssignment: string
  region: string,
  position: string
  tenure: string
  age: number
  salary: number
  bonus: number
  status: string
}

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "date",
    header: ({}) => {
        return (
            <div className="flex gap-1 items-center">
            Date
            </div>
        )
    },
    cell: ({ row }) => {

      return (
        <div className="cursor-pointer flex gap-2 text-xs items-center">
          {row.getValue("date")}
        </div>
      )
    }, 
  },
  {
    accessorKey: "time",
    header: ({}) => {
        return (
            <div className="flex gap-2 items-center"> 
             Time
            </div>
        )
    },    cell: ({ row }) => {
          return (
            <div className="text-xs">
            {row.getValue("time")}
            </div>
            )
        },
  },
  {
    accessorKey: "pdaId",
    header: ({  }) => {
      return (
        <div className="gap-2 flex items-center">
            User ID
        </div>
      )
    },
    cell: ({ row }) =>  {
      return (
        <div className="text-xs">
          {row.getValue("pdaId")}
        </div>      )
    }
  },
  {
    accessorKey: "user",
    header: ({  }) => {
      return (
        <div className=" gap-2">
            User
          
        </div>
      )
    },
    cell: ({ row }) => {



      return (
        <div className="text-xs ">
                     {row.getValue("user")}
        </div>
      )
    },
  },
  {
    accessorKey: "event",
    header: ({  }) => {
      return (
       <div className="flex items-center gap-2">
        Event
         
       </div>
      )
    },
    cell: ({ row }) =>  {
      const item = row.original
      return (
        <div className="capitalize text-xs flex gap-4">
                   {row.getValue("event")}
                   <div className="text-[#0A98A9] flex gap-4">
                     {
                      item.dataEntryDetails && (
                        <>
                        <p>{item.dataEntryDetails?.fillingStation} </p>
                           <p>{item.dataEntryDetails?.city} </p>
                           <p>{item.dataEntryDetails?.priceDate}</p>
                        </>
                      )
                     }
                   </div>
        </div>
      )
    }
  },
]




export function AuditlogTable({data, selectData}: {data: Payment[], selectData:any}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})


  const [globalFilter, setGlobalFilter] = React.useState('')

  const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
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
        globalFilter
      },
    })

      
  return (
    <div className="px-2 h-full">
      
    <div className="flex items-start md:items-center flex-col md:flex-row gap-4 justify-between py-3">
        <div className="w-full flex  items-center gap-2">
          <DatePeriod />
          <SelectUsers user={selectData} />

        </div>
        <div className="flex gap-4 w-full md:justify-end">
            <Filter />
        </div>
      </div>

      <div className="rounded-md border h-full">
        <Table className="">
          <TableHeader className=" text-xs text-">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-" >
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
                    <TableCell key={cell.id} className="py-3">
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

      <div className="flex items-center justify-between space-x-2 p-4">
      <PageContainer page="/admin/audit-log" />

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

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}
