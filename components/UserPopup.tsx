import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { signOut, useSession } from 'next-auth/react'
import { LogOutIcon } from 'lucide-react'
import useLoading from "@/lib/useLoading"
import { useRouter } from "next/navigation"


export function UserPop({data}: any) {
  const { data: session } = useSession()
  const loading = useLoading()
  const router = useRouter()

     if(!data){
        return null
    }

    const handleFetch = async  () => {
      loading.onOpen()

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${session?.user.accessToken}`);
      try {
        const response = await fetch(
          `https://petrodata.zainnovations.com/api/v1/auth/logout`,
          {
            method: 'POST',
            redirect: 'follow',
            headers: myHeaders,
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.text();
        signOut()
        router.replace("/signin")
       
        
      } catch (error: any) {
        console.error('Error:', error.message);
      } finally{
        loading.onClose()

      }
      
    }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center text-lg">Hello {data?.firstName} 👋</CardTitle>
        <CardDescription className="text-sm text-center">{data?.email}</CardDescription>
      </CardHeader>
 
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button className='flex justify-between items-center gap-2 bg-destructive text-white hover:text-accent'
                onClick={handleFetch}
            >
                Log Out <LogOutIcon size={12} />
            </Button>
      </CardFooter>
    </Card>
  )
}
