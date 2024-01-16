import React from 'react'

//@ts-ignore
import logo from "@/assets/image.svg"
import Image from 'next/image'

const LogoDashTwo = ({role}: {role: string}) => {
  return (
    <div className='text-[#D38320]'>
        <Image src={logo} alt='logo' width={140} height={100} className='w-42 object-contain h-7' />
       <div className='mx-4'>
       {
          role === "rwx_admin" ?
          <h4 className='font-bold tracking-wider  text-xs'>Admin</h4>
          :
          <h4 className='font-bold text-xs'>Data Collection</h4>
          
        }
       </div>
    </div>
  )
}

export default LogoDashTwo