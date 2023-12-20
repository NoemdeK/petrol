import React from 'react'
import { RawDataTable } from '@/app/dashboard/raw-data/RawdataTable'

async function getData(id:number) {
    const res = await fetch(process.env.BACKEND_URL+`api/v1/petro-data/raw?batch=${id}`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

  async function getAnalytics () {
    try {
      const product = 'LPG';
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

      return result.data;
      
      
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }

export const revalidate = 0

  
  const Page = async ({params}: any) => {
    const data = await getData(params.id)
    const dassd = await getAnalytics()

    const page = parseInt(params.id, 10);


  const result = data.data.result
    return (
      <div>
        <div className='my-4'>
          <h4 className='font-bold text-black opacity-50 text-xl'>
            Data Repository
          </h4>
          <p className=' opacity-50 text-lg'>
            Find statistics on crude oil, gasoline, diesel, propane, jet fuel, etc.. Click below to download, graph and track current and historical
            information on petroleum prices, stocks, and consumption/sales. Or use our flexi export tool to create your own data series
          </p>
        </div>
          <RawDataTable data={result} page={page} />
      </div>
    )
  }
  
  export default Page