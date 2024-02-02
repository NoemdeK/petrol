import React from 'react'
import Form from '../components/Form'
import { Mail, MapPin, PhoneCall } from 'lucide-react';

const Page = () => {
  return (
    <div className=''>
        {/* <img src="https://res.cloudinary.com/dnir0cslk/image/upload/v1706772625/ef16d7d75fcf306a0e31cd2de88fa91f_p5yl2x.jpg"
            className='w-full h-full object-fill'
        alt="" /> */}
        <div className=' py-16 '>

        <div className='max-w-7xl mx-auto pt-28 '>

        <div className='grid grid-cols-1 gap-8 md:gap-12 place-items-center'>
            <Form />
        </div>
        </div>
        </div>

    </div>
  )
}

export default Page