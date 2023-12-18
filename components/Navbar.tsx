import React from 'react'
import { MobileSidebar } from './mobilr-sidebar'
import AvatarDrop from './AvatarDrop'
import Link from 'next/link'
import Logo from './sections/Logo'
import LogoDash from './sections/LogoDash'
import { ModeToggle } from './mode'

const Navbar = ({data}: any) => {
  if(!data){
    return null
}
  return (
    <div className="flex items-center justify-between  p-0  w-full ">
        <Link href="/" className="flex items-center pl-3">
            <LogoDash />
        </Link>
    <div className="flex gap-4">
      <ModeToggle />
      <AvatarDrop data={data} />
    <MobileSidebar  />
    </div>
  </div>
  )
}

export default Navbar