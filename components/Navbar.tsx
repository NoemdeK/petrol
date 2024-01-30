"use client"
import React from 'react'
import { MobileSidebar } from './mobilr-sidebar'
import AvatarDrop from './AvatarDrop'
import Link from 'next/link'
import Logo from './sections/Logo'
import LogoDash from './sections/LogoDash'
import { ModeToggle } from './mode'
import { MobileSidebarData } from './mobilr-sidebardata'
import LogoDashTwo from './sections/LogoDash2'
import { NotifyDrop } from './NotifyDrop'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import useNavbar from '@/lib/useNavbar'

interface NotifyProps{
  data: any;
  length?: number;
  notification?: any
}

const Navbar = ({data, length, notification}: NotifyProps) => {
  const { onOpen} = useNavbar()
  if(!data){
    return null
}
  return (
    <div className=" z-10 flex items-center justify-between  p-0 py-4  w-full ">
        <div className="flex items-center ">
          {
            data.role === "rwx_user" ? 
            <LogoDash />
            :
            <LogoDashTwo role={data?.role} />
          }
        </div>
    <div className="flex gap-4">
    {
            data.role === "rwx_admin" && (
              <NotifyDrop length={length} notification={notification} />
            )
    }
      <ModeToggle />
      <AvatarDrop data={data} />
        {
            data.role === "rwx_data_entry_user" ? (
              <MobileSidebarData  />
            )
            :
            <>
            <MobileSidebar session={data?.role} />

            </>
    }
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onOpen}>
          <Menu  />
        </Button>
    </div>
  </div>
  )
}

export default Navbar