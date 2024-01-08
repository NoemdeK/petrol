"use client"
import React, { useEffect } from 'react'

import {  LoginAccount } from './Component'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { data: session, status: sessionStatus  } = useSession();
  const router = useRouter()


  useEffect(() => {
    if (session?.user.role === "rwx_data_entry_user") {
      router.replace("/data-entry");
    } else if (session?.user.role === "rwx_admin"){
      router.replace("/admin");
    }  else if (session?.user.role === "rwx_user"){
      router.replace("/dashboard/analytics/PMS");
    }  else {
      router.push("/dashboard/analytics/PMS");
    }
  }, [session, router]);
  // useEffect(() => {
  //   if (sessionStatus === "authenticated") {
  //     router.replace("/dashboard/analytics/PMS");
  //   }
  // }, [sessionStatus, router]);
  return (
    <div className='auth bghero'>
      <div className='h-full flex justify-center items-center'>
        <LoginAccount />
      </div>
    </div>
  )
}

export default Page