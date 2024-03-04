import * as React from "react";

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

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { toast, useToast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import useDocumentView from "@/lib/useDocumentView";

import { useRouter } from "next/navigation";
import useLoading from "@/lib/useLoading";
import { useState } from "react";
import { PlainTransportDekApi } from "@/utils/axios";
import { useSession } from "next-auth/react";

export type Payment = {
  id: string;
  amount: number;
  fname: string;
  lname: string;
  email: string;
  phoneNumber: number;
  clientAssignment: string;
  region: string;
  position: string;
  tenure: string;
  age: number;
  salary: number;
  bonus: number;
  status: string;
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "fillingStation",
    header: ({}) => {
      return <div className="flex gap-1 items-center">Filling Station</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="cursor-pointer flex gap-2 items-center">
          {row.getValue("fillingStation")}
        </div>
      );
    },
  },
  {
    accessorKey: "state",
    header: ({}) => {
      return <div className="flex gap-2 items-center">State</div>;
    },
    cell: ({ row }) => {
      return <div className="">{row.getValue("state")}</div>;
    },
  },

  {
    accessorKey: "product",
    header: ({}) => {
      return <div className="flex items-center gap-2">Product</div>;
    },
    cell: ({ row }) => {
      const batch = row.original;

      const productNames = Object.keys(batch.products);

      return (
        <div className="text-xs ">
          {productNames.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({}) => {
      return <div className="flex items-center gap-2">Price</div>;
    },
    cell: ({ row }) => {
      const batch = row.original;
      const numericalValues = Object.values(batch.products).map(Number);

      return (
        <div className="capitalize text-xs">
          {numericalValues.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "supportingDocument",
    header: ({}) => {
      return <div className="flex items-center gap-2">Supporting Document</div>;
    },
    cell: ({ row }) => {
      const entry = row.original;

      return <View entry={entry} />;
    },
  },
];

const View = ({ entry }: any) => {
  const { onOpen, setData } = useDocumentView();

  const onclickSet = () => {
    setData(entry.supportingDocument);
    onOpen();
  };
  return (
    <div className="capitalize text-xs">
      <Button variant={"link"} onClick={onclickSet} className="text-sky-600">
        View
      </Button>
    </div>
  );
};

export function Batch({ data, setBatchData }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [globalFilter, setGlobalFilter] = React.useState("");

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

  const { data: session } = useSession();
  const router = useRouter();
  const loading = useLoading();

  const deleteFromBatch = (idToDelete: any) => {
    // Filter out the item with the specified idToDelete
    const updatedItems = data.filter((item: any) => item !== idToDelete);

    // Update the state with the filtered array
    setBatchData(updatedItems);
  };

  async function onSubmit() {
    loading.onOpen();

    const payload = {
      dataEntry: data,
    };

    await PlainTransportDekApi.post(
      "data-entry/upload",
      JSON.stringify(payload),
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
      .then(() => {
        toast({
          title: "New Data Entry Added",
          description: "Done",
        });
        router.refresh();
        window.location.reload();
      })
      .catch((error: any) => {
        console.error("Error:", error);
        toast({
          variant: "destructive",
          title: "Entry Error",
          description: `${error.response.data.message}`,
        });
      })
      .finally(() => {
        loading.onClose();
      });
  }

  return (
    <div className="px-2 h-full">
      <div className="rounded-md border h-full">
        <Table className="">
          <TableHeader className=" text-xs text-">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-">
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
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                    <Button
                      onClick={() => deleteFromBatch(row.original)}
                      className="mt-6 justify-center flex items-center"
                    >
                      Delete
                    </Button>
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

        <div className="flex justify-between items-center w-full">
          <Button onClick={() => setBatchData([])} variant={"link"}>
            Clear All
          </Button>
          <Button onClick={onSubmit} className="flex-1h">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
