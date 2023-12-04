import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import { SixMonths } from './SixMonths';
import { OneMonth } from './OneMonth';
import { OneWeek } from './OneWeek';
import { ThreeMonths } from './ThreeMonths';
import { Max } from './Max';
import { FiveYears } from './FiveYears';
import { YearOne } from './YearOne';
import { YTD } from './YTD';
import { filterDataByRegions, transformTipToChartData } from './functions';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const LPG = () => {
  const { selectedRegions } = useSelector((state: RootState) => state.prices);

  const { resData } = useSelector((state: RootState) => state.LPG);

  const regions = selectedRegions.map((_, idx) => {
    return _.label.toUpperCase();
  });

  const filteredData = filterDataByRegions(resData, regions);

  const groupedData = filteredData.reduce((result: any, item: any) => {
    const region = item.region;

    if (!result[region]) {
      result[region] = [];
    }
    result[region].push(item);

    return result;
  }, {});

  // Now groupedData is an object where keys are regions and values are arrays of objects for each region

  interface PeriodData {
    sum: number;
    count: number;
    averages: { region: string; lpg: number }[];
  }

  // Create an object to store sums and counts for each period
  const periodData: Record<string, PeriodData> = {};

  // Loop through the data array to calculate sums and counts for each period
  filteredData.forEach((item: any) => {
    const { region, lpg, period } = item;

    if (!periodData[period]) {
      // Initialize sums and counts for the period
      periodData[period] = { sum: 0, count: 0, averages: [] };
    }

    // Add lpg value to the sum
    periodData[period].sum += lpg;
    // Increment the count
    periodData[period].count += 1;

    // Store the region and lpg for later calculation of averages
    periodData[period].averages.push({ region, lpg });
  });

  // Now calculate averages for each region within each period in groupedData

  Object.keys(groupedData).forEach((region) => {
    const regionData = groupedData[region];

    interface PeriodData {
      sum: number;
      count: number;
      averages: { region: string; lpg: number }[];
    }

    // Create an object to store sums and counts for each period
    const periodData: Record<string, PeriodData> = {};
    regionData.forEach((item: any) => {
      const { region, lpg, period } = item;

      if (!periodData[period]) {
        // Initialize sums and counts for the period
        periodData[period] = { sum: 0, count: 0, averages: [] };
      }

      // Add lpg value to the sum
      periodData[period].sum += lpg;
      // Increment the count
      periodData[period].count += 1;

      // Store the region and lpg for later calculation of averages
      periodData[period].averages.push({ region, lpg });
      // Replace the existing item with the new object
      // groupedData[region][groupedData[region].indexOf(item)] = newItem;
    });

    // Calculate averages for each period
    const result = Object.entries(periodData).map(
      ([period, { sum, count, averages }]) => {
        const average = (sum / count).toFixed(2);
        // return { period, average };
        // return { period, average };
        return { period, average, regions: averages[0].region };
      }
    );
    groupedData[region] = result;
  });

  const chartdata2 = transformTipToChartData(groupedData);

  return (
    <div className=' md:pb-4 px-2 md:px-4 h-full'>
      <Tab.Group>
        <Tab.List className='flex gap-2 md:gap-4 text-[18px] text-slate-600'>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-black font-bold' : 'text-stone-800 font-normal'
              )
            }
          >
            1W
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-black font-bold' : 'text-stone-800 font-normal'
              )
            }
          >
            1M
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-black font-bold' : 'text-stone-800 font-normal'
              )
            }
          >
            3M
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-black font-bold' : 'text-stone-800 font-normal'
              )
            }
          >
            6M
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-black font-bold' : 'text-stone-800 font-normal'
              )
            }
          >
            YTD
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-black font-bold' : 'text-stone-800 font-normal'
              )
            }
          >
            1Y
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-black font-bold' : 'text-stone-800 font-normal'
              )
            }
          >
            5Y
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-black font-bold' : 'text-stone-800 font-normal'
              )
            }
          >
            Max
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className='h-[300px] max-w-screen'>
              <OneWeek result={chartdata2} />
            </div>
          </Tab.Panel>{' '}
          <Tab.Panel>
            <div className='h-[300px] max-w-screen'>
              <OneMonth result={chartdata2} />
            </div>
          </Tab.Panel>{' '}
          <Tab.Panel>
            <div className='h-[300px] max-w-screen'>
              <ThreeMonths result={chartdata2} />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className='h-[300px] max-w-screen'>
              <SixMonths result={chartdata2} />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className='h-[300px] max-w-screen'>
              <YTD result={chartdata2} />
            </div>
          </Tab.Panel>{' '}
          <Tab.Panel>
            <div className='h-[300px] max-w-screen'>
              <YearOne result={chartdata2} />
            </div>
          </Tab.Panel>{' '}
          <Tab.Panel>
            <div className='h-[300px] max-w-screen'>
              <FiveYears result={chartdata2} />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className='h-[300px] max-w-screen'>
              <Max result={chartdata2} />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default LPG;
