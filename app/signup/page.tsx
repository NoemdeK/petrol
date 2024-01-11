"use client"
import React, { useEffect } from 'react'
import { CreateAccount } from './Component'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {




  return (
    <div className='auth bghero'>
    <div className='h-full flex justify-center items-center'>
      <CreateAccount />
    </div>
  </div>
  )
}

export default Page