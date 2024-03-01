"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";

import qs from "query-string";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ValueError } from "sanity";

interface PeriodTabProps {
  page: string;
  table?: any;
  limit?: any;
  setLimit?: any;
}

export const Pagnation: React.FC<PeriodTabProps> = ({
  table,
  page,
  limit,
  setLimit,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const [rows, setRows] = useState("10");

  const handleClick = useCallback(
    (value: any) => {
      setLimit ? setLimit(value) : null;
      let currentQuery = {};
      table.setPageSize(Number(value));
      setRows(value);

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        rows: value,
      };

      if (params?.get("rows") === value) {
        delete updatedQuery.rows;
      }

      const url = qs.stringifyUrl(
        {
          url: page,
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );
      router.push(url);
    },
    [router, params, page]
  );

  return (
    // <div onClick={handleClick} className={cn('cursor-pointer p-2', selected && 'font-bold bg-accent')}>
    // {label}
    // </div>
    <div>
      <Select onValueChange={handleClick} defaultValue={rows}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Show 10">Show {rows}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {[10, 20, 30].map((item: any) => (
            <SelectItem key={item} value={item}>
              Show {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
