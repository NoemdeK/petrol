import React, { useEffect, useState } from 'react';
import { LineChart } from './lineCharts';
import { DataProps, Dataset, regionalOption } from '../types';
import { Tab } from '@headlessui/react';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRegions } from '../redux/prices.slice';
import { AreaChartSX } from './AreaChart';
// import { MyResponsiveLine } from './NewLineChart';

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

export const SixMonths = () => {
  const {
    // data: resData,
    // loading,
    // period,
    six__months: resData,
    selectedRegions,
  } = useSelector((state: RootState) => state.prices);
  const dispatch = useDispatch<AppDispatch>();

  const [chartData, setChartData] = useState<DataProps>({
    labels,
    datasets: [],
  });

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
    // const fetchData = async () => {
    // try {
    if (selectedRegions) {
      const updatedDatasets = selectedRegions
        .map((region) => {
          const originalDataset = resData.datasets.find(
            (dataset: Dataset) => dataset.label === region.label
          );
          return originalDataset || null;
        })
        .filter(Boolean) as unknown as Dataset[];

      //   dispatch(setSelectedRegions(

      //   ));
      return setChartData({
        labels,
        datasets: updatedDatasets.filter(Boolean), // Remove null values
      });
    } else {
      setChartData(resData);
    }
    // } catch (error) {
    //   console.log(error);
    // }
    // Update the chartData based on selected regions
    // };

    // fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRegions]);

  return (
    <div className='h-full max-w-screen'>
      {/* <LineChart data={chartData} /> */}
      {/* <MyResponsiveLine /> */}
      <AreaChartSX />
    </div>
  );
};
