import React from 'react'
import { MobileSidebar } from './mobilr-sidebar'
import AvatarDrop from './AvatarDrop'
import Link from 'next/link'
import Logo from './sections/Logo'
import LogoDash from './sections/LogoDash'
import { ModeToggle } from './mode'
import { MobileSidebarData } from './mobilr-sidebardata'
import LogoDashTwo from './sections/LogoDash2'

const Navbar = ({data}: any) => {
  if(!data){
    return null
}
console.log(data)
  return (
    <div className="flex items-center justify-between  p-0  w-full ">
        <div className="flex items-center pl-3">
          {
            data.role === "rwx_user" ? 
            <LogoDash />
            :
            <LogoDashTwo />
          }
        </div>
    <div className="flex gap-4">
      <ModeToggle />
      <AvatarDrop data={data} />
      {
        data.role === "rwx_data_entry_user" ?

        <MobileSidebarData />
        :
        <MobileSidebar />
      }
      
    </div>
  </div>
  )
}

export default Navbar