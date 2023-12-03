import React from 'react';
import LPG from './LPG';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import PMS from './PMS';
import AGO from './AGO';
import DPK from './DPK';

const FuelCharts = () => {
  const { product } = useSelector((state: RootState) => state.prices);

  let selectedComponent;

  switch (product) {
    case 'Liquefied Petroleum Gas (LPG)':
      selectedComponent = <LPG />;
      break;
    case 'Premium Motor Spirit (PMS)':
      selectedComponent = <PMS />;
      break;
    case 'Automative Gas Oil (AGO)':
      selectedComponent = <AGO />;
      break;
    case 'Dual Purpose Kerosene (DPK)':
      selectedComponent = <DPK />;
      break;
    default:
      selectedComponent = null; // Handle the case when product doesn't match any known type
  }

  return <div className='md:pb-4 px-2 md:px-4 h-full'>{selectedComponent}</div>;
};

export default FuelCharts;
