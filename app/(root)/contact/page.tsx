import React from 'react'
import Form from '../components/Form'
import { Mail, MapPin, PhoneCall } from 'lucide-react';

import contactImg from "@/assets/contact.svg"
import Image from 'next/image';

const Page = () => {
  return (
    <div className=''>
        {/* <img src="https://res.cloudinary.com/dnir0cslk/image/upload/v1706772625/ef16d7d75fcf306a0e31cd2de88fa91f_p5yl2x.jpg"
            className='w-full h-full object-fill'
        alt="" /> */}
        <div className=' py-16 '>

        <div className='max-w-7xl mx-auto pt-28 '>

        <div className='grid grid-cols-1 place-items-center'>
            <div className='relative'>
              <div className='absolute -left-10 sm:-left-20 -top-8'>
                <Image src={contactImg} alt='contact' width={100} height={100} />
              </div>
              <h4 className='text-xl md:text-3xl lg:text-4xl'>
              Get in touch
              </h4>
              <p className='text-sm md:text-base'>
              Need more information? Reach out to our team with your inquiries.
              </p>
            </div>
            <Form />
        </div>
        </div>
        </div>

    </div>
  )
}

export default Page