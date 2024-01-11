import React from 'react'

//@ts-ignore
import logo from "@/assets/image.svg"
import Image from 'next/image'

const LogoDashTwo = ({role}: {role: string}) => {
  return (
    <div className='text-[#D38320]'>
        <Image src={logo} alt='logo' width={140} height={100} className='w-42 object-contain h-7' />
       <div className='mx-2'>
       {
          role === "rwx_data_entry_user" ?
          <h4 className='font-bold'>Data Collection</h4>
          :
          <h4 className='font-bold tracking-wider '>Admin</h4>
        }
       </div>
    </div>
  )
}

export default LogoDashTwo