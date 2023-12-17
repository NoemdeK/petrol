import React, { useEffect, useState } from 'react';
import LPG from './LPG';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import PMS from './PMS';
import AGO from './AGO';
import DPK from './DPK';
import axios from 'axios';

const FuelCharts = () => {
  const { product } = useSelector((state: RootState) => state.prices);
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = 'ICE';
        const regions = [
          'NORTH EAST',
          'NORTH WEST',
          'SOUTH SOUTH',
          'SOUTH WEST',
          'SOUTH EAST',
          'NORTH CENTRAL',
        ];

        const url = 'https://petrodata.zainnovations.com/api/v1/petro-data/analysis';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc4N2QzMTI1NWIxYTA1ZGZhZDQ4MTIiLCJyb2xlIjoicnd4X3VzZXIiLCJpYXQiOjE3MDIzOTUyMDF9.iZXOHmjSEBIG-kBJscRKMCd9WpZZEdRXGzN7_yDxTIg');

        const requestOptions = {
          method: 'POST',
          headers,
          body: JSON.stringify({
            product,
            regions,
          }),
        };

        const response = await fetch(`${url}?period=MAX`, requestOptions);
        // console.log(response.json()), "repso"
        const result = await response.json();
        // console.log(result)
        
        
      } catch (error: any) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []);

  let selectedComponent;

  switch (product) {
    case 'LPG':
      selectedComponent = <LPG />;
      break;
    case 'PMS':
      selectedComponent = <PMS />;
      break;
    case 'AGO':
      selectedComponent = <AGO />;
      break;
    case 'DPK':
      selectedComponent = <DPK />;
      break;
    default:
      selectedComponent = <PMS />; // Handle the case when product doesn't match any known type
  }

  return <div className='md:pb-4 px-2 h-full'>{selectedComponent}</div>;
};

export default FuelCharts;
