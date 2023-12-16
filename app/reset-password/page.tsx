"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Resetpage = () => {
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
        {/* <LoginAccount /> */}
      </div>
    </div>  )
}

export default Resetpage