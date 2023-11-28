import React from 'react'
import { ArrowDown, ArrowUp, BarChart4, Code, Database,  Settings, VideoIcon } from "lucide-react";
import { cn } from '@/lib/utils';


const HeaderStat = () => {
    const data = [
        {
          label: 'ICE Brent',
          label2: 'Crude',
          icon:  ArrowUp,
          color: "text-green-700 bg-green-100",
          num: '+0.33%',
          num2: '+111.12',
          text: "text-green-700"

        },
        {
            label: 'Premium',
            label2: 'Motor Spirit',
            icon: ArrowUp,
            color: "text-green-700 bg-green-100",
            num: '+0.060%',
            num2: '+2.12', 
            text: "text-green-700"

         },
        {
          label: 'Automative',
          label2: 'Gas Oil',
          icon: ArrowDown,
          color: "text-red-700 bg-red-100",
          num: '-0.11%',
          num2: '-11.96',
          text: "text-red-700"

        },
        {
            label: 'Dual Purpose',
            label2: 'Kerosene',
            icon: ArrowUp,
            color: "text-green-700 bg-green-100",
            num: '+0.67%',
            num2: '+11.96',
            text: "text-green-700"

          },
          {
            label: 'Liquefied',
            label2: 'Petroleum Gas',
            icon: ArrowDown,
            color: "text-red-700 bg-red-100",
            num: '-2.66%',
            num2: '-0.34',
            text: "text-red-700"
          },
      ];
  return (
    <div className='bg-slate-400/10 p-4 rounded-md'>
        <section className='flex  gap-4 overflow-x-scroll'>
            {
                data.map((item, i) => (
                    <div key={i} className='p-2 bg-white flex gap-2 rounded-md w-56'>
                        <div className={cn("p-2 rounded-md flex justify-center items-center", item.color )}>
                            <item.icon />
                        </div>
                        <div className='w-full'>
                            <h6 className='font-bold text-sm'>{item.label}</h6>
                            <h6 className='font-bold text-sm'>{item.label2}</h6>
                        </div>
                        <div className={cn('ml-auto text-right font-medium', item.text)}>
                            <p className='text-sm'>{item.num}</p>
                            <p className='text-sm'>{item.num2}</p>
                            
                        </div>
                    </div>
                ))
            }
        </section>
    </div>
  )
}

export default HeaderStat