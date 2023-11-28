import React from 'react'
import { MobileSidebar } from './mobilr-sidebar'
import AvatarDrop from './AvatarDrop'
import Link from 'next/link'
import Logo from './sections/Logo'
import LogoDash from './sections/LogoDash'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between  px-4  w-full ">
        <Link href="/dashboard" className="flex items-center pl-3">
            <LogoDash />
        </Link>
    <div className="">
      <AvatarDrop />
    <MobileSidebar  />
    </div>
  </div>
  )
}

export default Navbar