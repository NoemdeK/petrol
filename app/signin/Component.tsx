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

const formSchema = z.object({
    email: z.string().email().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    password: z.string()
  })

export function LoginAccount() {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        router.push('/dashboard/analytics')
        console.log(values)
      }
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
  return (
    <Card className="w-96">
      <CardHeader className="space-y-1 text-center">
        <Logo />
        <CardTitle className="text-2xl">Log in</CardTitle>
        <CardDescription>
         Don&apos;t have an account? 
         <span className="text-green-600 ml-2 font-medium">
            <Link href={'/signup'}>
                Sign Up
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
        <div className="flex justify-end">
            <Link href='/' className="font-medium hover:font-bold transition-all">
                forgot password ?
            </Link>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full">Log in</Button>
      </CardFooter>
      </form>
    </Form>
    </Card>
  )
}