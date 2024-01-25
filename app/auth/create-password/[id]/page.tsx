import React from 'react'
import { Client } from './Component'

const Page = ({params}: any) => {
    return (
    <div className='petrodata'>
    <div className='h-full flex justify-center items-center'>
      <Client id={params.id} />
    </div>
  </div>  )
}

export default Page