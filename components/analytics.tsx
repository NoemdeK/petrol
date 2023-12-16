'use client';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import Select, { ActionMeta, MultiValue } from 'react-select';
import { Separator } from '@/components/ui/separator';
import { setSelectedRegions } from '../redux/prices.slice';
import { regionalOptions } from '@/data';
import FuelCharts from './fuelCharts';
import HeaderStat from './HeaderStat';
import SelectProduct from './SelectProduct';
import { useEffect, useState } from 'react';
import { Region } from './SelectRegions';
import News from '@/app/dashboard/analytics/News';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { fetchData } from '@/utils/axios';
import { cn } from '@/lib/utils';

interface Dataset {
  label: string;
  value: string;
  data?: number[];
}

export const Analytics = () => {

  const searchParams  = useSearchParams();
  const productstat = searchParams?.get('product');

  const [mounted, setMounted] = useState(false)
  const { selectedRegions, product } = useSelector(
    (state: RootState) => state.prices
  );

  const { data: stats } = fetchData('/petro-data/analysis/price-percentage-change');


  const dispatch = useDispatch<AppDispatch>();

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
      default:
        return data?.PMSData; // Handle unknown product types
    }
  }
  const productData = getProductData(productstat!, stats?.data);

  const isNegativeChange = parseFloat(productData?.overallPricePercentChange) < 0;
  const backgroundColor = isNegativeChange ? 'bg-red-400' : 'bg-green-600';

  const isNegativeChangez = parseFloat(productData?.recentPricePercentChange) < 0;
  const backgroundColorz = isNegativeChangez ? 'text-red-500' : 'text-green-600';


  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted){
    return null
  }

  return (
    <main className='flex min-h-screen flex-col items-end justify-between  bg-white'>
      <div className=' flex flex-col  min-h-screen w-full px-4 '>
        <div className='grid grid-cols-1 lg:grid-cols-12 w-full gap-2  md:gap-4 flex-1 p-4'>
          <div className='flex flex-col flex-1 w-full md:col-span-7 '>
            <div className='flex flex-col justify-between md:items-end gap-2 md:flex-row'>
              <div className=''>
                <p className='text-slate-400 text-xs mb-3'>Home &gt; {productstat || 'PMS'}</p>
                <p className='whitespace-nowrap text-slate-600'>{productstat || 'PMS'}</p>
              </div>
              <div className='flex  items-end gap-1 flex-col md:flex-row'>
                <div className='w-full items-start flex flex-col justify-start  gap-2'>
                  <p className='text-[12px] font-semibold'>Product</p>
                  <SelectProduct />
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
                <p className='text-2xl font-medium'>${productData?.currentPrice}</p>
                <div className='flex'>
                  <p className={cn(' font-normal px-3 h-fit rounded-md text-white  text-sm', backgroundColor)}>
                    {productData?.overallPricePercentChange}
                  </p>
                  <p className={cn(' font-normal px-3 rounded-md  text-sm whitespace-nowrap', backgroundColorz)}>
                   {productData?.recentPricePercentChange}
                  </p>
                </div>
              </div>
              <p className='text-slate-400 text-xs'>
                Closed: {format(new Date(), "MMMM dd yyyy HH:mm:ss")}
              </p>
            </div>
            <div className=' pb-2 md:pb-4 px-2 md:px-4 '>
              <FuelCharts />
            </div>
          </div>
          <div className='lg:col-span-1'></div>
          <div className='lg:col-span-4 lg:h-[65vh] overflow-y-scroll'>
            <h4 className='text-lg md:text-xl font-bold'>
              Analysis & Projections
            </h4>
            <Separator className='h-[2px] my-1' />
            <div className='p2 md:p-4 '>
              <News />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
