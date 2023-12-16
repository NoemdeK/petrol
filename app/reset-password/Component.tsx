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
import { Eye, EyeOff, Github } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Logo from "@/components/sections/Logo"
import {  useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"


const formSchema = z.object({
    password1: z.string().email().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    password: z.string()
  })

  

export function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword1, setShowPassword1] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
      })

    
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
        // const response = await signIn("credentials", {values, redirect: false});
        // console.log(response)
        try {
          const response = await signIn("credentials", {
     
          });

      
          if (response?.error) {
            // Handle authentication error
            console.error("Authentication error:", response.error);
          } else if (response?.ok) {
            // Authentication succeeded
            toast({
              title: "Password Reset",
              description: "Now, Log in",
              })
          
            // Redirect the user to the desired location
            router.push('/signin');
          }
        } catch (error: any) {
          // Handle unexpected errors
          toast({
            title: "Cannot reset password",
            description: `${error.response.data.message}`,
            variant: "destructive"
            })
        
        
        }
          // router.push('/dashboard/analytics')
      }


      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
      };

  return (
    <Card className="w-96">
      <CardHeader className="space-y-1 text-center">
        <Logo />
        <CardTitle className="text-2xl">Reset Password</CardTitle>

      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
            <FormField
                control={form.control}
                name="password1"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <div className="relative">
                    <Input type={showPassword1 ? 'text' : 'password'} {...field} />
                    <span
                        className={`password-toggle ${showPassword1 ? 'visible' : ''} cursor-pointer absolute top-3 right-1`}
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
        <div className="grid gap-2">
        <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
            <FormItem  className="flex flex-col gap-1">
                <FormLabel>Confirm Password </FormLabel>
                <FormControl>
                    <div className="relative">
                    <Input type={showPassword ? 'text' : 'password'} {...field} />
                    <span
                        className={`password-toggle ${showPassword ? 'visible' : ''} cursor-pointer absolute top-3 right-1`}
                        onClick={togglePasswordVisibility}
                    > 
                    {
                        showPassword ?  <EyeOff size={14} /> : <Eye size={14} />
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
        <Button className="w-full" type="submit">Submit</Button>
      </CardFooter>
      </form>
    </Form>
    </Card>
  )
}