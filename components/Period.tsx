"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

import qs from "query-string";
import { cn } from "@/lib/utils";

interface PeriodTabProps {
  label: string;
  selected?: boolean;
  page: any;
}

const Periodtab: React.FC<PeriodTabProps> = ({ page, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      period: label,
    };

    if (params?.get("period") === label) {
      delete updatedQuery.period;
    }

    const url = qs.stringifyUrl(
      {
        url: `/dashboard/analytics/${page}`,
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );
    router.push(url);
  }, [label, router, params, page]);
  return (
    <div
      onClick={handleClick}
      className={cn("cursor-pointer", selected && "font-bold")}
    >
      {label}
    </div>
  );
};

export default Periodtab;
