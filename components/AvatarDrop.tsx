"use client"
import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
  
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { LogOutIcon } from 'lucide-react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import { UserPop } from './UserPopup'





const AvatarDrop = ({data}: any) => {
  // const onLogout = () => {
  //   signOut()
  // }
  if(!data){
    return null
}
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Avatar>
        <AvatarImage src={data?.avatar} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-fit">
      <DropdownMenuItem>
        <UserPop data={data} />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default AvatarDrop