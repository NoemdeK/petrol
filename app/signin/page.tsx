"use client"
import React, { useEffect } from 'react'

import {  LoginAccount } from './Component'
import Footer from '@/components/Footer'
import NavigationBar from '@/components/NavigationBar'



const Page = () => { 
  const components: { title: string; href: string; description: string }[] = [
    {
    title: "About Us",
    href: "/",
    description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
    title: "Our Process",
    href: "/",
    description:
        "For sighted users to preview content available behind a link.",
    },
    {
    title: "Contact Us",
    href: "/",
    description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },

]
  return (
    <div className='petrodata relative'>
      <div className='absolute  right-8 md:right-16 top-4 md:top-8'>
      <NavigationBar />
    </div>

      <img src='https://res.cloudinary.com/dnir0cslk/image/upload/v1706148980/petrobg_eg3spo.jpg' alt="hero" 
        className='h-full w-full grayscale' />
      <div className='overlay grid grid-cols-1 md:grid-cols-2  sm:p-8 lg:p-16'>
        <div className='h-full flex justify-center items-center lg:mt-14'>

          <LoginAccount />
        </div>
        <div className='lg:block hidden'>
          <h4 className='text-black text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-right  mt-12'>
              Empower your business <br /> with <span className='text-[#A75C00]'>real-time</span> <br /> petroleum insights
            </h4>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Page

