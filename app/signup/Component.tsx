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

const formSchema = z.object({
    email: z.string().email().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    password: z.string()
  })

export function CreateAccount() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
  return (
    <Card className="w-96">
      <CardHeader className="space-y-1 text-center">
        <Logo />
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription>
        You have an account? 
         <span className="text-green-600 ml-2 font-medium">
            <Link href={'/signin'}>
                Sign in
            </Link>
         </span>
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="email@gmail.com" {...field} />
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
                <FormLabel>Password </FormLabel>
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
        <Button className="w-full">Create account</Button>
      </CardFooter>
      </form>
    </Form>
    </Card>
  )
}