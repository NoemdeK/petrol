"use client"
import React, { useEffect } from 'react'
import { CreateAccount } from './Component'
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
    } else {
      router.push("/dashboard/analytics/PMS");
    }
  }, [session, router]);
  return (
    <div className='auth bghero'>
    <div className='h-full flex justify-center items-center'>
      <CreateAccount />
    </div>
  </div>
  )
}

export default Page