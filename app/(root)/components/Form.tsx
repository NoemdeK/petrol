"use client"
import React from 'react'

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

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Textarea } from '@/components/ui/textarea'


const formSchema = z.object({
    email: z.string().email().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    message: z.string(),
    subject: z.string(),
    fullname: z.string(),
  })

const FormComponent = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      })

    
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
 
      }
  return (
    <Card className="sm:w-96 w-full md:w-[600px]">
    <CardHeader className="space-y-1 text-left">
      <CardTitle className="text-2xl">Get in touch</CardTitle>
      <CardDescription className='font-medium'>
      Need more information? Reach out to our team with your inquiries.
      </CardDescription>
    </CardHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
    <CardContent className="grid gap-4">
      <div className="grid gap-4">
          <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                  <FormItem>
                  <FormControl>
                      <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
          />
        <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                  <FormItem>
                  <FormControl>
                      <Input placeholder="Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
          />
        <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                  <FormItem>
                  <FormControl>
                      <Input placeholder="Subject" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
          />
           <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                  <FormItem>
                  <FormControl>
                      <Textarea placeholder="Write a message" {...field} />
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

export default FormComponent