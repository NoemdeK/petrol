"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { Pagnation } from "./Pagination";

export const PageContainer = ({ page, table, limit, setLimit }: any) => {
  const searchParams = useSearchParams();
  const rows = searchParams?.get("rows");
  const pathname = usePathname();

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
  ];
  return (
    <div className="flex gap-4 items-center">
      <p className="font-medium text-xs md:text-sm ">Rows per page</p>

      <Pagnation
        page={pathname}
        table={table}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  );
};
