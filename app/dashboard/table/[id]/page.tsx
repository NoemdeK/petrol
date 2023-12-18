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
  
  const Page = async ({params}: any) => {
    const data = await getData(params.id)

    const page = parseInt(params.id, 10);

    console.log(page, "shshsh")

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