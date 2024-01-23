"use client"

 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
import { Eye, EyeOff, Github } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Logo from "@/components/sections/Logo"
import { useRouter } from "next/navigation"
import { PlainTransportDekApi, authAxiosInstance } from "@/utils/axios"
import { signIn } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import useLoading from "@/lib/useLoading"

//@ts-ignore
const formSchema = z.object({
    password: z.string(),
    confirmPassword: z.string(),
  })

export function Client({id}: {id: string}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const router = useRouter()

    const loading = useLoading()

    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
      };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      })
     
      // 2. Define a submit handler.


      async function onSubmit(values: z.infer<typeof formSchema>) { 
        try {
          loading.onOpen()
          const response = await axios.post(`https://petrodata.zainnovations.com/api/v1/auth/create-password?id=${id}`, values, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          // Assuming the server responds with a success message
          console.log('Success:', response.data);
          
          // You can add your success handling logic here
          toast({
            description: "Password reset",
          });
          router.push("/signin");
        } catch (error: any) {
          console.error('Error:', error);
      
          // Assuming the server responds with an error message
          toast({
            description: `${error.response.data.message}`,
            variant: "destructive"
          });
        } finally {
          loading.onClose()
        }
        }
  
        
  return (
    <div className='h-full flex justify-center items-center relative'>

    <Card className="w-96">
      <CardHeader className="space-y-1 text-center">
        <Logo />
        <CardTitle className="text-2xl">Create Password</CardTitle>
        <CardDescription>
          Complete your account registration by creating a password.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <CardContent className="grid gap-2">
  
        <div className="grid gap-1">
        <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
            <FormItem  className="flex flex-col gap-1">
                <FormLabel> Password </FormLabel>
                <FormControl>
                    <div className="relative">
                    <Input type={showPassword1 ? 'text' : 'password'} {...field} />
                    <span
                        className={`password-toggle ${showPassword ? 'visible' : ''} cursor-pointer absolute top-3 right-1`}
                        onClick={togglePasswordVisibility1}
                    > 
                    {
                        showPassword1 ?  <EyeOff size={14} /> : <Eye size={14} />
                    }
                    </span>
                    </div>
                </FormControl>
            <FormMessage />
            </FormItem>
          )}
      />
        </div>
        <div className="grid gap-1">
        <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
            <FormItem  className="flex flex-col gap-1">
                <FormLabel> Confirm Password </FormLabel>
                <FormControl>
                    <div className="relative">
                    <Input type={showPassword1 ? 'text' : 'password'} {...field} />
                    <span
                        className={`password-toggle ${showPassword ? 'visible' : ''} cursor-pointer absolute top-3 right-1`}
                        onClick={togglePasswordVisibility1}
                    > 
                    {
                        showPassword1 ?  <EyeOff size={14} /> : <Eye size={14} />
                    }
                    </span>
                    </div>
                </FormControl>
            <FormMessage />
            </FormItem>
          )}
      />
        </div>

      </CardContent>

      <CardFooter>
        <Button className="w-full">Create</Button>
      </CardFooter>
      </form>
    </Form>
    </Card>
    </div>

  )
}