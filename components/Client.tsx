"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Client = ({
    children,
    session
  }: {
    children: React.ReactNode,
    session: string
  })  => {
      const router = useRouter()

  useEffect(() => {
    if (session === "rwx_data_entry_user") {
      router.replace("/data-entry");
    } else if (session === "rwx_admin"){
      router.replace("/admin");
    } else {
      router.push("/dashboard/analytics/PMS");
    }
  }, [session, router]);
    // console.log(session)
  return (
    <div className='h-full relative'>
        {children}
    </div>
  )
}

export default Client