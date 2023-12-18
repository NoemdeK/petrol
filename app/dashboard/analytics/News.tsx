"use client"


import urlFor from '@/sanity/lib/urlFor';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import React, { useEffect, useState } from 'react'

const News = ({posts}: any) => {




  // const flag = params.get("product")

if(!posts|| posts.length < 1){
  return <div className='m-6 w-full overflow-hidden'>
    <p className='text-center font-medium'>
      No posts available
    </p>
  </div>
}
  return (
    <div className='space-y-4'>
      {
        posts.map((item: any) => (
          <div key={item.slug} className='flex  flex-col md:flex-row items-center gap-2 cursor-pointer rounded-md transition-all hover:scale-95 bg-muted p-1'>
            <div  className="bg-muted md:w-32 md:h-32 h-40 w-full flex items-center">
            <Image
              alt={item.title}
              className={`object-cover object-center h-full w-full `}
              height={128}
              src={
                urlFor(item.mainImage).url()
              }
              width={128}
              
            />
              {/* <img src={item.image} alt={item.title} className='aspect-square object-cover rounded-md h-full w-full' /> */}
            </div>
            <div className='w-full space-y-1 py-2 md:py-0' >
              <h4 className='text-xs font-medium'>
                {item.title}
              </h4>
              <p className='text-[10px]'>
                {item.description}
              </p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default News