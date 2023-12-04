import React from 'react';
import { regionalOption } from '../types';

import { AreaChart } from '@tremor/react';
import { fillMissingPeriods } from '@/utils/dummy';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const customTooltip = ({ payload, active }: { payload: any; active: any }) => {
  if (!active || !payload) return null;
  return (
    <div className='w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border'>
      {payload.map((category: any, idx: number) => {
        return (
          <div key={idx} className='flex flex-1 space-x-2.5'>
            <div
              className={`w-1 flex flex-col bg-${category.color}-500 rounded`}
            />
            <div className='space-y-1'>
              <p className='text-tremor-content'>{category.dataKey}</p>
              <p className='font-medium text-tremor-content-emphasis'>
                {category.value} Naira
              </p>
              <p className='font-medium text-tremor-content-emphasis'>
                {category.payload.period}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const OneMonth = ({ result }: { result: any }) => {
  const { selectedRegions } = useSelector((state: RootState) => state.prices);

  const regions = selectedRegions.map((_, idx: number) => {
    return _.label.toUpperCase();
  });

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const filledData = fillMissingPeriods(
    result,
    `${currentMonth}/${currentDay}/${currentYear}`,
    `${currentMonth + 1}/${currentDay}/${currentYear}`,
    regions
  );

  return (
    <div className='h-full max-w-screen'>
      <AreaChart
        className='h-[300px] mt-4'
        // data={result}
        data={filledData}
        index='date'
        categories={regions}
        colors={['neutral', 'indigo']}
        yAxisWidth={30}
        customTooltip={customTooltip}
      />
    </div>
  );
};
