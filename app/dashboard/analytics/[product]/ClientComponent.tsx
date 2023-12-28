"use client"

import { Region } from '@/components/SelectRegions';
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import Select, { ActionMeta, MultiValue } from 'react-select';
import { setSelectedRegions } from '@/redux/prices.slice';
import Link from 'next/link';
import NewSelectProduct from '@/components/SelectProductNew';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fetchData } from '@/utils/axios';


interface Dataset {
    label: string;
    value: string;
    data?: number[];
  }

  
const ClientComponent = ({stats, page, overall, recent} :any) => {
  const [isClient, setIsClient] = useState(false)
 

    const { selectedRegions, product } = useSelector(
        (state: RootState) => state.prices
      );
  const dispatch = useDispatch<AppDispatch>();

  

  // const { data: stats } = fetchData('/petro-data/analysis/price-percentage-change');

      const handleRegionSelectChange = (
        selectedRegions: MultiValue<Dataset>,
        actionMeta: ActionMeta<Dataset>
      ) => {
        // setSelectedRegionss(selectedRegions as Dataset[] | null);
        dispatch(setSelectedRegions(selectedRegions as Dataset[] | null));
      };

      
      function getProductData(productType: string, data: any) {
        switch (productType) {
          case 'AGO':
            return data?.AGOData;
          case 'DPK':
            return data?.DPKData;
          case 'LPG':
            return data?.LPGData;
          case 'PMS':
            return data?.PMSData;
          case 'ICE':
              return data?.ICEData;
          default:
            return data?.PMSData; // Handle unknown product types
        }
      }
      const productData = getProductData(product, stats?.data);


      const isNegativeChange = parseFloat(overall) < 0;
      const backgroundColor = isNegativeChange ? 'bg-red-400' : 'bg-green-600';

      const isNegativeChangez = parseFloat(recent) < 0;
      const backgroundColorz = isNegativeChangez ? 'text-red-500' : 'text-green-600';



      useEffect(() => {
        setIsClient(true)
      }, [])

      if(!isClient){
        return null
      }
    
  return (
    <div>
        <div className='flex flex-col justify-between md:items-end gap-2 md:flex-row'>
              <div className=''>
                <p className='text-accent-foreground text-xs mb-3'>Home &gt; {page || 'PMS'}</p>
                <p className='whitespace-nowrap text-accent-foreground'>{page || 'PMS'}</p>
              </div>
              <div className='flex  items-end gap-1 flex-col md:flex-row'>
                <div className='w-full items-start flex flex-col justify-start  gap-2'>
                  <p className='text-[12px] font-semibold'>Product</p>
                  <NewSelectProduct page={page} />
                </div>

                <div className='w-full items-start flex flex-col justify-start  gap-2 '>
                  <p className='text-[12px] font-semibold'>Region</p>
                <Region selectedNames={selectedRegions} setSelectedNames={handleRegionSelectChange} />
                </div>
              </div>
            </div>
        <hr className='h-2 my-2' />

        <div className=' w-full h-20 p-2'>
              <div className='flex items-center gap-2 md:gap-4'>
                <p className='text-2xl font-medium'> ₦{productData?.currentPrice}</p>
                <div className='flex'>
                  <p className={cn(' font-normal px-3 h-fit rounded-md text-white  text-sm', backgroundColor)}>
                    {overall} <span className='text-xs'>%</span>
                  </p>
                  <p className={cn(' font-normal px-3 rounded-md  text-sm whitespace-nowrap', backgroundColorz)}>
                   {recent}
                  </p>
                </div>
              </div>
              <p className='text-accent-foreground text-xs'>
                Closed: {productData?.closedDate ? productData?.closedDate : ""}
              </p>
            </div>
    </div>
  )
}

export default ClientComponent