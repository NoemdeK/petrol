"use client"
import React, { useCallback, useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

const Filter = () => {
    const [date, setDate] = useState("")
    const [dateTwo, setDateTwo] = useState("")

    const router = useRouter()
    const params = useSearchParams()
    const pathname = usePathname()


    

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            date: `filterStartDate=${date}`,
            endDate: `filterEndDate=${dateTwo}`
        } 

        if(params?.get('date') === `filterStartDate${date}&filterEndDate=${dateTwo}`){
            delete updatedQuery.period;
        }

        const url = qs.stringifyUrl({
            url: pathname,
            query: updatedQuery
        }, {
            skipNull: true
        })
        router.push(url)
    },[date, dateTwo, router, params, pathname])

    const handleClear = useCallback(() => {
        // Clear all search parameters
        router.push(pathname);
        setDateTwo('')
        setDate('')
    }, [router, pathname]);


  return (
    <div className='flex gap-4 items-center mt-2 justify-end ml-auto flex-wrap'>
        <div  className='flex gap-2 items-center'>
            <Label>From</Label>
            <Input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className='flex gap-2 items-center'> 
            <Label>To</Label>
            <Input type='date' value={dateTwo} onChange={(e) => setDateTwo(e.target.value)} />
        </div>
        <div className='space-x-2'>
            <Button onClick={handleClick} disabled={!date || !dateTwo ? true : false}>
                Run
            </Button>
            <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
        </div>
    </div>
  )
}

export default Filter