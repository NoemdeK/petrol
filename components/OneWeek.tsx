import React from 'react';
import { AreaChartSX } from './AreaChart';
import { generateDummyData } from '@/utils/dummy';

const OneWeek = () => {
  const dummyData = generateDummyData('11/18/2023', '11/26/2023', 0);

  return (
    <div className='h-full max-w-screen'>
      <AreaChartSX resData={dummyData} />
    </div>
  );
};

export default OneWeek;
