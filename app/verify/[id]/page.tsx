"use client"

import React, { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

const Page = ({params}: {params: any}) => {
  const [isMounted, setIsMounted] = useState()
  const router = useRouter()
  const id = params.id

  useEffect(() => {
    setIsMounted(isMounted)
  })
  
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch(`https://petrodata.zainnovations.com/api/v1/user/account/verify?id=${id}`, {
          method: 'POST',
          
        });

        const data = await response.json();
        if(data.data.hasPassword){
          router.push("/signin")
        } else {
          router.push(`/auth/create-password/${id}`)
        }
        toast({
          description: "Verification success!"
        })
        // alert('User is verified!');
        // You can redirect the user to another page or perform additional actions as needed
      } catch (error) {
        console.error('Error:', error);
        toast({
          variant: "destructive",
          description: "Error occurred during verification"
        })
        router.push("/signup")
      }
    };

    verifyUser();
  }, [id]);

  if(!isMounted){
    return null
  }

  return (
    <Dialog open={true}>
    <DialogTrigger asChild>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Verification</DialogTitle>

      </DialogHeader>
        <div className="loader"></div>
      <DialogFooter>
      </DialogFooter>
    </DialogContent>
  </Dialog> 
   )
}

export default Page