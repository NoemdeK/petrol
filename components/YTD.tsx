import React from 'react';
import { AreaChartSX } from './AreaChart';

const YTD = () => {
  const resData = [
    {
      date: 'Sun 26',
      'Petrol Price': 164,
    },
    {
      date: 'Mon 27',
      'Petrol Price': 123,
    },
    {
      date: 'Tue 28',
      'Petrol Price': 132,
    },
    {
      date: 'Wed 29',
      'Petrol Price': 132,
    },
    {
      date: 'Thurs 30',
      'Petrol Price': 132,
    },
    {
      date: 'Fri 1',
      'Petrol Price': 0,
    },
    {
      date: 'Sat 1',
      'Petrol Price': 0,
    },
  ];

  return (
    <div className='h-full max-w-screen'>
      <AreaChartSX resData={resData} />
    </div>
  );
};

export default YTD;
