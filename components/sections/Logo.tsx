import React from 'react'

//@ts-ignore
import logo from "@/assets/petroDataLogo.png"
import Image from 'next/image'
const Logo = () => {
  return (
    <div>
        <Image src={logo} alt='logo' width={140} height={70} className='' />
    </div>
  )
}

export default Logo