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




import Filter from "@/components/Filter"
import { PageContainer } from "@/components/PageContainer"


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
    accessorKey: "product",
    header: ({  }) => {
      return (
        <div className="">
            Product
          
        </div>
      )
    },
    cell: ({ row }) => {

      return (
        <div className="">
           {row.getValue("product")}
        </div>
      )
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-xright">Price</div>,
    cell: ({ row }) =>  {
      const amount = parseFloat(row.getValue("price"))
 
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-rixght font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "priceDate",
    header: ({  }) => {
      return (
       <div className="">
        Price  Date     
       </div>
      )
    },
    cell: ({ row }) =>  {
      return (
        <div>
          {row.getValue("priceDate")}
        </div>
      )
    }
  },
  {
    accessorKey: "uploadedBy",
    header: ({  }) => {
      return (
       <div className="">
        Uploaded By     
       </div>
      )
    },
    cell: ({ row }) =>  {
      return (
        <div>
          {row.getValue("uploadedBy")}
        </div>
      )
    }
  },

  {
    accessorKey: "uploadDate",
    header: ({  }) => {
      return (
       <div className="">
        Upload  Date     
       </div>
      )
    },
    cell: ({ row }) =>  {
      return (
        <div>
          {row.getValue("uploadDate")}
        </div>
      )
    }
  },

  
]





export function History({data}: any) {
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
    <div className="px-2 h-full mt-12">
      <div className="flex justify-between lg:flex-row flex-col lg:items-center py-4">
          <h4 className="text-lg md:text-xl font-medium my-4">
           ICE Data
          </h4>
          <Filter />
        </div>
      <div className="rounded-md border h-full">
        
        <Table className="">
          <TableHeader className=" text-xs text-">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-sm font-medium " >
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
              table.getRowModel().rows.map((row) => {
                return  (
                  <TableRow
                    key={row.id}
                    
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) =>{
                      return  (
                        <TableCell key={cell.id} className="py-4 text-xs">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    })}
                     
                  </TableRow>
                )
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
      <div className="flex items-center justify-between space-x-2 p-4">
          <PageContainer page="/analyst/history"  table={table} />
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

