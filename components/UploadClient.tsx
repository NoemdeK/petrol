"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {  toast } from "@/components/ui/use-toast"


import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { MultiTransportDekApi } from "@/utils/axios";
import { useSession } from "next-auth/react";
import { UploadFileInput } from "./UploadFile";

const formSchema = z.object({
    file: z.any(),
    photo: z.any(),
  })

export function UploadClient() {
    const {data} = useSession()
    
    const form = useForm<z.infer<typeof formSchema>>({
        mode: "onBlur",
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
      })
    const onCancel = () => {
        form.reset()
      }
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("onSubmit")
        // loading.onOpen()
        const formdata = new FormData();
        formdata.append("photo", values.photo[0]);
        formdata.append("file", values.file[0]);
  
  
        await MultiTransportDekApi.post(
            'petro-data/upload', 
          formdata,{
            headers: {
                Authorization: `Bearer ${data?.user.accessToken}`
            }
          }
        )
          .then(() => {
           toast({
            title: "New Files Added",
            description: "Done",
            })
            console.log("yes")
            onCancel()
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
            // loading.onClose()
          })        
        }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upload File</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] bg-secondary">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Upload the required files. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <hr className="bg-secondary-foreground h-0.5" />
        <div className="grid gap-4 py-4">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
            <Label className="pb-2">
                Photo
            </Label>
          <UploadFileInput name={"photo"} form={form} />


        </div>
        <div>
            <Label className="pb-2">
            File
            </Label>
          <UploadFileInput name={"file"} form={form} />


        </div>

        <DialogFooter>
          <div className='w-full flex justify-between'>
            <Button type="submit">Save</Button>
          </div>
        </DialogFooter>
      </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
