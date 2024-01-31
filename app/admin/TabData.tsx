"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const TabData = () => {
    const pathname = usePathname()
  return (
    <div>
        <div className='w-full flex items-center justify-between text-center my-4'>
        <Link href={"/admin"} className={cn('p-4 text-center w-full font-medium border', pathname === "/admin" ? "bg-accent" : "bg-white")}>
            Field Data
        </Link>
        <Link href={"/admin/data"} className={cn('p-4 text-center w-full font-medium border', pathname === "/admin/data" ? "bg-accent" : "bg-white")}>

            ICE Data    
        </Link>
        </div>
    </div>
  )
}

export default TabData