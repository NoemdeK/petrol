
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


import { toast, useToast } from "@/components/ui/use-toast";




import { Input } from "@/components/ui/input"
import { format } from "date-fns";
import useApprove from "@/lib/useApprove";
import { ApproveModal } from "@/components/ApproveModal";
import { PlainTransportDekApi } from "@/utils/axios";
import useReject from "@/lib/useReject";
import { RejectedModal } from "@/components/Rejected";
import { useSession } from "next-auth/react";
import useLoading from "@/lib/useLoading";
import useDocumentView from "@/lib/useDocumentView";

import { PageContainer } from "@/components/PageContainer"
import { usePathname } from "next/navigation";




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
        <div className="cursor-pointer flex gap-2 text-xs items-center">
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
            <div className="text-xs">
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
        </div>
      )
    }
  },
  {
    accessorKey: "products",
    header: ({  }) => {
      return (
        <div className="flex items-center gap-2">
            Products
          
        </div>
      )
    },
    cell: ({ row }) => {
      const batch = row.original

      const productNames = Object.keys(batch?.products);


      return (
        <div className="text-xs ">
            {
           productNames.map((item, i) => (
            <div key={i}>{item}</div>
           )) 
          }
        </div>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({  }) => {
      return (
       <div className="text-right">
        Price (₦)
       </div>
      )
    },
    cell: ({ row }) =>  {
      const batch = row.original
      const numericalValues = Object.values(batch.products).map(Number);

      return (
        <div className="capitalize text-xs text-right">
          {
           numericalValues.map((item, i) => (
            <div key={i}>{Number(item).toLocaleString()}</div>
           )) 
          }
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
                {row.getValue('submittedBy')}
        </div>
      )
    }
  },
  {
    accessorKey: "dateSubmitted",
    header: ({  }) => {
      return (
       <div className="flex items-center gap-2">
            Date Submitted 
         
       </div>
      )
    },
    cell: ({ row }) =>  {
      return (
        <div className="capitalize text-xs">
            {row.getValue("dateSubmitted")}
        </div>
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
       <Actions entry={entry} />
      )
    },
  },
]

const View = ({entry}: any) => {
  const { onOpen, setData} = useDocumentView()

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

const Actions = (entry: any) => {
  const approve = useApprove()
  const reject = useReject()
  const session = useSession()
  const loading = useLoading()




  const approveEntryd = async (id: string) => {
    loading.onOpen()
    // Perform the API call to approve the entry
    try {
      // Your API call here
      // Example:
      const response = await fetch(`https://petrodata.zainnovations.com/api/v1/data-entry/actions?flag=approve&entryId=${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${session.data?.user.accessToken}`,
        },
      });
      const data = await response.json();
      toast({
        title: `Approved!`,
        description: `Entry is approved!`,
        })
      // Simulating successful approval
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Approve not done!`,
        description: `Error occured`,
        })
    } finally {
      loading.onClose()
    }
  };

  const rejectEntry = async (id: string) => {
    loading.onOpen()
    const headers = {
      Authorization: `Bearer ${session.data?.user.accessToken}`, // Replace YOUR_ACCESS_TOKEN with the actual token
      // Other headers if needed
    };
  
    await PlainTransportDekApi.patch(`data-entry/actions?flag=reject&entryId=${id}`,
    { rejectionReason: reject.data },
    { headers })
    .then(() => {
        toast({
          title: `Rejected!`,
          description: `Entry is rejected!`,
          })
          window.location.reload()
     })
     .catch((error) => {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: `Rejected not done!`,
        description: `Error occured`,
        })
    })
    .finally(() => {
      loading.onClose()
    })
  };

  return (
   <div className="flex gap-1 justify-end">
    <Button className="" variant={"outline"}
      onClick={() => {
        reject.setId(entry.entry.entryId)
        reject.onOpen()
      }}
    >
        Reject
    </Button>
    <Button 
      onClick={() => {
        approve.setId(entry.entry.entryId);
        approve.onOpen()
      }}>
        Approve
    </Button>

    {
        approve.isOpen && (
          <ApproveModal onCancel={approve.onClose} onSubmit={() => approveEntryd(approve.id)}/>
        )
      }
      {
        reject.isOpen && (
          <RejectedModal onCancel={reject.onClose} onSubmit={() => rejectEntry(reject.id)}/>
        )
      }
  </div>
  )
}

export function Pending({data}: {data: any[]}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const pathname = usePathname()

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
          <TableHeader className=" text-xs ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="" >
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

      <div className="flex items-center justify-between space-x-2 p-4">
          <PageContainer page={pathname}  table={table} />
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
