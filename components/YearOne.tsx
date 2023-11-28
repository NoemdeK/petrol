import React from 'react';
import { AreaChartSX } from './AreaChart';
import { generateDummyData } from '@/utils/dummy';

const YearOne = () => {
  const dummyData = generateDummyData('1/1/2023', '12/31/2023', 0);

  return (
    <div className='h-full max-w-screen'>
      <AreaChartSX resData={dummyData} />
    </div>
  );
};

export default YearOne;
