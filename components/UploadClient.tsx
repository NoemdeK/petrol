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
    fillingStation: z.string(),
    state: z.string(),
    city: z.string(),
    product: z.string(),
    price: z.string(),
    priceDate: z.string(),
    supportingDocument: z.string().optional(),
    file: z.any(),
  })




  const statesInNigeria = [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
    'Federal Capital Territory (FCT)'
  ];
  
  const fulling = [
    "NNPC",
    "IOCs (Total, ExxonMobil, etc)",
    "Private Owned  Filling Station"
  ]

export function UploadClient({setBatchData,batchData}: any) {
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

      console.log(batchData, "batch")

      const isLoading = form.formState.isSubmitting;
      const onAddToBatch = async () => {
        // Validate the current form data before adding to the batch
        await form.handleSubmit(async (values) => {
          try {
            // await form.validateForm(values);
    
            const formData = new FormData();
            formData.append("file", values.file[0]);
    
            const fileUploadResponse = await MultiTransportDekApi.post(
              "/upload/files",
              formData
            );
    
            const imageUrl = fileUploadResponse.data.data.url;

            setBatchData((prevBatchData: any) => [
              ...prevBatchData,
              { ...values, supportingDocument: imageUrl },
            ]);

    
            form.reset(); // Reset the form after adding to batch
          } catch (error) {
            console.error("Validation Error:", error);
          }
        })();
      };
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
 
        loading.onOpen()
        onAddToBatch()

        const payload = {
          dataEntry: batchData,
        };
        
        await PlainTransportDekApi.post(
            'data-entry/upload', 
          JSON.stringify(payload),
          {
            headers: {
                Authorization: `Bearer ${data?.user.accessToken}`
            }
          }
        )
          .then(() => {
            form.reset()
            toast({
              title: "New Files Added",
              description: "Done",
              })
            router.refresh()
            window.location.reload()
          })
          .catch((error) => {
            console.error("Error:", error);
            toast({
              variant: "destructive",
              title: "New Docuemnt Error",
              description: `${error.response.data.message}`,
              })
          })
          .finally(() => {
            loading.onClose()
          })        
        }

  return (
    <div className="grid gap-4 py-4 max-w-xl">
      <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <Label className="text-lg md:text-xl">
              Upload Data
            </Label>
            <p className="text-sm">Fill in the form below to upload and submit your data.</p>
          </div>
  
           <FormField
            control={form.control}
            name="fillingStation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filling Station</FormLabel>
                <Select onValueChange={field.onChange}  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Filling station" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  {fulling.map((item: any, i: number) => (
                      <SelectItem key={i} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-80">
                    {statesInNigeria.map((item: any, i: number) => (
                        <SelectItem key={i} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
           </div>

          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  {dataproduct.map((item: any, i: number) => (
                      <SelectItem key={i} value={item.abbr}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="" className="pl-8" type="number" disabled={isLoading} {...field} />
                  </FormControl>
                  <span className="absolute top-6 h-10 w-7 rounded-l-md flex justify-center items-center  bg-gray-200 left-0">
                  ₦
                  </span>

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

          <div>
              <Label className="pb-2">
              Supporting Document
              </Label>
            <UploadFileInput name={"file"} form={form} />


          </div>

          <div className='w-full flex gap-6 mt-2'>
            <Button type="button"  onClick={onAddToBatch} variant={"outline"} disabled={isLoading} className="border-2">Add to Batch</Button>
            <Button type="submit" disabled={isLoading} className="flex-1" >Submit</Button>
          </div>
        </form>

      </Form>

   </div>
  )
}
