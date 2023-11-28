import React from 'react'

//@ts-ignore
import logo from "@/assets/logo.PNG"
import Image from 'next/image'
const Logo = () => {
  return (
    <div>
        <Image src={logo} alt='logo' width={100} height={50} />
    </div>
  )
}

export default Logo