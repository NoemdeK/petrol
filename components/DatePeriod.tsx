"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react'

import qs from 'query-string'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const DatePeriod = () => {
    const params  = useSearchParams();
    const datePeriod = params?.get('datePeriod');
    const router = useRouter()
    const [label, setLabel] = useState("")
    // const pathname = usePathname();
    const periods = [
        {
            name: "Today",
            period: "today",
        },
        {
            name: "Yesterday",
            period: "yesterday",
        },
        {
            name: "This Week",
            period: "this_week",
        },
        {
            name: "This Week-to-date",
            period: "this_week_to_date",
        },
        {
            name: "This Month",
            period: "this_month",
        },
        {
            name: "This Month-to-date",
            period: "this_month_to_date",
        },
        {
            name: "This Quarter",
            period: "this_quarter",
        },
        {
            name: "This Quarter-to-date",
            period: "this_quarter_to-date",
        },
        {
            name: "This Year",
            period: "this_year",
        },
        {
            name: "This Year-to-date",
            period: "this_year_to-date",
        },
    ]


    const handleClick = useCallback((value: string) => {
        setLabel(value);
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            datePeriod: value
        } 

        if(params?.get('datePeriod') === value){
            delete updatedQuery.datePeriod;
        }

        const url = qs.stringifyUrl({
            url: `/admin/audit-log`,
            query: updatedQuery
        }, {
            skipNull: true
        })
        router.push(url)
    },[ router, params, label])

  


  return (
    <div>
         <Select onValueChange={handleClick} >
            <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Select a period" />
            </SelectTrigger>
            <SelectContent>
            {
                periods.map((period) => (
                    <SelectItem key={period.period}  value={period.period}>{period.name}</SelectItem>
                ))
            }
            </SelectContent>
        </Select>
    </div>
  )
}

export default DatePeriod