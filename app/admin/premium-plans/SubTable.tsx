import React, { useEffect } from "react";

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
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePathname, useRouter } from "next/navigation";
import { format } from "date-fns";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: ({}) => {
      return <div className="flex gap-1 items-center">ID</div>;
    },
    cell: ({ row }) => {
      console.log(row);
      return (
        <div className="cursor-pointer flex gap-2 text-xs items-center">
          {row.original.userId}
        </div>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: ({}) => {
      return <div className="flex gap-1 items-center">First Name</div>;
    },
    cell: ({ row }) => {
      console.log(row);
      return (
        <div className="cursor-pointer flex gap-2 text-xs items-center">
          {row.original.firstName}
        </div>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: ({}) => {
      return <div className="flex gap-1 items-center">Last Name</div>;
    },
    cell: ({ row }) => {
      console.log(row);
      return (
        <div className="cursor-pointer flex gap-2 text-xs items-center">
          {row.original.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({}) => {
      return <div className="flex gap-1 items-center">Email Address</div>;
    },
    cell: ({ row }) => {
      console.log(row);
      return (
        <div className="cursor-pointer flex gap-2 text-xs items-center">
          {row.original.clientEmail}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({}) => {
      return <div className="flex gap-1 items-center">Subscription Status</div>;
    },
    cell: ({ row }) => {
      console.log(row);
      return (
        <div className="cursor-pointer flex gap-2 text-xs items-center">
          {row.original.subscriptionStatus.charAt(0).toUpperCase() +
            row.original.subscriptionStatus.slice(1)}
        </div>
      );
    },
  },
  {
    accessorKey: "plan",
    header: ({}) => {
      return <div className="flex gap-1 items-center">Premium Plan </div>;
    },
    cell: ({ row }) => {
      console.log(row);
      return (
        <div className="cursor-pointer flex gap-2 text-xs items-center">
          {row.original.premiumPlan.charAt(0).toUpperCase() +
            row.original.premiumPlan.slice(1)}
        </div>
      );
    },
  },
  {
    accessorKey: "paymentDate",
    header: ({}) => {
      return <div className="flex gap-1 items-center">Payment Date </div>;
    },
    cell: ({ row }) => {
      console.log(row);
      return (
        <div className="cursor-pointer flex gap-2 text-xs items-center">
          {format(new Date(row.original.nextRenewalDate), "dd/MM/yyyy")}
        </div>
      );
    },
  },
];
const SubTable = ({ data, searchParams, value }: any) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
  });

  return (
    <div>
      {" "}
      <div className="rounded-md border h-full">
        <Table className="">
          <TableHeader className=" text-xs ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="">
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
  );
};

export default SubTable;
