import { AreaChart } from '@tremor/react';

const chartdata3 = [
  {
    date: 'Jul 23',
    'Petrol Price': 164,
  },
  {
    date: 'Aug 23',
    'Petrol Price': 123,
  },
  {
    date: 'Sep 23',
    'Petrol Price': 132,
  },
  {
    date: 'Oct 23',
    'Petrol Price': 132,
  },
  {
    date: 'Nov 23',
    'Petrol Price': 132,
  },
  {
    date: 'Dec 23',
    'Petrol Price': 0,
  },
];

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
                {category.payload.date}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const AreaChartSX = ({ resData }: { resData?: any }) => {
  return (
    <AreaChart
      className='h-[300px] mt-4'
      data={resData || chartdata3}
      index='date'
      categories={['Petrol Price']}
      colors={['blue']}
      yAxisWidth={30}
      customTooltip={customTooltip}
    />
  );
};
