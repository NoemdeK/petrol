"use client"
import React from 'react'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { Label } from "@/components/ui/label"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

  
import { NotificationsForm } from '@/components/Notification'
import { Disc3 } from 'lucide-react'
import { FileInput } from '@/components/FileInput'
import { useSession } from 'next-auth/react'


const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }).optional(),
  lastName: z.string().min(2, {
    message: "LastName must be at least 2 characters.",
  }).optional(),
  email: z.string().optional(),
  file: z.any()
})

const ClientComponent = ({data}: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const session = useSession()

  console.log(data)

  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `${data.accessToken}`);

    const formdata = new FormData();
    formdata.append("firstName", values.firstName ?? "");
    formdata.append("lastName", values.lastName ?? "");
    formdata.append("email", values.email ?? "");
    formdata.append("file", values.file[0]);

    const requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: formdata,
    };
    
    try {
      const response = await fetch(`https://petrodata.zainnovations.com/api/v1/auth/me/settings?id=${data._id}`, requestOptions);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <Tabs defaultValue="account" className="w-[700px]">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="account">Profile</TabsTrigger>
      <TabsTrigger value="password">Notification</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className='flex items-center gap-4'>
                  <FileInput form={form} name="file" data={data} />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} defaultValue={data.firstName} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} defaultValue={data.lastName} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
             
            <CardFooter>
              <Button type='submit' disabled={isLoading}>
              {isLoading && (
                <Disc3 className="mr-2 h-4 w-4 animate-spin" />
              )}
                Save changes
              </Button>
            </CardFooter>

            </form>
          </Form>

        </CardContent>

      </Card>
    </TabsContent>
    <TabsContent value="password">
        <Card>
            <CardHeader>
                <CardTitle>
                Notifications
                </CardTitle>
                <CardDescription>
                    Configure how you receive notifications.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <NotificationsForm />

            </CardContent>
        </Card>
    </TabsContent>
  </Tabs>  )
}

export default ClientComponent