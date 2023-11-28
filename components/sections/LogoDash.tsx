import React from 'react'

//@ts-ignore
import logo from "@/assets/Capture.PNG"
import Image from 'next/image'

const LogoDash = () => {
  return (
    <div>
        <Image src={logo} alt='logo' width={140} height={100} className='w-42 object-contain h-20' />
    </div>
  )
}

export default LogoDash