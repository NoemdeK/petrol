import React, { useEffect, useState } from 'react';
import { Dataset, regionalOption } from '@/types';
import { Tab } from '@headlessui/react';
import { SixMonths } from './SixMonths';
import OneMonth from './OneMonth';
import YTD from './YTD';
import FiveYears from './FiveYears';
import YearOne from './YearOne';
import OneWeek from './OneWeek';
import ThreeMonths from './ThreeMonths';
// import { regionalOption } from '@/types';

const regionalOptions: regionalOption[] = [
  { label: 'South East', value: 'South East' },
  { label: 'South West', value: 'South West' },
  { label: 'South South', value: 'South South' },
  { label: 'North Central', value: 'North Central' },
  { label: 'North East', value: 'North East' },
  { label: 'North West', value: 'North West' },
];

const labels: string[] = [
  'Jan 2023',
  'Feb 2023',
  'Mar 2023',
  'Apr 2023',
  'May 2023',
  'June 2023',
];

const initialData: { labels: string[]; datasets: Dataset[] } = {
  labels,
  datasets: [],
};

const FuelCharts = () => {
  const [selectedRegions, setSelectedRegions] = useState<
    regionalOption[] | null
  >([regionalOptions[2], regionalOptions[3]]);
  const [chartData, setChartData] = useState(initialData);

  const data = {
    labels,
    datasets: [
      {
        label: 'South East',
        data: [100, 122, 31, 404, 1, 295],
        borderColor: 'red',
        backgroundColor: 'red',
      },
      {
        label: 'South West',
        data: [100, 2, 203, 34, 500, 200],
        borderColor: 'orange',
        backgroundColor: 'orange',
      },
      {
        label: 'South South',
        data: [100, 200, 12, 3, 400, 50],
        borderColor: 'yellow',
        backgroundColor: 'yellow',
      },
      {
        label: 'North Central',
        data: [10, 12, 303, 1124, 225, 230],
        borderColor: 'green',
        backgroundColor: 'green',
      },
      {
        label: 'North East',
        data: [12, 223, 43, 44, 235, 20],
        borderColor: 'blue',
        backgroundColor: 'blue',
      },
      {
        label: 'North West',
        data: [112, 231, 233, 34, 12, 32],
        borderColor: 'purple',
        backgroundColor: 'purple',
      },
    ],
  };
  useEffect(() => {
    // Update the chartData based on selected regions
    if (selectedRegions) {
      const updatedDatasets = selectedRegions
        .map((region) => {
          const originalDataset = data.datasets.find(
            (dataset) => dataset.label === region.label
          );
          return originalDataset || null;
        })
        .filter(Boolean) as unknown as Dataset[];

      setChartData({
        labels,
        datasets: updatedDatasets.filter(Boolean), // Remove null values
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRegions]);

  return (
    <div className=' md:pb-4 px-2 md:px-4 h-full'>
      <Tab.Group>
        <Tab.List className='flex gap-2 md:gap-4 text-[18px] text-slate-600'>
          <Tab>1W</Tab>
          <Tab>1M</Tab>
          <Tab>3M</Tab>
          <Tab className={'text-stone-200 font-bold'}>6M</Tab>
          <Tab>YTD</Tab>
          <Tab>1Y</Tab>
          <Tab>5Y</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className='h-[300px] max-w-screen'>
              <OneWeek />
              {/* <OneDay /> */}
            </div>
          </Tab.Panel>{' '}
          <Tab.Panel>
            <div className='h-[300px] max-w-screen'>
              <OneMonth />
            </div>
          </Tab.Panel>{' '}
          <Tab.Panel>
            <div className='h-[300px] max-w-screen'>
              <ThreeMonths />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className='h-[300px] max-w-screen'>
              <SixMonths />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className='h-[300px] max-w-screen'>
              <YTD />
            </div>
          </Tab.Panel>{' '}
          <Tab.Panel>
            <div className='h-[300px] max-w-screen'>
              <YearOne />
            </div>
          </Tab.Panel>{' '}
          <Tab.Panel>
            <div className='h-[300px] max-w-screen'>
              <FiveYears />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default FuelCharts;
