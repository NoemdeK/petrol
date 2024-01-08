
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
    accessorKey: "fillingStation",
    header: ({}) => {
        return (
            <div className="flex gap-1 items-center">
             Filling Station
            </div>
        )
    },
    cell: ({ row }) => {

      return (
        <div className="cursor-pointer flex gap-2 items-center">
          {row.getValue("fillingStation")}
        </div>
      )
    }, 
  },
  {
    accessorKey: "state",
    header: ({}) => {
        return (
            <div className="flex gap-2 items-center"> 
             State
            </div>
        )
    },    cell: ({ row }) => {
          return (
            <div className="">
              {row.getValue("state")}
            </div>
            )
        },
  },
  {
    accessorKey: "region",
    header: ({  }) => {
      return (
        <div className="gap-2 flex items-center">
            Region
        </div>
      )
    },
    cell: ({ row }) =>  {
      return (
        <div className="text-xs">
          {row.getValue("region")}
        </div>      )
    }
  },
  {
    accessorKey: "product",
    header: ({  }) => {
      return (
        <div className="flex items-center gap-2">
            Product
          
        </div>
      )
    },
    cell: ({ row }) => <div className="text-xs ">
              {row.getValue("product")}
    </div>,
  },
  {
    accessorKey: "price",
    header: ({  }) => {
      return (
       <div className="flex items-center gap-2">
        Price
         
       </div>
      )
    },
    cell: ({ row }) =>  {
      return (
        <div className="capitalize text-xs">
            ₦{Number(row.getValue("price")).toLocaleString()}
        </div>
      )
    }
  },

  {
    accessorKey: "supportingDocument",
    header: ({  }) => {
      return (
       <div className="flex items-center gap-2">
        Supporting Document
         
       </div>
      )
    },
    cell: ({ row }) =>  {
      const { onOpen} = useDocumentView()
      return (
        <div className="capitalize text-xs">
            <Button variant={"link" } onClick={onOpen} className="text-sky-600"> 
            View
            </Button>
        </div>
      )
    }
  },
  {
    accessorKey: "submittedBy",
    header: ({  }) => {
      return (
       <div className="flex items-center gap-2">
        Submitted By
         
       </div>
      )
    },
    cell: ({ row }) =>  {
      return (
        <div className="capitalize text-xs">
            {row.getValue("submittedBy")}
        </div>
      )
    }
  },
  {
    accessorKey: "approvedBy",
    header: ({  }) => {
      return (
       <div className="flex items-center gap-2">
        Approved By
         
       </div>
      )
    },
    cell: ({ row }) =>  {
      return (
        <div className="capitalize text-xs">
            {row.getValue("approvedBy")}
        </div>
      )
    }
  },
  {
    accessorKey: "dateApproved",
    header: ({  }) => {
      return (
       <div className="flex items-center gap-2">
            Date Approved 
         
       </div>
      )
    },
    cell: ({ row }) =>  {
      return (
        <div className="capitalize text-xs">
            {row.getValue("dateApproved")}
        </div>
      )
    }
  },
]

export function Approved({data}: {data: Payment[]}) {
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
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow border border-block w-full md:w-72"
          placeholder="Search all columns..."
        />

        </div>
        <div className="flex gap-4 w-full md:justify-end">

        </div>
      </div>

      <div className="rounded-md border h-full">
        <Table className="">
          <TableHeader className=" text-xs text-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-black" >
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

      <div className="flex items-center justify-end space-x-2 p-4">
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
