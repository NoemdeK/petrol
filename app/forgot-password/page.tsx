"use client"
import React, { useEffect } from 'react'
import { Forgot } from './Component'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Forgotpage = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter()

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard/analytics");
    }
  }, [sessionStatus, router]);
  return (
    <div className='auth bghero'>
        <Forgot />
    </div>
  )
}

export default Forgotpage