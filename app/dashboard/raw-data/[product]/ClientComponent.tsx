"use client"

import { Region } from '@/components/SelectRegions';
import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import Select, { ActionMeta, MultiValue } from 'react-select';
import { setSelectedRegions } from '@/redux/prices.slice';


interface Dataset {
    label: string;
    value: string;
    data?: number[];
  }

  
const ClientComponent = () => {
    const { selectedRegions, product } = useSelector(
        (state: RootState) => state.prices
      );
  const dispatch = useDispatch<AppDispatch>();


      const handleRegionSelectChange = (
        selectedRegions: MultiValue<Dataset>,
        actionMeta: ActionMeta<Dataset>
      ) => {
        // setSelectedRegionss(selectedRegions as Dataset[] | null);
        dispatch(setSelectedRegions(selectedRegions as Dataset[] | null));
      };
    
  return (
    <div>
                <Region selectedNames={selectedRegions} setSelectedNames={handleRegionSelectChange} />

    </div>
  )
}

export default ClientComponent