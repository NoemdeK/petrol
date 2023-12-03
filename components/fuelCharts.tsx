import React, { useEffect, useState } from 'react';
import { Dataset, regionalOption } from '@/types';
// import { Tab } from '@headlessui/react';
// import { SixMonths } from './SixMonths';
import LPG from './LPG';
// import PMS from './PMS';
// import AGO from './AGO';
// import DPK from './DPK';

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
  return (
    <div className=' md:pb-4 px-2 md:px-4 h-full'>
      <LPG />
      {/* <PMS /> */}
      {/* <AGO /> */}
      {/* <DPK /> */}
    </div>
  );
};

export default FuelCharts;
