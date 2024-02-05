"use client"




import React from 'react'

import { AccordionDemo } from '@/components/Accordion'
import Footer from '@/components/Footer'
import Partners from '@/components/sections/Partners'
import NavigationBar from '@/components/NavigationBar'

import hero from "@/assets/how-to-solve-worlds-biggest-problems 1.svg"

import substract from "@/assets/Subtract.svg"
import Image from 'next/image'
import Navigation from './(root)/components/Navigation'

export default function Home() {

  return (
    <main className=' flex-col flex  p-0 m-0 justify-between gap-0 w-full h-full max-h-full'>
      
      <div className=' w-full h-full relative '>
      <div className='absolute top-0 right-0 z-30'>
                <Image src={substract} alt='contact' width={200} height={200} />
              </div>
        {/* <div className="max-w-7xl mx-auto  items-center justify-between flex py-4 px-4 md:px-0 md:py-8">
          <p className=" left-0 top-0 flex w-full text-lg sm:text-2xl md:text-4xl pb-6 pt-8 text-sky-400  lg:static lg:w-auto   lg:p-4 ">
            dio<span className='font-bold'>phalytics</span><span className='text-black'>.io</span>
          </p>

          <div className="w-fit items-end justify-end bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">

         <NavigationBar />

          </div>
        </div> */}
        <Navigation />
        <div className=" max-w-7xl mx-auto flex h-full flex-col  pb-8  gap-12 p-4 pt-32 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4">

            <div className='text-secondary  h-full w-full flex items-center flex-col justify-center text-left md:text-lefkt md:itejms-start'>
              <div className='h-full flex flex-col gap-8 mt-16 justify-center items-center md:items-start'>
                  <h4 className='text-black text-3xl sm:text-4xl lg:text-5xl font-bold '>
                    Solving the <span className='text-purple-800'>hardest</span> <br />
                    data collection and <br />
                    verification challenges
                  </h4>
                  <div className='flex  gap-4 w-full h-full flex-col'>
                    <p className='text-sm md:text-base text-black  text-left font-semibold'>Check out our tools:</p>
                      <AccordionDemo />
                      

                  </div>
                </div>
            </div>

            <div className='w-full lg:flex hidden'>
              <Image src={hero} width={600} height={800} alt='hero' className='w-full h-full object-contain' />
            </div>

          </div>
        

        </div>

      </div>
      <Partners />
      <Footer />
    </main>

  )
}


