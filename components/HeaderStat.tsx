import React from 'react'
import { ArrowDown, ArrowUp, BarChart4, Code, Database,  Settings, VideoIcon } from "lucide-react";
import { cn } from '@/lib/utils';


const HeaderStat = ({data}:any) => {
    function getFullName(productType:string) {
        if (productType === 'AGOData') {
          return 'Automotive Gas Oil';
        } else if (productType === 'PMSData') {
          return 'Premium Motor Spirit';
        } else if (productType === 'DPKData') {
          return 'Dual Purpose Kerosene';
        } else if (productType === 'LPGData') {
          return 'Liquefied Petroleum Gas';
        } else {
          // Handle unknown productType
          return 'Unknown Product';
        }
      }
    const renderProduct = (productType:any, data:any) => {
        const isNegativeChange = parseFloat(data.overallPricePercentChange) < 0;
        const backgroundColor = isNegativeChange ? 'red' : 'transparent';
      
        return (
          <div key={productType} className='p-2 bg-white flex gap-2 rounded-md min-w-56 w-full cursor-pointer'>
            <div className='flex gap-2'>
                {
                    isNegativeChange ? 
                    <div className='bg-red-200 flex items-center w-10 rounded-sm text-center justify-center text-red-600'>
                        <p className=''>▼</p>
                    </div>
                    :
                    <div className='bg-green-200 flex items-center w-10 rounded-sm text-center justify-center text-green-600'>
                        <p className='rotate-180 text-green-600'>▼</p>
                    </div>
                }
                <p className='text-sm font-semibold w-32'>
                    {getFullName(productType)}
                </p>
            </div>
           <div className='flex flex-col ml-auto'>
                <p>{data.overallPricePercentChange}</p>
                <p> {data.recentPricePercentChange}</p>
           </div>
          </div>
        );
      };
  return (
    <div className='bg-slate-400/10 p-4 rounded-md'>
        <section className='flex  gap-4 overflow-x-scroll'>
            {Object.entries(data).map(([productType, datas]) => (
            renderProduct(productType, datas)
        ))}
        </section>
    </div>
  )
}

export default HeaderStat

// {
//     data.map((item, i) => (
//         <div key={i} className='p-2 bg-white flex gap-2 rounded-md min-w-56 w-full'>
//             <div className={cn("p-2 rounded-md flex justify-center items-center", item.color )}>
//                 <item.icon />
//             </div>
//             <div className='w-full'>
//                 <h6 className='font-semibold text-sm'>{item.label}</h6>
//                 <h6 className='font-semibold text-sm'>{item.label2}</h6>
//             </div>
//             <div className={cn('ml-auto text-right font-medium', item.text)}>
//                 <p className='text-sm'>{item.num}</p>
//                 <p className='text-sm'>{item.num2}</p>
                
//             </div>
//         </div>
//     ))
// }