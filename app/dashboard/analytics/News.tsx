"use client"


import axios from 'axios';
import { useSession } from 'next-auth/react';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const News = () => {
  const params = useSearchParams()
  const {data} = useSession()
  const [datax, setDatax] = useState([]);



  const flag = params.get("product")
  const token = data?.user.accessToken



 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://petrodata.zainnovations.com/api/v1/petro-data/analysis/projections",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              flag: flag || "PMS" ,
              page: 1,
            },
          }
        );

        setDatax(response.data.data.articles);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [flag]); // The empty dependency array ensures that the effect runs once when the component mounts

if(datax.length < 1){
  return <div className='m-6 w-full overflow-hidden'>
    <p className='text-center font-medium'>
      No news available
    </p>
  </div>
}
  return (
    <div className='space-y-4'>
      {
        datax.map((item: any, i) => (
          <div key={i} className='flex items-center gap-2 cursor-pointer rounded-md transition-all hover:scale-95 bg-muted p-1'>
            <div  className="bg-muted w-32 h-32 flex items-center">
              <img src={item.image} alt={item.title} className='aspect-square object-cover rounded-md' />
            </div>
            <div className='w-full space-y-1' >
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