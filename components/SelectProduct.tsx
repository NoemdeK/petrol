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
    regions: [],
  },

  {
    label: 'Premium Motor Spirit (PMS)',
    label2: 'Motor Spirit',
    abbr: 'PMS',
    regions: [
      'NORTH CENTRAL',
      'NORTH EAST',
      'NORTH WEST',
      'SOUTH EAST',
      'SOUTH SOUTH',
      'SOUTH WEST',
    ],
  },
  {
    label: 'Automative Gas Oil (AGO)',
    label2: 'Gas Oil',
    abbr: 'AGO',
    regions: [
      'NORTH CENTRAL',
      'NORTH EAST',
      'NORTH WEST',
      'SOUTH EAST',
      'SOUTH SOUTH',
      'SOUTH WEST',
    ],
  },
  {
    label: 'Dual Purpose Kerosene (DPK)',
    label2: 'Kerosene',
    abbr: 'DPK',
    text: 'text-green-700',
    regions: [
      'NORTH CENTRAL',
      'NORTH EAST',
      'NORTH WEST',
      'SOUTH EAST',
      'SOUTH SOUTH',
      'SOUTH WEST',
    ],
  },
  {
    label: 'Liquefied Petroleum Gas (LPG)',
    label2: 'Petroleum Gas',
    abbr: 'LPG',
    regions: [
      'NORTH CENTRAL',
      'NORTH EAST',
      'NORTH WEST',
      'SOUTH EAST',
      'SOUTH SOUTH',
      'SOUTH WEST',
    ],
  },
];

const SelectProduct = () => {
  const router = useRouter()
  const params = useSearchParams()
  
  const productstat = params?.get('product');


  const dispatch = useDispatch<AppDispatch>();
  const { selectedRegions } = useSelector((state: RootState) => state.prices);
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
      const currentQuery = params ? qs.parse(params.toString()) : {};
      const updatedQuery = {
        ...currentQuery,
        product: selectedValue,
      };

      if(params?.get('product') === selectedValue){
        //@ts-ignore
        delete updatedQuery.product;
    }
      const url = qs.stringifyUrl(
        {
          url: '/dashboard/analytics',
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [dispatch, params, router]
  );

  console.log(filteredData[1].label, "ddd")
  return (
    <Select
    onValueChange={handleSelectChange}
    defaultValue={filteredData[0].label}
    
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a Product' className='text-accent-foreground' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Products</SelectLabel>
          {filteredData.map((item: any, i: number) => (
            <SelectItem key={i} value={item.abbr}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectProduct;
