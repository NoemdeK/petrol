"use client"
import React, { useCallback } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { setSelectedProduct } from '@/redux/prices.slice';
import { useRouter, useSearchParams } from 'next/navigation';

import qs from 'query-string'


const data = [
  {
    label: 'ICE Brent Crude (IBC)',
    label2: 'Crude',
    abbr: 'ICE',
    regions: [
      'North East',
      'North West',
      'South South',
      'South West',
      'South East',
      'North Central',
    ],
  },

  {
    label: 'Premium Motor Spirit (PMS)',
    label2: 'Motor Spirit',
    abbr: 'PMS',
    regions: [
      'North East',
      'North West',
      'South South',
      'South West',
      'South East',
      'North Central',
    ],
  },
  {
    label: 'Automative Gas Oil (AGO)',
    label2: 'Gas Oil',
    abbr: 'AGO',
    regions: [
      'North East',
      'North West',
      'South South',
      'South West',
      'South East',
      'North Central',
    ],
  },
  {
    label: 'Dual Purpose Kerosene (DPK)',
    label2: 'Kerosene',
    abbr: 'DPK',
    text: 'text-green-700',
    regions: [
      'North East',
        'North West',
        'South South',
        'South West',
        'South East',
        'North Central',
    ],
  },
  {
    label: 'Liquefied Petroleum Gas (LPG)',
    label2: 'Petroleum Gas',
    abbr: 'LPG',
    regions: [
      'North East',
      'North West',
      'South South',
      'South West',
      'South East',
      'North Central',
    ],
  },
];

const NewSelectProduct = ({page}: any) => {
  const router = useRouter()
  // console.log(params.getAll(''))
  



  const dispatch = useDispatch<AppDispatch>();
  const { selectedRegions, product } = useSelector((state: RootState) => state.prices);
  const regions = selectedRegions.map((_, idx) => {
    return _.label;
  });

  


  function filterDataByRegions(data: any, selectedRegions: string[]) {
    return data.filter((item: any) => {
      const allSelectedRegionsExist = regions.every((region) =>
        item.regions.includes(region.toUpperCase())
      );
      return allSelectedRegionsExist && item;
    });
  }

  const region: string[] = ['South East', 'North Central'];
  const filteredData = filterDataByRegions(data, region);


  const handleSelectChange = useCallback(
    (selectedValue: string) => {
      // Update the Redux store
      dispatch(setSelectedProduct(selectedValue));

      // Update the URL
     

      router.push(`/dashboard/analytics/${selectedValue}`);
    },
    [dispatch, router]
  );

  return (
    <Select
    onValueChange={handleSelectChange}
    defaultValue={page || "PMS"} 

    >
      <SelectTrigger className='w-[180px]' >
        <SelectValue placeholder='Select a Product' className='text-accent-foreground' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Products</SelectLabel>
          {data.map((item: any, i: number) => (
            <SelectItem key={i} value={item.abbr}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default NewSelectProduct;
