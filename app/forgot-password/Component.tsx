"use client"

 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowBigLeft, Eye, EyeOff, Github } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Logo from "@/components/sections/Logo"
import { useRouter } from "next/navigation"
import { PlainTransportDekApi, authAxiosInstance } from "@/utils/axios"
import { signIn } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
    email: z.string().email().min(2, {
      message: "Email must be at least 2 characters.",
    })
  })

export function Forgot() {
    const rouyter = useRouter()
    const { toast } = useToast()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
      })
     
      // 2. Define a submit handler.


      async function onSubmit(values: z.infer<typeof formSchema>) { 
        await PlainTransportDekApi.post(
          "/auth/forgot-password",
          values
        )
          .then(() => {
            console.log("win")
            toast({
                title: "Email Sent",
                description: "Check your inbox",
                })
          })
          .catch((error: any) => {
            toast({
                title: "Error",
                description: `${error.response.data.message}`,
                variant: "destructive"
            })
            console.log("winnot")
            console.log(error)
         
          
          })
          .finally(() => {
          })   
        }
      
  return (
    <div className='h-full flex justify-center items-center relative'>
        
    <Button size={"icon"} className="absolute top-8 left-0" onClick={() => rouyter.back()}>
        <ArrowBigLeft />
    </Button>
        <Card className="w-96">
        <CardHeader className="space-y-1 text-center">

            <Logo />
            <CardTitle className="text-xl">Forgot Password</CardTitle>
    
        </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <CardContent className="grid gap-2">
            <div className="grid gap-1">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="email@gmail.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        

        </CardContent>

        <CardFooter>
            <Button className="w-full" type="submit">Submit</Button>
        </CardFooter>
        </form>
        </Form>
        </Card>
    </div>
  )
}