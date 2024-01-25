import React, { useEffect } from 'react'

import {  LoginAccount } from './Component'
import Footer from '@/components/Footer'



const Page = () => { 
  return (
    <div className='petrodata'>
      <img src='https://res.cloudinary.com/dnir0cslk/image/upload/v1706148980/petrobg_eg3spo.jpg' alt="hero" 
        className='h-full w-full grayscale' />
      <div className='overlay grid grid-cols-1 md:grid-cols-2  sm:p-8 lg:p-16'>
        <div className='h-full flex justify-center items-center lg:mt-14'>

          <LoginAccount />
        </div>
        <div className='lg:block hidden'>
          <h4 className='text-black text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-right'>
              Empower your business <br /> with <span className='text-[#A75C00]'>real-time</span> <br /> petroleum insights
            </h4>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Page