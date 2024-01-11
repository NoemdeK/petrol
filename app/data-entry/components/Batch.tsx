
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
      const entry = row.original

      return (
        <View entry={entry} />
      )
    }
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => {
        return (
            <div className="text-right">
                Actions
            </div>
        )
    },
    cell: ({ row }) => {

       const entry = row.original

    
      return (
        <div className="flex justify-end">
           <Button>
            Delete
        </Button>
        </div>
      )
    },
  },

  
]


const View = ({entry}: any) => {
  const { onOpen, setData} = useDocumentView()
  console.log("entry", entry)

  const onclickSet = () => {
    setData(entry.supportingDocument)
    onOpen()
  }
  return (
    <div className="capitalize text-xs">
        <Button variant={"link" } onClick={onclickSet} className="text-sky-600"> 
            View
        </Button>
    </div>
    )
}



export function Batch({data}: any) {
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

  
    </div>
  )
}

