"use client"
import React, { useEffect } from 'react'

import {  LoginAccount } from './Component'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { data: session, status: sessionStatus  } = useSession();
  const router = useRouter()

  if (session?.user) {
    const { role } = session.user;

    switch (role) {
      case 'rwx_data_entry_user':
        router.replace('/data-entry');
        break;
      case 'rwx_admin':
        router.replace('/admin');
        break;
      case 'rwx_user':
        router.replace('/dashboard/analytics/PMS');
        break;
      default:
        router.replace('/dashboard/analytics/PMS');
        break;
    }
  }
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