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

const PMS = () => {
  const { selectedRegions } = useSelector((state: RootState) => state.prices);

  const { resData } = useSelector((state: RootState) => state.PMS);

  const regions = selectedRegions.map((_, idx) => {
    return _.label.toUpperCase();
  });

  const filteredData = filterDataByRegions(resData, regions);

  const groupedData = filteredData.reduce((result: any, item: any) => {
    const region = item.Region;

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
    averages: { Region: string; PMS: number }[];
  }

  // Create an object to store sums and counts for each period
  const periodData: Record<string, PeriodData> = {};

  // Loop through the data array to calculate sums and counts for each period
  filteredData.forEach((item: any) => {
    const { Region, PMS, Period } = item;

    if (!periodData[Period]) {
      // Initialize sums and counts for the period
      periodData[Period] = { sum: 0, count: 0, averages: [] };
    }

    // Add PMS value to the sum
    periodData[Period].sum += PMS;
    // Increment the count
    periodData[Period].count += 1;

    // Store the region and PMS for later calculation of averages
    periodData[Period].averages.push({ Region, PMS });
  });

  // Now calculate averages for each region within each period in groupedData

  Object.keys(groupedData).forEach((region) => {
    const regionData = groupedData[region];

    interface PeriodData {
      sum: number;
      count: number;
      averages: { Region: string; PMS: number }[];
    }

    // Create an object to store sums and counts for each period
    const periodData: Record<string, PeriodData> = {};
    regionData.forEach((item: any) => {
      const { Region, PMS, Period } = item;

      if (!periodData[Period]) {
        // Initialize sums and counts for the period
        periodData[Period] = { sum: 0, count: 0, averages: [] };
      }

      // Add PMS value to the sum
      periodData[Period].sum += PMS;
      // Increment the count
      periodData[Period].count += 1;

      // Store the region and PMS for later calculation of averages
      periodData[Period].averages.push({ Region, PMS });
      // Replace the existing item with the new object
      // groupedData[region][groupedData[region].indexOf(item)] = newItem;
    });

    // Calculate averages for each period
    const result = Object.entries(periodData).map(
      ([Period, { sum, count, averages }]) => {
        const average = (sum / count).toFixed(2);
        // return { period, average };
        // return { period, average };
        return { Period, average, regions: averages[0].Region };
      }
    );
    groupedData[region] = result;
  });

  const chartdata2 = transformTipToChartData(groupedData);

  return (
    <div className=' md:pb-4 h-full'>
      <Tab.Group defaultIndex={7} >
        <Tab.List className='flex gap-2 md:gap-4 text-[18px] text-slate-600'>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-foreground font-bold' : 'text-accent-foregroundfont-normal'
              )
            }
          >
            1W
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-secondary-foreground font-bold' : 'text-accent-foregroundfont-normal'
              )
            }
          >
            1M
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-accent-foreground font-bold' : 'text-accent-foregroundfont-normal'
              )
            }
          >
            3M
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-accent-foreground font-bold' : 'text-accent-foregroundfont-normal'
              )
            }
          >
            6M
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-accent-foreground font-bold' : 'text-accent-foregroundfont-normal'
              )
            }
          >
            YTD
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-accent-foreground font-bold' : 'text-accent-foregroundnt-normal'
              )
            }
          >
            1Y
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-accent-foreground font-bold' : 'text-accent-foreground font-normal'
              )
            }
          >
            5Y
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                selected ? 'text-accent-foreground font-bold' : 'text-accent-foreground font-normal'
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

export default PMS;
