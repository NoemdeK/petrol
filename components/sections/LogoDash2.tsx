import React from 'react'

//@ts-ignore
import logo from "@/assets/image.svg"
import Image from 'next/image'

const LogoDashTwo = () => {
  return (
    <div>
        <Image src={logo} alt='logo' width={140} height={100} className='w-42 object-contain h-20' />
    </div>
  )
}

export default LogoDashTwo