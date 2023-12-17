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





const AvatarDrop = () => {
  // const onLogout = () => {
  //   signOut()
  // }
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Avatar>
        <AvatarImage src="https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="cursor-pointer">
            <Button className='flex justify-between items-center w-full bg-destructive text-background hover:text-accent'
                onClick={() => signOut()}
            >
                Log Out <LogOutIcon />
            </Button>
        </DropdownMenuItem>
        
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default AvatarDrop