import React from 'react'
import Form from '../components/Form'
import { Mail, MapPin, PhoneCall } from 'lucide-react';

const Page = () => {
  return (
    <div className='py-16 contact'>
        <div className='max-w-7xl mx-auto pt-28'>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
            <Form />
            <div className='flex flex-col justify-center '>
                <h4 className='font-bold text-base md:text-lg  mb-2'>Contact</h4>
                <div className='flex flex-col gap-3'>
                    <div className='flex gap-2 '>
                        <div>
                            <MapPin size={18} />
                        </div>
                        <div>
                            <p className='text-xs md:text-sm  lg:text-base tracking-wider'>
                            320 Peachtree Rd NE <br />
                            Atlanta, GA <br />
                            United States <br />
                            30305
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <div>
                            <Mail size={18} />
                        </div>
                        <div>
                            <a href='mailto:innovate@diophalytics.io' className='text-xs md:text-sm lg:text-base tracking-wider'>
                                innovate@diophalytics.io
                            </a>
                        </div>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <div>
                            <PhoneCall size={18} />
                        </div>
                        <div>
                            <p className='text-xs md:text-sm lg:text-base'>
                            +1 909-869-2797
                            </p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        </div>

    </div>
  )
}

export default Page