"use client";

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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import pdf from "@/assets/pdf.png";
import excel from "@/assets/excel.png";
import xls from "@/assets/xls.png";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import usePaginationStore from "@/lib/usePage";
import { useSession } from "next-auth/react";

// const data: Payment[] = [
//   {
//     id: "m5gr84i9",
//     category: 'Pricing',
//     dataset: "Jan 1 – 7 Petroleum Motor Spirit Prices by State: Daily",
//     period: "Weekly",
//     product: "PMS",
//     source: "Nigerian Bureau of Statistics",
//     year: "2019"
//   },
//   {
//     id: "m5e84i9",
//     category: 'Pricing',
//     dataset: "Jan 1 – 7 Petroleum Motor Spirit Prices by State: Daily",
//     period: "Weekly",
//     product: "PMS",
//     source: "Nigerian Bureau of Statistics",
//     year: "2019"
//   },
//   {
//     id: "m5grsi9",
//     category: 'Pricing',
//     dataset: "Jan 1 – 7 Petroleum Motor Spirit Prices by State: Daily",
//     period: "Weekly",
//     product: "Gas",
//     source: "Nigerian Bureau of Statistics",
//     year: "2019"
//   },
// ]

export type Payment = {
  id: string;
  category: string;
  year: string;
  source: string;
  period: string;
  weekStartDate: string;
  weekEndDate: string;
};

export function RawDataTable({ data, page }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const router = useRouter();
  const { currentPage, goToNextPage, goToPreviousPage } = usePaginationStore();

  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const columns: ColumnDef<Payment>[] = [
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
      header: "Category",
      cell: ({ row }) => <div className="">{row.getValue("category")}</div>,
    },
    {
      accessorKey: "dataset",
      header: "Dataset",
      cell: ({ row }) => {
        const data = row.original;

        const formatDateRange = (startDate: string, endDate: string) => {
          const options: any = { month: "long", day: "numeric" };
          const formattedStartDate = new Date(startDate).toLocaleDateString(
            "en-US",
            options
          );
          const formattedEndDate = new Date(endDate).toLocaleDateString(
            "en-US",
            options
          );

          return `${formattedStartDate} to ${formattedEndDate}`;
        };
        const formattedDateRange = formatDateRange(
          data.weekStartDate,
          data.weekEndDate
        );

        return <div className="capitalize">{formattedDateRange}</div>;
      },
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
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Year <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase ml-4">{row.getValue("year")}</div>
      ),
    },
    {
      accessorKey: "source",
      header: "Source",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("source")}</div>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      header: ({}) => <p className="text-right">Actions</p>,
      cell: ({ row }) => {
        const action = row.original;
        const handleFetchClick = async (flag: string, token: any) => {
          try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const requestOptions: any = {
              method: "POST",
              headers: myHeaders,
              redirect: "follow",
            };

            const response = await fetch(
              `https://petrodata.zainnovations.com/api/v1/petro-data/raw/actions?flag=${flag}&weekStartDate=${action.weekStartDate}&weekEndDate=${action.weekEndDate}`,
              requestOptions
            );
            const result = await response.json();
            console.log(result);

            if (result.status && result.data.url) {
              // Create a temporary link to download the file
              const downloadLink = document.createElement("a");
              downloadLink.href = result.data.url;
              downloadLink.target = "_blank";
              downloadLink.download = `downloaded_file_${flag}.${flag}`;
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);

              toast({
                title: "Success",
                description: "File downloaded successfully",
              });
            } else {
              console.error("Failed to retrieve file URL");
            }
            if (response?.status === 403) {
              toast({
                title: "An error has occured",
                description: `${result?.message || "Cannot fetch data"}`,
                variant: "destructive",
              });
            }
          } catch (error) {
            console.error("Error:", error);
          }
        };

        return (
          <div className="flex items-center gap-2 justify-end">
            <Button
              onClick={() => handleFetchClick(`csv`, token)}
              className="cursor-pointer hover:scale-95 transition-all bg-transparent"
              size={"icon"}
            >
              <Image src={xls} alt="xls" width={20} height={20} />
            </Button>
            <Button
              onClick={() => handleFetchClick(`pdf`, token)}
              // onClick={() => {
              //   toast({
              //     title: "Cannot download",
              //     variant: "destructive",
              //     description: "PDF Version Unavailable",
              //   })
              // }}
              className="cursor-pointer hover:scale-95 transition-all bg-transparent"
              size={"icon"}
            >
              <Image src={pdf} alt="pdf" width={20} height={20} />
            </Button>
            <Button
              onClick={() => handleFetchClick(`xlsx`, token)}
              className="cursor-pointer hover:scale-95 transition-all bg-transparent"
              size={"icon"}
            >
              <Image src={excel} alt="excel" width={20} height={20} />
            </Button>
          </div>
        );
      },
    },
  ];

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
  });

  const handleFetchClick = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `https://petrodata.zainnovations.com/api/v1/petro-data/export`,
        requestOptions
      );
      const result = await response.json();
      console.log(result);

      if (result.status && result.data.url) {
        // Create a temporary link to download the file
        const downloadLink = document.createElement("a");
        downloadLink.href = result.data.url;
        downloadLink.target = "_blank";
        downloadLink.download = `downloaded_file_export_petrodata.csv`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        toast({
          title: "Success",
          description: "File downloaded successfully",
        });
      } else {
        console.error("Failed to retrieve file URL");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full my-4">
      <div className="flex items-center  justify-between">
        <div></div>
        <Button
          className="text-green-600 font-bold bg-transparent"
          onClick={handleFetchClick}
        >
          Export
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-sky-300 text-black  capitalize">
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-black font-medium capitalize"
                    >
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
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows?.map((row) => (
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
      <div className="flex-1 text-sm text-muted-foreground mt-2">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex flex-1 w-[100px] items-center text-sm font-medium">
          Page {page} of 21
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              goToPreviousPage();
              router.push(`/dashboard/table/${currentPage}`);
            }}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              goToNextPage();
              router.push(`/dashboard/table/${currentPage}`);
            }}
            disabled={page === 21}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
