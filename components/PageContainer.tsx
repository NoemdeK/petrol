"use client"
import {useSearchParams} from "next/navigation"
import {Pagnation} from './Pagination'

export const PageContainer = ({page}: any) => {
    const searchParams  = useSearchParams();
    const rows = searchParams?.get('rows');


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
  ]
    return (
        <div className="flex gap-1 items-center">
        <p className="font-medium text-sm">Rows per page</p>
      {
        periods.map((item) => (
            <Pagnation 
                key={item.name}
                label={item.period}
                selected={rows === item.period}
                page={page}  
            />
        ))
    }
      </div>
    )
}