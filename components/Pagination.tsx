"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'

import qs from 'query-string'
import { cn } from '@/lib/utils'


interface PeriodTabProps {
    label: string
    selected?: boolean
    page: string
}


export const Pagnation:React.FC<PeriodTabProps> = ({ label, selected, page})=> {
    const router = useRouter()
    const params = useSearchParams()

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            rows: label
        } 

        if(params?.get('rows') === label){
            delete updatedQuery.rows;
        }

        const url = qs.stringifyUrl({
            url: page,
            query: updatedQuery
        }, {
            skipNull: true
        })
        router.push(url)
    },[label, router, params, page])

    
    return (
        <div onClick={handleClick} className={cn('cursor-pointer p-2', selected && 'font-bold bg-accent')}>
        {label}
        </div>
    )
}

