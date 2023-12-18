"use client"

import React from 'react'
import Periodtab from './Period'
import { useSearchParams } from 'next/navigation';

const MainPeriod = ({page}: any) => {
    const searchParams  = useSearchParams();
    const period = searchParams?.get('period');
    // const pathname = usePathname();
    const periods = [
        {
            name: "1W",
            period: "1W",
        },
        {
            name: "3M",
            period: "3M",
        },
        {
            name: "6M",
            period: "6M",
        },
        {
            name: "YTD",
            period: "YTD",
        },
        {
            name: "1Y",
            period: "1Y",
        },
        {
            name: "5Y",
            period: "5Y",
        },
        {
            name: "Max",
            period: "MAX",
        },
    ]
  return (
    <div className='space-x-4 flex'>
        {
            periods.map((item) => (
                <Periodtab 
                    page={page}
                    key={item.name}
                    label={item.period}
                    selected={period === item.period}
                />
            ))
        }
    </div>
  )
}

export default MainPeriod