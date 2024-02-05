"use client"
import NavigationBar from '@/components/NavigationBar'
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  const changeBackground = () => {
    if (window.scrollY > 100) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", changeBackground)
    changeBackground()
    
  })

  // <nav className={`flex  items-center fixed top-0 w-full z-20 ${scrolled ? 'bg-[#ffffff] text-black shadow-md font-black' : 'text-white'} transition-all`} aria-label='Navigation'>

  return (
    <div className={cn(`w-screen  fixed top-0 left-0 z-20  bg-white`)}>

    <div className="max-w-7xl mx-auto  items-center justify-between flex px-4 md:px-0 ">
    <p className=" left-0 top-0 flex w-full text-lg sm:text-2xl md:text-4xl pb-6 pt-8 text-sky-400  lg:static lg:w-auto">
      dio<span className='font-bold'>phalytics</span><span className='text-black'>.io</span>
    </p>

    <div className="w-fit items-end justify-end bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">

   <NavigationBar />

    </div>
  </div>
  </div>

  )
}

export default Navigation