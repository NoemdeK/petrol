import React from 'react'
import Offers from '../components/Offers'

const Page = () => {
  return (
    <div className='max-w-7xl mx-auto pt-28'>
      <div className='flex gap-4'>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M23.375 7.68761C15.8438 11.6251 7.21875 21.8126 5 29.5001C2.5 37.6564 2.5 70.7814 5 73.2814C7.5 75.7814 31.6875 75.7814 34.1875 73.2814C36.6875 70.7814 36.6875 41.9064 34.1875 39.3751C33.0938 38.2814 28.8438 37.5001 24.7812 37.5001C17.875 37.5001 17.25 37.1876 17.25 33.7189C17.25 29.0001 22.2812 22.5626 29.9688 17.7189C36.7188 13.4689 37.9688 8.78136 33.0938 6.09386C29.3438 4.25011 30.2813 4.09386 23.375 7.68761Z" fill="#38BDF81F" fill-opacity="0.6"/>
        <path d="M64.1562 7.68761C56.625 11.6251 48 21.8126 45.8125 29.5001C43.3125 37.6564 43.3125 70.7814 45.8125 73.2814C48.3125 75.7814 72.5 75.7814 75 73.2814C77.5 70.7814 77.5 41.9064 75 39.3751C73.9062 38.2814 69.6562 37.5001 65.5937 37.5001C58.6875 37.5001 58.0625 37.1876 58.0625 33.7189C58.0625 29.0001 63.0937 22.5626 70.7812 17.7189C77.5312 13.4689 78.7812 8.78136 73.9062 6.09386C70.125 4.25011 71.0625 4.09386 64.1562 7.68761Z" fill="#38BDF81F" fill-opacity="0.6"/>
        </svg>
        </div>
        <blockquote>
          <p className='text-xs md:text-sm lg:text-base'>
            Driven by a profound passion for data, our founders envisioned a solution to address the
          intricate challenges of data collection, particularly in Africa and other regions. 
          Through this vision, we developed a comprehensive approach that spans data collection, analysis, 
            and presentation, reflecting our commitment to transforming the landscape of data accessibility in diverse and 
            dynamic environments. This journey embodies our dedication to providing innovative solutions that empower individuals 
            and organizations to navigate the complexities of data with ease.
          </p>
        </blockquote>
      </div>
        <Offers />
    </div>
  )
}

export default Page