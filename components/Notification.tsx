"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Switch } from "./ui/switch"
import { toast } from "./ui/use-toast" 
import useLoading from "@/lib/useLoading"
import { PlainTransportDekApi } from "@/utils/axios"
import { useSession } from "next-auth/react"
import { Label } from "./ui/label"

const notificationsFormSchema = z.object({
  emails: z.boolean().optional(),
})

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

// This can come from your database or API.


export function NotificationsForm({data}:any) {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emails: data.notificationType === "email"
    }
  })
  const session = useSession()


  const loading = useLoading()

  // function onSubmit(data: NotificationsFormValues) {
  //   toast({
  //     title: "Notifications Updated",
  //     description: "You have successfully updated notifications"
  //   })
  // }

  const onSubmit = async (values: NotificationsFormValues) => {
    loading.onOpen()
    const headers = {
      Authorization: `Bearer ${session.data?.user.accessToken}`, // Replace YOUR_ACCESS_TOKEN with the actual token
      // Other headers if needed
    };
  
    await PlainTransportDekApi.patch(`/data-entry/settings?flag=notifications`,
    { notificationType: values.emails === true ? "email" : "push" },
    { headers })
    .then(() => {
      toast({
            title: "Notifications Updated",
            description: "You have successfully updated notifications"
          })
     })
     .catch((error) => {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        description: `Error occured`,
        })
    })
    .finally(() => {
      loading.onClose()
    })
  };

 

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
        <div>
          <div className="space-y-4">

                  <div className="space-y-0.5 flex justify-between items-center p-4 rounded-lg border">
                    <Label className="text-base">
                      Push Notifications
                    </Label>
                    <Switch
                      checked={true}
                      disabled={true}
                    />
                  </div>
                  
  
            <FormField
              control={form.control}
              name="emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border px-4 py-2">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                       Email Notifications
                    </FormLabel>
                    <FormDescription className="text-xs">
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            

          </div>
        </div>
        <Button type="submit">Submit</Button>

      </form>
    </Form>
  )
}