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
import { ArrowBigLeft, ChevronLeft, ChevronRight, Eye, EyeOff, Github } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Logo from "@/components/sections/Logo"
import { useRouter } from "next/navigation"
import { PlainTransportDekApi, authAxiosInstance } from "@/utils/axios"
import { signIn } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"
import useLoading from "@/lib/useLoading"
import Footer from "@/components/Footer"

const formSchema = z.object({
    email: z.string().email().min(2, {
      message: "Email must be at least 2 characters.",
    })
  })

export function Forgot() {
    const rouyter = useRouter()
    const { toast } = useToast()
    const loading = useLoading()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
      })
     
      // 2. Define a submit handler.


      async function onSubmit(values: z.infer<typeof formSchema>) { 
        loading.onOpen()
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
                description: `${error.response.data.message}`,
                variant: "destructive"
            })
          
          })
          .finally(() => {
            loading.onClose()
          })   
        }
      
  return (

     <div className='petrodata'>
      <div className='overlay  grid grid-cols-1 md:grid-cols-2  sm:p-8 lg:p-16'>
        <div className='h-full w-full flex justify-center items-center lg:mt-14'>
            
            <Button size={"icon"} className="fixed top-8 left-8 bg-white text-black" onClick={() => rouyter.back()}>
                <ChevronLeft />
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
        <div className='lg:block hidden'>
          <h4 className='text-black text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-right'>
              Empower your business <br /> with <span className='text-[#A75C00]'>real-time</span> <br /> petroleum insights
            </h4>
        </div>
      </div>
      <Footer />
     </div>
  )
}