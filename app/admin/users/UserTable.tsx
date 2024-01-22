
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


import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

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


import {useSearchParams} from "next/navigation"

import { Input } from "@/components/ui/input"


import { useSession } from "next-auth/react";
import useLoading from "@/lib/useLoading";
import useDocumentView from "@/lib/useDocumentView";
import useCreate from "@/lib/useCreate";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { SupsendUserModal } from "@/components/SuspendUser"
import { VerifyModal } from "@/components/VerifyModal"
import useSuspend from "@/lib/useSuspend"
import useVerify from "@/lib/useVerify"
import useDelete from "@/lib/useDelete"
import useEditUser from "@/lib/useEdit"

import {PageContainer} from "@/components/PageContainer"
import { DeletUserModal } from "@/components/DeleteUser"


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
        id: "select",
        header: "ID",
        cell: ({ row }) => {
            const data = row.original
            return (
                <div className="flex gap-1 items-center">
                   {/* <Avatar className="w-8">
                          <AvatarImage src={data?.avatar} alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                      </Avatar> */}
                      <p>{data.pdaId}</p>
                </div>
              )
        },
        enableSorting: false,
        enableHiding: false,
      },    
  {
    accessorKey: "firstName",
    header: ({}) => {
        return (
            <div className="flex gap-1 items-center">
            First Name
            </div>
        )
    },
    cell: ({ row }) => {

      return (
        <div className="cursor-pointer flex gap-2 text-xs items-center">
          {row.getValue("firstName")}
        </div>
      )
    }, 
  },
  {
    accessorKey: "lastName",
    header: ({}) => {
        return (
            <div className="flex gap-2 items-center"> 
             Last Name
            </div>
        )
    },    cell: ({ row }) => {
          return (
            <div className="text-xs">
              {row.getValue("lastName")}
            </div>
            )
        },
  },
  {
    accessorKey: "email",
    header: ({  }) => {
      return (
        <div className="gap-2 flex items-center">
            Email
        </div>
      )
    },
    cell: ({ row }) =>  {
      return (
        <div className="text-xs text-[#0A98A9] font-medium">
              {row.getValue("email")}
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: ({  }) => {
      return (
        <div className="flex items-center gap-2">
            Status
          
        </div>
      )
    },
    cell: ({ row }) => <div className="capitalize text-xs ">
        {row.getValue("status")}
    </div>,
  },
  {
    accessorKey: "createdBy",
    header: ({  }) => {
      return (
       <div className="flex items-center gap-2">
            Created By
         
       </div>
      )
    },
    cell: ({ row }) =>  {
      return (
        <div className="capitalize text-xs">
        {row.getValue("createdBy")}
        </div>
      )
    }
  },

  {
    accessorKey: "dateCreated",
    header: ({  }) => {
      return (
       <div className="flex items-center gap-2">
            Date Created 
         
       </div>
      )
    },
    cell: ({ row }) =>  {
      return (
        <div className="capitalize text-xs">
            {row.getValue("dateCreated")}
        </div>
      )
    }
  },
  {
    accessorKey: "lastLoggedIn",
    header: ({  }) => {
      return (
       <div className="flex items-center gap-2">
           Last Login
         
       </div>
      )
    },
    cell: ({ row }) =>  {
      return (
        <div className="capitalize text-xs">
            {row.getValue("lastLoggedIn")}
        </div>
      )
    }
  },
  {
    accessorKey: "duration",
    header: ({  }) => {
      return (
       <div className="flex items-center gap-2">
          Duration
         
       </div>
      )
    },
    cell: ({ row }) =>  {
      return (
        <div className="capitalize text-xs">
            {row.getValue("duration")}
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



const Actions = (entry: any) => {
  const remove = useDelete()
  const verify = useVerify()
  const reject = useSuspend()
  const session = useSession()
  const edit = useEditUser()
  const loading = useLoading()




  const deleteUser = async (id: string) => {
    loading.onOpen()


    try {
        // Your API call here
        // Example:
        const response = await fetch(`https://petrodata.zainnovations.com/api/v1/user/delete?id=${id}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${session.data?.user.accessToken}`,
          },
        });
        const data = await response.json();
        toast({
          description: `User is succesfully deleted!`,
          })
        // Simulating successful approval
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
        toast({
          variant: "destructive",
          title: `Suspension not done!`,
          description: `Error occured`,
          })
      } finally {
        loading.onClose()
      }
  };

  const suspendUser = async (id: string) => {
    loading.onOpen()


    try {
        // Your API call here
        // Example:
        const response = await fetch(`https://petrodata.zainnovations.com/api/v1/user/suspend?id=${id}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${session.data?.user.accessToken}`,
          },
        });
        const data = await response.json();
        toast({
          title: `Suspension!`,
          description: `User is suspended!`,
          })
        // Simulating successful approval
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
        toast({
          variant: "destructive",
          title: `Suspension not done!`,
          description: `Error occured`,
          })
      } finally {
        loading.onClose()
      }
  };

  const verifyUser = async (id: string) => {
    loading.onOpen()


    try {
        // Your API call here
        // Example:
        const response = await fetch(`https://petrodata.zainnovations.com/api/v1/user/account/verify?id=${id}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.data?.user.accessToken}`,
          },
        });
        const data = await response.json();
        toast({
          description: `User is verified!`,
          })
        // Simulating successful approval
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
        toast({
          variant: "destructive",
          title: `Verification not done!`,
          description: `Error occured`,
          })
      } finally {
        loading.onClose()
      }
  };

  return (
   <div className="flex gap-1 justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent  align="end">
            <DropdownMenuItem className="cursor-pointer text-green-700 hover:bg-green-600 hover:text-white"
              onClick={() => {
                verify.setId(entry.entry._id);
                verify.onOpen()
              }}
            >
              Verify
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer"
                onClick={() => {
                    edit.setId(entry.entry._id);
                    edit.setData({...entry.entry, role: edit.tab});
                    edit.onOpen()
                }}
                >
                    Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem  className="cursor-pointer"
                onClick={() => {
                    reject.setId(entry.entry._id);
                    reject.onOpen()
              }}
                >
                Suspend</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-700 over-bg-red-600 hover:text-white cursor-pointer"
              onClick={() => {
                remove.setId(entry.entry._id);
                remove.onOpen()
              }}
            >
              Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

   
      {
        remove.isOpen && (
          <DeletUserModal onCancel={remove.onClose} onSubmit={() => deleteUser(remove.id)}/>
        )
      }
      {
        reject.isOpen && (
          <SupsendUserModal onCancel={reject.onClose} onSubmit={() => suspendUser(reject.id)}/>
        )
      }
      {
        verify.isOpen && (
          <VerifyModal onCancel={verify.onClose} onSubmit={() => verifyUser(verify.id)}/>
        )
      }
  </div>
  )
}



export function UsersTable({data}: {data: Payment[]}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})


  const [globalFilter, setGlobalFilter] = React.useState('')

  const { onOpen } = useCreate()

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
        globalFilter,
      },
    })
    const searchParams  = useSearchParams();
    const rows = searchParams?.get('rows');


    const periods = [
      {
          name: "10",
          period: "10",
      },
      {
          name: "20",
          period: "20",
      },
      {
          name: "30",
          period: "30",
      },
  ]

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
            <Button onClick={onOpen}>
                Create User
            </Button>
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

      <div className="flex items-center justify-end space-x-2 p-4">
        <div className="flex-1 text-sm text-muted-foreground">
         <PageContainer page="/admin/users" table={table} />
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
