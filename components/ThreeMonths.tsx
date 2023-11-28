import React from 'react';
import { AreaChartSX } from './AreaChart';
import { generateDummyData } from '@/utils/dummy';

const ThreeMonths = () => {
  const dummyData = generateDummyData('8/25/2018', '11/26/2023', 0);

  return (
    <div className='h-full max-w-screen'>
      <AreaChartSX resData={dummyData} />
    </div>
  );
};

export default ThreeMonths;
