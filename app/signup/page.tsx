"use client"
import React, { useEffect } from 'react'
import { CreateAccount } from './Component'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Page = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter()

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard/analytics");
    }
  }, [sessionStatus, router]);
  return (
    <div className='auth bghero'>
    <div className='h-full flex justify-center items-center'>
      <CreateAccount />
    </div>
  </div>
  )
}

export default Page