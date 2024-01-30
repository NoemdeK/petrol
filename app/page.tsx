"use client"


import Logo from '@/components/sections/Logo'
import Image from 'next/image'
import Link from 'next/link'


import React from 'react'
import { cn } from '@/lib/utils'
import Canvas from '@/components/Canvas'

import type { Metadata } from 'next'

import hero from "@/assets/how-to-solve-worlds-biggest-problems 1.svg"
import { AccordionDemo } from '@/components/Accordion'
import Footer from '@/components/Footer'
import Partners from '@/components/sections/Partners'
import NavigationBar from '@/components/NavigationBar'


export default function Home() {

  return (
    <main className='min-h-screen flex-col flex hero p-0 m-0 justify-between gap-0'>
      
      <div className=' w-full h-full relative'>

        <div className="max-w-7xl w-full mx-auto  items-center justify-between flex py-4 px-4 md:px-0 md:py-8">
          <p className=" left-0 top-0 flex w-full text-lg sm:text-2xl md:text-4xl pb-6 pt-8 text-sky-400  lg:static lg:w-auto   lg:p-4 ">
            dio<span className='font-bold'>phalytics</span><span className='text-black'>.io</span>
          </p>

          <div className="w-fit items-end justify-end bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">

         <NavigationBar />

          </div>
        </div>
        <div className=" max-w-7xl mx-auto flex h-full flex-col w-full pb-8  gap-12 p-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">

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

            <div className='w-full md:flex hidden'>
              <Image src={hero} width={600} height={600} alt='hero' className='w-full h-full object-cover' />
            </div>

          </div>
        

        </div>

      </div>
      <Partners />
      <Footer />
    </main>

  )
}


