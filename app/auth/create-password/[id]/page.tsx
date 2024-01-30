import React from 'react'
import { Client } from './Component'

const Page = ({params}: any) => {
    return (
    <div className='petrodata'>
      <img src='https://res.cloudinary.com/dnir0cslk/image/upload/v1706148980/petrobg_eg3spo.jpg' alt="hero" 
          className='h-full w-full  grayscale-[90%]' />
    <div className='overlay h-full flex justify-center items-center'>
      <Client id={params.id} />
    </div>
  </div>  )
}

export default Page