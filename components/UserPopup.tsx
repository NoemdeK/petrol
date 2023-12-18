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
import { signOut } from 'next-auth/react'
import { LogOutIcon } from 'lucide-react'


export function UserPop({data}: any) {
    if(!data){
        return null
    }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center">Hello {data?.firstName} 👋</CardTitle>
        <CardDescription className="text-sm text-center">{data?.email}</CardDescription>
      </CardHeader>
 
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button className='flex justify-between items-center gap-2 bg-destructive text-white hover:text-accent'
                onClick={() => signOut()}
            >
                Log Out <LogOutIcon size={12} />
            </Button>
      </CardFooter>
    </Card>
  )
}
