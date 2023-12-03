import { generateDummyData, generateLinearData } from '@/utils/dummy';
import React from 'react';
import { AreaChartSX } from './AreaChart';

const FiveYears = () => {
  const dummyData = generateLinearData('1/1/2018', '12/31/2023', 120, 100);

  return (
    <div className='h-full max-w-screen'>
      <AreaChartSX resData={dummyData} />
    </div>
  );
};

export default FiveYears;
