"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const TabData = () => {
    const pathname = usePathname()

    const isMainPage = pathname === '/analyst/history';
    const isMainPageData = pathname === '/analyst/data';


    if(!isMainPage && !isMainPageData){
      return null
    }

  return (
    <div>
        <div className='w-full flex items-center justify-between text-center my-4'>
        <Link href={"/analyst/data"} className={cn('p-4 text-center w-full font-medium border', pathname === "/analyst/data" ? "bg-accent" : "bg-white")}>
            Field Data
        </Link>
        <Link href={"/analyst/history"} className={cn('p-4 text-center w-full font-medium border', pathname === "/analyst/history" ? "bg-accent" : "bg-white")}>
            ICE Data    
        </Link>
        </div>
    </div>
  )
}

export default TabData