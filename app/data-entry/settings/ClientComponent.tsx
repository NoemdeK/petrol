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

  import { AspectRatio } from "@/components/ui/aspect-ratio"

import { NotificationsForm } from '@/components/Notification'
import { Disc3 } from 'lucide-react'
import { FileInput } from '@/components/FileInput'
import { useSession } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'

import { MultiTransportDekApi, PlainTransportDekApi } from "@/utils/axios";
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import useEditUserTwo from '@/lib/useEdit2'


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
  const {data: session} = useSession()
  const router = useRouter()

  const edit = useEditUserTwo()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })



  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${session?.user.accessToken}`);
    

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
      const response = await fetch(`https://petrodata.zainnovations.com/api/v1/data-entry/settings?flag=profile`, requestOptions);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    } finally{
      setIsLoading(false)
    }
  }


  // async function onSubmit(values: z.infer<typeof formSchema>) {
    
 
  //   setIsLoading(true)
    
  //   const formdata = new FormData();

    
  //   const appendToFormData = (key: string, value: any) => {
  //     // Check if value exists and is an array with at least one element
  //     if (value && Array.isArray(value) && value.length > 0) {
  //       for (let i = 0; i < value.length; i++) {
  //         formdata.append(key, value[i]);
  //       }
  //     } else if (value !== undefined && value !== null) {
  //       // Append non-array values that are not undefined or null
  //       formdata.append(key, value);
  //     }
  //   };
  
  
  //   // Iterate over the keys in values and append them to formdata
  //   Object.keys(values).forEach((key) => {
  //     // @ts-ignore
  //     appendToFormData(key, values[key]);
  //   });   
  //   await MultiTransportDekApi.patch(
  //       `auth/me/settings`, 
  //     formdata,
  //     {
  //       headers: {
  //           Authorization: `Bearer ${session?.user.accessToken}`
  //       }
  //     }
  //   )
  //     .then(() => {
  //       form.reset()
  //       toast({
  //         title: "User Edited",
  //         description: "Done",
  //         })
  //       router.refresh()
  //       window.location.reload()
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       toast({
  //         variant: "destructive",
  //         title: "Edit Error",
  //         description: `${error.response.data.message}`,
  //         })
  //     })
  //     .finally(() => {
  //       setIsLoading(false)
  //     })        
  //   }

  const data_entry = [
    {
      role: "User ID",
      name: "PD-AI3",
    },
    {
      role: "First Name",
      name: data.firstName,
    },
    {
      role: "Last Name",
      name: data.lastName,
    },
    {
      role: "Email Address",
      name: data.email,
    },
    {
      role: "Role",
      name: `Field Agent`,
    },
  ]
  return (
    <Tabs defaultValue="account" className="max-w-[600px]">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="account">Profile</TabsTrigger>
      <TabsTrigger value="password">Notification</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <Card>
        <CardContent className="space-y-2">
          <div className='flex items-center justify-between flex-row p-2 mb-6'>
            <h4 className='text-base md:text-2xl font-bold'>Profile</h4>
          <Button onClick={() => {
            edit.onOpen()
            edit.setData(data)
          }}>
               Edit
            </Button>
          </div>
            <div className='w-32 mt-12'>
            <AspectRatio ratio={1 / 1} className="bg-muted">
              <img
                src={data.avatar}
                alt="Photo by Drew Beamer"
                
                // fill
                className="rounded-full w-28 aspect-square"
              />
            </AspectRatio>
            </div>
            <div className='space-y-3'>
              {
                data_entry.map((item, i) => (
                  <div key={i} className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='font-medium text-sm'>{item.role}</p>
                    </div>
                    <div>
                      <p className='text-sm'>{item.name}</p>
                    </div>
                  </div>
                ))
              }
            </div>
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
            <NotificationsForm data={data} />

            </CardContent>
        </Card>
    </TabsContent>
  </Tabs>  )
}

export default ClientComponent

{/* <Form {...form}>
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
  <Button type='submit'>
  {isLoading && (
    <Disc3 className="mr-2 h-4 w-4 animate-spin" />
  )}
    Save changes
  </Button>
</CardFooter>

</form>
</Form> */}