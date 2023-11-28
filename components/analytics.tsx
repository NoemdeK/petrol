'use client';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useEffect, useState } from 'react';
import Select, { ActionMeta, MultiValue } from 'react-select';
import { Separator } from '@/components/ui/separator';

import { setSelectedRegions, setSelectedState } from '../redux/prices.slice';
// import FuelCharts from './FuelCharts';
import { regionalOptions } from '@/data';
// import { SearchBox } from './SearchBox';
import { nigeriaStates } from '../data/states';
import { SearchBox } from './SearchBox';
import FuelCharts from './fuelCharts';
import HeaderStat from './HeaderStat';

interface Dataset {
  label: string;
  value: string;
  data?: number[];
}

export const Analytics = () => {
  const [value, setValue] = useState('Select option...');

  const {
    six__months: resData,
    selectedRegions,
    selectedState,
  } = useSelector((state: RootState) => state.prices);

  const dispatch = useDispatch<AppDispatch>();

  const handleRegionSelectChange = (
    selectedRegions: MultiValue<Dataset>,
    actionMeta: ActionMeta<Dataset>
  ) => {
    // setSelectedRegionss(selectedRegions as Dataset[] | null);
    dispatch(setSelectedRegions(selectedRegions as Dataset[] | null));
  };

  const cards = ['AGO', 'PMS', 'DPK', 'LPG'].map((_, idx) => {
    return (
      <div
        key={idx}
        className='bg-white rounded-xl shadow-md sm:w-full min-w-[100px]  p-2  flex items-center justify-between h-16 border-1 border'
      >
        <div className='flex gap-2 items-center mr-2'>
          <div className='w-12 h-12 bg-green-100 rounded-md'></div>
          <p className='text-[18px] font-semibold flex-1'>{_}</p>
        </div>
        <div className=' flex flex-col gap-1 text-[16px] text-end'>
          <p className='font-medium  bg-white px-1 text-green-600'>+0.003%</p>
          <p className='font-medium  bg-white px-1 text-green-600'>+117.2%</p>
        </div>
      </div>
    );
  });

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
            <span className='text-blue-200'>Liquid Fuel</span>
          </p>
        </div>
      </div>
    );
  });

  return (
    <main className='flex min-h-screen flex-col items-end justify-between  bg-white'>
      <div className='border-l-2 border-slate-200 flex flex-col  min-h-screen w-full p-4 '>
        <HeaderStat />
        <div className='flex flex-col md:flex-row w-full gap-2  md:gap-4 flex-1 p-4'>
          <div className='flex flex-col flex-1 w-full '>
            <div className='flex flex-col justify-between md:items-end gap-2 md:flex-row'>
              <div className=''>
                <p className='text-slate-400 text-xs mb-3'>Home &gt; PMS</p>
                <p className='whitespace-nowrap text-slate-600'>
                  Premium Motor Spirit (PMS)
                </p>
              </div>
              <div className='flex  items-end gap-1 flex-col md:flex-row'>
                <div className='w-full items-start flex flex-col justify-start  gap-2'>
                  <p className='text-[12px] font-semibold'>Product</p>

                  <SearchBox
                    options={nigeriaStates}
                    label='name'
                    id='id'
                    selectedVal={value}
                    handleChange={(val: any) => {
                      dispatch(setSelectedState(val));
                      setValue(val);
                    }}
                  />
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
            <div className=' w-full h-full p-2'>
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
            <div className='border-x-2 border-b-2  border-slate-200 pb-2 md:pb-4 px-2 md:px-4 '>
              <FuelCharts />
            </div>
          </div>
          <div className=' '>
            Analysis & Projections
            <Separator className='h-[2px] my-1' />
            <div className='p2 md:p-4'>{analysis}</div>
          </div>
        </div>
      </div>
    </main>
  );
};
