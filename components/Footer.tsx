"use client"
import { Mail, MapPin, PhoneCall } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react'

const Footer = () => {

  return (
    <footer className='bg-[#535353] text-white p-4 pt-8 tracking-wide'>
        <div className='max-w-7xl mx-auto'>
            <h4 className='font-medium text-base md:text-lg text-white/40 mb-4'>Contact</h4>
            <div className='flex flex-col gap-3'>
                <div className='flex gap-2 items-center'>
                    <div>
                        <MapPin size={18} />
                    </div>
                    <div>
                        <p className='text-xs md:text-sm tracking-wider'>
                            3280 Peachtree Rd NE, 
                            Atlanta, GA 30305,
                            United States.
                        </p>
                    </div>
                </div>

                <div className='flex gap-2 items-center'>
                    <div>
                        <Mail size={18} />
                    </div>
                    <div>
                        <a href='mailto:innovate@diophalytics.io' className='text-xs md:text-sm tracking-wider'>
                            innovate@diophalytics.io
                        </a>
                    </div>
                </div>

                <div className='flex gap-2 items-center'>
                    <div>
                        <PhoneCall size={18} />
                    </div>
                    <div>
                        <p className='text-xs md:text-sm'>
                        +1 909-869-2797
                        </p>
                    </div>
                </div>


            </div>
            <div>
            <p className='text-xs md:text-sm text-center mt-8'>
               &copy; 2024 Diophalytics
            </p>
        </div>
        </div>
        
    </footer>
  )
}

export default Footer