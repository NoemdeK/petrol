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

const SelectUsers = ({user}: any) => {
    const params  = useSearchParams();
    const userParams = params?.get('user');
    const router = useRouter()
    const [label, setLabel] = useState("")
    // const pathname = usePathname();



    const handleClick = useCallback((value: string) => {
        setLabel(value);
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            user: value
        } 

        if(params?.get('datePeriod') === value){
            delete updatedQuery.user;
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
         <Select onValueChange={handleClick} defaultValue={`${userParams}` || ""}>
            <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
            {
                user.map((item: any) => (
                    <SelectItem key={item._id}  value={item._id}>{item.firstName} {item.lastName}</SelectItem>
                ))
            }
            </SelectContent>
        </Select>
    </div>
  )
}

export default SelectUsers