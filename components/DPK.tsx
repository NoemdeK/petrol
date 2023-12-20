"use client"
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
import { useSearchParams } from 'next/navigation';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const DPK = ({resData}: any) => {
  const { selectedRegions } = useSelector((state: RootState) => state.prices);
  const searchParams = useSearchParams()

  const params = searchParams.get("period")

  console.log(params)

  // const { resData } = useSelector((state: RootState) => state.DPK);
  // console.log("DPK Data", resData)

  const regions = selectedRegions.map((_, idx) => {
    return _.label;
  });

  const filteredData = filterDataByRegions(resData, regions);
  // console.log(filteredData, "filtersata");

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
    averages: { Region: string; DPK: number }[];
  }

  // Create an object to store sums and counts for each period
  const periodData: Record<string, PeriodData> = {};

  // Loop through the data array to calculate sums and counts for each period
  filteredData.forEach((item: any) => {
    const { Region, DPK, Period } = item;

    if (!periodData[Period]) {
      // Initialize sums and counts for the period
      periodData[Period] = { sum: 0, count: 0, averages: [] };
    }

    // Add DPK value to the sum
    periodData[Period].sum += DPK;
    // Increment the count
    periodData[Period].count += 1;

    // Store the region and DPK for later calculation of averages
    periodData[Period].averages.push({ Region, DPK });
  });

  // Now calculate averages for each region within each period in groupedData

  Object.keys(groupedData).forEach((region) => {
    const regionData = groupedData[region];

    interface PeriodData {
      sum: number;
      count: number;
      averages: { Region: string; DPK: number }[];
    }

    // Create an object to store sums and counts for each period
    const periodData: Record<string, PeriodData> = {};
    regionData.forEach((item: any) => {
      const { Region, DPK, Period } = item;

      if (!periodData[Period]) {
        // Initialize sums and counts for the period
        periodData[Period] = { sum: 0, count: 0, averages: [] };
      }

      // Add DPK value to the sum
      periodData[Period].sum += DPK;
      // Increment the count
      periodData[Period].count += 1;

      // Store the region and DPK for later calculation of averages
      periodData[Period].averages.push({ Region, DPK });
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
        <Max result={chartdata2} />
    </div>
  );
};

export default DPK;
