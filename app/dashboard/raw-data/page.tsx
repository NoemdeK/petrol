import React from 'react'
import { RawDataTable } from './RawdataTable'
import HeaderStat from '@/components/HeaderStat'

const Page = () => {
  return (
    <div>
      <HeaderStat />
      <div className='my-4'>
        <h4 className='font-bold text-black opacity-50 text-xl'>
          Data Repository
        </h4>
        <p className=' opacity-50 text-lg'>
          Find statistics on crude oil, gasoline, diesel, propane, jet fuel, etc.. Click below to download, graph and track current and historical
          information on petroleum prices, stocks, and consumption/sales. Or use our flexi export tool to create your own data series
        </p>
      </div>
        <RawDataTable />
    </div>
  )
}

export default Page