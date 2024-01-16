"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {  toast } from "@/components/ui/use-toast"


import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MultiTransportDekApi, PlainTransportDekApi } from "@/utils/axios";
import { useSession } from "next-auth/react";
import { UploadFileInput } from "./UploadFile";
import { data as dataproduct } from "./SelectProductNew";
import { useRouter } from "next/navigation";
import useLoading from "@/lib/useLoading";
import { useState } from "react";



export const formSchema = z.object({
    price: z.string(),
    priceDate: z.string(),
  })




 
export function UploadClientIce({setBatchData,batchData}: any) {
    const {data} = useSession()
    const router = useRouter()
    const loading = useLoading()

    
    const form = useForm<z.infer<typeof formSchema>>({
        mode: "onBlur",
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
      })
    const onCancel = () => {
        form.reset()
      }


      const isLoading = form.formState.isSubmitting;

      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>)  {
 
        loading.onOpen()

        
        await PlainTransportDekApi.post(
            'data-entry/upload/ice', 
          JSON.stringify({...values, product: "ICE"}),
          {
            headers: {
                Authorization: `Bearer ${data?.user.accessToken}`
            }
          }
        )
          .then(() => {
            form.reset()
            toast({
              title: "New Data Entry Added",
              description: "Done",
              })
            router.refresh()
            window.location.reload()
          })
          .catch((error) => {
            console.error("Error:", error);
            toast({
              variant: "destructive",
              title: "Entry Error",
              description: `${error.response.data.message}`,
              })
          })
          .finally(() => {
            loading.onClose()
          })        
        }


  return (
    <div className="grid gap-4  max-w-xl my-4 p-4">
      <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <Label className="text-lg md:text-xl mt-8">
              Upload Data
            </Label>
            <p className="text-sm">Fill in the form below to upload and submit your data.</p>
          </div>
          <br />
  

          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <Label>Product </Label>
              <Input placeholder="" disabled={true}  value={"ICE Brent Crude (IBC)"} />  
            </div>    

              <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" disabled={isLoading} {...field} />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

          <FormField
              control={form.control}
              name="priceDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Date</FormLabel>
                  <FormControl>
                    <Input type="date" disabled={isLoading} {...field} />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>



          <div className='w-full flex gap-6 mt-2'>

              <Button type="submit" disabled={isLoading} className="flex-1" >Upload</Button>

          </div>
        </form>

      </Form>

   </div>
  )
}
