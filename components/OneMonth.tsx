import React from 'react';
import { AreaChartSX } from './AreaChart';
import { generateLinearData } from '@/utils/dummy';

const OneMonth = () => {
  const dummyData = generateLinearData('10/26/2018', '11/24/2023', 100, 105);

  return (
    <div className='h-full max-w-screen'>
      <AreaChartSX resData={dummyData} />
    </div>
  );
};
export default OneMonth;
