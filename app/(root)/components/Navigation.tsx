import NavigationBar from '@/components/NavigationBar'
import React from 'react'

const Navigation = () => {
  return (
    <div className="max-w-7xl mx-auto  items-center justify-between flex px-4 md:px-0 ">
    <p className=" left-0 top-0 flex w-full text-lg sm:text-2xl md:text-4xl pb-6 pt-8 text-sky-400  lg:static lg:w-auto   lg:p-4 ">
      dio<span className='font-bold'>phalytics</span><span className='text-black'>.io</span>
    </p>

    <div className="w-fit items-end justify-end bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">

   <NavigationBar />

    </div>
  </div>
  )
}

export default Navigation