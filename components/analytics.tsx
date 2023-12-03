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

interface Dataset {
  label: string;
  value: string;
  data?: number[];
}

export const Analytics = () => {
  const [mounted, setMounted] = useState(false)
  const { selectedRegions, product } = useSelector(
    (state: RootState) => state.prices
  );

  // Use a Set to store unique regions
  // const uniqueRegions = new Set();

  // Loop through the data array and add each region to the Set
  // responseData.forEach((item: any) => {
  //   uniqueRegions.add(item.region);
  // });

  // Convert the Set to an array
  // const availableRegions = Array.from(uniqueRegions);

  const dispatch = useDispatch<AppDispatch>();

  const handleRegionSelectChange = (
    selectedRegions: MultiValue<Dataset>,
    actionMeta: ActionMeta<Dataset>
  ) => {
    // setSelectedRegionss(selectedRegions as Dataset[] | null);
    dispatch(setSelectedRegions(selectedRegions as Dataset[] | null));
  };

  const analysis = [1, 2, 3, 4, 5].map((_, idx) => {
    return (
      <div className=' p-1 flex mb-2 md:mb-3' key={idx}>
        <div className='bg-green-700 h-12 w-12 p-2 mr-2 rounded-sm flex items-center justify-center text-white'>
          H
        </div>
        <div className=''>
          <p className='text-blue-800'>
            {' '}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum
          </p>
          <p className=''>
            Released November 22, 2023 | tags:{' '}
            <span className='text-sky-800'>Liquid Fuel</span>
          </p>
        </div>
      </div>
    );
  });

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted){
    return null
  }

  return (
    <main className='flex min-h-screen flex-col items-end justify-between  bg-white'>
      <div className=' flex flex-col  min-h-screen w-full px-4 '>
        <HeaderStat />
        <div className='grid grid-cols-1 md:grid-cols-12 w-full gap-2  md:gap-4 flex-1 p-4'>
          <div className='flex flex-col flex-1 w-full md:col-span-7 '>
            <div className='flex flex-col justify-between md:items-end gap-2 md:flex-row'>
              <div className=''>
                <p className='text-slate-400 text-xs mb-3'>Home &gt; PMS</p>
                <p className='whitespace-nowrap text-slate-600'>{product}</p>
              </div>
              <div className='flex  items-end gap-1 flex-col md:flex-row'>
                <div className='w-full items-start flex flex-col justify-start  gap-2'>
                  <p className='text-[12px] font-semibold'>Product</p>
                  <SelectProduct />
                </div>

                <div className='w-full items-start flex flex-col justify-start  gap-2 '>
                  <p className='text-[12px] font-semibold'>Region</p>

                  <Select
                    defaultValue={selectedRegions}
                    onChange={handleRegionSelectChange}
                    isMulti
                    name='colors'
                    options={regionalOptions}
                    className='basic-multi-select max-w-10 text-[12px] pt-1 min-w-[200px]'
                    classNamePrefix='select'
                  />
                </div>
              </div>
            </div>

            <hr className='h-2 my-2' />
            <div className=' w-full h-20 p-2'>
              <div className='flex items-center gap-2 md:gap-4'>
                <p className='text-2xl font-medium'>$10.40</p>
                <div className='flex'>
                  <p className=' font-normal bg-red-200 px-3 h-fit rounded-md text-red-800 text-sm'>
                    24.25%
                  </p>
                  <p className=' font-normal px-3 rounded-md text-red-800 text-sm whitespace-nowrap'>
                    -3.33 1y
                  </p>
                </div>
              </div>
              <p className='text-slate-400 text-xs'>
                Closed: Nov 24, 4:58:56PM UTC-5
              </p>
            </div>
            <div className=' pb-2 md:pb-4 px-2 md:px-4 '>
              <FuelCharts />
            </div>
          </div>
          <div className='md:col-span-1'></div>
          <div className='md:col-span-4'>
            Analysis & Projections
            <Separator className='h-[2px] my-1' />
            <div className='p2 md:p-4'>{analysis}</div>
          </div>
        </div>
      </div>
    </main>
  );
};
